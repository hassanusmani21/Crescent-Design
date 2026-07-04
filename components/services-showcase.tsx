type ServiceIconName =
  | "kitchen"
  | "wardrobe"
  | "crockery"
  | "space-saving"
  | "tv"
  | "ceiling"
  | "lighting"
  | "wall"
  | "bath"
  | "foyer";

type ServiceItem = {
  title: string;
  description: string;
  icon: ServiceIconName;
};

const serviceItems: ServiceItem[] = [
  {
    title: "Modular Kitchens",
    description: "Seamless storage, surfaces, and daily flow.",
    icon: "kitchen",
  },
  {
    title: "Wardrobes",
    description: "Tailored storage with precise internal planning.",
    icon: "wardrobe",
  },
  {
    title: "Display Units",
    description: "Refined display for dining and collected objects.",
    icon: "crockery",
  },
  {
    title: "Furniture",
    description: "Transforming pieces for compact, flexible rooms.",
    icon: "space-saving",
  },
  {
    title: "TV & Media Units",
    description: "Integrated media walls with concealed services.",
    icon: "tv",
  },
  {
    title: "Lighting Design",
    description: "Layered ambient, task, and accent lighting.",
    icon: "lighting",
  },
  {
    title: "False Ceilings",
    description: "Clean ceiling planes shaped around illumination.",
    icon: "ceiling",
  },
  {
    title: "Bathroom Design",
    description: "Polished wet areas with precise spatial detailing.",
    icon: "bath",
  },
  {
    title: "Wall Finishes",
    description: "Textured surfaces, panels, and quiet material depth.",
    icon: "wall",
  },
  {
    title: "Foyers",
    description: "A composed arrival with storage and focal detail.",
    icon: "foyer",
  },
];

function ServicesIcon({ icon }: { icon: ServiceIconName }) {
  return (
    <svg className="service-icon" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      {icon === "kitchen" && (
        <>
          <path d="M12 20h40v32H12z" />
          <path d="M18 20V12h28v8" />
          <path d="M22 28h20" />
          <path d="M22 36h20" />
          <path d="M32 20v32" />
        </>
      )}
      {icon === "wardrobe" && (
        <>
          <path d="M16 10h32v44H16z" />
          <path d="M32 10v44" />
          <path d="M25 31h2" />
          <path d="M37 31h2" />
          <path d="M21 16h22" />
        </>
      )}
      {icon === "crockery" && (
        <>
          <path d="M14 14h36v40H14z" />
          <path d="M20 22h24" />
          <path d="M20 38h24" />
          <path d="M24 30c0-4 4-6 8-6s8 2 8 6" />
          <path d="M25 46h14" />
        </>
      )}
      {icon === "space-saving" && (
        <>
          <path d="M12 18h40v28H12z" />
          <path d="M20 26h24v12H20z" />
          <path d="M20 46l-6 8" />
          <path d="M44 46l6 8" />
          <path d="M22 32h20" />
        </>
      )}
      {icon === "tv" && (
        <>
          <path d="M10 16h44v28H10z" />
          <path d="M24 52h16" />
          <path d="M32 44v8" />
          <path d="M18 24h28" />
          <path d="M18 32h18" />
        </>
      )}
      {icon === "ceiling" && (
        <>
          <path d="M12 14h40" />
          <path d="M18 22h28" />
          <path d="M24 30h16" />
          <path d="M32 30v14" />
          <path d="M24 50c3-4 13-4 16 0" />
        </>
      )}
      {icon === "lighting" && (
        <>
          <path d="M32 8v8" />
          <path d="M20 28c0-7 5-12 12-12s12 5 12 12c0 5-3 8-6 11H26c-3-3-6-6-6-11z" />
          <path d="M26 45h12" />
          <path d="M28 52h8" />
          <path d="M13 28h-5" />
          <path d="M56 28h-5" />
        </>
      )}
      {icon === "wall" && (
        <>
          <path d="M12 16h40v34H12z" />
          <path d="M12 28h40" />
          <path d="M12 40h40" />
          <path d="M25 16v12" />
          <path d="M39 28v12" />
          <path d="M25 40v10" />
        </>
      )}
      {icon === "bath" && (
        <>
          <path d="M14 34h40v6c0 7-6 12-13 12H27c-7 0-13-5-13-12z" />
          <path d="M22 34V18c0-4 3-7 7-7h2" />
          <path d="M31 16h10" />
          <path d="M22 52l-4 4" />
          <path d="M46 52l4 4" />
        </>
      )}
      {icon === "foyer" && (
        <>
          <path d="M18 12h28v40H18z" />
          <path d="M26 52V22h20" />
          <path d="M38 33h2" />
          <path d="M12 52h40" />
          <path d="M22 18h18" />
        </>
      )}
    </svg>
  );
}

export function ServicesShowcase() {
  return (
    <div className="services-editorial" aria-label="Interior services">
      {serviceItems.map((service) => (
        <article key={service.title} className="service-offering minimal-service">
          <ServicesIcon icon={service.icon} />
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </article>
      ))}
    </div>
  );
}
