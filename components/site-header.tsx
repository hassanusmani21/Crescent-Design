"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { ConsultationButton } from "@/components/consultation-button";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { label: "Portfolio", href: "#portfolio", id: "portfolio" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Process", href: "#process", id: "process" },
];

function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("hidden"));
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("portfolio");
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const previousMenuOpen = useRef(false);
  const isOverlay = !scrolled && !menuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.1, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const container = menuRef.current;
    const focusables = getFocusableElements(container);
    focusables[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const currentFocusables = getFocusableElements(container);
      if (currentFocusables.length === 0) {
        return;
      }

      const first = currentFocusables[0];
      const last = currentFocusables[currentFocusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (previousMenuOpen.current && !menuOpen) {
      menuButtonRef.current?.focus();
    }

    previousMenuOpen.current = menuOpen;
  }, [menuOpen]);

  return (
    <>
      <header
        className={[
          "site-header fixed inset-x-0 top-0 z-[90] border-b transition-all duration-300 ease-[var(--ease-premium)]",
          scrolled || menuOpen
            ? "site-header--solid border-[var(--header-border)] bg-[var(--header-surface)] shadow-[var(--header-shadow)]"
            : "site-header--overlay border-transparent bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex h-[5rem] w-full max-w-[1520px] items-center gap-4 px-[var(--page-padding)]">
          <Link
            href="#top"
            className={`site-header__brand min-w-0 text-[0.95rem] font-semibold uppercase tracking-[0.22em] focus-visible:outline-none ${isOverlay ? "text-[var(--hero-foreground)]" : "text-[var(--text-primary)]"}`}
            aria-label="Crescent Design home"
          >
            <BrandLogo />
          </Link>

          <nav className="ml-auto hidden items-center gap-8 lg:flex" aria-label="Primary">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`nav-item ${isActive ? "nav-item--active" : ""} ${isOverlay ? "nav-item--overlay" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <ThemeToggle className="header-theme-toggle" />
            <ConsultationButton
              className={`header-cta magnetic-target min-h-11 px-5 text-base ${isOverlay ? "button-secondary text-[var(--hero-foreground)] shadow-none" : "button-primary"}`}
            >
              Start a Project
            </ConsultationButton>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              className={`icon-button ${isOverlay ? "icon-button--overlay" : ""}`}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMenuOpen((current) => !current)}
            >
              <span aria-hidden="true" className="grid gap-1.5">
                <span className={`block h-px w-5 bg-current transition duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                <span className={`block h-px w-5 bg-current transition duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-px w-5 bg-current transition duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[95] transition duration-500 ease-[var(--ease-premium)] lg:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[rgba(10,10,9,0.35)] backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div
          id="mobile-navigation"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`absolute inset-0 overflow-y-auto bg-[var(--surface-primary)] px-5 pb-8 pt-28 text-[var(--text-primary)] transition duration-500 ease-[var(--ease-premium)] sm:px-6 ${
            menuOpen ? "translate-y-0" : "-translate-y-6"
          }`}
        >
          <div className="mx-auto flex min-h-full max-w-[42rem] flex-col justify-between gap-10">
            <nav className="grid gap-4" aria-label="Mobile primary">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`mobile-nav-link ${menuOpen ? "mobile-nav-link--visible" : ""} ${isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}
                    style={{ transitionDelay: `${80 + index * 40}ms` }}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="space-y-8 border-t border-[var(--border-subtle)] pt-8">
              <div className="flex items-center justify-between gap-4 border border-[var(--border-subtle)] px-4 py-3">
                <div>
                  <p className="section-label">Theme</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">Choose light or dark.</p>
                </div>
                <ThemeToggle />
              </div>

              <ConsultationButton className="button-primary w-full justify-center" onClick={() => setMenuOpen(false)}>
                Start a Project
              </ConsultationButton>

              <p className="max-w-xs text-sm leading-7 text-[var(--text-secondary)]">
                Navigate the portfolio, services, and process before starting a project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
