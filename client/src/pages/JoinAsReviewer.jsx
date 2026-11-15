import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import ContactBlock from '../components/ContactBlock';
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
  Scale,
  GraduationCap
} from 'lucide-react';
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
    "Ph.D. Holders & Doctoral Candidates",
    "Research Scholars with Strong Publication Background",
    "Postdoctoral Researchers & Research Fellows",
    "Industry Experts & R&D Scientists",
    "Subject Matter Experts across 35+ Disciplines",
    "Journal Editorial Members & Peer Reviewers",
    "Conference Review Committee Members",
    "Academic Mentors & Technical Experts",
    "Healthcare, Management, Engineering, Science, Humanities & Social Science Professionals"
  ];

  const keyBenefits = [
    "Academic recognition and global professional contribution",
    "Opportunity to support quality research and publication integrity",
    "Official Reviewer Certificate or acknowledgement where applicable",
    "Networking with leading scholars and international academic professionals",
    "Hands-on experience in scholarly evaluation and editorial peer review",
    "Contribution to high-impact conferences, indexed journals, books, and research projects",
    "Enhanced academic profile and research engagement (Publons/WoS readiness)",
    "Opportunity to join academic panels, advisory boards, and review committees"
  ];

  const preferredQualities = [
    "Strong subject knowledge and domain expertise",
    "Research and scholarly publication track record",
    "Ethical review approach and strict confidentiality",
    "Attention to academic detail and citation consistency",
    "Clear, constructive, and polite author communication",
    "Timely review turnaround and scheduled delivery",
    "Sound understanding of empirical and qualitative research methodology",
    "Uncompromising commitment to academic integrity and transparency"
  ];

  return (
    <div className="community-subpage">
      {/* 1. Dynamic Hero Section */}
      <PageHero
        badge="BECOME A REVIEWER • SHAPE ACADEMIC EXCELLENCE • GLOBAL RECOGNITION"
        title="Join as"
        highlightText="Reviewer"
        subtitle="Contribute to quality assurance | Elevate your research profile | Network with leading indexed journals across 50+ countries."
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
            <span>Apply Now to Review Panel</span>
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
              <h2>Contribute to Academic Quality, Research Integrity &amp; Scholarly Peer Review</h2>
              <p>
                A strong peer review system plays an important role in improving research quality, maintaining publication standards, and supporting authors in strengthening their academic work. ASR Academic Research Solutions welcomes experienced reviewers who can evaluate research manuscripts, book chapters, conference papers, academic projects, and scholarly content across various disciplines.
              </p>
              <p>
                As a reviewer, you can contribute your subject expertise, support academic development, provide constructive feedback, and become part of a growing research-focused professional network.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 3. Reviewer Responsibilities Grid */}
      <section className="comm-features-section">
        <div className="section-container">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="section-header">
              <span className="section-pretitle">CORE ROLE</span>
              <h2 className="section-title">Reviewer Responsibilities</h2>
              <p className="section-desc">Key tasks undertaken by our recognized peer-review council.</p>
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
                  <span>PRESTIGIOUS PEER REVIEW ADVANTAGE</span>
                </span>
                <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.02em' }}>
                  Why Choose the <span style={{ background: 'linear-gradient(135deg, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ASR Review Panel?</span>
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '14.5px', maxWidth: '640px', margin: '8px auto 0' }}>
                  Experience an ethical, high-impact scholarly community tailored to empower peer reviewers and subject specialists.
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
                      Transparent Evaluation Process
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                      Constructive reviewer guidelines, collaborative academic environment, and multidisciplinary engagement across 35+ research domains.
                    </p>
                    <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#38bdf8', fontWeight: 700 }}>
                      <CheckCircle size={14} color="#38bdf8" />
                      <span>Double-Blind Fairness</span>
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
                      Recognition &amp; Scholarly Visibility
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                      Featured reviewer acknowledgment in relevant proceedings and journals (subject to policy), with exclusive opportunities to lead special issue reviews.
                    </p>
                    <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>
                      <CheckCircle size={14} color="#fbbf24" />
                      <span>Official Certificate of Merit</span>
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
                      <Scale size={24} />
                    </div>
                    <h4 style={{ fontSize: '17px', fontWeight: 800, color: '#f8fafc', margin: '0 0 10px' }}>
                      Flexible Review Commitment
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                      Review invitations based on your availability and expertise. You maintain complete control over the volume and timing of assignments.
                    </p>
                    <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#34d399', fontWeight: 700 }}>
                      <CheckCircle size={14} color="#34d399" />
                      <span>100% On-Demand Review Flow</span>
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
              ACADEMIC QUALITY &amp; INTEGRITY
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, margin: '12px 0 16px', color: '#ffffff' }}>
              Ready to Join as a Reviewer?
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
              Become part of our academic review network and contribute to research excellence. Start your application today.
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

export default JoinAsReviewer;
