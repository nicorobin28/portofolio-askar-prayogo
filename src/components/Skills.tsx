import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Folder as FolderIcon, LayoutGrid } from 'lucide-react';
import { skillGroups, skillIcons } from '@/data/cv';
import { DecryptedText } from '@/components/reactbits/DecryptedText';
import { Folder } from '@/components/reactbits/Folder';

const groupStyles = {
  primary: 'border-primary bg-primary/5',
  orange: 'border-orange bg-orange/5',
  lime: 'border-lime bg-lime/10'
};

export const Skills: React.FC = () => {
  const [viewMode, setViewMode] = useState<'matrix' | 'folders'>('matrix');
  const [activeFolderId, setActiveFolderId] = useState<string>(skillGroups[0].id);

  const activeGroup = skillGroups.find((g) => g.id === activeFolderId) ?? skillGroups[0];

  return (
    <section className="relative py-[clamp(4.5rem,10vw,8rem)]" id="skills">
      <div className="mx-auto w-[min(var(--spacing-maxw),100%-var(--spacing-gutter)*2)]">
        {/* Section Header & Mode Switcher */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.28em] text-faint">
              <span className="inline-block h-px w-8 bg-border/30" />
              <span className="text-primary">04</span>
              <span>/</span>
              <DecryptedText text="Keahlian" />
            </p>
            <h2 className="text-[clamp(2rem,5vw,3.4rem)] font-bold tracking-tight">
              Teknologi &{' '}
              <em className="not-italic text-lime [text-shadow:1px_1px_0_var(--color-border)]">
                perangkat kerja
              </em>
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Mode tampilan keahlian"
            className="inline-flex border-3 border-border bg-surface p-1 shadow-brutal-sm"
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'matrix'}
              onClick={() => setViewMode('matrix')}
              className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold transition-colors ${
                viewMode === 'matrix' ? 'text-white' : 'text-muted hover:text-text'
              }`}
            >
              {viewMode === 'matrix' && (
                <motion.span
                  layoutId="skills-mode-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 border-2 border-border bg-primary"
                />
              )}
              <LayoutGrid className="relative z-10 h-3.5 w-3.5" />
              <span className="relative z-10">Matriks</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'folders'}
              onClick={() => setViewMode('folders')}
              className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold transition-colors ${
                viewMode === 'folders' ? 'text-white' : 'text-muted hover:text-text'
              }`}
            >
              {viewMode === 'folders' && (
                <motion.span
                  layoutId="skills-mode-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 border-2 border-border bg-primary"
                />
              )}
              <FolderIcon className="relative z-10 h-3.5 w-3.5" />
              <span className="relative z-10">Berkas Interaktif</span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'matrix' ? (
            <motion.div
              key="matrix"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {skillGroups.map((group) => (
                <div
                  key={group.id}
                  className={`border-3 p-5 shadow-brutal transition-all duration-150 hover:-translate-y-1 hover:shadow-brutal-lg ${groupStyles[group.accent]}`}
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h3 className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-text">
                      {group.title}
                    </h3>
                    <span className="border-2 border-border bg-surface px-2 py-0.5 font-mono text-[0.65rem] font-bold text-primary">
                      {group.items.length}
                    </span>
                  </div>
                  <p className="mb-4 text-xs leading-relaxed text-muted">{group.description}</p>

                  <ul className="flex list-none flex-wrap gap-2 p-0">
                    {group.items.map((item) => {
                      const iconUrl = skillIcons[item.iconKey];
                      return (
                        <li key={item.name}>
                          <div
                            title={`Tingkat penguasaan: ${item.level}`}
                            className="group inline-flex items-center gap-2 border-2 border-border bg-surface px-3 py-1.5 text-sm font-medium text-text shadow-[2px_2px_0_var(--color-border)] transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-none"
                          >
                            {iconUrl && (
                              <img
                                src={iconUrl}
                                alt={`Logo ${item.name}`}
                                width={18}
                                height={18}
                                loading="lazy"
                                className="h-[18px] w-[18px] shrink-0"
                              />
                            )}
                            <span>{item.name}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="folders"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="grid gap-8"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {skillGroups.map((group) => (
                  <Folder
                    key={group.id}
                    title={group.title}
                    count={group.items.length}
                    accent={group.accent}
                    isOpenExternal={activeFolderId === group.id}
                    onClick={() => setActiveFolderId(group.id)}
                    items={group.items.map((item) => {
                      const iconUrl = skillIcons[item.iconKey];
                      return (
                        <div key={item.name} className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-2 text-xs font-bold text-text">
                            {iconUrl && (
                              <img
                                src={iconUrl}
                                alt=""
                                width={16}
                                height={16}
                                className="h-4 w-4 shrink-0"
                              />
                            )}
                            <span className="truncate">{item.name}</span>
                          </span>
                          <span className="font-mono text-[0.6rem] font-bold text-primary">
                            {item.level}
                          </span>
                        </div>
                      );
                    })}
                  />
                ))}
              </div>

              {/* Active Folder Inspector Panel */}
              <div className="border-3 border-border bg-surface p-5 shadow-brutal sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-border pb-4">
                  <div>
                    <p className="font-mono text-[0.68rem] font-bold uppercase tracking-widest text-primary">
                      Isi Berkas Terpilih
                    </p>
                    <h3 className="mt-1 text-xl font-bold">{activeGroup.title}</h3>
                  </div>
                  <p className="max-w-md text-xs text-muted sm:text-sm">
                    {activeGroup.description}
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {activeGroup.items.map((item) => {
                    const iconUrl = skillIcons[item.iconKey];
                    return (
                      <div
                        key={item.name}
                        className="flex items-center justify-between gap-3 border-2 border-border bg-bg p-3 shadow-brutal-sm"
                      >
                        <div className="flex items-center gap-2.5">
                          {iconUrl && (
                            <img
                              src={iconUrl}
                              alt={`Logo ${item.name}`}
                              width={20}
                              height={20}
                              className="h-5 w-5 shrink-0"
                            />
                          )}
                          <span className="text-sm font-bold">{item.name}</span>
                        </div>
                        <span className="border-2 border-border bg-lime px-2 py-0.5 font-mono text-[0.62rem] font-bold text-[#181827]">
                          {item.level}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
