import React from 'react';
import {
  BookMarked,
  Search,
  FileText,
  Edit3,
  ShieldCheck,
  Layout,
  BookmarkCheck,
  Tag,
  Mail,
  MessageSquare,
  CheckCircle,
  GraduationCap,
  Users,
  Award,
  Briefcase,
  Activity,
  Send,
  Globe
} from 'lucide-react';
import ContactBlock from '../components/ContactBlock';
import './ResearchPublicationSupport.css';

const ResearchPublicationSupport = () => {
  const features = [
    {
      title: "Journal Selection Support",
      desc: "Guidance in identifying suitable journals based on your research area, topic, scope, indexing preference, publication type, and academic requirements.",
      icon: <Search size={22} />
    },
    {
      title: "Manuscript Preparation",
      desc: "Support in preparing a well-structured research paper with abstract, introduction, literature review, methodology, results, discussion, conclusion, and references.",
      icon: <FileText size={22} />
    },
    {
      title: "Research Paper Editing",
      desc: "Academic editing to improve clarity, grammar, flow, sentence structure, research tone, and overall readability.",
      icon: <Edit3 size={22} />
    },
    {
      title: "Plagiarism Reduction Support",
      desc: "Assistance in improving originality through proper paraphrasing, citation correction, reference alignment, and content restructuring.",
      icon: <ShieldCheck size={22} />
    },
    {
      title: "Formatting as per Journal Guidelines",
      desc: "Manuscript formatting according to journal requirements, including headings, tables, figures, citations, references, word count, and layout style.",
      icon: <Layout size={22} />
    },
    {
      title: "Reference & Citation Support",
      desc: "Support for APA, MLA, Harvard, IEEE, Vancouver, Chicago, or journal-specific referencing formats.",
      icon: <BookmarkCheck size={22} />
    },
    {
      title: "Abstract & Keywords Optimization",
      desc: "Improvement of abstract, title, and keywords to make the paper more focused, searchable, and aligned with the journal scope.",
      icon: <Tag size={22} />
    },
    {
      title: "Cover Letter Preparation",
      desc: "Assistance in drafting a professional cover letter for journal submission to highlight scholarly importance.",
      icon: <Mail size={22} />
    },
    {
      title: "Reviewer Comment Response Support",
      desc: "Guidance in preparing clear and professional responses to reviewer comments, revision requests, and editorial feedback.",
      icon: <MessageSquare size={22} />
    },
    {
      title: "Final Submission Readiness Check",
      desc: "Review of manuscript, formatting, references, declarations, figures, tables, and required documents before submission.",
      icon: <CheckCircle size={22} />
    }
  ];

  const beneficiaries = [
    { title: "Ph.D. Scholars", desc: "Doctoral candidates seeking publication guidance", icon: <GraduationCap size={20} /> },
    { title: "Research Students", desc: "Postgraduate researchers needing journal support", icon: <Users size={20} /> },
    { title: "Assistant Professors", desc: "Faculty members preparing research papers", icon: <Award size={20} /> },
    { title: "Academicians", desc: "University researchers seeking publication", icon: <BookMarked size={20} /> },
    { title: "Independent Researchers", desc: "Individual scholars preparing manuscripts", icon: <Edit3 size={20} /> },
    { title: "Working Professionals", desc: "Industry researchers pursuing publication", icon: <Briefcase size={20} /> },
    { title: "Medical & Technical Researchers", desc: "Specialized domain research publication", icon: <Activity size={20} /> },
    { title: "Management & Social Science Scholars", desc: "Research publication in social sciences", icon: <Globe size={20} /> },
    { title: "Researchers Preparing Journal Submission", desc: "Scholars ready to submit their work", icon: <Send size={20} /> },
    { title: "Authors Facing Revision Requests", desc: "Researchers needing revision and resubmission support", icon: <MessageSquare size={20} /> }
  ];

  return (
    <div className="publication-support-page">
      {/* 1. Hero Header */}
      <section className="pub-hero-section">
        <div className="pub-hero-container">
          <div className="pub-tag-badge">
            <BookMarked size={14} /> SCOPUS • SCI • RESEARCH JOURNALS
          </div>
          <h1>ASR Research Publication Support</h1>
          <div className="pub-subheading">Publication Support — Professional Research Publication Support</div>
          <p className="pub-hero-desc">
            ASR Academic Research Solutions provides structured research publication support for scholars, academicians, Ph.D. researchers, and professionals who want to publish their research work in reputed journals with clarity, quality, and proper academic presentation.
          </p>
        </div>
      </section>

      {/* 2. Overview / Strategy */}
      <section className="pub-overview-section">
        <div className="section-container">
          <div className="pub-overview-card">
            <h2>Guidance for Journal Selection, Manuscript Preparation, Review & Submission</h2>
            <p>
              Publishing research in a good journal requires more than writing a paper. It needs a strong research structure, clear objectives, proper methodology, quality references, journal guideline compliance, plagiarism-conscious writing, and careful submission preparation.
            </p>
            <p>
              ASR Academic Research Solutions supports researchers throughout the publication process by helping them improve manuscript quality, select suitable journals, follow formatting requirements, prepare submission documents, and respond to reviewer comments professionally.
            </p>
            <p style={{ fontWeight: 600, color: '#1d4ed8', margin: 0 }}>
              Our goal is to make the research publication journey more organized, ethical, and publication-ready.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Detailed 10 Pillars */}
      <section className="pub-features-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pretitle">OUR EXPERTISE</span>
            <h2 className="section-title">Comprehensive Publication Assistance</h2>
            <p className="section-desc">
              Every stage of your manuscript journey managed with precision, international journal standards, and ethical compliance.
            </p>
          </div>

          <div className="pub-features-grid">
            {features.map((item, idx) => (
              <div className="pub-feature-card" key={idx}>
                <div className="pub-icon-wrapper">
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Who Can Benefit? */}
      <section className="who-benefit-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-pretitle">TARGET AUDIENCE</span>
            <h2 className="section-title">Who Can Benefit?</h2>
            <p className="section-desc">
              Designed to cater to academic writers, university faculties, and scientific researchers across all domains.
            </p>
          </div>

          <div className="benefit-cards-grid">
            {beneficiaries.map((b, idx) => (
              <div className="benefit-card" key={idx}>
                <div className="benefit-icon-box">
                  {b.icon}
                </div>
                <div>
                  <h4>{b.title}</h4>
                  <p>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Complete Contact Us Component */}
      <ContactBlock defaultService="ASR Research Publication Support" />
    </div>
  );
};

export default ResearchPublicationSupport;
