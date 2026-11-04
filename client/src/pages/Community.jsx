import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  CheckCircle,
  FileCheck,
  Award,
  Globe,
  Handshake,
  ArrowRight
} from 'lucide-react';
import './Community.css';

const Community = () => {
  return (
    <div className="page-container">
      <div className="page-header-banner">
        <span className="section-pretitle">GLOBAL KNOWLEDGE NETWORK</span>
        <h1>Be Part of a Global Academic & Research Community</h1>
        <p>
          Join a thriving network of researchers, academicians, reviewers, and institutions working together to advance impactful research worldwide.
        </p>
      </div>

      <div className="page-content-wrapper">
        <div className="community-pillars-grid">
          {/* Join as Reviewer */}
          <div className="card-detail-item" id="reviewer">
            <div className="card-icon-wrapper">
              <FileCheck size={26} />
            </div>
            <h3>Join as Reviewer</h3>
            <p>
              Contribute to maintaining research quality by reviewing academic manuscripts for high-impact international journals and conferences.
            </p>
            <ul className="card-checklist">
              <li><CheckCircle size={15} color="#10b981" /> Official Peer Reviewer Certificate</li>
              <li><CheckCircle size={15} color="#10b981" /> Complimentary access to research paper archives</li>
              <li><CheckCircle size={15} color="#10b981" /> Academic profile elevation & Publons/WoS credit</li>
            </ul>
            <div className="service-card-actions">
              <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Join as Reviewer <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Editorial Board */}
          <div className="card-detail-item" id="editorial">
            <div className="card-icon-wrapper">
              <Award size={26} />
            </div>
            <h3>Editorial Board</h3>
            <p>
              Take a leadership role in shaping high-quality academic publications, setting peer review policies, and commissioning special thematic issues.
            </p>
            <ul className="card-checklist">
              <li><CheckCircle size={15} color="#10b981" /> Global academic visibility and prestige</li>
              <li><CheckCircle size={15} color="#10b981" /> Leadership roles as Associate or Guest Editor</li>
              <li><CheckCircle size={15} color="#10b981" /> International research networking with editors worldwide</li>
            </ul>
            <div className="service-card-actions">
              <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Apply for Editorial Board <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Collaborate Us */}
          <div className="card-detail-item" id="collaborate">
            <div className="card-icon-wrapper">
              <Handshake size={26} />
            </div>
            <h3>Collaborate With Us</h3>
            <p>
              Partner with ASR Academic Research Solutions for interdisciplinary research projects, university MoUs, joint seminars, and faculty exchanges.
            </p>
            <ul className="card-checklist">
              <li><CheckCircle size={15} color="#10b981" /> Formal Institutional MoUs & partnerships</li>
              <li><CheckCircle size={15} color="#10b981" /> Joint innovation & patent filing projects</li>
              <li><CheckCircle size={15} color="#10b981" /> Continuous academic development & support</li>
            </ul>
            <div className="service-card-actions">
              <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Collaborate Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Member Benefits */}
          <div className="card-detail-item" id="benefits">
            <div className="card-icon-wrapper">
              <Globe size={26} />
            </div>
            <h3>Member Benefits</h3>
            <p>
              Unlock exclusive opportunities designed to support career development, scientific visibility, and institutional prestige.
            </p>
            <ul className="card-checklist">
              <li><CheckCircle size={15} color="#10b981" /> Global networking sessions & conferences</li>
              <li><CheckCircle size={15} color="#10b981" /> Exclusive methodological workshops & webinars</li>
              <li><CheckCircle size={15} color="#10b981" /> Direct eligibility for prestigious annual awards</li>
            </ul>
            <div className="service-card-actions">
              <Link to="/membership" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Explore All Benefits <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;

