"use client";

import { motion, useMotionTemplate, useReducedMotion, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useSite } from "@/components/layout/Providers";
import { Icon } from "@/components/ui/Icon";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { Accent, Doors, Kicker, ScrollWords, StoryHeadline, useChapterProgress } from "./primitives";

const WELCOME =
  "Up to 1,000 guests in one air-conditioned hall, with its own stage, lights, sound and backup power. Bring the guest list; we have the room.";

/** Chapter 01: the doors swing open on scroll and the hall comes up behind them. */
export function Arrival() {
  const ref = useRef<HTMLElement>(null);
  const p = useChapterProgress(ref);
  const reduce = useReducedMotion();

  const swing = useTransform(p, [0.08, 0.55], [0, 106]);
  const doorsFade = useTransform(p, [0.46, 0.58], [1, 0]);
  const hallScale = useTransform(p, [0, 0.75], [1.28, 1]);
  const hallLight = useTransform(p, [0.05, 0.6], [0.22, 0.72]);
  const hallFilter = useMotionTemplate`brightness(${hallLight}) saturate(1.1)`;
  const seam = useTransform(p, [0, 0.12, 0.45], [0.35, 1, 0]);
  const seamWidth = useTransform(p, [0, 0.4], [0.3, 6]);
  const introOpacity = useTransform(p, [0, 0.14], [1, 0]);
  const introY = useTransform(p, [0, 0.14], [0, -48]);
  const welcomeOpacity = useTransform(p, [0.52, 0.64], [0, 1]);
  const welcomeY = useTransform(p, [0.52, 0.64], [40, 0]);

  if (reduce) {
    return (
      <section id="arrival" className="relative flex min-h-svh items-end overflow-hidden pb-16 pt-32">
        <Image src={media.hero.src} alt={media.hero.alt} fill preload sizes="100vw" className="object-cover brightness-[0.55]" />
        <div className="container-page relative">
          <Welcome static />
        </div>
      </section>
    );
  }

  return (
    <section id="arrival" ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div style={{ scale: hallScale, filter: hallFilter }} className="absolute inset-0">
          <Image src={media.hero.src} alt={media.hero.alt} fill preload sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(14_10_9/0.55)_0%,transparent_30%,transparent_55%,rgb(14_10_9/0.92)_100%)]" />

        {/* Warm light escaping through the gap between the doors */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: seam, scaleX: seamWidth }}
          className="absolute inset-y-0 left-1/2 w-16 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgb(248_217_160/0.9),rgb(224_149_47/0.35)_45%,transparent_72%)] mix-blend-screen blur-xl"
        />
        <Doors swing={swing} opacity={doorsFade} />

        <motion.div style={{ opacity: introOpacity, y: introY }} className="absolute inset-x-0 top-[22svh] px-[var(--spacing-gutter)] text-center">
          <Kicker>Nikoms Events Centre · {site.address.line2}</Kicker>
          <StoryHeadline as="h1" className="mx-auto mt-6 max-w-5xl">
            Big day? <Accent>Bigger hall.</Accent>
          </StoryHeadline>
          <p className="mx-auto mt-6 max-w-2xl text-sm uppercase tracking-[0.2em] text-ivory/75 sm:text-base">
            Weddings · Owambes · Birthdays · Conferences · Church services
          </p>
        </motion.div>

        <motion.div style={{ opacity: introOpacity }} className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 text-[0.7rem] uppercase tracking-[0.24em] text-ivory/70">
          <span>Scroll to step inside</span>
          <span className="h-10 w-px animate-pulse bg-gradient-to-b from-gold-soft to-transparent" />
          <a href="#stories" className="mt-1 normal-case tracking-normal text-ivory/55 underline-offset-4 hover:text-ivory hover:underline">
            Skip the introduction
          </a>
        </motion.div>

        <motion.div style={{ opacity: welcomeOpacity, y: welcomeY }} className="container-page absolute inset-x-0 bottom-[10svh]">
          <Welcome progress={p} />
        </motion.div>
      </div>
    </section>
  );
}

function Welcome({ progress, static: isStatic }: { progress?: ReturnType<typeof useChapterProgress>; static?: boolean }) {
  const { openEnquiry } = useSite();
  return (
    <div className="max-w-3xl">
      <Kicker n="01">The arrival</Kicker>
      <StoryHeadline className="mt-5">
        Your event. <Accent>Our hall.</Accent>
      </StoryHeadline>
      {isStatic || !progress ? (
        <p className="mt-6 max-w-xl font-head text-xl font-light leading-snug text-ivory/85 sm:text-2xl">{WELCOME}</p>
      ) : (
        <ScrollWords text={WELCOME} progress={progress} range={[0.62, 0.9]} className="mt-6 max-w-xl font-head text-xl font-light leading-snug sm:text-2xl" />
      )}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => openEnquiry()}
          className="inline-flex min-h-12 items-center gap-3 rounded-full bg-gold-soft px-7 text-[0.95rem] font-medium text-night transition-colors hover:bg-ivory"
        >
          Check a date <Icon name="arrowRight" />
        </button>
        <a href="#spaces" className="text-sm text-ivory/75 underline-offset-4 hover:text-ivory hover:underline">
          See the spaces
        </a>
      </div>
    </div>
  );
}
