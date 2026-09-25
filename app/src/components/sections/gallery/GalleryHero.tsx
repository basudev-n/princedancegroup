import Image from "next/image";
import { heroStats } from "@/content/home";

// DESIGN.md §16.2 rows 2–3 / §24. Structural rebuild: the source screen is
// an 8/4 column split (headline+paragraph left, one compact stat card
// right), not a centered headline over a 4-stat grid. "2025–2026 World
// Tour" and "Fourteen worldwide-celebrated" (unconfirmed count/touring
// claim) stay dropped — only the layout changed, not that content call.
// The hero's own fake progress bar (an 85%-filled bar under "Ensemble
// Cast") is dropped as meaningless decoration, not carried over. The
// filter pills below are real category labels for the 5 real acts
// (§24), rendered as static decoration — no filtering logic, not worth
// building for a 5-card list that already shows everything at once.
//
// TODO.md Phase 7 (2026-09-22): the first pill used to render with the
// site's real active-state gold highlight (the same treatment used for
// an actually-selected tab/state elsewhere on the site) while the other
// 4 stayed neutral — visually indistinguishable from a real, clickable
// filter bar with "All Acts" pre-selected, even though these are `<span>`s
// with zero filtering logic behind them (correctly not focusable, but
// that doesn't help a sighted mouse user who just sees what looks like a
// working filter and clicks it expecting something to happen). All 5 now
// render identically — plain, neutral tags, none implying an active
// state — with a small label above making clear these are themes, not
// controls. Revisit as a real filter bar if the act list ever passes ~8
// (this file's own longstanding note).
const filters = [
  "All Acts (5)",
  "Mythological Epics",
  "Martial & Power Formations",
  "Patriotic Anthems",
  "Devotional Pieces",
];

export function GalleryHero() {
  const [founding, , igt] = heroStats;

  return (
    <section className="relative w-full bg-nocturne-surface-container-lowest overflow-hidden pt-10 pb-10">
      {/* 2026-09-25 — client's "Portfolio Hero Banner" pick: a blue-lit
          stage photo, dark and low-opacity behind the hero's glow. The
          stat card and headline sit on top with their own surfaces, so
          contrast is unaffected. Decorative, so empty alt. */}
      <Image
        src="/images/archive/blue-lit-stage-truss.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        className="object-cover object-[50%_30%] opacity-[0.22]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-nocturne-surface-container-lowest/40 via-nocturne-surface-container-lowest/70 to-nocturne-surface-container-lowest" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(233,195,73,0.08),transparent_60%)]" />
      {/* Bokeh glow — no dark scrim behind this section, so keep the
          wrapping opacity dampened (site pattern: About's Hero-adjacent
          sections, DESIGN.md §25/§26). */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-16 right-0 w-80 h-80 rounded-full bg-nocturne-gold blur-3xl animate-bokeh" />
        <div
          className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-nocturne-primary blur-3xl animate-bokeh"
          style={{ animationDelay: "3s" }}
        />
      </div>
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        <span className="inline-flex items-center gap-2 font-hanken text-xs font-semibold uppercase tracking-[0.2em] text-nocturne-gold mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-nocturne-gold animate-pulse" />
          Our Repertoire
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8">
            <h1
              style={{ fontFamily: "var(--font-headline-nocturne)" }}
              className="text-4xl sm:text-5xl font-bold leading-[1.1] text-nocturne-text-primary"
            >
              The Repertoire of{" "}
              <span className="italic font-normal text-nocturne-gold">
                Myth
              </span>{" "}
              &amp; Movement
            </h1>
            <p className="mt-4 font-hanken text-base text-nocturne-text-muted max-w-2xl">
              Choreography by Krishna Mohan Reddy and the ensemble, blending
              Mayurbhanj Chhau martial arts, classical Odissi dance, and
              dramatic group formations into full-length stage shows.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-2 bg-nocturne-surface-container/60 backdrop-blur-md p-5 rounded-nocturne-lg shadow-xl border border-nocturne-stage-border">
            <div className="flex items-center justify-between">
              <span className="font-hanken text-xs uppercase text-nocturne-text-muted">
                {founding.label}
              </span>
              <span
                style={{ fontFamily: "var(--font-headline-nocturne)" }}
                className="text-lg text-nocturne-gold font-bold"
              >
                {founding.value}
              </span>
            </div>
            <div className="flex items-center justify-between text-nocturne-text-muted font-hanken text-xs pt-1 border-t border-nocturne-stage-border">
              <span>{igt.label}</span>
              <span className="text-nocturne-text-primary font-semibold">
                {igt.value}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <span className="block font-hanken text-[11px] font-semibold uppercase tracking-widest text-nocturne-text-muted/70 mb-2">
            Performance Themes
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <span
                key={f}
                className="px-4 py-2 rounded-full font-hanken text-xs font-semibold uppercase tracking-wider bg-nocturne-surface-container text-nocturne-text-muted"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
