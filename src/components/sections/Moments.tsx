"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { moments } from "@/content/people";

/** Continuous right-to-left ticker of example hall set-ups. Pauses on hover. */
export function Moments() {
  const reduce = useReducedMotion();
  const loop = [...moments, ...moments];
  return (
    <section className="overflow-hidden bg-plum-deep py-[var(--spacing-section)] text-paper" aria-labelledby="moments-title">
      <div className="container-page mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h2 id="moments-title" className="font-display text-headline">One hall, many set-ups</h2>
        <p className="max-w-sm text-paper/70">Same room, very different nights. Hover to pause.</p>
      </div>
      <Swiper
        className="ticker"
        modules={[Autoplay, FreeMode]}
        loop
        freeMode={{ enabled: true, momentum: false }}
        speed={reduce ? 0 : 6000}
        autoplay={reduce ? false : { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
        slidesPerView={1.3}
        spaceBetween={20}
        breakpoints={{ 640: { slidesPerView: 2.3 }, 1024: { slidesPerView: 3.3, spaceBetween: 28 }, 1400: { slidesPerView: 4.3 } }}
        allowTouchMove
      >
        {loop.map((m, i) => (
          <SwiperSlide key={i} aria-hidden={i >= moments.length || undefined}>
            <article className="group">
              <div className="media-frame aspect-[4/3] rounded-[var(--radius-card)]">
                <Image src={m.image.src} alt={i >= moments.length ? "" : m.image.alt} fill sizes="(min-width: 1024px) 25vw, 75vw" className="object-cover" />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-paper/15 pb-4">
                <h3 className="font-display text-2xl">{m.title}</h3>
                <p className="shrink-0 text-sm text-gold-soft">{m.guests}</p>
              </div>
              <p className="mt-2 text-sm text-paper/60">{m.setup}</p>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
