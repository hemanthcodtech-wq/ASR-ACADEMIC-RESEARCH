import React from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  CheckCircle,
  ShieldCheck,
  FileCheck,
  BookOpen,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  BookmarkCheck,
  Building2
} from 'lucide-react';
import ContactBlock from '../components/ContactBlock';
import './CommunityPages.css';

const JoinEditorialBoard = () => {
  const responsibilities = [
    {
      title: "Manuscript Evaluation Guidance",
      desc: "Support the review and assessment of research papers, articles, book chapters, conference papers, and academic submissions.",
      icon: <FileCheck size={22} />
    },
    {
      title: "Peer Review Coordination Support",
      desc: "Assist in maintaining a structured, fair, timely, and ethical peer review process.",
      icon: <Users size={22} />
    },
    {
      title: "Editorial Decision Assistance",
      desc: "Provide expert opinions on manuscript suitability, academic quality, originality, relevance, and publication readiness.",
      icon: <Award size={22} />
    },
    {
      title: "Subject Area Expertise",
      desc: "Contribute discipline-specific knowledge for evaluating research quality, methodology, findings, and scholarly contribution.",
      icon: <Compass size={22} />
    },
    {
      title: "Publication Ethics Support",
      desc: "Help maintain ethical publishing practices related to plagiarism awareness, citation integrity, duplicate submission, author transparency, and academic honesty.",
      icon: <ShieldCheck size={22} />
    },
    {
      title: "Journal & Publication Development",
      desc: "Support the improvement of journal scope, editorial policies, author guidelines, reviewer guidelines, and publication standards.",
      icon: <BookOpen size={22} />
    },
    {
      title: "Conference & Book Editorial Support",
      desc: "Assist in editorial review for conference proceedings, edited volumes, academic books, and research-based publications.",
      icon: <BookmarkCheck size={22} />
    },
    {
      title: "Academic Advisory Role",
      desc: "Provide strategic guidance for research quality improvement, publication planning, indexing readiness, and scholarly visibility.",
      icon: <Building2 size={22} />
    }
  ];

  const whoCanJoin = [
    "Professors",
    "Associate Professors",
    "Assistant Professors",
    "Ph.D. Holders",
    "Postdoctoral Researchers",
    "Senior Research Scholars",
    "Journal Editors",
    "Review Committee Members",
    "Subject Matter Experts",
    "Industry Experts with Research Background",
    "Academic Administrators",
    "Research Supervisors",
    "Conference Committee Members",
    "Book Editors",
    "Experts from Engineering, Management, Science, Humanities, Commerce, Healthcare, Education, Law & Social Sciences"
  ];

  const keyBenefits = [
    "Academic recognition and professional contribution",
    "Opportunity to shape research quality and publication standards",
    "Editorial board membership certificate or acknowledgment",
    "Networking with leading scholars and researchers",
    "Experience in editorial decision-making and peer review",
    "Contribution to journals, books, conferences, and academic projects",
    "Enhanced academic profile and research visibility",
    "Opportunity to guide early-career researchers and authors"
  ];

  const preferredQualities = [
    "Strong subject expertise",
    "Research and publication experience",
    "Ethical editorial approach",
    "Attention to academic detail",
    "Clear and constructive communication",
    "Timely editorial responses",
    "Understanding of research methodology",
    "Commitment to academic integrity"
  ];

  return (
    <div className="community-subpage">
      {/* Hero */}
      <section className="comm-hero-showcase">
        <div className="comm-hero-glow"></div>
        <div className="comm-hero-inner">
          <div className="comm-hero-badge">
            <Award size={14} />
            <span>EDITORIAL EXCELLENCE & LEADERSHIP</span>
          </div>
          <h1 className="comm-hero-heading">
            Join <span className="hero-text-accent">Editorial Board</span>
          </h1>
          <p className="comm-hero-sub">
            ASR Academic Research Solutions invites experienced professors, senior scientists, and industry leaders to shape global publication ethics and peer review governance.
          </p>

          <div className="comm-hero-metrics">
            <div className="comm-metric-item">
              <span className="metric-val">350+</span>
              <span className="metric-lbl">Board Members</span>
            </div>
            <div className="comm-metric-divider"></div>
            <div className="comm-metric-item">
              <span className="metric-val">40+</span>
              <span className="metric-lbl">Partner Journals</span>
            </div>
            <div className="comm-metric-divider"></div>
            <div className="comm-metric-item">
              <span className="metric-val">100%</span>
              <span className="metric-lbl">COPE Ethics Compliant</span>
            </div>
            <div className="comm-metric-divider"></div>
            <div className="comm-metric-item">
              <span className="metric-val">ISO 9001</span>
              <span className="metric-lbl">Certified Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="comm-overview-section">
        <div className="section-container">
          <div className="comm-overview-card">
            <div className="comm-card-accent-line"></div>
            <h2>Become Part of a Research-Driven Academic Editorial Network</h2>
            <p>
              An editorial board plays a vital role in maintaining the quality, credibility, and academic value of journals, books, conference proceedings, research publications, and scholarly content. ASR Academic Research Solutions welcomes qualified editorial members who can guide publication standards, support manuscript evaluation, strengthen peer review processes, and contribute to ethical academic publishing.
            </p>
            <p>
              As an editorial board member, you can share your expertise, support researchers, contribute to knowledge development, and become part of a professional academic ecosystem focused on research quality, publication ethics, and scholarly impact.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Responsibilities */}
      <section className="comm-features-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pretitle">BOARD GOVERNANCE</span>
            <h2 className="section-title">Editorial Board Responsibilities</h2>
            <p className="section-desc">Pillars of academic quality assurance and peer review stewardship.</p>
          </div>

          <div className="comm-features-grid">
            {responsibilities.map((r, i) => (
              <div className="comm-feature-card" key={i}>
                <div className="comm-icon-box">
                  {r.icon}
                </div>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="comm-pillars-section">
        <div className="section-container">
          {/* Callout */}
          <div className="comm-callout-banner">
            <h4>Why Choose the ASR Editorial Board?</h4>
            <p>
              <strong>Transparent editorial policies:</strong> Collaborative academic environment, multidisciplinary engagement across 35+ research domains, and a strong commitment to publication ethics.
            </p>
            <p>
              <strong>Recognition & visibility:</strong> Editorial board members are acknowledged in publications (subject to policy), with opportunities to lead special issues and editorial initiatives.
            </p>
            <p>
              <strong>Flexible engagement:</strong> Participate in editorial activities based on your availability and expertise. You control your level of involvement.
            </p>
          </div>

          <div className="comm-pillars-grid">
            <div className="comm-pillar-card">
              <h3>Who Can Join?</h3>
              <ul className="comm-list-items">
                {whoCanJoin.map((item, idx) => (
                  <li key={idx}>
                    <CheckCircle size={16} className="comm-check-bullet" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="comm-pillar-card">
              <h3>Key Benefits</h3>
              <ul className="comm-list-items">
                {keyBenefits.map((item, idx) => (
                  <li key={idx}>
                    <CheckCircle size={16} className="comm-check-bullet" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="comm-pillar-card">
              <h3>Preferred Qualities</h3>
              <ul className="comm-list-items">
                {preferredQualities.map((item, idx) => (
                  <li key={idx}>
                    <CheckCircle size={16} className="comm-check-bullet" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Block */}
      <ContactBlock defaultService="Other" />
    </div>
  );
};

export default JoinEditorialBoard;

