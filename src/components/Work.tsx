import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Layers, X, CheckCircle2, Images } from 'lucide-react';
import {
  projects,
  projectCategories,
  type ProjectCategory,
  type ProjectItem
} from '@/data/cv';
import { DecryptedText } from '@/components/reactbits/DecryptedText';
import { SpotlightCard } from '@/components/reactbits/SpotlightCard';
import { Stack } from '@/components/reactbits/Stack';
import { AnimatedList } from '@/components/reactbits/AnimatedList';
import { ProjectGallerySlider } from '@/components/ProjectGallerySlider';

const tintClasses = [
  'bg-primary/5',
  'bg-lime/12',
  'bg-orange/10',
  'bg-primary/5'
];

const spotlightColors = [
  'rgba(52, 101, 255, 0.16)',
  'rgba(199, 249, 4, 0.22)',
  'rgba(253, 132, 1, 0.18)',
  'rgba(52, 101, 255, 0.16)'
];

const stackCardAccents = {
  primary: 'bg-primary text-white',
  lime: 'bg-lime text-[#181827]',
  orange: 'bg-orange text-[#181827]'
};

export const Work: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('Semua');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalTab, setModalTab] = useState<'gallery' | 'highlights'>('gallery');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const filteredProjects =
    activeCategory === 'Semua'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const openCaseStudy = (project: ProjectItem) => {
    setSelectedProject(project);
    setModalTab(project.images.length > 0 ? 'gallery' : 'highlights');
  };

  useEffect(() => {
    if (!selectedProject) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLightboxOpen) {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedProject, isLightboxOpen]);

  return (
    <section className="relative py-[clamp(4.5rem,10vw,8rem)]" id="work">
      <div className="mx-auto w-[min(var(--spacing-maxw),100%-var(--spacing-gutter)*2)]">
        {/* Header & Filter */}
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-[40rem]">
            <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.28em] text-faint">
              <span className="inline-block h-px w-8 bg-border/30" />
              <span className="text-primary">02</span>
              <span>/</span>
              <DecryptedText text="Proyek Pilihan" />
            </p>
            <h2 className="text-[clamp(2rem,5vw,3.4rem)] font-bold tracking-tight">
              Ide yang <em className="not-italic text-orange">diwujudkan</em>
            </h2>
            <p className="mt-3 text-muted">
              Kumpulan proyek pilihan di mana rekayasa perangkat lunak menghasilkan dampak operasional yang terukur. Klik kartu untuk menelusuri studi kasus interaktif.
            </p>
          </div>

          {/* Interactive Category Filter */}
          <div
            role="tablist"
            aria-label="Filter kategori proyek"
            className="flex flex-wrap gap-1.5 border-3 border-border bg-surface p-1.5 shadow-brutal-sm"
          >
            {projectCategories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-3 py-1.5 font-mono text-xs font-bold transition-colors ${
                    active ? 'text-white' : 'text-muted hover:text-text'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="work-filter-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 border-2 border-border bg-primary"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isFeatured = activeCategory === 'Semua' && idx === 0;
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                  className={isFeatured ? 'md:col-span-2' : ''}
                >
                  <SpotlightCard
                    spotlightColor={spotlightColors[idx % spotlightColors.length]}
                    className={`h-full ${tintClasses[idx % tintClasses.length]} hover:-translate-y-1 hover:shadow-brutal-lg`}
                  >
                    <div className="flex h-full flex-col gap-3.5 p-[clamp(1.35rem,3vw,2rem)]">
                      <header className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold tracking-widest text-faint">
                          {String(idx + 1).padStart(2, '0')} · {project.category.toUpperCase()}
                        </span>
                        <span className="border-3 border-border bg-lime px-3 py-1 font-mono text-[0.72rem] font-bold tracking-widest text-[#181827] shadow-brutal-sm">
                          {project.year}
                        </span>
                      </header>

                      <div>
                        <h3 className="text-[clamp(1.35rem,2.6vw,1.8rem)] font-bold tracking-tight">
                          {project.name}
                        </h3>
                        <p className="mt-1 font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em] text-primary">
                          {project.kind}
                        </p>
                      </div>

                      <p className="max-w-[48rem] text-[0.95rem] leading-relaxed text-muted">
                        {project.blurb}
                      </p>

                      {/* Metrics */}
                      <dl className="mt-auto grid grid-cols-3 border-t-3 border-border pt-4">
                        {project.metrics.map((metric, mIdx) => (
                          <div
                            key={metric.label}
                            className={`pr-2 sm:pr-4 ${
                              mIdx > 0 ? 'border-l-3 border-border pl-2.5 sm:pl-4' : ''
                            }`}
                          >
                            <dt className="text-[clamp(1.05rem,2vw,1.45rem)] font-bold tracking-tight text-primary">
                              {metric.value}
                            </dt>
                            <dd className="mt-0.5 text-[0.68rem] leading-tight text-faint sm:text-xs">
                              {metric.label}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <footer className="mt-2 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="border-2 border-border bg-surface px-2.5 py-1 font-mono text-[0.66rem] font-bold tracking-wider text-muted shadow-[1px_1px_0_var(--color-border)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {project.images.length > 0 && (
                            <span className="inline-flex items-center gap-1 border-2 border-border bg-bg px-2.5 py-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-wider text-muted">
                              <Images className="h-3.5 w-3.5 text-primary" />
                              <span>{project.images.length} Foto</span>
                            </span>
                          )}

                          <button
                            type="button"
                            onClick={() => openCaseStudy(project)}
                            className="brutal-press inline-flex items-center gap-1.5 border-3 border-border bg-surface px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-text shadow-brutal-sm hover:bg-primary hover:text-white"
                          >
                            <span>Lihat Studi Kasus</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </footer>
                    </div>
                  </SpotlightCard>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Interactive Case Study Modal with Integrated Gallery Slider + ReactBits Stack */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[80] flex items-end justify-center bg-[#181827]/75 p-0 sm:items-center sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 360, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92svh] w-full max-w-5xl overflow-y-auto border-t-3 border-border bg-bg shadow-brutal-xl sm:border-3"
            >
              {/* Modal Top Bar */}
              <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b-3 border-border bg-surface px-5 py-4">
                <div className="min-w-0">
                  <p className="font-mono text-[0.68rem] font-bold uppercase tracking-widest text-primary">
                    Studi Kasus · {selectedProject.category} · {selectedProject.year}
                  </p>
                  <h3 id="case-study-title" className="truncate text-lg font-bold sm:text-xl">
                    {selectedProject.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Tutup studi kasus"
                  className="brutal-press grid h-10 w-10 shrink-0 place-items-center border-3 border-border bg-lime text-[#181827] shadow-brutal-sm"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[1.05fr_0.95fr]">
                {/* Left Column: Narrative & Deliverables */}
                <div className="grid content-start gap-6">
                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-orange">
                      Tantangan Operasional
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                      {selectedProject.challenge}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                      Pendekatan & Solusi Teknis
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                      {selectedProject.solution}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-faint">
                      Hasil Utama (Deliverables)
                    </h4>
                    <AnimatedList
                      items={selectedProject.deliverables}
                      keyExtractor={(item) => item}
                      className="mt-3 grid gap-2.5"
                      renderItem={(item) => (
                        <div className="flex items-start gap-2.5 border-2 border-border bg-surface px-3.5 py-2.5 text-sm font-medium shadow-brutal-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{item}</span>
                        </div>
                      )}
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5 border-t-3 border-border pt-4">
                    {selectedProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border-2 border-border bg-surface px-2.5 py-1 font-mono text-[0.66rem] font-bold text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Visual Switcher (Gallery Slider vs Interactive Stack) */}
                <div className="flex flex-col gap-4 border-3 border-border bg-surface p-4 shadow-brutal sm:p-5">
                  {/* Tab Switcher */}
                  <div
                    role="tablist"
                    aria-label="Panel visual studi kasus"
                    className="grid grid-cols-2 gap-1.5 border-3 border-border bg-bg p-1"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={modalTab === 'gallery'}
                      onClick={() => setModalTab('gallery')}
                      className={`relative flex items-center justify-center gap-1.5 px-3 py-2 font-mono text-[0.7rem] font-bold uppercase tracking-wider transition-colors ${
                        modalTab === 'gallery' ? 'text-white' : 'text-muted hover:text-text'
                      }`}
                    >
                      {modalTab === 'gallery' && (
                        <motion.span
                          layoutId="case-study-tab-pill"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                          className="absolute inset-0 border-2 border-border bg-primary"
                        />
                      )}
                      <Images className="relative z-10 h-3.5 w-3.5" />
                      <span className="relative z-10">
                        Bukti Proyek ({selectedProject.images.length})
                      </span>
                    </button>

                    <button
                      type="button"
                      role="tab"
                      aria-selected={modalTab === 'highlights'}
                      onClick={() => setModalTab('highlights')}
                      className={`relative flex items-center justify-center gap-1.5 px-3 py-2 font-mono text-[0.7rem] font-bold uppercase tracking-wider transition-colors ${
                        modalTab === 'highlights' ? 'text-white' : 'text-muted hover:text-text'
                      }`}
                    >
                      {modalTab === 'highlights' && (
                        <motion.span
                          layoutId="case-study-tab-pill"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                          className="absolute inset-0 border-2 border-border bg-primary"
                        />
                      )}
                      <Layers className="relative z-10 h-3.5 w-3.5" />
                      <span className="relative z-10">Sorotan Fitur</span>
                    </button>
                  </div>

                  {/* Tab Content */}
                  <AnimatePresence mode="wait">
                    {modalTab === 'gallery' ? (
                      <motion.div
                        key="tab-gallery"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                      >
                        <ProjectGallerySlider
                          images={selectedProject.images}
                          projectName={selectedProject.name}
                          onLightboxChange={setIsLightboxOpen}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="tab-highlights"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="flex flex-col gap-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[0.68rem] font-bold uppercase tracking-widest text-muted">
                            Kartu Ringkasan
                          </span>
                          <span className="border-2 border-border bg-bg px-2 py-0.5 font-mono text-[0.62rem] font-bold text-muted">
                            Geser / Klik Kartu
                          </span>
                        </div>

                        <div className="my-2 px-1">
                          <Stack
                            key={selectedProject.id}
                            cards={selectedProject.cards.map((card, cIdx) => ({
                              id: card.id,
                              content: (
                                <div
                                  className={`flex h-full flex-col justify-between border-3 border-border p-5 shadow-brutal ${stackCardAccents[card.accent]}`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-mono text-xs font-bold opacity-85">
                                      0{cIdx + 1} / 0{selectedProject.cards.length}
                                    </span>
                                    <span className="border-2 border-border bg-surface px-2 py-0.5 font-mono text-[0.6rem] font-bold uppercase text-text">
                                      Sorotan
                                    </span>
                                  </div>
                                  <div>
                                    <h5 className="text-lg font-bold leading-snug">{card.title}</h5>
                                    <p className="mt-2 text-xs leading-relaxed opacity-90 sm:text-sm">
                                      {card.caption}
                                    </p>
                                  </div>
                                </div>
                              )
                            }))}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
