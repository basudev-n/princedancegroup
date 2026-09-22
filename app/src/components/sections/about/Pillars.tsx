import { philosophyPillars } from "@/content/home";

// DESIGN.md §14.3 row 7. All four pillars are the real documented cultural
// values (DESIGN.md §8) — reused verbatim from content/home.ts. The source
// screen's specific unconfirmed operational claims for each pillar (a named
// 5 AM schedule, "100% Free Conservatory Housing," an "Artisan Pension
// Fund," "performed across 45+ nations") are not carried over — only the
// real thematic content is.
//
// Icons are overridden here rather than reusing philosophyPillars' own
// `icon` field: that field was built for Home's Danza icon set
// (person_celebrate/masks/volunteer_activism/public), which isn't the
// allowed list for this page (DESIGN.md §14.2). This screen's own source
// HTML uses temple_hindu/theater_comedy/handshake/public for these same
// four pillars, in this order — using those instead, zero substitutions.
const pillarIcons = ["temple_hindu", "theater_comedy", "handshake", "public"];

export function Pillars() {
  return (
    <section className="w-full bg-nocturne-surface-container-lowest py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
          Our Foundation
        </span>
        <h2
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="mt-1 text-3xl sm:text-4xl font-bold text-nocturne-text-primary max-w-2xl mb-3"
        >
          The Four Pillars of Our Practice
        </h2>
        <p className="font-hanken text-sm text-nocturne-text-muted max-w-xl mb-10">
          A discipline built on an ancient Indian text on stage performance,
          physical training, and welcoming everyone, regardless of
          background.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {philosophyPillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="h-10 w-10 rounded-full bg-nocturne-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px] text-nocturne-gold" aria-hidden="true">
                    {pillarIcons[i]}
                  </span>
                </span>
                <span className="font-hanken text-[11px] font-semibold uppercase tracking-wider text-nocturne-text-muted">
                  Pillar {["I", "II", "III", "IV"][i]}
                </span>
              </div>
              <span className="font-hanken text-xs font-semibold text-nocturne-gold block mb-1">
                {pillar.devanagari}
              </span>
              <h3
                style={{ fontFamily: "var(--font-headline-nocturne)" }}
                className="text-xl font-semibold text-nocturne-text-primary mb-2"
              >
                {pillar.title}
              </h3>
              <p className="font-hanken text-sm text-nocturne-text-muted mb-3">
                {pillar.description}
              </p>
              <span className="font-hanken text-[11px] uppercase tracking-wide text-nocturne-text-muted/70 pt-3 border-t border-nocturne-stage-border block">
                Focus: {pillar.focus}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
