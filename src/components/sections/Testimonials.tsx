"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { testimonials } from "@/content/people";

const INTERVAL = 7000;

/** Crossfading quotes with autoplay that stops on hover, focus or reduced motion. */
export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = testimonials.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  useEffect(() => {
    if (paused || reduce) return;
    const t = window.setTimeout(() => go(1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [i, paused, reduce, go]);

  const t = testimonials[i];

  return (
    <section
      className="bg-chalk py-[var(--spacing-section)]"
      aria-roledescription="carousel"
      aria-labelledby="testimonials-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container-page">
        <h2 id="testimonials-title" className="sr-only">What hosts say</h2>
        <div className="mx-auto max-w-4xl text-center">
          <Icon name="quote" width={44} height={44} className="mx-auto text-gold" />
          <div className="relative mt-8 grid min-h-[16rem] md:min-h-[13rem]" aria-live={paused ? "polite" : "off"}>
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="[grid-area:1/1]"
              >
                <blockquote className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] leading-snug text-balance">{t.quote}</blockquote>
                <figcaption className="mt-8 text-stone">
                  <span className="font-medium text-ink">{t.name}</span>, {t.event}
                  {t.sample && <span className="mt-1 block text-xs">Sample review. Replace with a real guest review before launch.</span>}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex items-center justify-center gap-6">
            <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="grid size-12 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-paper">
              <Icon name="arrowLeft" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, k) => (
                <button key={k} type="button" onClick={() => setI(k)} aria-label={`Show review ${k + 1}`} aria-current={k === i} className="grid h-6 place-items-center">
                  <span className={`block h-px transition-all duration-500 ${k === i ? "w-10 bg-ink" : "w-5 bg-ink/30"}`} />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => go(1)} aria-label="Next review" className="grid size-12 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-paper">
              <Icon name="arrowRight" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
