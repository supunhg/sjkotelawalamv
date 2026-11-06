const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

// Ensure data and uploads directories exist
const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'sjkotelawala.db');
const db = new Database(dbPath);

// Enable WAL mode for high concurrency & performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// 1. Users Table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('admin', 'digital_team')),
    full_name TEXT,
    must_change_password INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// 2. Admissions Inquiries Table
db.exec(`
  CREATE TABLE IF NOT EXISTS admissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_name TEXT NOT NULL,
    parent_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    grade_applying TEXT NOT NULL,
    stream TEXT,
    residential_address TEXT NOT NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'reviewed', 'contacted', 'admitted', 'archived')),
    admin_notes TEXT,
    ip_address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// 3. Announcements Table
db.exec(`
  CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT,
    is_urgent INTEGER NOT NULL DEFAULT 0,
    created_by TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// 4. Dynamic Gallery Table
db.exec(`
  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    created_by TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed Default Admin User: admin / Admin@123 (must change on first login)
const existingAdmin = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
if (!existingAdmin) {
  const defaultHash = bcrypt.hashSync('Admin@123', 10);
  db.prepare(`
    INSERT INTO users (username, password_hash, role, full_name, must_change_password)
    VALUES (?, ?, ?, ?, ?)
  `).run('admin', defaultHash, 'admin', 'System Administrator', 1);
  console.log('[DB] Seeded initial admin account: username "admin" (must change password on first login).');
}

// Seed initial announcements if table is empty
const announcementCount = db.prepare('SELECT COUNT(*) as count FROM announcements').get().count;
if (announcementCount === 0) {
  const initialAnnouncements = [
    {
      title: 'Grade 1 Admissions Circular for Academic Year 2026/27',
      category: 'Admissions',
      date: 'October 15, 2026',
      summary: 'Official application forms and admission guidelines for Grade 1 enrollment are now available at the administrative office and downloadable from this portal.',
      content: 'Detailed guidelines issued under Ministry of Education circular. Parents residing in Kesbewa division are advised to submit applications before the deadline.',
      is_urgent: 1
    },
    {
      title: 'Annual Inter-House Athletic Meet 2026 Scheduled',
      category: 'Sports',
      date: 'November 28, 2026',
      summary: 'The flagship sports championship of Sir John Kotelawala Maha Vidyalaya will be held at the college main pavilion.',
      content: 'Track and field events for junior, intermediate, and senior divisions. Parents and well-wishers cordially invited.',
      is_urgent: 0
    },
    {
      title: 'G.C.E. Advanced Level Laboratory Practical Assessment Schedule',
      category: 'Examination',
      date: 'December 05, 2026',
      summary: 'Practical sessions for Science and Engineering Technology streams in the college modern laboratories.',
      content: 'All candidates must report in proper laboratory attire with practical record books certified by the subject teacher.',
      is_urgent: 0
    },
    {
      title: 'Gilanpasa Buddha Pooja and Annual Pirith Ceremony',
      category: 'Event',
      date: 'December 18, 2026',
      summary: 'Commemorating the legacy of founder General Sir John Kotelawala and blessing all candidates sitting for national exams.',
      content: 'Organized by the Buddhist Society of the college with participation of the staff, students, and School Development Society.',
      is_urgent: 0
    }
  ];

  const insertAnnounce = db.prepare(`
    INSERT INTO announcements (title, category, date, summary, content, is_urgent, created_by)
    VALUES (@title, @category, @date, @summary, @content, @is_urgent, 'admin')
  `);

  const insertMany = db.transaction((items) => {
    for (const item of items) insertAnnounce.run(item);
  });
  insertMany(initialAnnouncements);
  console.log('[DB] Seeded initial announcements.');
}

// Seed initial gallery if empty
const galleryCount = db.prepare('SELECT COUNT(*) as count FROM gallery').get().count;
if (galleryCount === 0) {
  const initialGallery = [
    { title: 'College Crest & Assembly Grounds', category: 'Campus', image_url: '/images/gallery/gallery-1.png', description: 'Morning gathering and college traditions' },
    { title: 'Gilanpasa Buddha Pooja & Religious Ceremony', category: 'Tradition', image_url: '/images/gallery/gallery-2.png', description: 'Spiritual observances at the college shrine' },
    { title: 'Inter-House Sports Champions Parade', category: 'Sports', image_url: '/images/gallery/gallery-3.png', description: 'Celebrating athletic distinction' },
    { title: 'College Media Unit Live Broadcast', category: 'Academics', image_url: '/images/gallery/gallery-4.png', description: 'Student announcers and technical team' },
    { title: 'All-Island Drama Festival Laureates', category: 'Culture', image_url: '/images/gallery/gallery-5.png', description: '1st place national performing arts award' },
    { title: 'Modern ICT Laboratory Practical Session', category: 'Academics', image_url: '/images/gallery/gallery-6.png', description: 'Hands-on digital curriculum' }
  ];

  const insertGal = db.prepare(`
    INSERT INTO gallery (title, category, image_url, description, created_by)
    VALUES (@title, @category, @image_url, @description, 'admin')
  `);

  const insertGalleryMany = db.transaction((items) => {
    for (const item of items) insertGal.run(item);
  });
  insertGalleryMany(initialGallery);
  console.log('[DB] Seeded initial gallery items.');
}

module.exports = { db, uploadsDir };
