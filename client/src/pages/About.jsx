import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import aboutTeamImg from '../assets/about-team.jpg';
import {
  Clock,
  BookOpen,
  Award,
  Users,
  ShieldCheck,
  Zap,
  Globe,
  DollarSign,
  CheckCircle,
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* 1. Welcome Header Banner */}
      <PageHero
        badge="WELCOME TO ASR ACADEMIC RESEARCH"
        title="About"
        highlightText="ASR Solutions"
        subtitle="Learn about ASR Academic Research Solutions, our legacy of over 15 years, our mission, and why thousands of researchers worldwide trust us with their academic journey."
      />

      {/* 2. About ASR Research Solutions Main Content */}
      <section className="about-section-wrapper">
        <div className="about-container">
          <div className="about-main-card">
            <div className="about-card-left">
              <span className="section-pretitle">ABOUT ASR RESEARCH SOLUTIONS</span>
              <h2>Empowering Research. Enabling Global Success.</h2>
              <p className="about-lead-desc">
                ASR Academic Research Solutions is a premier MSME-registered organization under the Government of India with over 15 years of excellence in academic consultancy. We guide Ph.D. scholars, researchers, and faculty members through every step of their academic journey with integrity and global standards.
              </p>

              <div className="about-bullets-grid">
                <div className="about-bullet-item">
                  <CheckCircle size={18} color="#10b981" />
                  <span>End-to-End Research Support</span>
                </div>
                <div className="about-bullet-item">
                  <CheckCircle size={18} color="#10b981" />
                  <span>Scopus & SCI Publication</span>
                </div>
                <div className="about-bullet-item">
                  <CheckCircle size={18} color="#10b981" />
                  <span>Patent & Innovation Filing</span>
                </div>
                <div className="about-bullet-item">
                  <CheckCircle size={18} color="#10b981" />
                  <span>Global Academic Network</span>
                </div>
                <div className="about-bullet-item">
                  <CheckCircle size={18} color="#10b981" />
                  <span>Confidential & Ethical Services</span>
                </div>
                <div className="about-bullet-item">
                  <CheckCircle size={18} color="#10b981" />
                  <span>Expert PhD Mentorship</span>
                </div>
              </div>

              <div className="about-btn-row">
                <Link to="/services" className="btn-primary">
                  Explore Services <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn-outline">
                  Free Consultation
                </Link>
              </div>
            </div>

            {/* Right Side: Photo of the academic council & research meeting */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.12)', border: '1px solid #e2e8f0' }}>
                <img 
                  src={aboutTeamImg} 
                  alt="ASR Academic Research Council meeting" 
                  style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }} 
                />
              </div>

              <div className="about-stats-panel" style={{ padding: '20px' }}>
                <div className="about-stat-tile">
                  <div className="num">15+</div>
                  <div className="lbl">Years Exp.</div>
                </div>
                <div className="about-stat-tile">
                  <div className="num">2,000+</div>
                  <div className="lbl">Clients</div>
                </div>
                <div className="about-stat-tile">
                  <div className="num">50+</div>
                  <div className="lbl">Countries</div>
                </div>
                <div className="about-stat-tile">
                  <div className="num">100+</div>
                  <div className="lbl">PhD Mentors</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Why Choose ASR */}
          <div className="why-header">
            <span className="section-pretitle">WHY CHOOSE ASR</span>
            <h2>Your Trusted Partner for Academic Success & Research Excellence</h2>
            <p>
              We go beyond basic consultancy — delivering structured, ethical, and result-driven academic support that helps researchers achieve global recognition.
            </p>
          </div>

          <div className="why-cards-grid">
            {/* Card 1 */}
            <div className="why-feature-card">
              <div className="why-icon-circle">
                <Clock size={22} />
              </div>
              <h3>15+ Years of Expertise</h3>
              <p>Proven experience in guiding scholars, researchers, and institutions across diverse domains.</p>
            </div>

            {/* Card 2 */}
            <div className="why-feature-card">
              <div className="why-icon-circle">
                <BookOpen size={22} />
              </div>
              <h3>End-to-End Academic Support</h3>
              <p>From Ph.D. thesis to publication, patents, and innovation — everything under one roof.</p>
            </div>

            {/* Card 3 */}
            <div className="why-feature-card">
              <div className="why-icon-circle">
                <Award size={22} />
              </div>
              <h3>Scopus & SCI Publication Support</h3>
              <p>Expert guidance for publishing in high-impact international journals.</p>
            </div>

            {/* Card 4 */}
            <div className="why-feature-card">
              <div className="why-icon-circle">
                <Users size={22} />
              </div>
              <h3>Expert Mentorship</h3>
              <p>Work with experienced professors, researchers, and industry professionals.</p>
            </div>

            {/* Card 5 */}
            <div className="why-feature-card">
              <div className="why-icon-circle">
                <ShieldCheck size={22} />
              </div>
              <h3>100% Confidential & Ethical Services</h3>
              <p>Strict adherence to academic integrity, data protection, and originality.</p>
            </div>

            {/* Card 6 */}
            <div className="why-feature-card">
              <div className="why-icon-circle">
                <Zap size={22} />
              </div>
              <h3>Fast Track Solutions Available</h3>
              <p>Accelerated support options for urgent research and publication needs.</p>
            </div>

            {/* Card 7 */}
            <div className="why-feature-card">
              <div className="why-icon-circle">
                <Globe size={22} />
              </div>
              <h3>Global Client Reach</h3>
              <p>Serving researchers and institutions across 50+ countries worldwide.</p>
            </div>

            {/* Card 8 */}
            <div className="why-feature-card">
              <div className="why-icon-circle">
                <DollarSign size={22} />
              </div>
              <h3>Affordable & Transparent Pricing</h3>
              <p>Clear pricing structure with no hidden costs.</p>
            </div>
          </div>

          {/* 4. Trust Summary Banner */}
          <div className="about-trust-banner">
            <div className="trust-item">
              <Building2 size={24} />
              <span>MSME Registered (Govt. of India)</span>
            </div>
            <div className="trust-item">
              <CheckCircle size={24} />
              <span>1000+ Successful Projects</span>
            </div>
            <div className="trust-item">
              <Award size={24} />
              <span>Trusted by Researchers Worldwide</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
