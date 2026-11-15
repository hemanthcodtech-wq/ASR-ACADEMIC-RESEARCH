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

    // Also attach relevant documents, mapped author info, and payments for quick dashboard rendering
    const enhancedPapers = myPapers.map(paper => {
      const docs = db.store.documents.filter(d => d.paper_id === paper.id);
      const payment = db.store.payments.find(pm => pm.paper_id === paper.id);
      const myMapping = db.store.authorPaperMapping.find(
        m => m.paper_id === paper.id && m.author_email.toLowerCase() === userEmail
      );

      // If author has an individual ledger in this paper, customize payment summary to their individual share
      let authorSpecificPayment = payment || null;
      if (myMapping && (myMapping.advance_paid !== undefined || myMapping.pending_amount !== undefined)) {
        const indAdvance = Number(myMapping.advance_paid) || 0;
        const indPending = Number(myMapping.pending_amount) || 0;
        const indTotal = indAdvance + indPending;
        if (indTotal > 0) {
          authorSpecificPayment = {
            ...(payment || {}),
            total_amount: indTotal,
            amount_paid: indAdvance,
            pending_amount: indPending,
            payment_status: indPending <= 0 ? 'Paid' : indAdvance > 0 ? 'Partial' : 'Pending',
            is_individual_ledger: true
          };
        }
      }

      return {
        ...paper,
        documents: docs,
        payment: authorSpecificPayment,
        my_author_mapping: myMapping || null
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
      primary_author_name,
      author_positions,
      co_authors,
      abstract_text,
      assigned_coordinator,
      assigned_department,
      // Payment details from intake form
      total_amount,
      amount_paid,
      payment_method,
      transaction_ref,
      services
    } = req.body;

    const authorTargetEmail = (primary_author_email || req.user.email).toLowerCase().trim();

    if (!title || !target_journal) {
      return res.status(400).json({ success: false, message: 'Title and target journal are required.' });
    }

    // Auto-create or ensure author exists in authors table
    let authorRecord = db.store.authors.find(a => a.email.toLowerCase() === authorTargetEmail);
    if (!authorRecord) {
      authorRecord = {
        id: db.store.authors.length + 1,
        email: authorTargetEmail,
        username: authorTargetEmail.split('@')[0],
        password: 'AuthorPassword123!',
        full_name: primary_author_name || authorTargetEmail.split('@')[0].toUpperCase(),
        role: 'author',
        phone: '+91 9515207724',
        institution: 'Academic Researcher',
        created_at: new Date().toISOString()
      };
      db.store.authors.push(authorRecord);
      await db.saveAuthor(authorRecord);
    } else if (primary_author_name && authorRecord.full_name !== primary_author_name) {
      authorRecord.full_name = primary_author_name;
      await db.saveAuthor(authorRecord);
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
      author_positions: author_positions || `${primary_author_name || req.user.fullName || 'Author'} (Primary)`,
      co_authors: co_authors || 'None recorded',
      abstract_text: abstract_text || '',
      services: services || [],
      next_step_action: 'Manuscript registered. Initial editorial integrity and formatting screening in progress.'
    };

    db.store.papers.unshift(newPaper);
    await db.savePaper(newPaper);
    
    // Map paper to the designated author email
    db.store.authorPaperMapping.push({
      author_email: authorTargetEmail,
      paper_id: newId,
      role_in_paper: 'First Author'
    });
    if (db.isNeonConnected()) {
      db.query(`INSERT INTO author_paper_mapping (author_email, paper_id, role_in_paper) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`, [authorTargetEmail, newId, 'First Author']).catch(console.error);
    }

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
      await db.savePayment(paymentRecord);
      newPaper.payment = paymentRecord;
    }

    // Create confirmation notification for the author
    const notif = {
      id: db.store.notifications.length + 1,
      recipient_email: authorTargetEmail,
      paper_id: newId,
      title: 'Manuscript Successfully Registered',
      message: `Your manuscript "${title}" has been registered with Tracking ID: ${newId}.${parsedTotal > 0 ? ` Invoice generated: Total ₹${parsedTotal.toLocaleString('en-IN')}, Paid ₹${parsedPaid.toLocaleString('en-IN')}.` : ''}`,
      category: 'system',
      is_read: false,
      created_at: new Date().toISOString()
    };
    db.store.notifications.unshift(notif);
    await db.saveNotification(notif);

    // Audit log
    const auditEntry = {
      id: db.store.auditLogs.length + 1,
      author_email: req.user.email,
      action: 'PAPER_REGISTERED',
      details: `Registered ${newId} for author ${authorTargetEmail}. Fee: ₹${parsedTotal}, Paid: ₹${parsedPaid}`,
      created_at: new Date().toISOString()
    };
    db.store.auditLogs.unshift(auditEntry);
    await db.saveAuditLog(auditEntry);

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

// 4. Bulk Upload Papers from Excel (ASR ManuTrack Engine)
router.post('/bulk-upload', authenticateToken, async (req, res) => {
  try {
    const { papers } = req.body;
    if (!papers || !Array.isArray(papers) || papers.length === 0) {
      return res.status(400).json({ success: false, message: 'No manuscript rows provided in payload.' });
    }

    const insertedPapers = [];

    for (let index = 0; index < papers.length; index++) {
      const row = papers[index];
      const title = (row.title || row.Titles || `Manuscript Entry #${index + 1}`).trim();
      const targetJournal = row.target_journal || row.journal || row.Status_Journal || 'Energy Conversion and Management (Elsevier)';
      const indexingTier = row.indexing_tier || row['SCI/Scopus'] || 'SCI / SCIE / - Q1/Q2';
      const status = row.status || row.Status || 'Submitted';
      
      // Determine stage number from status
      let stageNumber = 4;
      const lowerStatus = status.toLowerCase();
      if (lowerStatus.includes('registered')) stageNumber = 1;
      else if (lowerStatus.includes('plagiarism')) stageNumber = 3;
      else if (lowerStatus.includes('submit')) stageNumber = 4;
      else if (lowerStatus.includes('review')) stageNumber = 5;
      else if (lowerStatus.includes('revision')) stageNumber = 6;
      else if (lowerStatus.includes('accept')) stageNumber = 8;
      else if (lowerStatus.includes('publish')) stageNumber = 10;

      const newId = `ASR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

      // Parse authors array
      const rawAuthors = row.authors || [];
      let totalPaperAdvance = 0;
      let totalPaperPending = 0;
      let primaryEmail = 'kancharlahemanth89@gmail.com';
      let authorLedger = [];

      if (Array.isArray(rawAuthors) && rawAuthors.length > 0) {
        authorLedger = rawAuthors.map((a, i) => {
          const aName = (a.name || a.author || `Author ${i + 1}`).trim();
          const cleanEmail = a.email ? a.email.toLowerCase().trim() : `${aName.toLowerCase().replace(/[^a-z0-9]/g, '')}@gmail.com`;
          const adv = Number(a.advance || a.advance_paid || 0) || 0;
          const pend = Number(a.pending || a.pending_amount || 0) || 0;
          totalPaperAdvance += adv;
          totalPaperPending += pend;
          if (i === 0) primaryEmail = cleanEmail;
          return {
            name: aName,
            email: cleanEmail,
            advance: adv,
            pending: pend,
            order: i + 1
          };
        });
      }

      // Ensure authors exist and create paper mappings
      for (const authItem of authorLedger) {
        let authRecord = db.store.authors.find(a => a.email.toLowerCase() === authItem.email);
        if (!authRecord) {
          authRecord = {
            id: db.store.authors.length + 1,
            email: authItem.email,
            username: authItem.email.split('@')[0],
            password: 'AuthorPassword123!',
            full_name: authItem.name,
            role: 'author',
            phone: '+91 9515207724',
            institution: 'Academic Researcher',
            created_at: new Date().toISOString()
          };
          db.store.authors.push(authRecord);
          await db.saveAuthor(authRecord);
        }

        const mapEntry = {
          author_email: authItem.email,
          paper_id: newId,
          role_in_paper: authItem.order === 1 ? 'Primary Author' : `Co-Author (${authItem.order})`,
          author_name: authItem.name,
          advance_paid: authItem.advance,
          pending_amount: authItem.pending,
          author_order: authItem.order
        };
        db.store.authorPaperMapping.push(mapEntry);
        if (db.isNeonConnected()) {
          await db.query(`
            INSERT INTO author_paper_mapping (author_email, paper_id, role_in_paper, author_name, advance_paid, pending_amount, author_order)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (author_email, paper_id) DO UPDATE SET
              author_name = EXCLUDED.author_name,
              advance_paid = EXCLUDED.advance_paid,
              pending_amount = EXCLUDED.pending_amount
          `, [authItem.email, newId, mapEntry.role_in_paper, authItem.name, authItem.advance, authItem.pending, authItem.order]).catch(console.error);
        }
      }

      const totalAmount = totalPaperAdvance + totalPaperPending;
      const isPaid = totalPaperPending <= 0 && totalPaperAdvance > 0;

      const newPaper = {
        id: newId,
        title,
        primary_author_email: primaryEmail,
        target_journal: targetJournal,
        indexing_tier: indexingTier,
        status: status,
        stage_number: stageNumber,
        submission_date: new Date().toISOString().split('T')[0],
        assigned_department: 'Editorial Intake & Review Cell',
        assigned_coordinator: 'Dr. Rajesh K. (Senior Publication Lead)',
        coordinator_phone: '+91 9515207724',
        author_positions: authorLedger.map(a => `${a.order}. ${a.name}`).join(', '),
        co_authors: authorLedger.slice(1).map(a => a.name).join(', '),
        abstract_text: row.abstract_text || '',
        total_amount: totalAmount,
        paid_amount: totalPaperAdvance,
        author_ledger: authorLedger,
        next_step_action: `Manuscript status: ${status} in ${targetJournal}. Tracking active on ASR ManuTrack.`
      };

      db.store.papers.unshift(newPaper);
      await db.savePaper(newPaper);

      // Create integrated payment record
      if (totalAmount > 0) {
        const paymentRecord = {
          id: db.store.payments.length + 1,
          paper_id: newId,
          author_email: primaryEmail,
          invoice_number: `INV-ASR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
          total_amount: totalAmount,
          amount_paid: totalPaperAdvance,
          currency: 'INR',
          payment_status: isPaid ? 'Paid' : totalPaperAdvance > 0 ? 'Partial' : 'Pending',
          payment_method: 'NEFT / Net Banking',
          transaction_ref: totalPaperAdvance > 0 ? `UTR-${Date.now().toString().slice(-8)}` : 'Pending',
          due_date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
          paid_at: isPaid ? new Date().toISOString() : null,
          invoice_url: `/invoices/${newId}-invoice.pdf`,
          receipt_url: `/receipts/${newId}-receipt.pdf`,
          transactions: totalPaperAdvance > 0 ? [
            {
              id: `tx_${Date.now()}_excel`,
              amount: totalPaperAdvance,
              method: 'NEFT / Net Banking',
              transaction_ref: `UTR-${Date.now().toString().slice(-8)}`,
              timestamp: new Date().toISOString()
            }
          ] : []
        };
        db.store.payments.push(paymentRecord);
        await db.savePayment(paymentRecord);
        newPaper.payment = paymentRecord;
      }

      // Notify mapped authors
      for (const authItem of authorLedger) {
        const notif = {
          id: db.store.notifications.length + 1,
          recipient_email: authItem.email,
          paper_id: newId,
          title: `Manuscript "${title.slice(0, 40)}..." Mapped`,
          message: `Your manuscript "${title}" is registered on ASR ManuTrack (Status: ${status}). Your individual fee: Adv Paid ₹${authItem.advance.toLocaleString('en-IN')}, Pending ₹${authItem.pending.toLocaleString('en-IN')}.`,
          category: 'system',
          is_read: false,
          created_at: new Date().toISOString()
        };
        db.store.notifications.unshift(notif);
        await db.saveNotification(notif);
      }

      insertedPapers.push(newPaper);
    }

    // Audit log
    const auditEntry = {
      id: db.store.auditLogs.length + 1,
      author_email: req.user.email,
      action: 'BULK_EXCEL_IMPORT',
      details: `Imported ${insertedPapers.length} manuscripts with multi-author ledgers via Excel on ASR ManuTrack`,
      created_at: new Date().toISOString()
    };
    db.store.auditLogs.unshift(auditEntry);
    await db.saveAuditLog(auditEntry);

    return res.status(201).json({
      success: true,
      message: `Successfully imported ${insertedPapers.length} manuscripts and mapped all authors!`,
      papers: insertedPapers
    });
  } catch (error) {
    console.error('Bulk upload error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to process Excel upload.' });
  }
});

// 5. Update Paper Status / Stage (Staff only or Demo action)
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
    await db.savePaper(paper);

    // Send automatic update notification
    const updateNotif = {
      id: db.store.notifications.length + 1,
      recipient_email: paper.primary_author_email,
      paper_id: paper.id,
      title: `Status Updated: ${paper.status}`,
      message: `Your manuscript "${paper.title}" progressed to Stage ${paper.stage_number}: ${paper.status}.`,
      category: 'review',
      is_read: false,
      created_at: new Date().toISOString()
    };
    db.store.notifications.unshift(updateNotif);
    await db.saveNotification(updateNotif);

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
