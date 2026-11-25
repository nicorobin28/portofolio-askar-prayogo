import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, type PanInfo } from 'motion/react';
import { ChevronLeft, ChevronRight, ImageOff, Images, Maximize2, X } from 'lucide-react';
import type { ProjectImage } from '@/data/cv';

interface ProjectGallerySliderProps {
  images: ProjectImage[];
  projectName: string;
  onLightboxChange?: (open: boolean) => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0
  })
};

export const ProjectGallerySlider: React.FC<ProjectGallerySliderProps> = ({
  images,
  projectName,
  onLightboxChange
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [brokenImages, setBrokenImages] = useState<Record<number, boolean>>({});

  // Reset when project changes
  useEffect(() => {
    setCurrentIndex(0);
    setDirection(0);
    setLightboxOpen(false);
    setBrokenImages({});
  }, [projectName, images]);

  useEffect(() => {
    onLightboxChange?.(lightboxOpen);
  }, [lightboxOpen, onLightboxChange]);

  const total = images.length;
  const hasMultiple = total > 1;
  const currentImage = images[currentIndex];

  const paginate = (step: number) => {
    if (total <= 1) return;
    setDirection(step);
    setCurrentIndex((prev) => (prev + step + total) % total);
  };

  const goToIndex = (nextIndex: number) => {
    if (nextIndex === currentIndex || nextIndex < 0 || nextIndex >= total) return;
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setCurrentIndex(nextIndex);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!hasMultiple) return;
    if (info.offset.x < -50 || info.velocity.x < -300) {
      paginate(1);
    } else if (info.offset.x > 50 || info.velocity.x > 300) {
      paginate(-1);
    }
  };

  // Keyboard navigation when Fullscreen Lightbox is open
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen, total]);

  if (total === 0) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 border-3 border-dashed border-border bg-bg p-6 text-center">
        <div className="grid h-12 w-12 place-items-center border-3 border-border bg-surface shadow-brutal-sm">
          <Images className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-text">
            Tangkapan Layar Segera Tersedia
          </p>
          <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted">
            Tambahkan gambar bukti proyek pada properti{' '}
            <code className="border border-border bg-surface px-1 py-0.5 font-mono text-[0.68rem]">
              images
            </code>{' '}
            di data proyek untuk menampilkan galeri slider interaktif.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Top Info & Fullscreen Button */}
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[0.68rem] font-bold uppercase tracking-widest text-muted">
          Slide {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="brutal-press inline-flex items-center gap-1.5 border-2 border-border bg-bg px-2.5 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-wider text-text shadow-brutal-sm hover:bg-lime hover:text-[#181827]"
        >
          <Maximize2 className="h-3 w-3" />
          <span>Perbesar</span>
        </button>
      </div>

      {/* Main Embedded Slider Stage */}
      <div className="relative overflow-hidden border-3 border-border bg-bg shadow-brutal-sm">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={`${currentIndex}-${currentImage.src}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 360, damping: 32 }}
              drag={hasMultiple ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={handleDragEnd}
              className={`absolute inset-0 flex items-center justify-center p-2 ${
                hasMultiple ? 'cursor-grab active:cursor-grabbing' : ''
              }`}
            >
              {brokenImages[currentIndex] ? (
                <div className="flex flex-col items-center gap-2 text-center text-muted">
                  <ImageOff className="h-7 w-7 text-orange" />
                  <span className="font-mono text-xs">Gagal memuat: {currentImage.src}</span>
                </div>
              ) : (
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  onClick={() => setLightboxOpen(true)}
                  onError={() => setBrokenImages((prev) => ({ ...prev, [currentIndex]: true }))}
                  draggable={false}
                  className="h-full w-full cursor-zoom-in select-none object-contain"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Left / Right Controls */}
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Gambar sebelumnya"
                className="brutal-press absolute left-2 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center border-3 border-border bg-surface text-text shadow-brutal-sm hover:bg-lime hover:text-[#181827]"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Gambar berikutnya"
                className="brutal-press absolute right-2 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center border-3 border-border bg-surface text-text shadow-brutal-sm hover:bg-lime hover:text-[#181827]"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </>
          )}
        </div>

        {/* Caption Bar */}
        {(currentImage.caption || currentImage.alt) && (
          <div className="border-t-3 border-border bg-surface px-3 py-2 text-xs leading-snug text-muted">
            {currentImage.caption ?? currentImage.alt}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation Strip */}
      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Pilih gambar bukti proyek">
          {images.map((img, idx) => {
            const active = idx === currentIndex;
            return (
              <button
                key={`${img.src}-${idx}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Lihat gambar ${idx + 1}: ${img.alt}`}
                onClick={() => goToIndex(idx)}
                className={`relative h-12 w-18 shrink-0 overflow-hidden border-2 transition-all ${
                  active
                    ? 'border-primary ring-2 ring-lime ring-offset-1'
                    : 'border-border opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img.src}
                  alt=""
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Optional Fullscreen Lightbox Slider */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {lightboxOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxOpen(false)}
                className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#181827]/92 p-4 sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-label={`Galeri layar penuh: ${projectName}`}
              >
                {/* Lightbox Top Bar */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 border-3 border-border bg-surface px-4 py-3 shadow-brutal"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[0.65rem] font-bold uppercase tracking-widest text-primary">
                      Bukti Proyek · {String(currentIndex + 1).padStart(2, '0')} /{' '}
                      {String(total).padStart(2, '0')}
                    </p>
                    <p className="truncate text-sm font-bold text-text sm:text-base">
                      {projectName}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLightboxOpen(false)}
                    aria-label="Tutup galeri layar penuh"
                    className="brutal-press grid h-10 w-10 shrink-0 place-items-center border-3 border-border bg-lime text-[#181827] shadow-brutal-sm"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Lightbox Stage */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative mx-auto my-4 flex w-full max-w-5xl flex-1 items-center justify-center overflow-hidden border-3 border-border bg-bg shadow-brutal-xl"
                >
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                      key={`lb-${currentIndex}-${currentImage.src}`}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      drag={hasMultiple ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.25}
                      onDragEnd={handleDragEnd}
                      className={`absolute inset-0 flex items-center justify-center p-3 sm:p-6 ${
                        hasMultiple ? 'cursor-grab active:cursor-grabbing' : ''
                      }`}
                    >
                      <img
                        src={currentImage.src}
                        alt={currentImage.alt}
                        draggable={false}
                        className="max-h-full max-w-full select-none object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {hasMultiple && (
                    <>
                      <button
                        type="button"
                        onClick={() => paginate(-1)}
                        aria-label="Gambar sebelumnya"
                        className="brutal-press absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border-3 border-border bg-surface text-text shadow-brutal hover:bg-lime hover:text-[#181827]"
                      >
                        <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
                      </button>
                      <button
                        type="button"
                        onClick={() => paginate(1)}
                        aria-label="Gambar berikutnya"
                        className="brutal-press absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border-3 border-border bg-surface text-text shadow-brutal hover:bg-lime hover:text-[#181827]"
                      >
                        <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
                      </button>
                    </>
                  )}
                </div>

                {/* Lightbox Caption Footer */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 border-3 border-border bg-surface px-4 py-3 text-xs text-muted shadow-brutal sm:text-sm"
                >
                  <span>{currentImage.caption ?? currentImage.alt}</span>
                  {hasMultiple && (
                    <span className="font-mono text-[0.68rem] font-bold uppercase text-faint">
                      Gunakan tombol ← / → atau geser gambar
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
