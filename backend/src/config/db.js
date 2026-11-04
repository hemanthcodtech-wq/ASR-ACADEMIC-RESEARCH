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
  coordinators: [
    {
      id: 'coord_1',
      name: 'Dr. Rajesh K.',
      title: 'Senior Publication Lead',
      department: 'Electrical & Renewable Systems Cell',
      email: 'rajesh.k@asracademicresearch.com',
      phone: '+91 9515207724',
      active_papers_count: 8
    },
    {
      id: 'coord_2',
      name: 'Ms. S. Ananya',
      title: 'Post-Acceptance Coordinator',
      department: 'Computer Science & AI Division',
      email: 'ananya.s@asracademicresearch.com',
      phone: '+91 9515207724',
      active_papers_count: 5
    },
    {
      id: 'coord_3',
      name: 'Dr. Vikramaditya M.',
      title: 'Senior Peer Review Editor',
      department: 'Mechanical & Materials Engineering Division',
      email: 'vikram.m@asracademicresearch.com',
      phone: '+91 9515207724',
      active_papers_count: 6
    },
    {
      id: 'coord_4',
      name: 'Dr. Shalini Prasad',
      title: 'Journal Indexing & Scopus Liaison',
      department: 'Biotechnology & Health Sciences Cell',
      email: 'shalini.p@asracademicresearch.com',
      phone: '+91 9515207724',
      active_papers_count: 4
    }
  ],
  authors: [
    {
      id: 1,
      email: 'admin@asracademicresearch.com',
      username: 'admin',
      password: 'adminPassword123!',
      full_name: 'Chief Editorial Administrator',
      role: 'admin',
      phone: '+91 9515207724',
      institution: 'ASR Academic Research Solutions Head Office',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      email: 'kancharlahemanth89@gmail.com',
      username: 'hemanth',
      password: 'AuthorPassword123!',
      full_name: 'Dr. Hemanth Kancharla',
      role: 'author',
      phone: '+91 9515207724',
      institution: 'Department of Electrical & Computer Engineering, Research Hub',
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      email: 'kancharla@gmail.com',
      username: 'kancharla',
      password: 'AuthorPassword123!',
      full_name: 'Prof. Kancharla',
      role: 'author',
      phone: '+91 9515207724',
      institution: 'Department of Computer Science',
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      email: 'chinnakancharla1@gmail.com',
      username: 'chinna',
      password: 'AuthorPassword123!',
      full_name: 'Chinna',
      role: 'author',
      phone: '+91 9515207724',
      institution: 'Institute of Advanced Engineering',
      created_at: new Date().toISOString()
    }
  ],
  papers: [
    {
      id: 'ASR-2026-695',
      title: 'HIII',
      primary_author_email: 'chinnakancharla1@gmail.com',
      target_journal: 'Energy Conversion and Management (Elsevier)',
      indexing_tier: 'SCI / SCIE (Q1) • Scopus Indexed',
      status: 'Paper Registered',
      stage_number: 1,
      submission_date: '2026-11-04',
      assigned_department: 'Electrical & Renewable Systems Cell',
      assigned_coordinator: 'Dr. Rajesh K. (Senior Publication Lead)',
      coordinator_phone: '+91 9515207724',
      author_positions: 'Chinna (Corresponding Author)',
      co_authors: 'None recorded',
      abstract_text: '',
      next_step_action: 'Manuscript registered. Initial editorial integrity and formatting screening in progress.',
      payment: {
        id: 3,
        paper_id: 'ASR-2026-695',
        author_email: 'chinnakancharla1@gmail.com',
        invoice_number: 'INV-ASR-2026-8165',
        total_amount: 50000,
        amount_paid: 5000,
        currency: 'INR',
        payment_status: 'Partial',
        payment_method: 'NEFT / Net Banking',
        transaction_ref: 'ABC',
        due_date: '2026-12-04',
        paid_at: null,
        invoice_url: '/invoices/ASR-2026-695-invoice.pdf',
        receipt_url: '/receipts/ASR-2026-695-receipt.pdf',
        transactions: [
          {
            id: 'tx_init_hiii',
            amount: 5000,
            method: 'NEFT / Net Banking',
            transaction_ref: 'ABC',
            timestamp: new Date().toISOString()
          }
        ]
      }
    },
    {
      id: 'ASR-2024-ENG-084',
      title: 'Deep Learning Based Adaptive MPPT for Hybrid Solar–Wind Microgrid Systems',
      primary_author_email: 'kancharlahemanth89@gmail.com',
      target_journal: 'Energy Conversion and Management (Elsevier)',
      indexing_tier: 'SCI / SCIE (Q1) • Scopus Indexed',
      status: 'Revision Requested',
      stage_number: 6,
      submission_date: '2024-03-12',
      expected_decision_date: '2024-05-15',
      assigned_department: 'Electrical & Renewable Systems Cell',
      assigned_coordinator: 'Dr. Rajesh K. (Senior Publication Lead)',
      coordinator_phone: '+91 9515207724',
      author_positions: 'Dr. K. Sharma (1st Author), Prof. M. Verma, A. Reddy',
      co_authors: 'Prof. M. Verma, A. Reddy',
      abstract_text: 'This paper proposes a deep reinforcement learning framework for high-efficiency Maximum Power Point Tracking (MPPT) in hybrid renewable microgrid setups.',
      next_step_action: 'Reviewer comments consolidated. Minor revisions to simulation graph and methodology required.'
    },
    {
      id: 'ASR-2023-CS-119',
      title: 'Optimized Graph Neural Networks for Fraud Detection in Real-Time Banking Transactions',
      primary_author_email: 'kancharlahemanth89@gmail.com',
      target_journal: 'Knowledge-Based Systems (Elsevier)',
      indexing_tier: 'SCI / SCIE (Q1) • Impact Factor: 8.8',
      status: 'Accepted (In Press)',
      stage_number: 8,
      submission_date: '2023-11-05',
      expected_decision_date: '2024-02-10',
      assigned_department: 'Artificial Intelligence & Computer Science',
      assigned_coordinator: 'Ms. S. Ananya (Post-Acceptance Coordinator)',
      coordinator_phone: '+91 9515207724',
      author_positions: 'Dr. H. Kancharla (1st Author & Corresponding), Dr. P. Rao',
      co_authors: 'Dr. P. Rao (IISc Bengaluru)',
      abstract_text: 'We demonstrate an inductive graph neural network with attention-driven anomaly clustering that achieves 99.4% precision with sub-millisecond latency on high-throughput distributed transaction ledgers.',
      next_step_action: 'Final author proof approval submitted. Issue assignment and DOI assignment under final processing.'
    }
  ],
  authorPaperMapping: [
    { author_email: 'chinnakancharla1@gmail.com', paper_id: 'ASR-2026-695', role_in_paper: 'First Author' },
    { author_email: 'kancharlahemanth89@gmail.com', paper_id: 'ASR-2024-ENG-084', role_in_paper: 'First Author' },
    { author_email: 'kancharlahemanth89@gmail.com', paper_id: 'ASR-2023-CS-119', role_in_paper: 'Corresponding Author' }
  ],
  documents: [
    {
      id: 101,
      paper_id: 'ASR-2024-ENG-084',
      document_name: 'Submission_Confirmation_Receipt_ASR2024.pdf',
      document_category: 'Proof',
      file_size: '420 KB',
      uploaded_at: '2024-03-12',
      file_url: 'https://res.cloudinary.com/demo/image/upload/v1/sample.pdf'
    },
    {
      id: 102,
      paper_id: 'ASR-2024-ENG-084',
      document_name: 'Turnitin_Plagiarism_Report_6_Percent.pdf',
      document_category: 'Report',
      file_size: '1.8 MB',
      uploaded_at: '2024-03-10',
      file_url: 'https://res.cloudinary.com/demo/image/upload/v1/sample.pdf'
    },
    {
      id: 201,
      paper_id: 'ASR-2023-CS-119',
      document_name: 'Official_Acceptance_Letter_IEEE_TIFS.pdf',
      document_category: 'Acceptance',
      file_size: '610 KB',
      uploaded_at: '2024-02-18',
      file_url: 'https://res.cloudinary.com/demo/image/upload/v1/sample.pdf'
    }
  ],
  payments: [
    {
      id: 1,
      paper_id: 'ASR-2024-ENG-084',
      author_email: 'kancharlahemanth89@gmail.com',
      invoice_number: 'INV-ASR-2024-0981',
      total_amount: 32000,
      amount_paid: 20000,
      currency: 'INR',
      payment_status: 'Partial',
      payment_method: 'NEFT / Net Banking',
      transaction_ref: 'UTR-HDFC09281982',
      due_date: '2024-04-30',
      invoice_url: '/invoices/INV-ASR-2024-0981.pdf',
      receipt_url: '/receipts/REC-ASR-2024-0981.pdf',
      transactions: [
        {
          id: 'tx_init_1',
          amount: 20000,
          method: 'NEFT / Net Banking',
          transaction_ref: 'UTR-HDFC09281982',
          timestamp: '2024-03-12T10:00:00.000Z'
        }
      ]
    },
    {
      id: 2,
      paper_id: 'ASR-2023-CS-119',
      author_email: 'kancharlahemanth89@gmail.com',
      invoice_number: 'INV-ASR-2023-0442',
      total_amount: 45000,
      amount_paid: 45000,
      currency: 'INR',
      payment_status: 'Paid',
      payment_method: 'UPI / Direct Bank',
      transaction_ref: 'UTR-SBIN0029381',
      due_date: '2023-12-15',
      paid_at: '2023-12-12',
      invoice_url: '/invoices/INV-ASR-2023-0442.pdf',
      receipt_url: '/receipts/REC-ASR-2023-0442.pdf',
      transactions: [
        {
          id: 'tx_init_2',
          amount: 45000,
          method: 'UPI / Direct Bank',
          transaction_ref: 'UTR-SBIN0029381',
          timestamp: '2023-12-12T10:00:00.000Z'
        }
      ]
    },
    {
      id: 3,
      paper_id: 'ASR-2026-695',
      author_email: 'chinnakancharla1@gmail.com',
      invoice_number: 'INV-ASR-2026-8165',
      total_amount: 50000,
      amount_paid: 5000,
      currency: 'INR',
      payment_status: 'Partial',
      payment_method: 'NEFT / Net Banking',
      transaction_ref: 'ABC',
      due_date: '2026-12-04',
      paid_at: null,
      invoice_url: '/invoices/ASR-2026-695-invoice.pdf',
      receipt_url: '/receipts/ASR-2026-695-receipt.pdf',
      transactions: [
        {
          id: 'tx_init_hiii',
          amount: 5000,
          method: 'NEFT / Net Banking',
          transaction_ref: 'ABC',
          timestamp: new Date().toISOString()
        }
      ]
    }
  ],
  notifications: [
    {
      id: 1,
      recipient_email: 'kancharlahemanth89@gmail.com',
      paper_id: 'ASR-2024-ENG-084',
      title: 'Peer Review Round 1 Underway',
      message: 'Your manuscript "Adaptive MPPT for Hybrid Solar-Wind Microgrid Systems" is assigned to 3 expert reviewers in Elsevier ECM.',
      category: 'review',
      is_read: false,
      created_at: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
      id: 2,
      recipient_email: 'kancharlahemanth89@gmail.com',
      paper_id: 'ASR-2023-CS-119',
      title: 'Formal Acceptance Proof Available',
      message: 'Official publication acceptance letter for "Optimized Graph Neural Networks" has been uploaded to your Document Download Centre.',
      category: 'acceptance',
      is_read: false,
      created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 3,
      recipient_email: 'chinnakancharla1@gmail.com',
      paper_id: 'ASR-2026-695',
      title: 'Manuscript Successfully Registered',
      message: 'Your manuscript "HIII" has been registered with Tracking ID: ASR-2026-695. Invoice generated: Total ₹50,000, Paid ₹5,000.',
      category: 'system',
      is_read: false,
      created_at: new Date().toISOString()
    }
  ],
  auditLogs: [
    {
      id: 1,
      author_email: 'admin@asracademicresearch.com',
      action: 'SYSTEM_BOOT',
      details: 'Admin user and editorial coordinators initialized successfully.',
      created_at: new Date().toISOString()
    }
  ]
};

// Load or initialize store with disk persistence
let store = defaultStore;
try {
  if (fs.existsSync(DB_FILE)) {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    store = JSON.parse(raw);
    console.log(`📦 Loaded existing persistence store with ${store.papers.length} papers, ${store.authors.length} authors, and ${store.payments.length} payments.`);
  } else {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultStore, null, 2), 'utf8');
  }
} catch (e) {
  console.warn('⚠️ Error loading persistence store, fallback to default:', e.message);
  store = defaultStore;
}

// Auto-save helper
function persistStore() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(store, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to persist store:', err);
  }
}

// Periodically sync to disk every 2 seconds
setInterval(persistStore, 2000);

// Initialize connection to Neon DB if available
function initDB() {
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('placeholder')) {
    try {
      pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      });
      isConnected = true;
      console.log('✅ Connected to Neon PostgreSQL database.');
    } catch (err) {
      console.warn('⚠️ Neon DB connection failed, using high-performance persistent store:', err.message);
      pool = null;
      isConnected = false;
    }
  } else {
    console.log('ℹ️ Running with persistent store (Configure DATABASE_URL in backend/.env for live Neon DB)');
  }
}

initDB();

const db = {
  isNeonConnected: () => isConnected,
  getPool: () => pool,
  store,
  persist: persistStore,

  async query(text, params) {
    if (isConnected && pool) {
      return await pool.query(text, params);
    }
    return null;
  }
};

module.exports = db;