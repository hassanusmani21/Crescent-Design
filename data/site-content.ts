export type Project = {
  id: string;
  title: string;
  location: string;
  year: string;
  category: string;
  scope: string;
  image: string;
  alt: string;
  summary: string;
  note: string;
};

export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  image: string;
  alt: string;
};

export type ProcessStage = {
  number: string;
  title: string;
  description: string;
};

export type MaterialStory = {
  title: string;
  caption: string;
  image: string;
  alt: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  project: string;
  location: string;
};

export type JournalEntry = {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  alt: string;
};

export const featuredProjects: Project[] = [
  {
    id: "marble-city-residence",
    title: "Marble City Residence",
    location: "City-view apartment",
    year: "2024",
    category: "Private residence",
    scope: "Living, dining, lighting, styling",
    image: "/interiors/living-room-marble-lounge.jpg",
    alt: "Warm marble living room with city windows, sculptural seating, and layered ambient lighting.",
    summary:
      "A high-rise interior shaped around marble surfaces, softened edges, and a restrained palette that lets daylight carry the atmosphere.",
    note: "Material restraint, integrated lighting, and furniture curation.",
  },
  {
    id: "walnut-gallery-kitchen",
    title: "Walnut Gallery Kitchen",
    location: "Family home",
    year: "2024",
    category: "Kitchen architecture",
    scope: "Cabinetry, display storage, finishes",
    image: "/interiors/kitchen-warm-wood.jpg",
    alt: "Warm wood kitchen with integrated storage, display shelving, and calm lighting.",
    summary:
      "Storage, work surfaces, and display zones are resolved as one continuous composition, making the kitchen feel orderly and quietly tailored.",
    note: "Cabinet detailing and display-led joinery.",
  },
  {
    id: "noir-bath-suite",
    title: "Noir Bath Suite",
    location: "Compact urban residence",
    year: "2024",
    category: "Bathroom design",
    scope: "Surface selection, fixtures, lighting",
    image: "/interiors/bathroom-black-marble.jpg",
    alt: "Compact bathroom with black marble shower walls, pale stone surfaces, and brass fixtures.",
    summary:
      "Dark stone is balanced with bright porcelain and crisp detailing so a small footprint still feels composed, luminous, and substantial.",
    note: "Contrast-led palette with precise fixture placement.",
  },
  {
    id: "tailored-suite",
    title: "Tailored Suite",
    location: "Hospitality-inspired bedroom",
    year: "2023",
    category: "Bedroom interior",
    scope: "Headboard wall, lighting, bed composition",
    image: "/interiors/bedroom-soft-suite.jpg",
    alt: "Soft bedroom with upholstered headboard, warm lighting, and layered neutral bedding.",
    summary:
      "The room is intentionally pared back so texture, warm lighting, and built-in detailing deliver comfort without visual excess.",
    note: "A calm sleeping space with hotel-level finish control.",
  },
  {
    id: "blue-banquette-hall",
    title: "Blue Banquette Hall",
    location: "Community dining room",
    year: "2023",
    category: "Commercial interior",
    scope: "Space planning, seating, finishes",
    image: "/interiors/commercial-dining-hall.jpg",
    alt: "Commercial dining hall with blue banquette seating, patterned flooring, and geometric ceiling lights.",
    summary:
      "A brighter hospitality room organized around rhythm, durability, and generous circulation while keeping the palette clean and memorable.",
    note: "Hospitality zoning with graphic flooring and banquette seating.",
  },
];

export const services: Service[] = [
  {
    id: "interior-design",
    number: "01",
    title: "Interior Design",
    description:
      "Complete design direction for homes and selected commercial rooms, resolving layout, material, lighting, and spatial atmosphere.",
    deliverables: ["Space planning", "Material palettes", "Lighting direction"],
    image: "/interiors/living-room-city-marble.jpg",
    alt: "Refined residential living room with marble and city views.",
  },
  {
    id: "styling-furnishing",
    number: "02",
    title: "Styling & Furnishing",
    description:
      "Furniture, textiles, art, and accessories edited into a finished room that feels layered, calm, and intentional.",
    deliverables: ["Furniture curation", "Textile direction", "Final styling"],
    image: "/interiors/bedroom-blue-headboard.jpg",
    alt: "Bedroom with tailored textiles, blue upholstered headboard, and warm bedside lighting.",
  },
  {
    id: "renovation-execution",
    number: "03",
    title: "Renovation & Execution",
    description:
      "Measured upgrades, vendor coordination, and site decisions that keep the design intent clear through installation.",
    deliverables: ["Layout revisions", "Execution detailing", "Vendor coordination"],
    image: "/interiors/kitchen-aqua-modern.jpg",
    alt: "Renovated kitchen with modern cabinetry, lighting, and a clean palette.",
  },
  {
    id: "consultation",
    number: "04",
    title: "Consultation",
    description:
      "Focused guidance for clients who need a clear brief, sharper priorities, or a second set of eyes before a wider scope.",
    deliverables: ["Design review", "Material advice", "Scope clarity"],
    image: "/interiors/bathroom-gold-vanity.jpg",
    alt: "Bathroom vanity with soft stone surfaces and warm metallic accents.",
  },
];

export const processStages: ProcessStage[] = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the client, the way the space will be lived in, and the constraints that matter.",
  },
  {
    number: "02",
    title: "Define",
    description: "Set the spatial logic, design direction, material mood, and the decisions the project needs next.",
  },
  {
    number: "03",
    title: "Develop",
    description: "Refine joinery, finishes, lighting, furniture, and the detailing that gives the project its character.",
  },
  {
    number: "04",
    title: "Deliver",
    description: "Coordinate drawings, vendors, timelines, and site realities so the project moves with clarity.",
  },
  {
    number: "05",
    title: "Complete",
    description: "Review, style, and tune the final space until it feels resolved rather than simply finished.",
  },
];

export const materialStories: MaterialStory[] = [
  {
    title: "Stone and reflection",
    caption: "Marble surfaces used to anchor living spaces with quiet depth.",
    image: "/interiors/hero.png",
    alt: "Marble-lined living room with reflective surfaces and layered lighting.",
  },
  {
    title: "Warm joinery",
    caption: "Storage and display designed as one calm architectural surface.",
    image: "/interiors/kitchen-walnut-gallery.jpg",
    alt: "Warm wood and glass kitchen joinery with display shelves and integrated lighting.",
  },
  {
    title: "Soft light",
    caption: "Headboard walls and concealed lighting that make bedrooms feel settled.",
    image: "/interiors/bedroom-soft-suite.jpg",
    alt: "Soft bedroom composition with warm backlighting and layered textiles.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Every decision felt considered. The final home is calm, functional, and more personal than we knew how to describe at the start.",
    name: "Private client",
    project: "Marble City Residence",
    location: "City-view apartment",
  },
  {
    quote:
      "The studio brought structure to every conversation, which made the design process easier for our family and much clearer on site.",
    name: "Homeowner",
    project: "Walnut Gallery Kitchen",
    location: "Family home",
  },
  {
    quote:
      "The finished space feels polished without being showy. Guests notice the atmosphere first, which is exactly what we wanted.",
    name: "Hospitality client",
    project: "Blue Banquette Hall",
    location: "Community dining room",
  },
];

export const journalEntries: JournalEntry[] = [
  {
    title: "Choosing materials that age beautifully",
    category: "Materials",
    date: "May 2026",
    excerpt: "Why stone, timber, and restrained metal finishes keep a room feeling intentional over time.",
    image: "/interiors/bathroom-gold-vanity.jpg",
    alt: "Bathroom detail with stone, warm metallic fixtures, and refined joinery.",
  },
  {
    title: "Designing with natural light in mind",
    category: "Planning",
    date: "April 2026",
    excerpt: "How window orientation, soft surfaces, and fixture placement shape the mood of a room before styling begins.",
    image: "/interiors/hero-suite-city-view.jpg",
    alt: "Bright living room with city-facing windows and layered natural light.",
  },
  {
    title: "Creating calm through spatial planning",
    category: "Process",
    date: "March 2026",
    excerpt: "A closer look at circulation, storage, and the invisible layout decisions that make interiors feel effortless.",
    image: "/interiors/kitchen-monochrome-suite.jpg",
    alt: "Architectural kitchen with long lines, integrated seating, and warm illumination.",
  },
];
