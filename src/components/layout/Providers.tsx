"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Currency } from "@/lib/currency";
import { SmoothScroll } from "./SmoothScroll";
import { EnquiryModal } from "@/components/forms/EnquiryModal";

type SiteState = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  openEnquiry: (preset?: { occasion?: string; packageName?: string }) => void;
};

const SiteContext = createContext<SiteState | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <Providers>");
  return ctx;
}

const STORAGE_KEY = "nikoms:currency";

export function Providers({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("NGN");
  const [enquiry, setEnquiry] = useState<{ open: boolean; occasion?: string; packageName?: string }>({ open: false });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate the saved preference after mount
      if (saved === "USD" || saved === "NGN") setCurrencyState(saved);
    } catch {
      /* storage unavailable: keep the default */
    }
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      /* ignore */
    }
  }, []);

  const openEnquiry = useCallback((preset?: { occasion?: string; packageName?: string }) => setEnquiry({ open: true, ...preset }), []);
  const closeEnquiry = useCallback(() => setEnquiry((e) => ({ ...e, open: false })), []);

  const value = useMemo(() => ({ currency, setCurrency, openEnquiry }), [currency, setCurrency, openEnquiry]);

  return (
    <SiteContext.Provider value={value}>
      <SmoothScroll>
        {children}
        <EnquiryModal open={enquiry.open} onClose={closeEnquiry} occasion={enquiry.occasion} packageName={enquiry.packageName} />
      </SmoothScroll>
    </SiteContext.Provider>
  );
}
