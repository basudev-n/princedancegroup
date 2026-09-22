"use client";

import { useEffect } from "react";
import Link from "next/link";
import { site } from "@/content/site";

// DESIGN.md §30 / TODO.md Phase 0.4. Next.js has no default error boundary
// styling — an unhandled error in any client component (a form's state, a
// carousel, anything under this layout) previously showed Next's raw error
// screen: no branding, no nav, no phone number, a complete dead end on a
// booking site. Modeled on the branded `not-found.tsx` (same layout, same
// route cards, same tel: fallback), plus a "Try Again" reset button since
// this error state — unlike a 404 — may be transient.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Dev-only console visibility; no analytics/logging service is wired
    // up yet (see TODO.md Phase 1.4) — nothing to report to in production.
    console.error(error);
  }, [error]);

  return (
    <section className="w-full bg-surface-stage min-h-[70vh] flex items-center py-24">
      <div className="max-w-[640px] mx-auto px-6 text-center">
        <span className="font-sans text-xs font-semibold uppercase tracking-widest text-danza-gold">
          Something Went Wrong
        </span>
        <h1
          style={{ fontFamily: "var(--font-headline-danza)" }}
          className="mt-2 text-3xl sm:text-4xl font-bold text-on-surface-danza mb-4"
        >
          This Page Hit a Snag
        </h1>
        <p className="font-sans text-base text-on-surface-danza-muted mb-8">
          Something didn&apos;t load correctly. You can try again, or head
          back to a page that works.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-danza-crimson hover:bg-danza-crimson-hover text-white font-sans text-sm font-bold uppercase tracking-wider transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              refresh
            </span>
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-surface-border text-on-surface-danza font-sans text-sm font-semibold hover:border-danza-gold/40 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        <a
          href={`tel:${site.contact.phones[0].replace(/\s+/g, "")}`}
          className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-danza-gold hover:underline"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">call</span>
          Or call us directly at {site.contact.phones[0]}
        </a>
      </div>
    </section>
  );
}
