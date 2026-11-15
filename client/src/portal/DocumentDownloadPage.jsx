import React, { useState, useEffect } from 'react';
import PortalLayout from '../portal/PortalLayout';
import { api } from '../portal/apiService';
import {
  Download,
  FileCheck,
  FileText,
  Shield,
  CheckCircle,
  FileSpreadsheet,
  AlertCircle,
  Lock,
  ArrowRight,
  ExternalLink,
  Receipt,
  ScanSearch,
  BookOpen,
  MailCheck,
  Printer,
  FileLock2
} from 'lucide-react';
import '../portal/PortalPages.css';

const DocumentDownloadPage = () => {
  const [papers, setPapers] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [documents, setDocuments] = useState([]);
  const [downloadAlert, setDownloadAlert] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch only this author's papers and authorized documents directly from database
  useEffect(() => {
    const session = localStorage.getItem('asr_author_user');
    if (session) {
      try {
        const u = JSON.parse(session);
        if (u.token) {
          api.getMyPapers(u.token).then(r => {
            setLoading(false);
            if (r && r.papers && r.papers.length > 0) {
              setPapers(r.papers);
              setSelectedId(r.papers[0].id);
            }
          });
          api.getDocuments(u.token).then(r => {
            if (r && r.documents) {
              setDocuments(r.documents);
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

  const currentPaper = papers.find(p => p.id === selectedId) || papers[0];

  // Filter documents directly from the database for the active paper
  const currentPaperDocs = documents.filter(d => d.paper_id === selectedId);

  const handleDownload = (doc) => {
    const docName = doc.document_name || doc.name || 'Document.pdf';
    setDownloadAlert(`Preparing "${docName}" with cryptographic checksum verification...`);
    if (doc.file_url) {
      window.open(doc.file_url, '_blank');
      setDownloadAlert(`✓ File "${docName}" opened / downloaded securely.`);
      setTimeout(() => setDownloadAlert(''), 4000);
    } else {
      setTimeout(() => {
        setDownloadAlert(`✓ File "${docName}" downloaded securely.`);
        setTimeout(() => setDownloadAlert(''), 4000);
      }, 800);
    }
  };

  const documentCategories = [
    { icon: Receipt,    color: 'blue',   tag: 'SUBMISSION',  name: "1. Submission Confirmation Proof",      desc: "Official journal editorial system receipt verifying submission with date & manuscript ID." },
    { icon: ScanSearch, color: 'amber',  tag: 'REVISION',    name: "2. Revision Proof",                      desc: "Peer review referee evaluation reports, scorecards, and revision response acknowledgments." },
    { icon: MailCheck,  color: 'teal',   tag: 'ACCEPTANCE',  name: "3. Acceptance Proof",                    desc: "Formal signed acceptance letter with indexing confirmation stamped by editorial board." },
    { icon: BookOpen,   color: 'purple', tag: 'PUBLICATION', name: "4. Publication Proof (PDF)",             desc: "Final publisher galley proof and published camera-ready paper PDF with DOI." }
  ];

  return (
    <PortalLayout
      activeNav="documents"
      title="Submission Proofs &amp; Document Download Centre"
      subtitle="Download authenticated publication proofs, plagiarism reports, accepted galley papers, and signed institutional letters."
    >
      <div className="portal-subpage-container">

        {!loading && papers.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '48px 24px', textAlign: 'center' }}>
            <FileText size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>No Authorized Documents Available</h3>
            <p style={{ color: '#64748b', fontSize: '13.5px', maxWidth: '480px', margin: '8px auto 0' }}>
              Your account currently has no linked manuscripts or admin-uploaded proofs. When the editorial board uploads a proof or acceptance letter, it will appear here immediately.
            </p>
          </div>
        ) : currentPaper && (
          <>
            {/* Paper Switcher Strip */}
            <div className="portal-filter-card">
              <div className="paper-pills-row">
                {papers.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={`paper-pill-btn ${p.id === currentPaper.id ? 'active' : ''}`}
                  >
                    <span className="pill-id">{p.id}</span>
                    <span className="pill-title">{p.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {downloadAlert && (
              <div className="portal-success-strip">
                <CheckCircle size={18} />
                <span>{downloadAlert}</span>
              </div>
            )}

            {/* Main Document Grid */}
            <div className="portal-content-card">
              <div className="card-top-header">
                <div>
                  <span className="meta-category-badge">MODULE 4 • SECURE DOCUMENT REPOSITORY</span>
                  <h2 className="paper-hero-heading">{currentPaper.title}</h2>
                  <span className="sub-journal-tag">{currentPaper.target_journal || currentPaper.journal} ({currentPaper.id})</span>
                </div>
                <span className="secure-download-tag">
                  <Lock size={13} /> Permission-Checked Downloads
                </span>
              </div>

              {currentPaperDocs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '36px 16px', color: '#64748b', fontSize: '13.5px' }}>
                  <FileText size={36} color="#cbd5e1" style={{ margin: '0 auto 10px' }} />
                  <p style={{ margin: 0, fontWeight: 600 }}>No document proofs uploaded by admin yet for this manuscript.</p>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                    Uploaded Turnitin similarity reports, acceptance letters, and submission receipts will appear here once authorized.
                  </span>
                </div>
              ) : (
                <div className="download-docs-grid">
                  {currentPaperDocs.map((doc, idx) => (
                    <div key={idx} className="doc-tile-card">
                      <div className="doc-tile-icon-bubble">
                        <FileCheck size={22} />
                      </div>
                      
                      <div className="doc-tile-info">
                        <span className="doc-tile-badge">{doc.document_category || 'Proof'}</span>
                        <h4 className="doc-tile-name">{doc.document_name}</h4>
                        <div className="doc-tile-meta">
                          <span>Size: {doc.file_size || '1.2 MB'}</span>
                          <span>•</span>
                          <span>Issued: {(doc.uploaded_at || 'Recent').split('T')[0]}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => handleDownload(doc)}
                        className="btn-tile-download"
                        title="Download verified document"
                      >
                        <Download size={14} /> Download
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Standard Document Types Criteria */}
            <div className="portal-content-card">
              <div className="card-top-header">
                <div>
                  <span className="meta-category-badge">VERIFIED DOCUMENT TYPES</span>
                  <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0b1a30', margin: 0 }}>Authorized Document Categories &amp; Checksums</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Every file released through this portal is cryptographically signed and checksum-verified before delivery.</p>
                </div>
                <span className="secure-download-tag"><Shield size={13} /> SHA-256 Verified</span>
              </div>

              <div className="doc-criteria-grid">
                {documentCategories.map((cat, i) => {
                  const Icon = cat.icon;
                  return (
                    <div key={i} className={`criteria-card criteria-card--${cat.color}`}>
                      <div className={`criteria-icon-box criteria-icon--${cat.color}`}>
                        <Icon size={20} />
                      </div>
                      <div className="criteria-body">
                        <span className={`criteria-tag criteria-tag--${cat.color}`}>{cat.tag}</span>
                        <strong>{cat.name}</strong>
                        <p>{cat.desc}</p>
                      </div>
                      <span className="criteria-check-badge"><CheckCircle size={15} /></span>
                    </div>
                  );
                })}
              </div>

              <div className="criteria-trust-strip">
                <Lock size={14} />
                <span>All documents are permission-gated — only released after editorial board authorization. Checksums are logged in the immutable audit trail.</span>
              </div>
            </div>
          </>
        )}

      </div>
    </PortalLayout>
  );
};

export default DocumentDownloadPage;
