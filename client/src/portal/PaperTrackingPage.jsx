import React, { useState, useEffect } from 'react';
import PortalLayout from '../portal/PortalLayout';
import { api } from '../portal/apiService';
import {
  FileText,
  Search,
  BookOpen,
  Calendar,
  User,
  Users,
  Building,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Clock,
  Sparkles,
  ArrowRight,
  Send,
  ShieldAlert
} from 'lucide-react';
import '../portal/PortalPages.css';

const PaperTrackingPage = () => {
  const [papers, setPapers] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [newNote, setNewNote] = useState('');
  const [notesList, setNotesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch only this author's papers directly from Express + Neon DB
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
              // Setup real notes/messages based on backend next_step_action or timeline
              const initialNotes = [
                {
                  author: r.papers[0].assigned_coordinator || 'Publication Lead',
                  date: r.papers[0].submission_date || 'Recent',
                  text: r.papers[0].next_step_action || `Manuscript is active at Stage ${r.papers[0].stage_number}: ${r.papers[0].status}.`
                }
              ];
              setNotesList(initialNotes);
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

  const handleSelectPaper = (paper) => {
    setSelectedId(paper.id);
    setNotesList([
      {
        author: paper.assigned_coordinator || 'Editorial Coordinator',
        date: paper.submission_date || 'Recent',
        text: paper.next_step_action || `Manuscript is active at Stage ${paper.stage_number || 5}: ${paper.status}.`
      }
    ]);
  };

  const filteredPapers = papers.filter(p => 
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.target_journal?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.journal?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAuthorInquiry = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const noteObj = {
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      author: 'Author Inquiry',
      text: newNote.trim()
    };
    setNotesList([noteObj, ...notesList]);
    setNewNote('');
  };

  return (
    <PortalLayout
      activeNav="tracking"
      title="Paper Details &amp; Tracking"
      subtitle="Complete live manuscript metadata, indexing tier, author positions, assigned department coordinators, and two-way progress notes."
    >
      <div className="portal-subpage-container">
        
        {/* If no papers exist for this author in DB */}
        {!loading && papers.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '40px', textAlign: 'center' }}>
            <FileText size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>No Manuscripts Linked to Your Verified Email</h3>
            <p style={{ color: '#64748b', fontSize: '13.5px', maxWidth: '500px', margin: '8px auto 0' }}>
              Your account is isolated under strict data privacy. When the editorial board registers or maps a paper to your email, it will appear here in real-time.
            </p>
          </div>
        ) : currentPaper && (
          <>
            {/* Top Paper Selector / Search Strip */}
            <div className="portal-filter-card">
              <div className="search-bar-inline">
                <Search size={18} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search by Paper ID, title keywords, or journal name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="paper-pills-row">
                {filteredPapers.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPaper(p)}
                    className={`paper-pill-btn ${p.id === currentPaper.id ? 'active' : ''}`}
                  >
                    <span className="pill-id">{p.id}</span>
                    <span className="pill-title">{p.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2-Column Details Workspace */}
            <div className="portal-details-grid">
              
              {/* Left Column: Primary Specs & Metadata */}
              <div className="portal-specs-column">
                
                <div className="portal-content-card">
                  <div className="card-top-header">
                    <div>
                      <span className="meta-category-badge">MODULE 3 • PAPER DETAILS &amp; TRACKING</span>
                      <h2 className="paper-hero-heading">{currentPaper.title}</h2>
                    </div>
                    <span style={{
                      background: currentPaper.status?.includes('Accepted') ? '#dcfce7' : currentPaper.status?.includes('Revision') ? '#fef3c7' : '#eff6ff',
                      color: currentPaper.status?.includes('Accepted') ? '#15803d' : currentPaper.status?.includes('Revision') ? '#b45309' : '#1d4ed8',
                      fontWeight: 800,
                      fontSize: '12px',
                      padding: '5px 12px',
                      borderRadius: '20px'
                    }}>
                      Stage {currentPaper.stage_number || 5}: {currentPaper.status}
                    </span>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid-two-by-two">
                    <div className="spec-tile">
                      <div className="spec-icon-box blue"><BookOpen size={18} /></div>
                      <div>
                        <span className="spec-mini-label">Target Journal &amp; Indexing</span>
                        <strong className="spec-main-val">{currentPaper.target_journal || currentPaper.journal}</strong>
                        <span className="spec-sub-val">{currentPaper.indexing_tier || currentPaper.indexing}</span>
                      </div>
                    </div>

                    <div className="spec-tile">
                      <div className="spec-icon-box green"><User size={18} /></div>
                      <div>
                        <span className="spec-mini-label">Author Positions (As Recorded)</span>
                        <strong className="spec-main-val">{currentPaper.author_positions || currentPaper.authors}</strong>
                        <span className="spec-sub-val">Primary correspondence via {currentPaper.primary_author_email || currentPaper.email}</span>
                      </div>
                    </div>

                    <div className="spec-tile">
                      <div className="spec-icon-box amber"><Building size={18} /></div>
                      <div>
                        <span className="spec-mini-label">Assigned ASR Department</span>
                        <strong className="spec-main-val">{currentPaper.assigned_department || currentPaper.department}</strong>
                        <span className="spec-sub-val">Lead Coordinator: {currentPaper.assigned_coordinator || currentPaper.coordinator}</span>
                      </div>
                    </div>

                    <div className="spec-tile">
                      <div className="spec-icon-box purple"><Calendar size={18} /></div>
                      <div>
                        <span className="spec-mini-label">Submission &amp; Milestone Date</span>
                        <strong className="spec-main-val">
                          {(currentPaper.submission_date || currentPaper.submittedDate || '').split('T')[0] || 'Recent'}
                        </strong>
                        <span className="spec-sub-val">
                          Decision Expected: {(currentPaper.expected_decision_date || '').split('T')[0] || 'Under review'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Required Alert */}
                  <div className="portal-action-alert">
                    <AlertCircle size={20} className="alert-accent-icon" />
                    <div>
                      <strong>Current Status &amp; Action Required</strong>
                      <p>{currentPaper.next_step_action || currentPaper.actionRequired || `Your manuscript is active at Stage ${currentPaper.stage_number}: ${currentPaper.status}.`}</p>
                    </div>
                  </div>

                </div>

                {/* Direct Coordinator WhatsApp Connect */}
                <div className="portal-content-card coordinator-banner-card">
                  <div className="coordinator-info-wrap">
                    <div className="coordinator-avatar">
                      <User size={24} />
                    </div>
                    <div>
                      <h3>Direct Coordinator Helpline</h3>
                      <p>Inquire directly with {currentPaper.assigned_coordinator || currentPaper.coordinator} regarding status updates, revised figures, or author order changes.</p>
                    </div>
                  </div>
                  <a 
                    href={`https://wa.me/919515207724?text=Hello%20${encodeURIComponent(currentPaper.assigned_coordinator || currentPaper.coordinator || 'Coordinator')},%20inquiring%20about%20Paper%20ID%20${currentPaper.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-coordinator"
                  >
                    Chat on WhatsApp
                  </a>
                </div>

              </div>

              {/* Right Column: Two-way Notes & Messages */}
              <div className="portal-notes-column">
                <div className="portal-content-card">
                  <div className="card-top-header">
                    <div className="header-with-icon">
                      <MessageSquare size={18} className="text-accent" />
                      <h3>Notes &amp; Messages (Visible to Author)</h3>
                    </div>
                    <span className="notes-count-badge">{notesList.length} updates</span>
                  </div>

                  <p className="card-desc-text">
                    Real-time official communication log between your editorial coordinator, journal peer reviewers, and author.
                  </p>

                  {/* Interactive New Message Form */}
                  <form onSubmit={handleAddAuthorInquiry} className="add-note-form">
                    <textarea 
                      rows="3"
                      placeholder="Post an inquiry or request a call back for this paper..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                    />
                    <button type="submit" className="btn-send-note">
                      <Send size={14} /> Send Inquiry
                    </button>
                  </form>

                  {/* Timeline Messages List */}
                  <div className="notes-feed-list">
                    {notesList.map((n, i) => (
                      <div key={i} className="feed-item-card">
                        <div className="feed-item-header">
                          <span className="feed-author-name">{n.author}</span>
                          <span className="feed-date-meta">
                            <Clock size={12} /> {n.date}
                          </span>
                        </div>
                        <p className="feed-text-content">{n.text}</p>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

            </div>
          </>
        )}

      </div>
    </PortalLayout>
  );
};

export default PaperTrackingPage;
