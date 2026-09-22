"use client";

import Image from "next/image";
import Link from "next/link";
import { repertoire } from "@/content/home";
import { galleryImages } from "@/content/gallery";
import { useLightbox, LightboxModal } from "@/components/ui/Lightbox";
import { glassChipNocturne } from "@/lib/glass";

// DESIGN.md §14.3 row 10, revised in the About UI/UX pass (2026-09-20,
// DESIGN.md §28). All named pieces are real/thematically-grounded
// repertoire (DESIGN.md §8; Shiva Tandava already established
// consistently on Home) — real performance photos, not placeholders.
//
// §28: the UX audit found these tiles had a hover-zoom affordance
// (`group-hover:scale-105`) that visually signals "clickable" with no
// actual destination — a real affordance-mismatch bug, not just a missed
// opportunity. Also pulled in the two real gallery photos
// (`performance-4.jpg`, `performance-5.jpg`) that sat completely unused
// in `content/gallery.ts`, giving this section an asymmetric bento layout
// (one large featured tile + four smaller ones) instead of three
// identically-sized tiles — differentiates it from the equal-grid rhythm
// Pillars/Testimonials already use elsewhere on this page.
//
// TODO.md Phase 7 (2026-09-22): tiles used to be `<Link href="/gallery">`
// — real navigation, but the `open_in_full` icon overlaid on each one
// visually promises an in-place zoom, which never happened (the §28 fix
// above addressed *a* mismatch — hover-zoom implying clickability — but
// left this second, more literal one: the icon's own meaning wasn't
// delivered either). Now real: each tile opens the shared
// components/ui/Lightbox.tsx instead of navigating away. The section's
// own header still has an explicit "View Full Gallery" link (below) for
// visitors who want to leave this page, so no navigation path is lost.
//
// TODO.md Phase 4.1: title/subtitle/image now come from content/home.ts's
// canonical `repertoire` instead of a local, independently-drifting copy
// — this file used to spell the second act "Krishna Ras Leela" (every
// other page uses "Krishna Leela & Divine Ras") and captioned the two
// gallery photos it borrowed as generic "Live Stage Performance" rather
// than the named acts /gallery already assigns them to (Surya Namaskar,
// Vande Mataram) — both fixed by reading the one shared list.
const bySlug = (slug: string) =>
  repertoire.find((a) => a.slug === slug) ?? repertoire[0];

const featured = bySlug("dashavatar");

const pieces = [
  bySlug("shiva-tandava"),
  bySlug("krishna-leela"),
  bySlug("surya-namaskar"),
  bySlug("vande-mataram"),
];

function Tile({
  title,
  tagline,
  image,
  imageAlt,
  className = "",
  sizes,
  onEnlarge,
}: {
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
  className?: string;
  sizes: string;
  onEnlarge: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onEnlarge}
      aria-label={`Enlarge photo: ${title}`}
      className={`relative rounded-nocturne-lg overflow-hidden border border-nocturne-stage-border group block text-left w-full cursor-zoom-in ${className}`}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes={sizes}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-nocturne-surface-container-lowest/90 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <h3
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="text-lg font-semibold text-nocturne-text-primary"
        >
          {title}
        </h3>
        <p className="font-hanken text-xs text-nocturne-text-muted">
          {tagline}
        </p>
      </div>
      {/* TODO.md Phase 3.1: opacity-0 group-hover:opacity-100 alone means a
          touch visitor never sees this "this expands" cue at all, since
          there's no hover state to reveal it — always visible below `sm:`
          (touch-primary widths), hover-reveal preserved from `sm:` up. */}
      {/* DESIGN.md §32 — Glass Chip (Nocturne): was flat /80 with no
          blur. */}
      <span className={`absolute top-3 right-3 flex items-center justify-center h-8 w-8 rounded-full ${glassChipNocturne} opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity`}>
        <span className="material-symbols-outlined text-[16px] text-nocturne-gold" aria-hidden="true">
          open_in_full
        </span>
      </span>
    </button>
  );
}

const lightboxIndexFor = (imagePath: string) =>
  galleryImages.findIndex((img) => img.src === imagePath);

export function LivingArchive() {
  const { openIndex, open: openAt, close, next, prev } = useLightbox(galleryImages);

  return (
    <section className="relative w-full bg-nocturne-surface py-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-16 right-0 w-80 h-80 rounded-full bg-nocturne-gold blur-3xl animate-bokeh" />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-nocturne-primary blur-3xl animate-bokeh"
          style={{ animationDelay: "3s" }}
        />
      </div>
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
              The Living Archive
            </span>
            <h2
              style={{ fontFamily: "var(--font-headline-nocturne)" }}
              className="mt-1 text-3xl sm:text-4xl font-bold text-nocturne-text-primary"
            >
              Together in Perfect Motion
            </h2>
          </div>
          <Link
            href="/gallery"
            className="font-hanken text-sm font-semibold text-nocturne-gold hover:text-nocturne-text-primary transition-colors inline-flex items-center gap-1.5"
          >
            View Full Gallery
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* TODO.md Phase 3.2: was one shared `sizes="(min-width: 640px)
            50vw, 100vw"` for every tile, even though only the featured
            tile actually renders at 50% width (lg:col-span-2 of 4) — the
            4 small tiles render at 25% width at `lg:` (1 of 4 columns),
            so they were requesting roughly 2x the image data they needed
            at that breakpoint. Each tile now gets its own accurate
            `sizes` matching its real grid-column span at every
            breakpoint. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:grid-rows-2">
          <Tile
            title={featured.title}
            tagline={featured.tagline}
            image={featured.image}
            imageAlt={featured.imageAlt}
            className="aspect-[4/5] lg:aspect-auto lg:col-span-2 lg:row-span-2"
            sizes="(min-width: 640px) 50vw, 100vw"
            onEnlarge={() => openAt(lightboxIndexFor(featured.image))}
          />
          {pieces.map((p) => (
            <Tile
              key={p.slug}
              title={p.title}
              tagline={p.tagline}
              image={p.image}
              imageAlt={p.imageAlt}
              className="aspect-[4/5]"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              onEnlarge={() => openAt(lightboxIndexFor(p.image))}
            />
          ))}
        </div>
      </div>

      <LightboxModal images={galleryImages} openIndex={openIndex} onClose={close} onNext={next} onPrev={prev} />
    </section>
  );
}
