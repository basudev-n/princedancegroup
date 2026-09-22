import Link from "next/link";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { serviceIcons, defaultServiceIcon } from "./serviceIcons";

// DESIGN.md §17, revised in this UI pass. Real copy, plainer wording (the
// "mesmerizing" flourish is dropped per the client's site-wide plain-
// language request — same meaning, fewer decorative adjectives).
//
// This hero used to be just a badge + heading + one paragraph, noticeably
// thinner than the matching hero on every other Nocturne page (compare
// About's `Hero.tsx`, which adds a background glow and a stat row). It
// gets the same glow treatment here, plus a row of quick-jump pills for
// all 9 real services (name + icon only, sourced straight from
// `content/services.ts` — no new copy) so the hero doubles as a preview
// of the list immediately below it instead of empty space.
export function ServicesHero() {
  return (
    <section className="relative w-full bg-nocturne-surface-container-lowest overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(233,195,73,0.08),transparent_60%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-16 right-0 w-80 h-80 rounded-full bg-nocturne-gold blur-3xl animate-bokeh" />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-nocturne-primary blur-3xl animate-bokeh"
          style={{ animationDelay: "3.5s" }}
        />
      </div>
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-10">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nocturne-surface-container border border-nocturne-stage-border font-hanken text-xs font-semibold uppercase tracking-wider text-nocturne-gold mb-6">
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              verified
            </span>
            {site.tagline}
          </span>

          <h1
            style={{ fontFamily: "var(--font-headline-nocturne)" }}
            className="text-4xl sm:text-5xl font-bold text-nocturne-text-primary mb-4"
          >
            Services
          </h1>

          <p className="font-hanken text-base text-nocturne-text-muted max-w-2xl">
            See what {site.name} can bring to your event. From live stage
            shows to choreography built for the occasion, we bring art,
            culture, and excitement to any event.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2.5">
          {services.map((service) => {
            const icon = serviceIcons[service.slug] ?? defaultServiceIcon;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group inline-flex items-center gap-1.5 pl-2.5 pr-3.5 py-1.5 rounded-full bg-nocturne-surface-container border border-nocturne-stage-border hover:border-nocturne-gold/40 hover:bg-nocturne-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-[15px] text-nocturne-gold" aria-hidden="true">
                  {icon}
                </span>
                <span className="font-hanken text-xs font-semibold text-nocturne-text-primary group-hover:text-nocturne-gold transition-colors">
                  {service.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
