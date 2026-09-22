import Image from "next/image";
import Link from "next/link";
import type { RepertoireAct } from "@/content/home";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getBreadcrumbListJsonLd } from "@/lib/structuredData";
import { JsonLd } from "@/components/JsonLd";
import { glassChipNocturne } from "@/lib/glass";

// TODO.md Phase 7 (2026-09-22). New page type — the 5 real repertoire acts
// (Dashavatar, Krishna Leela, Shiva Tandava, Vande Mataram, Surya
// Namaskar) previously only existed as cards on /gallery, About, and
// Home, with no dedicated URL a search visitor could land on for a query
// like "Krishna Leela dance performance booking." No new facts — every
// field here is the same canonical `content/home.ts` repertoire entry
// every other page already reads (Phase 4.1's single source of truth).
// Nocturne Stage tokens, matching every other content-detail page
// (services, journal, gallery) except Home.
//
// CTA deliberately links to /contact (or /services to browse), not a
// specific service page — an act isn't tied to one service type; the
// site's own existing content already reframes these same acts as
// wedding-entry pieces, corporate openers, etc. depending on the event,
// so asserting a single-service pairing here would be inventing a
// business fact this project's rules don't allow.
export function RepertoireActDetail({ act }: { act: RepertoireAct }) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Repertoire", href: "/gallery" },
    { label: act.title, href: `/repertoire/${act.slug}` },
  ];

  return (
    <section className="w-full bg-nocturne-surface-container-lowest py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <JsonLd data={getBreadcrumbListJsonLd(breadcrumbItems)} />
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-6 rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px]">
            <Image
              src={act.image}
              alt={act.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            {/* DESIGN.md §32 — Glass Chip (Nocturne), normalized (was
                backdrop-blur-sm, one-off drift from the shared blur-md). */}
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full ${glassChipNocturne}`}>
              <span className="font-hanken text-xs font-bold uppercase tracking-wider text-nocturne-gold">
                {act.badge}
              </span>
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
              {act.category}
            </span>
            <h1
              style={{ fontFamily: "var(--font-headline-nocturne)" }}
              className="mt-1 text-3xl sm:text-4xl font-bold text-nocturne-text-primary leading-tight"
            >
              {act.title}
            </h1>
            <span className="mt-2 font-hanken text-sm italic text-nocturne-text-muted">
              {act.tagline}
            </span>
            <p className="mt-4 font-hanken text-base text-nocturne-text-muted max-w-xl">
              {act.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group font-hanken h-12 px-8 rounded-nocturne-full bg-nocturne-primary text-nocturne-on-primary text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-nocturne-primary-container transition-all active:scale-95 w-fit"
              >
                Enquire About This Act
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
              <a
                href={`tel:${site.contact.phones[0].replace(/\s+/g, "")}`}
                className="group font-hanken h-12 px-8 rounded-nocturne-full bg-nocturne-surface-container-lowest text-nocturne-text-primary text-sm font-semibold inline-flex items-center justify-center gap-2 border border-nocturne-stage-border hover:bg-nocturne-surface-container-high transition-all active:scale-95 w-fit"
              >
                Call Us Now
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform" aria-hidden="true">
                  call
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
