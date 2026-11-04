const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken, requireStaff } = require('../middleware/auth');

// 1. Get all papers belonging to the authenticated author (Data Isolation Rule)
router.get('/my-papers', authenticateToken, async (req, res) => {
  try {
    const userEmail = req.user.email.toLowerCase();

    // Find paper IDs linked to this author
    const mappedIds = db.store.authorPaperMapping
      .filter(m => m.author_email.toLowerCase() === userEmail)
      .map(m => m.paper_id);

    // If user is primary author, include those as well
    const myPapers = db.store.papers.filter(p => 
      p.primary_author_email.toLowerCase() === userEmail || mappedIds.includes(p.id)
    );

    // Also attach relevant documents and payments for quick dashboard rendering
    const enhancedPapers = myPapers.map(paper => {
      const docs = db.store.documents.filter(d => d.paper_id === paper.id);
      const payment = db.store.payments.find(pm => pm.paper_id === paper.id);
      return {
        ...paper,
        documents: docs,
        payment: payment || null
      };
    });

    return res.json({
      success: true,
      count: enhancedPapers.length,
      papers: enhancedPapers
    });
  } catch (error) {
    console.error('Fetch papers error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve manuscripts.' });
  }
});

// 2. Get Single Paper Details by ID (Strictly checking author ownership)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const paperId = req.params.id;
    const userEmail = req.user.email.toLowerCase();

    const paper = db.store.papers.find(p => p.id === paperId);
    if (!paper) {
      return res.status(404).json({ success: false, message: 'Manuscript not found.' });
    }

    // Check ownership
    const isOwner = paper.primary_author_email.toLowerCase() === userEmail;
    const isMapped = db.store.authorPaperMapping.some(
      m => m.paper_id === paperId && m.author_email.toLowerCase() === userEmail
    );
    const isStaff = req.user.role === 'staff' || req.user.role === 'admin';

    if (!isOwner && !isMapped && !isStaff) {
      return res.status(403).json({
        success: false,
        message: 'Security Alert: Access denied. You are not an authorized author on this manuscript.'
      });
    }

    const docs = db.store.documents.filter(d => d.paper_id === paper.id);
    const payments = db.store.payments.filter(pm => pm.paper_id === paper.id);

    return res.json({
      success: true,
      paper: {
        ...paper,
        documents: docs,
        payments
      }
    });
  } catch (error) {
    console.error('Get paper detail error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve manuscript details.' });
  }
});

// 3. Register / Submit New Paper (with integrated Fee & Payment Setup)
router.post('/register', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      target_journal,
      indexing_tier,
      primary_author_email,
      author_positions,
      co_authors,
      abstract_text,
      assigned_coordinator,
      assigned_department,
      // Payment details from intake form
      total_amount,
      amount_paid,
      payment_method,
      transaction_ref
    } = req.body;

    const authorTargetEmail = (primary_author_email || req.user.email).toLowerCase().trim();

    if (!title || !target_journal) {
      return res.status(400).json({ success: false, message: 'Title and target journal are required.' });
    }

    const newId = `ASR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const newPaper = {
      id: newId,
      title,
      primary_author_email: authorTargetEmail,
      target_journal,
      indexing_tier: indexing_tier || 'SCI / Scopus Indexed',
      status: 'Paper Registered',
      stage_number: 1,
      submission_date: new Date().toISOString().split('T')[0],
      assigned_department: assigned_department || 'Editorial Intake & Review Cell',
      assigned_coordinator: assigned_coordinator || 'Dr. Rajesh K. (Senior Publication Lead)',
      coordinator_phone: '+91 9515207724',
      author_positions: author_positions || `${req.user.fullName || 'Author'} (Primary)`,
      co_authors: co_authors || 'None recorded',
      abstract_text: abstract_text || '',
      next_step_action: 'Manuscript registered. Initial editorial integrity and formatting screening in progress.'
    };

    db.store.papers.unshift(newPaper);
    
    // Map paper to the designated author email
    db.store.authorPaperMapping.push({
      author_email: authorTargetEmail,
      paper_id: newId,
      role_in_paper: 'First Author'
    });

    // If payment fields provided during intake, create initial payment record in DB immediately!
    const parsedTotal = Number(total_amount) || 0;
    const parsedPaid = Number(amount_paid) || 0;

    let paymentRecord = null;
    if (parsedTotal > 0) {
      const isPaid = parsedPaid >= parsedTotal;
      paymentRecord = {
        id: db.store.payments.length + 1,
        paper_id: newId,
        author_email: authorTargetEmail,
        invoice_number: `INV-ASR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        total_amount: parsedTotal,
        amount_paid: parsedPaid,
        currency: 'INR',
        payment_status: isPaid ? 'Paid' : parsedPaid > 0 ? 'Partial' : 'Pending',
        payment_method: payment_method || 'NEFT / UPI',
        transaction_ref: transaction_ref || (parsedPaid > 0 ? `UTR-${Date.now().toString().slice(-8)}` : 'Pending'),
        due_date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        paid_at: isPaid ? new Date().toISOString() : null,
        invoice_url: `/invoices/${newId}-invoice.pdf`,
        receipt_url: `/receipts/${newId}-receipt.pdf`,
        transactions: parsedPaid > 0 ? [
          {
            id: `tx_${Date.now()}_initial`,
            amount: parsedPaid,
            method: payment_method || 'NEFT / UPI',
            transaction_ref: transaction_ref || `UTR-${Date.now().toString().slice(-8)}`,
            timestamp: new Date().toISOString()
          }
        ] : []
      };

      db.store.payments.push(paymentRecord);
      newPaper.payment = paymentRecord;
    }

    // Create confirmation notification for the author
    db.store.notifications.unshift({
      id: db.store.notifications.length + 1,
      recipient_email: authorTargetEmail,
      paper_id: newId,
      title: 'Manuscript Successfully Registered',
      message: `Your manuscript "${title}" has been registered with Tracking ID: ${newId}.${parsedTotal > 0 ? ` Invoice generated: Total ₹${parsedTotal.toLocaleString('en-IN')}, Paid ₹${parsedPaid.toLocaleString('en-IN')}.` : ''}`,
      category: 'system',
      is_read: false,
      created_at: new Date().toISOString()
    });

    // Audit log
    db.store.auditLogs.unshift({
      id: db.store.auditLogs.length + 1,
      author_email: req.user.email,
      action: 'PAPER_REGISTERED',
      details: `Registered ${newId} for author ${authorTargetEmail}. Fee: ₹${parsedTotal}, Paid: ₹${parsedPaid}`,
      created_at: new Date().toISOString()
    });

    return res.status(201).json({
      success: true,
      message: 'Manuscript registered successfully!',
      paper: newPaper,
      payment: paymentRecord
    });
  } catch (error) {
    console.error('Register paper error:', error);
    res.status(500).json({ success: false, message: 'Failed to register manuscript.' });
  }
});

// 4. Update Paper Status / Stage (Staff only or Demo action)
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const paperId = req.params.id;
    const { status, stage_number, next_step_action } = req.body;

    const paper = db.store.papers.find(p => p.id === paperId);
    if (!paper) {
      return res.status(404).json({ success: false, message: 'Paper not found.' });
    }

    if (status) paper.status = status;
    if (stage_number !== undefined) paper.stage_number = Number(stage_number);
    if (next_step_action) paper.next_step_action = next_step_action;

    // Send automatic update notification
    db.store.notifications.unshift({
      id: db.store.notifications.length + 1,
      recipient_email: paper.primary_author_email,
      paper_id: paper.id,
      title: `Status Updated: ${paper.status}`,
      message: `Your manuscript "${paper.title}" progressed to Stage ${paper.stage_number}: ${paper.status}.`,
      category: 'review',
      is_read: false,
      created_at: new Date().toISOString()
    });

    return res.json({
      success: true,
      message: 'Paper status and stage updated successfully.',
      paper
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ success: false, message: 'Failed to update status.' });
  }
});

module.exports = router;
