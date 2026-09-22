import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { repertoire } from "@/content/home";
import { RepertoireActDetail } from "@/components/sections/repertoire/RepertoireActDetail";
import { RelatedActs } from "@/components/sections/repertoire/RelatedActs";
import { ServicesCTA } from "@/components/sections/services/ServicesCTA";

// TODO.md Phase 7 (2026-09-22) — "the single biggest untapped SEO
// opportunity that requires no new facts." Dashavatar, Krishna Leela,
// Shiva Tandava, Vande Mataram, Surya Namaskar are real, named,
// photographed content that previously lived only as cards on /gallery,
// About, and Home, with no dedicated URL for a query like "Krishna Leela
// dance performance booking" to land on. Depended on Phase 4.1 (the
// canonical `content/home.ts` repertoire) landing first, which it has —
// every field rendered here is that same single source, not new content.
export function generateStaticParams() {
  return repertoire.map((act) => ({ slug: act.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const act = repertoire.find((a) => a.slug === slug);
  if (!act) return {};
  return {
    title: act.title,
    description: act.metaDescription,
    alternates: { canonical: `/repertoire/${slug}` },
    openGraph: {
      type: "website",
      title: act.title,
      description: act.metaDescription,
      images: [{ url: act.image, width: 900, height: 600, alt: act.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: act.title,
      description: act.metaDescription,
      images: [act.image],
    },
  };
}

export default async function RepertoireActPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const act = repertoire.find((a) => a.slug === slug);
  if (!act) notFound();

  return (
    <div className="font-hanken bg-nocturne-surface">
      <RepertoireActDetail act={act} />
      <RelatedActs currentSlug={act.slug} />
      <ServicesCTA
        heading={`Book ${act.title} for Your Event`}
        body="Enquiries for this act are reviewed directly by our team. Reach out for availability, pricing, and performance details."
        ctaLabel={`Enquire About ${act.title}`}
      />
    </div>
  );
}
