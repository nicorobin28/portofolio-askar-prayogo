import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  characters?: string;
  animateOn?: 'view' | 'hover';
}

/**
 * ReactBits DecryptedText — decodes section markers and mono labels with crisp glitch-free scramble.
 */
export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  className = '',
  speed = 32,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#',
  animateOn = 'view'
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);

  const runScramble = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = window.setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return text[index];
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      iteration += 0.65;
      if (iteration >= text.length) {
        window.clearInterval(interval);
        setDisplayText(text);
      }
    }, speed);

    return () => window.clearInterval(interval);
  };

  useEffect(() => {
    if (animateOn === 'view' && inView && !hasAnimated) {
      setHasAnimated(true);
      return runScramble();
    }
    return undefined;
  }, [animateOn, inView, hasAnimated]);

  return (
    <span
      ref={ref}
      onMouseEnter={animateOn === 'hover' ? runScramble : undefined}
      className={className}
    >
      {displayText}
    </span>
  );
};
