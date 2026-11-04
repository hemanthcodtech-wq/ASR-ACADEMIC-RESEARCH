import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import journalsImg from '../assets/journals-feature.jpg';
import {
  Award,
  BookOpen,
  Search,
  Filter,
  CheckCircle,
  ArrowRight,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import ContactBlock from '../components/ContactBlock';
import './Journals.css';

export const sciJournalsData = [
  { name: "Journal of Energy Storage", eissn: "2352-152X", q: "Q1" },
  { name: "Energy Conversion and Management", eissn: "1879-2227", q: "Q1" },
  { name: "Electric Power Systems Research", eissn: "1873-2046", q: "Q1" },
  { name: "Applied Energy", eissn: "1872-9118", q: "Q1" },
  { name: "Environment, Development and Sustainability", eissn: "1573-2975", q: "Q2" },
  { name: "Electrical Engineering", eissn: "1432-0487", q: "Q2" },
  { name: "Renewable Energy", eissn: "1873-2461", q: "Q1" },
  { name: "Computers and Electronics in Agriculture", eissn: "1872-7107", q: "Q1" },
  { name: "Biomass and Bioenergy", eissn: "1873-2909", q: "Q1" },
  { name: "Agriculture, Ecosystems & Environment", eissn: "1873-2305", q: "Q1" },
  { name: "Biocontrol Science and Technology", eissn: "1360-0478", q: "Q2" },
  { name: "Biomedical Signal Processing & Control", eissn: "1746-8108", q: "Q1" },
  { name: "Knowledge Based Systems", eissn: "1872-7409", q: "Q1" },
  { name: "Biomedical Microdevices", eissn: "1572-8781", q: "Q2" },
  { name: "Int. Journal for Numerical Methods in Biomedical Engineering", eissn: "2040-7947", q: "Q2" },
  { name: "International Journal of Medical Informatics", eissn: "1872-8243", q: "Q1" },
  { name: "Computers in Biology and Medicine", eissn: "1879-0534", q: "Q1" },
  { name: "Computer Methods and Programs in Biomedicine", eissn: "1872-7565", q: "Q1" },
  { name: "Journal of Medical Systems", eissn: "1573-689X", q: "Q2" },
  { name: "Medical & Biological Engineering & Computing", eissn: "1741-0444", q: "Q2" },
  { name: "Medical Image Analysis", eissn: "1361-8423", q: "Q1" },
  { name: "Journal of Medical and Biological Engineering", eissn: "2199-4757", q: "Q3" },
  { name: "Journal of Visual Communication and Image Representation", eissn: "1090-2716", q: "Q2" },
  { name: "Journal of Microscopy", eissn: "1365-2818", q: "Q3" },
  { name: "Microscopy Research and Technique", eissn: "1097-0029", q: "Q3" },
  { name: "Pattern Recognition", eissn: "1873-5142", q: "Q1" },
  { name: "Computer Vision and Image Understanding", eissn: "1090-2317", q: "Q1" },
  { name: "International Journal of Computer Vision", eissn: "1573-1405", q: "Q1" },
  { name: "International Journal of Human–Computer Interaction", eissn: "1532-7590", q: "Q1" },
  { name: "Applied Intelligence", eissn: "1573-7497", q: "Q2" },
  { name: "Integration (The VLSI Journal)", eissn: "1872-7522", q: "Q2" },
  { name: "Expert Systems with Applications", eissn: "1873-6793", q: "Q1" },
  { name: "Analog Integrated Circuits and Signal Processing", eissn: "1573-1979", q: "Q3" },
  { name: "Applied Soft Computing", eissn: "1872-9681", q: "Q1" },
  { name: "International Journal of Bio-Inspired Computation", eissn: "1758-0374", q: "Q1" },
  { name: "Neural Computing and Applications", eissn: "1433-3058", q: "Q1" },
  { name: "Information Sciences", eissn: "1872-6291", q: "Q1" },
  { name: "Wireless Networks", eissn: "1572-8196", q: "Q2" },
  { name: "International Journal of Communication Systems", eissn: "1099-1131", q: "Q2" },
  { name: "Transactions on Emerging Telecommunication Technologies", eissn: "2161-3915", q: "Q2" },
  { name: "ISA Transactions", eissn: "1879-2022", q: "Q1" },
  { name: "Sustainable Computing: Informatics and Systems", eissn: "2210-5387", q: "Q1" },
  { name: "Engineering Applications of Artificial Intelligence", eissn: "1873-6769", q: "Q1" },
  { name: "Advances in Engineering Software", eissn: "1873-5339", q: "Q1" },
  { name: "Advanced Engineering Informatics", eissn: "1474-0354", q: "Q1" },
  { name: "Optimization and Engineering", eissn: "1389-4420", q: "Q2" },
  { name: "Engineering with Computers", eissn: "1435-5663", q: "Q1" },
  { name: "Resources Conservation and Recycling", eissn: "1879-0658", q: "Q1" },
  { name: "The Quarterly Journal of Finance", eissn: "2010-1406", q: "Q3" },
  { name: "Journal of Business Venturing", eissn: "1873-197X", q: "Q1" },
  { name: "International Journal of Management Education", eissn: "1878-1802", q: "Q1" },
  { name: "Journal of Business-to-Business Marketing", eissn: "1547-0628", q: "Q2" },
  { name: "Journal of Business Ethics", eissn: "1573-0697", q: "Q1" },
  { name: "Journal of Business Research", eissn: "1873-7978", q: "Q1" },
  { name: "Journal of Business & Industrial Marketing", eissn: "1758-5937", q: "Q2" },
  { name: "Int. Journal of Precision Engineering and Manufacturing-Green Technology", eissn: "2198-0810", q: "Q1" },
  { name: "Electronic Commerce Research and Applications", eissn: "1873-0345", q: "Q1" },
  { name: "Information & Management", eissn: "1872-7018", q: "Q1" },
  { name: "Information Processing & Management", eissn: "1873-5371", q: "Q1" },
  { name: "Education and Information Technologies", eissn: "1573-7608", q: "Q1" },
  { name: "Journal of Engineering Education", eissn: "2168-9830", q: "Q1" },
  { name: "Journal of Science Education and Technology", eissn: "1573-1839", q: "Q1" }
];

const SciJournals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuartile, setSelectedQuartile] = useState('ALL');
  const [copiedEissn, setCopiedEissn] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const handleCopy = (eissn) => {
    navigator.clipboard.writeText(eissn);
    setCopiedEissn(eissn);
    setTimeout(() => setCopiedEissn(null), 2000);
  };

  const filteredJournals = sciJournalsData.filter(j => {
    const matchesSearch = j.name.toLowerCase().includes(searchQuery.toLowerCase()) || j.eissn.includes(searchQuery);
    const matchesQ = selectedQuartile === 'ALL' || j.q === selectedQuartile;
    return matchesSearch && matchesQ;
  });

  const totalPages = Math.ceil(filteredJournals.length / itemsPerPage);
  const paginatedJournals = filteredJournals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <div className="sci-journals-page">
      {/* Premium Hero Showcase */}
      <section className="journals-hero-showcase">
        <div className="journals-hero-glow"></div>
        <div className="journals-hero-container">
          <div className="journals-hero-badge">
            <Sparkles size={14} className="hero-sparkle" />
            <span>HIGH IMPACT • INDEXED • INTERNATIONAL PUBLICATIONS</span>
          </div>

          <h1 className="journals-hero-heading">
            SCI / SCIE <span className="hero-text-accent">Journals</span>
          </h1>

          <p className="journals-hero-desc">
            Publish in Science Citation Index &amp; Science Citation Index Expanded journals indexed in the Web of Science Core Collection with verified Impact Factors and global academic recognition.
          </p>

          {/* Nav switcher pills */}
          <div className="journals-cta-nav-pills">
            <Link to="/sci-scie-journals" className="journal-nav-pill active-pill">
              <Award size={16} /> SCI / SCIE Journals ({sciJournalsData.length})
            </Link>
            <Link to="/scopus-indexed-journals" className="journal-nav-pill">
              <BookOpen size={16} /> Scopus Indexed Journals (58)
            </Link>
            <Link to="/journals" className="journal-nav-pill">
              <span>Overview</span> <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content & Table */}
      <div style={{ padding: '60px 0 60px', background: '#f8fafc' }}>
        {/* Controls */}
        <div className="table-controls-bar">
          <div className="search-input-box">
            <Search size={18} color="#2563eb" />
            <input 
              type="text" 
              placeholder="Search by journal name or EISSN..." 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>

          <div className="filter-quartile-group">
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quartile Filter:</span>
            {['ALL', 'Q1', 'Q2', 'Q3'].map(q => (
              <button 
                key={q}
                className={`filter-btn ${selectedQuartile === q ? 'active' : ''}`}
                onClick={() => { setSelectedQuartile(q); setCurrentPage(1); }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ maxWidth: '1280px', margin: '0 auto 16px', padding: '0 24px', fontSize: '13.5px', color: '#64748b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Showing <strong style={{ color: '#0f172a' }}>{paginatedJournals.length}</strong> of <strong style={{ color: '#0f172a' }}>{filteredJournals.length}</strong> indexed journals</span>
          <span>Page <strong style={{ color: '#2563eb' }}>{currentPage}</strong> of {totalPages || 1}</span>
        </div>

        {/* Table */}
        <div className="journal-table-container">
          <table className="journal-custom-table">
            <thead>
              <tr>
                <th style={{ width: '52%' }}>Journal Name</th>
                <th style={{ width: '26%' }}>EISSN Identifier</th>
                <th style={{ width: '10%', textAlign: 'center' }}>Quartile</th>
                <th style={{ width: '12%', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedJournals.map((j, i) => (
                <tr key={i}>
                  <td className="journal-name-cell">
                    <Award size={16} color="#2563eb" style={{ flexShrink: 0 }} />
                    <span>{j.name}</span>
                  </td>
                  <td>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <span className="eissn-cell">EISSN: {j.eissn}</span>
                      <button 
                        onClick={() => handleCopy(j.eissn)}
                        title="Copy EISSN"
                        style={{
                          background: copiedEissn === j.eissn ? '#dcfce7' : '#eff6ff',
                          border: '1px solid ' + (copiedEissn === j.eissn ? '#86efac' : '#bfdbfe'),
                          borderRadius: '6px',
                          cursor: 'pointer',
                          padding: '5px 7px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: copiedEissn === j.eissn ? '#15803d' : '#2563eb',
                          fontSize: '11px',
                          fontWeight: 700,
                          transition: 'all 0.2s'
                        }}
                      >
                        {copiedEissn === j.eissn ? (
                          <>
                            <Check size={12} /> Copied
                          </>
                        ) : (
                          <>
                            <Copy size={12} /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`q-badge ${j.q === 'Q1' ? 'q1-badge' : j.q === 'Q2' ? 'q2-badge' : 'q3-badge'}`}>
                      {j.q}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <Link to="/contact" className="action-inquire-btn">
                      Publish <ArrowRight size={13} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '30px' }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '9px 16px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                background: currentPage === 1 ? '#f1f5f9' : '#ffffff',
                color: currentPage === 1 ? '#94a3b8' : '#1e293b',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontWeight: 700,
                fontSize: '13.5px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.03)'
              }}
            >
              <ChevronLeft size={16} /> Prev
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  border: pageNum === currentPage ? 'none' : '1px solid #cbd5e1',
                  background: pageNum === currentPage ? '#2563eb' : '#ffffff',
                  color: pageNum === currentPage ? '#ffffff' : '#334155',
                  fontWeight: 800,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: pageNum === currentPage ? '0 4px 12px rgba(37,99,235,0.3)' : '0 2px 5px rgba(0,0,0,0.03)'
                }}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '9px 16px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                background: currentPage === totalPages ? '#f1f5f9' : '#ffffff',
                color: currentPage === totalPages ? '#94a3b8' : '#1e293b',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                fontWeight: 700,
                fontSize: '13.5px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.03)'
              }}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Embedded Contact Us with offices */}
      <ContactBlock defaultService="ASR Research Publication Support" />
    </div>
  );
};

export default SciJournals;
