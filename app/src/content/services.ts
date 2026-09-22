// Real service list sourced from "Services - princedancegroups.pdf"
// (Wayback capture of princedancegroups.com/services/). Per-offering detail
// copy is placeholder pending client input — see TODO(content) markers.

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
  // TODO(content): replace with real per-service detail copy from the client
  // (the archived "Read More" sub-pages were not captured in the source PDF).
  detail: string;
};

export const services: Service[] = [
  {
    slug: "corporate-events",
    name: "Corporate Events",
    summary:
      "Prince Dance Group is emerging as one of the leading dance groups for corporate events, serving companies and organizations for years with experienced professional performers.",
    metaDescription:
      "Prince Dance Group brings India's Got Talent Season 1-winning choreography to corporate events — summits, galas, and brand launches. Odisha-based, booking now.",
    detail:
      "TODO(content): expand with specifics — typical event formats, audience sizes, past corporate clients (with permission).",
  },
  {
    slug: "wedding-events",
    name: "Wedding Events",
    summary:
      "Make your wedding day memorable. Prince Dance Group creates performances designed to last a lifetime in your guests' memories.",
    metaDescription:
      "Make your wedding unforgettable with Prince Dance Group, India's Got Talent Season 1 champions. Real Indian dance performances for weddings, based in Odisha.",
    detail: "TODO(content): expand with wedding performance formats and booking lead times.",
  },
  {
    slug: "tv-award-show",
    name: "TV Award Show",
    summary:
      "Considered one of the best dance groups for TV award shows, bringing new dimensions of entertainment centred on joy and passion.",
    metaDescription:
      "Prince Dance Group performs for TV award shows nationwide — India's Got Talent Season 1 champions bringing entertainment to your broadcast. Based in Odisha.",
    detail: "TODO(content): list past award-show appearances beyond those already confirmed on the About page.",
  },
  {
    slug: "musical-acts",
    name: "Musical Acts",
    summary:
      "Mesmerising musical entertainment delivered by highly skilled performers known for unique talent and innovative choreography.",
    metaDescription:
      "Book Prince Dance Group's musical acts — skilled performers and choreography from India's Got Talent Season 1 champions. Odisha-based troupe, enquire now.",
    detail: "TODO(content): expand with format options and sample setlists/styles.",
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
