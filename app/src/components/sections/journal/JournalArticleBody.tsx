import Image from "next/image";
import Link from "next/link";
import { journalEntries, type JournalEntry } from "@/content/journal";
import { PlaceholderNote } from "@/components/ui/Placeholder";
import { journalCategory } from "./journalCategory";

// Nocturne Stage token reskin (DESIGN.md §18). The full article body was
// never captured in the archived source material (only post titles/teasers
// were recoverable — see src/content/journal.ts and PROGRESS.md Phase 3),
// so this stays an honest placeholder, tokens only.
//
// Journal UI/UX pass (2026-09-21): simplified the placeholder note's
// wording (was internal-sounding dev language — "captured in the archived
// source" — now plain, reader-facing). Also added a "More from the
// Journal" block below the placeholder so the page doesn't dead-end after
// one dashed box — this reuses the other real entries already in
// content/journal.ts (no new content), same pattern as a related-articles
// footer. Doubles as this page's closing section, so it carries a subtle,
// peripheral bokeh glow (kept well clear of the placeholder text above).
export function JournalArticleBody({ current }: { current: JournalEntry }) {
  const more = journalEntries.filter((e) => e.slug !== current.slug);

  return (
    <section className="relative w-full bg-nocturne-surface-container-lowest overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <div className="max-w-2xl rounded-nocturne-lg border-2 border-dashed border-nocturne-stage-border bg-nocturne-surface-container p-8 flex flex-col items-center text-center gap-3">
          <span className="material-symbols-outlined text-[28px] text-nocturne-text-muted opacity-60" aria-hidden="true">
            menu_book
          </span>
          <PlaceholderNote tone="on-nocturne">
            Full article coming soon &mdash; we&rsquo;re still adding the
            complete write-up for this story.
          </PlaceholderNote>
        </div>

        {more.length > 0 && (
          <div className="relative mt-16 pt-12 border-t border-nocturne-stage-border">
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-nocturne-gold blur-3xl animate-bokeh" />
            </div>
            <div className="relative">
              {/* TODO.md Phase 3.1: was a plain <span> — this page's only
                  other heading is JournalArticleHeader's <h1>, so the related-
                  article cards' own <h2> titles below previously skipped
                  straight to h1→h3 with nothing in between. Promoted to a
                  real <h2> (same visual styling) so the cards nest under it
                  correctly. */}
              <h2 className="block font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-text-muted mb-6">
                More from the Journal
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {more.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/journal/${entry.slug}`}
                    className="group flex flex-col gap-4 rounded-nocturne-lg bg-nocturne-surface-container p-5 border border-nocturne-stage-border hover:border-nocturne-gold/40 transition-all duration-300"
                  >
                    <div className="relative w-full h-40 rounded-nocturne overflow-hidden bg-nocturne-surface-container-high">
                      <Image
                        src={entry.image}
                        alt={entry.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-hanken text-xs font-bold text-nocturne-gold">
                        {journalCategory(entry.slug)}
                      </span>
                      <h3
                        style={{ fontFamily: "var(--font-headline-nocturne)" }}
                        className="text-base font-semibold text-nocturne-text-primary group-hover:text-nocturne-gold transition-colors"
                      >
                        {entry.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TODO.md Phase 5: this page previously only linked to other
            journal articles — the thinnest internal link equity on the
            site (every other page eventually points toward a booking
            action). A reader here is already engaging with press/
            credibility content, a natural moment to point toward what's
            actually bookable. */}
        <div className="mt-16 pt-10 border-t border-nocturne-stage-border flex flex-wrap items-center gap-4">
          <span className="font-hanken text-sm text-nocturne-text-muted">
            Looking to book a performance?
          </span>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 font-hanken text-sm font-semibold text-nocturne-gold hover:text-nocturne-text-primary transition-colors"
          >
            Browse Our Services
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 font-hanken text-sm font-semibold text-nocturne-gold hover:text-nocturne-text-primary transition-colors"
          >
            Contact Us
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
