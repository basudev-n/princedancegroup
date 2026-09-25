import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { legalPages } from "@/content/legal";
import { repertoire } from "@/content/home";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { WhatsAppIcon } from "@/components/ui/icons/BrandIcons";

// Danza Theatrical footer — DESIGN.md §13.6, matching the Home screen's own
// footer markup. Real logo/name/description/repertoire/nav throughout; the
// screen's "40+ Global Tours" badge (unconfirmed) is replaced with a real
// stat rather than dropped, since a second real badge reads better than an
// empty slot; the "Patron Ledger" / VIP-ticketing newsletter framing
// (unconfirmed loyalty program) is dropped for a plain, honest signup.
//
// DESIGN.md §27: real phone/email/address were previously nowhere in the
// footer (only the email, buried in a tiny newsletter footnote) despite
// this being a booking business where visitors expect quick-reference
// contact details at the page bottom — added a real Contact column,
// same tel:/mailto:/maps links ContactSidebar.tsx already uses. The
// newsletter's disabled input+button read as a broken form, not an
// honest "coming soon" — replaced with a single non-interactive note in
// the same idiom as every other placeholder on the site (no fake
// interactive affordance). Added the site-wide bokeh glow (§25/§26) for
// visual continuity with the rest of the redesigned chrome, since the
// hard black background previously had an abrupt, ungrounded transition
// from whatever section sits above it.
//
// DESIGN.md §30: the bottom-bar legal links used to be plain,
// non-clickable text ("no real pages exist for them yet") — the one
// deliberate dead end left in the site's own navigation. Each now links
// to a real page (`content/legal.ts` + `LegalPlaceholder.tsx`) with
// honest "coming soon, contact us directly" content — no fabricated
// legal text, but no longer a dead end either.
//
// TODO.md Phase 4.1: the Repertoire column used to be its own locally
// hardcoded list of 5 strings, one of which — "Bespoke Royal Sangeet
// Acts" — didn't correspond to any real act named anywhere else on the
// site. Now reads content/home.ts's canonical `repertoire` (all 5 real
// acts), so this list can never drift from what /gallery actually shows.
// 2026-09-25 (client request — "improve the footer for desktop and mostly
// mobile: proper phone numbers, navigation, layout"). What was wrong, mostly
// on phones: five sections stacked in one very long column with Contact
// buried below Navigate/Repertoire; every link was 12px text with ~8px
// gaps (far under a usable tap size); the WhatsApp number was never shown
// (just the word "WhatsApp"); the Repertoire items looked like links (hover
// colour) but weren't; Home was missing from the nav list. On desktop the
// Contact column was only 2/12 wide, so the address and email wrapped
// awkwardly.
//
// Now: on mobile, order is Brand → Contact (two big Call / WhatsApp buttons
// that each show their real number, then email + address) → Navigate and
// Repertoire side-by-side, all rows ≥44px tall; on desktop, Brand 4 |
// Navigate 2 | Repertoire 3 | Contact 3. Repertoire entries link to their
// own /repertoire/[slug] pages and show the name before the colon
// (derived, not new copy). The two phone buttons stack full-width below
// 480px — side by side, a full number no longer fit inside a 375px-wide
// phone's half-width button and overflowed its border. Extra bottom
// padding on phones keeps the floating WhatsApp button off the last links. The "Newsletter — signup coming soon" column was
// dropped: a non-feature taking a whole column (and vertical space on
// phones) — restore it when signup actually exists.
const linkRow =
  "flex min-h-11 items-center gap-2 py-1 font-sans text-sm text-on-surface-danza-muted hover:text-danza-gold transition-colors";
const headingClass =
  "font-sans text-xs font-bold text-danza-gold tracking-[0.2em] uppercase";
const shortTitle = (title: string) => title.split(":")[0];

export function Footer() {
  const mapsQuery = encodeURIComponent(
    `${site.contact.address.line1}, ${site.contact.address.line2}, ${site.contact.address.state} ${site.contact.address.pin}`,
  );
  const waHref = `https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I'd like to enquire about booking Prince Dance Group for an event.")}`;

  return (
    <footer className="relative w-full bg-[#08090b] text-on-surface-danza border-t border-surface-border pt-14 pb-24 lg:pb-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-24 left-1/3 w-96 h-96 rounded-full bg-danza-crimson blur-3xl animate-bokeh" />
        <div
          className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-danza-gold blur-3xl animate-bokeh"
          style={{ animationDelay: "3.5s" }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 pb-10">
          {/* Brand */}
          <div className="order-1 col-span-2 lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {/* alt="": decorative — not a link, and the brand name is the
                  very next element (TODO.md Phase 4.3). */}
              <Image
                src="/images/brand/logo-main.webp"
                alt=""
                width={242}
                height={226}
                className="h-12 w-auto object-contain"
              />
              <span
                style={{ fontFamily: "var(--font-headline-danza)" }}
                className="font-bold text-lg text-white tracking-wider uppercase"
              >
                {site.name}
              </span>
            </div>
            <p className="font-sans text-sm text-on-surface-danza-muted leading-relaxed max-w-sm">
              Bringing India&apos;s ancient epics to life through dance and
              storytelling on stage. Winners of India&apos;s Got Talent,
              known for unforgettable performances.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-card border border-surface-border text-danza-gold">
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  military_tech
                </span>
                <span className="font-sans text-[10px] font-bold uppercase">
                  IGT Season 1 Champions
                </span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-card border border-surface-border text-danza-cyan">
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  public
                </span>
                <span className="font-sans text-[10px] font-bold uppercase">
                  9 Signature Services
                </span>
              </span>
            </div>
            <SocialIcons />
          </div>

          {/* Contact — first thing after the brand on phones */}
          <div className="order-2 lg:order-4 col-span-2 lg:col-span-3 flex flex-col gap-3">
            <h4 className={headingClass}>Get in Touch</h4>

            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-1 gap-3">
              <a
                href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
                aria-label={`Call ${site.contact.phone}`}
                className="flex min-h-14 items-center gap-3 rounded-2xl border border-danza-gold/40 bg-danza-gold/5 px-4 py-2.5 hover:bg-danza-gold/10 hover:border-danza-gold transition-colors"
              >
                <span className="material-symbols-outlined text-[22px] text-danza-gold shrink-0" aria-hidden="true">
                  call
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-on-surface-danza-muted">
                    Call
                  </span>
                  <span className="font-sans text-[13px] font-semibold text-white whitespace-nowrap">
                    {site.contact.phone}
                  </span>
                </span>
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp ${site.contact.whatsapp}`}
                className="flex min-h-14 items-center gap-3 rounded-2xl border border-[#25D366]/40 bg-[#25D366]/5 px-4 py-2.5 hover:bg-[#25D366]/10 hover:border-[#25D366] transition-colors"
              >
                <WhatsAppIcon className="h-[22px] w-[22px] text-[#25D366] shrink-0" />
                <span className="flex flex-col leading-tight">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-on-surface-danza-muted">
                    WhatsApp
                  </span>
                  <span className="font-sans text-[13px] font-semibold text-white whitespace-nowrap">
                    {site.contact.whatsapp}
                  </span>
                </span>
              </a>
            </div>

            <ul className="flex flex-col">
              <li>
                <a href={`mailto:${site.contact.email}`} className={`${linkRow} break-all`}>
                  <span className="material-symbols-outlined text-[18px] text-danza-gold shrink-0" aria-hidden="true">
                    mail
                  </span>
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-start gap-2 py-2 font-sans text-sm leading-relaxed text-on-surface-danza-muted hover:text-danza-gold transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px] text-danza-gold shrink-0 mt-0.5" aria-hidden="true">
                    location_on
                  </span>
                  <span>
                    {site.contact.address.line1}, {site.contact.address.line2},{" "}
                    {site.contact.address.state} &mdash; {site.contact.address.pin}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Navigate */}
          <div className="order-3 lg:order-2 col-span-1 lg:col-span-2 flex flex-col gap-1">
            <h4 className={`${headingClass} mb-2`}>Navigate</h4>
            <ul className="flex flex-col">
              {site.navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkRow}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Repertoire */}
          <div className="order-4 lg:order-3 col-span-1 lg:col-span-3 flex flex-col gap-1">
            <h4 className={`${headingClass} mb-2`}>Repertoire</h4>
            <ul className="flex flex-col">
              {repertoire.map((piece) => (
                <li key={piece.slug}>
                  <Link href={`/repertoire/${piece.slug}`} className={linkRow}>
                    {shortTitle(piece.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 lg:pr-20 border-t border-surface-border/60 flex flex-col lg:flex-row items-center justify-between gap-4 font-sans text-xs text-on-surface-danza-dim">
          <p className="text-center">&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-1 text-[11px] uppercase tracking-wider">
            {legalPages.map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="inline-flex min-h-11 items-center px-3 hover:text-danza-gold transition-colors"
              >
                {page.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
