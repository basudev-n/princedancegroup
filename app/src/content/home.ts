// Content specific to the Stitch-exact Home page rebuild. See DESIGN.md §10
// for the real/placeholder/reframed decision behind every field here — this
// file is the implementation of that table, not a place to add new
// invented specifics of its own.

// TODO.md Phase 7 (2026-09-22): several consumers destructure/index this
// by position — `gallery/GalleryHero.tsx`'s `const [founding, , igt] =
// heroStats`, `contact/Hero.tsx`/`services/WeddingHero.tsx`'s
// `heroStats[0]`/`heroStats[2]` — which would read `undefined` (and crash
// on `.label`) if this array ever shrank below 3 entries. The trailing
// `as const` is what actually prevents that: on an array literal it makes
// TypeScript infer a fixed-length readonly *tuple* type, not a general
// `{...}[]`, so shortening this array is a compile error at every
// positional consumer, not a runtime crash. Keep `as const` — removing it
// (or widening the type to `HeroStat[]` somewhere) would silently drop
// that guarantee.
export const heroStats = [
  {
    value: "26",
    label: "Original Troupe Members",
    detail: "The daily-wage workers who won India's Got Talent",
  },
  {
    value: "9",
    label: "Signature Services",
    detail: "Corporate, wedding, religious, and more",
  },
  {
    value: "IGT",
    label: "National Champions",
    detail: "India's Got Talent, Season 1",
  },
  {
    value: "6",
    label: "National Media Milestones",
    detail: "IPL, Sony TV, History Channel, NDTV, and more",
  },
] as const;

// TODO.md Phase 4.1 (2026-09-21): single source of truth for the site's
// real repertoire, replacing 4 previously-independent, drifting copies
// (`home/RepertoireGrid.tsx` had 4 acts, `gallery/RepertoireActs.tsx` had
// 5, `layout/Footer.tsx` had 5 *labels* including one — "Bespoke Royal
// Sangeet Acts" — that appeared nowhere else on the site, and
// `about/LivingArchive.tsx` had 3 named + 2 generic and its own spelling
// of Krishna Leela). All 5 real acts now live here once; every consumer
// imports this array instead of hardcoding its own copy. Page-specific
// presentation (RepertoireActs' "Act I/II/III" numbering and per-act stat
// labels, RepertoireGrid's CTA button text) stays local to each
// component, since that's layout flavor, not a fact about the act itself.
export type RepertoireAct = {
  slug: string;
  category: string; // short descriptive tag, e.g. "Classical Odissi"
  title: string; // canonical name — the only spelling any page should use
  badge: string; // single highlight chip, e.g. "Flagship Performance"
  tagline: string; // short poetic subtitle for compact tiles (3-5 words)
  description: string;
  // TODO.md Phase 7 (2026-09-22): added for the new /repertoire/[slug]
  // pages' SERP snippets — `description` above runs 111-220 chars (fine
  // for on-page body copy, several run past where SERPs truncate around
  // 155-160). Same real facts as `description`, just tighter, same
  // pattern as `content/services.ts`'s own `metaDescription` field.
  metaDescription: string;
  image: string;
  imageAlt: string;
};

export const repertoire: RepertoireAct[] = [
  {
    slug: "dashavatar",
    category: "Mayurbhanj Chhau & Odissi",
    title: "Dashavatar: The Ten Cosmic Incarnations",
    badge: "Flagship Performance",
    tagline: "The Divine Incarnations",
    description:
      "The troupe's flagship epic tracing the ten avatars of Vishnu — interlocking human formations recreating ancient Orissan temple sculpture, performed with the same disciplined physical storytelling the troupe is known for.",
    metaDescription:
      "Dashavatar: The Ten Cosmic Incarnations — Prince Dance Group's flagship epic, performed by India's Got Talent Season 1 champions from Odisha.",
    image: "/images/gallery/krishna-leela-1.jpg",
    imageAlt:
      "Prince Dance Group performers in peacock-crown Krishna Leela costume on stage, one dancer in a golden Krishna costume kneeling beside a dancer in red and gold bridal-style dress",
  },
  {
    slug: "krishna-leela",
    category: "Classical Odissi",
    title: "Krishna Leela & Divine Ras",
    badge: "Vrindavan Celestial Suite",
    tagline: "Celestial Romance & Flute",
    description:
      "A devotional performance celebrating Lord Krishna's divine play — lyrical Odissi footwork honoring the cosmic playfulness of Vrindavan, at the heart of the troupe's original award-winning act.",
    metaDescription:
      "Krishna Leela & Divine Ras — the original award-winning act behind Prince Dance Group's India's Got Talent Season 1 win, from Odisha.",
    image: "/images/gallery/krishna-leela-2.jpg",
    imageAlt:
      "Full Prince Dance Group ensemble in illuminated peacock-feather headdresses under blue stage lighting",
  },
  {
    slug: "shiva-tandava",
    category: "Chhau & Mardala Percussion",
    title: "Shiva Tandava Stotram",
    badge: "High-Energy Performance",
    tagline: "Cosmic Dissolution in Rhythm",
    description:
      "Driven by the cadence of live Mardala percussion and Sanskrit chants, this piece explores the primal dance of Nataraja.",
    metaDescription:
      "Shiva Tandava Stotram — a high-energy Mardala percussion piece from Prince Dance Group, India's Got Talent Season 1 champions, Odisha.",
    image: "/images/gallery/performance-3.jpg",
    // TODO.md Phase 4.3: describes what the photo actually shows (a
    // many-armed prop headdress, not a literal Shiva costume) rather than
    // asserting it depicts this specific act — same "real photo as
    // illustrative stand-in, no service-specific photography exists yet"
    // pattern used everywhere else on the site.
    imageAlt:
      "Prince Dance Group performer in blue body paint wearing an elaborate many-armed golden headdress prop, arms raised in a devotional pose under stage lighting",
  },
  {
    slug: "vande-mataram",
    category: "Physical Theater",
    title: "Vande Mataram Patriot Symphony",
    badge: "National Honor Act",
    tagline: "National Heritage in Motion",
    description:
      "High-energy physical theater celebrating national heritage, with daring pyramid lifts and sweeping flag performances.",
    metaDescription:
      "Vande Mataram Patriot Symphony — patriotic physical theater from Prince Dance Group, India's Got Talent Season 1 champions, Odisha.",
    image: "/images/archive/patriotic-flag-act.jpg",
    // 2026-09-25: was performance-5.jpg (an elephant-masked ensemble piece
    // — the mismatch flagged in TODO.md Phase 4.3). Now the client's own
    // "Patriotic Flag Act" photo, which matches the description exactly.
    imageAlt:
      "Performers in saffron, white and green body paint kneeling in a tricolour formation with a blue Ashoka Chakra wheel behind them, on a beach",
  },
  {
    slug: "surya-namaskar",
    category: "Solar Rhythms & Formation",
    title: "Surya Namaskar: The 12 Solar Salutations",
    badge: "Precise Group Formations",
    tagline: "Ensemble in Perfect Formation",
    description:
      "Physical theater combining sun-salutation postures with the troupe's martial-arts-rooted ensemble choreography.",
    metaDescription:
      "Surya Namaskar: The 12 Solar Salutations — physical theater from Prince Dance Group, India's Got Talent Season 1 champions, Odisha.",
    image: "/images/archive/acrobatic-pyramid.jpg",
    // 2026-09-25: was performance-4.jpg (the same Ganesha-masked piece as
    // Vande Mataram used to show — no sun-salutation imagery). Now a
    // precise group-formation photo under warm golden light, matching the
    // "Precise Group Formations" badge; not literal sun-salutation
    // postures.
    imageAlt:
      "Performers stacked in a tall acrobatic pyramid on a studio floor under a warm golden light",
  },
];

// §29 content simplification: descriptions/focus tags rewritten in plain,
// everyday English — the real titles and Devanagari terms are kept exactly
// (they're real cultural terms, not a vocabulary choice), only the English
// explanations around them are simplified.
export const philosophyPillars = [
  {
    icon: "person_celebrate",
    devanagari: "गुरु-शिष्य परंपरा",
    title: "Guru-Shishya Parampara",
    description:
      "Deep respect for our teachers, and daily practice under a master's care — dance steps, discipline, and dedication passed down directly, person to person.",
    focus: "Teacher-Led Training, Daily Practice",
  },
  {
    icon: "masks",
    devanagari: "नाट्यशास्त्र",
    title: "Natya Shastra & Navarasa",
    description:
      "Our movements come from an ancient Indian text on stage performance, built around nine core emotions — from love and courage to peace.",
    focus: "Expression, Emotion, Movement",
  },
  {
    icon: "volunteer_activism",
    devanagari: "सेवा एवं समावेशी",
    title: "Seva & Samaveshi",
    description:
      "We use dance to lift people up — welcoming young performers from poor rural and working-class backgrounds across Odisha.",
    focus: "Inclusion, Opportunity",
  },
  {
    icon: "public",
    devanagari: "वसुधैव कुटुम्बकम्",
    title: "Vasudhaiva Kutumbakam",
    description:
      "The world is one family. We blend Odissi and Mayurbhanj Chhau with modern global styles for audiences everywhere.",
    focus: "Blending Global Styles",
  },
] as const;

export type TeamMember = {
  isReal: boolean;
  photo?: string;
  photoAlt?: string;
  role: string;
  name: string;
  credential?: string;
  bio?: string;
  focus?: string;
};

export const teamMembers: TeamMember[] = [
  {
    isReal: true,
    photo: "/images/brand/founder-krishna-mohan-reddy.jpg",
    photoAlt: "Krishna Mohan Reddy, founder and choreographer of Prince Dance Group",
    role: "Founder & Choreographer",
    name: "Krishna Mohan Reddy",
    credential: "India's Got Talent, Season 1 Champion",
    bio: "Led a troupe of daily-wage workers with no formal training to national fame, changing what audiences expected from reality-TV talent and mythological stage performances.",
  },
];
