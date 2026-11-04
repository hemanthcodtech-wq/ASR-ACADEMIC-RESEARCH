import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { api } from '../portal/apiService';
import { SlidersHorizontal, User, Phone, Mail, Building, CheckCircle, ShieldCheck, Plus, X } from 'lucide-react';

const AdminCoordinators = () => {
  const [coordinators, setCoordinators] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [newCoord, setNewCoord] = useState({
    name: '',
    title: 'Senior Publication Lead',
    department: 'Electrical & Renewable Systems Cell',
    email: '',
    phone: '+91 9515207724'
  });

  const getAuthToken = () => {
    try {
      const s = localStorage.getItem('asr_author_user');
      return s ? JSON.parse(s).token : null;
    } catch {
      return null;
    }
  };

  const loadCoordinators = () => {
    const token = getAuthToken();
    if (token) {
      api.getStaffCoordinators(token).then(r => r && r.coordinators && setCoordinators(r.coordinators));
    }
  };

  useEffect(() => {
    loadCoordinators();
  }, []);

  const handleAddCoordinator = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!newCoord.name || !newCoord.department) {
      setErrorMsg('Name and department are mandatory.');
      return;
    }

    const token = getAuthToken();
    const res = await api.createCoordinator(token, newCoord);
    if (res && res.success) {
      setSuccessMsg(`Coordinator "${res.coordinator.name}" added successfully!`);
      setShowModal(false);
      setNewCoord({
        name: '',
        title: 'Senior Publication Lead',
        department: 'Electrical & Renewable Systems Cell',
        email: '',
        phone: '+91 9515207724'
      });
      loadCoordinators();
      setTimeout(() => setSuccessMsg(''), 4500);
    } else {
      setErrorMsg(res?.message || 'Failed to add coordinator.');
    }
  };

  return (
    <AdminLayout
      activeNav="coordinators"
      title="Publication Coordinators &amp; Leads Directory"
      subtitle="Editorial leads assigned to handle peer-review communications, referee consignments, and author liaison."
    >
      <div className="portal-subpage-container">

        {successMsg && (
          <div className="portal-success-strip" style={{ marginBottom: '20px' }}>
            <CheckCircle size={18} color="#16a34a" />
            <span>{successMsg}</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <span style={{ fontSize: '13px', color: '#64748b' }}>
              Total Active Coordinators: <strong>{coordinators.length}</strong>
            </span>
          </div>

          <button
            onClick={() => setShowModal(true)}
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
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Plus size={16} />
            <span>+ Add New Coordinator</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {coordinators.map((coord) => (
            <div
              key={coord.id}
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '18px'
                }}>
                  {coord.name.charAt(4) || coord.name.charAt(0) || 'C'}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', color: '#0f172a', fontWeight: 700 }}>{coord.name}</h4>
                  <span style={{ fontSize: '12.5px', color: '#64748b' }}>{coord.title}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Building size={16} color="#64748b" />
                  <span>{coord.department}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={16} color="#64748b" />
                  <span style={{ color: '#2563eb' }}>{coord.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={16} color="#64748b" />
                  <span>{coord.phone}</span>
                </div>
              </div>

              <div style={{ marginTop: '16px', background: '#f0fdf4', color: '#16a34a', padding: '8px 12px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600 }}>
                Currently Managing: <strong>{coord.active_papers_count || 0} Manuscripts</strong>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Add Coordinator */}
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
            <div style={{ background: '#fff', borderRadius: '14px', maxWidth: '500px', width: '100%', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Add Publication Coordinator</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}>&times;</button>
              </div>

              {errorMsg && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '10px', borderRadius: '6px', fontSize: '12.5px', marginBottom: '14px' }}>
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleAddCoordinator} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Coordinator Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Kavitha Sundaram"
                    value={newCoord.name}
                    onChange={e => setNewCoord({ ...newCoord, name: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Title / Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Peer Review Lead"
                    value={newCoord.title}
                    onChange={e => setNewCoord({ ...newCoord, title: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Department / Scientific Cell *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Applied Physics &amp; Nano-Engineering Cell"
                    value={newCoord.department}
                    onChange={e => setNewCoord({ ...newCoord, department: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Official Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. kavitha.s@asracademicresearch.com"
                    value={newCoord.email}
                    onChange={e => setNewCoord({ ...newCoord, email: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Helpline Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={newCoord.phone}
                    onChange={e => setNewCoord({ ...newCoord, phone: e.target.value })}
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
                    style={{ padding: '8px 20px', borderRadius: '6px', border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Save Coordinator
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

export default AdminCoordinators;
