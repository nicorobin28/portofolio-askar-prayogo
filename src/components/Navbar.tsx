import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";
import { navItems, profile } from "@/data/cv";
import { Magnet } from "@/components/reactbits/Magnet";

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, onToggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const mobileDrawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ids = navItems.map((item) => item.href.slice(1));

    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) current = id;
      }
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll & close on Escape when StaggeredMenu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    // GSAP staggered entrance for ReactBits StaggeredMenu items
    if (
      mobileDrawerRef.current &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const links = mobileDrawerRef.current.querySelectorAll(
        "[data-stagger-item]",
      );
      gsap.fromTo(
        links,
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.055,
          ease: "power3.out",
          delay: 0.08,
        },
      );
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex h-[var(--spacing-nav-h)] items-center border-b-3 transition-colors duration-200 ${
          scrolled || menuOpen
            ? "border-border bg-surface/95 shadow-[0_3px_0_var(--color-border)] backdrop-blur-sm"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-[min(var(--spacing-maxw),100%-var(--spacing-gutter)*2)] items-center justify-between gap-4">
          {/* Brand */}
          <a
            href="#top"
            onClick={closeMenu}
            aria-label="Kembali ke atas"
            className="inline-flex items-center gap-2.5 font-mono text-sm font-bold uppercase tracking-widest"
          >
            <span className="brutal-press grid h-9 w-9 place-items-center border-3 border-border bg-primary text-base font-bold text-white shadow-brutal-sm">
              AP
            </span>
            <span className="hidden text-muted sm:inline">{profile.name}</span>
          </a>

          {/* Desktop ReactBits PillNav */}
          <nav
            className="hidden items-center gap-1 border-3 border-border bg-surface p-1 shadow-brutal-sm md:flex"
            aria-label="Navigasi utama"
          >
            {navItems.map((item) => {
              const id = item.href.slice(1);
              const isActive = activeId === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`relative px-3.5 py-1.5 text-sm font-bold transition-colors ${
                    isActive ? "text-white" : "text-muted hover:text-text"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="pillnav-active"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                      className="absolute inset-0 z-0 border-2 border-border bg-primary"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={
                isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"
              }
              className="brutal-press grid h-10 w-10 place-items-center border-3 border-border bg-surface text-text shadow-brutal-sm"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <Magnet strength={0.22} className="hidden sm:inline-block">
              <a
                href="#contact"
                onClick={closeMenu}
                className="brutal-press inline-flex items-center gap-2 border-3 border-border bg-lime px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#181827] shadow-brutal-sm"
              >
                <span>Mari Berdiskusi</span>
                <span
                  className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse"
                  aria-hidden="true"
                />
              </a>
            </Magnet>

            {/* Mobile Hamburger Trigger */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={
                menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-staggered-menu"
              className="brutal-press grid h-10 w-10 place-items-center border-3 border-border bg-surface text-text shadow-brutal-sm md:hidden"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile ReactBits StaggeredMenu — rendered OUTSIDE <header> to prevent backdrop-filter fixed clipping */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-staggered-menu"
            ref={mobileDrawerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col bg-bg md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi mobile"
          >
            {/* Staggered color underlay bars */}
            <motion.div
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "top" }}
              className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-primary"
            />
            <motion.div
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{
                duration: 0.28,
                delay: 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: "top" }}
              className="pointer-events-none absolute inset-x-0 top-2 h-2 bg-lime"
            />

            {/* Top bar inside drawer */}
            <div className="flex h-[var(--spacing-nav-h)] items-center justify-between border-b-3 border-border bg-surface px-5 pt-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Menu Navigasi
              </span>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Tutup menu"
                className="grid h-10 w-10 place-items-center border-3 border-border bg-lime text-[#181827] shadow-brutal-sm"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Staggered nav items */}
            <div className="flex flex-1 flex-col justify-between overflow-y-auto px-5 py-6">
              <nav className="grid gap-3" aria-label="Menu mobile">
                {navItems.map((item, idx) => {
                  const isActive = activeId === item.href.slice(1);
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      data-stagger-item
                      onClick={closeMenu}
                      className={`brutal-press flex items-center justify-between border-3 border-border px-5 py-3.5 text-xl font-bold shadow-brutal ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-surface text-text hover:bg-lime hover:text-[#181827]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`font-mono text-xs ${
                            isActive ? "text-lime" : "text-primary"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span>{item.label}</span>
                      </span>
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  );
                })}
              </nav>

              <div
                data-stagger-item
                className="mt-6 grid gap-3 border-t-3 border-border pt-5"
              >
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 border-3 border-border bg-lime px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#181827] shadow-brutal-sm"
                >
                  <span>Mari Berdiskusi</span>
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                </a>
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 border-3 border-border bg-surface px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-text shadow-brutal-sm"
                >
                  <span>Unduh CV (PDF) ↓</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
