import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  KeyRound,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Lock,
  Clock,
  UserCheck,
  FileText,
  AlertCircle,
  HelpCircle,
  Layers,
  FileCheck2,
  BellRing,
  Wallet
} from 'lucide-react';
import { api } from '../portal/apiService';
import './AuthPortal.css';

const Login = () => {
  const navigate = useNavigate();
  const [loginMode, setLoginMode] = useState('otp'); // 'otp' or 'admin'
  const [step, setStep] = useState(1); // 1: Email Input, 2: OTP Verification
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendTimer, setResendTimer] = useState(45);
  const [errorMsg, setErrorMsg] = useState('');

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer;
    if (step === 2 && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, resendTimer]);

  // Handle Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid registered academic email address.');
      return;
    }

    setIsSubmitting(true);
    const result = await api.requestOtp(email);
    setIsSubmitting(false);

    if (result && result.success) {
      setStep(2);
      setResendTimer(45);
    } else {
      setErrorMsg(result?.message || 'Failed to dispatch verification code. Please retry.');
    }
  };

  // Handle Admin Password Login
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!adminUsername || !adminPassword) {
      setErrorMsg('Please enter both username and password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const res = await api.adminLogin(adminUsername, adminPassword);
    setIsSubmitting(false);

    if (res && res.success) {
      localStorage.setItem('asr_author_user', JSON.stringify({
        email: res.user?.email || 'admin@asracademicresearch.com',
        name: res.user?.fullName || 'Chief Editorial Administrator',
        token: res.token,
        role: res.user?.role || 'admin',
        authenticated: true,
        lastLogin: new Date().toISOString()
      }));
      navigate('/admin/overview');
    } else {
      setErrorMsg(res?.message || 'Invalid username or password.');
    }
  };

  // Handle OTP digit changes
  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance focus to next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle OTP Backspace key navigation
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Handle OTP Submit / Verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setErrorMsg('Please enter all 6 digits of the verification code.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const result = await api.verifyOtp(email, enteredOtp);
    setIsSubmitting(false);

    if (result && result.success) {
      // Save user session in localStorage
      localStorage.setItem('asr_author_user', JSON.stringify({
        email: email,
        name: result.user?.fullName || email.split('@')[0].toUpperCase(),
        token: result.token || 'asr_auth_token_sample_123',
        role: result.user?.role || 'author',
        authenticated: true,
        lastLogin: new Date().toISOString()
      }));
      navigate('/author-dashboard');
    } else {
      setErrorMsg(result?.message || 'Invalid or expired passcode. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setResendTimer(45);
    setErrorMsg('');
    await api.requestOtp(email);
  };

  return (
    <div className="auth-portal-page">
      {/* Hero Header */}
      <section className="auth-hero-section">
        <div className="auth-hero-glow"></div>
        <div className="auth-hero-container">
          <div className="auth-badge-pill">
            <ShieldCheck size={14} className="badge-icon" />
            <span>SECURE • PRIVATE • RELIABLE</span>
          </div>

          <h1 className="auth-hero-title">
            <span className="auth-highlight">ASR ManuTrack</span> Portal
          </h1>

          <p className="auth-hero-subtitle">
            Track your research manuscript progression, download official submission proofs &amp; acceptance letters, and monitor peer-review updates in real-time.
          </p>
        </div>
      </section>

      {/* Main Authentication Grid */}
      <div className="auth-body-container">
        <div className="auth-card-wrapper">
          
          {/* Left Column: Interactive Form */}
          <div className="auth-form-card">
            <div className="portal-branding-strip" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f1f5f9', padding: '5px 8px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <button
                  type="button"
                  onClick={() => { setLoginMode('otp'); setErrorMsg(''); }}
                  style={{
                    fontSize: '15px',
                    fontWeight: 800,
                    padding: '8px 18px',
                    borderRadius: '9px',
                    border: 'none',
                    background: loginMode === 'otp' ? '#1d4ed8' : 'transparent',
                    color: loginMode === 'otp' ? '#ffffff' : '#475569',
                    cursor: 'pointer',
                    boxShadow: loginMode === 'otp' ? '0 3px 10px rgba(29, 78, 216, 0.3)' : 'none',
                    transition: 'all 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Author Login</span>
                </button>
                <span style={{ color: '#cbd5e1', fontWeight: 600, fontSize: '15px', userSelect: 'none' }}>|</span>
                <button
                  type="button"
                  onClick={() => { setLoginMode('admin'); setErrorMsg(''); }}
                  style={{
                    fontSize: '15px',
                    fontWeight: 800,
                    padding: '8px 18px',
                    borderRadius: '9px',
                    border: 'none',
                    background: loginMode === 'admin' ? '#0f172a' : 'transparent',
                    color: loginMode === 'admin' ? '#ffffff' : '#475569',
                    cursor: 'pointer',
                    boxShadow: loginMode === 'admin' ? '0 3px 10px rgba(15, 23, 42, 0.3)' : 'none',
                    transition: 'all 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Admin Login</span>
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="brand-dot"></span>
                <span className="brand-subtext">{loginMode === 'otp' ? 'Author Access' : 'Editorial Control'}</span>
              </div>
            </div>

            {loginMode === 'admin' ? (
              <>
                <div className="form-header-text">
                  <h2>Editorial Admin Sign In</h2>
                  <p>Access the backend management hub to oversee manuscripts, assign coordinators, and update statuses.</p>
                </div>

                {errorMsg && (
                  <div className="auth-error-banner">
                    <AlertCircle size={17} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleAdminLogin} className="auth-form-inner">
                  <div className="auth-input-group">
                    <label htmlFor="admin-user">Admin Username or Email *</label>
                    <div className="input-with-icon">
                      <UserCheck size={18} className="field-icon" />
                      <input
                        type="text"
                        id="admin-user"
                        required
                        placeholder="e.g. admin"
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="auth-input-group">
                    <label htmlFor="admin-pass">Password *</label>
                    <div className="input-with-icon">
                      <Lock size={18} className="field-icon" />
                      <input
                        type="password"
                        id="admin-pass"
                        required
                        placeholder="Enter admin password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-auth-primary" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span>Verifying Credentials...</span>
                    ) : (
                      <>
                        <span>Sign In as Admin</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <div className="auth-quick-hint" style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                    <div style={{ fontSize: '12px', color: '#334155', fontWeight: 600 }}>
                      🔑 Default Seeded Admin Credentials:
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                      Username: <code style={{ color: '#2563eb', fontWeight: 700 }}>admin</code> &nbsp;|&nbsp; Password: <code style={{ color: '#2563eb', fontWeight: 700 }}>adminPassword123!</code>
                    </div>
                  </div>
                </form>
              </>
            ) : step === 1 ? (
              <>
                <div className="form-header-text">
                  <h2>Sign In with Registered Email</h2>
                  <p>Enter the email address registered with your manuscript submission. We will send a one-time secure passcode (OTP).</p>
                </div>

                {errorMsg && (
                  <div className="auth-error-banner">
                    <AlertCircle size={17} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleRequestOtp} className="auth-form-inner">
                  <div className="auth-input-group">
                    <label htmlFor="auth-email">Author Registered Email ID *</label>
                    <div className="input-with-icon">
                      <Mail size={18} className="field-icon" />
                      <input
                        type="email"
                        id="auth-email"
                        required
                        placeholder="e.g. scholar@university.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        autoFocus
                      />
                    </div>
                    <span className="field-hint">We verify access against active paper records in the ASR database.</span>
                  </div>

                  <button type="submit" className="btn-auth-primary" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span>Sending OTP...</span>
                    ) : (
                      <>
                        <span>Send Verification OTP</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="otp-step-card-elevated">
                  <div className="otp-card-header">
                    <div className="otp-icon-header-badge">
                      <KeyRound size={22} className="otp-key-icon" />
                    </div>
                    
                    <h2 className="otp-title">Verify Security Passcode</h2>
                    
                    <p className="otp-intro-desc">
                      A 6-digit one-time authorization code has been dispatched to
                    </p>

                    <div className="otp-email-target-pill">
                      <div className="email-pill-inner">
                        <Mail size={15} className="mail-pill-icon" />
                        <span className="target-email-str">{email || 'kancharlahemanth89@gmail.com'}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setStep(1)} 
                        className="btn-change-email-inline"
                        title="Change Email Address"
                      >
                        Change Email
                      </button>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="auth-error-banner">
                      <AlertCircle size={17} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleVerifyOtp} className="auth-form-inner">
                    <div className="otp-boxes-wrapper">
                      <div className="otp-label-row">
                        <label className="otp-input-label">Enter 6-Digit Passcode</label>
                        <span className="otp-sub-hint">Expires in 10 minutes</span>
                      </div>
                      
                      <div className="otp-digit-boxes-container">
                        {otp.map((digit, i) => (
                          <input
                            key={i}
                            id={`otp-input-${i}`}
                            type="text"
                            maxLength="1"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className={`otp-digit-cell ${digit ? 'is-filled' : ''}`}
                            value={digit}
                            onChange={(e) => handleOtpChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            autoFocus={i === 0}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="otp-actions-bar">
                      <div className="resend-block">
                        {resendTimer > 0 ? (
                          <span className="resend-timer-badge">
                            <Clock size={14} className="timer-pulse" />
                            <span>Resend code in <strong>{resendTimer}s</strong></span>
                          </span>
                        ) : (
                          <button type="button" onClick={handleResendOtp} className="btn-resend-active">
                            Resend code
                          </button>
                        )}
                      </div>

                      <div className="otp-security-note">
                        <Lock size={12} />
                        <span>Encrypted Session</span>
                      </div>
                    </div>

                    <button type="submit" className="btn-auth-primary btn-verify-pulse" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span>Validating Session &amp; Fetching Papers...</span>
                      ) : (
                        <>
                          <ShieldCheck size={18} />
                          <span>Verify &amp; Open Dashboard</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </>
            )}

            {/* Compliance Guarantee */}
            <div className="auth-guarantee-footer">
              <Lock size={15} className="lock-icon" />
              <span>Strict Data Privacy: Each author accesses only their own manuscripts &amp; authorized receipts.</span>
            </div>
          </div>

          {/* Right Column: Key Security & Portal Capabilities (From Chart) */}
          <div className="auth-info-showcase">
            <div className="info-header">
              <span className="info-badge">AUTHOR SERVICES ECOSYSTEM</span>
              <h3>Supporting Every Stage of Academic Publishing</h3>
              <p>The ASR Author Paper Tracking Portal guarantees 100% transparent tracking, direct proof downloads, and real-time status alerts.</p>
            </div>

            <div className="auth-features-list">
              <div className="auth-feature-card">
                <div className="feat-icon-bubble green">
                  <Layers size={18} />
                </div>
                <div className="feat-text">
                  <h4>End-to-End Paper Workflow</h4>
                  <p>Track from manuscript formatting &amp; journal submission through revision cycles to final publication with DOI.</p>
                </div>
              </div>

              <div className="auth-feature-card">
                <div className="feat-icon-bubble blue">
                  <FileCheck2 size={18} />
                </div>
                <div className="feat-text">
                  <h4>Official Document Downloads</h4>
                  <p>Download signed submission confirmation proofs, acceptance letters, plagiarism reports, and proof-ready files.</p>
                </div>
              </div>

              <div className="auth-feature-card">
                <div className="feat-icon-bubble amber">
                  <Wallet size={18} />
                </div>
                <div className="feat-text">
                  <h4>Payment &amp; Account Invoices</h4>
                  <p>View transaction receipts, verified payment status (Paid/Pending), and download GST-compliant official invoices.</p>
                </div>
              </div>

              <div className="auth-feature-card">
                <div className="feat-icon-bubble purple">
                  <BellRing size={18} />
                </div>
                <div className="feat-text">
                  <h4>Automated Email &amp; WhatsApp Alerts</h4>
                  <p>Instant notification whenever your paper status shifts: Review Received, Revision Required, or Accepted.</p>
                </div>
              </div>
            </div>

            <div className="portal-help-strip">
              <div>
                <strong>Need Support with Paper ID?</strong>
                <span>Reach our dedicated coordination team 24/7 on WhatsApp.</span>
              </div>
              <a 
                href="https://wa.me/919515207724?text=Hello%20ASR%20Support,%20I%20need%20help%20logging%20into%20my%20Author%20Portal" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-portal-help"
              >
                Chat Support
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;

