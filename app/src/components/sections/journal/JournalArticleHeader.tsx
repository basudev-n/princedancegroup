import Image from "next/image";
import type { JournalEntry } from "@/content/journal";
import { journalCategory } from "./journalCategory";
import { blurDataURLs } from "@/lib/blurDataURLs";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getBreadcrumbListJsonLd } from "@/lib/structuredData";
import { JsonLd } from "@/components/JsonLd";

// Nocturne Stage token reskin (DESIGN.md §18) — same layout as the Phase 6
// version, tokens only.
export function JournalArticleHeader({ entry }: { entry: JournalEntry }) {
  // TODO.md Phase 5: replaces the old plain "← Journal" back-link — a
  // real breadcrumb trail shows where this page sits in the site
  // hierarchy. Same array feeds both the visible <Breadcrumbs> and the
  // BreadcrumbList JSON-LD below, so they can't drift apart.
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Journal", href: "/journal" },
    { label: entry.title, href: `/journal/${entry.slug}` },
  ];

  return (
    <section className="w-full bg-nocturne-surface-container-lowest">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-16 md:pt-20">
        <JsonLd data={getBreadcrumbListJsonLd(breadcrumbItems)} />
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-6 flex flex-col gap-3 max-w-3xl">
          <span className="inline-flex w-fit items-center px-3 py-1 rounded-full bg-nocturne-gold/10 text-nocturne-gold font-hanken text-xs font-semibold uppercase tracking-wider">
            {journalCategory(entry.slug)}
          </span>
          <h1
            style={{ fontFamily: "var(--font-headline-nocturne)" }}
            className="text-4xl sm:text-5xl font-bold text-nocturne-text-primary leading-[1.05]"
          >
            {entry.title}
          </h1>
        </div>

        <div className="relative mt-8 w-full aspect-[16/9] rounded-nocturne-lg overflow-hidden bg-nocturne-surface-container-high">
          {/* TODO.md Phase 3.2: `sizes="100vw"` was over-fetching — this
              image never actually exceeds the page's own max-w-[1200px]
              container, so it was requesting a full-viewport-width image
              on any screen wider than 1200px. Capped to match. Also added
              placeholder="blur" via the shared lib/blurDataURLs.ts lookup
              — entry.image is a real public-folder path per article, not
              a static import, so blurDataURL can't be auto-derived. */}
          <Image
            src={entry.image}
            alt={entry.imageAlt}
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataURLs[entry.image]}
            className="object-cover"
            sizes="(min-width: 1200px) 1200px, 100vw"
          />
        </div>

        <p className="mt-8 max-w-2xl font-hanken text-base text-nocturne-text-muted">
          {entry.teaser}
        </p>
      </div>
    </section>
  );
}
