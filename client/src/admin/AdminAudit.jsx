import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { api, API_BASE } from '../portal/apiService';
import { ShieldCheck, Search, Clock, UserCheck, AlertTriangle } from 'lucide-react';

const AdminAudit = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');

  const getAuthToken = () => {
    try {
      const s = localStorage.getItem('asr_author_user');
      return s ? JSON.parse(s).token : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      fetch(`${API_BASE}/staff/audit-logs`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(r => r.json())
        .then(data => {
          if (data && data.logs) setLogs(data.logs);
        })
        .catch(console.error);
    }
  }, []);

  const filtered = logs.filter(l =>
    l.author_email?.toLowerCase().includes(search.toLowerCase()) ||
    l.action?.toLowerCase().includes(search.toLowerCase()) ||
    l.details?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout
      activeNav="audit"
      title="Security &amp; Operational Audit Trail"
      subtitle="Immutable event logs recording author 2FA logins, administrative status updates, coordinator assignments, and Cloudinary uploads."
    >
      <div className="portal-subpage-container">

        <div style={{ position: 'relative', minWidth: '320px', marginBottom: '20px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search audit events by action, actor, or details..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '9px 12px 9px 38px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
          />
        </div>

        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Timestamp</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Action Event</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Actor / Email</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Audit Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontSize: '12px', color: '#64748b' }}>
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 800,
                      background: log.action?.includes('LOGIN') ? '#dcfce7' : '#eff6ff',
                      color: log.action?.includes('LOGIN') ? '#15803d' : '#1d4ed8'
                    }}>
                      {log.action}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#0f172a' }}>
                    {log.author_email}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminAudit;

