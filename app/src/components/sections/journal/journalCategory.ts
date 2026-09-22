// Small presentational helper — derives a one/two-word topic tag per real
// journal entry, directly from that entry's own real (recovered) title text
// in src/content/journal.ts. This is not a new content fact: each label
// just names the topic the post's real title already states (e.g. the
// corporate-events post is tagged "Corporate Events", one of the 9 real
// confirmed service categories in PROGRESS.md). Mirrors journal.html's
// per-card category tag pattern (DESIGN.md §12). Kept out of journal.ts
// itself since that content file is reused as-is for this migration.
const CATEGORY_BY_SLUG: Record<string, string> = {
  "dancers-for-corporate-events-help-your-business-succeed": "Corporate Events",
  "how-indias-got-talent-season-1-winner-changed-the-indian-entertainment-landscape":
    "India's Got Talent",
  "how-dance-groups-in-india-incorporate-traditional-dance-forms-into-their-performances":
    "Dance Heritage",
};

export function journalCategory(slug: string): string {
  return CATEGORY_BY_SLUG[slug] ?? "Journal";
}
