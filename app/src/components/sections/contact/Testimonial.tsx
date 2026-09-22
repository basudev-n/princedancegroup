import { testimonials } from "@/content/testimonials";

// DESIGN.md §22 (new section). A single, static pull-quote — not the full
// rotating carousel Home uses (component and content are deliberately
// different, not reused verbatim, so a visitor who's seen both pages in
// one session doesn't get an identical widget twice) — placed between
// BookingSection and FAQ as last-mile trust reinforcement right after the
// form. Both independent audits agreed a testimonial belongs here (many
// visitors reach /contact directly via search, without passing through
// Home's carousel first) but recommended against exact duplication.
// Leads with V.K. Pandian specifically because it's the one real quote
// Home's carousel doesn't open on and About's testimonial grid doesn't
// use at all — no overlap with either page's leading impression.
//
// UI pass: background swapped from `bg-nocturne-surface` (same tone as
// BookingSection right above it) to `bg-nocturne-surface-container-lowest`,
// and FAQ below swapped the other way — restores the alternating
// surface/lowest band rhythm the redesigned pages use for section
// separation (e.g. About: Hero/Pillars/Testimonials on lowest,
// Timeline/LivingArchive/CTA on surface, never two of the same tone back
// to back). Contact previously had two consecutive "surface" sections
// here with nothing marking the boundary between them.
const quote = testimonials.find((t) => t.name === "V.K. Pandian")!;

export function Testimonial() {
  return (
    <section className="relative w-full bg-nocturne-surface-container-lowest overflow-hidden py-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(233,195,73,0.08),transparent_65%)]" />
      <div className="relative max-w-2xl mx-auto px-6 md:px-10 text-center">
        <span
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="block text-6xl text-nocturne-gold leading-none mb-4"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="text-xl sm:text-2xl italic font-medium text-nocturne-text-primary leading-relaxed"
        >
          {quote.quote}
        </p>
        <span className="mt-6 block font-hanken text-sm font-semibold uppercase tracking-widest text-nocturne-gold">
          {quote.name}
        </span>
        <span className="mt-1 block font-hanken text-xs text-nocturne-text-muted">
          {quote.role}
        </span>
      </div>
    </section>
  );
}
