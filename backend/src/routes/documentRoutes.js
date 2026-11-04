const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../config/db');
const { authenticateToken } = require('../middleware/auth');
const { uploadToCloudinary } = require('../config/cloudinary');

// Configure Multer memory storage (keeps file in memory buffer for immediate Cloudinary streaming)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024 }, // 30 MB file limit
  fileFilter: (req, file, cb) => {
    // Support PDFs, images (png, jpg, jpeg, webp), and documents
    const allowedMimes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format. Please upload PDF, Word document, or image files.'));
    }
  }
});

// 1. Get Documents (All documents for staff, or authorized for logged-in author)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userEmail = req.user.email.toLowerCase();

    // Staff/Admin sees all documents in system
    if (req.user.role === 'staff') {
      return res.json({
        success: true,
        count: db.store.documents.length,
        documents: db.store.documents
      });
    }

    // Collect all papers belonging to this author
    const myPaperIds = db.store.papers
      .filter(p => p.primary_author_email.toLowerCase() === userEmail)
      .map(p => p.id);

    const mappedPaperIds = db.store.authorPaperMapping
      .filter(m => m.author_email.toLowerCase() === userEmail)
      .map(m => m.paper_id);

    const authorizedPaperIds = [...new Set([...myPaperIds, ...mappedPaperIds])];

    const authorizedDocs = db.store.documents.filter(d => 
      authorizedPaperIds.includes(d.paper_id)
    );

    return res.json({
      success: true,
      count: authorizedDocs.length,
      documents: authorizedDocs
    });
  } catch (error) {
    console.error('Fetch documents error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve documents.' });
  }
});

// 2. Download / Tokenized Secure Document Access
router.get('/download/:id', authenticateToken, async (req, res) => {
  try {
    const docId = Number(req.params.id);
    const userEmail = req.user.email.toLowerCase();

    const document = db.store.documents.find(d => d.id === docId);
    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    // Check ownership of the paper
    const paper = db.store.papers.find(p => p.id === document.paper_id);
    const isMapped = db.store.authorPaperMapping.some(
      m => m.paper_id === document.paper_id && m.author_email.toLowerCase() === userEmail
    );

    if (paper && paper.primary_author_email.toLowerCase() !== userEmail && !isMapped && req.user.role !== 'staff') {
      return res.status(403).json({
        success: false,
        message: 'Security Alert: You are not authorized to download files for this manuscript.'
      });
    }

    // Log audit access
    db.store.auditLogs.push({
      id: db.store.auditLogs.length + 1,
      author_email: userEmail,
      action: 'DOCUMENT_DOWNLOAD',
      details: `Downloaded ${document.document_name} (${document.paper_id})`,
      created_at: new Date().toISOString()
    });

    return res.json({
      success: true,
      message: 'Download token verified.',
      downloadUrl: document.file_url,
      documentName: document.document_name
    });
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ success: false, message: 'Download verification failed.' });
  }
});

// 3. Cloudinary Upload Endpoint (Upload PDF, Manuscript Proofs, Images)
router.post('/upload', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const { paper_id, document_category, custom_name } = req.body;

    if (!paper_id) {
      return res.status(400).json({ success: false, message: 'Paper ID is required.' });
    }

    let fileUrl = '';
    let docName = custom_name;
    let fileSizeStr = '1.0 MB';

    if (req.file) {
      const originalName = req.file.originalname;
      docName = custom_name || originalName;
      fileSizeStr = `${(req.file.size / (1024 * 1024)).toFixed(2)} MB`;

      const isImage = req.file.mimetype.startsWith('image/');
      const resourceType = isImage ? 'image' : 'raw';

      // Upload directly to Cloudinary
      const cloudinaryResult = await uploadToCloudinary(req.file.buffer, {
        originalName,
        folder: `asr_papers/${paper_id}`,
        resource_type: resourceType
      });

      fileUrl = cloudinaryResult.secure_url;
      console.log(`[CLOUDINARY] ☁️ Uploaded "${docName}" to ${fileUrl}`);
    } else if (req.body.file_url) {
      fileUrl = req.body.file_url;
      docName = docName || 'Uploaded_Document.pdf';
    } else {
      return res.status(400).json({ success: false, message: 'No file or file URL provided.' });
    }

    const newDoc = {
      id: db.store.documents.length + 101,
      paper_id,
      document_name: docName,
      document_category: document_category || 'Proof',
      file_size: fileSizeStr,
      uploaded_at: new Date().toISOString().split('T')[0],
      file_url: fileUrl,
      is_cloudinary: true
    };

    db.store.documents.push(newDoc);

    // Audit log
    db.store.auditLogs.push({
      id: db.store.auditLogs.length + 1,
      author_email: req.user.email,
      action: 'DOCUMENT_UPLOAD',
      details: `Uploaded ${docName} to Cloudinary for ${paper_id}`,
      created_at: new Date().toISOString()
    });

    return res.status(201).json({
      success: true,
      message: 'Document successfully uploaded to Cloudinary storage and linked to manuscript.',
      document: newDoc
    });
  } catch (error) {
    console.error('Upload document error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to upload document.' });
  }
});

module.exports = router;
