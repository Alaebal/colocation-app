"use client";

import { useState, useRef } from "react";
import Image from "next/image";

type PhotoCarouselProps = {
  images: string[];
  alt: string;
};

export default function PhotoCarousel({ images, alt }: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(0);

  if (images.length === 0) {
    return (
      <div className="mb-6 h-72 rounded-[2rem] bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-500 md:h-96" />
    );
  }

  function suivant() {
    setIndex((i) => (i + 1) % images.length);
  }

  function precedent() {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) suivant();
    if (diff < -50) precedent();
  }

  return (
    <div className="mb-6">
      <div
        className="relative h-72 overflow-hidden rounded-[2rem] bg-neutral-200 md:h-96"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[index]}
          alt={`${alt} ${index + 1}`}
          fill
          className="object-cover"
          priority
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={precedent}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
              aria-label="Photo précédente"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={suivant}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
              aria-label="Photo suivante"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
              {index + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => setIndex(i)}
              className={`relative h-16 overflow-hidden rounded-xl border-2 transition ${
                i === index ? "border-[var(--olive-800)]" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={url} alt={`Miniature ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}