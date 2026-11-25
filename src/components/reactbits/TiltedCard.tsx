import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltedCardProps {
  children: React.ReactNode;
  rotateAmplitude?: number;
  scaleOnHover?: number;
  className?: string;
}

/**
 * ReactBits TiltedCard — interactive 3D perspective card adapted for Neubrutalism.
 * Supports smooth mouse tilt on desktop and snappy tactile tap feedback on touch screens.
 */
export const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  rotateAmplitude = 10,
  scaleOnHover = 1.02,
  className = ''
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scale = useMotionValue(1);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]), {
    stiffness: 320,
    damping: 26
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]), {
    stiffness: 320,
    damping: 26
  });
  const springScale = useSpring(scale, { stiffness: 360, damping: 26 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(px);
    mouseY.set(py);
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') {
      scale.set(scaleOnHover);
    }
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
  };

  return (
    <div style={{ perspective: '1000px' }} className="w-full">
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        whileTap={{ scale: 0.985 }}
        style={{
          rotateX,
          rotateY,
          scale: springScale,
          transformStyle: 'preserve-3d'
        }}
        className={`relative will-change-transform ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
};
