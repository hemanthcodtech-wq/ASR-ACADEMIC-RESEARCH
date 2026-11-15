import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { api } from '../portal/apiService';
import { CreditCard, CheckCircle, Clock, Search, DollarSign, ArrowUpRight, Download, RefreshCw, Plus, RotateCcw, PlusCircle, History } from 'lucide-react';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [papers, setPapers] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPartialModal, setShowPartialModal] = useState(false);
  const [selectedRecordForPartial, setSelectedRecordForPartial] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Partial Payment Form State
  const [partialData, setPartialData] = useState({
    add_amount: '',
    payment_method: 'NEFT / Net Banking',
    transaction_ref: ''
  });

  const [newPayment, setNewPayment] = useState({
    paper_id: '',
    author_email: '',
    total_amount: 35000,
    amount_paid: 15000,
    payment_method: 'NEFT / Net Banking',
    transaction_ref: '',
    invoice_number: ''
  });

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
      api.getAllPaymentsForAdmin(token).then(r => {
        if (r && r.payments) setPayments(r.payments);
      });
      api.getAllPapersForAdmin(token).then(r => {
        if (r && r.papers) {
          setPapers(r.papers);
          if (!newPayment.paper_id && r.papers.length > 0) {
            setNewPayment(prev => ({
              ...prev,
              paper_id: r.papers[0].id,
              author_email: r.papers[0].primary_author_email
            }));
          }
        }
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (paymentId, newStatus, newAmountPaid) => {
    const token = getAuthToken();
    const res = await api.updatePaymentStatus(token, paymentId, {
      payment_status: newStatus,
      amount_paid: newAmountPaid
    });

    if (res && res.success) {
      setSuccessMsg(`Payment #${paymentId} updated to "${newStatus}"! Author portal ledger synchronized.`);
      loadData();
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  const handleRecordPartialPayment = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const addAmt = Number(partialData.add_amount);
    if (!addAmt || addAmt <= 0) {
      setErrorMsg('Please enter a valid payment amount greater than zero.');
      return;
    }

    if (!selectedRecordForPartial) return;

    const remaining = Number(selectedRecordForPartial.total_amount) - Number(selectedRecordForPartial.amount_paid);
    if (addAmt > remaining) {
      setErrorMsg(`Amount entered (₹${addAmt.toLocaleString('en-IN')}) exceeds the remaining balance (₹${remaining.toLocaleString('en-IN')}).`);
      return;
    }

    const token = getAuthToken();
    const res = await api.updatePaymentStatus(token, selectedRecordForPartial.id, {
      add_amount: addAmt,
      payment_method: partialData.payment_method,
      transaction_ref: partialData.transaction_ref
    });

    if (res && res.success) {
      setSuccessMsg(`✓ ₹${addAmt.toLocaleString('en-IN')} added to payment #${selectedRecordForPartial.id}! Author ledger and transaction history synchronized.`);
      setShowPartialModal(false);
      setSelectedRecordForPartial(null);
      setPartialData({ add_amount: '', payment_method: 'NEFT / Net Banking', transaction_ref: '' });
      loadData();
      setTimeout(() => setSuccessMsg(''), 4500);
    } else {
      setErrorMsg(res?.message || 'Failed to record installment payment.');
    }
  };

  const openPartialPaymentModal = (record) => {
    setSelectedRecordForPartial(record);
    const remaining = Number(record.total_amount) - Number(record.amount_paid);
    setPartialData({
      add_amount: remaining > 0 ? remaining : '',
      payment_method: 'NEFT / Net Banking',
      transaction_ref: `UTR-${Date.now().toString().slice(-8)}`
    });
    setErrorMsg('');
    setShowPartialModal(true);
  };

  const handleCreatePayment = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!newPayment.paper_id || !newPayment.total_amount) {
      setErrorMsg('Paper ID and Total Amount are required.');
      return;
    }

    const token = getAuthToken();
    const res = await api.createPaymentRecord(token, newPayment);
    if (res && res.success) {
      setSuccessMsg(`Payment invoice created for "${newPayment.paper_id}" and synced to author!`);
      setShowModal(false);
      loadData();
      setTimeout(() => setSuccessMsg(''), 4500);
    } else {
      setErrorMsg(res?.message || 'Failed to create payment record.');
    }
  };

  const filtered = payments.filter(p =>
    p.author_email?.toLowerCase().includes(search.toLowerCase()) ||
    p.paper_id?.toLowerCase().includes(search.toLowerCase()) ||
    p.invoice_number?.toLowerCase().includes(search.toLowerCase())
  );

  const totalInvoiced = payments.reduce((acc, p) => acc + Number(p.total_amount || 0), 0);
  const totalPaid = payments.reduce((acc, p) => acc + Number(p.amount_paid || 0), 0);
  const totalPending = totalInvoiced - totalPaid;

  const modalRemaining = Number(newPayment.total_amount || 0) - Number(newPayment.amount_paid || 0);

  return (
    <AdminLayout
      activeNav="payments"
      title="Payment &amp; Invoicing Administration"
      subtitle="Reconcile NEFT/UPI bank transactions, add new invoices, mark payments as Paid, and synchronize author balances."
    >
      <div className="portal-subpage-container">

        {successMsg && (
          <div className="portal-success-strip" style={{ marginBottom: '20px' }}>
            <CheckCircle size={18} color="#16a34a" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Financial KPI Banner */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '18px', borderRadius: '12px' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Gross Invoiced</span>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>₹{totalInvoiced.toLocaleString('en-IN')}</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Total fees across all manuscripts</div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '18px', borderRadius: '12px' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Verified Receipts</span>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#16a34a', marginTop: '6px' }}>₹{totalPaid.toLocaleString('en-IN')}</div>
            <div style={{ fontSize: '11px', color: '#16a34a', marginTop: '2px' }}>Credited into bank accounts</div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '18px', borderRadius: '12px' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Outstanding Balance</span>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#dc2626', marginTop: '6px' }}>₹{totalPending.toLocaleString('en-IN')}</div>
            <div style={{ fontSize: '11px', color: '#b45309', marginTop: '2px' }}>Awaiting clearance from authors</div>
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ position: 'relative', minWidth: '320px', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search by invoice number, paper ID, or author email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
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
            <Plus size={16} />
            <span>+ Add Payment Record / Invoice</span>
          </button>
        </div>

        {/* Payment Records Table */}
        <div className="portal-table-responsive-wrapper">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Invoice # &amp; Paper</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Author Email</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Total / Paid / Remaining</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Status</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Method &amp; Ref</th>
                <th style={{ padding: '12px 16px', fontWeight: 700, color: '#475569' }}>Admin Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const balance = Number(p.total_amount) - Number(p.amount_paid);
                return (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>{p.invoice_number}</div>
                      <div style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>{p.paper_id}</div>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#334155' }}>
                      {p.author_email}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div>Total: <strong>₹{Number(p.total_amount).toLocaleString('en-IN')}</strong></div>
                      <div style={{ fontSize: '11.5px', color: '#16a34a' }}>Paid: ₹{Number(p.amount_paid).toLocaleString('en-IN')}</div>
                      <div style={{ fontSize: '11.5px', color: balance > 0 ? '#dc2626' : '#16a34a', fontWeight: 700 }}>
                        Remaining: ₹{balance.toLocaleString('en-IN')} {balance === 0 && '✓'}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 700,
                        background: p.payment_status === 'Paid' ? '#dcfce7' : p.payment_status === 'Partial' ? '#fef3c7' : '#fee2e2',
                        color: p.payment_status === 'Paid' ? '#15803d' : p.payment_status === 'Partial' ? '#b45309' : '#991b1b'
                      }}>
                        {p.payment_status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '12px', color: '#64748b' }}>
                      <div>{p.payment_method || 'Bank Transfer'}</div>
                      <div style={{ fontFamily: 'monospace', color: '#0f172a' }}>{p.transaction_ref || 'Pending'}</div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        {p.payment_status !== 'Paid' && (
                          <>
                            <button
                              onClick={() => openPartialPaymentModal(p)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                background: '#eff6ff',
                                color: '#1d4ed8',
                                border: '1.5px solid #bfdbfe',
                                padding: '6px 12px',
                                borderRadius: '7px',
                                fontSize: '12px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                              }}
                              title="Add an installment without altering total fee"
                            >
                              <PlusCircle size={14} />
                              <span>+ Add Partial Paid</span>
                            </button>

                            <button
                              onClick={() => handleUpdateStatus(p.id, 'Paid', p.total_amount)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                background: '#10b981',
                                color: '#fff',
                                border: 'none',
                                padding: '6px 12px',
                                borderRadius: '7px',
                                fontSize: '12px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: '0 2px 5px rgba(16, 185, 129, 0.25)',
                                transition: 'all 0.15s ease'
                              }}
                              title="Mark this invoice as fully paid"
                            >
                              <CheckCircle size={14} />
                              <span>Mark Full Paid</span>
                            </button>
                          </>
                        )}
                        {p.payment_status === 'Paid' && (
                          <button
                            onClick={() => handleUpdateStatus(p.id, 'Pending', 0)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              background: '#fff1f2',
                              color: '#e11d48',
                              border: '1.5px solid #fecdd3',
                              padding: '6px 12px',
                              borderRadius: '7px',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              boxShadow: '0 1px 3px rgba(225, 29, 72, 0.08)'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.background = '#ffe4e6'; e.currentTarget.style.borderColor = '#fda4af'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = '#fff1f2'; e.currentTarget.style.borderColor = '#fecdd3'; }}
                            title="Reset invoice back to Pending status (Zero amount paid)"
                          >
                            <RotateCcw size={13} />
                            <span>Reset Payment</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Modal: Add Payment / Invoice Record */}
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
            <div style={{ background: '#fff', borderRadius: '14px', maxWidth: '520px', width: '100%', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Create Payment Invoice</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}>&times;</button>
              </div>

              {errorMsg && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '10px', borderRadius: '6px', fontSize: '12.5px', marginBottom: '14px' }}>
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleCreatePayment} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Target Manuscript ID *</label>
                  <select
                    value={newPayment.paper_id}
                    onChange={e => {
                      const selected = papers.find(p => p.id === e.target.value);
                      setNewPayment({
                        ...newPayment,
                        paper_id: e.target.value,
                        author_email: selected ? selected.primary_author_email : newPayment.author_email
                      });
                    }}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="">-- Choose Manuscript --</option>
                    {papers.map(p => (
                      <option key={p.id} value={p.id}>{p.id} - {p.title.slice(0, 42)}...</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Author Email (Receives Receipt) *</label>
                  <input
                    type="email"
                    required
                    value={newPayment.author_email}
                    onChange={e => setNewPayment({ ...newPayment, author_email: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Total Amount (INR) *</label>
                    <input
                      type="number"
                      required
                      value={newPayment.total_amount}
                      onChange={e => setNewPayment({ ...newPayment, total_amount: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: 700 }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#16a34a', marginBottom: '4px' }}>Amount Paid (INR) *</label>
                    <input
                      type="number"
                      required
                      value={newPayment.amount_paid}
                      onChange={e => setNewPayment({ ...newPayment, amount_paid: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #bbf7d0', background: '#f0fdf4', fontWeight: 700 }}
                    />
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#475569' }}>Calculated Remaining Balance:</span>
                  <strong style={{ fontSize: '15px', color: modalRemaining > 0 ? '#dc2626' : '#16a34a' }}>
                    ₹{modalRemaining.toLocaleString('en-IN')}
                  </strong>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Payment Mode</label>
                    <select
                      value={newPayment.payment_method}
                      onChange={e => setNewPayment({ ...newPayment, payment_method: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                    >
                      <option value="NEFT / Net Banking">NEFT / Net Banking</option>
                      <option value="UPI / Direct Transfer">UPI / Direct Transfer</option>
                      <option value="RTGS / Wire Transfer">RTGS / Wire Transfer</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>UTR / Reference #</label>
                    <input
                      type="text"
                      placeholder="e.g. UTR-HDFC998811"
                      value={newPayment.transaction_ref}
                      onChange={e => setNewPayment({ ...newPayment, transaction_ref: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
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
                    Save &amp; Generate Invoice
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Record Partial Installment Payment */}
        {showPartialModal && selectedRecordForPartial && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
            <div style={{ background: '#fff', borderRadius: '14px', maxWidth: '500px', width: '100%', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>
                    Record Installment Payment
                  </h3>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Invoice: {selectedRecordForPartial.invoice_number} ({selectedRecordForPartial.paper_id})
                  </span>
                </div>
                <button
                  onClick={() => setShowPartialModal(false)}
                  style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}
                >
                  &times;
                </button>
              </div>

              {errorMsg && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '10px', borderRadius: '6px', fontSize: '12.5px', marginBottom: '14px' }}>
                  {errorMsg}
                </div>
              )}

              {/* Status Breakdown Pill Strip */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Total Invoiced Fee:</span>
                  <strong>₹{Number(selectedRecordForPartial.total_amount).toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Already Paid:</span>
                  <strong style={{ color: '#16a34a' }}>₹{Number(selectedRecordForPartial.amount_paid).toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', paddingTop: '6px', borderTop: '1px solid #e2e8f0' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>Current Remaining Balance:</span>
                  <strong style={{ color: '#dc2626' }}>
                    ₹{(Number(selectedRecordForPartial.total_amount) - Number(selectedRecordForPartial.amount_paid)).toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>

              <form onSubmit={handleRecordPartialPayment} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                    How Much Paid in this Installment (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    autoFocus
                    placeholder="e.g. 10000"
                    value={partialData.add_amount}
                    onChange={e => setPartialData({ ...partialData, add_amount: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #2563eb',
                      background: '#eff6ff',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#1d4ed8'
                    }}
                  />
                  <span style={{ fontSize: '11px', color: '#64748b', marginTop: '3px', display: 'block' }}>
                    New remaining will be: <strong>₹{Math.max(0, (Number(selectedRecordForPartial.total_amount) - Number(selectedRecordForPartial.amount_paid) - (Number(partialData.add_amount) || 0))).toLocaleString('en-IN')}</strong>
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                      Payment Method
                    </label>
                    <select
                      value={partialData.payment_method}
                      onChange={e => setPartialData({ ...partialData, payment_method: e.target.value })}
                      style={{ width: '100%', padding: '9px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                    >
                      <option value="NEFT / Net Banking">NEFT / Net Banking</option>
                      <option value="UPI / Direct Transfer">UPI / Direct Transfer</option>
                      <option value="RTGS / Wire Transfer">RTGS / Wire Transfer</option>
                      <option value="Cash / Cheque Deposit">Cash / Cheque Deposit</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                      Bank Transaction / UTR #
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. UTR-99881122"
                      value={partialData.transaction_ref}
                      onChange={e => setPartialData({ ...partialData, transaction_ref: e.target.value })}
                      style={{ width: '100%', padding: '9px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setShowPartialModal(false)}
                    style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '8px 20px',
                      borderRadius: '6px',
                      border: 'none',
                      background: '#2563eb',
                      color: '#fff',
                      cursor: 'pointer',
                      fontWeight: 700,
                      boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)'
                    }}
                  >
                    Credit Installment &amp; Update Balance
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

export default AdminPayments;
