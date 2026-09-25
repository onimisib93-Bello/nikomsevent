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
    mapUrl: "https://maps.google.com/?q=Nikoms+Event+Centre+Taylor+Drive+Yaba+Lagos",
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
    { label: "Spaces", href: "/#spaces" },
    { label: "Occasions", href: "/#occasions" },
    { label: "Plan", href: "/#plan" },
    { label: "About", href: "/#about" },
    { label: "Journal", href: "/#journal" },
  ],
} as const;

export const stats = [
  { value: 1000, suffix: "", label: "guests at full standing capacity" },
  { value: 700, suffix: "", label: "seats in a banquet layout" },
  { value: 24, suffix: "h", label: "backup power through your event" },
  { value: 10, suffix: "+", label: "kinds of event hosted in the hall" },
];
