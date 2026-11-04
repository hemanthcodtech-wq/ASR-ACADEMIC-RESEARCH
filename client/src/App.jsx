import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Dedicated Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ResearchPublicationSupport from './pages/ResearchPublicationSupport';
import ServiceDetail from './pages/ServiceDetail';
import Journals from './pages/Journals';
import SciJournals from './pages/SciJournals';
import ScopusJournals from './pages/ScopusJournals';
import Membership from './pages/Membership';
import Awards from './pages/Awards';
import Community from './pages/Community';
import JoinAsReviewer from './pages/JoinAsReviewer';
import JoinEditorialBoard from './pages/JoinEditorialBoard';
import CollaborateWithUs from './pages/CollaborateWithUs';
import CommunityBenefits from './pages/CommunityBenefits';
import BecomePartner from './pages/BecomePartner';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Login from './pages/Login';

// Author Portal Modules
import AuthorDashboard from './pages/AuthorDashboard';
import PaperTrackingPage from './portal/PaperTrackingPage';
import WorkflowFlowPage from './portal/WorkflowFlowPage';
import DocumentDownloadPage from './portal/DocumentDownloadPage';
import NotificationsPage from './portal/NotificationsPage';
import PaymentAccountPage from './portal/PaymentAccountPage';
import PrivacySecurityPage from './portal/PrivacySecurityPage';
import AdminStaffPage from './portal/AdminStaffPage';

// Dedicated Admin Portal Suite
import AdminOverview from './admin/AdminOverview';
import AdminAuthors from './admin/AdminAuthors';
import AdminPapers from './admin/AdminPapers';
import AdminNewPaper from './admin/AdminNewPaper';
import AdminProofs from './admin/AdminProofs';
import AdminPayments from './admin/AdminPayments';
import AdminCoordinators from './admin/AdminCoordinators';
import AdminAudit from './admin/AdminAudit';

function MainLayout() {
  const location = useLocation();
  // Hide public website header and footer on author dashboard, author portal, and admin portal
  const isPortalPage = location.pathname.startsWith('/author-dashboard') ||
                       location.pathname.startsWith('/author-portal') ||
                       location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isPortalPage && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/research-publication-support" element={<ResearchPublicationSupport />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/journals" element={<Journals />} />
          <Route path="/sci-scie-journals" element={<SciJournals />} />
          <Route path="/scopus-indexed-journals" element={<ScopusJournals />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/join-reviewer" element={<JoinAsReviewer />} />
          <Route path="/community/editorial-board" element={<JoinEditorialBoard />} />
          <Route path="/community/collaborate" element={<CollaborateWithUs />} />
          <Route path="/community/benefits" element={<CommunityBenefits />} />
          <Route path="/community/become-partner" element={<BecomePartner />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          {/* Dedicated Author Portal Pages */}
          <Route path="/author-dashboard" element={<AuthorDashboard />} />
          <Route path="/author-portal/tracking" element={<PaperTrackingPage />} />
          <Route path="/author-portal/workflow" element={<WorkflowFlowPage />} />
          <Route path="/author-portal/documents" element={<DocumentDownloadPage />} />
          <Route path="/author-portal/notifications" element={<NotificationsPage />} />
          <Route path="/author-portal/payments" element={<PaymentAccountPage />} />
          <Route path="/author-portal/privacy-security" element={<PrivacySecurityPage />} />
          <Route path="/author-portal/admin-management" element={<AdminStaffPage />} />

          {/* Dedicated Admin Portal Routes */}
          <Route path="/admin" element={<AdminOverview />} />
          <Route path="/admin/overview" element={<AdminOverview />} />
          <Route path="/admin/authors" element={<AdminAuthors />} />
          <Route path="/admin/papers" element={<AdminPapers />} />
          <Route path="/admin/new-paper" element={<AdminNewPaper />} />
          <Route path="/admin/proofs" element={<AdminProofs />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
          <Route path="/admin/coordinators" element={<AdminCoordinators />} />
          <Route path="/admin/audit" element={<AdminAudit />} />
        </Routes>
      </main>
      {!isPortalPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout />
    </Router>
  );
}

export default App;
