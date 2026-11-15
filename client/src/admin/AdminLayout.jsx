import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  BellRing,
  Sparkles
} from 'lucide-react';
import '../portal/PortalPages.css';

export const AdminLayoutContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('asr_author_user');
    if (!session) {
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
      {/* Top Admin Bar - Stays 100% stationary */}
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
              <span className="portal-sep" style={{ color: '#475569' }}>/</span>
              <span className="portal-sub-brand" style={{ color: '#f8fafc' }}>ASR ManuTrack Control</span>
            </Link>
          </div>

          <div className="portal-user-zone">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/author-dashboard"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#93c5fd',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Eye size={14} />
                <span>Author View</span>
              </Link>
            </motion.div>

            <div className="portal-user-chip" style={{ background: '#1e293b', border: '1px solid #334155' }}>
              <span style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', display: 'inline-block' }}></span>
              <span className="user-email-text" style={{ color: '#e2e8f0' }}>{user.email || 'admin@asracademicresearch.com'}</span>
            </div>

            <motion.button 
              whileHover={{ scale: 1.04, background: '#450a0a', color: '#fca5a5' }}
              whileTap={{ scale: 0.96 }}
              onClick={handleLogout} 
              className="portal-btn-logout" 
              style={{ background: '#1e293b', border: '1px solid #334155', color: '#f87171' }}
            >
              <LogOut size={15} />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Grid: Sidebar + Viewport */}
      <div className="portal-grid-body">
        {/* Sidebar Nav - Permanently persistent, never unmounts or reloads */}
        <aside className={`portal-sidebar ${mobileNavOpen ? 'mobile-visible' : ''}`} style={{ background: '#0b162c', borderRight: '1px solid #1e293b' }}>
          <div className="portal-sidebar-top">
            <div className="portal-sidebar-header" style={{ borderBottom: '1px solid #1e293b' }}>
              <span className="sidebar-group-title" style={{ color: '#94a3b8' }}>ADMINISTRATIVE SUITE</span>
              <span className="sidebar-count-badge" style={{ background: '#dc2626', color: '#fff' }}>Root Staff</span>
            </div>

            <nav className="portal-nav-list">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || (item.path === '/admin/overview' && location.pathname === '/admin');
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setMobileNavOpen(false)}
                      className={`portal-nav-item ${isActive ? 'is-active' : ''}`}
                      style={{
                        position: 'relative',
                        color: isActive ? '#ffffff' : '#94a3b8',
                        background: isActive ? '#1e293b' : 'transparent',
                        borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent'
                      }}
                    >
                      <Icon size={18} className="nav-item-icon" style={{ color: isActive ? '#60a5fa' : '#64748b' }} />
                      <span className="nav-item-label">{item.label}</span>
                      {item.badge && (
                        <span
                          className="nav-item-staff-badge"
                          style={{
                            background: isActive ? '#2563eb' : '#1e293b',
                            color: '#ffffff',
                            border: '1px solid #334155'
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                      {isActive && <ChevronRight size={15} className="active-arrow" style={{ color: '#60a5fa' }} />}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </div>

          <div className="portal-sidebar-footer" style={{ borderTop: '1px solid #1e293b' }}>
            <motion.div whileHover={{ y: -2 }} className="portal-sidebar-author-card" style={{ background: '#1e293b' }}>
              <div className="portal-avatar-circle" style={{ background: '#dc2626', color: '#fff' }}>
                A
              </div>
              <div className="portal-avatar-meta">
                <span className="portal-avatar-name" style={{ color: '#f8fafc' }}>ASR Administrator</span>
                <span className="portal-avatar-role" style={{ color: '#ef4444' }}>Full Operational Rights</span>
              </div>
            </motion.div>

            <div className="privacy-badge-box" style={{ background: '#0f172a', border: '1px solid #1e293b', color: '#94a3b8' }}>
              <ShieldCheck size={18} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ color: '#e2e8f0' }}>Master Access Mode</strong>
                <span>Can view, edit, upload proofs, and reassign across all authors and papers.</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Dynamic Viewport Content */}
        <Outlet />
      </div>
    </div>
  );
};

// Backwards-compatible AdminLayout wrapper for pages that pass title / subtitle
const AdminLayout = ({ children, title, subtitle }) => {
  return (
    <main className="portal-viewport">
      <motion.div 
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="portal-header-banner"
      >
        <div className="header-text-block">
          <h1 className="viewport-title">{title}</h1>
          {subtitle && <p className="viewport-subtitle">{subtitle}</p>}
        </div>
        <div className="portal-live-clock">
          <span className="live-dot"></span>
          <span>Live Database Connection</span>
        </div>
      </motion.div>

      <motion.div 
        key={window.location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="viewport-content-wrapper"
      >
        {children}
      </motion.div>
    </main>
  );
};

export default AdminLayout;
