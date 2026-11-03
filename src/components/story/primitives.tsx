"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode, RefObject } from "react";

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

/**
 * 0 → 1 while a tall chapter scrolls past its sticky stage.
 *
 * The pass-through transform matters: framer-motion hands opacity driven
 * straight off useScroll to the browser's ViewTimeline, which ignores our
 * offsets and maps the range wrong. A derived value keeps it on the JS path.
 */
export function useChapterProgress(ref: RefObject<HTMLElement | null>, offset: ScrollOffset = ["start start", "end end"]) {
  const { scrollYProgress } = useScroll({ target: ref, offset });
  return useTransform(scrollYProgress, (v) => v);
}

/** Small numbered label above each chapter headline, e.g. "02 — One hall, every story". */
export function Kicker({ n, children, className = "" }: { n?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`text-[0.7rem] font-medium uppercase tracking-[0.24em] text-gold-soft ${className}`}>
      {n && <span className="tabular-nums">{n} — </span>}
      {children}
    </p>
  );
}

/** Light sans headline; wrap the accent words in <Accent>. */
export function StoryHeadline({ children, className = "", as: Tag = "h2" }: { children: ReactNode; className?: string; as?: "h1" | "h2" }) {
  return <Tag className={`font-head text-story font-extralight text-balance ${className}`}>{children}</Tag>;
}

export function Accent({ children }: { children: ReactNode }) {
  return <em className="font-display font-normal italic tracking-[-0.01em] text-gold-soft">{children}</em>;
}

/**
 * Words brighten one by one as `progress` moves through `range`.
 * Screen readers get the sentence once, not word by word.
 */
export function ScrollWords({ text, progress, range = [0, 1], className = "" }: { text: string; progress: MotionValue<number>; range?: [number, number]; className?: string }) {
  const words = text.split(" ");
  const step = (range[1] - range[0]) / words.length;
  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Word key={i} progress={progress} from={range[0] + i * step} to={range[0] + (i + 1) * step}>
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({ progress, from, to, children }: { progress: MotionValue<number>; from: number; to: number; children: string }) {
  const opacity = useTransform(progress, [from, to], [0.16, 1]);
  return (
    <motion.span aria-hidden="true" style={{ opacity }} className="mr-[0.26em] inline-block">
      {children}
    </motion.span>
  );
}

/**
 * The pair of hall doors. `swing` is the opening angle in degrees
 * (0 closed, ~105 fully open); each leaf hinges on its outer edge.
 */
export function Doors({ swing, opacity }: { swing: MotionValue<number>; opacity?: MotionValue<number> }) {
  const left = useTransform(swing, (d) => -d);
  return (
    <motion.div aria-hidden="true" style={{ opacity }} className="pointer-events-none absolute inset-0 [perspective:1700px]">
      <motion.div style={{ rotateY: left }} className="door door-left absolute inset-y-0 left-0 w-1/2 origin-left" />
      <motion.div style={{ rotateY: swing }} className="door door-right absolute inset-y-0 right-0 w-1/2 origin-right" />
    </motion.div>
  );
}
