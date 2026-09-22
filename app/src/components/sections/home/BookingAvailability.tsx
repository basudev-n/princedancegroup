import Link from "next/link";
import { services } from "@/content/services";

// DESIGN.md §13.5 row 11 / §20 / §26. The new screen's "Conservatory &
// Studio — Academy Masterclasses & Residencies" schedule (batch caps,
// "Reserve Seat", "Audition Entry", named instructors) assumes a
// class/tuition/enrollment model that doesn't exist for this business —
// same mismatch as the original Stitch import (ARCHITECTURE.md §0).
// Reframed as real 9 services with no fabricated instructors/seat
// counts/batch caps.
//
// §20 redesign: this used to render 9 identical "Enquire to Book"
// buttons, one per row — the client's explicitly flagged "too many
// buttons" problem. Rows are informational (no per-row button); a single
// section-level CTA appears once in the header and once after the list,
// both scrolling to Home's own #event-enquiry form instead of navigating
// to /contact. Each row is still lightly clickable as a whole and links
// to `/?interest=<slug>#event-enquiry` so EventEnquiry can pre-select
// that service in its Event Nature dropdown.
//
// §26: the client flagged this section as "really long" — each of the 9
// rows repeated two identical, non-differentiating blocks ("Timing &
// Location: Scheduled per booking" and an "Open for Booking" chip — the
// same text on every single row, adding height without adding
// information). Both are now stated once, in the section header, instead
// of nine times. The list is also now a 2-column grid at `lg:` instead of
// one long single-column stack, roughly halving its vertical footprint.
// Also added the blurred theme-color bokeh glow (§25/§26).
const enquireHref = "#event-enquiry";

export function BookingAvailability() {
  return (
    <section id="booking-availability" className="relative w-full bg-surface-stage py-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-danza-cyan blur-3xl animate-bokeh" />
        <div
          className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-danza-crimson blur-3xl animate-bokeh"
          style={{ animationDelay: "2.5s" }}
        />
      </div>
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-danza-crimson">
              Now Booking &mdash; 2025&ndash;26 Season
            </span>
            <h2
              style={{ fontFamily: "var(--font-headline-danza)" }}
              className="mt-1 text-3xl sm:text-4xl font-bold text-on-surface-danza"
            >
              Available for Your Event
            </h2>
            <p className="mt-2 flex items-center gap-2 font-sans text-sm text-on-surface-danza-muted">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danza-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-danza-cyan" />
              </span>
              Open for enquiries &mdash; every service below is scheduled
              per booking, no fixed sessions.
            </p>
          </div>
          <a
            href={enquireHref}
            className="shrink-0 font-sans h-11 px-6 rounded-full bg-danza-crimson hover:bg-danza-crimson-hover text-white text-sm font-semibold inline-flex items-center justify-center transition-colors"
          >
            Enquire About Your Event
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/?interest=${service.slug}#event-enquiry`}
              className="group flex items-start gap-4 p-5 rounded-2xl border border-surface-border bg-surface-card hover:bg-surface-elevated hover:border-danza-gold/30 transition-colors"
            >
              <span
                style={{ fontFamily: "var(--font-headline-danza)" }}
                className="text-lg font-bold text-on-surface-danza-dim w-7 shrink-0"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 min-w-0">
                <h3 className="font-sans text-base font-semibold text-on-surface-danza group-hover:text-danza-gold transition-colors">
                  {service.name}
                </h3>
                <p className="mt-1 font-sans text-sm text-on-surface-danza-muted line-clamp-2">
                  {service.summary}
                </p>
              </div>

              <span className="shrink-0 material-symbols-outlined text-[20px] text-on-surface-danza-dim group-hover:text-danza-gold group-hover:translate-x-1 transition-all" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href={enquireHref}
            className="font-sans h-11 px-6 rounded-full bg-danza-crimson hover:bg-danza-crimson-hover text-white text-sm font-semibold inline-flex items-center justify-center transition-colors"
          >
            Enquire About Your Event
          </a>
        </div>
      </div>
    </section>
  );
}
