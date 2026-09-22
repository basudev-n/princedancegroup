import Link from "next/link";
import { site } from "@/content/site";
import { PlaceholderNote } from "@/components/ui/Placeholder";

// DESIGN.md §16.2 row 10. "Request Date Availability" is a real, honest
// booking CTA — links to /contact. "Corporate Deck PDF" has no real asset
// (same pattern as DESIGN.md §15 row 7's staging-rider/repertoire-deck
// placeholders).
//
// TODO.md Phase 6.2 (2026-09-22): was a disabled pill styled almost
// identically to the real button beside it (same rounded-full shape,
// same padding, just a muted border) — the exact dead-button affordance
// pattern already found and fixed once on `contact/ContactSidebar.tsx`
// (two disabled pill "buttons" replaced with one honest plain-text
// line). Same fix applied here: no button chrome, just plain text.
export function GalleryCTA() {
  return (
    <section className="relative w-full bg-nocturne-surface py-16 overflow-hidden">
      {/* Bokeh glow — sits behind a solid card, not a dark scrim, so the
          wrapping opacity stays dampened (site pattern, DESIGN.md §25/§26,
          same treatment as About's CTA.tsx). */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-10 left-1/4 w-80 h-80 rounded-full bg-nocturne-gold blur-3xl animate-bokeh" />
        <div
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-nocturne-primary blur-3xl animate-bokeh"
          style={{ animationDelay: "2.5s" }}
        />
      </div>
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="rounded-nocturne-lg bg-nocturne-surface-container-lowest border border-nocturne-stage-border p-8 md:p-12 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-nocturne-gold/10 border border-nocturne-gold/30 font-hanken text-xs font-semibold uppercase tracking-wider text-nocturne-gold mb-6">
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              person
            </span>
            Season 2025&ndash;26 Reservations
          </span>
          <h2
            style={{ fontFamily: "var(--font-headline-nocturne)" }}
            className="text-3xl sm:text-4xl font-bold text-nocturne-text-primary max-w-2xl mx-auto mb-4"
          >
            Bring an Unforgettable Performance to Your Stage
          </h2>
          <p className="font-hanken text-sm text-nocturne-text-muted max-w-xl mx-auto mb-8">
            From state auditoriums and cultural festivals to corporate galas
            and weddings, {site.name} creates a custom, multi-act
            performance for your venue.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-nocturne-full bg-nocturne-primary hover:bg-nocturne-primary-container text-nocturne-on-primary font-hanken font-semibold text-sm transition-colors"
            >
              Request Date Availability
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
            <PlaceholderNote tone="on-nocturne">Corporate deck coming soon</PlaceholderNote>
          </div>
        </div>
      </div>
    </section>
  );
}
