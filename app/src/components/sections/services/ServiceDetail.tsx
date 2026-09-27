import Link from "next/link";
import type { Service } from "@/content/services";

// 2026-09-27, client-supplied real detail copy (content/services.ts's
// `detailHeading`/`detailBody`/`featuredActs`) — the archived "Read More"
// sub-pages TODO.md Phase 6.3 flagged as missing for 8 of 9 services. Only
// 4 of 9 have real copy so far (corporate-events, wedding-events,
// tv-award-show, musical-acts); this renders nothing for the other 5,
// which keep ServiceDetailHero's honest "coming soon" placeholder instead.
//
// `featuredActs` mixes real internal links (the 3 acts that already have a
// /repertoire/[slug] page) with plain-text names (real acts named in the
// client's own copy, but with no matching page yet) — see
// content/services.ts's `FeaturedAct` comment for why "Indian Flag Act"
// specifically is not linked to the existing Vande Mataram repertoire entry.
//
// `detailKicker` (tv-award-show, musical-acts only): the client's source
// copy has a short line right after the page title, before the intro
// paragraph ("Offering Much More Than Entertainment" / "The Best Dance
// Group For Musical Acts"). Rendered here as the section's eyebrow label —
// the same eyebrow-above-h2 pattern already used site-wide (e.g.
// HowItWorks.tsx's "How Booking Works" above "Simple Steps to Book Us") —
// rather than as a second, competing heading elsewhere on the page.
export function ServiceDetail({ service }: { service: Service }) {
  if (!service.detailHeading) return null;

  return (
    <section className="w-full bg-nocturne-surface-container-lowest border-t border-nocturne-stage-border py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-10 lg:gap-14">
          <div>
            {service.detailKicker && (
              <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
                {service.detailKicker}
              </span>
            )}
            <h2
              style={{ fontFamily: "var(--font-headline-nocturne)" }}
              className="mt-1 text-2xl sm:text-3xl font-bold text-nocturne-text-primary mb-4"
            >
              {service.detailHeading}
            </h2>
            <div className="flex flex-col gap-4 font-hanken text-sm text-nocturne-text-muted leading-relaxed">
              <p>{service.detail}</p>
              {service.detailBody?.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>

          {service.featuredActs && service.featuredActs.length > 0 && (
            <div className="rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border p-6 md:p-8 h-fit">
              <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
                Featured Acts
              </span>
              <p className="mt-1 mb-5 font-hanken text-sm text-nocturne-text-muted">
                A selection of the acts available for this service.
              </p>
              <ul className="flex flex-wrap gap-2">
                {service.featuredActs.map((act) =>
                  act.slug ? (
                    <li key={act.name}>
                      <Link
                        href={`/repertoire/${act.slug}`}
                        className="inline-flex min-h-11 items-center gap-1 rounded-full border border-nocturne-gold/30 bg-nocturne-gold/10 px-3 py-1 font-hanken text-xs font-semibold text-nocturne-gold hover:bg-nocturne-gold/20 hover:border-nocturne-gold/50 transition-colors"
                      >
                        {act.name}
                        <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
                          arrow_outward
                        </span>
                      </Link>
                    </li>
                  ) : (
                    <li key={act.name}>
                      <span className="inline-flex min-h-11 items-center rounded-full border border-nocturne-stage-border bg-nocturne-surface-container-lowest px-3 py-1 font-hanken text-xs font-semibold text-nocturne-text-primary">
                        {act.name}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
