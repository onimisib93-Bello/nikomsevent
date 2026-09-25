"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { useSite } from "@/components/layout/Providers";
import { Button, ButtonLink } from "@/components/ui/Button";
import { heroVideo, media } from "@/content/media";
import { site } from "@/content/site";

const lines = [["Where", "Yaba"], ["comes", "to"], ["celebrate."]];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { openEnquiry } = useSite();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, reduce ? 1.08 : 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  let word = 0;

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-plum-deep text-paper" aria-labelledby="hero-title">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        {heroVideo ? (
          <video className="size-full object-cover" src={heroVideo} poster={media.hero.src} autoPlay muted loop playsInline aria-hidden="true" />
        ) : (
          <Image src={media.hero.src} alt={media.hero.alt} fill preload sizes="100vw" quality={75} className="object-cover" />
        )}
      </motion.div>
      {/* Legibility wash: heavier at the bottom where the type sits */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(40_16_42/0.55)_0%,rgb(40_16_42/0.15)_35%,rgb(40_16_42/0.85)_100%)]" aria-hidden="true" />

      <motion.div style={{ opacity: fade }} className="container-page relative flex flex-1 flex-col justify-end pb-10 pt-36 md:pb-14">
        <h1 id="hero-title" className="font-display text-display max-w-[14ch]">
          {lines.map((line, li) => (
            <span key={li} className="block">
              {line.map((w) => {
                const i = word++;
                return (
                  <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={reduce ? false : { y: "105%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1.1, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {w}
                    </motion.span>
                    {" "}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-end"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="max-w-md text-lg text-paper/85">{site.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button variant="gold" arrow onClick={() => openEnquiry()}>Check your date</Button>
              <ButtonLink variant="ghost-light" href="/spaces/main-hall">Tour the hall</ButtonLink>
            </div>
          </div>
          <NewsletterForm label="Get open dates and rates by email" cta="Send" />
        </motion.div>
      </motion.div>
    </section>
  );
}
