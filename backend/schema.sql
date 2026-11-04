-- ASR Author Paper Tracking Portal Schema for Neon PostgreSQL

-- 1. Authors & Users Table
CREATE TABLE IF NOT EXISTS authors (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'author', -- 'author' or 'staff'/'admin'
  phone VARCHAR(50),
  institution VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP WITH TIME ZONE
);

-- 2. OTP Sessions Table (For passwordless 2FA login)
CREATE TABLE IF NOT EXISTS otp_sessions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  otp_code VARCHAR(10) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  attempts INT DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Manuscripts / Papers Table
CREATE TABLE IF NOT EXISTS papers (
  id VARCHAR(50) PRIMARY KEY, -- e.g. 'ASR-2024-ENG-084'
  title TEXT NOT NULL,
  primary_author_email VARCHAR(255) NOT NULL REFERENCES authors(email) ON DELETE CASCADE,
  target_journal VARCHAR(255) NOT NULL,
  indexing_tier VARCHAR(255) NOT NULL,
  status VARCHAR(100) NOT NULL, -- e.g. 'Under Review', 'Accepted (In Press)', 'Revision Requested'
  stage_number INT DEFAULT 5, -- 1 to 10 matching the 10-step workflow
  submission_date DATE NOT NULL,
  expected_decision_date DATE,
  assigned_department VARCHAR(100) DEFAULT 'Publication & Review Cell',
  assigned_coordinator VARCHAR(100) DEFAULT 'Dr. Rajesh K. (Publication Lead)',
  coordinator_phone VARCHAR(50) DEFAULT '+91 9515207724',
  author_positions TEXT NOT NULL,
  co_authors TEXT,
  abstract_text TEXT,
  next_step_action TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Author Paper Mapping (Ensures Multi-Author & strict data isolation)
CREATE TABLE IF NOT EXISTS author_paper_mapping (
  id SERIAL PRIMARY KEY,
  author_email VARCHAR(255) NOT NULL REFERENCES authors(email) ON DELETE CASCADE,
  paper_id VARCHAR(50) NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
  role_in_paper VARCHAR(50) DEFAULT 'Co-Author',
  added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(author_email, paper_id)
);

-- 5. Paper Status History / Timeline
CREATE TABLE IF NOT EXISTS paper_status_history (
  id SERIAL PRIMARY KEY,
  paper_id VARCHAR(50) NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
  status_title VARCHAR(100) NOT NULL,
  stage_number INT NOT NULL,
  remarks TEXT,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed BOOLEAN DEFAULT TRUE
);

-- 6. Submission Proofs & Documents Table
CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  paper_id VARCHAR(50) NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
  document_name VARCHAR(255) NOT NULL,
  document_category VARCHAR(100) NOT NULL, -- 'Proof', 'Manuscript', 'Report', 'Acceptance', 'Invoice'
  file_url TEXT NOT NULL,
  file_size VARCHAR(50),
  mime_type VARCHAR(100) DEFAULT 'application/pdf',
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_verified BOOLEAN DEFAULT TRUE
);

-- 7. Payment & Invoice Records Table
CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  paper_id VARCHAR(50) NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
  author_email VARCHAR(255) NOT NULL REFERENCES authors(email) ON DELETE CASCADE,
  invoice_number VARCHAR(100) UNIQUE NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  amount_paid NUMERIC(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'INR',
  payment_status VARCHAR(50) NOT NULL, -- 'Paid', 'Pending', 'Partial'
  payment_method VARCHAR(100),
  transaction_ref VARCHAR(100),
  invoice_url TEXT,
  receipt_url TEXT,
  due_date DATE,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Notifications & Alerts Table
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  recipient_email VARCHAR(255) NOT NULL REFERENCES authors(email) ON DELETE CASCADE,
  paper_id VARCHAR(50) REFERENCES papers(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'review', 'acceptance', 'payment', 'system', 'revision'
  is_read BOOLEAN DEFAULT FALSE,
  email_dispatched BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Audit Logs Table (For security & compliance)
CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  author_email VARCHAR(255) NOT NULL,
  action VARCHAR(100) NOT NULL,
  details TEXT,
  ip_address VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

