import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowRight
} from 'lucide-react';
import './Blog.css';

const Blog = () => {
  return (
    <div className="blog-page">
      {/* Hero */}
      <section 
        className="page-header-banner" 
        style={{ 
          background: 'linear-gradient(135deg, #0b1a30 0%, #1e293b 100%)', 
          color: '#fff', 
          padding: '60px 24px', 
          margin: 0, 
          maxWidth: '100%',
          textAlign: 'center'
        }}
      >
        <span 
          className="section-pretitle" 
          style={{ 
            background: 'rgba(59, 130, 246, 0.2)', 
            color: '#93c5fd', 
            border: '1px solid rgba(59, 130, 246, 0.35)' 
          }}
        >
          KNOWLEDGE HUB
        </span>
        <h1 style={{ color: '#fff', fontSize: '42px', fontWeight: 800, marginTop: '10px', marginBottom: '14px' }}>
          Blog
        </h1>
        <p style={{ color: '#cbd5e1', maxWidth: '780px', margin: '0 auto', fontSize: '17px' }}>
          Latest research publishing insights, guides, and academic advice from ASR Academic Research Solutions.
        </p>
      </section>

      {/* Main Single Blog List */}
      <div className="page-content-wrapper" style={{ padding: '70px 24px', maxWidth: '860px', margin: '0 auto' }}>
        <article className="blog-post-card" style={{ padding: '36px', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)' }}>
          <div className="blog-post-body" style={{ padding: 0 }}>
            <span className="blog-category-tag">Scopus & Publishing</span>
            
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: '12px 0 16px', lineHeight: 1.35 }}>
              <Link 
                to="/how-to-publish-a-research-paper-in-scopus-indexed-journals-complete-guide-for-ph-d-scholars" 
                style={{ color: '#0f172a', textDecoration: 'none' }}
              >
                How to Publish a Research Paper in Scopus Indexed Journals – Complete Guide for Ph.D. Scholars
              </Link>
            </h2>

            <div className="blog-post-meta" style={{ border: 'none', padding: 0, marginBottom: '18px', gap: '20px', justifyContent: 'flex-start', color: '#64748b' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={14} /> June 22, 2023
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} /> 8 min read
              </span>
            </div>

            <p style={{ fontSize: '15.5px', color: '#475569', lineHeight: 1.7, marginBottom: '24px' }}>
              <strong>Introduction:</strong> Publishing a research paper in a Scopus indexed journal has become one of the most important milestones for Ph.D. scholars, researchers, faculty members, and academicians. A Scopus publication not only strengthens your academic profile but also improves research visibility, global recognition, and career opportunities...
            </p>

            <Link 
              to="/how-to-publish-a-research-paper-in-scopus-indexed-journals-complete-guide-for-ph-d-scholars" 
              className="btn-primary" 
              style={{ display: 'inline-flex', padding: '10px 22px', fontSize: '14.5px', alignItems: 'center', gap: '8px' }}
            >
              Read More <ArrowRight size={15} />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Blog;
