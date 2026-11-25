import React, { useState } from 'react';
import { motion } from 'motion/react';

interface FolderProps {
  title: string;
  count: number;
  accent?: 'primary' | 'orange' | 'lime';
  items: React.ReactNode[];
  onClick?: () => void;
  isOpenExternal?: boolean;
}

const accentStyles = {
  primary: {
    tab: 'bg-primary text-white',
    body: 'bg-primary text-white',
    tint: 'bg-primary/10'
  },
  orange: {
    tab: 'bg-orange text-[#181827]',
    body: 'bg-orange text-[#181827]',
    tint: 'bg-orange/15'
  },
  lime: {
    tab: 'bg-lime text-[#181827]',
    body: 'bg-lime text-[#181827]',
    tint: 'bg-lime/20'
  }
};

/**
 * ReactBits Folder — interactive folder container styled in sharp Neubrutalism geometry.
 * Hover or click pops out contained skill cards.
 */
export const Folder: React.FC<FolderProps> = ({
  title,
  count,
  accent = 'primary',
  items,
  onClick,
  isOpenExternal
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isOpenExternal ?? internalOpen;
  const styles = accentStyles[accent];
  const previewItems = items.slice(0, 3);

  const toggle = () => {
    if (onClick) {
      onClick();
    } else {
      setInternalOpen((v) => !v);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      onMouseEnter={() => {
        if (isOpenExternal === undefined) setInternalOpen(true);
      }}
      onMouseLeave={() => {
        if (isOpenExternal === undefined) setInternalOpen(false);
      }}
      className="group relative flex w-full flex-col items-start text-left focus-visible:outline-none"
      aria-expanded={isOpen}
    >
      {/* Folder Top Tab */}
      <div
        className={`relative z-10 inline-flex items-center gap-2 border-3 border-b-0 border-border px-3 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-wider ${styles.tab}`}
      >
        <span>{title}</span>
        <span className="border-2 border-border bg-surface px-1.5 py-0.2 text-[0.62rem] text-text">
          {count}
        </span>
      </div>

      {/* Folder Back + Emerging Papers + Front Flap */}
      <div className="relative h-40 w-full border-3 border-border bg-surface shadow-brutal transition-transform duration-150 group-hover:-translate-y-1 group-hover:shadow-brutal-lg">
        {/* Inner dark pocket */}
        <div className={`absolute inset-2 border-2 border-border ${styles.tint}`} />

        {/* Pop-out paper sheets */}
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          {previewItems.map((item, idx) => {
            const angles = [-7, 0, 7];
            const xOffsets = [-22, 0, 22];
            return (
              <motion.div
                key={idx}
                animate={
                  isOpen
                    ? {
                        y: -34 - idx * 6,
                        x: xOffsets[idx] ?? 0,
                        rotate: angles[idx] ?? 0,
                        scale: 1
                      }
                    : {
                        y: idx * 3,
                        x: 0,
                        rotate: 0,
                        scale: 0.96
                      }
                }
                transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                className="absolute w-[78%] border-2 border-border bg-surface p-2 shadow-brutal-sm"
              >
                {item}
              </motion.div>
            );
          })}
        </div>

        {/* Front Folder Flap */}
        <motion.div
          animate={isOpen ? { rotateX: -22, y: 4 } : { rotateX: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 24 }}
          style={{ transformOrigin: 'bottom center' }}
          className={`absolute inset-x-0 bottom-0 z-20 flex h-[62%] items-end justify-between border-t-3 border-border p-3.5 ${styles.body}`}
        >
          <span className="font-mono text-xs font-bold uppercase tracking-wider">
            {isOpen ? 'Tutup Berkas ×' : 'Buka Berkas ↗'}
          </span>
          <span className="font-mono text-[0.68rem] font-bold opacity-85">{count} keahlian</span>
        </motion.div>
      </div>
    </button>
  );
};
