"use client";

import { AnimatePresence, motion, useReducedMotion, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useSite } from "@/components/layout/Providers";
import { Icon } from "@/components/ui/Icon";
import { spaces } from "@/content/spaces";
import { formatPrice } from "@/lib/currency";
import { Accent, Kicker, StoryHeadline, useChapterProgress, useTrackDistance } from "./primitives";

const layouts = [
  { id: "banquet", label: "Banquet", value: "700", note: "seated at round tables" },
  { id: "standing", label: "Standing", value: "1,000", note: "on a cleared floor, concert style" },
] as const;

/** Chapter 04: vertical scroll drives a horizontal run of the venue's spaces. */
export function SpacesTrack() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const p = useChapterProgress(ref);
  const reduce = useReducedMotion();
  const distance = useTrackDistance(track);

  const x = useTransform(p, [0.04, 0.96], [0, -distance]);

  if (reduce) {
    return (
      <section id="spaces" className="py-[var(--spacing-section)]">
        <div ref={track} className="scrollbar-none flex snap-x gap-6 overflow-x-auto px-[var(--spacing-gutter)]">
          <IntroPanel />
          {spaces.map((s) => (
            <SpaceCard key={s.slug} space={s} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="spaces" ref={ref} className="relative" style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex w-max items-center gap-6 px-[var(--spacing-gutter)] pt-16 will-change-transform">
          <IntroPanel />
          {spaces.map((s) => (
            <SpaceCard key={s.slug} space={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function IntroPanel() {
  const [layout, setLayout] = useState<(typeof layouts)[number]>(layouts[0]);
  return (
    <div className="w-[min(86vw,32rem)] shrink-0 snap-start pr-4 sm:pr-10">
      <Kicker n="04">Spaces & capacity</Kicker>
      <StoryHeadline className="mt-5">
        Room for <Accent>everyone.</Accent>
      </StoryHeadline>

      <div role="radiogroup" aria-label="Hall layout" className="mt-10 inline-flex rounded-full border border-ivory/20 p-1 text-sm">
        {layouts.map((l) => (
          <button
            key={l.id}
            type="button"
            role="radio"
            aria-checked={layout.id === l.id}
            onClick={() => setLayout(l)}
            className={`min-h-10 rounded-full px-5 transition-colors ${layout.id === l.id ? "bg-gold-soft text-night" : "text-ivory/75 hover:text-ivory"}`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="relative mt-6 h-28 overflow-hidden" aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={layout.id}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <span className="block font-head text-7xl font-extralight tabular-nums text-ivory">{layout.value}</span>
            <span className="text-sm text-ivory/65">guests {layout.note}</span>
          </motion.p>
        </AnimatePresence>
      </div>
      <p className="mt-4 hidden text-sm text-ivory/50 sm:block">Keep scrolling to walk through every space →</p>
    </div>
  );
}

function SpaceCard({ space }: { space: (typeof spaces)[number] }) {
  const { currency } = useSite();
  return (
    <Link href={`/spaces/${space.slug}`} className="group block w-[min(78vw,24rem)] shrink-0 snap-start">
      <div className="media-frame relative aspect-[4/5]">
        <Image src={space.image.src} alt={space.image.alt} fill sizes="(min-width: 640px) 24rem, 78vw" className="object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-night/55 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-ivory backdrop-blur-md">
          {space.kind}
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-head text-2xl font-light text-ivory">{space.name}</h3>
          <p className="mt-1 text-sm text-gold-soft">{space.capacity}</p>
        </div>
        <Icon name="arrowRight" className="mt-2 shrink-0 text-ivory/60 transition-transform group-hover:translate-x-1 group-hover:text-ivory" />
      </div>
      <p className="mt-2 text-sm text-ivory/65">{space.summary}</p>
      <p className="mt-3 text-xs uppercase tracking-[0.16em] text-ivory/45">
        {space.fromPrice > 0 ? `From ${formatPrice(space.fromPrice, currency)}` : "Included with the hall"}
      </p>
    </Link>
  );
}
