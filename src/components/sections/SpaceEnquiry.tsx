"use client";

import { useSite } from "@/components/layout/Providers";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/currency";

export function SpaceEnquiry({ name, fromPrice }: { name: string; fromPrice: number }) {
  const { currency, openEnquiry } = useSite();
  return (
    <div className="mt-10 rounded-sm bg-chalk p-6">
      <p className="text-sm text-stone">{fromPrice ? "From (sample rate)" : "Included"}</p>
      <p className="font-display text-3xl text-plum">{fromPrice ? formatPrice(fromPrice, currency) : "With every booking"}</p>
      <Button className="mt-5 w-full" arrow onClick={() => openEnquiry({ packageName: name })}>Check a date for this space</Button>
    </div>
  );
}
