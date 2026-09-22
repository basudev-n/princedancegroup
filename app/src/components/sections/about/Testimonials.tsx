import { testimonials } from "@/content/testimonials";

// Real testimonials (content/testimonials.ts) — not part of the source
// screen (which had no equivalent section), but real, previously-published
// content worth keeping, carried forward from the old-system
// AboutTestimonials.tsx and restyled to Nocturne tokens.
//
// §28: previously only 4 of the 7 real quotes were used here (Naveen
// Patnaik was reserved for Founder.tsx's own recognition card, and V.K.
// Pandian / Sonali Bendre sat entirely unused). Founder.tsx is now a
// single uncontested spotlight (DESIGN.md §28) and Patnaik's quote moved
// here, so all 7 real, sourced testimonials are shown together as one
// consistent "testimonial" content type instead of splitting the same kind
// of content across two different visual treatments. The decorative
// five-star row is also dropped — the UI audit flagged that a filled gold
// 5-star row is an unambiguous review-platform rating pattern to any
// reader regardless of code intent, and these are unsolicited quotes from
// named public figures, not a star rating. Replaced with a plain quotation
// mark glyph, consistent with how a pull-quote is presented everywhere
// else on the site.
export function Testimonials() {
  return (
    <section className="w-full bg-nocturne-surface-container-lowest py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
          Words From Those We&apos;ve Performed For
        </span>
        <h2
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="mt-1 text-3xl sm:text-4xl font-bold text-nocturne-text-primary mb-10"
        >
          Recognition Across Generations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="p-6 rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border flex flex-col justify-between"
            >
              <div>
                <span
                  className="material-symbols-outlined text-[28px] text-nocturne-gold/50"
                  aria-hidden="true"
                >
                  format_quote
                </span>
                <p
                  style={{ fontFamily: "var(--font-headline-nocturne)" }}
                  className="mt-1 text-lg font-medium text-nocturne-text-primary leading-relaxed"
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <footer className="mt-5 pt-4 border-t border-nocturne-stage-border">
                <cite className="block font-hanken text-sm font-bold text-nocturne-text-primary not-italic">
                  {t.name}
                </cite>
                <span className="font-hanken text-xs text-nocturne-text-muted">
                  {t.role}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
