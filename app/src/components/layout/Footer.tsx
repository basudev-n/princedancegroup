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
export function Footer() {
  const mapsQuery = encodeURIComponent(
    `${site.contact.address.line1}, ${site.contact.address.line2}, ${site.contact.address.state} ${site.contact.address.pin}`,
  );

  return (
    <footer className="relative w-full bg-[#08090b] text-on-surface-danza border-t border-surface-border pt-16 pb-10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-24 left-1/3 w-96 h-96 rounded-full bg-danza-crimson blur-3xl animate-bokeh" />
        <div
          className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-danza-gold blur-3xl animate-bokeh"
          style={{ animationDelay: "3.5s" }}
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
          {/* Brand */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {/* TODO.md Phase 3.2: see layout/Header.tsx for the full
                  rationale — same 160×160 WebP (~21KB vs. the original
                  400×400 PNG's ~197KB) at this 40px display size.
                  TODO.md Phase 4.3: alt="" — unlike the header logo (which
                  doubles as the accessible name for the "go to homepage"
                  link it sits inside), this one is purely decorative: it's
                  not a link, and the brand name is already the very next
                  visible/DOM element. It was previously duplicating the
                  header's own "{site.name} crest" alt text with no
                  functional purpose on the same page. */}
              <Image
                src="/images/brand/logo-crest.webp"
                alt=""
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <span
                style={{ fontFamily: "var(--font-headline-danza)" }}
                className="font-bold text-lg text-white tracking-wider uppercase"
              >
                {site.name}
              </span>
            </div>
            <p className="font-sans text-xs text-on-surface-danza-muted leading-relaxed max-w-sm">
              Bringing India&apos;s ancient epics to life through dance and
              storytelling on stage. Winners of India&apos;s Got Talent,
              known for unforgettable performances.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
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
            <SocialIcons className="pt-1" />
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-sans text-xs font-bold text-danza-gold tracking-[0.2em] uppercase">
              Navigate
            </h4>
            <ul className="flex flex-col gap-2 font-sans text-xs text-on-surface-danza-muted">
              {site.navigation
                .filter((item) => item.href !== "/")
                .map((item) => (
                  <li key={item.href} className="hover:text-danza-crimson transition-colors">
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Signature Repertoire */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-sans text-xs font-bold text-danza-gold tracking-[0.2em] uppercase">
              Repertoire
            </h4>
            <ul className="flex flex-col gap-2 font-sans text-xs text-on-surface-danza-muted">
              {repertoire.map((piece) => (
                <li key={piece.slug} className="hover:text-danza-crimson transition-colors">
                  {piece.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — real phone/email/address, previously missing from the footer entirely */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-sans text-xs font-bold text-danza-gold tracking-[0.2em] uppercase">
              Get in Touch
            </h4>
            <ul className="flex flex-col gap-2.5 font-sans text-xs text-on-surface-danza-muted">
              <li>
                <a
                  href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-1.5 hover:text-danza-gold transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px] text-danza-gold shrink-0" aria-hidden="true">
                    call
                  </span>
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I'd like to enquire about booking Prince Dance Group for an event.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-danza-gold transition-colors"
                >
                  <WhatsAppIcon className="h-[14px] w-[14px] text-danza-gold shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="flex items-center gap-1.5 hover:text-danza-gold transition-colors break-all"
                >
                  <span className="material-symbols-outlined text-[14px] text-danza-gold shrink-0" aria-hidden="true">
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
                  className="flex items-start gap-1.5 hover:text-danza-gold transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px] text-danza-gold shrink-0 mt-0.5" aria-hidden="true">
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

          {/* Newsletter — honest single note, not a fake-interactive disabled form */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-sans text-xs font-bold text-danza-gold tracking-[0.2em] uppercase">
              Newsletter
            </h4>
            <p className="font-sans text-xs text-on-surface-danza-muted">
              Updates on new performances and press features.
            </p>
            <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-card border border-surface-border">
              <span className="material-symbols-outlined text-[14px] text-on-surface-danza-dim" aria-hidden="true">
                schedule
              </span>
              <span className="font-sans text-[10px] italic text-on-surface-danza-dim">
                Signup coming soon
              </span>
            </span>
          </div>
        </div>

        <div className="pt-6 border-t border-surface-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-on-surface-danza-dim">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[11px] uppercase tracking-wider">
            {legalPages.map((page, i) => (
              <span key={page.slug} className="flex items-center gap-3 whitespace-nowrap">
                {i !== 0 && <span className="text-on-surface-danza-dim/50">&bull;</span>}
                {/* TODO.md Phase 3.1: this 11px inline link's own text box is
                    well under the 44px touch-target minimum. Expanding the
                    visible link itself would enlarge the whole bottom bar;
                    instead a relatively-positioned invisible ::before grows
                    the tappable area (14px top/bottom — enough to clear 44px
                    against this line's own height — plus a small 6px
                    horizontal buffer that stops short of the adjacent
                    bullet, so neighboring links' hit areas don't overlap)
                    without moving anything visible. */}
                <Link
                  href={`/${page.slug}`}
                  className="relative hover:text-danza-gold transition-colors before:absolute before:-inset-y-[14px] before:-inset-x-1.5 before:content-['']"
                >
                  {page.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
