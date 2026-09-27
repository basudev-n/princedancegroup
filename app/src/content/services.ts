// Real service list sourced from "Services - princedancegroups.pdf"
// (Wayback capture of princedancegroups.com/services/). Per-offering detail
// copy is placeholder pending client input — see TODO(content) markers.

// 2026-09-27: an act name mentioned in a service's own real detail copy.
// `slug` is set ONLY when it's confirmed to be the exact same act as an
// existing `/repertoire/[slug]` page (Dashavatar, Krishna Leela, Shiva
// Tandava) — rendered as a real internal link. Every other name (Ram Sita,
// Radha Krishna, Natraj Act, Indian Flag Act, Global Act, Ganesh Act, Durga
// Act) is real (the client's own copy) but has no matching page yet, so it
// renders as plain text, not a guessed link. In particular, "Indian Flag
// Act" is deliberately NOT linked to the existing "Vande Mataram Patriot
// Symphony" repertoire entry — they may be the same act, but that's a
// naming decision for the client, not an assumption to bake into a link.
// See PROGRESS.md's 2026-09-27 entry.
export type FeaturedAct = { name: string; slug?: string };

export type Service = {
  slug: string;
  name: string;
  summary: string;
  // TODO.md Phase 2.2: `summary` is on-page marketing copy (no location,
  // no entity mention) — it was previously reused verbatim as the SERP
  // meta description too. `metaDescription` is written specifically for
  // search snippets: same real facts (service, business name, the real
  // IGT win, Odisha location), under 160 chars, with an enquire-style
  // close.
  metaDescription: string;
  // TODO(content) marker string for the 5 services without real detail copy
  // yet (rendered nowhere — `ServiceDetail.tsx` only reads this field when
  // `detailHeading` is also set). For the 4 services with real copy
  // (2026-09-27, client-supplied), this is the lead paragraph.
  detail: string;
  // Real per-service detail copy, supplied by the client 2026-09-27 (the
  // archived "Read More" sub-pages TODO.md Phase 6.3 flagged as missing).
  // Present only for services with real content — `ServiceDetail.tsx`
  // renders nothing when `detailHeading` is undefined, so the other 5
  // services keep showing the honest "coming soon" note. Light editing only
  // (obvious typos/grammar, and trimming the act list out of the prose
  // paragraphs since it's now shown once as `featuredActs` instead of
  // repeated inline) — no facts added or changed from the client's copy.
  detailHeading?: string;
  detailBody?: string[];
  featuredActs?: FeaturedAct[];
};

// Shared across the 4 services with real detail copy — the same 10 real
// acts recur verbatim in the client's copy for Corporate Events and Wedding
// Events (no "Bespoke Acts" line), and TV Award Show / Musical Acts (same
// 10, plus an explicit "Bespoke acts" line in both).
const coreFeaturedActs: FeaturedAct[] = [
  { name: "Dashavatar", slug: "dashavatar" },
  { name: "Ram Sita" },
  { name: "Krishna Leela", slug: "krishna-leela" },
  { name: "Radha Krishna" },
  { name: "Natraj Act" },
  { name: "Shiva Tandava", slug: "shiva-tandava" },
  { name: "Indian Flag Act" },
  { name: "Global Act" },
  { name: "Ganesh Act" },
  { name: "Durga Act" },
];
const bespokeAct: FeaturedAct = { name: "Bespoke Acts" };

export const services: Service[] = [
  {
    slug: "corporate-events",
    name: "Corporate Events",
    summary:
      "Prince Dance Group is emerging as one of the leading dance groups for corporate events, serving companies and organizations for years with experienced professional performers.",
    metaDescription:
      "Prince Dance Group brings India's Got Talent Season 1-winning choreography to corporate events — summits, galas, and brand launches. Odisha-based, booking now.",
    detail:
      "We can help you reward your corporate team with exciting dance events that not only captivate but also motivate. Our inspiring programs are tailored to your requirements, making us your one-stop solution for refined, cultured entertainment.",
    detailHeading: "Experience the Best Corporate Event Dance",
    detailBody: [
      "We're dedicated to providing the finest experience for your hard-working team. As one of the top dance program organisers, we focus on your team's and guests' enjoyment, ensuring an unforgettable memory for everybody.",
      "Your corporate event is the perfect occasion to show your appreciation, and we care about every part of the programme — thrilling attractions, mesmerising entertainment, and unique experiences for a superb day.",
      "We build the performance around your own requirements — for example, we can create an act based on your company's story, growth, or achievements, or request an act based on any other mythological story.",
    ],
    featuredActs: coreFeaturedActs,
  },
  {
    slug: "wedding-events",
    name: "Wedding Events",
    summary:
      "Make your wedding day memorable. Prince Dance Group creates performances designed to last a lifetime in your guests' memories.",
    metaDescription:
      "Make your wedding unforgettable with Prince Dance Group, India's Got Talent Season 1 champions. Real Indian dance performances for weddings, based in Odisha.",
    detail:
      "It's your wedding, so let's make it special. Our team helps you mesmerise your guests by adding a real \"wow\" factor to your event, with a magical, colourful atmosphere for a surreal experience.",
    detailHeading: "The Best Dance Group for Wedding Events",
    detailBody: [
      "Our cultural dance programmes for weddings are becoming an increasingly popular way to entertain guests. We work with you to understand your individual needs — for example, we can build a personalised act around your love story.",
      "Our artists bring a fulfilling Indian cultural experience to your guests, not just twists and turns. You can also request an act based on any other mythological story.",
    ],
    featuredActs: coreFeaturedActs,
  },
  {
    slug: "tv-award-show",
    name: "TV Award Show",
    summary:
      "Considered one of the best dance groups for TV award shows, bringing new dimensions of entertainment centred on joy and passion.",
    metaDescription:
      "Prince Dance Group performs for TV award shows nationwide — India's Got Talent Season 1 champions bringing entertainment to your broadcast. Based in Odisha.",
    detail:
      "Prince Dance Group is considered one of the best dance groups for TV award shows. Our philosophy centres around celebrating moments with joy and passion, introducing new dimensions of entertainment to award shows.",
    detailHeading: "We Spice Up Your TV Award Shows",
    detailBody: [
      "We're a leading name in mythology-based and personalised dance performances, appreciated at various prestigious award shows for our artistry, creativity, and dedication.",
      "Our performances leave a lasting impact on the audience — every moment filled with joy and excitement, combining skill, creativity, and professionalism.",
      "You can choose from our featured acts below, or ask for a bespoke act personalised to your requirements.",
    ],
    featuredActs: [...coreFeaturedActs, bespokeAct],
  },
  {
    slug: "musical-acts",
    name: "Musical Acts",
    summary:
      "Mesmerising musical entertainment delivered by highly skilled performers known for unique talent and innovative choreography.",
    metaDescription:
      "Book Prince Dance Group's musical acts — skilled performers and choreography from India's Got Talent Season 1 champions. Odisha-based troupe, enquire now.",
    detail:
      "With Prince Dance Group's creative, vibrant musical presentations, you'll embark on a rhythmic journey. Our acts combine music and movement — more than a performance, a reflection of passion and precision.",
    detailHeading: "Embark on a Musical Journey With Us",
    detailBody: [
      "Our artists dance to the beat of innovation, aiming to narrate a story with every step and every note. These musical acts represent life stories and mythological tales, and we also offer bespoke presentations built around your own story.",
      "Our Krishna Leela covers everything from the miraculous birth to the cosmic form of Lord Krishna, presented as a mesmerising, authentic classical musical performance. Dashavatar presents the ten divine incarnations of Vishnu through music and performance.",
      "These acts are a popular choice for weddings, birthdays, spiritual gatherings, and other festive occasions — a blend of innovative and classical dance forms, personalised by our team for you and your guests.",
    ],
    featuredActs: [...coreFeaturedActs, bespokeAct],
  },
  {
    slug: "religious-events",
    name: "Religious Events",
    summary:
      "Meticulously designed and choreographed non-Bollywood dance acts rooted in authentic classical Indian dance forms, suited to religious occasions.",
    metaDescription:
      "Prince Dance Group performs classical Indian dance for religious events and Mahotsavs. India's Got Talent Season 1 champions, based in Odisha, India.",
    detail: "TODO(content): list specific classical forms performed (e.g. Odissi, Chhau) once confirmed with the client.",
  },
  {
    slug: "school-college-function",
    name: "School / College Function",
    summary:
      "A one-stop entertainment solution for school and college events, with a track record of performances that leave audiences amazed.",
    metaDescription:
      "Prince Dance Group brings India's Got Talent Season 1-winning performances to school and college events. Odisha-based troupe, enquire for booking.",
    detail: "TODO(content): expand with past institutional bookings.",
  },
  {
    slug: "mahotsavs",
    name: "Mahotsavs",
    summary:
      "Pioneers in delivering mesmerising Mahotsav entertainment, with performers renowned for unique talent and innovative choreography.",
    metaDescription:
      "Prince Dance Group performs at Mahotsavs across India — India's Got Talent Season 1 champions known for unique talent and choreography. Odisha-based.",
    detail: "TODO(content): expand with regional festival experience.",
  },
  {
    slug: "music-video-movies",
    name: "Music Video / Movies",
    summary:
      "Choreography for music videos and films, bringing a distinctive style and blend of creativity and innovation to the screen.",
    metaDescription:
      "Prince Dance Group offers choreography for music videos and films — India's Got Talent Season 1 champions bringing creativity to the screen. Odisha-based.",
    detail: "TODO(content): list specific music videos/films once confirmed with the client.",
  },
  {
    slug: "promotion-shoots",
    name: "Promotion Shoots",
    summary:
      "Dancers for television adverts and promotional shoots, including bespoke choreography and flash-mob activations.",
    metaDescription:
      "Book Prince Dance Group for TV commercials and promotional shoots — India's Got Talent Season 1 champions offering choreography and flash-mob acts.",
    detail: "TODO(content): expand with brand/agency case studies once available.",
  },
];

// TODO.md Phase 4.2 (2026-09-21): single source of truth for the
// "event type" dropdown shown on every enquiry form. Previously each of
// the 4 forms (`home/EventEnquiry.tsx`, `layout/BookingModal.tsx`,
// `contact/EnquiryForm.tsx`) had its own independently-worded list — none
// matched the real 9 services, and Contact's own list (the page a search
// visitor is most likely to land on directly) had no way to say
// "TV Award Show" or "Mahotsavs" at all. This is just the real service
// names plus "Other" — an enquiry doesn't have to map to exactly one
// named service, so the catch-all stays.
export const eventTypeOptions: string[] = [...services.map((s) => s.name), "Other"];
