"use client";

import Image from "next/image";
import { useState } from "react";
import { ConsultationButton } from "@/components/consultation-button";
import { services } from "@/data/site-content";
import { LinkArrow } from "@/components/link-arrow";

export function ServicesShowcase() {
  const [activeId, setActiveId] = useState(services[0]?.id ?? "");
  const activeService = services.find((service) => service.id === activeId) ?? services[0];

  return (
    <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,0.42fr)_minmax(0,0.28fr)_minmax(18rem,0.3fr)] xl:items-start">
      <div className="border-t border-[var(--border-subtle)]">
        {services.map((service) => {
          const isActive = service.id === activeService.id;

          return (
            <article
              key={service.id}
              className={`border-b border-[var(--border-subtle)] py-4 transition duration-300 ease-[var(--ease-premium)] ${
                isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
              }`}
              onMouseEnter={() => setActiveId(service.id)}
            >
              <button
                type="button"
                className="flex w-full flex-col gap-3 text-left md:flex-row md:items-start md:justify-between"
                onFocus={() => setActiveId(service.id)}
                onClick={() => setActiveId(service.id)}
                aria-pressed={isActive}
              >
                <span className="flex items-start gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    {service.number}
                  </span>
                  <span>
                    <span className="block font-display text-[clamp(1.8rem,2vw,2.8rem)] leading-[0.98]">
                      {service.title}
                    </span>
                    <span className="mt-2 block max-w-[38rem] text-sm leading-7 text-[var(--text-secondary)] md:hidden">
                      {service.description}
                    </span>
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`mt-1 text-sm transition duration-300 ease-[var(--ease-premium)] ${
                    isActive ? "translate-x-0 text-[var(--accent-primary)] opacity-100" : "-translate-x-2 opacity-0 md:opacity-50"
                  }`}
                >
                  Explore
                </span>
              </button>

              <div className="grid overflow-hidden xl:hidden">
                <div
                  className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-[var(--ease-premium)] ${
                    isActive ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[38rem] text-sm leading-7 text-[var(--text-secondary)]">{service.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
                      {service.deliverables.map((item) => (
                        <li key={item} className="rounded-full border border-[var(--border-primary)] px-3 py-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="project-frame mt-5 aspect-[4/3]">
                      <Image
                        src={service.image}
                        alt={service.alt}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                      <div className="project-overlay" />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="hidden xl:block">
        <p className="max-w-[28rem] text-base leading-8 text-[var(--text-secondary)]">{activeService.description}</p>
        <ul className="mt-6 grid gap-3 text-sm leading-7 text-[var(--text-primary)]">
          {activeService.deliverables.map((item) => (
            <li key={item} className="border-b border-[var(--border-subtle)] pb-3">
              {item}
            </li>
          ))}
        </ul>
        <ConsultationButton type="button" className="button-ghost mt-8 w-fit">
          <LinkArrow>Start with this service</LinkArrow>
        </ConsultationButton>
      </div>

      <div className="project-frame hidden min-h-[32rem] xl:block">
        <Image
          key={activeService.id}
          src={activeService.image}
          alt={activeService.alt}
          fill
          sizes="(max-width: 1279px) 100vw, 28vw"
          className="object-cover transition duration-700 ease-[var(--ease-premium)]"
        />
        <div className="project-overlay" />
      </div>
    </div>
  );
}
