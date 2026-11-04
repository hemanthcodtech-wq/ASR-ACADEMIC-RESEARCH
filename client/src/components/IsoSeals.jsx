import React from 'react';

// Exact Emblem 1: Light Blue / Cyan ISO Globe with "International Organization for Standardization" curved arc & "9001:2015" below
export const IsoSealOne = ({ size = 95 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <path id="iso1-arc" d="M 18,74 A 46,46 0 1,1 102,74" fill="none" />
    </defs>
    
    {/* Curved Text over top arc */}
    <text fill="#00a8e8" fontSize="7" fontWeight="600" letterSpacing="0.4" fontFamily="system-ui, -apple-system, sans-serif">
      <textPath href="#iso1-arc" startOffset="50%" textAnchor="middle">
        International Organization for Standardization
      </textPath>
    </text>

    {/* Center Wireframe Globe */}
    <g transform="translate(60, 56)">
      {/* Outer Globe Circle */}
      <circle cx="0" cy="0" r="26" stroke="#00a8e8" strokeWidth="1.6" fill="none" />
      {/* Latitude Lines */}
      <line x1="-26" y1="0" x2="26" y2="0" stroke="#00a8e8" strokeWidth="1.2" />
      <ellipse cx="0" cy="-11" rx="23" ry="5.5" stroke="#00a8e8" strokeWidth="1.1" fill="none" />
      <ellipse cx="0" cy="11" rx="23" ry="5.5" stroke="#00a8e8" strokeWidth="1.1" fill="none" />
      {/* Longitude Lines */}
      <line x1="0" y1="-26" x2="0" y2="26" stroke="#00a8e8" strokeWidth="1.2" />
      <ellipse cx="0" cy="0" rx="14" ry="26" stroke="#00a8e8" strokeWidth="1.1" fill="none" />
    </g>

    {/* Bold "ISO" text with clean solid white knockout / stroke for legibility */}
    <text 
      x="60" 
      y="64" 
      textAnchor="middle" 
      fill="#00a8e8" 
      stroke="#ffffff" 
      strokeWidth="3.5" 
      paintOrder="stroke fill"
      fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" 
      fontWeight="900" 
      fontSize="27" 
      letterSpacing="-0.5"
    >
      ISO
    </text>

    {/* Bottom 9001:2015 text */}
    <text 
      x="60" 
      y="96" 
      textAnchor="middle" 
      fill="#00a8e8" 
      fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" 
      fontWeight="800" 
      fontSize="11.5" 
      letterSpacing="0.8"
    >
      9001:2015
    </text>
  </svg>
);

// Exact Emblem 2: Deep Blue Round Stamp Badge with Double Rings, Stars, "CERTIFIED COMPANY" and Inner Globe "ISO 9001:2015"
export const IsoSealTwo = ({ size = 95 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Top Arc for CERTIFIED */}
      <path id="stamp-top-arc" d="M 23,60 A 37,37 0 1,1 97,60" fill="none" />
      {/* Bottom Arc for COMPANY */}
      <path id="stamp-bot-arc" d="M 97,60 A 37,37 0 0,1 23,60" fill="none" />
    </defs>

    {/* Outermost Ring */}
    <circle cx="60" cy="60" r="50" stroke="#004b93" strokeWidth="2" fill="none" />
    
    {/* Middle Ring */}
    <circle cx="60" cy="60" r="45" stroke="#004b93" strokeWidth="1" fill="none" />

    {/* Circular Texts */}
    <text fill="#004b93" fontSize="8.5" fontWeight="800" letterSpacing="1.8" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif">
      <textPath href="#stamp-top-arc" startOffset="50%" textAnchor="middle">
        CERTIFIED
      </textPath>
    </text>

    <text fill="#004b93" fontSize="8.5" fontWeight="800" letterSpacing="1.8" fontFamily="'Plus Jakarta Sans', system-ui, sans-serif">
      <textPath href="#stamp-bot-arc" startOffset="50%" textAnchor="middle">
        COMPANY
      </textPath>
    </text>

    {/* Decorative Stars on Left and Right sides */}
    {/* Left Star */}
    <polygon points="18,59 19.5,55 21,59 25,59.5 22,62 23,66 19.5,63.5 16,66 17,62 14,59.5" fill="#004b93" transform="scale(0.55) translate(15, 45)" />
    {/* Right Star */}
    <polygon points="18,59 19.5,55 21,59 25,59.5 22,62 23,66 19.5,63.5 16,66 17,62 14,59.5" fill="#004b93" transform="scale(0.55) translate(168, 45)" />

    {/* Inner Solid Circle */}
    <circle cx="60" cy="60" r="30" fill="#004b93" />

    {/* White Grid Lines on Inner Circle */}
    <g opacity="0.35">
      <ellipse cx="60" cy="60" rx="16" ry="30" stroke="#ffffff" strokeWidth="0.8" fill="none" />
      <line x1="60" y1="30" x2="60" y2="90" stroke="#ffffff" strokeWidth="0.8" />
      <line x1="30" y1="60" x2="90" y2="60" stroke="#ffffff" strokeWidth="0.8" />
      <ellipse cx="60" cy="48" rx="26" ry="6" stroke="#ffffff" strokeWidth="0.8" fill="none" />
      <ellipse cx="60" cy="72" rx="26" ry="6" stroke="#ffffff" strokeWidth="0.8" fill="none" />
    </g>

    {/* Center ISO typography in clean bold white */}
    <text 
      x="60" 
      y="59" 
      textAnchor="middle" 
      fill="#ffffff" 
      fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" 
      fontWeight="900" 
      fontSize="17" 
      letterSpacing="0.5"
    >
      ISO
    </text>
    <text 
      x="60" 
      y="71" 
      textAnchor="middle" 
      fill="#ffffff" 
      fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" 
      fontWeight="700" 
      fontSize="7.5" 
      letterSpacing="0.4"
    >
      9001:2015
    </text>
  </svg>
);

// Exact Emblem 3: Dark Navy ISO with Wireframe Globe, "International Organization for Standardization" arc & "9001" below
export const IsoSealThree = ({ size = 95 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <path id="iso3-arc" d="M 21,73 A 44,44 0 1,1 99,73" fill="none" />
    </defs>
    
    {/* Curved Text over top arc */}
    <text fill="#1e3a8a" fontSize="6.8" fontWeight="600" letterSpacing="0.3" fontFamily="system-ui, -apple-system, sans-serif">
      <textPath href="#iso3-arc" startOffset="50%" textAnchor="middle">
        International Organization for Standardization
      </textPath>
    </text>

    {/* Center Wireframe Globe */}
    <g transform="translate(60, 56)">
      {/* Outer Globe Circle */}
      <circle cx="0" cy="0" r="24" stroke="#1e3a8a" strokeWidth="1.5" fill="none" />
      {/* Latitude Lines */}
      <line x1="-24" y1="0" x2="24" y2="0" stroke="#1e3a8a" strokeWidth="1" />
      <ellipse cx="0" cy="-10" rx="21" ry="5" stroke="#1e3a8a" strokeWidth="1" fill="none" />
      <ellipse cx="0" cy="10" rx="21" ry="5" stroke="#1e3a8a" strokeWidth="1" fill="none" />
      {/* Longitude Lines */}
      <line x1="0" y1="-24" x2="0" y2="24" stroke="#1e3a8a" strokeWidth="1" />
      <ellipse cx="0" cy="0" rx="13" ry="24" stroke="#1e3a8a" strokeWidth="1" fill="none" />
    </g>

    {/* Bold "ISO" text with solid white knockout background outline */}
    <text 
      x="60" 
      y="64" 
      textAnchor="middle" 
      fill="#1e3a8a" 
      stroke="#ffffff" 
      strokeWidth="3.5" 
      paintOrder="stroke fill"
      fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" 
      fontWeight="900" 
      fontSize="26" 
      letterSpacing="-0.5"
    >
      ISO
    </text>

    {/* Bottom 9001 text */}
    <text 
      x="60" 
      y="94" 
      textAnchor="middle" 
      fill="#1e3a8a" 
      fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" 
      fontWeight="800" 
      fontSize="11.5" 
      letterSpacing="0.8"
    >
      9001
    </text>
  </svg>
);
