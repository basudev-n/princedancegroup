import { site } from "@/content/site";
import { siteUrl } from "@/lib/siteUrl";
import type { Service } from "@/content/services";

// TODO.md Phase 5. Real facts only, sourced straight from content/site.ts —
// same rule as everywhere else on this site (ARCHITECTURE.md §1). Two
// deliberate omissions, both explicitly called out in TODO.md:
// - `sameAs` (social profile links) — omitted until real handles exist
//   (content/site.ts's own `social` object is still all empty strings).
// - `numberOfEmployees: 26` — NOT emitted. 26 is the original founding
//   troupe size (a historical fact), not a confirmed current headcount,
//   and `numberOfEmployees` asserts the latter.
//
// `@id` is a stable anchor other structured-data blocks (Service, FAQPage)
// reference via `provider`/`publisher` instead of repeating the same
// organization facts on every page.
export const organizationId = `${siteUrl}/#organization`;

export function getPerformingGroupJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "PerformingGroup",
    "@id": organizationId,
    name: site.name,
    url: siteUrl,
    logo: `${siteUrl}/images/brand/logo-crest.webp`,
    description:
      "Prince Dance Group is an Odisha, India-based performance troupe founded by Krishna Mohan Reddy, winner of India's Got Talent Season 1. Booked for corporate events, weddings, TV award shows, religious events, and more.",
    foundingLocation: {
      "@type": "Place",
      name: `${site.origin.town}, ${site.origin.district}, ${site.origin.state}, ${site.origin.country}`,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.contact.address.line1}, ${site.contact.address.line2}`,
      addressRegion: "Odisha",
      postalCode: site.contact.address.pin,
      addressCountry: "IN",
    },
    // 2026-09-24: organization-level numbers only (general + WhatsApp) —
    // the founder's personal direct line (`site.contact.founderPhone`)
    // isn't an organizational contact point.
    telephone: [site.contact.phone, site.contact.whatsapp],
    email: site.contact.email,
    award: "Winner, India's Got Talent Season 1",
  };
}

// TODO.md Phase 5: `areaServed` and `offers` need client input (service
// radius, pricing) and are deliberately omitted rather than guessed —
// see TODO.md's own client input register. `provider` references the
// PerformingGroup above by `@id` instead of repeating its facts 9 times.
// TODO.md Phase 5: honest caveat kept in the TODO, not glossed over —
// Google restricted FAQ rich results to gov/health sites in Aug 2023, so
// this is valid-but-not-displayed as a SERP rich result. Still worth
// shipping for entity understanding and AI answer surfaces (the stated
// reason in TODO.md). `faqs` is passed in rather than imported here to
// keep this file free of a UI-component dependency — the page building
// the schema already imports the same `faqs` array to render the FAQ
// section, so both stay in sync by construction.
export function getFaqPageJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

// TODO.md Phase 5. `items` are the same breadcrumb entries rendered by
// components/ui/Breadcrumbs.tsx — pass the exact same array so the
// visible trail and the structured data can't drift apart. `href` is
// relative (matching Breadcrumbs' own Link usage); resolved against
// `siteUrl` here since JSON-LD requires absolute URLs.
export function getBreadcrumbListJsonLd(items: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
    })),
  };
}

export function getServiceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.metaDescription,
    serviceType: service.name,
    provider: { "@id": organizationId },
    url: `${siteUrl}/services/${service.slug}`,
  };
}
