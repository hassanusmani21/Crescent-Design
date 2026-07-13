import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { ProcessTimeline } from "@/components/process-timeline";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { PortfolioShowcase } from "@/components/portfolio-showcase";
import { ServicesShowcase } from "@/components/services-showcase";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { processStages } from "@/data/site-content";

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: ReactNode;
  text: string;
}) {
  return (
    <Reveal className="section-header editorial-header">
      <SectionLabel>{eyebrow}</SectionLabel>
      <div className="section-header__content">
        <h2 className="section-heading">{title}</h2>
        <p className="section-copy">{text}</p>
      </div>
    </Reveal>
  );
}

export function FeaturedProjects() {
  const processPreview = processStages;

  return (
    <>
      <section id="portfolio" className="projects-section section-shell" aria-labelledby="portfolio-title">
        <PortfolioShowcase />
      </section>

      <section id="services" className="section-shell services-section" aria-labelledby="services-title">
        <SectionHeader
          eyebrow="Services"
          title={
            <>
              End-to-End Interior
              <br />
              Solutions
            </>
          }
          text="From cabinetry to lighting, every detail is designed as one cohesive interior language."
        />
        <h2 id="services-title" className="sr-only">
          Services
        </h2>
        <ServicesShowcase />
      </section>

      <section id="process" className="section-shell process-section" aria-labelledby="process-title">
        <SectionHeader
          eyebrow="Process"
          title="A quiet architectural sequence."
          text="Four measured phases carry the work from brief to installation."
        />
        <ProcessTimeline stages={processPreview} />
      </section>

      <section id="testimonials" className="section-shell testimonials-section" aria-labelledby="testimonials-title">
        <h2 id="testimonials-title" className="sr-only">
          Testimonials
        </h2>
        <Reveal className="testimonials-section__slider">
          <TestimonialSlider />
        </Reveal>
      </section>

      <footer className="minimal-footer">
        <div className="minimal-footer__inner">
          <BrandLogo className="minimal-footer__brand" />
          <nav aria-label="Footer" className="minimal-footer__nav">
            <Link href="#portfolio">Portfolio</Link>
            <Link href="#services">Services</Link>
            <Link href="#process">Process</Link>
          </nav>
          <p className="minimal-footer__credit">Designed by Hassan Usmani</p>
          <p>© 2026</p>
        </div>
      </footer>
    </>
  );
}
