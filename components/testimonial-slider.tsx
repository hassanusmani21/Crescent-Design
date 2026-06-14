"use client";

import { useMemo, useState } from "react";
import { testimonials } from "@/data/site-content";

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];

  const progressLabel = useMemo(() => `${index + 1} / ${testimonials.length}`, [index]);

  function goTo(nextIndex: number) {
    if (nextIndex < 0) {
      setIndex(testimonials.length - 1);
      return;
    }

    if (nextIndex >= testimonials.length) {
      setIndex(0);
      return;
    }

    setIndex(nextIndex);
  }

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.74fr)_minmax(12rem,0.26fr)] lg:items-end">
      <div className="relative border-t border-[var(--border-subtle)] pt-8">
        <span aria-hidden="true" className="absolute left-0 top-6 font-display text-[4rem] leading-none text-[var(--accent-soft)]">
          &ldquo;
        </span>
        <blockquote className="max-w-[52rem] pl-10 font-display text-[clamp(2rem,3.3vw,4.8rem)] leading-[0.98] tracking-[-0.03em] text-[var(--text-primary)]">
          {testimonial.quote}
        </blockquote>
      </div>

      <div className="flex flex-col gap-8 lg:items-end">
        <div className="space-y-2 text-sm text-[var(--text-secondary)]">
          <p className="text-base font-semibold text-[var(--text-primary)]">{testimonial.name}</p>
          <p>{testimonial.project}</p>
          <p>{testimonial.location}</p>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" className="icon-button" onClick={() => goTo(index - 1)} aria-label="Previous testimonial">
            <span aria-hidden="true">&lt;</span>
          </button>
          <div className="min-w-14 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {progressLabel}
          </div>
          <button type="button" className="icon-button" onClick={() => goTo(index + 1)} aria-label="Next testimonial">
            <span aria-hidden="true">&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
