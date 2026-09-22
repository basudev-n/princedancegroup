# CLAUDE.md

Orientation for any Claude Code session working in this repo. Read this
first, then in order: `ARCHITECTURE.md` (binding setup rules) → `DESIGN.md`
(visual system + site map) → `PROGRESS.md` (current status, decisions log)
→ `TODO.md` (what's planned next, phased).

## What this is

The real-world website for **Prince Dance Group**, an Odisha, India–based
performance troupe (founded by Krishna Mohan Reddy, *India's Got Talent*
Season 1 winner) that gets booked for corporate events, weddings, TV award
shows, religious events, school/college functions, and music videos. It is
**not** a dance school or conservatory — never introduce classes/tuition/
enrollment framing. See `ARCHITECTURE.md` §0 for why this matters: the
Google Stitch design import for this project generated a fictional NYC
ballet-conservatory narrative that must never be used as content, only as a
*visual* style reference.

## Where things are

```
ARCHITECTURE.md   strict, binding setup rules — read before touching structure
DESIGN.md          color/type/spacing tokens, component styling, corrected site map
PROGRESS.md        phase checklist + decisions log — update as you go
TODO.md            forward build plan, phased (2026-09-21) — what's left and in
                   what order, plus the consolidated "needs client input" register
assets/source/     real photos & logo extracted from the old site (Wayback PDFs)
old website.pdf, Services - princedancegroups.pdf   original source material
app/               the actual Next.js project — built and running (see PROGRESS.md)
```

## Commands

```bash
cd app
npm install
npm run dev        # http://localhost:3000
npm run build
npm run lint
```

## Working rules specific to this repo

- **Content changes go in `app/src/content/*.ts`, not inline in JSX.** If
  you're editing copy, that's the file to touch.
- **Never invent a business fact.** Real facts (address, phone, email,
  founder, service list, IGT win, press mentions) are documented in
  `DESIGN.md` §7–8 and sourced from the PDFs in this repo. Anything not
  confirmed stays a clearly-marked `TODO(content)`.
- **Design values come from `DESIGN.md` only.** Don't eyeball a color or
  spacing value from a screenshot — copy the token.
- **No new dependency without adding it to `ARCHITECTURE.md` §4 first.**
- Use the **Stitch MCP** (`mcp__stitch__*`) tools if you need to re-inspect
  the original design project (`projects/14513562789089232297`) — e.g.
  `list_screens` / `get_screen` for the source HTML/screenshots, or
  `get_project` for the full design-token JSON. Treat all copy in those
  screens as a **layout/style reference only**, never as content to ship.
- Before marking anything "done" in `PROGRESS.md`, actually run
  `npm run build` and `npm run lint` in `app/`.

## Site-wide Stitch-exact migration (started 2026-09-06 with Home; extended to the full site same day)

Every page is being rebuilt to visually match its **actual** Stitch export
exactly (Plus Jakarta Sans, Material Design 3 color tokens, rounded shapes,
**the exact Material Symbols icon names Stitch uses — zero substitutions**)
— not the editorial Playfair Display system in `DESIGN.md` §1–6, which
turned out to never have been used by any real Stitch screen. The full
system lives in `DESIGN.md` §9, the Home page's element-by-element
real/placeholder/reframed method (reuse this method for every other page)
is §10, the placeholder components are §11, and **§12 is the per-page
Stitch-source-file + exact-icon-inventory map — read the row for whatever
page you're touching before writing a single class name.**

Status: done site-wide as of 2026-09-07 (Phase 6 in `PROGRESS.md`) — Home,
Header, Footer, About, Services (+detail), Gallery, Journal (+detail), and
Contact are all on this system, old §1–6 components deleted, full build+lint
clean. Check `PROGRESS.md`'s Phase checklist before assuming anything about
current state, though — this note will go stale again the moment new work
lands and isn't reflected there.

**⚠️ Superseded for Home as of 2026-09-20 — see below.** The client
confirmed a new design direction ("Nocturne Stage" / "Danza Theatrical")
and asked to scrap this Material-3/Jakarta system entirely, starting with
Home. Don't use §9–12 as a reference for `/` any more — read the next
section instead. §9–12 still describes every *other* page correctly until
they're migrated too (tracked in `PROGRESS.md` Phase 7).

**Build order per page** (same method Home used, DESIGN.md §9–11 + the new
§12 source map):
1. Re-read DESIGN.md §12's row for the page — note its exact Stitch source
   file and its exact icon list.
2. Reuse existing `home-*`/M3 tokens and the `Placeholder` primitives
   already in `globals.css` / `src/components/ui/Placeholder.tsx` — don't
   redefine them per page.
3. Build section components under `src/components/sections/<page>/`,
   mirroring that Stitch screen's section order.
4. Content: real facts (`PROGRESS.md`, `DESIGN.md` §8) in; fictional
   specifics → `Placeholder`; class/tuition/audition business-model
   assumptions → reframed to the real event-booking model (same pattern as
   Home's Booking Availability / Booking CTA).
5. Icons: exactly the names in DESIGN.md §12's table for that page — grep
   the built page for `material-symbols-outlined` and diff against the
   table before calling a page done.
6. `npm run build` + `npm run lint`, then verify in-browser (desktop +
   mobile).

**Parallelizing across pages:** the pages are independent (separate route
directories, separate content files) once the shared tokens/Header/Footer
exist — safe to hand off to parallel subagents. Give each agent: the
DESIGN.md §9/§12 excerpt for its page(s), the exact file paths to create,
and this build-order list. Have each agent run its own build+lint before
reporting back; re-run the full site's build+lint once all agents land.

## Home page UI/UX redesign (2026-09-20, current for `/`)

Home's *content system* (Danza Theatrical, §13) is unchanged — everything
below is a UI/UX pass on top of it, done in several rounds as the client
kept iterating: hierarchy/content (§20), then real interactive
functionality (§21), then bokeh + two more concrete fixes (§26). Read
those three DESIGN.md sections in order before touching Home again, or
skim this summary:

- **Section order** (§20): Hero → StatsRow → **Founder Spotlight**
  (`FounderSpotlight.tsx`, replaces the deleted `MastersGrid.tsx`) →
  ServiceCategories → RepertoireGrid → **Gallery** (new) →
  BookingAvailability → **Testimonials** (new) → EventEnquiry.
  `MediaShowcase.tsx` is deleted (was a permanently inert placeholder).
- **`BookingAvailability`** (§20, shortened further in §26): no per-row
  buttons — rows link to `/?interest=<slug>#event-enquiry` (pre-selects
  Event Nature in the form) and there's one section-level CTA instead.
  §26 also removed two blocks that were repeated identically across all 9
  rows (a "Timing & Location" line and an "Open for Booking" chip, neither
  varying by service) — both are now stated once in the header — and
  switched the list to a 2-column grid at `lg:`. It also has the bokeh
  glow (see below).
- **`EventEnquiry`** (§20) reads a `?interest=` search param
  (`useSearchParams`), which is why it's wrapped in `<Suspense>` in
  `page.tsx` — don't remove that wrapper or the static build breaks.
- **`Gallery.tsx`** (§21): a real click-to-enlarge lightbox (prev/next,
  keyboard, click-outside-to-close, body-scroll lock), plus a 6th tile
  that's an honest "Highlight Reel — Coming Soon" video placeholder (no
  real YouTube video exists — don't wire a fake one in).
- **`Testimonials.tsx`** (§21): a real carousel — prev/next buttons,
  pause-on-hover/focus, keyboard nav, fade transition — not just
  auto-rotate + dots.
- **`RepertoireGrid.tsx`** (§26): the "Book This Act"/"Commission Act"
  card footer was a real layout bug — note + CTA squeezed onto one line,
  wrapped and collided at actual card width. Now stacked (note above, CTA
  as its own pill button below) — don't put them back on one
  `justify-between` line.
- **Bokeh glow** (§25/§26): a slow-breathing (`.animate-bokeh` in
  `globals.css`), blurred, theme-colored orb effect. Live on the mobile
  menu, `RepertoireGrid`, and `BookingAvailability`. On sections *without*
  a dark scrim on top (i.e. everywhere except the mobile menu panel),
  keep the wrapping opacity dampened (`opacity-40`-ish) — the raw
  `.animate-bokeh` orb opacity (0.35–0.6) is calibrated for sitting behind
  the menu's own `backdrop-blur` scrim, not bare.
- `Placeholder.tsx` gained a `tone="on-danza"` option — use it (not the
  default/`on-dark` tones, which are M3-system tokens and render as
  low-contrast dark-on-dark text) for any new `PlaceholderNote` on a Danza
  or Nocturne dark page.
- `api/contact/route.ts` now requires `email OR phone`, not `email`
  specifically — Home's form leads with phone now. Don't revert this
  without checking every form that posts here still sends at least one.

## Site-wide chrome: mobile menu + footer (2026-09-20)

Two more passes that touched shared chrome (`Header.tsx`/`Footer.tsx`),
not a single page — live on every route, not just Home.

- **Mobile menu** (`DESIGN.md` §25): rebuilt as a full-height blurred
  overlay panel with the bokeh glow and large per-page buttons (was a
  small accordion dropdown). Two real bugs found and fixed here, both
  worth knowing if you touch `Header.tsx` again: (1) the header's own
  `backdrop-blur` becomes a CSS containing block for `position: fixed`
  descendants, so the mobile panel must stay a **sibling** of `<header>`,
  not a child, or it silently collapses to zero height; (2) the toggle
  button needs its own ref excluded from the outside-click-to-close
  handler, or clicking it to close while open just reopens it (a
  mousedown/click race).
- **Footer** (`DESIGN.md` §27): added a real "Get in Touch" column
  (phone/email/address — previously nowhere in the footer except a real
  email buried in a tiny footnote), replaced the newsletter's disabled
  input+button (looked like a broken form) with an honest single
  "coming soon" note, and added the bokeh glow. Column grid is now 5-wide
  (Brand/Navigate/Repertoire/Contact/Newsletter).

## Contact page UI/UX redesign (2026-09-20, current for `/contact`)

Same "Home-style treatment" as Home's §20 — independent UI expert + UX
specialist research before any code changed, per explicit client request
to redesign every remaining page this way, one at a time. Full
plan/rationale: `DESIGN.md` §22. What to know before touching Contact
again:

- `EnquiryForm.tsx` now matches Home's `EventEnquiry.tsx` pattern: 4
  always-visible fields (Name*, Phone*, Email-optional, Event Type) + a
  disclosure toggle for the rest (Role, Event Date, Event City, Troupe
  Size, Requested Acts, Notes). It also now has its own card shell —
  don't strip that, it was previously the one unframed element on the
  page.
- New `Testimonial.tsx` (single static V.K. Pandian quote, not a
  carousel) sits between `BookingSection` and `FAQ` — deliberately not
  reusing Home's `Testimonials.tsx` component or its lead quote.
- `Placeholder.tsx` gained a `tone="on-nocturne"` option alongside the
  existing `on-danza` one — use it (not the default/`on-dark` M3 tones)
  for any new `PlaceholderNote` on About/Gallery/Services/Journal/Contact.
  All existing call sites site-wide were already migrated to it in this
  same pass.

**Remaining pages queued for the same treatment**: About, Services
(+ wedding-events + the 8 generic detail pages), Gallery, Journal — one
at a time, same independent-research method.

## Nocturne Stage Services & Journal (started 2026-09-20, current for `/services` and `/journal`)

Two different treatments, not one — read `DESIGN.md` §17/§18 before touching
either.

**Services** (`DESIGN.md` §17) is rebuilt against "Weddings & Celebrations -
Prince Dance Group" (`087af2350a10422481feed3c00a00596`) — but that screen
covers only 1 of the 9 real services. The generic `/services` list +
`/services/[slug]` shared template migrate to Nocturne tokens with real
content unchanged; the `wedding-events` slug specifically gets extra
sections built from this screen. Watch for:

- **The most severe fabrication found in this migration**: testimonials
  attributed to a real, identifiable luxury wedding planner ("Devika
  Narain") and a real event company ("Cineyug Celebrations"/"Karan
  Wadhavan"). Dropped entirely — this isn't just an invented stat, it
  fabricates third-party endorsements under real names/companies.
- A "Global Destination Portfolio" naming 6 real, checkable luxury venues
  (Udaipur City Palace, Emirates Palace, Villa d'Este, etc.) implying a
  fabricated past-engagement history — dropped entirely, not
  placeholder-able, same reasoning as fabricated technical specs but worse
  (these are real venues a reader could actually contact).
- "Academy & Workshops" nav item, again — not adopted.
- Real repertoire (Dashavatar, Krishna Leela) reframed as wedding-entry
  acts is fine (legitimate reframing, not a new fact) — only the invented
  numeric specifics on top get dropped.

**Journal** (`DESIGN.md` §18) has **no** new dedicated Stitch screen — the
only screen titled "Journal & Editorial" is still on the original Phase 6
Material 3/Jakarta tokens, not Nocturne. This is a pure token reskin of the
already-real, already-vetted Phase 6 content onto `nocturne-*` tokens —
no new content decisions, nothing to re-litigate.

Scope for both: body content only — Header/Footer unchanged (§13.6).

## Nocturne Stage Gallery redesign (started 2026-09-20, current for `/gallery`)

Gallery is rebuilt against "Productions & Repertoire - Prince Dance Group"
(`dabaf3f8e1484d90ae82fa35ec7df8d5`) — the 4th confirmed Nocturne Stage
screen, and the one that fills the gap `DESIGN.md` §12 previously flagged
("no dedicated Stitch screen exists for `/gallery`"). Full tokens, icon
list, and the element-by-element table are in `DESIGN.md` §16 — read it
first. What recurs here:

- **Academy & Workshops nav item, again** — not adopted, same standing
  rule (`ARCHITECTURE.md` §0).
- **A full fake "Master Technical Document" / stage rider** — exact
  proscenium footage, decibel levels, moving-head counts, litres of water.
  None of it is sourced. Dropped entirely rather than placeholder-shown,
  same reasoning as the Contact page's rider (`DESIGN.md` §15 row 9):
  publishing an invented spec as if real risks misleading an actual venue.
  The four icon-headed categories (Stage/Lighting/Audio/Backstage) are kept
  as visual structure with generic "confirmed on enquiry" copy, not numbers.
- **Wrong contact details in the footer content of the source screen**
  (again) — not used; Footer is already real and out of scope for this page.
- Repertoire act *names* here are mostly real/thematically grounded
  (Dashavatar, Krishna Leela, Vande Mataram, Surya Namaskar, Shiva
  Tandava) — kept, per the same "real name, placeholder specifics" rule
  §13/§14 already established for Shiva Tandava. Vande Mataram and Surya
  Namaskar are one existing real repertoire piece in `content/home.ts`, not
  two — merged back into one card rather than split into two with invented
  performer counts.

Scope: Gallery body content only — Header/Footer unchanged (§13.6).

## Nocturne Stage Contact redesign (started 2026-09-20, current for `/contact`)

Contact is rebuilt against "Contact & Event Bookings - Prince Dance Group"
(`67222ee050a54d2a977078ce5dc27525` — note: this is a *regenerated* screen;
an earlier version with the same title, `9f9637c8aaa54d39b79cfe9c0fc027e5`,
is superseded). Full tokens/icons/plan: `DESIGN.md` §15 — read it first.
This screen is the most heavily fabricated one redesigned so far:

- **Wrong contact details** (again — phone, email, *and* address/pincode
  all differ from `PROGRESS.md`'s confirmed facts). Always cross-check.
- **A wholly invented international-office network** (Mumbai/Delhi/Dubai/
  London desks with fake phone numbers) — dropped entirely, not
  placeholder-able.
- **Internally-inconsistent fabricated stage specs** — two sections give
  two different minimum stage dimensions for the same claim. Neither is
  real; both were dropped rather than picking one to keep, since
  publishing false technical requirements could mislead a real venue, not
  just misrepresent the business.

Scope: Contact body content only — Header/Footer unchanged (§13.6).

## Nocturne Stage About redesign (started 2026-09-20, current for `/about`)

About is rebuilt against "About Us & Heritage - Prince Dance Group"
(`afa18d5ecac3418fb7266442c3f6a3c2`) — one of the 4 screens confirmed built
against the real "Nocturne Stage" design-system asset (unlike Home, which
used a different draft system). Full tokens, icon list, and the
element-by-element table are in `DESIGN.md` §14 — read it first. Same two
watch-items as Home's redesign recur here: a fabricated founder quote
(drop, don't placeholder) and unconfirmed prestige claims (Commonwealth
Games Opening shows up again, still not in `PROGRESS.md`'s confirmed
facts). Scope: About body content only — Header/Footer are already Danza
Theatrical (§13.6) and untouched by this page.

## Danza Theatrical Home redesign (started 2026-09-20, current for `/`)

Home is being rebuilt against a specific Stitch screen the client confirmed
and the user pointed at directly: "Home - Prince Dance Group (Danza
Theatrical Refined)" (`3a06cb7f9def47859efa6d2ea1e160c9`). Full token set,
icon list, and the element-by-element real/placeholder/reframe table are in
`DESIGN.md` §13 — read it before touching `app/src/app/page.tsx` or its
section components. Two things to watch for that came up in this pass and
may recur:

- **A fabricated quote attributed to the real founder.** Stitch invented
  dialogue and put it in Krishna Mohan Reddy's mouth. This is a step past
  an ordinary invented stat — never ship a fabricated quote under a real
  named person's name, not even placeholder-labeled. Drop it; use only
  real, sourced copy.
- **Wrong contact details.** The screen's own phone numbers and email
  don't match `PROGRESS.md`'s confirmed facts. Always cross-check contact
  info in a new Stitch screen against `PROGRESS.md` before using it — Stitch
  invents plausible-looking details, it doesn't know the real ones.

Scope: Home page body content only, same as the original §9 rollout —
Header/Footer stay as they are. The other pages (About, Services, Gallery,
Journal, Contact) stay on the §9 Material 3 system for now; migrating them
to the client-confirmed "Nocturne Stage" system (a *different*, more
consistent design-system asset than what Home used — see `DESIGN.md` §13's
opening note) is a separate follow-up, tracked in `PROGRESS.md` Phase 7,
not assumed to be part of this pass.

## Site-wide consistency pass: booking modal, bokeh, UI, bugs, plain language (2026-09-21)

Full rationale: `DESIGN.md` §29. One request covering five things at once,
across every page — read the DESIGN.md section for the per-page detail;
summary of what's now true site-wide:

- **Header "Book for Events" opens a popup, not `/contact`.** New
  `components/layout/BookingModal.tsx` — a compact 4-field enquiry form
  (Name*, Phone*, Email optional, Event Type) in a modal over a dark bokeh
  backdrop, same honest submit-status logic as every other form on the
  site. Both header CTAs (desktop pill, mobile panel button) open it via
  `bookingOpen` state in `Header.tsx`. `/contact` itself is unchanged and
  is still the fuller, primary enquiry page — the modal is a fast
  in-place alternative, not a replacement.
- **Bokeh is now on every page**, not just Home/About: Contact's
  `BookingSection`, Gallery's `GalleryHero`/`GalleryCTA`, Services'
  `ServicesHero`/`ServicesCTA`, and Journal's header + closing block all
  got it, following the same dampened-opacity convention established on
  Home (raw `.animate-bokeh` opacity is calibrated for the mobile menu's
  dark scrim; everywhere else wrap it in `opacity-30`–`opacity-40`).
- **Services got its first real design pass.** It had only ever had a
  token migration + targeted bug fixes before this — now `ServicesList.tsx`
  has a distinct icon per row (new `serviceIcons.ts`) instead of 9
  identical rows, `ServicesHero.tsx` matches every other page's hero
  weight, and the generic `[slug]` template (shared by 8 of 9 services,
  previously just Hero → CTA) gained `HowItWorks.tsx` and
  `RelatedServices.tsx` — both honest, no invented detail copy.
- **Journal's article detail page no longer dead-ends.** It used to be one
  placeholder box with nowhere to go; `JournalArticleBody.tsx` now has a
  real "More from the Journal" block, and the list page
  (`JournalGrid.tsx`) uses a featured+secondary card layout instead of a
  flat 3-up identical grid.
- **A few bugs worth knowing if you touch these files again**: a repeated
  block/collision pattern keeps recurring across pages when a new section
  copies an old one's structure without copying its later fix — this pass
  found the same "note + CTA squeezed onto one line" collision (already
  fixed once on Home's `RepertoireGrid`) unfixed in Gallery's
  `RepertoireActs` bento cards, and the same "identical block repeated on
  every row" problem (already fixed once on Home's `BookingAvailability`)
  unfixed in `ServicesList.tsx`. Worth double-checking for this pattern
  before treating a `git blame`-old section as settled.
- **Plain-language pass, site-wide.** Ornate/academic vocabulary
  ("proscenium," "dramaturgical," "kinetic," "synchronicity," "grandeur,"
  "spectacle," "magnum opus," "odyssey," etc.) was rewritten into plain
  English across every page's own component copy — wording only, no facts
  changed. `content/home.ts`'s `philosophyPillars` English descriptions
  were simplified too (the real Sanskrit titles/Devanagari terms
  themselves are untouched — those are real cultural content, not a
  vocabulary choice). `content/testimonials.ts` was and remains completely
  off-limits for this kind of pass — those are direct quotes from real
  named public figures and must stay verbatim, never reworded.

## Site-wide connectivity: sitemap, 404, legal pages, nav highlight (2026-09-21)

Full rationale: `DESIGN.md` §30. A link-graph audit found the site's
internal linking was already clean (no broken/orphaned pages) — what was
missing were three real pieces, now added:

- **`app/sitemap.ts` + `app/robots.ts`** list/allow all 21 real routes.
  Both need `layout.tsx`'s new `metadataBase`, which reads
  `NEXT_PUBLIC_SITE_URL` with a `localhost:3000` fallback — **set that env
  var once the site has a real domain**, don't hardcode one, the site
  isn't deployed yet.
- **`app/not-found.tsx`** replaces Next's generic 404 with a branded page
  linking back to Home/Services/Gallery/Contact.
- **Footer's 3 legal links are real pages now**, not dead text —
  `content/legal.ts` + `components/sections/legal/LegalPlaceholder.tsx` +
  `/privacy-policy`, `/performance-terms`, `/rider-requirements`. Honest
  "coming soon, contact us" content, no fabricated legal text — if you're
  ever asked to fill these in for real, that's real legal copy the client
  needs to supply, not something to draft from a template.
- **`Header.tsx`'s `isNavActive()`** now prefix-matches instead of exact
  matching, so `/services/<slug>` and `/journal/<slug>` correctly
  highlight their parent nav item. If you touch the nav active-state logic
  again, both the desktop and mobile nav call this one helper — don't
  reintroduce two separate exact-match checks.

## Testimonial photo caveat

Real testimonials from Naveen Patnaik, V.K. Pandian, Shah Rukh Khan, Sonali
Bendre, Kirron Kher, Shekhar Kapur, and Dharmendra were on the original site.
Their photos are staged in `assets/source/images/testimonials/` but are
**not wired into the live UI** — ship attributed text quotes only, and check
with the user before displaying a public figure's photo in ongoing
marketing material. See `ARCHITECTURE.md` §6.
