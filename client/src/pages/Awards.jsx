import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import awardsTrophyImg from '../assets/awards-feature.jpg';
import {
  Award,
  Crown,
  Building2,
  FileText,
  GraduationCap,
  FileCheck,
  Lightbulb,
  Cpu,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  Mail,
  Phone,
  Globe,
  ArrowRight,
  ShieldCheck,
  Search,
  Check,
  Trophy,
  Star
} from 'lucide-react';
import ContactBlock from '../components/ContactBlock';
import './Awards.css';

const awardsCatalogue = [
  {
    id: "lifetime-achievement",
    category: "honorary",
    badge: "HIGHEST HONOR",
    title: "Lifetime Achievement Award",
    desc: "The highest honor bestowed upon a visionary individual who has dedicated their career to the advancement of research and education.",
    eligibility: "Minimum 20+ years of experience in academia or research with a proven record of mentorship and leadership.",
    selection: "Invited nomination or Peer-nomination; evaluated by a Special Jury of Senior Professors and industry experts.",
    apply: "Submit a comprehensive CV and a 500-word statement highlighting long-term impact on the academic community.",
    icon: <Crown size={24} />
  },
  {
    id: "academic-leadership",
    category: "institutional",
    badge: "LEADERSHIP",
    title: "Academic Leadership Award",
    desc: "Recognizes administrators (Principals, HODs, Directors) who have transformed their institutions through strategic vision and leadership.",
    eligibility: "Individuals in administrative roles for at least 5 years with documented institutional improvements.",
    selection: "Analysis of institutional growth metrics, including accreditations, research output, and faculty development.",
    apply: "Submit an institutional endorsement letter alongside a report detailing leadership achievements and milestones.",
    icon: <Building2 size={24} />
  },
  {
    id: "best-paper",
    category: "research",
    badge: "RESEARCH PAPER",
    title: "Best Paper Award",
    desc: "Recognizes the author(s) of a research paper that demonstrates exceptional originality, methodological rigor, and contribution to the field.",
    eligibility: "Open to any researcher whose paper was published in a peer-reviewed journal or presented at a recognized conference in the last 12 months.",
    selection: "Double-blind review by technical experts focusing on innovation, impact factor, and scholarly depth.",
    apply: "Upload the published PDF of the paper and a link to the journal/conference indexing (Scopus, Web of Science, etc.).",
    icon: <FileText size={24} />
  },
  {
    id: "best-thesis",
    category: "research",
    badge: "DOCTORAL & MASTERS",
    title: "Best Thesis/Dissertation Award",
    desc: "Honoring doctoral or master's scholars for the most outstanding and original research work in their submitted thesis.",
    eligibility: "Candidates who have successfully defended their thesis within the last 24 months.",
    selection: "Evaluation based on the thesis abstract, external examiner reports, and societal/industrial relevance.",
    apply: "Submit the thesis abstract, viva-voce completion certificate, and a list of publications derived from the research.",
    icon: <GraduationCap size={24} />
  },
  {
    id: "outstanding-reviewer",
    category: "peer-review",
    badge: "PEER REVIEW",
    title: "Outstanding Reviewer Award",
    desc: "Recognizes the essential role of reviewers who maintain the quality of academic publishing through thorough and constructive peer review.",
    eligibility: "Active reviewers for reputable journals or international conferences.",
    selection: "Based on the volume, quality, and timeliness of reviews provided, verified by editorial boards.",
    apply: "Submit a record of peer-review activity (verified via Publons, ORCID, or editor certificates).",
    icon: <FileCheck size={24} />
  },
  {
    id: "innovation-patent",
    category: "innovation",
    badge: "PATENTS & TECH",
    title: "Innovation & Patent Award",
    desc: "Celebrates researchers who have successfully translated theoretical work into tangible assets like patents, software, or prototypes.",
    eligibility: "Individuals or teams who have filed or been granted a patent or developed a unique software solution in the last 3 years.",
    selection: "Assessment of the innovation's uniqueness, scalability, and commercial or social potential.",
    apply: "Submit patent filing/grant documents or a technical demo of the software/prototype.",
    icon: <Lightbulb size={24} />
  },
  {
    id: "emerging-scholar-ai",
    category: "innovation",
    badge: "AI & FUTURE TECH",
    title: "Emerging Scholar in AI & Future Tech",
    desc: "A specialized award for researchers working at the forefront of Generative AI, Machine Learning, and disruptive future technologies.",
    eligibility: "Researchers with at least two high-impact publications or significant projects in the AI and Future Tech domain.",
    selection: "Technical review of project code, datasets, or theoretical contributions by the AI Expert Committee.",
    apply: "Provide a project portfolio link (e.g., GitHub) and a brief summary of the specific AI contribution.",
    icon: <Cpu size={24} />
  },
  {
    id: "young-researcher",
    category: "research",
    badge: "UNDER 35",
    title: "Young Researcher Award",
    desc: "Encouraging early-career scholars who show exceptional promise and dedication to scientific inquiry.",
    eligibility: "Researchers or faculty members under the age of 35 at the time of nomination.",
    selection: "Based on the quality and frequency of research output relative to the number of years in the field.",
    apply: "Provide age proof, a comprehensive list of publications, and two letters of recommendation from senior faculty members.",
    icon: <Sparkles size={24} />
  },
  {
    id: "women-in-research",
    category: "honorary",
    badge: "WOMEN IN STEM",
    title: "Women in Research Excellence Award",
    desc: "Aimed at recognizing and promoting the achievements and leadership of female scholars across all disciplines.",
    eligibility: "Open to all female researchers and faculty members worldwide.",
    selection: "Holistic review of research achievements, community impact, and contributions to academic leadership.",
    apply: "Submit a professional biography, a portfolio of research contributions, and evidence of academic influence.",
    icon: <HeartHandshake size={24} />
  }
];

const Awards = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { id: 'all', label: 'All 9 Award Categories' },
    { id: 'research', label: 'Research & Publications' },
    { id: 'innovation', label: 'Innovation & AI' },
    { id: 'honorary', label: 'Lifetime & Women Scholars' },
    { id: 'institutional', label: 'Leadership' }
  ];

  const filteredAwards = awardsCatalogue.filter(award => {
    const matchesCategory = selectedCategory === 'all' || award.category === selectedCategory;
    const matchesSearch = award.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          award.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="awards-page">
      {/* 1. Hero Banner (Redesigned with Premium Royal Aura & Showcase Media Grid) */}
      <section className="awards-hero-showcase">
        <div className="awards-hero-glow"></div>
        <div className="awards-hero-container">
          <div className="awards-hero-badge">
            <Trophy size={14} className="hero-trophy-icon" />
            <span>GLOBAL SCHOLARLY RECOGNITION</span>
          </div>

          <h1 className="awards-hero-heading">
            Celebrating Academic Excellence & <br />
            <span className="hero-text-accent">Global Research Innovation</span>
          </h1>

          <p className="awards-hero-desc">
            ASR Academic Research Solutions proudly honors visionary scholars, educators, institutions, and innovators whose breakthrough discoveries drive academic leadership worldwide.
          </p>

          {/* Featured Trophy Card Frame */}
          <div className="awards-featured-image-wrapper">
            <div className="awards-image-frame">
              <img 
                src={awardsTrophyImg} 
                alt="Academic Excellence Trophy and Awards" 
                className="awards-trophy-photo" 
              />
              <div className="awards-image-overlay-caption">
                <span className="caption-gold">ASR Annual Academic Excellence Trophy & Citation</span>
                <span className="caption-sub">Recognized Across 50+ Global Universities</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="awards-hero-metrics">
            <div className="hero-metric-item">
              <span className="metric-val">9</span>
              <span className="metric-lbl">Prestigious Categories</span>
            </div>
            <div className="metric-divider"></div>
            <div className="hero-metric-item">
              <span className="metric-val">500+</span>
              <span className="metric-lbl">Awardees Honored</span>
            </div>
            <div className="metric-divider"></div>
            <div className="hero-metric-item">
              <span className="metric-val">100%</span>
              <span className="metric-lbl">Jury Peer-Evaluated</span>
            </div>
            <div className="metric-divider"></div>
            <div className="hero-metric-item">
              <span className="metric-val">ISO 9001</span>
              <span className="metric-lbl">Certified Program</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Search & Category Filter Navigation */}
      <section className="awards-filter-section">
        <div className="awards-filter-container">
          <div className="awards-filter-tabs">
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                className={`award-filter-btn ${selectedCategory === tab.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="awards-search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search awards by keyword (e.g. Young, Paper, AI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>
        </div>
      </section>

      {/* 3. All 9 Prestigious Awards Grid */}
      <section className="awards-list-wrapper">
        <div className="awards-directory-container">
          <div className="awards-directory-header-row">
            <div>
              <span className="awards-count-text">
                Showing <strong>{filteredAwards.length}</strong> of {awardsCatalogue.length} award honors
              </span>
            </div>
            <div className="awards-guarantee-pill">
              <ShieldCheck size={14} /> Open to Worldwide Researchers & Faculty
            </div>
          </div>

          <div className="awards-premium-grid">
            {filteredAwards.map((award) => (
              <div className="award-item-card" key={award.id}>
                {/* Top Badge */}
                <div className="award-card-top-bar">
                  <div className="award-icon-box">
                    {award.icon}
                  </div>
                  <span className="award-badge-tag">{award.badge}</span>
                </div>

                <h3 className="award-title">{award.title}</h3>
                <p className="award-desc">{award.desc}</p>

                {/* Structured Metadata Box */}
                <div className="award-details-list">
                  <div className="award-meta-row">
                    <span className="meta-label">Eligibility:</span>
                    <span className="meta-text">{award.eligibility}</span>
                  </div>
                  <div className="award-meta-row">
                    <span className="meta-label">Selection:</span>
                    <span className="meta-text">{award.selection}</span>
                  </div>
                  <div className="award-meta-row">
                    <span className="meta-label">How to Apply:</span>
                    <span className="meta-text">{award.apply}</span>
                  </div>
                </div>

                {/* Nominate Action */}
                <div className="award-card-action">
                  <Link to="/contact" className="btn-award-nominate">
                    <span>Nominate for Award</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredAwards.length === 0 && (
            <div className="awards-empty-state">
              <p>No award category matched "{searchQuery}".</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="btn-reset-filter">
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. How to Apply & Important Notes */}
      <section className="how-to-apply-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pretitle">SUBMISSION GUIDELINES</span>
            <h2 className="section-title">How to Apply for Recognition</h2>
            <p className="section-desc">Follow these 3 easy steps to complete your award nomination package.</p>
          </div>

          <div className="apply-steps-grid">
            <div className="apply-step-box">
              <div className="apply-step-num">1</div>
              <h4>Documentation</h4>
              <p>Prepare all required documents (CV, Proof of Eligibility, Project Reports, or Certificates) in clear PDF format.</p>
            </div>

            <div className="apply-step-box">
              <div className="apply-step-num">2</div>
              <h4>Subject Line</h4>
              <p>Clearly mention the Award Category you are applying for in the subject line of your email (e.g., Application for Young Researcher Award - [Your Name]).</p>
            </div>

            <div className="apply-step-box">
              <div className="apply-step-num">3</div>
              <h4>Submission</h4>
              <p>Send your complete application package to our official correspondence channels for expedited verification.</p>
            </div>
          </div>

          <div className="submission-notes-grid">
            {/* Contact Details for Submission */}
            <div className="submission-channels-card">
              <h3>Contact Details for Submission</h3>
              <div className="submission-contacts-list">
                <div className="sub-contact-item">
                  <Mail size={18} color="#2563eb" />
                  <a href="mailto:support@asracademicresearch.com">support@asracademicresearch.com</a>
                </div>
                <div className="sub-contact-item">
                  <Phone size={18} color="#2563eb" />
                  <a href="tel:+919515207724">+91 9515207724</a>
                </div>
                <div className="sub-contact-item">
                  <Globe size={18} color="#2563eb" />
                  <a href="https://www.asracademicresearch.com" target="_blank" rel="noopener noreferrer">www.asracademicresearch.com</a>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="important-notes-card">
              <h3>Important Notes</h3>
              <ul className="important-notes-list">
                <li>
                  <strong>Membership ID: </strong>If you are a registered member, please include your Membership ID in the email body for priority processing.
                </li>
                <li>
                  <strong>Deadline: </strong>Ensure all submissions reach us before the announced closing date for the current academic cycle.
                </li>
                <li>
                  <strong>Confirmation: </strong>You will receive an acknowledgment confirmation within 48-72 working hours.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Embedded Regional Contact Section */}
      <ContactBlock 
        title="Need Guidance on Award Nomination?" 
        subtitle="Speak with our awards secretariat for nomination eligibility, documentation formats, and jury evaluation guidelines."
        defaultService="Other" 
      />
    </div>
  );
};

export default Awards;
