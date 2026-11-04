const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

// 1. Get Payments for logged in author
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userEmail = req.user.email.toLowerCase();

    // Authors see only their own payment records
    const userPayments = db.store.payments.filter(
      p => p.author_email.toLowerCase() === userEmail
    );

    const summary = {
      totalInvoiced: userPayments.reduce((acc, curr) => acc + Number(curr.total_amount), 0),
      totalPaid: userPayments.reduce((acc, curr) => acc + Number(curr.amount_paid), 0),
      outstandingBalance: userPayments.reduce((acc, curr) => acc + (Number(curr.total_amount) - Number(curr.amount_paid)), 0)
    };

    return res.json({
      success: true,
      summary,
      payments: userPayments
    });
  } catch (error) {
    console.error('Fetch payments error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve payment records.' });
  }
});

// 2. Record / Submit Payment Details
router.post('/record', authenticateToken, async (req, res) => {
  try {
    const { paper_id, amount, payment_method, transaction_ref } = req.body;
    const userEmail = req.user.email.toLowerCase();

    const existingPayment = db.store.payments.find(p => p.paper_id === paper_id);

    if (existingPayment) {
      const addedAmount = Number(amount);
      existingPayment.amount_paid = Number(existingPayment.amount_paid) + addedAmount;
      if (existingPayment.amount_paid >= existingPayment.total_amount) {
        existingPayment.payment_status = 'Paid';
        existingPayment.paid_at = new Date().toISOString();
      } else {
        existingPayment.payment_status = 'Partial';
      }
      existingPayment.transaction_ref = transaction_ref || existingPayment.transaction_ref;
      existingPayment.payment_method = payment_method || existingPayment.payment_method;

      if (!existingPayment.transactions) {
        existingPayment.transactions = [];
      }
      existingPayment.transactions.unshift({
        id: `tx_${Date.now()}`,
        amount: addedAmount,
        method: payment_method || 'Online Transfer',
        transaction_ref: transaction_ref || `UTR-${Date.now().toString().slice(-8)}`,
        timestamp: new Date().toISOString()
      });

      return res.json({
        success: true,
        message: 'Payment credited successfully.',
        payment: existingPayment
      });
    }

    const newPayment = {
      id: db.store.payments.length + 1,
      paper_id,
      author_email: userEmail,
      invoice_number: `INV-ASR-${Date.now().toString().slice(-4)}`,
      total_amount: Number(amount),
      amount_paid: Number(amount),
      currency: 'INR',
      payment_status: 'Paid',
      payment_method: payment_method || 'Online Transfer',
      transaction_ref: transaction_ref || `UTR-${Date.now()}`,
      due_date: new Date().toISOString().split('T')[0],
      paid_at: new Date().toISOString(),
      transactions: [
        {
          id: `tx_${Date.now()}`,
          amount: Number(amount),
          method: payment_method || 'Online Transfer',
          transaction_ref: transaction_ref || `UTR-${Date.now().toString().slice(-8)}`,
          timestamp: new Date().toISOString()
        }
      ]
    };

    db.store.payments.push(newPayment);

    return res.status(201).json({
      success: true,
      message: 'Payment recorded successfully.',
      payment: newPayment
    });
  } catch (error) {
    console.error('Record payment error:', error);
    res.status(500).json({ success: false, message: 'Failed to record payment.' });
  }
});

module.exports = router;

