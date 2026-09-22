import Link from "next/link";
import { PlaceholderNote } from "@/components/ui/Placeholder";

// DESIGN.md §17.2 row 3. Rendered only on the wedding-events service
// detail page. The first two acts are real repertoire (Dashavatar, Krishna
// Leela — DESIGN.md §8) reframed as wedding-entry choreography, a
// legitimate real-business reframing, not a new fact. The third is a
// generic sangeet-choreography concept with no specific repertoire tie.
// Every numeric specific the source screen invented (exact cast counts,
// minute ranges, prop names) is dropped in favor of one honest
// PlaceholderNote per card, same pattern as Gallery's RepertoireActs.
//
// Plain-language pass: "regalia" simplified to "costumes" in the first
// act's description (same meaning); eyebrow/heading reworded off
// "Theatrical"/"Ceremonial" phrasing.
const acts = [
  {
    act: "Grand Entry",
    title: "Krishna & Radha Ras Leela Entry",
    description:
      "A peacock-feather-costume processional built from the troupe's Krishna Leela repertoire, choreographed as the couple's grand entrance.",
  },
  {
    act: "Blessing Opener",
    title: "Dashavatar Blessing Opener",
    description:
      "The ten-avatars mythological epic, adapted as an auspicious opening blessing for the newly wedded couple.",
  },
  {
    act: "Sangeet Climax",
    title: "Sangeet Climax & Flashmob Finale",
    description:
      "A high-energy fusion choreography closing the sangeet, built to draw both families onto the floor for a shared finale.",
  },
];

export function WeddingActs() {
  return (
    <section className="w-full bg-nocturne-surface py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
          Wedding Performance Formats
        </span>
        <h2
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="mt-1 text-3xl sm:text-4xl font-bold text-nocturne-text-primary mb-10"
        >
          Signature Wedding Acts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {acts.map((piece) => (
            <div
              key={piece.title}
              className="rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border p-6 flex flex-col"
            >
              <span className="font-hanken text-[11px] font-semibold uppercase tracking-wider text-nocturne-text-muted mb-1">
                {piece.act}
              </span>
              <h3
                style={{ fontFamily: "var(--font-headline-nocturne)" }}
                className="text-lg font-semibold text-nocturne-text-primary mb-2"
              >
                {piece.title}
              </h3>
              <p className="font-hanken text-sm text-nocturne-text-muted mb-4 flex-1">
                {piece.description}
              </p>
              <div className="pt-3 border-t border-nocturne-stage-border">
                <PlaceholderNote tone="on-nocturne">Format &amp; cast size confirmed with your planner</PlaceholderNote>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 font-hanken text-sm font-semibold text-nocturne-gold hover:text-nocturne-primary transition-colors"
          >
            Enquire About These Acts <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
