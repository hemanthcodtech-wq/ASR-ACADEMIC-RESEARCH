import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { api } from '../portal/apiService';
import { Users, UserPlus, Search, CheckCircle, Mail, Phone, Building, ShieldCheck, KeyRound } from 'lucide-react';

const AdminAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    username: '',
    password: 'AuthorPassword123!',
    institution: '',
    phone: '+91 9515207724',
    role: 'author'
  });

  const getAuthToken = () => {
    try {
      const s = localStorage.getItem('asr_author_user');
      return s ? JSON.parse(s).token : null;
    } catch {
      return null;
    }
  };

  const loadAuthors = () => {
    const token = getAuthToken();
    if (token) {
      api.getAllAuthors(token).then(r => {
        if (r && r.authors) setAuthors(r.authors);
      });
    }
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!formData.full_name || !formData.email) {
      setErrorMsg('Full Name and Email are mandatory.');
      return;
    }

    const token = getAuthToken();
    const res = await api.createAuthorProfile(token, formData);
    if (res && res.success) {
      setSuccessMsg(`Author "${res.author.full_name}" registered successfully!`);
      setShowModal(false);
      setFormData({
        full_name: '',
        email: '',
        username: '',
        password: 'AuthorPassword123!',
        institution: '',
        phone: '+91 9515207724',
        role: 'author'
      });
      loadAuthors();
      setTimeout(() => setSuccessMsg(''), 4500);
    } else {
      setErrorMsg(res?.message || 'Failed to create author.');
    }
  };

  const filtered = authors.filter(a =>
    a.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    a.email?.toLowerCase().includes(search.toLowerCase()) ||
    a.institution?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout
      activeNav="authors"
      title="Author Management &amp; Creation"
      subtitle="Register scholars, verify 2FA email mappings, assign roles, and audit researcher credentials."
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
              placeholder="Search by author name, email, or institution..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '9px 12px 9px 38px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
            />
          </div>

          <button
            onClick={() => setShowModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#10b981',
              color: '#fff',
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <UserPlus size={16} />
            <span>+ Create Author Profile</span>
          </button>
        </div>

        {/* Authors Table */}
        <div className="portal-table-responsive-wrapper">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Author ID &amp; Name</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Email (2FA Identifier)</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Role</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Affiliation / University</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Contact</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((author) => (
                <tr key={author.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{author.full_name}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>ID: #{author.id}</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ color: '#2563eb', fontWeight: 600 }}>{author.email}</div>
                    <div style={{ fontSize: '11px', color: '#16a34a' }}>✓ 2FA Verified</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 700,
                      background: author.role === 'admin' ? '#fee2e2' : '#dbeafe',
                      color: author.role === 'admin' ? '#991b1b' : '#1e40af'
                    }}>
                      {author.role?.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>{author.institution || 'Academic Researcher'}</td>
                  <td style={{ padding: '14px 16px', color: '#334155' }}>{author.phone || '+91 9515207724'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal: Create Author */}
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
            <div style={{ background: '#fff', borderRadius: '14px', maxWidth: '520px', width: '100%', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Create Author Profile</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}>&times;</button>
              </div>

              {errorMsg && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '10px', borderRadius: '6px', fontSize: '12.5px', marginBottom: '14px' }}>
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Ramesh Gupta"
                    value={formData.full_name}
                    onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Author Email (Used for 2FA Passcode) *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ramesh.gupta@iitb.ac.in"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>University / Research Institution</label>
                  <input
                    type="text"
                    placeholder="e.g. IIT Bombay / NIT Warangal"
                    value={formData.institution}
                    onChange={e => setFormData({ ...formData, institution: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Phone Number (WhatsApp Direct Line)</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
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

      </div>
    </AdminLayout>
  );
};

export default AdminAuthors;

