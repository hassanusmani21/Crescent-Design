"use client";

import { useEffect, useRef } from "react";

export function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spotlightElement = spotlightRef.current;
    const media = window.matchMedia("(any-hover: hover) and (any-pointer: fine) and (min-width: 768px)");

    if (!spotlightElement) {
      return;
    }

    const spotlight: HTMLDivElement = spotlightElement;
    let frame = 0;
    let active = false;
    let visible = false;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = currentX;
    let targetY = currentY;

    const render = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      spotlight.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      frame = window.requestAnimationFrame(render);
    };

    const enable = () => {
      if (active || !media.matches) {
        return;
      }

      active = true;
      frame = window.requestAnimationFrame(render);
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("pointerleave", handlePointerLeave);
      window.addEventListener("mouseleave", handlePointerLeave);
    };

    const disable = () => {
      active = false;
      visible = false;
      spotlight.style.opacity = "0";
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("mouseleave", handlePointerLeave);
    };

    const handleMediaChange = () => {
      if (media.matches) {
        enable();
      } else {
        disable();
      }
    };

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") {
        return;
      }

      moveTo(event.clientX, event.clientY);
    }

    function handleMouseMove(event: MouseEvent) {
      moveTo(event.clientX, event.clientY);
    }

    function moveTo(x: number, y: number) {
      targetX = x;
      targetY = y;

      if (!visible) {
        visible = true;
        spotlight.style.opacity = "1";
      }
    }

    function handlePointerLeave() {
      visible = false;
      spotlight.style.opacity = "0";
    }

    handleMediaChange();
    media.addEventListener("change", handleMediaChange);

    return () => {
      disable();
      media.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return <div ref={spotlightRef} className="cursor-spotlight" aria-hidden="true" />;
}
