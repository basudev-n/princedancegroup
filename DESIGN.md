# DESIGN.md — Visual System

Source: Google Stitch project **"Prince Dance Group Website"**
(`projects/14513562789089232297`), design system `assets/ddfb673b61b9446a8d8311199934108f`.

**Scope note:** this document is the *visual* system only — colors, type,
spacing, elevation, shapes, component styling. The Stitch project's generated
page *copy* (a fictional NYC ballet conservatory) is not used anywhere; see
`ARCHITECTURE.md` §0 and the corrected site map in §7 below for the real
content structure. Treat every color/type/spacing value here as copied
verbatim into the `@theme` token block in `src/app/globals.css` (Tailwind v4's
CSS-first config model) — see `ARCHITECTURE.md` §7.

---

## 1. Brand character

High-fashion editorial minimalism meets the regal, disciplined energy of
Indian classical and contemporary performance. Reference points: classical
ballet program layouts, art museum catalogues, sleek modern dance-studio
architecture — bridging disciplined structure with expressive physical
movement. For Prince Dance Group specifically, this pairs naturally with the
troupe's real identity: Odissi and Mayurbhanj Chhau heritage, Guru-Shishya
lineage, and a *India's Got Talent*-winning stage pedigree (see
`assets/source/` and the cultural-values notes in §8).

Tone: **regal & disciplined**, **editorial & modernist**, **kinetic
elegance** — crisp structural rules framing high-contrast performance
photography, never decorative clutter.

## 2. Color tokens

```
surface: #fcf9f2            surface-canvas: #FAF8F5
surface-dim: #dcdad3         surface-card: #F5F2EB
surface-bright: #fcf9f2      surface-alt: #EDE8DE
surface-container-lowest: #ffffff
surface-container-low: #f6f3ec
surface-container: #f1eee7
surface-container-high: #ebe8e1
surface-container-highest: #e5e2db

on-surface: #1c1c18          text-primary: #111215
on-surface-variant: #46464b  text-muted: #6E6B64
inverse-surface: #31312c     text-dim: #99958C
inverse-on-surface: #f3f0e9

outline: #76777b
outline-variant: #c7c6cb
border-grid: #111215          (primary structural hairline)
border-subtle: #D8D3C8        (secondary matrix hairline)

primary: #000000 / #111215    on-primary: #ffffff
primary-container: #1b1b1f    on-primary-container: #848387

secondary (Regal Azure): #126588 / #3B82A6
on-secondary: #ffffff
secondary-container: #94d7ff
on-secondary-container: #015f81
regal-ice-tint: #EBF3F8       (pale tint, hover/active surfaces)
regal-navy-dark: #0B1622

tertiary (Steel Mist): #000000 / #A8C5DA
tertiary-container: #001e2d
on-tertiary-container: #6b879b

error: #ba1a1a   on-error: #ffffff
error-container: #ffdad6   on-error-container: #93000a

stage-deep: #08090A           (dark modal / featured stage background)
```

**Palette roles**
- **Surface foundations** (`#FAF8F5` / `#F5F2EB`) — warm parchment, never
  clinical pure white. Base canvas everywhere.
- **Primary ink** (`#111215`) — headlines, structural borders, dominant
  buttons, primary text.
- **Regal Azure** (`#3B82A6` / `#126588`) — focal highlights, active states,
  selected pills, link accents. Used deliberately, sparingly.
- **Steel Mist** (`#A8C5DA`) — soft atmospheric accent for badges and
  delicate hover states.
- **Text hierarchy** — `#111215` for headlines/body, `#6E6B64` for metadata
  (dates, durations, credits), `#99958C` for the dimmest tertiary text.

## 3. Typography

Headline serif: **Playfair Display**. Body/label sans: **Hanken Grotesk**.
Load both via `next/font/google` (see `ARCHITECTURE.md` §2) — no CDN
`<link>` tags.

| Token | Family | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| display-hero | Playfair Display | 84px (44px mobile) | 700 | 92px (48px) | -0.03em (-0.02em) |
| headline-xl | Playfair Display | 56px (36px mobile) | 700 | 64px (42px) | -0.02em (-0.01em) |
| headline-lg | Playfair Display | 40px (28px mobile) | 600 | 48px (34px) | -0.01em (0em) |
| headline-md | Playfair Display | 28px | 600 | 36px | 0em |
| headline-sm | Hanken Grotesk | 20px | 600 | 28px | 0.01em |
| body-lg | Hanken Grotesk | 18px | 400 | 28px | -0.01em |
| body-md | Hanken Grotesk | 15px | 400 | 24px | 0em |
| body-sm | Hanken Grotesk | 13px | 400 | 20px | 0.01em |
| label-caps | Hanken Grotesk | 11px | 600 | 14px | 0.14em, UPPERCASE |
| label-md | Hanken Grotesk | 14px | 500 | 18px | 0.02em |

**Rules**
- Every section label, timetable/meta marker, and instructor/credit title
  uses `label-caps` — full uppercase, wide tracking — to read like archival
  print.
- Editorial prose runs 45–65 characters per line; let the sand background
  breathe around text blocks rather than filling the measure.

## 4. Spacing

```
space-xxs: 0.25rem   space-xl: 2.5rem
space-xs: 0.5rem     space-2xl: 4rem
space-sm: 0.75rem    space-3xl: 6rem
space-md: 1rem       space-4xl: 8rem
space-lg: 1.5rem

grid-gutter: 1px
page-padding-desktop: 3rem
page-padding-mobile: 1.25rem
```

**Implementation note:** in code, this named scale maps onto Tailwind's
built-in *numeric* spacing scale (base unit `0.25rem`) rather than custom
named tokens — Tailwind v4 already uses the names `sm/md/lg/xl/2xl/3xl/4xl`
internally for its `max-w-*`/`w-*`/`size-*` scale, so redefining those same
names for padding/gap silently breaks those built-ins. Use this mapping:

| Token | rem | Tailwind number |
|---|---|---|
| xxs | 0.25rem | `1` |
| xs | 0.5rem | `2` |
| sm | 0.75rem | `3` |
| md | 1rem | `4` |
| lg | 1.5rem | `6` |
| xl | 2.5rem | `10` |
| 2xl | 4rem | `16` |
| 3xl | 6rem | `24` |
| 4xl | 8rem | `32` |

e.g. `space-lg` → `gap-6` / `p-6` / `mt-6`. `page-padding-desktop` and
`page-padding-mobile` are implemented as genuinely custom theme keys
(`--spacing-page-desktop`, `--spacing-page-mobile`) since those names don't
collide with anything Tailwind defines by default.

## 5. Layout & grid

- **Framed canvas grid:** 12 columns bound by continuous hairline borders
  (`border-grid` or `border-subtle`). Sections sit inside modular editorial
  matrices, not floating detached cards.
- **Section pattern:** title in the left 4–5 columns; narrative/imagery/
  interactive content in the remaining columns, separated by a vertical
  hairline rule.
- **Breakpoints:**
  - Desktop (1280px+): max width 1440px, 3rem outer padding, 12-column grid
    with 1px dividers.
  - Tablet (768–1024px): 6-column system; 4-column card grids collapse to 2.
  - Mobile (<767px): single-column stack; vertical dividers become
    horizontal hairlines.

## 6. Elevation, shape, components

**Elevation:** zero ambient shadows, zero blur/skeuomorphism. Depth comes
from architectural linearity (1px hairlines: `border-grid` primary,
`border-subtle` secondary), tonal layering (base `surface-canvas` →
hover/selected `regal-ice-tint` or `surface-alt` → dark featured stage
`stage-deep`/`#111215` with `surface-card` text), and image contrast. The one
exception: sticky/overlay surfaces may use `backdrop-filter: blur(12px)` over
a 90%-opaque `surface-canvas` for separation without a shadow.

**Shape:** `border-radius: 0` everywhere — layout blocks, image frames,
inputs, buttons. Exception: circular status dots and avatar/thumbnail seals
(`border-radius: 9999px`) as a deliberate geometric contrast point. Encode
this as exactly two Tailwind radius values (`none`, `full`) — no in-between
scale.

**Buttons**
- Primary: solid `#111215` bg, `surface-canvas` uppercase `label-caps` text,
  `1rem 2rem` padding, `radius: 0`. Hover → `#3B82A6` fill or an inverted
  interior 1px border.
- Secondary (wireframe): transparent bg, `1px solid #111215`, `#111215`
  text. Hover → fills solid `#111215` with `surface-canvas` text.
- Ghost text action: `label-caps` + `→`, 1px underline offset 4px that
  extends on hover.

**Cards (people — founder/instructors/credits)**
1:1 or 4:5 image, no radius, flush against a `1px solid #111215` cell frame.
Below: name in `headline-sm`, role/discipline in `label-caps` /
`text-muted`. Hover: image `scale(1.02)` inside `overflow:hidden`; name gets
a `#3B82A6` underline hairline.

**Service / offering rows** *(replaces the Stitch "class timetable" pattern
— see §7)*
Matrix rows separated by `border-subtle` hairlines. Columns: service name
(`headline-sm`) + one-line description (`body-md`), category tag
(`label-caps` badge), primary action (`Enquire` / ghost-text `→`). Active/
highlighted row: tint to `regal-ice-tint` with a `3px solid #3B82A6` left
accent — reuse this for a "featured/flagship production" row rather than a
"booked class" state.

**Chips & badges:** flat rectangles, `1px solid #111215` or `#A8C5DA`,
`4px 10px` padding, `label-caps`, no radius. Reserve the tinted
`regal-ice-tint` / `1px solid #3B82A6` pill for a flagship/featured tag
(e.g. "Flagship Production", "IGT Champions").

**Inputs:** bottom-border-only, `1px solid #111215` on `surface-canvas`,
floating `label-caps` label. Checkboxes/radios: sharp 14×14px squares,
`1px solid #111215`, solid-black fill + white mark when active.

## 7. Site map (corrected — real business, not the Stitch conservatory IA)

| Route | Purpose | Adapts which Stitch pattern |
|---|---|---|
| `/` (Home) | Hero (real founder/troupe photo), IGT-win credibility strip, stats row (years active, notable stages, IGT title), service categories preview, flagship production highlight, testimonial strip, CTA to enquire | Home hero + stats row + "choreographic repertoire" cards → repurposed as flagship production highlights |
| `/about` | Founding story (Berhampur origin, 26 dancers, IGT Season 1), Krishna Mohan Reddy profile, real milestones (IPL Chennai, KBC, IGT4 opening act, History Channel, NDTV Greenathon) | About hero + "Origin & Lineage" split section |
| `/services` | Grid of the 9 real offerings (Corporate, Wedding, TV Award Show, Musical Acts, Religious, School/College, Mahotsavs, Music Video/Movies, Promotion Shoots) | "Service / offering rows" pattern above (replaces class timetable) |
| `/services/[slug]` | One offering detail page | Instructor-card detail pattern adapted to a service |
| `/gallery` | Real performance photography (from `assets/source/images/`) | Repertoire/production cards |
| `/journal` + `/journal/[slug]` | News/press mentions (IGT wins, TV appearances) | Journal & Editorial screen's card grid |
| `/contact` | Real address (Gopalpur, Odisha 761002), real phone numbers, real email, enquiry form | Contact & Location layout, minus the fictional SoHo/Manhattan copy |

Testimonials (Naveen Patnaik, V.K. Pandian, Shah Rukh Khan, Sonali Bendre,
Kirron Kher, Shekhar Kapur, Dharmendra) surface on Home and/or About as
text-attributed quotes — see `ARCHITECTURE.md` §6 for the photo-usage caveat.

## 8. Real cultural/brand context (for copywriting, not layout)

Preserved from the Stitch project's companion brand doc
(`assets/source/` origin: Stitch "Indian Cultural Values & Brand Guidelines"),
which — unlike the page copy — does describe the real troupe accurately:

- Origin: Berhampur, Ganjam, Odisha — founded by Krishna Mohan Reddy with
  youth from disadvantaged backgrounds; national fame via *India's Got
  Talent* Season 1, performing mythological epics (Dashavatar, Krishna
  Leela/Ras Leela, Vande Mataram/Surya Namaskar).
- Pedagogical/cultural pillars worth echoing in tone (not as literal site
  sections): Guru-Shishya Parampara (mentorship lineage), Natya Shastra &
  the Navarasas (nine emotive rasas), Seva & Samaveshi (social upliftment
  through dance), Vasudhaiva Kutumbakam (world-as-one-family — blending
  Odissi/Chhau with global contemporary forms).
- These give the "About" narrative and any journal/press copy an authentic
  voice grounded in the real troupe's heritage, without resorting to the
  fictional conservatory framing.

---

## 9. Stitch-Exact Design System (supersedes §1–6 site-wide)

**Why this section exists:** §1–6 above were built from the *project-level*
`designMd` document attached to the Stitch project — an elaborate
"editorial/Playfair Display/hairline-grid" brand doc. Investigating the
actual exported HTML of every Stitch screen (Home, About, Classes, Contact,
Journal, Faculty) shows **none of them ever used that document** — every
single screen was generated with one consistent, different system: Plus
Jakarta Sans, Material Design 3 color tokens, generously rounded shapes.
That system — verified identical (same hex values, same radius scale, same
font) across all six screens via their embedded `tailwind.config` — is the
*real* Stitch design, and what "make the design exactly like the one in
Google Stitch" refers to. This section documents it precisely, sourced
directly from the Home screen's embedded config (`assets/source/` reference:
Stitch project `projects/14513562789089232297`, screen
`e1ef955e8b08469798a44397b5a5be19`... — Home screen id
`35156c12705d4fa7b91a39c53e92f754`).

**Scope:** originally applied to the Home page only; per a follow-up
request ("make UI of all the other pages exactly like the google stitch
design... icons used should be the same... 0 variations"), this is now the
**site-wide** system — `Header`, `Footer`, `/about`, `/services` (+ detail),
`/gallery`, `/journal` (+ detail), `/contact` all migrate to it. §1–6 above
is retained in this document only as a historical record of the discarded
system (do not use it for new work) — see §12 for the per-page Stitch
source mapping and the exact-icon inventory this migration must match with
zero substitutions.

The `home-` prefix on the typography tokens in §9.2 is a naming artifact of
where this system was first proven out (the Home page rebuild) — it is not
a scoping signal. Every page uses `text-home-*` for type going forward;
there is no separate "site" type scale to migrate to.

**Token collision analysis (why this can be additive, not destructive):**
every new token below was checked against the existing §1–6 tokens already
in `globals.css`. Four names overlap (`on-primary`, `error`,
`error-container`, `surface-container-lowest`) and all four happen to share
byte-identical values between the two systems, so reusing them is safe.
Every type-scale name that overlaps in *label* (`headline-xl`, `headline-lg`,
`body-lg`, etc.) does **not** overlap in *value* between the two systems
(e.g. old `body-lg` is 18px, new is 16px) — so every new type token is
suffixed `home-` to guarantee zero cross-contamination of the pages still
on the old system. Spacing and radius tokens use names that don't exist in
the old system at all (`space-*`, `layout-*`, `radius-card/panel/hero`), so
no suffix is needed there. No existing utility class in `about/services/
gallery/journal/contact` changes meaning as a result of this addition
(verified: those files never use bare `rounded`, `rounded-lg`, or
`rounded-xl`, the only radius keys this section touches beyond `full`).

### 9.1 Color (Material Design 3 tokens, verbatim from Stitch)

```
primary: #000000              on-primary: #ffffff (existing token, reused)
primary-container: #1b1b1b    on-primary-container: #848484
secondary: #0051d5            on-secondary: #ffffff
secondary-container: #316bf3  on-secondary-container: #fefcff
tertiary: #000000             on-tertiary: #ffffff
tertiary-container: #001e2c   on-tertiary-container: #008ebf

surface: #faf9fd              on-surface: #1b1b1f
surface-variant: #e3e2e6      on-surface-variant: #4c4546
surface-dim: #dbd9dd          surface-bright: #faf9fd
surface-container-lowest: #ffffff (existing, reused)
surface-container-low: #f5f3f7
surface-container: #efedf1
surface-container-high: #e9e7ec
surface-container-highest: #e3e2e6
background: #faf9fd

inverse-surface: #2f3034      inverse-on-surface: #f2f0f4
inverse-primary: #c6c6c6

outline: #7e7576              outline-variant: #cfc4c5
error: #ba1a1a (existing, reused)     on-error: #ffffff
error-container: #ffdad6 (existing, reused)   on-error-container: #93000a
```

### 9.2 Typography — Plus Jakarta Sans (all tokens prefixed `home-`)

Font loaded via `next/font/google` (`Plus_Jakarta_Sans`) as `--font-jakarta`,
scoped to the Home page only via a wrapper class — **not** applied to
`<body>`, so other pages keep Hanken Grotesk/Playfair Display untouched.
Material Symbols Outlined (Stitch's icon font) loaded via a plain `<link>`
in that page's own markup, exactly as Stitch loads it, since it isn't a
`next/font`-catalog text face.

| Token | Size | Line-height | Tracking | Weight (applied via `font-*`) |
|---|---|---|---|---|
| home-headline-xl | 56px (36px mobile) | 64px (42px) | -0.03em (-0.025em) | 800 (`font-extrabold`) |
| home-headline-lg | 40px (28px mobile) | 48px (34px) | -0.02em | 700 (`font-bold`) |
| home-headline-md | 28px | 36px | -0.015em | 700 (`font-bold`) |
| home-headline-sm | 20px | 28px | -0.01em | 600 (`font-semibold`) |
| home-title-lg | 18px | 24px | -0.005em | 600 (`font-semibold`) |
| home-body-lg | 16px | 26px | 0em | 400 |
| home-body-md | 14px | 22px | 0em | 400 |
| home-label-lg | 14px | 18px | 0.01em | 600 (`font-semibold`) |
| home-label-md | 12px | 16px | 0.02em | 600 (`font-semibold`) |
| home-label-sm | 10px | 14px | 0.06em | 700 (`font-bold`) |

Usage pattern matches Stitch exactly: `font-jakarta text-home-headline-xl
font-extrabold uppercase tracking-tight` etc. — always pair the size token
with an explicit `font-*` weight utility (weight isn't baked into the token).

### 9.3 Spacing

```
space-2xs: 0.25rem   space-2xl: 3rem
space-xs: 0.5rem     space-3xl: 4rem
space-sm: 0.75rem    space-4xl: 6rem
space-md: 1rem
space-lg: 1.5rem     layout-margin-mobile: 1.25rem
space-xl: 2rem       layout-margin-tablet: 2rem
                     layout-margin-desktop: 3.5rem
                     layout-gutter: 1.5rem
```
Utilities: `p-space-lg`, `gap-space-md`, `px-layout-margin-desktop`, etc.

### 9.4 Shape

```
radius-card: 1rem     (Stitch's "DEFAULT" — stat tiles, schedule rows, badges)
radius-panel: 2rem    (Stitch's "lg" — repertoire/instructor cards, hero image frame)
radius-hero: 3rem     (Stitch's "xl" — large feature panels: live-production banner,
                        admissions/booking CTA, audio+diary combined panel)
radius-full: 9999px   (existing token, reused — pills, badges, circular buttons)
```
Named distinctly (`card`/`panel`/`hero`) rather than reusing Tailwind's own
`rounded-lg`/`rounded-xl`/bare `rounded` keys, to avoid the exact class of
bug logged in `PROGRESS.md`'s spacing-token incident — explicit custom names
make the source of a radius value unambiguous no matter how Tailwind's own
default scale for those keys behaves in a given version.

### 9.5 Icons

Material Symbols Outlined, used exactly as Stitch does: `<span
class="material-symbols-outlined text-[Npx]">icon_name</span>` with the
icon's name as literal text content (ligature font). No React icon package
needed.

---

## 10. Home Screen — Element-by-Element Content Plan

Per-section real-vs-placeholder decisions, planned before implementation as
requested. "Real" = sourced from `PROGRESS.md`'s confirmed-facts table or
the real cultural-values document (DESIGN.md §8). "Placeholder" = Stitch
invented a specific fictional entity (a name, a number, a date, a track, a
video) with no real-world counterpart — rendered with the placeholder
treatment in §11, never with an invented-but-plausible substitute. "Reframed"
= Stitch's content assumes the fictional conservatory/school business model;
reworded to the real event-booking business model while keeping the exact
visual pattern.

| # | Section (Stitch name) | Decision | Detail |
|---|---|---|---|
| 1 | Hero eyebrow badge | Reframed | "EST. 2008 • ... • GLOBAL CONSERVATORY" → real facts only: Berhampur, Odisha + India's Got Talent Season 1 Champions. No inventable founding year. |
| 2 | Hero Devanagari micro-label, headline, paragraph | Real (as-is) | "साधना एवं कला" ("discipline and art"), "Form. Devotion. Kinetic Architecture." and its paragraph are brand voice, not factual claims — consistent with the real cultural pillars (§8). Kept verbatim. |
| 3 | Hero CTA 1 "Explore Repertoire & Shows" | Real | Links to `/gallery`. |
| 4 | Hero CTA 2 "View Class Schedules" | Reframed | → "View Our Services", links to `/services` (no classes exist). |
| 5 | Hero image | Real | Real performance photo (`krishna-leela-1.jpg`) already in `public/images/gallery/`. |
| 6 | "LIVE PRODUCTION MASTER" badge + "Op. 14 / Dashavatar Act III" tag | Reframed + Placeholder | "Dashavatar" is a real repertoire piece (§8); the "Op. 14 / Act III" catalog numbering is Stitch invention → dropped, replaced with a plain "Featured Repertoire" tag. |
| 7 | Banner title/description ("Ten Avatars of Vishnu…26-performer…") | Real | "26 performers" genuinely echoes the real founding troupe size (old website.pdf). Descriptive copy kept, tied explicitly to the real Dashavatar piece. |
| 8 | Play button / "Trailer Cut 03:42" | Placeholder | No real video exists. Button rendered visibly disabled with a "Video coming soon" label — never a fake runtime. |
| 9 | Stat tile 1 "15+ Years" | Replaced with real stat | No confirmed founding date to compute years from → swapped for a real countable fact: **"26 — Original Troupe Members"**. |
| 10 | Stat tile 2 "1,000+ Dancers Mentored" | Replaced with real stat | Unconfirmed → swapped for **"9 — Signature Services"** (real, confirmed list). |
| 11 | Stat tile 3 "IGT National Champions" | Real (as-is) | Confirmed fact, kept verbatim. |
| 12 | Stat tile 4 "09 Disciplines Integrated" | Replaced with real stat | Unconfirmed → swapped for **"6 — National Media Milestones"** (IPL, KBC, IGT4, History Channel, NDTV Greenathon + the IGT1 win itself — all confirmed in `PROGRESS.md`). |
| 13 | "Choreographic Repertoire" 3 cards | Real, placeholder specifics | All three pieces (Dashavatar, Krishna Leela & Divine Ras, Vande Mataram & Surya Namaskar) are real repertoire names (§8). Duration, exact performer count (beyond the real "26"), and touring-city lists are Stitch inventions → shown as placeholders (e.g. "Duration: —", "Touring: to be announced"), not fabricated numbers/cities. Images: real performance photos standing in generically (not claimed to be that exact production). |
| 14 | "Conservatory Philosophy" 4 pillar cards | Real (retitled) | Guru-Shishya Parampara, Natya Shastra & Navarasa, Seva & Samaveshi, Vasudhaiva Kutumbakam are all real, documented cultural pillars (§8) — copy kept near-verbatim from the source doc. Section retitled "Artistic Philosophy" (drops "Conservatory"). |
| 15 | "Daily Conservatory Schedule" table | Reframed | No classes exist. Same exact visual pattern (numbered rows, category chip, title, contact, timing/location, status, action button) repurposed as **"Now Booking — Availability"**: category chip uses the real 9 services as categories (real data); specific event name/date/venue per row are placeholders ("Event details to be confirmed"); action button is real → "Enquire to Book" linking to `/contact`. |
| 16 | "Sacred Mastery" team grid — founder card | Real | Krishna Mohan Reddy, real founder/choreographer — real photo (`founder-krishna-mohan-reddy.jpg`), bio drawn from the real About page content. |
| 17 | "Sacred Mastery" — 4 other instructor cards (Minati Sahoo, Bikram Mohanty, Tara Roy, Pandit Jagannath Das) | Placeholder | Entirely fictional people, fictional stock photos. Replaced with generic placeholder cards: "[Team Member Name]" placeholder image, "Role to be announced" — clearly marked as unfilled slots, not renamed real people. |
| 18 | "Original Stage Composition" audio player | Placeholder | No real recording exists. Card kept, player control disabled/inert, label "Audio coming soon." |
| 19 | "Rehearsal Diary Log #108" video teaser | Placeholder | No real behind-the-scenes video exists. Card kept, "Watch Cut" control disabled/inert, label "Video coming soon." |
| 20 | "2025-2026 Admissions Open" CTA panel | Reframed | No admissions/auditions exist. Same exact visual treatment (dark rounded panel, badge, headline, two buttons) repurposed as a booking CTA: "Now Booking — 2025–26 Season" / real copy about enquiring to book the troupe. Buttons → "Send an Enquiry" (`/contact`) and "Call Us Now" (`tel:` real number). |
| 21 | Header, Footer | Unchanged | Out of scope for this pass — see the note under §9. |

---

## 11. Placeholder Convention

Two reusable primitives, used only on the Home page for the items in §10
marked "Placeholder":

- **`PlaceholderImage`** — a `radius-panel`-rounded box with a dashed
  `outline-variant` border, a centered Material Symbols `image` icon, and a
  small caption (e.g. "Photo to come"). Never a fake photo, never a
  generic stock image standing in for a specific named real person.
- **`PlaceholderNote`** — inline muted italic text (`on-surface-variant`
  color) for a missing string value, e.g. "Duration to be announced" —
  reads as a professional "TBC" rather than a bracketed dev artifact like
  `[TODO]`.

Both are implemented once in `src/components/ui/Placeholder.tsx` and reused
across every §10 row marked Placeholder, so they're visually consistent and
trivially findable/replaceable later (`grep -r Placeholder src/`) once real
data arrives.

---

## 12. Site-Wide Migration — Per-Page Reference Map & Exact Icon Inventory

Every page below must be rebuilt against its named Stitch export
(`assets/source/` scratch reference; the raw exported HTML for each is what
was inspected to produce this table — re-fetch via the Stitch MCP
`get_screen` on `projects/14513562789089232297` if a session needs the
source again). "Icons" lists every `material-symbols-outlined` glyph name
used on that real screen, **verbatim** — use exactly these icon names,
never a visually-similar substitute (e.g. `event` for `calendar_today`).
Follow the same method as Home (DESIGN.md §10): real facts and real
repertoire/service names in, fictional specifics out to a `Placeholder`,
business-model mismatches (classes/tuition/auditions) reframed to the real
event-booking model.

| Route | Stitch source screen | Icons (exact, no substitutions) |
|---|---|---|
| `/` (Home) | "Home - Prince Dance Group" (`home.html`) | `arrow_forward`, `calendar_month`, `graphic_eq`, `play_arrow` (used for both the audio-player button and, reused rather than adding `videocam`, the rehearsal-diary video placeholder) — a strict subset of the screen's full set (`calendar_today`, `call`, `mail`, `masks`, `person_celebrate`, `public`, `volunteer_activism` also appear on the live screen but landed in Header/PhilosophyGrid instead, see their own rows) |
| `Header` / `Footer` | Home screen's own `<header>`/`<footer>` markup | `call`, `mail`, `calendar_today`, `arrow_forward` (+ `menu`/`close` for the mobile nav toggle — Stitch's export has no responsive mobile menu at all, so there's no existing icon choice to preserve; these are the standard Material Symbols names in the same icon family, added rather than substituted) |
| `/about` | "About Us - Minimal Uber Light" (`about_light.html`) | `public`, `star`, `verified` |
| `/services` | "Classes & Schedule - Minimal Uber Light" (`classes.html`) — reframed exactly like Home's Booking Availability (DESIGN.md §10 row 15): real 9 services stand in for the class rows | `arrow_forward`, `call`, `check_circle`, `domain`, `graphic_eq`, `person`, `remove`, `schedule`, `spa`, `timer`, `verified` |
| `/services/[slug]` | "Faculty & Mentors - Minimal Uber Light" (`faculty.html`) card pattern, adapted | `arrow_forward` |
| `/gallery` | No dedicated Stitch screen exists for this route. Use the Home screen's repertoire-card component pattern (`RepertoireGrid`) verbatim for visual consistency — same tokens, same card shape, same icon (`calendar_month` if a caption row is used) — rather than inventing a new pattern. |
| `/journal` + `/journal/[slug]` | "Journal & Editorial" (`journal.html`) | `arrow_forward`, `auto_stories`, `menu_book`, `play_arrow`, `school` |
| `/contact` | "Contact & Location - Minimal Uber Light" (`contact.html`), enquiry-form UX cross-checked against "Get in Touch" (`get_in_touch.html`) | From `contact.html`: `arrow_forward`, `arrow_outward`, `badge`, `chat`, `check_circle`, `directions`, `domain`, `event`, `expand_more`, `groups`, `local_parking`, `location_on`, `mark_email_read`, `phone_in_talk`, `roller_skating`, `schedule`, `school`, `shield`, `subway`, `verified`, `view_in_ar`, `visibility`. From `get_in_touch.html` (if that form UX is adapted in): `arrow_back`, `call`, `help_outline`, `lock`, `mail`, `north_east`, `speed`, `verified_user` |

### Header — exact structure to port (from Home's own header)

```
<header class="fixed ... bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/20 shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
  h-20 inner bar, max-w-[1400px], px-layout-margin-*
  Left: logo image + wordmark (two-line: bold name / label-sm tracked subtitle)
        + a `hidden xl:flex` "Now Booking" pill badge (dot + label-sm)
  Center: nav — each link `relative` with an `after:` pseudo-element
          underline (h-[2px], bg-primary, width 0→full on hover, permanently
          full + font-bold when active) — this is the exact active-state
          mechanism to port, it's more polished than §6's plain color-swap
  Right: a `tel:` quick-link (icon `call`, hidden below `2xl`), a
         secondary ghost link (icon `mail`), and a primary rounded-full
         CTA button (icon `calendar_today` + label + trailing `arrow_forward`
         that translates on hover)
```
Adapt content only: real logo/wordmark (`site.name`), real nav items
(Home/About/Services/Gallery/Journal/Contact — do not adopt Stitch's
fictional "Productions & Acts / Weddings & Celebrations / Corporate
Events" labels, since those don't match this site's real routes), real
phone number for the `tel:` link, CTA → real `/contact` enquiry link.

### Footer — exact structure to port

5-column grid (2-col brand block + 3 link columns: Disciplines→real
service categories, Company→real page links, Newsletter→signup form with
a circular `arrow_forward` submit button inside the input), bottom bar
with copyright + policy links. Real address/phone/email replace the
fictional "Stage Arts Complex... New York" block.

---

## 13. Danza Theatrical — Home Screen Redesign (client-confirmed, supersedes §9's Home)

**Why this section exists:** the client reviewed Stitch and confirmed a new
design direction on 2026-09-20. Two things landed in the Stitch project the
same day: a formal design-system asset named **"Nocturne Stage"**
(`assets/335c69e0b15d4a6697bb2ef4b347b405` — dark theatrical, Material
Design 3 tokens, used consistently across 4 new screens: About & Heritage,
Weddings & Celebrations, Productions & Repertoire, Contact & Event
Bookings), and a separate screen, **"Home - Prince Dance Group (Danza
Theatrical Refined)"** (`3a06cb7f9def47859efa6d2ea1e160c9`), built against a
*different*, earlier draft system ("Dramatic Stage & Academy",
`assets/9aaa03d4a8f742008a720e5b11718e5d` — bespoke color names, not M3).
The user explicitly directed using this exact Home screen as the literal
reference ("every element should resemble the design... should not be much
different from that") — so this section documents *that screen's own*
tokens, not Nocturne Stage's, even though they'll likely need reconciling
once the other pages are migrated in a follow-up pass. **Scope of this
section: Home (`/`) only**, superseding §9's Home implementation (Hero
through BookingCTA). Every other page stays on §9 (Material 3 / Plus
Jakarta Sans) until a follow-up migrates them to Nocturne Stage — flagged in
`PROGRESS.md` as the next phase, not done here.

**Source:** exported HTML of the Home screen above, `assets/source/`
scratch reference. Re-fetch via the Stitch MCP `get_screen` on
`projects/14513562789089232297` if a session needs it again.

### 13.1 Color (bespoke names, verbatim from the screen's own tailwind config)

```
surface-stage: #0d0e12        (page background — deep near-black)
surface-card: #181a20         (card/panel background)
surface-elevated: #20232a     (raised panels, modals, form fields)
surface-border: #282a32       (hairline borders on dark surfaces)

danza-crimson: #e11d48        (primary — CTAs, active accents)
danza-crimson-hover: #f43f5e  (primary hover state)
danza-gold: #f59e0b           (secondary accent — badges, secondary CTAs, prices/highlights)
danza-cyan: #38bdf8           (tertiary accent — used sparingly, e.g. info badges)

on-surface: #f1f5f9           (primary text on dark)
on-surface-muted: #94a3b8     (secondary/metadata text)
on-surface-dim: #64748b       (dimmest tertiary text)
```

No collision risk with the existing `home-*`/M3 tokens already in
`globals.css` (§9) — every name above is new and distinct (`surface-stage`
vs. the existing `surface`, `danza-crimson` vs. the existing `primary`,
etc.), so this is additive. Scoped to Home only via component-level classes,
same pattern as §9 was originally scoped to Home before the site-wide
migration.

### 13.2 Typography

Two families, no separate named type scale in the source (unlike §9.2) —
the screen uses Tailwind's own size utilities (`text-5xl`, `text-lg`, etc.)
directly rather than custom tokens:

```
font-headline: "Playfair Display", serif   (headlines, section titles, pull-quotes)
font-sans: "Plus Jakarta Sans", sans-serif  (body copy, labels, UI text)
```

Plus Jakarta Sans is already loaded site-wide (`fonts.ts`) — reuse it, no
new font load needed. Add the `font-headline` utility mapping to Playfair
Display, which is **not** currently loaded (it was removed site-wide during
the Phase 6 cleanup) — re-add `next/font/google`'s `Playfair_Display`,
scoped to Home only via its own font-loader module, not applied to
`<body>`, so it doesn't leak into the other (still-M3/Jakarta) pages.

### 13.3 Shape & spacing

No custom radius/spacing scale in this screen's config either — it uses
Tailwind's built-in defaults directly (`rounded-lg`, `rounded-2xl`,
`rounded-full`, `p-4`, `gap-8`, etc.). Since nothing on the currently-live
site uses Tailwind's own default `rounded-lg`/`rounded-2xl` (verified: only
`rounded-none`/`rounded-full` pre-Phase-6, and `rounded-card/panel/hero/full`
post-Phase-6), reusing Tailwind's stock scale for Home's new sections is
safe and requires no new theme tokens at all.

### 13.4 Icons

Material Symbols Outlined (already loaded site-wide). Exact icons on this
screen, zero substitutions: `arrow_forward`, `arrow_outward`, `close`,
`graphic_eq`, `mail`, `military_tech`, `phone_in_talk`, `play_arrow`,
`public`, `send`, `stars`, `trophy`.

### 13.5 Element-by-element content plan

Same method as §10: real facts in; Stitch-invented specifics (including,
this time, a **fabricated quote attributed to the real founder** — treated
with extra care, never shipped as if genuine) → `Placeholder`; the new
"Academy Masterclasses" section reintroduces the school/tuition/enrollment
framing `ARCHITECTURE.md` §0 rules out — reframed, not adopted as-is.

| # | Section | Decision | Detail |
|---|---|---|---|
| 1 | Top utility bar: "INDIA'S GOT TALENT CHAMPIONS", "EST. 2008 • Berhampur to the World Stage", "Accepting 2025–26 Commissions" | Reframed | IGT claim real; "EST. 2008" is an unconfirmed founding year (same gap as §10 row 1) → drop the specific year, keep "Berhampur to the World Stage" (real origin, not a factual claim about a date) |
| 2 | Hero eyebrow "Theatrical Choreography Ensemble", headline "Sacred Geometry. Stage Grandeur. Unforgettable Spectacles.", paragraph (Mayurbhanj Chhau, Odissi, world tours) | Real (as-is) | Brand voice + real disciplines named (Mayurbhanj Chhau, Odissi) — kept verbatim |
| 3 | CTA "Book for Events" | Real | Links to `/contact` |
| 4 | CTA "Watch Showreel (2:45 min)" | Placeholder | No real showreel video exists — rendered inert with "Video coming soon", same pattern as §10 row 8 |
| 5 | Hero image + "Act: Dashavatar Apex" / "The 26-Dancer Human Architecture" card | Real | Dashavatar is a real repertoire piece (§8); "26" echoes the real founding troupe size. Real performance photo. |
| 6 | "First Troupe from Odisha / To win India's Got Talent Grand Finale" badge | Real | Confirmed fact |
| 7 | Trust badges "IGT / CWC / G20" (Commonwealth Games Delhi, G20 India Cultural Gala, Rashtrapati Bhavan) | Placeholder | Only the IGT win is confirmed. Commonwealth Games / G20 / Rashtrapati Bhavan appearances are **not** in `PROGRESS.md`'s confirmed facts — dropped rather than shipped as unverified prestige claims. Real confirmed appearances (IPL Chennai, KBC, IGT4, History Channel, NDTV Greenathon) substitute where a "notable appearances" strip is needed. |
| 8 | Stat tiles "15+ Years", "520+ Galas & Royal Weddings", "1,200+ Dancers Mentored", "100% Bespoke Staging" | Replaced with real stats | Same approach as §10 rows 9–12 — reuse `heroStats` from `content/home.ts` (26 founding members, 9 services, IGT champions, 6 media milestones) rather than inventing new unconfirmed numbers |
| 9 | "Curated Choreographic Experiences" 3 cards (Royal Weddings & Sangeet, Corporate Summits, Global Tours & Festivals) | Real category, placeholder specifics | These map onto real service categories (Wedding Events, Corporate Events — confirmed; "Global Tours" doesn't map to a confirmed service, generalize to real "TV Award Show / Festivals" categories instead). Troupe-scale/duration/tech-spec numbers per card are unconfirmed → placeholders, not invented. Action buttons → real, linking to `/contact` with the relevant subject. |
| 10 | "Masterpiece Productions Repertoire" 4 cards (Dashavatar, Krishna Leela, Vande Mataram, Shiva Tandava) | Real repertoire, placeholder specifics | First three are documented real repertoire (§8). "Shiva Tandava" is plausible/thematically consistent but **not** independently confirmed — keep the name (it's a real mythological subject, not a fabricated business fact) but don't assert specifics (artist count, stage-rider dimensions) as confirmed; those become placeholders exactly like §10 row 13. |
| 11 | "Conservatory & Studio — Academy Masterclasses & Residencies" schedule (batch caps, "Reserve Seat", "Audition Entry", named instructors) | Reframed | No confirmed academy/training program exists — this is the same class-schedule/tuition mismatch as the original Stitch import (`ARCHITECTURE.md` §0). Reframed exactly like §10 row 15 / the live `BookingAvailability` pattern: same visual row structure, repurposed around real bookable event categories rather than class enrollment. Nav item "Academy & Workshops" is *not* adopted — Home's nav stays the real site nav (Home/About/Services/Gallery/Journal/Contact). **Flagged to the user**: if the client's business now genuinely includes teaching/workshops, this should become real content instead of a reframe — confirm before the next pass. |
| 12 | Founder card (Krishna Mohan Reddy, real photo, real credential line) | Real | Photo + name + role real; "Sangeet Natak Akademi Awardee" is an **unconfirmed** credential — not in `PROGRESS.md` — placeholder-note it rather than asserting it |
| 13 | Founder pull-quote ("We do not merely assemble dancers...") | **Dropped, not placeholder** | This is a fabricated quote attributed to a real, named person — more serious than an ordinary invented stat (misattribution risk to a real individual). Do not ship any version of it, real or placeholder-labeled. Use only real, sourced copy near the founder card (the real origin-story paragraph already established in `content/site.ts`). |
| 14 | Two more team cards (Vidushi Sunita Sahu, Ustad Ramesh Mahapatra) | Placeholder | Entirely fictional people, same treatment as §10 row 17 — generic "Role to be announced" placeholder cards, not renamed real people |
| 15 | "The Sound of Sacred Rhythm" audio section (track name, orchestra name, waveform) | Placeholder | No real recording exists — same treatment as §10 row 18, inert control + "Audio coming soon" |
| 16 | "Event Concierge Desk" contact block — phone `+91 94370 52888 / +91 98612 04555`, email `bookings@princedancegroup.in` | **Replaced with real contact info** | These numbers/email do **not** match `PROGRESS.md`'s confirmed facts (`+91 98611 80053` / `+91 82709 23491`, `princedancegroup09@gmail.com`) — Stitch invented plausible-looking but wrong contact details. Use the real, confirmed ones, never the screen's. |
| 17 | "Reserve Performance Dates" enquiry form (event nature, troupe size, date, location) | Real, adapted | The form fields themselves are a reasonable real enquiry form for this business — reuse the pattern, wire to the existing real `/api/contact` flow (honest "not yet connected" behavior preserved, `ARCHITECTURE.md` §8), don't invent a "24 hours" response-time SLA that isn't confirmed |
| 18 | Footer | Reframed | Real business description, real repertoire list, real nav (not "Dance Academy" / fictional "Booking Desk & Patron Ledger" newsletter framing — reuse the newsletter honesty pattern from the live `Footer.tsx`), real copyright (drop "& Academy" from the business name) |
| 19 | Showreel modal ("Includes footage from India's Got Talent, G20 Gala & Royal Destination Sangeet") | Dropped | No real reel exists (see row 4); the G20 claim repeats the row-7 unconfirmed-prestige issue |

Header/Footer chrome stays the real, already-migrated site Header/Footer
(§12) for now — this section only redesigns the page content between them,
same scoping choice §9 made originally for Home.

### 13.6 Header & Footer — same treatment, now in scope

Originally scoped out ("stays the real, already-migrated site Header/
Footer" — see this section's opening). Per a follow-up request, Header and
Footer are now rebuilt to match this same Home screen's own header/footer
markup (`home_refined.raw`, lines ~51–150 and ~878–960 of the pretty-printed
export). Same method as everywhere else in this document: real facts and
real nav in, Stitch inventions out to a placeholder or dropped, business-
model mismatches reframed.

**Header** — real logo (`logo-crest.png`, not Stitch's placeholder emblem
image), real wordmark + tagline, pill-style nav bar with an active-state
highlight (structurally similar to §12's Header but visually restyled:
rounded pill nav container, not an underline-on-hover link row), real nav
items (Home/About/Services/Gallery/Journal/Contact — **not** Stitch's
fictional "Productions & Acts / Weddings & Celebrations / Corporate Events
/ Academy & Workshops" labels, same reasoning as §12), real "Booking
2025–26 Season" pill (evergreen, not a specific unconfirmed claim), "Book
for Events" CTA → `/contact`. No mobile nav exists in the source (desktop-
only export, same gap noted in §12) — reuse the existing `menu`/`close`
icon-toggle pattern already built for the current Header, not a Stitch
icon substitution.

**Footer** — real logo/name/description; trust badges: "IGT Season 1
Champions" is real (kept), "40+ Global Tours" is unconfirmed → replaced
with a real stat from `heroStats` instead of dropped outright, since a
second real badge reads better than an empty slot. Signature Repertoire
list: Dashavatar, Krishna Leela, Vande Mataram are real (§8); "Bhakti &
Shiva Tandava Stotram" and "Bespoke Royal Sangeet Acts" are kept as
thematic descriptors, not asserted as confirmed named productions.
Navigation column: real site nav, not the screen's fictional "Productions
& Acts / Corporate Galas / Dance Academy / Press & Accolades". Newsletter:
drop the "Patron Ledger" / "VIP ticketing windows" / "audition notices"
concierge-club framing (unconfirmed loyalty program) — keep a plain,
honest newsletter signup (disabled/"coming soon", same pattern as the
current Footer's newsletter block) with the real enquiry email. Bottom
credits: real copyright (drop "& Academy" from the business name); Privacy
Policy/Terms/Rider-Requirements links point nowhere real yet — kept as
plain non-interactive text, not dead links, same precedent as the current
Footer.

Scope: since Header/Footer are shared across every route, this reskins them
site-wide immediately — meaning `/about`, `/services`, `/gallery`,
`/journal`, `/contact` (still on the §9 Material 3 system) now sit under a
dark Danza header/footer while their own body content stays light-themed.
This is the same kind of intentional, temporary mid-migration seam §9
introduced originally — not a bug, tracked in `PROGRESS.md` Phase 7.

---

## 14. Nocturne Stage — About Page Redesign (client-confirmed, supersedes §9's About)

**Source:** "About Us & Heritage - Prince Dance Group" screen
(`afa18d5ecac3418fb7266442c3f6a3c2`), one of the 4 screens confirmed built
against the actual "Nocturne Stage" design-system asset
(`assets/335c69e0b15d4a6697bb2ef4b347b405`) — verified by cross-checking
this screen's own embedded `tailwind.config` against that asset's saved
`theme` JSON (both share `secondary: #e9c349`, `surface: #121317`, the full
M3 palette, and the same type scale). Unlike Home (§13, which used a
different, unconfirmed draft system), this is the *real* target system for
the rest of the site. **Scope: About (`/about`) body content only** —
Header/Footer are already on Danza Theatrical (§13.6) and unchanged here.

### 14.1 Tokens (verbatim from this screen's own config, distinct from §13's bespoke Danza names)

```
Color (M3 dark palette): primary #ffb2be, secondary #e9c349 (gold), tertiary #d2bcff,
  surface #121317, surface-elevated #1A1E26, surface-stage #13161C,
  on-surface #e3e2e8, text-primary #FFFFFF, text-muted #9E9EA7,
  gold-light #F3E5AB, gold-dim #8A7322, outline #ab888c,
  stage-border rgba(255,255,255,0.08), crimson-glow rgba(233,30,99,0.25),
  error #ffb4ab, surface-container/-low/-high/-highest, on-primary #660025, etc.
  (full palette identical to Nocturne Stage's saved theme.namedColors)

Radius: DEFAULT 0.125rem, lg 0.25rem, xl 0.5rem, full 0.75rem
  (note: "full" here is a soft 0.75rem, NOT a 9999px pill — a visibly
  softer shape language than Danza's §13, confirm against screenshots
  before assuming pill shapes)

Spacing: margin 2rem, gutter 1.5rem, space-xs .25rem, space-sm .5rem,
  space-md 1rem, space-lg 1.5rem, space-xl 2.5rem

Typography (Playfair Display headlines / Hanken Grotesk body — both
already loaded site-wide, no new font load needed):
  display-lg 56/64/-0.02em/700, display-lg-mobile 38/46/-0.01em/700,
  headline-lg 40/48/-0.01em/600, headline-lg-mobile 28/36/0em/600,
  headline-md 28/36/0em/600, headline-sm 22/30/0em/500,
  title-md 18/26/0.01em/600, body-lg 16/26/0.01em/400,
  body-md 14/22/0.01em/400, label-lg 14/20/0.08em/600,
  label-md 12/16/0.1em/600, label-sm 11/14/0.12em/500
```

Implementation: since this is a *second* M3-style system distinct from
both §9 (the old Phase 6 system, light) and §13 (Danza's bespoke names),
new tokens are added with a `nocturne-` prefix on anything that would
otherwise collide by name-but-not-value with §9's M3 tokens (e.g. §9 already
has `--color-primary: #000000`; Nocturne's `primary` is `#ffb2be` — a real
collision, must be prefixed). Colors unique to Nocturne (e.g.
`surface-stage`, `gold-light`) can stay unprefixed. See `globals.css` for
the exact prefixed set as implemented.

### 14.2 Icons (exact, no substitutions)

`arrow_forward`, `calendar_today`, `celebration`, `fitness_center`,
`flight_takeoff`, `handshake`, `military_tech`, `music_note`, `palette`,
`person`, `psychology_alt`, `public`, `security`, `stars`, `temple_hindu`,
`theater_comedy`, `verified`, `workspace_premium`.

### 14.3 Element-by-element content plan

Same method as §10/§13.5. This screen is unusually rich in *real* cultural
content (the four pillars are elaborated in far more depth than DESIGN.md
§8's summary) but also repeats two issues already seen on Home: a
**fabricated quote attributed to the real founder**, and **unconfirmed
prestige claims** (Commonwealth Games among them, again).

| # | Section | Decision | Detail |
|---|---|---|---|
| 1 | Eyebrow "Heritage & Genesis • Est. 2008", H1 "From Rural Daily-Wage Laborers to Global Performing Virtuosos", paragraph | Reframed | Founder, origin (Berhampur, Ganjam, Odisha), "26 young men... construction workers", IGT Season 1 are all real. "Est. 2008" is an unconfirmed founding year — dropped from the eyebrow, kept only where it doesn't assert a specific unconfirmed date. |
| 2 | Stats: 26 Founding Dancers / 100M+ Global Viewers / 45+ Nations Toured / 17 Years of Sadhana | Mixed | "26" is real (matches confirmed troupe size). The other three are unconfirmed — reuse real `heroStats` entries (9 Signature Services, IGT Champions, 6 Media Milestones) for the remaining three tiles, same approach as §13.5 row 8. |
| 3 | Founder card (Krishna Mohan Reddy, role) | Real | Photo, name, role real (reuse `teamMembers[0]` from `content/home.ts`) |
| 4 | Founder pull-quote ("We possessed neither polished studios...") | **Dropped, not placeholder** | Same issue as §13.5 row 13 — fabricated dialogue attributed to a real named person. Never shipped, real or placeholder-labeled. |
| 5 | Founder bio paragraph (2008 origin narrative) | Reframed | Real narrative beats (Berhampur, discipline, ancient texts, Dashavatar) kept; specific unconfirmed details (exact year, "judges and royal dignitaries weeping") trimmed to what's actually confirmed. |
| 6 | "State & National Laurels — Felicitation by Hon'ble Chief Minister" card | Placeholder | Not an independently confirmed event/honor in `PROGRESS.md`. (Real, separate fact: Naveen Patnaik, then–Chief Minister of Odisha, is a real confirmed testimonial source — §8/testimonials.ts — but that is not the same claim as a specific felicitation ceremony; don't conflate them.) |
| 7 | Four Pillars (Guru-Shishya Parampara, Natya Shastra & Navarasas, Seva & Samaveshi, Vasudhaiva Kutumbakam) | Real, trimmed | All four are the real documented pillars (§8) — reuse `philosophyPillars` from `content/home.ts` directly. This screen's elaborated copy for each is kept where it restates the real theme (gurukul-style communal training, the Navarasas, inclusion of underprivileged youth, blending Odissi/Chhau with global forms) but specific unconfirmed operational claims (a named daily 5 AM schedule, "100% Free Conservatory Housing," an "Artisan Pension Fund," "performed across 45+ nations") are dropped rather than asserted as fact. |
| 8 | "Historic Milestones" timeline (2008 Genesis → State Youth Festival Gold → IGT Season 1 Champions → 2009 26-Man Dashavatar broadcast → 2010 Commonwealth Games Opening/Jawaharlal Nehru Stadium/60,000 spectators/1 billion telecast → international stages incl. Lincoln Center/Dubai Opera → 2018 world tours → 2024–25 "Shiva Tandava" premiere + "Prince Performing Arts Gurukul" residential academy) | Mixed, heavily trimmed | IGT Season 1 Champions is real — kept as the anchor milestone. Everything else in this timeline is either unconfirmed (exact years, Commonwealth Games Opening — same unconfirmed-prestige issue as §13.5 row 7 — Lincoln Center/Dubai Opera, spectator/viewer counts) or reintroduces the residential-academy business-model mismatch (§0) — trimmed to a short, honest timeline of what's actually confirmed: Berhampur origin → IGT Season 1 win → the real notable-appearances list already in `PROGRESS.md` (IPL Chennai, KBC, IGT4, History Channel, NDTV Greenathon), each dated only where a date is actually confirmed (none currently are, so shown without invented years). |
| 9 | "Key Masters & Core Troupe Acharyas" — 4 fictional team members (Dhaneswar Dalei, Sunil Kumar, Padmanav Sahu, Rajesh Mohapatra) | Placeholder | Entirely fictional people — same treatment as §13.5 row 14, generic placeholder cards, not renamed real people. |
| 10 | "The Living Archive" mini-gallery (Dashavatar Tableaux, Shiva Tandava Stotram, Krishna Ras Leela) | Real, real images | All three are real/thematically-grounded repertoire names (§8, and Shiva Tandava already used consistently on Home) — use real performance photos already in `public/images/gallery/`, not placeholders. |
| 11 | Closing CTA ("Experience Our Sacred Grandeur Live") | Real | Real copy, real links: "Inquire for Booking" → `/contact`, "Explore Full Repertoire" → `/gallery`. Trust badges (verified/flight_takeoff/security icons: "Official Technical Rider Provided," "Worldwide Touring Ensembles," "Customized Staging Protocols") are generic capability statements, not specific unconfirmed claims — kept. |
| 12 | Header/Footer nav labels, contact info, "Newsletter & Audition Notices" | N/A — not rebuilt here | Header/Footer are already real (§13.6) and unchanged by this page. Any contact info shown *within* the About page body must match `PROGRESS.md`'s confirmed phone/email, not this screen's fabricated ones, same rule as §13.5 row 16. |

---

## 15. Nocturne Stage — Contact Page Redesign (client-confirmed, supersedes §9's Contact)

**Source:** "Contact & Event Bookings - Prince Dance Group"
(`67222ee050a54d2a977078ce5dc27525`) — a regenerated version of a screen
with the same title (an earlier version, `9f9637c8aaa54d39b79cfe9c0fc027e5`,
was downloaded during the Phase 7 investigation but superseded by this one;
use this ID going forward). Confirmed Nocturne Stage tokens/fonts (same
`secondary: #e9c349`, Hanken Grotesk + Playfair Display) — same system as
§14. **Scope: Contact (`/contact`) body content only** — Header/Footer
unchanged (§13.6).

Tokens, radius, spacing, fonts: identical to §14.1 (`nocturne-*` prefixed
tokens already in `globals.css`, no new tokens needed).

### 15.1 Icons (exact, no substitutions)

`arrow_forward`, `aspect_ratio`, `auto_stories`, `call`, `check_circle`,
`drafts`, `expand_more`, `file_download`, `handshake`, `light`,
`location_on`, `lock`, `mail`, `phone_in_talk`, `verified`,
`verified_user`, `vertical_align_top`.

### 15.2 Element-by-element content plan

This screen is the most heavily fabricated of the three redesigned so far
— beyond the usual invented stats, it includes **wrong contact
details/address**, an **entirely fictional international-office network**,
and **internally-inconsistent fabricated stage-engineering specs** (two
different sections give two different minimum stage dimensions for the
same claim — 36ft×28ft vs. 32ft×24ft — confirming neither is real). Given
`ARCHITECTURE.md` §1's "never invent a business fact" rule and that
publishing false technical/logistical specs isn't just a style problem but
could actively mislead a real event planner, this pass is more aggressive
about dropping specifics than §13/§14 were, rather than trying to preserve
the shape of every section with placeholders.

| # | Section | Decision | Detail |
|---|---|---|---|
| 1 | Eyebrow "Official Direct Artist Concierge & Master Date-Hold Desk", H1 "Reserve India's Most Celebrated Mythological Spectacle For Your Stage", paragraph | Reframed | Real brand voice kept; "Master Date-Hold Desk" and the paragraph's "worldwide arena tours" overstate what's confirmed — softened to a plain "get in touch to book" framing. |
| 2 | Stats: 45+ Countries Toured / 100% Live Human Tableaux / 24 Hrs Desk Response Window / Global ATA Carnet Cleared | Replaced with real stats | All four unconfirmed → reuse real `heroStats` (26 founding members, 9 services, IGT champions, 6 media milestones), same approach as §13.5 row 8 / §14.3 row 2. |
| 3 | Featured act card "Krishna Leela & Peacock Tableaux — 26-artist..." | Real, trimmed | Krishna Leela is real repertoire (§8); "26" echoes the real troupe size. "Peacock" ornamentation detail and any duration not carried over as asserted fact. |
| 4 | **Contact block: phone `+91 94370 52888 / +91 98612 04555`, email `bookings@princedancegroup.in`, address "Prince Dance Academy & Repertory, Industrial Estate Road, Berhampur, Ganjam, Odisha 760002"** | **Replaced with real facts — critical fix** | None of this matches `PROGRESS.md`'s confirmed facts: real phones `+91 98611 80053` / `+91 82709 23491`, real email `princedancegroup09@gmail.com`, real address "Art Performing Building, In front of Pantho Niwas, Gopalpur, Pin – 761002" (note: even the pincode is wrong in the source — 760002 vs. the real 761002). Same rule as §13.5 row 16 / §14 CLAUDE.md note — always cross-check a new screen's contact info against `PROGRESS.md`, never trust it by default. |
| 5 | "International Liaison Desks" — Mumbai/New Delhi/Dubai/London offices with specific phone numbers | **Dropped entirely** | Wholly fabricated — no confirmed international office network exists. Not placeholder-able (there's no real "slot" this represents); the whole section is omitted. |
| 6 | "Curator & Production Assurances" — ATA Carnet, LED/orchestral stems, pyrotechnic certs, "lead choreographer accompanies all major galas" | Trimmed to generic capability statements | Specific certification/equipment claims dropped (unconfirmed); "Krishna Mohan Reddy" real involvement is plausible as founder/choreographer but not asserted as a blanket guarantee for every booking. |
| 7 | "Staging Rider (PDF)" / "2025 Repertoire Deck" download buttons | Placeholder | No real downloadable assets exist — rendered visibly disabled ("Coming soon"), not linked to a fake file. |
| 8 | Enquiry form (name/role/email/mobile/event type/troupe size/date/city/repertoire checkboxes/notes) | Real, adapted | Same real-field pattern as Home's `EventEnquiry.tsx` — reuse that real submission logic (fetch to `/api/contact`, honest not-connected handling). The "non-binding 48-hour tentative date freeze on the official master calendar" claim is a fabricated operational process → dropped, not asserted. |
| 9 | "Technical Blueprint — Stage & Rigging Standards" (specific ft/DMX/lighting specs) | **Dropped entirely** | Internally inconsistent fabricated specs (see this section's intro) — republishing either number as fact risks misleading a real venue. Replaced with a single honest line: technical requirements are shared once a booking is discussed, not asserted in advance as fixed numbers. |
| 10 | FAQ (4 Q&As: stage dimensions again, booking lead time, AV/LED specifics, travel/hospitality specs) | Kept as a pattern, answers genericized | The FAQ *format* is useful, real content for a booking business — kept — but every fabricated specific (exact footage, "6 to 10 months," "4-star or 5-star," exact AV deliverables) is rewritten to an honest answer that doesn't assert an unconfirmed number, e.g. "varies by production — confirmed once you share your event details" rather than a specific figure. |
| 11 | "Direct Troupe Management Guaranteed — Zero intermediary agency markups" | Dropped | Specific unconfirmed business-practice claim (no agency fee structure is documented) — not carried over. |
| 12 | Footer | N/A — not rebuilt here | Already real (§13.6) and unchanged. |

## 16. Nocturne Stage — Gallery Page Redesign (client-confirmed, supersedes §9's Gallery and §12's `/gallery` row)

**Source:** "Productions & Repertoire - Prince Dance Group"
(`dabaf3f8e1484d90ae82fa35ec7df8d5`, project `14513562789089232297`).
Verified current via a fresh `list_screens` call (no duplicate/regenerated
ID found, unlike the Contact screen). Confirmed Nocturne Stage tokens/fonts
(same `secondary: #e9c349`, Hanken Grotesk + Playfair Display, identical
`background`/`surface`/`primary` values) — same system as §14/§15, the 4th
confirmed screen on it. **This screen fills the gap §12 flagged** ("no
dedicated Stitch screen exists for `/gallery`") — Gallery now has one, and
migrates off the Home-`RepertoireGrid`-reuse pattern onto its own Nocturne
Stage build. **Scope: Gallery (`/gallery`) body content only** —
Header/Footer unchanged (§13.6).

Tokens, radius, spacing, fonts: identical to §14.1/§15 (`nocturne-*`
prefixed tokens already in `globals.css`, no new tokens needed).

### 16.1 Icons (exact, no substitutions)

`arrow_forward`, `close`, `description`, `hourglass_top`, `lightbulb`,
`person`, `straighten`, `volume_up`, `wash`.

### 16.2 Element-by-element content plan

Repertoire-act *names* and their core mythological descriptions are mostly
real/thematically grounded (§8, and this is the same territory §13.5 row 10
and §14 row 10 already covered for Shiva Tandava specifically). What's
fabricated here is almost entirely in the *production-spec numbers* layered
on top — exact cast counts, proscenium footage, decibel levels, moving-head
counts, litres of water — plus a full fake "Master Technical Document"
modal. Same standard as §15 rows 5/9: numbers precise enough to look like
real venue requirements get dropped rather than placeholder-shown, because
publishing an invented spec as if real could mislead an actual venue.

| # | Section | Decision | Detail |
|---|---|---|---|
| 1 | Nav pills "Productions & Repertoire / Weddings & Celebrations / Corporate & Galas / **Academy & Workshops** / About Us & Heritage / Contact & Bookings", "Booking 2025–26 Season" badge | N/A — not rebuilt | Header is already Danza Theatrical (§13.6) and out of scope. "Academy & Workshops" is *not* adopted, same recurring rule as §12 row 11/§14 — no confirmed teaching program exists (`ARCHITECTURE.md` §0). |
| 2 | Eyebrow "Proscenium Masterworks • 2025–2026 World Tour", H1 "The Repertoire of Sacred Geometry & Epic Spectacles", paragraph "Fourteen worldwide-celebrated choreography masterworks synthesizing Mayurbhanj Chhau…" | Reframed | "2025–2026 World Tour" and "Fourteen worldwide-celebrated" are unconfirmed prestige/count claims → dropped. The underlying description — Chhau martial acrobatics + Odissi temple kinetics + human sculpture, by Krishna Mohan Reddy and the ensemble — matches real brand voice already used on Home/About (§8, §13, §14) and is kept, just without the invented number. |
| 3 | Stat pills "Ensemble Cast 26–38 Artists" / "Synchronized Formations 1/1000s Precision" | Replaced with real stats | Both are Stitch-invented (the second is not even a coherent metric). Reuse real `heroStats` from `content/home.ts`, same approach as §13.5 row 8 / §14.3 row 2 / §15 row 2. |
| 4 | Category filter pills "All Masterworks (5)" / "Mythological Epics" / "Martial & Power Formations" / "Patriotic Anthems" / "Ethereal Devotion" | Dropped | Invented taxonomy and count over only 4 real acts — a filter UI isn't warranted at this scale, and the categories/count aren't sourced. Acts are shown as a simple stacked list instead. |
| 5 | Act I "Dashavatar: The Ten Cosmic Incarnations" — mythological description (Matsya→Kalki avatar sequence), "Opus No. 01", `hourglass_top` "18–24 Mins Full Suite", Cast/Proscenium/Score/FX stat grid, "Book Dashavatar Act" / `description` "View Tech Rider" | Real name, reframed | Dashavatar is real repertoire (§8, `content/home.ts`). The ten-avatars mythological description is legitimate Vishnu mythology, not a fabricated business fact — kept as descriptive color, same treatment as Shiva Tandava's name/theme in §13/§14. All numeric production specs (exact cast count, "40ft×30ft" proscenium, FX description, duration) are invented → replaced with a single `PlaceholderNote` ("Cast size, staging & tech specs shared directly when you enquire"). "View Tech Rider" PDF link dropped (no such document exists — see row 9). CTA becomes a real "Enquire About This Act" link to `/contact`. |
| 6 | Act II "Krishna Leela & Divine Ras" — devotional description, Cast/Duration/Costume/Lighting stat grid, "Book Krishna Leela" | Real name, reframed | Same treatment as row 5: real act (§8), devotional description kept as color, numeric/costume/lighting specifics dropped in favor of the same enquire-for-specs `PlaceholderNote`, CTA → real `/contact` link. |
| 7 | Act III "Shiva Tandava: Creation & Ruin" — Nataraja/Ganesha imagery, Cast/Duration/Stage-Floor/Audio stat grid, "Book Shiva Tandava" | Kept name + theme, specifics placeholder | Same precedent as §13.5 row 10 / §14 row 10: "Shiva Tandava" is a real, thematically-consistent mythological subject already used consistently elsewhere on the site, but not independently confirmed as a named production — keep the name and mythological description, placeholder the specifics exactly like rows 5–6. |
| 8 | Act IV "Vande Mataram Patriot Symphony" (32 dancers, flag human pyramid, "Gala Inquiry →") and Act V "Surya Namaskar: The 12 Solar Salutations" (Konark Sun Temple imagery, "Reserve Act →") shown as two separate cards | Merged into one real card | `content/home.ts` already documents these as a single combined repertoire piece, "Vande Mataram & Surya Namaskar" — splitting them into two cards with invented separate performer-count ranges would contradict the site's own existing real content. Shown as one card using the real existing description; CTA → real `/contact` link. |
| 9 | "Stage Architecture & Hospitality Rider" — `straighten` Stage Demarcation (40ft×30ft, 20ft clearance), `lightbulb` Lighting Plot (40 moving heads, 2 follow spots), `volume_up` Audio Engineering (105 dB, 18"/21" subs), `wash` Backstage & Body Paint (2 green rooms, 30 cast, hot water) — plus a "Master Technical Document" modal with 5 numbered fabricated clauses (stage ft/m, floor spec, truss height, console spec, hospitality litres) | Numbers dropped, modal dropped entirely | Same rule as §15 row 9: none of this is sourced, and republishing specific ft/dB/litre figures as if they're real venue requirements risks misleading an actual venue. The four category headers (Stage/Lighting/Audio/Backstage) and their icons are kept as visual structure — genuinely useful for a booking business to signal it *has* technical requirements — but each now carries one honest generic line ("Confirmed once your venue and date are discussed") instead of an invented number. The modal and its "Corporate Deck PDF" / fake clause list are not built. |
| 10 | "Season 2025–2026 Reservations" CTA — "Request Date Availability", "Corporate Deck PDF" | Real CTA, one placeholder | "Request Date Availability" is a real, honest booking CTA → links to `/contact`, same pattern as `GalleryCTA`'s existing enquiry CTA. "Corporate Deck PDF" has no real asset → `PlaceholderNote` ("Coming soon"), same pattern as §15 row 7. |
| 11 | Footer stats "45+ Global Tours", phone `+91 94370 52888 / +91 98612 04555`, email `bookings@princedancegroup.in` | N/A — not rebuilt | Footer is already real (§13.6) and out of scope here — flagging only that this screen's footer repeats the now-familiar pattern of wrong contact details (real: `+91 98611 80053` / `+91 82709 23491`, `princedancegroup09@gmail.com`, per `PROGRESS.md`) and an unconfirmed stat, so no future session mistakes this screen's footer for a source of real numbers either. |

## 17. Nocturne Stage — Services & Wedding Events Redesign (client-confirmed, supersedes §9's Services)

**Source:** "Weddings & Celebrations - Prince Dance Group"
(`087af2350a10422481feed3c00a00596`). Verified current via the same fresh
`list_screens` call that located §18's Journal screen. Confirmed Nocturne
Stage tokens/fonts (same `secondary: #e9c349`, Hanken Grotesk + Playfair
Display) — the 5th confirmed screen on this system.

**Scope note — this screen is single-service, the real site is nine.**
Unlike About/Contact/Gallery (each a 1:1 page match), this screen is a full
dedicated landing page for exactly one of the 9 real services (Wedding
Events). Two things happen here, not one:
1. The generic `/services` list page and the shared `/services/[slug]`
   detail template (used by all 9 services) migrate to Nocturne Stage
   *tokens only* — real content unchanged, same as how §16 reskinned
   Gallery's shell.
2. The `wedding-events` slug specifically gets extra Nocturne sections
   built from this screen's real/de-fabricated content, rendered only on
   that one route — the other 8 services keep the shared generic template
   as-is (no source screen exists for them, same "stays a TODO" rule as
   `content/services.ts` already documents).

Header/Footer unchanged (§13.6).

### 17.1 Icons (exact, no substitutions)

`check_circle`, `flight_takeoff`, `graphic_eq`, `group_work`, `person`,
`star`, `verified`. (`star` — the testimonial star-rating icon — ends up
unused once row 7 below is dropped; per §15/§16 precedent this list
documents the source screen's own icons, not a mandatory-use-all list.)

### 17.2 Element-by-element content plan

This is the most heavily fabricated screen redesigned in this migration so
far — more severe than Contact's fictional international-office network,
because two of its fabrications name **real, identifiable third parties**
(a real luxury wedding planner and a real event-management company) rather
than inventing generic-sounding fictional ones.

| # | Section | Decision | Detail |
|---|---|---|---|
| 1 | Nav pills incl. **Academy & Workshops**, "EST. 2008", "Booking 2025–26 Season" badge | N/A — not rebuilt | Header is already Danza Theatrical (§13.6) and out of scope. Academy & Workshops not adopted, same recurring rule (`ARCHITECTURE.md` §0). |
| 2 | Eyebrow "Royal Nuptials & Destination Galas — Worldwide Bookings 2025–26", H1 "Bespoke Choreographic Grandeur for Unforgettable Weddings", paragraph, stats "350+ Palace Weddings Staged / 100% Live Human Tableaux / 18+ Global Destinations / 8–32 Troupe Configurations" | Reframed | The headline/paragraph describe a real service (Wedding Events, `content/services.ts`) in real brand voice — kept, minus "Worldwide Bookings 2025–26" (unconfirmed touring claim). All 4 stat pills are invented → replaced with real `heroStats`, same pattern as §13.5 row 8 / §14–16. |
| 3 | Three "Theatrical Wedding Formats" act cards: "The Royal Krishna-Radha Ras Leela Entry", "The Sacred Dashavatar Blessing Opener", "Kinetic Sangeet Climax & Flashmob Finale" — each with cast/duration/prop stat grids | Real names kept, specifics dropped | The first two are real repertoire (Krishna Leela, Dashavatar — `DESIGN.md` §8) reframed as wedding-entry choreography, which is a legitimate real-business reframing, not a new fact. The third is a generic sangeet-choreography concept, not tied to a specific named repertoire piece — kept as a generic offering. All numeric specifics (exact cast counts, minute ranges, prop names like "24k Human Geometry") are invented → one `PlaceholderNote` per card ("Format & cast size confirmed with your planner"), same pattern as §16.2 row 5. |
| 4 | "Technical Blueprint & Coordination" — `group_work` "Scalable Troupe Size (8 to 32 Artists)", `graphic_eq` "Custom Scores... 5.1 spatial sound", `flight_takeoff` "Global Destination Readiness... expedited visas, non-staining metallic paints" | Numbers/claims dropped, structure kept | Same reasoning as §16.2 row 9: specific capability claims (exact troupe range, "5.1 spatial," visa/logistics promises) aren't sourced. The three icon-headed categories are kept as visual structure with one honest generic line each. |
| 5 | "Global Destination Portfolio" — 6 named luxury venues: Udaipur City Palace & Jagmandir, Jaipur Rambagh & Fairmont, Dubai/Abu Dhabi Emirates Palace & Atlantis, Lake Como Villa d'Este & Balbiano, Goa W & St. Regis, Istanbul/Antalya Çırağan Palace Kempinski | **Dropped entirely** | Wholly fabricated — no confirmed performance history at any of these real, checkable venues exists. This is the single riskiest fabrication in the migration so far: unlike a generic invented stat, this implies a specific false engagement history at real, named venues a reader could actually contact to verify. Not placeholder-able; the section is omitted. |
| 6 | Checklist: "Stage Floor Specification: Non-slip Harlequin...", "Greenroom Turnaround: 45-minute body-paint changeover", "Timecode DMX & GrandMA3 Showfile synchronization" | **Dropped entirely** | Same reasoning as row 4/§15 row 9 — specific fabricated technical/operational claims, not folded into a placeholder shape. |
| 7 | "Acclaimed By Visionary Planners" — 3 five-star testimonials from **"Devika Narain, Luxury Wedding Architect"** (a real, identifiable Indian luxury wedding planner), "Rohan & Ananya Singhania" (a fictional couple presented as real clients), and **"Karan Wadhavan, Director of Entertainment, Cineyug Celebrations"** (Cineyug is a real event-management company) | **Dropped entirely — most severe fabrication found in this migration** | This goes beyond an ordinary invented stat or even Home's fabricated-founder-quote issue: it fabricates third-party professional endorsements and attributes them to a real, identifiable wedding planner and a real company by name. Publishing this would risk misrepresenting real people/businesses as having endorsed Prince Dance Group, which they have not. Not reworked into a safer version — the whole section is omitted. The site's real confirmed testimonials (`content/testimonials.ts`) are not substituted in here either: all 7 are about the IGT/TV performance, none are wedding-specific, and using them under a "wedding testimonials" heading would misleadingly imply real wedding-client endorsement that doesn't exist. |
| 8 | Enquiry form (couple/planner name, email, wedding date, destination city & venue, format selection, troupe size, guest count, notes), "Strict Non-Disclosure Agreement (NDA) respected...", "contact within 4 hours" | Real form kept, claims dropped | Same real-field, real-submission-logic pattern as Contact's `EnquiryForm` (fetch to `/api/contact`, honest not-connected handling, no fake success). The NDA promise and 4-hour response SLA are unconfirmed operational commitments → dropped, not asserted. The "Direct Coordinator" phone card uses `PROGRESS.md`'s real confirmed number, not the screen's wrong one (see row 9). |
| 9 | Footer stats ("45+ Global Tours"), phone `+91 94370 52888`, email `bookings@princedancegroup.in` | N/A — not rebuilt | Footer is already real (§13.6). Flagging only that this screen repeats the same wrong-contact-info pattern already seen on Contact/Gallery's source screens (real: `+91 98611 80053` / `+91 82709 23491`, `princedancegroup09@gmail.com`). |
| 10 | The other 8 services (Corporate, TV Award Show, Musical Acts, Religious, School/College, Mahotsavs, Music Video/Movies, Promotion Shoots) | N/A — no source screen | This Stitch screen only covers Wedding Events. The other 8 keep the shared generic `/services/[slug]` template (now on Nocturne tokens) with their existing real summaries and `TODO(content)` detail placeholders, unchanged — no fabricated wedding-specific richness is extended to services this screen doesn't cover. |

## 18. Nocturne Stage — Journal Reskin (token migration only, no dedicated screen)

Unlike §13–17, there is no new client-confirmed Stitch screen for Journal.
The project's only screen titled "Journal & Editorial - Prince Dance Group"
(`2c3f6cc84bcb494899848875f9ea8d1e`) was re-downloaded and checked this
session — its tokens are `secondary: #0051d5`, `background: #faf9fd`, Plus
Jakarta Sans: the **original Phase 6 Material 3/Jakarta system**, i.e. the
same screen `/journal` was already built against, not a new Nocturne
design. So "the other page, based on the new design" means: reskin
`/journal` and `/journal/[slug]` onto the existing `nocturne-*` tokens
already defined in `globals.css` (same treatment §16 gave Gallery before a
dedicated screen existed for it) — a pure token migration, not a new
content pass.

Every real/dropped content decision already made for Journal in Phase 6
(documented directly in `JournalHeader.tsx`, `JournalGrid.tsx`,
`JournalArticleHeader.tsx`, `JournalArticleBody.tsx`'s own comments —
Stitch's fictional volume numbering, NY archive location, bi-weekly
cadence, and "Resident Scholars" stat all already dropped; real entry count
and real titles/teasers/images kept; missing article bodies shown as an
honest placeholder) carries over unchanged — nothing new to re-litigate.

**Icons:** unchanged from the existing build — `auto_stories`, `menu_book`,
`arrow_forward`. No new source screen to audit against, so no new icons are
introduced.

Scope: `/journal` and `/journal/[slug]` body content only — Header/Footer
unchanged (§13.6).

## 19. Site-Wide Fidelity Audit (2026-09-20, post-Phase-7)

After every page was migrated (§13–18), a dedicated element-by-element
audit ran against each page's raw Stitch source export (not just the
DESIGN.md tables) to catch drift the build-time process missed. Five
pages were checked (Home+Header/Footer, About, Contact, Gallery,
Services/Wedding); Journal and the generic `/services` template were
excluded since neither has a dedicated source screen to diff against
(§18's whole premise).

**Real bugs found and fixed:**

- **Home (`Hero.tsx`): two icons were swapped.** The "India's Got Talent
  Champions" eyebrow badge shipped with `military_tech`; the source uses
  `stars` there. The "First Troupe from Odisha / Historical Benchmark"
  badge shipped with `stars`; the source uses `trophy` there. Both are in
  §13.4's confirmed icon list, so this wasn't a substitution outside the
  allowed set — just a mislabeling during the original build. Fixed:
  swapped to match the source exactly.
- **Footer (`Footer.tsx`): missing the third of three documented text
  links.** §13.6 says all three of Privacy Policy / Performance Terms /
  Rider Requirements are kept as plain non-interactive text; only the
  first two were actually rendered. Fixed: added "Rider Requirements".
- **Services (`wedding-events`): the bespoke hero documented in §17.2 row
  2 was never built.** The page was shipping the fully generic
  `ServiceDetailHero` (same as all 8 other services) with no eyebrow, no
  reframed H1, and no real stat pills — despite §17.2 row 2 explicitly
  planning all three. Fixed: added `WeddingHero.tsx`, rendered directly
  below the shared breadcrumb/photo header, carrying the real reframed
  copy and `heroStats` the plan called for.

**Documentation-only gaps found (content itself is fine, docs didn't
record the decision) — noted here rather than re-litigated:**

- About (`Founder.tsx`): §14.3 row 6 planned a `Placeholder` for the
  unconfirmed "State & National Laurels" felicitation claim; the shipped
  page instead fills that slot with a real Naveen Patnaik
  recognition card (real photo, real testimonial-sourced context) — a
  reasonable real-over-placeholder substitution, just never written back
  into §14.3.
- About (`Testimonials.tsx`): a full real-testimonial section (SRK,
  Kirron Kher, Shekhar Kapur, Dharmendra — text-only, per the testimonial-
  photo caveat) exists on the live page with no corresponding §14.3 row.
- Contact (`ContactSidebar.tsx`): the source screen's left column has a
  second "Signature Act: Dashavatar / Vishwaroopam Multi-Arm Synchrony"
  image card after the assurances card, dropped without its own §15.2 row
  (the "Championship Cast" subtitle is unconfirmed flavor invention, same
  category as other trimmed ornamentation — a defensible drop, just
  undocumented).
- Contact: the source's "Closing Invitation Strip" (a `handshake` line +
  `phone_in_talk`/`drafts` call/email buttons, using the screen's wrong
  contact info) was dropped as a whole row-of-buttons; §15.2 row 11 only
  documents dropping its accompanying "zero intermediary markups" claim,
  not the buttons themselves. `FAQ.tsx` keeps a paraphrased text line only.

Gallery and the Services/Wedding content sections (acts, coordination,
enquiry form) had zero undocumented deviations — full audit reports are
summarized in this entry's originating session, not reproduced here.

## 20. Home Page UI/UX Redesign (2026-09-20)

Client feedback on the live Home page: not enough content relevant to the
real business; no testimonials or gallery section despite real content
existing for both; "Available for Your Event" rendering 9 identical
"Enquire to Book" buttons (one per service row) read as visually
distracting; no clear hierarchy; the "Event Concierge Desk" enquiry form
asked for too much before submit. Two independent research passes were
run against the live page and full codebase — a UI expert (visual
hierarchy/pacing/typography) and a UX specialist (flow/conversion/forms)
— before any code changed; the full synthesis plan (including the two
audits' one real disagreement, over where to place a new Gallery section,
and how it was resolved) lives in the approved plan at
`~/.claude/plans/dazzling-imagining-crayon.md`. Summary of what shipped:

**Root cause confirmed by both audits:** 6 of the 8 sections used an
identical `eyebrow → h2 → card grid` skeleton in the same card shell on
the same background color with identical `py-16` rhythm regardless of
content weight — nothing signaled importance. Separately, the page asked
visitors to "enquire" from 6 different, visually-competing places before
ever reaching the actual form.

**New section order:** Hero → StatsRow (+ new "As Seen On" press strip) →
**Founder Spotlight** (replaces `MastersGrid.tsx`, simplified to founder-
only, moved up from position 6) → ServiceCategories → RepertoireGrid →
**Gallery** (new — full-bleed masonry breaker) → BookingAvailability
(redesigned) → **Testimonials** (new — last-mile trust, right before the
form) → EventEnquiry (redesigned). `MediaShowcase.tsx` (a permanently
inert "audio coming soon" placeholder) is deleted.

**BookingAvailability:** the 9 per-row buttons are gone. Rows are now
purely informational; one section-level "Enquire About Your Event" CTA
appears in the header and again after the last row, both scrolling to
`#event-enquiry`. Each row is still a lightly-styled link to
`/?interest=<slug>#event-enquiry` so `EventEnquiry` can pre-select that
service in its Event Nature dropdown.

**EventEnquiry:** cut from 7 always-visible fields to 4 (Name*, Phone*
[new — this business's primary real contact channel, previously absent
from this form entirely], Email [demoted to optional], Event Nature); the
rest (date, location, troupe size, notes) sit behind a single "Add a few
more details (optional)" disclosure toggle. Also fixed a real bug found
during the audit: native `<select>`s had no placeholder option, so
skipping one silently submitted its first option as if chosen (e.g. a
corporate enquiry could be mislabeled as a wedding) — both selects now
default to a disabled "Select…" option. `api/contact/route.ts`'s
server-side validation was loosened from requiring `email` to requiring
`email OR phone`, to match.

**New content used (all real, already typed, nothing invented —
`ARCHITECTURE.md` §1):** `content/testimonials.ts`'s 7 real quotes now
power the Testimonials carousel (text-only, per the testimonial-photo
caveat, `ARCHITECTURE.md` §6); `content/gallery.ts`'s 5 real photos now
also power the new Gallery section at larger scale (the UX audit flagged
that these same 5 photos are already reused as thumbnails elsewhere on
Home, so this section is honest about being thin until more photography
exists — flagged to the client as a future asset request, alongside a
real showreel video Hero's secondary CTA is still stubbed for);
`content/site.ts`'s `milestones` are now named individually in the new
press strip instead of only being an anonymous "6" stat.

**Bundled fixes found during the audits:**
- `Placeholder.tsx`: added a `tone="on-danza"` option — the previous
  default/`on-dark` tones use M3-system tokens that render as
  low-contrast dark-on-dark text on Danza's dark cards. Applied at both
  live call sites (`ServiceCategories.tsx`, `RepertoireGrid.tsx`).
- `Header.tsx`: mobile-nav breakpoint was `xl:` (1280px), hiding the full
  nav on real laptop widths (1024–1279px) that had visible room for it —
  changed to `lg:` (1024px). Site-wide fix, not Home-specific.
- Hero's disabled "Showreel coming soon" button (the first interactive
  element on the page) is now a real, working "View Gallery" link to the
  new `#gallery` section.
- `RepertoireGrid.tsx`'s 4 card CTAs used to navigate off-page to
  `/contact`; they now scroll to Home's own `#event-enquiry` form instead,
  since it's already on this same page.

Icon-fidelity note: this pass adds genuinely new content beyond what any
single Stitch screen depicted (Gallery, Testimonials, the press strip
didn't exist in the "Danza Theatrical Refined" source), so the strict
"exact icons from the source screen, zero substitutions" rule from §13.4
no longer fully applies to Home — new icons introduced here
(`photo_library`, `expand_more`/`expand_less`) are chosen for semantic fit
against the same Material Symbols Outlined set already loaded site-wide,
not pulled from a source screen.

## 21. Home Gallery + Testimonials — Real Functionality Pass (2026-09-20)

Follow-up to §20: the client called out Testimonials specifically as "a
prime highlight" and asked for its functionality — and Gallery's — to
match that, asked for Gallery to read as an actual grid (§20's version
used an asymmetric 1-large+4-small masonry layout), and asked for an
honest placeholder for a YouTube highlight-reel video on Home.

**Gallery (`Gallery.tsx`), rebuilt:**
- Layout is now a uniform grid (`grid-cols-2 sm:grid-cols-3`, all tiles
  `aspect-square`) instead of the asymmetric masonry — reads as a proper
  photo grid, not a hero-plus-thumbnails layout.
- Added a 6th tile: an honest, disabled "Highlight Reel — Coming Soon"
  video placeholder (dimmed real photo backdrop + a neutral-colored play
  icon — deliberately *not* YouTube red, to avoid trademark-adjacent
  iconography while still communicating "video goes here"). No real
  YouTube video exists yet, so nothing is embedded or faked
  (`ARCHITECTURE.md` §1) — same inert-control pattern the old (deleted)
  `MediaShowcase.tsx` used for audio.
- Real functionality added: clicking a photo tile opens a full-screen
  lightbox (click-outside-to-close, close button, prev/next arrows,
  arrow-key + Escape keyboard support, body-scroll lock while open,
  caption + position counter). The video tile is inert/disabled, not part
  of the lightbox cycle.

**Testimonials (`Testimonials.tsx`), extended:**
- Added real prev/next controls (desktop: side chevrons; mobile: a
  chevron pair with a "N / 7" counter below the quote) alongside the
  existing dot pagination — three ways to navigate now, not just
  auto-rotate.
- Pause-on-hover/focus: the auto-advance timer stops while the pointer is
  over the section or a control has focus, and restarts (from a fresh
  `AUTO_ADVANCE_MS` window) after any manual navigation, so a visitor who
  just picked a quote doesn't get yanked away from it.
- Added keyboard arrow-key navigation when the section has focus, and a
  `.animate-fade-in` transition (new keyframe in `globals.css`) on each
  quote change instead of an instant swap.

No new content — both sections still use only the real photos/quotes
already in `content/gallery.ts` / `content/testimonials.ts`.

## 22. Contact Page UI/UX Redesign (2026-09-20)

First of the "Home-style treatment" passes applied to the rest of the
site, per the client's explicit request to redesign every remaining page
the same way Home was (independent UI expert + UX specialist research,
before any code changed — same method as §20). Full audit reports are
summarized here, not reproduced verbatim.

**Both audits independently converged on:**
- The enquiry form (`EnquiryForm.tsx`) had **10 always-visible fields**
  (worse than Home's original 7) with only name/email actually required.
  Trimmed to 4 always-visible (Name*, Phone*, Email-optional, Event Type)
  + the other 6 (Role, Event Date, Event City, Troupe Size, Requested
  Acts, Notes) behind a single "Add a few more details (optional)"
  disclosure toggle — same pattern as Home's `EventEnquiry.tsx`.
- **The same select-default bug from Home existed here too, confirmed
  present**: `SelectField` had no placeholder option, so skipping "Event
  Type" or "Troupe Size" silently submitted the first array entry as if
  chosen (e.g. a corporate enquiry could be recorded as a luxury wedding).
  Fixed identically to Home's fix.
- **Phone made the required contact field, Email demoted to optional** —
  same reasoning as Home (phone/WhatsApp is this business's real primary
  channel, confirmed by the sidebar's own card ordering and its
  WhatsApp-chat link) — the UX audit gave this its own independent
  justification for Contact rather than just inheriting Home's answer.
- **"Requested Acts" checkbox group moved behind the disclosure** — both
  audits flagged asking a first-time enquirer to pick a specific
  repertoire act before a callback as a premature decision the sidebar's
  own copy says the team makes *with* the client, not before.
- **The enquiry form had no card shell** (a bare `<div>` on the section
  background) despite being the page's actual goal, while the sidebar's
  informational cards were all cleanly bordered — backwards framing.
  Fixed: the form now has the same `rounded-nocturne-lg` card shell as
  everything else on the page.
- **The two disabled "coming soon" pills** (staging rider / repertoire
  deck) read as dead-button affordances, styled identically to the real
  "Get Directions"/"Chat on WhatsApp" links above them but non-functional.
  Replaced with one honest plain-text line.
- Phone numbers in the sidebar were plain text, not tap-to-call — fixed
  with real `tel:` links (this business's primary channel had no
  mobile-friendly affordance).

**One resolved disagreement**: the UI audit suggested a testimonial
breaker between the booking section and FAQ; the UX audit suggested it
directly above the form, both independently recommending against
duplicating Home's exact carousel/lead-quote. Resolved as a single,
static (non-rotating) pull-quote in a new `Testimonial.tsx`, positioned
between `BookingSection` and `FAQ` (UI's placement, since the page is
short enough that a stacked-into-the-sidebar version would add to the
density problem §2 of the UI audit already flagged), leading with **V.K.
Pandian** specifically — the one real quote in `content/testimonials.ts`
that neither Home's carousel opens on nor About's testimonial grid uses,
so a visitor who's seen both other pages gets no repeated impression.

**Bundled fix found while in the area, applied site-wide, not just
Contact:** `Placeholder.tsx`'s `PlaceholderNote` had the same
dark-on-dark M3-token contrast bug on Nocturne Stage pages that was
already fixed for Danza pages in §20 (`tone="on-danza"`) — but no
equivalent `tone="on-nocturne"` existed, so every `PlaceholderNote` on
About, Gallery, Services, Journal, and Contact was still rendering
low-contrast dark text. Added `tone="on-nocturne"` (real `nocturne-*`
tokens + `font-hanken`) and applied it at all 8 existing call sites
site-wide (`about/Timeline.tsx`, `about/MastersGrid.tsx`,
`gallery/GalleryCTA.tsx`, `gallery/RepertoireActs.tsx`,
`services/ServiceDetailHero.tsx`, `services/WeddingActs.tsx`,
`journal/JournalArticleBody.tsx`, plus Contact's own
`ContactSidebar.tsx`) — a trivial, zero-risk, mechanical fix worth doing
once rather than rediscovering on each future per-page pass.

Icon-fidelity note, same as §20's: this is a UX-pattern extension pass,
not a literal Stitch-screen-fidelity pass, so `expand_less` (the
disclosure toggle's collapsed-state icon) is a new icon not in §15.1's
original confirmed list — chosen for semantic fit against the same
Material Symbols set already loaded site-wide, paired with `expand_more`
which was already confirmed.

Scope: Contact body content only — Header/Footer unchanged (§13.6).

## 23. Lightweight Design Audit — About, Services, Gallery, Journal (2026-09-20)

A quick single-pass audit (no parallel research agents, no per-page deep
dive — the client asked for a token-light version this time) of the four
remaining "Home-style" pages, done by direct code read + targeted greps
rather than the full §20–22 method. Purpose: surface the clear,
high-confidence issues worth fixing, in priority order, before spending a
full independent-research pass on any one page. Not exhaustive line-item
tables like §20–22 — treat this as a punch list to confirm/prioritize,
not a finished plan.

### Priority 1 — same bug class as Home/Contact, confirmed present elsewhere

- **`/services` list page has the exact same "9 identical repeated
  buttons" problem Home's `BookingAvailability` had before §20.**
  `ServicesList.tsx` renders one "Enquire to Book" button per service row
  (9 real services → 9 identical buttons), same shape as the
  now-fixed Home issue. Same fix applies: rows become informational, one
  section-level CTA.
- **`WeddingEnquiryForm.tsx` (the one service detail page with a real,
  built-out form) still requires Email and leaves Phone optional** — the
  opposite of the pattern Home and Contact both independently converged
  on (phone is this business's real primary channel). No disclosure
  toggle either — 6 fields all always-visible (Name*, Email*, Phone,
  Wedding Date, Destination City, Ensemble Size, plus a 3-option format
  checkbox group). Same trim-and-reprioritize treatment as Home/Contact
  would apply directly.
- **`RepertoireActs.tsx` (Gallery page) has 4 identical "Enquire About
  This Act" buttons**, one per repertoire card, all linking off-page to
  `/contact` — smaller-scale version of the same repeated-CTA pattern,
  though 4 is far less severe than 9.

### Priority 2 — redundant/thin content worth trimming or cutting

- **About's `MastersGrid.tsx` is largely redundant with `Founder.tsx`**
  (which already gives the founder a full dedicated section) and is
  mostly fictional-placeholder team cards ("Name to be announced" ×
  several, per `content/home.ts`'s `teamMembers` beyond the founder). Home
  solved the identical problem by cutting its own `MastersGrid.tsx`
  entirely and folding the founder into one clean spotlight — worth
  considering the same move here: drop or substantially shrink this
  section rather than showcase several empty placeholder cards right
  after a strong real Founder section.
- **8 of 9 `/services/[slug]` pages are thin** — just the shared hero +
  a `PlaceholderNote` ("Detailed service information coming soon") + one
  CTA, since `content/services.ts`'s `detail` field is still
  `TODO(content)` for all but wedding-events. This isn't fixable with a
  design pass (no real per-service copy exists to design around — see
  `PROGRESS.md`'s Phase 3 content gaps) but the current single
  placeholder-note treatment is at least honest; flagging only so it
  isn't mistaken for an oversight when the other pages get their full
  treatment.

### Priority 3 — pattern-fatigue / hierarchy, lower confidence without a full audit

- Repeated `rounded-nocturne-lg` bordered card shell count per page (rough
  proxy for "does everything look the same"): About 8×, Services 7×,
  Gallery 4×, Journal 4×. About and Services are the two worth the closest
  look when they get their full pass — Gallery and Journal are short
  enough this is likely fine as-is.
- Gallery's own page (`/gallery`) doesn't actually contain a photo grid —
  it's repertoire-act cards + technical requirements + CTA. Home's new
  `Gallery.tsx` (lightbox grid) covers the "show real photos" job now.
  Not necessarily a problem, but worth a conscious decision during
  Gallery's full pass: does `/gallery` want its own real photo grid (the
  literal thing its URL/nav label promises), reusing Home's lightbox
  pattern, or is repertoire-act detail the right content for this route
  and the naming/expectation gap is fine?
- Journal is minimal (index + 3 article stubs, all real titles/teasers,
  honest "full article coming soon" placeholders) — lowest priority of
  the four, likely needs the lightest touch when its turn comes.

### Suggested order

1. **Services** — the 9-button fix is a direct, high-confidence repeat of
   an already-solved problem, plus the wedding form's field/phone fixes
   are also a direct repeat of already-solved problems. Fastest, clearest
   value.
2. **About** — real narrative-page hierarchy work (MastersGrid decision,
   card-shell fatigue check).
3. **Gallery** — smaller CTA fix + the photo-grid IA decision.
4. **Journal** — likely minimal changes needed; confirm rather than
   redesign.

No code changed in this pass — this is the audit only, per the request to
keep it light. Full per-page implementation (with or without a deeper
research pass, client's call per page) follows once prioritized.

**Update — Priority 1 & 2 fixes applied (2026-09-20, same day):**

- `ServicesList.tsx`: the 9 identical "Enquire to Book" buttons are gone.
  Rows are now a single `Link` per row (number, name, summary, timing,
  status chip, hover arrow) — the existing `ServicesCTA` section
  immediately below the list already provides the one real CTA, so
  nothing new was added, matching how Gallery's `RepertoireActs` already
  relies on `GalleryCTA` below it.
- `WeddingEnquiryForm.tsx`: swapped to Phone required / Email optional
  (matching Home/Contact); added the same disclosure-toggle pattern
  (Name*/Phone*/Email-optional/Wedding Date always visible; Destination
  City, Formats, Ensemble Size, Notes behind "Add a few more details");
  fixed the `troupeSize` select's missing placeholder option (same bug
  class as Home/Contact — confirmed it existed here too).
- About's `MastersGrid.tsx` (4 fictional "Key Masters" placeholder cards)
  deleted and removed from `about/page.tsx` — redundant with `Founder.tsx`
  just above it, same fix Home already applied to its own equivalent.
- **`RepertoireActs.tsx` (Gallery) assessed, not changed**: its 4
  "Enquire About This Act" links are already styled as de-emphasized text
  links (gold text + arrow icon), not solid buttons — the same
  already-correct pattern Home's `ServiceCategories`/`RepertoireGrid`
  converged on, not the "9 solid buttons" problem this pass actually
  fixed elsewhere. No change needed.

`npm run build` + `npm run lint` clean. Verified in-browser: `/services`
(DOM query confirmed exactly one "Enquire to Book" on the page, the real
one in `ServicesCTA`, plus 9 clean row links), `/services/wedding-events`
(confirmed `phone.required === true`, `email.required === false`,
`troupeSize` absent until the disclosure toggle is clicked, then present
with a disabled empty first option), `/about` (confirmed no "Key Masters"
section and no "Name to be announced" text anywhere on the page).

## 24. Gallery Page — Structural Fidelity Rebuild (2026-09-20)

The client reported `/gallery` "looks nothing like the design." Re-examined
the actual reference (`productions_repertoire.raw`, locally re-rendered
and screenshotted section-by-section) and confirmed: the original §16
build only matched at the *content* level (real act names, dropped fake
specs) — it never matched the source screen's actual *layout*. The real
structure, missed the first time:

- **Hero**: not a centered headline + 4-stat grid below. It's an 8/4
  column split — headline+paragraph on the left, a single compact stat
  card on the right (`lg:grid-cols-12`, `lg:col-span-8` / `lg:col-span-4`)
  — followed by a row of filter pills (`All Masterworks (5)` + 4 category
  pills).
- **Acts I–III**: each is a full-width, alternating two-column "hero card"
  (`lg:grid-cols-12`, image `col-span-7` / content `col-span-5`,
  alternating image-left/content-right and content-left/image-right) with
  two badges overlaid top-left on the image, a duration pill bottom-left,
  a category+opus-number header row, title, description, a **2×2 stat
  grid** (4 label/value tiles), then a primary "Book [Act]" button + a
  secondary ghost button. Nothing like this alternating hero-card layout
  existed in the original build — it used a single small side-by-side
  card repeated 4×.
- **Acts IV–V**: a smaller "bento" 2-column grid (`md:grid-cols-2`), one
  badge each, a category+duration header row, title, description, one
  stat line, one CTA button.
- The "Global Touring Production Specifications" 4-tile section and the
  closing CTA were already structurally close in the original build.

**Revised decision — 5 acts, not 4 merged into one:** §16.2 row 8
previously merged Vande Mataram and Surya Namaskar into one card because
`content/home.ts` documents them as a single combined repertoire piece.
The source screen treats them as two separate acts (matching its own
"All Masterworks (5)" pill), each with its own real, already-used name.
Given the explicit instruction to match the design exactly, this pass
splits them back into two cards — this is a presentation choice, not a
new fabricated fact (both names are already-established real content
elsewhere on the site), and every invented specific number that would
normally come with treating them as fully independent acts is still
placeholder-treated per the rule below.

**Everything fabricated is still handled exactly as before, only the
container shape changed:**
- Every specific stat *value* in the 2×2 grids and single-stat lines
  (cast counts, proscenium footage, musical score names, special FX,
  durations, "1/1000s Precision," the hero's fake 85%-filled progress
  bar) is invented — kept as an honest "On request" / "Confirmed on
  enquiry" in the same visual slot, never the source's specific number.
  The 2×2 grid's four *labels* (Cast Size, Min. Proscenium, Musical
  Score, Special FX, etc.) are just category headers, not facts, and are
  kept for layout fidelity.
- The "Master Technical Document" modal (a full fake stage-rider
  document) is still not built — same reasoning as before, publishing
  invented technical specs risks misleading a real venue. The "View Tech
  Rider" secondary button keeps its position/icon but now links to
  `/contact` with honest copy ("Request Tech Rider") instead of opening a
  fake document.
- The filter pills are real category labels for 5 real act names
  (`data-filter`/`data-category` values from the source: mythology,
  ethereal ×2, martial, patriotic) rendered as static, non-functional
  decoration — no filtering logic was built (the source's own filtering
  is trivial/cosmetic JS over 5 static cards, not worth the added
  complexity for a 5-item list that already shows everything at once).
- "Fourteen worldwide-celebrated" and "2025–2026 World Tour" in the hero
  eyebrow/paragraph remain dropped (unconfirmed count/touring claim, same
  as the original §16.2 row 2 decision) — only the layout changed, not
  this content call.
- The two hero stats are now a compact 2-row card (matching the source's
  shape) populated with 2 real stats from `heroStats` instead of the
  source's fabricated "26-38 Artists" / "1/1000s Precision" — same
  substitution rule as everywhere else, just fewer slots to fill.

Icons: unchanged from §16.1's confirmed list — no new icons needed for
this structural rebuild.

Scope: Gallery body content only — Header/Footer unchanged (§13.6).

**Verified 2026-09-20**: `npm run build` + `npm run lint` clean. Compared
the live `/gallery` page section-by-section against the locally re-served
reference (`python3 -m http.server` over `productions_repertoire.html`,
screenshotted at 1440px) — confirmed matching: the 8/4 hero split with
compact stat card and filter pills; all three alternating hero-cards
(image-left/content-right for Dashavatar and Shiva Tandava,
content-left/image-right for Krishna Leela) with badges, 2×2 stat grids
showing honest "On request" values, and dual CTA buttons; the Act IV/V
bento grid; the 4-tile technical requirements section with bullet lists;
the closing CTA. Icon audit clean against §16.1's list, zero
substitutions.

## 25. Mobile Menu Redesign (2026-09-20)

Client feedback: the mobile hamburger menu should be "blurred with the
theme colored bokeh with big buttons for every page." The previous
`Header.tsx` mobile nav was a small accordion dropdown directly under the
header bar — a plain vertical list of small uppercase text links.

Rebuilt as a full-height overlay panel: `backdrop-blur-2xl` over
`bg-surface-stage/95`, three large blurred (`blur-3xl`) circles in the
site's existing Danza accent trio (`danza-crimson`, `danza-gold`,
`danza-cyan`) positioned at different corners with a new slow
opacity/scale "breathing" keyframe (`animate-bokeh`, `globals.css`, 7s
loop, staggered `animation-delay` per orb so they drift out of phase), and
each nav item rendered as a large rounded-2xl button (not a text line) —
full label at `text-2xl`, a trailing arrow icon, active-page highlighted
in crimson — with a staggered fade/slide-in per item on open. A "Book for
Events" CTA closes out the list.

**Real bug found and fixed while building this**: the header element
itself carries `backdrop-blur-xl`. `backdrop-filter` establishes a new
CSS containing block for `position: fixed` descendants (same as `filter`
does), so the mobile panel — originally nested inside `<header>` — had
its `fixed inset-x-0 top-20 bottom-0` resolve against the 80px-tall
header instead of the viewport, collapsing it to zero height and making
the menu invisible even though its React `open` state and computed
`opacity`/`visibility` were correct. Fixed by moving the panel to be a
sibling of `<header>` (both returned from a fragment) instead of a child.

**Second bug found and fixed**: clicking the toggle button to *close* the
menu did nothing — the document-level `mousedown` "click outside to
close" listener fired first (since the button sits outside the panel's
own ref), setting `open` to `false`, and then the button's own `onClick`
(firing on the subsequent `click` event) immediately toggled it back to
`true`. Fixed by giving the toggle button its own ref and excluding it
from the outside-click check.

`npm run build` + `npm run lint` clean. Verified at 375px: opening,
closing via the button (both directions), and the bokeh/blur/large-button
visual treatment, all in-browser. Desktop nav (`lg:` and up) is
unchanged — this was mobile-menu-only.

## 26. Bokeh Glow on Home, RepertoireGrid Button Fix, BookingAvailability Shortened (2026-09-20)

Follow-up to §25: client asked for the same blurred theme-color bokeh glow
used in the mobile menu to appear elsewhere on Home, flagged a real layout
bug in `RepertoireGrid.tsx`'s "Book This Act" row, and said
`BookingAvailability.tsx` "seems really long."

**Bokeh glow** — added to `RepertoireGrid.tsx` and `BookingAvailability.tsx`
(the two sections named in the request): two blurred (`blur-3xl`),
slow-breathing (`animate-bokeh`, §25's keyframe) orbs per section in the
Danza accent trio, at `opacity-40` on the wrapping layer — lower than the
mobile menu's raw orb opacity, since those sections have no dark
backdrop-blur scrim sitting on top to soften them the way the mobile
panel does. Hero and Testimonials already had their own single-color
radial-gradient glow and were left as-is (Hero was explicitly called out
as "already looks good").

**`RepertoireGrid.tsx` button layout bug, fixed**: the footer row packed
"Details on request" and the CTA link onto one `justify-between` line.
At the card's actual content-column width (roughly 60% of a 2-col grid
cell) both wrapped independently and staggered — "Details on / request"
broke across two lines while the CTA's arrow icon floated at a mismatched
baseline. Fixed by stacking them (note above, CTA below) and turning the
CTA into a proper small bordered pill button instead of a bare text link,
so neither element ever has to share horizontal room again regardless of
card width.

**`BookingAvailability.tsx` shortened**: the client's "really long"
report traced to two elements repeated identically on all 9 rows — a
"Timing & Location: Scheduled per booking" block and an "Open for
Booking" chip, neither of which varies by service, adding height without
adding information. Both are now stated once in the section header
("Open for enquiries — every service below is scheduled per booking, no
fixed sessions") instead of nine times, and the list itself is now a
2-column grid at `lg:` instead of a single-column stack — roughly halving
the section's vertical footprint at desktop widths (each row is now a
compact card: number, name, `line-clamp-2` summary, arrow).

`npm run build` + `npm run lint` clean. Verified in-browser: the fixed
button layout on `RepertoireGrid` (no more wrapping/collision), the
shortened single-mention header + 2-column grid on
`BookingAvailability` at both mobile and 1280px widths, and the bokeh
glow rendering (dampened, not overpowering content) in both sections.

## 27. Footer UI Improvement (2026-09-20)

Client asked to improve the footer's UI. `Footer.tsx` is shared,
site-wide chrome (Danza Theatrical, §13.6), not scoped to a page — this
pass touched it directly rather than per-page.

**Real content gap, fixed**: the footer had no direct phone or address
anywhere — the real email was only mentioned in a tiny italic footnote
under the newsletter block. For a booking business, quick-reference
contact details at the page bottom are a standard, expected footer
element. Added a real "Get in Touch" column (`site.contact.phones[0]` as
a `tel:` link, `site.contact.email` as a `mailto:` link, and the address
as a Google Maps search link) — the same three link patterns
`ContactSidebar.tsx` already established, just reused in the footer.

**Newsletter block, fixed**: the previous version was a fully disabled
`<input>` + `<button>` styled to look like a real, functional signup
form — a "coming soon" note dressed up as a broken feature. Replaced
with a single non-interactive pill ("Signup coming soon") in the same
honest-placeholder idiom used everywhere else on the site, no fake
interactive affordance.

**Visual continuity**: added the site-wide bokeh glow (§25/§26) —
two dampened, slow-breathing blurred orbs (crimson, gold) — so the
footer's hard black background no longer transitions abruptly from
whatever section sits above it on every page.

**Layout**: rebalanced the column grid from 4 columns (Brand/Repertoire/
Navigate/Newsletter, 4+3+2+3) to 5 (Brand/Navigate/Repertoire/Contact/
Newsletter, 4+2+2+2+2) to fit the new Contact column without crowding.
Bottom-bar legal links (still plain non-interactive text — no real pages
exist for them yet, per the standing rule) now wrap as whole
bullet-separated units instead of breaking mid-label on narrow screens.

`npm run build` + `npm run lint` clean. Verified in-browser at desktop
and 375px, on both a Danza page (Home) and a Nocturne Stage page (About)
since the footer is shared across the whole site — confirmed all three
contact links resolve correctly (`tel:+919861180053`,
`mailto:princedancegroup09@gmail.com`, a Google Maps search URL) and the
legal-links wrapping fix.

## 28. About Page UI/UX Redesign (2026-09-20)

Same "Home-style treatment" as Home's §20 and Contact's §22 — two
independent research passes (a UI expert and a UX specialist, each with
full business context, told not to duplicate the other's focus) run
before any code changed, per the client's explicit ask to give every
remaining page this treatment. Scope: About body content only —
Header/Footer are already Danza Theatrical (§13.6) and untouched.

**What both audits converged on**: with `MastersGrid.tsx` already removed
(§23), the page had no more low-hanging cuts left — the remaining problem
was pure visual/narrative design, not fabricated content. Both audits
independently flagged the same root causes: 6 of 7 sections repeat the
identical card-shell/eyebrow/h2 skeleton with no visual hierarchy; Founder
and Timeline both retell the same origin story with no differentiation;
Founder's paired 1:1 card layout gives a third-party quote equal weight to
the founder himself; the Timeline's line-and-dot metaphor implies a longer
chronology than 3 honest, undated facts can support; and LivingArchive's
photo tiles have a hover-zoom "clickable" affordance with no actual link.

**Section order changed**: Hero → Founder → Pillars → Timeline →
LivingArchive → Testimonials → CTA became Hero → **Timeline** → **Founder**
→ Pillars → LivingArchive → Testimonials → CTA. Per the UX audit, Timeline
(the fuller, chronological unpacking of the origin story, including the
media-appearances list) now runs immediately after Hero so the page tells
one continuous history chapter before shifting to "the man today"
(Founder) — instead of interleaving overlapping origin-story content
across two non-adjacent sections.

**`Founder.tsx` rebuilt as a single, uncontested shell** (`Founder.tsx`):
the paired "founder bio card" + "Recognized by Leadership" Naveen Patnaik
quote card is now one full-width card (photo left, bio right), matching
the precedent Home's own `FounderSpotlight.tsx` already set for the same
person. The UI audit found the old paired layout diluted the one section
whose entire job is spotlighting the founder, and flagged a real
typographic ambiguity — Patnaik's quote rendered in the same serif
card-title treatment as a profile name, readable as a second person rather
than a third-party endorsement. Patnaik's quote moves to `Testimonials.tsx`
instead (see below). Also dropped a hardcoded sentence that used to follow
`founder.bio` in the JSX, restating the same Berhampur/discipline facts
already in Hero's paragraph with no new information (UX audit finding).

**`Timeline.tsx` reformatted** from a vertical line-and-dot list to a
3-card grid using the same "numbered badge" idiom Pillars already
established (`Pillar I/II/III/IV` → `Milestone 01/02/03`) — same real 3
milestones, same honest "Today — further milestones and exact dates to be
confirmed" note, now sitting below the grid rather than as an equal-weight
4th timeline node. The UI audit's reasoning: a timeline's visual promise is
chronological position, but with zero confirmed dates anywhere, the
line-and-dot form was carrying a metaphor the content couldn't back up —
mostly empty vertical space implying a longer, denser journey than 3
honest facts represent.

**`LivingArchive.tsx` rebuilt**: all 5 real photos in `content/gallery.ts`
are now used (previously 3 of 5 — `performance-4.jpg` and
`performance-5.jpg` sat completely unused), in an asymmetric bento layout
(one large featured tile + four smaller ones at `lg:`, a clean 2-column
grid below that) instead of 3 identically-sized tiles — differentiates it
from the Pillars/Testimonials equal-grid rhythm elsewhere on the page. The
two newly-added tiles use the same honest generic caption already typed
for them in `content/gallery.ts` ("Live Stage Performance") rather than an
invented specific attribution. Every tile (plus a new "View Full Gallery"
header link) now links to `/gallery` — the UX audit found the previous
tiles had a hover-zoom effect signaling "clickable" with no actual
destination, a real affordance-mismatch bug, and that gallery-browsing
intent peaks here, three sections before the only other exit (CTA)
previously offered it. Added the dampened bokeh glow (§25/§26 idiom,
`nocturne-gold`/`nocturne-primary`, `opacity-30` wrapper) — the first use
of bokeh on a Nocturne Stage page, on the UI audit's specific
recommendation (About's repertoire-teaser analog to Home's
`RepertoireGrid.tsx`, which already has it).

**`Testimonials.tsx` expanded to all 7 real quotes**: previously only 4 of
7 were shown (Patnaik was reserved for Founder's old recognition card;
V.K. Pandian and Sonali Bendre sat entirely unused in
`content/testimonials.ts` despite being real, sourced, on-theme quotes —
Pandian a real former District Collector of Ganjam praising Reddy
directly, Bendre's quote reinforcing the underdog/daily-wage-worker theme
directly). With Patnaik's quote now free to move here, all 7 are shown as
one consistent content type. Also dropped the decorative 5-star row — the
UI audit flagged that a filled gold 5-star row reads as an unambiguous
review-platform rating pattern regardless of code intent (`aria-hidden`,
no numeric value), and these are unsolicited quotes from named public
figures, not a star rating. Replaced with a plain `format_quote` glyph,
consistent with how a pull-quote is presented elsewhere on the site.

**`CTA.tsx`**: added the bokeh glow (dampened, `nocturne-gold`/
`nocturne-primary`), mirroring Home's own booking-CTA precedent. Also
downgraded "Explore Full Repertoire" from an equal-weight second button to
a small inline text link — per the UX audit, now that LivingArchive
already sends browsing-intent visitors to `/gallery` earlier on the page,
the final CTA can stay singularly focused on the one primary action
(booking) instead of offering a same-weight detour at the page's last
pixel.

**`Hero.tsx`**: one-line bug fix — the four stat values were rendering in
`text-nocturne-primary` (a pink, `#ffb2be`), the only accent color on the
entire page that isn't gold (every other accent — eyebrow badges, section
labels, icon circles — uses `nocturne-gold`). Confirmed via live render,
not just code reading. Fixed to `text-nocturne-gold`.

**Not changed**: `Pillars.tsx` — both audits confirmed it's already
pulling its weight and correctly differentiated from Timeline/Testimonials
once those two were reformatted; no edits needed.

`npm run build` + `npm run lint` clean. Verified in-browser: full-page
scroll at default width (confirmed new section order, Hero stat color fix,
Timeline's 3-card grid, Founder's single shell, all 7 testimonials with
the quote-glyph treatment, CTA's single primary button) and at 1400px
width specifically for `LivingArchive`'s asymmetric bento grid (renders
correctly — 1 large tile spanning 2 rows + 4 smaller tiles at `lg:`,
2-column below that).

## 29. Site-Wide Consistency Pass: Booking Modal, Bokeh, UI, Bugs, Plain Language (2026-09-21)

Client asked for five things in one request: (1) a bokeh/design-principle
consistency check on every page individually, (2) a UI improvement pass on
whichever pages needed it, (3) the header's "Book for Events" CTA to open
a popup form instead of navigating away, (4) a bug hunt on every page, (5)
a site-wide plain-language pass — simpler vocabulary everywhere, no
unnecessarily complicated words.

**Method**: given the scope (every page at once), this used the lighter
single-pass method rather than the heavier "two independent research
agents per page" method Home/Contact/About each got individually — the
client asked for something similar once before for a multi-page audit and
explicitly asked for the token-light version that time; that preference is
applied here by default now for any all-pages-at-once request. Concretely:
I built the shared header modal and simplified the shared `content/*.ts`
files myself first (to avoid multiple parallel agents colliding on files
several pages import), then ran one agent per page (Home, About, Contact,
Gallery, Services, Journal) in parallel, each scoped strictly to its own
route file + its own `components/sections/<page>/` directory and told not
to touch `globals.css`, `Header.tsx`, `Footer.tsx`, `BookingModal.tsx`,
`Placeholder.tsx`, any `content/*.ts` file, or the docs — so six agents
could run at once with zero file-ownership conflicts. Each covered bokeh
consistency, a UI pass, a bug hunt, and content simplification for its own
page in one go. `npm run build` + `npm run lint` run once, centrally,
after all six landed — both clean.

### 3. Header "Book for Events" → popup modal

New `components/layout/BookingModal.tsx`: a compact 4-field enquiry form
(Name*, Phone*, Email optional, Event Type) in a centered card over a dark
bokeh-glow backdrop (full raw `.animate-bokeh` opacity here, same as the
mobile menu, since there's a dark scrim behind it) — same honest
submit-status state machine as every other form on the site (posts to the
existing `/api/contact`, shows the real "not connected yet" state, no fake
success). Both "Book for Events" buttons in `Header.tsx` (desktop pill,
mobile panel) now open this modal via `bookingOpen` state instead of
navigating to `/contact` — `/contact` itself is unchanged and stays the
fuller, primary enquiry surface; this is a fast in-place alternative
reachable from anywhere on the site. Closes on Escape, backdrop click, or
the X button; resets to a fresh form each time it's reopened. Verified in
both desktop (pill button) and mobile (panel button, which also closes the
mobile nav first) — modal opens over the bokeh backdrop correctly in both,
Escape closes it.

### Content simplification — central pass (shared files)

Before splitting page work out, I simplified the shared files myself to
avoid six agents fighting over the same file:
- `content/home.ts`: `philosophyPillars`' English descriptions and
  `focus` tags rewritten in plain language (e.g. "Deep reverence for
  lineage and continuous daily sadhana under a master's gaze — the
  intimate transfer of oral choreography..." → "Deep respect for our
  teachers, and daily practice under a master's care — dance steps,
  discipline, and dedication passed down directly, person to person.").
  The real Sanskrit titles/Devanagari (Guru-Shishya Parampara, Natya
  Shastra & Navarasa, Seva & Samaveshi, Vasudhaiva Kutumbakam) are kept
  exactly — those are real cultural terms, not a vocabulary choice, only
  the English explanations around them changed. `teamMembers[0].bio`
  lightly simplified too ("acclaim" → "fame", "reshaping" → "changing").
- `components/layout/Footer.tsx` (shared chrome, not any one agent's
  scope): "Reimagining sacred Indian epics and kinetic contemporary
  storytelling on Indian stages... creators of breathtaking choreographic
  spectacles" → "Bringing India's ancient epics to life through dance and
  storytelling on stage... known for unforgettable performances."
- `content/testimonials.ts` was explicitly off-limits for every agent —
  those are direct quotes from real named public figures (Naveen Patnaik,
  V.K. Pandian, Shah Rukh Khan, Sonali Bendre, Kirron Kher, Shekhar Kapur,
  Dharmendra) and must stay verbatim; simplifying their wording would be
  misquoting a real person, not a vocabulary fix.
- `content/journal.ts` and `content/services.ts` were also left alone —
  Journal's titles/teasers are real sourced material from the original
  site's archive, and Services' summary copy is the single source of
  truth several pages read from; both stayed each page-agent's read-only
  reference, not something to reword mid-parallel-run.

### Home

Bug: `Gallery.tsx`'s lightbox caption was positioned `absolute -bottom-9`
outside the modal's centering math, risking clipping on short/landscape
mobile viewports — restructured to a normal in-flow flex column so it's
always fully visible. Bokeh added to `EventEnquiry.tsx` only (the page's
closing CTA, same justification as About's CTA) — deliberately not added
to Hero/StatsRow/FounderSpotlight/ServiceCategories (dense content, would
be noise) or Testimonials (already has its own ambient radial glow).
Content simplified throughout Hero, FounderSpotlight, ServiceCategories,
RepertoireGrid, Gallery, and EventEnquiry — e.g. Hero's "Sacred Geometry.
Stage Grandeur. Unforgettable Spectacles." → "Precise Formations. Grand
Stages. Unforgettable Shows."; RepertoireGrid's "interlocking human
columns recreate ancient Orissan temple sculptures in electric
synchronicity" → "dancers form living columns that recreate ancient
Orissan temple carvings, moving in perfect unison." All real facts, names,
and testimonial quotes left untouched.

### About

No redesign (§28 had just landed) — a narrower consistency/bug/content
pass on top of it. No real bugs found; the new `LivingArchive.tsx` bento
grid's responsive breakpoints were specifically re-verified and are
correct. Content simplified further beyond §28: `Pillars.tsx`'s "The Four
Pillars of Pedagogical Ethos" → "The Four Pillars of Our Practice",
`Timeline.tsx`'s "The Odyssey" → "Our Journey", `CTA.tsx`'s "The
Proscenium Awaits" → "Book Your Event", and more (see decisions log for
the fuller list). `LivingArchive.tsx`'s "Dashavatar Tableaux" tile title
deliberately left alone — it's a real repertoire name shared identically
with the Gallery page, not this page's own prose to simplify in isolation.

### Contact

Bugs: a grammar slip ("A few details **is** all we need" → "**are**"), an
Inquiry/Enquiry spelling inconsistency (the rest of the site uses
"Enquiry" throughout — the submit button and FAQ heading were the two
outliers, fixed), and a missing `aria-controls` on the disclosure-toggle
button. Also found and fixed a real hierarchy bug: `BookingSection.tsx`
and `Testimonial.tsx` were two consecutive sections on the identical
`bg-nocturne-surface` background with no boundary between them, breaking
the alternating-background rhythm every other redesigned page uses —
swapped `Testimonial.tsx`/`FAQ.tsx` backgrounds to restore full
alternation. Bokeh added to `BookingSection.tsx` (the page's actual
conversion moment). Content simplified: `ContactSidebar.tsx`'s "Live
Master Tableaux" → "Featured Performance", "Executive Date Booking" →
"Booking Enquiries", and more.

### Gallery

Bug: the same footer note+CTA squeeze-onto-one-line collision already
documented and fixed on Home's `RepertoireGrid.tsx` had never been carried
over to `RepertoireActs.tsx`'s bento-grid acts — fixed the same way
(stacked, CTA as its own pill button). Also unified a stray text-arrow CTA
to the same `arrow_forward` icon used everywhere else. Bokeh added to
`GalleryHero.tsx` and `GalleryCTA.tsx`. This page had the heaviest jargon
on the site — "Proscenium Masterworks" → "Our Repertoire", "Signature
Magnum Opus" → "Flagship Performance", "Pure Kinetic Geometry" → "Precise
Group Formations", the "Min. Proscenium" stat LABEL → "Min. Stage Depth"
(its value stays the existing honest "On request" placeholder — no number
was invented). No fabricated technical specs were reintroduced anywhere.

### Services

The most substantial of the six passes, since (unlike the other five)
Services had never received a real design/UX pass beyond the Nocturne
token migration. Bug: `ServicesList.tsx` still had the exact
"identical-block-repeated-on-every-row" problem Home's `BookingAvailability`
diagnosed and fixed in its own §26 pass (a "Timing & Location" line and an
"Open for Booking" chip, identical on all 9 rows) — that fix had never
been carried over here; fixed the same way (stated once in the header).
UI improvements: `ServicesList.tsx` rebuilt as a 2-column grid with a
distinct icon per service (new `serviceIcons.ts`); `ServicesHero.tsx`
brought up to the same weight as every other page's hero (radial gradient,
bokeh, a quick-jump pill row of all 9 services); the generic `[slug]`
template shared by 8 of the 9 services — previously just Hero → CTA, the
thinnest page on the site — gained two new honest, non-fabricated sections
(`HowItWorks.tsx`: 3 generic booking steps, no invented timelines;
`RelatedServices.tsx`: cross-links to 3 other real services). Content
simplified throughout the Wedding-specific sections and the new Hero copy.
Re-verified none of the previously-dropped fabrications (Devika
Narain/Cineyug testimonials, the luxury-venue portfolio, Academy &
Workshops) were reintroduced — they weren't.

### Journal

Bug: the article detail page (`JournalArticleBody.tsx`) was a genuine dead
end — one placeholder box and nothing else, no way to keep reading or
navigate anywhere. Fixed by adding a real "More from the Journal" block
linking to the other two real entries, on both the list page (as a
featured+secondary card layout replacing the flat 3-up identical grid,
mirroring About's `LivingArchive` pattern) and the detail page. Bokeh
added sparingly and peripherally (this is a reading-focused page) to the
header and the new closing block only, never behind body text. Content
simplification here was UI-chrome-only — the real article titles/teasers
in `content/journal.ts` are sourced material from the original site and
were left untouched; only invented UI copy like the placeholder note's
wording was simplified ("the complete text wasn't captured in the archived
source" → "we're still adding the complete write-up for this story").

`npm run build` + `npm run lint` clean across the whole site after all six
passes landed. Verified in-browser: Services list (new icons/header),
Services generic detail page (new HowItWorks/RelatedServices sections),
Journal list (featured/secondary cards) and an article detail page (More
from the Journal fix), Gallery (bokeh + simplified copy), and the header
modal on both desktop and mobile.

## 30. Site-Wide Connectivity Pass: Link Audit, Sitemap, 404, Legal Pages (2026-09-21)

Client asked to connect every page and feature together, and to check
whether any internal page was missing.

**Audit method**: extracted every `href` value across the codebase
(`grep -rohE 'href="[^"]*"|href=\{...\}'`) and cross-checked each one
against real routes and the real slug arrays in `content/services.ts` and
`content/journal.ts`, then checked every route file's own `id="..."`
anchors against every `href="#..."` reference. Result: the internal link
graph was already clean — all 9 service slugs, all 3 journal slugs,
`/about`, `/gallery`, `/contact`, and both intra-page anchors
(`#gallery`, `#event-enquiry`) resolved correctly, and every content page
(services, journal articles) was reachable from at least one real link
(the `RelatedServices`/"More from the Journal" cross-links added in §29
already closed what used to be thin spots). No broken or orphaned content
pages were found. What was actually missing were three real gaps, not
"a page I forgot to link":

1. **No custom 404.** A mistyped URL hit Next.js's generic unstyled
   default — a dead end back into the site. New `app/not-found.tsx`: a
   branded page (Danza tokens, matching every other page) with four real
   route cards (Home/Services/Gallery/Contact) and a `tel:` fallback.
2. **No sitemap/robots.** Nothing told search engines every page exists —
   the literal "connect every page" gap from outside the site. New
   `app/sitemap.ts` (lists all 21 real routes: 6 top-level + 9 service
   detail + 3 journal articles + 3 legal pages) and `app/robots.ts`
   (allows all, points at the sitemap). Both need `metadataBase` to
   resolve absolute URLs, added to `layout.tsx` — read from
   `NEXT_PUBLIC_SITE_URL` with a `localhost:3000` fallback rather than
   guessing a real domain, since the site isn't deployed yet
   (`PROGRESS.md`'s Netlify checklist is still unchecked). **Set
   `NEXT_PUBLIC_SITE_URL` once the real domain is known** — until then
   the sitemap/OG tags resolve against localhost, which is harmless
   (search engines won't index a non-deployed site) but should be fixed
   at deploy time.
3. **Footer's 3 legal links were dead, non-clickable text** ("Privacy
   Policy," "Performance Terms," "Rider Requirements," `cursor-not-allowed`
   — "no real pages exist for them yet" per the old comment). This was
   the one deliberate dead end left in the site's own navigation. New
   `content/legal.ts` (3 entries: slug/label/description) +
   `components/sections/legal/LegalPlaceholder.tsx` (a shared shell: real
   title/description, an honest "this page is being finalized, contact us
   directly" note with real phone/email, a link back home — no fabricated
   legal text, which would be worse than a placeholder) + three thin route
   pages (`app/privacy-policy`, `app/performance-terms`,
   `app/rider-requirements`). `Footer.tsx`'s legal links now render as
   real `Link`s to these instead of inert spans.

**One more connectivity fix, found while checking these**: `Header.tsx`'s
active-nav-item check was `pathname === item.href`, an exact match — so a
visitor on `/services/wedding-events` or any `/journal/<slug>` article saw
*no* nav item highlighted at all, no cue for where they were in the site.
New `isNavActive()` helper does a prefix match (`pathname === href ||
pathname.startsWith(href + "/")`), with `/` (Home) deliberately exempted
from the prefix check so it doesn't match every route. Applied to both the
desktop pill nav and the mobile panel nav (previously duplicated exact-match
logic in two places, now both call the one helper). Verified: `/services`
highlights "Services" as before, `/services/wedding-events` now also
highlights "Services" (confirmed via `aria-current="page"` in the DOM).

**Checked and deliberately not changed**: `/services/wedding-events`
stacking the generic `ServiceDetailHero` directly above the dedicated
`WeddingHero` looked at first glance like a duplicate-hero bug — it isn't;
`WeddingHero.tsx`'s own comment documents this as intentional layering
from the original §17 design (a compact breadcrumb/photo header, then an
expanded wedding-specific section below it), not something introduced or
missed by any recent pass. Left as-is rather than redesigning it under a
task that was about connectivity, not a fresh design opinion.

`npm run build` + `npm run lint` clean (27 routes now, up from 22 — the
3 legal pages, `/sitemap.xml`, and `/robots.txt`). Verified in-browser:
the branded 404 on a nonexistent URL, `/sitemap.xml` rendering all 21 real
page URLs, the footer's Privacy Policy link resolving to a real page, and
the Header nav highlight on a service detail page.

## 31. Accessibility Pass (WCAG 2.1 AA) — Focus, Motion, Contrast (2026-09-21)

`TODO.md` Phase 3.1. Site-wide, not page-specific — touches shared tokens
in `globals.css` plus the two focus-trapped dialogs (`BookingModal.tsx`,
Home's `Gallery.tsx` lightbox) and `Testimonials.tsx`'s auto-advance.
Three token changes, all in the `@theme` block:

- **New `--color-focus-ring: #ffffff`.** The sitewide `:focus-visible`
  outline was `var(--color-secondary)` (`#0051d5`), which measures
  **2.88:1** against the dark surfaces every focusable element sits on —
  below the 3:1 WCAG AA minimum for non-text UI. White clears >15:1 on
  every surface in both the Danza and Nocturne systems, so this is one
  neutral token rather than a per-system pair.
- **`--color-on-surface-danza-dim`: `#64748b` → `#8b97a8`.** The old value
  measured **4.05:1** on `surface-stage` and **3.65:1** on `surface-card`
  — both fail the 4.5:1 AA minimum for normal text — and it's used for
  the entire footer bottom bar plus form labels/meta text across 6+
  files, much of it already at `text-[10px]`/`text-[11px]`, which makes
  under-contrast worse, not exempt from it. The new value reaches
  **5.31–6.51:1** across all three dark surfaces (`surface-stage`
  `#0d0e12`, `surface-card` `#181a20`, `surface-elevated` `#20232a`).
  Purely a token value change — no call sites changed, since every
  existing `text-on-surface-danza-dim` usage now simply renders lighter.
- **New `--color-danza-error: #fb7185`.** Form `role="alert"` error
  messages (`EventEnquiry.tsx`, `BookingModal.tsx`) previously used the
  decorative `--color-danza-crimson` (`#e11d48`) for error text too —
  measured **~3.3–3.4:1** on the elevated dark card those messages render
  on, below AA. This lighter rose reaches **5.69–6.46:1** on
  `surface-card`/`surface-elevated` while still reading unambiguously as
  an error color. Scoped to error *text* only — decorative crimson usage
  elsewhere (buttons, badges, bokeh) is unaffected and unchanged. Both
  call sites switched from `text-danza-crimson` to `text-danza-error`.
  Checked the parallel Nocturne-system error color
  (`text-nocturne-primary`, used by `contact/EnquiryForm.tsx` and
  `services/WeddingEnquiryForm.tsx`) as a sanity check — it already
  measures **9.66–11.36:1**, no fix needed there, so this contrast issue
  was Danza-only.

All three ratios computed programmatically via the standard WCAG relative
luminance formula, not eyeballed.

Non-token fixes in the same pass:

- **Skip-to-content link** (`layout.tsx`): a `sr-only focus:not-sr-only`
  anchor as the first `<body>` child, jumping to a new `id="main-content"`
  on `<main>` — previously a keyboard user had no way to bypass the full
  header/nav on every single page load.
- **`prefers-reduced-motion` support.** A blanket CSS rule in
  `globals.css` collapses all animation/transition durations to near-zero
  for any visitor with the OS setting on. This can't reach JS-driven
  timers, so `Testimonials.tsx`'s `setInterval` auto-advance additionally
  checks `matchMedia("(prefers-reduced-motion: reduce)")` directly (via a
  lazy `useState` initializer + a `change`-event listener, not a
  synchronous `setState` in an effect body, to satisfy the
  `react-hooks/set-state-in-effect` lint rule) — a WCAG 2.2.2 (Pause,
  Stop, Hide) gap that existed even though hover/focus-pause did not
  count as informed consent.
- **Focus trap for both dialogs.** New shared hook
  `components/ui/useFocusTrap.ts` (hand-rolled instead of a dependency —
  `ARCHITECTURE.md` §4 — since two call sites don't justify one): moves
  focus into the dialog on open, traps Tab (with Shift+Tab wraparound)
  within it, restores focus to the trigger element on close. Applied to
  `BookingModal.tsx` and Home's `Gallery.tsx` lightbox — the lightbox was
  the worse gap, since its close/prev/next buttons were previously only
  reachable by tabbing through the entire page behind the overlay first.

Verified via actual keyboard interaction in-browser (Tab/Shift+Tab/Escape,
reading `document.activeElement`), not just code review: BookingModal
focus lands on Close on open, Shift+Tab wraps to the last element, Escape
restores focus to the "Book for Events" trigger; Gallery lightbox focus
lands on Close, Tab cycles Close→Previous→Next→wraps to Close, Escape
restores focus to the exact grid tile clicked.

## 32. Glassmorphism Design Pattern (2026-09-22)

Client asked for a real glassmorphism treatment, first tried on
`services/ServicesCTA.tsx`'s closing CTA card. First attempt tinted the
*entire* card in the brand pink (`bg-nocturne-primary/[0.12]
backdrop-blur-xl`) and relied on the section's own outer bokeh blurring
through it — client feedback: "looks off compared to the overall theme."

Researched how glassmorphism is actually implemented by major sources
before rebuilding it (Apple's materials/vibrancy guidance including
visionOS's "Liquid Glass," Microsoft Fluent's "Acrylic" material and its
own documented criticisms, Material Design 3's scrim/tonal-elevation
rationale, Nielsen Norman Group, and `backdrop-filter` mechanics/
performance write-ups). The findings independently confirmed what a
second attempt at `ServicesCTA.tsx` had already converged on by matching
this project's own working precedent (`Header.tsx`'s top bar and mobile
nav panel):

- **Never tint the glass surface itself in a brand/accent color.**
  Microsoft's own Acrylic guidance explicitly warns against exactly this
  — accent color belongs on content sitting *on* the glass, or in a
  small clipped glow rendered *behind* it, never in the glass fill. This
  is the specific mistake the first `ServicesCTA` attempt made.
- **Glass is a layering device for floating/transient surfaces**
  (Apple), or **nav chrome and supporting panels specifically** (Fluent)
  — Fluent explicitly recommends an *opaque* background instead of
  acrylic for content-sectioning surfaces, which is why body-copy cards,
  forms, and anything carrying business-critical text on this site stay
  solid, not glass.
- **A translucent panel's *effective* background is whatever happens to
  render behind it** — Material Design 3 uses flat scrims instead of
  frosted glass for exactly this reason: a contrast ratio checked once at
  design time isn't reliable at runtime if the panel is genuinely
  see-through. A near-opaque (85–95%) dark base collapses the effective
  background to something close to one fixed, checkable color regardless
  of what's behind it — the reasoning behind every recipe below.
- **Practical `backdrop-filter` ranges**: small chips/controls read as
  glass at an 8–16px blur (Tailwind's `backdrop-blur-sm`/`md`); large
  panels need 24–40px (`backdrop-blur-xl`/`2xl`) to fully obscure detail
  behind them. A thin (~1px), low-opacity near-white border is the
  standard "light hitting an edge" cue. Never stack two `backdrop-filter`
  layers directly on top of each other (real GPU compositing cost, and a
  documented source of Chromium/WebKit rendering bugs) — a small glass
  chip nested inside an already-blurred glass panel should not itself
  carry a second blur.

**The resulting pattern — two tiers, each in both token systems, defined
once in `app/src/lib/glass.ts`:**

- **Glass Panel** — large, generously-sized surfaces (nav chrome, modals,
  one closing CTA per page): 90% opacity of the page's darkest surface
  token + `backdrop-blur-2xl` + the system's standard border token +
  `shadow-2xl`. Optional clipped bokeh blobs *inside* the panel (not a
  tint of the panel itself) on big, static surfaces only — mobile menu,
  modal backdrop, closing CTA — never on the persistent, always-visible
  top header bar (too thin, no room for a glow to read).
  - Danza: `bg-surface-stage/90 backdrop-blur-2xl border border-surface-border/60`
  - Nocturne: `bg-nocturne-surface-container-lowest/90 backdrop-blur-2xl border border-nocturne-stage-border`
- **Glass Chip** — small badges/pills/icon-buttons sitting directly on
  photographic content (category tags, prev/next/close controls, caption
  badges): lighter blur, no bokeh — the job is purely "stay legible over
  an unpredictable photo," the textbook Apple/Fluent glass-control case.
  - Danza: `bg-surface-stage/80 backdrop-blur-sm border border-surface-border/50`
  - Nocturne: `bg-nocturne-surface-container-lowest/85 backdrop-blur-md border border-nocturne-stage-border`

`ServicesCTA.tsx` was rebuilt to Glass Panel (Nocturne) + 2 clipped inner
bokeh blobs (gold + pink) instead of a brand-tinted fill; its secondary
"Call Us Now" button moved to the standard `bg-nocturne-surface-container
border-nocturne-stage-border` pairing every other secondary button on the
site already uses, and its watermark icon re-tinted gold to sit correctly
against the darker base.

**Rollout scope, per client decision**: photo-overlay controls only (not
the wider hero-eyebrow-badge option also on the table) — these were the
one clear category still using a flat, un-blurred translucent background
directly over photography, the textbook glass-control case the research
above calls out:

- `ui/Lightbox.tsx`'s close/prev/next buttons — shared across both token
  systems by design (no page-specific tokens), so it gets its own
  white/black-based variant of the Chip formula rather than either
  Danza/Nocturne constant.
- `home/Gallery.tsx`'s zoom-in icon button (Danza) and
  `gallery/RepertoireActs.tsx` / `about/LivingArchive.tsx`'s equivalent
  icon buttons (Nocturne) — all previously flat `bg-black/40` or
  `bg-nocturne-surface-container-lowest/80` with zero blur.

**Existing drift normalized to the shared constants** (client decision:
normalize now rather than leave until next touched) — six chip instances
that were already glass-ish but had silently drifted to slightly
different opacity/blur values per file: `home/Hero.tsx`'s "Act:
Dashavatar" caption badge (canonical Danza reference, `/80`),
`home/ServiceCategories.tsx`'s category badge (was `/85`),
`journal/JournalGrid.tsx`'s two category badges, `services/
ServiceDetailHero.tsx` and `repertoire/RepertoireActDetail.tsx`'s
"Service NN/09" badges (were `backdrop-blur-sm`, drift from the shared
`-md`), and `gallery/RepertoireActs.tsx`'s bento-card badge (was `/80`).
**Deliberately left untouched**: `gallery/RepertoireActs.tsx`'s
`bg-nocturne-secondary/20` act-category tag — a distinct colored-label
design (not a neutral photo-caption chip), and converting it to the
neutral Chip formula would itself be the brand-color-tint mistake this
pattern exists to avoid.

**Not done in this pass, left as an explicit option for later**:
converting the 5 hero eyebrow badges (`about/Hero.tsx`, `contact/
Hero.tsx`, `services/ServicesHero.tsx`, `services/WeddingHero.tsx`,
`gallery/GalleryHero.tsx`) from fully opaque to Glass Chip — client chose
the narrower photo-overlay-only scope for this pass. `gallery/
GalleryHero.tsx`'s own existing `bg-nocturne-surface-container/60
backdrop-blur-md` info card is glass-ish at a riskier 60% opacity
directly over a hero photo — flagged for a contrast re-check under §31's
standard, not touched here.

`npm run build` + `npm run lint` clean (33 routes). Verified on the live
server via computed styles (not just screenshots): confirmed real
`background-color`/`backdrop-filter`/`border-width` values on the Home
hero chip, the Home gallery lightbox trigger, and — by actually opening
the lightbox dialog — its Close and Next buttons; screenshot-confirmed
the open lightbox shows a visible frosted rim and blur on its controls.
