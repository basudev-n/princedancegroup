// DESIGN.md §15.2 rows 9–11. The source screen's "Technical Blueprint"
// section (specific stage-dimension/DMX specs) is dropped entirely — it
// gave two different minimum stage dimensions in two different places for
// the same claim, confirming neither was real, and publishing either could
// mislead a real venue. The FAQ pattern itself is kept (useful, real
// content for a booking business) but every fabricated specific (exact
// footage, "6 to 10 months," star ratings) is rewritten to an honest
// answer that doesn't assert an unconfirmed number. The "zero
// intermediary agency markups" claim is dropped (unconfirmed business
// practice); replaced with a plain "direct management" statement.
//
// Plain-language pass: eyebrow "Organizer Dossier" → "Common Questions"
// and heading "Frequently Addressed Inquiries" → "Frequently Asked
// Questions" — also fixes a spelling inconsistency ("Inquiries", American
// spelling) against the "Enquiry" spelling used everywhere else on this
// page and its sibling components.
//
// UI pass: background swapped from `bg-nocturne-surface-container-lowest`
// to `bg-nocturne-surface` (and Testimonial above swapped the other way)
// to restore the alternating surface/lowest section rhythm used elsewhere
// on the redesigned pages — see the note in Testimonial.tsx.
// TODO.md Phase 5: exported so app/contact/page.tsx can build the
// FAQPage JSON-LD from this exact same data — one source, no risk of the
// schema drifting from what's actually shown on the page.
export const faqs = [
  {
    q: "What are the stage and venue requirements?",
    a: "Requirements vary by production and venue — our team confirms exact stage dimensions, power, and rigging specifications once we know your venue and the acts you'd like to book.",
  },
  {
    q: "How far in advance should we book?",
    a: "Peak wedding and festival seasons fill up faster than quieter months — we recommend reaching out as early as possible once your event date is set.",
  },
  {
    q: "Do you provide custom staging and visuals?",
    a: "Every production is custom-staged for the event — reach out with your vision and we'll put together a proposal.",
  },
  {
    q: "What are the travel requirements for the troupe?",
    a: "Travel and hospitality needs are confirmed with you directly as part of the booking process, based on the event location and troupe size.",
  },
];

export function FAQ() {
  return (
    <section className="w-full bg-nocturne-surface py-16">
      <div className="max-w-[900px] mx-auto px-6 md:px-10">
        <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
          Common Questions
        </span>
        <h2
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="mt-1 text-3xl sm:text-4xl font-bold text-nocturne-text-primary mb-10"
        >
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border p-5"
            >
              {/* TODO.md Phase 3.1: the question was a <span>, so a screen
                  reader navigating by heading skipped every FAQ question
                  entirely. <h3> nested inside <summary> is valid HTML and
                  keeps the native disclosure (details/summary) behavior
                  unchanged — only the question text gains heading
                  semantics, nested correctly under this section's own
                  "Frequently Asked Questions" <h2>. */}
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3
                  style={{ fontFamily: "var(--font-headline-nocturne)" }}
                  className="text-base font-semibold text-nocturne-text-primary pr-4"
                >
                  {f.q}
                </h3>
                <span className="material-symbols-outlined text-[20px] text-nocturne-gold shrink-0 transition-transform group-open:rotate-180" aria-hidden="true">
                  expand_more
                </span>
              </summary>
              <p className="mt-3 font-hanken text-sm text-nocturne-text-muted">
                {f.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-nocturne-stage-border">
          <span className="material-symbols-outlined text-[20px] text-nocturne-gold" aria-hidden="true">
            handshake
          </span>
          <span className="font-hanken text-sm text-nocturne-text-muted">
            Direct troupe management &mdash; you coordinate directly with
            our team.
          </span>
        </div>
      </div>
    </section>
  );
}
