import React from 'react';
import { Link } from 'react-router-dom';
import communityCollabImg from '../assets/community-feature.jpg';
import {
  Handshake,
  CheckCircle,
  GraduationCap,
  BookMarked,
  Users,
  Briefcase,
  Lightbulb,
  Award,
  BookOpen,
  ShieldCheck,
  Building2,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import ContactBlock from '../components/ContactBlock';
import './CommunityPages.css';

const CollaborateWithUs = () => {
  const opportunities = [
    {
      title: "Institutional Research Support",
      desc: "Collaborate with ASR for research methodology support, academic writing assistance, publication guidance, thesis support, and research documentation.",
      icon: <GraduationCap size={22} />
    },
    {
      title: "Faculty Development Programs",
      desc: "Partner with us to conduct FDPs, workshops, seminars, academic writing sessions, research training, publication ethics programs, and skill enhancement activities.",
      icon: <Award size={22} />
    },
    {
      title: "Journal & Publication Collaboration",
      desc: "Work with ASR for journal management, OJS support, editorial workflow, manuscript review coordination, conference proceedings, edited books, and academic publishing assistance.",
      icon: <BookMarked size={22} />
    },
    {
      title: "Conference & Seminar Partnership",
      desc: "Collaborate for academic conferences, seminars, symposiums, workshops, paper submission management, proceedings support, and post-event documentation.",
      icon: <Users size={22} />
    },
    {
      title: "Student Training & Internship Programs",
      desc: "Partner with us to provide internship training, project support, research skill development, academic writing practice, and professional skill-building programs for students.",
      icon: <Briefcase size={22} />
    },
    {
      title: "Industry-Academic Collaboration",
      desc: "Build structured collaboration models for applied research, consultancy projects, innovation activities, internship programs, technology transfer, and research commercialization.",
      icon: <Building2 size={22} />
    },
    {
      title: "Startup & Innovation Support",
      desc: "Collaborate for incubation guidance, idea validation, pitch deck preparation, business model development, grant readiness, and startup mentoring programs.",
      icon: <Lightbulb size={22} />
    },
    {
      title: "Accreditation & Ranking Support",
      desc: "Partner with ASR for NAAC, NBA, NIRF, IQAC, SSR, AQAR, DVV, OBE documentation, institutional quality files, and ranking preparation support.",
      icon: <CheckCircle size={22} />
    },
    {
      title: "Book & Chapter Publishing Collaboration",
      desc: "Work with us for edited volumes, book chapters, academic books, ISBN-based publications, editorial review, formatting, and publication readiness.",
      icon: <BookOpen size={22} />
    },
    {
      title: "Patent & IP Facilitation",
      desc: "Collaborate for patent drafting support, prior art search guidance, IP documentation, design registration assistance, copyright support, and innovation protection.",
      icon: <ShieldCheck size={22} />
    }
  ];

  const whoCanCollaborate = [
    "Universities & Colleges",
    "Research Institutions",
    "Academic Departments",
    "IQAC Cells & Innovation Cells",
    "Incubation Centres",
    "Journals & Publishers",
    "Conference Committees",
    "Faculty Development Cells",
    "Professional Associations",
    "Startups & Entrepreneurs",
    "Industry Partners & CSR Teams",
    "Training Organizations & Academic Consultants",
    "Research Groups & Student Communities"
  ];

  const keyBenefits = [
    "Access to structured academic support",
    "Research and publication-focused guidance",
    "Professional event and training assistance",
    "Stronger faculty and student development",
    "Improved institutional documentation",
    "Support for journals, conferences, and books",
    "Better innovation and startup readiness",
    "Academic-industry connection opportunities",
    "Customized collaboration models",
    "Long-term knowledge partnership",
    "Professional communication and documentation support"
  ];

  const preferredQualities = [
    "Clear institutional vision",
    "Commitment to research culture",
    "Ethical and transparent approach",
    "Attention to quality and detail",
    "Open and proactive communication",
    "Timely decision-making and feedback",
    "Focus on measurable outcomes",
    "Mutual respect and professionalism"
  ];

  return (
    <div className="community-subpage">
      {/* Hero */}
      <section className="comm-hero-showcase">
        <div className="comm-hero-glow"></div>
        <div className="comm-hero-inner">
          <div className="comm-hero-badge">
            <Handshake size={14} />
            <span>INSTITUTIONAL & INDUSTRY ALLIANCES</span>
          </div>
          <h1 className="comm-hero-heading">
            Collaborate <span className="hero-text-accent">With Us</span>
          </h1>
          <p className="comm-hero-sub">
            Partner with ASR Academic Research Solutions — empowering universities, research institutions, startups, and professional societies across 50+ countries.
          </p>

          <div style={{ maxWidth: '680px', margin: '28px auto 36px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 45px -10px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.18)' }}>
            <img src={communityCollabImg} alt="Global academic and researcher collaboration" style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }} />
          </div>

          <div className="comm-hero-metrics">
            <div className="comm-metric-item">
              <span className="metric-val">150+</span>
              <span className="metric-lbl">MoUs & Partners</span>
            </div>
            <div className="comm-metric-divider"></div>
            <div className="comm-metric-item">
              <span className="metric-val">100+</span>
              <span className="metric-lbl">Academic FDPs</span>
            </div>
            <div className="comm-metric-divider"></div>
            <div className="comm-metric-item">
              <span className="metric-val">100%</span>
              <span className="metric-lbl">Result Oriented</span>
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
            <h2>Partner with ASR Academic Research Solutions for Research, Publications, Training & Academic Growth</h2>
            <p>
              Meaningful collaboration strengthens research culture, improves academic outcomes, creates publication opportunities, supports innovation, and connects institutions with practical knowledge resources. ASR Academic Research Solutions works with academic and professional partners to deliver research-focused services, capacity-building programs, publication support, institutional development assistance, and knowledge-based initiatives.
            </p>
            <p>
              Our collaboration approach is designed to create long-term value for institutions, faculty members, scholars, students, researchers, and professional communities.
            </p>
          </div>
        </div>
      </section>

      {/* Collaboration Opportunities */}
      <section className="comm-features-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pretitle">AREAS OF ENGAGEMENT</span>
            <h2 className="section-title">Collaboration Opportunities</h2>
            <p className="section-desc">Diverse avenues for institutional development, student training, and publication success.</p>
          </div>

          <div className="comm-features-grid">
            {opportunities.map((item, idx) => (
              <div className="comm-feature-card" key={idx}>
                <div className="comm-icon-box">
                  {item.icon}
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
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
            <h4>Why Collaborate with ASR?</h4>
            <p>
              <strong>Transparent partnership processes:</strong> Dedicated support teams, flexible engagement models, and multidisciplinary expertise across 35+ research domains.
            </p>
            <p>
              <strong>Value-driven partnership:</strong> Meaningful outcomes for institutions, researchers, and students through structured programs, high-quality documentation, and professional delivery.
            </p>
            <p>
              <strong>Flexible collaboration models:</strong> Short-term projects, long-term partnerships, MoU-based engagements, and custom-designed initiatives to match your institutional goals.
            </p>
          </div>

          <div className="comm-pillars-grid">
            <div className="comm-pillar-card">
              <h3>Who Can Collaborate?</h3>
              <ul className="comm-list-items">
                {whoCanCollaborate.map((item, idx) => (
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
      <ContactBlock defaultService="ASR Industry-Academic Collaboration" />
    </div>
  );
};

export default CollaborateWithUs;

