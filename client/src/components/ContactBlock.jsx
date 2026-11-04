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
  CheckCircle2
} from 'lucide-react';
import {
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  TwitterIcon
} from './SocialIcons';
import '../pages/Contact.css';

const ContactBlock = ({ 
  defaultService = 'ASR Research Publication Support',
  title = "Start Your Research Journey with Expert Guidance",
  subtitle = "Have a question, need expert advice, or want to get started with one of our services? Reach out to our team and take the first step toward academic success."
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: defaultService,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 180) return;
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
    <div className="service-contact-section" id="cb-fn">
      <div className="section-container">
        
        {/* Contact Intro Header */}
        <div className="cb-header-block">
          <div className="cb-pretitle-pill">
            <Sparkles size={13} />
            <span>CONTACT US</span>
          </div>
          <h2 className="cb-main-heading">{title}</h2>
          <p className="cb-sub-desc">{subtitle}</p>
        </div>

        {/* Main Grid: Form (Left) + Sidebar (Right) */}
        <div className="contact-main-grid-aligned">
          
          {/* Form Card */}
          <div className="contact-form-premium-card">
            <div className="form-card-header">
              <span className="form-badge-pill">SEND US YOUR INQUIRY</span>
              <h2>Send Us Your Inquiry</h2>
              <p>Please fill out the form below and our team will get back to you with the right guidance and support.</p>
            </div>

            {submitted ? (
              <div className="form-success-alert">
                <CheckCircle size={28} className="success-check-icon" />
                <div>
                  <h4>Thank you! Your inquiry has been submitted.</h4>
                  <p>Our academic research consultants will contact you within 24 working hours with tailored guidance.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="premium-inquiry-form">
                <div className="form-fields-grid">
                  <div className="field-group">
                    <label htmlFor="cb-fn-input">First Name *</label>
                    <input
                      type="text"
                      id="cb-fn-input"
                      name="firstName"
                      required
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field-group">
                    <label htmlFor="cb-ln-input">Last Name</label>
                    <input
                      type="text"
                      id="cb-ln-input"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-fields-grid">
                  <div className="field-group">
                    <label htmlFor="cb-em-input">Email Address *</label>
                    <input
                      type="email"
                      id="cb-em-input"
                      name="email"
                      required
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="field-group">
                    <label htmlFor="cb-ph-input">Phone Number *</label>
                    <input
                      type="tel"
                      id="cb-ph-input"
                      name="phone"
                      required
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label htmlFor="cb-svc-input">Service Required</label>
                  <select
                    id="cb-svc-input"
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
                    <label htmlFor="cb-msg-input">Message ({formData.message.length} / 180)</label>
                    <span className="char-counter">{180 - formData.message.length} characters left</span>
                  </div>
                  <textarea
                    id="cb-msg-input"
                    name="message"
                    required
                    rows={4}
                    placeholder="Briefly describe your research paper, target journal (Scopus/SCI), or academic goals..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn-submit-inquiry">
                  <span>Submit Inquiry</span>
                  <Send size={16} />
                </button>

                <div className="form-privacy-note">
                  <ShieldCheck size={14} className="shield-icon" />
                  <span>Free Consultation Available | Fast response for academic and research queries</span>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="contact-sidebar-col">
            
            {/* 24/7 Academic Support Box */}
            <div className="whatsapp-vip-card">
              <div className="vip-badge-pill">24/7 ACADEMIC SUPPORT</div>
              <div className="vip-icon-bubble">
                <MessageCircle size={28} />
              </div>
              <h3>Need Immediate Assistance?</h3>
              <p>
                Chat with our experts directly on WhatsApp for quick support related to publications, thesis guidance, patents, journals, and academic services.
              </p>

              <div className="vip-buttons-row">
                <a 
                  href="https://wa.link/yr91lr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-whatsapp-chat-pill"
                >
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
                <a 
                  href="#cb-fn-input" 
                  className="btn-free-consult-pill"
                >
                  Free Consultation
                </a>
              </div>

              <div className="vip-perks-list">
                <div className="vip-perk-item"><CheckCircle2 size={16} /> 15+ Years of Excellence</div>
                <div className="vip-perk-item"><CheckCircle2 size={16} /> 1000+ Research Projects</div>
                <div className="vip-perk-item"><ShieldCheck size={16} /> Confidential Support</div>
                <div className="vip-perk-item"><Globe size={16} /> Global Academic Assistance</div>
              </div>
            </div>

            {/* Social Platform Links */}
            <div className="social-connect-card-elevated">
              <h4>Stay Connected</h4>
              <p>Follow our scholarly network for call for papers and academic breakthroughs:</p>
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

        {/* 4 Regional Offices Section */}
        <div className="offices-showcase-wrapper" style={{ marginTop: '70px', padding: 0 }}>
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

      </div>
    </div>
  );
};

export default ContactBlock;
