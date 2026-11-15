import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import ContactBlock from '../components/ContactBlock';
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
  Sparkles,
  ShieldCheck,
  FileCheck2,
  TrendingUp
} from 'lucide-react';
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
      icon: <ShieldCheck size={22} />
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

  const whoCanBecomePartner = [
    "Universities & Higher Education Campuses",
    "Colleges & Autonomous Educational Institutions",
    "Research Institutions & Scientific Bodies",
    "Academic Consultants & Educational Advisors",
    "Training Organizations & Skill Centers",
    "Journal Publishers & Editorial Houses",
    "OJS Service Providers & Cloud Hosting Leads",
    "Conference Organizers & Academic Societies",
    "Faculty Development Cells & Ranking Units",
    "Innovation Cells & Incubation Centres",
    "Industry Experts & Corporate CSR Units",
    "Research Mentors & Senior Thesis Guides",
    "Subject Matter Experts across 35+ Domains",
    "Academic Service Providers & Tech Agencies",
    "Startup Consultants & Venture Incubators",
    "Professional Associations & Councils",
    "Education Consultants & Placement Hubs",
    "Regional Business Partners & Field Directors"
  ];

  const keyBenefits = [
    "Professional association with ASR Academic Research Solutions",
    "Opportunity to expand academic service reach globally",
    "Access to structured research and publication support models",
    "Collaboration in workshops, conferences, FDPs, and training programs",
    "Support for journals, institutions, scholars, and faculty members",
    "Better visibility in academic and research communities worldwide",
    "Opportunity to work on institutional and research-focused projects",
    "Long-term partnership and mutual institutional growth potential",
    "Flexible collaboration models based on regional expertise",
    "Shared contribution toward academic excellence and global innovation"
  ];

  const preferredQualities = [
    "Strong academic or professional background in higher education",
    "Genuine interest in research, publication, training, or institutional support",
    "Ethical, transparent, and compliant working approach",
    "Commitment to quality academic service delivery and client trust",
    "Good communication, leadership, and institutional coordination skills",
    "Ability to support scholars, faculty, or institutions professionally",
    "Interest in long-term collaborative relationship and value creation",
    "Understanding of academic standards, UGC regulations, and documentation needs"
  ];

  return (
    <div className="community-subpage">
      {/* 1. Dynamic Hero Section */}
      <PageHero
        badge="PARTNERSHIPS • COLLABORATION • GROWTH OPPORTUNITIES"
        title="Become"
        highlightText="Partner"
        subtitle="ASR Academic Research Solutions invites institutions, consultants, trainers, publishers, journals, academic professionals, research organizations, and industry partners to become part of our growing academic service network."
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
            <span>Become a Partner</span>
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
              <h2>Join Hands with ASR to Build Stronger Academic, Research &amp; Publication Networks</h2>
              <p>
                Partnership with ASR Academic Research Solutions creates opportunities to collaborate in research support, publication guidance, academic training, journal management, faculty development, student skill programs, conference support, innovation mentoring, accreditation documentation, and institutional development services.
              </p>
              <p>
                We believe in building long-term professional partnerships that create value for scholars, students, faculty members, institutions, researchers, startups, and academic communities. Our partner network is designed for individuals and organizations who want to contribute to quality academic services while expanding their professional reach.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 3. Partnership Opportunities Grid */}
      <section className="comm-features-section">
        <div className="section-container">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="section-header">
              <span className="section-pretitle">GROWTH PATHWAYS</span>
              <h2 className="section-title">Partnership Opportunities</h2>
              <p className="section-desc">Diverse engagement avenues designed for institutions, consultants, and leaders.</p>
            </div>
          </ScrollReveal>

          <div className="comm-features-grid">
            {partnerOpportunities.map((o, idx) => (
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
                  <span>STRATEGIC ALLIANCE ADVANTAGE</span>
                </span>
                <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
                  Why Partner with <span style={{ background: 'linear-gradient(135deg, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ASR?</span>
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '14.5px', maxWidth: '640px', margin: '8px auto 0' }}>
                  Transparent collaboration processes, dedicated support, flexible engagement models, and multidisciplinary expertise across 35+ research domains.
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
                      Transparent Collaboration Processes
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                      Dedicated institutional support, flexible engagement models, and multidisciplinary expertise across 35+ research domains.
                    </p>
                    <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#38bdf8', fontWeight: 700 }}>
                      <CheckCircle size={14} color="#38bdf8" />
                      <span>Dedicated Operations Lead</span>
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
                      Recognition &amp; Visibility
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                      Partners receive formal acknowledgment in relevant platforms, with opportunities to lead initiatives, represent ASR regionally, and contribute to academic service development.
                    </p>
                    <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>
                      <CheckCircle size={14} color="#fbbf24" />
                      <span>Regional Leadership Rights</span>
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
                      Flexible Partnership Models
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                      Customized engagement based on your expertise, availability, and goals. Short-term projects, long-term institutional collaborations, and region-based partnerships available.
                    </p>
                    <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#34d399', fontWeight: 700 }}>
                      <CheckCircle size={14} color="#34d399" />
                      <span>Custom Regional Models</span>
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
                  <h3>Who Can Become a Partner?</h3>
                  <ul className="comm-list-items">
                    {whoCanBecomePartner.map((item, idx) => (
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
              </TiltCard>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <TiltCard maxTilt={6} glowColor="rgba(168, 85, 247, 0.12)">
                <div className="comm-pillar-card" style={{ height: '100%', margin: 0 }}>
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
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. Bottom Ready to Become Partner Banner */}
      <ScrollReveal direction="up" delay={0.1}>
        <section style={{ padding: '60px 20px', background: '#09152a', color: '#fff', textAlign: 'center' }}>
          <div style={{ maxWidth: '750px', margin: '0 auto' }}>
            <span style={{ color: '#60a5fa', fontWeight: 800, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              ACADEMIC NETWORK EXPANSION
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, margin: '12px 0 16px', color: '#ffffff' }}>
              Ready to Become an ASR Partner?
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
              Join a growing academic service network. Collaborate with institutions, researchers, faculty members, and scholars to create meaningful academic impact.
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
              <span>Become a Partner</span>
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

export default BecomePartner;
