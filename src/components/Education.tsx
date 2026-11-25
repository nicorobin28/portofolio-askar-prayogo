import React from 'react';
import { education } from '@/data/cv';
import { DecryptedText } from '@/components/reactbits/DecryptedText';
import { StickerPeel } from '@/components/reactbits/StickerPeel';

export const Education: React.FC = () => {
  return (
    <section className="relative pb-[clamp(4.5rem,10vw,8rem)]" id="education">
      <div className="mx-auto w-[min(var(--spacing-maxw),100%-var(--spacing-gutter)*2)]">
        <div className="border-3 border-border bg-surface p-[clamp(1.5rem,4vw,3rem)] shadow-brutal-lg">
          <p className="mb-7 inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.28em] text-faint">
            <span className="inline-block h-px w-8 bg-border/30" />
            <span className="text-primary">05</span>
            <span>/</span>
            <DecryptedText text="Pendidikan" />
          </p>

          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <h2 className="text-[clamp(1.9rem,4.6vw,3.1rem)] font-bold tracking-tight">
                {education.degree}
              </h2>
              <p className="mt-2 text-lg font-medium text-muted">{education.school}</p>
              <p className="mt-1 font-mono text-xs tracking-wider text-faint">
                Periode Studi: {education.period}
              </p>
            </div>

            <div className="pt-1">
              <StickerPeel
                label={`IPK ${education.gpa}`}
                sublabel="KETUK / TARIK STIKER"
                hiddenNote="PREDIKAT SANGAT MEMUASKAN"
                className="min-h-[4.25rem]"
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 items-baseline gap-4 border-t-3 border-border pt-6 sm:grid-cols-[16rem_1fr] sm:gap-x-8">
            <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.18em] text-faint">
              Skripsi — <span className="text-orange">Naive Bayes · SPK</span>
            </p>
            <div>
              <p className="font-bold text-text">“{education.thesisTitle}”</p>
              <p className="mt-2 max-w-[52rem] leading-relaxed text-muted">
                {education.thesisSummary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
