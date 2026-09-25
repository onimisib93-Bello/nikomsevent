# Nikoms Events Centre website

Marketing site for Nikoms Events Centre (1 Taylor Drive, Yaba, Lagos). Its
structure and interactions follow cwlagos.com, adapted from real estate to an
events venue: spaces replace listings, a package finder replaces property
search, and the events team replaces agents.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4, with design tokens in `src/styles/tokens.css`
- Framer Motion for scroll reveals, modals, the hero and page transitions
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

Sticky header with currency switch → hero (parallax, word reveal, email
capture) → occasions marquee → count-up stats → spaces carousel → occasions
grid → package finder (filter modal/bottom sheet, custom multi-select
dropdowns, counters, Load More) → services carousel → about (parallax) → team
→ continuous set-ups ticker → viewing promo band → testimonials → journal →
newsletter band → footer with brand links.

Other routes: `/spaces/[slug]` (details + lightbox gallery), `/journal`,
`/journal/[slug]`.

## Before launch: replace placeholder content

- [ ] **Logo and brand colours**: the Instagram account couldn't be reached
      from the build environment, so the palette is provisional. Add the logo
      to `public/brand/` and update `src/styles/tokens.css`.
- [ ] **Photos and video**: all imagery is Unsplash placeholder. Add real
      photos to `public/media/` and update `src/content/media.ts`.
- [ ] **Phone, WhatsApp, email**: marked `TODO` in `src/content/site.ts`.
- [ ] **Prices and packages**: sample figures in `packages.ts` and `spaces.ts`.
      The pages say they're samples. Remove those notes once the rates are real.
- [ ] **Reviews**: `testimonials` in `people.ts` are samples and carry a
      visible label. Replace them with real reviews and set `sample: false`.
- [ ] **Team**: add names and direct lines in `people.ts` if wanted.
- [ ] **Forms**: `/api/enquiry` and `/api/newsletter` validate and log only.
      Connect them to email (Resend), a CRM or a mailing list.
- [ ] **USD rate**: `NGN_PER_USD` in `src/lib/currency.ts` is a fixed figure.
