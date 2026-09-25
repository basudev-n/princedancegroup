import Image from "next/image";
import Link from "next/link";
import { PlaceholderNote } from "@/components/ui/Placeholder";
import { glassChipDanza } from "@/lib/glass";
import { archiveImageBySrc } from "@/content/archive";

// DESIGN.md §13.5 row 9. The screen's 3 categories (Royal Weddings,
// Corporate Summits, Global Tours & Festivals) map onto 3 real confirmed
// services — Global Tours doesn't exist as a confirmed offering, so it's
// generalized to Mahotsavs (festivals), which does. Troupe-scale/duration
// specifics are Stitch inventions, not shown as fabricated numbers.
// 2026-09-25: card photos now match the service hero photos on each
// service's own page (content/archive.ts `serviceHeroBySlug`) and carry
// real descriptive alt text — they were performance-3/4/5.jpg with the
// generic "performers on stage in costume" alt.
const categories = [
  {
    slug: "wedding-events",
    tag: "Luxury Weddings & Sangeet",
    title: "Royal Weddings & Sangeet Nights",
    description:
      "Memorable bridal and groom entry dances, grand stage sets, and romantic performances drawn from the troupe's classical repertoire.",
    image: "/images/archive/gold-dancers-blue-krishna.jpg",
    cta: "Enquire for Wedding Dates",
  },
  {
    slug: "corporate-events",
    tag: "Corporate Summits & Keynotes",
    title: "Corporate Summits & Brand Launches",
    description:
      "Turning your brand's message into a powerful stage opener — custom formations designed to make an impact.",
    image: "/images/archive/white-costume-stage-pyramid.jpg",
    cta: "Request Corporate Proposal",
  },
  {
    slug: "mahotsavs",
    tag: "Festivals & Cultural Tours",
    title: "Festivals & International Tours",
    description:
      "Full-length productions celebrating the spirit of India, designed for arts centers, cultural summits, and major festivals.",
    image: "/images/archive/tricolour-fan-formation.jpg",
    cta: "Enquire for Festival Booking",
  },
];

export function ServiceCategories() {
  return (
    <section className="w-full bg-surface-stage py-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
          <div>
            <span className="block w-8 h-px bg-danza-crimson mb-3" />
            <span className="font-sans text-xs font-semibold uppercase tracking-wider text-danza-crimson block mb-2">
              Signature Engagements
            </span>
            <h2
              style={{ fontFamily: "var(--font-headline-danza)" }}
              className="text-3xl sm:text-4xl font-bold text-on-surface-danza max-w-xl"
            >
              Dance Performances Designed for Your Event
            </h2>
          </div>
          <div className="flex flex-col items-start lg:items-end gap-3">
            <p className="font-sans text-sm text-on-surface-danza-muted max-w-sm">
              Whether it&apos;s a wedding sangeet or a corporate launch, every
              performance is custom-planned with its own costumes and stage
              design.
            </p>
            {/* TODO.md Phase 5: these 3 cards only cover 3 of the 9 real
                services (by design — see the file's own top comment) with
                no way to browse the rest from Home's body; /services
                itself was previously only reachable from nav/footer. */}
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-danza-gold hover:text-danza-crimson transition-colors whitespace-nowrap"
            >
              View All 9 Services
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="rounded-2xl overflow-hidden bg-surface-card border border-surface-border"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={cat.image}
                  alt={archiveImageBySrc(cat.image)?.alt ?? cat.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                {/* DESIGN.md §32 — Glass Chip (Danza), normalized (was
                    /85, one-off drift from Hero.tsx's /80). */}
                <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full ${glassChipDanza} font-sans text-[10px] font-semibold uppercase tracking-wider text-danza-gold`}>
                  {cat.tag}
                </span>
              </div>
              <div className="p-6">
                <h3
                  style={{ fontFamily: "var(--font-headline-danza)" }}
                  className="text-xl font-semibold text-on-surface-danza mb-2"
                >
                  {cat.title}
                </h3>
                <p className="font-sans text-sm text-on-surface-danza-muted mb-4">
                  {cat.description}
                </p>
                <div className="flex items-center justify-between text-xs font-sans text-on-surface-danza-dim mb-4 pt-4 border-t border-surface-border">
                  <PlaceholderNote tone="on-danza">Troupe scale to be confirmed</PlaceholderNote>
                </div>
                <Link
                  href={`/services/${cat.slug}`}
                  className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-danza-gold hover:text-danza-crimson transition-colors"
                >
                  {cat.cta}
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
