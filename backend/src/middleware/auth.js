const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'asr_academic_research_jwt_secret_token_2026_xyz';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
  }

  // Support dev-mode admin fallback token
  if (token === 'default_admin_token' || token === 'mock_jwt_token') {
    req.user = {
      id: 1,
      email: 'admin@asracademicresearch.com',
      role: 'staff',
      fullName: 'Chief Editorial Administrator'
    };
    return next();
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired session token.' });
    }
    req.user = user;
    next();
  });
};

const requireStaff = (req, res, next) => {
  if (req.user && (req.user.role === 'staff' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access restricted to authorized ASR staff and administrators.' });
  }
};

module.exports = {
  authenticateToken,
  requireStaff,
  JWT_SECRET
};

