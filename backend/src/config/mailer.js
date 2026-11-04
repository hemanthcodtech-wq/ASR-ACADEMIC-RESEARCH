const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = null;
const isEmailConfigured = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

if (isEmailConfigured) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  transporter.verify((err) => {
    if (err) {
      console.warn('⚠️ SMTP Transporter verification warning:', err.message);
    } else {
      console.log('📧 Nodemailer SMTP Transporter ready to send emails.');
    }
  });
} else {
  console.log('ℹ️ Nodemailer SMTP credentials not fully set in .env (falling back to terminal logger & mock dispatcher)');
}

/**
 * Send 6-Digit OTP Email
 * @param {string} toEmail 
 * @param {string} otpCode 
 * @param {string} authorName 
 */
const sendOtpEmail = async (toEmail, otpCode, authorName = 'Author') => {
  const subject = `Your ASR Portal Security Passcode: ${otpCode}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }
        .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: #0b1a30; padding: 28px 32px; text-align: center; }
        .brand-badge { display: inline-block; background: #2563eb; color: #ffffff; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 6px; letter-spacing: 0.6px; margin-bottom: 8px; }
        .title { color: #ffffff; font-size: 20px; font-weight: 700; margin: 0; }
        .body { padding: 32px; }
        .greeting { font-size: 15px; font-weight: 600; color: #0f172a; margin-bottom: 12px; }
        .lead { font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 24px; }
        .code-box { background: #f0fdf4; border: 2px dashed #22c55e; border-radius: 10px; padding: 20px; text-align: center; margin: 24px 0; }
        .code-value { font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #15803d; font-family: monospace; }
        .expiry-note { font-size: 12px; color: #64748b; margin-top: 8px; }
        .security-strip { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px 16px; margin: 20px 0; font-size: 12px; color: #1e40af; line-height: 1.5; }
        .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 32px; text-align: center; font-size: 11.5px; color: #94a3b8; line-height: 1.5; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="brand-badge">ASR AUTHOR TRACKING PORTAL</div>
          <h1 class="title">Security Verification Code</h1>
        </div>
        <div class="body">
          <p class="greeting">Dear ${authorName},</p>
          <p class="lead">We received a request to access your manuscripts and author dashboard on the <strong>ASR Academic Research Solutions Portal</strong>. Use the following 6-digit One-Time Passcode (OTP) to complete your 2FA authentication:</p>
          
          <div class="code-box">
            <div class="code-value">${otpCode}</div>
            <div class="expiry-note">Valid for 10 minutes • Single session use</div>
          </div>

          <div class="security-strip">
            <strong>🔒 Strict Data Privacy Policy:</strong>
            Never share this one-time passcode with anyone. ASR staff will never ask for your authentication passcode.
          </div>

          <p class="lead" style="font-size: 13px; color: #64748b;">If you did not request this security code, you can safely disregard this email or alert our security office immediately at <a href="mailto:support@asracademicresearch.com" style="color: #2563eb;">support@asracademicresearch.com</a>.</p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} ASR Academic Research Solutions. All rights reserved.<br>
          Vijayapur • Bengaluru • Rajahmundry • Madurai
        </div>
      </div>
    </body>
    </html>
  `;

  if (isEmailConfigured && transporter) {
    try {
      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || '"ASR Academic Research" <support@asracademicresearch.com>',
        to: toEmail,
        subject,
        html: htmlContent
      });
      console.log(`[EMAIL] ✉️ OTP email sent to ${toEmail}. MessageId: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error(`[EMAIL ERROR] Failed to send email via SMTP:`, error.message);
      return { success: false, error: error.message };
    }
  } else {
    console.log(`[MOCK EMAIL DISPATCH] ✉️ OTP for ${toEmail}: ${otpCode}`);
    return { success: true, mock: true };
  }
};

/**
 * Send Manuscript Status Notification Email
 */
const sendStatusUpdateEmail = async (toEmail, paperTitle, paperId, stageTitle, stageNumber) => {
  if (!isEmailConfigured || !transporter) return { success: false, mock: true };

  const subject = `Status Update [${paperId}]: ${stageTitle}`;
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b;">
      <h2 style="color: #2563eb;">ASR Manuscript Status Update</h2>
      <p>Dear Author,</p>
      <p>Your manuscript has reached a new progression milestone:</p>
      <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <strong>Paper ID:</strong> ${paperId}<br>
        <strong>Title:</strong> ${paperTitle}<br>
        <strong>New Stage:</strong> Stage ${stageNumber}: ${stageTitle}
      </div>
      <p>Please log in to your <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/login">ASR Author Tracking Portal</a> to view referee remarks, download proofs, or check next steps.</p>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"ASR Academic Research" <support@asracademicresearch.com>',
      to: toEmail,
      subject,
      html: htmlContent
    });
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('Failed to send status update email:', err.message);
    return { success: false, error: err.message };
  }
};

module.exports = {
  sendOtpEmail,
  sendStatusUpdateEmail,
  isEmailConfigured
};

