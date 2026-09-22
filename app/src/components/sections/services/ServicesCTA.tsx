import Link from "next/link";
import { site } from "@/content/site";
import { glassPanelNocturne } from "@/lib/glass";

// DESIGN.md §17, revised in this UI pass — same real copy/structure as
// the Phase 6 version (dark rounded panel, real "enquire to book" CTA,
// shared across /services and every /services/[slug] page with
// per-service personalization). This is the one closing CTA every
// services page ends on, so it's one of the two places (alongside
// `ServicesHero`) this pass adds the site's established bokeh glow
// (already on Home and About's own closing CTA, `about/CTA.tsx`) — kept
// dampened to `opacity-30` since this section has no dark scrim on top of
// it.
//
// UI pass (2026-09-22, client request): the card used to be a flat, fully
// opaque `bg-nocturne-primary` block. First glass attempt tinted the whole
// panel pink (`bg-nocturne-primary/[0.12]`) and relied on backdrop-blur
// alone to pick up the section's outer bokeh — read as a muddy
// brownish-pink smear and didn't match the rest of the site, because
// that's not actually how glass renders anywhere else here. The site's one
// real, proven glass surface is Header/the mobile-menu overlay
// (`bg-surface-stage/9X backdrop-blur-2xl`): a near-opaque *dark* base,
// with its own small, vivid, clipped bokeh blobs glowing from inside the
// panel — not a colored tint counting on whatever happens to blur through
// from behind. Rebuilt to match that exact formula instead of inventing a
// new one: dark `bg-nocturne-surface-container-lowest/90` base, the
// standard `border-nocturne-stage-border` every other card on the site
// uses, and two inner gold/pink bokeh blobs clipped to this panel
// (mirroring Header's mobile menu almost 1:1). Text stays on the standard
// light `nocturne-text-primary`/`nocturne-text-muted` tokens every other
// dark Nocturne card already uses. The primary CTA stays fully opaque/
// solid — one confident, saturated action against the glass — while
// "Call Us Now" keeps a lighter glass treatment for secondary-action
// hierarchy.
export function ServicesCTA({
  eyebrow = "Now Booking — 2025–26 Season",
  heading = `Bring ${site.name} to Your Event`,
  body = "From corporate stages to wedding celebrations, enquiries are reviewed directly by our team. Reach out for availability, pricing, and performance details.",
  // TODO.md Phase 5: was a hardcoded "Enquire to Book" every time this
  // component renders — the same anchor text on all 10 pages that use it
  // (the /services list page plus all 9 detail pages). Now overridable so
  // each detail page's link text can name the real service instead of
  // reading identically everywhere.
  ctaLabel = "Enquire to Book",
  // UI pass (2026-09-22): optional per-service Material Symbol (the same
  // one already shown in ServiceDetailHero/ServicesList/RelatedServices —
  // `serviceIcons.ts`), rendered as a large faint watermark. The card's
  // content column is `max-w-2xl`/`max-w-xl` inside a full 1200px-wide
  // panel, so at desktop widths the right ~40% was flat, empty pink with
  // nothing in it. Purely decorative, no new fact — omitted entirely (no
  // watermark) on the generic /services list and /repertoire CTAs, which
  // have no single service to represent.
  icon,
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
  ctaLabel?: string;
  icon?: string;
}) {
  const phone = site.contact.phones[0];

  return (
    <section className="relative w-full bg-nocturne-surface-container-lowest pb-16 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-10 left-1/4 w-80 h-80 rounded-full bg-nocturne-gold blur-3xl animate-bokeh" />
        <div
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-nocturne-primary blur-3xl animate-bokeh"
          style={{ animationDelay: "2.5s" }}
        />
      </div>
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        {/* DESIGN.md §32 — Glass Panel (Nocturne), now via the shared
            lib/glass.ts constant instead of a hand-written duplicate of
            it (this card was the formula's original source, written just
            before the pattern was formalized). */}
        <div className={`relative rounded-nocturne-lg ${glassPanelNocturne} text-nocturne-text-primary p-8 md:p-12 overflow-hidden shadow-2xl shadow-black/50`}>
          {/* Inner bokeh, clipped to this panel — same formula as
              Header.tsx's mobile-menu overlay (dark near-opaque glass +
              its own glowing blobs), not a colored tint of the glass
              itself. */}
          <div className="absolute inset-0 -z-10 pointer-events-none opacity-70">
            <div className="absolute -top-16 -left-10 w-72 h-72 rounded-full bg-nocturne-primary blur-3xl animate-bokeh" />
            <div
              className="absolute -bottom-20 right-0 w-72 h-72 rounded-full bg-nocturne-gold blur-3xl animate-bokeh"
              style={{ animationDelay: "2.3s" }}
            />
          </div>
          {/* Glass sheen — a thin light-to-transparent line along the top
              edge, the standard glassmorphism "light hitting the surface"
              cue. */}
          <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          {icon && (
            // Inline font-size, not a text-[…] utility: Google's own
            // Material Symbols stylesheet ships an unlayered
            // `.material-symbols-outlined { font-size: 24px; }` rule, which
            // beats any `@layer utilities` class regardless of specificity
            // — every icon site-wide silently renders at 24px no matter
            // what size utility is applied (invisible at the 14-22px sizes
            // used elsewhere, obvious at this one's intended 220px).
            // Flagged separately as a sitewide fix; inline style is the
            // one reliable override available here.
            <span
              className="material-symbols-outlined hidden lg:block absolute -z-10 -right-6 top-1/2 -translate-y-1/2 leading-none text-nocturne-gold/[0.12] pointer-events-none select-none"
              style={{ fontSize: "220px" }}
              aria-hidden="true"
            >
              {icon}
            </span>
          )}
          <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nocturne-surface-container border border-nocturne-stage-border mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-nocturne-secondary animate-pulse" />
            <span className="font-hanken text-xs uppercase tracking-wider">
              {eyebrow}
            </span>
          </div>

          <h2
            style={{ fontFamily: "var(--font-headline-nocturne)" }}
            className="text-3xl sm:text-4xl font-bold max-w-2xl"
          >
            {heading}
          </h2>
          <p className="mt-4 font-hanken text-base text-nocturne-text-muted max-w-xl">
            {body}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="font-hanken h-[52px] px-8 rounded-nocturne-full bg-nocturne-primary text-nocturne-on-primary text-sm font-semibold inline-flex items-center justify-center hover:bg-nocturne-primary-container transition-all shadow-lg shadow-nocturne-primary/20 active:scale-95"
            >
              {ctaLabel}
            </Link>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="group font-hanken h-[52px] px-8 rounded-nocturne-full bg-nocturne-surface-container backdrop-blur-sm text-nocturne-text-primary text-sm font-semibold inline-flex items-center justify-center gap-2 border border-nocturne-stage-border hover:bg-nocturne-surface-container-high hover:border-nocturne-gold/30 transition-all active:scale-95"
            >
              Call Us Now
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform" aria-hidden="true">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
