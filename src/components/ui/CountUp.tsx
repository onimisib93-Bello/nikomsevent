"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = { to: number; duration?: number; format?: (n: number) => string; suffix?: string };

/** Counts from 0 to `to` with an ease-out curve the first time it is seen. */
export function CountUp({ to, duration = 1600, format = (n) => n.toLocaleString("en-NG"), suffix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">{format(reduce ? to : value)}{suffix}</span>
      <span className="sr-only">{format(to)}{suffix}</span>
    </span>
  );
}
