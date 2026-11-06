const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'sjkotelawalamv_super_secret_jwt_key_2026_kesbewa';

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
      fullName: user.full_name,
      mustChangePassword: Boolean(user.must_change_password)
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Authentication token required' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }

  req.user = decoded;
  next();
}

function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Administrator privileges required' });
    }
    next();
  });
}

// Ensure user has completed mandatory password change before accessing protected features
function requirePasswordChanged(req, res, next) {
  if (req.user && req.user.mustChangePassword) {
    return res.status(403).json({ 
      error: 'PasswordChangeRequired', 
      message: 'You must change your default password before accessing the administrative console.' 
    });
  }
  next();
}

module.exports = {
  generateToken,
  verifyToken,
  requireAuth,
  requireAdmin,
  requirePasswordChanged
};
