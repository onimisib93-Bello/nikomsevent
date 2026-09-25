import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Consistent section opener: display headline, optional lede and aside. */
export function SectionHeading({ title, lede, aside, tone = "light", id }: { title: ReactNode; lede?: ReactNode; aside?: ReactNode; tone?: "light" | "dark"; id?: string }) {
  return (
    <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <Reveal className="max-w-2xl">
        <h2 id={id} className="font-display text-headline text-balance">{title}</h2>
        {lede && <p className={`mt-5 max-w-xl text-lg ${tone === "dark" ? "text-paper/75" : "text-stone"}`}>{lede}</p>}
      </Reveal>
      {aside && <Reveal delay={0.1}>{aside}</Reveal>}
    </div>
  );
}
