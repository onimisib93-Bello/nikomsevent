import { media, type Media } from "./media";

export type Occasion = { id: string; label: string; blurb: string; image: Media };

export const occasions: Occasion[] = [
  { id: "wedding", label: "Weddings", blurb: "Engagements, receptions and the after-party.", image: media.wedding },
  { id: "birthday", label: "Birthdays & anniversaries", blurb: "From a 1st birthday to a 70th.", image: media.birthday },
  { id: "concert", label: "Concerts & shows", blurb: "Stage, lights and sound in the house.", image: media.concert },
  { id: "corporate", label: "Conferences & launches", blurb: "Theatre seating, screens and a clean mic.", image: media.corporate },
  { id: "religious", label: "Church & religious", blurb: "Crusades, thanksgivings and conventions.", image: media.church },
  { id: "remembrance", label: "Remembrance services", blurb: "Quiet, dignified, and well organised.", image: media.remembrance },
  { id: "exhibition", label: "Exhibitions", blurb: "An open floor for stands and visitors.", image: media.exhibition },
];

export const marqueeWords = [
  "Weddings", "Owambe", "Birthdays", "Concerts", "Thanksgivings", "Conferences",
  "Exhibitions", "Graduations", "Product launches", "Remembrance services",
];
