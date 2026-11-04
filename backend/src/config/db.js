const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

let pool = null;
let isConnected = false;

// Persistent local JSON file path for reliable state persistence across server restarts
const DB_FILE = path.join(__dirname, '../../data_store.json');

// Default initial state
const defaultStore = {
  coordinators: [],
  authors: [],
  papers: [],
  authorPaperMapping: [],
  paperStatusHistory: [],
  documents: [],
  payments: [],
  notifications: [],
  otpSessions: {},
  auditLogs: []
};

let store = defaultStore;

// Load disk backup initially if available
try {
  if (fs.existsSync(DB_FILE)) {
    const rawData = fs.readFileSync(DB_FILE, 'utf8');
    store = JSON.parse(rawData);
    if (!store.otpSessions) store.otpSessions = {};
    if (!store.auditLogs) store.auditLogs = [];
    if (!store.coordinators) store.coordinators = [];
    if (!store.authorPaperMapping) store.authorPaperMapping = [];
    if (!store.paperStatusHistory) store.paperStatusHistory = [];
    if (!store.documents) store.documents = [];
    if (!store.payments) store.payments = [];
    if (!store.notifications) store.notifications = [];
  }
} catch (e) {
  console.warn('⚠️ Error loading persistence store:', e.message);
}

// Auto-save helper for disk
function persistStore() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(store, null, 2), 'utf8');
  } catch (err) {
    // silent fallback if read-only on vercel
  }
}

// Bidirectional Neon DB Sync Engine
async function syncFromNeon() {
  if (!isConnected || !pool) return;
  try {
    const [authorsRes, coordsRes, papersRes, mapRes, histRes, docsRes, paymentsRes, notifsRes, logsRes] = await Promise.all([
      pool.query('SELECT * FROM authors ORDER BY id ASC'),
      pool.query('SELECT * FROM coordinators ORDER BY id ASC'),
      pool.query('SELECT * FROM papers ORDER BY created_at DESC'),
      pool.query('SELECT * FROM author_paper_mapping'),
      pool.query('SELECT * FROM paper_status_history ORDER BY recorded_at ASC'),
      pool.query('SELECT * FROM documents ORDER BY id DESC'),
      pool.query('SELECT * FROM payments ORDER BY id DESC'),
      pool.query('SELECT * FROM notifications ORDER BY id DESC'),
      pool.query('SELECT * FROM audit_logs ORDER BY id DESC LIMIT 200')
    ]);

    if (authorsRes.rows.length) store.authors = authorsRes.rows;
    if (coordsRes.rows.length) store.coordinators = coordsRes.rows;
    if (papersRes.rows.length) {
      store.papers = papersRes.rows.map(p => ({
        ...p,
        services: typeof p.services === 'string' ? JSON.parse(p.services) : (p.services || [])
      }));
    }
    if (mapRes.rows.length) store.authorPaperMapping = mapRes.rows;
    if (histRes.rows.length) store.paperStatusHistory = histRes.rows;
    if (docsRes.rows.length) store.documents = docsRes.rows;
    if (paymentsRes.rows.length) {
      store.payments = paymentsRes.rows.map(pm => ({
        ...pm,
        services: typeof pm.services === 'string' ? JSON.parse(pm.services) : (pm.services || []),
        transactions: typeof pm.transactions === 'string' ? JSON.parse(pm.transactions) : (pm.transactions || [])
      }));
    }
    if (notifsRes.rows.length) store.notifications = notifsRes.rows;
    if (logsRes.rows.length) store.auditLogs = logsRes.rows;

    persistStore();
    console.log(`📡 Synced latest records from Neon DB (Papers: ${store.papers.length}, Docs: ${store.documents.length}, Payments: ${store.payments.length})`);
  } catch (err) {
    console.error('⚠️ Neon syncFromNeon error:', err.message);
  }
}

// Initialize connection to Neon DB
function initDB() {
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder')) {
    try {
      pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 10000,
        idleTimeoutMillis: 30000
      });
      isConnected = true;
      console.log('✅ Connected to Neon PostgreSQL database.');

      // Sync initial data from Neon into memory store immediately
      syncFromNeon();
    } catch (err) {
      console.warn('⚠️ Neon DB connection failed:', err.message);
      pool = null;
      isConnected = false;
    }
  } else {
    console.log('ℹ️ Running without Neon DB (Configure DATABASE_URL in .env)');
  }
}

initDB();

// Async helper methods to write directly into Neon PostgreSQL
const db = {
  isNeonConnected: () => isConnected,
  getPool: () => pool,
  store,
  persist: persistStore,
  syncFromNeon,

  async query(text, params) {
    if (isConnected && pool) {
      return await pool.query(text, params);
    }
    return null;
  },

  // Save new or updated paper to Neon
  async savePaper(paper) {
    if (!isConnected || !pool) return;
    try {
      await pool.query(`
        INSERT INTO papers (
          id, title, primary_author_email, target_journal, indexing_tier, status,
          stage_number, stage_title, submission_date, expected_decision_date,
          assigned_department, assigned_coordinator, coordinator_phone,
          author_positions, co_authors, abstract_text, next_step_action,
          total_amount, paid_amount, services, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, NOW())
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          status = EXCLUDED.status,
          stage_number = EXCLUDED.stage_number,
          stage_title = EXCLUDED.stage_title,
          assigned_coordinator = EXCLUDED.assigned_coordinator,
          coordinator_phone = EXCLUDED.coordinator_phone,
          total_amount = EXCLUDED.total_amount,
          paid_amount = EXCLUDED.paid_amount,
          services = EXCLUDED.services,
          updated_at = NOW()
      `, [
        paper.id,
        paper.title,
        paper.primary_author_email.toLowerCase(),
        paper.target_journal || 'ASR Academic Journal',
        paper.indexing_tier || 'SCOPUS / SCI',
        paper.status || 'Under Review',
        paper.stage_number || 1,
        paper.stage_title || paper.status,
        paper.submission_date || new Date().toISOString().split('T')[0],
        paper.expected_decision_date || null,
        paper.assigned_department || 'Publication & Review Cell',
        paper.assigned_coordinator || 'Dr. Rajesh K. (Publication Lead)',
        paper.coordinator_phone || '+91 9515207724',
        paper.author_positions || 'First & Corresponding Author',
        paper.co_authors || '',
        paper.abstract_text || '',
        paper.next_step_action || '',
        paper.total_amount || 0,
        paper.paid_amount || 0,
        paper.services ? JSON.stringify(paper.services) : '[]'
      ]);
    } catch (e) {
      console.error('Neon savePaper error:', e.message);
    }
  },

  // Save new document to Neon
  async saveDocument(doc) {
    if (!isConnected || !pool) return;
    try {
      const res = await pool.query(`
        INSERT INTO documents (
          paper_id, document_name, document_category, file_url,
          file_size, is_cloudinary, uploaded_at
        ) VALUES ($1, $2, $3, $4, $5, $6, NOW())
        RETURNING id
      `, [
        doc.paper_id,
        doc.document_name,
        doc.document_category || 'Proof',
        doc.file_url,
        doc.file_size || '1.0 MB',
        Boolean(doc.is_cloudinary)
      ]);
      if (res.rows && res.rows[0]) {
        doc.id = res.rows[0].id;
      }
    } catch (e) {
      console.error('Neon saveDocument error:', e.message);
    }
  },

  // Save or update payment to Neon
  async savePayment(pm) {
    if (!isConnected || !pool) return;
    try {
      await pool.query(`
        INSERT INTO payments (
          paper_id, author_email, invoice_number, total_amount, amount_paid,
          currency, payment_status, payment_method, transaction_ref,
          due_date, paid_at, services, transactions
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        ON CONFLICT (invoice_number) DO UPDATE SET
          total_amount = EXCLUDED.total_amount,
          amount_paid = EXCLUDED.amount_paid,
          payment_status = EXCLUDED.payment_status,
          payment_method = EXCLUDED.payment_method,
          transaction_ref = EXCLUDED.transaction_ref,
          transactions = EXCLUDED.transactions,
          paid_at = EXCLUDED.paid_at
      `, [
        pm.paper_id,
        pm.author_email.toLowerCase(),
        pm.invoice_number,
        pm.total_amount || 0,
        pm.amount_paid || 0,
        pm.currency || 'INR',
        pm.payment_status || 'Pending',
        pm.payment_method || 'Bank Transfer',
        pm.transaction_ref || '',
        pm.due_date || null,
        pm.paid_at || null,
        pm.services ? JSON.stringify(pm.services) : '[]',
        pm.transactions ? JSON.stringify(pm.transactions) : '[]'
      ]);
    } catch (e) {
      console.error('Neon savePayment error:', e.message);
    }
  },

  // Save new notification to Neon
  async saveNotification(n) {
    if (!isConnected || !pool) return;
    try {
      const res = await pool.query(`
        INSERT INTO notifications (
          recipient_email, paper_id, title, message, category, is_read, email_dispatched, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
        RETURNING id
      `, [
        n.recipient_email.toLowerCase(),
        n.paper_id || null,
        n.title,
        n.message,
        n.category || 'system',
        Boolean(n.is_read),
        n.email_dispatched !== undefined ? n.email_dispatched : true
      ]);
      if (res.rows && res.rows[0]) {
        n.id = res.rows[0].id;
      }
    } catch (e) {
      console.error('Neon saveNotification error:', e.message);
    }
  },

  // Save audit log to Neon
  async saveAuditLog(log) {
    if (!isConnected || !pool) return;
    try {
      await pool.query(`
        INSERT INTO audit_logs (author_email, action, details, created_at)
        VALUES ($1, $2, $3, NOW())
      `, [
        log.author_email || 'system',
        log.action || 'EVENT',
        log.details || ''
      ]);
    } catch (e) {
      console.error('Neon saveAuditLog error:', e.message);
    }
  },

  // Save author to Neon
  async saveAuthor(author) {
    if (!isConnected || !pool) return;
    try {
      await pool.query(`
        INSERT INTO authors (email, username, password, full_name, role, phone, institution)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (email) DO UPDATE SET
          username = EXCLUDED.username,
          full_name = EXCLUDED.full_name,
          role = EXCLUDED.role,
          phone = EXCLUDED.phone,
          institution = EXCLUDED.institution
      `, [
        author.email.toLowerCase(),
        author.username || author.email.split('@')[0],
        author.password || 'AuthorPassword123!',
        author.full_name || author.name || 'Author',
        author.role || 'author',
        author.phone || '+91 9515207724',
        author.institution || 'Department of Research'
      ]);
    } catch (e) {
      console.error('Neon saveAuthor error:', e.message);
    }
  },

  // Save coordinator to Neon
  async saveCoordinator(coord) {
    if (!isConnected || !pool) return;
    try {
      await pool.query(`
        INSERT INTO coordinators (id, name, title, department, email, phone, active_papers_count)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          title = EXCLUDED.title,
          department = EXCLUDED.department,
          email = EXCLUDED.email,
          phone = EXCLUDED.phone,
          active_papers_count = EXCLUDED.active_papers_count
      `, [
        String(coord.id),
        coord.name,
        coord.title || 'Publication Lead',
        coord.department || 'General',
        coord.email,
        coord.phone || '+91 9515207724',
        coord.active_papers_count || 0
      ]);
    } catch (e) {
      console.error('Neon saveCoordinator error:', e.message);
    }
  }
};

module.exports = db;
