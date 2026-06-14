import Image from "next/image";
import Link from "next/link";
import { ConsultationButton } from "@/components/consultation-button";
import { LinkArrow } from "@/components/link-arrow";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { ServicesShowcase } from "@/components/services-showcase";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { featuredProjects, journalEntries, materialStories, processStages } from "@/data/site-content";

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <Reveal className="section-header grid gap-6 lg:grid-cols-[minmax(0,0.68fr)_minmax(18rem,0.32fr)] lg:items-end">
      <div>
        <SectionLabel>{eyebrow}</SectionLabel>
        <h2 className="section-heading mt-4 max-w-[14ch]">{title}</h2>
      </div>
      <p className="section-copy max-w-[34rem] lg:justify-self-end">{text}</p>
    </Reveal>
  );
}

function ProjectMeta({
  location,
  year,
  category,
  scope,
}: {
  location: string;
  year: string;
  category: string;
  scope: string;
}) {
  return (
    <dl className="grid gap-4 text-sm text-[var(--text-secondary)] sm:grid-cols-2 xl:grid-cols-4">
      <div>
        <dt className="section-label">Location</dt>
        <dd className="mt-2">{location}</dd>
      </div>
      <div>
        <dt className="section-label">Year</dt>
        <dd className="mt-2">{year}</dd>
      </div>
      <div>
        <dt className="section-label">Category</dt>
        <dd className="mt-2">{category}</dd>
      </div>
      <div>
        <dt className="section-label">Scope</dt>
        <dd className="mt-2">{scope}</dd>
      </div>
    </dl>
  );
}

export function FeaturedProjects() {
  const [leadProject, secondProject, thirdProject, fourthProject, finalProject] = featuredProjects;

  return (
    <>
      <section id="projects" className="selected-work section-shell section-shell--tight" aria-labelledby="projects-title">
        <SectionHeader
          eyebrow="Selected Work"
          title="Interiors shaped by purpose, material, and character."
          text="A curated selection of residential and commercial rooms where proportion, material warmth, and practical flow are resolved together."
        />

        <Reveal as="article" className="project-card mt-12" delay={60}>
          <div className="project-frame aspect-[16/10]">
            <Image
              src={leadProject.image}
              alt={leadProject.alt}
              fill
              priority={false}
              sizes="(max-width: 1279px) 100vw, 88vw"
              className="project-image object-cover object-center"
            />
            <div className="project-overlay" />
          </div>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] xl:items-end">
            <div>
              <p className="section-label">{leadProject.category}</p>
              <h3 id="projects-title" className="project-card__title mt-4 max-w-[12ch] font-display text-[clamp(2.4rem,4vw,4.9rem)] leading-[0.96] tracking-[-0.04em] text-[var(--text-primary)]">
                {leadProject.title}
              </h3>
              <p className="body-large mt-5 max-w-[38rem]">
                {leadProject.summary}
              </p>
            </div>
            <div className="space-y-6">
              <ProjectMeta
                location={leadProject.location}
                year={leadProject.year}
                category={leadProject.category}
                scope={leadProject.scope}
              />
              <Link href="#contact" className="interactive-link project-link text-[var(--text-primary)]">
                <LinkArrow>Discuss this project</LinkArrow>
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 xl:grid-cols-[minmax(0,0.53fr)_minmax(0,0.47fr)]">
          {[secondProject, thirdProject].map((project, index) => (
            <Reveal
              key={project.id}
              as="article"
              className={`project-card ${index === 1 ? "xl:pt-16" : ""}`}
              delay={120 + index * 90}
            >
              <div className={`project-frame ${index === 0 ? "aspect-[4/5]" : "aspect-[5/4]"}`}>
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 1279px) 100vw, 44vw"
                  className="project-image object-cover"
                />
                <div className="project-overlay" />
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <p className="section-label">{project.category}</p>
                  <h3 className="project-card__title project-heading mt-4 max-w-[12ch] text-[var(--text-primary)]">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-[34rem] text-base leading-8 text-[var(--text-secondary)]">{project.summary}</p>
                  <Link href="#contact" className="interactive-link project-link mt-5 text-[var(--text-primary)]">
                    <LinkArrow>View Project</LinkArrow>
                  </Link>
                </div>
                <p className="pt-1 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">{project.year}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          as="article"
          className="project-card divider-reveal mt-14 grid gap-8 border-t border-[var(--border-subtle)] pt-10 xl:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] xl:items-center"
          delay={120}
        >
          <div className="space-y-5">
            <p className="section-label">{fourthProject.category}</p>
            <h3 className="project-card__title max-w-[12ch] font-display text-[clamp(2.3rem,3.4vw,4.2rem)] leading-[0.96] tracking-[-0.03em] text-[var(--text-primary)]">
              {fourthProject.title}
            </h3>
            <p className="max-w-[32rem] text-base leading-8 text-[var(--text-secondary)]">{fourthProject.summary}</p>
            <p className="text-sm text-[var(--text-muted)]">{fourthProject.note}</p>
            <ProjectMeta
              location={fourthProject.location}
              year={fourthProject.year}
              category={fourthProject.category}
              scope={fourthProject.scope}
            />
            <Link href="#contact" className="interactive-link project-link text-[var(--text-primary)]">
              <LinkArrow>View Project</LinkArrow>
            </Link>
          </div>
          <div className="project-frame aspect-[5/3]">
            <Image
              src={fourthProject.image}
              alt={fourthProject.alt}
              fill
              sizes="(max-width: 1279px) 100vw, 56vw"
              className="project-image object-cover"
            />
            <div className="project-overlay" />
          </div>
        </Reveal>

        <Reveal
          as="article"
          className="project-card mt-14 relative overflow-hidden rounded-[18px] bg-[var(--inverse-surface)] text-[var(--inverse-text)]"
          delay={160}
        >
          <div className="absolute inset-0">
            <Image
              src={finalProject.image}
              alt={finalProject.alt}
              fill
              sizes="100vw"
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,14,12,0.85),rgba(15,14,12,0.4)_55%,rgba(15,14,12,0.7))]" />
          </div>
          <div className="relative grid gap-8 px-6 py-14 sm:px-8 lg:px-10 xl:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)] xl:items-end">
            <div>
              <p className="section-label text-[var(--inverse-text-muted)]">{finalProject.category}</p>
              <h3 className="project-card__title mt-4 max-w-[11ch] font-display text-[clamp(2.8rem,4.4vw,5.5rem)] leading-[0.92] tracking-[-0.04em] text-[var(--inverse-text)]">
                {finalProject.title}
              </h3>
              <p className="mt-5 max-w-[36rem] text-base leading-8 text-[var(--inverse-text-soft)]">{finalProject.summary}</p>
            </div>
            <div className="space-y-6">
              <div className="text-[var(--inverse-text-soft)]">
                <ProjectMeta
                  location={finalProject.location}
                  year={finalProject.year}
                  category={finalProject.category}
                  scope={finalProject.scope}
                />
              </div>
              <Link href="#contact" className="interactive-link project-link text-[var(--inverse-text)]">
                <LinkArrow>Start a similar brief</LinkArrow>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="about" className="bg-[var(--inverse-surface)] text-[var(--inverse-text)]" aria-labelledby="about-title">
        <div className="section-shell">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] xl:items-center">
            <div>
              <SectionLabel>Our Studio</SectionLabel>
              <h2 id="about-title" className="display-title mt-4 max-w-[12ch] text-[var(--inverse-text)]">
                Designing meaningful spaces with clarity and character.
              </h2>
              <p className="mt-6 max-w-[37rem] text-[clamp(1rem,1.2vw,1.15rem)] leading-8 text-[var(--inverse-text-soft)]">
                We approach every project as a dialogue between people, place, and material. The result is an interior that feels composed, deeply personal, and effortless to live with over time.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {[
                ["01", "Homes and signature rooms"],
                ["02", "Joinery, lighting, and finish direction"],
                ["03", "Residential and commercial interiors"],
              ].map(([value, label]) => (
                <div key={value} className="border-t border-[var(--inverse-border)] pt-5">
                  <p className="font-display text-[clamp(2.6rem,4vw,4rem)] leading-none text-[var(--inverse-text)]">{value}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--inverse-text-muted)]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 xl:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)] xl:items-center">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[0.45rem] bg-[var(--inverse-surface-soft)]">
              <Image
                src="/interiors/hero-suite-city-view.jpg"
                alt="Interior studio living space with city view, warm lighting, and marble surfaces."
                fill
                sizes="(max-width: 1279px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <div className="grid gap-5 text-sm leading-7 text-[var(--inverse-text-soft)]">
              <p>
                The studio works best when architecture, furniture, and material decisions are resolved together. That makes even compact rooms feel intentional and complete.
              </p>
              <p>
                Projects are developed through proportion, natural light, cabinetry detail, and the softer layers that make a finished space feel lived in rather than staged.
              </p>
              <ConsultationButton className="button-secondary mt-2 w-fit border-[var(--inverse-border)] bg-[var(--inverse-surface-soft)] text-[var(--inverse-text)] hover:bg-[rgba(242,237,229,0.14)]">
                <LinkArrow>Begin a conversation</LinkArrow>
              </ConsultationButton>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section-shell" aria-labelledby="services-title">
        <SectionHeader
          eyebrow="Services"
          title="Design support from first layout to final layer."
          text="Support is tailored to the scope at hand, from room-specific direction to full-home planning, execution coordination, and final styling."
        />
        <h2 id="services-title" className="sr-only">
          Services
        </h2>
        <ServicesShowcase />
      </section>

      <section className="bg-[var(--surface-secondary)]" aria-labelledby="process-title">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Process"
            title="A clear five-stage path from brief to resolved space."
            text="Every brief moves through a considered sequence so design decisions stay aligned with the way the finished space should feel and function."
          />
          <h2 id="process-title" className="sr-only">
            Process
          </h2>

          <div className="mt-12 grid gap-4 xl:grid-cols-5">
            {processStages.map((stage, index) => (
              <Reveal key={stage.number} as="article" className="process-card divider-reveal border-t border-[var(--border-primary)]" delay={index * 70}>
                <p className="section-label">{stage.number}</p>
                <h3 className="mt-6 font-display text-[2.2rem] leading-none text-[var(--text-primary)]">{stage.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{stage.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell" aria-labelledby="materials-title">
        <SectionHeader
          eyebrow="Material & Craft"
          title="Material, light, and detail give a space its character."
          text="A project comes alive through the tactile decisions that shape atmosphere, from stone and timber to joinery rhythm and concealed light."
        />
        <h2 id="materials-title" className="sr-only">
          Material and craft
        </h2>

        <div className="mt-12 grid gap-5 xl:grid-cols-3 xl:items-start">
          {materialStories.map((story, index) => (
            <Reveal key={story.title} as="figure" className="grid gap-4" delay={index * 80}>
              <div className={`project-frame ${index === 0 ? "aspect-[5/4]" : "aspect-[4/3]"}`}>
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  sizes="(max-width: 1279px) 100vw, 32vw"
                  className="project-image object-cover"
                />
                <div className="project-overlay" />
              </div>
              <figcaption className="mt-4 max-w-[26rem]">
                <p className="font-display text-[2rem] leading-none text-[var(--text-primary)]">{story.title}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{story.caption}</p>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[var(--surface-secondary)]" aria-labelledby="testimonials-title">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Testimonials"
            title="Client trust, told in their own words."
            text="Each project is developed through close collaboration, thoughtful pacing, and decisions that hold up beautifully once the room is lived in."
          />
          <h2 id="testimonials-title" className="sr-only">
            Testimonials
          </h2>
          <TestimonialSlider />
        </div>
      </section>

      <section id="journal" className="section-shell" aria-labelledby="journal-title">
        <SectionHeader
          eyebrow="Journal"
          title="Notes on materials, planning, and atmosphere."
          text="Short studio notes on the practical choices that quietly shape how a room feels, performs, and ages."
        />
        <h2 id="journal-title" className="sr-only">
          Journal
        </h2>

        <div className="mt-12 grid gap-6 xl:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)]">
          {journalEntries.map((entry, index) => (
            <Reveal
              key={entry.title}
              as="article"
              className={`project-card ${index === 0 ? "xl:row-span-2" : ""}`}
              delay={index * 80}
            >
              <div className={`project-frame ${index === 0 ? "aspect-[4/5]" : "aspect-[3/2]"}`}>
                <Image
                  src={entry.image}
                  alt={entry.alt}
                  fill
                  sizes="(max-width: 1279px) 100vw, 44vw"
                  className="project-image object-cover"
                />
                <div className="project-overlay" />
              </div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                <span>{entry.category}</span>
                <span className="h-px w-6 bg-[var(--border-primary)]" />
                <span>{entry.date}</span>
              </div>
              <h3 className="project-card__title max-w-[18ch] font-display text-[clamp(2rem,3vw,3.5rem)] leading-[0.98] tracking-[-0.03em] text-[var(--text-primary)]">
                {entry.title}
              </h3>
              <p className="max-w-[34rem] text-base leading-8 text-[var(--text-secondary)]">{entry.excerpt}</p>
              <Link href="#contact" className="interactive-link project-link text-[var(--text-primary)]">
                <LinkArrow>Read the studio note</LinkArrow>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" className="relative isolate overflow-hidden bg-[var(--inverse-surface)] text-[var(--inverse-text)]" aria-labelledby="contact-title">
        <div className="absolute inset-0">
          <Image
            src="/interiors/hero-cinematic-living.jpg"
            alt="Refined living room with marble detailing, warm concealed lighting, and a city-facing window."
            fill
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(17,16,14,0.88),rgba(17,16,14,0.42)_52%,rgba(17,16,14,0.84))]" />
        </div>

        <div className="section-shell relative">
          <div className="grid gap-10 xl:grid-cols-[minmax(0,0.68fr)_minmax(18rem,0.32fr)] xl:items-end">
            <div>
              <SectionLabel>Begin a Conversation</SectionLabel>
              <h2 id="contact-title" className="display-title mt-4 max-w-[11ch] text-[var(--inverse-text)]">
                Have a space in mind? Let&apos;s shape it together.
              </h2>
              <p className="mt-6 max-w-[36rem] text-[clamp(1rem,1.2vw,1.15rem)] leading-8 text-[var(--inverse-text-soft)]">
                Share your project, location, timeline, and the feeling you want the space to carry. We&apos;ll review the brief and map out the clearest next step with you.
              </p>
            </div>

            <div className="space-y-4 border-t border-[var(--inverse-border)] pt-6 text-sm leading-7 text-[var(--inverse-text-soft)] xl:border-none xl:pt-0">
              <p className="section-label text-[var(--inverse-text-muted)]">Studio focus</p>
              <p>Homes, kitchens, baths, bedrooms, commercial interiors, and execution-ready detailing.</p>
              <ConsultationButton className="button-primary mt-4">
                <LinkArrow>Start Your Project</LinkArrow>
              </ConsultationButton>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--inverse-surface)] px-[clamp(1.1rem,3vw,4.5rem)] pb-10 text-[var(--inverse-text)]">
        <div className="mx-auto max-w-[1520px] border-t border-[var(--inverse-border)] pt-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.48fr)_repeat(2,minmax(0,0.26fr))]">
            <div>
              <p className="font-display text-[clamp(3rem,6vw,6rem)] leading-[0.88] tracking-[-0.04em] text-[var(--inverse-text)]">
                Crescent Design
              </p>
              <p className="mt-4 max-w-[28rem] text-sm leading-7 text-[var(--inverse-text-muted)]">
                Luxury interiors for modern residential and commercial spaces, shaped through calm editorial restraint and lived-in practicality.
              </p>
            </div>

            <div>
              <p className="section-label text-[var(--inverse-text-muted)]">Navigation</p>
              <nav className="mt-4 grid gap-2 text-sm text-[var(--inverse-text-soft)]">
                <Link href="#projects" className="interactive-link w-fit">
                  Projects
                </Link>
                <Link href="#services" className="interactive-link w-fit">
                  Services
                </Link>
                <Link href="#about" className="interactive-link w-fit">
                  About
                </Link>
                <Link href="#journal" className="interactive-link w-fit">
                  Journal
                </Link>
              </nav>
            </div>

            <div>
              <p className="section-label text-[var(--inverse-text-muted)]">Enquiries</p>
              <div className="mt-4 grid gap-2 text-sm leading-7 text-[var(--inverse-text-soft)]">
                <p>Use the integrated consultation form for new briefs.</p>
                <p>Residential, hospitality, and commercial interior design.</p>
                <Link href="#contact" className="interactive-link w-fit">
                  Start a project
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-[var(--inverse-border)] pt-6 text-xs uppercase tracking-[0.16em] text-[rgba(242,237,229,0.4)] sm:flex-row sm:items-center sm:justify-between">
            <p>Crafted for calm, high-end interiors.</p>
            <p>© 2026 Crescent Design</p>
          </div>
        </div>
      </footer>
    </>
  );
}
