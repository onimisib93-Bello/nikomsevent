"use client";

import { AnimatePresence, motion, useMotionTemplate, useMotionValueEvent, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { occasions, type Occasion } from "@/content/occasions";
import { Accent, Kicker, StoryHeadline, useChapterProgress } from "./primitives";

// Only occasions with a real Nikoms photo; add "corporate" and "concert" back once there are photos of them.
const ORDER = ["wedding", "birthday", "religious"];
const items = ORDER.map((id) => occasions.find((o) => o.id === id)).filter((o): o is Occasion => Boolean(o));

/** Chapter 02: one frame, the same hall, wiping from one kind of event to the next. */
export function Stories() {
  const ref = useRef<HTMLElement>(null);
  const p = useChapterProgress(ref);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useMotionValueEvent(p, "change", (v) => setActive(Math.min(items.length - 1, Math.max(0, Math.floor(v * items.length)))));

  if (reduce) {
    return (
      <section id="stories" className="container-page py-[var(--spacing-section)]">
        <Intro />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((o) => (
            <li key={o.id} className="relative aspect-[4/5] overflow-hidden">
              <Image src={o.image.src} alt={o.image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 p-6">
                <p className="font-display text-3xl italic">{o.label}</p>
                <p className="mt-1 text-sm text-ivory/75">{o.blurb}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  const current = items[active];

  return (
    <section id="stories" ref={ref} className="relative" style={{ height: `${items.length * 95 + 60}vh` }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        {items.map((o, i) => (
          <Layer key={o.id} occasion={o} index={i} progress={p} />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(14_10_9/0.88)_0%,rgb(14_10_9/0.45)_45%,transparent_75%),linear-gradient(0deg,rgb(14_10_9/0.85)_0%,transparent_45%)]" />

        <div className="container-page relative flex h-full flex-col justify-end pb-[9svh] pt-28">
          <Intro />

          <div className="mt-10 grid max-w-xl gap-6">
            <div className="relative h-[9.5rem] overflow-hidden sm:h-[8.5rem]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={current.id}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-60%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <p className="text-xs tabular-nums tracking-[0.2em] text-ivory/60">
                    {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </p>
                  <p className="mt-2 font-display text-[2rem] leading-tight italic text-ivory sm:text-5xl">{current.label}</p>
                  <p className="mt-2 text-ivory/75">{current.blurb}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <ol className="flex gap-2" aria-label="Occasions">
              {items.map((o, i) => (
                <li key={o.id} className="h-0.5 flex-1 overflow-hidden bg-ivory/20">
                  <span className={`block h-full bg-gold-soft transition-transform duration-500 ${i <= active ? "scale-x-100" : "scale-x-0"} origin-left`} />
                  <span className="sr-only">{o.label}</span>
                </li>
              ))}
            </ol>

            <Link href={`/?occasion=${current.id}#plan`} scroll={false} className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-gold-soft">
              Packages for {current.label.toLowerCase()}
              <Icon name="arrowRight" width={18} height={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <div>
      <Kicker n="02">One hall, every story</Kicker>
      <StoryHeadline className="mt-5 max-w-3xl">
        Same hall. <Accent>Every</Accent> story.
      </StoryHeadline>
    </div>
  );
}

/**
 * Each occasion after the first wipes up from the bottom over the one before.
 * The venue's own photos are small, mostly portrait phone shots, so a blurred
 * copy fills the screen and the photo itself sits sharp in a frame.
 */
function Layer({ occasion, index, progress }: { occasion: Occasion; index: number; progress: MotionValue<number> }) {
  const seg = 1 / items.length;
  const start = index * seg - 0.05;
  const inset = useTransform(progress, [start, start + 0.08], index === 0 ? [0, 0] : [100, 0]);
  const clipPath = useMotionTemplate`inset(${inset}% 0 0 0)`;
  const scale = useTransform(progress, [Math.max(0, start), start + seg + 0.08], [1.14, 1]);
  const frameY = useTransform(progress, [Math.max(0, start), start + seg + 0.08], [60, -30]);
  return (
    <motion.div style={{ clipPath }} className="absolute inset-0 bg-night">
      <motion.div style={{ scale }} className="absolute inset-0" aria-hidden="true">
        <Image src={occasion.image.src} alt="" fill sizes="50vw" quality={60} className="scale-110 object-cover blur-2xl brightness-[0.7] saturate-[1.4]" />
      </motion.div>
      <motion.div
        style={{ y: frameY }}
        className="absolute right-[var(--spacing-gutter)] overflow-hidden bg-plum-deep top-20 aspect-[4/5] w-[44vw] max-w-[30rem] shadow-2xl shadow-black/60 sm:w-[36vw] lg:top-1/2 lg:-mt-[min(18.75rem,22.5vw)] lg:w-[min(30rem,36vw)]"
      >
        <Image src={occasion.image.src} alt={occasion.image.alt} fill sizes="(min-width: 1024px) 30rem, 44vw" className="object-cover" />
      </motion.div>
    </motion.div>
  );
}
