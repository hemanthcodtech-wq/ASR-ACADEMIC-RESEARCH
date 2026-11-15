import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import ContactBlock from '../components/ContactBlock';
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
  ArrowRight,
  Handshake,
  FileCheck2,
  ShieldCheck
} from 'lucide-react';
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
      icon: <Globe size={22} />
    },
    {
      title: "Knowledge Collaboration",
      desc: "A platform for institutions, researchers, faculty members, and professionals to collaborate on research, publications, training, consultancy, and innovation.",
      icon: <Handshake size={22} />
    },
    {
      title: "Academic Recognition",
      desc: "Opportunities for certificates, acknowledgements, editorial participation, reviewer contribution, publication involvement, and professional academic visibility.",
      icon: <ShieldCheck size={22} />
    }
  ];

  const whoBenefits = [
    { title: "Ph.D. Scholars", desc: "Doctoral candidates seeking research support and thesis guidance" },
    { title: "Research Students", desc: "Postgraduate researchers building foundational analytical skills" },
    { title: "Postgraduate Students", desc: "Master's students preparing for high-impact research careers" },
    { title: "Faculty Members", desc: "Educators enhancing research API scores and teaching methodologies" },
    { title: "Reviewers", desc: "Academicians contributing to quality double-blind peer review" },
    { title: "Editorial Board Members", desc: "Senior scholars guiding global publication standards" },
    { title: "Academic Institutions", desc: "Colleges and universities seeking continuous research growth" },
    { title: "Universities & Colleges", desc: "Higher education campuses pursuing NAAC / NIRF rankings" },
    { title: "Innovation Cells", desc: "Campus innovation hubs driving student intellectual property" },
    { title: "Incubation Centres", desc: "Startup support ecosystems incubating deep-tech inventions" },
    { title: "Journals & Publishers", desc: "Academic publication platforms aiming for Scopus / WoS indexing" },
    { title: "Conference Committees", desc: "Event organizing teams managing international proceedings" },
    { title: "Startups & Innovators", desc: "Early-stage ventures and inventors seeking patent protection" },
    { title: "Industry-Academic Partners", desc: "Corporate and academic collaborators bridging the talent gap" },
    { title: "Professional Researchers", desc: "Independent and institutional scientists leading grant projects" }
  ];

  return (
    <div className="community-subpage">
      {/* 1. Dynamic Hero Section */}
      <PageHero
        badge="NETWORKING • LEARNING • PROFESSIONAL GROWTH"
        title="Community"
        highlightText="Benefits"
        subtitle="ASR Academic Research Solutions is built to support the academic and research community through structured guidance, knowledge sharing, professional development, publication support, training opportunities, and collaborative academic growth."
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
            <span>Join Community</span>
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
              <h2>Creating Academic Value for Scholars, Faculty, Institutions &amp; Research Communities</h2>
              <p>
                A strong academic community grows when students, scholars, faculty members, institutions, reviewers, editors, researchers, and industry experts work together with shared purpose. ASR Academic Research Solutions aims to create a supportive ecosystem where knowledge, research, innovation, publication, and professional development are accessible in a structured and meaningful way.
              </p>
              <p>
                Through our services, programs, collaborations, reviewer networks, editorial opportunities, training sessions, publication guidance, and institutional support, we help academic communities improve research quality, enhance skills, build credibility, and contribute to long-term educational impact.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 3. Offerings Grid */}
      <section className="comm-features-section">
        <div className="section-container">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="section-header">
              <span className="section-pretitle">COMMUNITY IMPACT</span>
              <h2 className="section-title">Support Pillars &amp; Academic Offerings</h2>
              <p className="section-desc">Comprehensive pathways structured for scholars, faculty, and institutions.</p>
            </div>
          </ScrollReveal>

          <div className="comm-features-grid">
            {communityOfferings.map((o, idx) => (
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

      {/* 4. Who Benefits Showcase Grid */}
      <section className="comm-pillars-section">
        <div className="section-container">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="section-header">
              <span className="section-pretitle">BENEFICIARIES</span>
              <h2 className="section-title">Who Benefits from the ASR Community?</h2>
              <p className="section-desc">Empowering participants across all tiers of higher education and scientific innovation.</p>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '24px' }}>
            {whoBenefits.map((b, idx) => (
              <ScrollReveal key={idx} direction="up" delay={0.03 * idx}>
                <TiltCard maxTilt={6} glowColor="rgba(16, 185, 129, 0.12)">
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '20px',
                    height: '100%'
                  }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>{b.title}</h4>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>{b.desc}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom Ready to Join Banner */}
      <ScrollReveal direction="up" delay={0.1}>
        <section style={{ padding: '60px 20px', background: '#09152a', color: '#fff', textAlign: 'center' }}>
          <div style={{ maxWidth: '750px', margin: '0 auto' }}>
            <span style={{ color: '#60a5fa', fontWeight: 800, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              GLOBAL SCHOLARLY ECOSYSTEM
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, margin: '12px 0 16px', color: '#ffffff' }}>
              Ready to Join the ASR Community?
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
              Become part of a supportive academic network that helps researchers, faculty, students, and institutions grow through structured guidance, collaboration, and knowledge sharing.
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
              <span>Join Community</span>
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

export default CommunityBenefits;
