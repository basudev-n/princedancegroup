"use client";

import Image from "next/image";
import Link from "next/link";
import { galleryImages } from "@/content/gallery";
import { homeGalleryExtras } from "@/content/archive";
import { videos } from "@/content/videos";
import { VideoModal } from "@/components/ui/VideoModal";
import { useState } from "react";
import { useLightbox, LightboxModal } from "@/components/ui/Lightbox";
import { glassChipDanza } from "@/lib/glass";

// DESIGN.md §20/§21. Uniform grid of the real captioned photos, plus a
// video tile that plays the client's India's Got Talent grand-final
// performance in a modal (2026-09-25 — this tile was a disabled "Highlight
// Reel — Coming Soon" placeholder until real videos were supplied; see
// content/videos.ts). Every photo opens a click-to-enlarge lightbox (prev/
// next, keyboard, click-outside-to-close). Links out to the richer /gallery
// page. This is the #gallery scroll target for Hero's "View Gallery" CTA.
//
// TODO.md Phase 7 (2026-09-22): the lightbox itself (open/close/prev/next
// state, keyboard nav, focus trap, body-scroll lock) is now the shared
// components/ui/Lightbox.tsx — this was the only page with real
// click-to-enlarge behavior; see that file's header comment for the two
// other real gaps it fixes.
// 2026-09-25: the grid = the 5 original photos + 3 from the client's photo
// archive ("Live Shows" / "Performance Gallery Grid" picks), so 8 photos +
// the video tile fill three full rows on desktop.
const homeGalleryImages = [...galleryImages, ...homeGalleryExtras];
const featuredVideo = videos[0];

export function Gallery() {
  const { openIndex, open: openAt, close, next, prev } = useLightbox(homeGalleryImages);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section id="gallery" className="w-full bg-surface-stage py-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-danza-gold">
              On Stage
            </span>
            <h2
              style={{ fontFamily: "var(--font-headline-danza)" }}
              className="mt-1 text-3xl sm:text-4xl font-bold text-on-surface-danza"
            >
              A Glimpse of Our Performances
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-danza-gold hover:text-danza-crimson transition-colors whitespace-nowrap"
          >
            View Full Gallery
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              arrow_outward
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {/* 2026-09-25: was a disabled "Highlight Reel — Coming Soon"
              placeholder (no video existed). Now plays the client's
              India's Got Talent grand-final performance in a modal. */}
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            aria-label={`Play video: ${featuredVideo.title}, ${featuredVideo.stage}`}
            className="group relative rounded-2xl overflow-hidden aspect-square text-left"
          >
            <Image
              src={featuredVideo.poster}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 640px) 33vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className={`flex h-14 w-14 items-center justify-center rounded-full ${glassChipDanza} border-white/25 transition-transform duration-300 group-hover:scale-110`}>
                <span className="material-symbols-outlined text-[30px] text-white" aria-hidden="true">
                  play_arrow
                </span>
              </span>
            </span>
            <span className="absolute bottom-3 left-3 right-3 font-sans text-xs font-semibold text-white">
              Watch: {featuredVideo.title} &middot; {featuredVideo.stage}
            </span>
          </button>

          {homeGalleryImages.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => openAt(i)}
              aria-label={`Enlarge photo: ${image.caption}`}
              className="group relative rounded-2xl overflow-hidden aspect-square text-left"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 640px) 33vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              {/* TODO.md Phase 3.1: opacity-0 group-hover:opacity-100 alone
                  means a touch visitor never sees this "this enlarges" cue,
                  since there's no hover state to reveal it — always visible
                  below `sm:` (touch-primary widths), hover-reveal preserved
                  from `sm:` up. */}
              {/* DESIGN.md §32 — Glass Chip (Danza): was flat bg-black/40
                  with no blur. */}
              <span className={`absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full ${glassChipDanza} opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity`}>
                <span className="material-symbols-outlined text-[16px] text-white" aria-hidden="true">
                  zoom_in
                </span>
              </span>
              <span className="absolute bottom-3 left-3 right-3 font-sans text-xs font-semibold text-white">
                {image.caption}
              </span>
            </button>
          ))}
        </div>
      </div>

      <VideoModal video={videoOpen ? featuredVideo : null} onClose={() => setVideoOpen(false)} />
      <LightboxModal images={homeGalleryImages} openIndex={openIndex} onClose={close} onNext={next} onPrev={prev} />
    </section>
  );
}
