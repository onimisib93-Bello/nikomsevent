import { media, type Media } from "./media";

export type Space = {
  slug: string;
  name: string;
  kind: string;
  capacity: string;
  summary: string;
  description: string[];
  features: string[];
  fromPrice: number; // NGN, sample figure
  image: Media;
  gallery: Media[];
};

export const spaces: Space[] = [
  {
    slug: "main-hall",
    name: "The Main Hall",
    kind: "Hall",
    capacity: "700 seated, 1,000 standing",
    summary: "Air-conditioned, column-free, and dressed to your colours.",
    description: [
      "The heart of Nikoms. A single, air-conditioned room large enough for a full owambe, with interior décor already in place so your decorator starts from a finished room, not a bare shell.",
      "Seat it banquet-style for 700, set it theatre-style for a conference, or clear the floor for a concert crowd of 1,000.",
    ],
    features: ["Air conditioning throughout", "Built-in interior décor", "Backup power and water", "Direct access to stage and dressing rooms"],
    fromPrice: 1_800_000,
    image: media.hall,
    gallery: [media.hall, media.hero, media.wedding, media.corporate],
  },
  {
    slug: "stage",
    name: "Stage & Dance Floor",
    kind: "Stage",
    capacity: "Live band or 12-piece choir",
    summary: "A proper stage with house lighting and sound.",
    description: [
      "A raised, professional stage for live bands, choirs, speakers and performers, with a lighting rig and sound system the technical team runs on the night.",
      "The dance floor opens in front of it once dinner is cleared.",
    ],
    features: ["House lighting rig", "House PA and mics", "Technician on duty", "Side access from dressing rooms"],
    fromPrice: 450_000,
    image: media.stage,
    gallery: [media.stage, media.concert, media.lighting, media.dj],
  },
  {
    slug: "reception-foyer",
    name: "Reception Foyer",
    kind: "Foyer",
    capacity: "Up to 150 standing",
    summary: "For arrivals, photo walls, gift tables and small-chops.",
    description: [
      "Guests arrive here first. It suits a photo wall, a gift and registration table, and cocktail-hour small-chops before the doors to the hall open.",
    ],
    features: ["Photo wall space", "Registration desk", "Cocktail hour service"],
    fromPrice: 250_000,
    image: media.foyer,
    gallery: [media.foyer, media.court, media.catering],
  },
  {
    slug: "bar-lounge",
    name: "Bar & Lounge",
    kind: "Lounge",
    capacity: "Up to 80 guests",
    summary: "Nikoms' own bar for after-parties and smaller gatherings.",
    description: [
      "A stocked bar and lounge for after-parties, send-forths and smaller birthdays that don't need the full hall.",
    ],
    features: ["Stocked bar", "Lounge seating", "Music system"],
    fromPrice: 350_000,
    image: media.bar,
    gallery: [media.bar, media.birthday, media.lighting],
  },
  {
    slug: "dressing-rooms",
    name: "Dressing Rooms",
    kind: "Backstage",
    capacity: "Bridal party or performers",
    summary: "Private rooms to change between outfits and ceremonies.",
    description: [
      "Private rooms with mirrors and power for the bridal party's outfit changes, make-up touch-ups, or performers waiting to go on.",
    ],
    features: ["Mirrors and lighting", "Private access", "Close to the stage"],
    fromPrice: 100_000,
    image: media.dressing,
    gallery: [media.dressing, media.wedding],
  },
  {
    slug: "forecourt",
    name: "Forecourt & Parking",
    kind: "Outdoor",
    capacity: "Secured parking on site",
    summary: "Guarded parking and a washing area for caterers.",
    description: [
      "On-site parking watched by security, plus a separate washing area for caterers and service staff so the hall stays clear.",
    ],
    features: ["Secured parking", "Caterers' washing area", "Security personnel"],
    fromPrice: 0,
    image: media.court,
    gallery: [media.court, media.catering],
  },
];

export const getSpace = (slug: string) => spaces.find((s) => s.slug === slug);
