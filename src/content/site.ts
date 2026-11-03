/**
 * Business facts. Address and capacity come from public venue listings;
 * phone, email and socials marked TODO need confirming by Nikoms.
 */
export const site = {
  name: "Nikoms Events Centre",
  short: "Nikoms",
  tagline: "Where Yaba comes to celebrate.",
  description:
    "A 1,000-guest events centre on Taylor Drive, Yaba, with its own stage, lighting, sound and power that stays on.",
  address: {
    line1: "1 Taylor Drive",
    line2: "Yaba, Lagos",
    mapUrl: "https://maps.google.com/?cid=14543174602299369001",
  },
  // From the Google Business listing, checked 3 Nov 2026. Refresh now and then.
  google: {
    rating: 4.1,
    reviews: 943,
    url: "https://maps.google.com/?cid=14543174602299369001",
    // The topics Google picks out of the reviews
    mentions: ["Spacious hall", "Clean toilets", "Changing room"],
  },
  phone: "+234 800 000 0000", // TODO: real number
  whatsapp: "https://wa.me/2348000000000", // TODO: real number
  email: "hello@nikomsevents.com", // TODO: real address
  hours: "Viewings Monday to Saturday, 10am to 6pm",
  socials: {
    instagram: "https://www.instagram.com/nikomseventscentre/",
    facebook: "https://www.facebook.com/pages/Nikoms-Event-Centre-Edmund-CrescentYabaLagos/2024628154227247",
  },
  brands: [
    { name: "Nikoms Events Centre", href: "/" },
    { name: "Nikoms Bar & Lounge", href: "/spaces/bar-lounge" },
  ],
  nav: [
    { label: "Packages", href: "/#plan" },
    { label: "The Main Hall", href: "/spaces/main-hall" },
    { label: "Bar & Lounge", href: "/spaces/bar-lounge" },
    { label: "Journal", href: "/journal" },
  ],
} as const;

/** The home page is told in seven chapters; the rail and Explore menu read from here. */
export const chapters = [
  { id: "arrival", label: "The arrival" },
  { id: "stories", label: "Every story" },
  { id: "day-night", label: "Day to night" },
  { id: "spaces", label: "Spaces" },
  { id: "details", label: "The details" },
  { id: "nights", label: "In the hall" },
  { id: "your-date", label: "Your date" },
] as const;

export const stats = [
  { value: 1000, suffix: "", label: "guests at full standing capacity" },
  { value: 700, suffix: "", label: "seats in a banquet layout" },
  { value: 24, suffix: "h", label: "backup power through your event" },
  { value: 10, suffix: "+", label: "kinds of event hosted in the hall" },
];
