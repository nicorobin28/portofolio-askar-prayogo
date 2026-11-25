import React, { useState } from 'react';
import { Check, Copy, ArrowDown, Mail } from 'lucide-react';
import { profile } from '@/data/cv';
import { DecryptedText } from '@/components/reactbits/DecryptedText';
import { Magnet } from '@/components/reactbits/Magnet';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore if clipboard unavailable
    }
  };

  return (
    <section className="relative overflow-x-clip py-[clamp(5rem,12vw,9rem)]" id="contact">
      {/* Decorative Neubrutalist shapes */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[8%] top-[10%] hidden h-32 w-32 rotate-12 border-3 border-border bg-primary/10 lg:block" />
        <div className="absolute bottom-[15%] right-[10%] hidden h-24 w-24 rounded-full border-3 border-border bg-lime/15 lg:block" />
        <div className="absolute right-[28%] top-[48%] hidden h-16 w-16 -rotate-12 border-3 border-border bg-orange/10 lg:block" />
      </div>

      <div className="relative mx-auto grid w-[min(var(--spacing-maxw),100%-var(--spacing-gutter)*2)] justify-items-center gap-6 text-center">
        <p className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.28em] text-faint">
          <span className="text-primary">06</span>
          <span>/</span>
          <DecryptedText text="Kontak" />
        </p>

        <h2 className="text-[clamp(2.2rem,6vw,4.3rem)] font-bold leading-tight tracking-tight">
          Mari wujudkan{' '}
          <em className="border-b-4 border-lime not-italic text-primary">ide Anda berikutnya</em>
          <br />
          menjadi dampak nyata.
        </h2>

        <p className="max-w-[36rem] text-muted">
          Saat ini saya terbuka untuk peluang karier full-time sebagai Software Engineer /
          Fullstack Web Developer. Jangan ragu untuk menghubungi saya — pesan Anda akan saya
          balas maksimal dalam 1×24 jam.
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-3.5">
          <Magnet strength={0.24}>
            <a
              href={`mailto:${profile.email}`}
              className="brutal-press inline-flex items-center gap-2 border-3 border-border bg-primary px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-brutal sm:text-sm"
            >
              <Mail className="h-4 w-4" />
              <span>{profile.email}</span>
            </a>
          </Magnet>

          <button
            type="button"
            onClick={copyEmail}
            className={`brutal-press inline-flex items-center gap-2 border-3 border-border px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider shadow-brutal-sm sm:text-sm ${
              copied
                ? 'bg-lime text-[#181827]'
                : 'bg-surface text-text hover:bg-lime hover:text-[#181827]'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Email Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Salin Email</span>
              </>
            )}
          </button>

          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-press inline-flex items-center gap-2 border-3 border-border bg-surface px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-text shadow-brutal-sm hover:bg-orange hover:text-[#181827] sm:text-sm"
          >
            <span>Unduh CV</span>
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>

        <ul className="mt-8 grid list-none grid-cols-1 gap-x-8 gap-y-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
          <li>
            <a
              href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}
              className="group grid gap-1"
            >
              <span className="font-mono text-[0.64rem] font-bold uppercase tracking-[0.24em] text-faint">
                Telepon / WA
              </span>
              <span className="text-[0.95rem] font-medium text-muted transition-colors group-hover:text-primary">
                {profile.phone}
              </span>
            </a>
          </li>
          <li>
            <a
              href={profile.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-1"
            >
              <span className="font-mono text-[0.64rem] font-bold uppercase tracking-[0.24em] text-faint">
                LinkedIn
              </span>
              <span className="text-[0.95rem] font-medium text-muted transition-colors group-hover:text-primary">
                {profile.linkedin.label}
              </span>
            </a>
          </li>
          <li>
            <a
              href={profile.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-1"
            >
              <span className="font-mono text-[0.64rem] font-bold uppercase tracking-[0.24em] text-faint">
                GitHub
              </span>
              <span className="text-[0.95rem] font-medium text-muted transition-colors group-hover:text-primary">
                {profile.github.label}
              </span>
            </a>
          </li>
          <li className="grid gap-1">
            <span className="font-mono text-[0.64rem] font-bold uppercase tracking-[0.24em] text-faint">
              Lokasi
            </span>
            <span className="text-[0.95rem] font-medium text-muted">{profile.location}</span>
          </li>
        </ul>
      </div>
    </section>
  );
};
