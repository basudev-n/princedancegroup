import { Suspense } from "react";
import { Hero } from "@/components/sections/home/Hero";
import { StatsRow } from "@/components/sections/home/StatsRow";
import { AchievementsTeaser } from "@/components/sections/home/AchievementsTeaser";
import { FounderSpotlight } from "@/components/sections/home/FounderSpotlight";
import { ServiceCategories } from "@/components/sections/home/ServiceCategories";
import { RepertoireGrid } from "@/components/sections/home/RepertoireGrid";
import { Gallery } from "@/components/sections/home/Gallery";
import { BookingAvailability } from "@/components/sections/home/BookingAvailability";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { EventEnquiry } from "@/components/sections/home/EventEnquiry";

// Home page — Danza Theatrical redesign (DESIGN.md §13), extended by the
// §20 UI/UX pass (2026-09-20). See DESIGN.md §20 for the full plan: new
// section order (Founder Spotlight moved up, Gallery + Testimonials added,
// MediaShowcase removed, BookingAvailability's 9 buttons collapsed to one,
// EventEnquiry's fields reduced), all grounded in real content already
// typed in src/content/*.ts — nothing fabricated. Header/Footer share this
// system too (DESIGN.md §13.6); the Playfair Display variable they both
// need is applied at the root layout (`app/layout.tsx`), not here.
// EventEnquiry reads a `?interest=` search param (set by
// BookingAvailability's row links) via useSearchParams, which Next.js
// requires a Suspense boundary for on a statically-rendered page.
export default function HomePage() {
  return (
    <div className="bg-surface-stage">
      <Hero />
      <StatsRow />
      <FounderSpotlight />
      <AchievementsTeaser />
      <ServiceCategories />
      <RepertoireGrid />
      <Gallery />
      <BookingAvailability />
      <Testimonials />
      <Suspense fallback={null}>
        <EventEnquiry />
      </Suspense>
    </div>
  );
}
