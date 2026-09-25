"use client";

import Image from "next/image";
import { useSite } from "@/components/layout/Providers";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { media } from "@/content/media";
import { site } from "@/content/site";

export function ViewingBand() {
  const { openEnquiry } = useSite();
  return (
    <section className="bg-paper" aria-labelledby="viewing-title">
      <div className="grid md:grid-cols-2">
        <div className="media-frame min-h-[22rem]">
          <Image src={media.stage.src} alt={media.stage.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <Reveal className="flex flex-col justify-center gap-6 bg-gold px-[var(--spacing-gutter)] py-16 text-plum-deep md:py-24 lg:px-20">
          <h2 id="viewing-title" className="font-display text-headline text-balance">See the hall before you sign.</h2>
          <p className="max-w-md text-lg">Walk the room, stand on the stage, and check the parking with the events desk. {site.hours}.</p>
          <div>
            <Button onClick={() => openEnquiry()} arrow>Book a viewing</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
