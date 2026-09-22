import { heroStats } from "@/content/home";

// DESIGN.md §17.2 row 2. Rendered only on the wedding-events service
// detail page, directly below the shared ServiceDetailHero breadcrumb/photo
// header. "Worldwide Bookings 2025–26" (unconfirmed touring claim) is
// dropped from the eyebrow; the H1/paragraph describe the real Wedding
// Events service (content/services.ts) in real brand voice and are kept.
// The source screen's 4 invented stat pills ("350+ Palace Weddings",
// "100% Live Human Tableaux", "18+ Global Destinations", "8–32 Troupe
// Configurations") are replaced with real `heroStats`, same pattern as
// every other Nocturne Stage hero on this site.
//
// Plain-language pass: the eyebrow/heading/body here were the most
// ornate copy in the Services scope ("Bespoke Choreographic Grandeur",
// "theatrical spectacles"). Reworded to plain English, same facts and
// meaning — still a custom performance built for the wedding, still built
// on the troupe's national-championship artistry.
//
// TODO.md Phase 4.2 (2026-09-21): was all 4 stats; cut to founding size +
// IGT win (`heroStats[0]`/`[2]`), same reasoning as `contact/Hero.tsx` —
// "9 Signature Services" is redundant with the Footer's own repeated
// stat, "6 National Media Milestones" isn't needed to re-establish trust
// this deep into a booking flow. Matches `/gallery`'s GalleryHero.tsx.
const featuredStats = [heroStats[0], heroStats[2]];

export function WeddingHero() {
  return (
    <section className="w-full bg-nocturne-surface-container-lowest pb-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nocturne-surface-container border border-nocturne-stage-border font-hanken text-xs font-semibold uppercase tracking-wider text-nocturne-gold mb-6">
          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
            verified
          </span>
          Weddings &amp; Destination Celebrations
        </span>

        <h2
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="text-3xl sm:text-4xl font-bold text-nocturne-text-primary max-w-2xl mb-4"
        >
          Custom Choreography for Unforgettable Weddings
        </h2>

        <p className="font-hanken text-base text-nocturne-text-muted max-w-2xl mb-10">
          We turn sangeets, grand entries, and reception parties into
          memorable live performances, built on the same artistry that won
          us a national championship.
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-md">
          {featuredStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border p-5"
            >
              <span
                style={{ fontFamily: "var(--font-headline-nocturne)" }}
                className="text-2xl font-bold text-nocturne-primary block"
              >
                {stat.value}
              </span>
              <span className="font-hanken text-[11px] font-semibold uppercase tracking-wider text-nocturne-text-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
