export interface VenueHistory {
  established: string;
  acres: number;
  heading: string;
  subheading: string;
  paragraphs: string[];
  milestones: { year: string; event: string }[];
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  location: string;
  blurb: string;
  website: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "Ceremony" | "Reception" | "Estate" | "Details";
  orientation: "portrait" | "landscape";
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const venueHistory: VenueHistory = {
  established: "1924",
  acres: 220,
  heading: "A Century of Quiet Grandeur",
  subheading:
    "Nestled within rolling sage hills, Maison Verdant has hosted a hundred years of unhurried celebration.",
  paragraphs: [
    "Commissioned in 1924 as a private summer residence, the estate was conceived around a single principle: that beauty is best when it is unforced. Limestone drawn from the valley below was laid by hand, and the gardens were planted to mature slowly, over generations rather than seasons.",
    "Today the house remains largely as it was — its long galleries, its olive terrace, its reflecting pool — preserved not as a museum but as a living room for the most important days of our guests' lives.",
    "We host a deliberately limited number of weddings each year. Scarcity is not strategy here; it is reverence. Each celebration deserves the full and undivided attention of the estate.",
  ],
  milestones: [
    { year: "1924", event: "The estate is completed after seven years of construction." },
    { year: "1961", event: "The olive terrace and reflecting pool are added." },
    { year: "1998", event: "Restoration of the original limestone galleries." },
    { year: "2019", event: "The Verdant Conservatory opens for winter ceremonies." },
  ],
};

export const preferredVendors: Vendor[] = [
  {
    id: "v-01",
    name: "Atelier Mirelle",
    category: "Floral Design",
    location: "Sonoma, CA",
    blurb: "Seasonal, foraged arrangements composed in muted, painterly palettes.",
    website: "https://example.com/atelier-mirelle",
  },
  {
    id: "v-02",
    name: "Maison du Goût",
    category: "Catering",
    location: "Napa, CA",
    blurb: "Farm-to-table tasting menus drawn from the estate's own kitchen garden.",
    website: "https://example.com/maison-du-gout",
  },
  {
    id: "v-03",
    name: "Théo Lambert Studio",
    category: "Photography",
    location: "San Francisco, CA",
    blurb: "Editorial, film-forward storytelling with a restrained documentary eye.",
    website: "https://example.com/theo-lambert",
  },
  {
    id: "v-04",
    name: "Quartet Verdant",
    category: "Live Music",
    location: "Berkeley, CA",
    blurb: "Classical string ensembles and discreet evening jazz.",
    website: "https://example.com/quartet-verdant",
  },
  {
    id: "v-05",
    name: "Plume & Press",
    category: "Stationery",
    location: "Healdsburg, CA",
    blurb: "Hand-pressed letterpress suites on cotton and deckled-edge stock.",
    website: "https://example.com/plume-press",
  },
  {
    id: "v-06",
    name: "Lune Planning Co.",
    category: "Planning & Design",
    location: "Mill Valley, CA",
    blurb: "Full-service planning for couples who value calm over spectacle.",
    website: "https://example.com/lune-planning",
  },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "g-01",
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80",
    alt: "Ceremony arch framed by soft afternoon light",
    category: "Ceremony",
    orientation: "landscape",
  },
  {
    id: "g-02",
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80",
    alt: "Bride in flowing gown on a limestone staircase",
    category: "Details",
    orientation: "portrait",
  },
  {
    id: "g-03",
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80",
    alt: "Long reception table set beneath the olive terrace",
    category: "Reception",
    orientation: "landscape",
  },
  {
    id: "g-04",
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=80",
    alt: "Close detail of foraged floral centerpiece",
    category: "Details",
    orientation: "portrait",
  },
  {
    id: "g-05",
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=80",
    alt: "The estate facade at golden hour",
    category: "Estate",
    orientation: "landscape",
  },
  {
    id: "g-06",
    src: "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&w=1000&q=80",
    alt: "Reflecting pool bordered by sage and olive",
    category: "Estate",
    orientation: "portrait",
  },
  {
    id: "g-07",
    src: "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?auto=format&fit=crop&w=1400&q=80",
    alt: "Candlelit evening reception in the gallery",
    category: "Reception",
    orientation: "landscape",
  },
  {
    id: "g-08",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    alt: "Couple exchanging vows under the conservatory glass",
    category: "Ceremony",
    orientation: "portrait",
  },
];

export interface RealWedding {
  slug: string;
  couple: string;
  date: string;
  season: string;
  guestCount: number;
  location: string;
  heroImage: string;
  heroAlt: string;
  excerpt: string;
  narrative: string[];
  galleryImageIds: string[];
  vendors: { role: string; vendorId: string }[];
}

export const realWeddings: RealWedding[] = [
  {
    slug: "eleanor-and-james",
    couple: "Eleanor & James",
    date: "September 14, 2025",
    season: "Late Summer",
    guestCount: 140,
    location: "The Olive Terrace & Grand Ballroom",
    heroImage:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000&q=80",
    heroAlt: "Eleanor and James beneath the ceremony arch at golden hour",
    excerpt:
      "A late-summer celebration of foraged florals, candlelight, and a single long table beneath the olives.",
    narrative: [
      "Eleanor and James wanted nothing that announced itself. Their day began quietly on the limestone court, where 140 guests gathered beneath the century-old olive trees as the afternoon light turned to amber.",
      "Dinner unfolded along a single uninterrupted table on the terrace — a deliberate choice, they said, so that no one felt apart from anyone else. Foraged branches and ivory tapers ran its length, undressed and unhurried.",
      "As evening settled, the celebration moved indoors to the restored ballroom, where the 1924 chandeliers were lit for the first dance. It ended, as the best evenings do, far later than anyone intended.",
    ],
    galleryImageIds: ["g-01", "g-03", "g-07", "g-04"],
    vendors: [
      { role: "Floral Design", vendorId: "v-01" },
      { role: "Catering", vendorId: "v-02" },
      { role: "Photography", vendorId: "v-03" },
      { role: "Live Music", vendorId: "v-04" },
      { role: "Planning & Design", vendorId: "v-06" },
    ],
  },
  {
    slug: "marguerite-and-soren",
    couple: "Marguerite & Søren",
    date: "January 11, 2026",
    season: "Winter",
    guestCount: 80,
    location: "The Verdant Conservatory",
    heroImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80",
    heroAlt: "Marguerite and Søren exchanging vows beneath the conservatory glass",
    excerpt:
      "An intimate winter ceremony under glass, drawn in white, pale sage, and the bare architecture of the season.",
    narrative: [
      "For a January wedding, Marguerite and Søren chose the Conservatory — a room of glass and northern light that needs almost no adornment in winter.",
      "Eighty guests gathered close as the couple exchanged vows they had written that morning. The palette was restrained to white and the palest sage, letting the bare branches beyond the glass do the rest.",
      "A long lunch followed rather than a late dinner, ending with espresso and a slow walk through the dormant gardens — proof that a celebration need not be large to be complete.",
    ],
    galleryImageIds: ["g-08", "g-06", "g-02", "g-05"],
    vendors: [
      { role: "Floral Design", vendorId: "v-01" },
      { role: "Catering", vendorId: "v-02" },
      { role: "Photography", vendorId: "v-03" },
      { role: "Stationery", vendorId: "v-05" },
      { role: "Planning & Design", vendorId: "v-06" },
    ],
  },
];

export const faqItems: FAQItem[] = [
  {
    id: "f-01",
    question: "How many guests can the estate accommodate?",
    answer:
      "The estate comfortably hosts up to 180 guests for a seated dinner, and as many as 250 for a standing reception across the terrace and galleries.",
  },
  {
    id: "f-02",
    question: "Do you host more than one wedding per weekend?",
    answer:
      "Never. We host a single celebration per weekend so that the grounds, the staff, and the quiet are yours entirely.",
  },
  {
    id: "f-03",
    question: "Is on-site accommodation available?",
    answer:
      "The main house offers twelve suites for the couple and immediate family, with curated partner lodging available within a short drive.",
  },
  {
    id: "f-04",
    question: "May we use vendors outside your preferred list?",
    answer:
      "Of course. Our preferred vendors know the estate intimately, but we welcome outside partners subject to a brief approval and insurance review.",
  },
  {
    id: "f-05",
    question: "What is the typical investment for a wedding here?",
    answer:
      "Celebrations at Maison Verdant typically begin in the mid-five figures, inclusive of venue, core staffing, and the grounds for a full weekend.",
  },
  {
    id: "f-06",
    question: "How far in advance should we book?",
    answer:
      "Given our limited calendar, most couples reserve their date twelve to eighteen months ahead. We recommend booking a tour early in your planning.",
  },
];
