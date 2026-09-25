"use client";

import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "@/components/layout/SmoothScroll";
import { Icon } from "./Icon";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  /** Wider panel for filters and galleries. */
  size?: "md" | "lg" | "xl";
  /** Render the panel full-bleed and dark (lightbox). */
  tone?: "light" | "dark";
};

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';

/**
 * Accessible dialog. Centered panel on desktop; a bottom sheet with a drag
 * handle below 640px. Closes on Escape, backdrop click, or dragging down.
 */
export function Modal({ open, onClose, title, description, children, size = "md", tone = "light" }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const titleId = useId();
  const descId = useId();
  // Latest callbacks in refs so parent re-renders don't re-run the open effect
  // (which would steal focus back to the first field).
  const onCloseRef = useRef(onClose);
  const lenisRef = useRef(lenis);
  useEffect(() => {
    onCloseRef.current = onClose;
    lenisRef.current = lenis;
  });

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    lenisRef.current?.stop();
    document.documentElement.style.overflow = "hidden";

    const focusFirst = () => {
      const el = panelRef.current?.querySelector<HTMLElement>("[data-autofocus]") ?? panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      el?.focus();
    };
    const t = window.setTimeout(focusFirst, 30);

    const onKey = (e: KeyboardEvent) => {
      // Nested widgets (dropdowns) mark Escape as handled to close themselves only.
      if (e.key === "Escape" && !e.defaultPrevented) onCloseRef.current();
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.offsetParent !== null);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenisRef.current?.start();
      previouslyFocused?.focus?.();
    };
  }, [open]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 600) onClose();
  };

  const width = { md: "sm:max-w-xl", lg: "sm:max-w-3xl", xl: "sm:max-w-6xl" }[size];
  const palette = tone === "dark" ? "bg-plum-deep text-paper" : "bg-paper text-ink";

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            className="absolute inset-0 bg-plum-deep/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descId : undefined}
            data-lenis-prevent
            className={`relative flex max-h-[92dvh] w-full flex-col rounded-t-2xl shadow-2xl sm:max-h-[88dvh] sm:rounded-sm ${width} ${palette}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Drag handle: mobile bottom-sheet only */}
            <motion.div
              className="flex cursor-grab touch-none justify-center pb-1 pt-3 active:cursor-grabbing sm:hidden"
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={onDragEnd}
              aria-hidden="true"
            >
              <span className="h-1 w-10 rounded-full bg-current opacity-25" />
            </motion.div>
            <header className="flex items-start justify-between gap-6 px-6 pb-4 pt-3 sm:px-8 sm:pt-7">
              <div>
                <h2 id={titleId} className="font-display text-title">{title}</h2>
                {description && <p id={descId} className="mt-1 text-sm opacity-70">{description}</p>}
              </div>
              <button type="button" onClick={onClose} className="-mr-2 grid size-11 shrink-0 place-items-center rounded-full transition-colors hover:bg-current/10" aria-label="Close">
                <Icon name="close" />
              </button>
            </header>
            <div className="overflow-y-auto overscroll-contain px-6 pb-8 sm:px-8">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
