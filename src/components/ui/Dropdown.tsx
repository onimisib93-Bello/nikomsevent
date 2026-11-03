"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "./Icon";

export type Option = { value: string; label: string };

type Props = {
  label: string;
  options: readonly Option[];
  value: string[];
  onChange: (value: string[]) => void;
  /** Single-select closes on pick and holds at most one value. */
  multiple?: boolean;
  placeholder?: string;
};

/**
 * Custom listbox with checkbox multi-select and full keyboard support.
 * The list opens in-flow (pushing content down) so it is never clipped
 * inside scrolling modals and bottom sheets.
 */
export function Dropdown({ label, options, value, onChange, multiple = true, placeholder = "Any" }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    list.current?.focus();
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const toggle = (v: string) => {
    if (!multiple) {
      onChange(value[0] === v ? [] : [v]);
      setOpen(false);
      return;
    }
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  };

  const onListKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(options.length - 1);
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle(options[active].value);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      button.current?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  const summary =
    value.length === 0
      ? placeholder
      : value.length === 1
        ? options.find((o) => o.value === value[0])?.label
        : `${value.length} selected`;

  return (
    <div ref={root} className="relative">
      <span id={`${id}-label`} className="mb-1.5 block text-sm text-stone">{label}</span>
      <button
        ref={button}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-button`}
        id={`${id}-button`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={`flex min-h-12 w-full items-center justify-between gap-3 border-b bg-transparent py-2 text-left transition-colors ${open ? "border-plum" : "border-ink/20 hover:border-ink/60"}`}
      >
        <span className={value.length ? "text-ink" : "text-stone"}>{summary}</span>
        <Icon name="chevronDown" className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            ref={list}
            role="listbox"
            aria-multiselectable={multiple || undefined}
            aria-labelledby={`${id}-label`}
            aria-activedescendant={`${id}-opt-${active}`}
            tabIndex={-1}
            onKeyDown={onListKey}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 overflow-hidden rounded-sm border border-mist bg-paper py-1.5 outline-none"
            data-lenis-prevent
          >
            {options.map((o, i) => {
              const selected = value.includes(o.value);
              return (
                <li
                  key={o.value}
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={selected}
                  onPointerEnter={() => setActive(i)}
                  onClick={() => toggle(o.value)}
                  className={`flex min-h-11 cursor-pointer items-center gap-3 px-4 text-[0.95rem] ${i === active ? "bg-chalk" : ""}`}
                >
                  <span
                    aria-hidden="true"
                    className={`grid size-5 shrink-0 place-items-center border transition-colors ${multiple ? "rounded-[3px]" : "rounded-full"} ${selected ? "border-plum bg-plum text-paper" : "border-ink/30"}`}
                  >
                    {selected && <Icon name="check" width={14} height={14} strokeWidth={2} />}
                  </span>
                  {o.label}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
