import Image from "next/image";
import Link from "next/link";
import { ConsultationButton } from "@/components/consultation-button";
import { LinkArrow } from "@/components/link-arrow";

const heroStats = [
  {
    value: "40+",
    label: "Projects",
    icon: (
      <path
        d="M12 3.5 4.75 7.6v8.8L12 20.5l7.25-4.1V7.6L12 3.5Zm0 0v8.4m0 8.6v-8.6m0 0 7.25-4.3M12 11.9 4.75 7.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    value: "10+",
    label: "Years",
    icon: (
      <path
        d="M7 10.5h10m-8.5 0V7.25A2.25 2.25 0 0 1 10.75 5h2.5a2.25 2.25 0 0 1 2.25 2.25v3.25M6.25 10.5h11.5l-.7 7.5H6.95l-.7-7.5Zm2 7.5v2m7.5-2v2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    value: "100%",
    label: "Satisfaction",
    icon: (
      <path
        d="m12 3.75 2.05 2.12 2.95-.18.18 2.95 2.12 2.05-2.12 2.05-.18 2.95-2.95-.18L12 17.63 9.95 15.5l-2.95.18-.18-2.95-2.12-2.05 2.12-2.05.18-2.95 2.95.18L12 3.75Zm-1.6 7.02 1.08 1.08 2.22-2.38"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

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
          className="hero-image object-cover object-[62%_center]"
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
              Quiet interiors <br />
              for considered <br />
              <span>living.</span>
            </h1>
            <p className="hero-sequence-3 hero-description text-[var(--hero-soft)]">
              Crescent Design creates restrained homes, kitchens, baths, bedrooms, and commercial rooms shaped by light, material, and daily rhythm.
            </p>
            <div className="hero-sequence-4 hero-actions">
              <Link href="#portfolio" className="button-primary hero-primary-button magnetic-target min-w-[12.75rem]">
                <LinkArrow>View Work</LinkArrow>
              </Link>
              <ConsultationButton className="button-secondary hero-secondary-button magnetic-target min-w-[11.75rem]">
                <LinkArrow>Start a Project</LinkArrow>
              </ConsultationButton>
            </div>
            <div className="hero-stats" aria-label="Studio highlights">
              {heroStats.map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    {stat.icon}
                  </svg>
                  <span>
                    <strong>{stat.value}</strong> {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="hero-feature-card" aria-label="Featured project">
          <div>
            <p>Featured Project</p>
            <h2>Serene Residence</h2>
            <span>Mumbai, India · 4,250 sq.ft</span>
          </div>
          <div className="hero-feature-card__image">
            <Image
              src="/interiors/living-room-marble-lounge.jpg"
              alt="Serene residence living and dining interior preview."
              fill
              sizes="120px"
              className="object-cover"
            />
          </div>
          <Link href="#portfolio" aria-label="View featured project" className="hero-feature-card__arrow">
            {"->"}
          </Link>
        </aside>

      </div>
    </section>
  );
}
