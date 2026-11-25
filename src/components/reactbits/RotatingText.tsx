import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface RotatingTextProps {
  texts: string[];
  intervalMs?: number;
  className?: string;
}

/**
 * ReactBits RotatingText — cycles through role badges with crisp spring transitions.
 */
export const RotatingText: React.FC<RotatingTextProps> = ({
  texts,
  intervalMs = 2600,
  className = ''
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [texts, intervalMs]);

  return (
    <span className={`relative inline-flex items-center overflow-hidden ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={texts[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 460, damping: 32 }}
          className="inline-block whitespace-nowrap"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
