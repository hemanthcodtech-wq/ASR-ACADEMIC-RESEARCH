import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  ShieldCheck,
  CheckCircle,
  Clock,
  Globe,
  Sparkles,
  ArrowRight,
  Headphones,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import {
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  TwitterIcon
} from '../components/SocialIcons';
import PageHero from '../components/PageHero';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: 'ASR Ph.D. Thesis Support Services',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 250) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const servicesList = [
    "ASR Ph.D. Thesis Support Services",
    "ASR Research Publication Support",
    "ASR Academic Book & Chapter Publishing",
    "ASR Patent & IP Facilitation Services",
    "ASR Innovation & Startup Incubation",
    "ASR Funding & Research Grant Assistance",
    "ASR Industry-Academic Collaboration",
    "ASR Conference & Seminar Management",
    "ASR Faculty Development & Mentorship",
    "ASR International Education Services",
    "ASR Internship & Professional Skill Training",
    "ASR Student Project Support Services",
    "ASR Institutional Accreditation & Ranking",
    "ASR Journal Management & OJS Hosting",
    "Other"
  ];

  return (
    <div className="contact-page-wrapper">
      {/* 1. Hero Section */}
      <PageHero
        badge="24/7 DEDICATED ACADEMIC SUPPORT"
        title="Start Your Research Journey with"
        highlightText="Expert Guidance"
        subtitle="Have a question, need manuscript evaluation, or want to start your PhD support? Connect with our senior consultants across India and globally."
      >
        {/* Quick Metrics Bar */}
        <div className="contact-hero-metrics" style={{ margin: '0 auto' }}>
          <div className="hero-metric-item">
            <span className="metric-val">&lt; 2 Hrs</span>
            <span className="metric-lbl">Response Time</span>
          </div>
          <div className="metric-divider"></div>
          <div className="hero-metric-item">
            <span className="metric-val">4 Hubs</span>
            <span className="metric-lbl">Regional Presence</span>
          </div>
          <div className="metric-divider"></div>
          <div className="hero-metric-item">
            <span className="metric-val">100%</span>
            <span className="metric-lbl">Confidential &amp; Ethical</span>
          </div>
          <div className="metric-divider"></div>
          <div className="hero-metric-item">
            <span className="metric-val">ISO 9001</span>
            <span className="metric-lbl">Quality Certified</span>
          </div>
        </div>
      </PageHero>

      {/* 2. Interactive Quick Contact Strip */}
      <section className="contact-quick-strip">
        <div className="contact-strip-container">
          <div className="quick-contact-item">
            <div className="strip-icon-box"><Phone size={20} /></div>
            <div>
              <span className="strip-label">Direct Phone Helpline</span>
              <a href="tel:+919515207724" className="strip-val">+91 9515207724</a>
            </div>
          </div>

          <div className="strip-divider"></div>

          <div className="quick-contact-item">
            <div className="strip-icon-box" style={{ background: '#f0fdf4', color: '#16a34a' }}><MessageCircle size={20} /></div>
            <div>
              <span className="strip-label">WhatsApp Quick Assistance</span>
              <a href="https://wa.me/919515207724" target="_blank" rel="noopener noreferrer" className="strip-val" style={{ color: '#16a34a' }}>Chat with Expert</a>
            </div>
          </div>

          <div className="strip-divider"></div>

          <div className="quick-contact-item">
            <div className="strip-icon-box"><Mail size={20} /></div>
            <div>
              <span className="strip-label">Official Support Email</span>
              <a href="mailto:support@asracademicresearch.com" className="strip-val">support@asracademicresearch.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Form & Assistance Sidebar */}
      <section className="contact-main-content-section">
        <div className="contact-content-container">
          <div className="contact-layout-grid">
            
            {/* Form Column */}
            <div className="contact-form-premium-card">
              <div className="form-card-header">
                <span className="form-badge-pill">SEND INQUIRY</span>
                <h2>Let's Discuss Your Academic Goals</h2>
                <p>Fill out the details below and an academic advisor will analyze your requirement and provide tailored guidance.</p>
              </div>

              {submitted ? (
                <div className="form-success-alert">
                  <CheckCircle size={28} className="success-check-icon" />
                  <div>
                    <h4>Inquiry Submitted Successfully!</h4>
                    <p>Thank you for reaching out. A dedicated research consultant will contact you via email or phone within 24 working hours.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="premium-inquiry-form">
                  <div className="form-fields-grid">
                    <div className="field-group">
                      <label htmlFor="fn">First Name *</label>
                      <input
                        type="text"
                        id="fn"
                        name="firstName"
                        required
                        placeholder="e.g. Dr. Ramesh"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="field-group">
                      <label htmlFor="ln">Last Name *</label>
                      <input
                        type="text"
                        id="ln"
                        name="lastName"
                        required
                        placeholder="e.g. Kumar"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-fields-grid">
                    <div className="field-group">
                      <label htmlFor="em">Email Address *</label>
                      <input
                        type="email"
                        id="em"
                        name="email"
                        required
                        placeholder="e.g. scholar@university.edu"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="field-group">
                      <label htmlFor="ph">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        id="ph"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="field-group">
                    <label htmlFor="svc">Select Service Category *</label>
                    <select
                      id="svc"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                    >
                      {servicesList.map((svc, i) => (
                        <option key={i} value={svc}>{svc}</option>
                      ))}
                    </select>
                  </div>

                  <div className="field-group">
                    <div className="label-with-counter">
                      <label htmlFor="msg">Your Requirement / Message *</label>
                      <span className="char-counter">{formData.message.length} / 250</span>
                    </div>
                    <textarea
                      id="msg"
                      name="message"
                      required
                      rows={4}
                      placeholder="Briefly describe your topic, domain, target quartile (Q1/Q2), or specific deadlines..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="btn-submit-inquiry">
                    <span>Send Message & Request Free Consultation</span>
                    <Send size={16} />
                  </button>

                  <div className="form-privacy-note">
                    <ShieldCheck size={14} className="shield-icon" />
                    <span>Your data is strictly confidential under Non-Disclosure & ISO 9001 ethics.</span>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Column: WhatsApp + Value Props + Social */}
            <div className="contact-sidebar-col">
              
              {/* WhatsApp VIP Card */}
              <div className="whatsapp-vip-card">
                <div className="vip-icon-bubble">
                  <MessageCircle size={28} />
                </div>
                <h3>Instant Chat on WhatsApp</h3>
                <p>
                  Prefer real-time messaging? Connect directly with our editorial and PhD advisory desk for immediate responses.
                </p>
                <a 
                  href="https://wa.me/919515207724" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-whatsapp-vip"
                >
                  <MessageCircle size={18} /> Chat with Research Team
                </a>

                <div className="vip-perks-list">
                  <div className="vip-perk-item"><CheckCircle2 size={15} /> 15+ Years Academic Consultancy</div>
                  <div className="vip-perk-item"><CheckCircle2 size={15} /> 100% Non-Disclosure Guaranteed</div>
                  <div className="vip-perk-item"><CheckCircle2 size={15} /> Free Preliminary Topic Assessment</div>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="working-hours-card">
                <div className="card-top-icon-row">
                  <Clock size={20} className="clock-icon" />
                  <h4>Working Hours & Availability</h4>
                </div>
                <div className="hours-row">
                  <span>Monday – Saturday:</span>
                  <strong>9:00 AM – 7:30 PM IST</strong>
                </div>
                <div className="hours-row">
                  <span>Sunday:</span>
                  <strong>Emergency Publications Desk</strong>
                </div>
                <div className="hours-note">
                  * WhatsApp & Email inquiries are monitored 24/7 for overseas scholars.
                </div>
              </div>

              {/* Social Channels Card */}
              <div className="social-connect-card-elevated">
                <h4>Follow Our Academic Network</h4>
                <p>Stay updated on high-impact journal call for papers, conferences, and scholarship announcements:</p>
                <div className="social-buttons-grid">
                  <a href="https://www.linkedin.com/in/asr-academic-research-solutions-b62270395/" target="_blank" rel="noopener noreferrer" className="soc-btn">
                    <LinkedinIcon size={16} color="#0077b5" /> LinkedIn
                  </a>
                  <a href="https://www.instagram.com/asr_academic_research_solution?igsh=eW90dnBoNXQwem54" target="_blank" rel="noopener noreferrer" className="soc-btn">
                    <InstagramIcon size={16} color="#e4405f" /> Instagram
                  </a>
                  <a href="https://www.facebook.com/share/1ATyCpBFeY/" target="_blank" rel="noopener noreferrer" className="soc-btn">
                    <FacebookIcon size={16} color="#1877f2" /> Facebook
                  </a>
                  <a href="https://t.me/SCI_Scopus_Journal_Publications" target="_blank" rel="noopener noreferrer" className="soc-btn">
                    <Send size={16} color="#229ed9" /> Telegram
                  </a>
                  <a href="https://www.youtube.com/@ASRAcademicResearchSolutions" target="_blank" rel="noopener noreferrer" className="soc-btn">
                    <YoutubeIcon size={16} color="#ff0000" /> YouTube
                  </a>
                  <a href="https://x.com/ASR_Acad_Res" target="_blank" rel="noopener noreferrer" className="soc-btn">
                    <TwitterIcon size={16} color="#1da1f2" /> Twitter
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. Enhanced 4 Regional Hubs Grid */}
      <section className="contact-offices-section">
        <div className="contact-offices-container">
          <div className="offices-header-box">
            <div className="offices-pretitle-badge">
              <MapPin size={13} className="office-pin-icon" />
              <span>OUR OFFICES</span>
            </div>
            <h2 className="offices-heading-title">
              Visit or Contact Our <span className="text-accent">Regional Hubs</span>
            </h2>
            <p className="offices-sub-desc">
              Connect with our dedicated academic support centers across Karnataka, Andhra Pradesh, and Tamil Nadu.
            </p>
          </div>

          <div className="regional-offices-grid">
            {/* 1. Head Office: Vijayapur */}
            <div className="regional-office-card head-office-featured">
              <div className="office-top-bar">
                <span className="badge-office-type head-badge">HEAD OFFICE</span>
                <span className="office-state-tag">Karnataka</span>
              </div>
              <h3 className="office-city-title">Vijayapur (Karnataka)</h3>
              
              <div className="office-info-list">
                <div className="office-info-row address-row">
                  <div className="office-icon-bubble">
                    <MapPin size={17} />
                  </div>
                  <span className="office-text">
                    #01, Kumathe Complex, TQ: Babaleshwar, Dist: Vijayapur, Kumathe, Karnataka – 586113
                  </span>
                </div>

                <div className="office-info-row">
                  <div className="office-icon-bubble">
                    <Mail size={16} />
                  </div>
                  <a href="mailto:support@asracademicresearch.com" className="office-link">
                    support@asracademicresearch.com
                  </a>
                </div>

                <div className="office-info-row">
                  <div className="office-icon-bubble">
                    <Phone size={16} />
                  </div>
                  <a href="tel:+919515207724" className="office-link highlight-phone">
                    +91 9515207724
                  </a>
                </div>
              </div>

              <div className="office-card-footer-cta">
                <a 
                  href="https://wa.me/919515207724?text=Hello%20ASR%20Vijayapur%20Head%20Office" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-office-whatsapp"
                >
                  <MessageCircle size={15} /> Quick Connect
                </a>
              </div>
            </div>

            {/* 2. Branch Office: Bengaluru */}
            <div className="regional-office-card">
              <div className="office-top-bar">
                <span className="badge-office-type">BRANCH OFFICE</span>
                <span className="office-state-tag">Karnataka</span>
              </div>
              <h3 className="office-city-title">Bengaluru (Karnataka)</h3>
              
              <div className="office-info-list">
                <div className="office-info-row address-row">
                  <div className="office-icon-bubble">
                    <MapPin size={17} />
                  </div>
                  <span className="office-text">
                    No. 12, 4th Cross, Near Alada Mara Bus Stop, Nagarbhavi Stage 2, Bengaluru, Karnataka – 560072
                  </span>
                </div>

                <div className="office-info-row">
                  <div className="office-icon-bubble">
                    <Mail size={16} />
                  </div>
                  <a href="mailto:support@asracademicresearch.com" className="office-link">
                    support@asracademicresearch.com
                  </a>
                </div>

                <div className="office-info-row">
                  <div className="office-icon-bubble">
                    <Phone size={16} />
                  </div>
                  <a href="tel:+919515207724" className="office-link highlight-phone">
                    +91 9515207724
                  </a>
                </div>
              </div>

              <div className="office-card-footer-cta">
                <a 
                  href="https://wa.me/919515207724?text=Hello%20ASR%20Bengaluru%20Branch" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-office-whatsapp"
                >
                  <MessageCircle size={15} /> Quick Connect
                </a>
              </div>
            </div>

            {/* 3. Branch Office: Rajahmundry */}
            <div className="regional-office-card">
              <div className="office-top-bar">
                <span className="badge-office-type">BRANCH OFFICE</span>
                <span className="office-state-tag">Andhra Pradesh</span>
              </div>
              <h3 className="office-city-title">Rajahmundry (Andhra Pradesh)</h3>
              
              <div className="office-info-list">
                <div className="office-info-row address-row">
                  <div className="office-icon-bubble">
                    <MapPin size={17} />
                  </div>
                  <span className="office-text">
                    No. 27, 4/1, Near Surya Global School, Municipal Shopping Complex, Kambal Tank, T. Nagar, Rajahmundry, Andhra Pradesh – 533101
                  </span>
                </div>

                <div className="office-info-row">
                  <div className="office-icon-bubble">
                    <Mail size={16} />
                  </div>
                  <a href="mailto:support@asracademicresearch.com" className="office-link">
                    support@asracademicresearch.com
                  </a>
                </div>

                <div className="office-info-row">
                  <div className="office-icon-bubble">
                    <Phone size={16} />
                  </div>
                  <a href="tel:+919515207724" className="office-link highlight-phone">
                    +91 9515207724
                  </a>
                </div>
              </div>

              <div className="office-card-footer-cta">
                <a 
                  href="https://wa.me/919515207724?text=Hello%20ASR%20Rajahmundry%20Branch" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-office-whatsapp"
                >
                  <MessageCircle size={15} /> Quick Connect
                </a>
              </div>
            </div>

            {/* 4. Branch Office: Madurai */}
            <div className="regional-office-card">
              <div className="office-top-bar">
                <span className="badge-office-type">BRANCH OFFICE</span>
                <span className="office-state-tag">Tamil Nadu</span>
              </div>
              <h3 className="office-city-title">Madurai (Tamil Nadu)</h3>
              
              <div className="office-info-list">
                <div className="office-info-row address-row">
                  <div className="office-icon-bubble">
                    <MapPin size={17} />
                  </div>
                  <span className="office-text">
                    249, MRN Complex, Kochi - Madurai Road, Near Sulthan Hotel, Madurai Main, Madurai, Tamil Nadu – 625001
                  </span>
                </div>

                <div className="office-info-row">
                  <div className="office-icon-bubble">
                    <Mail size={16} />
                  </div>
                  <a href="mailto:support@asracademicresearch.com" className="office-link">
                    support@asracademicresearch.com
                  </a>
                </div>

                <div className="office-info-row">
                  <div className="office-icon-bubble">
                    <Phone size={16} />
                  </div>
                  <a href="tel:+919515207724" className="office-link highlight-phone">
                    +91 9515207724
                  </a>
                </div>
              </div>

              <div className="office-card-footer-cta">
                <a 
                  href="https://wa.me/919515207724?text=Hello%20ASR%20Madurai%20Branch" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-office-whatsapp"
                >
                  <MessageCircle size={15} /> Quick Connect
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Google Map Embed for Vijayapur Karnataka */}
      <section className="contact-map-section">
        <div className="contact-map-container">
          <div className="map-frame-wrapper">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d488790.4299911064!2d75.712985!3d16.84246!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc6557d98aa706f%3A0xedd4a1794e8fe8d2!2sVijayapura%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1793624918522!5m2!1sen!2sin" 
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="strict-origin-when-cross-origin"
              title="ASR Academic Research Solutions Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
