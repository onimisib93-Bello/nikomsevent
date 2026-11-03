"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { moments, testimonials } from "@/content/people";
import { site } from "@/content/site";
import { Accent, Kicker, StoryHeadline, useChapterProgress, useTrackDistance } from "./primitives";

/** Chapter 06: real set-ups in the hall, pinned so scrolling down moves them left, then the Google rating. */
export function Nights() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const p = useChapterProgress(ref);
  const reduce = useReducedMotion();
  const distance = useTrackDistance(track);
  const x = useTransform(p, [0.05, 0.95], [0, -distance]);

  return (
    <section id="nights" className="pb-[var(--spacing-section)]">
      {reduce ? (
        <div className="pt-[var(--spacing-section)]">
          <Heading />
          <ul ref={track} className="scrollbar-none mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--spacing-gutter)] pb-2">
            <Cards />
          </ul>
        </div>
      ) : (
        <div ref={ref} className="relative" style={{ height: `calc(100svh + ${distance}px)` }}>
          <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-16">
            <Heading />
            <motion.ul ref={track} style={{ x }} className="mt-8 flex w-max gap-5 px-[var(--spacing-gutter)] will-change-transform">
              <Cards />
            </motion.ul>
          </div>
        </div>
      )}

      <GoogleReviews />
    </section>
  );
}

function Heading() {
  return (
    <div className="container-page flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div>
        <Kicker n="06">In the hall</Kicker>
        <StoryHeadline className="mt-5">
          Set for <Accent>your event.</Accent>
        </StoryHeadline>
      </div>
      <a href={site.socials.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-ivory/70 hover:text-ivory">
        <Icon name="instagram" width={18} height={18} /> More on Instagram
      </a>
    </div>
  );
}

function Cards() {
  return moments.map((m) => (
    // Width also follows screen height, so the pinned strip fits short screens
    <li key={m.title} className="group w-[min(72vw,20rem,calc((100svh_-_17rem)*0.75))] shrink-0 snap-start">
      <div className="media-frame relative aspect-[3/4]">
        <Image src={m.image.src} alt={m.image.alt} fill sizes="20rem" className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 to-transparent p-5 pt-16">
          <p className="font-head text-lg font-light text-ivory">{m.title}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gold-soft">
            {m.guests} · {m.setup}
          </p>
        </div>
      </div>
    </li>
  ));
}

/** The live Google rating, plus any reviews copied into people.ts. */
function GoogleReviews() {
  const { rating, reviews, url, mentions } = site.google;
  return (
    <div className="container-page mt-[var(--spacing-section)]">
      <div className="grid gap-10 border-t border-ivory/15 pt-12 md:grid-cols-[auto_1fr] md:items-center md:gap-16">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.24em] text-gold-soft">Rated on Google</p>
          <div className="mt-3 flex items-end gap-4">
            <span className="font-head text-7xl font-extralight leading-none tabular-nums text-ivory sm:text-8xl">{rating.toFixed(1)}</span>
            <span className="pb-2">
              <span className="relative block whitespace-nowrap text-2xl leading-none tracking-[0.12em]" role="img" aria-label={`${rating} out of 5 stars`}>
                <span className="text-ivory/20">★★★★★</span>
                <span className="absolute inset-y-0 left-0 overflow-hidden text-gold-soft" style={{ width: `${(rating / 5) * 100}%` }}>
                  ★★★★★
                </span>
              </span>
              <span className="mt-2 block text-sm text-ivory/60">{reviews.toLocaleString("en-NG")} reviews</span>
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm text-ivory/60">What guests mention most</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {mentions.map((m) => (
              <li key={m} className="rounded-full border border-ivory/20 px-4 py-2 text-sm text-ivory/85">
                {m}
              </li>
            ))}
          </ul>
          <a href={url} target="_blank" rel="noreferrer" className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold-soft">
            Read the reviews on Google
            <Icon name="arrowRight" width={18} height={18} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {testimonials.length > 0 && (
        <RevealGroup className="mt-14 grid gap-10 md:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem key={t.name} className="border-t border-ivory/15 pt-6">
              <blockquote className="font-display text-2xl italic leading-snug text-ivory/90">“{t.quote}”</blockquote>
              <p className="mt-5 text-sm text-ivory/60">
                {t.name} · Google review, {t.when}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}
