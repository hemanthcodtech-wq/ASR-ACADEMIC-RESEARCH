import React from 'react';
import graduatesImg from '../assets/hero-graduates.jpg';
import {
  Globe,
  BookOpen,
  Lightbulb,
  FileText,
  Users,
  Award,
  Clock,
  ShieldCheck,
  TrendingUp,
  Sparkles
} from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Heading, Subheading, Bullet points */}
        <div className="hero-left">
          <div className="hero-tag-badge">
            <Sparkles size={14} className="tag-icon" />
            <span>EMPOWERING GLOBAL INNOVATION</span>
          </div>

          <h1 className="hero-main-title">
            Transform Your <br />
            <span className="title-bold">Research</span> <br />
            <span className="title-highlight">Into Global Success</span>
          </h1>

          <div className="hero-feature-list">
            <div className="hero-feature-item">
              <div className="feature-icon-circle green">
                <Globe size={18} />
              </div>
              <div className="feature-text">
                <strong>Comprehensive Academic & Research Ecosystem:</strong> End-to-end support for students, researchers, faculty members, and institutions in Ph.D. thesis support, student projects, scholarly publishing, innovation, and institutional excellence.
              </div>
            </div>

            <div className="hero-feature-item">
              <div className="feature-icon-circle green">
                <BookOpen size={18} />
              </div>
              <div className="feature-text">
                <strong>Advanced Research Publication & Academic Publishing Services:</strong> Professional assistance for Scopus, SCI, Web of Science, and high-impact journal publications including manuscript preparation, formatting, plagiarism screening, and journal submission.
              </div>
            </div>

            <div className="hero-feature-item">
              <div className="feature-icon-circle green">
                <Lightbulb size={18} />
              </div>
              <div className="feature-text">
                <strong>Patents, Innovation & Research Funding Facilitation:</strong> Expert support for patent drafting, intellectual property protection, startup incubation, innovation development, grant proposal preparation, and research funding opportunities.
              </div>
            </div>

            <div className="hero-feature-item">
              <div className="feature-icon-circle green">
                <Award size={18} />
              </div>
              <div className="feature-text">
                <strong>Institutional Development, Global Collaboration & Professional Advancement:</strong> Specialized services for NAAC/NIRF accreditation, faculty development, conferences, internships, journal management, OJS hosting, international education, and academic collaborations.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Image with Floating Interactive Badges */}
        <div className="hero-right">
          <div className="hero-image-card-wrapper">
            {/* Top-Left Floating Microscope Badge */}
            <div className="floating-badge badge-top-left" title="Research & Lab Services">
              <div className="badge-inner-icon">
                <Sparkles size={20} color="#16a34a" />
              </div>
            </div>

            {/* Top-Right Floating Certificate/Paper Badge */}
            <div className="floating-badge badge-top-right" title="Certified Publications">
              <div className="badge-inner-icon orange">
                <FileText size={20} color="#ea580c" />
              </div>
            </div>

            {/* Center Image of Graduates */}
            <div className="hero-image-frame">
              <img 
                src={graduatesImg} 
                alt="Successful graduates and research scholars holding diplomas" 
                className="graduates-hero-image"
              />
            </div>

            {/* Bottom-Left Floating Analytics Badge */}
            <div className="floating-badge badge-bottom-left" title="Proven Impact & Analytics">
              <div className="badge-inner-icon blue">
                <TrendingUp size={20} color="#2563eb" />
              </div>
            </div>

            {/* Floating Experience Tag */}
            <div className="floating-stat-pill">
              <ShieldCheck size={16} color="#10b981" />
              <span>100% Ethical & Verified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

