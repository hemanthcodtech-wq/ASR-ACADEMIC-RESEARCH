import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { api } from '../portal/apiService';
import { FileText, Search, CheckCircle, Upload, Eye, Clock, UserCheck, AlertCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminPapers = () => {
  const [papers, setPapers] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [search, setSearch] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const getAuthToken = () => {
    try {
      const s = localStorage.getItem('asr_author_user');
      return s ? JSON.parse(s).token : null;
    } catch {
      return null;
    }
  };

  const loadData = () => {
    const token = getAuthToken();
    if (token) {
      api.getAllPapersForAdmin(token).then(r => r && r.papers && setPapers(r.papers));
      api.getStaffCoordinators(token).then(r => r && r.coordinators && setCoordinators(r.coordinators));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStageChange = async (paperId, stageNum, stageName) => {
    const token = getAuthToken();
    const res = await api.updatePaperStatus(token, paperId, {
      stage_number: stageNum,
      status: stageName,
      next_step_action: `Progressed to Stage ${stageNum}: ${stageName}. Notification email dispatched.`
    });

    if (res && res.success) {
      setPapers(prev => prev.map(p => p.id === paperId ? { ...p, stage_number: stageNum, status: stageName } : p));
      setSuccessMsg(`Paper ${paperId} updated to Stage ${stageNum} (${stageName})! An automatic notification has been sent.`);
      setTimeout(() => setSuccessMsg(''), 4500);
    }
  };

  const handleAssignCoordinator = async (paperId, coordName, dept) => {
    const token = getAuthToken();
    const res = await api.assignCoordinator(token, paperId, {
      coordinator_name: coordName,
      department: dept
    });

    if (res && res.success) {
      setPapers(prev => prev.map(p => p.id === paperId ? { ...p, assigned_coordinator: coordName, assigned_department: dept } : p));
      setSuccessMsg(`Assigned ${coordName} to handle ${paperId}!`);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  const filtered = papers.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.id?.toLowerCase().includes(search.toLowerCase()) ||
    p.primary_author_email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout
      activeNav="papers"
      title="Manuscripts &amp; Status Lifecycle"
      subtitle="Full control to advance stages 1-10, assign coordinators, and manage paper progression proofs."
    >
      <div className="portal-subpage-container">

        {successMsg && (
          <div className="portal-success-strip" style={{ marginBottom: '20px' }}>
            <CheckCircle size={18} color="#16a34a" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Action Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ position: 'relative', minWidth: '320px', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search by manuscript title, paper ID, or author email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '9px 12px 9px 38px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
            />
          </div>

          <Link
            to="/admin/new-paper"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#2563eb',
              color: '#fff',
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13px',
              textDecoration: 'none'
            }}
          >
            <TrendingUp size={16} />
            <span>+ Register New Paper</span>
          </Link>
        </div>

        {/* Manuscripts Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {filtered.map((paper) => (
            <div
              key={paper.id}
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <span style={{ background: '#eff6ff', color: '#2563eb', fontSize: '11.5px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>
                    {paper.id}
                  </span>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: '8px 0 6px' }}>
                    {paper.title}
                  </h3>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>
                    Target: <strong style={{ color: '#1e293b' }}>{paper.target_journal}</strong> ({paper.indexing_tier})
                    &nbsp;•&nbsp; Primary Author: <strong style={{ color: '#2563eb' }}>{paper.primary_author_email}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Link
                    to={`/admin/proofs?paper_id=${paper.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: '#ecfdf5',
                      color: '#059669',
                      border: '1px solid #a7f3d0',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    <Upload size={14} />
                    <span>Upload Proofs / PDF</span>
                  </Link>

                  <span style={{
                    background: paper.status?.includes('Accepted') ? '#dcfce7' : paper.status?.includes('Revision') ? '#fef3c7' : '#eff6ff',
                    color: paper.status?.includes('Accepted') ? '#15803d' : paper.status?.includes('Revision') ? '#b45309' : '#1d4ed8',
                    fontWeight: 800,
                    fontSize: '12px',
                    padding: '5px 12px',
                    borderRadius: '20px'
                  }}>
                    Stage {paper.stage_number || 5}: {paper.status}
                  </span>
                </div>
              </div>

              {/* Operational Control Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Assigned Coordinator (Who Handles Paper)
                  </label>
                  <select
                    value={paper.assigned_coordinator || ''}
                    onChange={(e) => handleAssignCoordinator(paper.id, e.target.value, paper.assigned_department)}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff' }}
                  >
                    <option value="Dr. Rajesh K. (Senior Publication Lead)">Dr. Rajesh K. (Senior Publication Lead)</option>
                    <option value="Ms. S. Ananya (Post-Acceptance Coordinator)">Ms. S. Ananya (Post-Acceptance Coordinator)</option>
                    <option value="Dr. Vikramaditya M. (Senior Peer Review Editor)">Dr. Vikramaditya M. (Senior Peer Review Editor)</option>
                    <option value="Dr. Shalini Prasad (Journal Indexing & Scopus Liaison)">Dr. Shalini Prasad (Journal Indexing & Scopus Liaison)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Advance Workflow Stage (Updates Status &amp; Dispatches Email)
                  </label>
                  <select
                    value={paper.stage_number || 5}
                    onChange={(e) => {
                      const stages = {
                        1: 'Paper Registered',
                        2: 'Manuscript Preparation',
                        3: 'Internal Formatting & Review',
                        4: 'Journal Submission Proofed',
                        5: 'Under Review',
                        6: 'Revision Requested',
                        7: 'Revision Submitted',
                        8: 'Accepted (In Press)',
                        9: 'Production Proof Finalized',
                        10: 'Published with DOI'
                      };
                      const num = Number(e.target.value);
                      handleStageChange(paper.id, num, stages[num]);
                    }}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff' }}
                  >
                    <option value="1">Stage 1: Paper Registered</option>
                    <option value="2">Stage 2: Manuscript Preparation</option>
                    <option value="3">Stage 3: Internal Review &amp; Plagiarism</option>
                    <option value="4">Stage 4: Journal Submission</option>
                    <option value="5">Stage 5: Under Review</option>
                    <option value="6">Stage 6: Revision Requested</option>
                    <option value="7">Stage 7: Revision Submitted</option>
                    <option value="8">Stage 8: Accepted (With Proof)</option>
                    <option value="9">Stage 9: Production / Proof</option>
                    <option value="10">Stage 10: Published (DOI Assigned)</option>
                  </select>
                </div>
              </div>

              {/* Uploaded Documents for this Paper */}
              {paper.documents && paper.documents.length > 0 && (
                <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>
                    Attached Submission Proofs &amp; Files ({paper.documents.length}):
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {paper.documents.map((d) => (
                      <a
                        key={d.id}
                        href={d.file_url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '11.5px',
                          color: '#334155',
                          textDecoration: 'none'
                        }}
                      >
                        <FileText size={13} color="#2563eb" />
                        <span>{d.document_name}</span>
                        <span style={{ fontSize: '10px', color: '#94a3b8' }}>({d.file_size})</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminPapers;

