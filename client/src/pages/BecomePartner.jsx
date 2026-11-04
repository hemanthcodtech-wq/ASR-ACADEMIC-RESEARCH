import React from 'react';
import { Link } from 'react-router-dom';
import {
  Handshake,
  CheckCircle,
  Building2,
  BookMarked,
  Award,
  Users,
  Briefcase,
  Lightbulb,
  GraduationCap,
  Globe,
  MapPin,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import ContactBlock from '../components/ContactBlock';
import './CommunityPages.css';

const BecomePartner = () => {
  const partnerOpportunities = [
    {
      title: "Institutional Partnership",
      desc: "Partner with ASR to provide research support, publication guidance, faculty development, accreditation assistance, and academic documentation services to colleges and universities.",
      icon: <Building2 size={22} />
    },
    {
      title: "Journal & Publication Partnership",
      desc: "Collaborate for journal management, OJS hosting, peer review coordination, manuscript editing, issue publication, indexing readiness, and academic publishing support.",
      icon: <BookMarked size={22} />
    },
    {
      title: "Training & Workshop Partnership",
      desc: "Work with us to conduct FDPs, seminars, workshops, research methodology sessions, academic writing programs, publication ethics training, and skill development programs.",
      icon: <Award size={22} />
    },
    {
      title: "Research Consultant Partnership",
      desc: "Join as a subject expert, academic consultant, research mentor, thesis advisor, publication guide, or project support specialist.",
      icon: <GraduationCap size={22} />
    },
    {
      title: "Conference & Event Partnership",
      desc: "Collaborate for academic conferences, seminars, symposiums, paper submission management, proceedings publication, certificate preparation, and event documentation.",
      icon: <Users size={22} />
    },
    {
      title: "Startup & Innovation Partnership",
      desc: "Partner for incubation support, idea validation, pitch deck preparation, patent facilitation, prototype documentation, and research commercialization guidance.",
      icon: <Lightbulb size={22} />
    },
    {
      title: "Student Development Partnership",
      desc: "Work with ASR to support student internships, project guidance, academic writing training, professional skill development, and career-focused learning programs.",
      icon: <Briefcase size={22} />
    },
    {
      title: "Accreditation & Ranking Partnership",
      desc: "Collaborate for NAAC, NBA, NIRF, IQAC, SSR, AQAR, DVV, OBE documentation, institutional data organization, and quality enhancement support.",
      icon: <CheckCircle size={22} />
    },
    {
      title: "Industry-Academic Partnership",
      desc: "Build collaboration models for applied research, consultancy projects, technology transfer, internship programs, CSR initiatives, and innovation-based academic engagement.",
      icon: <Handshake size={22} />
    },
    {
      title: "Regional Partner / Associate Partner",
      desc: "Represent ASR services in your region and help connect institutions, researchers, faculty members, and students with structured academic support.",
      icon: <MapPin size={22} />
    }
  ];

  const whoCanPartner = [
    "Universities & Colleges",
    "Research Institutions",
    "Academic Consultants",
    "Training Organizations",
    "Journal Publishers",
    "OJS Service Providers",
    "Conference Organizers",
    "Faculty Development Cells",
    "Innovation Cells & Incubation Centres",
    "Industry Experts & Research Mentors",
    "Subject Matter Experts & Academic Service Providers",
    "Startup Consultants & Professional Associations",
    "Education Consultants & Regional Business Partners"
  ];

  const keyBenefits = [
    "Professional association with ASR Academic Research Solutions",
    "Opportunity to expand academic service reach",
    "Access to structured research and publication support models",
    "Collaboration in workshops, conferences, FDPs, and training programs",
    "Support for journals, institutions, scholars, and faculty members",
    "Better visibility in academic and research communities",
    "Opportunity to work on institutional and research-focused projects",
    "Long-term partnership and growth potential",
    "Flexible collaboration models based on expertise",
    "Shared contribution toward academic excellence and innovation"
  ];

  const preferredQualities = [
    "Strong academic or professional background",
    "Interest in research, publication, training, or institutional support",
    "Ethical and transparent working approach",
    "Commitment to quality academic service delivery",
    "Good communication and coordination skills",
    "Ability to support scholars, faculty, or institutions professionally",
    "Interest in long-term collaboration",
    "Understanding of academic standards and documentation needs"
  ];

  return (
    <div className="community-subpage">
      {/* Hero */}
      <section className="comm-hero-showcase">
        <div className="comm-hero-glow"></div>
        <div className="comm-hero-inner">
          <div className="comm-hero-badge">
            <Sparkles size={14} />
            <span>ACADEMIC STRATEGIC ALLIANCES</span>
          </div>
          <h1 className="comm-hero-heading">
            Become a <span className="hero-text-accent">Partner</span>
          </h1>
          <p className="comm-hero-sub">
            ASR Academic Research Solutions invites universities, consultants, trainers, publishers, and industry organizations to build a global academic service network.
          </p>

          <div className="comm-hero-metrics">
            <div className="comm-metric-item">
              <span className="metric-val">150+</span>
              <span className="metric-lbl">Strategic Partners</span>
            </div>
            <div className="comm-metric-divider"></div>
            <div className="comm-metric-item">
              <span className="metric-val">50+</span>
              <span className="metric-lbl">Countries Connected</span>
            </div>
            <div className="comm-metric-divider"></div>
            <div className="comm-metric-item">
              <span className="metric-val">100%</span>
              <span className="metric-lbl">Mutual Growth Focus</span>
            </div>
            <div className="comm-metric-divider"></div>
            <div className="comm-metric-item">
              <span className="metric-val">ISO 9001</span>
              <span className="metric-lbl">Certified Standards</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="comm-overview-section">
        <div className="section-container">
          <div className="comm-overview-card">
            <div className="comm-card-accent-line"></div>
            <h2>Join Hands with ASR Academic Research Solutions to Build Stronger Academic, Research & Publication Networks</h2>
            <p>
              Partnership with ASR Academic Research Solutions creates opportunities to collaborate in research support, publication guidance, academic training, journal management, faculty development, student skill programs, conference support, innovation mentoring, accreditation documentation, and institutional development services.
            </p>
            <p>
              We believe in building long-term professional partnerships that create value for scholars, students, faculty members, institutions, researchers, startups, and academic communities. Our partner network is designed for individuals and organizations who want to contribute to quality academic services while expanding their professional reach.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities Grid */}
      <section className="comm-features-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pretitle">EXPAND YOUR REACH</span>
            <h2 className="section-title">Partnership Opportunities</h2>
            <p className="section-desc">Structured avenues for institutional and individual academic collaboration.</p>
          </div>

          <div className="comm-features-grid">
            {partnerOpportunities.map((item, idx) => (
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
            <h4>Why Partner with ASR?</h4>
            <p>
              <strong>Transparent collaboration processes:</strong> Dedicated support, flexible engagement models, and multidisciplinary expertise across 35+ research domains.
            </p>
            <p>
              <strong>Recognition & visibility:</strong> Partners receive acknowledgment in relevant platforms, with opportunities to lead initiatives, represent ASR in regions, and contribute to academic service development.
            </p>
            <p>
              <strong>Flexible partnership models:</strong> Customized engagement based on your expertise, availability, and goals. Short-term projects, long-term collaborations, and region-based partnerships available.
            </p>
          </div>

          <div className="comm-pillars-grid">
            <div className="comm-pillar-card">
              <h3>Who Can Become a Partner?</h3>
              <ul className="comm-list-items">
                {whoCanPartner.map((item, idx) => (
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
              <h3>Preferred Partner Qualities</h3>
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

export default BecomePartner;

