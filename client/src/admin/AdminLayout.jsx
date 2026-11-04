import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FileText,
  Users,
  CreditCard,
  Layers,
  ShieldCheck,
  User,
  LogOut,
  LayoutDashboard,
  Upload,
  ChevronRight,
  Menu,
  X,
  Settings,
  PlusCircle,
  Eye,
  SlidersHorizontal,
  BellRing
} from 'lucide-react';
import '../portal/PortalPages.css';

const AdminLayout = ({ children, activeNav, title, subtitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('asr_author_user');
    if (!session) {
      // Default to seeded admin if navigating directly during dev testing
      const defaultAdmin = {
        email: 'admin@asracademicresearch.com',
        name: 'Chief Editorial Administrator',
        role: 'admin',
        token: 'default_admin_token'
      };
      localStorage.setItem('asr_author_user', JSON.stringify(defaultAdmin));
      setUser(defaultAdmin);
    } else {
      try {
        const parsed = JSON.parse(session);
        setUser(parsed);
      } catch (e) {
        setUser({
          email: 'admin@asracademicresearch.com',
          name: 'Chief Editorial Administrator',
          role: 'admin'
        });
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('asr_author_user');
    navigate('/login');
  };

  const navItems = [
    { id: 'overview', label: 'Admin Overview', path: '/admin/overview', icon: LayoutDashboard },
    { id: 'authors', label: 'Authors Management', path: '/admin/authors', icon: Users, badge: 'Create & Edit' },
    { id: 'papers', label: 'Manuscripts & Status', path: '/admin/papers', icon: FileText, badge: 'Stages 1-10' },
    { id: 'new-paper', label: 'Register New Paper', path: '/admin/new-paper', icon: PlusCircle, badge: 'Intake' },
    { id: 'proofs', label: 'Upload Proofs & Files', path: '/admin/proofs', icon: Upload, badge: '' },
    { id: 'payments', label: 'Payment & Accounts', path: '/admin/payments', icon: CreditCard, badge: 'Invoices' },
    { id: 'coordinators', label: 'Paper Coordinators', path: '/admin/coordinators', icon: SlidersHorizontal },
    { id: 'audit', label: 'Security & Audit Logs', path: '/admin/audit', icon: ShieldCheck }
  ];

  if (!user) return null;

  return (
    <div className="portal-master-container admin-theme">
      {/* Top Admin Bar */}
      <header className="portal-top-bar" style={{ background: '#091322', borderBottom: '1px solid #1e293b' }}>
        <div className="portal-top-bar-inner">
          <div className="portal-branding-zone">
            <button
              className="portal-mobile-toggle"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/admin/overview" className="portal-logo-link">
              <span className="portal-tag-badge" style={{ background: '#dc2626', color: '#fff' }}>ADMIN PANEL</span>
              <span className="portal-sep">/</span>
              <span className="portal-sub-brand">ASR Editorial Control Suite</span>
            </Link>
          </div>

          <div className="portal-user-zone">
            <Link
              to="/author-dashboard"
              className="view-author-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#94a3b8',
                textDecoration: 'none',
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'rgba(255,255,255,0.06)'
              }}
              title="Preview author portal view"
            >
              <Eye size={14} />
              <span>Author View</span>
            </Link>

            <div className="portal-user-chip" style={{ borderColor: 'rgba(239, 68, 68, 0.4)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
              <span className="user-email-text">{user.email || 'admin@asracademicresearch.com'}</span>
            </div>

            <button onClick={handleLogout} className="portal-btn-logout" title="Sign out of Admin Session">
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid: Admin Sidebar + Viewport */}
      <div className="portal-grid-body">
        {/* Admin Sidebar */}
        <aside className={`portal-sidebar ${mobileNavOpen ? 'mobile-visible' : ''}`} style={{ background: '#0f172a', borderRight: '1px solid #1e293b' }}>
          <div className="portal-sidebar-top">
            <div className="portal-sidebar-header" style={{ borderBottomColor: '#1e293b' }}>
              <span className="sidebar-group-title" style={{ color: '#94a3b8' }}>ADMINISTRATIVE SUITE</span>
              <span className="sidebar-count-badge" style={{ background: '#1e293b', color: '#f87171' }}>Root Staff</span>
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
                    style={{
                      color: isActive ? '#60a5fa' : '#94a3b8',
                      background: isActive ? '#1e293b' : 'transparent',
                      borderLeftColor: isActive ? '#3b82f6' : 'transparent'
                    }}
                  >
                    <Icon size={18} style={{ color: isActive ? '#60a5fa' : '#64748b' }} />
                    <span className="nav-item-label">{item.label}</span>
                    {item.badge && (
                      <span
                        className="nav-item-staff-badge"
                        style={{
                          background: item.id === 'proofs' ? '#064e3b' : '#312e81',
                          color: item.id === 'proofs' ? '#6ee7b7' : '#c7d2fe'
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight size={15} style={{ color: '#60a5fa' }} />}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="portal-sidebar-footer" style={{ borderTopColor: '#1e293b' }}>
            <div className="portal-sidebar-author-card" style={{ background: '#1e293b', borderColor: '#334155' }}>
              <div className="portal-avatar-circle" style={{ background: '#dc2626' }}>
                A
              </div>
              <div className="portal-avatar-meta">
                <span className="portal-avatar-name" style={{ color: '#f8fafc' }}>ASR Administrator</span>
                <span className="portal-avatar-role" style={{ color: '#f87171' }}>Full Operational Rights</span>
              </div>
            </div>

            <div className="privacy-badge-box" style={{ background: '#1e293b', borderColor: '#334155' }}>
              <ShieldCheck size={18} color="#38bdf8" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#7dd3fc' }}>Master Access Mode</strong>
                <span style={{ color: '#94a3b8' }}>Can view, edit, upload proofs, and reassign across all authors and papers.</span>
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
              <span className="live-dot" style={{ background: '#22c55e' }}></span>
              <span>Live </span>
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

export default AdminLayout;
