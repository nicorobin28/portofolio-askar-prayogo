import React, { useState } from 'react';
import { motion } from 'motion/react';

interface StickerPeelProps {
  label: string;
  sublabel?: string;
  hiddenNote?: string;
  className?: string;
}

/**
 * ReactBits StickerPeel — interactive peelable/draggable sticker badge
 * revealing a hidden note underneath when peeled or dragged.
 */
export const StickerPeel: React.FC<StickerPeelProps> = ({
  label,
  sublabel = 'KETUK / TARIK STIKER',
  hiddenNote = 'SIAP BERKONTRIBUSI!',
  className = ''
}) => {
  const [peeled, setPeeled] = useState(false);

  return (
    <div className={`relative inline-block select-none ${className}`}>
      {/* Underneath layer revealed when peeled */}
      <div className="flex min-w-[11rem] flex-col items-center justify-center border-3 border-dashed border-border bg-surface px-4 py-3 text-center">
        <span className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-primary">
          {hiddenNote}
        </span>
        <span className="mt-0.5 font-mono text-[0.6rem] text-muted">Klik untuk tempel ulang</span>
      </div>

      {/* Top peelable sticker */}
      <motion.button
        type="button"
        drag
        dragConstraints={{ left: -40, right: 40, top: -30, bottom: 30 }}
        dragElastic={0.35}
        onClick={() => setPeeled((p) => !p)}
        animate={
          peeled
            ? { rotate: -14, x: 24, y: -22, scale: 0.96 }
            : { rotate: -2, x: 0, y: 0, scale: 1 }
        }
        whileHover={{ rotate: 0, scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 360, damping: 22 }}
        className="absolute inset-0 flex cursor-grab flex-col items-center justify-center border-3 border-border bg-lime px-4 py-2.5 text-[#181827] shadow-brutal active:cursor-grabbing"
        aria-label={`${label} — ${sublabel}`}
      >
        {/* Peel corner triangle */}
        <span
          aria-hidden="true"
          className="absolute right-0 top-0 h-3.5 w-3.5 border-b-2 border-l-2 border-border bg-surface"
        />
        <span className="font-mono text-sm font-bold tracking-wider">{label}</span>
        <span className="mt-0.5 font-mono text-[0.58rem] font-bold uppercase tracking-widest opacity-80">
          {sublabel}
        </span>
      </motion.button>
    </div>
  );
};
