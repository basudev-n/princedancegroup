// DESIGN.md §30. Real legal-page stubs — the footer used to list these
// three labels as plain, non-clickable text ("no real pages exist for
// them yet"). Rather than leave a dead end in the site's own navigation,
// each now resolves to a real, honest page: no fabricated legal text
// (that would be worse than a placeholder), just what the page covers and
// how to reach the business directly in the meantime.

export type LegalPage = {
  slug: string;
  label: string;
  description: string;
};

export const legalPages: LegalPage[] = [
  {
    slug: "privacy-policy",
    label: "Privacy Policy",
    description:
      "How Prince Dance Group handles the information you share when you enquire about booking a performance.",
  },
  {
    slug: "performance-terms",
    label: "Performance Terms",
    description:
      "The general terms that apply when you book Prince Dance Group for a performance.",
  },
  {
    slug: "rider-requirements",
    label: "Rider Requirements",
    description:
      "Stage, sound, and logistics requirements for hosting a Prince Dance Group performance.",
  },
];
