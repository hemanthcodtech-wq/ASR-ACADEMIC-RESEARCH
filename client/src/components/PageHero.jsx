import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import './PageHero.css';

/**
 * PageHero - Shared Hero Component for Subpages (About, Services, Journals, etc.)
 * Delivers the exact same dynamic floating badges, gradient glow,
 * and staggered typography animation as the main Home Page hero.
 */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 350, damping: 25 }
  }
};

export const PageHero = ({
  badge = 'GLOBAL ACADEMIC EXCELLENCE',
  title,
  highlightText,
  subtitle,
  children = null
}) => {
  return (
    <section className="page-hero-unified-wrapper">
      <div className="page-hero-bg-glow"></div>
      <div className="page-hero-particles">
        <motion.div
          animate={{ y: [-6, 6, -6], x: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="page-hero-floating-bubble bubble-1"
        />
        <motion.div
          animate={{ y: [6, -6, 6], x: [3, -3, 3] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
          className="page-hero-floating-bubble bubble-2"
        />
      </div>

      <motion.div
        className="page-hero-content-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="page-hero-badge-pill">
          <Sparkles size={14} className="page-hero-badge-icon" />
          <span>{badge}</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="page-hero-main-title">
          {title}{' '}
          {highlightText && (
            <span className="page-hero-highlight">{highlightText}</span>
          )}
        </motion.h1>

        {subtitle && (
          <motion.p variants={itemVariants} className="page-hero-subtitle">
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div variants={itemVariants} className="page-hero-extra-content">
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default PageHero;
