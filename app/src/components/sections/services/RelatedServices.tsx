import Link from "next/link";
import { services } from "@/content/services";
import { serviceIcons, defaultServiceIcon } from "./serviceIcons";

// New in this UI pass. Rendered on every service detail page (generic and
// `wedding-events` alike), just before the closing `ServicesCTA`. Gives a
// visitor reading one service page an obvious next step to the other 8,
// which previously had no cross-links at all outside the "All Services"
// breadcrumb — pure navigation/IA improvement, reusing the same real
// `content/services.ts` data already shown elsewhere (name + summary,
// wording untouched).
export function RelatedServices({ currentSlug }: { currentSlug: string }) {
  const others = services.filter((s) => s.slug !== currentSlug);
  const anchorIndex = services.findIndex((s) => s.slug === currentSlug);
  const picks = [0, 1, 2].map(
    (offset) => others[(anchorIndex + offset) % others.length]
  );

  return (
    // UI pass (2026-09-22): same seam fix as HowItWorks — this section's
    // background is nearly indistinguishable from the one above it
    // (whichever renders directly before it, Hero or HowItWorks), so a
    // real border gives a visible section boundary instead of a blank gap.
    <section className="w-full bg-nocturne-surface border-t border-nocturne-stage-border py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
              Explore More
            </span>
            <h2
              style={{ fontFamily: "var(--font-headline-nocturne)" }}
              className="mt-1 text-3xl sm:text-4xl font-bold text-nocturne-text-primary"
            >
              Other Services We Offer
            </h2>
          </div>
          <Link
            href="/services"
            className="font-hanken text-sm font-semibold text-nocturne-gold hover:text-nocturne-text-primary transition-colors inline-flex items-center gap-1.5"
          >
            View All Services
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {picks.map((service) => {
            const icon = serviceIcons[service.slug] ?? defaultServiceIcon;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-nocturne-lg border border-nocturne-stage-border bg-nocturne-surface-container-lowest p-6 hover:bg-nocturne-surface-container hover:border-nocturne-gold/30 transition-colors"
              >
                <span className="flex items-center justify-center h-10 w-10 rounded-full bg-nocturne-gold/10 border border-nocturne-gold/20 mb-4 group-hover:bg-nocturne-gold/20 transition-colors">
                  <span className="material-symbols-outlined text-[18px] text-nocturne-gold" aria-hidden="true">
                    {icon}
                  </span>
                </span>
                <h3
                  style={{ fontFamily: "var(--font-headline-nocturne)" }}
                  className="text-base font-semibold text-nocturne-text-primary group-hover:text-nocturne-gold transition-colors"
                >
                  {service.name}
                </h3>
                <p className="mt-1.5 font-hanken text-sm text-nocturne-text-muted line-clamp-2 flex-1">
                  {service.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-hanken text-xs font-semibold text-nocturne-gold">
                  Learn More
                  <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1 transition-transform" aria-hidden="true">
                    arrow_forward
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
