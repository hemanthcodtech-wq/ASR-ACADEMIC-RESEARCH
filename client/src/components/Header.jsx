import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import {
  CheckCircle,
  Award,
  Mail,
  Phone,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  FileCheck,
  BookOpen,
  Handshake,
  Globe,
  Users,
  Compass,
  GraduationCap,
  BookMarked,
  Lightbulb,
  Sparkles,
  DollarSign,
  Building2,
  LogIn,
  UserCheck
} from 'lucide-react';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="header-wrapper">
      {/* Top Banner */}
      <div className="top-banner">
        <div className="top-banner-container">
          <div className="top-banner-left">
            <span className="badge-item">
              <CheckCircle size={14} className="icon-gold" />
              <span>MSME Registered | Govt. of India</span>
              <span className="verified-pill">VERIFIED</span>
            </span>
            <span className="top-divider">|</span>
            <span className="badge-item">
              <Award size={14} className="icon-gold" />
              <span>15+ Years of Excellence</span>
            </span>
            <span className="top-divider">|</span>
            <span className="highlight-ticker">
              ✨ Ph.D. Thesis & Publication Support 🌟
            </span>
          </div>

          <div className="top-banner-right">
            <a href="mailto:support@asracademicresearch.com" className="contact-link">
              <Mail size={13} />
              <span>support@asracademicresearch.com</span>
            </a>
            <a href="tel:+919515207724" className="contact-link">
              <Phone size={13} />
              <span>+91 95152 07724</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="main-navbar">
        <div className="navbar-container">
          <Link to="/" className="brand-logo" onClick={closeMenu}>
            <img src={logo} alt="ASR Academic Research Solutions" className="logo-img" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-menu">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
              About Us
            </Link>
            
            {/* Services Dropdown */}
            <div 
              className={`nav-dropdown ${activeDropdown === 'services' ? 'is-open' : ''}`}
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                type="button"
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/services') ? 'active' : ''}`}
                onClick={() => toggleDropdown('services')}
              >
                Services <ChevronDown size={15} className="chevron-icon" />
              </button>
              {activeDropdown === 'services' && (
                <div className="dropdown-menu" style={{ minWidth: '340px' }}>
                  <Link to="/services" className="dropdown-item-link" onClick={closeMenu}>
                    <div className="dropdown-item-icon"><Sparkles size={16} /></div>
                    <div className="dropdown-item-text">
                      <span className="dropdown-item-title">All Services Overview</span>
                      <span className="dropdown-item-desc">Browse complete suite of academic solutions</span>
                    </div>
                  </Link>

                  <div className="dropdown-divider"></div>

                  <Link to="/services/phd-thesis" className="dropdown-item-link" onClick={closeMenu}>
                    <div className="dropdown-item-icon"><GraduationCap size={16} /></div>
                    <div className="dropdown-item-text">
                      <span className="dropdown-item-title">Ph.D. Thesis Support</span>
                      <span className="dropdown-item-desc">Topic to final submission & viva</span>
                    </div>
                  </Link>

                  <Link to="/services/research-publication-support" className="dropdown-item-link" onClick={closeMenu}>
                    <div className="dropdown-item-icon"><BookMarked size={16} /></div>
                    <div className="dropdown-item-text">
                      <span className="dropdown-item-title">Research Publication Support</span>
                      <span className="dropdown-item-desc">Scopus, SCI & WoS publication</span>
                    </div>
                  </Link>

                  <Link to="/services/book-chapter-publishing" className="dropdown-item-link" onClick={closeMenu}>
                    <div className="dropdown-item-icon"><BookOpen size={16} /></div>
                    <div className="dropdown-item-text">
                      <span className="dropdown-item-title">Book & Chapter Publishing</span>
                      <span className="dropdown-item-desc">ISBN-indexed edited volumes</span>
                    </div>
                  </Link>

                  <Link to="/services/patent-ip-facilitation" className="dropdown-item-link" onClick={closeMenu}>
                    <div className="dropdown-item-icon"><Lightbulb size={16} /></div>
                    <div className="dropdown-item-text">
                      <span className="dropdown-item-title">Patent & IP Facilitation</span>
                      <span className="dropdown-item-desc">Prior-art & patent grant assistance</span>
                    </div>
                  </Link>

                  <Link to="/services/innovation-startup-incubation" className="dropdown-item-link" onClick={closeMenu}>
                    <div className="dropdown-item-icon"><Building2 size={16} /></div>
                    <div className="dropdown-item-text">
                      <span className="dropdown-item-title">Innovation & Startup Incubation</span>
                      <span className="dropdown-item-desc">Prototyping & seed funding</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Journals Dropdown */}
            <div 
              className={`nav-dropdown ${activeDropdown === 'journals' ? 'is-open' : ''}`}
              onMouseEnter={() => setActiveDropdown('journals')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                type="button"
                className={`nav-link dropdown-toggle ${location.pathname.includes('journals') ? 'active' : ''}`}
                onClick={() => toggleDropdown('journals')}
              >
                Journals <ChevronDown size={15} className="chevron-icon" />
              </button>
              {activeDropdown === 'journals' && (
                <div className="dropdown-menu" style={{ minWidth: '320px' }}>
                  <Link to="/sci-scie-journals" className="dropdown-item-link" onClick={closeMenu}>
                    <div className="dropdown-item-icon" style={{ color: '#2563eb', background: '#eff6ff' }}>
                      <Award size={16} />
                    </div>
                    <div className="dropdown-item-text">
                      <span className="dropdown-item-title">SCI / SCIE Journals</span>
                      <span className="dropdown-item-desc">Clarivate Web of Science (62 Journals)</span>
                    </div>
                  </Link>

                  <Link to="/scopus-indexed-journals" className="dropdown-item-link" onClick={closeMenu}>
                    <div className="dropdown-item-icon" style={{ color: '#f59e0b', background: '#fffbeb' }}>
                      <BookOpen size={16} />
                    </div>
                    <div className="dropdown-item-text">
                      <span className="dropdown-item-title">Scopus Indexed Journals</span>
                      <span className="dropdown-item-desc">Elsevier active source list (58 Journals)</span>
                    </div>
                  </Link>

                  <div className="dropdown-divider"></div>

                  <Link to="/journals" className="dropdown-item-link" onClick={closeMenu}>
                    <div className="dropdown-item-icon"><Globe size={16} /></div>
                    <div className="dropdown-item-text">
                      <span className="dropdown-item-title">All Journals Overview</span>
                      <span className="dropdown-item-desc">WoS Core, UGC-CARE & Fast Track</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link to="/membership" className={`nav-link ${location.pathname === '/membership' ? 'active' : ''}`}>
              Membership
            </Link>
            <Link to="/awards" className={`nav-link ${location.pathname === '/awards' ? 'active' : ''}`}>
              Awards
            </Link>

            {/* Enhanced Community Dropdown (Matching your uploaded image style with icons and clean styling) */}
            <div 
              className={`nav-dropdown ${activeDropdown === 'community' ? 'is-open' : ''}`}
              onMouseEnter={() => setActiveDropdown('community')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                type="button"
                className={`nav-link dropdown-toggle ${location.pathname.includes('community') || location.pathname.includes('reviewer') || location.pathname.includes('editorial') || location.pathname.includes('collaborate') || location.pathname.includes('partner') ? 'active' : ''}`}
                onClick={() => toggleDropdown('community')}
              >
                Community <ChevronDown size={15} className="chevron-icon" />
              </button>
              {activeDropdown === 'community' && (
                <div className="dropdown-menu" style={{ minWidth: '290px' }}>
                  <Link to="/join-as-reviewer" className="dropdown-item-link" onClick={closeMenu}>
                    <div className="dropdown-item-icon"><FileCheck size={16} /></div>
                    <div className="dropdown-item-text">
                      <span className="dropdown-item-title">Join as Reviewer</span>
                      <span className="dropdown-item-desc">Shape academic quality</span>
                    </div>
                  </Link>

                  <Link to="/join-editorial-board" className="dropdown-item-link" onClick={closeMenu}>
                    <div className="dropdown-item-icon"><Award size={16} /></div>
                    <div className="dropdown-item-text">
                      <span className="dropdown-item-title">Join Editorial Board</span>
                      <span className="dropdown-item-desc">Research leadership roles</span>
                    </div>
                  </Link>

                  <Link to="/collaborate-with-us" className="dropdown-item-link" onClick={closeMenu}>
                    <div className="dropdown-item-icon"><Handshake size={16} /></div>
                    <div className="dropdown-item-text">
                      <span className="dropdown-item-title">Collaborate With Us</span>
                      <span className="dropdown-item-desc">Institutional MoUs & projects</span>
                    </div>
                  </Link>

                  <Link to="/community-benefits" className="dropdown-item-link" onClick={closeMenu}>
                    <div className="dropdown-item-icon"><Globe size={16} /></div>
                    <div className="dropdown-item-text">
                      <span className="dropdown-item-title">Community Benefits</span>
                      <span className="dropdown-item-desc">Network & learning privileges</span>
                    </div>
                  </Link>

                  <Link to="/become-partner" className="dropdown-item-link" onClick={closeMenu}>
                    <div className="dropdown-item-icon"><Users size={16} /></div>
                    <div className="dropdown-item-text">
                      <span className="dropdown-item-title">Become Partner</span>
                      <span className="dropdown-item-desc">Expand regional outreach</span>
                    </div>
                  </Link>

                  <div className="dropdown-divider"></div>

                  <Link to="/community" className="dropdown-item-link" onClick={closeMenu}>
                    <div className="dropdown-item-icon"><Sparkles size={16} /></div>
                    <div className="dropdown-item-text">
                      <span className="dropdown-item-title">Community Overview</span>
                      <span className="dropdown-item-desc">Global knowledge network</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`}>
              Blog
            </Link>
            <Link to="/contact" className="nav-link contact-pill">
              Contact Us
            </Link>
          </div>

          <div className="navbar-action">
            <Link 
              to="/login" 
              className={`btn-author-login ${location.pathname.includes('login') || location.pathname.includes('author') ? 'active-auth' : ''}`}
              title="Author Paper Tracking Portal"
            >
              <LogIn size={15} />
              <span>Author Login</span>
            </Link>

            <a 
              href="https://wa.link/yr91lr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-pay"
            >
              <span>Pay Now</span>
              <ArrowRight size={15} />
            </a>
            
            <button 
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu-drawer">
            <Link to="/login" onClick={closeMenu} style={{ background: '#eff6ff', color: '#1d4ed8', fontWeight: 800 }}>
              🔐 Author Portal Login
            </Link>
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/about" onClick={closeMenu}>About Us</Link>
            <Link to="/services" onClick={closeMenu}>Services</Link>
            <Link to="/sci-scie-journals" onClick={closeMenu}>SCI / SCIE Journals</Link>
            <Link to="/scopus-indexed-journals" onClick={closeMenu}>Scopus Indexed Journals</Link>
            <Link to="/membership" onClick={closeMenu}>Membership</Link>
            <Link to="/awards" onClick={closeMenu}>Awards</Link>
            <Link to="/join-as-reviewer" onClick={closeMenu}>Join as Reviewer</Link>
            <Link to="/join-editorial-board" onClick={closeMenu}>Join Editorial Board</Link>
            <Link to="/collaborate-with-us" onClick={closeMenu}>Collaborate With Us</Link>
            <Link to="/community-benefits" onClick={closeMenu}>Community Benefits</Link>
            <Link to="/become-partner" onClick={closeMenu}>Become Partner</Link>
            <Link to="/blog" onClick={closeMenu}>Blog</Link>
            <Link to="/contact" onClick={closeMenu}>Contact Us</Link>
            <div className="mobile-actions">
              <a href="https://wa.link/yr91lr" className="btn-pay mobile-btn-pay">
                Pay Now <ArrowRight size={15} />
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
