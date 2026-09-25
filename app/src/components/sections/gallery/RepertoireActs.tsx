"use client";

import Image from "next/image";
import Link from "next/link";
import { repertoire } from "@/content/home";
import { lightboxPool } from "@/content/archive";
import { useLightbox, LightboxModal } from "@/components/ui/Lightbox";
import { glassChipNocturne } from "@/lib/glass";

// DESIGN.md §16.2 rows 5–8 / §24 structural rebuild. Dashavatar, Krishna
// Leela, and Vande Mataram are documented real repertoire (DESIGN.md §8,
// content/home.ts). Shiva Tandava and Surya Namaskar are real,
// thematically-consistent mythological subjects already established the
// same way elsewhere on the site (Home's RepertoireGrid.tsx, About's
// LivingArchive.tsx) — names kept, specifics not asserted. Split back
// into 5 separate acts (was 4, with Vande Mataram + Surya Namaskar merged)
// to match the source screen's actual "All Acts (5)" (GalleryHero.tsx
// filter pill, renamed from "All Masterworks (5)" in the 2026-09-21
// plain-language pass) structure — see DESIGN.md §24 for why this
// supersedes the earlier merge decision.
// Every specific number the source invented (cast counts, proscenium
// footage, musical score/FX/costume/lighting detail, duration) is
// replaced with an honest "On request" in the same visual slot — the
// slot LABELS (Cast Size, Min. Stage Depth, etc.) are category headers,
// not facts, and are kept for layout fidelity. The "Master Technical
// Document" modal the source screen would open on "View Tech Rider" is
// not built (same reasoning as the dropped stage-rider section below) —
// that button now links to /contact instead. (Label wording simplified
// 2026-09-21 from "Min. Proscenium" as part of a site-wide plain-language
// pass — same slot, same meaning, no fact changed.)
//
// TODO.md Phase 4.1: title/description/image/badge now come from
// content/home.ts's canonical `repertoire` (this file was previously one
// of 4 independently-drifting copies — see that file's own comment for
// the full before/after). The "Act I/II/III…" numbering + theme epithet,
// the per-act stat labels, and the CTA button text are kept local here —
// they're this page's own layout/numbering flavor, not shared facts about
// the act, so centralizing them would just be indirection with no
// dedup benefit.
const stubAct = (slug: string) =>
  repertoire.find((a) => a.slug === slug) ?? repertoire[0];

const heroActs = [
  {
    act: "Act I · Cosmological Tableau",
    ...stubAct("dashavatar"),
    stats: [
      { label: "Cast Size", value: "On request" },
      { label: "Min. Stage Depth", value: "On request" },
      { label: "Musical Score", value: "On request" },
      { label: "Special FX", value: "On request" },
    ],
    cta: "Book Dashavatar Act",
    imageFirst: true,
  },
  {
    act: "Act II · Divine Romance",
    ...stubAct("krishna-leela"),
    stats: [
      { label: "Cast Ensemble", value: "On request" },
      { label: "Duration", value: "On request" },
      { label: "Costume Craft", value: "On request" },
      { label: "Lighting Rig", value: "On request" },
    ],
    cta: "Book Krishna Leela",
    imageFirst: false,
  },
  {
    act: "Act III · Cosmic Dissolution",
    ...stubAct("shiva-tandava"),
    stats: [
      { label: "Cast Ensemble", value: "On request" },
      { label: "Duration", value: "On request" },
      { label: "Stage Floor", value: "On request" },
      { label: "Audio Channel", value: "On request" },
    ],
    cta: "Book Shiva Tandava",
    imageFirst: true,
  },
];

const bentoActs = [
  {
    act: "Act IV · Sovereign Tribute",
    ...stubAct("vande-mataram"),
    // TODO.md Phase 4.2: American "Inquiry" → "Enquiry", the spelling
    // every other CTA on the site uses.
    cta: "Gala Enquiry",
  },
  {
    act: "Act V · Solar Devotion",
    ...stubAct("surya-namaskar"),
    cta: "Reserve Act",
  },
];

// TODO.md Phase 7 (2026-09-22): this page previously rendered its 5 act
// images as plain static <Image>s with no enlarge behavior at all — now
// uses the shared components/ui/Lightbox.tsx (extracted from
// home/Gallery.tsx, the site's only page with real click-to-enlarge
// before this). The lightbox itself operates on content/gallery.ts's
// `lightboxPool` (content/archive.ts: the original 5 gallery photos plus
// the photo archive, all with real captions); each act's own `image` path
// is matched to its index in that array since they're the same files.
const lightboxIndexFor = (imagePath: string) =>
  lightboxPool.findIndex((img) => img.src === imagePath);

export function RepertoireActs() {
  const { openIndex, open: openAt, close, next, prev } = useLightbox(lightboxPool);

  return (
    <section className="w-full bg-nocturne-surface py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col gap-8">
        {heroActs.map((piece) => (
          <article
            key={piece.title}
            className="group relative bg-nocturne-surface-stage rounded-nocturne-lg overflow-hidden shadow-2xl border border-nocturne-stage-border"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <button
                type="button"
                onClick={() => openAt(lightboxIndexFor(piece.image))}
                aria-label={`Enlarge photo: ${piece.title}`}
                className={`lg:col-span-7 relative min-h-[280px] lg:min-h-[420px] overflow-hidden text-left border-0 p-0 cursor-zoom-in ${
                  piece.imageFirst ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <Image
                  src={piece.image}
                  alt={piece.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nocturne-surface-stage via-nocturne-surface-stage/20 to-transparent" />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-nocturne-secondary/20 text-nocturne-gold-light font-hanken text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md">
                    {piece.badge}
                  </span>
                </div>
                {/* TODO.md Phase 3.1 pattern reused: always visible below
                    `sm:` (no hover state on touch), hover-reveal from
                    `sm:` up. */}
                {/* DESIGN.md §32 — Glass Chip (Nocturne): was a flat
                    bg-black/40 with no blur, the textbook glass-control-
                    over-photo case. */}
                <span className={`absolute top-4 right-4 h-9 w-9 flex items-center justify-center rounded-full ${glassChipNocturne} opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity`}>
                  <span className="material-symbols-outlined text-[18px] text-white" aria-hidden="true">
                    zoom_in
                  </span>
                </span>
              </button>

              <div
                className={`lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between gap-4 bg-nocturne-surface-stage ${
                  piece.imageFirst ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="flex flex-col gap-3">
                  <span className="font-hanken text-xs text-nocturne-gold uppercase tracking-[0.16em]">
                    {piece.act}
                  </span>
                  {/* TODO.md Phase 7 (2026-09-22): links to the act's own
                      new /repertoire/[slug] page — previously this title
                      was plain text with no dedicated URL to point to. */}
                  <h2
                    style={{ fontFamily: "var(--font-headline-nocturne)" }}
                    className="text-2xl font-bold text-nocturne-text-primary leading-tight"
                  >
                    <Link href={`/repertoire/${piece.slug}`} className="hover:text-nocturne-gold transition-colors">
                      {piece.title}
                    </Link>
                  </h2>
                  <p className="font-hanken text-sm text-nocturne-text-muted leading-relaxed">
                    {piece.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {piece.stats.map((s) => (
                      <div
                        key={s.label}
                        className="bg-nocturne-surface-elevated p-3 rounded-nocturne flex flex-col gap-0.5"
                      >
                        <span className="font-hanken text-[10px] text-nocturne-text-muted uppercase">
                          {s.label}
                        </span>
                        <span className="font-hanken text-sm text-nocturne-text-primary font-semibold italic">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TODO.md Phase 5: both CTAs used to point at /contact —
                    the primary "Book [Act]" now cross-links to /services
                    (browse what's actually bookable) instead of skipping
                    straight past it, and "Request Tech Rider" now points
                    at the real (if still placeholder-content)
                    /rider-requirements page instead of the generic
                    contact page, since that's literally what it's asking
                    for. */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-nocturne-full bg-nocturne-primary-container text-nocturne-text-primary font-hanken text-xs font-semibold uppercase tracking-wider hover:brightness-110 transition-all"
                  >
                    {piece.cta}
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                      arrow_forward
                    </span>
                  </Link>
                  <Link
                    href="/rider-requirements"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-nocturne-full text-nocturne-gold hover:bg-nocturne-gold/10 font-hanken text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                      description
                    </span>
                    Request Tech Rider
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bentoActs.map((piece) => (
            <article
              key={piece.title}
              className="group bg-nocturne-surface-stage rounded-nocturne-lg overflow-hidden shadow-2xl border border-nocturne-stage-border flex flex-col justify-between"
            >
              <button
                type="button"
                onClick={() => openAt(lightboxIndexFor(piece.image))}
                aria-label={`Enlarge photo: ${piece.title}`}
                className="relative h-64 overflow-hidden w-full text-left border-0 p-0 cursor-zoom-in"
              >
                <Image
                  src={piece.image}
                  alt={piece.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nocturne-surface-stage via-nocturne-surface-stage/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  {/* DESIGN.md §32 — Glass Chip (Nocturne), normalized
                      (was /80, drift from the shared /85). */}
                  <span className={`px-3 py-1 rounded-full ${glassChipNocturne} text-nocturne-gold font-hanken text-[10px] font-semibold uppercase`}>
                    {piece.badge}
                  </span>
                </div>
                {/* DESIGN.md §32 — Glass Chip (Nocturne). */}
                <span className={`absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full ${glassChipNocturne} opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity`}>
                  <span className="material-symbols-outlined text-[16px] text-white" aria-hidden="true">
                    zoom_in
                  </span>
                </span>
              </button>
              <div className="p-6 flex flex-col gap-3 flex-1 justify-between">
                <div className="flex flex-col gap-2">
                  <span className="font-hanken text-xs text-nocturne-gold uppercase">
                    {piece.act}
                  </span>
                  {/* TODO.md Phase 3.1: was <h3>, but this bento card is a
                      sibling act to the heroActs cards above (same kind of
                      content, purely a different visual layout) — using a
                      different heading level than their <h2> incorrectly
                      implied these two acts nest under the first three. */}
                  {/* TODO.md Phase 7 (2026-09-22): links to the act's own
                      new /repertoire/[slug] page, same as the heroActs
                      cards above. */}
                  <h2
                    style={{ fontFamily: "var(--font-headline-nocturne)" }}
                    className="text-lg font-semibold text-nocturne-text-primary"
                  >
                    <Link href={`/repertoire/${piece.slug}`} className="hover:text-nocturne-gold transition-colors">
                      {piece.title}
                    </Link>
                  </h2>
                  <p className="font-hanken text-sm text-nocturne-text-muted leading-relaxed">
                    {piece.description}
                  </p>
                </div>
                <div className="pt-3 mt-1 flex flex-col gap-3 border-t border-nocturne-stage-border">
                  <span className="font-hanken text-xs uppercase text-nocturne-text-muted italic">
                    Cast size on request
                  </span>
                  {/* TODO.md Phase 5: was /contact — cross-links to
                      /services instead, same reasoning as the heroActs
                      cards above. */}
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-nocturne-full bg-nocturne-secondary text-nocturne-on-secondary font-hanken text-xs font-semibold uppercase tracking-wider hover:brightness-105 transition-all"
                  >
                    {piece.cta}
                    <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <LightboxModal images={lightboxPool} openIndex={openIndex} onClose={close} onNext={next} onPrev={prev} />
    </section>
  );
}
