import { journalEntries } from "@/content/journal";

// Nocturne Stage token reskin (DESIGN.md §18) — no new dedicated Stitch
// screen exists for Journal, so this keeps every real/dropped content
// decision already made in Phase 6 unchanged (Stitch's fictional volume
// numbering, NY archive location, bi-weekly cadence, and "Resident
// Scholars" stat all already dropped — see git history for the original
// rationale) and only swaps tokens.
//
// Journal UI/UX pass (2026-09-21): added the site-wide bokeh glow (already
// on Home/About) behind this hero, kept subtle (opacity-30, positioned away
// from the text column) since this is a reading-focused page. Simplified
// "recognitions" to "awards" per the site-wide plain-language pass — this
// is UI chrome copy this component writes itself, not the real journal
// entry titles/teasers in content/journal.ts.
export function JournalHeader() {
  return (
    <section className="relative w-full bg-nocturne-surface-container-lowest overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-20 right-0 w-72 h-72 rounded-full bg-nocturne-gold blur-3xl animate-bokeh" />
        <div
          className="absolute -bottom-16 left-0 w-64 h-64 rounded-full bg-nocturne-primary blur-3xl animate-bokeh"
          style={{ animationDelay: "3s" }}
        />
      </div>
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 pt-16 md:pt-20 pb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nocturne-surface-container border border-nocturne-stage-border mb-6">
          <span className="material-symbols-outlined text-nocturne-gold text-[16px]" aria-hidden="true">
            auto_stories
          </span>
          <span className="font-hanken text-xs font-bold text-nocturne-text-primary uppercase tracking-wider">
            News &amp; Press
          </span>
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 flex flex-col gap-3">
            <h1
              style={{ fontFamily: "var(--font-headline-nocturne)" }}
              className="text-4xl sm:text-5xl font-bold text-nocturne-text-primary max-w-3xl leading-[1.05]"
            >
              Journal
            </h1>
            <p className="font-hanken text-base text-nocturne-text-muted max-w-2xl">
              Press mentions, awards, and news from Prince Dance
              Group &mdash; the Berhampur, Odisha troupe that won
              India&rsquo;s Got Talent Season 1.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="flex items-center justify-between gap-6 p-4 rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border w-full sm:w-auto sm:min-w-[220px]">
              <div className="flex flex-col">
                <span className="font-hanken text-xs font-bold uppercase tracking-wider text-nocturne-text-muted">
                  Journal Archive
                </span>
                <span
                  style={{ fontFamily: "var(--font-headline-nocturne)" }}
                  className="text-2xl font-bold text-nocturne-text-primary"
                >
                  {journalEntries.length} Entries
                </span>
              </div>
              <span className="material-symbols-outlined text-nocturne-gold text-[24px]" aria-hidden="true">
                menu_book
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
