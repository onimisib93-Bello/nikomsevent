# Nikoms Events Centre website

Marketing site for Nikoms Events Centre (1 Taylor Drive, Yaba, Lagos). Its
structure and interactions follow cwlagos.com, adapted from real estate to an
events venue: spaces replace listings, a package finder replaces property
search, and the events team replaces agents.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4, with design tokens in `src/styles/tokens.css`
- Framer Motion for the scroll-driven story, reveals, modals and page transitions
- Swiper for carousels, the continuous ticker and the lightbox (zoom + thumbs)
- Lenis for smooth scrolling
- React Hook Form + Zod for the enquiry and newsletter forms
- Static TypeScript content layer in `src/content/` (swap for Sanity later)

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

Deploy to Vercel with the default Next.js settings.

## Where things live

| What | File |
| --- | --- |
| Brand colours, fonts, spacing | `src/styles/tokens.css`, `src/app/layout.tsx` |
| Every image URL | `src/content/media.ts` |
| Address, phone, socials, nav | `src/content/site.ts` |
| Spaces (listings) | `src/content/spaces.ts` |
| Packages and filter options | `src/content/packages.ts` |
| Occasions, marquee words | `src/content/occasions.ts` |
| Team, reviews, services, set-ups | `src/content/people.ts` |
| Journal articles | `src/content/journal.ts` |
| Form handlers | `src/app/api/enquiry`, `src/app/api/newsletter` |

## Page sections (home)

An immersive scroll story in seven chapters (`src/components/story/`), in the
spirit of morphowater.com:

1. **The arrival**: "Big day? Bigger hall." on CSS hall doors that swing
   open on scroll; the hall brightens behind them and the welcome copy lights
   up word by word.
2. **Every story**: one pinned frame wipes from wedding to conference to
   birthday to concert to church, with the label and package link following.
3. **Day to night**: one room through a full day, 6:00 AM round to 6:00 AM,
   the lighting following the clock and a label naming the event for the hour.
4. **Spaces**: vertical scroll drives a horizontal run of every space, with
   a banquet/standing capacity toggle.
5. **The details**: facilities set like periodic-table elements.
6. **In the hall**: real set-ups that slide left as you scroll down, then
   the Google rating.
7. **Your date**: back at the doors, held half open, with enquiry and WhatsApp.

Then the package finder (`#plan`) and the footer. Around it: a first-visit
intro curtain, a glass "Explore" notch menu, a chapter rail on wide screens,
and a floating WhatsApp button. Every chapter has a still fallback for
`prefers-reduced-motion`.

Scroll progress goes through `useChapterProgress` in
`src/components/story/primitives.tsx`; keep using it rather than raw
`useScroll`, or framer-motion hands opacity to the browser ViewTimeline with
the wrong range.

Other routes: `/spaces/[slug]` (details + lightbox gallery), `/journal`,
`/journal/[slug]`.

## Before launch: replace placeholder content

- [ ] **Logo file**: `public/brand/logo-round.png` is a 150px copy from
      Google. It works at header size; ask for the original (ideally SVG) and
      swap it in, plus `src/app/icon.png` and `apple-icon.png`. The palette in
      `src/styles/tokens.css` is already sampled from it.
- [ ] **Photos and video**: the photos in `public/media/` are Nikoms' own,
      but small Instagram/Google copies (mostly 640px). Ask for the originals
      and drop them in at the same file names. Still placeholder (Unsplash):
      bar & lounge, concerts, conferences, team, journal. No video yet; set
      `heroVideo` in `src/content/media.ts` when there is one.
- [ ] **Harvesters photos**: `service-main-hall.jpg` and `service-crowd.jpg`
      come from Google and look like Harvesters Yaba's own shots. Get their
      OK or replace them.
- [ ] **Email**: still a placeholder (`TODO` in `src/content/site.ts`). Phone and
      WhatsApp use the Google listing number; confirm it is on WhatsApp.
- [ ] **Prices and packages**: sample figures in `packages.ts` and `spaces.ts`.
      The pages say they're samples. Remove those notes once the rates are real.
- [ ] **Reviews**: the home page shows the Google rating from `site.google`
      in `site.ts` (4.1 from 943 reviews on 3 Nov 2026); refresh it now and
      then. To show individual reviews, paste them into `testimonials` in
      `people.ts` exactly as written on Google.
- [ ] **Team**: add names and direct lines in `people.ts` if wanted.
- [ ] **Forms**: `/api/enquiry` and `/api/newsletter` validate and log only.
      Connect them to email (Resend), a CRM or a mailing list.
- [ ] **Currency**: prices show in naira only (the NGN/USD switch was removed).
      `NGN_PER_USD` in `src/lib/currency.ts` only matters if it comes back.
