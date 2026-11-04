import React, { useState, useEffect } from 'react';
import PortalLayout from '../portal/PortalLayout';
import { api } from '../portal/apiService';
import {
  Layers,
  CheckCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileText,
  AlertTriangle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import '../portal/PortalPages.css';

const WorkflowFlowPage = () => {
  const [papers, setPapers] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [loading, setLoading] = useState(true);

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

  // 10 Standard Stages from diagram Module 8
  const masterStages = [
    { num: 1, key: "reg", title: "1. Paper Registered & Intake", desc: "Manuscript received, initial scope check & metadata logged." },
    { num: 2, key: "prep", title: "2. Manuscript Preparation", desc: "Proofreading, referencing, technical formatting to author guidelines." },
    { num: 3, key: "rev", title: "3. Internal Review & Plagiarism Check", desc: "Turnitin audit threshold verification (< 10%) & AI-balance." },
    { num: 4, key: "sub", title: "4. Journal Submission with Proof", desc: "Official journal portal submission & generation of confirmation receipt." },
    { num: 5, key: "under_review", title: "5. Under Peer Review", desc: "Subject matter experts evaluate technical novelty and experiments." },
    { num: 6, key: "rev_req", title: "6. Revision Requested (If Applicable)", desc: "Peer reviewers' feedback compiled with point-by-point rebuttal strategy." },
    { num: 7, key: "rev_sub", title: "7. Revision Submitted", desc: "Revised manuscript and response letter submitted for final clearance." },
    { num: 8, key: "decision", title: "8. Editorial Decision", desc: "Associate editor and editor-in-chief finalize publication determination." },
    { num: 9, key: "accepted", title: "9. Accepted (with Acceptance Proof)", desc: "Formal acceptance letter issued with Elsevier/Springer seal." },
    { num: 10, key: "published", title: "10. Production, DOI & Online Publication", desc: "Galley proofs approved, volume assigned, and live indexing verified." }
  ];

  return (
    <PortalLayout
      activeNav="workflow"
      title="Paper Workflow (Status Flow)"
      subtitle="Complete chronological progression from manuscript registration to final indexing with digital proof validation."
    >
      <div className="portal-subpage-container">
        
        {!loading && papers.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '48px 24px', textAlign: 'center' }}>
            <Layers size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>No Active Workflow Tracks</h3>
            <p style={{ color: '#64748b', fontSize: '13.5px', maxWidth: '480px', margin: '8px auto 0' }}>
              You do not have any papers registered under your author account yet. When a paper is registered, its 10-step workflow will appear here.
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

            {/* Workflow Card Header */}
            <div className="portal-content-card" style={{ marginBottom: '24px' }}>
              <div className="card-top-header">
                <div>
                  <span className="meta-category-badge">MODULE 8 • PAPER WORKFLOW STATUS</span>
                  <h2 className="paper-hero-heading">{currentPaper.title}</h2>
                  <span className="spec-sub-val" style={{ display: 'block', marginTop: '4px' }}>
                    Tracking ID: <strong>{currentPaper.id}</strong> • Target: <strong>{currentPaper.target_journal}</strong>
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    background: currentPaper.status?.includes('Accepted') ? '#dcfce7' : currentPaper.status?.includes('Revision') ? '#fef3c7' : '#eff6ff',
                    color: currentPaper.status?.includes('Accepted') ? '#15803d' : currentPaper.status?.includes('Revision') ? '#b45309' : '#1d4ed8',
                    fontWeight: 800,
                    fontSize: '12.5px',
                    padding: '6px 14px',
                    borderRadius: '20px'
                  }}>
                    Stage {currentPaper.stage_number || 5} of 10: {currentPaper.status}
                  </span>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                    Updated by ASR Editorial Cell
                  </div>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '10px', border: '1px solid #e2e8f0', marginTop: '16px' }}>
                <strong style={{ fontSize: '12.5px', color: '#0f172a', display: 'block', marginBottom: '4px' }}>Latest Action Remark:</strong>
                <p style={{ margin: 0, fontSize: '13.5px', color: '#334155', lineHeight: '1.5' }}>
                  {currentPaper.next_step_action || `Manuscript is active at Stage ${currentPaper.stage_number || 5}: ${currentPaper.status}.`}
                </p>
              </div>
            </div>

            {/* 10-Stage Milestone Grid */}
            <div className="portal-content-card">
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '18px' }}>
                Ten-Stage Journal Progression Matrix
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {masterStages.map((stage) => {
                  const currentNum = currentPaper.stage_number || 5;
                  const isDone = currentNum > stage.num;
                  const isCurrent = currentNum === stage.num;

                  return (
                    <div
                      key={stage.num}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '14px 18px',
                        borderRadius: '10px',
                        border: isCurrent ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        background: isCurrent ? '#eff6ff' : isDone ? '#f0fdf4' : '#ffffff'
                      }}
                    >
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '13px',
                        flexShrink: 0,
                        background: isCurrent ? '#2563eb' : isDone ? '#16a34a' : '#f1f5f9',
                        color: isCurrent || isDone ? '#ffffff' : '#64748b'
                      }}>
                        {isDone ? <CheckCircle size={16} /> : stage.num}
                      </div>

                      <div style={{ flexGrow: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '14px', color: isCurrent ? '#1e40af' : '#0f172a' }}>
                          {stage.title}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                          {stage.desc}
                        </div>
                      </div>

                      <div style={{ flexShrink: 0 }}>
                        {isCurrent && (
                          <span style={{ background: '#2563eb', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
                            ACTIVE STAGE
                          </span>
                        )}
                        {isDone && (
                          <span style={{ color: '#16a34a', fontSize: '12px', fontWeight: 700 }}>
                            ✓ Completed
                          </span>
                        )}
                        {!isCurrent && !isDone && (
                          <span style={{ color: '#94a3b8', fontSize: '12px' }}>
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

      </div>
    </PortalLayout>
  );
};

export default WorkflowFlowPage;
