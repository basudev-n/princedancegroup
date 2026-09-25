import Image from "next/image";
import { ContactDetails, ContactExtras } from "@/components/sections/contact/ContactSidebar";
import { EnquiryForm } from "@/components/sections/contact/EnquiryForm";

// The reference screen lays out the featured act + contact card +
// assurances (narrow left) and the full booking form (wide right) as ONE
// unified two-column row, not two separate stacked sections — this wrapper
// matches that exactly. Column ratio (~35/65) matches the reference.
//
// Bokeh glow added here (same pattern as About's LivingArchive.tsx/CTA.tsx
// — dampened opacity-30 wrapper, gold + primary orbs, staggered delay):
// this is the page's actual conversion moment (the booking form itself,
// not just a link to it), the most defensible "CTA section" on this page,
// and the one section with no dark scrim behind it that had no ambient
// treatment at all — Hero and Testimonial already have their own radial
// gradients.
export function BookingSection() {
  return (
    <section className="relative w-full bg-nocturne-surface py-16 overflow-hidden">
      {/* 2026-09-25 — client's "Booking Page Background" pick: a stage
          photo kept dark and low-opacity behind the bokeh; every card on
          top (sidebar, form) has its own solid surface, so text contrast
          is unaffected. Decorative, so empty alt. */}
      <Image
        src="/images/archive/gold-dancers-blue-krishna.jpg"
        alt=""
        aria-hidden="true"
        fill
        className="object-cover opacity-[0.14]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-nocturne-surface via-nocturne-surface/60 to-nocturne-surface" />
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-10 left-1/4 w-80 h-80 rounded-full bg-nocturne-gold blur-3xl animate-bokeh" />
        <div
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-nocturne-primary blur-3xl animate-bokeh"
          style={{ animationDelay: "2.5s" }}
        />
      </div>
      {/* 2026-09-25 layout fix: form first in the DOM (leads on phones),
          contact details beside it at a matching height on desktop, then a
          full-width photo | commitments | map band. See ContactSidebar.tsx. */}
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-6 items-stretch">
          <EnquiryForm />
          <ContactDetails />
        </div>
        <ContactExtras />
      </div>
    </section>
  );
}
