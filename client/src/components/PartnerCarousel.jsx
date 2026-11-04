import React from 'react';
import {
  BookOpen,
  Award,
  Globe,
  CheckCircle,
  FileText,
  ShieldCheck,
  Building2,
  Sparkles
} from 'lucide-react';
import './PartnerCarousel.css';

const partnerList = [
  { name: "Scopus (Elsevier)", code: "SC", color: "#f59e0b" },
  { name: "Web of Science (Clarivate)", code: "WoS", color: "#2563eb" },
  { name: "Science Citation Index (SCI/SCIE)", code: "SCI", color: "#10b981" },
  { name: "IEEE Xplore Digital Library", code: "IEEE", color: "#0284c7" },
  { name: "Springer Nature", code: "SN", color: "#ea580c" },
  { name: "UGC-CARE Listed", code: "UGC", color: "#6366f1" },
  { name: "Directory of Open Access Journals (DOAJ)", code: "DOAJ", color: "#14b8a6" },
  { name: "Crossref (DOI Official)", code: "DOI", color: "#ec4899" },
  { name: "Taylor & Francis Group", code: "T&F", color: "#8b5cf6" },
  { name: "Wiley Online Library", code: "WOL", color: "#059669" }
];

const PartnerCarousel = () => {
  // Duplicate for seamless infinite loop
  const infinitePartners = [...partnerList, ...partnerList];

  return (
    <div className="partner-carousel-section">
      <div className="partner-carousel-header">
        <span>OUR INDEXING PARTNERS & ACADEMIC RECOGNITION</span>
      </div>

      <div className="ticker-track-wrap">
        <div className="ticker-track">
          {infinitePartners.map((p, idx) => (
            <div className="partner-logo-pill" key={idx}>
              <span className="partner-badge-icon" style={{ color: p.color, background: `${p.color}15` }}>
                {p.code}
              </span>
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerCarousel;

