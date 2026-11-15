import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle,
  Globe,
  Award,
  ShieldCheck,
  FileText,
  ArrowRight,
  TrendingUp,
  Search,
  Sparkles,
  Layers,
  FileCheck2,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import ContactBlock from '../components/ContactBlock';
import PageHero from '../components/PageHero';
import './Journals.css';

const Journals = () => {
  return (
    <div className="page-container journals-overview-page">
      {/* 1. Hero Banner */}
      <PageHero
        badge="GLOBAL INDEXED JOURNALS PORTFOLIO"
        title="Publish in Globally"
        highlightText="Recognized Journals"
        subtitle="We provide expert guidance and end-to-end support to help researchers publish in high-impact, indexed journals including SCI, SCIE, Scopus, Web of Science Core, and UGC-CARE approved international platforms."
      >
        <div className="journals-cta-nav-pills" style={{ justifyContent: 'center' }}>
          <Link to="/sci-scie-journals" className="journal-nav-pill active-pill">
            <Award size={16} /> Explore SCI / SCIE Indexed Journals (62+)
          </Link>
          <Link to="/scopus-indexed-journals" className="journal-nav-pill">
            <BookOpen size={16} /> Explore Scopus Indexed Journals (58+)
          </Link>
        </div>
      </PageHero>

      {/* 2. Enhanced Highlights Metrics Cards Section */}
      <section className="journals-metrics-showcase-section">
        <div className="journals-metrics-container">
          <div className="journals-highlights-grid">
            
            {/* Tile 1: 5,000+ Publications Guided */}
            <div className="journal-stat-tile-card tile-publications">
              <div className="tile-top-bar">
                <div className="tile-icon-bubble">
                  <BookOpen size={24} />
                </div>
                <span className="tile-badge-pill">PROVEN TRACK RECORD</span>
              </div>
              <div className="journal-stat-num">5,000+</div>
              <div className="journal-stat-title">Publications Guided</div>
              <p className="journal-stat-desc">
                Empowering Ph.D. scholars, scientists, and university faculties across 50+ countries with successful indexation.
              </p>
              <div className="tile-footer-accent">
                <CheckCircle2 size={14} className="tile-check-icon" />
                <span>15+ Years Editorial Experience</span>
              </div>
            </div>

            {/* Tile 2: < 10% Plagiarism Threshold */}
            <div className="journal-stat-tile-card tile-plagiarism">
              <div className="tile-top-bar">
                <div className="tile-icon-bubble">
                  <ShieldCheck size={24} />
                </div>
                <span className="tile-badge-pill">ETHICAL COMPLIANCE</span>
              </div>
              <div className="journal-stat-num">&lt; 10%</div>
              <div className="journal-stat-title">Plagiarism Threshold</div>
              <p className="journal-stat-desc">
                Strict Turnitin / iThenticate verification ensuring absolute originality and ethical manuscript submission.
              </p>
              <div className="tile-footer-accent">
                <CheckCircle2 size={14} className="tile-check-icon" />
                <span>Zero AI Inconsistency Guarantee</span>
              </div>
            </div>

            {/* Tile 3: 100% Active Indexing Verified */}
            <div className="journal-stat-tile-card tile-indexing">
              <div className="tile-top-bar">
                <div className="tile-icon-bubble">
                  <FileCheck2 size={24} />
                </div>
                <span className="tile-badge-pill">REAL-TIME VALIDATION</span>
              </div>
              <div className="journal-stat-num">100%</div>
              <div className="journal-stat-title">Active Indexing Verified</div>
              <p className="journal-stat-desc">
                Every suggested journal is checked against current Clarivate Master Journal List and Elsevier Scopus active databases.
              </p>
              <div className="tile-footer-accent">
                <CheckCircle2 size={14} className="tile-check-icon" />
                <span>Discontinued & Clone Filtering</span>
              </div>
            </div>

            {/* Tile 4: Q1 - Q4 Journal Matching */}
            <div className="journal-stat-tile-card tile-matching">
              <div className="tile-top-bar">
                <div className="tile-icon-bubble">
                  <Layers size={24} />
                </div>
                <span className="tile-badge-pill">TARGETED PRECISION</span>
              </div>
              <div className="journal-stat-num">Q1 - Q4</div>
              <div className="journal-stat-title">Journal Matching</div>
              <p className="journal-stat-desc">
                Strategic quartile alignment mapping scope, CiteScore, impact factor, review timeline, and publication budgets.
              </p>
              <div className="tile-footer-accent">
                <CheckCircle2 size={14} className="tile-check-icon" />
                <span>Acceptance Rate Optimization</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Detailed Journal Categories Suite */}
      <div className="page-content-wrapper" style={{ marginTop: '40px' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="section-pretitle">INDEXING PLATFORMS</span>
          <h2 className="section-title">Major Journal Indexing Covered</h2>
          <p className="section-desc">
            Explore dedicated publication assistance across international prestigious citation databases.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="cards-detailed-grid">
          {/* SCI */}
          <div className="card-detail-item" id="sci">
            <div className="card-icon-wrapper">
              <Award size={26} />
            </div>
            <h3>SCI & SCIE Journals (Web of Science)</h3>
            <p>
              Publish in Science Citation Index journals with premier impact factors and global academic recognition. Essential for professorial promotions, global postdoctoral grants, and international tenure tracks.
            </p>
            <ul className="card-checklist">
              <li><CheckCircle size={15} color="#10b981" /> Clarivate Web of Science Master List Indexed</li>
              <li><CheckCircle size={15} color="#10b981" /> High JCR Impact Factor matching</li>
              <li><CheckCircle size={15} color="#10b981" /> Rigorous technical and linguistic editing</li>
              <li><CheckCircle size={15} color="#10b981" /> Point-by-point rebuttal letter drafting</li>
            </ul>
            <div className="service-card-actions">
              <Link to="/sci-scie-journals" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                View SCI / SCIE Indexed Journals <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Scopus */}
          <div className="card-detail-item" id="scopus">
            <div className="card-icon-wrapper">
              <BookOpen size={26} />
            </div>
            <h3>Scopus Indexed Journals</h3>
            <p>
              Enhance your academic metrics (h-index, citations) with Scopus indexed publications. Broad coverage across engineering, science, management, medicine, humanities, and multidisciplinary domains.
            </p>
            <ul className="card-checklist">
              <li><CheckCircle size={15} color="#10b981" /> Elsevier Scopus active source list verification</li>
              <li><CheckCircle size={15} color="#10b981" /> CiteScore, SJR, and SNIP metrics optimization</li>
              <li><CheckCircle size={15} color="#10b981" /> Rapid review and fast track publishing options</li>
              <li><CheckCircle size={15} color="#10b981" /> Ph.D. mandatory degree completion compliance</li>
            </ul>
            <div className="service-card-actions">
              <Link to="/scopus-indexed-journals" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                View Scopus Indexed Journals <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Web of Science Core */}
          <div className="card-detail-item" id="wos">
            <div className="card-icon-wrapper">
              <Globe size={26} />
            </div>
            <h3>Web of Science Core Collection</h3>
            <p>
              Includes ESCI (Emerging Sources Citation Index), AHCI (Arts & Humanities), and SSCI (Social Sciences Citation Index). Perfect for non-STEM and interdisciplinary scholars seeking world-class citations.
            </p>
            <ul className="card-checklist">
              <li><CheckCircle size={15} color="#10b981" /> Complete compliance with Clarivate editorial criteria</li>
              <li><CheckCircle size={15} color="#10b981" /> Social sciences, arts, and humanities specialization</li>
              <li><CheckCircle size={15} color="#10b981" /> Extensive citation boosting strategy</li>
              <li><CheckCircle size={15} color="#10b981" /> Predatory journal filtering and safety guarantees</li>
            </ul>
            <div className="service-card-actions">
              <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Consult WoS Team <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* UGC-CARE */}
          <div className="card-detail-item" id="ugc">
            <div className="card-icon-wrapper">
              <ShieldCheck size={26} />
            </div>
            <h3>UGC-CARE Listed Journals</h3>
            <p>
              Tailored for Indian faculty, lecturers, and Ph.D. scholars seeking mandatory CAS promotion points and university compliance under University Grants Commission (India) regulations.
            </p>
            <ul className="card-checklist">
              <li><CheckCircle size={15} color="#10b981" /> Group I and Group II listed journals</li>
              <li><CheckCircle size={15} color="#10b981" /> Validated against cloned/fake journal clones</li>
              <li><CheckCircle size={15} color="#10b981" /> Quick turnaround for CAS promotions & submissions</li>
              <li><CheckCircle size={15} color="#10b981" /> Turnitin similarity certificate included</li>
            </ul>
            <div className="service-card-actions">
              <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Consult UGC-CARE Team <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Consultation & Regional Offices Section */}
      <ContactBlock 
        title="Need Personalized Journal Selection Support?"
        subtitle="Share your abstract or manuscript draft with our journal indexing specialists for free quartile evaluation, scope matching, and review turnaround timelines."
        defaultService="ASR Research Publication Support" 
      />
    </div>
  );
};

export default Journals;


