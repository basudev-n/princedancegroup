import { heroStats } from "@/content/home";

// DESIGN.md §15.2 rows 1–2. Real brand voice kept; overstated framing
// ("Master Date-Hold Desk", "worldwide arena tours") softened. All 4 stats
// on the source screen were unconfirmed — replaced with the same real
// `heroStats` reused across every redesigned page so far. "Mythological
// Spectacle" simplified to "Mythological Dance Show" per the client's
// plain-language request — same meaning, plainer word.
//
// TODO.md Phase 4.2 (2026-09-21): was all 4 stats; cut to founding size +
// IGT win (`heroStats[0]`/`[2]`) — the other 2 were redundant here.
// "9 Signature Services" is a navigational fact that read as hero padding,
// and the Footer already repeats it on every page (this page was showing
// it twice at once). "6 National Media Milestones" is Home/About's own
// distinguishing content, not needed to re-establish trust on a page a
// visitor already reached with booking intent. Matches `/gallery`'s own
// GalleryHero.tsx, which already used this same 2-stat pattern.
const featuredStats = [heroStats[0], heroStats[2]];

export function Hero() {
  return (
    <section className="relative w-full bg-nocturne-surface-container-lowest overflow-hidden pt-10 pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(233,195,73,0.08),transparent_60%)]" />
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nocturne-surface-container border border-nocturne-stage-border font-hanken text-xs font-semibold uppercase tracking-wider text-nocturne-gold mb-6">
          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
            verified_user
          </span>
          Official Booking &amp; Enquiry Desk
        </span>

        <h1
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-nocturne-text-primary mb-4"
        >
          {/* TODO.md Phase 3.1: see home/Hero.tsx for the full rationale —
              the explicit {" "} keeps a real space character in plain-text
              extraction of this h1, invisible in normal rendering. */}
          Reserve India&apos;s Most Celebrated{" "}
          <br />
          <span className="text-nocturne-gold">Mythological Dance Show</span>{" "}
          For Your Stage
        </h1>

        <p className="font-hanken text-base text-nocturne-text-muted max-w-2xl mx-auto mb-10">
          Direct troupe management and booking enquiries for weddings,
          corporate summits, cultural festivals, and celebratory events.
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {featuredStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border p-5"
            >
              <span
                style={{ fontFamily: "var(--font-headline-nocturne)" }}
                className="text-2xl font-bold text-nocturne-primary block"
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
