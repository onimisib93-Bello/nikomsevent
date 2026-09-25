"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { useSite } from "./Providers";
import { useLenis } from "./SmoothScroll";
import type { Currency } from "@/lib/currency";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { openEnquiry } = useSite();
  const lenis = useLenis();
  const pathname = usePathname();

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
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [menu, lenis]);

  const solid = scrolled && !menu;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-paper focus:px-4 focus:py-2">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color,height] duration-500 ease-out-soft ${
          solid ? "bg-paper/85 text-ink shadow-[0_1px_0_rgb(29_22_32/0.08)] backdrop-blur-md" : "bg-transparent text-paper"
        }`}
      >
        <div className={`container-page flex items-center justify-between gap-6 transition-[height] duration-500 ${solid ? "h-16" : "h-20 md:h-24"}`}>
          <Link href="/" className="relative z-10 flex flex-col leading-none" aria-label={`${site.name}, home`}>
            {/* Text wordmark until the logo file is supplied (drop it in /public/brand). */}
            <span className="font-display text-[1.7rem] tracking-tight">Nikoms</span>
            <span className="mt-0.5 text-[0.7rem] tracking-[0.08em] opacity-75">Events Centre, Yaba</span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9 text-[0.95rem]">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="relative py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <CurrencySwitch className="hidden sm:flex" />
            <button
              type="button"
              onClick={() => openEnquiry()}
              className={`hidden min-h-11 items-center rounded-full px-5 text-sm font-medium transition-colors md:inline-flex ${
                solid ? "bg-plum text-paper hover:bg-plum-deep" : "bg-paper text-plum-deep hover:bg-gold-soft"
              }`}
            >
              Check a date
            </button>
            <button
              type="button"
              onClick={() => setMenu((m) => !m)}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              aria-label={menu ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-full lg:hidden"
            >
              <Icon name={menu ? "close" : "menu"} width={24} height={24} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-plum-deep px-[var(--spacing-gutter)] pb-10 pt-28 text-paper lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            <nav aria-label="Mobile">
              <motion.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }}>
                {site.nav.map((item) => (
                  <motion.li key={item.href} className="overflow-hidden" variants={{ hidden: { y: "100%", opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}>
                    <Link href={item.href} onClick={() => setMenu(false)} className="block py-2 font-display text-5xl sm:text-6xl">
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>
            <motion.div className="mt-auto flex flex-col gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.6 } }}>
              <CurrencySwitch />
              <button type="button" onClick={() => { setMenu(false); openEnquiry(); }} className="min-h-12 rounded-full bg-gold font-medium text-plum-deep">
                Check a date
              </button>
              <p className="text-sm text-paper/60">{site.address.line1}, {site.address.line2}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
