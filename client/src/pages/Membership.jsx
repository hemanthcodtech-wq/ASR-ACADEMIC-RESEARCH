import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  CheckCircle2,
  GraduationCap,
  Award,
  Briefcase,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Search,
  Check,
  Star,
  BookOpen,
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import ContactBlock from '../components/ContactBlock';
import './Membership.css';

const Membership = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const tiers = [
    {
      id: "student",
      category: "individual",
      badge: "STUDENT TIER",
      isPopular: false,
      title: "Student Membership",
      audience: "For UG, PG & Ph.D. scholars",
      summary: "Comprehensive academic groundwork support to fast-track your thesis, coursework, and initial publications.",
      icon: <GraduationCap size={26} />,
      perks: [
        "Thesis & Synopsis Drafting Guidance",
        "Viva Mock Defense Preparation",
        "Pre-formatted LaTeX & Word Research Templates",
        "Exclusive Discounts on Advanced Academic Courses",
        "First-Paper Scopus Publication Mentorship",
        "Access to Student Scholar Knowledge Forum"
      ],
      btnClass: "btn-tier-student"
    },
    {
      id: "faculty",
      category: "academic",
      badge: "MOST POPULAR",
      isPopular: true,
      title: "Faculty Membership",
      audience: "For educators & academicians",
      summary: "Tailored for university professors and college lecturers looking to enhance API scores and research footprints.",
      icon: <Award size={26} />,
      perks: [
        "Priority Scopus & SCI Journal Publication Support",
        "Faculty Development Programs (FDP) Access",
        "International Conference Session Chair Roles",
        "Assistance for Career Advancement Schemes (CAS)",
        "Turnitin Similarity Verification Credits",
        "Joint Book Chapter & Edited Volume Co-authorship"
      ],
      btnClass: "btn-tier-faculty"
    },
    {
      id: "professional",
      category: "academic",
      badge: "MOST POPULAR",
      isPopular: true,
      title: "Professional Membership",
      audience: "For researchers & scientists",
      summary: "Dedicated to post-doctoral fellows, independent researchers, and scientists driving global intellectual breakthroughs.",
      icon: <Briefcase size={26} />,
      perks: [
        "Patent & Intellectual Property Filing Assistance",
        "Cross-Border Interdisciplinary Collaborations",
        "Nomination for ASR Annual Academic Excellence Awards",
        "Access to Global High-Impact Reviewer Network",
        "Research Grant Application (DST/SERB) Advisory",
        "Priority Fast-Track Peer Review Recommendations"
      ],
      btnClass: "btn-tier-professional"
    },
    {
      id: "institutional",
      category: "organization",
      badge: "INSTITUTIONAL",
      isPopular: false,
      title: "Institutional Membership",
      audience: "For colleges & universities",
      summary: "Strategic institutional partnership to elevate accreditation standing, faculty output, and campus research culture.",
      icon: <Building2 size={26} />,
      perks: [
        "NAAC, NIRF & NBA Accreditation Metric Optimization",
        "Turnkey International Conference & Seminar Hosting",
        "Global Institutional Branding & MoU Partnerships",
        "Subsidized Group Publication & Proofreading Rates",
        "On-Campus Faculty Development Workshops",
        "Custom Open Journal Systems (OJS) Consultation"
      ],
      btnClass: "btn-tier-institutional"
    },
    {
      id: "corporate",
      category: "organization",
      badge: "CORPORATE R&D",
      isPopular: false,
      title: "Corporate Membership",
      audience: "For companies & R&D orgs",
      summary: "Bridges industrial innovation with premier academic talent, contract research labs, and commercial technology transfers.",
      icon: <Zap size={26} />,
      perks: [
        "Direct Industry-Academia Collaborative Research",
        "Doctoral Talent Acquisition & Researcher Sourcing",
        "Joint Commercial Patent Drafting & IP Protection",
        "Deep-Tech Innovation & Incubator Acceleration",
        "Sponsored Lab Development & Joint Publications",
        "Corporate Social Responsibility (CSR) Research Projects"
      ],
      btnClass: "btn-tier-corporate"
    }
  ];

  const filterTabs = [
    { id: 'all', label: 'All Memberships (5)' },
    { id: 'individual', label: 'Scholars & Students' },
    { id: 'academic', label: 'Faculty & Researchers' },
    { id: 'organization', label: 'Institutions & Corporate' }
  ];

  const filteredTiers = tiers.filter(t => {
    if (selectedFilter === 'all') return true;
    return t.category === selectedFilter;
  });

  return (
    <div className="membership-page">
      {/* 1. Hero Section (Matching Services Page Atmospheric Gradient & Metrics) */}
      <section className="membership-hero-showcase">
        <div className="membership-hero-glow"></div>
        <div className="membership-hero-container">
          <div className="membership-hero-badge">
            <Users size={14} className="hero-users-icon" />
            <span>GLOBAL SCHOLARLY COMMUNITY</span>
          </div>

          <h1 className="membership-hero-heading">
            Join the ASR Academic Community & <br />
            <span className="hero-text-accent">Elevate Your Research Journey</span>
          </h1>

          <p className="membership-hero-desc">
            Become an esteemed member of a premier global academic network across 50+ countries. Gain priority journal assistance, patent facilitation, thesis mentorship, and exclusive scholarly opportunities.
          </p>

          {/* Quick Metrics Bar */}
          <div className="membership-hero-metrics">
            <div className="hero-metric-item">
              <span className="metric-val">2,000+</span>
              <span className="metric-lbl">Active Members</span>
            </div>
            <div className="metric-divider"></div>
            <div className="hero-metric-item">
              <span className="metric-val">50+</span>
              <span className="metric-lbl">Countries Connected</span>
            </div>
            <div className="metric-divider"></div>
            <div className="hero-metric-item">
              <span className="metric-val">100%</span>
              <span className="metric-lbl">Verified Digital ID</span>
            </div>
            <div className="metric-divider"></div>
            <div className="hero-metric-item">
              <span className="metric-val">ISO 9001</span>
              <span className="metric-lbl">Certified Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sticky Category Filter Navigation */}
      <section className="membership-filter-section">
        <div className="membership-filter-container">
          <div className="membership-filter-tabs">
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                className={`filter-tab-btn ${selectedFilter === tab.id ? 'active' : ''}`}
                onClick={() => setSelectedFilter(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="membership-guarantee-pill">
            <ShieldCheck size={14} /> Instant Application & 48-Hour Verification
          </div>
        </div>
      </section>

      {/* 3. Main Membership Tiers Grid */}
      <section className="membership-plans-directory">
        <div className="membership-plans-container">
          <div className="plans-directory-header">
            <div>
              <span className="plans-count-text">
                Showing <strong>{filteredTiers.length}</strong> official membership categories
              </span>
            </div>
            <Link to="/contact" className="plans-help-link">
              Need custom institutional pricing? Contact Us &rarr;
            </Link>
          </div>

          <div className="membership-cards-showcase-grid">
            {filteredTiers.map((tier) => (
              <div 
                className={`membership-card-premium ${tier.isPopular ? 'card-featured' : ''}`} 
                key={tier.id}
              >
                {/* Popular / Tier Badge */}
                <div className={`card-tier-badge ${tier.isPopular ? 'badge-popular' : ''}`}>
                  {tier.badge}
                </div>

                {/* Card Icon & Header */}
                <div className="card-icon-container">
                  {tier.icon}
                </div>

                <h3 className="card-tier-name">{tier.title}</h3>
                <div className="card-audience-tag">{tier.audience}</div>
                <p className="card-summary-text">{tier.summary}</p>

                <div className="card-tier-divider"></div>

                {/* Features / Perks List */}
                <div className="card-perks-title">Included Benefits & Privileges:</div>
                <ul className="card-perks-list">
                  {tier.perks.map((perk, idx) => (
                    <li key={idx} className="card-perk-item">
                      <CheckCircle2 size={15} className="perk-check-icon" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>

                {/* Apply Button */}
                <div className="card-action-box">
                  <Link to="/contact" className={`btn-tier-apply-action ${tier.btnClass}`}>
                    <span>Apply for Membership</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The 4-Step Membership Application Journey */}
      <section className="membership-steps-showcase">
        <div className="steps-showcase-container">
          <div className="steps-header">
            <span className="steps-pretitle-pill">SEAMLESS ONBOARDING</span>
            <h2 className="steps-main-title">How to Join — 4 Simple Steps</h2>
            <p className="steps-subtitle">
              From online form submission to receiving your internationally verified digital membership credentials.
            </p>
          </div>

          <div className="steps-showcase-grid">
            {/* Step 1 */}
            <div className="step-showcase-card">
              <div className="step-number-bubble">1</div>
              <h4>Submit Application</h4>
              <p className="step-tag">Online Form</p>
              <p className="step-desc">Fill out our simple application form with your academic details and research interests.</p>
            </div>

            {/* Step 2 */}
            <div className="step-showcase-card">
              <div className="step-number-bubble">2</div>
              <h4>Profile Review</h4>
              <p className="step-tag">Expert Verification</p>
              <p className="step-desc">Our academic evaluation board reviews your profile within 24 to 48 hours.</p>
            </div>

            {/* Step 3 */}
            <div className="step-showcase-card">
              <div className="step-number-bubble">3</div>
              <h4>Approval</h4>
              <p className="step-tag">Confirmation Email</p>
              <p className="step-desc">Receive your formal membership welcome kit and customized researcher ID.</p>
            </div>

            {/* Step 4 */}
            <div className="step-showcase-card">
              <div className="step-number-bubble">4</div>
              <h4>Certification</h4>
              <p className="step-tag">Digital ID & Certificate</p>
              <p className="step-desc">Gain instant access to member-only journal discounts, templates, and networking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Member Value Proposition / Why Join ASR */}
      <section className="membership-value-section">
        <div className="membership-value-container">
          <div className="value-header">
            <span className="value-pretitle">COMMUNITY ADVANTAGE</span>
            <h2 className="value-title">Why Academicians Choose ASR Membership</h2>
            <p className="value-desc">
              Accelerate your academic career, build a verifiable global research profile, and collaborate with leading scientists worldwide.
            </p>
          </div>

          <div className="value-grid">
            <div className="value-card">
              <div className="value-icon"><Globe size={26} /></div>
              <h4>Global Research Network</h4>
              <p>Connect with peer researchers, editorial board members, and university heads across Asia, Europe, and America.</p>
            </div>

            <div className="value-card">
              <div className="value-icon"><BookOpen size={26} /></div>
              <h4>Journal Priority Access</h4>
              <p>Enjoy priority routing and expedited editorial reviews in affiliated Scopus, SCI, and Web of Science indexed journals.</p>
            </div>

            <div className="value-card">
              <div className="value-icon"><Award size={26} /></div>
              <h4>Annual Recognition & Awards</h4>
              <p>Exclusive eligibility for prestigious ASR Academic Research Awards celebrating young researchers and outstanding faculty.</p>
            </div>

            <div className="value-card">
              <div className="value-icon"><ShieldCheck size={26} /></div>
              <h4>MSME & ISO Backed Credibility</h4>
              <p>All certifications and member IDs carry Government of India MSME recognition and ISO 9001:2015 quality assurance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Embedded Regional Contact Block */}
      <ContactBlock 
        title="Have Questions About Membership?"
        subtitle="Our membership advisory team is available to assist you with tier selection, institutional group onboarding, and payment queries."
        defaultService="Other" 
      />
    </div>
  );
};

export default Membership;
