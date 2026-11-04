import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import PartnerCarousel from '../components/PartnerCarousel';
import IsoCertification from '../components/IsoCertification';
import aboutCollabImg from '../assets/about-collaboration.jpg';
import {
  Award,
  Users,
  Globe,
  BookOpen,
  CheckCircle,
  Clock,
  ShieldCheck,
  Building2,
  FileCheck,
  ArrowRight,
  TrendingUp,
  Target,
  Zap,
  DollarSign,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  MessageCircle,
  Sparkles,
  Search,
  BookMarked,
  Lightbulb,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import './Home.css';

const Home = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const faqs = [
    {
      q: "How do I publish a research paper in a Scopus-indexed journal from scratch?",
      a: "Step-by-step roadmap: Publishing in Scopus requires strategic planning. Start by identifying a genuine research gap via literature review (use Scopus, Web of Science). Then structure your manuscript: abstract, introduction, methodology, results, discussion, and references — adhering to journal guidelines. Select 3–5 target journals using Scopus Sources or Elsevier's Journal Finder. Check CiteScore, SJR, and acceptance rates. Our team provides end-to-end support including journal matching, Turnitin plagiarism check, and structural editing."
    },
    {
      q: "What are the top reasons research papers get rejected, and how can I avoid them?",
      a: "The most frequent reasons include mismatch with the journal's aims and scope, high similarity/plagiarism index, weak literature review, unclear research gap, insufficient empirical validation, or poor academic English phrasing. We address all of these prior to submission through pre-peer reviews, language polishing, and precise journal alignment."
    },
    {
      q: "How to write a Ph.D. thesis efficiently without getting overwhelmed?",
      a: "Deconstruct your thesis into structured milestones: Topic selection & Synopsis -> Comprehensive Literature Review -> Methodology & Experimental Design -> Data Analysis & Results -> Discussion & Conclusion -> Formatting & Viva preparation. Working with our Ph.D. mentors gives you dedicated weekly timelines and expert review at every milestone."
    },
    {
      q: "What is the step-by-step process to file a patent in India for a researcher or startup?",
      a: "1. Conduct a comprehensive prior-art search to establish novelty. 2. Draft provisional or complete patent specification with precise technical claims. 3. File Form 1, Form 2, Form 3, and Form 5 with the Indian Patent Office (IPO). 4. Request for publication (Form 9 or standard 18-month route). 5. File Request for Examination (Form 18). 6. Respond to First Examination Report (FER) and attend hearing until grant. Our certified patent agents manage the entire lifecycle."
    },
    {
      q: "How do I select the right journal and avoid predatory / fake journals?",
      a: "Always verify indexing directly on Scopus.com, Web of Science Master Journal List, or official UGC-CARE portals rather than relying solely on journal websites. Watch out for unrealistically short review cycles (e.g. 24-48 hours), lack of editorial board details, or unexpected acceptance fees. Our team validates every journal against active indexing databases before submission."
    },
    {
      q: "How can I reduce plagiarism in my research paper while keeping originality?",
      a: "Plagiarism reduction requires paraphrasing with conceptual depth, synthesizing multiple references rather than quoting whole sentences, citing primary sources correctly, and utilizing mathematical/algorithmic formulations where appropriate. We test through official Turnitin screening to ensure similarity stays strictly under acceptable journal thresholds (<10%)."
    },
    {
      q: "Which research funding opportunities exist in India and how to write a winning grant proposal?",
      a: "Major funding schemes include DST-SERB (CRG, SRG, TARE), CSIR, DBT, ICSSR, and AICTE grants. A winning grant proposal requires a compelling problem statement aligned with national priorities, rigorous methodology, measurable outcomes, realistic budget breakdowns, and demonstrated institutional capability. We assist in full proposal preparation."
    },
    {
      q: "What support do you offer for thesis, publication, and patent? Is it confidential?",
      a: "We offer end-to-end research consultation including topic refinement, experimental validation, implementation, manuscript drafting, journal submission, and IP filing. Yes, 100% confidentiality is guaranteed through Non-Disclosure Agreements (NDA) and strict data protection policies."
    }
  ];

  return (
    <div className="home-page-container">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* Indexing Partners Infinite Ticker Carousel */}
      <PartnerCarousel />

      {/* 2. STATS & CREDENTIALS BAR */}
      <section className="stats-bar-section">
        <div className="stats-grid">
          <div className="stat-item">
            <Clock size={28} className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Exp.</span>
            </div>
          </div>

          <div className="stat-item">
            <Users size={28} className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">2,000+</span>
              <span className="stat-label">Clients</span>
            </div>
          </div>

          <div className="stat-item">
            <Globe size={28} className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">50+</span>
              <span className="stat-label">Countries</span>
            </div>
          </div>

          <div className="stat-item">
            <BookOpen size={28} className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">5,000+</span>
              <span className="stat-label">Publications</span>
            </div>
          </div>

          <div className="stat-item">
            <ShieldCheck size={28} className="stat-icon" />
            <div className="stat-content">
              <span className="stat-number">100%</span>
              <span className="stat-label">Ethical</span>
            </div>
          </div>
        </div>

        <div className="stats-subbar">
          <span className="subbar-badge">24/7 Assistance</span>
          <span className="subbar-badge">MSME Registered</span>
          <span className="subbar-badge">PhD Expert Team</span>
          <span className="subbar-badge">Scopus & SCI Support</span>
          <span className="subbar-badge">Quality Certification</span>
        </div>
      </section>


      {/* 3. ISO 9001:2015 QUALITY CERTIFICATION (Matching Reference Screenshot) */}
      <IsoCertification />

      {/* 4. VISION & MISSION */}
      <section className="section-wrapper vision-mission-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pretitle">QUALITY-DRIVEN FOUNDATION</span>
            <h2 className="section-title">Vision & Mission</h2>
            <p className="section-desc">
              Guiding principles that drive research innovation and academic excellence worldwide.
            </p>
          </div>

          <div className="vm-cards-grid">
            {/* Vision */}
            <div className="vm-card">
              <div className="vm-card-header">
                <div className="vm-icon-box">
                  <Target size={26} />
                </div>
                <h3>Vision</h3>
              </div>
              <p>
                To become a globally recognized leader in academic research, innovation support, and knowledge services by empowering students, researchers, and institutions to achieve excellence, create impact, and contribute to society through high-quality research and innovation.
              </p>
            </div>

            {/* Mission */}
            <div className="vm-card">
              <div className="vm-card-header">
                <div className="vm-icon-box">
                  <TrendingUp size={26} />
                </div>
                <h3>Mission</h3>
              </div>
              <p>
                At ASR Academic Research Solutions, our mission is to deliver reliable, ethical, and high-quality academic and research services that support every stage of the research ecosystem:
              </p>
              <ul className="mission-checklist">
                <li>
                  <CheckCircle size={16} className="check-icon" />
                  <span>Provide end-to-end support for PhD scholars, researchers, and academic institutions</span>
                </li>
                <li>
                  <CheckCircle size={16} className="check-icon" />
                  <span>Ensure quality-driven research, publication, and thesis development services aligned with international standards</span>
                </li>
                <li>
                  <CheckCircle size={16} className="check-icon" />
                  <span>Facilitate innovation through patent support, intellectual property services, and startup guidance</span>
                </li>
                <li>
                  <CheckCircle size={16} className="check-icon" />
                  <span>Promote strong academic collaborations and knowledge-sharing platforms</span>
                </li>
                <li>
                  <CheckCircle size={16} className="check-icon" />
                  <span>Continuously improve our processes in line with ISO 9001:2015 standards to ensure consistency, transparency, and client satisfaction</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT PREVIEW (Matching Reference Design) */}
      <section className="section-wrapper about-preview-section">
        <div className="section-container">
          <div className="about-preview-grid">
            <div className="about-preview-left">
              <span className="about-pretitle-pill">ABOUT ASR RESEARCH SOLUTIONS</span>
              <h2 className="about-preview-heading">
                Empowering Research.<br />
                Enabling <span className="text-highlight">Global Success.</span>
              </h2>
              <p className="about-preview-description">
                ASR Academic Research Solutions is a premier MSME-registered organization under the Government of India with over 15 years of excellence in academic consultancy. We guide Ph.D. scholars, researchers, and faculty members through every step of their academic journey with integrity and global standards.
              </p>

              <div className="about-feature-bullets">
                <div className="about-bullet"><CheckCircle size={17} className="check-icon-blue" /> <span>End-to-End Research Support</span></div>
                <div className="about-bullet"><CheckCircle size={17} className="check-icon-blue" /> <span>Scopus & SCI Publication</span></div>
                <div className="about-bullet"><CheckCircle size={17} className="check-icon-blue" /> <span>Patent & Innovation Filing</span></div>
                <div className="about-bullet"><CheckCircle size={17} className="check-icon-blue" /> <span>Global Academic Network</span></div>
                <div className="about-bullet"><CheckCircle size={17} className="check-icon-blue" /> <span>Confidential & Ethical Services</span></div>
                <div className="about-bullet"><CheckCircle size={17} className="check-icon-blue" /> <span>Expert PhD Mentorship</span></div>
              </div>

              <div className="about-btn-group">
                <Link to="/services" className="about-btn-primary">
                  Explore Services
                </Link>
                <Link to="/contact" className="about-btn-outline">
                  Free Consultation
                </Link>
              </div>
            </div>

            <div className="about-preview-image-box">
              <div className="about-image-card-frame">
                <img 
                  src={aboutCollabImg} 
                  alt="Scholars collaborating on research" 
                  className="about-collaboration-img" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE ASR */}
      <section className="section-wrapper why-choose-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pretitle">WHY CHOOSE ASR</span>
            <h2 className="section-title">Your Trusted Partner for Academic Success & Research Excellence</h2>
            <p className="section-desc">
              We go beyond basic consultancy — delivering structured, ethical, and result-driven academic support that helps researchers achieve global recognition.
            </p>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon-box"><Clock size={22} /></div>
              <h4>15+ Years of Expertise</h4>
              <p>Proven experience in guiding scholars, researchers, and institutions across diverse domains.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-box"><BookOpen size={22} /></div>
              <h4>End-to-End Academic Support</h4>
              <p>From Ph.D. thesis to publication, patents, and innovation — everything under one roof.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-box"><Award size={22} /></div>
              <h4>Scopus & SCI Publication Support</h4>
              <p>Expert guidance for publishing in high-impact international journals.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-box"><Users size={22} /></div>
              <h4>Expert Mentorship</h4>
              <p>Work with experienced professors, researchers, and industry professionals.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-box"><ShieldCheck size={22} /></div>
              <h4>100% Confidential & Ethical Services</h4>
              <p>Strict adherence to academic integrity, data protection, and originality.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-box"><Zap size={22} /></div>
              <h4>Fast Track Solutions Available</h4>
              <p>Accelerated support options for urgent research and publication needs.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-box"><Globe size={22} /></div>
              <h4>Global Client Reach</h4>
              <p>Serving researchers and institutions across 50+ countries worldwide.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-box"><DollarSign size={22} /></div>
              <h4>Affordable & Transparent Pricing</h4>
              <p>Clear pricing structure with no hidden costs and staged milestone deliveries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ALL SERVICES GRID (Matching Reference Design) */}
      <section className="section-wrapper services-section" id="services">
        <div className="section-container">
          <div className="section-header services-top-header">
            <div className="services-pretitle-pill">
              <Sparkles size={13} className="pill-sparkle-icon" />
              <span>OUR SERVICES</span>
            </div>
            <h2 className="services-main-title">
              Complete Academic & Research<br />
              <span className="services-title-accent">Support Under One Roof</span>
            </h2>
            <p className="services-subtitle-desc">
              From research idea to global recognition — we provide end-to-end academic services tailored for students, researchers, faculty, and institutions.
            </p>
          </div>

          <div className="services-cards-grid">
            {/* Service 1 */}
            <div className="service-item-card">
              <div className="service-card-icon-soft">
                <GraduationCap size={22} />
              </div>
              <h3>ASR Ph.D. Thesis Support Services</h3>
              <p>Complete assistance from topic selection to final submission and viva preparation.</p>
              <div className="service-card-actions">
                <Link to="/services/phd-thesis-support" className="btn-service-learn">
                  Learn More &rarr;
                </Link>
                <Link to="/contact" className="btn-service-apply">
                  Apply Now &#x270E;
                </Link>
              </div>
            </div>

            {/* Service 2 */}
            <div className="service-item-card">
              <div className="service-card-icon-soft">
                <FileCheck size={22} />
              </div>
              <h3>ASR Research Publication Support</h3>
              <p>Publish in Scopus, SCI, and high-impact journals with expert guidance.</p>
              <div className="service-card-actions">
                <Link to="/services/research-publication-support" className="btn-service-learn">
                  Learn More &rarr;
                </Link>
                <Link to="/contact" className="btn-service-apply">
                  Apply Now &#x270E;
                </Link>
              </div>
            </div>

            {/* Service 3 */}
            <div className="service-item-card">
              <div className="service-card-icon-soft">
                <BookOpen size={22} />
              </div>
              <h3>ASR Academic Book & Chapter Publishing</h3>
              <p>Transform research into published books and global academic content.</p>
              <div className="service-card-actions">
                <Link to="/services/academic-book-publishing" className="btn-service-learn">
                  Learn More &rarr;
                </Link>
                <Link to="/contact" className="btn-service-apply">
                  Apply Now &#x270E;
                </Link>
              </div>
            </div>

            {/* Service 4 */}
            <div className="service-item-card">
              <div className="service-card-icon-soft">
                <Lightbulb size={22} />
              </div>
              <h3>ASR Patent & IP Facilitation Services</h3>
              <p>Protect your inventions, copyrights, and intellectual property with licensed patent attorneys.</p>
              <div className="service-card-actions">
                <Link to="/services/patent-ip-facilitation" className="btn-service-learn">
                  Learn More &rarr;
                </Link>
                <Link to="/contact" className="btn-service-apply">
                  Apply Now &#x270E;
                </Link>
              </div>
            </div>

            {/* Service 5 */}
            <div className="service-item-card">
              <div className="service-card-icon-soft">
                <Zap size={22} />
              </div>
              <h3>ASR Innovation & Startup Incubation</h3>
              <p>Turn academic research into commercial startup ventures with seed mentorship.</p>
              <div className="service-card-actions">
                <Link to="/services/innovation-startup-incubation" className="btn-service-learn">
                  Learn More &rarr;
                </Link>
                <Link to="/contact" className="btn-service-apply">
                  Apply Now &#x270E;
                </Link>
              </div>
            </div>

            {/* Service 6 */}
            <div className="service-item-card">
              <div className="service-card-icon-soft">
                <DollarSign size={22} />
              </div>
              <h3>ASR Funding & Research Grant Assistance</h3>
              <p>Draft winning grant proposals for DST, SERB, CSIR, ICSSR, and international research funding bodies.</p>
              <div className="service-card-actions">
                <Link to="/services/funding-research-grant" className="btn-service-learn">
                  Learn More &rarr;
                </Link>
                <Link to="/contact" className="btn-service-apply">
                  Apply Now &#x270E;
                </Link>
              </div>
            </div>

            {/* Service 7 */}
            <div className="service-item-card">
              <div className="service-card-icon-soft">
                <Building2 size={22} />
              </div>
              <h3>ASR Industry-Academic Collaboration</h3>
              <p>Bridge the gap between institutional research labs and corporate industry solutions.</p>
              <div className="service-card-actions">
                <Link to="/services/industry-academic-collaboration" className="btn-service-learn">
                  Learn More &rarr;
                </Link>
                <Link to="/contact" className="btn-service-apply">
                  Apply Now &#x270E;
                </Link>
              </div>
            </div>

            {/* Service 8 */}
            <div className="service-item-card">
              <div className="service-card-icon-soft">
                <Users size={22} />
              </div>
              <h3>ASR Conference & Seminar Management</h3>
              <p>Organize international academic conferences with Scopus-indexed proceedings support.</p>
              <div className="service-card-actions">
                <Link to="/services/conference-seminar-management" className="btn-service-learn">
                  Learn More &rarr;
                </Link>
                <Link to="/contact" className="btn-service-apply">
                  Apply Now &#x270E;
                </Link>
              </div>
            </div>

            {/* Service 9 */}
            <div className="service-item-card">
              <div className="service-card-icon-soft">
                <Award size={22} />
              </div>
              <h3>ASR Faculty Development & Mentorship</h3>
              <p>Skill development FDP programs empowering professors and researchers in cutting-edge tools.</p>
              <div className="service-card-actions">
                <Link to="/services/faculty-development-mentorship" className="btn-service-learn">
                  Learn More &rarr;
                </Link>
                <Link to="/contact" className="btn-service-apply">
                  Apply Now &#x270E;
                </Link>
              </div>
            </div>

            {/* Service 10 */}
            <div className="service-item-card">
              <div className="service-card-icon-soft">
                <Globe size={22} />
              </div>
              <h3>ASR International Education Services</h3>
              <p>Study abroad and global PhD assistance connecting scholars with top worldwide universities.</p>
              <div className="service-card-actions">
                <Link to="/services/international-education" className="btn-service-learn">
                  Learn More &rarr;
                </Link>
                <Link to="/contact" className="btn-service-apply">
                  Apply Now &#x270E;
                </Link>
              </div>
            </div>

            {/* Service 11 */}
            <div className="service-item-card">
              <div className="service-card-icon-soft">
                <Briefcase size={22} />
              </div>
              <h3>ASR Internship & Professional Skill Training</h3>
              <p>Hands-on internships and research training certificates for ambitious postgraduate students.</p>
              <div className="service-card-actions">
                <Link to="/services/internship-skill-training" className="btn-service-learn">
                  Learn More &rarr;
                </Link>
                <Link to="/contact" className="btn-service-apply">
                  Apply Now &#x270E;
                </Link>
              </div>
            </div>

            {/* Service 12 */}
            <div className="service-item-card">
              <div className="service-card-icon-soft">
                <BookMarked size={22} />
              </div>
              <h3>ASR Student Project Support Services</h3>
              <p>Complete hardware, simulation, and software coding support for B.Tech, M.Tech, and MSc dissertations.</p>
              <div className="service-card-actions">
                <Link to="/services/student-project-support" className="btn-service-learn">
                  Learn More &rarr;
                </Link>
                <Link to="/contact" className="btn-service-apply">
                  Apply Now &#x270E;
                </Link>
              </div>
            </div>

            {/* Service 13 */}
            <div className="service-item-card">
              <div className="service-card-icon-soft">
                <Award size={22} />
              </div>
              <h3>ASR Institutional Accreditation & Ranking</h3>
              <p>Expert consulting for NAAC grading, NIRF rankings, NBA accreditation, and QS rating improvements.</p>
              <div className="service-card-actions">
                <Link to="/services/institutional-accreditation" className="btn-service-learn">
                  Learn More &rarr;
                </Link>
                <Link to="/contact" className="btn-service-apply">
                  Apply Now &#x270E;
                </Link>
              </div>
            </div>

            {/* Service 14 */}
            <div className="service-item-card">
              <div className="service-card-icon-soft">
                <FileCheck size={22} />
              </div>
              <h3>ASR Journal Management & OJS Hosting</h3>
              <p>Turnkey Open Journal Systems setup, DOI assignment, Crossref registration, and editorial indexation.</p>
              <div className="service-card-actions">
                <Link to="/services/journal-management-ojs" className="btn-service-learn">
                  Learn More &rarr;
                </Link>
                <Link to="/contact" className="btn-service-apply">
                  Apply Now &#x270E;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. OUR PROCESS */}
      <section className="section-wrapper process-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pretitle">OUR SIMPLE METHODOLOGY</span>
            <h2 className="section-title" style={{ color: '#fff' }}>A Simple & Structured Path to Academic Success</h2>
            <p className="section-desc" style={{ color: '#94a3b8' }}>
              We follow a clear, step-by-step process to ensure your research journey is smooth, transparent, and result-driven.
            </p>
          </div>

          <div className="process-steps-row">
            <div className="process-step-card">
              <div className="step-number">1</div>
              <h4>Submit Requirement</h4>
              <p>Share your research needs, topic, or service requirement with our team.</p>
            </div>

            <div className="process-step-card">
              <div className="step-number">2</div>
              <h4>Free Consultation</h4>
              <p>Our experts analyze your needs and guide you with the best approach.</p>
            </div>

            <div className="process-step-card">
              <div className="step-number">3</div>
              <h4>Planning & Execution</h4>
              <p>A structured plan is created and our team begins working with expertise.</p>
            </div>

            <div className="process-step-card">
              <div className="step-number">4</div>
              <h4>Review & Quality Check</h4>
              <p>Strict quality checks, plagiarism validation, and expert review.</p>
            </div>

            <div className="process-step-card">
              <div className="step-number">5</div>
              <h4>Final Delivery</h4>
              <p>Receive your final output with support until your academic success.</p>
            </div>
          </div>

          <div className="process-features-bar">
            <div className="proc-feat"><CheckCircle size={18} /> Transparent Process</div>
            <div className="proc-feat"><CheckCircle size={18} /> Timely Delivery</div>
            <div className="proc-feat"><CheckCircle size={18} /> Expert Supervision</div>
            <div className="proc-feat"><CheckCircle size={18} /> 100% Confidential</div>
          </div>
        </div>
      </section>

      {/* 9. OUR IMPACT (Matching Reference Design) */}
      <section className="section-wrapper impact-showcase-section">
        <div className="section-container">
          <div className="section-header impact-top-header">
            <div className="impact-pretitle-pill">
              <span>OUR IMPACT</span>
            </div>
            <h2 className="impact-main-title">
              Turning Research Efforts Into<br />
              <span className="impact-title-accent">Measurable Success</span>
            </h2>
            <p className="impact-subtitle-desc">
              We don't just provide services — we deliver outcomes that enhance academic careers, institutional growth, and global recognition.
            </p>
          </div>

          <div className="impact-cards-row">
            {/* Card 1: Faster Research Completion */}
            <div className="impact-feature-card">
              <div className="impact-icon-round-box">
                <Zap size={24} className="impact-feature-icon" />
              </div>
              <h3 className="impact-card-title">Faster Research<br />Completion</h3>
              <p className="impact-card-desc">
                Streamlined processes and expert guidance help you complete your research efficiently without delays.
              </p>
            </div>

            {/* Card 2: Higher Publication Success */}
            <div className="impact-feature-card">
              <div className="impact-icon-round-box">
                <TrendingUp size={24} className="impact-feature-icon" />
              </div>
              <h3 className="impact-card-title">Higher Publication Success</h3>
              <p className="impact-card-desc">
                Increase your chances of acceptance in Scopus, SCI, and other high-impact international journals.
              </p>
            </div>

            {/* Card 3: Stronger Academic Profile */}
            <div className="impact-feature-card">
              <div className="impact-icon-round-box">
                <Award size={24} className="impact-feature-icon" />
              </div>
              <h3 className="impact-card-title">Stronger Academic Profile</h3>
              <p className="impact-card-desc">
                Build global credibility with quality publications, recognized patents, and professional certifications.
              </p>
            </div>
          </div>

          <div className="impact-metrics-row">
            <div className="impact-metric">
              <h3>1000+</h3>
              <p>Projects Delivered</p>
            </div>
            <div className="impact-metric">
              <h3>5000+</h3>
              <p>Publications Supported</p>
            </div>
            <div className="impact-metric">
              <h3>50+</h3>
              <p>Countries Served</p>
            </div>
            <div className="impact-metric">
              <h3>15+</h3>
              <p>Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. WHO WE SERVE */}
      <section className="section-wrapper who-we-serve-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pretitle">OUR AUDIENCE</span>
            <h2 className="section-title">Supporting Every Stage of the Academic & Research Ecosystem</h2>
            <p className="section-desc">
              Our services are designed to cater to a wide range of users — from individual scholars to global institutions.
            </p>
          </div>

          <div className="audience-grid">
            <div className="audience-card">
              <div className="audience-icon"><GraduationCap size={22} /></div>
              <h4>Ph.D. Scholars</h4>
              <p>Complete thesis support, methodology guidance & viva preparation.</p>
            </div>

            <div className="audience-card">
              <div className="audience-icon"><BookMarked size={22} /></div>
              <h4>Researchers & Authors</h4>
              <p>Expert help for Scopus, SCI, and high-impact journal publications.</p>
            </div>

            <div className="audience-card">
              <div className="audience-icon"><Award size={22} /></div>
              <h4>Faculty & Academicians</h4>
              <p>Boost research output, publications & professional career growth.</p>
            </div>

            <div className="audience-card">
              <div className="audience-icon"><Building2 size={22} /></div>
              <h4>Colleges & Universities</h4>
              <p>Accreditation, ranking, research development & institutional support.</p>
            </div>

            <div className="audience-card">
              <div className="audience-icon"><Lightbulb size={22} /></div>
              <h4>Innovators & Startups</h4>
              <p>Patents, prototypes, and turning ideas into scalable ventures.</p>
            </div>

            <div className="audience-card">
              <div className="audience-icon"><Briefcase size={22} /></div>
              <h4>Industry Professionals</h4>
              <p>Bridging academic research with real-world industry applications.</p>
            </div>

            <div className="audience-card">
              <div className="audience-icon"><Users size={22} /></div>
              <h4>Students (UG / PG)</h4>
              <p>Project guidance, internships, and skill development programs.</p>
            </div>

            <div className="audience-card">
              <div className="audience-icon"><Globe size={22} /></div>
              <h4>International Applicants</h4>
              <p>Global education, research collaborations & cross-border opportunities.</p>
            </div>
          </div>

          <div className="domains-box">
            <h4>Specialized Research Domains</h4>
            <div className="domains-tags">
              <span className="domain-tag">Engineering & Technology</span>
              <span className="domain-tag">Management & Business</span>
              <span className="domain-tag">Medical & Life Sciences</span>
              <span className="domain-tag">Data Science & AI</span>
              <span className="domain-tag">Social Sciences</span>
              <span className="domain-tag">Interdisciplinary Research</span>
            </div>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px' }}>
              No matter your background — we have the right solution for you.
            </p>
            <div className="btn-group" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn-primary">Free Consultation</Link>
              <a href="https://wa.me/919515207724" target="_blank" rel="noopener noreferrer" className="btn-outline">Talk to Expert</a>
            </div>
          </div>
        </div>
      </section>

      {/* 11. JOURNALS TEASER */}
      <section className="section-wrapper journals-teaser-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pretitle">JOURNALS & PUBLICATION</span>
            <h2 className="section-title">Publish in Globally Recognized Journals</h2>
            <p className="section-desc">
              We provide expert guidance and end-to-end support to help researchers publish in high-impact, indexed journals including SCI, Scopus, and peer-reviewed international platforms.
            </p>
          </div>

          <div className="journals-split-grid">
            <div className="journal-teaser-card sci">
              <h3>SCI Journals</h3>
              <p>Publish in Science Citation Index journals with high impact and global recognition.</p>
              <ul className="journal-perks">
                <li><CheckCircle size={16} className="check-icon" /> High Impact Factor</li>
                <li><CheckCircle size={16} className="check-icon" /> Web of Science Indexed</li>
                <li><CheckCircle size={16} className="check-icon" /> Strong Credibility</li>
                <li><CheckCircle size={16} className="check-icon" /> Global Visibility</li>
              </ul>
              <div className="service-card-actions">
                <Link to="/journals" className="btn-card-learn">View SCI</Link>
                <Link to="/contact" className="btn-card-apply">Apply Now</Link>
              </div>
            </div>

            <div className="journal-teaser-card scopus">
              <h3>Scopus Journals</h3>
              <p>Enhance your academic profile with Scopus indexed publications.</p>
              <ul className="journal-perks">
                <li><CheckCircle size={16} className="check-icon" /> Widely Recognized</li>
                <li><CheckCircle size={16} className="check-icon" /> Faster Review Options</li>
                <li><CheckCircle size={16} className="check-icon" /> Promotion Friendly</li>
                <li><CheckCircle size={16} className="check-icon" /> Broad Coverage</li>
              </ul>
              <div className="service-card-actions">
                <Link to="/journals" className="btn-card-learn">View Scopus</Link>
                <Link to="/contact" className="btn-card-apply">Apply Now</Link>
              </div>
            </div>
          </div>

          <div className="domains-box" style={{ background: '#f8fafc' }}>
            <div className="domains-tags">
              <span className="domain-tag">Journal Selection Assistance</span>
              <span className="domain-tag">Manuscript Editing</span>
              <span className="domain-tag">Plagiarism Check (&lt;10%)</span>
              <span className="domain-tag">Reviewer Support</span>
              <span className="domain-tag">Fast Track Options</span>
            </div>
            <p style={{ fontWeight: 600, color: '#0f172a' }}>
              5000+ Publications | 1000+ Researchers | High Success Rate
            </p>
          </div>
        </div>
      </section>

      {/* 12. MEMBERSHIP SHOWCASE (All 5 Tiers + 4-Step Application Roadmap) */}
      <section className="section-wrapper membership-showcase-section">
        <div className="section-container">
          <div className="section-header membership-top-header">
            <div className="membership-pretitle-pill">
              <Users size={13} className="pill-user-icon" />
              <span>JOIN THE COMMUNITY</span>
            </div>
            <h2 className="membership-main-title">
              Membership <span className="title-accent">Programs</span>
            </h2>
            <p className="membership-subtitle-desc">
              Join the ASR Academic Community & Elevate Your Research Journey with exclusive perks.
            </p>
          </div>

          {/* 5 Membership Tier Cards Grid */}
          <div className="membership-cards-grid-five">
            {/* 1. Student Membership */}
            <div className="membership-tier-card tier-student">
              <div className="tier-badge-pill">STUDENT TIER</div>
              <div className="tier-icon-wrap">
                <GraduationCap size={26} />
              </div>
              <h3 className="tier-title">Student Membership</h3>
              <p className="tier-subtitle">For UG, PG & Ph.D. scholars</p>
              
              <div className="tier-divider"></div>

              <ul className="tier-features-list">
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Thesis & Viva Support</span></li>
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Research Templates</span></li>
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Discounted Courses</span></li>
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Publication Guidance</span></li>
              </ul>

              <Link to="/contact" className="tier-action-btn btn-tier-student">
                Apply Now &rarr;
              </Link>
            </div>

            {/* 2. Faculty Membership (Popular) */}
            <div className="membership-tier-card tier-faculty featured-popular">
              <div className="tier-badge-pill featured-badge">POPULAR</div>
              <div className="tier-icon-wrap">
                <Award size={26} />
              </div>
              <h3 className="tier-title">Faculty Membership</h3>
              <p className="tier-subtitle">For educators & academicians</p>

              <div className="tier-divider"></div>

              <ul className="tier-features-list">
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Scopus/SCI Support</span></li>
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Development Programs</span></li>
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Session Chair Roles</span></li>
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Career Advancement</span></li>
              </ul>

              <Link to="/contact" className="tier-action-btn btn-tier-faculty">
                Apply Now &rarr;
              </Link>
            </div>

            {/* 3. Professional Membership (Popular) */}
            <div className="membership-tier-card tier-professional featured-popular">
              <div className="tier-badge-pill featured-badge">POPULAR</div>
              <div className="tier-icon-wrap">
                <Briefcase size={26} />
              </div>
              <h3 className="tier-title">Professional Membership</h3>
              <p className="tier-subtitle">For researchers & experts</p>

              <div className="tier-divider"></div>

              <ul className="tier-features-list">
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Patent & IP Support</span></li>
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Research Collaborations</span></li>
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Award Eligibility</span></li>
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Global Networking</span></li>
              </ul>

              <Link to="/contact" className="tier-action-btn btn-tier-professional">
                Apply Now &rarr;
              </Link>
            </div>

            {/* 4. Institutional Membership */}
            <div className="membership-tier-card tier-institutional">
              <div className="tier-badge-pill">INSTITUTIONAL</div>
              <div className="tier-icon-wrap">
                <Building2 size={26} />
              </div>
              <h3 className="tier-title">Institutional Membership</h3>
              <p className="tier-subtitle">For colleges & universities</p>

              <div className="tier-divider"></div>

              <ul className="tier-features-list">
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Accreditation Support</span></li>
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Conference Assistance</span></li>
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Institutional Branding</span></li>
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Group Service Discounts</span></li>
              </ul>

              <Link to="/contact" className="tier-action-btn btn-tier-institutional">
                Apply Now &rarr;
              </Link>
            </div>

            {/* 5. Corporate Membership */}
            <div className="membership-tier-card tier-corporate">
              <div className="tier-badge-pill">CORPORATE R&D</div>
              <div className="tier-icon-wrap">
                <Zap size={26} />
              </div>
              <h3 className="tier-title">Corporate Membership</h3>
              <p className="tier-subtitle">For companies & R&D orgs</p>

              <div className="tier-divider"></div>

              <ul className="tier-features-list">
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Academic Collaboration</span></li>
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Talent Acquisition</span></li>
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Joint Patent Ops</span></li>
                <li><CheckCircle size={16} className="tier-check-icon" /> <span>Innovation Assistance</span></li>
              </ul>

              <Link to="/contact" className="tier-action-btn btn-tier-corporate">
                Apply Now &rarr;
              </Link>
            </div>
          </div>

          {/* 4-Step Membership Application Process Roadmap */}
          <div className="membership-process-block">
            <div className="mem-process-header">
              <span className="mem-process-pretitle">EASY ONBOARDING</span>
              <h3 className="mem-process-title">How to Join the ASR Membership</h3>
              <p className="mem-process-desc">A straightforward 4-step process to activate your academic membership and global perks.</p>
            </div>

            <div className="mem-steps-row">
              {/* Step 1 */}
              <div className="mem-step-item">
                <div className="mem-step-badge">1</div>
                <h4>Submit Application</h4>
                <p>Online Form</p>
              </div>

              {/* Step 2 */}
              <div className="mem-step-item">
                <div className="mem-step-badge">2</div>
                <h4>Profile Review</h4>
                <p>Expert Verification</p>
              </div>

              {/* Step 3 */}
              <div className="mem-step-item">
                <div className="mem-step-badge">3</div>
                <h4>Approval</h4>
                <p>Confirmation Email</p>
              </div>

              {/* Step 4 */}
              <div className="mem-step-item">
                <div className="mem-step-badge">4</div>
                <h4>Certification</h4>
                <p>Digital ID & Certificate</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 13. TESTIMONIALS */}
      <section className="section-wrapper testimonials-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pretitle">TESTIMONIALS</span>
            <h2 className="section-title">What Our Clients Say About Us</h2>
            <p className="section-desc">
              Join hundreds of satisfied researchers, scholars, and institutions who have accelerated their academic journey with our expert support.
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-quote">
                “ASR helped me publish my research paper in a Scopus journal within just a few weeks. Their guidance and support were exceptional.”
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">RK</div>
                <div className="author-info">
                  <h5>Dr. Ramesh Kumar</h5>
                  <span>Asst. Professor, India</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-quote">
                “The Ph.D. thesis support was extremely professional. From topic selection to final viva, everything was handled smoothly.”
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">PS</div>
                <div className="author-info">
                  <h5>Priya Sharma</h5>
                  <span>Ph.D. Scholar</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-quote">
                “Highly ethical and transparent services. They ensured my research quality met international standards.”
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">AK</div>
                <div className="author-info">
                  <h5>Prof. Ahmed Khan</h5>
                  <span>Researcher</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-quote">
                “Thanks to ASR, I was able to publish in an SCI journal. Their expert mentorship made the entire process stress-free.”
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">SV</div>
                <div className="author-info">
                  <h5>Dr. Sneha Verma</h5>
                  <span>Scientist</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-quote">
                “Excellent support for my final-year project. The technical guidance and documentation helped me secure top grades.”
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">RM</div>
                <div className="author-info">
                  <h5>Rahul Mehta</h5>
                  <span>Engineering Student</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-quote">
                “Professional team with deep knowledge. Their patent support services helped me successfully file my innovation.”
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">AP</div>
                <div className="author-info">
                  <h5>Arjun Patel</h5>
                  <span>Startup Founder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. REAL QUESTIONS - FAQ ACCORDION */}
      <section className="section-wrapper faq-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pretitle">REAL QUESTIONS • EXPERT ANSWERS</span>
            <h2 className="section-title">Research, Thesis & Patent Support: Clear Answers for Real Academic Challenges</h2>
            <p className="section-desc">
              Curated FAQs based on actual researcher queries — no fluff, only actionable insights for Scopus publication, Ph.D. journey, IP filing, and funding.
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div className="faq-item" key={index}>
                <button 
                  className="faq-question" 
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                >
                  <span>{faq.q}</span>
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. CTA / GET STARTED BANNER (Enhanced Responsive Layout) */}
      <section className="cta-banner-section">
        <div className="cta-container">
          <h2 className="cta-title">
            Ready to Transform Your Research into<br />
            Global Success?
          </h2>
          <p className="cta-sub">
            Take the next step in your academic journey with expert guidance, structured support, and proven results.
          </p>
          <div className="cta-buttons-wrapper">
            <a 
              href="https://wa.me/919515207724" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cta-btn-whatsapp"
            >
              <MessageCircle size={19} className="whatsapp-icon-spin" />
              <span>Free Consultation on WhatsApp</span>
            </a>
            <Link to="/contact" className="cta-btn-inquiry">
              <span>Submit Inquiry</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

