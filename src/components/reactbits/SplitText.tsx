import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}

/**
 * ReactBits SplitText — snappy Neubrutalist word/character entrance animation.
 * Observes the outer unclipped wrapper (or animates immediately on mount for Hero)
 * so clipped child spans never fail IntersectionObserver checks.
 */
export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.035,
  immediate = false
}) => {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(containerRef, { once: true });
  const prefersReduced = useReducedMotion();
  const shouldAnimate = Boolean(prefersReduced || immediate || isInView);

  const letters = Array.from(text);

  return (
    <span
      ref={containerRef}
      className={`inline-flex flex-wrap ${className}`}
      aria-label={text}
    >
      {letters.map((char, idx) => (
        <span key={`${char}-${idx}`} className="inline-block overflow-hidden pb-[0.06em]">
          <motion.span
            aria-hidden="true"
            className="inline-block"
            initial={prefersReduced ? { y: '0%', opacity: 1 } : { y: '105%', opacity: 0 }}
            animate={
              shouldAnimate
                ? { y: '0%', opacity: 1 }
                : { y: '105%', opacity: 0 }
            }
            transition={{
              type: 'spring',
              stiffness: 420,
              damping: 30,
              delay: prefersReduced ? 0 : delay + idx * stagger
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
};
