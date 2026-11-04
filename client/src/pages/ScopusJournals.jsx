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
  Sparkles
} from 'lucide-react';
import ContactBlock from '../components/ContactBlock';
import './Journals.css';

export const scopusJournalsData = [
  { name: "Energy Systems", eissn: "1868-3975", q: "Q2" },
  { name: "Renewable Energy Focus", eissn: "1755-0084", q: "Q1" },
  { name: "Energy Storage (Wiley)", eissn: "2578-4862", q: "Q2" },
  { name: "Int. Journal of Electric and Hybrid Vehicles", eissn: "1751-4096", q: "Q3" },
  { name: "Australian Journal of Electrical & Electronics Engineering", eissn: "1448-837X", q: "Q4" },
  { name: "Biomedical Materials & Devices", eissn: "2731-4812", q: "Q2" },
  { name: "Journal of Healthcare Informatics Research", eissn: "2509-498X", q: "Q2" },
  { name: "Health Systems", eissn: "2047-6973", q: "Q3" },
  { name: "Biomedical Engineering Applications Basis and Communications", eissn: "0218-1967", q: "Q4" },
  { name: "International Journal of Biomedical Engineering and Technology", eissn: "1752-6426", q: "Q4" },
  { name: "Smart Health", eissn: "2352-6483", q: "Q2" },
  { name: "Research on Biomedical Engineering", eissn: "2446-4740", q: "Q3" },
  { name: "Physiotherapy Research International", eissn: "1471-2865", q: "Q2" },
  { name: "Advances in Traditional Medicine", eissn: "2662-4060", q: "Q3" },
  { name: "Journal of Pharmacy Practice and Research", eissn: "2055-2335", q: "Q2" },
  { name: "Currents in Pharmacy Teaching and Learning", eissn: "1877-1300", q: "Q2" },
  { name: "Journal of Pharmacy Practice", eissn: "1531-1937", q: "Q2" },
  { name: "Journal of Pharmacy Technology", eissn: "1546-1505", q: "Q3" },
  { name: "Int. Journal of Computational Intelligence and Applications", eissn: "1757-5885", q: "Q3" },
  { name: "Journal of Automation, Mobile Robotics and Intelligent Systems", eissn: "2080-2145", q: "Q4" },
  { name: "Progress in Artificial Intelligence", eissn: "2192-6360", q: "Q3" },
  { name: "International Journal of Wireless and Information Networks", eissn: "1572-8129", q: "Q3" },
  { name: "Journal of Systems and Information Technology", eissn: "1328-7265", q: "Q2" },
  { name: "Social Networks", eissn: "1873-5177", q: "Q1" },
  { name: "Sensing and Imaging", eissn: "1557-2072", q: "Q3" },
  { name: "Journal of Computer Security", eissn: "1875-8924", q: "Q3" },
  { name: "SN Computer Science", eissn: "2661-8907", q: "Q2" },
  { name: "Computer Communications", eissn: "1872-7530", q: "Q1" },
  { name: "Computer Networks", eissn: "1872-7069", q: "Q1" },
  { name: "Ad Hoc Networks", eissn: "1570-8713", q: "Q1" },
  { name: "International Journal of Machine Learning and Cybernetics", eissn: "1868-808X", q: "Q1" },
  { name: "International Journal of Information Technology", eissn: "2511-2112", q: "Q2" },
  { name: "Journal of Information and Telecommunication", eissn: "2475-1847", q: "Q2" },
  { name: "International Journal of Security and Network", eissn: "1747-8413", q: "Q4" },
  { name: "Smart Science", eissn: "2308-0477", q: "Q3" },
  { name: "International Journal of Circuit Theory and Applications", eissn: "1097-007X", q: "Q2" },
  { name: "Journal of Electronic Testing: Theory and Applications", eissn: "1573-0727", q: "Q3" },
  { name: "Int. Journal of Computer Aided Engineering and Technology", eissn: "1757-5613", q: "Q4" },
  { name: "Int. Journal of Business Science and Applied Management", eissn: "1753-0296", q: "Q3" },
  { name: "Journal of Hospitality Marketing & Management", eissn: "1936-8631", q: "Q1" },
  { name: "Journal of Business Venturing Insights", eissn: "2352-6734", q: "Q1" },
  { name: "International Journal of Management in Education", eissn: "1751-9500", q: "Q1" },
  { name: "Journal of Financial Services Marketing", eissn: "1479-1846", q: "Q2" },
  { name: "Journal of Banking Regulation", eissn: "1750-2098", q: "Q2" },
  { name: "Digital Finance", eissn: "2524-6186", q: "Q1" },
  { name: "Intelligent Systems in Accounting, Finance and Management", eissn: "1099-1174", q: "Q2" },
  { name: "International Journal of Healthcare Management", eissn: "2047-9719", q: "Q2" },
  { name: "Int. Journal of Internet Marketing and Advertising", eissn: "1741-8100", q: "Q3" },
  { name: "Journal of Co-operative Organization and Management", eissn: "2213-2988", q: "Q2" },
  { name: "Journal of Workplace Learning", eissn: "1366-5626", q: "Q2" },
  { name: "Journal of Education and Work", eissn: "1469-9435", q: "Q2" },
  { name: "Higher Education Research & Development", eissn: "1469-8366", q: "Q1" },
  { name: "Innovative Higher Education", eissn: "1573-1758", q: "Q1" },
  { name: "Journal of Agricultural & Food Information", eissn: "1540-4722", q: "Q3" },
  { name: "Int. Journal of Sustainable Agricultural Management and Informatics", eissn: "1756-3909", q: "Q3" },
  { name: "Asian Journal of Water, Environment and Pollution", eissn: "1875-8568", q: "Q4" },
  { name: "Groundwater for Sustainable Development", eissn: "2352-801X", q: "Q1" },
  { name: "Australasian Journal of Water Resources", eissn: "2324-4038", q: "Q2" }
];

const ScopusJournals = () => {
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

  const filteredJournals = scopusJournalsData.filter(j => {
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
    <div className="scopus-journals-page">
      {/* Premium Hero Showcase */}
      <section className="journals-hero-showcase">
        <div className="journals-hero-glow"></div>
        <div className="journals-hero-container">
          <div className="journals-hero-badge">
            <Sparkles size={14} className="hero-sparkle" />
            <span>INDEXED • PEER REVIEWED • GLOBAL VISIBILITY</span>
          </div>

          <h1 className="journals-hero-heading">
            Scopus Indexed <span className="hero-text-accent">Journals</span>
          </h1>

          <p className="journals-hero-desc">
            Publish in Elsevier Scopus indexed peer-reviewed international journals across Engineering, Medicine, Science, and Business Management with 100% active indexing verification.
          </p>

          {/* Nav switcher pills */}
          <div className="journals-cta-nav-pills">
            <Link to="/sci-scie-journals" className="journal-nav-pill">
              <Award size={16} /> SCI / SCIE Journals (62)
            </Link>
            <Link to="/scopus-indexed-journals" className="journal-nav-pill active-pill">
              <BookOpen size={16} /> Scopus Indexed Journals ({scopusJournalsData.length})
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
            {['ALL', 'Q1', 'Q2', 'Q3', 'Q4'].map(q => (
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
                    <BookOpen size={16} color="#2563eb" style={{ flexShrink: 0 }} />
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
                    <span className={`q-badge ${j.q === 'Q1' ? 'q1-badge' : j.q === 'Q2' ? 'q2-badge' : j.q === 'Q3' ? 'q3-badge' : 'q4-badge'}`}>
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

export default ScopusJournals;
