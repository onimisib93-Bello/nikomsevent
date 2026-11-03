"use client";

import Image from "next/image";
import Link from "next/link";
import { useSite } from "@/components/layout/Providers";
import type { Space } from "@/content/spaces";
import { formatPrice } from "@/lib/currency";

/** Image card: inner image zooms inside a clipped frame, overlay reveals rate and CTA. */
export function SpaceCard({ space }: { space: Space }) {
  const { currency } = useSite();
  return (
    <Link href={`/spaces/${space.slug}`} className="group block h-full">
      <div className="media-frame aspect-[4/5] rounded-[var(--radius-card)]">
        <Image src={space.image.src} alt={space.image.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-xs font-medium text-plum-deep backdrop-blur">{space.kind}</span>
        <div className="absolute inset-0 flex flex-col justify-end bg-[linear-gradient(180deg,transparent_45%,rgb(40_16_42/0.9))] p-5 text-paper opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
          <p className="text-sm text-paper/75">{space.fromPrice ? "From" : "Included"}</p>
          <p className="font-display text-2xl">{space.fromPrice ? formatPrice(space.fromPrice, currency) : "With every booking"}</p>
          <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium">View the space</p>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="font-display text-title">{space.name}</h3>
        <p className="mt-1 text-stone">{space.capacity}</p>
      </div>
    </Link>
  );
}
