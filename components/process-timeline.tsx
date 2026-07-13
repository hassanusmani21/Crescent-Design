"use client";

import { useState } from "react";
import type { ProcessStage } from "@/data/site-content";

export function ProcessTimeline({ stages }: { stages: ProcessStage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="process-line">
      {stages.map((stage, index) => {
        const isActive = index === activeIndex;

        return (
          <article
            key={stage.number}
            className={`process-step${isActive ? " is-active" : ""}`}
            onFocus={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <button
              type="button"
              className="grid gap-3 text-left"
              aria-pressed={isActive}
              onClick={() => setActiveIndex(index)}
            >
              <span>{stage.number}</span>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
            </button>
          </article>
        );
      })}
    </div>
  );
}
