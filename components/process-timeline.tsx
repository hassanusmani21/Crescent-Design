"use client";

import { useState } from "react";
import type { ProcessStage } from "@/data/site-content";
import styles from "./process-timeline.module.css";

function ProcessIcon({ title }: { title: string }) {
  const commonProps = {
    "aria-hidden": true,
    fill: "none",
    viewBox: "0 0 24 24",
  } as const;

  switch (title) {
    case "Discover":
      return (
        <svg {...commonProps}>
          <circle cx="10.5" cy="10.5" r="5.25" />
          <path d="M14.25 14.25L19 19" />
        </svg>
      );
    case "Define":
      return (
        <svg {...commonProps}>
          <path d="M4.5 5.5H19.5V18.5H4.5Z" />
          <path d="M9.5 5.5V18.5" />
          <path d="M14.5 5.5V18.5" />
          <path d="M4.5 10H19.5" />
          <path d="M4.5 14H19.5" />
          <path d="M6.75 7.75H8.25" />
          <path d="M15.75 16.25H17.25" />
        </svg>
      );
    case "Develop":
      return (
        <svg {...commonProps}>
          <path d="M5.25 8.5L12 5.25L18.75 8.5L12 11.75L5.25 8.5Z" />
          <path d="M5.25 8.5V15.5L12 18.75L18.75 15.5V8.5" />
          <path d="M12 11.75V18.75" />
          <path d="M8.25 13.5L15.75 10" />
        </svg>
      );
    case "Deliver":
      return (
        <svg {...commonProps}>
          <path d="M12 4.75L18.5 8.5V15.5L12 19.25L5.5 15.5V8.5L12 4.75Z" />
          <path d="M12 11.75L18.5 8.5" />
          <path d="M12 11.75V19.25" />
          <path d="M5.5 8.5L12 11.75" />
          <path d="M8.25 12.25L10.75 14.75L15.75 9.75" />
        </svg>
      );
    default:
      return null;
  }
}

function ProcessTimelineSegment({ active }: { active: boolean }) {
  return (
    <span className={`${styles.segment}${active ? ` ${styles.segmentActive}` : ""}`} aria-hidden="true">
      <span className={styles.segmentFill} />
    </span>
  );
}

export function ProcessTimeline({ stages }: { stages: ProcessStage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ol className={styles.journey} aria-label="Process timeline" onMouseLeave={() => setActiveIndex(0)}>
      {stages.map((stage, index) => {
        const isActive = index === activeIndex;
        const hasSegment = index < stages.length - 1;
        const isSegmentActive = index < activeIndex;

        return (
          <li key={stage.number} className={`${styles.step}${isActive ? ` ${styles.stepActive}` : ""}`}>
            {hasSegment ? <ProcessTimelineSegment active={isSegmentActive} /> : null}
            <button
              type="button"
              className={styles.button}
              aria-pressed={isActive}
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span className={styles.nodeWrap} aria-hidden="true">
                <span className={styles.node} />
              </span>
              <span className={styles.number}>{stage.number}</span>
              <span className={styles.icon}>
                <ProcessIcon title={stage.title} />
              </span>
              <span className={styles.title}>{stage.title}</span>
              <span className={styles.accent} aria-hidden="true" />
              <span className={styles.description}>{stage.description}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
