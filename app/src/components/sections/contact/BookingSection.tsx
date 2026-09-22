import { ContactSidebar } from "@/components/sections/contact/ContactSidebar";
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
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-10 left-1/4 w-80 h-80 rounded-full bg-nocturne-gold blur-3xl animate-bokeh" />
        <div
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-nocturne-primary blur-3xl animate-bokeh"
          style={{ animationDelay: "2.5s" }}
        />
      </div>
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] gap-8 items-start">
        <ContactSidebar />
        <EnquiryForm />
      </div>
    </section>
  );
}
