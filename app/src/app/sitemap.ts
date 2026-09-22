import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { repertoire } from "@/content/home";
import { siteUrl } from "@/lib/siteUrl";

// DESIGN.md §30. Lists every real, indexable route on the site so search
// engines can discover all of them, not just whatever they happen to
// crawl via links. No confirmed production domain yet (see layout.tsx's
// metadataBase comment) — reads the shared `siteUrl` helper, which throws
// during a real Netlify build if NEXT_PUBLIC_SITE_URL is missing rather
// than silently shipping localhost URLs (TODO.md Phase 0.2).
//
// TODO.md Phase 2.1: the 3 journal articles (bodies are still a literal
// `TODO(content)` placeholder, 80-87 real words each) and the 3 legal
// stub pages (37-41 words, "coming soon" content) are deliberately
// excluded — each of those 6 pages also carries its own `robots: {
// index: false }` (see their `metadata` exports). Publishing near-empty
// pages to Google under a real nav section is a site-quality signal;
// they'll be added back here once real content lands. `/journal` itself
// (the list page) stays — it's not a placeholder, just its 3 children.
// TODO.md Phase 2.3: `lastModified` is the one field Google actually uses
// from a sitemap (`changeFrequency`/`priority` are both ignored by
// Google's own documentation, kept above only because they cost nothing
// and other crawlers may still read them). There's no CMS or per-page
// edit history to draw a real per-route date from, so the honest signal
// available is "when this site was last built" — a single build-time
// timestamp applied to every entry, not a fabricated per-page date.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/gallery`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/journal`, lastModified, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // TODO.md Phase 7 (2026-09-22): the 5 new /repertoire/[slug] pages —
  // real, named, photographed content, not placeholders, so indexed like
  // every other real route above (unlike the excluded journal/legal
  // stubs).
  const repertoireRoutes: MetadataRoute.Sitemap = repertoire.map((act) => ({
    url: `${siteUrl}/repertoire/${act.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...repertoireRoutes];
}
