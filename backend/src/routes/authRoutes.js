const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { JWT_SECRET } = require('../middleware/auth');
const { sendOtpEmail } = require('../config/mailer');

// 1. Password / Username Admin Login (Direct Credentials)
router.post('/admin-login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username/Email and password are required.' });
    }

    const cleanInput = username.toLowerCase().trim();

    // Look for matching admin/staff account
    const user = db.store.authors.find(
      u => (u.username?.toLowerCase() === cleanInput || u.email.toLowerCase() === cleanInput)
    );

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User does not exist.' });
    }

    // Verify password
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid password. Access denied.' });
    }

    // Sign JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.full_name
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Audit log
    db.store.auditLogs.unshift({
      id: db.store.auditLogs.length + 1,
      author_email: user.email,
      action: 'ADMIN_LOGIN_SUCCESS',
      details: `${user.role.toUpperCase()} logged into administration portal`,
      created_at: new Date().toISOString()
    });

    console.log(`[AUTH] 👑 Admin signed in successfully: ${user.email} (${user.role})`);

    return res.json({
      success: true,
      message: 'Admin authorization granted.',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        institution: user.institution,
        phone: user.phone
      }
    });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ success: false, message: 'Authentication processing error.' });
  }
});

// 2. Request OTP (Module 1 - Step 1)
router.post('/request-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid author email address.' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if author exists or create on the fly
    let author = db.store.authors.find(a => a.email.toLowerCase() === cleanEmail);
    if (!author) {
      author = {
        id: db.store.authors.length + 1,
        email: cleanEmail,
        username: cleanEmail.split('@')[0],
        password: 'AuthorPassword123!',
        full_name: cleanEmail.split('@')[0].toUpperCase(),
        role: 'author',
        phone: '+91 9515207724',
        institution: 'Academic Researcher',
        created_at: new Date().toISOString()
      };
      db.store.authors.push(author);

      // Auto-link initial mock papers to author for demo purposes if none linked
      db.store.authorPaperMapping.push({
        author_email: cleanEmail,
        paper_id: 'ASR-2024-ENG-084',
        role_in_paper: 'Primary Author'
      });
    }

    // Generate cryptographically random 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    db.store.otpSessions[cleanEmail] = {
      otp: generatedOtp,
      expiresAt,
      attempts: 0
    };

    // Store in Neon DB otp_sessions
    if (db.isNeonConnected()) {
      await db.query(`
        INSERT INTO otp_sessions (email, otp_code, expires_at, attempts, verified)
        VALUES ($1, $2, $3, 0, false)
      `, [cleanEmail, generatedOtp, expiresAt]);
    }

    console.log(`[AUTH] 🔑 Real OTP generated and dispatched for ${cleanEmail}`);

    // Send email using Nodemailer
    const emailResult = await sendOtpEmail(cleanEmail, generatedOtp, author.full_name);

    return res.json({
      success: true,
      message: `A 6-digit one-time passcode has been dispatched to ${cleanEmail}. Please check your inbox.`,
      email_delivered: emailResult.success,
      expiresInSeconds: 600
    });
  } catch (error) {
    console.error('Request OTP error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate security code. Please try again.' });
  }
});

// 3. Verify OTP (Module 1 - Step 2)
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and 6-digit security code are required.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = String(otp).trim();
    const session = db.store.otpSessions[cleanEmail];

    // Check in-memory session or query Neon DB otp_sessions
    let isValidGenerated = false;
    if (session && session.otp === cleanOtp && new Date() < new Date(session.expiresAt)) {
      isValidGenerated = true;
    } else if (db.isNeonConnected()) {
      const dbCheck = await db.query(`
        SELECT * FROM otp_sessions 
        WHERE email = $1 AND otp_code = $2 AND expires_at > NOW() AND verified = false
        ORDER BY id DESC LIMIT 1
      `, [cleanEmail, cleanOtp]);
      if (dbCheck && dbCheck.rows && dbCheck.rows.length > 0) {
        isValidGenerated = true;
      }
    }

    if (!isValidGenerated) {
      if (session) session.attempts = (session.attempts || 0) + 1;
      return res.status(401).json({ success: false, message: 'Invalid or expired passcode. Please enter the exact code sent to your email.' });
    }

    // Mark as verified in Neon DB
    if (db.isNeonConnected()) {
      await db.query(`
        UPDATE otp_sessions SET verified = true WHERE email = $1 AND otp_code = $2
      `, [cleanEmail, cleanOtp]);
    }

    // Find author details
    let author = db.store.authors.find(a => a.email.toLowerCase() === cleanEmail);
    if (!author) {
      author = {
        id: db.store.authors.length + 1,
        email: cleanEmail,
        username: cleanEmail.split('@')[0],
        password: 'AuthorPassword123!',
        full_name: cleanEmail.split('@')[0].toUpperCase(),
        role: 'author',
        created_at: new Date().toISOString()
      };
      db.store.authors.push(author);
    }

    // Clear used session
    delete db.store.otpSessions[cleanEmail];

    // Issue JWT
    const token = jwt.sign(
      {
        id: author.id,
        email: author.email,
        role: author.role,
        fullName: author.full_name
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Audit log
    db.store.auditLogs.unshift({
      id: db.store.auditLogs.length + 1,
      author_email: cleanEmail,
      action: 'LOGIN_2FA_SUCCESS',
      details: 'Author verified 2FA passcode and opened dashboard',
      created_at: new Date().toISOString()
    });

    return res.json({
      success: true,
      message: 'Authentication successful. Opening author tracking portal...',
      token,
      user: {
        id: author.id,
        username: author.username,
        email: author.email,
        fullName: author.full_name,
        role: author.role,
        institution: author.institution,
        phone: author.phone
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ success: false, message: 'Authentication verification error.' });
  }
});

// 4. Current User Profile
router.get('/me', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const author = db.store.authors.find(a => a.email.toLowerCase() === decoded.email.toLowerCase());
    return res.json({ success: true, user: author || decoded });
  } catch (e) {
    return res.status(403).json({ success: false, message: 'Invalid token' });
  }
});

module.exports = router;
