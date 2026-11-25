import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagnetProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

/**
 * ReactBits Magnet — pulls interactive controls toward fine pointers with snappy spring physics.
 */
export const Magnet: React.FC<MagnetProps> = ({
  children,
  strength = 0.28,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 360, damping: 24, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 360, damping: 24, mass: 0.4 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
