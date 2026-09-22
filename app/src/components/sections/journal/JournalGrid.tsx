import Image from "next/image";
import Link from "next/link";
import { journalEntries } from "@/content/journal";
import { journalCategory } from "./journalCategory";
import { blurDataURLs } from "@/lib/blurDataURLs";
import { glassChipNocturne } from "@/lib/glass";

// Nocturne Stage token reskin (DESIGN.md §18) — same card anatomy and the
// same accessibility fix (one <Link> per card, not a nested interactive
// element) as the Phase 6 version, tokens only.
//
// Journal UI/UX pass (2026-09-21): the original version put all entries in
// one identical 3-up grid, which reads as flat "card-shell fatigue" with
// exactly 3 items (one full, even row, nothing to look at first). Split
// into one larger featured story plus the rest in a smaller row below —
// same real entries, no new content, just a visual hierarchy pass (mirrors
// the featured/secondary pattern already used on About's LivingArchive).
function CategoryTag({ slug }: { slug: string }) {
  return (
    <span className="font-hanken text-xs font-bold text-nocturne-gold">
      {journalCategory(slug)}
    </span>
  );
}

export function JournalGrid() {
  const [featured, ...rest] = journalEntries;

  return (
    <section className="w-full bg-nocturne-surface-container-lowest">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pb-20">
        {featured && (
          <Link
            href={`/journal/${featured.slug}`}
            className="group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border p-4 md:p-5 hover:border-nocturne-gold/40 transition-all duration-300 mb-8"
          >
            <div className="relative w-full h-64 md:h-full rounded-nocturne overflow-hidden bg-nocturne-surface-container-high">
              {/* TODO.md Phase 4.3: alt now describes the actual photo
                  (content/journal.ts's imageAlt) instead of duplicating
                  the headline text in the h2 right next to it.
                  TODO.md Phase 3.2: this `priority` image was missed in
                  the original placeholder="blur" pass (only Home Hero,
                  ServiceDetailHero, and JournalArticleHeader were
                  audited) — same lib/blurDataURLs.ts lookup applies here
                  since it's the same 3 possible journal images. */}
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                priority
                placeholder="blur"
                blurDataURL={blurDataURLs[featured.image]}
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              {/* DESIGN.md §32 — Glass Chip (Nocturne), normalized. */}
              <div className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full ${glassChipNocturne}`}>
                <CategoryTag slug={featured.slug} />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-3 py-2 md:py-4 md:pr-4">
              <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-text-muted">
                From the Journal
              </span>
              <h2
                style={{ fontFamily: "var(--font-headline-nocturne)" }}
                className="text-2xl sm:text-3xl font-bold text-nocturne-text-primary leading-tight group-hover:text-nocturne-gold transition-colors"
              >
                {featured.title}
              </h2>
              <p className="font-hanken text-sm text-nocturne-text-muted leading-relaxed">
                {featured.teaser}
              </p>
              <span className="mt-2 inline-flex items-center gap-2 w-fit font-hanken text-sm font-semibold text-nocturne-gold">
                Read the story
                <span className="w-8 h-8 rounded-full bg-nocturne-surface-container-lowest flex items-center justify-center group-hover:bg-nocturne-primary group-hover:text-nocturne-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    arrow_forward
                  </span>
                </span>
              </span>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <>
            <span className="block font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-text-muted mb-4">
              More from the Journal
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rest.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/journal/${entry.slug}`}
                  className="group flex flex-col justify-between rounded-nocturne-lg bg-nocturne-surface-container p-6 border border-nocturne-stage-border hover:border-nocturne-gold/40 transition-all duration-300"
                >
                  <div className="flex flex-col gap-4">
                    <div className="relative w-full h-52 rounded-nocturne overflow-hidden bg-nocturne-surface-container-high">
                      <Image
                        src={entry.image}
                        alt={entry.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                      {/* DESIGN.md §32 — Glass Chip (Nocturne), normalized. */}
              <div className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full ${glassChipNocturne}`}>
                        <CategoryTag slug={entry.slug} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2
                        style={{ fontFamily: "var(--font-headline-nocturne)" }}
                        className="text-lg font-semibold text-nocturne-text-primary group-hover:text-nocturne-gold transition-colors"
                      >
                        {entry.title}
                      </h2>
                      <p className="font-hanken text-sm text-nocturne-text-muted line-clamp-3">
                        {entry.teaser}
                      </p>
                    </div>
                  </div>
                  <div className="pt-6 mt-4 flex items-center justify-between border-t border-nocturne-stage-border">
                    <span className="font-hanken text-sm font-semibold text-nocturne-text-muted">
                      Read the story
                    </span>
                    <span className="w-9 h-9 rounded-full bg-nocturne-surface-container-lowest flex items-center justify-center text-nocturne-gold group-hover:bg-nocturne-primary group-hover:text-nocturne-on-primary transition-colors">
                      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                        arrow_forward
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* TODO.md Phase 5: the Journal list page previously only linked
            to individual articles — the thinnest internal link equity on
            the site. A closing link toward what's actually bookable,
            matching the same fix on the article detail page. */}
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
