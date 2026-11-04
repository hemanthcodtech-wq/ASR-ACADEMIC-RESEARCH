import React from 'react';
import { useParams, Link } from 'react-router-dom';
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
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  PhoneCall,
  MessageCircle,
  Search,
  FileText,
  Edit3,
  Layout,
  BookmarkCheck,
  Tag,
  Mail,
  MessageSquare
} from 'lucide-react';
import ContactBlock from '../components/ContactBlock';
import './ServiceDetail.css';

const serviceRegistry = {
  "phd-thesis": {
    badge: "DOCTORAL EXCELLENCE",
    title: "ASR Ph.D. Thesis Support Services",
    lead: "Complete assistance from topic selection to final submission and viva preparation.",
    overview: "Our Ph.D. thesis assistance provides end-to-end guidance customized to your university's guidelines and international research benchmarks. From refining your core research problem to defending your thesis before the evaluation committee, our experienced doctorates guide you at every step.",
    pillars: [
      { title: "Topic Selection & Synopsis", desc: "Formulate research hypotheses with verified research gaps and novelty." },
      { title: "Literature Review", desc: "Comprehensive synthesis of 100+ peer-reviewed papers from Scopus & WoS." },
      { title: "Methodology & Implementation", desc: "Rigorous experimental, analytical, or simulation models (MATLAB, Python, SPSS)." },
      { title: "Plagiarism Screening", desc: "Official Turnitin originality check keeping similarity strictly under 10%." },
      { title: "Chapter Structuring", desc: "Meticulous formatting compliant with university submission standards." },
      { title: "Viva-Voce Mock Prep", desc: "Simulated viva sessions with domain specialists to ensure confident defense." }
    ]
  },
  "book-chapter-publishing": {
    badge: "GLOBAL SCHOLARLY PUBLISHING",
    title: "ASR Academic Book & Chapter Publishing",
    lead: "Transform research into published books and global academic content with reputable international publishers.",
    overview: "Publishing scholarly books and chapters establishes your intellectual authority and provides vital citation metrics. We collaborate with internationally indexed publishers to release edited volumes and monographs with valid ISBN identifiers.",
    pillars: [
      { title: "Theme Identification", desc: "Curation of contemporary academic and multidisciplinary book concepts." },
      { title: "Chapter Drafting", desc: "Preparation of scholarly chapters following international editorial guidelines." },
      { title: "Peer-Review Coordination", desc: "Double-blind peer review process to ensure high academic rigor." },
      { title: "ISBN & Indexing", desc: "Cataloging with national libraries and international indexing services." },
      { title: "Global Distribution", desc: "Print-on-demand and open-access distribution across global libraries." },
      { title: "Royalty & Copyrights", desc: "Fair author agreements preserving scholarly copyright and credentials." }
    ]
  },
  "patent-ip-facilitation": {
    badge: "INTELLECTUAL PROPERTY & PATENTS",
    title: "ASR Patent & IP Facilitation Services",
    lead: "Protect your ideas with professional patent filing and IP support from licensed attorneys.",
    overview: "Turn technological inventions and academic discoveries into registered intellectual property. Our licensed patent agents manage prior-art searches, provisional and complete drafting, and patent office responses until grant.",
    pillars: [
      { title: "Prior-Art Search", desc: "Comprehensive global search across patent databases to establish novelty." },
      { title: "Specification Drafting", desc: "Crafting bulletproof claims, drawings, and descriptions (Form 2)." },
      { title: "Filing with IPO / PCT", desc: "Direct filing with Indian Patent Office and International PCT routes." },
      { title: "Early Publication", desc: "Fast-tracking publication via Form 9 for accelerated recognition." },
      { title: "FER Response Drafting", desc: "Handling First Examination Reports and technical rebuttals." },
      { title: "Hearing Representation", desc: "Expert legal representation before the Controller of Patents." }
    ]
  },
  "innovation-startup-incubation": {
    badge: "ENTREPRENEURSHIP & STARTUPS",
    title: "ASR Innovation & Startup Incubation",
    lead: "Turn research ideas into scalable startups with expert mentorship and prototype validation.",
    overview: "We bridge academic laboratories with commercial markets by helping researchers, professors, and student teams build Minimum Viable Products (MVPs), secure government seed funds, and pitch to venture incubators.",
    pillars: [
      { title: "TRL Assessment", desc: "Evaluation of Technology Readiness Levels from lab discovery to POC." },
      { title: "Prototype Development", desc: "Guidance on technical prototyping, CAD modeling, and testing." },
      { title: "Business Model Canvas", desc: "Structuring unit economics, go-to-market strategies, and value propositions." },
      { title: "Seed Fund Applications", desc: "Support for BIRAC, SISFS, DST-NIDHI, and Startup India seed funds." },
      { title: "Incubator Matchmaking", desc: "Connecting teams to premier university incubators and tech hubs." },
      { title: "Pitch Deck Preparation", desc: "Professional investor decks and presentation coaching." }
    ]
  },
  "funding-grant-assistance": {
    badge: "RESEARCH GRANTS & SPONSORSHIPS",
    title: "ASR Funding & Research Grant Assistance",
    lead: "Secure funding from government and private research bodies with winning proposals.",
    overview: "Government and private bodies disburse billions annually for high-impact science and humanities research. We assist faculties and institutions in drafting compelling, policy-aligned grant applications that win awards.",
    pillars: [
      { title: "Grant Scouting", desc: "Identifying active funding calls (DST, SERB, CSIR, ICSSR, AICTE, EU Horizon)." },
      { title: "Problem Framing", desc: "Aligning research scope with national priorities and mission targets." },
      { title: "Budget Justification", desc: "Detailed equipment, personnel, and consumable financial projections." },
      { title: "Milestone Structuring", desc: "Clear Gantt charts and measurable research deliverables." },
      { title: "Institutional Endorsement", desc: "Facilitating university approvals and co-investigator alignments." },
      { title: "Post-Award Monitoring", desc: "Progress report compliance and utilization certificate preparation." }
    ]
  },
  "industry-academic-collaboration": {
    badge: "INSTITUTIONAL PARTNERSHIPS",
    title: "ASR Industry-Academic Collaboration",
    lead: "Build partnerships between academia and industry for real-world impact and sponsored projects.",
    overview: "Enable sustainable industry-academia interfaces that generate industrial consultancy revenue, internship placements, live student projects, and joint technology commercialization.",
    pillars: [
      { title: "Bilateral MoUs", desc: "Drafting mutually beneficial Memorandums of Understanding." },
      { title: "Consultancy Projects", desc: "Structuring corporate-sponsored research and laboratory testing." },
      { title: "Tech Transfer", desc: "Licensing university-developed patents to commercial enterprises." },
      { title: "Joint Hackathons", desc: "Co-organizing problem-solving challenges and innovation sprints." },
      { title: "Executive Roundtables", desc: "Bringing corporate leaders into academic curriculum advisory boards." },
      { title: "CSR Fund Utilization", desc: "Connecting corporate CSR initiatives with academic research funds." }
    ]
  },
  "conference-seminar-management": {
    badge: "ACADEMIC CONFERENCES",
    title: "ASR Conference & Seminar Management",
    lead: "End-to-end support for organizing international academic events and conference proceedings.",
    overview: "Organize world-class academic conferences with Scopus or Web of Science indexed proceedings, seamless peer review management, international keynote coordination, and professional logistics.",
    pillars: [
      { title: "Proceedings Indexing", desc: "Tie-ups with Scopus and IEEE/Springer for publishing conference papers." },
      { title: "Review Management Tool", desc: "Setup of submission portals (EasyChair, Microsoft CMT)." },
      { title: "Keynote Curation", desc: "Inviting renowned international scientists and researchers." },
      { title: "Call for Papers (CFP)", desc: "Global dissemination across academic mailing lists and portals." },
      { title: "Event Logistics", desc: "Hybrid and virtual conferencing infrastructure setup." },
      { title: "ISBN / DOI Assignment", desc: "Permanent Crossref DOIs for each published conference manuscript." }
    ]
  },
  "faculty-development-mentorship": {
    badge: "FACULTY EMPOWERMENT",
    title: "ASR Faculty Development & Mentorship",
    lead: "Modern research skill empowerment for educators and academicians.",
    overview: "Empowering university educators with modern research methodologies, computational tools, and publishing strategies to boost Academic Performance Indicators (API) and tenure qualifications.",
    pillars: [
      { title: "FDP Masterclasses", desc: "Hands-on workshops on statistical modeling and high-impact publishing." },
      { title: "API Score Enhancement", desc: "Customized career advancement roadmap for professorial elevations." },
      { title: "Research Supervision", desc: "Mentoring newer guides on doctoral candidate supervision techniques." },
      { title: "Pedagogical Innovations", desc: "Incorporating AI and active learning tools into course curriculums." },
      { title: "Co-Authorship Networks", desc: "Facilitating multi-institutional collaborative papers." },
      { title: "Leadership Training", desc: "Training for department heads and research deans." }
    ]
  },
  "international-education-services": {
    badge: "GLOBAL MOBILITY",
    title: "ASR International Education Services",
    lead: "Global academic opportunities and cross-border research collaborations.",
    overview: "Guiding aspiring scholars to prestigious international universities for master's programs, Ph.D. scholarships, and funded postdoctoral fellowships.",
    pillars: [
      { title: "University Shortlisting", desc: "Matching candidate profiles with top world rankings and funded labs." },
      { title: "SOP & Research Proposal", desc: "Refining personal statements and academic research proposals." },
      { title: "Professor Outreach", desc: "Crafting professional inquiry emails to prospective research guides." },
      { title: "Fellowship Applications", desc: "Applying for DAAD, Fulbright, Commonwealth, and Marie Curie grants." },
      { title: "Visa Documentation", desc: "Complete academic visa compliance and interview coaching." },
      { title: "Cross-Border Exchanges", desc: "Facilitating visiting scholar and exchange programs." }
    ]
  },
  "internship-skill-training": {
    badge: "PROFESSIONAL TRAINING",
    title: "ASR Internship & Professional Skill Training",
    lead: "Hands-on career growth training and industry-ready skill development.",
    overview: "Practical, project-based internships in cutting-edge technology and research domains including AI/ML, data science, bio-informatics, and scientific writing.",
    pillars: [
      { title: "Live Lab Projects", desc: "Hands-on assignment on real-world industrial and research datasets." },
      { title: "Tool Mastery", desc: "In-depth training on Python, R, SPSS, MATLAB, and LaTeX." },
      { title: "Verified Credentials", desc: "Internship certification recognized by employers and universities." },
      { title: "Research Paper Output", desc: "Guidance on converting internship findings into a published paper." },
      { title: "Industry Mentorship", desc: "Direct interactions with seasoned tech and scientific leaders." },
      { title: "Placement Advisory", desc: "Resume optimization and interview preparation." }
    ]
  },
  "student-project-support": {
    badge: "STUDENT RESEARCH",
    title: "ASR Student Project Support Services",
    lead: "Guidance for UG/PG research projects and academic assignments.",
    overview: "Providing comprehensive project guidance to undergraduate and master's students to ensure technically sound, plagiarism-free projects that achieve top grades.",
    pillars: [
      { title: "Topic Selection", desc: "Trending research topics aligned with modern industrial demands." },
      { title: "Code & Implementation", desc: "Complete source code, simulation, and hardware assembly." },
      { title: "IEEE Documentation", desc: "Complete project reports compliant with university formats." },
      { title: "Presentation PPTs", desc: "Professional slides summarizing technical architecture and results." },
      { title: "Viva Preparation", desc: "One-on-one coaching for internal and external project evaluations." },
      { title: "Student Publication", desc: "Transforming strong final year projects into indexed papers." }
    ]
  },
  "accreditation-ranking": {
    badge: "INSTITUTIONAL RANKINGS",
    title: "ASR Institutional Accreditation & Ranking",
    lead: "Support for NAAC, NIRF, and global university ranking improvements.",
    overview: "Strategic consultancy for colleges and universities aiming to achieve NAAC A++ accreditation, top NIRF rankings, and global QS/Times Higher Education benchmarks.",
    pillars: [
      { title: "NAAC Criteria Audits", desc: "Exhaustive gap analysis across all 7 NAAC criteria." },
      { title: "SSR & IIQA Filing", desc: "Systematic data compilation and Self Study Report documentation." },
      { title: "NIRF Research Parameters", desc: "Tactical plans to boost citations, h-index, and patent metrics." },
      { title: "Academic & Green Audits", desc: "Conducting certified external audits mandatory for grading." },
      { title: "IQAC Restructuring", desc: "Setting up continuous internal quality assurance mechanisms." },
      { title: "Peer Team Simulation", desc: "Mock inspections to prepare faculty and management for visits." }
    ]
  },
  "journal-management-ojs": {
    badge: "JOURNAL SYSTEMS",
    title: "ASR Journal Management & OJS Hosting",
    lead: "Professional journal setup, management, and OJS hosting services.",
    overview: "Helping universities, societies, and publishers launch, host, and index high-impact scholarly journals using Open Journal Systems (OJS 3.3).",
    pillars: [
      { title: "OJS Cloud Hosting", desc: "Fast, secure, and automated Open Journal Systems cloud deployment." },
      { title: "ISSN Registration", desc: "Acquisition of official print and online International Standard Serial Numbers." },
      { title: "Crossref DOI Setup", desc: "Automated deposit of digital object identifiers for every article." },
      { title: "Editorial Workflow", desc: "Customized multi-stage double-blind peer review setup." },
      { title: "Indexing Applications", desc: "Preparation of journals for Scopus, DOAJ, and Web of Science entry." },
      { title: "XML / Galley Production", desc: "Professional PDF and JATS XML typesetting for published papers." }
    ]
  }
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = serviceRegistry[slug] || serviceRegistry["phd-thesis"];

  return (
    <div className="service-detail-page">
      {/* Hero */}
      <section className="svc-detail-hero">
        <div className="svc-detail-hero-container">
          <div className="svc-detail-badge">
            <Sparkles size={14} /> {service.badge}
          </div>
          <h1>{service.title}</h1>
          <p className="svc-detail-lead">{service.lead}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="svc-detail-content">
        <div className="section-container">
          <div className="svc-detail-overview-box">
            <h2>Comprehensive Service Overview</h2>
            <p>{service.overview}</p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '24px', flexWrap: 'wrap' }}>
              <a href="#inquiry-section" className="btn-primary">
                Book Free Consultation <ArrowRight size={16} />
              </a>
              <a 
                href="https://wa.link/yr91lr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <MessageCircle size={16} color="#22c55e" /> Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="section-header">
            <span className="section-pretitle">METHODOLOGY & PHASES</span>
            <h2 className="section-title">How We Guide You Step-by-Step</h2>
            <p className="section-desc">Structured, transparent, and quality-checked milestones throughout your project.</p>
          </div>

          <div className="svc-steps-grid">
            {service.pillars.map((p, i) => (
              <div className="svc-step-item" key={i}>
                <div className="svc-step-icon">
                  <CheckCircle size={22} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Embedded Contact Us Section with regional offices */}
      <div id="inquiry-section">
        <ContactBlock defaultService={service.title} />
      </div>
    </div>
  );
};

export default ServiceDetail;
