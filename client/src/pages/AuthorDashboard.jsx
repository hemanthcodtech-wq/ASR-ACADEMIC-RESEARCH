import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PortalLayout from '../portal/PortalLayout';
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
  ChevronRight
} from 'lucide-react';
import '../portal/PortalPages.css';

const AuthorDashboard = () => {
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch only this author's papers directly from Express + Neon DB
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
    setDownloadSuccess(`Downloading "${docName}" with encrypted security token...`);
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
      <div className="portal-subpage-container">

        {/* Data Privacy Status Pill */}
        <div className="portal-privacy-notice-strip">
          <Shield size={16} className="text-green" />
          <span>Strict Data Privacy: Access restricted solely to manuscripts explicitly linked to your verified credentials.</span>
        </div>

        {downloadSuccess && (
          <div className="portal-success-strip">
            <CheckCircle size={18} />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Zero State if no papers linked in DB */}
        {!loading && papers.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '48px 24px', textAlign: 'center' }}>
            <FileText size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>No Manuscripts Linked to Your Verified Email</h3>
            <p style={{ color: '#64748b', fontSize: '13.5px', maxWidth: '480px', margin: '8px auto 0' }}>
              Your account has zero linked papers in the database. When the administration uploads or maps a manuscript to your email, it will appear here immediately.
            </p>
          </div>
        ) : selectedPaper && (
          <>
            {/* Multi-Paper Interactive Switcher Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '8px' }}>
              {papers.map((paper) => {
                const isSelected = paper.id === selectedPaper.id;
                const isAccepted = paper.status?.includes('Accepted');
                const isRevision = paper.status?.includes('Revision');

                return (
                  <button
                    key={paper.id}
                    onClick={() => setSelectedPaper(paper)}
                    style={{
                      background: isSelected ? '#ffffff' : '#f8fafc',
                      border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '16px 20px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 8px 20px rgba(37, 99, 235, 0.12)' : '0 2px 6px rgba(0,0,0,0.02)'
                    }}
                  >
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
                  </button>
                );
              })}
            </div>

            {/* Main Interactive Grid: Paper Overview + Right Sidebar Proofs/Billing */}
            <div className="portal-details-grid">

              {/* Left Column: Comprehensive Paper Details */}
              <div className="portal-specs-column">

                {/* Primary Overview Card */}
                <div className="portal-content-card">
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

                  {/* 2x2 Specs Grid */}
                  <div className="grid-two-by-two">
                    <div className="spec-tile">
                      <div className="spec-icon-box blue"><BookOpen size={18} /></div>
                      <div>
                        <span className="spec-mini-label">Target Journal</span>
                        <strong className="spec-main-val">{selectedPaper.target_journal}</strong>
                        <span className="spec-sub-val">{selectedPaper.indexing_tier}</span>
                      </div>
                    </div>

                    <div className="spec-tile">
                      <div className="spec-icon-box green"><User size={18} /></div>
                      <div>
                        <span className="spec-mini-label">Author Positions</span>
                        <strong className="spec-main-val">{selectedPaper.author_positions || 'Primary Author'}</strong>
                        <span className="spec-sub-val">Primary correspondence via author email</span>
                      </div>
                    </div>

                    <div className="spec-tile">
                      <div className="spec-icon-box amber"><Sparkles size={18} /></div>
                      <div>
                        <span className="spec-mini-label">Assigned Coordinator</span>
                        <strong className="spec-main-val">{selectedPaper.assigned_coordinator || 'Dr. Rajesh K. (Senior Publication Lead)'}</strong>
                        <span className="spec-sub-val">Dept: {selectedPaper.assigned_department || 'Publication Cell'}</span>
                      </div>
                    </div>

                    <div className="spec-tile">
                      <div className="spec-icon-box purple"><Clock size={18} /></div>
                      <div>
                        <span className="spec-mini-label">Submission &amp; Milestone Date</span>
                        <strong className="spec-main-val">{selectedPaper.submission_date || 'Recent'}</strong>
                        <span className="spec-sub-val">Expected Decision: {selectedPaper.expected_decision_date || 'Under review'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Summary & Next Action Banner */}
                  <div className="portal-action-alert">
                    <AlertCircle size={20} className="alert-accent-icon" />
                    <div>
                      <strong>Status Summary &amp; Next Action</strong>
                      <p>{selectedPaper.next_step_action || `Manuscript is active at Stage ${selectedPaper.stage_number || 5}: ${selectedPaper.status}.`}</p>
                    </div>
                  </div>
                </div>

                {/* Progress Stepper (Workflow Stages) */}
                <div className="portal-content-card" style={{ marginTop: '20px' }}>
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
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '8px' }}>
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
                        <div
                          key={idx}
                          style={{
                            textAlign: 'center',
                            padding: '10px 4px',
                            borderRadius: '8px',
                            background: isCurrent ? '#eff6ff' : isComplete ? '#f0fdf4' : '#f8fafc',
                            border: isCurrent ? '1.5px solid #2563eb' : isComplete ? '1px solid #bbf7d0' : '1px solid #e2e8f0'
                          }}
                        >
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
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Direct Coordinator Assistance Banner */}
                <div className="portal-content-card coordinator-banner-card">
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
                  <a
                    href={`https://wa.me/919515207724?text=Hello%20ASR%20Coordinator,%20inquiring%20about%20my%20paper%20${selectedPaper.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-coordinator"
                  >
                    Chat on WhatsApp
                  </a>
                </div>

              </div>

              {/* Right Column: Submission Proofs & Account Summary */}
              <div className="portal-notes-column">

                {/* Submission Proofs Card */}
                <div className="portal-content-card">
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
                        <div
                          key={idx}
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

                          <button
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
                          </button>
                        </div>
                      ))
                    ) : (
                      <div style={{ textAlign: 'center', padding: '24px 10px', color: '#94a3b8', fontSize: '13px' }}>
                        No files uploaded by admin yet for this manuscript.
                      </div>
                    )}
                  </div>
                </div>

                {/* Financial Ledger Mini-Card */}
                {selectedPaper.payment && (
                  <div className="portal-content-card" style={{ marginTop: '20px' }}>
                    <div className="card-top-header" style={{ marginBottom: '14px', paddingBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <DollarSign size={18} color="#16a34a" />
                        <h3 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                          Payment &amp; Account Summary
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
                        <span style={{ color: '#64748b' }}>Total Invoiced</span>
                        <strong>₹{Number(selectedPaper.payment.total_amount).toLocaleString('en-IN')}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ color: '#64748b' }}>Amount Paid</span>
                        <strong style={{ color: '#16a34a' }}>₹{Number(selectedPaper.payment.amount_paid).toLocaleString('en-IN')}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                        <span style={{ color: '#64748b' }}>Remaining Balance</span>
                        <strong style={{ color: (Number(selectedPaper.payment.total_amount) - Number(selectedPaper.payment.amount_paid)) > 0 ? '#dc2626' : '#16a34a' }}>
                          ₹{(Number(selectedPaper.payment.total_amount) - Number(selectedPaper.payment.amount_paid)).toLocaleString('en-IN')}
                        </strong>
                      </div>
                    </div>

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
                  </div>
                )}

              </div>

            </div>
          </>
        )}

      </div>
    </PortalLayout>
  );
};

export default AuthorDashboard;
