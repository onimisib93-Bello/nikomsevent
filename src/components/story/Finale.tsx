"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useSite } from "@/components/layout/Providers";
import { Icon } from "@/components/ui/Icon";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { Accent, Doors, Kicker, StoryHeadline, useChapterProgress } from "./primitives";

/** Chapter 07: back at the doors where the story began, now held half open for the next booking. */
export function Finale() {
  const ref = useRef<HTMLElement>(null);
  const p = useChapterProgress(ref);
  const reduce = useReducedMotion();

  const swing = useTransform(p, [0, 0.6], [106, 50]);
  const doorsIn = useTransform(p, [0, 0.15], [0, 1]);
  const glow = useTransform(p, [0.2, 0.7], [0.2, 0.85]);
  const contentOpacity = useTransform(p, [0.45, 0.65], [0, 1]);
  const contentY = useTransform(p, [0.45, 0.65], [36, 0]);

  return (
    <section id="your-date" ref={ref} className={`relative ${reduce ? "" : "h-[230vh]"}`}>
      <div className={`${reduce ? "relative py-[var(--spacing-section)]" : "sticky top-0 h-svh"} flex items-center overflow-hidden`}>
        <Image src={media.court.src} alt={media.court.alt} fill sizes="100vw" className="object-cover brightness-[0.45] saturate-[0.9]" />
        <motion.div
          aria-hidden="true"
          style={reduce ? undefined : { opacity: glow }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(248_217_160/0.45),transparent_55%)] mix-blend-screen"
        />
        {!reduce && <Doors swing={swing} opacity={doorsIn} />}
        <div className="absolute inset-0 bg-night/35" />

        <motion.div style={reduce ? undefined : { opacity: contentOpacity, y: contentY }} className="container-page relative text-center">
          <Kicker n="07">Your date</Kicker>
          <StoryHeadline className="mx-auto mt-5 max-w-4xl">
            Let’s plan <Accent>your event.</Accent>
          </StoryHeadline>
          <p className="mx-auto mt-6 max-w-lg text-ivory/80">
            Tell us the date, the occasion and the guest count. The events desk replies with availability and a quote.
          </p>
          <CallToAction />
          <address className="mt-10 text-sm not-italic text-ivory/65">
            <a href={site.address.mapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-ivory">
              <Icon name="pin" width={16} height={16} /> {site.address.line1}, {site.address.line2}
            </a>
            <span className="mx-3 hidden sm:inline">·</span>
            <span className="mt-2 block sm:mt-0 sm:inline">{site.hours}</span>
          </address>
        </motion.div>
      </div>
    </section>
  );
}

function CallToAction() {
  const { openEnquiry } = useSite();
  return (
    <div className="mt-9 flex flex-wrap justify-center gap-3">
      <button
        type="button"
        onClick={() => openEnquiry()}
        className="inline-flex min-h-12 items-center gap-3 rounded-full bg-gold-soft px-7 font-medium text-night transition-colors hover:bg-ivory"
      >
        Check a date <Icon name="arrowRight" />
      </button>
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-12 items-center gap-3 rounded-full border border-ivory/30 px-7 font-medium text-ivory backdrop-blur-sm transition-colors hover:border-ivory hover:bg-ivory/10"
      >
        <Icon name="whatsapp" /> WhatsApp the desk
      </a>
      <a href="#plan" className="inline-flex min-h-12 items-center px-4 text-sm text-ivory/75 underline-offset-4 hover:text-ivory hover:underline">
        Browse packages
      </a>
    </div>
  );
}
