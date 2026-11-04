const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

// 1. Get Author's notifications
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userEmail = req.user.email.toLowerCase();

    const notifs = db.store.notifications.filter(
      n => n.recipient_email.toLowerCase() === userEmail
    );

    const unreadCount = notifs.filter(n => !n.is_read).length;

    return res.json({
      success: true,
      unreadCount,
      notifications: notifs
    });
  } catch (error) {
    console.error('Fetch notifications error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve notifications.' });
  }
});

// 2. Mark notification as read
router.patch('/:id/read', authenticateToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const notif = db.store.notifications.find(n => n.id === id);

    if (notif) {
      notif.is_read = true;
    }

    return res.json({ success: true, message: 'Notification marked as read.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update notification.' });
  }
});

// 3. Mark all as read
router.patch('/mark-all-read', authenticateToken, async (req, res) => {
  try {
    const userEmail = req.user.email.toLowerCase();
    db.store.notifications.forEach(n => {
      if (n.recipient_email.toLowerCase() === userEmail) {
        n.is_read = true;
      }
    });

    return res.json({ success: true, message: 'All notifications marked as read.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update notifications.' });
  }
});

// 4. Admin Dispatch Notification to Individual Author
router.post('/dispatch', authenticateToken, async (req, res) => {
  try {
    const { recipient_email, paper_id, title, message, category } = req.body;

    if (!recipient_email || !title || !message) {
      return res.status(400).json({ success: false, message: 'Recipient email, title, and message are required.' });
    }

    const newNotif = {
      id: db.store.notifications.length + 1,
      recipient_email: recipient_email.toLowerCase().trim(),
      paper_id: paper_id || null,
      title,
      message,
      category: (category || 'system').toLowerCase(),
      is_read: false,
      created_at: new Date().toISOString()
    };

    db.store.notifications.unshift(newNotif);

    return res.status(201).json({
      success: true,
      message: `Notification successfully dispatched to individual author (${recipient_email}).`,
      notification: newNotif
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to dispatch notification.' });
  }
});

module.exports = router;

