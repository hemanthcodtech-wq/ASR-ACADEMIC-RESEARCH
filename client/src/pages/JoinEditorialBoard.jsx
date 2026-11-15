import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import ContactBlock from '../components/ContactBlock';
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
  Building2,
  GraduationCap
} from 'lucide-react';
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
      icon: <GraduationCap size={22} />
    }
  ];

  const whoCanJoin = [
    "Professors, Associate Professors, Assistant Professors",
    "Ph.D. Holders & Doctoral Mentors",
    "Postdoctoral Researchers & Senior Research Scholars",
    "Journal Editors & Review Committee Members",
    "Subject Matter Experts across 35+ disciplines",
    "Industry Experts with Strong Research Background",
    "Academic Administrators & Research Supervisors",
    "Conference Committee Members & Book Editors",
    "Experts from Engineering, Management, Science, Humanities, Commerce, Healthcare, Education, Law & Social Sciences"
  ];

  const keyBenefits = [
    "Academic recognition and global professional contribution",
    "Opportunity to shape research quality and international publication standards",
    "Editorial Board Membership Certificate or official acknowledgment",
    "Networking with leading scholars and international researchers",
    "Hands-on experience in editorial decision-making and peer review oversight",
    "Contribution to indexed journals, books, conferences, and academic projects",
    "Enhanced academic profile and research visibility worldwide",
    "Opportunity to guide early-career researchers, doctoral scholars, and authors"
  ];

  const preferredQualities = [
    "Strong subject expertise and domain leadership",
    "Proven research, publishing, and editorial experience",
    "Ethical editorial approach aligned with international standards (COPE)",
    "Attention to academic detail and citation rigor",
    "Clear, constructive, and prompt editorial communication",
    "Timely editorial decision responses",
    "Deep understanding of qualitative and quantitative research methodology",
    "Commitment to academic integrity, confidentiality, and transparency"
  ];

  return (
    <div className="community-subpage">
      {/* 1. Dynamic Hero Section */}
      <PageHero
        badge="EDITORIAL EXCELLENCE • RESEARCH LEADERSHIP • ACADEMIC CONTRIBUTION"
        title="Join"
        highlightText="Editorial Board"
        subtitle="ASR Academic Research Solutions invites experienced academicians, researchers, professors, subject experts, and industry professionals to join the editorial board and contribute to academic quality, research development, publication standards, and scholarly excellence."
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
            <span>Apply Now for Editorial Board</span>
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
      </ScrollReveal>

      {/* 3. Editorial Board Responsibilities Grid */}
      <section className="comm-features-section">
        <div className="section-container">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="section-header">
              <span className="section-pretitle">EDITORIAL OVERSIGHT</span>
              <h2 className="section-title">Editorial Board Responsibilities</h2>
              <p className="section-desc">Key leadership and guidance responsibilities held by our board members.</p>
            </div>
          </ScrollReveal>

          <div className="comm-features-grid">
            {responsibilities.map((r, idx) => (
              <ScrollReveal key={idx} direction="up" delay={0.05 * idx}>
                <TiltCard maxTilt={8} glowColor="rgba(37, 99, 235, 0.12)">
                  <div className="comm-feature-card" style={{ height: '100%', margin: 0 }}>
                    <div className="comm-feat-icon">{r.icon}</div>
                    <h3>{r.title}</h3>
                    <p>{r.desc}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose ASR & Key Pillars */}
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
                  <span>PRESTIGIOUS EDITORIAL ADVANTAGE</span>
                </span>
                <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
                  Why Choose the <span style={{ background: 'linear-gradient(135deg, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ASR Editorial Board?</span>
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '14.5px', maxWidth: '640px', margin: '8px auto 0' }}>
                  Experience an ethical, high-impact scholarly community tailored to empower senior researchers and editors.
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
                      Transparent Editorial Policies
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                      Collaborative academic environment adhering strictly to COPE publication ethics, structured double-blind standards, and multidisciplinary engagement across 35+ research domains.
                    </p>
                    <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#38bdf8', fontWeight: 700 }}>
                      <CheckCircle size={14} color="#38bdf8" />
                      <span>COPE Ethics &amp; Integrity</span>
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
                      Recognition &amp; Global Visibility
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                      Editorial board members are formally acknowledged in international proceedings and indexed publications, with prioritized invitations to lead special issues and academic initiatives.
                    </p>
                    <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>
                      <CheckCircle size={14} color="#fbbf24" />
                      <span>Official Editorial Citation</span>
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
                      <Compass size={24} />
                    </div>
                    <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#f8fafc', margin: '0 0 10px' }}>
                      Flexible Engagement Control
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                      Participate in editorial evaluation and special issues entirely based on your schedule and expertise. You maintain complete control over the volume and cadence of your involvement.
                    </p>
                    <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#34d399', fontWeight: 700 }}>
                      <CheckCircle size={14} color="#34d399" />
                      <span>100% On-Demand Cadence</span>
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
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. Bottom Ready to Join Banner */}
      <ScrollReveal direction="up" delay={0.1}>
        <section style={{ padding: '60px 20px', background: '#09152a', color: '#fff', textAlign: 'center' }}>
          <div style={{ maxWidth: '750px', margin: '0 auto' }}>
            <span style={{ color: '#60a5fa', fontWeight: 800, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              SCHOLARLY IMPACT &amp; LEADERSHIP
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, margin: '12px 0 16px', color: '#ffffff' }}>
              Ready to Join the Editorial Board?
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
              Become part of our academic editorial network and contribute to scholarly excellence. Start your application today.
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
              <span>Apply Now</span>
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

export default JoinEditorialBoard;
