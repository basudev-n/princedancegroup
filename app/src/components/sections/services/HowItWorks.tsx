// New in this UI pass. Rendered only on the 8 generic service detail
// pages (not `wedding-events`, which already covers its own process in
// `WeddingCoordination`/`WeddingEnquiryForm`). The generic `[slug]`
// template — shared by 8 of the 9 services, whose only per-service copy
// is `content/services.ts`'s summary + a still-TODO(content) detail
// string — previously jumped straight from the hero to the closing CTA,
// which read thin next to every other Nocturne page. This adds real
// structure without inventing any fact: three honest, generic steps that
// describe how booking actually works for any of these services, with no
// invented time commitments (e.g. no fabricated "within 24 hours" claim)
// and no per-service specifics that aren't already confirmed.
const steps = [
  {
    icon: "chat",
    title: "Tell Us About Your Event",
    body: "Share your event type, date, and city, and we'll get back to you with availability.",
  },
  {
    icon: "handshake",
    title: "We Work Out the Details",
    body: "Our team talks you through performance format, troupe size, and logistics directly.",
  },
  {
    icon: "celebration",
    title: "We Perform",
    body: "Our ensemble arrives ready to deliver a live performance built around your event.",
  },
];

export function HowItWorks() {
  return (
    // UI pass (2026-09-22): this section and the Hero above it share the
    // same background token (`nocturne-surface-container-lowest`) with no
    // visual boundary between them, which read as one long empty gap
    // rather than two distinct sections. `border-t` gives a real seam —
    // same pattern already used site-wide for two adjacent same-toned dark
    // sections (about/Founder.tsx).
    <section className="w-full bg-nocturne-surface-container-lowest border-t border-nocturne-stage-border py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
          How Booking Works
        </span>
        <h2
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="mt-1 text-3xl sm:text-4xl font-bold text-nocturne-text-primary mb-10"
        >
          Simple Steps to Book Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border p-6"
            >
              <span className="absolute top-5 right-5 font-hanken text-xs font-bold text-nocturne-outline">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="material-symbols-outlined text-[22px] text-nocturne-gold mb-3 block" aria-hidden="true">
                {step.icon}
              </span>
              <h3 className="font-hanken text-sm font-semibold text-nocturne-text-primary mb-2">
                {step.title}
              </h3>
              <p className="font-hanken text-xs text-nocturne-text-muted leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
