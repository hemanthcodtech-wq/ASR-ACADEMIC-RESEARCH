const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data_store.json'), 'utf8'));

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    console.log('🔄 Starting migration from data_store.json to Neon PostgreSQL...');

    // 1. Authors
    if (data.authors && data.authors.length) {
      for (const a of data.authors) {
        await client.query(`
          INSERT INTO authors (id, email, username, password, full_name, role, phone, institution, created_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          ON CONFLICT (email) DO UPDATE SET
            username = EXCLUDED.username,
            password = EXCLUDED.password,
            full_name = EXCLUDED.full_name,
            role = EXCLUDED.role,
            phone = EXCLUDED.phone,
            institution = EXCLUDED.institution
        `, [
          a.id,
          a.email.toLowerCase(),
          a.username || a.email.split('@')[0],
          a.password || 'AuthorPassword123!',
          a.full_name || a.name || 'Author',
          a.role || 'author',
          a.phone || '+91 9515207724',
          a.institution || 'Department of Research',
          a.created_at || new Date().toISOString()
        ]);
      }
      console.log(`✅ Migrated ${data.authors.length} authors.`);
    }

    // 2. Coordinators
    if (data.coordinators && data.coordinators.length) {
      for (const c of data.coordinators) {
        await client.query(`
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
          String(c.id),
          c.name,
          c.title || 'Publication Lead',
          c.department || 'General',
          c.email,
          c.phone || '+91 9515207724',
          c.active_papers_count || 0
        ]);
      }
      console.log(`✅ Migrated ${data.coordinators.length} coordinators.`);
    }

    // 3. Papers
    if (data.papers && data.papers.length) {
      for (const p of data.papers) {
        // Ensure author exists first
        await client.query(`
          INSERT INTO authors (email, full_name, role)
          VALUES ($1, $2, 'author')
          ON CONFLICT (email) DO NOTHING
        `, [p.primary_author_email.toLowerCase(), p.primary_author_name || 'Primary Author']);

        await client.query(`
          INSERT INTO papers (
            id, title, primary_author_email, target_journal, indexing_tier, status, stage_number,
            stage_title, submission_date, expected_decision_date, assigned_department, assigned_coordinator,
            coordinator_phone, author_positions, co_authors, abstract_text, next_step_action,
            total_amount, paid_amount, services, created_at, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            status = EXCLUDED.status,
            stage_number = EXCLUDED.stage_number,
            stage_title = EXCLUDED.stage_title,
            total_amount = EXCLUDED.total_amount,
            paid_amount = EXCLUDED.paid_amount,
            services = EXCLUDED.services,
            updated_at = NOW()
        `, [
          p.id,
          p.title,
          p.primary_author_email.toLowerCase(),
          p.target_journal || 'ASR Academic Journal',
          p.indexing_tier || 'SCOPUS / SCI',
          p.status || 'Under Review',
          p.stage_number || 1,
          p.stage_title || p.status,
          p.submission_date || new Date().toISOString().split('T')[0],
          p.expected_decision_date || null,
          p.assigned_department || 'Publication & Review Cell',
          p.assigned_coordinator || 'Dr. Rajesh K. (Publication Lead)',
          p.coordinator_phone || '+91 9515207724',
          p.author_positions || 'First & Corresponding Author',
          p.co_authors || '',
          p.abstract_text || '',
          p.next_step_action || '',
          p.total_amount || 0,
          p.paid_amount || 0,
          p.services ? JSON.stringify(p.services) : '[]',
          p.created_at || new Date().toISOString(),
          p.updated_at || new Date().toISOString()
        ]);
      }
      console.log(`✅ Migrated ${data.papers.length} papers.`);
    }

    // 4. Author Paper Mapping
    if (data.authorPaperMapping && data.authorPaperMapping.length) {
      for (const m of data.authorPaperMapping) {
        await client.query(`
          INSERT INTO author_paper_mapping (author_email, paper_id, role_in_paper)
          VALUES ($1, $2, $3)
          ON CONFLICT (author_email, paper_id) DO NOTHING
        `, [m.author_email.toLowerCase(), m.paper_id, m.role || 'Co-Author']);
      }
      console.log(`✅ Migrated ${data.authorPaperMapping.length} mappings.`);
    }

    // 5. Paper Status History
    if (data.paperStatusHistory && data.paperStatusHistory.length) {
      for (const h of data.paperStatusHistory) {
        await client.query(`
          INSERT INTO paper_status_history (paper_id, status_title, stage_number, remarks, recorded_at, completed)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [
          h.paper_id,
          h.status_title || h.title || 'Status update',
          h.stage_number || 1,
          h.remarks || '',
          h.recorded_at || new Date().toISOString(),
          h.completed !== undefined ? h.completed : true
        ]);
      }
      console.log(`✅ Migrated ${data.paperStatusHistory.length} status history records.`);
    }

    // 6. Documents
    if (data.documents && data.documents.length) {
      for (const d of data.documents) {
        await client.query(`
          INSERT INTO documents (paper_id, document_name, document_category, file_url, file_size, is_cloudinary, uploaded_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [
          d.paper_id,
          d.document_name,
          d.document_category || 'Proof',
          d.file_url,
          d.file_size || '1.0 MB',
          Boolean(d.is_cloudinary),
          d.uploaded_at ? new Date(d.uploaded_at) : new Date()
        ]);
      }
      console.log(`✅ Migrated ${data.documents.length} documents.`);
    }

    // 7. Payments & Transactions
    if (data.payments && data.payments.length) {
      for (const pm of data.payments) {
        const res = await client.query(`
          INSERT INTO payments (
            paper_id, author_email, invoice_number, total_amount, amount_paid, currency,
            payment_status, payment_method, transaction_ref, invoice_url, receipt_url,
            due_date, paid_at, services, transactions
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          ON CONFLICT (invoice_number) DO UPDATE SET
            total_amount = EXCLUDED.total_amount,
            amount_paid = EXCLUDED.amount_paid,
            payment_status = EXCLUDED.payment_status,
            transactions = EXCLUDED.transactions
          RETURNING id
        `, [
          pm.paper_id,
          pm.author_email.toLowerCase(),
          pm.invoice_number || `INV-${pm.id || Date.now()}`,
          pm.total_amount || 0,
          pm.amount_paid || 0,
          pm.currency || 'INR',
          pm.payment_status || 'Pending',
          pm.payment_method || 'Bank Transfer',
          pm.transaction_ref || '',
          pm.invoice_url || '',
          pm.receipt_url || '',
          pm.due_date || null,
          pm.paid_at || null,
          pm.services ? JSON.stringify(pm.services) : '[]',
          pm.transactions ? JSON.stringify(pm.transactions) : '[]'
        ]);

        const paymentId = res.rows[0].id;
        if (pm.transactions && Array.isArray(pm.transactions)) {
          for (const tx of pm.transactions) {
            await client.query(`
              INSERT INTO payment_transactions (payment_id, amount, method, transaction_ref, timestamp)
              VALUES ($1, $2, $3, $4, $5)
            `, [
              paymentId,
              tx.amount || 0,
              tx.method || 'Bank Transfer',
              tx.transaction_ref || tx.reference || '',
              tx.timestamp ? new Date(tx.timestamp) : new Date()
            ]);
          }
        }
      }
      console.log(`✅ Migrated ${data.payments.length} payments.`);
    }

    // 8. Notifications
    if (data.notifications && data.notifications.length) {
      for (const n of data.notifications) {
        await client.query(`
          INSERT INTO notifications (recipient_email, paper_id, title, message, category, is_read, email_dispatched, created_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `, [
          n.recipient_email.toLowerCase(),
          n.paper_id || null,
          n.title,
          n.message,
          n.category || 'system',
          Boolean(n.is_read),
          n.email_dispatched !== undefined ? n.email_dispatched : true,
          n.created_at ? new Date(n.created_at) : new Date()
        ]);
      }
      console.log(`✅ Migrated ${data.notifications.length} notifications.`);
    }

    // 9. Audit Logs
    if (data.auditLogs && data.auditLogs.length) {
      for (const log of data.auditLogs) {
        await client.query(`
          INSERT INTO audit_logs (author_email, action, details, created_at)
          VALUES ($1, $2, $3, $4)
        `, [
          log.author_email || 'system',
          log.action || 'EVENT',
          log.details || '',
          log.created_at ? new Date(log.created_at) : new Date()
        ]);
      }
      console.log(`✅ Migrated ${data.auditLogs.length} audit logs.`);
    }

    await client.query('COMMIT');
    console.log('🎉 ALL DATA SUCCESSFULLY MIGRATED TO NEON POSTGRESQL!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
