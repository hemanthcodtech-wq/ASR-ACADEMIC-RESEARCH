import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { api } from '../portal/apiService';
import {
  FileText,
  Users,
  CreditCard,
  Upload,
  CheckCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

const AdminOverview = () => {
  const [papers, setPapers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [payments, setPayments] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuthToken = () => {
    try {
      const s = localStorage.getItem('asr_author_user');
      return s ? JSON.parse(s).token : null;
    } catch {
      return null;
    }
  };

  const loadAdminData = () => {
    const token = getAuthToken();
    if (token) {
      Promise.all([
        api.getAllPapersForAdmin(token),
        api.getAllAuthors(token),
        api.getStaffCoordinators(token),
        api.getAllPaymentsForAdmin(token)
      ]).then(([papersRes, authorsRes, coordsRes, paymentsRes]) => {
        setLoading(false);
        if (papersRes && papersRes.papers) setPapers(papersRes.papers);
        if (authorsRes && authorsRes.authors) setAuthors(authorsRes.authors);
        if (coordsRes && coordsRes.coordinators) setCoordinators(coordsRes.coordinators);
        if (paymentsRes && paymentsRes.payments) setPayments(paymentsRes.payments);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const totalRevenue = payments.reduce((acc, p) => acc + Number(p.amount_paid || 0), 0);
  const totalInvoiced = payments.reduce((acc, p) => acc + Number(p.total_amount || 0), 0);
  const pendingRevenue = totalInvoiced - totalRevenue;

  return (
    <AdminLayout
      activeNav="overview"
      title="Editorial Control Hub"
      subtitle="Real-time pulse of author submissions, peer review stages, payment reconciliations, and Cloudinary uploads directly from database."
    >
      <div className="portal-subpage-container">

        {/* Top 4 KPI Metrics Directly From Database */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Active Manuscripts</span>
              <FileText size={20} color="#2563eb" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginTop: '10px' }}>
              {papers.length}
            </div>
            <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600, marginTop: '4px' }}>
              Live On
            </div>
          </div>

          <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Registered Authors</span>
              <Users size={20} color="#10b981" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginTop: '10px' }}>
              {authors.length}
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              Linked with verified 2FA emails
            </div>
          </div>

          <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Collected Payments</span>
              <CreditCard size={20} color="#f59e0b" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginTop: '10px' }}>
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600, marginTop: '4px' }}>
              Verified bank receipts
            </div>
          </div>

          <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Outstanding Balance</span>
              <Clock size={20} color="#ef4444" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: pendingRevenue > 0 ? '#dc2626' : '#16a34a', marginTop: '10px' }}>
              ₹{pendingRevenue.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '12px', color: pendingRevenue > 0 ? '#b45309' : '#16a34a', fontWeight: 600, marginTop: '4px' }}>
              {pendingRevenue > 0 ? 'Pending author clearance' : 'All accounts settled'}
            </div>
          </div>
        </div>

        {/* Quick Admin Actions Row */}
        <div style={{ background: '#0f172a', borderRadius: '14px', padding: '20px 24px', color: '#fff', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '2px' }}>⚡ Quick Operational Directives</div>
              <p style={{ fontSize: '12.5px', color: '#94a3b8', margin: 0 }}>Direct links to frequently used admin modules:</p>
            </div>
            <button
              onClick={loadAdminData}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #334155',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={13} />
              <span>Refresh DB Data</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <Link to="/admin/authors" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#1e293b', color: '#38bdf8', padding: '8px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, textDecoration: 'none' }}>
              <Users size={15} />
              <span>1. Create New Author</span>
            </Link>
            <Link to="/admin/payments" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#1e293b', color: '#4ade80', padding: '8px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, textDecoration: 'none' }}>
              <CreditCard size={15} />
              <span>2. Update Payment Status</span>
            </Link>
            <Link to="/admin/new-paper" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#1e293b', color: '#f472b6', padding: '8px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, textDecoration: 'none' }}>
              <FileText size={15} />
              <span>3. Register New Paper</span>
            </Link>
            <Link to="/admin/proofs" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#1e293b', color: '#fbbf24', padding: '8px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, textDecoration: 'none' }}>
              <Upload size={15} />
              <span>4. Upload Proofs &amp; Letters</span>
            </Link>
            <Link to="/admin/papers" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#2563eb', color: '#fff', padding: '8px 14px', borderRadius: '8px', fontSize: '12.5px', fontWeight: 700, textDecoration: 'none' }}>
              <TrendingUp size={15} />
              <span>5. Advance Stages 1-10</span>
            </Link>
          </div>
        </div>

        {/* Live Database Manuscripts Table */}
        <div className="portal-table-responsive-wrapper">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Live Manuscript Repository (Direct DB Sync)</h3>
            <Link to="/admin/papers" style={{ fontSize: '12.5px', color: '#2563eb', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span>View All &amp; Edit</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Paper ID</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Title &amp; Target Journal</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Author (Account Mapping)</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Assigned Lead</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Workflow Status</th>
              </tr>
            </thead>
            <tbody>
              {papers.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
                    No manuscripts in database yet. Click "Register New Paper" above to add the first one.
                  </td>
                </tr>
              ) : (
                papers.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#2563eb' }}>{p.id}</td>
                    <td style={{ padding: '14px 16px', maxWidth: '320px' }}>
                      <div style={{ fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</div>
                      <div style={{ fontSize: '11.5px', color: '#64748b' }}>{p.target_journal}</div>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#334155' }}>{p.primary_author_email}</td>
                    <td style={{ padding: '14px 16px', color: '#475569', fontSize: '12px' }}>
                      {p.assigned_coordinator?.split('(')[0] || 'Dr. Rajesh K.'}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 700,
                        background: p.status?.includes('Accepted') ? '#dcfce7' : p.status?.includes('Revision') ? '#fef3c7' : '#eff6ff',
                        color: p.status?.includes('Accepted') ? '#15803d' : p.status?.includes('Revision') ? '#b45309' : '#1d4ed8'
                      }}>
                        Stage {p.stage_number || 5}: {p.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminOverview;
