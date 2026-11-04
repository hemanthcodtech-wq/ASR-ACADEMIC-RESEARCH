import React, { useState, useEffect } from 'react';
import PortalLayout from '../portal/PortalLayout';
import { api } from '../portal/apiService';
import {
  CreditCard,
  DollarSign,
  Download,
  CheckCircle,
  FileText,
  Clock,
  ShieldCheck,
  AlertCircle,
  Receipt,
  HelpCircle
} from 'lucide-react';
import '../portal/PortalPages.css';
import { generateInvoicePDF } from '../portal/InvoicePDF';

const PaymentAccountPage = () => {
  const [papers, setPapers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [receiptMsg, setReceiptMsg] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch only this author's papers and payment records directly from DB
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
          api.getPayments(u.token).then(r => {
            if (r && r.payments) {
              setPayments(r.payments);
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

  // Live payment record for the active manuscript
  const activePayment = payments.find(p => p.paper_id === selectedId) || currentPaper?.payment;

  const handleDownloadInvoice = () => {
    const session = localStorage.getItem('asr_author_user');
    let author = {};
    try { author = session ? JSON.parse(session)?.user || {} : {}; } catch (_) {}
    generateInvoicePDF({ paper: currentPaper, payment: activePayment, author });
    setReceiptMsg(`✓ Invoice opened in new tab — use "Save as PDF" or Ctrl+P / ⌘+P to download.`);
    setTimeout(() => setReceiptMsg(''), 5000);
  };

  const totalInvoiced = activePayment ? Number(activePayment.total_amount || 0) : 0;
  const amountPaid = activePayment ? Number(activePayment.amount_paid || 0) : 0;
  const balanceDue = totalInvoiced - amountPaid;

  return (
    <PortalLayout
      activeNav="payments"
      title="Payment &amp; Account Information (Author View)"
      subtitle="Complete financial ledger, verified payment status, downloadable GST receipts, and transaction history."
    >
      <div className="portal-subpage-container">

        {!loading && papers.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '48px 24px', textAlign: 'center' }}>
            <CreditCard size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>No Financial Records Found</h3>
            <p style={{ color: '#64748b', fontSize: '13.5px', maxWidth: '480px', margin: '8px auto 0' }}>
              Your account currently has no payment transactions or pending invoices recorded in the database.
            </p>
          </div>
        ) : currentPaper && (
          <>
            {/* Paper Selector Strip */}
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

            {receiptMsg && (
              <div className="portal-success-strip">
                <CheckCircle size={18} />
                <span>{receiptMsg}</span>
              </div>
            )}

            {/* 2-Column Ledger Layout */}
            <div className="portal-details-grid">
              
              {/* Left Column: Active Invoice Summary */}
              <div className="portal-specs-column">
                <div className="portal-content-card">
                  <div className="card-top-header">
                    <div>
                      <span className="meta-category-badge">MODULE 6 • BILLING &amp; ACCOUNTS</span>
                      <h2 className="paper-hero-heading">{currentPaper.title}</h2>
                      <span className="sub-journal-tag">Target: {currentPaper.target_journal || currentPaper.journal} ({currentPaper.id})</span>
                    </div>
                    {activePayment ? (
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 800,
                        background: activePayment.payment_status === 'Paid' ? '#dcfce7' : activePayment.payment_status === 'Partial' ? '#fef3c7' : '#fee2e2',
                        color: activePayment.payment_status === 'Paid' ? '#15803d' : activePayment.payment_status === 'Partial' ? '#b45309' : '#991b1b'
                      }}>
                        {activePayment.payment_status}
                      </span>
                    ) : (
                      <span style={{ background: '#f1f5f9', color: '#64748b', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>
                        No Invoice Generated
                      </span>
                    )}
                  </div>

                  {activePayment ? (
                    <>
                      {/* Stats Tiles */}
                      <div className="grid-two-by-two">
                        <div className="spec-tile">
                          <div className="spec-icon-box green"><Receipt size={18} /></div>
                          <div>
                            <span className="spec-mini-label">Total Amount Paid</span>
                            <strong className="spec-main-val text-green">₹{amountPaid.toLocaleString('en-IN')}</strong>
                            <span className="spec-sub-val">All inclusive of taxes &amp; APC</span>
                          </div>
                        </div>

                        <div className="spec-tile">
                          <div className="spec-icon-box blue"><CreditCard size={18} /></div>
                          <div>
                            <span className="spec-mini-label">Balance Outstanding</span>
                            <strong className="spec-main-val" style={{ color: balanceDue > 0 ? '#dc2626' : '#16a34a' }}>
                              ₹{balanceDue.toLocaleString('en-IN')}
                            </strong>
                            <span className="spec-sub-val">{balanceDue === 0 ? 'Zero dues pending' : 'Pending author clearance'}</span>
                          </div>
                        </div>

                        <div className="spec-tile">
                          <div className="spec-icon-box amber"><FileText size={18} /></div>
                          <div>
                            <span className="spec-mini-label">Invoice Number</span>
                            <strong className="spec-main-val">{activePayment.invoice_number || activePayment.invoiceId || 'INV-PENDING'}</strong>
                            <span className="spec-sub-val">GST Registered &amp; Audited</span>
                          </div>
                        </div>

                        <div className="spec-tile">
                          <div className="spec-icon-box purple"><Clock size={18} /></div>
                          <div>
                            <span className="spec-mini-label">Transaction Mode &amp; Reference</span>
                            <strong className="spec-main-val">{activePayment.payment_method || 'Bank Transfer'}</strong>
                            <span className="spec-sub-val" style={{ fontFamily: 'monospace' }}>{activePayment.transaction_ref || 'Pending'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Download Invoice Button */}
                      <div className="invoice-download-cta-box">
                        <div>
                          <strong>Need Invoice for University Reimbursement?</strong>
                          <p>Download our official signed invoice containing GST registration and institution tax details.</p>
                        </div>
                        <button 
                          onClick={handleDownloadInvoice}
                          className="btn-download-tax-invoice"
                        >
                          <Download size={16} /> Download Tax Invoice (PDF)
                        </button>
                      </div>

                      {/* Transaction Audit Log & Installment History */}
                      <div style={{ marginTop: '24px', borderTop: '1px solid #f1f5f9', paddingTop: '18px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Installment History &amp; Verified Transactions ({activePayment.transactions?.length || 1})
                          </span>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#16a34a', background: '#dcfce7', padding: '2px 8px', borderRadius: '10px' }}>
                            Synced with Bank Ledger
                          </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {activePayment.transactions && activePayment.transactions.length > 0 ? (
                            activePayment.transactions.map((tx, idx) => (
                              <div
                                key={tx.id || idx}
                                style={{
                                  background: '#f8fafc',
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '8px',
                                  padding: '10px 14px',
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                }}
                              >
                                <div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <strong style={{ fontSize: '13.5px', color: '#16a34a' }}>+ ₹{Number(tx.amount).toLocaleString('en-IN')}</strong>
                                    <span style={{ fontSize: '11.5px', color: '#475569', background: '#fff', border: '1px solid #cbd5e1', padding: '1px 6px', borderRadius: '4px' }}>
                                      {tx.method || 'Online Transfer'}
                                    </span>
                                  </div>
                                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', fontFamily: 'monospace' }}>
                                    Ref: {tx.transaction_ref || 'Verified Entry'}
                                  </div>
                                </div>
                                <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                                  {tx.timestamp ? new Date(tx.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recorded'}
                                </span>
                              </div>
                            ))
                          ) : (
                            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <strong style={{ fontSize: '13.5px', color: '#16a34a' }}>+ ₹{Number(activePayment.amount_paid).toLocaleString('en-IN')}</strong>
                                <span style={{ fontSize: '11.5px', color: '#475569', marginLeft: '8px' }}>{activePayment.payment_method || 'NEFT / Net Banking'}</span>
                                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', fontFamily: 'monospace' }}>
                                  Ref: {activePayment.transaction_ref || 'Direct Bank Credit'}
                                </div>
                              </div>
                              <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                                {activePayment.paid_at ? new Date(activePayment.paid_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Initial Payment'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '36px 16px', color: '#64748b' }}>
                      <p style={{ margin: 0, fontWeight: 600 }}>No active invoice recorded for this manuscript yet.</p>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                        Invoices generated by the finance division will appear here once peer review milestone clears.
                      </span>
                    </div>
                  )}

                </div>
              </div>

              {/* Right Column: Payment Instructions & Bank Transfer Info */}
              <div className="portal-notes-column">
                <div className="portal-content-card">
                  <div className="card-top-header">
                    <div className="header-with-icon">
                      <CreditCard size={18} className="text-accent" />
                      <h3>Bank Transfer Instructions (NEFT / RTGS / UPI)</h3>
                    </div>
                  </div>

                  <p className="card-desc-text">
                    Use the following verified institutional bank accounts for manuscript publication processing charges:
                  </p>

                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                    <div><strong>Account Name:</strong> ASR Academic Research Solutions</div>
                    <div><strong>Bank:</strong> HDFC Bank Ltd.</div>
                    <div><strong>Account No:</strong> 50200084920192</div>
                    <div><strong>IFSC Code:</strong> HDFC0001290</div>
                    <div><strong>Branch:</strong> Bengaluru Regional Hub</div>
                    <div><strong>UPI ID:</strong> asracademic@hdfcbank</div>
                  </div>

                  <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#16a34a', background: '#f0fdf4', padding: '10px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                    <ShieldCheck size={18} />
                    <span>Always quote your Paper ID (<strong>{currentPaper.id}</strong>) in transaction remarks for instant verification.</span>
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

export default PaymentAccountPage;
