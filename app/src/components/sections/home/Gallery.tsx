"use client";

import Image from "next/image";
import Link from "next/link";
import { galleryImages } from "@/content/gallery";
import { homeGalleryExtras } from "@/content/archive";
import { useLightbox, LightboxModal } from "@/components/ui/Lightbox";
import { glassChipDanza } from "@/lib/glass";

// DESIGN.md §20/§21. Uniform grid (not the earlier asymmetric masonry) of
// the 5 real captioned photos in content/gallery.ts, plus one honest
// "highlight reel coming soon" video tile — no real YouTube video exists
// yet (ARCHITECTURE.md §1: never fabricate one), so this is a disabled
// placeholder in the same visual system as the rest of the grid rather
// than an embedded/fake player, exactly like the inert audio control the
// old (deleted) MediaShowcase.tsx used. These same 5 photos already
// appear as small thumbnail crops elsewhere on Home (Hero,
// ServiceCategories, RepertoireGrid) — reused here at real gallery scale
// with a click-to-enlarge lightbox (prev/next, keyboard, click-outside-
// to-close) as the "real functionality" the client asked this section to
// have, since a plain static grid didn't feel different enough from a
// thumbnail crop. Links out to the existing, richer /gallery page. This
// is the #gallery scroll target for Hero's "View Gallery" CTA.
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

export function Gallery() {
  const { openIndex, open: openAt, close, next, prev } = useLightbox(homeGalleryImages);

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
          <div
            aria-label="Highlight reel video — coming soon"
            className="group relative rounded-2xl overflow-hidden aspect-square cursor-not-allowed"
          >
            <Image
              src={galleryImages[0].src}
              alt=""
              aria-hidden="true"
              fill
              className="object-cover opacity-30"
              sizes="(min-width: 640px) 33vw, 50vw"
            />
            <div className="absolute inset-0 bg-surface-stage/70" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-4">
              {/* TODO.md Phase 6.2 (2026-09-22): was `play_arrow` — a
                  disabled tile with a play-button icon reads as a broken
                  video player, not an honest "not available yet" state.
                  `schedule` reads as pending/upcoming instead. */}
              <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-on-surface-danza/15 border border-on-surface-danza/30">
                <span className="material-symbols-outlined text-[26px] sm:text-[30px] text-on-surface-danza" aria-hidden="true">
                  schedule
                </span>
              </span>
              <span className="font-sans text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-on-surface-danza-muted">
                Highlight Reel
                <br />
                Coming Soon
              </span>
            </div>
          </div>

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

      <LightboxModal images={homeGalleryImages} openIndex={openIndex} onClose={close} onNext={next} onPrev={prev} />
    </section>
  );
}
