import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  BookMarked,
  BookOpen,
  Lightbulb,
  Sparkles,
  DollarSign,
  Building2,
  Users,
  Award,
  Globe,
  Briefcase,
  FileCheck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  PhoneCall,
  MessageCircle,
  Zap,
  Target
} from 'lucide-react';
import ContactBlock from '../components/ContactBlock';
import './Services.css';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const serviceList = [
    {
      id: "phd-thesis",
      category: "academic",
      badge: "PhD Core",
      title: "ASR Ph.D. Thesis Support Services",
      desc: "Comprehensive PhD roadmap from topic identification, synopsis preparation, literature synthesis, data modeling to final thesis documentation and viva mock defense.",
      link: "/services/phd-thesis-support",
      icon: <GraduationCap size={24} />,
      highlights: ["Topic & Synopsis Approval", "Data Analysis & Simulation", "Viva Mock Defense Prep"]
    },
    {
      id: "publication-support",
      category: "publication",
      badge: "Top Demand",
      title: "ASR Research Publication Support",
      desc: "End-to-end guidance to publish manuscripts in Scopus, SCI, Web of Science, IEEE, and high-impact journals with peer-review revision support.",
      link: "/services/research-publication-support",
      icon: <BookMarked size={24} />,
      highlights: ["Journal Match & Quartile Check", "Turnitin Plagiarism < 10%", "Reviewer Response Handling"]
    },
    {
      id: "book-publishing",
      category: "publication",
      badge: "Global Reach",
      title: "ASR Academic Book & Chapter Publishing",
      desc: "Transform your master's or doctoral research into authored monographs, edited volumes, and book chapters with recognized international ISBN registration.",
      link: "/services/book-chapter-publishing",
      icon: <BookOpen size={24} />,
      highlights: ["ISBN Indexing & DOI", "Scopus Book Series", "Global Royalty Distribution"]
    },
    {
      id: "patent-ip",
      category: "innovation",
      badge: "Govt Certified",
      title: "ASR Patent & IP Facilitation Services",
      desc: "Safeguard your inventions with patentability search, provisional/complete specification drafting, patent filing with Indian Patent Office (IPO) & PCT international filings.",
      link: "/services/patent-ip-facilitation",
      icon: <Lightbulb size={24} />,
      highlights: ["Patent Search & Analysis", "Provisional & Complete Filing", "Design & Copyright IP"]
    },
    {
      id: "startup-incubation",
      category: "innovation",
      badge: "Incubation",
      title: "ASR Innovation & Startup Incubation",
      desc: "Convert innovative academic research into viable deep-tech startups. Benefit from prototype validation, seed grant advice, and angel pitch preparation.",
      link: "/services/innovation-startup-incubation",
      icon: <Sparkles size={24} />,
      highlights: ["Proof of Concept (PoC)", "MSME & Startup India Filing", "Pitch Deck & Mentorship"]
    },
    {
      id: "grant-assistance",
      category: "funding",
      badge: "Research Grants",
      title: "ASR Funding & Research Grant Assistance",
      desc: "Draft highly competitive research proposals for DST, SERB, CSIR, ICMR, AICTE, and international bilateral research grants with budget compliance.",
      link: "/services/funding-grant-assistance",
      icon: <DollarSign size={24} />,
      highlights: ["Grant Call Alignment", "Budget Justification", "Institutional MoU Support"]
    },
    {
      id: "collaboration",
      category: "institution",
      badge: "Industry Linkage",
      title: "ASR Industry-Academic Collaboration",
      desc: "Bridge academic expertise with industry demand. Structure formal MoUs, collaborative R&D laboratories, and sponsored faculty consultancy assignments.",
      link: "/services/industry-academic-collaboration",
      icon: <Building2 size={24} />,
      highlights: ["Industry MoU Drafting", "Sponsored Research Projects", "Technology Transfer"]
    },
    {
      id: "conferences",
      category: "academic",
      badge: "International",
      title: "ASR Conference & Seminar Management",
      desc: "Turnkey event organization support for international academic conferences, technical workshops, symposiums, and Scopus-indexed proceedings.",
      link: "/services/conference-seminar-management",
      icon: <Users size={24} />,
      highlights: ["Scopus / WoS Proceedings", "CMT / EasyChair Setup", "Keynote Speaker Curation"]
    },
    {
      id: "faculty-development",
      category: "academic",
      badge: "FDP & Upskill",
      title: "ASR Faculty Development & Mentorship",
      desc: "Specialized training programs for educators covering AI in academic research, modern statistical tools (R, Python, SPSS, MATLAB), and pedagogical innovations.",
      link: "/services/faculty-development-mentorship",
      icon: <Award size={24} />,
      highlights: ["Hands-on Tools Training", "NAAC API Score Boost", "Govt Accredited Certificates"]
    },
    {
      id: "international-education",
      category: "academic",
      badge: "Study Abroad",
      title: "ASR International Education Services",
      desc: "Advisory services for overseas Master’s and Ph.D. admissions, scholarship applications, supervisor outreach, and international post-doc fellowships.",
      link: "/services/international-education-services",
      icon: <Globe size={24} />,
      highlights: ["SOP & Research Proposal", "Supervisor Match Worldwide", "Scholarship Guidance"]
    },
    {
      id: "internship-training",
      category: "academic",
      badge: "Skill & Career",
      title: "ASR Internship & Professional Skill Training",
      desc: "Hands-on virtual and in-person research internships designed to equip undergraduate and postgraduate students with industry-ready research tools.",
      link: "/services/internship-skill-training",
      icon: <Briefcase size={24} />,
      highlights: ["Live Project Mentorship", "Verified Experience Cert", "Technical Paper Drafting"]
    },
    {
      id: "student-projects",
      category: "academic",
      badge: "UG / PG Projects",
      title: "ASR Student Project Support Services",
      desc: "Full hardware, software, simulation, and algorithm implementation support for final-year engineering and postgraduate dissertations.",
      link: "/services/student-project-support",
      icon: <BookOpen size={24} />,
      highlights: ["Simulation & Code Support", "Plagiarism-Free Reports", "Project Presentation Prep"]
    },
    {
      id: "accreditation-ranking",
      category: "institution",
      badge: "NAAC & NIRF",
      title: "ASR Institutional Accreditation & Ranking",
      desc: "Comprehensive audit, documentation, and advisory services to boost NAAC grade, NIRF top 100 standing, NBA accreditation, and QS ranking metrics.",
      link: "/services/accreditation-ranking",
      icon: <ShieldCheck size={24} />,
      highlights: ["Criteria Gap Analysis", "SSR / SAR Documentation", "Research Metric Optimization"]
    },
    {
      id: "journal-management",
      category: "publication",
      badge: "OJS Hosting",
      title: "ASR Journal Management & OJS Hosting",
      desc: "Complete setup of Open Journal Systems (OJS), Crossref DOI assignment, editorial board formation, peer-review management, and indexation indexing.",
      link: "/services/journal-management-ojs",
      icon: <FileCheck size={24} />,
      highlights: ["Cloud OJS Hosting", "Crossref DOI & ISSN Setup", "Indexing in DOAJ & Scopus"]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Services (14)' },
    { id: 'academic', label: 'Academic & PhD Support' },
    { id: 'publication', label: 'Journals & Book Publishing' },
    { id: 'innovation', label: 'Patents & Startups' },
    { id: 'funding', label: 'Grants & Funding' },
    { id: 'institution', label: 'Institutional & Accreditation' }
  ];

  const filteredServices = serviceList.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="services-page">
      {/* 1. Hero Section */}
      <section className="services-hero-showcase">
        <div className="services-hero-glow"></div>
        <div className="services-hero-container">
          <div className="services-hero-badge">
            <Sparkles size={14} className="hero-sparkle" />
            <span>GLOBAL RESEARCH SERVICES DIRECTORY</span>
          </div>
          
          <h1 className="services-hero-heading">
            Complete Academic & Research <br />
            <span className="hero-text-accent">Support Under One Roof</span>
          </h1>

          <p className="services-hero-desc">
            From research idea and patent protection to Scopus indexation and institutional excellence — we deliver ethical, high-impact academic consultancy trusted across 50+ countries.
          </p>

          {/* Quick Metrics Bar */}
          <div className="services-hero-metrics">
            <div className="hero-metric-item">
              <span className="metric-val">15+</span>
              <span className="metric-lbl">Years of Excellence</span>
            </div>
            <div className="metric-divider"></div>
            <div className="hero-metric-item">
              <span className="metric-val">5,000+</span>
              <span className="metric-lbl">Publications Assisted</span>
            </div>
            <div className="metric-divider"></div>
            <div className="hero-metric-item">
              <span className="metric-val">100%</span>
              <span className="metric-lbl">Ethical Turnitin Quality</span>
            </div>
            <div className="metric-divider"></div>
            <div className="hero-metric-item">
              <span className="metric-val">ISO 9001</span>
              <span className="metric-lbl">Certified Standards</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Search & Category Filter Navigation */}
      <section className="services-filter-section">
        <div className="services-filter-container">
          {/* Category Tabs */}
          <div className="services-category-tabs">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="services-search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search service by keyword (e.g. Scopus, Thesis, Patent, Grant)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>
        </div>
      </section>

      {/* 3. Main Premium Services Grid */}
      <section className="services-directory-section">
        <div className="services-directory-container">
          <div className="directory-header-row">
            <div>
              <span className="directory-count">
                Showing <strong>{filteredServices.length}</strong> of {serviceList.length} specialized services
              </span>
            </div>
            <div className="directory-support-pill">
              <ShieldCheck size={14} /> MSME Registered & ISO Certified
            </div>
          </div>

          <div className="services-premium-grid">
            {filteredServices.map((svc) => (
              <div className="premium-service-card" key={svc.id}>
                {/* Top Badge */}
                <div className="card-top-row">
                  <div className="service-icon-pill">
                    {svc.icon}
                  </div>
                  <span className="service-badge-tag">{svc.badge}</span>
                </div>

                {/* Title & Desc */}
                <h3 className="service-card-title">{svc.title}</h3>
                <p className="service-card-desc">{svc.desc}</p>

                {/* Highlights List */}
                <div className="service-card-highlights">
                  {svc.highlights.map((h, i) => (
                    <div className="highlight-item" key={i}>
                      <CheckCircle2 size={14} className="highlight-check" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="service-card-footer">
                  <Link to={svc.link} className="btn-card-details">
                    <span>Learn Details</span>
                    <ArrowRight size={14} />
                  </Link>
                  <Link to="/contact" className="btn-card-inquire">
                    Apply Now ✎
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="services-empty-state">
              <p>No services matched your search term "{searchQuery}".</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="btn-reset-filter">
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. Why ASR Research Services (4 Pillars) */}
      <section className="services-pillars-section">
        <div className="services-pillars-container">
          <div className="pillars-header">
            <span className="pillars-pretitle">THE ASR ADVANTAGE</span>
            <h2 className="pillars-title">Why Researchers Trust Our Solutions</h2>
            <p className="pillars-desc">
              We uphold highest academic integrity, transparency, and technical precision for researchers worldwide.
            </p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-item-card">
              <div className="pillar-icon-box"><ShieldCheck size={26} /></div>
              <h4>100% Ethical & Plagiarism-Free</h4>
              <p>Turnitin verified reports with similarity strictly below 10%, fully compliant with UGC & international research standards.</p>
            </div>

            <div className="pillar-item-card">
              <div className="pillar-icon-box"><Users size={26} /></div>
              <h4>PhD Qualified Expert Mentors</h4>
              <p>Every paper and thesis is guided by subject matter specialists with doctorate degrees and proven citation records.</p>
            </div>

            <div className="pillar-item-card">
              <div className="pillar-icon-box"><Clock size={26} /></div>
              <h4>Strict Milestone Commitments</h4>
              <p>Transparent stage-wise timelines with consistent progress reports, ensuring no last-minute submission stress.</p>
            </div>

            <div className="pillar-item-card">
              <div className="pillar-icon-box"><Target size={26} /></div>
              <h4>End-to-End Handholding</h4>
              <p>Support continues until final journal indexation, revision closure, or university thesis acceptance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Contact Consultation Form Block */}
      <ContactBlock 
        title="Need Customized Academic Support?"
        subtitle="Speak directly with our senior research consultants for topic evaluation, journal selection, patent feasibility, and personalized pricing."
      />
    </div>
  );
};

export default Services;
