import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { api } from '../portal/apiService';
import { PlusCircle, CheckCircle, FileText, AlertCircle, CreditCard, Trash2 } from 'lucide-react';

const AdminNewPaper = () => {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const DEFAULT_SERVICES = [
    { id: 1, name: 'Academic Publication Processing Charge (APC)', desc: 'End-to-end manuscript submission, peer-review facilitation, editorial coordination & journal placement services', hsn: '998314', price: '', included: false },
    { id: 2, name: 'Plagiarism & Similarity Audit (Turnitin)',       desc: 'Authenticated similarity report with AI-detection summary',                                                      hsn: '998314', price: '', included: true  },
    { id: 3, name: 'Technical Proofreading & Formatting',            desc: 'Journal-specific formatting, language editing & compliance check',                                               hsn: '998314', price: '', included: true  },
  ];

  const [formData, setFormData] = useState({
    title: '',
    target_journal: 'Energy Conversion and Management (Elsevier)',
    indexing_tier: 'SCI / SCIE (Q1) • Scopus Indexed',
    primary_author_email: 'kancharlahemanth89@gmail.com',
    author_positions: 'Primary Author',
    co_authors: '',
    abstract_text: '',
    assigned_coordinator: 'Dr. Rajesh K. (Senior Publication Lead)',
    assigned_department: 'Electrical & Renewable Systems Cell',
    amount_paid: '',
    payment_method: 'NEFT / Net Banking',
    transaction_ref: ''
  });

  const [services, setServices] = useState(DEFAULT_SERVICES);

  const [useCustomEmail, setUseCustomEmail] = useState(false);

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
      api.getAllAuthors(token).then(r => {
        if (r && r.authors && r.authors.length > 0) {
          setAuthors(r.authors);
          // Set initial author if current email is empty or set default
          if (!formData.primary_author_email) {
            setFormData(prev => ({
              ...prev,
              primary_author_email: r.authors[0].email,
              author_positions: r.authors[0].full_name ? `${r.authors[0].full_name} (Corresponding Author)` : prev.author_positions
            }));
          }
        }
      });
      api.getStaffCoordinators(token).then(r => r && r.coordinators && setCoordinators(r.coordinators));
    }
  }, []);

  const updateService = (id, field, value) =>
    setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));

  const addService = () =>
    setServices(prev => [...prev, { id: Date.now(), name: '', desc: '', hsn: '998314', price: '', included: false }]);

  const removeService = (id) =>
    setServices(prev => prev.filter(s => s.id !== id));

  const baseTotal  = services.reduce((sum, s) => sum + (s.included ? 0 : Number(s.price) || 0), 0);
  const cgst       = Math.round(baseTotal * 0.09);
  const sgst       = cgst;
  const totalFee   = baseTotal + cgst + sgst;
  const paidFee    = Number(formData.amount_paid) || 0;
  const remainingFee = totalFee - paidFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!formData.title || !formData.target_journal || !formData.primary_author_email) {
      setErrorMsg('Please fill out all mandatory fields.');
      return;
    }
    const apcService = services.find(s => s.id === 1);
    if (!apcService?.included && (!apcService?.price || Number(apcService.price) <= 0)) {
      setErrorMsg('Please enter the APC price for the Academic Publication Processing Charge.');
      return;
    }

    setIsSubmitting(true);
    const token = getAuthToken();
    const res = await api.registerPaper(token, { ...formData, total_amount: totalFee, services });
    setIsSubmitting(false);

    if (res && res.success) {
      setSuccessMsg(`Manuscript "${res.paper.id}" registered successfully with payment ledger created!`);
      setTimeout(() => {
        navigate('/admin/papers');
      }, 1500);
    } else {
      setErrorMsg(res?.message || 'Failed to register manuscript.');
    }
  };

  return (
    <AdminLayout
      activeNav="new-paper"
      title="Register New Research Manuscript &amp; Payment Ledger"
      subtitle="Intake new papers, map them to author accounts, configure coordinators, and set fee amounts (Total, Paid, Remaining)."
    >
      <div className="portal-subpage-container" style={{ maxWidth: '860px', margin: '0 auto' }}>

        {successMsg && (
          <div className="portal-success-strip" style={{ marginBottom: '20px' }}>
            <CheckCircle size={18} color="#16a34a" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px' }}>
            {errorMsg}
          </div>
        )}

        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

            {/* Section 1: Manuscript Meta */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', marginBottom: '10px' }}>
                1. Manuscript Information
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Manuscript Full Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deep Learning Based Adaptive MPPT for Hybrid Solar-Wind Microgrid Systems"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Target Journal *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Energy Conversion and Management (Elsevier)"
                  value={formData.target_journal}
                  onChange={e => setFormData({ ...formData, target_journal: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Indexing Tier *
                </label>
                <select
                  value={formData.indexing_tier}
                  onChange={e => setFormData({ ...formData, indexing_tier: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', background: '#fff' }}
                >
                  <option value="SCI / SCIE (Q1) • Scopus Indexed">SCI / SCIE (Q1) • Scopus Indexed</option>
                  <option value="SCI / SCIE (Q2) • Scopus Indexed">SCI / SCIE (Q2) • Scopus Indexed</option>
                  <option value="Scopus Indexed Only (Q2 / Q3)">Scopus Indexed Only (Q2 / Q3)</option>
                  <option value="Web of Science ESCI Indexed">Web of Science ESCI Indexed</option>
                  <option value="UGC CARE Listed (Group I)">UGC CARE Listed (Group I)</option>
                </select>
              </div>
            </div>

            {/* Section 2: Author Mapping & Assigned Lead */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase' }}>
                  2. Author Mapping &amp; Coordinator Assignment
                </span>
                <button
                  type="button"
                  onClick={() => setUseCustomEmail(!useCustomEmail)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2563eb',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  {useCustomEmail ? '← Select From Registered Authors' : '+ Enter Custom Author Email'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Author Account Email (2FA Mapping) *
                  </label>

                  {!useCustomEmail ? (
                    <div>
                      <select
                        required
                        value={formData.primary_author_email}
                        onChange={e => {
                          const selectedEmail = e.target.value;
                          const matchedAuthor = authors.find(a => a.email === selectedEmail);
                          setFormData({
                            ...formData,
                            primary_author_email: selectedEmail,
                            author_positions: matchedAuthor?.full_name
                              ? `${matchedAuthor.full_name} (Corresponding Author)`
                              : formData.author_positions
                          });
                        }}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1.5px solid #2563eb',
                          fontSize: '13.5px',
                          background: '#eff6ff',
                          color: '#0f172a',
                          fontWeight: 600
                        }}
                      >
                        <option value="">-- Choose Registered Author ({authors.length} Available) --</option>
                        {authors.map(a => (
                          <option key={a.id || a.email} value={a.email}>
                            {a.full_name ? `${a.full_name} (${a.email})` : a.email} {a.institution ? `• ${a.institution}` : ''}
                          </option>
                        ))}
                      </select>
                      <span style={{ fontSize: '11px', color: '#16a34a', marginTop: '4px', display: 'block', fontWeight: 600 }}>
                        ✓ Linked to registered author database with 2FA email delivery.
                      </span>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="e.g. author@university.edu"
                        value={formData.primary_author_email}
                        onChange={e => setFormData({ ...formData, primary_author_email: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                      />
                      <span style={{ fontSize: '11px', color: '#64748b', marginTop: '3px', display: 'block' }}>
                        Custom email: manuscript will appear in this author's dashboard once they log in via 2FA.
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Assign Coordinator (Who Handles)
                  </label>
                  <select
                    value={formData.assigned_coordinator}
                    onChange={e => setFormData({ ...formData, assigned_coordinator: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', background: '#fff' }}
                  >
                    {coordinators.map(c => (
                      <option key={c.id} value={`${c.name} (${c.title})`}>
                        {c.name} - {c.department}
                      </option>
                    ))}
                    {coordinators.length === 0 && (
                      <option value="Dr. Rajesh K. (Senior Publication Lead)">Dr. Rajesh K. (Senior Publication Lead)</option>
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Service Line Items & Live Invoice Preview */}
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <CreditCard size={18} color="#2563eb" />
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase' }}>
                  3. Service Description &amp; Charges
                </span>
                <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#64748b', background: '#e2e8f0', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                  GST @ 18% auto-calculated
                </span>
                <button
                  type="button"
                  onClick={addService}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#2563eb', padding: '5px 12px', borderRadius: '7px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                >
                  <PlusCircle size={14} /> Add Service
                </button>
              </div>

              {/* Service Table */}
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#0b1a30' }}>
                      <th style={{ padding: '10px 14px', fontSize: '10.5px', fontWeight: 700, color: '#e2e8f0', textAlign: 'left', letterSpacing: '0.5px' }}>#</th>
                      <th style={{ padding: '10px 14px', fontSize: '10.5px', fontWeight: 700, color: '#e2e8f0', textAlign: 'left', letterSpacing: '0.5px' }}>Description of Service</th>
                      <th style={{ padding: '10px 14px', fontSize: '10.5px', fontWeight: 700, color: '#e2e8f0', textAlign: 'center', letterSpacing: '0.5px' }}>HSN/SAC</th>
                      <th style={{ padding: '10px 14px', fontSize: '10.5px', fontWeight: 700, color: '#e2e8f0', textAlign: 'center', letterSpacing: '0.5px' }}>Included?</th>
                      <th style={{ padding: '10px 14px', fontSize: '10.5px', fontWeight: 700, color: '#e2e8f0', textAlign: 'right', letterSpacing: '0.5px' }}>Unit Price (₹)</th>
                      <th style={{ padding: '10px 14px', width: '36px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((svc, idx) => (
                      <tr key={svc.id} style={{ borderBottom: '1px solid #f1f5f9', background: idx % 2 === 1 ? '#f8fafc' : '#fff' }}>
                        <td style={{ padding: '12px 14px', fontSize: '12px', color: '#64748b', fontWeight: 700 }}>
                          {String(idx + 1).padStart(2, '0')}
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <div style={{ flex: 1 }}>
                              <input
                                type="text"
                                value={svc.name}
                                onChange={e => updateService(svc.id, 'name', e.target.value)}
                                style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '13px', fontWeight: 700, color: '#0f172a', outline: 'none', marginBottom: '3px' }}
                              />
                              <input
                                type="text"
                                value={svc.desc}
                                onChange={e => updateService(svc.id, 'desc', e.target.value)}
                                style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '11px', color: '#64748b', outline: 'none' }}
                              />
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                          <input
                            type="text"
                            value={svc.hsn}
                            onChange={e => updateService(svc.id, 'hsn', e.target.value)}
                            style={{ width: '64px', padding: '4px 6px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '11.5px', textAlign: 'center', fontFamily: 'monospace' }}
                          />
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, color: svc.included ? '#16a34a' : '#64748b' }}>
                            <input
                              type="checkbox"
                              checked={svc.included}
                              onChange={e => updateService(svc.id, 'included', e.target.checked)}
                              style={{ accentColor: '#16a34a', width: '15px', height: '15px' }}
                            />
                            {svc.included ? 'Yes' : 'No'}
                          </label>
                        </td>
                        <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                          {svc.included ? (
                            <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700, background: '#dcfce7', padding: '3px 10px', borderRadius: '6px' }}>Included</span>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                              <span style={{ fontSize: '13px', color: '#64748b' }}>₹</span>
                              <input
                                type="number"
                                placeholder="0"
                                value={svc.price}
                                onChange={e => updateService(svc.id, 'price', e.target.value)}
                                style={{ width: '110px', padding: '6px 8px', border: '1.5px solid #2563eb', borderRadius: '6px', fontSize: '13.5px', fontWeight: 700, textAlign: 'right', outline: 'none' }}
                              />
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={() => removeService(svc.id)}
                            disabled={services.length === 1}
                            title="Remove service"
                            style={{ background: 'none', border: 'none', cursor: services.length === 1 ? 'not-allowed' : 'pointer', color: services.length === 1 ? '#cbd5e1' : '#ef4444', padding: '4px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Live GST Breakdown */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <div style={{ width: '300px', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', fontSize: '13px' }}>
                  {[
                    { label: 'Sub-Total (Base)', val: `₹${baseTotal.toLocaleString('en-IN')}`, muted: true },
                    { label: 'CGST @ 9%',        val: `₹${cgst.toLocaleString('en-IN')}`,      muted: true },
                    { label: 'SGST @ 9%',        val: `₹${sgst.toLocaleString('en-IN')}`,      muted: true },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px', borderBottom: '1px solid #f1f5f9' }}>
                      <span style={{ color: '#64748b' }}>{row.label}</span>
                      <span style={{ fontWeight: 700, color: '#334155' }}>{row.val}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#0b1a30', color: '#fff', fontWeight: 800, fontSize: '14px' }}>
                    <span>Total Invoice Amount</span>
                    <span style={{ color: '#4ade80' }}>₹{totalFee.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Payment Received */}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#16a34a', marginBottom: '4px' }}>Amount Paid Now (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 15000"
                    value={formData.amount_paid}
                    onChange={e => setFormData({ ...formData, amount_paid: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #bbf7d0', fontSize: '14px', fontWeight: 700, background: '#f0fdf4' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: remainingFee > 0 ? '#dc2626' : '#16a34a', marginBottom: '4px' }}>Balance Due (₹)</label>
                  <div style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '15px', fontWeight: 800, background: remainingFee > 0 ? '#fef2f2' : '#f0fdf4', color: remainingFee > 0 ? '#dc2626' : '#16a34a' }}>
                    ₹{remainingFee.toLocaleString('en-IN')}{remainingFee === 0 && totalFee > 0 ? ' ✓' : ''}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Payment Mode</label>
                  <select
                    value={formData.payment_method}
                    onChange={e => setFormData({ ...formData, payment_method: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff' }}
                  >
                    <option value="NEFT / Net Banking">NEFT / Net Banking</option>
                    <option value="UPI / Direct Transfer">UPI / Direct Transfer</option>
                    <option value="RTGS / Wire Transfer">RTGS / Wire Transfer</option>
                    <option value="Credit / Debit Card">Credit / Debit Card</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>Bank Transaction / UTR No.</label>
                  <input
                    type="text"
                    placeholder="e.g. UTR-HDFC99882211"
                    value={formData.transaction_ref}
                    onChange={e => setFormData({ ...formData, transaction_ref: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => navigate('/admin/papers')}
                style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontWeight: 600, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
              >
                {isSubmitting ? 'Registering...' : 'Register Paper & Create Invoice'}
              </button>
            </div>

          </form>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminNewPaper;
