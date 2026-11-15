import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import ContactBlock from '../components/ContactBlock';
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
  Sparkles,
  FileCheck2,
  Cpu
} from 'lucide-react';
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
      icon: <Handshake size={22} />
    },
    {
      title: "Startup & Innovation Support",
      desc: "Collaborate for incubation guidance, idea validation, pitch deck preparation, business model development, grant readiness, and startup mentoring programs.",
      icon: <Lightbulb size={22} />
    },
    {
      title: "Accreditation & Ranking Support",
      desc: "Partner with ASR for NAAC, NBA, NIRF, IQAC, SSR, AQAR, DVV, OBE documentation, institutional quality files, and ranking preparation support.",
      icon: <ShieldCheck size={22} />
    },
    {
      title: "Book & Chapter Publishing Collaboration",
      desc: "Work with us for edited volumes, book chapters, academic books, ISBN-based publications, editorial review, formatting, and publication readiness.",
      icon: <BookOpen size={22} />
    },
    {
      title: "Patent & IP Facilitation",
      desc: "Collaborate for patent drafting support, prior art search guidance, IP documentation, design registration assistance, copyright support, and innovation protection.",
      icon: <Cpu size={22} />
    }
  ];

  const whoCanCollaborate = [
    "Universities & Higher Education Institutions",
    "Colleges & Autonomous Campuses",
    "Research Institutions & Scientific Laboratories",
    "Academic Departments & Special Centers",
    "IQAC Cells & Ranking Committees",
    "Innovation Cells & Incubation Centres",
    "Journals, Editors & Academic Publishers",
    "Conference Committees & Event Organizers",
    "Faculty Development Cells & Academic Councils",
    "Professional Associations & Subject Societies",
    "Startups, Entrepreneurs & Tech Founders",
    "Industry Partners & Corporate CSR Teams",
    "Training Organizations & Academic Consultants",
    "Research Groups & Student Communities"
  ];

  const keyBenefits = [
    "Access to structured academic and publication support models",
    "Research and publication-focused guidance across all disciplines",
    "Professional event and academic training assistance",
    "Stronger faculty and student research development initiatives",
    "Improved institutional documentation for NAAC / NIRF rankings",
    "Comprehensive support for journals, conferences, and books",
    "Better innovation, patent protection, and startup readiness",
    "Academic-industry connection and consultancy opportunities",
    "Customized collaboration models (MoU or project-based)",
    "Long-term knowledge partnership and joint program branding",
    "Professional communication, data privacy, and documentation support"
  ];

  const preferredQualities = [
    "Clear institutional vision and academic goals",
    "Strong commitment to research culture and ethics",
    "Ethical and transparent working approach",
    "Attention to publication quality, citation rigor, and detail",
    "Open, collaborative, and proactive communication",
    "Timely decision-making, review feedback, and project execution",
    "Focus on measurable scholarly outcomes and impact",
    "Mutual respect, integrity, and professional academic standards"
  ];

  return (
    <div className="community-subpage">
      {/* 1. Dynamic Hero Section */}
      <PageHero
        badge="PARTNERSHIPS • INNOVATION • ACADEMIC GROWTH"
        title="Collaborate With"
        highlightText="ASR Research Solutions"
        subtitle="ASR Academic Research Solutions welcomes collaboration with universities, colleges, research institutions, journals, publishers, academic departments, startups, industry partners, and professional organizations seeking structured support in research, publication, training, innovation, and academic development."
      >
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px' }}>
          <a
            href="https://asracademicresearch.com/contact-us/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              padding: '12px 28px',
              borderRadius: '30px',
              fontWeight: 800,
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              color: '#fff',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(37,99,235,0.4)'
            }}
          >
            <span>Start Collaboration Journey</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </PageHero>

      {/* 2. Overview Banner */}
      <ScrollReveal direction="up" delay={0.1}>
        <section className="comm-overview-section">
          <div className="section-container">
            <div className="comm-overview-card">
              <div className="comm-card-accent-line"></div>
              <h2>Partner with ASR for Research, Publications, Training &amp; Academic Growth</h2>
              <p>
                Meaningful collaboration strengthens research culture, improves academic outcomes, creates publication opportunities, supports innovation, and connects institutions with practical knowledge resources. ASR Academic Research Solutions works with academic and professional partners to deliver research-focused services, capacity-building programs, publication support, institutional development assistance, and knowledge-based initiatives.
              </p>
              <p>
                Our collaboration approach is designed to create long-term value for institutions, faculty members, scholars, students, researchers, and professional communities.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 3. Collaboration Opportunities Grid */}
      <section className="comm-features-section">
        <div className="section-container">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="section-header">
              <span className="section-pretitle">AREAS OF ENGAGEMENT</span>
              <h2 className="section-title">Collaboration Opportunities</h2>
              <p className="section-desc">Structured institutional and academic models designed for long-term impact.</p>
            </div>
          </ScrollReveal>

          <div className="comm-features-grid">
            {opportunities.map((o, idx) => (
              <ScrollReveal key={idx} direction="up" delay={0.04 * idx}>
                <TiltCard maxTilt={8} glowColor="rgba(37, 99, 235, 0.12)">
                  <div className="comm-feature-card" style={{ height: '100%', margin: 0 }}>
                    <div className="comm-feat-icon">{o.icon}</div>
                    <h3>{o.title}</h3>
                    <p>{o.desc}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Pillars & Why Partner */}
      <section className="comm-pillars-section">
        <div className="section-container">
          <ScrollReveal direction="up" delay={0.1}>
            <div style={{
              background: 'radial-gradient(120% 120% at 50% 0%, #0d1e38 0%, #081326 60%, #040914 100%)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              borderRadius: '20px',
              padding: '40px 32px',
              color: '#ffffff',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35)',
              marginBottom: '36px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Top Glow Ambient Flare */}
              <div style={{
                position: 'absolute',
                top: '-40px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '450px',
                height: '140px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                filter: 'blur(45px)',
                pointerEvents: 'none'
              }}></div>

              <div style={{ textAlign: 'center', marginBottom: '32px', position: 'relative', zIndex: 2 }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(59, 130, 246, 0.15)',
                  border: '1px solid rgba(59, 130, 246, 0.35)',
                  color: '#93c5fd',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  padding: '5px 14px',
                  borderRadius: '20px',
                  textTransform: 'uppercase',
                  marginBottom: '10px'
                }}>
                  <Sparkles size={13} color="#60a5fa" />
                  <span>INSTITUTIONAL PARTNERSHIP ADVANTAGE</span>
                </span>
                <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
                  Why Collaborate with <span style={{ background: 'linear-gradient(135deg, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ASR?</span>
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '14.5px', maxWidth: '640px', margin: '8px auto 0' }}>
                  Transparent partnership processes, dedicated support teams, and flexible engagement models across 35+ research disciplines.
                </p>
              </div>

              {/* 3 Interactive Feature Showcase Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', position: 'relative', zIndex: 2 }}>
                
                {/* Feature 1 */}
                <TiltCard maxTilt={8} glowColor="rgba(59, 130, 246, 0.22)">
                  <div style={{
                    background: 'rgba(15, 23, 42, 0.75)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    padding: '26px 22px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                  }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(59, 130, 246, 0.1))',
                      border: '1px solid rgba(59, 130, 246, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#60a5fa',
                      marginBottom: '16px'
                    }}>
                      <ShieldCheck size={24} />
                    </div>
                    <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#f8fafc', margin: '0 0 10px' }}>
                      Transparent Partnership Process
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                      Dedicated institutional support teams, clear operational guidelines, and multidisciplinary expertise across 35+ research domains.
                    </p>
                    <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#38bdf8', fontWeight: 700 }}>
                      <CheckCircle size={14} color="#38bdf8" />
                      <span>Dedicated Account Leads</span>
                    </div>
                  </div>
                </TiltCard>

                {/* Feature 2 */}
                <TiltCard maxTilt={8} glowColor="rgba(234, 179, 8, 0.22)">
                  <div style={{
                    background: 'rgba(15, 23, 42, 0.75)',
                    border: '1px solid rgba(234, 179, 8, 0.2)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    padding: '26px 22px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                  }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.25), rgba(245, 158, 11, 0.1))',
                      border: '1px solid rgba(234, 179, 8, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fbbf24',
                      marginBottom: '16px'
                    }}>
                      <Award size={24} />
                    </div>
                    <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#f8fafc', margin: '0 0 10px' }}>
                      Value-Driven Outcomes
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                      We focus on creating measurable outcomes for institutions, researchers, and students through structured programs, high-quality documentation, and professional delivery.
                    </p>
                    <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>
                      <CheckCircle size={14} color="#fbbf24" />
                      <span>NAAC / NIRF Alignment</span>
                    </div>
                  </div>
                </TiltCard>

                {/* Feature 3 */}
                <TiltCard maxTilt={8} glowColor="rgba(16, 185, 129, 0.22)">
                  <div style={{
                    background: 'rgba(15, 23, 42, 0.75)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    padding: '26px 22px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                  }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(52, 211, 153, 0.1))',
                      border: '1px solid rgba(16, 185, 129, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#34d399',
                      marginBottom: '16px'
                    }}>
                      <Handshake size={24} />
                    </div>
                    <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#f8fafc', margin: '0 0 10px' }}>
                      Flexible Engagement Models
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                      Short-term project milestones, multi-year institutional partnerships, MoU-based engagements, and custom-designed initiatives tailored to match your specific goals.
                    </p>
                    <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#34d399', fontWeight: 700 }}>
                      <CheckCircle size={14} color="#34d399" />
                      <span>MoU &amp; Custom Frameworks</span>
                    </div>
                  </div>
                </TiltCard>

              </div>
            </div>
          </ScrollReveal>

          <div className="comm-pillars-grid">
            <ScrollReveal direction="up" delay={0.1}>
              <TiltCard maxTilt={6} glowColor="rgba(16, 185, 129, 0.12)">
                <div className="comm-pillar-card" style={{ height: '100%', margin: 0 }}>
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
              </TiltCard>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.15}>
              <TiltCard maxTilt={6} glowColor="rgba(59, 130, 246, 0.12)">
                <div className="comm-pillar-card" style={{ height: '100%', margin: 0 }}>
                  <h3>Key Benefits of Collaboration</h3>
                  <ul className="comm-list-items">
                    {keyBenefits.map((item, idx) => (
                      <li key={idx}>
                        <CheckCircle size={16} className="comm-check-bullet" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <TiltCard maxTilt={6} glowColor="rgba(168, 85, 247, 0.12)">
                <div className="comm-pillar-card" style={{ height: '100%', margin: 0 }}>
                  <h3>Preferred Collaboration Qualities</h3>
                  <ul className="comm-list-items">
                    {preferredQualities.map((item, idx) => (
                      <li key={idx}>
                        <CheckCircle size={16} className="comm-check-bullet" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. Bottom Ready to Collaborate Banner */}
      <ScrollReveal direction="up" delay={0.1}>
        <section style={{ padding: '60px 20px', background: '#09152a', color: '#fff', textAlign: 'center' }}>
          <div style={{ maxWidth: '750px', margin: '0 auto' }}>
            <span style={{ color: '#60a5fa', fontWeight: 800, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              INSTITUTIONAL PARTNERSHIP
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, margin: '12px 0 16px', color: '#ffffff' }}>
              Ready to Collaborate with ASR?
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
              Let’s work together to strengthen research, publications, training, and academic impact. Start your collaboration journey today.
            </p>
            <a
              href="https://asracademicresearch.com/contact-us/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#2563eb',
                color: '#fff',
                padding: '14px 34px',
                borderRadius: '30px',
                fontWeight: 800,
                fontSize: '15px',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.35)'
              }}
            >
              <span>Start Collaboration</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </ScrollReveal>

      {/* Contact Block */}
      <ContactBlock defaultService="Other" />
    </div>
  );
};

export default CollaborateWithUs;
