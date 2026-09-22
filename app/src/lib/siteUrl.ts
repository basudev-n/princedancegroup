// TODO.md Phase 0.2. Every page on this site is statically generated, so a
// build missing NEXT_PUBLIC_SITE_URL silently bakes `http://localhost:3000`
// into sitemap.xml, robots.txt, and every OG/canonical tag — worse than
// having no sitemap at all, since it submits 21 unreachable URLs to
// Google. This throws during an actual Netlify build (Netlify sets
// `NETLIFY=true` in its build environment) if the var is missing, so a
// misconfigured deploy fails loudly instead of shipping silently. A local
// `npm run build` (no NETLIFY env var set) still falls back to localhost,
// so this doesn't block local testing. See ARCHITECTURE.md §9 / netlify.toml.
const FALLBACK_SITE_URL = "http://localhost:3000";

function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured;

  if (process.env.NETLIFY === "true") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is not set. Set it in Netlify's Site " +
        "configuration → Environment variables before deploying — without " +
        "it, sitemap.xml, robots.txt, and every OG/canonical tag would ship " +
        "with localhost URLs baked in. See TODO.md Phase 0.2.",
    );
  }

  return FALLBACK_SITE_URL;
}

export const siteUrl = resolveSiteUrl();
