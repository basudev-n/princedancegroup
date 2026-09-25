import type { Metadata } from "next";
import { GalleryHero } from "@/components/sections/gallery/GalleryHero";
import { RepertoireActs } from "@/components/sections/gallery/RepertoireActs";
import { PhotoArchive } from "@/components/sections/gallery/PhotoArchive";
import { TechnicalRequirements } from "@/components/sections/gallery/TechnicalRequirements";
import { GalleryCTA } from "@/components/sections/gallery/GalleryCTA";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Performance Gallery — Dashavatar, Krishna Leela & More",
  description: `The performance repertoire of ${site.name}, India's Got Talent Season 1 champions.`,
  alternates: {
    canonical: "/gallery",
  },
};

// Gallery — Nocturne Stage redesign (DESIGN.md §16), client-confirmed
// 2026-09-20. Matches "Productions & Repertoire - Prince Dance Group"
// (dabaf3f8e1484d90ae82fa35ec7df8d5), the 4th confirmed Nocturne Stage
// screen and the one that fills the gap DESIGN.md §12 previously flagged
// (no dedicated Stitch screen existed for this route). See DESIGN.md
// §16.2 for the real/placeholder/dropped decision behind every section —
// most notably a full fake "Master Technical Document" stage rider
// (exact ft/dB/moving-head/litre figures) dropped entirely, same
// reasoning as Contact's rider (§15 row 9). Header/Footer unchanged
// (already Danza Theatrical, DESIGN.md §13.6).
export default function GalleryPage() {
  return (
    <div className="font-hanken bg-nocturne-surface">
      <GalleryHero />
      <RepertoireActs />
      <PhotoArchive />
      <TechnicalRequirements />
      <GalleryCTA />
    </div>
  );
}
