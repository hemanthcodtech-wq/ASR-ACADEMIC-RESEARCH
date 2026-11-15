import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { api, API_BASE } from '../portal/apiService';
import * as XLSX from 'xlsx';
import {
  PlusCircle,
  CheckCircle,
  FileText,
  AlertCircle,
  CreditCard,
  Trash2,
  Upload,
  Paperclip,
  FileSpreadsheet,
  Download,
  Users,
  Layers,
  ArrowRight
} from 'lucide-react';

const AdminNewPaper = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('single'); // 'single' or 'excel'
  const [authors, setAuthors] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // ----------------------------------------------------
  // MULTI-AUTHOR ROW LIST FOR SINGLE ENTRY
  // ----------------------------------------------------
  const [authorRows, setAuthorRows] = useState([
    { id: 1, name: 'Dr. Ashok Koujalagi', email: 'ashok.koujalagi@gmail.com', advance: 0, pending: 0 },
    { id: 2, name: 'Sri rama Chandra', email: 'sriramachandra@gmail.com', advance: 0, pending: 0 },
    { id: 3, name: 'Dr. B Srivani', email: 'b.srivani@gmail.com', advance: 5000, pending: 20000 },
    { id: 4, name: 'Dr K Maheswari', email: 'k.maheswari@gmail.com', advance: 3000, pending: 22000 },
    { id: 5, name: 'Mr. Rameh Kothapalli', email: 'rameh.k@gmail.com', advance: 0, pending: 0 },
    { id: 6, name: 'Dr. N S R Phanindra Kumar', email: 'phanindra.kumar@gmail.com', advance: 0, pending: 0 },
    { id: 7, name: 'Dr. Mukesh Soni', email: 'mukesh.soni@gmail.com', advance: 0, pending: 0 },
    { id: 8, name: 'Dr. Nidal AlSaid', email: 'nidal.alsaid@gmail.com', advance: 0, pending: 0 },
    { id: 9, name: 'Dr. CH M H Saibaba', email: 'chmh.saibaba@gmail.com', advance: 5000, pending: 20000 }
  ]);

  const addAuthorRow = () => {
    setAuthorRows(prev => [
      ...prev,
      { id: Date.now(), name: '', email: '', advance: 0, pending: 0 }
    ]);
  };

  const removeAuthorRow = (id) => {
    setAuthorRows(prev => prev.filter(a => a.id !== id));
  };

  const updateAuthorRow = (id, field, value) => {
    setAuthorRows(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const totalAuthorsAdvance = authorRows.reduce((sum, a) => sum + (Number(a.advance) || 0), 0);
  const totalAuthorsPending = authorRows.reduce((sum, a) => sum + (Number(a.pending) || 0), 0);
  const totalCalculatedFromAuthors = totalAuthorsAdvance + totalAuthorsPending;

  // Single Entry Form Data
  const [formData, setFormData] = useState({
    title: 'Advanced Detection of Single-Morphing Attacks for Secure Facial Recognition Using Discriminative Feature Learning and Similarity Analysis in Identity Verification Systems',
    target_journal: 'Energy Conversion and Management (Elsevier)',
    indexing_tier: 'SCI / SCIE / - Q1/Q2',
    status: 'Submitted',
    assigned_coordinator: 'Dr. Rajesh K. (Senior Publication Lead)',
    assigned_department: 'Electrical & Renewable Systems Cell',
    payment_method: 'NEFT / Net Banking',
    transaction_ref: ''
  });

  // Optional proof upload attached directly during registration
  const [proofFile, setProofFile] = useState(null);
  const [proofCategory, setProofCategory] = useState('Submission Confirmation Proof');
  const [proofDisplayName, setProofDisplayName] = useState('');

  // ----------------------------------------------------
  // EXCEL BULK IMPORT STATE
  // ----------------------------------------------------
  const [excelFile, setExcelFile] = useState(null);
  const [excelPreviewData, setExcelPreviewData] = useState([]);
  const [excelFileName, setExcelFileName] = useState('');

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
      api.getAllAuthors(token).then(r => r && r.authors && setAuthors(r.authors));
      api.getStaffCoordinators(token).then(r => r && r.coordinators && setCoordinators(r.coordinators));
    }
  }, []);

  // ----------------------------------------------------
  // EXCEL PARSING LOGIC (Handles format shown in screenshot)
  // ----------------------------------------------------
  const handleExcelFileUpload = (e) => {
    setErrorMsg('');
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setExcelFileName(file.name);
    setExcelFile(file);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const rawJson = XLSX.utils.sheet_to_json(ws, { defval: '' });

        if (!rawJson || rawJson.length === 0) {
          setErrorMsg('Uploaded spreadsheet is empty.');
          return;
        }

        // Process rows according to screenshot format
        const parsedRows = rawJson.map((row, rIdx) => {
          const title = (
            row['Titles'] || row['Title'] || row['titles'] || row['Manuscript Title'] || Object.values(row)[1] || ''
          ).toString().trim();

          const rawAuthorCell = (
            row['Authors'] || row['Author'] || row['authors'] || Object.values(row)[2] || ''
          ).toString();

          const status = (
            row['Status'] || row['status'] || 'Submitted'
          ).toString().trim();

          const sciScopus = (
            row['SCI/Scopus'] || row['Indexing'] || row['indexing_tier'] || 'SCI / SCIE / - Q1/Q2'
          ).toString().trim();

          const rawAdvanceCell = (
            row['Advance Received'] || row['Advance'] || row['advance'] || ''
          ).toString();

          const rawPendingCell = (
            row['Pending'] || row['Pending Amount'] || row['pending'] || ''
          ).toString();

          // Split multiline lines from cell e.g. "1. Dr. Ashok Koujalagi\n2. Sri rama Chandra..."
          const authorLines = rawAuthorCell.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
          const advanceLines = rawAdvanceCell.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
          const pendingLines = rawPendingCell.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

          const parsedAuthors = [];
          const count = Math.max(authorLines.length, 1);

          for (let i = 0; i < count; i++) {
            const rawNameLine = authorLines[i] || `Author ${i + 1}`;
            // Clean out leading numbers like "1. ", "2. "
            const cleanName = rawNameLine.replace(/^\d+[\.\)]\s*/, '').trim();

            // Parse advance from line e.g. "3. Dr. B Srivani - 5000" or direct cell value
            let advVal = 0;
            if (advanceLines[i]) {
              const match = advanceLines[i].match(/-?\s*(\d[\d,]*)/);
              if (match) advVal = Number(match[1].replace(/,/g, '')) || 0;
            }

            // Parse pending from line e.g. "3. Dr. B Srivani - 20000" or direct cell value
            let pendVal = 0;
            if (pendingLines[i]) {
              const match = pendingLines[i].match(/-?\s*(\d[\d,]*)/);
              if (match) pendVal = Number(match[1].replace(/,/g, '')) || 0;
            }

            const cleanEmail = `${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '')}@gmail.com`;

            parsedAuthors.push({
              order: i + 1,
              name: cleanName,
              email: cleanEmail,
              advance: advVal,
              pending: pendVal
            });
          }

          const rowTotalAdvance = parsedAuthors.reduce((s, a) => s + a.advance, 0);
          const rowTotalPending = parsedAuthors.reduce((s, a) => s + a.pending, 0);

          return {
            id: rIdx + 1,
            title: title || `Imported Manuscript #${rIdx + 1}`,
            status: status || 'Submitted',
            indexing_tier: sciScopus.includes('SCI') ? 'SCI / SCIE / - Q1/Q2' : 'Scopus - Q1 / Q2',
            authors: parsedAuthors,
            totalAdvance: rowTotalAdvance,
            totalPending: rowTotalPending,
            target_journal: 'Energy Conversion and Management (Elsevier)'
          };
        });

        setExcelPreviewData(parsedRows);
        setSuccessMsg(`✓ Read ${parsedRows.length} manuscript(s) from Excel file.`);
      } catch (err) {
        console.error('Excel parse error:', err);
        setErrorMsg('Failed to parse spreadsheet. Please upload a valid .xlsx or .xls file.');
      }
    };
    reader.readAsBinaryString(file);
  };

  // Download Sample Template for Excel
  const downloadSampleTemplate = () => {
    const sampleData = [
      {
        'SL.No': 1,
        'Titles': 'Advanced Detection of Single-Morphing Attacks for Secure Facial Recognition',
        'Authors': '1. Dr. Ashok Koujalagi\n2. Sri rama Chandra\n3. Dr. B Srivani\n4. Dr K Maheswari\n5. Mr. Rameh Kothapalli\n6. Dr. N S R Phanindra Kumar\n7. Dr. Mukesh Soni\n8. Dr. Nidal AlSaid\n9. Dr. CH M H Saibaba',
        'Status': 'Submitted',
        'SCI/Scopus': 'SCI',
        'Advance Received': '1. Dr. Ashok Koujalagi - Nil\n2. Sri rama Chandra - Nil\n3. Dr. B Srivani - 5000\n4. Dr K Maheswari - 3000\n5. Mr. Rameh Kothapalli - Nil\n6. Dr. N S R Phanindra Kumar - Nil\n7. Dr. Mukesh Soni - Nil\n8. Dr. Nidal AlSaid - Nil\n9. Dr. CH M H Saibaba - 5000',
        'Pending': '1. Dr. Ashok Koujalagi - Nil\n2. Sri rama Chandra - Nil\n3. Dr. B Srivani - 20000\n4. Dr K Maheswari - 22000\n5. Mr. Rameh Kothapalli - Nil\n6. Dr. N S R Phanindra Kumar - Nil\n7. Dr. Mukesh Soni - Nil\n8. Dr. Nidal AlSaid - Nil\n9. Dr. CH M H Saibaba - 20000'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ASR_ManuTrack_Template');
    XLSX.writeFile(wb, 'ASR_ManuTrack_Template.xlsx');
  };

  // Submit Bulk Excel Data
  const handleBulkSubmit = async () => {
    if (excelPreviewData.length === 0) {
      setErrorMsg('No parsed data available to submit.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    const token = getAuthToken();

    const res = await api.bulkUploadPapers(token, { papers: excelPreviewData });
    setIsSubmitting(false);

    if (res && res.success) {
      setSuccessMsg(`✓ Successfully imported ${res.papers.length} manuscripts to ASR ManuTrack and mapped all authors!`);
      setTimeout(() => {
        navigate('/admin/papers');
      }, 1800);
    } else {
      setErrorMsg(res?.message || 'Failed to complete bulk upload.');
    }
  };

  // ----------------------------------------------------
  // SUBMIT SINGLE ENTRY WITH MULTI-AUTHOR LEDGER
  // ----------------------------------------------------
  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.title || !formData.target_journal) {
      setErrorMsg('Please enter Manuscript Title and Target Journal.');
      return;
    }
    if (authorRows.length === 0) {
      setErrorMsg('Please add at least one author.');
      return;
    }

    setIsSubmitting(true);
    const token = getAuthToken();

    const payload = {
      title: formData.title,
      target_journal: formData.target_journal,
      indexing_tier: formData.indexing_tier,
      status: formData.status,
      assigned_coordinator: formData.assigned_coordinator,
      assigned_department: formData.assigned_department,
      primary_author_email: authorRows[0].email,
      primary_author_name: authorRows[0].name,
      total_amount: totalCalculatedFromAuthors,
      amount_paid: totalAuthorsAdvance,
      payment_method: formData.payment_method,
      transaction_ref: formData.transaction_ref,
      authors: authorRows
    };

    // Use bulk-upload endpoint with single item array for rich multi-author mapping
    const res = await api.bulkUploadPapers(token, { papers: [payload] });

    if (res && res.success) {
      const createdPaperId = res.papers?.[0]?.id;

      // If proof file was attached, upload it directly to Cloudinary
      if (proofFile && createdPaperId) {
        try {
          const uploadData = new FormData();
          uploadData.append('file', proofFile);
          uploadData.append('paper_id', createdPaperId);
          uploadData.append('document_category', proofCategory);
          uploadData.append('custom_name', proofDisplayName || proofFile.name);

          await fetch(`${API_BASE}/documents/upload`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token || 'default_admin_token'}` },
            body: uploadData
          });
        } catch (uploadErr) {
          console.warn('Paper registered, but attached proof upload had warning:', uploadErr);
        }
      }

      setIsSubmitting(false);
      setSuccessMsg(`✓ Manuscript "${createdPaperId}" registered on ASR ManuTrack with ${authorRows.length} authors mapped!`);
      setTimeout(() => {
        navigate('/admin/papers');
      }, 1500);
    } else {
      setIsSubmitting(false);
      setErrorMsg(res?.message || 'Failed to register manuscript.');
    }
  };

  return (
    <AdminLayout
      activeNav="new-paper"
      title="ASR ManuTrack — Manuscript Registration &amp; Multi-Author Mapping"
      subtitle="Register papers with multiple authors (Advance &amp; Pending amounts), map author emails for private access, or import directly from Excel."
    >
      <div className="portal-subpage-container" style={{ maxWidth: '1060px', margin: '0 auto' }}>

        {/* Top Tab Mode Switcher: Excel Import vs Single Form */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'inline-flex', background: '#e2e8f0', padding: '4px', borderRadius: '12px' }}>
            <button
              type="button"
              onClick={() => { setActiveTab('single'); setErrorMsg(''); }}
              style={{
                padding: '9px 20px',
                borderRadius: '9px',
                border: 'none',
                background: activeTab === 'single' ? '#2563eb' : 'transparent',
                color: activeTab === 'single' ? '#ffffff' : '#475569',
                fontWeight: 800,
                fontSize: '13.5px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <FileText size={16} />
              <span>Single Entry Window (Multi-Author)</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('excel'); setErrorMsg(''); }}
              style={{
                padding: '9px 20px',
                borderRadius: '9px',
                border: 'none',
                background: activeTab === 'excel' ? '#16a34a' : 'transparent',
                color: activeTab === 'excel' ? '#ffffff' : '#475569',
                fontWeight: 800,
                fontSize: '13.5px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <FileSpreadsheet size={16} />
              <span>Direct Excel Sheet Upload (.xlsx)</span>
            </button>
          </div>

          {activeTab === 'excel' && (
            <button
              type="button"
              onClick={downloadSampleTemplate}
              style={{
                background: '#fff',
                border: '1.5px solid #16a34a',
                color: '#15803d',
                padding: '8px 14px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '12.5px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <Download size={14} />
              <span>Download Excel Template</span>
            </button>
          )}
        </div>

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

        {/* ==================================================== */}
        {/* MODE 1: DIRECT EXCEL IMPORT                           */}
        {/* ==================================================== */}
        {activeTab === 'excel' && (
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <div style={{ textAlign: 'center', border: '2px dashed #94a3b8', borderRadius: '14px', padding: '40px 20px', background: '#f8fafc', marginBottom: '24px' }}>
              <FileSpreadsheet size={48} color="#16a34a" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                Upload Excel Sheet (.xlsx / .xls)
              </h3>
              <p style={{ color: '#64748b', fontSize: '13.5px', maxWidth: '520px', margin: '0 auto 18px', lineHeight: '1.5' }}>
                Automatically parses Titles, multiple Authors, Status, Indexing (SCI/Scopus), Advance Received, and Pending amounts, then maps every author to their verified email account.
              </p>

              <label
                style={{
                  background: '#16a34a',
                  color: '#fff',
                  padding: '10px 22px',
                  borderRadius: '9px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)'
                }}
              >
                <Upload size={16} />
                <span>Choose Excel File</span>
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleExcelFileUpload}
                  style={{ display: 'none' }}
                />
              </label>

              {excelFileName && (
                <div style={{ marginTop: '12px', fontSize: '13px', color: '#15803d', fontWeight: 700 }}>
                  Selected: {excelFileName}
                </div>
              )}
            </div>

            {/* Excel Preview Table */}
            {excelPreviewData.length > 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Parsed Manuscripts Preview ({excelPreviewData.length} Entries)
                  </h4>
                  <span style={{ fontSize: '12px', background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '6px', fontWeight: 700 }}>
                    Ready for Neon DB Ingestion
                  </span>
                </div>

                <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '20px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0' }}>
                      <tr>
                        <th style={{ padding: '10px 14px', fontWeight: 800, color: '#475569', width: '50px' }}>#</th>
                        <th style={{ padding: '10px 14px', fontWeight: 800, color: '#475569' }}>Manuscript Title</th>
                        <th style={{ padding: '10px 14px', fontWeight: 800, color: '#475569' }}>Authors &amp; Mapped Ledgers</th>
                        <th style={{ padding: '10px 14px', fontWeight: 800, color: '#475569', width: '110px' }}>Status</th>
                        <th style={{ padding: '10px 14px', fontWeight: 800, color: '#475569', width: '130px' }}>Indexing</th>
                        <th style={{ padding: '10px 14px', fontWeight: 800, color: '#475569', width: '120px' }}>Total Advance</th>
                        <th style={{ padding: '10px 14px', fontWeight: 800, color: '#475569', width: '120px' }}>Total Pending</th>
                      </tr>
                    </thead>
                    <tbody>
                      {excelPreviewData.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '12px 14px', fontWeight: 700, color: '#64748b' }}>{row.id}</td>
                          <td style={{ padding: '12px 14px', fontWeight: 600, color: '#0f172a', maxWidth: '320px' }}>
                            {row.title}
                          </td>
                          <td style={{ padding: '12px 14px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px' }}>
                              {row.authors.map((a, aIdx) => (
                                <div key={aIdx} style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', background: '#f8fafc', padding: '3px 8px', borderRadius: '4px', border: '1px solid #f1f5f9' }}>
                                  <span style={{ fontWeight: 600, color: '#1e293b' }}>{a.order}. {a.name}</span>
                                  <span style={{ color: '#64748b' }}>
                                    Adv: <strong style={{ color: '#16a34a' }}>₹{a.advance.toLocaleString('en-IN')}</strong> | 
                                    Pend: <strong style={{ color: a.pending > 0 ? '#dc2626' : '#64748b' }}>₹{a.pending.toLocaleString('en-IN')}</strong>
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td style={{ padding: '12px 14px' }}>
                            <span style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, background: '#fef2f2', color: '#dc2626' }}>
                              {row.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px 14px', fontSize: '12px', fontWeight: 700, color: '#2563eb' }}>
                            {row.indexing_tier}
                          </td>
                          <td style={{ padding: '12px 14px', fontWeight: 800, color: '#16a34a' }}>
                            ₹{row.totalAdvance.toLocaleString('en-IN')}
                          </td>
                          <td style={{ padding: '12px 14px', fontWeight: 800, color: row.totalPending > 0 ? '#dc2626' : '#64748b' }}>
                            ₹{row.totalPending.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => { setExcelPreviewData([]); setExcelFileName(''); }}
                    style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleBulkSubmit}
                    style={{
                      padding: '11px 26px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#16a34a',
                      color: '#fff',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>{isSubmitting ? 'Importing...' : `Submit & Map ${excelPreviewData.length} Manuscripts to ASR ManuTrack`}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* MODE 2: SINGLE WINDOW ENTRY (ALL IN ONE FORM)         */}
        {/* ==================================================== */}
        {activeTab === 'single' && (
          <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <form onSubmit={handleSingleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Section 1: Title, Status, Journal, Indexing */}
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', marginBottom: '14px' }}>
                  1. Manuscript Details &amp; Status
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Manuscript Full Title *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Enter complete paper title..."
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', lineHeight: '1.45' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                      Status *
                    </label>
                    <select
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #2563eb', fontSize: '13.5px', background: '#eff6ff', fontWeight: 700, color: '#1d4ed8' }}
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Revision Requested">Revision Requested</option>
                      <option value="Accepted (In Press)">Accepted (In Press)</option>
                      <option value="Published (Indexed)">Published (Indexed)</option>
                      <option value="Paper Registered">Paper Registered</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
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
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                      Indexing Tier *
                    </label>
                    <select
                      value={formData.indexing_tier}
                      onChange={e => setFormData({ ...formData, indexing_tier: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', background: '#fff' }}
                    >
                      <option value="SCI / SCIE / - Q1/Q2">SCI / SCIE / - Q1/Q2</option>
                      <option value="SCI / SCIE - Q3/Q4">SCI / SCIE - Q3/Q4</option>
                      <option value="Scopus - Q1 / Q2">Scopus - Q1 / Q2</option>
                      <option value="Scopus - Q3 / Q4">Scopus - Q3 / Q4</option>
                      <option value="Web of Science ESCI Indexed">Web of Science ESCI Indexed</option>
                      <option value="UGC Care Listed (Group 1)">UGC Care Listed (Group 1)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Multi-Author Grid with Individual Advance & Pending */}
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={18} color="#2563eb" />
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase' }}>
                      2. Authors Mapping &amp; Individual Fee Ledger ({authorRows.length} Authors)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={addAuthorRow}
                    style={{
                      background: '#eff6ff',
                      color: '#2563eb',
                      border: '1px solid #bfdbfe',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <PlusCircle size={14} />
                    <span>+ Add Another Author</span>
                  </button>
                </div>

                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 14px' }}>
                  Each author will see <strong>only their own individual advance &amp; pending balance</strong> when logging into ASR ManuTrack via their verified email.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {authorRows.map((author, index) => (
                    <div
                      key={author.id}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '10px',
                        padding: '12px 14px',
                        display: 'grid',
                        gridTemplateColumns: '30px 1.8fr 2fr 1.1fr 1.1fr 34px',
                        gap: '10px',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748b' }}>
                        {index + 1}.
                      </span>

                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Author Full Name"
                          value={author.name}
                          onChange={e => updateAuthorRow(author.id, 'name', e.target.value)}
                          style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                        />
                      </div>

                      <div>
                        <input
                          type="email"
                          required
                          placeholder="Author Email (Used for 2FA)"
                          value={author.email}
                          onChange={e => updateAuthorRow(author.id, 'email', e.target.value)}
                          style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px' }}
                        />
                      </div>

                      <div>
                        <input
                          type="number"
                          placeholder="Advance (₹)"
                          value={author.advance}
                          onChange={e => updateAuthorRow(author.id, 'advance', e.target.value)}
                          style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #bbf7d0', fontSize: '12.5px', fontWeight: 700, color: '#15803d', background: '#f0fdf4' }}
                        />
                      </div>

                      <div>
                        <input
                          type="number"
                          placeholder="Pending (₹)"
                          value={author.pending}
                          onChange={e => updateAuthorRow(author.id, 'pending', e.target.value)}
                          style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #fecaca', fontSize: '12.5px', fontWeight: 700, color: '#dc2626', background: '#fef2f2' }}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removeAuthorRow(author.id)}
                        disabled={authorRows.length === 1}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: authorRows.length === 1 ? '#cbd5e1' : '#dc2626',
                          cursor: authorRows.length === 1 ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Ledger Totals Strip */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', marginTop: '14px', padding: '10px 14px', background: '#0b1a30', borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: 700 }}>
                  <span>Total Advance Received: <strong style={{ color: '#4ade80' }}>₹{totalAuthorsAdvance.toLocaleString('en-IN')}</strong></span>
                  <span>Total Pending Balance: <strong style={{ color: '#f87171' }}>₹{totalAuthorsPending.toLocaleString('en-IN')}</strong></span>
                  <span>Grand Total: <strong style={{ color: '#60a5fa' }}>₹{totalCalculatedFromAuthors.toLocaleString('en-IN')}</strong></span>
                </div>
              </div>

              {/* Section 3: Coordinator & Payment Mode */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Assign Publication Coordinator
                  </label>
                  <select
                    value={formData.assigned_coordinator}
                    onChange={e => setFormData({ ...formData, assigned_coordinator: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#fff' }}
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

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Payment Mode
                  </label>
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
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Transaction / UTR Reference
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UTR-HDFC99882211"
                    value={formData.transaction_ref}
                    onChange={e => setFormData({ ...formData, transaction_ref: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>
              </div>

              {/* Section 4: Attach Initial Proof (Optional) */}
              <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Paperclip size={17} color="#2563eb" />
                    <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase' }}>
                      Attach Initial Proof (Optional — Can Also Upload Later)
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                      Document Category
                    </label>
                    <select
                      value={proofCategory}
                      onChange={e => setProofCategory(e.target.value)}
                      style={{ width: '100%', padding: '9px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12.5px', background: '#fff' }}
                    >
                      <option value="Submission Confirmation Proof">1. Submission Confirmation Proof</option>
                      <option value="Revision Proof">2. Revision Proof</option>
                      <option value="Acceptance Proof">3. Acceptance Proof</option>
                      <option value="Publication Proof (PDF)">4. Publication Proof (PDF)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                      Attach File (PDF, PNG, JPG)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,image/png,image/jpeg,image/jpg"
                      onChange={e => {
                        if (e.target.files && e.target.files[0]) {
                          setProofFile(e.target.files[0]);
                          if (!proofDisplayName) {
                            setProofDisplayName(e.target.files[0].name);
                          }
                        }
                      }}
                      style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px dashed #94a3b8', fontSize: '12px', background: '#fff' }}
                    />
                  </div>
                </div>

                {proofFile && (
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle size={14} color="#16a34a" />
                    <span>Selected: {proofFile.name} ({(proofFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                  </div>
                )}
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
                  style={{
                    padding: '11px 26px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#2563eb',
                    color: '#fff',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>{isSubmitting ? 'Registering...' : `Register Manuscript & Map ${authorRows.length} Authors`}</span>
                  <ArrowRight size={16} />
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminNewPaper;
