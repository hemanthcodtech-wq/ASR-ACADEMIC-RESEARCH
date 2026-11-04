import React, { useState, useEffect } from 'react';
import PortalLayout from '../portal/PortalLayout';
import { getStoredPapers } from '../portal/portalData';
import { api } from '../portal/apiService';
import {
  Users,
  UserPlus,
  FileText,
  Upload,
  CheckCircle,
  Clock,
  Shield,
  Layers,
  Search,
  Building,
  Plus,
  Send,
  Lock,
  Edit,
  DollarSign,
  UserCheck,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import '../portal/PortalPages.css';

const AdminStaffPage = () => {
  const [papers, setPapers] = useState(getStoredPapers());
  const [coordinators, setCoordinators] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [activeTab, setActiveTab] = useState('papers'); // 'papers', 'coordinators', 'authors', 'payments'
  
  // Modals state
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [showPaperModal, setShowPaperModal] = useState(false);
  const [selectedPaperForEdit, setSelectedPaperForEdit] = useState(null);
  const [successToast, setSuccessToast] = useState('');

  // Author Form State
  const [newAuthor, setNewAuthor] = useState({
    full_name: '',
    email: '',
    username: '',
    password: 'AuthorPassword123!',
    institution: '',
    phone: '+91 9515207724',
    role: 'author'
  });

  // Paper Form State
  const [newPaper, setNewPaper] = useState({
    title: '',
    target_journal: 'Applied Energy (Elsevier)',
    indexing_tier: 'SCI / SCIE (Q1)',
    primary_author_email: 'kancharlahemanth89@gmail.com',
    assigned_coordinator: 'Dr. Rajesh K. (Senior Publication Lead)',
    assigned_department: 'Electrical & Renewable Systems Cell',
    status: 'Paper Registered',
    stage_number: 1
  });

  const getAuthToken = () => {
    try {
      const session = localStorage.getItem('asr_author_user');
      return session ? JSON.parse(session).token : null;
    } catch {
      return null;
    }
  };

  // Load live data from Backend API
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      api.getStaffCoordinators(token).then(res => {
        if (res && res.coordinators) setCoordinators(res.coordinators);
      });
      api.getAllAuthors(token).then(res => {
        if (res && res.authors) setAuthors(res.authors);
      });
      api.getMyPapers(token).then(res => {
        if (res && res.papers) setPapers(res.papers);
      });
    }
  }, []);

  // Handle Author Creation
  const handleCreateAuthor = async (e) => {
    e.preventDefault();
    if (!newAuthor.email || !newAuthor.full_name) return;

    const token = getAuthToken();
    const res = await api.createAuthorProfile(token, newAuthor);
    if (res && res.success) {
      setAuthors(prev => [res.author, ...prev]);
      setShowAuthorModal(false);
      setNewAuthor({
        full_name: '',
        email: '',
        username: '',
        password: 'AuthorPassword123!',
        institution: '',
        phone: '+91 9515207724',
        role: 'author'
      });
      setSuccessToast(`Author profile created for ${res.author.full_name}!`);
      setTimeout(() => setSuccessToast(''), 4000);
    }
  };

  // Handle Paper Registration
  const handleRegisterPaper = async (e) => {
    e.preventDefault();
    if (!newPaper.title) return;

    const token = getAuthToken();
    const res = await api.registerPaper(token, newPaper);
    if (res && res.success) {
      setPapers(prev => [res.paper, ...prev]);
      setShowPaperModal(false);
      setSuccessToast(`Paper "${res.paper.id}" registered successfully!`);
      setTimeout(() => setSuccessToast(''), 4000);
    }
  };

  // Handle Status Update (Stage 1 to 10)
  const handleUpdateStatus = async (paperId, stageNumber, statusName) => {
    const token = getAuthToken();
    const res = await api.updatePaperStatus(token, paperId, {
      stage_number: stageNumber,
      status: statusName,
      next_step_action: `Progressed to Stage ${stageNumber} (${statusName}). Referees and editors notified.`
    });

    if (res && res.success) {
      setPapers(prev => prev.map(p => p.id === paperId ? { ...p, stage_number: stageNumber, status: statusName } : p));
      setSuccessToast(`Paper ${paperId} updated to Stage ${stageNumber}: ${statusName}!`);
      setTimeout(() => setSuccessToast(''), 4000);
    }
  };

  // Handle Coordinator Assignment
  const handleAssignCoordinator = async (paperId, coordName, dept) => {
    const token = getAuthToken();
    const res = await api.assignCoordinator(token, paperId, {
      coordinator_name: coordName,
      department: dept
    });

    if (res && res.success) {
      setPapers(prev => prev.map(p => p.id === paperId ? { ...p, assigned_coordinator: coordName, assigned_department: dept } : p));
      setSuccessToast(`Coordinator updated for ${paperId}!`);
      setTimeout(() => setSuccessToast(''), 4000);
    }
  };

  const filteredPapers = papers.filter(p =>
    p.title?.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.id?.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.primary_author_email?.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <PortalLayout
      activeNav="admin"
      title="Admin & Staff Management Hub"
      subtitle="Full control center for paper assignments, workflow stages, author profile creation, and payment auditing."
    >
      <div className="portal-subpage-container">

        {successToast && (
          <div className="portal-success-strip" style={{ marginBottom: '20px' }}>
            <CheckCircle size={18} color="#16a34a" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Top Control Header with Module Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', background: '#e2e8f0', padding: '4px', borderRadius: '10px' }}>
            <button
              onClick={() => setActiveTab('papers')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'papers' ? '#2563eb' : 'transparent',
                color: activeTab === 'papers' ? '#fff' : '#475569'
              }}
            >
              📄 Manuscripts ({papers.length})
            </button>
            <button
              onClick={() => setActiveTab('coordinators')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'coordinators' ? '#2563eb' : 'transparent',
                color: activeTab === 'coordinators' ? '#fff' : '#475569'
              }}
            >
              👔 Who Handles Papers ({coordinators.length || 4})
            </button>
            <button
              onClick={() => setActiveTab('authors')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === 'authors' ? '#2563eb' : 'transparent',
                color: activeTab === 'authors' ? '#fff' : '#475569'
              }}
            >
              👥 Authors & Users ({authors.length || 3})
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setShowAuthorModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#10b981',
                color: '#fff',
                padding: '9px 16px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <UserPlus size={16} />
              <span>Create Author</span>
            </button>

            <button
              onClick={() => setShowPaperModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#2563eb',
                color: '#fff',
                padding: '9px 16px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '13px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Plus size={16} />
              <span>Register Paper</span>
            </button>
          </div>
        </div>

        {/* TAB 1: MANUSCRIPTS MANAGEMENT */}
        {activeTab === 'papers' && (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder="Search by manuscript title, paper ID, or author email..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13.5px'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredPapers.map((paper) => (
                <div
                  key={paper.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '20px 24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <span style={{ background: '#eff6ff', color: '#2563eb', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>
                        {paper.id}
                      </span>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '8px 0 4px' }}>
                        {paper.title}
                      </h3>
                      <div style={{ fontSize: '12.5px', color: '#64748b' }}>
                        Target: <strong style={{ color: '#334155' }}>{paper.target_journal || paper.journal}</strong> • Author: <strong style={{ color: '#2563eb' }}>{paper.primary_author_email || paper.email}</strong>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        background: paper.status?.includes('Accepted') ? '#dcfce7' : paper.status?.includes('Revision') ? '#fef3c7' : '#e0e7ff',
                        color: paper.status?.includes('Accepted') ? '#15803d' : paper.status?.includes('Revision') ? '#b45309' : '#3730a3',
                        fontWeight: 800,
                        fontSize: '11.5px',
                        padding: '4px 10px',
                        borderRadius: '20px'
                      }}>
                        Stage {paper.stage_number || 5}: {paper.status}
                      </span>
                    </div>
                  </div>

                  {/* Operational Controls: Who Handles + Status Selector */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', marginTop: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Assigned Coordinator (Who Handles Paper)
                      </label>
                      <select
                        value={paper.assigned_coordinator || ''}
                        onChange={(e) => handleAssignCoordinator(paper.id, e.target.value, paper.assigned_department)}
                        style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px', background: '#fff' }}
                      >
                        <option value="Dr. Rajesh K. (Senior Publication Lead)">Dr. Rajesh K. (Senior Publication Lead)</option>
                        <option value="Ms. S. Ananya (Post-Acceptance Coordinator)">Ms. S. Ananya (Post-Acceptance Coordinator)</option>
                        <option value="Dr. Vikramaditya M. (Senior Peer Review Editor)">Dr. Vikramaditya M. (Senior Peer Review Editor)</option>
                        <option value="Dr. Shalini Prasad (Journal Indexing & Scopus Liaison)">Dr. Shalini Prasad (Journal Indexing & Scopus Liaison)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Advance Workflow Stage (Sends Email Update)
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
                          handleUpdateStatus(paper.id, num, stages[num]);
                        }}
                        style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px', background: '#fff' }}
                      >
                        <option value="1">Stage 1: Paper Registered</option>
                        <option value="2">Stage 2: Manuscript Preparation</option>
                        <option value="3">Stage 3: Internal Review & Formatting</option>
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
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: WHO HANDLES PAPERS (COORDINATORS) */}
        {activeTab === 'coordinators' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {(coordinators.length > 0 ? coordinators : [
              { id: '1', name: 'Dr. Rajesh K.', title: 'Senior Publication Lead', department: 'Electrical & Renewable Systems Cell', email: 'rajesh.k@asracademicresearch.com', phone: '+91 9515207724', active_papers_count: 8 },
              { id: '2', name: 'Ms. S. Ananya', title: 'Post-Acceptance Coordinator', department: 'Computer Science & AI Division', email: 'ananya.s@asracademicresearch.com', phone: '+91 9515207724', active_papers_count: 5 },
              { id: '3', name: 'Dr. Vikramaditya M.', title: 'Senior Peer Review Editor', department: 'Mechanical & Materials Engineering Division', email: 'vikram.m@asracademicresearch.com', phone: '+91 9515207724', active_papers_count: 6 },
              { id: '4', name: 'Dr. Shalini Prasad', title: 'Journal Indexing & Scopus Liaison', department: 'Biotechnology & Health Sciences Cell', email: 'shalini.p@asracademicresearch.com', phone: '+91 9515207724', active_papers_count: 4 }
            ]).map((coord) => (
              <div key={coord.id} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '16px' }}>
                    {coord.name.charAt(4) || 'D'}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '15px', color: '#0f172a', fontWeight: 700 }}>{coord.name}</h4>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{coord.title}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: '#334155' }}>
                  <div>🏛️ <strong>Dept:</strong> {coord.department}</div>
                  <div>✉️ <strong>Email:</strong> {coord.email}</div>
                  <div>📞 <strong>Direct Line:</strong> {coord.phone}</div>
                  <div style={{ marginTop: '8px', background: '#f0fdf4', color: '#166534', padding: '6px 10px', borderRadius: '6px', fontWeight: 600 }}>
                    Active Manuscripts Handled: <strong>{coord.active_papers_count || 5}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: AUTHOR'S CREATION & DIRECTORY */}
        {activeTab === 'authors' && (
          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <tr>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Author Name</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Email / Login</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Role</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Affiliation / University</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Contact</th>
                </tr>
              </thead>
              <tbody>
                {(authors.length > 0 ? authors : [
                  { id: 1, full_name: 'Chief Editorial Administrator', email: 'admin@asracademicresearch.com', role: 'admin', institution: 'ASR Head Office', phone: '+91 9515207724' },
                  { id: 2, full_name: 'Dr. Hemanth Kancharla', email: 'kancharlahemanth89@gmail.com', role: 'author', institution: 'Dept. of Electrical & Computer Engg', phone: '+91 9515207724' },
                  { id: 3, full_name: 'Prof. Kancharla', email: 'kancharla@gmail.com', role: 'author', institution: 'ASR International Research Group', phone: '+91 9515207724' }
                ]).map((author) => (
                  <tr key={author.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>{author.full_name}</td>
                    <td style={{ padding: '14px 16px', color: '#2563eb' }}>{author.email}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 700,
                        background: author.role === 'admin' ? '#fee2e2' : '#dbeafe',
                        color: author.role === 'admin' ? '#991b1b' : '#1e40af'
                      }}>
                        {author.role.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#64748b' }}>{author.institution}</td>
                    <td style={{ padding: '14px 16px', color: '#334155' }}>{author.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* MODAL: CREATE AUTHOR */}
        {showAuthorModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
            <div style={{ background: '#fff', borderRadius: '14px', maxWidth: '520px', width: '100%', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 16px', color: '#0f172a' }}>Create Author Profile</h3>
              <form onSubmit={handleCreateAuthor} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Ramesh Gupta"
                    value={newAuthor.full_name}
                    onChange={e => setNewAuthor({ ...newAuthor, full_name: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Author Email (Used for 2FA OTP) *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ramesh.gupta@iitb.ac.in"
                    value={newAuthor.email}
                    onChange={e => setNewAuthor({ ...newAuthor, email: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Institution / University</label>
                  <input
                    type="text"
                    placeholder="e.g. IIT Bombay / Anna University"
                    value={newAuthor.institution}
                    onChange={e => setNewAuthor({ ...newAuthor, institution: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Phone Number</label>
                  <input
                    type="text"
                    value={newAuthor.phone}
                    onChange={e => setNewAuthor({ ...newAuthor, phone: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setShowAuthorModal(false)}
                    style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '8px 20px', borderRadius: '6px', border: 'none', background: '#10b981', color: '#fff', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Save Author Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: REGISTER PAPER */}
        {showPaperModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
            <div style={{ background: '#fff', borderRadius: '14px', maxWidth: '580px', width: '100%', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 16px', color: '#0f172a' }}>Register Research Manuscript</h3>
              <form onSubmit={handleRegisterPaper} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Manuscript Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter complete research paper title..."
                    value={newPaper.title}
                    onChange={e => setNewPaper({ ...newPaper, title: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Target Journal *</label>
                    <input
                      type="text"
                      required
                      value={newPaper.target_journal}
                      onChange={e => setNewPaper({ ...newPaper, target_journal: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Primary Author Email *</label>
                    <input
                      type="email"
                      required
                      value={newPaper.primary_author_email}
                      onChange={e => setNewPaper({ ...newPaper, primary_author_email: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Assign Coordinator (Who Handles)</label>
                  <select
                    value={newPaper.assigned_coordinator}
                    onChange={e => setNewPaper({ ...newPaper, assigned_coordinator: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="Dr. Rajesh K. (Senior Publication Lead)">Dr. Rajesh K. (Senior Publication Lead)</option>
                    <option value="Ms. S. Ananya (Post-Acceptance Coordinator)">Ms. S. Ananya (Post-Acceptance Coordinator)</option>
                    <option value="Dr. Vikramaditya M. (Senior Peer Review Editor)">Dr. Vikramaditya M. (Senior Peer Review Editor)</option>
                    <option value="Dr. Shalini Prasad (Journal Indexing & Scopus Liaison)">Dr. Shalini Prasad (Journal Indexing & Scopus Liaison)</option>
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setShowPaperModal(false)}
                    style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '8px 20px', borderRadius: '6px', border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Register Manuscript
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </PortalLayout>
  );
};

export default AdminStaffPage;
