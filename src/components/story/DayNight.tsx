"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { media } from "@/content/media";
import { Accent, Kicker, ScrollWords, StoryHeadline, useChapterProgress } from "./primitives";

const COPY =
  "Backup power and water run through your whole event, so the lights, the sound and the air conditioning stay on until your last guest leaves.";

// Fixed positions so server and client render the same lights.
const BOKEH = [
  [8, 18, 46, "#f3c278"], [17, 62, 28, "#f0a35e"], [26, 30, 64, "#e0952f"], [34, 78, 22, "#f5efe6"],
  [44, 14, 38, "#f3c278"], [52, 52, 54, "#c22a1e"], [61, 26, 24, "#f0d59a"], [69, 70, 42, "#e0952f"],
  [77, 38, 30, "#f5efe6"], [85, 16, 58, "#f3c278"], [91, 60, 26, "#f0a35e"], [12, 86, 34, "#c22a1e"],
  [58, 88, 30, "#f3c278"], [38, 46, 18, "#f5efe6"],
] as const;

function clock(v: number) {
  const minutes = 16 * 60 + Math.round((v * 450) / 15) * 15; // 4:00 PM → 11:30 PM in 15-minute steps
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

/** Chapter 03: the same room drifts from golden hour into a lit-up night. */
export function DayNight() {
  const ref = useRef<HTMLElement>(null);
  const p = useChapterProgress(ref);
  const reduce = useReducedMotion();

  const night = useTransform(p, [0.15, 0.7], [0, 1]);
  const time = useTransform(p, (v) => clock(Math.min(1, Math.max(0, (v - 0.1) / 0.7))));
  const dayLabel = useTransform(p, [0.3, 0.45], [1, 0]);
  const nightLabel = useTransform(p, [0.45, 0.6], [0, 1]);

  if (reduce) {
    return (
      <section id="day-night" className="relative overflow-hidden py-[var(--spacing-section)]">
        <Image src={media.hall.src} alt={media.hall.alt} fill sizes="100vw" className="object-cover brightness-[0.45] saturate-[1.3]" />
        <div className="container-page relative">
          <Heading />
          <p className="mt-6 max-w-xl font-head text-xl font-light text-ivory/85">{COPY}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="day-night" ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="absolute inset-0">
          <Image src={media.hall.src} alt={media.hall.alt} fill sizes="100vw" className="object-cover brightness-[1.05] saturate-[0.85] sepia-[0.18]" />
        </div>
        <motion.div style={{ opacity: night }} className="absolute inset-0" aria-hidden="true">
          <Image src={media.hall.src} alt="" fill sizes="100vw" className="object-cover brightness-[0.55] contrast-[1.1] saturate-[1.3]" />
          {/* Night: a deep blue multiply, then warm pools of light on top */}
          <div className="absolute inset-0 bg-[#7480c8] mix-blend-multiply" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgb(240_163_94/0.4),transparent_50%),radial-gradient(ellipse_at_75%_30%,rgb(212_106_140/0.3),transparent_45%)] mix-blend-screen" />
          {BOKEH.map(([x, y, size, color], i) => (
            <span
              key={i}
              className="bokeh"
              style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: color, opacity: 0.55, animationDelay: `${-i * 0.6}s` }}
            />
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(14_10_9/0.9)_0%,rgb(14_10_9/0.15)_50%,rgb(14_10_9/0.35)_100%)]" />

        <div className="container-page relative flex h-full flex-col justify-end pb-[9svh] pt-28">
          <div className="mb-auto mt-4 flex items-baseline gap-4 self-end text-right">
            <div className="relative h-5 w-28 text-[0.7rem] uppercase tracking-[0.24em] text-ivory/70">
              <motion.span style={{ opacity: dayLabel }} className="absolute right-0">Golden hour</motion.span>
              <motion.span style={{ opacity: nightLabel }} className="absolute right-0">Last dance</motion.span>
            </div>
            <motion.span className="font-head text-4xl font-extralight tabular-nums text-gold-soft sm:text-6xl">{time}</motion.span>
          </div>
          <Heading />
          <ScrollWords text={COPY} progress={p} range={[0.35, 0.85]} className="mt-6 max-w-2xl font-head text-xl font-light leading-snug sm:text-2xl" />
        </div>
      </div>
    </section>
  );
}

function Heading() {
  return (
    <>
      <Kicker n="03">Day to night</Kicker>
      <StoryHeadline className="mt-5 max-w-4xl">
        From golden hour to the <Accent>last dance.</Accent>
      </StoryHeadline>
    </>
  );
}
