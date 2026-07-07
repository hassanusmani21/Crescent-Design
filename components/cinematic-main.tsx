"use client";

import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import type { ReactNode } from "react";
import { useEffect, useLayoutEffect, useRef } from "react";

type CinematicMainProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

const premiumEase = "power3.out";

export function CinematicMain({ children, className, id }: CinematicMainProps) {
  const scopeRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.35,
      easing: (time: number) => 1 - Math.pow(1 - time, 3),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.1,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  useLayoutEffect(() => {
    const scope = scopeRef.current;

    if (!scope || prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const cleanups: Array<() => void> = [];
    const context = gsap.context(() => {
      const hero = scope.querySelector<HTMLElement>(".hero");
      const heroBackground = scope.querySelector<HTMLElement>(".hero-background");
      const heroImage = scope.querySelector<HTMLElement>(".hero-image");
      const heroContent = scope.querySelector<HTMLElement>(".hero-content");
      const canUseHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

      if (hero && heroContent && heroImage) {
        if (heroBackground) {
          gsap.to(heroBackground, {
            y: -10,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        if (canUseHover) {
          const moveImageX = gsap.quickTo(heroImage, "x", { duration: 1.1, ease: premiumEase });
          const moveImageY = gsap.quickTo(heroImage, "y", { duration: 1.1, ease: premiumEase });

          const moveHero = (event: PointerEvent) => {
            const rect = hero.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            moveImageX(x * 22);
            moveImageY(y * 14);
            gsap.to(hero, {
              "--hero-glow-x": `${66 + x * 4}%`,
              "--hero-glow-y": `${28 + y * 4}%`,
              duration: 1.2,
              ease: premiumEase,
              overwrite: "auto",
            });
          };

          const resetHero = () => {
            moveImageX(0);
            moveImageY(0);
            gsap.to(hero, {
              "--hero-glow-x": "66%",
              "--hero-glow-y": "28%",
              duration: 1.2,
              ease: premiumEase,
              overwrite: "auto",
            });
          };

          hero.addEventListener("pointermove", moveHero);
          hero.addEventListener("pointerleave", resetHero);

          cleanups.push(() => {
            hero.removeEventListener("pointermove", moveHero);
            hero.removeEventListener("pointerleave", resetHero);
          });
        }
      }

      gsap.utils.toArray<HTMLElement>(".reveal, .minimal-service, .minimal-project").forEach((element, index) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.95,
            ease: premiumEase,
            delay: (index % 3) * 0.05,
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".cinematic-image").forEach((frameElement) => {
        const image = frameElement.querySelector("img");

        gsap.fromTo(
          frameElement,
          { clipPath: "inset(12% 0% 12% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.15,
            ease: premiumEase,
            scrollTrigger: {
              trigger: frameElement,
              start: "top 82%",
              once: true,
            },
          },
        );

        if (image) {
          gsap.to(image, {
            scale: 1.08,
            yPercent: -7,
            ease: "none",
            scrollTrigger: {
              trigger: frameElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
      });

      gsap.utils.toArray<HTMLElement>(".magnetic-target").forEach((element) => {
        const move = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          const x = event.clientX - (rect.left + rect.width / 2);
          const y = event.clientY - (rect.top + rect.height / 2);

          gsap.to(element, {
            x: x * 0.18,
            y: y * 0.18 - 2,
            scale: 1.018,
            duration: 0.38,
            ease: premiumEase,
          });
        };

        const reset = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: premiumEase,
          });
        };

        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", reset);

        cleanups.push(() => {
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", reset);
        });
      });
    }, scope);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, [prefersReducedMotion]);

  return (
    <motion.main
      ref={scopeRef}
      id={id}
      className={className}
      initial={false}
      animate={prefersReducedMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
