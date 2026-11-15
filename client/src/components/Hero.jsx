import React from 'react';
import { motion } from 'framer-motion';
import graduatesImg from '../assets/hero-graduates.jpg';
import {
  Globe,
  BookOpen,
  Lightbulb,
  FileText,
  Users,
  Award,
  Clock,
  ShieldCheck,
  TrendingUp,
  Sparkles
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Heading, Subheading, Bullet points */}
        <motion.div 
          className="hero-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="hero-tag-badge">
            <Sparkles size={14} className="tag-icon" />
            <span>EMPOWERING GLOBAL INNOVATION</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="hero-main-title">
            Transform Your <br />
            <span className="title-bold">Research</span> <br />
            <span className="title-highlight">Into Global Success</span>
          </motion.h1>

          <div className="hero-feature-list">
            <motion.div 
              variants={itemVariants}
              whileHover={{ x: 6 }}
              className="hero-feature-item"
            >
              <div className="feature-icon-circle green">
                <Globe size={18} />
              </div>
              <div className="feature-text">
                <strong>Comprehensive Academic &amp; Research Ecosystem:</strong> End-to-end support for students, researchers, faculty members, and institutions in Ph.D. thesis support, student projects, scholarly publishing, innovation, and institutional excellence.
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ x: 6 }}
              className="hero-feature-item"
            >
              <div className="feature-icon-circle green">
                <BookOpen size={18} />
              </div>
              <div className="feature-text">
                <strong>Advanced Research Publication &amp; Academic Publishing Services:</strong> Professional assistance for Scopus, SCI, Web of Science, and high-impact journal publications including manuscript preparation, formatting, plagiarism screening, and journal submission.
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ x: 6 }}
              className="hero-feature-item"
            >
              <div className="feature-icon-circle green">
                <Lightbulb size={18} />
              </div>
              <div className="feature-text">
                <strong>Patents, Innovation &amp; Research Funding Facilitation:</strong> Expert support for patent drafting, intellectual property protection, startup incubation, innovation development, grant proposal preparation, and research funding opportunities.
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ x: 6 }}
              className="hero-feature-item"
            >
              <div className="feature-icon-circle green">
                <Award size={18} />
              </div>
              <div className="feature-text">
                <strong>Institutional Development, Global Collaboration &amp; Professional Advancement:</strong> Specialized services for NAAC/NIRF accreditation, faculty development, conferences, internships, journal management, OJS hosting, international education, and academic collaborations.
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column: Hero Image with Floating Interactive Badges */}
        <motion.div 
          className="hero-right"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="hero-image-card-wrapper">
            {/* Top-Left Floating Microscope Badge */}
            <motion.div 
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="floating-badge badge-top-left" 
              title="Research & Lab Services"
            >
              <div className="badge-inner-icon">
                <Sparkles size={20} color="#16a34a" />
              </div>
            </motion.div>

            {/* Top-Right Floating Certificate/Paper Badge */}
            <motion.div 
              animate={{ y: [4, -4, 4] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="floating-badge badge-top-right" 
              title="Certified Publications"
            >
              <div className="badge-inner-icon orange">
                <FileText size={20} color="#ea580c" />
              </div>
            </motion.div>

            {/* Center Image of Graduates */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="hero-image-frame"
            >
              <img 
                src={graduatesImg} 
                alt="Successful graduates and research scholars holding diplomas" 
                className="graduates-hero-image"
              />
            </motion.div>

            {/* Bottom-Left Floating Analytics Badge */}
            <motion.div 
              animate={{ y: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
              className="floating-badge badge-bottom-left" 
              title="Proven Impact & Analytics"
            >
              <div className="badge-inner-icon blue">
                <TrendingUp size={20} color="#2563eb" />
              </div>
            </motion.div>

            {/* Floating Experience Tag */}
            <motion.div 
              animate={{ y: [3, -3, 3] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
              className="floating-stat-pill"
            >
              <ShieldCheck size={16} color="#10b981" />
              <span>100% Ethical &amp; Verified</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
