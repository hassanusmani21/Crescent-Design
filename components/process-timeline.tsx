"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const journeyRef = useRef<HTMLOListElement | null>(null);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const setActiveStep = useCallback((index: number) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const journey = journeyRef.current;

    if (!journey) {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    let frameId = 0;

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    const updateTimeline = () => {
      frameId = 0;

      if (!mediaQuery.matches) {
        journey.style.removeProperty("--timeline-top");
        journey.style.removeProperty("--timeline-height");
        journey.style.removeProperty("--timeline-progress");
        return;
      }

      const items = stepRefs.current.filter(Boolean) as HTMLLIElement[];

      if (items.length === 0) {
        return;
      }

      const journeyRect = journey.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const triggerY = viewportHeight * 0.38;
      const revealStartY = viewportHeight * 0.78;
      const centers = items.map((item) => {
        const node = item.querySelector(`.${styles.nodeWrap}`) ?? item;
        const rect = node.getBoundingClientRect();

        return rect.top + rect.height / 2 - journeyRect.top;
      });
      const firstCenter = centers[0] ?? 0;
      const lastCenter = centers[centers.length - 1] ?? firstCenter;
      const totalHeight = Math.max(0, lastCenter - firstCenter);
      let progress = 0;
      let nextActiveIndex = 0;

      items.forEach((item, index) => {
        if (index === 0) {
          return;
        }

        const itemTop = item.getBoundingClientRect().top;
        const segmentProgress = clamp((revealStartY - itemTop) / (revealStartY - triggerY), 0, 1);
        const segmentStart = centers[index - 1] - firstCenter;
        const segmentEnd = centers[index] - firstCenter;

        progress = Math.max(progress, segmentStart + (segmentEnd - segmentStart) * segmentProgress);

        if (itemTop <= triggerY) {
          nextActiveIndex = index;
        }
      });

      journey.style.setProperty("--timeline-top", `${firstCenter}px`);
      journey.style.setProperty("--timeline-height", `${totalHeight}px`);
      journey.style.setProperty("--timeline-progress", `${clamp(progress, 0, totalHeight)}px`);

      if (nextActiveIndex !== activeIndexRef.current) {
        setActiveStep(nextActiveIndex);
      }
    };

    const scheduleUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateTimeline);
    };

    scheduleUpdate();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    mediaQuery.addEventListener("change", scheduleUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      mediaQuery.removeEventListener("change", scheduleUpdate);
    };
  }, [setActiveStep, stages.length]);

  return (
    <ol className={styles.journey} ref={journeyRef} aria-label="Process timeline" onMouseLeave={() => setActiveStep(0)}>
      {stages.map((stage, index) => {
        const isActive = index === activeIndex;
        const isComplete = index <= activeIndex;
        const hasSegment = index < stages.length - 1;
        const isSegmentActive = index < activeIndex;

        return (
          <li
            key={stage.number}
            ref={(element) => {
              stepRefs.current[index] = element;
            }}
            className={`${styles.step}${isComplete ? ` ${styles.stepComplete}` : ""}${
              isActive ? ` ${styles.stepActive}` : ""
            }`}
          >
            {hasSegment ? <ProcessTimelineSegment active={isSegmentActive} /> : null}
            <button
              type="button"
              className={styles.button}
              aria-pressed={isActive}
              onClick={() => setActiveStep(index)}
              onFocus={() => setActiveStep(index)}
              onMouseEnter={() => setActiveStep(index)}
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
