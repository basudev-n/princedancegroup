import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/siteUrl";

// DESIGN.md §30. Standard companion to sitemap.ts — allows all crawling
// (nothing on this site needs to be hidden from search engines) and
// points at the real sitemap. Shares the same `siteUrl` guard as
// sitemap.ts/layout.tsx (TODO.md Phase 0.2).

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
