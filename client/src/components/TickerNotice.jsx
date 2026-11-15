import React from 'react';
import { AlertTriangle, Mail, Info } from 'lucide-react';
import './TickerNotice.css';

const TickerNotice = () => {
  return (
    <div className="asr-ticker-container" role="region" aria-label="Important Announcement Notice">
      <div className="asr-ticker-badge">
        <span className="asr-ticker-pulse"></span>
        <AlertTriangle size={14} className="asr-ticker-badge-icon" />
        <span className="asr-ticker-badge-text">IMPORTANT NOTICE</span>
      </div>

      <div className="asr-ticker-track-wrapper">
        <div className="asr-ticker-track">
          <div className="asr-ticker-content">
            <span className="asr-ticker-headline">PAPER PUBLICATION STATUS:</span>
            <span className="asr-ticker-body">
              To ensure a smooth and efficient process, all authors are requested to check their manuscript status directly through <strong>ASR ManuTrack</strong>. All updates received from the respective journals will be promptly reflected on the portal.
            </span>
            <span className="asr-ticker-divider">•</span>
            <span className="asr-ticker-emphasis">
              As this process is automated for your convenience, publication-status enquiries through phone calls or WhatsApp messages will no longer be entertained.
            </span>
            <span className="asr-ticker-divider">•</span>
            <span className="asr-ticker-contacts">
              <span className="contact-chunk"><strong>Paper &amp; Publication:</strong> <a href="mailto:asrpublicationteam@gmail.com">asrpublicationteam@gmail.com</a></span>
              <span className="chunk-sep">|</span>
              <span className="contact-chunk"><strong>Accounts &amp; Finance:</strong> <a href="mailto:asracctsdepartment@gmail.com">asracctsdepartment@gmail.com</a></span>
              <span className="chunk-sep">|</span>
              <span className="contact-chunk"><strong>Research &amp; Innovation:</strong> <a href="mailto:asracademicresearch@gmail.com">asracademicresearch@gmail.com</a></span>
              <span className="chunk-sep">|</span>
              <span className="contact-chunk"><strong>Central Support:</strong> <a href="mailto:support@asracademicresearch.com">support@asracademicresearch.com</a></span>
            </span>
            <span className="asr-ticker-divider">•</span>
            <span className="asr-ticker-thank">Thank you for your understanding and cooperation.</span>
          </div>

          {/* Duplicate track content for seamless, infinite rolling loop */}
          <div className="asr-ticker-content" aria-hidden="true">
            <span className="asr-ticker-headline">PAPER PUBLICATION STATUS:</span>
            <span className="asr-ticker-body">
              To ensure a smooth and efficient process, all authors are requested to check their manuscript status directly through <strong>ASR ManuTrack</strong>. All updates received from the respective journals will be promptly reflected on the portal.
            </span>
            <span className="asr-ticker-divider">•</span>
            <span className="asr-ticker-emphasis">
              As this process is automated for your convenience, publication-status enquiries through phone calls or WhatsApp messages will no longer be entertained.
            </span>
            <span className="asr-ticker-divider">•</span>
            <span className="asr-ticker-contacts">
              <span className="contact-chunk"><strong>Paper &amp; Publication:</strong> <a href="mailto:asrpublicationteam@gmail.com">asrpublicationteam@gmail.com</a></span>
              <span className="chunk-sep">|</span>
              <span className="contact-chunk"><strong>Accounts &amp; Finance:</strong> <a href="mailto:asracctsdepartment@gmail.com">asracctsdepartment@gmail.com</a></span>
              <span className="chunk-sep">|</span>
              <span className="contact-chunk"><strong>Research &amp; Innovation:</strong> <a href="mailto:asracademicresearch@gmail.com">asracademicresearch@gmail.com</a></span>
              <span className="chunk-sep">|</span>
              <span className="contact-chunk"><strong>Central Support:</strong> <a href="mailto:support@asracademicresearch.com">support@asracademicresearch.com</a></span>
            </span>
            <span className="asr-ticker-divider">•</span>
            <span className="asr-ticker-thank">Thank you for your understanding and cooperation.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TickerNotice;
