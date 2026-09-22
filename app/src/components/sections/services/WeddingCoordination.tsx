// DESIGN.md §17.2 rows 4 & 6. Rendered only on the wedding-events service
// detail page. The source screen's exact capability claims ("8 to 32
// Artists", "5.1 spatial sound", "expedited visas... non-staining metallic
// paints") and its technical checklist (Harlequin flooring, 45-minute
// changeover, DMX/GrandMA3 sync) are unsourced — dropped, same reasoning
// as Gallery's TechnicalRequirements (DESIGN.md §16.2 row 9). The three
// icon-headed categories are kept as visual structure with one honest
// generic line each.
//
// Plain-language pass: eyebrow/heading reworded off "Technical Blueprint"/
// "Engineered" phrasing to plainer terms, same meaning.
const categories = [
  {
    icon: "group_work",
    title: "Troupe Size",
    body: "Ensembles are scaled to fit your venue, from intimate ceremonies to large festival-grade stages.",
  },
  {
    icon: "graphic_eq",
    title: "Music & Choreography",
    body: "Scores and choreography are tailored to your ceremony, coordinated directly with your event planner.",
  },
  {
    icon: "flight_takeoff",
    title: "Destination Readiness",
    body: "Travel and staging logistics for destination weddings are confirmed once your venue and date are shared.",
  },
];

export function WeddingCoordination() {
  return (
    <section className="w-full bg-nocturne-surface-container-lowest py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
          Production &amp; Coordination
        </span>
        <h2
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="mt-1 text-3xl sm:text-4xl font-bold text-nocturne-text-primary mb-3"
        >
          Built for a Smooth Production
        </h2>
        <p className="font-hanken text-sm text-nocturne-text-muted max-w-2xl mb-10">
          We work directly with your wedding planner or venue team on every
          production detail ahead of the date.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {categories.map((c) => (
            <div
              key={c.title}
              className="rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border p-6"
            >
              <span className="material-symbols-outlined text-[22px] text-nocturne-gold mb-3 block" aria-hidden="true">
                {c.icon}
              </span>
              <h3 className="font-hanken text-sm font-semibold text-nocturne-text-primary mb-2">
                {c.title}
              </h3>
              <p className="font-hanken text-xs text-nocturne-text-muted leading-relaxed">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
