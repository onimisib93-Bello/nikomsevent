"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSite } from "@/components/layout/Providers";
import { useLenis } from "@/components/layout/SmoothScroll";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Dropdown } from "@/components/ui/Dropdown";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { Reveal } from "@/components/ui/Reveal";
import { occasions } from "@/content/occasions";
import { packageFilters, packages, type EventPackage } from "@/content/packages";
import { formatPrice } from "@/lib/currency";

type FilterKey = keyof typeof packageFilters;
type Filters = Record<FilterKey, string[]>;

const empty: Filters = { occasion: [], space: [], guests: [], budget: [], day: [], coordinator: [] };
const labels: Record<FilterKey, string> = {
  occasion: "Occasion",
  guests: "Guests",
  space: "Space",
  budget: "Budget",
  day: "Day",
  coordinator: "Handled by",
};
const PAGE = 6;

const inRange = (n: number, ranges: string[]) =>
  ranges.some((r) => {
    const [min, max] = r.split("-").map(Number);
    return n >= min && n <= max;
  });

function matches(p: EventPackage, f: Filters) {
  return (
    (!f.occasion.length || p.occasions.some((o) => f.occasion.includes(o))) &&
    (!f.space.length || f.space.includes(p.space)) &&
    (!f.guests.length || inRange(p.guests, f.guests)) &&
    (!f.budget.length || inRange(p.price, f.budget)) &&
    (!f.day.length || f.day.includes(p.day)) &&
    (!f.coordinator.length || f.coordinator.includes(p.coordinator))
  );
}

export function PackageFinder() {
  const params = useSearchParams();
  const lenis = useLenis();
  const [filters, setFilters] = useState<Filters>(empty);
  const [draft, setDraft] = useState<Filters>(empty);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(PAGE);

  // Occasion tiles link here with ?occasion=…; apply it and bring the finder into view.
  const fromUrl = params.get("occasion");
  useEffect(() => {
    if (!fromUrl) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync filters from the URL
    setFilters({ ...empty, occasion: [fromUrl] });
    setShown(PAGE);
    const el = document.getElementById("plan");
    if (el) {
      if (lenis) lenis.scrollTo(el, { offset: -72 });
      else el.scrollIntoView({ behavior: "smooth" });
    }
  }, [fromUrl, lenis]);

  const results = useMemo(() => packages.filter((p) => matches(p, filters)), [filters]);
  const draftCount = useMemo(() => packages.filter((p) => matches(p, draft)).length, [draft]);
  const active = (Object.keys(filters) as FilterKey[]).flatMap((k) => filters[k].map((v) => ({ key: k, value: v })));

  const openPanel = () => {
    setDraft(filters);
    setOpen(true);
  };
  const apply = () => {
    setFilters(draft);
    setShown(PAGE);
    setOpen(false);
  };
  const remove = (key: FilterKey, value: string) => {
    setFilters((f) => ({ ...f, [key]: f[key].filter((v) => v !== value) }));
    setShown(PAGE);
  };
  const clearAll = () => {
    setFilters(empty);
    setShown(PAGE);
  };
  const labelFor = (key: FilterKey, value: string) => packageFilters[key].find((o) => o.value === value)?.label ?? value;

  return (
    <section id="plan" className="scroll-mt-20 bg-plum text-paper" aria-labelledby="plan-title">
      <div className="container-page py-[var(--spacing-section)]">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal>
            <h2 id="plan-title" className="font-display text-headline text-balance">Find a package that fits your guest list.</h2>
            <p className="mt-5 max-w-lg text-lg text-paper/75">Filter by occasion, size, day and budget. Every package can be adjusted with the events desk.</p>
          </Reveal>
          <dl className="grid grid-cols-3 gap-6 border-t border-paper/20 pt-6">
            <Counter label="Packages" value={packages.length} />
            <Counter label="Occasions" value={occasions.length} />
            <Counter label="Max guests" value={1000} />
          </dl>
        </div>

        {/* Search bar trigger */}
        <Reveal className="mt-14">
          <button
            type="button"
            onClick={openPanel}
            aria-haspopup="dialog"
            className="group flex min-h-16 w-full items-center gap-4 rounded-full bg-paper py-2 pl-6 pr-2 text-left text-ink transition-shadow hover:shadow-[0_12px_40px_rgb(0_0_0/0.25)]"
          >
            <Icon name="search" className="shrink-0 text-stone" />
            <span className="flex-1 truncate text-stone">
              {active.length ? `${active.length} filter${active.length > 1 ? "s" : ""} applied` : "Occasion, guests, space, day, budget"}
            </span>
            <span className="inline-flex min-h-12 items-center gap-2 rounded-full bg-plum px-5 font-medium text-paper transition-colors group-hover:bg-plum-deep">
              <Icon name="sliders" />
              <span className="hidden sm:inline">Filter packages</span>
            </span>
          </button>
        </Reveal>

        <div className="mt-6 flex min-h-10 flex-wrap items-center gap-2" aria-live="polite">
          <p className="mr-2 text-sm text-paper/70">
            Showing {Math.min(shown, results.length)} of {results.length} packages
          </p>
          {active.map(({ key, value }) => (
            <button
              key={`${key}-${value}`}
              type="button"
              onClick={() => remove(key, value)}
              className="inline-flex min-h-9 items-center gap-2 rounded-full border border-paper/30 px-3 text-sm transition-colors hover:bg-paper hover:text-plum"
              aria-label={`Remove filter ${labels[key]}: ${labelFor(key, value)}`}
            >
              {labelFor(key, value)}
              <Icon name="close" width={14} height={14} />
            </button>
          ))}
          {active.length > 0 && (
            <button type="button" onClick={clearAll} className="min-h-9 px-2 text-sm text-gold-soft underline-offset-4 hover:underline">
              Clear all
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="mt-10 rounded-sm border border-paper/20 p-10 text-center">
            <p className="font-display text-title">No package matches all of those filters.</p>
            <p className="mt-2 text-paper/70">Remove a filter, or tell the events desk what you need and they will build one.</p>
            <Button variant="gold" className="mt-6" onClick={clearAll}>Clear filters</Button>
          </div>
        ) : (
          <motion.ul layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false}>
              {results.slice(0, shown).map((p, i) => (
                <motion.li
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: (i % PAGE) * 0.06, ease: [0.22, 1, 0.36, 1] } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  <PackageCard pkg={p} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}

        {shown < results.length && (
          <div className="mt-12 flex justify-center">
            <Button variant="ghost-light" onClick={() => setShown((n) => n + PAGE)}>
              Load more packages
            </Button>
          </div>
        )}
        <p className="mt-10 text-sm text-paper/55">Sample packages and rates for layout. Confirm current pricing with the events desk.</p>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Filter packages" description="Choose as many options as you like in each list." size="lg">
        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          {(Object.keys(labels) as FilterKey[]).map((key) => (
            <Dropdown key={key} label={labels[key]} options={packageFilters[key]} value={draft[key]} onChange={(v) => setDraft((d) => ({ ...d, [key]: v }))} />
          ))}
        </div>
        <div className="sticky bottom-0 -mx-6 mt-10 flex items-center justify-between gap-4 border-t border-mist bg-paper px-6 pt-5 sm:-mx-8 sm:px-8">
          <button type="button" onClick={() => setDraft(empty)} className="min-h-11 text-sm font-medium underline underline-offset-4">
            Reset
          </button>
          <Button onClick={apply} disabled={draftCount === 0}>
            {draftCount === 0 ? "No matches" : `Show ${draftCount} package${draftCount > 1 ? "s" : ""}`}
          </Button>
        </div>
      </Modal>
    </section>
  );
}

function Counter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="text-sm text-paper/65">{label}</dt>
      <dd className="mt-1 font-display text-4xl md:text-5xl">
        <CountUp to={value} />
      </dd>
    </div>
  );
}

function PackageCard({ pkg }: { pkg: EventPackage }) {
  const { currency, openEnquiry } = useSite();
  return (
    <article className="flex h-full flex-col rounded-sm bg-paper p-6 text-ink transition-shadow duration-300 hover:shadow-[0_16px_48px_rgb(0_0_0/0.28)]">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl leading-tight">{pkg.name}</h3>
        <span className="shrink-0 rounded-full bg-chalk px-3 py-1 text-xs text-plum">{pkg.day}</span>
      </div>
      <p className="mt-2 flex items-center gap-2 text-sm text-stone">
        <Icon name="users" width={16} height={16} />
        Up to {pkg.guests.toLocaleString("en-NG")} guests in the {pkg.space}
      </p>
      <ul className="mt-5 space-y-1.5 text-[0.95rem]">
        {pkg.includes.map((inc) => (
          <li key={inc} className="flex gap-2">
            <Icon name="check" width={18} height={18} className="mt-0.5 shrink-0 text-gold" />
            {inc}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        <p>
          <span className="block text-xs text-stone">From</span>
          <span className="font-display text-2xl text-plum">{formatPrice(pkg.price, currency)}</span>
        </p>
        <button
          type="button"
          onClick={() => openEnquiry({ occasion: pkg.occasions[0], packageName: pkg.name })}
          className="min-h-11 rounded-full border border-ink/20 px-4 text-sm font-medium transition-colors hover:border-plum hover:bg-plum hover:text-paper"
        >
          Enquire
        </button>
      </div>
    </article>
  );
}
