"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { BookingModal } from "./BookingModal";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { WhatsAppIcon } from "@/components/ui/icons/BrandIcons";

// Danza Theatrical header — DESIGN.md §13.6, matching the "Home - Prince
// Dance Group (Danza Theatrical Refined)" screen's own header markup: real
// logo/wordmark, pill nav bar with an active-state highlight, real
// "Booking 2025–26 Season" pill, real nav (not Stitch's fictional
// "Productions & Acts / Weddings & Celebrations / Corporate Events /
// Academy & Workshops"). Shared across every route — reskins the whole
// site's chrome, even though most pages' body content is still on the
// lighter §9 system (intentional mid-migration seam, PROGRESS.md Phase 7).
//
// DESIGN.md §25: mobile menu rebuilt as a full-height panel (was a small
// accordion dropdown) — heavy backdrop blur, three slow-breathing blurred
// theme-color orbs (crimson/gold/cyan, the same accent trio used
// throughout Danza Theatrical) clipped behind the nav, and each nav item
// as a large rounded button with a staggered fade/slide-in on open,
// instead of a plain small text list.
//
// DESIGN.md §29: both "Book for Events" CTAs (desktop pill, mobile panel)
// now open `BookingModal` in place instead of navigating to /contact — a
// fast in-place enquiry path from anywhere on the site. `/contact` itself
// is unchanged and still the fuller, primary enquiry surface.
//
// DESIGN.md §30: active-nav match is now prefix-based, not exact-only — a
// visitor on a detail route like `/services/wedding-events` or
// `/journal/<slug>` used to see no nav item highlighted at all, since
// `pathname === item.href` only ever matched the 6 top-level routes. Now
// a nav item is active if the pathname equals it OR starts with it plus a
// trailing slash (Home's `/` is deliberately exempted from the prefix
// check, or every route would highlight Home).
function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const pathname = usePathname();
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      // Ignore the toggle button itself — its own onClick already handles
      // opening/closing. Without this, a click while open fires this
      // mousedown-based close first, then the button's click handler
      // (which runs after mousedown) immediately re-toggles it back open.
      if (toggleButtonRef.current?.contains(target)) return;
      if (mobileNavRef.current && !mobileNavRef.current.contains(target)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  return (
    <>
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface-stage/90 backdrop-blur-xl border-b border-surface-border/60">
      <div className="h-20 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3 shrink-0"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute -inset-1 rounded-full bg-danza-cyan/25 blur-sm group-hover:bg-danza-crimson/30 transition-all duration-500" />
            {/* TODO.md Phase 3.2: `priority` was forcing eager, high-priority
                fetch of a 44×44 logo on every single page, directly
                competing with the real LCP element (the hero) for bandwidth
                — every page pays this cost, not just Home. Not the largest
                on-screen element anywhere on the site, so it doesn't need
                `priority`. Also switched to a 160×160 WebP (~21KB, resized/
                recompressed from the original 400×400 PNG at ~197KB) — still
                comfortably covers this 44px display size at high-DPI (up to
                ~3.6x) without shipping 99% unused pixel data. Source PNG kept
                at `logo-crest.png` for future re-derivation (e.g. icon.png/
                apple-icon.png were generated from it in Phase 2). */}
            <Image
              src="/images/brand/logo-crest.webp"
              alt={`${site.name} crest`}
              width={48}
              height={48}
              className="relative w-11 h-11 object-contain group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span
              style={{ fontFamily: "var(--font-headline-danza)" }}
              className="font-bold text-lg tracking-wider text-white group-hover:text-danza-crimson transition-colors"
            >
              {site.name.toUpperCase()}
            </span>
            <span className="text-[10px] font-semibold text-danza-gold uppercase tracking-[0.22em] mt-1">
              India&apos;s Got Talent Champions
            </span>
          </div>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-1 bg-surface-card/90 px-3 py-1.5 rounded-full border border-surface-border shadow-lg"
        >
          {site.navigation.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`px-4 py-1.5 rounded-full font-sans text-xs uppercase tracking-wider transition-all ${
                  active
                    ? "font-semibold text-white bg-surface-elevated border border-white/10 shadow-sm"
                    : "font-medium text-on-surface-danza-muted hover:text-white hover:bg-surface-elevated/60"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card border border-surface-border">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danza-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-danza-gold" />
            </span>
            <span className="font-sans font-medium text-danza-gold text-[11px] uppercase tracking-wider">
              Booking 2025&ndash;26 Season
            </span>
          </div>
          <a
            href={`tel:${site.contact.phones[0].replace(/\s+/g, "")}`}
            aria-label={`Call ${site.name}`}
            className="hidden lg:flex h-10 w-10 items-center justify-center rounded-full border border-surface-border text-on-surface-danza-muted hover:text-danza-gold hover:border-danza-gold/40 transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">call</span>
          </a>
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-danza-crimson hover:bg-danza-crimson-hover text-white font-sans text-xs font-bold uppercase tracking-wider shadow-[0_0_24px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.65)] transition-all"
          >
            Book for Events
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              arrow_forward
            </span>
          </button>

          <button
            ref={toggleButtonRef}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border text-white lg:hidden shrink-0"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
              {open ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>
    </header>

      {/* Rendered as a sibling of <header>, not a child — the header's own
          backdrop-blur creates a CSS containing block for `filter`/
          `backdrop-filter`, which would otherwise break this panel's
          `fixed` positioning (its top/bottom would resolve against the
          80px-tall header instead of the viewport, collapsing it to zero
          height). */}
      <div
        ref={mobileNavRef}
        className={`lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Blurred theme-colored bokeh, clipped to the panel */}
        <div className="absolute inset-0 overflow-hidden bg-surface-stage/95 backdrop-blur-2xl">
          <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-danza-crimson blur-3xl animate-bokeh" />
          <div
            className="absolute top-1/3 -right-16 w-64 h-64 rounded-full bg-danza-gold blur-3xl animate-bokeh"
            style={{ animationDelay: "2.3s" }}
          />
          <div
            className="absolute bottom-10 left-1/4 w-56 h-56 rounded-full bg-danza-cyan blur-3xl animate-bokeh"
            style={{ animationDelay: "4.6s" }}
          />
        </div>

        <nav
          aria-label="Mobile"
          className="relative h-full overflow-y-auto flex flex-col gap-3 px-5 py-6"
        >
          <span className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-surface-card/80 border border-surface-border font-sans text-[11px] font-semibold text-danza-gold uppercase tracking-wider mb-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danza-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-danza-gold" />
            </span>
            Booking 2025&ndash;26 Season
          </span>

          {site.navigation.map((item, i) => {
            const active = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
                className={`group flex items-center justify-between px-6 py-5 rounded-2xl border transition-all duration-300 ${
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                } ${
                  active
                    ? "bg-danza-crimson/15 border-danza-crimson/50 text-white"
                    : "bg-surface-card/70 border-surface-border text-on-surface-danza hover:bg-surface-card hover:border-danza-gold/40"
                }`}
              >
                <span
                  style={{ fontFamily: "var(--font-headline-danza)" }}
                  className="text-2xl font-semibold"
                >
                  {item.label}
                </span>
                <span
                  className={`material-symbols-outlined text-[22px] transition-all ${
                    active ? "text-danza-gold" : "text-on-surface-danza-dim group-hover:text-danza-gold group-hover:translate-x-1"
                  }`} aria-hidden="true"
                >
                  arrow_forward
                </span>
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setBookingOpen(true);
            }}
            style={{ transitionDelay: open ? `${site.navigation.length * 50}ms` : "0ms" }}
            className={`mt-2 flex items-center justify-center gap-2 px-6 py-5 rounded-2xl bg-danza-crimson hover:bg-danza-crimson-hover text-white font-sans text-sm font-bold uppercase tracking-wider shadow-[0_0_24px_rgba(225,29,72,0.4)] transition-all duration-300 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Book for Events
            <span className="material-symbols-outlined text-lg" aria-hidden="true">
              arrow_forward
            </span>
          </button>

          <div
            className={`grid grid-cols-2 gap-3 transition-all duration-300 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: open ? `${(site.navigation.length + 1) * 50}ms` : "0ms" }}
          >
            <a
              href={`tel:${site.contact.phones[0].replace(/\s+/g, "")}`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl border border-surface-border text-on-surface-danza font-sans text-sm font-bold uppercase tracking-wider hover:border-danza-gold/40 hover:text-danza-gold transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">call</span>
              Call Us
            </a>
            <a
              href={`https://wa.me/${site.contact.phones[0].replace(/\D/g, "")}?text=${encodeURIComponent("Hi, I'd like to enquire about booking Prince Dance Group for an event.")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-4 rounded-2xl border border-[#25D366]/40 text-[#25D366] font-sans text-sm font-bold uppercase tracking-wider hover:bg-[#25D366]/10 transition-colors"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </a>
          </div>

          <SocialIcons
            className={`justify-center pt-2 transition-all duration-300 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          />
        </nav>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
