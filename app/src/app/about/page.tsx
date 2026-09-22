import type { Metadata } from "next";
import { site } from "@/content/site";
import { Hero } from "@/components/sections/about/Hero";
import { Timeline } from "@/components/sections/about/Timeline";
import { Founder } from "@/components/sections/about/Founder";
import { Pillars } from "@/components/sections/about/Pillars";
import { LivingArchive } from "@/components/sections/about/LivingArchive";
import { Testimonials } from "@/components/sections/about/Testimonials";
import { CTA } from "@/components/sections/about/CTA";

export const metadata: Metadata = {
  // TODO.md Phase 2.3: location keywords — the description already named
  // Berhampur/Odisha (via site.origin), but the title didn't. "Berhampur"
  // appeared on only 3 of 21 pages and never in a title/meta description
  // sitewide, so there was nothing to rank for "dance troupe in
  // Berhampur" specifically.
  title: `About ${site.founder.name} — ${site.origin.town}, ${site.origin.state}'s IGT Champions`,
  description: `The story of ${site.name} — founded in ${site.origin.town}, ${site.origin.state} by ${site.founder.name}, winner of India's Got Talent Season 1.`,
  alternates: {
    canonical: "/about",
  },
  // TODO.md Phase 2.1: real founder photo as the OG image for this page
  // specifically (openGraph/twitter aren't deep-merged with the root
  // layout's defaults, so title/description are restated here too).
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `About ${site.founder.name} — ${site.name}`,
    description: `The story of ${site.name} — founded in ${site.origin.town}, ${site.origin.state} by ${site.founder.name}, winner of India's Got Talent Season 1.`,
    images: [
      {
        url: "/images/brand/founder-krishna-mohan-reddy.jpg",
        width: 900,
        height: 900,
        alt: `${site.founder.name}, founder and choreographer of ${site.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${site.founder.name} — ${site.name}`,
    description: `The story of ${site.name}, founded by ${site.founder.name}, winner of India's Got Talent Season 1.`,
    images: ["/images/brand/founder-krishna-mohan-reddy.jpg"],
  },
};

// About page — Nocturne Stage redesign (DESIGN.md §14), client-confirmed
// 2026-09-20. Matches "About Us & Heritage - Prince Dance Group", one of
// the 4 screens confirmed built against the real Nocturne Stage design
// system (unlike Home, which used an unconfirmed draft — DESIGN.md §13's
// opening note). See DESIGN.md §14.3 for the real/placeholder/reframed
// decision behind every section. Header/Footer are unchanged (already
// Danza Theatrical, DESIGN.md §13.6).
//
// §23 fix: MastersGrid.tsx (4 entirely fictional "Key Masters" placeholder
// cards — empty photos, "Name to be announced") was removed as redundant
// with Founder just below it.
//
// §28 UI/UX redesign (2026-09-20, two independent research passes, same
// method as Home §20 and Contact §22): section order changed from
// Hero → Founder → Pillars → Timeline → LivingArchive → Testimonials → CTA
// to the order below — Timeline now runs right after Hero so the page
// tells one continuous history chapter (the full origin story, unpacked
// chronologically) before its "the man today" chapter (Founder), instead
// of interleaving overlapping origin-story content across two
// non-adjacent sections. See DESIGN.md §28 for the full rationale behind
// every section's changes.
export default function AboutPage() {
  return (
    <div className="font-hanken bg-nocturne-surface">
      <Hero />
      <Timeline />
      <Founder />
      <Pillars />
      <LivingArchive />
      <Testimonials />
      <CTA />
    </div>
  );
}
