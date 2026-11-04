import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileCheck,
  CheckCircle,
  ShieldCheck,
  MessageSquare,
  Search,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  BookmarkCheck,
  Scale
} from 'lucide-react';
import ContactBlock from '../components/ContactBlock';
import './CommunityPages.css';

const JoinAsReviewer = () => {
  const responsibilities = [
    {
      title: "Manuscript Review",
      desc: "Evaluate research papers, articles, book chapters, and academic submissions based on originality, structure, methodology, clarity, and relevance.",
      icon: <FileCheck size={22} />
    },
    {
      title: "Quality Assessment",
      desc: "Check whether the submission follows academic standards, proper research flow, citation quality, and subject relevance.",
      icon: <CheckCircle size={22} />
    },
    {
      title: "Constructive Feedback",
      desc: "Provide clear, respectful, and improvement-focused comments to help authors strengthen their work.",
      icon: <MessageSquare size={22} />
    },
    {
      title: "Methodology Review",
      desc: "Assess research objectives, design, data collection approach, analysis, findings, and conclusion alignment.",
      icon: <Search size={22} />
    },
    {
      title: "Reference & Citation Review",
      desc: "Check whether references are relevant, updated, properly cited, and aligned with the manuscript content.",
      icon: <BookmarkCheck size={22} />
    },
    {
      title: "Ethical Review Awareness",
      desc: "Identify possible concerns related to plagiarism, duplicate submission, citation misuse, data inconsistency, or ethical gaps.",
      icon: <ShieldCheck size={22} />
    },
    {
      title: "Conference Paper Review",
      desc: "Support academic events by reviewing abstracts, full papers, presentation submissions, and conference proceedings.",
      icon: <Users size={22} />
    },
    {
      title: "Book Chapter Review",
      desc: "Evaluate academic book chapters for content quality, scholarly contribution, structure, and publication readiness.",
      icon: <BookOpen size={22} />
    }
  ];

  const whoCanJoin = [
    "Assistant Professors, Associate Professors, Professors",
    "Ph.D. Holders",
    "Research Scholars with Strong Publication Background",
    "Postdoctoral Researchers",
    "Industry Experts",
    "Subject Matter Experts",
    "Journal Editorial Members",
    "Conference Review Committee Members",
    "Academic Mentors",
    "Technical Experts",
    "Healthcare, Management, Engineering, Science, Humanities & Social Science Professionals"
  ];

  const keyBenefits = [
    "Academic recognition and professional contribution",
    "Opportunity to support quality research",
    "Reviewer certificate or acknowledgement where applicable",
    "Networking with scholars and academic professionals",
    "Experience in scholarly evaluation and peer review",
    "Contribution to conferences, journals, books, and research projects",
    "Enhanced academic profile and research engagement",
    "Opportunity to join academic panels and review committees"
  ];

  const preferredQualities = [
    "Strong subject knowledge",
    "Research and publication experience",
    "Ethical review approach",
    "Attention to academic detail",
    "Clear and constructive communication",
    "Timely review completion",
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
            <Sparkles size={14} />
            <span>GLOBAL PEER REVIEW COUNCIL</span>
          </div>
          <h1 className="comm-hero-heading">
            Join as <span className="hero-text-accent">Reviewer</span>
          </h1>
          <p className="comm-hero-sub">
            Contribute to quality assurance | Elevate your research profile | Network with leading indexed journals across 50+ countries.
          </p>

          <div className="comm-hero-metrics">
            <div className="comm-metric-item">
              <span className="metric-val">1,200+</span>
              <span className="metric-lbl">Active Reviewers</span>
            </div>
            <div className="comm-metric-divider"></div>
            <div className="comm-metric-item">
              <span className="metric-val">50+</span>
              <span className="metric-lbl">Countries Connected</span>
            </div>
            <div className="comm-metric-divider"></div>
            <div className="comm-metric-item">
              <span className="metric-val">100%</span>
              <span className="metric-lbl">Double-Blind Ethics</span>
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
            <h2>Contribute to Academic Quality, Research Integrity & Scholarly Peer Review</h2>
            <p>
              A strong peer review system plays an important role in improving research quality, maintaining publication standards, and supporting authors in strengthening their academic work. ASR Academic Research Solutions welcomes experienced reviewers who can evaluate research manuscripts, book chapters, conference papers, academic projects, and scholarly content across various disciplines.
            </p>
            <p>
              As a reviewer, you can contribute your subject expertise, support academic development, provide constructive feedback, and become part of a growing research-focused professional network.
            </p>
          </div>
        </div>
      </section>

      {/* Reviewer Responsibilities Grid */}
      <section className="comm-features-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pretitle">CORE ROLE</span>
            <h2 className="section-title">Reviewer Responsibilities</h2>
            <p className="section-desc">Key tasks undertaken by our recognized peer-review council.</p>
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

      {/* 3 Pillars: Who Can Join, Key Benefits, Preferred Qualities */}
      <section className="comm-pillars-section">
        <div className="section-container">
          {/* Callout */}
          <div className="comm-callout-banner">
            <h4>Why Choose the ASR Review Panel?</h4>
            <p>
              <strong>Transparent evaluation process:</strong> Constructive reviewer guidelines, collaborative academic environment, and multidisciplinary engagement across 35+ research domains.
            </p>
            <p>
              <strong>Recognition & visibility:</strong> Featured reviewer acknowledgment in relevant proceedings/journals (subject to policy), and opportunities to lead special issue reviews.
            </p>
            <p>
              <strong>Flexible commitment:</strong> Review invitations based on your availability and expertise. You control the volume of assignments.
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

export default JoinAsReviewer;

