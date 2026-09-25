import Image from "next/image";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Reveal } from "@/components/ui/Reveal";
import { media } from "@/content/media";

export function NewsletterBand() {
  return (
    <section className="relative overflow-hidden bg-plum text-paper" aria-labelledby="newsletter-title">
      <Image src={media.newsletter.src} alt="" fill sizes="100vw" className="object-cover opacity-30 mix-blend-luminosity" />
      <div className="container-page relative grid gap-10 py-24 md:grid-cols-2 md:items-end md:py-32">
        <Reveal>
          <h2 id="newsletter-title" className="font-display text-headline text-balance">Saturdays go first. Hear about open dates early.</h2>
        </Reveal>
        <Reveal delay={0.1} className="md:justify-self-end">
          <p className="mb-6 max-w-md text-paper/75">One email on the first of each month with open dates for the season ahead. No other mail.</p>
          <NewsletterForm />
        </Reveal>
      </div>
    </section>
  );
}
