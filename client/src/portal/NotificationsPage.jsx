import React, { useState, useEffect } from 'react';
import PortalLayout from '../portal/PortalLayout';
import { api, API_BASE } from '../portal/apiService';
import {
  BellRing,
  Mail,
  CheckCircle,
  Clock,
  Sparkles,
  AlertTriangle,
  Award,
  DollarSign,
  ShieldCheck,
  Send,
  Trash2,
  FileText,
  CreditCard,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import '../portal/PortalPages.css';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [alertSuccess, setAlertSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  const getAuthToken = () => {
    try {
      const s = localStorage.getItem('asr_author_user');
      return s ? JSON.parse(s).token : null;
    } catch {
      return null;
    }
  };

  const loadNotifications = () => {
    const token = getAuthToken();
    if (token) {
      api.getNotifications(token).then(r => {
        setLoading(false);
        if (r && r.notifications) {
          setNotifications(r.notifications);
        }
      });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    const token = getAuthToken();
    if (token) {
      await fetch(`${API_BASE}/notifications/mark-all-read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setAlertSuccess('All notifications marked as read.');
      setTimeout(() => setAlertSuccess(''), 3000);
    }
  };

  const handleMarkSingleRead = async (id) => {
    const token = getAuthToken();
    if (token) {
      await api.markNotificationRead(token, id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    }
  };

  const filteredNotifs = notifications.filter(n => {
    if (activeFilter === 'UNREAD') return !n.is_read;
    if (activeFilter === 'ACCEPTANCE') return n.category === 'acceptance';
    if (activeFilter === 'PAYMENT') return n.category === 'payment';
    if (activeFilter === 'REVIEW') return n.category === 'review';
    return true;
  });

  const getCategoryTheme = (category) => {
    switch (category?.toLowerCase()) {
      case 'payment':
        return {
          bg: '#fffbeb',
          border: '#fef3c7',
          color: '#b45309',
          icon: DollarSign,
          iconBg: '#fef3c7',
          iconColor: '#d97706',
          label: 'PAYMENT'
        };
      case 'acceptance':
        return {
          bg: '#f0fdf4',
          border: '#bbf7d0',
          color: '#15803d',
          icon: Award,
          iconBg: '#dcfce7',
          iconColor: '#16a34a',
          label: 'ACCEPTANCE'
        };
      case 'review':
      case 'revision':
        return {
          bg: '#faf5ff',
          border: '#e9d5ff',
          color: '#7e22ce',
          icon: Layers,
          iconBg: '#f3e8ff',
          iconColor: '#9333ea',
          label: 'REVIEW MILESTONE'
        };
      case 'system':
      default:
        return {
          bg: '#eff6ff',
          border: '#bfdbfe',
          color: '#1d4ed8',
          icon: FileText,
          iconBg: '#dbeafe',
          iconColor: '#2563eb',
          label: 'SYSTEM DISPATCH'
        };
    }
  };

  return (
    <PortalLayout
      activeNav="notifications"
      title="Notifications &amp; Editorial Alerts"
      subtitle="Complete chronological audit log of manuscript intake confirmations, reviewer remarks, milestone approvals, and tax invoice generation."
    >
      <div className="portal-subpage-container" style={{ maxWidth: '960px', margin: '0 auto' }}>

        {alertSuccess && (
          <div className="portal-success-strip" style={{ marginBottom: '16px' }}>
            <CheckCircle size={18} color="#16a34a" />
            <span>{alertSuccess}</span>
          </div>
        )}

        {/* Filter Controls Strip */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'ALL', label: 'All Alerts' },
              { id: 'UNREAD', label: 'Unread' },
              { id: 'PAYMENT', label: 'Payments & Billing' },
              { id: 'REVIEW', label: 'Peer Review' },
              { id: 'ACCEPTANCE', label: 'Acceptance Letters' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                style={{
                  background: activeFilter === f.id ? '#0f172a' : '#f8fafc',
                  color: activeFilter === f.id ? '#ffffff' : '#475569',
                  border: activeFilter === f.id ? '1px solid #0f172a' : '1px solid #cbd5e1',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{f.label}</span>
                {f.id === 'UNREAD' && notifications.filter(n => !n.is_read).length > 0 && (
                  <span style={{
                    background: '#ef4444',
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '1px 6px',
                    borderRadius: '10px'
                  }}>
                    {notifications.filter(n => !n.is_read).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={handleMarkAllRead}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563eb',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <CheckCircle size={15} />
            <span>Mark All as Read</span>
          </button>
        </div>

        {/* Notifications Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
          {!loading && filteredNotifs.length === 0 ? (
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '56px 24px', textAlign: 'center' }}>
              <BellRing size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>No Notifications in this Category</h3>
              <p style={{ color: '#64748b', fontSize: '13.5px', maxWidth: '440px', margin: '8px auto 0' }}>
                All clear! Automatic alerts regarding your manuscript's progress, reviewer evaluations, and payment confirmations will appear here.
              </p>
            </div>
          ) : (
            filteredNotifs.map((notif) => {
              const theme = getCategoryTheme(notif.category);
              const Icon = theme.icon;
              const formattedDate = notif.created_at
                ? new Date(notif.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : 'Recent';

              return (
                <div
                  key={notif.id}
                  onClick={() => handleMarkSingleRead(notif.id)}
                  style={{
                    background: !notif.is_read ? '#ffffff' : '#fafafa',
                    border: !notif.is_read ? '1.5px solid #bfdbfe' : '1px solid #e2e8f0',
                    borderLeft: !notif.is_read ? '5px solid #2563eb' : '5px solid #94a3b8',
                    borderRadius: '14px',
                    padding: '20px 24px',
                    boxShadow: !notif.is_read ? '0 6px 18px rgba(37, 99, 235, 0.07)' : '0 1px 4px rgba(0,0,0,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.boxShadow = !notif.is_read ? '0 6px 18px rgba(37, 99, 235, 0.07)' : '0 1px 4px rgba(0,0,0,0.02)'; }}
                >
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    {/* Category Icon Bubble */}
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: theme.iconBg,
                      color: theme.iconColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={20} />
                    </div>

                    {/* Content Section */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 800,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: theme.bg,
                            color: theme.color,
                            letterSpacing: '0.4px',
                            textTransform: 'uppercase'
                          }}>
                            {theme.label}
                          </span>

                          <h4 style={{
                            fontSize: '15px',
                            fontWeight: 800,
                            color: '#0f172a',
                            margin: 0,
                            lineHeight: 1.3
                          }}>
                            {notif.title}
                          </h4>

                          {!notif.is_read && (
                            <span style={{
                              background: '#2563eb',
                              color: '#fff',
                              fontSize: '10px',
                              fontWeight: 800,
                              padding: '2px 6px',
                              borderRadius: '10px'
                            }}>
                              NEW
                            </span>
                          )}
                        </div>

                        <span style={{ fontSize: '12px', color: '#94a3b8', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                          <Clock size={13} /> {formattedDate}
                        </span>
                      </div>

                      {/* Message Prose */}
                      <p style={{
                        fontSize: '13.5px',
                        color: '#334155',
                        lineHeight: '1.55',
                        margin: '6px 0 12px',
                        fontWeight: 500
                      }}>
                        {notif.message}
                      </p>

                      {/* Footer Metadata & Dispatched Tags */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '10px',
                        paddingTop: '10px',
                        borderTop: '1px solid #f1f5f9'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <span style={{
                            fontSize: '11.5px',
                            fontWeight: 600,
                            color: '#15803d',
                            background: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            padding: '3px 10px',
                            borderRadius: '6px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}>
                            <Mail size={13} color="#16a34a" />
                            <span>Email Dispatched via SMTP</span>
                          </span>

                          {notif.paper_id && (
                            <span style={{
                              fontSize: '11.5px',
                              fontFamily: 'monospace',
                              fontWeight: 700,
                              color: '#1d4ed8',
                              background: '#eff6ff',
                              border: '1px solid #bfdbfe',
                              padding: '3px 8px',
                              borderRadius: '6px'
                            }}>
                              Paper ID: {notif.paper_id}
                            </span>
                          )}
                        </div>

                        {notif.paper_id && (
                          <Link
                            to="/author-portal/tracking"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              fontSize: '12px',
                              fontWeight: 700,
                              color: '#2563eb',
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <span>Track Milestone Progression</span>
                            <ArrowRight size={13} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </PortalLayout>
  );
};

export default NotificationsPage;
