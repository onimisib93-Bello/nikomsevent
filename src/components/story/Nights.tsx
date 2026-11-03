"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { moments, testimonials } from "@/content/people";
import { site } from "@/content/site";
import { Accent, Kicker, StoryHeadline } from "./primitives";

/** Chapter 06: the set-ups the hall takes, then what hosts say. */
export function Nights() {
  return (
    <section id="nights" className="py-[var(--spacing-section)]">
      <div className="container-page flex flex-wrap items-end justify-between gap-6">
        <div>
          <Kicker n="06">In the hall</Kicker>
          <StoryHeadline className="mt-5">
            Set for <Accent>your night.</Accent>
          </StoryHeadline>
        </div>
        <a href={site.socials.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-ivory/70 hover:text-ivory">
          <Icon name="instagram" width={18} height={18} /> More on Instagram
        </a>
      </div>

      <ul className="scrollbar-none mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-[var(--spacing-gutter)] px-[var(--spacing-gutter)] pb-2">
        {moments.map((m) => (
          <li key={m.title} className="group w-[min(72vw,20rem)] shrink-0 snap-start">
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
        ))}
      </ul>

      <RevealGroup className="container-page mt-20 grid gap-10 md:grid-cols-3">
        {testimonials.map((t) => (
          <RevealItem key={t.name} className="border-t border-ivory/15 pt-6">
            <blockquote className="font-display text-2xl italic leading-snug text-ivory/90">“{t.quote}”</blockquote>
            <p className="mt-5 text-sm text-ivory/60">
              {t.name} · {t.event}
            </p>
            {t.sample && <p className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-ivory/35">Sample review</p>}
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
