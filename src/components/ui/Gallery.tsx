"use client";

import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Keyboard, Navigation, Thumbs, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/zoom";
import type { Media } from "@/content/media";
import { Icon } from "./Icon";
import { Modal } from "./Modal";

/**
 * Photo grid that opens a lightbox: swipe between photos, pinch or
 * double-tap to zoom on touch, click to zoom on desktop, thumbnail strip.
 */
export function Gallery({ images, title }: { images: Media[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(0);
  const [thumbs, setThumbs] = useState<SwiperType | null>(null);
  const [main, setMain] = useState<SwiperType | null>(null);

  const show = (i: number) => {
    setStart(i);
    setOpen(true);
  };

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {images.map((img, i) => (
          <li key={i} className={i === 0 ? "col-span-2 row-span-2" : ""}>
            <button type="button" onClick={() => show(i)} className="group block size-full" aria-label={`Open photo ${i + 1} of ${images.length}: ${img.alt}`}>
              <div className={`media-frame rounded-[var(--radius-card)] ${i === 0 ? "aspect-square" : "aspect-[4/3] md:aspect-square"}`}>
                <Image src={img.src} alt={img.alt} fill sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"} className="object-cover" />
              </div>
            </button>
          </li>
        ))}
      </ul>

      <Modal open={open} onClose={() => setOpen(false)} title={title} description="Swipe or use arrow keys. Double-click or pinch to zoom." size="xl" tone="dark">
        <div className="relative">
          <Swiper
            modules={[Zoom, Thumbs, Keyboard, A11y, Navigation]}
            initialSlide={start}
            zoom={{ maxRatio: 3 }}
            keyboard={{ enabled: true }}
            thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
            onSwiper={setMain}
            spaceBetween={16}
            className="h-[52dvh] w-full sm:h-[60dvh]"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="swiper-zoom-container size-full">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 70vw, 100vw" className="!object-contain text-transparent" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button type="button" onClick={() => main?.slidePrev()} aria-label="Previous photo" className="absolute left-3 top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-plum-deep sm:grid">
            <Icon name="arrowLeft" />
          </button>
          <button type="button" onClick={() => main?.slideNext()} aria-label="Next photo" className="absolute right-3 top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-plum-deep sm:grid">
            <Icon name="arrowRight" />
          </button>
        </div>
        <Swiper modules={[Thumbs]} onSwiper={setThumbs} watchSlidesProgress slidesPerView={4.5} spaceBetween={10} breakpoints={{ 640: { slidesPerView: 6 } }} className="mt-4 [&_.swiper-slide-thumb-active]:opacity-100">
          {images.map((img, i) => (
            <SwiperSlide key={i} className="cursor-pointer opacity-50 transition-opacity">
              <div className="media-frame aspect-[4/3]">
                <Image src={img.src} alt="" fill sizes="120px" className="object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Modal>
    </>
  );
}
