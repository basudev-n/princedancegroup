import Image from "next/image";
import Link from "next/link";
import { PlaceholderNote } from "@/components/ui/Placeholder";
import { repertoire } from "@/content/home";

// DESIGN.md §13.5 row 10 / §20 / §26. Dashavatar, Krishna Leela, and Vande
// Mataram are documented real repertoire (DESIGN.md §8). Shiva Tandava is
// a real mythological subject and thematically consistent with the
// troupe's repertoire, but not independently confirmed — the name is
// kept, specific numbers (artist counts, stage-rider dimensions) are not.
// Card CTAs scroll to Home's own #event-enquiry form instead of
// navigating to /contact (§20 UX-audit finding — no reason to send a
// visitor off-page when the enquiry form is already further down this
// same page).
//
// §26: the footer row used to squeeze "Details on request" and the CTA
// link onto one `justify-between` line — at this card's actual content-
// column width (roughly 60% of a 2-col grid cell) both wrapped
// independently, staggering their baselines and occasionally colliding.
// Now stacked (note above, CTA below as its own small pill button) so
// neither ever needs to share horizontal room. Also added the same
// blurred theme-color bokeh glow used in the mobile menu (§25) and now
// BookingAvailability (§26) — background bokeh in a Danza Theatrical
// crimson/gold pair, clipped behind the section.
//
// TODO.md Phase 4.1: reads from content/home.ts's canonical `repertoire`
// instead of a locally-hardcoded copy (this was one of 4 competing
// definitions site-wide — see that file's own comment). A curated 4-act
// subset (all but Surya Namaskar) — Home is the lighter preview,
// /gallery's RepertoireActs.tsx is the full 5-act treatment. CTA text
// alternates Book/Commission per slug, kept local since it's a UI
// micro-variation, not a fact about the act.
const featuredSlugs = ["dashavatar", "krishna-leela", "vande-mataram", "shiva-tandava"];
const ctaBySlug: Record<string, string> = {
  dashavatar: "Book This Act",
  "krishna-leela": "Commission Act",
  "vande-mataram": "Commission Act",
  "shiva-tandava": "Book This Act",
};
const featured = featuredSlugs
  .map((slug) => repertoire.find((act) => act.slug === slug))
  .filter((act): act is (typeof repertoire)[number] => Boolean(act));

export function RepertoireGrid() {
  return (
    <section className="relative w-full bg-surface-stage py-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-10 right-0 w-80 h-80 rounded-full bg-danza-crimson blur-3xl animate-bokeh" />
        <div
          className="absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-danza-gold blur-3xl animate-bokeh"
          style={{ animationDelay: "3s" }}
        />
      </div>
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="block w-8 h-px bg-danza-gold" />
          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-danza-gold">
            Curated Works
          </span>
        </div>
        <h2
          style={{ fontFamily: "var(--font-headline-danza)" }}
          className="text-3xl sm:text-4xl font-bold text-on-surface-danza mb-10"
        >
          Our Signature Repertoire
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((piece) => (
            <div
              key={piece.slug}
              className="rounded-2xl overflow-hidden bg-surface-card border border-surface-border flex flex-col sm:flex-row"
            >
              <div className="relative w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto shrink-0">
                <Image
                  src={piece.image}
                  alt={piece.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 240px, 100vw"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-danza-crimson/90 font-sans text-[10px] font-semibold uppercase tracking-wider text-white">
                  {piece.badge}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-on-surface-danza-muted mb-1">
                  {piece.category}
                </span>
                {/* TODO.md Phase 7 (2026-09-22): links to the act's own
                    new /repertoire/[slug] page — previously this title was
                    plain text with no dedicated URL to point to. */}
                <h3
                  style={{ fontFamily: "var(--font-headline-danza)" }}
                  className="text-lg font-semibold text-on-surface-danza mb-2"
                >
                  <Link href={`/repertoire/${piece.slug}`} className="hover:text-danza-gold transition-colors">
                    {piece.title}
                  </Link>
                </h3>
                <p className="font-sans text-sm text-on-surface-danza-muted mb-4 flex-1">
                  {piece.description}
                </p>
                <div className="flex flex-col gap-2.5 pt-3 border-t border-surface-border">
                  <PlaceholderNote tone="on-danza">Details on request</PlaceholderNote>
                  <a
                    href="#event-enquiry"
                    className="inline-flex items-center justify-center gap-1.5 self-start px-4 py-2 rounded-full border border-danza-gold/40 font-sans text-sm font-semibold text-danza-gold hover:bg-danza-gold/10 hover:border-danza-gold transition-colors"
                  >
                    {ctaBySlug[piece.slug]}
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                      arrow_outward
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
