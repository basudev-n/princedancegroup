import { heroStats } from "@/content/home";

// DESIGN.md §14.3 rows 1–2. Real founder/origin/IGT facts kept verbatim.
// "Est. 2008" (unconfirmed founding year) dropped from the eyebrow. Of the
// 4 stats, only "26" is real (matches the confirmed troupe size); the
// other 3 unconfirmed numbers (100M+ viewers, 45+ nations, 17 years) are
// swapped for real stats already typed in content/home.ts, same approach
// as DESIGN.md §13.5 row 8.
//
// TODO.md Phase 4.2 (2026-09-21): this page used to reorder the 4 stats
// to 26·6·IGT·9 for no documented reason, while Home's StatsRow.tsx shows
// them in `content/home.ts`'s own order (26·9·IGT·6) — the same 4 real
// numbers reading in a different sequence on two pages a visitor might
// browse back-to-back. Renders `heroStats` directly in its natural order
// to match Home.
export function Hero() {
  return (
    <section className="relative w-full bg-nocturne-surface-container-lowest overflow-hidden pt-10 pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(233,195,73,0.08),transparent_60%)]" />
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nocturne-surface-container border border-nocturne-stage-border font-hanken text-xs font-semibold uppercase tracking-wider text-nocturne-gold mb-6">
          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">stars</span>
          Heritage &amp; Origins
        </span>

        <h1
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-nocturne-text-primary mb-4"
        >
          {/* TODO.md Phase 3.1: see home/Hero.tsx for the full rationale —
              the explicit {" "} keeps a real space character in plain-text
              extraction of this h1, invisible in normal rendering. */}
          From Rural Daily-Wage Laborers{" "}
          <br />
          <span className="text-nocturne-gold">to World-Class Performers</span>
        </h1>

        <p className="font-hanken text-base text-nocturne-text-muted max-w-2xl mx-auto mb-10">
          Founded in Berhampur, Ganjam, Odisha by choreographer Krishna Mohan
          Reddy, 26 young men &mdash; construction workers, painters, and
          artisans with no formal dance training &mdash; built a disciplined,
          perfectly synchronized dance style and won{" "}
          <em>India&apos;s Got Talent</em> Season 1.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border p-5"
            >
              <span
                style={{ fontFamily: "var(--font-headline-nocturne)" }}
                className="text-2xl font-bold text-nocturne-gold block"
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
