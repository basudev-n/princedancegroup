import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

// DESIGN.md §30. Next.js's built-in 404 is a generic unstyled page with no
// way back into the site beyond the browser's back button — a real dead
// end for a mistyped or stale URL. This replaces it with a branded page
// that links straight back to the site's main routes.
//
// TODO.md Phase 2.2: previously had no `metadata` export at all, so it
// inherited the root layout's default title/description — a 404 page
// was titled identically to the homepage. Own title + noindex now.
export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist, or the link may be out of date.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <section className="w-full bg-surface-stage min-h-[70vh] flex items-center py-24">
      <div className="max-w-[640px] mx-auto px-6 text-center">
        <span className="font-sans text-xs font-semibold uppercase tracking-widest text-danza-gold">
          404
        </span>
        <h1
          style={{ fontFamily: "var(--font-headline-danza)" }}
          className="mt-2 text-3xl sm:text-4xl font-bold text-on-surface-danza mb-4"
        >
          This Page Took a Wrong Turn
        </h1>
        <p className="font-sans text-base text-on-surface-danza-muted mb-8">
          The page you&apos;re looking for doesn&apos;t exist, or the link
          may be out of date. Here&apos;s where you might want to go
          instead.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <Link
            href="/"
            className="rounded-xl bg-surface-card border border-surface-border p-4 text-left hover:border-danza-gold/40 transition-colors"
          >
            <span className="block font-sans text-sm font-semibold text-on-surface-danza">
              Home
            </span>
            <span className="block font-sans text-xs text-on-surface-danza-muted mt-0.5">
              Start from the beginning
            </span>
          </Link>
          <Link
            href="/services"
            className="rounded-xl bg-surface-card border border-surface-border p-4 text-left hover:border-danza-gold/40 transition-colors"
          >
            <span className="block font-sans text-sm font-semibold text-on-surface-danza">
              Services
            </span>
            <span className="block font-sans text-xs text-on-surface-danza-muted mt-0.5">
              What we perform for
            </span>
          </Link>
          <Link
            href="/gallery"
            className="rounded-xl bg-surface-card border border-surface-border p-4 text-left hover:border-danza-gold/40 transition-colors"
          >
            <span className="block font-sans text-sm font-semibold text-on-surface-danza">
              Gallery
            </span>
            <span className="block font-sans text-xs text-on-surface-danza-muted mt-0.5">
              See us perform
            </span>
          </Link>
          <Link
            href="/contact"
            className="rounded-xl bg-surface-card border border-surface-border p-4 text-left hover:border-danza-gold/40 transition-colors"
          >
            <span className="block font-sans text-sm font-semibold text-on-surface-danza">
              Contact
            </span>
            <span className="block font-sans text-xs text-on-surface-danza-muted mt-0.5">
              Book us for your event
            </span>
          </Link>
        </div>

        <a
          href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
          className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-danza-gold hover:underline"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">call</span>
          Or call us directly at {site.contact.phone}
        </a>
      </div>
    </section>
  );
}
