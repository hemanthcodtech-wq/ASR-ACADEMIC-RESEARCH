import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * TiltCard - 3D Perspective Card Tilt with Spotlight Glow Effect (Stripe / Vercel style)
 * 
 * Props:
 * - children: card content
 * - className: custom class
 * - style: custom styles
 * - maxTilt: maximum tilt angle in degrees (default: 12)
 * - glowColor: color of the cursor-tracking spotlight (default: 'rgba(59, 130, 246, 0.18)')
 */
export const TiltCard = ({
  children,
  className = '',
  style = {},
  maxTilt = 10,
  glowColor = 'rgba(59, 130, 246, 0.18)',
  onClick = null
}) => {
  const cardRef = useRef(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 300 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxTilt, maxTilt]);

  // Spotlight position
  const glowX = useTransform(smoothX, [0, 1], ['0%', '100%']);
  const glowY = useTransform(smoothY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e) => {
    // Only apply tilt on fine pointer (desktop mouse), skip on touch screens to prevent jitter
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    x.set(clientX / rect.width);
    y.set(clientY / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        rotateX: rotateX,
        rotateY: rotateY,
        position: 'relative',
        ...style
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`tilt-card-container ${className}`}
    >
      {/* Spotlight Radial Glow following cursor */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(400px circle at ${gx} ${gy}, ${glowColor}, transparent 70%)`
          ),
          opacity: 0.85,
          zIndex: 1
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default TiltCard;
