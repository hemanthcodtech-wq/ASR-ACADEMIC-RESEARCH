import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FileText,
  Download,
  BellRing,
  CreditCard,
  Layers,
  ShieldCheck,
  User,
  LogOut,
  LayoutDashboard,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Settings
} from 'lucide-react';
import './PortalPages.css';

const PortalLayout = ({ children, activeNav, title, subtitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('asr_author_user');
    if (!session) {
      navigate('/login');
    } else {
      try {
        setUser(JSON.parse(session));
      } catch (e) {
        navigate('/login');
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('asr_author_user');
    navigate('/login');
  };

  const navItems = [
    { id: 'dashboard', label: 'My Papers & Dashboard', path: '/author-dashboard', icon: LayoutDashboard },
    { id: 'tracking', label: 'Paper Status & Details', path: '/author-portal/tracking', icon: FileText },
    { id: 'workflow', label: 'Workflow & Milestone Stages', path: '/author-portal/workflow', icon: Layers },
    { id: 'documents', label: 'Download Admin Proofs & PDFs', path: '/author-portal/documents', icon: Download },
    { id: 'notifications', label: 'Live Notifications & Alerts', path: '/author-portal/notifications', icon: BellRing },
    { id: 'payments', label: 'My Payments & Invoices', path: '/author-portal/payments', icon: CreditCard }
  ];

  if (!user) return null;

  return (
    <div className="portal-master-container">
      {/* Portal Top Bar */}
      <header className="portal-top-bar">
        <div className="portal-top-bar-inner">
          <div className="portal-branding-zone">
            <button 
              className="portal-mobile-toggle" 
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle Portal Nav"
            >
              {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/author-dashboard" className="portal-logo-link">
              <span className="portal-tag-badge">ASR PORTAL</span>
              <span className="portal-sep">/</span>
              <span className="portal-sub-brand">Manuscript Tracking Suite</span>
            </Link>
          </div>

          <div className="portal-user-zone">
            <div className="portal-user-chip">
              <User size={14} className="user-icon-green" />
              <span className="user-email-text">{user.email || 'kancharlahemanth89@gmail.com'}</span>
            </div>

            <button onClick={handleLogout} className="portal-btn-logout" title="Sign out of your session">
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid: Sidebar + Viewport */}
      <div className="portal-grid-body">
        {/* Sidebar Nav */}
        <aside className={`portal-sidebar ${mobileNavOpen ? 'mobile-visible' : ''}`}>
          <div className="portal-sidebar-top">
            <div className="portal-sidebar-header">
              <span className="sidebar-group-title">MY AUTHOR PORTAL</span>
              <span className="sidebar-count-badge">{navItems.length} Sections</span>
            </div>

            <nav className="portal-nav-list">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id || location.pathname === item.path;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setMobileNavOpen(false)}
                    className={`portal-nav-item ${isActive ? 'is-active' : ''}`}
                  >
                    <Icon size={18} className="nav-item-icon" />
                    <span className="nav-item-label">{item.label}</span>
                    {item.badge && <span className="nav-item-staff-badge">{item.badge}</span>}
                    {isActive && <ChevronRight size={15} className="active-arrow" />}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="portal-sidebar-footer">
            <div className="portal-sidebar-author-card">
              <div className="portal-avatar-circle">
                {(user.email || 'A').charAt(0).toUpperCase()}
              </div>
              <div className="portal-avatar-meta">
                <span className="portal-avatar-name" title={user.email}>{user.email || 'Author Account'}</span>
                <span className="portal-avatar-role">Verified Author Session</span>
              </div>
            </div>

            <div className="privacy-badge-box">
              <ShieldCheck size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Strict Data Privacy</strong>
                <span>Isolated to manuscripts explicitly linked to your verified email.</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Dynamic Viewport */}
        <main className="portal-viewport">
          <div className="portal-header-banner">
            <div className="header-text-block">
              <h1 className="viewport-title">{title}</h1>
              {subtitle && <p className="viewport-subtitle">{subtitle}</p>}
            </div>
            <div className="portal-live-clock">
              <span className="live-dot"></span>
              <span>Live Portal Database</span>
            </div>
          </div>

          <div className="viewport-content-wrapper">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;

