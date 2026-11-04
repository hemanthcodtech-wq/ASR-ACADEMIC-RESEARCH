import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { api, API_BASE } from '../portal/apiService';
import { Upload, FileText, CheckCircle, AlertCircle, Cloud, Download, ExternalLink, Shield, Search, Filter } from 'lucide-react';

const AdminProofs = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialPaperId = searchParams.get('paper_id') || '';

  const [papers, setPapers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selectedPaperId, setSelectedPaperId] = useState(initialPaperId);
  const [category, setCategory] = useState('Proof');
  const [customName, setCustomName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Search & Filter state for papers and documents
  const [paperSearch, setPaperSearch] = useState('');
  const [docSearch, setDocSearch] = useState('');

  const getAuthToken = () => {
    try {
      const s = localStorage.getItem('asr_author_user');
      return s ? JSON.parse(s).token : null;
    } catch {
      return null;
    }
  };

  const loadData = () => {
    const token = getAuthToken() || 'default_admin_token';
    api.getAllPapersForAdmin(token).then(r => {
      if (r && r.papers) {
        setPapers(r.papers);
        if (!selectedPaperId && r.papers.length > 0) {
          setSelectedPaperId(r.papers[0].id);
        }
      }
    });
    api.getAllDocumentsForAdmin(token).then(r => {
      if (r && r.documents) setDocuments(r.documents);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!customName) {
        setCustomName(file.name);
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!selectedPaperId) {
      setErrorMsg('Please select a target manuscript.');
      return;
    }
    if (!selectedFile) {
      setErrorMsg('Please choose a file (PDF or image).');
      return;
    }

    setUploading(true);
    const token = getAuthToken();

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('paper_id', selectedPaperId);
      formData.append('document_category', category);
      formData.append('custom_name', customName || selectedFile.name);

      const headers = {};
      headers['Authorization'] = `Bearer ${token || 'default_admin_token'}`;

      const res = await fetch(`${API_BASE}/documents/upload`, {
        method: 'POST',
        headers,
        body: formData
      });

      if (!res.ok) {
        const errorText = await res.text();
        let errMsg = `Upload failed with status ${res.status}`;
        try {
          const parsed = JSON.parse(errorText);
          if (parsed && parsed.message) errMsg = parsed.message;
        } catch (_) {}
        setUploading(false);
        setErrorMsg(errMsg);
        return;
      }

      const data = await res.json();
      setUploading(false);

      if (data && data.success) {
        setSuccessMsg(`✓ Document "${data.document.document_name}" successfully uploaded to Cloudinary!`);
        setSelectedFile(null);
        setCustomName('');
        loadData();
        setTimeout(() => setSuccessMsg(''), 5000);
      } else {
        setErrorMsg(data?.message || 'Failed to upload document to Cloudinary.');
      }
    } catch (err) {
      setUploading(false);
      setErrorMsg(`Upload failed: ${err.message || 'Please check network connection'}`);
    }
  };

  const filteredPapers = papers.filter(p =>
    p.id?.toLowerCase().includes(paperSearch.toLowerCase()) ||
    p.title?.toLowerCase().includes(paperSearch.toLowerCase()) ||
    p.primary_author_email?.toLowerCase().includes(paperSearch.toLowerCase())
  );

  const filteredDocs = documents.filter(d =>
    d.paper_id?.toLowerCase().includes(docSearch.toLowerCase()) ||
    d.document_name?.toLowerCase().includes(docSearch.toLowerCase()) ||
    d.document_category?.toLowerCase().includes(docSearch.toLowerCase())
  );

  return (
    <AdminLayout
      activeNav="proofs"
      title="Upload Proofs, Acceptance Letters &amp; Files"
      subtitle="Direct Cloudinary storage pipeline for official submission receipts, referee annotated reports, and acceptance certificates."
    >
      <div className="portal-subpage-container">

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

        {/* Top Overview Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Active Manuscripts</span>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>{papers.length}</div>
            <span style={{ fontSize: '11.5px', color: '#2563eb' }}>Eligible for proof mapping</span>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Uploaded Proofs</span>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>{documents.length}</div>
            <span style={{ fontSize: '11.5px', color: '#059669' }}>Stored securely on Cloudinary CDN</span>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Selected Target</span>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#2563eb', marginTop: '4px', fontFamily: 'monospace' }}>
              {selectedPaperId || 'None Selected'}
            </div>
            <span style={{ fontSize: '11.5px', color: '#64748b' }}>
              {papers.find(p => p.id === selectedPaperId)?.primary_author_email || 'Select a paper below'}
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px' }}>

          {/* Upload Form */}
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Cloud size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Direct File &amp; Proof Uploader</h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Upload official certificates and proofs linked to manuscripts.</span>
              </div>
            </div>

            <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Manuscript Selector with Search Option */}
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Target Manuscript * ({papers.length} Available in System)
                </label>

                {/* Search Bar for Manuscripts */}
                <div style={{ position: 'relative', marginBottom: '8px' }}>
                  <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8' }} />
                  <input
                    type="text"
                    placeholder="Search manuscript by ID, title, or author email..."
                    value={paperSearch}
                    onChange={e => setPaperSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '7px 10px 7px 32px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '12.5px',
                      background: '#f8fafc'
                    }}
                  />
                </div>

                <select
                  required
                  value={selectedPaperId}
                  onChange={e => setSelectedPaperId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #2563eb',
                    fontSize: '13px',
                    background: '#eff6ff',
                    color: '#0f172a',
                    fontWeight: 600
                  }}
                >
                  <option value="">-- Choose Manuscript ({filteredPapers.length} Matches) --</option>
                  {filteredPapers.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.id} - {p.title} ({p.primary_author_email})
                    </option>
                  ))}
                </select>
                <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>
                  Selected manuscript will receive this file in their Author Download Centre.
                </span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Document Category *
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px', background: '#fff' }}
                >
                  <option value="Proof">Submission Confirmation Proof</option>
                  <option value="Acceptance">Official Acceptance Letter</option>
                  <option value="Report">Turnitin Plagiarism Similarity Report</option>
                  <option value="Manuscript">Submitted Manuscript Copy (Blind)</option>
                  <option value="Invoice">Payment Receipt / GST Invoice</option>
                  <option value="Certificate">Editorial Publication Certificate</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Custom Display Name (Visible to Author)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Official_Acceptance_Letter_Elsevier_2024.pdf"
                  value={customName}
                  onChange={e => setCustomName(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  File (PDF, PNG, JPG) *
                </label>
                <input
                  type="file"
                  required
                  accept=".pdf,image/png,image/jpeg,image/jpg"
                  onChange={handleFileChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px dashed #cbd5e1', background: '#f8fafc', fontSize: '13px' }}
                />
                <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>
                  Max size: 30 MB. Cloudinary CDN automatically streams and generates secure download mirrors.
                </span>
              </div>

              <button
                type="submit"
                disabled={uploading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#059669',
                  color: '#fff',
                  padding: '12px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '14px',
                  border: 'none',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  marginTop: '8px',
                  boxShadow: '0 2px 8px rgba(5, 150, 105, 0.25)'
                }}
              >
                <Upload size={17} />
                <span>{uploading ? 'Streaming to Cloudinary CDN...' : 'Upload & Authorize Proof'}</span>
              </button>

            </form>
          </div>

          {/* Uploaded Documents Repository with Search */}
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#0f172a' }}>
                Authorized Document Repository ({documents.length})
              </h3>
            </div>

            {/* Document Search Bar */}
            <div style={{ position: 'relative', marginBottom: '14px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search uploaded files by paper ID, file name, category..."
                value={docSearch}
                onChange={e => setDocSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '7px 10px 7px 32px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '12.5px',
                  background: '#f8fafc'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '560px', overflowY: 'auto', paddingRight: '4px' }}>
              {filteredDocs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '36px 16px', color: '#94a3b8', fontSize: '13px' }}>
                  No uploaded documents found matching your search.
                </div>
              ) : (
                filteredDocs.map((doc) => (
                  <div
                    key={doc.id}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ background: '#eff6ff', color: '#2563eb', fontSize: '10.5px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                          {doc.paper_id}
                        </span>
                        <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>{doc.document_category}</span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a', marginTop: '4px' }}>
                        {doc.document_name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                        {doc.file_size || '1.5 MB'} • Uploaded {doc.uploaded_at || 'Recently'}
                      </div>
                    </div>

                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        background: '#fff',
                        border: '1px solid #cbd5e1',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        color: '#2563eb',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '12px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        flexShrink: 0
                      }}
                    >
                      <Download size={13} />
                      <span>View</span>
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminProofs;

