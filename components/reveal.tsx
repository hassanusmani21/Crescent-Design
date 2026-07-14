"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type RevealTag = "div" | "section" | "article" | "figure" | "footer";

type RevealProps = {
  as?: RevealTag;
  children: ReactNode;
  className?: string;
  delay?: number;
  rootMargin?: string;
  threshold?: number;
};

export function Reveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.18,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const setElement = (element: HTMLElement | null) => {
    ref.current = element;
  };
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const element = ref.current;

    if (!element || visible) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, threshold, visible]);

  return (
    <Tag
      ref={setElement}
      className={["reveal", visible ? "is-visible" : "", className ?? ""].join(" ").trim()}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
