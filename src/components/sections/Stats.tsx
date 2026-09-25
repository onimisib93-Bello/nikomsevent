import { CountUp } from "@/components/ui/CountUp";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { stats } from "@/content/site";

export function Stats() {
  return (
    <section className="bg-paper py-[var(--spacing-section)]" aria-labelledby="stats-title">
      <div className="container-page grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
        <Reveal>
          <h2 id="stats-title" className="font-display text-headline text-balance">One hall, built for the big day and everything after it.</h2>
          <p className="mt-6 max-w-md text-lg text-stone">
            Nikoms sits on Taylor Drive in Yaba, on the Lagos mainland. The room is finished, cooled and powered, so your budget goes on your guests.
          </p>
        </Reveal>
        <RevealGroup className="grid grid-cols-2 gap-x-8 gap-y-12 self-end">
          {stats.map((s) => (
            <RevealItem key={s.label} className="border-t border-ink/15 pt-5">
              <p className="font-display text-[clamp(3rem,6vw,5rem)] leading-none text-plum">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 max-w-[18ch] text-stone">{s.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
