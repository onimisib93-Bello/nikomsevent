import { media, type Media } from "./media";

export type Article = { slug: string; title: string; date: string; excerpt: string; image: Media; body: string[] };

export const articles: Article[] = [
  {
    slug: "seating-700-guests",
    title: "How 700 guests actually fit: banquet, theatre and cocktail layouts",
    date: "2026-08-14",
    excerpt: "The same hall holds 700 at rounds or 1,000 on their feet. Here is how to choose.",
    image: media.journalA,
    body: [
      "Capacity depends on how people sit. Banquet rounds of ten give everyone a table and a plate, and that is how the Main Hall reaches 700 seats with a clear dance floor.",
      "Theatre rows remove the tables and suit conferences, church programmes and launches. Standing, for concerts and cocktail receptions, is where the hall reaches 1,000.",
      "If your guest list is still moving, plan for the seated number and ask the events desk to hold a standing option.",
    ],
  },
  {
    slug: "owambe-timeline",
    title: "A timeline for a mainland owambe that runs on time",
    date: "2026-07-02",
    excerpt: "Doors, entrances, food, spraying, dancing. What to schedule, and when.",
    image: media.journalB,
    body: [
      "Start with the hard edges: when the hall opens for your decorator and when it must be cleared. Everything else fits between them.",
      "Give the caterer a service time, not a window, and share the run-of-show with your MC and DJ a week ahead.",
      "The events desk will walk the timeline with you on your viewing and flag anything that usually runs long.",
    ],
  },
  {
    slug: "questions-before-booking",
    title: "Eight questions to ask any venue before you pay a deposit",
    date: "2026-05-20",
    excerpt: "Power, parking, overtime and who to call on the night.",
    image: media.journalC,
    body: [
      "Ask what happens when the grid goes off, and who switches over. Ask where guests park and who watches the cars.",
      "Ask what overtime costs, when the decorator can get in, and who the single point of contact is on the day.",
      "We answer all of these on every viewing, so bring the list.",
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
