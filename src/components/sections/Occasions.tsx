import Image from "next/image";
import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { occasions } from "@/content/occasions";
import { OccasionCta } from "./OccasionCta";

/** Occasion tiles; each opens the package finder filtered to that occasion. */
export function Occasions() {
  return (
    <section id="occasions" className="scroll-mt-20 bg-paper py-[var(--spacing-section)]" aria-labelledby="occasions-title">
      <div className="container-page">
        <SectionHeading id="occasions-title" title="What are you celebrating?" lede="Pick an occasion to see the packages that fit it." />
        <RevealGroup as="li" className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {occasions.map((o, i) => (
            <RevealItem as="li" key={o.id} className={i === 0 ? "col-span-2 md:row-span-2" : ""}>
              <Link href={`/?occasion=${o.id}#plan`} scroll={false} className="group relative block h-full">
                <div className={`media-frame h-full rounded-[var(--radius-card)] ${i === 0 ? "aspect-square" : "aspect-[4/5] md:aspect-square"}`}>
                  <Image src={o.image.src} alt="" fill sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"} className="object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgb(40_16_42/0.85))]" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-paper md:p-6">
                    <h3 className={`font-display leading-tight ${i === 0 ? "text-4xl md:text-5xl" : "text-xl md:text-2xl"}`}>{o.label}</h3>
                    <p className={`mt-1 text-sm text-paper/75 ${i === 0 ? "" : "hidden md:block"}`}>{o.blurb}</p>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
          <RevealItem as="li" className="col-span-2">
            <OccasionCta />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
