/**
 * Every image on the site resolves through this file.
 *
 * `local` entries are Nikoms' own photos (from their Instagram and Google
 * listing) in /public/media. They are small social-media copies, so drop the
 * originals in at the same file names when the venue sends them.
 *
 * `u` entries are still Unsplash placeholders: there is no real photo yet for
 * the bar, concerts, conferences, the team or the journal. Set `heroVideo` to
 * a local .mp4 to replace the hero still with a looping video.
 */
export type Media = { src: string; alt: string };

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop`;
const local = (name: string) => `/media/${name}.jpg`;

export const heroVideo: string | null = null;

export const media = {
  hero: { src: local("birthday-party-hall"), alt: "The main hall dressed for a children's party: balloon arches, turf flooring and long tables under the draped ceiling" },
  hall: { src: local("service-main-hall"), alt: "The main hall under its draped white ceiling and chandeliers, seated for a Sunday service" },
  stage: { src: local("stage-lights"), alt: "Moving-head light and lighting tower beside the stage" },
  foyer: { src: local("entrance-arch"), alt: "White lattice arch with flowers at the hall entrance" },
  bar: { src: u("photo-1514362545857-3bc16c4c7d1b"), alt: "Cocktails lined up on the bar counter" },
  dressing: { src: local("dressing-room"), alt: "Private room with sofas, set apart from the main hall" },
  court: { src: local("exterior-parking"), alt: "The hall building and its paved forecourt and parking" },
  tableSetting: { src: local("dinner-table-setting"), alt: "Round table in green and orange under a ceiling of fairy lights" },
  sideRoom: { src: local("side-room"), alt: "Side room with banquet chairs and a prep counter with a sink" },

  wedding: { src: local("wedding-long-tables"), alt: "Long tables in purple and mint for a wedding reception under the draped ceiling" },
  birthday: { src: local("birthday-party-hall"), alt: "Balloon arches and long tables set for a birthday party in the main hall" },
  concert: { src: u("photo-1501281668745-f7f57925c3b4"), alt: "Crowd with hands raised in front of a lit stage" },
  corporate: { src: u("photo-1540575467063-178a50c2df87"), alt: "Audience seated for a conference talk" },
  church: { src: local("service-crowd"), alt: "A full Sunday service in the main hall, facing the stage and screens" },
  remembrance: { src: u("photo-1508610048659-a06b669e3321"), alt: "White flowers arranged for a memorial" },
  exhibition: { src: u("photo-1531058020387-3be344556be6"), alt: "Exhibition stands in an open hall" },

  catering: { src: u("photo-1555244162-803834f70033"), alt: "Buffet service laid out for guests" },
  lighting: { src: u("photo-1492684223066-81342ee5ff30"), alt: "Party lights over a dancing crowd" },
  photography: { src: u("photo-1452587925148-ce544e77e70d"), alt: "Camera ready to shoot an event" },
  dj: { src: u("photo-1571266028243-e4733b0f0bb0"), alt: "DJ at the decks" },

  teamA: { src: u("photo-1531123897727-8f129e1688ce"), alt: "Portrait of an event coordinator" },
  teamB: { src: u("photo-1507003211169-0a1dd7228f2d"), alt: "Portrait of the technical lead" },
  teamC: { src: u("photo-1494790108377-be9c29b29330"), alt: "Portrait of the hospitality lead" },
  teamD: { src: u("photo-1506794778202-cad84cf45f1d"), alt: "Portrait of the facility manager" },

  about: { src: u("photo-1519741497674-611481863552"), alt: "Couple sharing their first dance" },
  journalA: { src: u("photo-1465495976277-4387d4b0b4c6"), alt: "Wedding guests seated at a reception" },
  journalB: { src: u("photo-1523580494863-6f3031224c94"), alt: "Friends celebrating together" },
  journalC: { src: u("photo-1505236858219-8359eb29e329"), alt: "Event hall lit for the evening" },
  newsletter: { src: u("photo-1533174072545-7a4b6ad7a6c3"), alt: "Confetti falling over a celebration" },
} satisfies Record<string, Media>;
