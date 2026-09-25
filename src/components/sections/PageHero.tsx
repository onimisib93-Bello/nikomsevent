import Image from "next/image";
import type { ReactNode } from "react";
import type { Media } from "@/content/media";

/** Shorter hero for inner pages; keeps the header's transparent state legible. */
export function PageHero({ image, title, children }: { image: Media; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-plum-deep text-paper">
      <Image src={image.src} alt={image.alt} fill preload sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(40_16_42/0.6),rgb(40_16_42/0.2)_40%,rgb(40_16_42/0.9))]" aria-hidden="true" />
      <div className="container-page relative pb-14 pt-40">
        <h1 className="max-w-4xl font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-[-0.02em] text-balance">{title}</h1>
        {children}
      </div>
    </section>
  );
}
