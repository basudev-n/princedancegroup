import Link from "next/link";

// DESIGN.md §14.3 row 11, revised in the About UI/UX pass (2026-09-20,
// DESIGN.md §28). Real copy and real links. The source screen's trust
// badges (technical rider / touring / staging) are generic capability
// statements, not specific unconfirmed claims — kept.
//
// §28: added the site-wide bokeh glow (already used on Home and the
// mobile menu) as the closing "invite the viewer to act" moment, mirroring
// Home's own booking-CTA precedent. Also downgraded "Explore Full
// Repertoire" from an equal-weight second button to a small inline text
// link — now that LivingArchive links straight to `/gallery` where that
// browsing intent naturally occurs earlier on the page, this final CTA can
// stay singularly focused on the one primary action (booking).
export function CTA() {
  return (
    <section className="relative w-full bg-nocturne-surface py-16 overflow-hidden">
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
              celebration
            </span>
            Book Your Event
          </span>
          <h2
            style={{ fontFamily: "var(--font-headline-nocturne)" }}
            className="text-3xl sm:text-4xl font-bold text-nocturne-text-primary max-w-2xl mx-auto mb-4"
          >
            See Us Perform Live
          </h2>
          <p className="font-hanken text-sm text-nocturne-text-muted max-w-xl mx-auto mb-8">
            From corporate stages to royal weddings and cultural festivals —
            bring one of {"India's"} best-known dance troupes, famous for
            stunning human formations, to your event.
          </p>
          <div className="flex flex-col items-center gap-4 mb-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-nocturne-full bg-nocturne-primary hover:bg-nocturne-primary-container text-nocturne-on-primary font-hanken font-semibold text-sm transition-colors"
            >
              {/* TODO.md Phase 4.2: American "Inquire" → the "Enquiry"
                  spelling every other CTA/copy on the site uses. */}
              Enquire for Booking
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                calendar_today
              </span>
            </Link>
            <Link
              href="/gallery"
              className="font-hanken text-sm font-semibold text-nocturne-text-muted hover:text-nocturne-gold transition-colors inline-flex items-center gap-1"
            >
              Explore Full Repertoire
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-nocturne-stage-border font-hanken text-xs text-nocturne-text-muted">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-nocturne-gold" aria-hidden="true">
                description
              </span>
              Technical Requirements Shared on Enquiry
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-nocturne-gold" aria-hidden="true">
                groups
              </span>
              Complete Cast &amp; Crew
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-nocturne-gold" aria-hidden="true">
                security
              </span>
              Customized Staging Protocols
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
