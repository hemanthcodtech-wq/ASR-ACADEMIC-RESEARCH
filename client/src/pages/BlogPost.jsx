import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  BookOpen,
  CheckCircle,
  FileText,
  ShieldAlert,
  Award,
  Send,
  MessageSquare
} from 'lucide-react';
import ContactBlock from '../components/ContactBlock';
import './BlogPost.css';

const BlogPost = () => {
  const [commentForm, setCommentForm] = useState({
    message: '',
    name: '',
    email: '',
    website: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="single-blog-post-page">
      {/* Article Header Hero */}
      <section className="single-article-hero">
        <div className="article-hero-container">
          <div className="article-meta-badge-row">
            <span className="article-cat-pill">Scopus & Publishing</span>
            <span className="article-date-meta">
              <Calendar size={15} /> Post June 22, 2023
            </span>
            <span className="article-date-meta">
              <Clock size={15} /> 8 min read
            </span>
          </div>
          <h1>How to Publish a Research Paper in Scopus Indexed Journals – Complete Guide for Ph.D. Scholars</h1>
        </div>
      </section>

      {/* Main Article Content */}
      <div className="article-content-wrapper">
        <div className="article-body-prose">
          
          <h2>Introduction</h2>
          <p>
            Publishing a research paper in a Scopus indexed journal has become one of the most important milestones for Ph.D. scholars, researchers, faculty members, and academicians. A Scopus publication not only strengthens your academic profile but also improves research visibility, global recognition, and career opportunities.
          </p>
          <p>
            However, many researchers struggle with journal selection, manuscript formatting, plagiarism issues, reviewer comments, and publication rejection.
          </p>

          <div className="article-callout-box">
            <p>
              At <strong>ASR Academic Research Solutions</strong>, we help researchers simplify the publication journey with expert guidance, ethical support, and end-to-end publication assistance.
            </p>
          </div>

          <h2>What is a Scopus Indexed Journal?</h2>
          <p>
            Scopus is one of the world’s largest abstract and citation databases managed by Elsevier. It indexes high-quality peer-reviewed journals across various disciplines including:
          </p>
          <ul>
            <li>Engineering & Technology</li>
            <li>Medical & Life Sciences</li>
            <li>Management & Business</li>
            <li>Artificial Intelligence & Data Science</li>
            <li>Social Sciences</li>
            <li>Multidisciplinary Research</li>
          </ul>

          <p>Publishing in Scopus indexed journals enhances:</p>
          <ul>
            <li>Academic credibility</li>
            <li>Research visibility</li>
            <li>Citation potential</li>
            <li>Career growth opportunities</li>
            <li>University ranking contributions</li>
          </ul>

          <h2>Step-by-Step Process to Publish in Scopus Journals</h2>

          <h3>1. Select a Strong Research Topic</h3>
          <p>Your research topic should be:</p>
          <ul>
            <li>Original</li>
            <li>Relevant</li>
            <li>Problem-solving</li>
            <li>Research-gap based</li>
            <li>Aligned with current trends</li>
          </ul>
          <p>Choosing the right topic increases acceptance probability significantly.</p>

          <h3>2. Conduct Quality Literature Review</h3>
          <p>A strong literature review helps:</p>
          <ul>
            <li>Identify research gaps</li>
            <li>Understand existing methodologies</li>
            <li>Build theoretical foundations</li>
            <li>Avoid duplication</li>
          </ul>
          <p>Use authentic databases and peer-reviewed sources for references.</p>

          <h3>3. Write a Structured Manuscript</h3>
          <p>A professional research paper generally includes:</p>
          <ul>
            <li>Title</li>
            <li>Abstract</li>
            <li>Keywords</li>
            <li>Introduction</li>
            <li>Literature Review</li>
            <li>Methodology</li>
            <li>Results & Discussion</li>
            <li>Conclusion</li>
            <li>References</li>
          </ul>
          <p>Ensure clarity, technical accuracy, and academic formatting standards.</p>

          <h3>4. Perform Plagiarism Check</h3>
          <p>Most journals require plagiarism below 10%. Important checks include:</p>
          <ul>
            <li>Similarity analysis</li>
            <li>Citation verification</li>
            <li>Reference formatting</li>
            <li>AI-content balancing</li>
            <li>Grammar correction</li>
          </ul>

          <h3>5. Choose the Right Scopus Journal</h3>
          <p>Selecting the correct journal is one of the biggest challenges. You should evaluate:</p>
          <ul>
            <li>Scope relevance</li>
            <li>Quartile ranking (Q1/Q2/Q3/Q4)</li>
            <li>Acceptance rate</li>
            <li>Review timeline</li>
            <li>Publication charges</li>
            <li>Publisher credibility</li>
          </ul>
          <p>Avoid fake or discontinued journals.</p>

          <h3>6. Submit the Manuscript</h3>
          <p>Submission generally includes:</p>
          <ul>
            <li>Manuscript file</li>
            <li>Cover letter</li>
            <li>Author details</li>
            <li>Ethical declarations</li>
            <li>Copyright forms</li>
          </ul>
          <p>Professional submission improves reviewer confidence.</p>

          <h3>7. Reviewer Comments & Revisions</h3>
          <p>Most papers require revisions before acceptance. Common reviewer corrections include:</p>
          <ul>
            <li>Methodology improvements</li>
            <li>Statistical clarification</li>
            <li>Formatting adjustments</li>
            <li>Reference updates</li>
            <li>Result interpretation</li>
          </ul>
          <p>Proper response to reviewers is critical for acceptance.</p>

          <h2>Common Reasons for Research Paper Rejection</h2>
          <p>Many papers get rejected due to:</p>
          <ul>
            <li>High plagiarism</li>
            <li>Weak methodology</li>
            <li>Poor English writing</li>
            <li>Wrong journal selection</li>
            <li>Lack of novelty</li>
            <li>Improper references</li>
            <li>Formatting errors</li>
          </ul>
          <p>Expert guidance can significantly reduce rejection chances.</p>

          <h2>Benefits of Publishing in Scopus Journals</h2>
          <h3>Global Academic Recognition</h3>
          <p>Your work becomes accessible to researchers worldwide.</p>

          <h3>Better Career Opportunities</h3>
          <p>Helpful for:</p>
          <ul>
            <li>Ph.D. completion</li>
            <li>Faculty promotions</li>
            <li>Academic jobs</li>
            <li>Research funding</li>
          </ul>

          <h3>Higher Citation Potential</h3>
          <p>Indexed journals improve discoverability and citations.</p>

          <h3>Institutional Ranking Contribution</h3>
          <p>Scopus publications contribute to:</p>
          <ul>
            <li>NAAC</li>
            <li>NIRF</li>
            <li>Global university rankings</li>
          </ul>

          <h2>How ASR Academic Research Solutions Helps Researchers</h2>
          <p>ASR Academic Research Solutions provides complete publication assistance including:</p>
          <ul>
            <li>Journal selection support</li>
            <li>Manuscript writing guidance</li>
            <li>Scopus publication assistance</li>
            <li>SCI & Web of Science support</li>
            <li>Plagiarism checking</li>
            <li>Reviewer comment handling</li>
            <li>Patent & innovation guidance</li>
            <li>Thesis support services</li>
          </ul>

          <p style={{ fontWeight: 600, color: '#1d4ed8' }}>
            With 15+ years of experience and support across 50+ countries, ASR helps researchers achieve ethical and quality-driven publication success.
          </p>

          {/* Leave a Reply Section */}
          <div className="leave-reply-card">
            <h3>Leave a Reply</h3>
            {submitted ? (
              <div className="success-banner">
                <CheckCircle size={20} />
                <span>Thank you! Your comment has been received and is awaiting moderation.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="reply-form">
                <div>
                  <textarea
                    rows="5"
                    required
                    placeholder="Message *"
                    value={commentForm.message}
                    onChange={(e) => setCommentForm({ ...commentForm, message: e.target.value })}
                  ></textarea>
                </div>

                <div className="reply-row-three">
                  <input
                    type="text"
                    required
                    placeholder="Name *"
                    value={commentForm.name}
                    onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email *"
                    value={commentForm.email}
                    onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                  />
                  <input
                    type="url"
                    placeholder="Website"
                    value={commentForm.website}
                    onChange={(e) => setCommentForm({ ...commentForm, website: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-post-comment">
                  <Send size={16} /> Post Comment
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Embedded Contact Us Block with offices */}
      <ContactBlock defaultService="ASR Research Publication Support" />
    </div>
  );
};

export default BlogPost;

