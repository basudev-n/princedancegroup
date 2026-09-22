import Link from "next/link";
import { services } from "@/content/services";
import { serviceIcons, defaultServiceIcon } from "./serviceIcons";

// DESIGN.md §17 / §23, revised in this UI pass. Same real row anatomy as
// the Phase 6 version (numbered row, name, description) — no fabricated
// event names, dates, venues, or headcounts.
//
// §23 fix (kept): this used to end each row in its own "Enquire to Book"
// button — 9 real services meant 9 identical buttons, the exact same
// problem Home's BookingAvailability had before its own §20 fix. Rows
// stayed purely informational after that fix (title/summary link to the
// service's own detail page) with a hover arrow instead of a repeated
// button.
//
// This pass fixes the follow-on issue Home's BookingAvailability already
// caught and fixed in its own §26 pass but that never made it here: every
// row repeated two identical, non-differentiating blocks — a "Timing &
// Location: Scheduled per booking" line and an "Open for Booking" chip,
// same text on all 9 rows, adding height without adding information.
// Both are now said once, in the section header, instead of nine times.
// The list is also now a 2-column card grid at `lg:` (same pattern as
// BookingAvailability) instead of one long bordered single-column list,
// and each card gets a distinct Material Symbol (`serviceIcons.ts`) so the
// 9 entries read as 9 different things at a glance rather than 9 copies of
// the same row template.
export function ServicesList() {
  return (
    <section className="w-full bg-nocturne-surface py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
                Full Service Roster
              </span>
              <span className="px-2 py-0.5 rounded bg-nocturne-surface-container-high font-hanken text-xs text-nocturne-text-muted">
                {services.length} Offerings
              </span>
            </div>
            <h2
              style={{ fontFamily: "var(--font-headline-nocturne)" }}
              className="mt-1 text-3xl sm:text-4xl font-bold text-nocturne-text-primary"
            >
              Every Occasion We Perform For
            </h2>
            <p className="mt-2 flex items-center gap-2 font-hanken text-sm text-nocturne-text-muted">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nocturne-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-nocturne-gold" />
              </span>
              Open for booking &mdash; every service below is scheduled per
              booking, with no fixed sessions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {services.map((service, i) => {
            const icon = serviceIcons[service.slug] ?? defaultServiceIcon;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex items-start gap-4 p-5 lg:p-6 rounded-nocturne-lg border border-nocturne-stage-border bg-nocturne-surface-container-lowest hover:bg-nocturne-surface-container hover:border-nocturne-gold/30 transition-colors"
              >
                <span className="shrink-0 flex items-center justify-center h-11 w-11 rounded-full bg-nocturne-gold/10 border border-nocturne-gold/20 group-hover:bg-nocturne-gold/20 transition-colors">
                  <span className="material-symbols-outlined text-[20px] text-nocturne-gold" aria-hidden="true">
                    {icon}
                  </span>
                </span>

                <div className="flex-1 min-w-0">
                  <span className="font-hanken text-xs font-bold text-nocturne-outline">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    style={{ fontFamily: "var(--font-headline-nocturne)" }}
                    className="text-base font-semibold text-nocturne-text-primary group-hover:text-nocturne-gold transition-colors"
                  >
                    {service.name}
                  </h3>
                  <p className="mt-1 font-hanken text-sm text-nocturne-text-muted line-clamp-2">
                    {service.summary}
                  </p>
                </div>

                <span className="shrink-0 material-symbols-outlined text-[20px] text-nocturne-text-muted group-hover:text-nocturne-gold group-hover:translate-x-1 transition-all" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
