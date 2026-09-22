import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { journalEntries } from "@/content/journal";
import { JournalArticleHeader } from "@/components/sections/journal/JournalArticleHeader";
import { JournalArticleBody } from "@/components/sections/journal/JournalArticleBody";

// Nocturne Stage token reskin (DESIGN.md §18) — data-fetching logic
// unchanged.
export function generateStaticParams() {
  return journalEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = journalEntries.find((e) => e.slug === slug);
  if (!entry) return {};
  // TODO.md Phase 2.1: each article's own real photo as its OG image
  // (openGraph isn't deep-merged with the root layout's default, so
  // title/description are restated here too).
  // TODO.md Phase 2.2: the <title> tag uses the shorter `seoTitle` where
  // one exists (same real headline, just tighter — see journal.ts) since
  // the full real title + the root layout's " — Prince Dance Group"
  // suffix ran 80-106 chars, well past where SERPs truncate. The on-page
  // heading (JournalArticleHeader) and OG/Twitter cards still use the
  // full real `entry.title` — more room there, and it's more informative
  // when shared.
  return {
    title: entry.seoTitle ?? entry.title,
    description: entry.teaser,
    alternates: { canonical: `/journal/${slug}` },
    // TODO.md Phase 2.1: noindex until a real article body lands (still a
    // literal TODO(content) placeholder — see sitemap.ts, which excludes
    // all 3 journal articles for the same reason).
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      type: "article",
      title: entry.title,
      description: entry.teaser,
      images: [{ url: entry.image, width: 900, height: 600, alt: entry.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.teaser,
      images: [entry.image],
    },
  };
}

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = journalEntries.find((e) => e.slug === slug);
  if (!entry) notFound();

  return (
    <div className="font-hanken bg-nocturne-surface-container-lowest">
      <JournalArticleHeader entry={entry} />
      <JournalArticleBody current={entry} />
    </div>
  );
}
