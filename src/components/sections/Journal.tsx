import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articles } from "@/content/journal";

export const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export function Journal() {
  return (
    <section id="journal" className="scroll-mt-20 bg-paper py-[var(--spacing-section)]" aria-labelledby="journal-title">
      <div className="container-page">
        <SectionHeading id="journal-title" title="Planning notes" lede="Short, practical guides from the events desk." aside={<ArrowLink href="/journal">See all notes</ArrowLink>} />
        <RevealGroup as="li" className="grid gap-10 md:grid-cols-3 md:gap-6">
          {articles.map((a) => (
            <RevealItem as="li" key={a.slug}>
              <Link href={`/journal/${a.slug}`} className="group block">
                <div className="media-frame aspect-[3/2] rounded-[var(--radius-card)]">
                  <Image src={a.image.src} alt="" fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
                </div>
                <time dateTime={a.date} className="mt-5 block text-sm text-stone">{formatDate(a.date)}</time>
                <h3 className="mt-2 font-display text-title text-balance transition-colors group-hover:text-plum">{a.title}</h3>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
