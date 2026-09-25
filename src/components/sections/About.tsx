"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { media } from "@/content/media";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section id="about" className="scroll-mt-20 bg-paper py-[var(--spacing-section)]" aria-labelledby="about-title">
      <div className="container-page grid items-center gap-12 md:grid-cols-2 lg:gap-24">
        <div ref={ref} className="media-frame aspect-[4/5] rounded-[var(--radius-card)]">
          <motion.div className="absolute inset-[-10%_0]" style={{ y }}>
            <Image src={media.about.src} alt={media.about.alt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </motion.div>
        </div>
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 id="about-title" className="font-display text-headline text-balance">A mainland hall that takes the work off your hands.</h2>
          <div className="mt-8 max-w-[34rem] space-y-5 text-lg leading-relaxed text-stone">
            <p>
              Nikoms was built for the kind of celebration Lagos does best: the full guest list, the band, the second outfit, the dancing that runs past the programme.
            </p>
            <p>
              The hall is air-conditioned and already decorated. Power and water don&apos;t go off. There is a proper stage with lights and sound, rooms to change in, guarded parking, and a washing area so caterers stay out of sight.
            </p>
            <p>That leaves you to host.</p>
          </div>
          <ButtonLink href="/spaces/main-hall" variant="outline" arrow className="mt-10">See the Main Hall</ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
