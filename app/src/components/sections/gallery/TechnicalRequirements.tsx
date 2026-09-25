import Image from "next/image";
import { archiveImageBySrc } from "@/content/archive";

// DESIGN.md §16.2 row 9 / §24. The source screen's "Stage Architecture &
// Hospitality Rider" and its "Master Technical Document" modal give exact
// invented figures (proscenium footage, moving-head counts, decibel
// levels, litres of water) — none of it is sourced, and republishing a
// specific number as if it's a real venue requirement risks misleading an
// actual venue, the same reasoning DESIGN.md §15 row 9 applied to Contact's
// rider. The four icon-headed categories are kept as visual structure —
// genuinely useful for a booking business to signal it has technical
// requirements — each now a short bullet list (matching the source's own
// 3-bullet density per tile, §24 fidelity pass) but every bullet is an
// honest generic statement, never a specific invented number. No modal,
// no downloadable "rider" document is built.
const categories = [
  {
    icon: "straighten",
    title: "Stage",
    bullets: [
      "Clear stage area, sized to the show",
      "Exact dimensions confirmed once your venue is shared",
      "Seamless, splinter-free stage floor required",
    ],
  },
  {
    icon: "lightbulb",
    title: "Lighting",
    bullets: [
      "The show travels with its own lighting design brief",
      "Matched to your venue's existing rig ahead of the date",
      "Cue timeline coordinated with your lighting operator",
    ],
  },
  {
    icon: "volume_up",
    title: "Audio",
    bullets: [
      "Live vocals and percussion mixed through your venue's sound system",
      "Coordinated directly with your venue's sound team",
      "Onstage speaker needs shared before setup",
    ],
  },
  {
    icon: "wash",
    title: "Backstage & Hospitality",
    bullets: [
      "Basic changing and warm-up space for the full cast",
      "Rehearsal-time window shared ahead of showtime",
      "Hospitality needs confirmed with your production team",
    ],
  },
];

export function TechnicalRequirements() {
  return (
    <section className="w-full bg-nocturne-surface-container-lowest py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
          Production Requirements
        </span>
        <h2
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="mt-1 text-3xl sm:text-4xl font-bold text-nocturne-text-primary mb-3"
        >
          Stage &amp; Hospitality Requirements
        </h2>
        <p className="font-hanken text-sm text-nocturne-text-muted max-w-2xl mb-10">
          The troupe travels with a dedicated technical director and
          management team. Every venue&apos;s details are reviewed directly
          with you once a date is being discussed.
        </p>

        {/* 2026-09-25 — client's "Production Quality Showcase" pick: a close
            look at costume and stage lighting. The caption is descriptive
            only — no technical specification is asserted (see this file's
            top comment on why numbers are never shown). */}
        <figure className="relative mb-8 aspect-[21/9] overflow-hidden rounded-nocturne-lg border border-nocturne-stage-border">
          <Image
            src="/images/archive/pink-ganesha-mask.jpg"
            alt={archiveImageBySrc("/images/archive/pink-ganesha-mask.jpg")?.alt ?? ""}
            fill
            className="object-cover object-[50%_35%]"
            sizes="(min-width: 1200px) 1100px, 100vw"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-5 pb-4 pt-10 font-hanken text-xs font-semibold text-white">
            Costume and stage lighting up close
          </figcaption>
        </figure>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((c) => (
            <div
              key={c.title}
              className="rounded-nocturne-lg bg-nocturne-surface-elevated p-6 shadow-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-nocturne-gold/10 text-nocturne-gold mb-3">
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  {c.icon}
                </span>
              </span>
              <h3 className="font-hanken text-sm font-semibold text-nocturne-text-primary mb-2">
                {c.title}
              </h3>
              <ul className="flex flex-col gap-1.5">
                {c.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-1.5 font-hanken text-xs text-nocturne-text-muted leading-relaxed"
                  >
                    <span className="text-nocturne-gold font-bold shrink-0">
                      &bull;
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
