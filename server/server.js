const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const { db, uploadsDir } = require('./db');
const { 
  generateToken, 
  requireAuth, 
  requireAdmin, 
  requirePasswordChanged 
} = require('./auth');

const app = express();
const PORT = process.env.PORT || 4000;

// Trust reverse proxy (Nginx) for correct client IP detection
app.set('trust proxy', 1);

// Security Middlewares
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads serving (fallback if not handled directly by Nginx)
app.use('/uploads', express.static(uploadsDir, {
  maxAge: '30d',
  setHeaders: (res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
  }
}));

// Rate Limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login attempts per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again in 15 minutes.' }
});

const submissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Limit each IP to 20 inquiries per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many inquiries submitted from this connection. Please try again later.' }
});

// Configure Multer for Secure File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, `img_${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Only JPEG, PNG, WEBP, and GIF are permitted.'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter
});

/* ==========================================================================
   AUTHENTICATION ENDPOINTS
   ========================================================================== */

// POST /api/auth/login
app.post('/api/auth/login', authLimiter, (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username.trim());
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isMatch = bcrypt.compareSync(password, user.password_hash);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken(user);
  return res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      fullName: user.full_name,
      mustChangePassword: Boolean(user.must_change_password)
    }
  });
});

// POST /api/auth/change-password
app.post('/api/auth/change-password', requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters long.' });
  }

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // If not in forced password change mode, verify current password
  if (!user.must_change_password) {
    if (!currentPassword) {
      return res.status(400).json({ error: 'Current password is required.' });
    }
    const isCurrentValid = bcrypt.compareSync(currentPassword, user.password_hash);
    if (!isCurrentValid) {
      return res.status(401).json({ error: 'Current password is incorrect.' });
    }
  }

  const newHash = bcrypt.hashSync(newPassword, 10);
  db.prepare(`
    UPDATE users 
    SET password_hash = ?, must_change_password = 0, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `).run(newHash, user.id);

  const updatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(user.id);
  const newToken = generateToken(updatedUser);

  return res.json({
    success: true,
    message: 'Password changed successfully.',
    token: newToken,
    user: {
      id: updatedUser.id,
      username: updatedUser.username,
      role: updatedUser.role,
      fullName: updatedUser.full_name,
      mustChangePassword: false
    }
  });
});

// GET /api/auth/me
app.get('/api/auth/me', requireAuth, (req, res) => {
  const user = db.prepare('SELECT id, username, role, full_name, must_change_password, created_at FROM users WHERE id = ?').get(req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.json({
    id: user.id,
    username: user.username,
    role: user.role,
    fullName: user.full_name,
    mustChangePassword: Boolean(user.must_change_password),
    createdAt: user.created_at
  });
});

/* ==========================================================================
   USER MANAGEMENT (ADMIN ONLY)
   ========================================================================== */

// GET /api/users
app.get('/api/users', requireAdmin, requirePasswordChanged, (req, res) => {
  const users = db.prepare(`
    SELECT id, username, role, full_name, must_change_password, created_at, updated_at 
    FROM users 
    ORDER BY id ASC
  `).all();
  return res.json(users);
});

// POST /api/users (Create Digital Team or Admin User)
app.post('/api/users', requireAdmin, requirePasswordChanged, (req, res) => {
  const { username, password, role, fullName } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Username, password, and role are required' });
  }

  if (!['admin', 'digital_team'].includes(role)) {
    return res.status(400).json({ error: 'Role must be either "admin" or "digital_team"' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }

  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username.trim().toLowerCase());
  if (existing) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const result = db.prepare(`
    INSERT INTO users (username, password_hash, role, full_name, must_change_password)
    VALUES (?, ?, ?, ?, 0)
  `).run(username.trim().toLowerCase(), passwordHash, role, fullName || 'Digital Team Member');

  return res.status(201).json({
    success: true,
    message: `User "${username}" created successfully`,
    id: result.lastInsertRowid
  });
});

// DELETE /api/users/:id
app.delete('/api/users/:id', requireAdmin, requirePasswordChanged, (req, res) => {
  const targetId = parseInt(req.params.id, 10);
  if (targetId === req.user.id) {
    return res.status(400).json({ error: 'You cannot delete your own active administrator account' });
  }

  const user = db.prepare('SELECT username FROM users WHERE id = ?').get(targetId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  db.prepare('DELETE FROM users WHERE id = ?').run(targetId);
  return res.json({ success: true, message: `User "${user.username}" deleted` });
});

// POST /api/users/:id/reset-password
app.post('/api/users/:id/reset-password', requireAdmin, requirePasswordChanged, (req, res) => {
  const targetId = parseInt(req.params.id, 10);
  const { newPassword } = req.body;

  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters long' });
  }

  const user = db.prepare('SELECT username FROM users WHERE id = ?').get(targetId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const hash = bcrypt.hashSync(newPassword, 10);
  db.prepare('UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(hash, targetId);
  return res.json({ success: true, message: `Password reset successfully for user "${user.username}"` });
});

/* ==========================================================================
   ADMISSIONS & INQUIRIES ENDPOINTS
   ========================================================================== */

// POST /api/admissions (Public Form Submission)
app.post('/api/admissions', submissionLimiter, (req, res) => {
  const {
    studentName,
    parentName,
    phone,
    email,
    gradeApplying,
    stream,
    residentialAddress,
    message
  } = req.body;

  if (!studentName || !parentName || !phone || !gradeApplying || !residentialAddress) {
    return res.status(400).json({ error: 'Please provide all mandatory fields (Student Name, Parent Name, Phone, Grade, Residential Address)' });
  }

  const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const stmt = db.prepare(`
    INSERT INTO admissions (
      student_name, parent_name, phone, email, grade_applying, stream, residential_address, message, ip_address
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    studentName.trim(),
    parentName.trim(),
    phone.trim(),
    email ? email.trim() : null,
    gradeApplying,
    stream || null,
    residentialAddress.trim(),
    message ? message.trim() : null,
    String(clientIp)
  );

  return res.status(201).json({
    success: true,
    message: 'Your admission inquiry has been registered with the College Secretariat.',
    inquiryId: result.lastInsertRowid
  });
});

// GET /api/admissions (Admin Only)
app.get('/api/admissions', requireAdmin, requirePasswordChanged, (req, res) => {
  const { status, grade } = req.query;
  let query = 'SELECT * FROM admissions';
  const params = [];
  const conditions = [];

  if (status && status !== 'all') {
    conditions.push('status = ?');
    params.push(status);
  }
  if (grade && grade !== 'all') {
    conditions.push('grade_applying = ?');
    params.push(grade);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
  query += ' ORDER BY created_at DESC';

  const rows = db.prepare(query).all(...params);
  return res.json(rows);
});

// PATCH /api/admissions/:id (Admin Only)
app.patch('/api/admissions/:id', requireAdmin, requirePasswordChanged, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { status, adminNotes } = req.body;

  const existing = db.prepare('SELECT id FROM admissions WHERE id = ?').get(id);
  if (!existing) {
    return res.status(404).json({ error: 'Inquiry record not found' });
  }

  if (status) {
    const validStatuses = ['pending', 'reviewed', 'contacted', 'admitted', 'archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }
    db.prepare('UPDATE admissions SET status = ? WHERE id = ?').run(status, id);
  }

  if (adminNotes !== undefined) {
    db.prepare('UPDATE admissions SET admin_notes = ? WHERE id = ?').run(adminNotes, id);
  }

  return res.json({ success: true, message: 'Inquiry record updated' });
});

// DELETE /api/admissions/:id (Admin Only)
app.delete('/api/admissions/:id', requireAdmin, requirePasswordChanged, (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.prepare('DELETE FROM admissions WHERE id = ?').run(id);
  return res.json({ success: true, message: 'Inquiry deleted' });
});

/* ==========================================================================
   ANNOUNCEMENTS & NOTICE BOARD (DYNAMIC DATA)
   ========================================================================== */

// GET /api/announcements (Public)
app.get('/api/announcements', (req, res) => {
  const rows = db.prepare('SELECT * FROM announcements ORDER BY is_urgent DESC, created_at DESC').all();
  return res.json(rows);
});

// POST /api/announcements (Admin or Digital Team)
app.post('/api/announcements', requireAuth, requirePasswordChanged, (req, res) => {
  const { title, category, date, summary, content, isUrgent } = req.body;

  if (!title || !category || !summary) {
    return res.status(400).json({ error: 'Title, category, and summary are required' });
  }

  const stmt = db.prepare(`
    INSERT INTO announcements (title, category, date, summary, content, is_urgent, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    title.trim(),
    category.trim(),
    date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    summary.trim(),
    content ? content.trim() : null,
    isUrgent ? 1 : 0,
    req.user.username
  );

  return res.status(201).json({
    success: true,
    id: result.lastInsertRowid,
    message: 'Announcement published successfully'
  });
});

// PUT /api/announcements/:id (Admin or Digital Team)
app.put('/api/announcements/:id', requireAuth, requirePasswordChanged, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, category, date, summary, content, isUrgent } = req.body;

  const stmt = db.prepare(`
    UPDATE announcements 
    SET title = ?, category = ?, date = ?, summary = ?, content = ?, is_urgent = ?
    WHERE id = ?
  `);

  stmt.run(
    title.trim(),
    category.trim(),
    date,
    summary.trim(),
    content ? content.trim() : null,
    isUrgent ? 1 : 0,
    id
  );

  return res.json({ success: true, message: 'Announcement updated successfully' });
});

// DELETE /api/announcements/:id (Admin or Digital Team)
app.delete('/api/announcements/:id', requireAuth, requirePasswordChanged, (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.prepare('DELETE FROM announcements WHERE id = ?').run(id);
  return res.json({ success: true, message: 'Announcement deleted' });
});

/* ==========================================================================
   DYNAMIC GALLERY & IMAGE UPLOADS
   ========================================================================== */

// GET /api/gallery (Public)
app.get('/api/gallery', (req, res) => {
  const rows = db.prepare('SELECT * FROM gallery ORDER BY created_at DESC').all();
  return res.json(rows);
});

// POST /api/gallery/upload (Admin or Digital Team)
app.post('/api/gallery/upload', requireAuth, requirePasswordChanged, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please choose an image file to upload' });
  }

  const { title, category, description } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;

  const stmt = db.prepare(`
    INSERT INTO gallery (title, category, image_url, description, created_by)
    VALUES (?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    title ? title.trim() : 'Campus Moment',
    category ? category.trim() : 'Campus',
    imageUrl,
    description ? description.trim() : null,
    req.user.username
  );

  return res.status(201).json({
    success: true,
    message: 'Image uploaded and published to gallery',
    item: {
      id: result.lastInsertRowid,
      title: title || 'Campus Moment',
      category: category || 'Campus',
      imageUrl,
      description
    }
  });
});

// DELETE /api/gallery/:id (Admin or Digital Team)
app.delete('/api/gallery/:id', requireAuth, requirePasswordChanged, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = db.prepare('SELECT image_url FROM gallery WHERE id = ?').get(id);

  if (item) {
    // If it's an uploaded file in /uploads/, delete from disk
    if (item.image_url.startsWith('/uploads/')) {
      const filename = path.basename(item.image_url);
      const filePath = path.join(uploadsDir, filename);
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (e) { /* ignore unlink error */ }
      }
    }
    db.prepare('DELETE FROM gallery WHERE id = ?').run(id);
  }

  return res.json({ success: true, message: 'Gallery item removed' });
});

/* ==========================================================================
   ADMIN STATS OVERVIEW
   ========================================================================== */

// GET /api/stats (Admin or Digital Team)
app.get('/api/stats', requireAuth, requirePasswordChanged, (req, res) => {
  const totalAdmissions = db.prepare('SELECT COUNT(*) as count FROM admissions').get().count;
  const pendingAdmissions = db.prepare("SELECT COUNT(*) as count FROM admissions WHERE status = 'pending'").get().count;
  const totalAnnouncements = db.prepare('SELECT COUNT(*) as count FROM announcements').get().count;
  const totalGallery = db.prepare('SELECT COUNT(*) as count FROM gallery').get().count;
  const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users').get().count;

  return res.json({
    totalAdmissions,
    pendingAdmissions,
    totalAnnouncements,
    totalGallery,
    totalUsers
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Start Server
app.listen(PORT, '127.0.0.1', () => {
  console.log(`[API Server] Running securely on http://127.0.0.1:${PORT}`);
});
