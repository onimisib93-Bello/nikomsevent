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
export type Testimonial = { quote: string; name: string; when: string };

/**
 * Reviews shown under the Google rating. Paste chosen reviews from the Google
 * listing here exactly as written, with the reviewer's name as Google shows it.
 * The section shows only the rating and the link while this is empty.
 */
export const testimonials: Testimonial[] = [];

export const services = [
  { title: "Catering", body: "Bring your caterer or ask for our shortlist. The washing area keeps their work out of sight.", image: media.catering },
  { title: "Décor", body: "The hall's interior is finished, so décor budgets go to your colours, not covering walls.", image: media.court },
  { title: "Lighting & sound", body: "House rig and PA, run by a technician who knows the room.", image: media.lighting },
  { title: "Photo & video", body: "Room to move for crews, and a stage that photographs well.", image: media.photography },
  { title: "DJ & live band", body: "Power, stage and monitors for whoever keeps the floor full.", image: media.dj },
];

export const moments = [
  { title: "Birthday party", guests: "Kids' party", setup: "Balloon arches, turf floor", image: media.birthday },
  { title: "Wedding reception", guests: "Long tables", setup: "Purple and mint", image: media.wedding },
  { title: "Sunday service", guests: "Harvesters Yaba", setup: "Theatre rows", image: media.church },
  { title: "Dinner reception", guests: "Round tables", setup: "Fairy-light ceiling", image: media.tableSetting },
  { title: "The arrival", guests: "Entrance", setup: "Floral lattice arch", image: media.foyer },
  { title: "On the stage", guests: "House rig", setup: "Moving-head lights", image: media.stage },
];
