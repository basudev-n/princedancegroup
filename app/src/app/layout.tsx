import type { Metadata } from "next";
import "./globals.css";
import { plusJakartaSans, playfairDisplay, hankenGrotesk } from "@/app/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/siteUrl";
import { getPerformingGroupJsonLd } from "@/lib/structuredData";
import { JsonLd } from "@/components/JsonLd";

// DESIGN.md §30: `metadataBase` is required for Next.js to resolve
// absolute URLs for the sitemap/OG tags. The site has no confirmed
// production domain yet (Netlify isn't connected — PROGRESS.md's
// deployment checklist is still unchecked), so this reads from an env var
// with a localhost fallback rather than guessing a real domain — set
// NEXT_PUBLIC_SITE_URL once the real domain is known. `siteUrl` (shared
// with sitemap.ts/robots.ts) throws during a real Netlify build if the
// var is still missing — see lib/siteUrl.ts.

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — India's Got Talent Season 1 Champions`,
    template: `%s — ${site.name}`,
  },
  // TODO.md Phase 2.2: shortened from 217 to 155 chars — SERPs truncate
  // around 155-160. Same real facts, tighter phrasing.
  description:
    "Prince Dance Group — India's Got Talent Season 1 champions from Odisha, India. Booked for weddings, corporate events, TV award shows, and religious events.",
  // TODO.md Phase 2.1: self-referencing canonical. This is the sitewide
  // default (covers Home, which has no metadata export of its own to
  // override it); every other page sets its own below. Fixes Home's
  // BookingAvailability `?interest=<slug>#event-enquiry` rows otherwise
  // reading as ~10 separate URLs serving identical content to Google.
  alternates: {
    canonical: "/",
  },
  // TODO.md Phase 2.1: Open Graph + Twitter — previously zero `og:*`/
  // `twitter:*` tags existed anywhere, so every WhatsApp/Instagram-bio/
  // Facebook share of this site rendered as a bare grey link. Sitewide
  // default image is a real photo (full troupe, `krishna-leela-2.jpg`);
  // `/about` and each journal article override this with a more specific
  // real photo below (their own `generateMetadata`/`metadata` exports).
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — India's Got Talent Season 1 Champions`,
    description:
      "An Odisha, India-based performance troupe founded by Krishna Mohan Reddy, winner of India's Got Talent Season 1. Booked for corporate events, weddings, TV award shows, religious events, and more.",
    images: [
      {
        url: "/images/gallery/krishna-leela-2.jpg",
        width: 1800,
        height: 1200,
        alt: "Full Prince Dance Group ensemble in illuminated peacock-feather headdresses under blue stage lighting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — India's Got Talent Season 1 Champions`,
    description:
      "An Odisha, India-based performance troupe founded by Krishna Mohan Reddy, winner of India's Got Talent Season 1.",
    images: ["/images/gallery/krishna-leela-2.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} ${hankenGrotesk.variable}`}
    >
      <body className="flex min-h-screen flex-col font-jakarta antialiased">
        {/* TODO.md Phase 5: PerformingGroup JSON-LD, sitewide (every page
            carries organization identity independently, since a crawler
            or AI answer engine may land on any single page, not just
            Home). Real facts only, from content/site.ts — see
            lib/structuredData.ts for the sourcing/omission notes. */}
        <JsonLd data={getPerformingGroupJsonLd()} />
        {/* TODO.md Phase 3.2: preconnect to the font host the stylesheet
            below will immediately request from — saves a DNS+TLS round
            trip on the render-blocking request that follows. */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- Material
            Symbols isn't in next/font/google's catalog, so a stylesheet link
            is the same approach Stitch itself uses. `precedence` is required
            here (React 19's hoistable-stylesheet API) — a <link> rendered as
            a direct child of <html> in the root layout is invalid HTML and
            causes a hydration error without it; `precedence` tells React to
            manage and hoist it into <head> itself. Global since the Header
            (every page) needs the icon font.

            TODO.md Phase 3.2: `icon_names=` subsets the font request to
            only the icons this site actually renders (55, enumerated below),
            instead of the full 4,239-glyph catalog. Re-derive this list with
            `grep -rho 'material-symbols-outlined[^>]*>\s*[a-z_]*' app/src/`
            plus every icon field the grep can't see because it's rendered
            through a JS variable (services/serviceIcons.ts's map,
            about/Timeline.tsx's milestones, about/Pillars.tsx's own
            pillarIcons, services/HowItWorks.tsx's steps,
            services/WeddingCoordination.tsx, gallery/TechnicalRequirements.tsx)
            — cross-checked against every `icon: "..."` field site-wide, which
            also surfaced 3 (person_celebrate/masks/volunteer_activism) that
            exist in content/home.ts's `philosophyPillars` but are never
            actually rendered (about/Pillars.tsx deliberately overrides them,
            per its own comment) — correctly left out of this list.

            While cross-checking, also caught a real bug this subsetting
            would otherwise have baked in permanently: `serviceIcons.ts`'s
            `school-college-function` row used "auditorium", which isn't a
            real Material Symbols icon name (confirmed against Google
            Fonts' own icon metadata endpoint) — it was rendering as
            literal fallback text ("AUDITORIUM" spelled out) on every
            services page, not a glyph. Fixed at the source
            (`serviceIcons.ts`) to "theaters" and reflected here. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=arrow_back,arrow_forward,arrow_outward,auto_stories,business_center,calendar_today,call,celebration,chat,check_circle,chevron_left,chevron_right,close,description,expand_less,expand_more,favorite,flight_takeoff,format_quote,graphic_eq,group_work,groups,handshake,image,lightbulb,location_on,mail,menu,menu_book,military_tech,movie,music_note,open_in_full,person,phone_in_talk,photo_camera,photo_library,psychology_alt,public,refresh,schedule,security,stars,straighten,temple_hindu,theater_comedy,theaters,trophy,tv,verified,verified_user,volume_up,wash,zoom_in&display=swap"
          precedence="default"
        />
        {/* TODO.md Phase 3.1: skip-to-content link — zero `skip`/`sr-only`
            matches existed anywhere before this, so a keyboard or
            screen-reader visitor had to tab through 6 nav links + the
            status pill + the "Book for Events" CTA + the hamburger toggle
            on every single page before reaching real content (WCAG 2.4.1,
            Level A). `sr-only` until focused, then a visible pill matching
            the site's own Danza card styling. Targets `#main-content`
            below. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-surface-elevated focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-on-surface-danza focus:border focus:border-danza-gold/40"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
