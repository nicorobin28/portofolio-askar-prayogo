import React from "react";
import { ArrowUp } from "lucide-react";
import { navItems, profile } from "@/data/cv";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-3 border-border bg-surface py-10">
      <div className="mx-auto flex w-[min(var(--spacing-maxw),100%-var(--spacing-gutter)*2)] flex-wrap items-center justify-between gap-6">
        <div className="grid gap-1">
          <span className="text-xl font-bold text-primary">
            AP<span className="text-orange">.</span>
          </span>
          <p className="text-sm text-faint">
            Dari ide menjadi dampak — {year} dan seterusnya.
          </p>
        </div>

        <nav className="flex flex-wrap gap-5" aria-label="Navigasi footer">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="grid items-end gap-1 sm:justify-items-end">
          <p className="font-mono text-xs tracking-wider text-faint">
            © {year} {profile.name}
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1 font-mono text-xs font-bold tracking-wider text-muted transition-colors hover:text-primary"
          >
            <span>Kembali ke atas</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
