import React, { useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

/**
 * PageTransition Component
 * Wraps page routes to deliver a silk-smooth transition:
 * - Only animates non-portal/public pages.
 * - For Admin and Author Portal pages, returns children directly without tearing down the layout or re-rendering sidebars!
 */
const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
    scale: 0.995
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.995,
    transition: {
      duration: 0.18,
      ease: 'easeIn'
    }
  }
};

export const PageTransition = ({ children }) => {
  const location = useLocation();
  const isPortal = location.pathname.startsWith('/admin') || 
                   location.pathname.startsWith('/author-portal') ||
                   location.pathname.startsWith('/author-dashboard');

  // Instant scroll-to-top on route change before paint
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname]);

  // If inside Admin Panel or Author Portal, do NOT tear down the page container
  // This keeps the sidebar and header completely stationary and prevents reloading!
  if (isPortal) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence 
      mode="wait"
      onExitComplete={() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }}
    >
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ width: '100%', minHeight: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
