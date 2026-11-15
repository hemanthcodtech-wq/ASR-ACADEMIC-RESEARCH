import React from 'react';
import { motion } from 'framer-motion';

/**
 * ScrollReveal Component
 * Wraps any section, card, or element and smoothly reveals it
 * (fade in + slide up/down/left/right) when it scrolls into the viewport.
 * 
 * Props:
 * - children: JSX elements to animate
 * - direction: 'up' | 'down' | 'left' | 'right' | 'none' (default: 'up')
 * - delay: number in seconds (e.g. 0.1, 0.2)
 * - duration: duration in seconds (default: 0.55)
 * - distance: pixels to offset before reveal (default: 30)
 * - className: optional CSS class
 * - once: whether to trigger only once (default: true)
 */
export const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  distance = 28,
  className = '',
  style = {},
  once = true
}) => {
  const getOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: once, amount: 0.18 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.22, 1, 0.36, 1] // Custom cubic bezier for smooth Apple/Linear-grade easing
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
