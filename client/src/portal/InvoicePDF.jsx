/**
 * InvoicePDF — opens a styled print window and triggers Save-as-PDF.
 * No external dependencies; uses window.print() with a dedicated print stylesheet.
 */

export function generateInvoicePDF({ paper, payment, author }) {
  const fmt = (n) => `₹${Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

  const invoiceNo   = payment?.invoice_number || payment?.invoiceId || 'INV-ASR-0000';
  const issueDate   = payment?.paid_at
    ? new Date(payment.paid_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const totalAmt    = Number(payment?.total_amount || payment?.amount_paid || 0);
  const paidAmt     = Number(payment?.amount_paid || 0);
  const balanceAmt  = totalAmt - paidAmt;
  const method      = payment?.payment_method || 'Bank Transfer (NEFT)';
  const txRef       = payment?.transaction_ref || '—';
  const status      = payment?.payment_status || 'Paid';
  const authorName  = author?.fullName || author?.name || 'Author';
  const authorEmail = author?.email || '';
  const authorInst  = author?.institution || paper?.department || '';

  // Use admin-configured services if available, else derive from total
  const rawServices = payment?.services || paper?.services || null;
  let baseAmt, cgst, sgst, serviceRows;

  if (rawServices && rawServices.length > 0) {
    baseAmt     = rawServices.reduce((s, r) => s + (r.included ? 0 : Number(r.price) || 0), 0);
    cgst        = Math.round(baseAmt * 0.09);
    sgst        = cgst;
    serviceRows = rawServices.map((svc, i) => `
      <tr>
        <td>${String(i + 1).padStart(2, '0')}</td>
        <td>
          <span class="item-desc">${svc.name}</span>
          <span class="item-sub">${svc.desc || ''}</span>
        </td>
        <td>${svc.hsn || '998314'}</td>
        <td>1</td>
        <td class="right">${svc.included ? 'Included' : fmt(svc.price)}</td>
        <td class="right">${svc.included ? '—' : fmt(svc.price)}</td>
      </tr>`).join('');
  } else {
    baseAmt     = Math.round(totalAmt / 1.18);
    cgst        = Math.round((totalAmt - baseAmt) / 2);
    sgst        = cgst;
    serviceRows = `
      <tr>
        <td>01</td>
        <td><span class="item-desc">Academic Publication Processing Charge (APC)</span><span class="item-sub">End-to-end manuscript submission, peer-review facilitation, editorial coordination &amp; journal placement services</span></td>
        <td>998314</td><td>1</td><td class="right">${fmt(baseAmt)}</td><td class="right">${fmt(baseAmt)}</td>
      </tr>
      <tr>
        <td>02</td>
        <td><span class="item-desc">Plagiarism &amp; Similarity Audit (Turnitin)</span><span class="item-sub">Authenticated similarity report with AI-detection summary</span></td>
        <td>998314</td><td>1</td><td class="right">Included</td><td class="right">—</td>
      </tr>
      <tr>
        <td>03</td>
        <td><span class="item-desc">Technical Proofreading &amp; Formatting</span><span class="item-sub">Journal-specific formatting, language editing &amp; compliance check</span></td>
        <td>998314</td><td>1</td><td class="right">Included</td><td class="right">—</td>
      </tr>`;
  }

  const transactions = payment?.transactions?.length
    ? payment.transactions
    : [{ amount: paidAmt, method, transaction_ref: txRef, timestamp: payment?.paid_at }];

  const txRows = transactions.map((tx, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${tx.timestamp ? new Date(tx.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : issueDate}</td>
      <td>${tx.method || method}</td>
      <td style="font-family:monospace;font-size:11px">${tx.transaction_ref || '—'}</td>
      <td class="right green"><strong>${fmt(tx.amount)}</strong></td>
    </tr>`).join('');

  const statusColor = status === 'Paid' ? '#22c55e' : status === 'Partial' ? '#f59e0b' : '#ef4444';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Tax Invoice ${invoiceNo} — ASR Academic Research Solutions</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Inter',sans-serif;background:#f1f5f9;color:#1e293b;font-size:13px;line-height:1.5}

  .page{
    width:794px;min-height:1123px;margin:32px auto;background:#fff;
    border-radius:12px;overflow:hidden;
    box-shadow:0 8px 40px rgba(0,0,0,0.12);
  }

  /* ── Header ── */
  .inv-header{
    background:linear-gradient(135deg,#0b1a30 0%,#1e3a8a 100%);
    padding:36px 44px 28px;
    display:flex;justify-content:space-between;align-items:flex-start;
    color:#fff;
  }
  .inv-header .logo-wrap{display:flex;align-items:center;gap:14px}
  .inv-header .logo-wrap img{width:52px;height:52px;border-radius:10px;background:#fff;padding:4px}
  .inv-header .brand h1{font-size:20px;font-weight:900;letter-spacing:-0.3px}
  .inv-header .brand p{font-size:11px;color:#93c5fd;margin-top:2px}
  .inv-header .brand .gst-tag{
    display:inline-block;margin-top:6px;
    background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.25);
    padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:0.5px;color:#bfdbfe
  }
  .inv-meta{text-align:right}
  .inv-meta .inv-label{font-size:11px;color:#93c5fd;font-weight:600;letter-spacing:1px;text-transform:uppercase}
  .inv-meta .inv-number{font-size:26px;font-weight:900;letter-spacing:-0.5px;margin:4px 0}
  .inv-meta .status-badge{
    display:inline-block;padding:4px 14px;border-radius:20px;font-size:11px;font-weight:800;
    background:${statusColor};color:#fff;letter-spacing:0.5px
  }
  .inv-meta .date-line{font-size:11px;color:#cbd5e1;margin-top:6px}

  /* ── Address Band ── */
  .addr-band{
    display:grid;grid-template-columns:1fr 1fr 1fr;gap:0;
    border-bottom:1px solid #e2e8f0;
  }
  .addr-cell{padding:22px 28px;border-right:1px solid #e2e8f0}
  .addr-cell:last-child{border-right:none}
  .addr-cell .cell-label{
    font-size:9.5px;font-weight:800;color:#2563eb;letter-spacing:1px;
    text-transform:uppercase;margin-bottom:8px;
    display:flex;align-items:center;gap:5px
  }
  .addr-cell .cell-label::before{
    content:'';display:inline-block;width:3px;height:12px;
    background:#2563eb;border-radius:2px
  }
  .addr-cell strong{display:block;font-size:13.5px;font-weight:800;color:#0b1a30;margin-bottom:3px}
  .addr-cell p{font-size:11.5px;color:#475569;line-height:1.6;margin:0}
  .addr-cell .mono{font-family:monospace;font-size:11px;color:#64748b}

  /* ── Paper Details ── */
  .paper-band{
    background:#f8fafc;border-bottom:1px solid #e2e8f0;
    padding:18px 28px;display:flex;align-items:flex-start;gap:16px
  }
  .paper-band .paper-icon{
    width:40px;height:40px;border-radius:10px;background:#eff6ff;
    display:flex;align-items:center;justify-content:center;flex-shrink:0
  }
  .paper-band .paper-icon svg{width:20px;height:20px;stroke:#2563eb;fill:none;stroke-width:2}
  .paper-band .paper-id{
    font-family:monospace;font-size:11px;font-weight:800;color:#2563eb;
    background:#dbeafe;padding:2px 8px;border-radius:4px;display:inline-block;margin-bottom:5px
  }
  .paper-band h3{font-size:14px;font-weight:800;color:#0b1a30;line-height:1.4;margin-bottom:3px}
  .paper-band p{font-size:11.5px;color:#64748b}

  /* ── Line Items Table ── */
  .section{padding:24px 28px}
  .section-title{
    font-size:10px;font-weight:800;color:#64748b;letter-spacing:1px;
    text-transform:uppercase;margin-bottom:12px;
    display:flex;align-items:center;gap:8px
  }
  .section-title::after{content:'';flex:1;height:1px;background:#e2e8f0}

  table{width:100%;border-collapse:collapse}
  thead tr{background:#0b1a30}
  thead th{
    padding:10px 14px;font-size:10.5px;font-weight:700;color:#e2e8f0;
    text-transform:uppercase;letter-spacing:0.5px;text-align:left
  }
  thead th.right{text-align:right}
  tbody tr{border-bottom:1px solid #f1f5f9}
  tbody tr:nth-child(even){background:#f8fafc}
  tbody td{padding:11px 14px;font-size:12.5px;color:#334155;vertical-align:top}
  tbody td.right{text-align:right}
  tbody td.green{color:#15803d}
  .item-desc{font-weight:700;color:#0f172a;display:block;margin-bottom:2px}
  .item-sub{font-size:11px;color:#64748b}

  /* ── Tax Summary ── */
  .totals-wrap{display:flex;justify-content:flex-end;padding:0 28px 24px}
  .totals-box{width:320px;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden}
  .totals-row{
    display:flex;justify-content:space-between;align-items:center;
    padding:9px 16px;border-bottom:1px solid #f1f5f9;font-size:12.5px
  }
  .totals-row:last-child{border-bottom:none}
  .totals-row.total-final{
    background:#0b1a30;color:#fff;font-size:14px;font-weight:800
  }
  .totals-row.total-final span:last-child{color:#4ade80}
  .totals-row .label{color:#64748b}
  .totals-row .val{font-weight:700;color:#0f172a}

  /* ── Transactions ── */
  .tx-section{padding:0 28px 24px}

  /* ── Footer ── */
  .inv-footer{
    background:#f8fafc;border-top:1px solid #e2e8f0;
    padding:20px 28px;display:flex;justify-content:space-between;align-items:flex-end;gap:20px
  }
  .inv-footer .notes p{font-size:11px;color:#64748b;line-height:1.6;max-width:420px}
  .inv-footer .notes strong{display:block;font-size:11.5px;color:#0f172a;margin-bottom:4px}
  .sig-block{text-align:center;flex-shrink:0}
  .sig-line{width:160px;border-top:1.5px solid #334155;margin:0 auto 6px}
  .sig-block p{font-size:10.5px;color:#475569;font-weight:600}
  .sig-block strong{display:block;font-size:11px;color:#0b1a30}

  .watermark-paid{
    position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-35deg);
    font-size:110px;font-weight:900;color:rgba(34,197,94,0.06);
    pointer-events:none;z-index:0;letter-spacing:8px;white-space:nowrap
  }

  @media print{
    body{background:#fff}
    .page{margin:0;border-radius:0;box-shadow:none;width:100%}
    .no-print{display:none!important}
    .watermark-paid{color:rgba(34,197,94,0.04)}
  }
</style>
</head>
<body>

<div class="watermark-paid">${status === 'Paid' ? 'PAID' : ''}</div>

<div class="no-print" style="text-align:center;padding:20px 0 0;display:flex;gap:12px;justify-content:center">
  <button onclick="window.print()" style="background:#2563eb;color:#fff;border:none;padding:11px 28px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">
    ⬇ Save as PDF / Print
  </button>
  <button onclick="window.close()" style="background:#f1f5f9;color:#475569;border:1px solid #cbd5e1;padding:11px 20px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit">
    ✕ Close
  </button>
</div>

<div class="page">

  <div class="inv-header">
    <div class="logo-wrap">
      <img src="/logo.png" alt="ASR Logo" onerror="this.style.display='none'"/>
      <div class="brand">
        <h1>ASR Academic Research Solutions</h1>
        <p>Empowering Research Excellence Globally</p>
        <span class="gst-tag">GSTIN: 29AABCA1234F1Z5 &nbsp;|&nbsp; PAN: AABCA1234F</span>
      </div>
    </div>
    <div class="inv-meta">
      <div class="inv-label">Tax Invoice</div>
      <div class="inv-number">${invoiceNo}</div>
      <div><span class="status-badge">${status.toUpperCase()}</span></div>
      <div class="date-line">Issue Date: ${issueDate}</div>
    </div>
  </div>

  <div class="addr-band">
    <div class="addr-cell">
      <div class="cell-label">Billed From</div>
      <strong>ASR Academic Research Solutions</strong>
      <p>
        #42, 3rd Floor, Prestige Tech Park,<br/>
        Outer Ring Road, Marathahalli,<br/>
        Bengaluru – 560 103, Karnataka, India<br/>
        <span class="mono">support@asracademic.com</span><br/>
        <span class="mono">+91 95152 07724</span>
      </p>
    </div>
    <div class="addr-cell">
      <div class="cell-label">Billed To</div>
      <strong>${authorName}</strong>
      <p>
        ${authorInst ? authorInst + '<br/>' : ''}
        <span class="mono">${authorEmail}</span>
      </p>
    </div>
    <div class="addr-cell">
      <div class="cell-label">Invoice Details</div>
      <p>
        <strong style="font-size:12px">Invoice No.</strong><br/>
        <span class="mono">${invoiceNo}</span><br/><br/>
        <strong style="font-size:12px">Manuscript ID</strong><br/>
        <span class="mono">${paper?.id || '—'}</span><br/><br/>
        <strong style="font-size:12px">Payment Mode</strong><br/>
        ${method}
      </p>
    </div>
  </div>

  <div class="paper-band">
    <div class="paper-icon">
      <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    </div>
    <div>
      <span class="paper-id">${paper?.id || ''}</span>
      <h3>${paper?.title || 'Research Manuscript'}</h3>
      <p>${paper?.target_journal || paper?.journal || ''}</p>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Service Description &amp; Charges</div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Description of Service</th>
          <th>HSN / SAC</th>
          <th>Qty</th>
          <th class="right">Unit Price</th>
          <th class="right">Amount</th>
        </tr>
      </thead>
      <tbody>${serviceRows}</tbody>
    </table>
  </div>

  <div class="totals-wrap">
    <div class="totals-box">
      <div class="totals-row">
        <span class="label">Sub-Total (Base Amount)</span>
        <span class="val">${fmt(baseAmt)}</span>
      </div>
      <div class="totals-row">
        <span class="label">CGST @ 9%</span>
        <span class="val">${fmt(cgst)}</span>
      </div>
      <div class="totals-row">
        <span class="label">SGST @ 9%</span>
        <span class="val">${fmt(sgst)}</span>
      </div>
      <div class="totals-row">
        <span class="label">Amount Paid</span>
        <span class="val" style="color:#15803d">− ${fmt(paidAmt)}</span>
      </div>
      <div class="totals-row total-final">
        <span>Balance Due</span>
        <span>${fmt(balanceAmt)}</span>
      </div>
    </div>
  </div>

  <div class="tx-section">
    <div class="section-title">Payment Transaction History</div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Mode</th>
          <th>Reference / UTR</th>
          <th class="right">Amount Received</th>
        </tr>
      </thead>
      <tbody>${txRows}</tbody>
    </table>
  </div>

  <div class="inv-footer">
    <div class="notes">
      <strong>Terms &amp; Notes</strong>
      <p>
        • This is a computer-generated tax invoice and is valid without a physical signature.<br/>
        • GST is charged as per applicable Indian tax regulations (CGST + SGST @ 18%).<br/>
        • For university reimbursement, this invoice is accepted as an official institutional document.<br/>
        • Queries: <strong>accounts@asracademic.com</strong> &nbsp;|&nbsp; <strong>+91 95152 07724</strong>
      </p>
    </div>
    <div class="sig-block">
      <div style="height:36px"></div>
      <div class="sig-line"></div>
      <strong>Authorised Signatory</strong>
      <p>ASR Academic Research Solutions</p>
      <p style="font-size:10px;color:#94a3b8;margin-top:2px">GSTIN: 29AABCA1234F1Z5</p>
    </div>
  </div>

</div>

<div class="no-print" style="height:32px"></div>
<script>window.focus();</script>
</body>
</html>`;

  const win = window.open('', '_blank', 'width=900,height=900,scrollbars=yes');
  if (!win) { alert('Please allow pop-ups to download the invoice.'); return; }
  win.document.write(html);
  win.document.close();
}
