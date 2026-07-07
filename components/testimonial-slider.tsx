"use client";

import { useMemo, useState } from "react";
import { testimonials } from "@/data/site-content";

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [transitionMode, setTransitionMode] = useState<"reveal" | "fade">("reveal");
  const testimonial = testimonials[index];

  const progressLabel = useMemo(
    () => `${String(index + 1).padStart(2, "0")} / ${String(testimonials.length).padStart(2, "0")}`,
    [index],
  );

  function goTo(nextIndex: number) {
    setTransitionMode("fade");

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
    <div className="testimonial-editorial" aria-live="polite">
      <div
        className={`testimonial-editorial__left testimonial-editorial__left--${transitionMode}`}
        key={`meta-${testimonial.name}`}
      >
        <div className="testimonial-editorial__client">
          <p className="section-label testimonial-editorial__label">Testimonials</p>
          <h3 className="testimonial-editorial__client-name">{testimonial.name}</h3>
          <p className="testimonial-editorial__client-meta">
            {testimonial.project} <span aria-hidden="true">&bull;</span> {testimonial.location}
          </p>
        </div>

        <div className="testimonial-editorial__nav" aria-label="Testimonial navigation">
          <button type="button" onClick={() => goTo(index - 1)} aria-label="Previous testimonial">
            <span aria-hidden="true">&larr;</span>
          </button>
          <span>{progressLabel}</span>
          <button type="button" onClick={() => goTo(index + 1)} aria-label="Next testimonial">
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>

      <div
        className={`testimonial-editorial__right testimonial-editorial__right--${transitionMode}`}
        key={testimonial.name}
      >
        <blockquote className="testimonial-editorial__quote">{testimonial.quote}</blockquote>
      </div>
    </div>
  );
}
