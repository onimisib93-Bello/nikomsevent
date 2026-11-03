"use client";

import { useEffect, useState } from "react";
import { chapters } from "@/content/site";

/** Fixed left rail: "03 / 07" plus a tick per chapter, following the reader. */
export function ChapterRail() {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    // The chapter crossing the middle of the screen is the active one;
    // past the last chapter (the package finder onwards) the rail hides.
    const ids = [...chapters.map((c) => c.id), "plan"];
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let current = -1;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) current = i;
      });
      setActive(current >= chapters.length ? -1 : current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Chapters"
      className={`group/rail fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-500 xl:block ${active < 0 ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <p className="mb-4 font-head text-[0.7rem] font-light tabular-nums text-ivory/60">
        <span className="text-ivory">{String(Math.max(active, 0) + 1).padStart(2, "0")}</span>
        <br />/ {String(chapters.length).padStart(2, "0")}
      </p>
      {/* Ticks only, so the rail stays inside the page gutter; names appear on hover. */}
      <ol className="space-y-3">
        {chapters.map((c, i) => (
          <li key={c.id}>
            <a href={`#${c.id}`} className="group flex items-center gap-3 py-0.5" aria-current={i === active ? "step" : undefined}>
              <span className={`block h-px transition-all duration-500 ${i === active ? "w-6 bg-gold-soft" : "w-3 bg-ivory/35 group-hover:w-5 group-hover:bg-ivory/70"}`} />
              <span className="whitespace-nowrap rounded-full bg-night/70 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-ivory opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover/rail:opacity-100">
                {c.label}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
