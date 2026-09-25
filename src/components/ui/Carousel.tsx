"use client";

import { useState, type ReactNode } from "react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide, type SwiperProps } from "swiper/react";
import { Icon } from "./Icon";

type Props<T> = {
  items: T[];
  render: (item: T, index: number) => ReactNode;
  label: string;
  /** Slides visible at each breakpoint. */
  perView?: { base: number; sm?: number; lg?: number; xl?: number };
  tone?: "light" | "dark";
  /** Slot rendered to the left of the controls (e.g. a "See all" link). */
  aside?: ReactNode;
  swiper?: SwiperProps;
};

/**
 * Drag/swipe carousel with arrow buttons, keyboard arrows and pagination
 * dots. Wraps Swiper so every slider on the site shares controls.
 */
export function Carousel<T>({ items, render, label, perView = { base: 1.1, sm: 2.1, lg: 3 }, tone = "light", aside, swiper: extra }: Props<T>) {
  const [api, setApi] = useState<SwiperType | null>(null);
  const [state, setState] = useState({ index: 0, snaps: 1, begin: true, end: false });

  const sync = (s: SwiperType) =>
    setState({ index: s.snapIndex, snaps: s.snapGrid.length, begin: s.isBeginning, end: s.isEnd });

  const btn =
    tone === "dark"
      ? "border-paper/30 text-paper hover:bg-paper hover:text-plum-deep"
      : "border-ink/20 text-ink hover:bg-ink hover:text-paper";

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <Swiper
        modules={[Keyboard, A11y]}
        keyboard={{ enabled: true, onlyInViewport: true }}
        a11y={{ enabled: true }}
        grabCursor
        spaceBetween={20}
        slidesPerView={perView.base}
        breakpoints={{
          640: { slidesPerView: perView.sm ?? perView.base, spaceBetween: 24 },
          1024: { slidesPerView: perView.lg ?? perView.sm ?? perView.base, spaceBetween: 28 },
          1400: { slidesPerView: perView.xl ?? perView.lg ?? perView.sm ?? perView.base, spaceBetween: 32 },
        }}
        onSwiper={(s) => {
          setApi(s);
          sync(s);
        }}
        onSlideChange={sync}
        onResize={sync}
        onReachEnd={sync}
        onReachBeginning={sync}
        className="!overflow-visible"
        {...extra}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i} className="!h-auto">
            {render(item, i)}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-10 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2" role="group" aria-label="Choose slide">
          {Array.from({ length: state.snaps }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={state.index === i}
              onClick={() => api?.slideTo(i)}
              className="grid h-6 place-items-center"
            >
              <span
                className={`block h-px transition-all duration-500 ease-out-soft ${state.index === i ? "w-10 bg-current" : "w-5 bg-current/30"}`}
              />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-6">
          {aside}
          <div className="flex gap-2">
            <button type="button" onClick={() => api?.slidePrev()} disabled={state.begin} aria-label="Previous slide" className={`grid size-12 place-items-center rounded-full border transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current ${btn}`}>
              <Icon name="arrowLeft" />
            </button>
            <button type="button" onClick={() => api?.slideNext()} disabled={state.end} aria-label="Next slide" className={`grid size-12 place-items-center rounded-full border transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current ${btn}`}>
              <Icon name="arrowRight" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
