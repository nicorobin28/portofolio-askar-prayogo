import React, { useRef, useState } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  onClick?: () => void;
}

/**
 * ReactBits SpotlightCard — adapted for Neubrutalism with crisp hard-edge pointer highlight
 * instead of soft glassmorphism blur.
 */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(52, 101, 255, 0.14)',
  onClick
}) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setOpacity(1)}
      onPointerLeave={() => setOpacity(0)}
      onClick={onClick}
      className={`relative overflow-hidden border-3 border-border bg-surface shadow-brutal transition-all duration-150 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity,
          background: `radial-gradient(320px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
