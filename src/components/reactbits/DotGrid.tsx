import React, { useEffect, useRef } from 'react';

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  proximity?: number;
  className?: string;
}

/**
 * ReactBits DotGrid — interactive canvas dot grid reacting to pointer proximity
 * using Neubrutalism theme colors from CSS custom properties.
 */
export const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 2.5,
  gap = 28,
  proximity = 120,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let rafId = 0;

    const updateSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const onPointerLeave = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const styles = getComputedStyle(document.documentElement);
      const borderCol = styles.getPropertyValue('--color-border').trim() || '#181827';
      const primaryCol = styles.getPropertyValue('--color-primary').trim() || '#3465FF';
      const orangeCol = styles.getPropertyValue('--color-orange').trim() || '#FD8401';

      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;
      const px = pointerRef.current.x;
      const py = pointerRef.current.y;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const baseX = c * gap + gap * 0.5;
          const baseY = r * gap + gap * 0.5;

          let drawX = baseX;
          let drawY = baseY;
          let size = dotSize;
          let alpha = 0.14;
          let fill = borderCol;

          if (!reducedMotion && pointerRef.current.active) {
            const dx = baseX - px;
            const dy = baseY - py;
            const dist = Math.hypot(dx, dy);

            if (dist < proximity && dist > 0.001) {
              const force = 1 - dist / proximity;
              drawX += (dx / dist) * force * 10;
              drawY += (dy / dist) * force * 10;
              size = dotSize + force * 3;
              alpha = 0.25 + force * 0.65;
              fill = force > 0.55 ? orangeCol : primaryCol;
            }
          }

          ctx.globalAlpha = alpha;
          ctx.fillStyle = fill;
          ctx.fillRect(drawX - size / 2, drawY - size / 2, size, size);
        }
      }

      ctx.globalAlpha = 1;
      if (!reducedMotion) {
        rafId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [dotSize, gap, proximity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};
