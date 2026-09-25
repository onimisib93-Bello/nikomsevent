"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

type Props = { children: ReactNode; className?: string; delay?: number; as?: "div" | "li" | "section" };

/** Fades and lifts its content once, when it scrolls into view. */
export function Reveal({ children, className, delay = 0 }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10% 0px" }} variants={item} transition={{ delay }}>
      {children}
    </motion.div>
  );
}

/** Staggers direct <RevealItem> children by 80ms. */
export function RevealGroup({ children, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Comp = as === "li" ? motion.ul : motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({ children, className, as = "div" }: Props) {
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp className={className} variants={item}>
      {children}
    </Comp>
  );
}
