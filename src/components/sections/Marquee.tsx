import { marqueeWords } from "@/content/occasions";

/** Infinite strip of occasions. Pauses on hover; static with reduced motion. */
export function Marquee() {
  const row = [...marqueeWords, ...marqueeWords];
  return (
    <section aria-label="Events we host" className="marquee overflow-hidden border-b border-mist bg-paper py-7">
      <ul className="marquee-track flex w-max items-center gap-12 pr-12">
        {row.map((w, i) => (
          <li key={i} aria-hidden={i >= marqueeWords.length} className="flex items-center gap-12 whitespace-nowrap font-display text-3xl text-plum md:text-4xl">
            <span className={i % 2 ? "italic" : ""}>{w}</span>
            <span className="size-1.5 rotate-45 bg-gold" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </section>
  );
}
