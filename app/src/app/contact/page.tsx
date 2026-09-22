import type { Metadata } from "next";
import { site } from "@/content/site";
import { Hero } from "@/components/sections/contact/Hero";
import { BookingSection } from "@/components/sections/contact/BookingSection";
import { Testimonial } from "@/components/sections/contact/Testimonial";
import { FAQ, faqs } from "@/components/sections/contact/FAQ";
import { getFaqPageJsonLd } from "@/lib/structuredData";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact & Event Booking — Gopalpur, Odisha",
  // TODO.md Phase 2.3: location keyword — the title already named
  // Gopalpur/Odisha, the description didn't.
  description: `Get in touch with ${site.name}, based in ${site.contact.address.line2.split(",").pop()?.trim()}, ${site.contact.address.state}, to book a performance for your event.`,
  alternates: {
    canonical: "/contact",
  },
};

// Contact page — Nocturne Stage redesign (DESIGN.md §15), extended by the
// §22 UI/UX pass (2026-09-20, same independent-audit method as Home's
// §20/§21). See DESIGN.md §15.2 for the original real/placeholder/dropped
// decisions and §22 for this pass's findings: the enquiry form's fields
// reduced (10 always-visible → 4 + disclosure), a real select-default bug
// fixed, phone made the required contact channel in place of email, the
// form given its own card shell, a real testimonial added as last-mile
// trust, and the two dead-button placeholder pills replaced with one
// honest line. Header/Footer unchanged (already Danza Theatrical, DESIGN.md
// §13.6).
export default function ContactPage() {
  return (
    <div className="font-hanken bg-nocturne-surface">
      {/* TODO.md Phase 5: FAQPage schema, built from the exact same
          `faqs` array FAQ.tsx renders below — real Q&As, no rich-result
          guarantee (Google restricted these to gov/health sites in Aug
          2023), still worth it for entity understanding / AI answers. */}
      <JsonLd data={getFaqPageJsonLd(faqs)} />
      <Hero />
      <BookingSection />
      <Testimonial />
      <FAQ />
    </div>
  );
}
