import React from 'react';
import PortalLayout from '../portal/PortalLayout';
import {
  ShieldCheck,
  Lock,
  UserCheck,
  KeyRound,
  FileCheck2,
  Server,
  AlertOctagon,
  EyeOff,
  CheckCircle,
  FileText
} from 'lucide-react';
import '../portal/PortalPages.css';

const PrivacySecurityPage = () => {
  const securityPillars = [
    {
      icon: EyeOff,
      title: "Isolated Author Scope",
      desc: "One author sees only their own papers. Server-side access control strictly guarantees zero cross-author data visibility under any circumstance."
    },
    {
      icon: Lock,
      title: "Protected Document Downloads",
      desc: "No public links or predictable file URLs. All PDF proofs & receipts are served through short-lived cryptographic authorization tokens."
    },
    {
      icon: Server,
      title: "Encrypted Database Storage",
      desc: "Author emails, paper manuscripts, reviewer evaluations, and payment logs are encrypted at rest with AES-256 and transmitted via TLS 1.3."
    },
    {
      icon: KeyRound,
      title: "OTP with Expiry & Attempt Limits",
      desc: "Authentication strictly enforces 2-factor OTP with 45s resend limits, 10-minute expiry, and progressive lockout against brute force attempts."
    },
    {
      icon: FileCheck2,
      title: "Immutable Audit Logs",
      desc: "Every login event, paper view, document download, and coordinator change is captured with timestamp, IP, and session fingerprint."
    },
    {
      icon: AlertOctagon,
      title: "URL Manipulation Prevention",
      desc: "Manual URL tampering (e.g. changing Paper ID query parameters) is validated server-side, immediately denying unauthorized access attempts."
    }
  ];

  const auditEvents = [
    { event: "Author 2FA Session Authenticated", ip: "103.151.22.84", time: "Just now", status: "Success" },
    { event: "Submission Proof (PDF) Token Issued", ip: "103.151.22.84", time: "10 mins ago", status: "Authorized" },
    { event: "Paper Status Check: ASR-2024-ENG-084", ip: "103.151.22.84", time: "18 mins ago", status: "Authorized" },
    { event: "OTP Dispatched to Author Email", ip: "103.151.22.84", time: "25 mins ago", status: "Delivered" }
  ];

  return (
    <PortalLayout
      activeNav="security"
      title="Author Data Privacy & Security"
      subtitle="Enterprise-grade safeguards ensuring complete manuscript confidentiality, encrypted downloads, and isolated author access."
    >
      <div className="portal-subpage-container">

        {/* Master Security Guarantee Banner */}
        <div className="security-hero-banner">
          <div className="security-badge-icon">
            <ShieldCheck size={36} />
          </div>
          <div className="security-hero-text">
            <h2>Non-Disclosure &amp; Complete Research Confidentiality</h2>
            <p>
              At ASR Academic Research Solutions, intellectual property protection is paramount. Your unpublished findings, dataset methodologies, and peer remarks remain strictly confidential.
            </p>
          </div>
        </div>

        {/* 6 Security Protocols (From Diagram Module 7) */}
        <div className="portal-content-card">
          <div className="card-top-header">
            <div>
              <span className="meta-category-badge">MODULE 7 • SECURITY ARCHITECTURE</span>
              <h3>6 Core Data Privacy &amp; Access Controls</h3>
            </div>
            <span className="badge-iso-audit">ISO 9001:2015 Compliant</span>
          </div>

          <div className="security-pillars-grid">
            {securityPillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="sec-pillar-card">
                  <div className="sec-icon-wrap">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Session Audit Log Preview */}
        <div className="portal-content-card" style={{ marginTop: '24px' }}>
          <div className="card-top-header">
            <div>
              <span className="meta-category-badge">ACTIVITY TRACKING</span>
              <h3>Current Session Access &amp; Security Audit Log</h3>
            </div>
          </div>

          <div className="audit-table-wrapper">
            <table className="portal-custom-table">
              <thead>
                <tr>
                  <th>Event Description</th>
                  <th>IP Address</th>
                  <th>Timestamp</th>
                  <th style={{ textAlign: 'right' }}>Security Status</th>
                </tr>
              </thead>
              <tbody>
                {auditEvents.map((ev, i) => (
                  <tr key={i}>
                    <td>
                      <div className="event-title-cell">
                        <Lock size={14} className="text-accent" />
                        <span>{ev.event}</span>
                      </div>
                    </td>
                    <td><span className="ip-cell">{ev.ip}</span></td>
                    <td>{ev.time}</td>
                    <td style={{ textAlign: 'right' }}>
                      <span className="status-authorized-pill">
                        <CheckCircle size={12} /> {ev.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </PortalLayout>
  );
};

export default PrivacySecurityPage;

