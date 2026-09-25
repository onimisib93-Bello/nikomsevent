import { media, type Media } from "./media";

/** Team roles. Add names and direct lines once Nikoms confirms them. */
export type TeamMember = { role: string; remit: string; image: Media; phone?: string; email?: string };

export const team: TeamMember[] = [
  { role: "Events desk", remit: "Dates, bookings, contracts and your run-of-show.", image: media.teamA },
  { role: "Technical team", remit: "Stage, lighting, sound and power on the night.", image: media.teamB },
  { role: "Hospitality", remit: "Bar, lounge and cocktail-hour service.", image: media.teamC },
  { role: "Facility & security", remit: "Parking, access, and keeping the hall ready.", image: media.teamD },
];

/**
 * SAMPLE REVIEWS for layout only. Replace with real, attributed guest
 * reviews before launch; `sample: true` renders a visible label.
 */
export const testimonials = [
  { quote: "Four hundred guests, one generator hum we never heard. The lights stayed on from the first dance to the last plate.", name: "Bride's family", event: "Wedding reception", sample: true },
  { quote: "We came for the size of the hall and stayed for the team. They ran our timeline better than we did.", name: "Church programme committee", event: "Thanksgiving service", sample: true },
  { quote: "Sound check at four, doors at seven, no drama. The technical crew knew the room.", name: "Show promoter", event: "Concert night", sample: true },
];

export const services = [
  { title: "Catering", body: "Bring your caterer or ask for our shortlist. The washing area keeps their work out of sight.", image: media.catering },
  { title: "Décor", body: "The hall's interior is finished, so décor budgets go to your colours, not covering walls.", image: media.court },
  { title: "Lighting & sound", body: "House rig and PA, run by a technician who knows the room.", image: media.lighting },
  { title: "Photo & video", body: "Room to move for crews, and a stage that photographs well.", image: media.photography },
  { title: "DJ & live band", body: "Power, stage and monitors for whoever keeps the floor full.", image: media.dj },
];

export const moments = [
  { title: "Saturday reception", guests: "600 guests", setup: "Banquet rounds", image: media.wedding },
  { title: "Gospel concert", guests: "1,000 standing", setup: "Full stage rig", image: media.concert },
  { title: "70th birthday", guests: "350 guests", setup: "Long tables", image: media.birthday },
  { title: "Tech meetup", guests: "450 seated", setup: "Theatre rows", image: media.corporate },
  { title: "Art & craft fair", guests: "800 visitors", setup: "Open floor stands", image: media.exhibition },
  { title: "Lounge after-party", guests: "80 guests", setup: "Bar & lounge", image: media.bar },
];
