import Image from "next/image";
import Link from "next/link";
import { repertoire } from "@/content/home";

// TODO.md Phase 7 (2026-09-22). Cross-links to the other 4 real acts —
// same `content/home.ts` data every other page already reads, no new
// facts. Keeps a visitor on a single-act page moving through the site
// instead of dead-ending, same reasoning as services/RelatedServices.tsx.
export function RelatedActs({ currentSlug }: { currentSlug: string }) {
  const others = repertoire.filter((a) => a.slug !== currentSlug);

  return (
    <section className="w-full bg-nocturne-surface py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
              Explore More
            </span>
            <h2
              style={{ fontFamily: "var(--font-headline-nocturne)" }}
              className="mt-1 text-3xl sm:text-4xl font-bold text-nocturne-text-primary"
            >
              Other Acts in Our Repertoire
            </h2>
          </div>
          <Link
            href="/gallery"
            className="font-hanken text-sm font-semibold text-nocturne-gold hover:text-nocturne-text-primary transition-colors inline-flex items-center gap-1.5"
          >
            View Full Gallery
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {others.map((act) => (
            <Link
              key={act.slug}
              href={`/repertoire/${act.slug}`}
              className="group flex flex-col rounded-nocturne-lg overflow-hidden border border-nocturne-stage-border bg-nocturne-surface-container-lowest hover:border-nocturne-gold/30 transition-colors"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={act.image}
                  alt={act.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="p-4">
                <h3
                  style={{ fontFamily: "var(--font-headline-nocturne)" }}
                  className="text-base font-semibold text-nocturne-text-primary group-hover:text-nocturne-gold transition-colors"
                >
                  {act.title}
                </h3>
                <p className="mt-1 font-hanken text-xs text-nocturne-text-muted">
                  {act.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
