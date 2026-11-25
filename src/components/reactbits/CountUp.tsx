import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  className?: string;
}

/**
 * ReactBits CountUp — animates numeric KPI metrics smoothly when entering viewport.
 */
export const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  duration = 1200,
  decimals = 0,
  className = ''
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to);
      return;
    }

    let rafId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(from + (to - from) * eased);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [duration, from, isInView, to]);

  const formatted = value.toLocaleString('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {formatted}
    </span>
  );
};
