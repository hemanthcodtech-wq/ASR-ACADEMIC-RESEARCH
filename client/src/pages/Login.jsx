import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import TiltCard from '../components/TiltCard';
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
  Wallet,
  MessageCircle,
  Shield,
  ExternalLink,
  ChevronRight,
  Send,
  Check
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
  const [isShaking, setIsShaking] = useState(false);

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

  const triggerErrorShake = (msg) => {
    setErrorMsg(msg);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 600);
  };

  // Handle Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@')) {
      triggerErrorShake('Please enter a valid registered academic email address.');
      return;
    }

    setIsSubmitting(true);
    const result = await api.requestOtp(email);
    setIsSubmitting(false);

    if (result && result.success) {
      setStep(2);
      setResendTimer(45);
    } else {
      triggerErrorShake(result?.message || 'Failed to dispatch verification code. Please retry.');
    }
  };

  // Handle Admin Password Login
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!adminUsername || !adminPassword) {
      triggerErrorShake('Please enter both username and password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const res = await api.adminLogin(adminUsername, adminPassword);
    setIsSubmitting(false);

    if (res && res.success) {
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}

      localStorage.setItem('asr_author_user', JSON.stringify({
        email: res.user?.email || 'admin@asracademicresearch.com',
        name: res.user?.fullName || 'Chief Editorial Administrator',
        token: res.token,
        role: res.user?.role || 'admin',
        authenticated: true,
        lastLogin: new Date().toISOString()
      }));
      setTimeout(() => navigate('/admin/overview'), 400);
    } else {
      triggerErrorShake(res?.message || 'Invalid username or password.');
    }
  };

  // Handle OTP digit changes
  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      triggerErrorShake('Please enter all 6 digits of the verification code.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const result = await api.verifyOtp(email, enteredOtp);
    setIsSubmitting(false);

    if (result && result.success) {
      try {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}

      localStorage.setItem('asr_author_user', JSON.stringify({
        email: email,
        name: result.user?.fullName || email.split('@')[0].toUpperCase(),
        token: result.token || 'asr_auth_token_sample_123',
        role: result.user?.role || 'author',
        authenticated: true,
        lastLogin: new Date().toISOString()
      }));

      setTimeout(() => navigate('/author-dashboard'), 450);
    } else {
      triggerErrorShake(result?.message || 'Invalid verification code. Please check and retry.');
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setResendTimer(45);
    setErrorMsg('');
    await api.requestOtp(email);
  };

  return (
    <div className="auth-portal-page" style={{ paddingBottom: '70px' }}>
      {/* Hero Header */}
      <section className="auth-hero-section">
        <div className="auth-hero-glow"></div>
        <motion.div 
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="auth-hero-container"
        >
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
        </motion.div>
      </section>

      {/* Main Authentication Grid */}
      <div className="auth-body-container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="auth-card-wrapper"
        >
          
          {/* Left Column: Interactive Form */}
          <motion.div 
            animate={isShaking ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
            transition={{ duration: 0.5 }}
            className="auth-form-card"
          >
            {/* Top Auth Mode Tabs */}
            <div style={{
              display: 'flex',
              background: '#f1f5f9',
              padding: '4px',
              borderRadius: '12px',
              marginBottom: '28px',
              border: '1px solid #e2e8f0'
            }}>
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => { setLoginMode('otp'); setErrorMsg(''); }}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  borderRadius: '9px',
                  border: 'none',
                  background: loginMode === 'otp' ? '#ffffff' : 'transparent',
                  color: loginMode === 'otp' ? '#1d4ed8' : '#64748b',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: loginMode === 'otp' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <UserCheck size={16} />
                <span>Author Login</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => { setLoginMode('admin'); setErrorMsg(''); }}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  borderRadius: '9px',
                  border: 'none',
                  background: loginMode === 'admin' ? '#ffffff' : 'transparent',
                  color: loginMode === 'admin' ? '#0f172a' : '#64748b',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: loginMode === 'admin' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Lock size={15} />
                <span>Admin Login</span>
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              {loginMode === 'admin' ? (
                <motion.div
                  key="admin-form"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fee2e2', color: '#dc2626', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', marginBottom: '8px', textTransform: 'uppercase' }}>
                      <Lock size={12} /> Root Access
                    </div>
                    <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '0 0 6px' }}>Editorial Administrator</h2>
                    <p style={{ color: '#64748b', fontSize: '13.5px', margin: 0, lineHeight: 1.5 }}>
                      Sign in with authorized staff credentials to manage manuscripts, update statuses, and review proofs.
                    </p>
                  </div>

                  {errorMsg && (
                    <motion.div 
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="auth-error-banner"
                    >
                      <AlertCircle size={17} />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}

                  <form onSubmit={handleAdminLogin}>
                    <div style={{ marginBottom: '18px' }}>
                      <label htmlFor="adminUsername" style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>
                        Editorial Username / Email *
                      </label>
                      <div className="input-with-icon">
                        <Mail className="field-icon" size={18} />
                        <input
                          id="adminUsername"
                          type="text"
                          value={adminUsername}
                          onChange={(e) => setAdminUsername(e.target.value)}
                          placeholder="admin@asracademicresearch.com"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <label htmlFor="adminPassword" style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>
                        Security Passkey *
                      </label>
                      <div className="input-with-icon">
                        <KeyRound className="field-icon" size={18} />
                        <input
                          id="adminPassword"
                          type="password"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          placeholder="••••••••••••"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit" 
                      className="btn-auth-primary" 
                      disabled={isSubmitting}
                      style={{ background: '#0f172a' }}
                    >
                      {isSubmitting ? (
                        <span>Authenticating Credentials...</span>
                      ) : (
                        <>
                          <span>Access Admin Control Suite</span>
                          <ArrowRight size={18} />
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="otp-form"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.25 }}
                >
                  {step === 1 ? (
                    <>
                      <div style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#eff6ff', color: '#2563eb', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', marginBottom: '8px', textTransform: 'uppercase' }}>
                          <Sparkles size={12} /> Passwordless 2FA
                        </div>
                        <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '0 0 6px' }}>
                          Sign In with Registered Email
                        </h2>
                        <p style={{ color: '#64748b', fontSize: '13.5px', margin: 0, lineHeight: 1.5 }}>
                          Enter the email address registered with your manuscript submission to receive a secure one-time passcode (OTP).
                        </p>
                      </div>

                      {errorMsg && (
                        <motion.div 
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="auth-error-banner"
                        >
                          <AlertCircle size={17} />
                          <span>{errorMsg}</span>
                        </motion.div>
                      )}

                      <form onSubmit={handleRequestOtp}>
                        <div style={{ marginBottom: '20px' }}>
                          <label htmlFor="authorEmail" style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>
                            Author Registered Email ID *
                          </label>
                          <div className="input-with-icon">
                            <Mail className="field-icon" size={18} />
                            <input
                              id="authorEmail"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="e.g. scholar@university.edu"
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                          <span style={{ display: 'block', fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                            We verify access against active paper records in the ASR database.
                          </span>
                        </div>

                        <motion.button 
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          type="submit" 
                          className="btn-auth-primary" 
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span>Dispatching Passcode...</span>
                          ) : (
                            <>
                              <span>Send Verification OTP</span>
                              <ArrowRight size={18} />
                            </>
                          )}
                        </motion.button>
                      </form>

                      {/* Feature Highlights Grid */}
                      <div style={{
                        marginTop: '28px',
                        paddingTop: '22px',
                        borderTop: '1px solid #f1f5f9',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '12px'
                      }}>
                        <div style={{ textAlign: 'center', background: '#f8fafc', padding: '10px 8px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                          <div style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase' }}>100% Secure</div>
                          <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>Encrypted 2FA</div>
                        </div>
                        <div style={{ textAlign: 'center', background: '#f8fafc', padding: '10px 8px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                          <div style={{ fontSize: '11px', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>Data Privacy</div>
                          <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>Isolated View</div>
                        </div>
                        <div style={{ textAlign: 'center', background: '#f8fafc', padding: '10px 8px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                          <div style={{ fontSize: '11px', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase' }}>Live Sync</div>
                          <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>Instant Status</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ marginBottom: '22px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#dcfce7', color: '#15803d', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', marginBottom: '8px', textTransform: 'uppercase' }}>
                          <CheckCircle size={12} /> Code Sent
                        </div>
                        <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '0 0 6px' }}>
                          Enter 6-Digit Passcode
                        </h2>
                        <p style={{ color: '#64748b', fontSize: '13.5px', margin: 0, lineHeight: 1.5 }}>
                          We dispatched a one-time passcode to <strong style={{ color: '#1d4ed8' }}>{email}</strong>.
                        </p>
                      </div>

                      {errorMsg && (
                        <motion.div 
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="auth-error-banner"
                        >
                          <AlertCircle size={17} />
                          <span>{errorMsg}</span>
                        </motion.div>
                      )}

                      <form onSubmit={handleVerifyOtp}>
                        <div style={{ marginBottom: '20px' }}>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569', marginBottom: '10px' }}>
                            One-Time Passcode (OTP) *
                          </label>
                          <div className="otp-digit-inputs">
                            {otp.map((digit, idx) => (
                              <input
                                key={idx}
                                id={`otp-input-${idx}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(idx, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(idx, e)}
                                className="otp-box"
                                disabled={isSubmitting}
                                autoFocus={idx === 0}
                              />
                            ))}
                          </div>
                        </div>

                        <motion.button 
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          type="submit" 
                          className="btn-auth-primary" 
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span>Validating Passcode...</span>
                          ) : (
                            <>
                              <span>Verify &amp; Access Dashboard</span>
                              <CheckCircle size={18} />
                            </>
                          )}
                        </motion.button>

                        <div className="otp-meta-actions">
                          <button
                            type="button"
                            onClick={() => { setStep(1); setErrorMsg(''); setOtp(['', '', '', '', '', '']); }}
                            className="btn-text-link"
                          >
                            ← Change Email Address
                          </button>

                          <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={resendTimer > 0}
                            className="btn-text-link resend"
                          >
                            {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend Code Now'}
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Guarantee */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '12px 14px',
              marginTop: '28px'
            }}>
              <Shield size={16} color="#16a34a" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>
                <strong style={{ color: '#0f172a' }}>Strict Data Privacy:</strong> Each author accesses only their own manuscripts &amp; authorized receipts.
              </span>
            </div>
          </motion.div>

          {/* Right Column: Portal Showcase */}
          <div className="auth-info-showcase">
            <div>
              <div style={{ marginBottom: '20px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: 'rgba(37, 99, 235, 0.1)',
                  color: '#2563eb',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  marginBottom: '10px'
                }}>
                  <Sparkles size={12} />
                  <span>AUTHOR SERVICES ECOSYSTEM</span>
                </span>
                <h3 style={{ fontSize: '19px', fontWeight: 900, color: '#0f172a', margin: '0 0 6px', letterSpacing: '-0.01em' }}>
                  Supporting Every Stage of Academic Publishing
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                  The ASR Author Paper Tracking Portal guarantees 100% transparent tracking, direct proof downloads, and real-time status alerts.
                </p>
              </div>

              {/* 4 Feature Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <TiltCard maxTilt={6} glowColor="rgba(16, 185, 129, 0.18)">
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px 14px', display: 'flex', gap: '12px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Layers size={18} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px' }}>End-to-End Paper Workflow</h4>
                      <p style={{ fontSize: '11.5px', color: '#64748b', margin: 0, lineHeight: 1.4 }}>
                        Track from manuscript formatting &amp; journal submission through revision cycles to final publication with DOI.
                      </p>
                    </div>
                  </div>
                </TiltCard>

                <TiltCard maxTilt={6} glowColor="rgba(37, 99, 235, 0.18)">
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px 14px', display: 'flex', gap: '12px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <FileCheck2 size={18} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px' }}>Official Document Downloads</h4>
                      <p style={{ fontSize: '11.5px', color: '#64748b', margin: 0, lineHeight: 1.4 }}>
                        Download signed submission confirmation proofs, acceptance letters, plagiarism reports, and proof-ready files.
                      </p>
                    </div>
                  </div>
                </TiltCard>

                <TiltCard maxTilt={6} glowColor="rgba(217, 119, 6, 0.18)">
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px 14px', display: 'flex', gap: '12px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Wallet size={18} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px' }}>Payment &amp; Account Invoices</h4>
                      <p style={{ fontSize: '11.5px', color: '#64748b', margin: 0, lineHeight: 1.4 }}>
                        View transaction receipts, verified payment status (Paid/Pending), and download GST-compliant official invoices.
                      </p>
                    </div>
                  </div>
                </TiltCard>

                <TiltCard maxTilt={6} glowColor="rgba(147, 51, 234, 0.18)">
                  <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px 14px', display: 'flex', gap: '12px' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#faf5ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <BellRing size={18} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', margin: '0 0 2px' }}>Automated Email &amp; WhatsApp Alerts</h4>
                      <p style={{ fontSize: '11.5px', color: '#64748b', margin: 0, lineHeight: 1.4 }}>
                        Instant notification whenever your paper status shifts: Review Received, Revision Required, or Accepted.
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>

            {/* Need Support Strip */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              padding: '12px 14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div>
                <strong style={{ fontSize: '12.5px', color: '#0f172a', display: 'block' }}>
                  Need Support with Paper ID?
                </strong>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  Reach our coordination team 24/7 on WhatsApp.
                </span>
              </div>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/919515207724?text=Hello%20ASR%20Support,%20I%20need%20help%20logging%20into%20my%20Author%20Portal" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#16a34a',
                  color: '#ffffff',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  padding: '8px 14px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                <MessageCircle size={14} />
                <span>Chat Support</span>
              </motion.a>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Login;
