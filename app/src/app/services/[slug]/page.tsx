import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/content/services";
import { ServiceDetailHero } from "@/components/sections/services/ServiceDetailHero";
import { WeddingHero } from "@/components/sections/services/WeddingHero";
import { WeddingActs } from "@/components/sections/services/WeddingActs";
import { WeddingCoordination } from "@/components/sections/services/WeddingCoordination";
import { WeddingEnquiryForm } from "@/components/sections/services/WeddingEnquiryForm";
import { HowItWorks } from "@/components/sections/services/HowItWorks";
import { RelatedServices } from "@/components/sections/services/RelatedServices";
import { ServicesCTA } from "@/components/sections/services/ServicesCTA";
import { serviceIcons, defaultServiceIcon } from "@/components/sections/services/serviceIcons";
import { getServiceJsonLd } from "@/lib/structuredData";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  // TODO.md Phase 2.2: `service.summary` is on-page marketing copy (no
  // location, no entity) and was previously reused verbatim as the SERP
  // description too — one of them ran 175 chars. `metaDescription` is a
  // dedicated, shorter field written for search snippets specifically.
  return {
    title: service.name,
    description: service.metaDescription,
    alternates: { canonical: `/services/${slug}` },
  };
}

// Nocturne Stage token reskin (DESIGN.md §17) — data-fetching logic
// unchanged. The `wedding-events` slug additionally renders the extra
// sections built from the "Weddings & Celebrations" Stitch screen
// (DESIGN.md §17.2); the other 8 services keep the shared generic hero.
//
// This UI pass adds two more shared sections to every detail page, in
// this scope (not `content/services.ts`, no new facts): `HowItWorks` (the
// 8 generic pages only — `wedding-events` already covers its own process
// in `WeddingCoordination`/`WeddingEnquiryForm`, so it would be
// redundant there) and `RelatedServices` (all 9 pages, right before the
// closing CTA) — previously the generic template went straight from the
// hero to the CTA, noticeably thinner than every other page on the site.
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = services.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();
  const service = services[index];
  const isWeddingEvents = slug === "wedding-events";

  return (
    <div className="font-hanken bg-nocturne-surface">
      {/* TODO.md Phase 5: Service schema, one per real service, wired to
          the sitewide PerformingGroup via `provider`. */}
      <JsonLd data={getServiceJsonLd(service)} />
      <ServiceDetailHero service={service} index={index} total={services.length} />
      {isWeddingEvents ? (
        <>
          <WeddingHero />
          <WeddingActs />
          <WeddingCoordination />
          <WeddingEnquiryForm />
        </>
      ) : (
        <HowItWorks />
      )}
      <RelatedServices currentSlug={service.slug} />
      {/* TODO.md Phase 5: ctaLabel varies the button's own anchor text
          per service too, not just the heading above it — was "Enquire
          to Book" identically on all 9 detail pages. */}
      <ServicesCTA
        heading={`Enquire About ${service.name}`}
        body="Enquiries for this service are reviewed directly by our team. Reach out for availability, pricing, and performance details."
        ctaLabel={`Enquire About ${service.name}`}
        icon={serviceIcons[service.slug] ?? defaultServiceIcon}
      />
    </div>
  );
}
