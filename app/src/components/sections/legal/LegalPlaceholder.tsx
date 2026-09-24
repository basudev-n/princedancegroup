import Link from "next/link";
import { site } from "@/content/site";

// DESIGN.md §30. Shared shell for the three legal-page stubs (Privacy
// Policy, Performance Terms, Rider Requirements). Honest placeholder
// content only — no fabricated legal text — with real contact info as the
// way to reach the business directly until the real text is supplied.
export function LegalPlaceholder({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  const phone = site.contact.phone;

  return (
    <section className="w-full bg-surface-stage min-h-[70vh] flex items-center py-24">
      <div className="max-w-[640px] mx-auto px-6 text-center">
        <span className="font-sans text-xs font-semibold uppercase tracking-widest text-danza-gold">
          Legal
        </span>
        <h1
          style={{ fontFamily: "var(--font-headline-danza)" }}
          className="mt-2 text-3xl sm:text-4xl font-bold text-on-surface-danza mb-4"
        >
          {label}
        </h1>
        <p className="font-sans text-base text-on-surface-danza-muted mb-6">
          {description}
        </p>
        <div className="rounded-2xl bg-surface-card border border-surface-border p-6 mb-8">
          <p className="font-sans text-sm text-on-surface-danza-muted">
            This page is being finalized. For questions right now, reach us
            directly at{" "}
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="text-danza-gold hover:underline"
            >
              {phone}
            </a>{" "}
            or{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="text-danza-gold hover:underline"
            >
              {site.contact.email}
            </a>
            .
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-on-surface-danza hover:text-danza-gold transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            arrow_back
          </span>
          Back to Home
        </Link>
      </div>
    </section>
  );
}
