/**
 * Every image on the site resolves through this file.
 *
 * All entries are placeholder photography from Unsplash. To use Nikoms'
 * own photos, drop them into /public/media and change `src` to the local
 * path, e.g. "/media/main-hall.jpg". Set `heroVideo` to a local .mp4 to
 * replace the hero still with a looping video.
 */
export type Media = { src: string; alt: string };

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop`;

export const heroVideo: string | null = null;

export const media = {
  hero: { src: u("photo-1519167758481-83f550bb49b3"), alt: "The main hall dressed for an evening reception, chandeliers lit" },
  hall: { src: u("photo-1464366400600-7168b8af9bc3"), alt: "Round banquet tables set for a large reception" },
  stage: { src: u("photo-1470229722913-7c0e2dbbafd3"), alt: "Stage washed in coloured light during a performance" },
  foyer: { src: u("photo-1478146896981-b80fe463b330"), alt: "Table setting with glassware and flowers" },
  bar: { src: u("photo-1514362545857-3bc16c4c7d1b"), alt: "Cocktails lined up on the bar counter" },
  dressing: { src: u("photo-1522335789203-aabd1fc54bc9"), alt: "Make-up laid out in a dressing room" },
  court: { src: u("photo-1519225421980-715cb0215aed"), alt: "Decorated entrance for arriving guests" },

  wedding: { src: u("photo-1511795409834-ef04bbd61622"), alt: "Wedding reception with warm string lights" },
  birthday: { src: u("photo-1530103862676-de8c9debad1d"), alt: "Balloons and cake at a birthday celebration" },
  concert: { src: u("photo-1501281668745-f7f57925c3b4"), alt: "Crowd with hands raised in front of a lit stage" },
  corporate: { src: u("photo-1540575467063-178a50c2df87"), alt: "Audience seated for a conference talk" },
  church: { src: u("photo-1507692049790-de58290a4334"), alt: "Congregation gathered for a service" },
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
