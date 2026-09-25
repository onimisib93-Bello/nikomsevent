"use client";

import { useSite } from "@/components/layout/Providers";
import { Icon } from "@/components/ui/Icon";

export function OccasionCta() {
  const { openEnquiry } = useSite();
  return (
    <button
      type="button"
      onClick={() => openEnquiry()}
      className="group flex h-full min-h-40 w-full flex-col justify-between rounded-[var(--radius-card)] bg-plum p-6 text-left text-paper transition-colors hover:bg-plum-deep"
    >
      <span className="font-display text-2xl md:text-3xl">Planning something else?</span>
      <span className="mt-6 inline-flex items-center gap-2 font-medium text-gold-soft">
        Tell us about it
        <Icon name="arrowRight" className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </button>
  );
}
