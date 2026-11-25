import React from 'react';
import { ArrowDown, ArrowRight, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { profile, stats } from '@/data/cv';
import { DotGrid } from '@/components/reactbits/DotGrid';
import { SplitText } from '@/components/reactbits/SplitText';
import { RotatingText } from '@/components/reactbits/RotatingText';
import { TiltedCard } from '@/components/reactbits/TiltedCard';
import { Magnet } from '@/components/reactbits/Magnet';
import { CountUp } from '@/components/reactbits/CountUp';

export const Hero: React.FC = () => {
  return (
    <section
      id="top"
      className="relative flex flex-col justify-center overflow-x-clip pb-12 pt-[calc(var(--spacing-nav-h)+1.75rem)] lg:min-h-svh lg:pb-16 lg:pt-[calc(var(--spacing-nav-h)+2.75rem)]"
    >
      {/* Interactive ReactBits DotGrid Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <DotGrid dotSize={2.5} gap={30} proximity={130} />
        <div className="absolute right-[8%] top-[12%] hidden h-36 w-36 rotate-12 border-3 border-border bg-lime/20 lg:block" />
        <div className="absolute bottom-[22%] left-[5%] hidden h-20 w-20 rounded-full border-3 border-border bg-orange/15 lg:block" />
      </div>

      <div className="relative mx-auto w-[min(var(--spacing-maxw),100%-var(--spacing-gutter)*2)]">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* LEFT: Copy & CTA (order-2 on mobile so portrait is balanced, or compact portrait on top) */}
          <div className="order-2 lg:order-1">
            {/* Rotating Role Badge */}
            <div className="mb-4 inline-flex flex-wrap items-center gap-2 border-3 border-border bg-surface px-3 py-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-widest shadow-brutal-sm sm:text-xs">
              <span className="text-primary">◆</span>
              <RotatingText
                texts={profile.subroles}
                className="min-w-[11rem] text-text sm:min-w-[14rem]"
              />
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(2.4rem,9.5vw,5.6rem)] font-bold leading-[0.98] tracking-tighter">
              {profile.taglineWords.map((word, idx) => (
                <span key={word} className="block">
                  <SplitText
                    text={word}
                    delay={idx * 0.09}
                    stagger={0.03}
                    immediate
                    className={
                      idx === 1
                        ? 'text-primary'
                        : idx === 3
                          ? 'mt-1 border-3 border-border bg-lime px-3 py-0.5 text-[#181827] shadow-brutal'
                          : ''
                    }
                  />
                </span>
              ))}
            </h1>

            <p className="mt-5 max-w-[36rem] text-[clamp(0.95rem,1.5vw,1.08rem)] leading-relaxed text-muted">
              <strong className="font-bold text-text">{profile.name}</strong> —{' '}
              {profile.summaryShort}
            </p>

            {/* Primary CTA & Socials */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <Magnet strength={0.25}>
                <a
                  href="#work"
                  className="brutal-press inline-flex items-center gap-2 border-3 border-border bg-primary px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-brutal sm:px-6 sm:text-sm"
                >
                  <span>Lihat Proyek</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Magnet>

              <Magnet strength={0.2}>
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-press inline-flex items-center gap-2 border-3 border-border bg-surface px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-text shadow-brutal-sm hover:bg-lime hover:text-[#181827] sm:px-6 sm:text-sm"
                >
                  <span>Unduh CV</span>
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </Magnet>

              <ul className="flex list-none gap-2 p-0" aria-label="Tautan media sosial">
                <li>
                  <a
                    href={profile.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Askar Prayogo"
                    className="brutal-press grid h-11 w-11 place-items-center border-3 border-border bg-surface text-muted shadow-brutal-sm hover:bg-text hover:text-bg"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </li>
                <li>
                  <a
                    href={profile.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Askar Prayogo"
                    className="brutal-press grid h-11 w-11 place-items-center border-3 border-border bg-surface text-muted shadow-brutal-sm hover:bg-text hover:text-bg"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    aria-label="Kirim Email ke Askar Prayogo"
                    className="brutal-press grid h-11 w-11 place-items-center border-3 border-border bg-surface text-muted shadow-brutal-sm hover:bg-text hover:text-bg"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Portrait Card (Mobile Layout Fixed — no negative clipping offsets) */}
          <div className="order-1 mx-auto w-[min(80vw,18rem)] sm:w-[20.5rem] lg:order-2 lg:w-[23.5rem]">
            <div className="relative p-2 sm:p-3">
              {/* Safe dashed geometric frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 border-3 border-dashed border-primary/50"
              />

              <TiltedCard rotateAmplitude={7} scaleOnHover={1.02}>
                <div className="relative overflow-hidden border-3 border-border bg-surface shadow-brutal-lg lg:shadow-brutal-xl">
                  {/* Collector Card Header Bar */}
                  <div className="flex items-center justify-between border-b-3 border-border bg-bg px-3 py-2">
                    <span className="font-mono text-[0.66rem] font-bold uppercase tracking-widest text-muted">
                      ID // ASKAR.DEV
                    </span>
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="h-2.5 w-2.5 border-2 border-border bg-primary" />
                      <span className="h-2.5 w-2.5 border-2 border-border bg-lime" />
                      <span className="h-2.5 w-2.5 border-2 border-border bg-orange" />
                    </div>
                  </div>

                  {/* Portrait Visual Stage (styled behind transparent PNG) */}
                  <div className="relative aspect-[4/4.1] w-full overflow-hidden bg-bg">
                    {/* Halftone + Neo-brutalist color blocks behind transparent PNG */}
                    <div aria-hidden="true" className="bg-halftone absolute inset-0 opacity-20" />
                    <div
                      aria-hidden="true"
                      className="absolute -right-6 top-6 h-36 w-36 rotate-6 border-3 border-border bg-lime/80 sm:h-44 sm:w-44"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute -left-4 bottom-8 h-24 w-24 -rotate-6 border-3 border-border bg-primary/85"
                    />

                    <img
                      src={profile.photo}
                      alt={`Foto profil ${profile.name}`}
                      width={640}
                      height={660}
                      fetchPriority="high"
                      className="relative z-10 h-full w-full object-contain object-bottom px-2 pt-3"
                    />

                    <span
                      aria-hidden="true"
                      className="absolute bottom-2.5 right-3 z-20 border-2 border-border bg-surface px-1.5 py-0.5 font-mono text-sm font-bold text-primary shadow-brutal-sm"
                    >
                      ↘
                    </span>
                  </div>

                  {/* Mobile-Safe Docked Status Bar (always visible inside card on < lg, zero clipping) */}
                  <div className="grid grid-cols-2 border-t-3 border-border bg-surface lg:hidden">
                    <div className="flex items-center gap-1.5 border-r-3 border-border px-2.5 py-2">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                      <span className="truncate font-mono text-[0.62rem] font-bold uppercase tracking-wider text-muted">
                        {profile.city}, ID
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 bg-lime px-2.5 py-2 text-[#181827]">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                      <span className="truncate font-mono text-[0.62rem] font-bold uppercase tracking-wider">
                        Siap Kerja
                      </span>
                    </div>
                  </div>
                </div>
              </TiltedCard>

              {/* Desktop Floating Badges (positioned safely inside lg gutter) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-6 top-[16%] z-20 hidden items-center gap-2 border-3 border-border bg-surface px-3 py-1.5 shadow-brutal-sm lg:inline-flex"
              >
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono text-[0.68rem] font-bold uppercase tracking-widest text-muted">
                  Berbasis di {profile.city}
                </span>
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-5 bottom-[14%] z-20 hidden items-center gap-2 border-3 border-border bg-lime px-3 py-1.5 text-[#181827] shadow-brutal-sm lg:inline-flex"
              >
                <span className="font-mono text-[0.68rem] font-bold uppercase tracking-widest">
                  Terbuka untuk Peluang
                </span>
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip — fixed 2x2 mobile border logic */}
        <dl className="mt-10 grid grid-cols-2 border-3 border-border bg-surface shadow-brutal lg:mt-14 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`p-4 lg:p-5 ${idx % 2 === 1 ? 'border-l-3 border-border' : ''} ${
                idx > 0 ? 'lg:border-l-3 lg:border-border' : ''
              } ${idx >= 2 ? 'border-t-3 border-border lg:border-t-0' : ''}`}
            >
              <dt className="flex items-baseline text-[clamp(1.65rem,3vw,2.4rem)] font-bold tracking-tight">
                <CountUp to={stat.value} className="text-primary" />
                <span className="ml-0.5 text-[0.62em] text-orange">{stat.suffix}</span>
              </dt>
              <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Desktop-only scroll indicator so mobile never overlaps */}
      <a
        href="#about"
        aria-label="Gulir ke bagian Tentang Saya"
        className="mt-8 hidden items-center gap-2 self-center font-mono text-[0.66rem] uppercase tracking-[0.3em] text-faint transition-colors hover:text-primary lg:inline-flex"
      >
        <span>gulir</span>
        <span className="h-6 w-px bg-border/30 relative overflow-hidden">
          <span className="absolute inset-0 bg-primary animate-bounce" />
        </span>
      </a>
    </section>
  );
};
