import Link from "next/link";
import { heroStats } from "@/content/home";
import { site } from "@/content/site";

// DESIGN.md §13.5 row 8 / §20. Same real stats reused from the §9/Phase 6
// build (26 founding members, 9 services, IGT champions, 6 media
// milestones) — the new screen's own numbers ("15+ years", "520+ galas",
// "1,200+ dancers mentored") are unconfirmed, so real data substitutes
// rather than a placeholder, same reasoning as DESIGN.md §10 rows 9–12.
// Stat values upsized (§20 UI-audit finding: text-3xl directly below the
// 60px hero headline read as a footnote). The "As Seen On" strip below is
// new (§20): names the 6 real press/TV milestones from site.ts that were
// previously only summarized as an anonymous "6" stat — plain text, no
// fabricated logos, kept deliberately un-boxed so it doesn't register as
// another label→h2→card section.
export function StatsRow() {
  return (
    <section className="w-full bg-surface-stage pb-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 rounded-2xl bg-surface-card border border-surface-border p-6">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <span
                style={{ fontFamily: "var(--font-headline-danza)" }}
                className="text-4xl font-bold text-danza-crimson block mb-1"
              >
                {stat.value}
              </span>
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-danza block">
                {stat.label}
              </span>
              <span className="font-sans text-xs text-on-surface-danza-muted">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-on-surface-danza-dim shrink-0">
            As Seen On
          </span>
          {site.milestones
            .filter((m) => !m.label.startsWith("India's Got Talent — Season 1"))
            .map((m) => (
              <span
                key={m.label}
                className="font-sans text-xs font-medium uppercase tracking-wide text-on-surface-danza-muted"
              >
                {m.label}
              </span>
            ))}
          {/* TODO.md Phase 5: Home's body never linked to /journal anywhere
              (nav/footer only) — a "see the full press history" link is a
              natural close to a press-mentions strip, the same pattern
              news sites use after a short "in the news" teaser list. */}
          <Link
            href="/journal"
            className="font-sans text-xs font-semibold uppercase tracking-wide text-danza-gold hover:text-danza-crimson transition-colors"
          >
            Full Press &amp; Journal →
          </Link>
        </div>
      </div>
    </section>
  );
}
