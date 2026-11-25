import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'motion/react';

interface ScrollVelocityProps {
  items: string[];
  baseVelocity?: number;
  className?: string;
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

/**
 * ReactBits ScrollVelocity — marquee ribbon whose speed and direction dynamically
 * react to scroll velocity, styled as a bold Neubrutalism newspaper/ticker bar.
 */
export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  items,
  baseVelocity = -18,
  className = ''
}) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
    clamp: false
  });
  const directionFactor = useRef<number>(1);
  const isPausedRef = useRef(false);

  useAnimationFrame((_, delta) => {
    if (isPausedRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();

    if (vf < 0) {
      directionFactor.current = -1;
    } else if (vf > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * Math.min(Math.abs(vf), 3);
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  return (
    <div
      className={`overflow-hidden border-y-3 border-border bg-surface py-3.5 select-none ${className}`}
      onMouseEnter={() => {
        isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        isPausedRef.current = false;
      }}
    >
      <motion.div style={{ x }} className="flex w-max will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {items.map((item, idx) => (
              <React.Fragment key={`${copy}-${item}`}>
                <span className="whitespace-nowrap border-2 border-transparent px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted transition-all hover:border-border hover:bg-lime hover:text-[#181827]">
                  {item}
                </span>
                <span
                  className={`mx-4 text-xs font-bold ${
                    idx % 3 === 0 ? 'text-primary' : idx % 3 === 1 ? 'text-orange' : 'text-lime [text-shadow:1px_1px_0_var(--color-border)]'
                  }`}
                >
                  ◆
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
