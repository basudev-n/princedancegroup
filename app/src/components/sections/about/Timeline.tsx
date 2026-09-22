import { site } from "@/content/site";
import { PlaceholderNote } from "@/components/ui/Placeholder";

// DESIGN.md §14.3 row 8, revised in the About UI/UX pass (2026-09-20,
// DESIGN.md §28). The source screen's 6-event timeline is mostly
// unconfirmed (exact years, Commonwealth Games Opening at Jawaharlal Nehru
// Stadium, Lincoln Center/Dubai Opera, viewer/spectator counts) or
// reintroduces the residential-academy business-model mismatch ("Prince
// Performing Arts Gurukul" — ARCHITECTURE.md §0). Trimmed to what's
// actually confirmed: the Berhampur origin, the real IGT Season 1 win, and
// the real notable-appearances list from PROGRESS.md — shown without
// invented years, since none are confirmed.
//
// §28: the UI audit flagged the original vertical line-and-dot treatment
// as a metaphor mismatch — a timeline's whole visual promise is
// chronological position, but with no dates anywhere (none are confirmed)
// and only 3 real entries, the connecting line spanned mostly empty space
// and implied a longer, denser journey than the honest content supports.
// Also moved ahead of Founder (§28 / DESIGN.md §28) so the page tells one
// continuous history chapter before its "the man today" chapter, instead
// of interleaving origin-story content across two non-adjacent sections.
// TODO.md Phase 4.2 (2026-09-21): the Hero paragraph directly above this
// section already tells the full origin story (Krishna Mohan Reddy, 26
// young men, Berhampur/Ganjam/Odisha, construction workers and painters,
// no formal training) — milestone 1 used to restate nearly the same
// sentence ~200px later, and milestone 2 repeated "no formal training" a
// third time. Trimmed both to what Hero hasn't already said: milestone 1
// now just marks the founding beat (who + where, no re-listing the
// backstory), milestone 2 drops the redundant training clause and keeps
// only the IGT-specific facts.
const milestones = [
  {
    icon: "temple_hindu",
    title: "The Beginning",
    body: "Krishna Mohan Reddy founds the troupe in Berhampur, Ganjam, Odisha — the start of a journey that would lead to national recognition.",
  },
  {
    icon: "military_tech",
    title: "India's Got Talent, Season 1 Champions",
    body: 'The troupe wins the reality talent show with the "Krishna Act," a mythological performance that brought the group national fame.',
  },
  {
    icon: "stars",
    title: "National Media Milestones",
    body: `Following the win: a performance at the IPL inauguration in Chennai, an appearance on Kaun Banega Crorepati, the opening act for India's Got Talent Season 4, a History Channel feature, and a performance at NDTV's Toyota Greenathon.`,
  },
];

export function Timeline() {
  return (
    <section className="w-full bg-nocturne-surface py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
          Our Journey
        </span>
        <h2
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="mt-1 text-3xl sm:text-4xl font-bold text-nocturne-text-primary mb-10"
        >
          Milestones of {site.name}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {milestones.map((m, i) => (
            <div
              key={m.title}
              className="rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="h-10 w-10 rounded-full bg-nocturne-surface-container-high flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px] text-nocturne-gold" aria-hidden="true">
                    {m.icon}
                  </span>
                </span>
                <span className="font-hanken text-[11px] font-semibold uppercase tracking-wider text-nocturne-text-muted">
                  Milestone {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3
                style={{ fontFamily: "var(--font-headline-nocturne)" }}
                className="text-lg font-semibold text-nocturne-text-primary mb-2"
              >
                {m.title}
              </h3>
              <p className="font-hanken text-sm text-nocturne-text-muted flex-1">
                {m.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 font-hanken">
          <span className="material-symbols-outlined text-[18px] text-nocturne-text-muted" aria-hidden="true">
            celebration
          </span>
          <span className="text-sm font-semibold text-nocturne-text-primary">
            Today —
          </span>
          <PlaceholderNote tone="on-nocturne">
            Further milestones and exact dates to be confirmed
          </PlaceholderNote>
        </div>
      </div>
    </section>
  );
}
