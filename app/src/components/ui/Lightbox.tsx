"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useFocusTrap } from "@/components/ui/useFocusTrap";

// TODO.md Phase 7 (2026-09-22). Extracted from home/Gallery.tsx, which had
// the site's only real click-to-enlarge lightbox (keyboard nav, focus
// trap, body-scroll lock, click-outside-to-close) — the *dedicated*
// /gallery page (gallery/RepertoireActs.tsx) rendered its 5 act images as
// plain static <Image>s with no enlarge behavior at all, and
// about/LivingArchive.tsx showed an `open_in_full` icon that promised a
// zoom which never happened (its tiles just navigated to /gallery
// instead). Same underlying 5 real photos in all 3 places — this is
// extraction, not new functionality, and fixes the focus-trap gap (3.1)
// once instead of three times.
export type LightboxImage = { src: string; alt: string; caption: string };

// Owns which index is open (or null) plus prev/next wraparound — every
// consumer just needs a click handler that calls `open(i)`.
export function useLightbox(images: LightboxImage[]) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => setOpenIndex(index), []);
  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length],
  );
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length],
  );

  return { openIndex, open, close, next, prev };
}

// The dialog itself — keyboard nav (Escape/←/→), body-scroll lock while
// open, and a focus trap (moves focus in on open, traps Tab, restores
// focus to whatever triggered it on close) via the shared useFocusTrap
// hook, same as BookingModal.tsx's dialog.
export function LightboxModal({
  images,
  openIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: LightboxImage[];
  openIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = openIndex !== null ? images[openIndex] : null;

  useEffect(() => {
    if (openIndex === null) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, onClose, onNext, onPrev]);

  useFocusTrap(dialogRef, open !== null);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={open.caption}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      {/* DESIGN.md §32 — Glass Chip, theme-neutral variant: this component
          is shared across both Danza and Nocturne pages and carries no
          page-specific tokens by design, so it gets its own white/black
          formula rather than glass.ts's Danza/Nocturne constants — same
          tier-2 principle (light blur + thin border, no bokeh), just
          scoped to this component's existing black-backdrop palette. Was
          a flat bg-white/10 with no blur or border. */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 h-11 w-11 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/20 text-white transition-colors"
      >
        <span className="material-symbols-outlined text-[22px]" aria-hidden="true">close</span>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous photo"
        className="absolute left-2 sm:left-6 h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/20 text-white transition-colors"
      >
        <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
          chevron_left
        </span>
      </button>

      <div
        className="flex flex-col items-center gap-3 w-full max-w-4xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={open.src}
            alt={open.alt}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>
        <p className="text-center font-sans text-sm text-white/80">
          {open.caption} &middot; {(openIndex ?? 0) + 1} / {images.length}
        </p>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next photo"
        className="absolute right-2 sm:right-6 h-11 w-11 sm:h-12 sm:w-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/20 text-white transition-colors"
      >
        <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
          chevron_right
        </span>
      </button>
    </div>
  );
}
