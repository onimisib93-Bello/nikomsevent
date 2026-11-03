"use client";

import { useRef } from "react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Accent, Kicker, ScrollWords, StoryHeadline, useChapterProgress } from "./primitives";

const STATEMENT =
  "No bare walls, no borrowed generators, no guessing. The hall comes finished, cooled and powered, with a team that knows the room.";

/** Each detail is set like an element on a periodic table: symbol, figure, role. */
const details = [
  { symbol: "Ac", name: "Air conditioning", figure: "Whole hall", body: "Cool from the first guest to the last, even at a full owambe." },
  { symbol: "Pw", name: "Backup power", figure: "24h", body: "Power and water that stay on through your whole event." },
  { symbol: "Sl", name: "Stage, light & sound", figure: "House rig", body: "A raised stage, lighting and PA, with a technician on duty." },
  { symbol: "Dr", name: "Dressing rooms", figure: "Private", body: "For outfit changes, the bridal party, or performers waiting to go on." },
  { symbol: "Pk", name: "Secured parking", figure: "On site", body: "Guarded parking watched by security through the night." },
  { symbol: "Ct", name: "Caterers' area", figure: "Separate", body: "A washing area that keeps service out of sight of your guests." },
];

/** Chapter 05: a statement that lights up word by word, then the facts. */
export function Details() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollYProgress = useChapterProgress(ref, ["start 0.85", "end 0.45"]);

  return (
    <section id="details" className="container-page py-[var(--spacing-section)]">
      <Kicker n="05">The details</Kicker>
      <StoryHeadline className="mt-5 max-w-4xl">
        Everything, <Accent>already here.</Accent>
      </StoryHeadline>
      <div ref={ref}>
        <ScrollWords text={STATEMENT} progress={scrollYProgress} className="mt-10 max-w-4xl font-head text-2xl font-light leading-snug sm:text-4xl" />
      </div>

      <RevealGroup as="li" className="mt-16 grid gap-px overflow-hidden rounded-sm bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
        {details.map((d) => (
          <RevealItem key={d.symbol} as="li" className="group bg-night p-7 transition-colors duration-500 hover:bg-night-soft">
            <div className="flex items-start justify-between">
              <span className="grid size-16 place-items-center border border-gold/40 font-display text-3xl italic text-gold-soft transition-colors duration-500 group-hover:bg-gold/10">
                {d.symbol}
              </span>
              <span className="font-head text-sm font-light uppercase tracking-[0.16em] text-ivory/55">{d.figure}</span>
            </div>
            <h3 className="mt-8 font-head text-xl font-light text-ivory">{d.name}</h3>
            <p className="mt-2 text-sm text-ivory/65">{d.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
