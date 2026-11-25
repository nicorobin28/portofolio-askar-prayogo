import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus, Briefcase, MapPin, Calendar } from 'lucide-react';
import { experiences } from '@/data/cv';
import { DecryptedText } from '@/components/reactbits/DecryptedText';
import { AnimatedList } from '@/components/reactbits/AnimatedList';

export const Experience: React.FC = () => {
  // Multi-expand state prevents sudden scroll jumps on mobile when switching items
  const [openIds, setOpenIds] = useState<string[]>([experiences[0].id]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const allExpanded = openIds.length === experiences.length;

  const toggleAll = () => {
    setOpenIds(allExpanded ? [] : experiences.map((e) => e.id));
  };

  return (
    <section className="relative py-[clamp(4.5rem,10vw,8rem)]" id="experience">
      <div className="mx-auto w-[min(var(--spacing-maxw),100%-var(--spacing-gutter)*2)]">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.28em] text-faint">
              <span className="inline-block h-px w-8 bg-border/30" />
              <span className="text-primary">03</span>
              <span>/</span>
              <DecryptedText text="Pengalaman Kerja" />
            </p>
            <h2 className="text-[clamp(2rem,5vw,3.4rem)] font-bold tracking-tight">
              Rekam jejak <em className="not-italic text-orange">kontribusi</em>
            </h2>
          </div>

          <button
            type="button"
            onClick={toggleAll}
            className="brutal-press border-3 border-border bg-surface px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-text shadow-brutal-sm hover:bg-lime hover:text-[#181827]"
          >
            {allExpanded ? 'Tutup Semua −' : 'Buka Semua +'}
          </button>
        </div>

        {/* Accordion List — Motion AnimatePresence fixes mobile CSS grid-rows-[0fr] disappearing content bug */}
        <div className="border-t-3 border-border">
          {experiences.map((exp, idx) => {
            const isOpen = openIds.includes(exp.id);
            const panelId = `xp-panel-${exp.id}`;

            return (
              <article
                key={exp.id}
                className={`border-b-3 border-border transition-colors duration-200 ${
                  isOpen ? 'bg-surface' : 'hover:bg-surface/60'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(exp.id)}
                    className="grid w-full grid-cols-[1fr_2.5rem] items-center gap-3 px-4 py-5 text-left sm:px-5 md:grid-cols-[3rem_1.3fr_1fr_auto_2.5rem] md:gap-4"
                  >
                    <span className="hidden font-mono text-xs tracking-widest text-faint md:block">
                      0{idx + 1}
                    </span>

                    <div className="min-w-0">
                      <span
                        className={`block text-[clamp(1.08rem,2.4vw,1.45rem)] font-bold tracking-tight transition-colors ${
                          isOpen ? 'text-primary' : 'text-text'
                        }`}
                      >
                        {exp.role}
                      </span>
                      {/* Always visible summary on mobile so collapsed cards retain context */}
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted md:hidden">
                        <span className="font-medium text-text">{exp.company}</span>
                        <span className="font-mono text-faint">· {exp.period}</span>
                      </div>
                    </div>

                    <span className="hidden text-[clamp(0.9rem,1.5vw,1.02rem)] text-muted md:block">
                      — {exp.company}
                    </span>

                    <span className="hidden whitespace-nowrap font-mono text-xs tracking-wider text-faint md:block">
                      {exp.period}
                    </span>

                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                      className={`grid h-10 w-10 place-items-center border-3 border-border transition-colors ${
                        isOpen
                          ? 'bg-primary text-white shadow-none'
                          : 'bg-surface text-muted shadow-brutal-sm'
                      }`}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-5 px-4 pb-7 pt-1 sm:px-5 md:pl-16">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[0.72rem] font-bold uppercase tracking-[0.12em]">
                          {exp.type && (
                            <span className="inline-flex items-center gap-1.5 border-2 border-border bg-lime px-2.5 py-0.5 text-[#181827]">
                              <Briefcase className="h-3 w-3" />
                              {exp.type}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 text-orange">
                            <Calendar className="h-3.5 w-3.5" />
                            Durasi: {exp.duration}
                          </span>
                          <span className="inline-flex items-center gap-1 text-muted">
                            <MapPin className="h-3.5 w-3.5" />
                            {exp.location}
                          </span>
                        </div>

                        <AnimatedList
                          items={exp.highlights}
                          keyExtractor={(point) => point}
                          className="grid max-w-[58rem] gap-3"
                          stagger={0.045}
                          renderItem={(point) => (
                            <div className="relative pl-6 text-[0.95rem] leading-relaxed text-muted">
                              <span
                                aria-hidden="true"
                                className="absolute left-0 top-[0.12em] font-mono text-sm font-bold text-primary"
                              >
                                →
                              </span>
                              <span>{point}</span>
                            </div>
                          )}
                        />

                        <div className="flex flex-wrap gap-2 pt-1">
                          {exp.tags.map((tag) => (
                            <span
                              key={tag}
                              className="border-2 border-border bg-bg px-3 py-1 font-mono text-[0.68rem] font-bold tracking-wider text-muted shadow-[1px_1px_0_var(--color-border)] transition-colors hover:bg-lime hover:text-[#181827]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
