// Real blog post titles/teasers recovered from "old website.pdf" (Wayback
// capture, page 5). Full article bodies were not captured in the source —
// see TODO(content) markers. Do not invent article content.

export type JournalEntry = {
  slug: string;
  title: string;
  // TODO.md Phase 2.2: `title` is the real, recovered blog post title —
  // kept as-is for the on-page H1/article heading. `seoTitle` is a
  // shorter version of the SAME real title, used only in the <title>
  // meta tag (the root layout's template appends " — Prince Dance
  // Group", so the full rendered title was 80-106 chars for these 3 —
  // SERPs truncate around 60). No new fact, just tighter phrasing of the
  // same real headline.
  seoTitle?: string;
  teaser: string;
  image: string;
  // TODO.md Phase 4.3 (2026-09-21): every consumer (JournalArticleHeader,
  // JournalArticleBody, JournalGrid) previously used `alt={entry.title}`
  // for this image — a verbatim copy of the heading/link text sitting
  // right next to it, which adds nothing for a screen reader or image
  // search. Written from actually viewing each photo, describing what's
  // visible rather than restating the article headline.
  imageAlt: string;
  // TODO(content): full article body not available in source material —
  // the client should supply the real article text before this is published.
  body: string;
};

export const journalEntries: JournalEntry[] = [
  {
    slug: "dancers-for-corporate-events-help-your-business-succeed",
    title: "How Dancers for Corporate Events Help Your Business Succeed",
    seoTitle: "Dancers for Corporate Events — Why They Help",
    teaser:
      "Corporate events are a vital platform for companies to network, engage with employees and stakeholders, and leave a lasting impression.",
    image: "/images/journal/corporate-events.jpg",
    imageAlt:
      "Prince Dance Group ensemble in red and black body paint forming a human pyramid on a dark stage",
    body: "TODO(content): full article body pending — supply from the original princedancegroups.com blog.",
  },
  {
    slug: "how-indias-got-talent-season-1-winner-changed-the-indian-entertainment-landscape",
    title: "How India's Got Talent Season 1 Winner Changed the Indian Entertainment Landscape",
    seoTitle: "How Our India's Got Talent Win Changed TV",
    teaser:
      "India's Got Talent (IGT) is one of the most popular reality talent shows in India — and Prince Dance Group's win reshaped what audiences expected from it.",
    image: "/images/journal/igt-legacy.jpg",
    imageAlt:
      "Prince Dance Group performers in gold body paint forming an acrobatic pyramid with arms extended, under warm stage lighting",
    body: "TODO(content): full article body pending — supply from the original princedancegroups.com blog.",
  },
  {
    slug: "how-dance-groups-in-india-incorporate-traditional-dance-forms-into-their-performances",
    title: "How Dance Groups in India Incorporate Traditional Dance Forms into Their Performances",
    seoTitle: "How Indian Dance Groups Use Traditional Forms",
    teaser:
      "In the vibrant and diverse landscape of Indian performing arts, dance groups stand out for how they weave classical and folk traditions into contemporary staging.",
    image: "/images/journal/traditional-forms.jpg",
    imageAlt:
      "A Prince Dance Group performer in a prayer pose backed by a composited multi-armed figure motif against a sunset cityscape",
    body: "TODO(content): full article body pending — supply from the original princedancegroups.com blog.",
  },
];
