import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.png';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  PhoneCall,
  ExternalLink
} from 'lucide-react';
import {
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  TwitterIcon
} from './SocialIcons';
import './Footer.css';

const Footer = () => {
  return (
    <>
      <footer className="footer-wrapper">
        <div className="footer-top">
          <div className="footer-container">
            
            {/* Top Row: Brand Info (Left) + Google Map Embed (Right) matching screenshot */}
            <div className="footer-header-row">
              <div className="footer-brand-block">
                <Link to="/" className="footer-logo-title-wrap">
                  <img src={logo} alt="ASR Academic Research Solutions" className="footer-logo-img" />
                  <span className="footer-brand-title">ASR Academic Research Solutions</span>
                </Link>
                <p className="footer-desc">
                  ASR Academic Research Solutions is a global leader in providing end-to-end support for researchers and institutions. We bridge the gap between innovation and publication, with MSME registration and 15+ years of excellence.
                </p>
                <div className="footer-tags">
                  <span className="footer-tag">MSME Registered</span>
                  <span className="footer-tag">15+ Years Excellence</span>
                  <span className="footer-tag">ISO Certified Quality</span>
                </div>
              </div>

              {/* Embedded Interactive Google Map for Head Office Vijayapura */}
              <div className="footer-map-card">
                <iframe
                  title="ASR Academic Research Solutions Vijayapura Office Map"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d488790.4299911064!2d75.712985!3d16.84246!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc6557d98aa706f%3A0xedd4a1794e8fe8d2!2sVijayapura%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1793624918522!5m2!1sen!2sin"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
                <a 
                  href="https://maps.google.com/?q=Vijayapura,+Karnataka" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-map-overlay-badge"
                >
                  Open in Maps <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Navigation Grid (Quick Links, Research Services, Collaborate & Publish, Professional Growth, Get in Touch) */}
            <div className="footer-nav-grid">
              
              {/* Column 1: Quick Links */}
              <div className="footer-col">
                <h4 className="footer-col-title">Quick Links</h4>
                <ul className="footer-links">
                  <li><Link to="/login" style={{ color: '#60a5fa', fontWeight: 700 }}>Author Portal (Login)</Link></li>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/services">All Services</Link></li>
                  <li><Link to="/journals">Journals</Link></li>
                  <li><Link to="/membership">Membership</Link></li>
                  <li><Link to="/awards">Awards</Link></li>
                  <li><Link to="/community">Community</Link></li>
                  <li><Link to="/contact">Policies</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                </ul>
              </div>

              {/* Column 2: Research Services */}
              <div className="footer-col">
                <h4 className="footer-col-title">Research Services</h4>
                <ul className="footer-links">
                  <li><Link to="/services/phd-thesis">Ph.D. Thesis Support</Link></li>
                  <li><Link to="/services/research-publication-support">Research Publication Support</Link></li>
                  <li><Link to="/services/book-chapter-publishing">Book Chapter Publishing</Link></li>
                  <li><Link to="/services/patent-ip-facilitation">Patent & IP Facilitation</Link></li>
                  <li><Link to="/services/funding-grant-assistance">Research Grant Assistance</Link></li>
                  <li><Link to="/services/industry-academic-collaboration">Industry-Academic Collaboration</Link></li>
                  <li><Link to="/services/conference-seminar-management">Conference & Seminar Management</Link></li>
                  <li><Link to="/services/journal-management-ojs">Journal Management (OJS Hosting)</Link></li>
                  <li><Link to="/services/innovation-startup-incubation">Startup Incubation</Link></li>
                  <li><Link to="/services/student-project-support">Student Project Support</Link></li>
                </ul>
              </div>

              {/* Column 3: Collaborate & Publish */}
              <div className="footer-col">
                <h4 className="footer-col-title">Collaborate & Publish</h4>
                <ul className="footer-links">
                  <li><Link to="/sci-scie-journals">SCI / SCIE Journals</Link></li>
                  <li><Link to="/scopus-indexed-journals">Scopus Indexed Journals</Link></li>
                  <li><Link to="/journals#wos">Web of Science Core</Link></li>
                  <li><Link to="/journals#ugc">UGC-CARE Listed</Link></li>
                  <li><Link to="/community#reviewer">Join as Reviewer</Link></li>
                  <li><Link to="/community#editorial">Join Editorial Board</Link></li>
                  <li><Link to="/community#collaborate">Collaborate With Us</Link></li>
                  <li><Link to="/community#benefits">Community Benefits</Link></li>
                  <li><Link to="/contact">Become Partner</Link></li>
                </ul>
              </div>

              {/* Column 4: Professional Growth */}
              <div className="footer-col">
                <h4 className="footer-col-title">Professional Growth</h4>
                <ul className="footer-links">
                  <li><Link to="/services/accreditation-ranking">Accreditation & Ranking Support</Link></li>
                  <li><Link to="/services/internship-skill-training">Internship & Professional Training</Link></li>
                  <li><Link to="/services/international-education-services">International Education Services</Link></li>
                  <li><Link to="/services/faculty-development-mentorship">Faculty Development & Mentorship</Link></li>
                </ul>
              </div>

              {/* Column 5: Get in Touch */}
              <div className="footer-col">
                <h4 className="footer-col-title">Get in Touch</h4>
                <div className="footer-contact-list">
                  <div className="footer-contact-item">
                    <MapPin size={18} className="contact-icon" />
                    <span>#01, Kumathe Complex, Babaleswar, Vijayapur, Karnataka – 586101</span>
                  </div>
                  <div className="footer-contact-item">
                    <Mail size={16} className="contact-icon" />
                    <a href="mailto:support@asracademicresearch.com">support@asracademicresearch.com</a>
                  </div>
                  <div className="footer-contact-item">
                    <Phone size={16} className="contact-icon" />
                    <a href="tel:+919515207724">+91 95152 07724</a>
                  </div>
                </div>

                <div className="footer-social-wrapper">
                  <div className="footer-social-icons">
                    <a href="https://www.linkedin.com/in/asr-academic-research-solutions-b62270395/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                      <LinkedinIcon size={15} />
                    </a>
                    <a href="https://www.instagram.com/asr_academic_research_solution?igsh=eW90dnBoNXQwem54" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                      <InstagramIcon size={15} />
                    </a>
                    <a href="https://www.facebook.com/share/1ATyCpBFeY/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
                      <FacebookIcon size={15} />
                    </a>
                    <a href="https://t.me/SCI_Scopus_Journal_Publications" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Telegram">
                      <Send size={15} />
                    </a>
                    <a href="https://www.youtube.com/@ASRAcademicResearchSolutions" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="YouTube">
                      <YoutubeIcon size={15} />
                    </a>
                    <a href="https://x.com/ASR_Acad_Res" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Twitter">
                      <TwitterIcon size={15} />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-container footer-bottom-container">
            <p>© 2026 ASR Academic Research Solutions. All Rights Reserved. Designed for Excellence</p>
            <div className="footer-bottom-links">
              <Link to="/contact">Privacy Policy</Link>
              <Link to="/contact">Terms of Service</Link>
              <Link to="/contact">Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="floating-contact-buttons">
        <a 
          href="tel:+919515207724" 
          className="floating-action-btn btn-phone" 
          aria-label="Call Us" 
          title="Call Us Now"
        >
          <PhoneCall size={22} />
        </a>
        <a 
          href="https://wa.link/yr91lr" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="floating-action-btn btn-whatsapp" 
          aria-label="Chat on WhatsApp" 
          title="Chat with our experts on WhatsApp"
        >
          <MessageCircle size={24} />
        </a>
      </div>
    </>
  );
};

export default Footer;
