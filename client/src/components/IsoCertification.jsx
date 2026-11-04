import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';
import { IsoSealOne, IsoSealTwo, IsoSealThree } from './IsoSeals';
import './IsoCertification.css';

const IsoCertification = () => {
  return (
    <section className="iso-showcase-section">
      {/* Header */}
      <div className="iso-showcase-header">
        <div className="iso-quality-pill">
          <Award size={14} /> QUALITY CERTIFICATION
        </div>
        
        <h2 className="iso-showcase-title">
          We've <span className="title-accent">Proven Our Quality</span>
        </h2>
        
        <p className="iso-showcase-desc">
          At ASR Academic Research Solutions, our top priority is to maintain the highest standards across academic, research, and innovation services. Our clients experience a level of quality and professionalism that consistently exceeds expectations.
        </p>
      </div>

      {/* Main Row: 3 ISO Cards (Left) + Detail Card (Right) */}
      <div className="iso-showcase-row">
        
        {/* Left Column: 3 White ISO Seal Badges */}
        <div className="iso-badges-col">
          {/* Card 1 */}
          <div className="iso-badge-card">
            <div className="iso-seal-icon-wrap">
              <IsoSealOne size={92} />
            </div>
            <h4>ISO 9001:2015</h4>
            <p>Quality Management System</p>
          </div>

          {/* Card 2 */}
          <div className="iso-badge-card">
            <div className="iso-seal-icon-wrap">
              <IsoSealTwo size={92} />
            </div>
            <h4>Internationally Recognized</h4>
            <p>Global Standards</p>
          </div>

          {/* Card 3 */}
          <div className="iso-badge-card">
            <div className="iso-seal-icon-wrap">
              <IsoSealThree size={92} />
            </div>
            <h4>Certified Excellence</h4>
            <p>Rigorous Evaluation</p>
          </div>
        </div>

        {/* Right Column: Clean White Detail Card */}
        <div className="iso-detail-card">
          <div className="iso-verified-tag">
            <ShieldCheck size={14} /> ISO 9001:2015 Certified
          </div>

          <h3 className="iso-detail-title">
            Demonstrating Excellence, Reliability & Consistency
          </h3>

          <p className="iso-detail-text">
            Following rigorous evaluation by authorized certification bodies, our systems and services have been verified to meet international quality standards. We are now certified with the ISO 9001:2015 Quality Management System, demonstrating the excellence, reliability, and consistency of our services.
          </p>

          <p className="iso-detail-text">
            This certification stands as a testament to the quality of our comprehensive solutions, including PhD thesis support, research and publication services, intellectual property and patent assistance, innovation and startup support, academic collaborations, and journal management.
          </p>
        </div>

      </div>
    </section>
  );
};

export default IsoCertification;

