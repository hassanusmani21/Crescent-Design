import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { ConsultationButton } from "@/components/consultation-button";
import { LinkArrow } from "@/components/link-arrow";
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

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M17.25 6.75h.01" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 5l14 14" />
      <path d="M19 5 5 19" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4.75 8.25c.18-1.2 1.08-2.1 2.26-2.24C8.44 5.84 10.2 5.75 12 5.75s3.56.09 4.99.26c1.18.14 2.08 1.04 2.26 2.24.18 1.18.25 2.42.25 3.75s-.07 2.57-.25 3.75c-.18 1.2-1.08 2.1-2.26 2.24-1.43.17-3.19.26-4.99.26s-3.56-.09-4.99-.26c-1.18-.14-2.08-1.04-2.26-2.24A25.4 25.4 0 0 1 4.5 12c0-1.33.07-2.57.25-3.75Z" />
      <path d="m10.5 9.25 4.25 2.75-4.25 2.75Z" />
    </svg>
  );
}

export function FeaturedProjects() {
  const processPreview = processStages.slice(0, 4);

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
        <div className="testimonials-about">
          <div className="testimonials-about__divider" aria-hidden="true" />
          <SectionLabel>About</SectionLabel>
          <div className="testimonials-about__body">
            <h3>Quiet interiors for considered living.</h3>
            <p>
              Crescent Design is an interior architecture studio shaping homes, kitchens, baths, bedrooms, and commercial
              spaces through proportion, material restraint, and a clear project process.
            </p>
          </div>
          <ConsultationButton className="button-primary testimonials-about__cta">
            <LinkArrow>Start a Project</LinkArrow>
          </ConsultationButton>
        </div>
      </section>

      <Reveal as="footer" className="minimal-footer" rootMargin="0px" threshold={0.01}>
        <div className="minimal-footer__inner">
          <div className="minimal-footer__main">
            <div className="minimal-footer__group minimal-footer__group--brand">
              <BrandLogo className="minimal-footer__brand" />
              <p className="minimal-footer__brand-copy">
                Crescent Design creates quiet interiors shaped by light, material restraint, and considered living.
              </p>
            </div>

            <nav aria-label="Footer navigation" className="minimal-footer__group minimal-footer__nav">
              <p className="minimal-footer__heading">Explore</p>
              <Link href="#portfolio">Portfolio</Link>
              <Link href="#services">Services</Link>
              <Link href="#process">Process</Link>
            </nav>

            <div className="minimal-footer__group minimal-footer__social" aria-label="Social links">
              <p className="minimal-footer__heading">Social</p>
              <div className="minimal-footer__social-list">
                <a
                  href="https://www.instagram.com/crescentdesign.in?igsh=MTZmaWI4eGszajdneA%3D%3D&utm_source=qr"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramIcon />
                  <span>Instagram</span>
                </a>
                <span
                  className="minimal-footer__social-placeholder"
                  role="link"
                  aria-label="X link coming soon"
                  aria-disabled="true"
                >
                  <XIcon />
                  <span>X</span>
                </span>
                <span
                  className="minimal-footer__social-placeholder"
                  role="link"
                  aria-label="YouTube link coming soon"
                  aria-disabled="true"
                >
                  <YouTubeIcon />
                  <span>YouTube</span>
                </span>
              </div>
            </div>

            <div className="minimal-footer__group minimal-footer__contact">
              <p className="minimal-footer__heading">Inquiries</p>
              <ConsultationButton className="button-primary minimal-footer__cta">
                <LinkArrow>Start a Project</LinkArrow>
              </ConsultationButton>
              <a href="mailto:hello@crescentdesign.in" className="minimal-footer__email">
                hello@crescentdesign.in
              </a>
            </div>

            <div className="minimal-footer__section-divider" aria-hidden="true" />
          </div>

          <div className="minimal-footer__bottom">
            <p className="minimal-footer__credit">Designed by Hassan Usmani • © 2026 All Rights Reserved</p>
          </div>
        </div>
      </Reveal>
    </>
  );
}
