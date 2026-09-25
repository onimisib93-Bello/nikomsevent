"use client";

import Image from "next/image";
import { Carousel } from "@/components/ui/Carousel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/people";

export function Services() {
  return (
    <section className="overflow-hidden bg-chalk py-[var(--spacing-section)]" aria-labelledby="services-title">
      <div className="container-page">
        <SectionHeading id="services-title" title="Everything around the hall" lede="Bring your own vendors or lean on ours. Either way, the room is ready for them." />
        <Reveal>
          <Carousel
            label="Services"
            items={services}
            perView={{ base: 1.2, sm: 2.2, lg: 3.2, xl: 4 }}
            render={(s) => (
              <article className="group h-full">
                <div className="media-frame aspect-[3/4] rounded-[var(--radius-card)]">
                  <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 85vw" className="object-cover" />
                </div>
                <h3 className="mt-5 font-display text-title">{s.title}</h3>
                <p className="mt-2 text-stone">{s.body}</p>
              </article>
            )}
          />
        </Reveal>
      </div>
    </section>
  );
}
