"use client";

import Image from "next/image";
import { useState } from "react";
import { featuredProjects } from "@/data/site-content";

const portfolioProjects = [
  {
    ...featuredProjects[0],
    titleLines: ["Marble City", "Residence"],
    shortDescription: "Marble, soft edges, and controlled daylight.",
  },
  {
    ...featuredProjects[1],
    titleLines: ["Walnut Gallery", "Kitchen"],
    shortDescription: "Warm joinery resolved as one calm surface.",
  },
  {
    ...featuredProjects[2],
    title: "Noir Bath Retreat",
    titleLines: ["Noir Bath", "Retreat"],
    shortDescription: "Dark stone and precise light in a compact retreat.",
  },
  {
    ...featuredProjects[3],
    titleLines: ["Tailored", "Suite"],
    shortDescription: "Texture, warm light, and built-in detail.",
  },
  {
    ...featuredProjects[4],
    title: "Serene Residence",
    titleLines: ["Serene", "Residence"],
    location: "Mumbai residence",
    category: "Residential interior",
    image: "/interiors/hero-suite-city-view.jpg",
    alt: "Luxury living room with city views, sculptural seating, marble surfaces, and warm lighting.",
    shortDescription: "Proportion, comfort, and restrained detail.",
  },
];

export function PortfolioShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = portfolioProjects[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) => (current === 0 ? portfolioProjects.length - 1 : current - 1));
  };

  const showNext = () => {
    setActiveIndex((current) => (current === portfolioProjects.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="portfolio-showcase">
      <div className="portfolio-showcase__left">
        <div className="portfolio-showcase__text">
          <p className="section-label">Portfolio</p>
          <h2
            id="portfolio-title"
            className={`portfolio-showcase__title ${
              activeProject.title.length > 18 ? "portfolio-showcase__title--compact" : ""
            }`}
          >
            {activeProject.titleLines.map((line) => (
              <span key={line} className="portfolio-showcase__title-line">
                {line}
              </span>
            ))}
          </h2>
          <p className="portfolio-showcase__meta">
            {activeProject.category} · {activeProject.year}
          </p>
          <p className="portfolio-showcase__description">{activeProject.shortDescription}</p>
        </div>

        <div className="portfolio-project-list" aria-label="Portfolio projects">
          {portfolioProjects.map((project, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={project.id}
                type="button"
                className={`portfolio-project-list__item ${isActive ? "is-active" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                aria-current={isActive ? "true" : undefined}
                aria-pressed={isActive}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {project.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="portfolio-showcase__right">
        <div className="portfolio-image-stage">
          {portfolioProjects.map((project, index) => (
            <Image
              key={project.id}
              src={project.image}
              alt={project.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 767px) 100vw, 60vw"
              className={`portfolio-image-stage__image ${index === activeIndex ? "is-active" : ""}`}
            />
          ))}

          <div className="portfolio-gallery-controls" aria-label="Portfolio gallery controls">
            <button type="button" onClick={showPrevious} aria-label="Previous project">
              ←
            </button>
            <p aria-label={`Project ${activeIndex + 1} of ${portfolioProjects.length}`}>
              {String(activeIndex + 1).padStart(2, "0")} / {String(portfolioProjects.length).padStart(2, "0")}
            </p>
            <button type="button" onClick={showNext} aria-label="Next project">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
