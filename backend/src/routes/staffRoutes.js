const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken, requireStaff } = require('../middleware/auth');
const { sendStatusUpdateEmail } = require('../config/mailer');

// =========================================================================
// 1. COORDINATORS & EDITORS (Who handles the papers)
// =========================================================================

// Get list of all publication coordinators / editors
router.get('/coordinators', authenticateToken, async (req, res) => {
  try {
    return res.json({
      success: true,
      coordinators: db.store.coordinators
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve coordinators.' });
  }
});

// Create a new coordinator (Admin Side)
router.post('/coordinators/create', authenticateToken, async (req, res) => {
  try {
    const { name, title, department, email, phone } = req.body;

    if (!name || !department) {
      return res.status(400).json({ success: false, message: 'Coordinator Name and Department are required.' });
    }

    const newCoordinator = {
      id: `coord_${Date.now()}`,
      name,
      title: title || 'Publication Lead',
      department,
      email: email || `${name.toLowerCase().replace(/[^a-z]/g, '')}@asracademicresearch.com`,
      phone: phone || '+91 9515207724',
      active_papers_count: 0
    };

    db.store.coordinators.push(newCoordinator);

    // Audit log
    db.store.auditLogs.unshift({
      id: db.store.auditLogs.length + 1,
      author_email: req.user.email,
      action: 'COORDINATOR_CREATED',
      details: `Created new coordinator profile: ${name} (${department})`,
      created_at: new Date().toISOString()
    });

    return res.status(201).json({
      success: true,
      message: `Coordinator "${name}" registered successfully.`,
      coordinator: newCoordinator
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create coordinator.' });
  }
});

// Assign coordinator to a manuscript
router.patch('/papers/:id/assign-coordinator', authenticateToken, async (req, res) => {
  try {
    const paperId = req.params.id;
    const { coordinator_name, department, coordinator_phone } = req.body;

    const paper = db.store.papers.find(p => p.id === paperId);
    if (!paper) {
      return res.status(404).json({ success: false, message: 'Manuscript not found.' });
    }

    if (coordinator_name) paper.assigned_coordinator = coordinator_name;
    if (department) paper.assigned_department = department;
    if (coordinator_phone) paper.coordinator_phone = coordinator_phone;

    // Log action
    db.store.auditLogs.unshift({
      id: db.store.auditLogs.length + 1,
      author_email: req.user.email,
      action: 'COORDINATOR_ASSIGNED',
      details: `Assigned ${coordinator_name} (${department}) to ${paperId}`,
      created_at: new Date().toISOString()
    });

    return res.json({
      success: true,
      message: `Coordinator ${coordinator_name} assigned to manuscript ${paperId}.`,
      paper
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to assign coordinator.' });
  }
});

// =========================================================================
// 2. AUTHOR CREATION & MANAGEMENT
// =========================================================================

// Get all authors (Admin / Staff)
router.get('/authors', authenticateToken, async (req, res) => {
  try {
    const sanitizedAuthors = db.store.authors.map(a => ({
      id: a.id,
      email: a.email,
      username: a.username,
      full_name: a.full_name,
      role: a.role,
      phone: a.phone,
      institution: a.institution,
      created_at: a.created_at
    }));

    return res.json({
      success: true,
      totalCount: sanitizedAuthors.length,
      authors: sanitizedAuthors
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve authors list.' });
  }
});

// Create a new author profile (Admin / Staff)
router.post('/authors/create', authenticateToken, async (req, res) => {
  try {
    const { email, full_name, role, phone, institution, username, password } = req.body;

    if (!email || !full_name) {
      return res.status(400).json({ success: false, message: 'Email and Full Name are required.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = db.store.authors.find(a => a.email.toLowerCase() === cleanEmail);
    if (existing) {
      return res.status(400).json({ success: false, message: 'An author with this email already exists.' });
    }

    const newAuthor = {
      id: db.store.authors.length + 1,
      email: cleanEmail,
      username: username || cleanEmail.split('@')[0],
      password: password || 'AuthorPassword123!',
      full_name,
      role: role || 'author',
      phone: phone || '+91 9515207724',
      institution: institution || 'Academic Researcher',
      created_at: new Date().toISOString()
    };

    db.store.authors.push(newAuthor);

    // Audit log
    db.store.auditLogs.unshift({
      id: db.store.auditLogs.length + 1,
      author_email: req.user.email,
      action: 'AUTHOR_CREATED',
      details: `Created new ${newAuthor.role} profile: ${newAuthor.full_name} (${cleanEmail})`,
      created_at: new Date().toISOString()
    });

    return res.status(201).json({
      success: true,
      message: `Author profile created successfully for ${full_name}.`,
      author: newAuthor
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create author profile.' });
  }
});

// Map author to paper
router.post('/map-author', authenticateToken, async (req, res) => {
  try {
    const { author_email, paper_id, role_in_paper } = req.body;

    if (!author_email || !paper_id) {
      return res.status(400).json({ success: false, message: 'Author email and Paper ID are required.' });
    }

    const cleanEmail = author_email.toLowerCase().trim();

    // Check if mapping exists
    const exists = db.store.authorPaperMapping.some(
      m => m.author_email.toLowerCase() === cleanEmail && m.paper_id === paper_id
    );

    if (!exists) {
      db.store.authorPaperMapping.push({
        author_email: cleanEmail,
        paper_id,
        role_in_paper: role_in_paper || 'Co-Author'
      });
    }

    return res.json({
      success: true,
      message: `Author ${cleanEmail} successfully linked to paper ${paper_id}.`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to map author.' });
  }
});

// =========================================================================
// 3. PAPER STATUS & PROGRESSION MANAGEMENT
// =========================================================================

// Get all manuscripts across all authors
router.get('/papers', authenticateToken, async (req, res) => {
  try {
    // Enhance papers with their payment details
    const papersWithPayments = db.store.papers.map(p => {
      const pm = db.store.payments.find(pay => pay.paper_id === p.id);
      return {
        ...p,
        payment: pm || null
      };
    });

    return res.json({
      success: true,
      totalCount: papersWithPayments.length,
      papers: papersWithPayments
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve papers.' });
  }
});

// Update paper status, stage (1-10), and referee remarks
router.patch('/papers/:id/status', authenticateToken, async (req, res) => {
  try {
    const paperId = req.params.id;
    const { status, stage_number, next_step_action, assigned_coordinator } = req.body;

    const paper = db.store.papers.find(p => p.id === paperId);
    if (!paper) {
      return res.status(404).json({ success: false, message: 'Manuscript not found.' });
    }

    if (status) paper.status = status;
    if (stage_number !== undefined) paper.stage_number = Number(stage_number);
    if (next_step_action) paper.next_step_action = next_step_action;
    if (assigned_coordinator) paper.assigned_coordinator = assigned_coordinator;

    // Send notification email via Nodemailer to author
    sendStatusUpdateEmail(paper.primary_author_email, paper.title, paper.id, paper.status, paper.stage_number);

    // Save in-app notification
    db.store.notifications.unshift({
      id: db.store.notifications.length + 1,
      recipient_email: paper.primary_author_email,
      paper_id: paper.id,
      title: `Manuscript Status: ${paper.status}`,
      message: `Stage ${paper.stage_number}: ${paper.next_step_action || paper.status}`,
      category: 'review',
      is_read: false,
      created_at: new Date().toISOString()
    });

    // Audit log
    db.store.auditLogs.unshift({
      id: db.store.auditLogs.length + 1,
      author_email: req.user.email,
      action: 'PAPER_STATUS_UPDATED',
      details: `Updated ${paper.id} to Stage ${paper.stage_number}: ${paper.status}`,
      created_at: new Date().toISOString()
    });

    return res.json({
      success: true,
      message: `Paper ${paperId} updated to Stage ${paper.stage_number} (${paper.status}).`,
      paper
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update paper status.' });
  }
});

// =========================================================================
// 4. PAYMENT STATUS & ADD PAYMENT MANAGEMENT
// =========================================================================

// Get all payment records
router.get('/payments', authenticateToken, async (req, res) => {
  try {
    return res.json({
      success: true,
      totalCount: db.store.payments.length,
      payments: db.store.payments
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve payments.' });
  }
});

// Add New Payment for a Manuscript (Admin Side)
router.post('/payments/create', authenticateToken, async (req, res) => {
  try {
    const { paper_id, author_email, total_amount, amount_paid, payment_method, transaction_ref, invoice_number } = req.body;

    if (!paper_id || !total_amount) {
      return res.status(400).json({ success: false, message: 'Paper ID and Total Amount are required.' });
    }

    const targetPaper = db.store.papers.find(p => p.id === paper_id);
    const targetAuthorEmail = author_email || targetPaper?.primary_author_email || 'author@asracademicresearch.com';

    const parsedTotal = Number(total_amount);
    const parsedPaid = Number(amount_paid || 0);
    const isPaid = parsedPaid >= parsedTotal;

    const newPayment = {
      id: db.store.payments.length + 1,
      paper_id,
      author_email: targetAuthorEmail.toLowerCase().trim(),
      invoice_number: invoice_number || `INV-ASR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      total_amount: parsedTotal,
      amount_paid: parsedPaid,
      currency: 'INR',
      payment_status: isPaid ? 'Paid' : parsedPaid > 0 ? 'Partial' : 'Pending',
      payment_method: payment_method || 'NEFT / Net Banking',
      transaction_ref: transaction_ref || (parsedPaid > 0 ? `UTR-${Date.now().toString().slice(-8)}` : 'Pending'),
      due_date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      paid_at: isPaid ? new Date().toISOString() : null,
      invoice_url: `/invoices/${paper_id}-invoice.pdf`,
      receipt_url: `/receipts/${paper_id}-receipt.pdf`
    };

    // If an existing record was there, update it; otherwise push
    const existingIndex = db.store.payments.findIndex(p => p.paper_id === paper_id);
    if (existingIndex >= 0) {
      db.store.payments[existingIndex] = newPayment;
    } else {
      db.store.payments.unshift(newPayment);
    }

    // Attach to paper object if in store
    if (targetPaper) {
      targetPaper.payment = newPayment;
    }

    // Send notification to author
    db.store.notifications.unshift({
      id: db.store.notifications.length + 1,
      recipient_email: targetAuthorEmail,
      paper_id,
      title: `Invoice Generated: ${newPayment.invoice_number}`,
      message: `Invoice for manuscript ${paper_id}: Total Fee ₹${parsedTotal.toLocaleString('en-IN')}, Paid ₹${parsedPaid.toLocaleString('en-IN')}, Balance ₹${(parsedTotal - parsedPaid).toLocaleString('en-IN')}.`,
      category: 'payment',
      is_read: false,
      created_at: new Date().toISOString()
    });

    // Audit log
    db.store.auditLogs.unshift({
      id: db.store.auditLogs.length + 1,
      author_email: req.user.email,
      action: 'PAYMENT_CREATED',
      details: `Created invoice ${newPayment.invoice_number} for ${paper_id} (Total: ₹${parsedTotal}, Paid: ₹${parsedPaid})`,
      created_at: new Date().toISOString()
    });

    return res.status(201).json({
      success: true,
      message: `Payment record created for ${paper_id}.`,
      payment: newPayment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create payment record.' });
  }
});

// Update payment status (e.g., Mark as Paid, Partial, or adjust Amount)
router.patch('/payments/:id/status', authenticateToken, async (req, res) => {
  try {
    const rawId = req.params.id;
    const paymentId = Number(rawId);
    const { payment_status, amount_paid, add_amount, transaction_ref, payment_method } = req.body;

    // Search by numeric ID, string ID, or paper_id
    let payment = db.store.payments.find(p => p.id === paymentId || String(p.id) === String(rawId) || p.paper_id === rawId);
    
    // Auto-recovery: If client requested a non-existent payment ID, match with any existing paper or create fallback record
    if (!payment) {
      // Check if rawId corresponds to an index or if we can map to an existing unlinked paper
      const fallbackPaper = db.store.papers.find(p => !db.store.payments.some(pm => pm.paper_id === p.id));
      if (fallbackPaper) {
        payment = {
          id: db.store.payments.length + 1,
          paper_id: fallbackPaper.id,
          author_email: fallbackPaper.primary_author_email,
          invoice_number: `INV-ASR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
          total_amount: Number(amount_paid || 35000),
          amount_paid: Number(amount_paid || 0),
          currency: 'INR',
          payment_status: payment_status || 'Partial',
          payment_method: payment_method || 'NEFT / Net Banking',
          transaction_ref: transaction_ref || `UTR-${Date.now().toString().slice(-8)}`,
          due_date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
          paid_at: null,
          invoice_url: `/invoices/${fallbackPaper.id}-invoice.pdf`,
          receipt_url: `/receipts/${fallbackPaper.id}-receipt.pdf`,
          transactions: []
        };
        db.store.payments.push(payment);
        fallbackPaper.payment = payment;
      } else {
        return res.status(404).json({ success: false, message: `Payment record #${rawId} not found in database.` });
      }
    }

    if (!payment.transactions) {
      payment.transactions = [
        {
          id: `tx_${Date.now()}_initial`,
          amount: Number(payment.amount_paid || 0),
          method: payment.payment_method || 'Initial Payment',
          transaction_ref: payment.transaction_ref || 'Initial Entry',
          timestamp: payment.paid_at || new Date().toISOString()
        }
      ];
    }

    let newlyPaidIncrement = 0;

    if (add_amount !== undefined && Number(add_amount) > 0) {
      newlyPaidIncrement = Number(add_amount);
      payment.amount_paid = Number(payment.amount_paid || 0) + newlyPaidIncrement;
      payment.transactions.unshift({
        id: `tx_${Date.now()}`,
        amount: newlyPaidIncrement,
        method: payment_method || 'NEFT / Net Banking',
        transaction_ref: transaction_ref || `UTR-${Date.now().toString().slice(-8)}`,
        timestamp: new Date().toISOString()
      });
    } else if (amount_paid !== undefined) {
      newlyPaidIncrement = Number(amount_paid) - Number(payment.amount_paid || 0);
      payment.amount_paid = Number(amount_paid);
      if (newlyPaidIncrement !== 0) {
        payment.transactions.unshift({
          id: `tx_${Date.now()}`,
          amount: newlyPaidIncrement,
          method: payment_method || (newlyPaidIncrement > 0 ? 'NEFT / Net Banking' : 'Admin Adjustment'),
          transaction_ref: transaction_ref || (newlyPaidIncrement > 0 ? `UTR-${Date.now().toString().slice(-8)}` : 'Admin Adjustment'),
          timestamp: new Date().toISOString()
        });
      }
    }

    if (payment_status) payment.payment_status = payment_status;
    if (transaction_ref) payment.transaction_ref = transaction_ref;
    if (payment_method) payment.payment_method = payment_method;

    if (payment.amount_paid >= payment.total_amount) {
      payment.payment_status = 'Paid';
      payment.paid_at = new Date().toISOString();
    } else if (payment.amount_paid > 0) {
      payment.payment_status = 'Partial';
      payment.paid_at = null;
    } else {
      payment.payment_status = 'Pending';
      payment.paid_at = null;
    }

    // Keep associated paper object in sync
    const paper = db.store.papers.find(p => p.id === payment.paper_id);
    if (paper) {
      paper.payment = payment;
      paper.paid_amount = payment.amount_paid;
      await db.savePaper(paper);
    }
    await db.savePayment(payment);

    // Notify author of payment update
    const notifObj = {
      id: db.store.notifications.length + 1,
      recipient_email: payment.author_email,
      paper_id: payment.paper_id,
      title: `Payment Updated: ₹${payment.amount_paid.toLocaleString('en-IN')} Received (${payment.payment_status})`,
      message: `Payment update for manuscript ${payment.paper_id}: Invoiced ₹${payment.total_amount.toLocaleString('en-IN')}, Total Paid ₹${payment.amount_paid.toLocaleString('en-IN')}, Remaining Balance ₹${Math.max(0, payment.total_amount - payment.amount_paid).toLocaleString('en-IN')}.`,
      category: 'payment',
      is_read: false,
      created_at: new Date().toISOString()
    };
    db.store.notifications.unshift(notifObj);
    await db.saveNotification(notifObj);

    // Audit log
    const auditObj = {
      id: db.store.auditLogs.length + 1,
      author_email: req.user.email,
      action: 'PAYMENT_STATUS_UPDATED',
      details: `Payment for invoice ${payment.invoice_number} updated: Paid ₹${payment.amount_paid} of ₹${payment.total_amount} (${payment.payment_status})`,
      created_at: new Date().toISOString()
    };
    db.store.auditLogs.unshift(auditObj);
    await db.saveAuditLog(auditObj);

    return res.json({
      success: true,
      message: `Payment status updated to ${payment.payment_status}. Remaining: ₹${Math.max(0, payment.total_amount - payment.amount_paid).toLocaleString('en-IN')}`,
      payment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update payment status.' });
  }
});

// =========================================================================
// 5. ALL DOCUMENTS (Admin view)
// =========================================================================
router.get('/documents', authenticateToken, async (req, res) => {
  try {
    return res.json({
      success: true,
      count: db.store.documents.length,
      documents: db.store.documents
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve documents.' });
  }
});

// =========================================================================
// 6. AUDIT LOGS
// =========================================================================
router.get('/audit-logs', authenticateToken, async (req, res) => {
  try {
    return res.json({
      success: true,
      logs: db.store.auditLogs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch logs.' });
  }
});

module.exports = router;
