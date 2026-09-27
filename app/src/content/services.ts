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
  // services keep showing the honest "coming soon" note.
  //
  // Editing policy, corrected 2026-09-27 after a fidelity check against the
  // client's original paste found real sentences (including every closing
  // "call us to book" line) had been silently dropped, not just trimmed:
  // the ONLY intentional removal is the literal enumerated act-name list
  // (e.g. "...featuring Dashavatar, Ram Sita, Krishna Leela, ... etc."),
  // since it's now shown once as `featuredActs` instead of repeated inline
  // — every other sentence is kept, including closing CTAs. Only fixes
  // applied: obvious typos ("presets" → "presents") and grammar that's
  // actually broken (a dangling "Therefore, if you want to..." fragment in
  // tv-award-show). No rewording of the client's actual phrasing/voice.
  detailKicker?: string;
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
      "Here at Prince Dance Group, we can help you reward your corporate team with exciting dance events that not only captivate but also motivate. Our inspiring programs are tailored to your requirements. Thus, we are your one-stop solution to refined and cultured entertainment.",
    detailHeading: "Experience The Best Corporate Event Dance",
    detailBody: [
      "Our best dance group for corporate events is dedicated to providing only the finest experience for your hard-working team. As one of the top dance program organisers, we focus on your team's and guests' enjoyment, ensuring an unforgettable memory for everybody.",
      "Your corporate event days are the perfect occasion to show your appreciation. With that in mind, we care for every part of our program. With our thrilling attractions, mesmerizing entertainment, and unique experiences we ensure a superb day for your guests.",
      "Our professional dance group for corporate events delivers corporate fun based on your bespoke requirements. For example, in the case of corporate events, we can create an act based on your own or your company's story, struggle, growth, success, achievements, highlights, etc.",
      "You can also request acts based on any other mythological stories. So, get in touch with us and see the magic happen! Book us today!",
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
      "It is your wedding after all! So why not make it special? Let our best dance group for wedding events help you mesmerise your guests by adding that \"wow\" factor to your event. We will create a magical and colourful ambience to give your guests a surreal experience.",
    detailHeading: "Best Dance Group For Wedding Events",
    detailBody: [
      "Our vibrant cultural dance programs for weddings are becoming an increasingly popular way to entertain guests. We aim to help you create a complete cultural and entertaining experience for your guests. Our team will work with you to understand your very individualistic needs and serve you accordingly. For example, to make your event even more personalised, we can create an act based on your love story or anything else you prefer.",
      "Plus, you can also ask for any other acts based on mythology and others.",
      "Do not hesitate to contact us to learn more about some of our most popular acts. Our dance acts are not merely about twists and turns. Our artists also bring a fulfilling Indian cultural experience to your guests. So you do not miss a vibrant wedding event, book our show in advance!",
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
    detailKicker: "Offering Much More Than Entertainment",
    detail:
      "Prince Dance Group is considered one of the best dance groups for TV award shows. Our philosophy centres around celebrating moments with joy and passion. At Prince Dance Group, our team of artists aims to introduce new dimensions of entertainment in award shows. Contact us to know more.",
    detailHeading: "We Spice Up Your TV Award Shows",
    detailBody: [
      "We are a leading name in mythology-based and personalised dance performances. We have been appreciated at various prestigious award shows for our incredible artistry. Known for our creativity and dedication, our performances leave your audiences spellbound.",
      // The client's original text has a dangling "Therefore, if you want
      // to experience..." fragment here (a conditional clause with no main
      // clause — genuinely broken grammar, not just informal phrasing).
      // Completed into a real sentence, keeping the same content (a
      // special, memorable experience), rather than either shipping a
      // sentence fragment or silently deleting the idea.
      "Our best dance groups for TV award shows leave a lasting impact on the audience. We do our best to ensure every moment is filled with joy and excitement — offering a special experience that not only entertains but also creates memorable moments at every turn.",
      "Our musical acts have been a distinguished presence at various award shows. We have contributed a professional touch to elevate every occasion. Our performances have underscored our ability to combine skill, creativity, and professionalism quite seamlessly.",
      "Also, you can ask for a bespoke act personalised as per your requirements. Call us to book our show or to know more about our services.",
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
    detailKicker: "The Best Dance Group For Musical Acts",
    detail:
      "With the creative and vibrant musical presentations of Prince Dance Group, you will embark on a rhythmic journey. Our acts combine music and movement creating mesmerizing acts. Our musical acts are more than a mere performance, it's a reflection of passion and precision.",
    detailHeading: "Embark On a Musical Journey With Us",
    detailBody: [
      "We are definitely the best dance group for musical acts. Our artists dance to the beat of innovation aiming to narrate a tale. Every step and every note feels like a heartbeat. These musical acts represent life stories, and enchanting mythological stories, and also offer bespoke presentations as requested by you.",
      "Our best dance group for musical acts masters the art of musical presentations on the grand stage. Also, we stage vibrant bespoke acts based on life stories and highlights requested by you.",
      "Our Krishna Leela covers everything from the miraculous birth to the cosmic form of lord Krishna and it will be presented in a mesmerizing authentic classical musical extravaganza. On the other hand, the act called Dashavatar presents the divine incarnations of Vishnu through enchanting melodies and performances.",
      "All these acts are a perfect and popular choice for weddings, birthdays, spiritual gatherings, as well as various other festive occasions. Our performance is a great combination of innovative and classical dance forms. Once again, a perfect musical act can be personalised by our team to impress you and your guests alike. Call us to book our show!",
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
