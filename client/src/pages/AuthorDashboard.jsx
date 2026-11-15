import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PortalLayout from '../portal/PortalLayout';
import TiltCard from '../components/TiltCard';
import AnimatedCounter from '../components/AnimatedCounter';
import { api } from '../portal/apiService';
import {
  FileText,
  Clock,
  CheckCircle,
  Download,
  AlertCircle,
  ExternalLink,
  Shield,
  Layers,
  BookOpen,
  DollarSign,
  FileCheck,
  Send,
  ArrowRight,
  User,
  Sparkles,
  CreditCard,
  MessageSquare,
  Lock,
  ChevronRight,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import '../portal/PortalPages.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 350, damping: 25 }
  }
};

const AuthorDashboard = () => {
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch author's papers directly
  useEffect(() => {
    const session = localStorage.getItem('asr_author_user');
    if (session) {
      try {
        const user = JSON.parse(session);
        if (user.token) {
          api.getMyPapers(user.token).then((res) => {
            setLoading(false);
            if (res && res.success && res.papers && res.papers.length > 0) {
              setPapers(res.papers);
              setSelectedPaper(res.papers[0]);
            }
          });
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const handleDownload = (doc) => {
    const docName = doc.document_name || doc.name || 'Document.pdf';
    setDownloadSuccess(`Downloading "${docName}" with verified security token...`);
    if (doc.file_url) {
      window.open(doc.file_url, '_blank');
    }
    setTimeout(() => {
      setDownloadSuccess('');
    }, 3500);
  };

  return (
    <PortalLayout
      activeNav="dashboard"
      title={`My Research Manuscripts (${papers.length})`}
      subtitle="Real-time status updates, referee remarks, submission confirmations, and official acceptance letters."
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="portal-subpage-container"
      >

        {/* Data Privacy Status Pill */}
        <motion.div 
          variants={cardItemVariants}
          className="portal-privacy-notice-strip"
          style={{ backdropFilter: 'blur(8px)', background: 'rgba(240, 253, 244, 0.85)' }}
        >
          <Shield size={16} className="text-green" />
          <span>Strict Data Privacy: Access restricted solely to manuscripts explicitly linked to your verified credentials.</span>
        </motion.div>

        {/* Success Alert Banner */}
        <AnimatePresence>
          {downloadSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="portal-success-strip"
            >
              <CheckCircle size={18} />
              <span>{downloadSuccess}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zero State if no papers linked in DB */}
        {!loading && papers.length === 0 ? (
          <motion.div 
            variants={cardItemVariants}
            style={{ 
              background: '#fff', 
              borderRadius: '16px', 
              border: '1px solid #e2e8f0', 
              padding: '60px 24px', 
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{
              width: '64px',
              height: '64px',
              background: '#f1f5f9',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <FileText size={32} color="#94a3b8" />
            </div>
            <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0f172a' }}>No Manuscripts Linked to Your Verified Email</h3>
            <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '480px', margin: '8px auto 0', lineHeight: 1.5 }}>
              Your account currently has zero linked papers in the database. When the administration uploads or maps a manuscript to your email, it will appear here immediately.
            </p>
          </motion.div>
        ) : selectedPaper && (
          <>
            {/* Multi-Paper Interactive Switcher Tabs */}
            <motion.div 
              variants={cardItemVariants}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '14px', marginBottom: '8px' }}
            >
              {papers.map((paper) => {
                const isSelected = paper.id === selectedPaper.id;
                const isAccepted = paper.status?.includes('Accepted');
                const isRevision = paper.status?.includes('Revision');

                return (
                  <motion.button
                    key={paper.id}
                    whileHover={{ y: -3, boxShadow: '0 10px 25px rgba(37, 99, 235, 0.14)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPaper(paper)}
                    style={{
                      background: isSelected ? '#ffffff' : '#f8fafc',
                      border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '16px 20px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'border 0.2s ease, background 0.2s ease',
                      boxShadow: isSelected ? '0 8px 22px rgba(37, 99, 235, 0.12)' : '0 2px 6px rgba(0,0,0,0.02)',
                      position: 'relative'
                    }}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activePaperIndicator"
                        style={{
                          position: 'absolute',
                          top: -2,
                          left: '20px',
                          right: '20px',
                          height: '3px',
                          background: 'linear-gradient(90deg, #2563eb, #60a5fa)',
                          borderRadius: '3px 3px 0 0'
                        }}
                      />
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{
                        fontFamily: 'monospace',
                        fontSize: '11.5px',
                        fontWeight: 800,
                        color: isSelected ? '#1d4ed8' : '#475569',
                        background: isSelected ? '#eff6ff' : '#e2e8f0',
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}>
                        {paper.id}
                      </span>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: '12px',
                        background: isAccepted ? '#dcfce7' : isRevision ? '#fef3c7' : '#eff6ff',
                        color: isAccepted ? '#15803d' : isRevision ? '#b45309' : '#1d4ed8'
                      }}>
                        Stage {paper.stage_number || 5}: {paper.status}
                      </span>
                    </div>

                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: isSelected ? '#0f172a' : '#334155',
                      lineHeight: '1.4',
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {paper.title}
                    </h4>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Main Interactive Grid: Paper Overview + Right Sidebar Proofs/Billing */}
            <div className="portal-details-grid">

              {/* Left Column: Comprehensive Paper Details */}
              <div className="portal-specs-column">

                {/* Primary Overview Card */}
                <motion.div 
                  variants={cardItemVariants}
                  whileHover={{ boxShadow: '0 12px 28px rgba(0,0,0,0.06)' }}
                  className="portal-content-card"
                  style={{ transition: 'box-shadow 0.25s ease' }}
                >
                  <div className="card-top-header">
                    <div>
                      <span className="meta-category-badge">MANUSCRIPT OVERVIEW</span>
                      <h2 className="paper-hero-heading">{selectedPaper.title}</h2>
                      <span className="sub-journal-tag">
                        {selectedPaper.target_journal} ({selectedPaper.id})
                      </span>
                    </div>
                    <span style={{
                      background: selectedPaper.status?.includes('Accepted') ? '#dcfce7' : selectedPaper.status?.includes('Revision') ? '#fef3c7' : '#eff6ff',
                      color: selectedPaper.status?.includes('Accepted') ? '#15803d' : selectedPaper.status?.includes('Revision') ? '#b45309' : '#1d4ed8',
                      fontWeight: 800,
                      fontSize: '12px',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      whiteSpace: 'nowrap'
                    }}>
                      Stage {selectedPaper.stage_number || 5}: {selectedPaper.status}
                    </span>
                  </div>

                  {/* 2x2 Specs Grid with 3D Spotlight Tilt Cards */}
                  <div className="grid-two-by-two">
                    <TiltCard maxTilt={8} glowColor="rgba(37, 99, 235, 0.15)">
                      <div className="spec-tile" style={{ height: '100%', margin: 0 }}>
                        <div className="spec-icon-box blue"><BookOpen size={18} /></div>
                        <div>
                          <span className="spec-mini-label">Target Journal</span>
                          <strong className="spec-main-val">{selectedPaper.target_journal}</strong>
                          <span className="spec-sub-val">{selectedPaper.indexing_tier}</span>
                        </div>
                      </div>
                    </TiltCard>

                    <TiltCard maxTilt={8} glowColor="rgba(22, 163, 74, 0.15)">
                      <div className="spec-tile" style={{ height: '100%', margin: 0 }}>
                        <div className="spec-icon-box green"><User size={18} /></div>
                        <div>
                          <span className="spec-mini-label">Author Positions</span>
                          <strong className="spec-main-val">{selectedPaper.author_positions || 'Mapped Co-Author'}</strong>
                          <span className="spec-sub-val">Secured 2FA correspondence link</span>
                        </div>
                      </div>
                    </TiltCard>

                    <TiltCard maxTilt={8} glowColor="rgba(217, 119, 6, 0.15)">
                      <div className="spec-tile" style={{ height: '100%', margin: 0 }}>
                        <div className="spec-icon-box amber"><Sparkles size={18} /></div>
                        <div>
                          <span className="spec-mini-label">Assigned Coordinator</span>
                          <strong className="spec-main-val">{selectedPaper.assigned_coordinator || 'Dr. Rajesh K. (Senior Publication Lead)'}</strong>
                          <span className="spec-sub-val">Dept: {selectedPaper.assigned_department || 'Publication Cell'}</span>
                        </div>
                      </div>
                    </TiltCard>

                    <TiltCard maxTilt={8} glowColor="rgba(147, 51, 234, 0.15)">
                      <div className="spec-tile" style={{ height: '100%', margin: 0 }}>
                        <div className="spec-icon-box purple"><Clock size={18} /></div>
                        <div>
                          <span className="spec-mini-label">Submission &amp; Milestone Date</span>
                          <strong className="spec-main-val">
                            {selectedPaper.submission_date ? selectedPaper.submission_date.split('T')[0] : 'Recent'}
                          </strong>
                          <span className="spec-sub-val">
                            Expected Decision: {selectedPaper.expected_decision_date ? selectedPaper.expected_decision_date.split('T')[0] : 'Under review'}
                          </span>
                        </div>
                      </div>
                    </TiltCard>
                  </div>

                  {/* Status Summary & Next Action Banner */}
                  <div className="portal-action-alert">
                    <AlertCircle size={20} className="alert-accent-icon" />
                    <div>
                      <strong>Status Summary &amp; Next Action</strong>
                      <p>{selectedPaper.next_step_action || `Manuscript is active at Stage ${selectedPaper.stage_number || 5}: ${selectedPaper.status}.`}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Progress Stepper (Workflow Stages) */}
                <motion.div 
                  variants={cardItemVariants}
                  className="portal-content-card" 
                  style={{ marginTop: '20px' }}
                >
                  <div className="card-top-header" style={{ marginBottom: '18px', paddingBottom: '14px' }}>
                    <div>
                      <span className="meta-category-badge">LIVE TRACKING PROGRESSION</span>
                      <h3 style={{ fontSize: '17px', fontWeight: 800, margin: 0, color: '#0b1a30' }}>
                        Publication Milestone Stepper
                      </h3>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb', background: '#eff6ff', padding: '4px 10px', borderRadius: '12px' }}>
                      Stage {selectedPaper.stage_number || 5} of 10 Completed
                    </span>
                  </div>

                  {/* Visual Stepper */}
                  <div className="milestone-stepper-scroll-wrap">
                    <div className="milestone-stepper-grid">
                      {[
                        { num: 1, name: 'Registered' },
                        { num: 3, name: 'Plagiarism' },
                        { num: 4, name: 'Submitted' },
                        { num: 5, name: 'Under Review' },
                        { num: 6, name: 'Revision' },
                        { num: 8, name: 'Accepted' },
                        { num: 10, name: 'Published' }
                      ].map((step, idx) => {
                        const isComplete = (selectedPaper.stage_number || 5) >= step.num;
                        const isCurrent = (selectedPaper.stage_number || 5) === step.num;
                        return (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            style={{
                              textAlign: 'center',
                              padding: '10px 4px',
                              borderRadius: '8px',
                              background: isCurrent ? '#eff6ff' : isComplete ? '#f0fdf4' : '#f8fafc',
                              border: isCurrent ? '1.5px solid #2563eb' : isComplete ? '1px solid #bbf7d0' : '1px solid #e2e8f0',
                              position: 'relative',
                              cursor: 'default'
                            }}
                          >
                            {isCurrent && (
                              <span style={{
                                position: 'absolute',
                                top: '-6px',
                                right: '-6px',
                                width: '10px',
                                height: '10px',
                                background: '#2563eb',
                                borderRadius: '50%',
                                boxShadow: '0 0 0 3px rgba(37,99,235,0.25)'
                              }} />
                            )}
                            <div style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              margin: '0 auto 6px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '11px',
                              fontWeight: 800,
                              background: isCurrent ? '#2563eb' : isComplete ? '#16a34a' : '#cbd5e1',
                              color: '#ffffff'
                            }}>
                              {isComplete ? <CheckCircle size={14} /> : step.num}
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: isCurrent ? 800 : 600, color: isCurrent ? '#1d4ed8' : '#334155', display: 'block' }}>
                              {step.name}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Direct Coordinator Assistance Banner */}
                <motion.div 
                  variants={cardItemVariants}
                  className="portal-content-card coordinator-banner-card"
                >
                  <div className="coordinator-info-wrap">
                    <div className="coordinator-avatar">
                      <User size={24} />
                    </div>
                    <div>
                      <h3>Assigned ASR Publication Coordinator</h3>
                      <p>
                        Direct academic support line. Connect with <strong>{selectedPaper.assigned_coordinator || 'Dr. Rajesh K.'}</strong> for referee remarks or proof corrections.
                      </p>
                    </div>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={`https://wa.me/919515207724?text=Hello%20ASR%20Coordinator,%20inquiring%20about%20my%20paper%20${selectedPaper.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-coordinator"
                  >
                    Chat on WhatsApp
                  </motion.a>
                </motion.div>

              </div>

              {/* Right Column: Submission Proofs & Account Summary */}
              <div className="portal-notes-column">

                {/* Submission Proofs Card */}
                <motion.div 
                  variants={cardItemVariants}
                  className="portal-content-card"
                >
                  <div className="card-top-header" style={{ marginBottom: '16px', paddingBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Download size={18} color="#2563eb" />
                      <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#0b1a30' }}>
                        Submission Proofs &amp; Documents
                      </h3>
                    </div>
                  </div>

                  <p style={{ fontSize: '12.5px', color: '#64748b', margin: '0 0 16px', lineHeight: '1.4' }}>
                    Verified, cryptographic proofs authorized by administration for author download:
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {selectedPaper.documents && selectedPaper.documents.length > 0 ? (
                      selectedPaper.documents.map((doc, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.02, background: '#eff6ff', borderColor: '#bfdbfe' }}
                          style={{
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            padding: '12px 14px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ overflow: 'hidden', paddingRight: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                              <span style={{ fontSize: '10px', fontWeight: 800, background: '#eff6ff', color: '#2563eb', padding: '1px 5px', borderRadius: '4px' }}>
                                {doc.document_category || 'Proof'}
                              </span>
                              <span style={{ fontSize: '11px', color: '#94a3b8' }}>{doc.file_size || '1.2 MB'}</span>
                            </div>
                            <strong style={{ fontSize: '12.5px', color: '#0f172a', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {doc.document_name || doc.name}
                            </strong>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDownload(doc)}
                            style={{
                              background: '#2563eb',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '6px',
                              padding: '7px 10px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                            title="Download verified proof"
                          >
                            <Download size={14} />
                          </motion.button>
                        </motion.div>
                      ))
                    ) : (
                      <div style={{ textAlign: 'center', padding: '24px 10px', color: '#94a3b8', fontSize: '13px' }}>
                        No files uploaded by admin yet for this manuscript.
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Financial Ledger Mini-Card (Individual Isolated Fee) */}
                {selectedPaper.payment && (
                  <motion.div 
                    variants={cardItemVariants}
                    className="portal-content-card" 
                    style={{ marginTop: '20px' }}
                  >
                    <div className="card-top-header" style={{ marginBottom: '14px', paddingBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <DollarSign size={18} color="#16a34a" />
                        <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                          My Fee &amp; Payment Summary
                        </h3>
                      </div>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 800,
                        background: selectedPaper.payment.payment_status === 'Paid' ? '#dcfce7' : selectedPaper.payment.payment_status === 'Partial' ? '#fef3c7' : '#fee2e2',
                        color: selectedPaper.payment.payment_status === 'Paid' ? '#15803d' : selectedPaper.payment.payment_status === 'Partial' ? '#b45309' : '#991b1b'
                      }}>
                        {selectedPaper.payment.payment_status}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ color: '#64748b' }}>Total Share</span>
                        <strong><AnimatedCounter value={selectedPaper.payment.total_amount} prefix="₹" /></strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ color: '#64748b' }}>Advance Paid</span>
                        <strong style={{ color: '#16a34a' }}><AnimatedCounter value={selectedPaper.payment.amount_paid} prefix="₹" /></strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                        <span style={{ color: '#64748b' }}>Pending Amount</span>
                        <strong style={{ color: (Number(selectedPaper.payment.total_amount) - Number(selectedPaper.payment.amount_paid)) > 0 ? '#dc2626' : '#16a34a' }}>
                          <AnimatedCounter value={Number(selectedPaper.payment.total_amount) - Number(selectedPaper.payment.amount_paid)} prefix="₹" />
                        </strong>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/author-portal/payments"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          marginTop: '14px',
                          padding: '9px',
                          borderRadius: '8px',
                          background: '#f8fafc',
                          border: '1px solid #cbd5e1',
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#2563eb',
                          textDecoration: 'none'
                        }}
                      >
                        <span>View Invoices &amp; Bank Details</span>
                        <ChevronRight size={14} />
                      </Link>
                    </motion.div>
                  </motion.div>
                )}

              </div>

            </div>
          </>
        )}

      </motion.div>
    </PortalLayout>
  );
};

export default AuthorDashboard;
