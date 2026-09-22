import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/content/services";
import { galleryImages } from "@/content/gallery";
import { PlaceholderNote } from "@/components/ui/Placeholder";
import { serviceIcons, defaultServiceIcon } from "./serviceIcons";
import { blurDataURLs } from "@/lib/blurDataURLs";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getBreadcrumbListJsonLd } from "@/lib/structuredData";
import { JsonLd } from "@/components/JsonLd";
import { glassChipNocturne } from "@/lib/glass";

// DESIGN.md §17 — token reskin only. Same real-photo-standing-in-generically
// pattern as the Phase 6 version (no service-specific photography exists),
// same honest "detail coming soon" placeholder rather than the raw
// content-file TODO string. This UI pass adds the same per-service
// Material Symbol used in `ServicesList`/`RelatedServices` next to the
// heading, so a service keeps a consistent visual identity from the list
// row through to its own detail page.
export function ServiceDetailHero({
  service,
  index,
  total,
}: {
  service: Service;
  index: number;
  total: number;
}) {
  const image = galleryImages[index % galleryImages.length];
  const icon = serviceIcons[service.slug] ?? defaultServiceIcon;
  const pad = (n: number) => String(n).padStart(2, "0");

  // TODO.md Phase 5: replaces the old plain "← All Services" back-link —
  // a real breadcrumb trail shows where this page sits in the site
  // hierarchy, not just where you can go next. Same array feeds both the
  // visible <Breadcrumbs> and the BreadcrumbList JSON-LD below, so they
  // can't drift apart.
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.name, href: `/services/${service.slug}` },
  ];

  return (
    <section className="relative w-full bg-nocturne-surface-container-lowest py-16 md:py-20 overflow-hidden">
      {/* UI pass (2026-09-22): every other Nocturne hero (ServicesHero,
          WeddingHero, About/Contact heroes) carries the site's established
          bokeh glow (DESIGN.md §29) — this was the one hero missing it,
          which made the generic 8-page service template feel flatter than
          the rest of the site. Same dampened opacity-30 convention used
          everywhere the glow sits without a dark scrim on top of it. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(233,195,73,0.06),transparent_60%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-16 right-0 w-80 h-80 rounded-full bg-nocturne-gold blur-3xl animate-bokeh" />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-nocturne-primary blur-3xl animate-bokeh"
          style={{ animationDelay: "3.5s" }}
        />
      </div>
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        <JsonLd data={getBreadcrumbListJsonLd(breadcrumbItems)} />
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mt-6 rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[360px]">
            {/* TODO.md Phase 3.2: placeholder="blur" via the shared
                lib/blurDataURLs.ts lookup — this image cycles through
                galleryImages, a real public-folder path per service, not
                a static import, so blurDataURL can't be auto-derived. */}
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              placeholder="blur"
              blurDataURL={blurDataURLs[image.src]}
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            {/* DESIGN.md §32 — Glass Chip (Nocturne), normalized. */}
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full ${glassChipNocturne}`}>
              <span className="font-hanken text-xs font-bold uppercase tracking-wider text-nocturne-gold">
                Service {pad(index + 1)} / {pad(total)}
              </span>
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="flex items-center justify-center h-11 w-11 rounded-full bg-nocturne-gold/10 border border-nocturne-gold/20 mb-4">
              <span className="material-symbols-outlined text-[20px] text-nocturne-gold" aria-hidden="true">
                {icon}
              </span>
            </span>
            <h1
              style={{ fontFamily: "var(--font-headline-nocturne)" }}
              className="text-3xl font-bold text-nocturne-text-primary"
            >
              {service.name}
            </h1>
            <span className="mt-1 font-hanken text-sm font-semibold text-nocturne-secondary">
              Signature Service
            </span>

            <p className="mt-4 font-hanken text-base text-nocturne-text-muted">
              {service.summary}
            </p>

            <p className="mt-3">
              <PlaceholderNote tone="on-nocturne">
                Detailed service information coming soon.
              </PlaceholderNote>
            </p>

            <div className="mt-8">
              {/* TODO.md Phase 5: was "Enquire to Book" identically on
                  every one of the 9 service detail pages — now names the
                  real service, matching ServicesCTA's own per-service
                  `ctaLabel` below on the same page. */}
              <Link
                href="/contact"
                className="group font-hanken h-12 px-8 rounded-nocturne-full bg-nocturne-primary text-nocturne-on-primary text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-nocturne-primary-container transition-all active:scale-95 w-fit"
              >
                Enquire About {service.name}
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
