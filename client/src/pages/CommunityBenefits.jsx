import React from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  CheckCircle,
  GraduationCap,
  BookMarked,
  Users,
  Award,
  Briefcase,
  Building2,
  Lightbulb,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import ContactBlock from '../components/ContactBlock';
import './CommunityPages.css';

const CommunityBenefits = () => {
  const communityOfferings = [
    {
      title: "Research Support for Scholars",
      desc: "Guidance for Ph.D. scholars, postgraduate students, and researchers in thesis writing, methodology, publication, project documentation, and academic development.",
      icon: <GraduationCap size={22} />
    },
    {
      title: "Publication Opportunities & Guidance",
      desc: "Support for researchers preparing manuscripts, book chapters, conference papers, edited volumes, and journal submissions.",
      icon: <BookMarked size={22} />
    },
    {
      title: "Reviewer & Editorial Network",
      desc: "Opportunities for qualified academicians and experts to join as reviewers or editorial board members and contribute to academic quality.",
      icon: <Award size={22} />
    },
    {
      title: "Faculty Development Support",
      desc: "Training and mentorship for faculty members in research writing, publication ethics, teaching methods, proposal development, and academic profile building.",
      icon: <Users size={22} />
    },
    {
      title: "Student Skill Development",
      desc: "Internship training, project support, academic writing practice, presentation skills, research awareness, and professional readiness programs.",
      icon: <Briefcase size={22} />
    },
    {
      title: "Institutional Growth Support",
      desc: "Assistance for colleges, universities, and departments in accreditation, ranking, documentation, journal management, conferences, and academic collaborations.",
      icon: <Building2 size={22} />
    },
    {
      title: "Innovation & Startup Guidance",
      desc: "Support for students, researchers, and innovators in idea validation, startup planning, patent documentation, pitch decks, and incubation readiness.",
      icon: <Lightbulb size={22} />
    },
    {
      title: "Conference & Seminar Engagement",
      desc: "Opportunities to participate in academic events, workshops, seminars, FDPs, research meets, and knowledge-sharing programs.",
      icon: <Sparkles size={22} />
    },
    {
      title: "Knowledge Collaboration",
      desc: "A platform for institutions, researchers, faculty members, and professionals to collaborate on research, publications, training, consultancy, and innovation.",
      icon: <Globe size={22} />
    },
    {
      title: "Academic Recognition",
      desc: "Opportunities for certificates, acknowledgements, editorial participation, reviewer contribution, publication involvement, and professional academic visibility.",
      icon: <CheckCircle size={22} />
    }
  ];

  const beneficiariesList = [
    { role: "Ph.D. Scholars", detail: "Doctoral candidates seeking research support" },
    { role: "Research Students", detail: "Postgraduate researchers building skills" },
    { role: "Postgraduate Students", detail: "Master's students preparing for research careers" },
    { role: "Faculty Members", detail: "Educators enhancing research and teaching" },
    { role: "Reviewers", detail: "Academicians contributing to peer review" },
    { role: "Editorial Board Members", detail: "Experts guiding publication standards" },
    { role: "Academic Institutions", detail: "Colleges and universities seeking growth" },
    { role: "Universities & Colleges", detail: "Higher education institutions" },
    { role: "Innovation Cells", detail: "Campus innovation hubs" },
    { role: "Incubation Centres", detail: "Startup support ecosystems" },
    { role: "Journals & Publishers", detail: "Academic publication platforms" },
    { role: "Conference Committees", detail: "Event organizing teams" },
    { role: "Startups & Innovators", detail: "Early-stage ventures and creators" },
    { role: "Industry-Academic Partners", detail: "Corporate and academic collaborators" },
    { role: "Professional Researchers", detail: "Independent and institutional researchers" }
  ];

  return (
    <div className="community-subpage">
      {/* Hero */}
      <section className="comm-hero-showcase">
        <div className="comm-hero-glow"></div>
        <div className="comm-hero-inner">
          <div className="comm-hero-badge">
            <Globe size={14} />
            <span>COMMUNITY VALUE & IMPACT</span>
          </div>
          <h1 className="comm-hero-heading">
            Community <span className="hero-text-accent">Benefits</span>
          </h1>
          <p className="comm-hero-sub">
            ASR Academic Research Solutions is dedicated to empowering the global research ecosystem through structured mentoring, open knowledge dissemination, and career breakthroughs.
          </p>

          <div className="comm-hero-metrics">
            <div className="comm-metric-item">
              <span className="metric-val">2,000+</span>
              <span className="metric-lbl">Active Members</span>
            </div>
            <div className="comm-metric-divider"></div>
            <div className="comm-metric-item">
              <span className="metric-val">50+</span>
              <span className="metric-lbl">Countries Connected</span>
            </div>
            <div className="comm-metric-divider"></div>
            <div className="comm-metric-item">
              <span className="metric-val">100%</span>
              <span className="metric-lbl">Scholarly Support</span>
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
            <h2>Creating Academic Value for Scholars, Faculty, Institutions & Research Communities</h2>
            <p>
              A strong academic community grows when students, scholars, faculty members, institutions, reviewers, editors, researchers, and industry experts work together with shared purpose. ASR Academic Research Solutions aims to create a supportive ecosystem where knowledge, research, innovation, publication, and professional development are accessible in a structured and meaningful way.
            </p>
            <p>
              Through our services, programs, collaborations, reviewer networks, editorial opportunities, training sessions, publication guidance, and institutional support, we help academic communities improve research quality, enhance skills, build credibility, and contribute to long-term educational impact.
            </p>
          </div>
        </div>
      </section>

      {/* Community Offerings Grid */}
      <section className="comm-features-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pretitle">COMMUNITY ECOSYSTEM</span>
            <h2 className="section-title">Value & Support We Provide</h2>
            <p className="section-desc">Key pillars of empowerment available to members across our global network.</p>
          </div>

          <div className="comm-features-grid">
            {communityOfferings.map((item, idx) => (
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

      {/* Who Benefits */}
      <section className="comm-pillars-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pretitle">NETWORK PARTICIPANTS</span>
            <h2 className="section-title">Who Benefits from the ASR Community?</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '1240px', margin: '0 auto' }}>
            {beneficiariesList.map((b, i) => (
              <div key={i} style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '15.5px', fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>{b.role}</h4>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{b.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Block */}
      <ContactBlock defaultService="Other" />
    </div>
  );
};

export default CommunityBenefits;

