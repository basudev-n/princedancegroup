import Image from "next/image";
import { site } from "@/content/site";
import { PlaceholderNote } from "@/components/ui/Placeholder";

// DESIGN.md §15.2 rows 3–7 / §22 — the narrow left sidebar of the unified
// two-column booking section (matches the reference screen's exact
// layout: image card, then ONE combined contact card with phone/email/
// address together, then the assurances card — not split across separate
// stacked sections). Real contact block (critical fix — the source
// screen's own phone/email/address differ from PROGRESS.md's confirmed
// facts, including the pincode). "International Liaison Desks" (fictional
// Mumbai/Delhi/Dubai/London offices) is DROPPED entirely. "Production
// Assurances" trimmed to generic capability statements.
//
// TODO.md Phase 1.5 (2026-09-21): a real embedded map was added below the
// contact card — the source screen had none at this position, but for a
// physical venue clients may actually visit, an embedded map is genuinely
// useful beyond the "Get Directions" search deep-link that already
// existed (which only helps once you're already navigating, not for an
// at-a-glance "is this near me" read).
//
// §22: phone numbers are now a tel: link (were plain text — a real gap on
// mobile, where phone is this business's primary channel). The two
// disabled "coming soon" pill buttons for staging rider / repertoire deck
// (dead-button affordance, flagged by both audits) are now one honest
// plain-text line instead of two fake-clickable chips.
//
// Plain-language pass: "Live Master Tableaux" → "Featured Performance",
// "Executive Date Booking" → "Booking Enquiries", "Curator & Production
// Assurances" → "Our Commitments", and the "staging rider" jargon in the
// closing note spelled out in plain words — same facts, simpler wording.
const mapsQuery = encodeURIComponent(
  `${site.contact.address.line1}, ${site.contact.address.line2}, ${site.contact.address.state} ${site.contact.address.pin}`,
);
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

// Separate, simpler query for the embedded map only (below) — the full
// descriptive address above (building name + "in front of X") isn't a
// clean geocodable place, and without an API key the embed can't offer
// the interactive result-picking a search results page gives. Testing
// showed it landing on the wrong nearby village at a close zoom. Just the
// town + pincode, derived from the same real address fields (not a new
// fact), geocodes reliably to the right area at a town-level zoom.
const mapEmbedQuery = encodeURIComponent(
  `${site.contact.address.line2.split(",").pop()?.trim()}, ${site.contact.address.pin}`,
);
const whatsappHref = `https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}`;

const assurances = [
  "Choreography led by founder Krishna Mohan Reddy",
  "Custom staging and repertoire proposals per event",
  "Direct communication with the troupe's management",
];

export function ContactSidebar() {
  return (
    <div className="flex flex-col gap-4">
      {/* Featured act */}
      <div className="rounded-nocturne-lg overflow-hidden border border-nocturne-stage-border relative aspect-[4/3]">
        <Image
          src="/images/gallery/krishna-leela-2.jpg"
          alt="Prince Dance Group performing Krishna Leela"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 35vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nocturne-surface-container-lowest/90 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="font-hanken text-[11px] font-semibold uppercase tracking-wider text-nocturne-gold block mb-1">
            Featured Performance
          </span>
          {/* TODO.md Phase 3.1: this is a decorative card caption, not a
              content-sectioning heading — it was an <h3> that rendered
              before this page's only <h2> (EnquiryForm's "Hold Your
              Performance Date"), producing an invalid h1→h3→h2 outline. */}
          <p
            style={{ fontFamily: "var(--font-headline-nocturne)" }}
            className="text-lg font-semibold text-nocturne-text-primary"
          >
            Krishna Leela &amp; Divine Ras
          </p>
          <p className="font-hanken text-xs text-nocturne-text-muted">
            Cast size on request
          </p>
        </div>
      </div>

      {/* One combined contact card, matching the reference exactly */}
      <div className="rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border p-6 flex flex-col gap-4">
        <div>
          <span className="flex items-center gap-2 font-hanken text-[11px] font-semibold uppercase tracking-wider text-nocturne-text-muted mb-1">
            <span className="material-symbols-outlined text-[16px] text-nocturne-gold" aria-hidden="true">
              call
            </span>
            Direct Artist Management Desk
          </span>
          {/* 2026-09-24: client confirmed these are 2 distinct real
              numbers (a general booking line and a dedicated WhatsApp
              line), not 2 interchangeable ones — labeled accordingly
              instead of a flat list. */}
          <p className="flex flex-wrap gap-x-3 gap-y-1 font-hanken text-sm font-semibold text-nocturne-text-primary">
            <a
              href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
              className="hover:text-nocturne-gold transition-colors"
            >
              {site.contact.phone}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-nocturne-gold transition-colors"
            >
              {site.contact.whatsapp} (WhatsApp)
            </a>
          </p>
        </div>

        <div>
          <span className="flex items-center gap-2 font-hanken text-[11px] font-semibold uppercase tracking-wider text-nocturne-text-muted mb-1">
            <span className="material-symbols-outlined text-[16px] text-nocturne-gold" aria-hidden="true">
              mail
            </span>
            Booking Enquiries
          </span>
          <a
            href={`mailto:${site.contact.email}`}
            className="font-hanken text-sm font-semibold text-nocturne-text-primary hover:text-nocturne-gold transition-colors"
          >
            {site.contact.email}
          </a>
        </div>

        <div>
          <span className="flex items-center gap-2 font-hanken text-[11px] font-semibold uppercase tracking-wider text-nocturne-text-muted mb-1">
            <span className="material-symbols-outlined text-[16px] text-nocturne-gold" aria-hidden="true">
              location_on
            </span>
            Troupe Headquarters
          </span>
          <address className="font-hanken text-sm text-nocturne-text-primary not-italic leading-relaxed">
            {site.contact.address.line1}
            <br />
            {site.contact.address.line2}
            <br />
            {site.contact.address.state} &mdash; {site.contact.address.pin}
          </address>
        </div>

        <div className="flex flex-wrap gap-3 pt-2 border-t border-nocturne-stage-border">
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-hanken text-xs font-semibold text-nocturne-gold hover:text-nocturne-primary transition-colors"
          >
            Get Directions
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              arrow_forward
            </span>
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-hanken text-xs font-semibold text-nocturne-gold hover:text-nocturne-primary transition-colors"
          >
            Chat on WhatsApp
            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
              phone_in_talk
            </span>
          </a>
        </div>
      </div>

      {/* Map embed — TODO.md Phase 1.5. No API key/dependency needed
          (the plain `/maps?...&output=embed` URL); `loading="lazy"` and a
          real `title` keep it from being a WCAG 4.1.2 violation. The
          "Get Directions" search link above still covers turn-by-turn
          navigation — this is for "am I in the right neighborhood"
          at-a-glance context, which a search deep-link alone doesn't give. */}
      <div className="rounded-nocturne-lg overflow-hidden border border-nocturne-stage-border">
        <iframe
          src={`https://www.google.com/maps?q=${mapEmbedQuery}&z=13&output=embed`}
          loading="lazy"
          title={`Map showing ${site.name}'s location near ${site.contact.address.line2}`}
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-56 border-0 block"
        />
      </div>

      {/* Trimmed assurances */}
      <div className="rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border p-6">
        <span className="font-hanken text-[11px] font-semibold uppercase tracking-wider text-nocturne-gold block mb-3">
          Our Commitments
        </span>
        <ul className="flex flex-col gap-2">
          {assurances.map((a) => (
            <li key={a} className="flex items-start gap-2 font-hanken text-sm text-nocturne-text-primary">
              <span className="material-symbols-outlined text-[16px] text-nocturne-gold shrink-0 mt-0.5" aria-hidden="true">
                verified
              </span>
              {a}
            </li>
          ))}
        </ul>
        <p className="mt-4 pt-4 border-t border-nocturne-stage-border">
          <PlaceholderNote tone="on-nocturne">
            Technical requirements and repertoire details available on request.
          </PlaceholderNote>
        </p>
      </div>
    </div>
  );
}
