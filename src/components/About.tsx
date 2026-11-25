import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { profile } from '@/data/cv';
import { DecryptedText } from '@/components/reactbits/DecryptedText';
import { SpotlightCard } from '@/components/reactbits/SpotlightCard';

interface FactCard {
  label: string;
  value: string;
  href?: string;
  copyValue?: string;
}

export const About: React.FC = () => {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const facts: FactCard[] = [
    { label: 'Lokasi', value: profile.location },
    {
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      copyValue: profile.email
    },
    {
      label: 'Telepon / WhatsApp',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/[^+\d]/g, '')}`,
      copyValue: profile.phone
    },
    { label: 'Ketersediaan', value: profile.availability }
  ];

  const handleCopy = async (label: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLabel(label);
      window.setTimeout(() => {
        setCopiedLabel((curr) => (curr === label ? null : curr));
      }, 1800);
    } catch {
      // Fallback no-op if clipboard blocked
    }
  };

  return (
    <section className="relative py-[clamp(4.5rem,10vw,8rem)]" id="about">
      <div className="mx-auto grid w-[min(var(--spacing-maxw),100%-var(--spacing-gutter)*2)] grid-cols-1 items-start gap-8 md:grid-cols-[12rem_1fr] md:gap-12">
        {/* Sticky Sidebar Label */}
        <div className="md:sticky md:top-[calc(var(--spacing-nav-h)+2rem)]">
          <p className="inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.28em] text-faint">
            <span className="inline-block h-px w-8 bg-border/30" />
            <span className="text-primary">01</span>
            <span>/</span>
            <DecryptedText text="Tentang Saya" />
          </p>
        </div>

        {/* Main Content */}
        <div>
          <h2 className="text-[clamp(1.95rem,4.6vw,3.3rem)] font-bold leading-tight tracking-tight">
            Membangun solusi yang{' '}
            <em className="border-b-4 border-lime not-italic text-primary">bekerja nyata</em> —
            bagi pengguna, dengan dampak yang terukur.
          </h2>

          <p className="mt-6 max-w-[56rem] text-[clamp(0.98rem,1.45vw,1.1rem)] leading-relaxed text-muted">
            {profile.summary}
          </p>

          {/* Interactive Facts Grid with Click-to-Copy */}
          <dl className="mt-9 grid max-w-[52rem] grid-cols-1 gap-4 sm:grid-cols-2">
            {facts.map((fact) => {
              const isCopied = copiedLabel === fact.label;
              return (
                <SpotlightCard
                  key={fact.label}
                  className="p-4 hover:-translate-y-0.5 hover:shadow-brutal-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <dt className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.22em] text-faint">
                        {fact.label}
                      </dt>
                      <dd className="mt-1.5 break-words text-[0.95rem] font-medium text-text">
                        {fact.href ? (
                          <a
                            href={fact.href}
                            className="border-b-2 border-primary/40 transition-colors hover:border-primary hover:text-primary"
                          >
                            {fact.value}
                          </a>
                        ) : (
                          fact.value
                        )}
                      </dd>
                    </div>

                    {fact.copyValue && (
                      <button
                        type="button"
                        onClick={() => handleCopy(fact.label, fact.copyValue!)}
                        aria-label={`Salin ${fact.label}`}
                        className={`shrink-0 border-2 border-border px-2 py-1 font-mono text-[0.65rem] font-bold uppercase transition-colors ${
                          isCopied
                            ? 'bg-lime text-[#181827]'
                            : 'bg-bg text-muted hover:bg-primary hover:text-white'
                        }`}
                      >
                        {isCopied ? (
                          <span className="inline-flex items-center gap-1">
                            <Check className="h-3 w-3" /> Tersalin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1">
                            <Copy className="h-3 w-3" /> Salin
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                </SpotlightCard>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
};
