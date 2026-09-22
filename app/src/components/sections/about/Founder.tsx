import Image from "next/image";
import { teamMembers } from "@/content/home";

// DESIGN.md §14.3 rows 3–6, revised in the About UI/UX pass (2026-09-20,
// DESIGN.md §28). The source screen's founder pull-quote is a fabricated
// line attributed to a real named person and stays dropped entirely, not
// placeholder-labeled — same rule as §13.5 row 13.
//
// §28: this used to render a paired 1:1 card — the founder's bio next to a
// "Recognized by Leadership" Naveen Patnaik quote card — both audits
// independently flagged this as diluting the one section whose entire job
// is spotlighting the founder himself, and noted the inconsistency of
// giving a third-party quote its own founder-sized card while the page's
// other testimonials get a plain blockquote. Patnaik's quote now lives in
// Testimonials.tsx alongside the rest of the real testimonials, and this
// section is a single, uncontested shell — matching the precedent already
// set by Home's own `FounderSpotlight.tsx` for the same person. Also
// dropped a hardcoded sentence appended after `founder.bio` that restated
// the Hero paragraph's Berhampur/discipline facts with no new information.
export function Founder() {
  const [founder] = teamMembers;

  return (
    <section
      id="founder"
      className="w-full bg-nocturne-surface border-t border-nocturne-stage-border py-16 scroll-mt-24"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border overflow-hidden grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[440px]">
            {founder.photo && (
              <Image
                src={founder.photo}
                alt={founder.photoAlt ?? founder.name}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            )}
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full bg-nocturne-surface-container-high font-hanken text-[10px] font-semibold uppercase tracking-wide text-nocturne-text-muted mb-3">
              <span className="material-symbols-outlined text-[13px]" aria-hidden="true">
                psychology_alt
              </span>
              Founder &amp; Master Choreographer
            </span>
            <h2
              style={{ fontFamily: "var(--font-headline-nocturne)" }}
              className="text-3xl font-bold text-nocturne-text-primary"
            >
              {founder.name}
            </h2>
            {founder.credential && (
              <span className="mt-2 font-hanken text-base font-semibold text-nocturne-gold">
                {founder.credential}
              </span>
            )}
            <p className="mt-4 font-hanken text-sm text-nocturne-text-muted max-w-xl">
              {founder.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
