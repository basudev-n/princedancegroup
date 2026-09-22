import Image from "next/image";
import Link from "next/link";
import { blurDataURLs } from "@/lib/blurDataURLs";
import { glassChipDanza } from "@/lib/glass";

// DESIGN.md §13.5 rows 1–7. Danza Theatrical hero — headline/paragraph/CTA
// 1 kept as real brand voice + real facts; CTA 2 ("Watch Showreel") is a
// placeholder since no real reel exists; the trust-badge row swaps the
// screen's unconfirmed Commonwealth Games/G20/Rashtrapati Bhavan claims for
// the real confirmed media milestones from PROGRESS.md.
export function Hero() {
  return (
    <section className="relative w-full bg-surface-stage overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(225,29,72,0.12),transparent_60%)]" />
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-10 pb-16">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-card border border-surface-border">
            <span className="material-symbols-outlined text-[14px] text-danza-gold" aria-hidden="true">
              stars
            </span>
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-danza">
              India&apos;s Got Talent Champions
            </span>
          </span>
          <span className="text-on-surface-danza-dim text-xs">&bull;</span>
          <span className="font-sans text-xs uppercase tracking-wider text-on-surface-danza-muted">
            Berhampur to the World Stage
          </span>
          <span className="text-on-surface-danza-dim text-xs">&bull;</span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-danza-crimson/10 border border-danza-crimson/30">
            <span className="w-1.5 h-1.5 rounded-full bg-danza-crimson animate-pulse" />
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-danza-crimson">
              Accepting 2025&ndash;26 Commissions
            </span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <span className="block w-8 h-px bg-danza-gold mb-4" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-danza-muted mb-4 block">
              Theatrical Choreography Ensemble
            </span>
            <h1
              style={{ fontFamily: "var(--font-headline-danza)" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-on-surface-danza mb-6"
            >
              {/* TODO.md Phase 3.1: a bare newline in JSX right before a tag
                  collapses to nothing, not a space — so plain-text
                  extraction (copy/paste, textContent-based tooling) of this
                  h1 previously read "Precise Formations.Grand Stages." with
                  no separator. The explicit {" "} preserves a real space
                  character there while staying visually invisible (it just
                  collapses at the end of the line, same as before). */}
              Precise Formations.{" "}
              <br />
              <span className="italic text-danza-gold">Grand Stages.</span>{" "}
              <br />
              Unforgettable Shows.
            </h1>
            <p className="font-sans text-base text-on-surface-danza-muted max-w-lg mb-8">
              A striking blend of ancient{" "}
              <strong className="text-on-surface-danza font-semibold">
                Mayurbhanj Chhau martial acrobatics
              </strong>
              , classical{" "}
              <strong className="text-on-surface-danza font-semibold">
                Odissi temple balance
              </strong>
              , and bold stage formations &mdash; crafted for grand
              celebrations, corporate events, and cultural festivals.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-danza-crimson hover:bg-danza-crimson-hover text-white font-sans font-semibold text-sm transition-colors"
              >
                Book for Events
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-surface-border text-on-surface-danza hover:border-danza-gold/50 hover:text-danza-gold font-sans font-semibold text-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  photo_library
                </span>
                View Gallery
              </a>
            </div>
            <div className="pt-6 border-t border-surface-border flex flex-wrap items-center gap-4">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-danza-muted">
                Official Performance Troupe
              </span>
              <span className="font-sans text-xs text-on-surface-danza-dim">
                IPL Chennai Inauguration &bull; Kaun Banega Crorepati &bull;
                NDTV Toyota Greenathon
              </span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-surface-border bg-surface-card">
            <div className="relative aspect-[4/5] w-full">
              {/* TODO.md Phase 3.2: placeholder="blur" on the real LCP
                  image, using a manually-generated blurDataURL (see
                  lib/blurDataURLs.ts) since this is a public-folder string
                  path, not a static import next/image could derive one
                  from automatically. */}
              <Image
                src="/images/gallery/krishna-leela-1.jpg"
                alt="Prince Dance Group performers in an elaborate mythological stage performance"
                fill
                priority
                placeholder="blur"
                blurDataURL={blurDataURLs["/images/gallery/krishna-leela-1.jpg"]}
                className="object-cover"
                sizes="(min-width: 1024px) 640px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-stage/95 via-surface-stage/10 to-transparent" />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                {/* DESIGN.md §32 — Glass Chip (Danza): a photo-caption
                    badge sitting on the hero image, normalized to the
                    shared glass.ts formula (was a one-off /80 value). */}
                <span className={`px-3 py-1 rounded-full ${glassChipDanza} font-sans text-[11px] font-semibold uppercase tracking-wider text-on-surface-danza`}>
                  Act: Dashavatar
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-danza-gold block mb-1">
                  Iconic Choreography
                </span>
                <h2
                  style={{ fontFamily: "var(--font-headline-danza)" }}
                  className="text-xl font-semibold text-on-surface-danza mb-1"
                >
                  26 Dancers, Moving as One
                </h2>
                <p className="font-sans text-xs text-on-surface-danza-muted mb-3">
                  A striking feat of balance and timing, shown on national
                  television.
                </p>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-elevated/90">
                  <span className="material-symbols-outlined text-[16px] text-danza-gold" aria-hidden="true">
                    trophy
                  </span>
                  <div>
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-on-surface-danza-muted block">
                      Historical Benchmark
                    </span>
                    <span className="font-sans text-xs font-semibold text-on-surface-danza">
                      First Troupe from Odisha to Win India&apos;s Got Talent
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
