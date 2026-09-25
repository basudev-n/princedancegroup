# ARCHITECTURE.md — Prince Dance Group Website

**Status: BINDING.** This document is written before a single line of application
code exists. Every future setup decision, folder, dependency, and convention for
this project must conform to it. If reality needs to diverge from this document,
**update this document in the same commit** that makes the change — never let code
and doc drift apart.

Read order for any new session: `ARCHITECTURE.md` (this file, rules) →
`CLAUDE.md` (orientation) → `DESIGN.md` (visual system) → `PROGRESS.md` (status).

---

## 0. What this project actually is

Prince Dance Group is a real, currently operating performance troupe based in
Gopalpur/Berhampur, Odisha, India — founded and led by **Krishna Mohan Reddy**,
winner of *India's Got Talent* Season 1. It is a **booking/portfolio business**:
clients hire the troupe for corporate events, weddings, TV award shows, religious
events, school/college functions, music videos, and promotional shoots. It is
**not** a dance school, studio membership, or conservatory with classes/tuition —
do not introduce that framing anywhere (copy, routes, forms, schema).

The Google Stitch project "Prince Dance Group Website" supplied the **visual
design system only** (color, type, spacing, component style — see `DESIGN.md`).
Its generated page copy invents a fictional NYC ballet conservatory and must
never be used verbatim. Real content comes from `assets/source/` (extracted from
the actual princedancegroups.com Wayback captures) and whatever the client
supplies going forward.

---

## 1. Non-negotiable rules

1. **No fictional business facts.** Never invent addresses, phone numbers,
   founding dates, staff names, or credentials. If a real value isn't known yet,
   mark it `TODO(content):` in the source file and use an obviously-placeholder
   value in the UI (never a plausible-looking fake).
2. **~~No rounded corners~~ — superseded 2026-09-20, see TODO.md Phase 8.**
   This described the original Stitch M3-flat import. The client's
   confirmed pivot to the Danza Theatrical / Nocturne Stage design
   systems (`DESIGN.md` §9/§13, and every page migration logged in
   `CLAUDE.md`'s site-wide history) uses rounded corners throughout —
   `rounded-2xl`/`rounded-nocturne-lg` for cards, `rounded-full`/
   `rounded-nocturne-full` for pills and buttons. Current rule: **use the
   radius token the active design system defines** (`DESIGN.md` §9/§13's
   own radius scale) — never an arbitrary one-off value (that's still
   covered by rule 4 below).
3. **~~No drop shadows / blurs for elevation~~ — superseded 2026-09-20,
   see TODO.md Phase 8.** Same reason as rule 2: described the pre-pivot
   flat M3 system. The shipped Danza/Nocturne systems use `shadow-lg`/
   `shadow-2xl` for real card elevation and `blur-3xl` for the ambient
   "bokeh glow" treatment (~30 theme-colored orbs site-wide — `DESIGN.md`
   §25/§26/§29) as a deliberate, client-confirmed part of the visual
   language. Current rule: **shadows/blurs are allowed where `DESIGN.md`'s
   current system specifies them** — still never an arbitrary hand-picked
   value outside that system (rule 4).
4. **Design tokens are the only source of color/type/spacing values.** Never
   hardcode a hex code, px font-size, or arbitrary Tailwind value in a
   component — extend the Tailwind theme from the tokens in `DESIGN.md` and
   consume them by name.
5. **Copy lives in typed data files, not JSX.** Components read from
   `src/content/*.ts`. This keeps every page swappable/CMS-ready later and
   keeps content review separate from layout review.
6. **No secrets committed.** API keys, form endpoints, email credentials go in
   `.env.local` (gitignored) with a matching `.env.example` documenting the
   variable name only.
7. **No new dependency without updating this file.** Section 4 is the
   approved package list. Adding anything else requires a one-line addition
   here explaining why, in the same PR/commit.
8. **Every route must work with placeholder content and zero external
   services configured** (no email API key, no CMS token). Forms degrade to a
   visibly-labeled "not yet connected" state rather than failing silently or
   pretending to succeed.
9. **Accessibility is not optional:** semantic landmarks, alt text on every
   image (real, descriptive — not filenames), visible focus states, color
   contrast per WCAG AA even against the warm sand background, keyboard
   operability for the nav and any interactive card.
10. **Real photography only for real content.** Assets in `assets/source/`
    (founder portrait, logo, performance photos) are the real brand's actual
    photos and may be used. Do not source or fabricate stock photography to
    stand in for a real person, event, or credential.

---

## 2. Tech stack (decided, not open for silent substitution)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router), TypeScript** | Static-first marketing site today, room to grow into a booking form + light API routes without a rewrite. |
| Styling | **Tailwind CSS v4**, theme tokens defined via the CSS-first `@theme` block in `globals.css` (Tailwind v4's config model — no `tailwind.config.ts`), extended from `DESIGN.md` tokens | Matches the token-driven, no-shadow/no-radius system Stitch specified; no CSS-in-JS; this is what `create-next-app` scaffolds by default for this Next.js version, confirmed at setup time — see §10 change control. |
| Fonts | `next/font/google`, self-hosted, all 3 applied at the root layout: **Plus Jakarta Sans** (sitewide chrome/§9-era pages), **Playfair Display** (Danza Theatrical headlines), **Hanken Grotesk** (Nocturne Stage body/headlines). **One deliberate exception**: Material Symbols (icon font) is *not* in `next/font/google`'s catalog, so it's a runtime `<link>` to Google Fonts in `layout.tsx` — subsetted to only the ~55 icons actually used (`&icon_names=…`, TODO.md Phase 3.2) rather than the full 4,239-glyph catalog, with a `preconnect` hint. | Font *files* are still self-hosted with no runtime request or layout shift wherever `next/font` can serve them; Material Symbols is the sole exception because it isn't in that catalog, not a rule violation — see `app/fonts.ts` for the 3 self-hosted fonts. |
| Content | Local typed TS data modules under `src/content/` | No CMS yet. Structured so a future CMS (Sanity/Contentful) is a data-source swap, not a rewrite. |
| Forms | Formspree (client POST via `src/lib/submitEnquiry.ts`), falling back to a Next.js Route Handler stub (`src/app/api/contact/route.ts`) when unconfigured | See §8. Client-requested backend, no new dependency (plain `fetch`). |
| Package manager | **npm** | Universal, no assumption about the user having pnpm/yarn installed. |
| Linting/formatting | ESLint (`next/core-web-vitals`) + Prettier | Default Next.js setup, no extra config debt. |
| Deployment target | **Vercel** (client's account, project `princedancegroups`), deployed from GitHub Actions (`.github/workflows/deploy.yml`) | Changed from Netlify 2026-09-25 when the client set up their own Vercel account. The repo lives under a different GitHub account than that Vercel account, so Vercel's own Git integration can't watch it — the workflow deploys with the Vercel CLI instead. `netlify.toml` is left in place but unused. Do not deploy anywhere else without explicit user confirmation. |

Nothing here is a placeholder guess to be revisited later — this is the stack.
If it must change, edit this table first.

---

## 3. Directory structure

```
Prince Dance Group/
├── ARCHITECTURE.md          # this file — binding setup rules
├── CLAUDE.md                # session orientation for Claude Code
├── DESIGN.md                # design system (tokens, type, components, site map)
├── PROGRESS.md              # phase checklist, decisions log, current status
├── assets/
│   └── source/               # raw real-world source material — never imported directly by app code
│       └── images/           # extracted from old site PDFs: logo, founder photo, performance photos, testimonial headshots
├── old website.pdf           # Wayback capture of princedancegroups.com — source of truth for content
├── Services - princedancegroups.pdf
└── app/                       # the Next.js project root (created in Phase 1 — see PROGRESS.md)
    ├── public/
    │   └── images/            # optimized, web-ready copies of assets/source/images
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx                 # Home
    │   │   ├── globals.css              # Tailwind v4 import + @theme token block copied from DESIGN.md
    │   │   ├── about/page.tsx
    │   │   ├── services/page.tsx
    │   │   ├── services/[slug]/page.tsx
    │   │   ├── gallery/page.tsx
    │   │   ├── journal/page.tsx
    │   │   ├── journal/[slug]/page.tsx
    │   │   ├── contact/page.tsx
    │   │   └── api/contact/route.ts
    │   ├── components/
    │   │   ├── ui/            # primitive, content-agnostic (Button, Badge, Input, Divider)
    │   │   ├── layout/         # Header, Footer, Nav, Section shell
    │   │   └── sections/       # page-specific composed blocks (Hero, ServiceGrid, TestimonialWall, StatsRow)
    │   ├── content/            # typed copy: services.ts, testimonials.ts, gallery.ts, journal.ts, site.ts
    │   └── lib/                # utilities (formatting, metadata helpers)
    ├── next.config.ts
    ├── package.json
    ├── .env.example
    └── eslint.config.mjs
```

**Rule:** the Next.js project lives in `app/` inside this repo (not at the repo
root) so that `ARCHITECTURE.md`, `DESIGN.md`, `PROGRESS.md`, `CLAUDE.md`, and
`assets/source/` stay clearly separated from the buildable codebase. Do not
flatten this without updating this section.

---

## 4. Approved dependencies (Phase 1 baseline)

Runtime: `next`, `react`, `react-dom`.
Dev: `typescript`, `@types/react`, `@types/react-dom`, `@types/node`,
`tailwindcss`, `@tailwindcss/postcss`, `eslint`, `eslint-config-next`.

<!-- TODO.md Phase 8 (2026-09-22): corrected against the actual
     package.json — this line originally listed `postcss`/`autoprefixer`/
     `prettier`, none of which `create-next-app` actually installed for
     this Next.js/Tailwind v4 combination (`@tailwindcss/postcss` is
     Tailwind v4's own PostCSS plugin and supersedes the old
     postcss+autoprefixer pairing; prettier was never added).
     `@types/react-dom` was also missing from the original list. Same
     "confirmed at setup time" caveat §2's own tech-stack table already
     carries. -->

Still genuinely true as of this correction: **zero packages have been added
beyond this baseline** — every dependency-shaped need so far (focus traps,
lightboxes, social/brand icons, JSON-LD) was hand-rolled instead (see
`TODO.md`'s "Explicitly decided against" section for the specific
libraries considered and rejected, with reasons). Anything beyond this
baseline (animation library, form library, icon set, CMS client,
analytics) is still added deliberately, one at a time, with a line added
to this table and a reason:

| Package | Reason |
|---|---|
| _(none yet)_ | |

---

## 5. Component conventions

- `components/ui/*` — no business content, no data fetching, fully reusable
  (e.g. `Button`, `Badge`, `Divider`, `SectionLabel`). Props only.
- `components/layout/*` — structural chrome shared across every page (Header,
  Footer, MobileNav).
- `components/sections/*` — a named block that composes `ui` primitives with
  data pulled from `src/content/*`. One section = one default export = one
  file. A page (`app/**/page.tsx`) is a thin composition of sections, never a
  wall of inline JSX.
- Server Components by default. Add `"use client"` only where interaction
  requires it (nav toggle, form, hover-triggered state) — keep that boundary
  as low in the tree as possible.
- File naming: `PascalCase.tsx` for components, `camelCase.ts` for content and
  lib modules, `kebab-case` for routes (already enforced by Next's folder
  routing).

## 6. Content conventions

- Every page's copy resolves from `src/content/<domain>.ts` — typed exports,
  e.g. `export const services: Service[]`.
- Real facts confirmed from source material (address, phone, email, founder
  name, IGT win, service list) go in directly. Anything not yet supplied by
  the client is a typed field left as `""` with an adjacent
  `// TODO(content): ...` comment — never filled with invented specifics.
- Testimonials from public figures (Naveen Patnaik, V.K. Pandian, Shah Rukh
  Khan, Sonali Bendre, Kirron Kher, Shekhar Kapur, Dharmendra) are carried
  forward from the real, previously-published site. Their photos are staged
  in `assets/source/images/testimonials/` but **not wired into the UI by
  default** — ship text-only attributed quotes; using a public figure's
  photo in ongoing marketing should get an explicit go-ahead from the client
  first. Flagged again in `PROGRESS.md`.

## 7. Design token pipeline

`DESIGN.md` is the single source of truth for color, type, spacing, and
component styling. `src/app/globals.css`'s `@theme` block (Tailwind v4's
CSS-first config model) defines color and typography as `--color-*` /
`--font-*` / `--text-*` custom properties, copied verbatim. `--radius-none:
0px` / `--radius-full: 9999px` are the only two radius values defined — no
intermediate radius scale. **Spacing is the one exception:** DESIGN.md's
named scale (xxs–4xl) is implemented via Tailwind's built-in *numeric*
spacing utilities (`gap-6`, `p-10`, …), not custom `--spacing-sm/md/lg/…`
theme keys — Tailwind v4 already uses those exact names internally for its
`max-w-*`/`w-*`/`size-*` scale, and redefining them broke `max-w-md`
app-wide the first time this was tried. See DESIGN.md §4 for the
name-to-number mapping and page-gutter tokens, which *are* real custom
theme keys since they don't collide with a Tailwind default.

## 8. Forms & backend policy

**Formspree is the chosen form backend** (explicit client request,
2026-09-21 — see `TODO.md` Phase 0.1). Every enquiry form
(`src/components/sections/home/EventEnquiry.tsx`,
`src/components/sections/contact/EnquiryForm.tsx`,
`src/components/sections/services/WeddingEnquiryForm.tsx`,
`src/components/layout/BookingModal.tsx`) calls the shared
`src/lib/submitEnquiry.ts` helper, which:

1. POSTs directly to `https://formspree.io/f/<NEXT_PUBLIC_FORMSPREE_ID>`
   as flat named fields (not a single joined message blob — Formspree
   renders one row per field) when that env var is configured. No new
   dependency — plain `fetch`, same as the previous approach. This is a
   public form ID by design (Formspree endpoints are meant to be called
   from the browser), not a secret.
2. Falls back to the existing `src/app/api/contact/route.ts` stub when
   `NEXT_PUBLIC_FORMSPREE_ID` is unset, which validates input and returns
   a clear "not yet connected" response rather than silently no-op-ing or
   pretending to succeed — the honest-degradation behavior required by
   §1 rule 8 still holds either way.

Every form includes a hidden `_gotcha` honeypot field (Formspree's own
spam-filtering convention) — no captcha or rate limiting beyond that yet.

A WhatsApp deep link to the real business numbers `+91 98611 80053` /
`+91 82709 23491` is a separate `TODO.md` item (Phase 1.1), not a
replacement for the enquiry forms.

## 9. Deployment

Target is **Vercel** (client's account; project `princedancegroups`, Root
Directory `app`, Framework Preset Next.js — also pinned in `app/vercel.json`).
Every push and pull request runs **CI** (`npm ci`, `npm run lint`,
`npm run build`) via `.github/workflows/deploy.yml`; a push to `main` that
passes is then **deployed to production** with the Vercel CLI
(`vercel pull` → `vercel build --prod` → `vercel deploy --prebuilt --prod`).

One-time setup, done by a person (not committed): add three repository
secrets under GitHub → Settings → Secrets and variables → Actions —
`VERCEL_TOKEN` (created in the client's Vercel account), `VERCEL_ORG_ID`
(`team_9wYvBk6micnIHMOVLngxALCz`) and `VERCEL_PROJECT_ID`
(`prj_8jYWRwX8YmEmKAY8lRkLAkePQVMr`). Until the token exists the deploy job
skips itself with a notice; CI still runs.

Environment variables live in the **Vercel project** (Settings → Environment
Variables), never in the repo or the workflow: `NEXT_PUBLIC_SITE_URL`,
`NEXT_PUBLIC_FORMSPREE_ID`. `vercel pull` brings them into the build, and
`NEXT_PUBLIC_*` values are baked in at build time.

Manual fallback: from the repo root, logged into the client's Vercel account,
`vercel --prod --yes` (run from the root, not `app/` — the project's Root
Directory setting already adds `app`).

## 10. Change control

Any of the following requires editing this file first, then acting:
adding a dependency, changing the framework/styling approach, changing the
directory layout, changing the deployment target, or reversing any rule in
§1. Silent drift between this document and the codebase is treated as a bug.
