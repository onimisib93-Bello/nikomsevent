"use client";

import { useEffect, useRef } from "react";

const SEEN_KEY = "nikoms:intro-seen";

/**
 * First-visit curtain: the wordmark and a 0–100 count, then it lifts.
 * The lift is a CSS animation, so the page never stays covered if
 * scripts fail; returning visitors in the same session skip it.
 */
export function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* storage unavailable: show the intro */
    }
    if (seen) {
      root.current?.remove();
      return;
    }
    const start = performance.now();
    let raf = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / 1700);
      if (count.current) count.current.textContent = String(Math.round((1 - (1 - t) ** 3) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={root} aria-hidden="true" className="intro fixed inset-0 z-[100] flex flex-col items-center justify-center bg-night text-ivory">
      {/* Plain img: the curtain must show instantly, before the image optimiser responds */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-round.png" alt="" width={96} height={96} className="mb-6 size-24" />
      <p className="font-display text-6xl italic sm:text-7xl">Nikoms</p>
      <p className="mt-3 text-[0.7rem] uppercase tracking-[0.3em] text-ivory/60">Events Centre · Yaba, Lagos</p>
      <p className="absolute bottom-10 font-head text-sm font-light tabular-nums text-gold-soft">
        <span ref={count}>0</span>%
      </p>
    </div>
  );
}
