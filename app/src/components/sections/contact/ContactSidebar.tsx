import Image from "next/image";
import { site } from "@/content/site";
import { PlaceholderNote } from "@/components/ui/Placeholder";
import { SocialIcons } from "@/components/ui/SocialIcons";

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
//
// 2026-09-25 — desktop layout fix (client: "the contact page layout is off,
// especially on desktop"). This used to be ONE tall left column (photo →
// contact card → map → commitments, ~1280px) beside a ~480px form, leaving
// ~800px of empty space under the form — and on phones the whole column sat
// above the form, burying the booking CTA ~1300px down the page. Now split
// into `ContactDetails` (sits beside the form, similar height) and
// `ContactExtras` (a full-width photo | commitments | map band below), and
// BookingSection puts the form first in the DOM so it leads on phones. The
// two numbers are also stacked, labelled, tap-sized rows instead of one
// wrapped line.
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

const labelClass =
  "flex items-center gap-2 font-hanken text-[11px] font-semibold uppercase tracking-wider text-nocturne-text-muted mb-1";
const rowClass =
  "flex min-h-11 items-center gap-3 rounded-xl border border-nocturne-stage-border bg-nocturne-surface-container-lowest px-4 py-2 hover:border-nocturne-gold/40 transition-colors";

// Sits beside the enquiry form (same visual height on desktop).
export function ContactDetails() {
  return (
    <div className="h-full rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border p-6 md:p-8 flex flex-col gap-6">
      <div>
        <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
          Direct Line
        </span>
        <h2
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="mt-1 text-2xl sm:text-3xl font-bold text-nocturne-text-primary"
        >
          Talk to the Troupe
        </h2>
      </div>

      <div>
        <span className={labelClass}>
          <span className="material-symbols-outlined text-[16px] text-nocturne-gold" aria-hidden="true">
            call
          </span>
          Direct Artist Management Desk
        </span>
        <div className="flex flex-col gap-2">
          <a href={`tel:${site.contact.phone.replace(/\s+/g, "")}`} className={rowClass}>
            <span className="material-symbols-outlined text-[20px] text-nocturne-gold shrink-0" aria-hidden="true">
              call
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-hanken text-[10px] font-semibold uppercase tracking-wider text-nocturne-text-muted">
                Call
              </span>
              <span className="font-hanken text-sm font-semibold text-nocturne-text-primary">
                {site.contact.phone}
              </span>
            </span>
          </a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={rowClass}>
            <span className="material-symbols-outlined text-[20px] text-nocturne-gold shrink-0" aria-hidden="true">
              phone_in_talk
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-hanken text-[10px] font-semibold uppercase tracking-wider text-nocturne-text-muted">
                WhatsApp
              </span>
              <span className="font-hanken text-sm font-semibold text-nocturne-text-primary">
                {site.contact.whatsapp}
              </span>
            </span>
          </a>
        </div>
      </div>

      <div>
        <span className={labelClass}>
          <span className="material-symbols-outlined text-[16px] text-nocturne-gold" aria-hidden="true">
            mail
          </span>
          Booking Enquiries
        </span>
        <a
          href={`mailto:${site.contact.email}`}
          className="inline-flex min-h-11 items-center font-hanken text-sm font-semibold text-nocturne-text-primary hover:text-nocturne-gold transition-colors break-all"
        >
          {site.contact.email}
        </a>
      </div>

      <div>
        <span className={labelClass}>
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
        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex min-h-11 items-center gap-1.5 font-hanken text-xs font-semibold text-nocturne-gold hover:text-nocturne-primary transition-colors"
        >
          Get Directions
          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
            arrow_forward
          </span>
        </a>
      </div>

      <div className="mt-auto pt-4 border-t border-nocturne-stage-border">
        <span className={`${labelClass} mb-2`}>
          <span className="material-symbols-outlined text-[16px] text-nocturne-gold" aria-hidden="true">
            public
          </span>
          Follow Us
        </span>
        <SocialIcons tone="nocturne" />
      </div>
    </div>
  );
}

// Full-width band under the form: featured photo | commitments | map, three
// equal-height cards.
export function ContactExtras() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Featured act */}
      <div className="rounded-nocturne-lg overflow-hidden border border-nocturne-stage-border relative min-h-[280px]">
        <Image
          src="/images/gallery/krishna-leela-2.jpg"
          alt="Prince Dance Group performing Krishna Leela"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 380px, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nocturne-surface-container-lowest/90 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="font-hanken text-[11px] font-semibold uppercase tracking-wider text-nocturne-gold block mb-1">
            Featured Performance
          </span>
          {/* A decorative caption, not a content heading (TODO.md Phase
              3.1 — it was an <h3> before this page's only <h2>). */}
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

      {/* Commitments */}
      <div className="rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border p-6 md:p-8 flex flex-col">
        <span className="font-hanken text-[11px] font-semibold uppercase tracking-wider text-nocturne-gold block mb-3">
          Our Commitments
        </span>
        <ul className="flex flex-col gap-3">
          {assurances.map((a) => (
            <li key={a} className="flex items-start gap-2 font-hanken text-sm text-nocturne-text-primary">
              <span className="material-symbols-outlined text-[16px] text-nocturne-gold shrink-0 mt-0.5" aria-hidden="true">
                verified
              </span>
              {a}
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-4 border-t border-nocturne-stage-border">
          <PlaceholderNote tone="on-nocturne">
            Technical requirements and repertoire details available on request.
          </PlaceholderNote>
        </p>
      </div>

      {/* Map embed — TODO.md Phase 1.5. No API key/dependency (the plain
          `/maps?...&output=embed` URL); lazy-loaded, with a real `title`
          (WCAG 4.1.2). "Get Directions" above covers turn-by-turn. */}
      <div className="rounded-nocturne-lg overflow-hidden border border-nocturne-stage-border min-h-[280px]">
        <iframe
          src={`https://www.google.com/maps?q=${mapEmbedQuery}&z=13&output=embed`}
          loading="lazy"
          title={`Map showing ${site.name}'s location near ${site.contact.address.line2}`}
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-full min-h-[280px] w-full border-0"
        />
      </div>
    </div>
  );
}
