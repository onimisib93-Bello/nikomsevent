"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { chapters, site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { useSite } from "./Providers";
import type { Currency } from "@/lib/currency";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { openEnquiry } = useSite();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- close the menu after navigating
  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    const onPointer = (e: PointerEvent) => !menuRef.current?.contains(e.target as Node) && setMenu(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menu]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-paper focus:px-4 focus:py-2">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-ivory transition-[background-color,border-color] duration-500 ease-out-soft ${
          scrolled ? "border-b border-ivory/[0.06] bg-night/55 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
          <Link href="/" className="relative z-10 flex items-center gap-2.5" aria-label={`${site.name}, home`}>
            <Image src="/brand/logo-round.png" alt="" width={44} height={44} preload className="size-9 md:size-11" />
            <span className="flex flex-col leading-none max-[380px]:hidden">
              <span className="font-display text-[1.6rem] italic tracking-tight">Nikoms</span>
              <span className="mt-0.5 text-[0.62rem] uppercase tracking-[0.2em] opacity-70">Events Centre</span>
            </span>
          </Link>

          <div className="relative z-10 flex items-center gap-3">
            <CurrencySwitch className="hidden sm:flex" />
            <button
              type="button"
              onClick={() => openEnquiry()}
              className="inline-flex min-h-10 items-center rounded-full bg-gold-soft px-4 text-sm font-medium text-night transition-colors hover:bg-ivory sm:min-h-11 sm:px-5"
            >
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Check a date</span>
            </button>
          </div>
        </div>

        {/* The glass "notch": a top-centre Explore menu, on every screen size */}
        <div ref={menuRef} className="absolute left-1/2 top-0 -translate-x-1/2">
          <button
            type="button"
            onClick={() => setMenu((m) => !m)}
            aria-expanded={menu}
            aria-controls="explore-menu"
            className="flex h-11 items-center gap-2 rounded-b-[1.4rem] border border-t-0 border-ivory/15 bg-night/40 px-5 text-sm backdrop-blur-xl backdrop-saturate-150 transition-colors hover:bg-night/60 md:h-14 md:px-8"
          >
            Explore
            <Icon name="chevronDown" width={16} height={16} className={`transition-transform duration-300 ${menu ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {menu && (
              <motion.div
                id="explore-menu"
                initial={{ opacity: 0, y: -12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 top-[calc(100%+0.75rem)] max-h-[80svh] w-[min(92vw,34rem)] -translate-x-1/2 origin-top overflow-y-auto rounded-2xl border border-ivory/12 bg-night-soft/[0.97] p-6 text-ivory shadow-2xl shadow-black/50"
                data-lenis-prevent
              >
                <div className="grid gap-8 sm:grid-cols-[1.3fr_1fr]">
                  <nav aria-label="Story chapters">
                    <p className="mb-3 text-[0.65rem] uppercase tracking-[0.22em] text-gold-soft">The story</p>
                    <ol className="space-y-1">
                      {chapters.map((c, i) => (
                        <li key={c.id}>
                          <Link href={`/#${c.id}`} onClick={() => setMenu(false)} className="group flex items-baseline gap-3 py-1">
                            <span className="w-6 text-xs tabular-nums text-ivory/45">{String(i + 1).padStart(2, "0")}</span>
                            <span className="font-head text-lg font-light transition-colors group-hover:text-gold-soft">{c.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </nav>
                  <div className="flex flex-col gap-6">
                    <nav aria-label="Main">
                      <p className="mb-3 text-[0.65rem] uppercase tracking-[0.22em] text-gold-soft">Plan</p>
                      <ul className="space-y-1">
                        {site.nav.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} onClick={() => setMenu(false)} className="block py-1 text-ivory/85 transition-colors hover:text-gold-soft">
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                    <CurrencySwitch className="flex w-fit sm:hidden" />
                    <p className="mt-auto text-xs leading-relaxed text-ivory/55">
                      {site.address.line1}, {site.address.line2}
                      <br />
                      {site.hours}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}

function CurrencySwitch({ className = "" }: { className?: string }) {
  const { currency, setCurrency } = useSite();
  const options: { value: Currency; label: string }[] = [
    { value: "NGN", label: "₦ NGN" },
    { value: "USD", label: "$ USD" },
  ];
  return (
    <div role="radiogroup" aria-label="Currency for prices" className={`items-center rounded-full border border-current/25 p-0.5 text-xs ${className || "flex"}`}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={currency === o.value}
          onClick={() => setCurrency(o.value)}
          className={`min-h-9 rounded-full px-3 transition-colors ${currency === o.value ? "bg-current/15 font-semibold" : "opacity-70 hover:opacity-100"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
