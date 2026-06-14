import Image from "next/image";
import Link from "next/link";
import { ConsultationButton } from "@/components/consultation-button";
import { LinkArrow } from "@/components/link-arrow";

export function HeroSection() {
  return (
    <section
      id="top"
      className="hero relative isolate bg-[var(--hero-background)] text-[var(--hero-foreground)]"
      aria-labelledby="hero-title"
    >
      <div className="hero-background absolute inset-0">
        <Image
          src="/interiors/hero.png"
          alt="Luxury living room with marble wall, sculptural furniture, and a city view framed by soft drapery."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
      </div>

      <div className="hero-inner">
        <div className="hero-main">
          <div className="hero-content">
            <p className="hero-sequence-1 hero-eyebrow section-label text-[var(--hero-muted)]">Interior Architecture &amp; Design</p>
            <h1
              id="hero-title"
              className="hero-sequence-2 hero-title text-[var(--hero-foreground)]"
            >
              Spaces designed around the way you live.
            </h1>
            <p className="hero-sequence-3 hero-description text-[var(--hero-soft)]">
              Crescent Design creates thoughtful, enduring interiors shaped by people, place, and material. We translate full-home plans, kitchen architecture, bedrooms, baths, and commercial rooms into calm, lived-in spaces.
            </p>
            <div className="hero-sequence-4 hero-actions">
              <Link href="#projects" className="button-primary hero-primary-button min-w-[12.75rem]">
                <LinkArrow>Explore Projects</LinkArrow>
              </Link>
              <ConsultationButton className="button-secondary hero-secondary-button min-w-[11.75rem]">
                <LinkArrow>Start a Project</LinkArrow>
              </ConsultationButton>
            </div>
          </div>

          <aside className="hero-project-card hero-sequence-5">
            <p className="section-label text-[var(--hero-muted)]">Current focus</p>
            <div className="mt-5 grid gap-5 text-sm text-[var(--hero-soft)]">
              <div className="border-b border-white/12 pb-5">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--hero-muted)]">Project</p>
                <p className="mt-2 font-display text-[clamp(1.9rem,2.6vw,2.4rem)] leading-[0.96] text-[var(--hero-foreground)]">
                  Marble City Residence
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--hero-muted)]">Scope</p>
                  <p className="mt-2 max-w-[17rem] leading-7 text-[var(--hero-soft)]">
                    Living, dining, lighting, and material direction for a city-facing home.
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--hero-muted)]">Year</p>
                  <p className="mt-2 text-sm font-semibold tracking-[0.08em] text-[var(--hero-foreground)]">2024</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="hero-footer hero-bottom-area">
          <div className="hero-sequence-5 hero-metadata text-sm text-[var(--hero-soft)]">
            <div>
              <p className="section-label hero-metadata-label">Location</p>
              <p className="hero-metadata-value mt-2">City-view apartment</p>
            </div>
            <div>
              <p className="section-label hero-metadata-label">Approach</p>
              <p className="hero-metadata-value mt-2">Measured luxury, natural materials, quiet lighting.</p>
            </div>
          </div>

          <Link
            href="#projects"
            className="hero-sequence-5 hero-scroll-indicator interactive-link inline-flex min-h-11 items-center justify-start gap-3 text-[var(--hero-foreground)]"
          >
            <span className="hero-scroll-label text-xs uppercase tracking-[0.18em]">Scroll to selected work</span>
            <span aria-hidden="true" className="link-arrow arrow text-base">
              {"->"}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
