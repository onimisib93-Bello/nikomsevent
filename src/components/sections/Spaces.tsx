"use client";

import { Carousel } from "@/components/ui/Carousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { spaces } from "@/content/spaces";
import { SpaceCard } from "./SpaceCard";

export function Spaces() {
  return (
    <section id="spaces" className="scroll-mt-20 overflow-hidden bg-chalk py-[var(--spacing-section)]" aria-labelledby="spaces-title">
      <div className="container-page">
        <SectionHeading id="spaces-title" title="The spaces" lede="Hire the hall on its own or add the rooms around it. Every booking includes parking, security and backup power." />
        <Reveal>
          <Carousel label="Spaces at Nikoms" items={spaces} perView={{ base: 1.15, sm: 2.15, lg: 3, xl: 3.4 }} render={(s) => <SpaceCard space={s} />} />
        </Reveal>
        <p className="mt-8 text-sm text-stone">Sample rates shown for layout. Confirm current pricing with the events desk.</p>
      </div>
    </section>
  );
}
