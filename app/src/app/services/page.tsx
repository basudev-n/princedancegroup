import type { Metadata } from "next";
import { site } from "@/content/site";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServicesList } from "@/components/sections/services/ServicesList";
import { ServicesCTA } from "@/components/sections/services/ServicesCTA";

export const metadata: Metadata = {
  title: "Book Our Dance Troupe — Corporate, Wedding & Festival Events",
  description: `The full range of occasions ${site.name} performs for — corporate events, weddings, TV award shows, religious events, and more.`,
  alternates: {
    canonical: "/services",
  },
};

// Services — Nocturne Stage token reskin (DESIGN.md §17), client-confirmed
// 2026-09-20. Real content/structure unchanged from Phase 6 (reframed to
// the real booking business per §10 row 15) — this pass only migrates the
// generic list shell onto nocturne-* tokens; the wedding-events detail
// page gets its own richer treatment, see [slug]/page.tsx. Header/Footer
// unchanged (already Danza Theatrical, DESIGN.md §13.6).
export default function ServicesPage() {
  return (
    <div className="font-hanken bg-nocturne-surface">
      <ServicesHero />
      <ServicesList />
      <ServicesCTA />
    </div>
  );
}
