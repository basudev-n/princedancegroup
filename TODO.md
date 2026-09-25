# TODO.md — Prince Dance Group Website

Phased build plan. Created 2026-09-21 from a full-project audit (SEO,
content/repetition, features/integrations/accessibility) plus direct
verification of every serious claim against the source.

**Read first:** `ARCHITECTURE.md` (binding rules) → `CLAUDE.md`
(orientation) → `DESIGN.md` (visual system) → `PROGRESS.md` (status +
decisions log). This file is the *forward* plan; `PROGRESS.md` remains the
record of what actually landed. When an item here ships, tick it here
**and** log it in `PROGRESS.md`.

## Legend

| Mark | Meaning |
|---|---|
| **S / M / L** | Effort: under an hour / half a day / a day or more |
| **High / Med / Low** | Impact on bookings, correctness, or discoverability |
| 🔒 | **Blocked on client input** — do not proceed by inventing the missing fact (`ARCHITECTURE.md` §1 rule 1) |
| ⚠️ | Requires an `ARCHITECTURE.md` §4 dependency entry *before* the work |

---

## Executive summary — the five things that actually matter

1. ~~**No enquiry can reach the business.**~~ **Code-ready as of
   2026-09-21** — all four forms now call a shared Formspree integration
   with an honest fallback; the only missing piece is the client creating
   a Formspree account and supplying `NEXT_PUBLIC_FORMSPREE_ID`. See
   Phase 0.1.
2. **The site states facts that aren't confirmed.** Three contradictory
   invented troupe-size ladders, "Worldwide Touring Ensembles", a
   "26-artist" cast claim, a promised technical rider that doesn't exist,
   and — most seriously — **two different acts are each credited with
   winning India's Got Talent**, the business's single claim to fame.
   These are `ARCHITECTURE.md` §1 rule 1 violations currently live.
   → Phase 0.3.
3. **Nothing is shareable or discoverable.** Zero Open Graph tags on all
   21 routes (every WhatsApp/Facebook share renders as a bare grey link),
   zero canonicals, and a sitemap that will bake in `localhost:3000` if
   deployed as-is — worse than having no sitemap. → Phase 2.
4. **5 photos are doing the work of 30.** Only 5 real performance photos
   exist; they appear in **33 placements** across 12 pages.
   `krishna-leela-1.jpg` appears **4 times on the Home page alone**, and
   `/services/corporate-events` and `/services/school-college-function`
   are visually identical. No layout work fixes this — it needs
   photography. → Phase 6.1 🔒.
5. **Accessibility has real, fixable gaps.** No `prefers-reduced-motion`
   handling at all despite 32 continuously-animating blurred orbs; the
   global focus ring is `#0051d5` on `#0d0e12` (2.88:1 — effectively
   invisible on every page); no skip link; neither modal traps or
   restores focus. → Phase 3.

---

## Phase 0 — Launch blockers ✅ code-complete 2026-09-21 (3 items left, all client-blocked)

Nothing should be deployed until this phase is done. These are either
"the site cannot do its job" or "the site says something untrue."

**Status:** every actionable item is done — the invented-fact violations
are removed, forms are migrated to Formspree with an honest fallback,
`netlify.toml` and the `NEXT_PUBLIC_SITE_URL` build guard are in place,
`error.tsx` exists, and dead code is gone. `npm run build` + `npm run lint`
clean throughout; every change verified in-browser. What's left cannot be
done without the client: create the Formspree form
(`NEXT_PUBLIC_FORMSPREE_ID`), confirm expected enquiry volume, and supply
the real production domain (`NEXT_PUBLIC_SITE_URL`) — see the Client Input
Register at the bottom of this file. Moving on to Phase 1.

### 0.1 Connect the forms to Formspree ← *explicitly requested*

Current state: `app/src/app/api/contact/route.ts` returns 501 twice over —
once because `RESEND_API_KEY`/`CONTACT_TO_EMAIL` are unset, and again at
line 45 where the actual send is still a `TODO(integration)` stub. So even
configuring Resend today would still fail.

**Approach — direct client POST (recommended over a server proxy):**
point each form at `https://formspree.io/f/<FORM_ID>` with
`Accept: application/json`. No new dependency (plain `fetch`, exactly as
today — `@formspree/react` is unnecessary and would need an §4 entry). It
also survives a future `output: "export"`, which a server-proxy approach
would not.

- [x] **DONE 2026-09-21 (code side).** Built `src/lib/submitEnquiry.ts` — a
      shared helper all four forms now call. It POSTs flat named fields
      (name/phone/email/eventNature/eventDate/troupeSize/etc. — no more
      joined `message` blob) directly to
      `https://formspree.io/f/<NEXT_PUBLIC_FORMSPREE_ID>` when that env var
      is set; until it is, every form transparently falls back to the
      existing honest `/api/contact` stub — verified end-to-end in-browser
      (submitted Home's `EventEnquiry` and the header `BookingModal`, both
      correctly hit `/api/contact`, got a 501, and rendered the honest
      "not connected" message). `_subject` included so a real inbox can
      triage by event type at a glance.
- [ ] Create the Formspree form; put the ID in `NEXT_PUBLIC_FORMSPREE_ID`. **S** 🔒 *(only remaining step — code is ready)*
- [x] **DONE 2026-09-21.** Migrated all four live forms
      (`home/EventEnquiry.tsx`, `contact/EnquiryForm.tsx`,
      `services/WeddingEnquiryForm.tsx`, `layout/BookingModal.tsx`) to call
      `submitEnquiry()`. The five-state `Status` type now lives in one
      place (`EnquiryStatus`, re-exported per-file as `Status` to keep each
      file's own JSX unchanged) instead of being redeclared identically in
      four files.
- [x] **DONE 2026-09-21.** Added the hidden `_gotcha` honeypot input (exact
      markup from this checklist) to all four forms' JSX, and
      `submitEnquiry()` checks it first — a filled honeypot silently
      reports success without sending anything, so a bot gets no signal
      its submission was rejected. Confirmed in-browser: `display: none`,
      `tabIndex: -1`, `aria-hidden: true`.
- [x] **DONE 2026-09-21.** `app/.env.example` now documents
      `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_FORMSPREE_ID` (with a note that
      it's public-by-design, not a secret), and the legacy
      `RESEND_API_KEY`/`CONTACT_TO_EMAIL` fallback pair.
- [x] **DONE 2026-09-21.** Kept `app/src/app/api/contact/route.ts` as the
      fallback (not deleted) — it's the honest "not connected yet" path
      used whenever `NEXT_PUBLIC_FORMSPREE_ID` is unset, which is the
      current state. Loosened its validation to accept the new flat
      payload shape (name + phone-or-email, `message` no longer required)
      and fixed the "studio" wording in its 501 response.
- [ ] Confirm expected enquiry volume — Formspree's free tier caps at
      **50 submissions/month**. **S** 🔒
- [x] **DONE 2026-09-21.** Rewrote `ARCHITECTURE.md` §8 (forms policy) and
      the §2 tech-stack table's Forms row to describe the Formspree
      approach in place of the old Resend-stub plan.

### 0.2 Deploy configuration

- [x] **DONE 2026-09-21.** Added `netlify.toml` at repo root
      (`base = "app"`, `publish = ".next"`, `command = "npm run build"`).
- [ ] **Set `NEXT_PUBLIC_SITE_URL` in Netlify before the first deploy.**
      `layout.tsx`, `sitemap.ts`, `robots.ts` all fall back to
      `http://localhost:3000` locally. Because every page is statically
      generated, deploying without it bakes localhost URLs into
      `/sitemap.xml`, `/robots.txt`, and every OG/canonical tag — i.e.
      submitting 21 unreachable URLs to Google. **S / High** 🔒 *(needs the
      domain — the build-time guard below now makes this impossible to
      miss silently)*
- [x] **DONE 2026-09-21.** Added `src/lib/siteUrl.ts`, a shared helper
      (`layout.tsx`/`sitemap.ts`/`robots.ts` all import from it instead of
      each defining their own fallback) that throws a clear build-time
      error if `NEXT_PUBLIC_SITE_URL` is missing **and** `NETLIFY=true` is
      set (Netlify's own build environment sets this) — so a real Netlify
      deploy fails loudly instead of shipping localhost URLs, while a
      local `npm run build` (no `NETLIFY` var) still falls back safely for
      testing. Verified both directions: `NETLIFY=true npm run build`
      without the var throws with the exact intended message; with
      `NEXT_PUBLIC_SITE_URL` set alongside it, the build succeeds.
- [x] Verified for the record: `/api/contact` *would* run on Netlify today
      (no `output: "export"`; it builds as a dynamic server route and the
      Netlify Next Runtime deploys route handlers as Functions). Noted
      because it changes if anyone adds static export later.

### 0.3 Remove unconfirmed / contradictory facts

All verified present in the source. Each is an `ARCHITECTURE.md` §1 rule 1
violation shipping live.

- [x] **DONE 2026-09-21.** Two acts both claimed the IGT Season 1 win.
      Not actually a client-input item — `PROGRESS.md`'s own confirmed-facts
      table and `content/gallery.ts:14` already establish the winning act
      was the *Krishna Act / Krishna Leela*; Dashavatar's copy in
      `gallery/RepertoireActs.tsx`, `services/WeddingActs.tsx`, and the
      (dead-code) `content/home.ts` repertoire entry were the ones wrongly
      claiming the win. Removed the false claim + the "IGT Season 1 Climax"
      badge from all three; Krishna Leela's existing "original
      award-winning act" line is now the only claim on the site. **S / High**
- [x] **DONE 2026-09-21.** Three contradictory invented troupe-size
      ladders removed from `home/EventEnquiry.tsx`, `contact/EnquiryForm.tsx`,
      `services/WeddingEnquiryForm.tsx`. Each `<SelectField>` (fabricated
      numeric brackets) replaced with a plain optional `<TextField>` —
      "e.g. 20 performers — leave blank and we'll recommend a size" — so no
      unconfirmed capacity is asserted. `WeddingEnquiryForm.tsx`'s now-unused
      local `SelectField` helper deleted too. Verified in-browser on all
      three forms via the live DOM (`<input type="text">`, correct
      placeholder). **S / High**
- [x] **DONE 2026-09-21.** Unconfirmed international-touring language
      removed from all three: `home/Hero.tsx` ("world tours" →
      "cultural festivals" — a real service category, Mahotsavs);
      `about/CTA.tsx` ("Worldwide Touring Ensembles" → "Complete Cast &amp;
      Crew"); `gallery/TechnicalRequirements.tsx` ("Global Touring
      Production" eyebrow → "Production Requirements"). No client input
      needed — this was pure removal, no replacement claim invented.
      **S / High**
- [x] **DONE 2026-09-21.** "Signature 26-artist choreography" in
      `contact/ContactSidebar.tsx` → "Cast size on request", matching the
      honest convention used everywhere else on the site (26 is the
      original 2009 troupe size, not a confirmed cast for this specific
      act). **S / High**
- [x] **DONE 2026-09-21** (opportunistic — same badge row as the touring
      fix above). "Official Technical Rider Provided" → "Technical
      Requirements Shared on Enquiry", matching the honest "confirmed on
      enquiry" language already used on Gallery/Contact. **S / Med**
- [x] **DONE 2026-09-21.** "Opus No. 01 / 04 / 07" removed from all three
      hero acts in `gallery/RepertoireActs.tsx` (data field + its JSX span +
      the now-redundant flex wrapper). **S / Low**
- [x] **DONE 2026-09-21** (as part of the Formspree migration, 0.1 batch
      3). `/api/contact`'s 501 copy no longer says "studio" — rewritten to
      mention `NEXT_PUBLIC_FORMSPREE_ID` and "contact us directly by
      phone." **S / Med**

### 0.4 Crash safety & dead code

- [x] **DONE 2026-09-21.** Added `app/src/app/error.tsx` — branded
      (Danza tokens, matching `not-found.tsx`), with a "Try Again" `reset()`
      button, a Home link, and the same `tel:` fallback. Confirmed compiled
      into the build output. **S / Med**
- [x] **DONE 2026-09-21.** Deleted (147 lines, reconfirmed zero real
      importers before removal). Updated the one stale comment in
      `EventEnquiry.tsx` that referenced it. **S / Med**
- [x] **DONE 2026-09-21.** Deleted (reconfirmed nothing reads past
      `teamMembers[0]` first). **S / Low**

---

## Phase 1 — Contact channels & conversion ✅ code-complete 2026-09-21 (3 items left, all client-blocked)

**Status:** WhatsApp is live in three places (floating button, mobile
menu, footer), social icons are built and wired (rendering nothing until
real handles arrive), click-to-call now covers the header and mobile
menu, every form's error state offers a direct call/WhatsApp link, and
Contact has a real, accuracy-checked map embed. `npm run build` +
`npm run lint` clean throughout; every change verified in-browser,
including a real map-accuracy bug caught and fixed during verification.
What's left is entirely client-owned: confirm the WhatsApp Business
number, supply real social handles, and pick an analytics provider — see
the Client Input Register. Moving on to Phase 2.

### 1.1 WhatsApp — highest-ROI missing integration

Exactly **one** `wa.me` link exists site-wide
(`contact/ContactSidebar.tsx:31,135`), as a small gold text link inside a
card on `/contact`. It's invisible from Home, Services, Gallery, Journal,
About, and the mobile menu. For an Indian event-booking business WhatsApp
is the default enquiry channel — the site's own copy concedes this (every
form labels the field "Phone / WhatsApp"; email was deliberately demoted
to optional because phone is primary).

- [x] **DONE 2026-09-21.** Built `components/layout/WhatsAppButton.tsx` — a
      persistent floating button (bottom-right, 56×56px, `z-30` so it sits
      correctly below the mobile nav panel and `BookingModal` when either
      is open) with the exact prefilled message specified, mounted
      site-wide in `layout.tsx`. Verified in-browser: correct `wa.me` URL
      with the right number and URL-encoded message, icon renders cleanly
      (not garbled).
- [x] **DONE 2026-09-21.** Added a "Chat on WhatsApp" button to the mobile
      menu (`Header.tsx`, right after "Book for Events") and a WhatsApp
      link to the Footer's "Get in Touch" column, both using the same
      `wa.me` deep link. Verified all three WhatsApp entry points
      (floating button, mobile menu, footer) render the identical correct
      URL via a live DOM query.
- [x] Confirm which of the two numbers is the WhatsApp Business line.
      **DONE 2026-09-24.** Client (Murali Sahu) confirmed +91 82709 23491
      is the dedicated WhatsApp line — and also gave a third,
      previously-unknown number (+91 96924 53808) as the real general
      calling/booking line, and confirmed +91 98611 80053 as the
      founder's own direct number rather than a second interchangeable
      public line. `content/site.ts`'s `phones` array replaced with
      explicit `phone`/`whatsapp`/`founderPhone` fields; every `tel:` and
      `wa.me:` link site-wide (~16 call sites) now points at the correct
      one instead of one ambiguous shared value. See PROGRESS.md's
      decisions log for the full file list. **S**

### 1.2 Social icons — Footer + hamburger menu ← *explicitly requested*

`content/site.ts:30-35` holds four empty strings with a `TODO(content)`.
No social icons render anywhere today.

- [x] **DONE 2026-09-21.** Built `components/ui/icons/BrandIcons.tsx`
      (WhatsApp, Facebook, Instagram, YouTube, X — inline SVG, zero new
      dependency, confirmed §4-clean) and
      `components/ui/SocialIcons.tsx`. WhatsApp and Facebook use their
      real widely-reproduced glyph paths; Instagram/YouTube/X are built
      from simple geometric primitives (rounded square+circle+dot,
      rounded rect+triangle, crossed strokes) rather than memorized
      complex trademarked bezier curves, so every icon is guaranteed to
      render correctly rather than risk a subtly malformed path — visually
      confirmed clean (not garbled) in-browser at both the FAB's 28px size
      and the footer's 14px size.
- [x] **DONE 2026-09-21.** `<SocialIcons />` added to the Footer's Brand
      column, right after the existing badge row.
- [x] **DONE 2026-09-21.** `<SocialIcons />` added to the mobile menu,
      right after the WhatsApp button (which sits right after "Book for
      Events").
- [x] **DONE 2026-09-21.** Matches the spec exactly: `<nav aria-label="Social media">`
      wrapper, each link `aria-label="Prince Dance Group on <Platform>"`,
      icons `aria-hidden="true" focusable="false"` (baked into each icon
      component so call sites can't forget it), `target="_blank"` +
      `rel="noopener noreferrer"`, 44×44px (`h-11 w-11`) hit area.
- [x] **DONE 2026-09-21.** `SocialIcons` filters `platforms` to only
      entries with a non-empty `href` and returns `null` if none remain —
      confirmed in-browser: renders nothing at all right now (all four
      `site.social` values are still empty), no empty gap/artifact in
      either the Footer or mobile menu. Starts working the moment real
      handles land in `content/site.ts` — no other code change needed.
- [x] Get the real handles/URLs. **DONE 2026-09-25.** Client supplied
      Facebook, Instagram, and YouTube profile URLs (tracking params
      stripped). Icons now render in the Footer and mobile menu, plus a
      new "Follow Us" row in the Contact sidebar (Nocturne-styled `tone`
      variant of `SocialIcons`), and `sameAs` is populated in the
      PerformingGroup JSON-LD. **No X/Twitter account was provided** —
      that icon stays hidden until one exists. **S**

### 1.3 Click-to-call coverage

`tel:` links exist in 7 places but **not in the sticky header or the
mobile menu** — the two places a visitor on any page can always reach.
`phones[1]` (`+91 82709 23491`) appears nowhere as a link outside
`ContactSidebar`.

- [x] **DONE 2026-09-21.** Added a `tel:` icon button to the desktop
      header (`hidden lg:flex`, same breakpoint as the primary nav, right
      before "Book for Events") and restructured the mobile menu's single
      WhatsApp button into a 2-column "Call Us" / "WhatsApp" row.
      Confirmed via live DOM query (`href="tel:+919861180053"` present and
      correctly placed).
- [x] **DONE 2026-09-21.** Added a "reach us directly — call us / WhatsApp
      us" link line to the not-connected/error states of all four forms
      (`home/EventEnquiry.tsx`, `contact/EnquiryForm.tsx`,
      `services/WeddingEnquiryForm.tsx`; `layout/BookingModal.tsx` already
      had an always-visible `tel:` link above its form, so it got the
      WhatsApp option added to its error state instead of a duplicate
      `tel:`). Verified end-to-end: submitted Home's `EventEnquiry` with
      Formspree unconfigured, confirmed the resulting not-connected state
      renders both `call us` (`tel:+919861180053`) and `WhatsApp us`
      (`https://wa.me/919861180053`) as real, correctly-hrefed links. **S / Med**

### 1.4 Analytics — none exists

Grep for `gtag|analytics|googletagmanager|plausible|posthog` across
`app/src/` returns zero hits. The client will have no idea which of the 9
services drives enquiries, whether the `?interest=` deep links are used,
or whether mobile converts.

- [ ] Pick one: **Netlify Analytics** (server-side, zero code, zero
      dependency, no cookie banner needed — recommended first) /
      **Plausible or Fathom** (one script tag, cookieless, paid) / **GA4**
      via `@next/third-parties` (free, richer, ⚠️ new dependency + cookie
      consent obligations). **S / High** 🔒 *(client preference)*

### 1.5 Map on Contact

- [x] **DONE 2026-09-21.** Embedded a real map in `ContactSidebar.tsx`
      between the contact card and the assurances card — no API key, no
      dependency, `loading="lazy"`, a real descriptive `title`. **Found a
      real accuracy bug while verifying visually**: the natural first
      attempt (the full compound address — building name + "in front of
      X" + town) doesn't geocode cleanly without an API key, and forcing a
      close zoom on it landed the map on the wrong nearby village with no
      recognizable label — worse than not showing a map at all. Fixed by
      using a separate, simpler `mapEmbedQuery` (just the town + pincode,
      derived from the same real address fields already in
      `content/site.ts` — not a new fact) at a town-level zoom (`z=13`),
      re-verified in-browser: the map now correctly centers on and labels
      "Gopalpur." The existing "Get Directions" search link is untouched
      (a search results page can handle the fuller address interactively;
      a bare embed can't). **S / Med**

---

## Phase 2 — SEO foundation ✅ code-complete 2026-09-21 (1 item left, client-owned)

### 2.1 Pre-deploy must-fix ✅ all 7 items done 2026-09-21

- [x] **DONE 2026-09-21.** Added `alternates: { canonical: ... }` to all
      21 routes: a sitewide default (`"/"`) on the root `layout.tsx`
      (covers Home, which has no metadata export of its own), explicit
      per-page canonicals on all 5 top-level static pages, the 3 legal
      pages, and both dynamic route generators
      (`services/[slug]`, `journal/[slug]`). Verified in-browser via
      `document.querySelector('link[rel="canonical"]')` on both Home
      (resolves to `/`) and a dynamic route
      (`/services/wedding-events` → correct full URL via `metadataBase`).
      **S / High**
- [x] **DONE 2026-09-21.** Added sitewide `openGraph` + `twitter` metadata
      to root `layout.tsx` (real default image, see next item), plus
      per-page overrides on `/about` (founder photo) and every journal
      article (`journal/[slug]/generateMetadata` — each article's own
      real photo, not the sitewide default). Verified via live DOM query
      on all three: Home shows the sitewide `krishna-leela-2.jpg`
      og:image; `/about` correctly overrides to
      `founder-krishna-mohan-reddy.jpg`; a journal article correctly
      overrides to its own image (`igt-legacy.jpg`) with `og:type=article`.
      **M / High**
- [x] **DONE 2026-09-21** (landed together with the item above — same
      change). OG image wired: `gallery/krishna-leela-2.jpg` (1800×1200,
      full troupe) as the sitewide default, `brand/founder-krishna-mohan-
      reddy.jpg` for `/about`, each of the three `journal/*.jpg` per
      article. **S / High**
- [x] **DONE 2026-09-21.** Generated `app/src/app/icon.png` (400×400, the
      real logo crest, alpha-transparent) and `apple-icon.png` (180×180,
      resized down for Apple's convention) from
      `public/images/brand/logo-crest.png`; deleted the stale
      `create-next-app` scaffold `favicon.ico`. Next.js's file-based icon
      convention picks these up automatically — no manifest/metadata code
      needed. Verified: both appear as real build routes
      (`/icon.png`, `/apple-icon.png`), both resolve `<link rel="icon">`/
      `<link rel="apple-touch-icon">` tags in the live DOM, and both serve
      as real, correctly-sized `image/png` responses (196,979 and 59,748
      bytes respectively, matching the generated files exactly). One
      known nuance, not a bug: the apple-touch-icon keeps its alpha
      transparency (Apple's own convention recommends an opaque
      background since iOS doesn't render icon transparency specially —
      it just fills transparent areas with black, which reads fine here
      since the crest already sits on a dark background everywhere else
      on the site). **S / Med**
- [x] **DONE 2026-09-21.** Added `aria-hidden="true"` to all 96 Material
      Symbols spans site-wide (39 files) via a script, not hand-editing —
      matched both the common `className="material-symbols-outlined ..."`
      form and the one template-literal-className form
      (`Header.tsx`'s active-state nav icon). Verified two ways: a
      structural check (parse every `<span>` opening tag containing
      `material-symbols-outlined`, confirm `aria-hidden` is present in
      that same tag — 0 misses across the whole codebase) and a live
      in-browser DOM check on Home (52 rendered icon spans, 0 missing the
      attribute). **S / High**
- [x] **DONE 2026-09-21.** `Footer.tsx`'s address now renders all four
      fields (`line1, line2, state — pin`), matching `ContactSidebar.tsx`'s
      complete address and its own maps link, which already used the full
      address — the visible text and the link destination now agree.
      (The "stray space" specifically wasn't reproducible in the current
      source — no literal space existed there — so nothing to fix on that
      detail.) Phone: footer already shows only `phones[0]`, which is the
      same number used as "primary" everywhere else on the site
      (WhatsApp, `BookingModal`, `not-found.tsx`) — already consistent, no
      change needed. Verified in-browser: footer now reads "Art
      Performing Building, In front of Pantho Niwas, Gopalpur, Odisha,
      India — 761002". **S / High**
- [x] **DONE 2026-09-21.** Added `robots: { index: false, follow: true }`
      to all 3 legal pages and the journal article `generateMetadata`, and
      removed all 6 from `sitemap.ts` (`/journal` itself, the list page,
      stays — it's not a placeholder, just its 3 children are). Verified
      in-browser: `sitemap.xml` now lists 15 URLs (down from 21, all 6
      correctly excluded); a legal page and a journal article both render
      `<meta name="robots" content="noindex, follow">`. **S / High**

### 2.2 Metadata quality ✅ all 5 items done 2026-09-21

Every page has a unique title and description — that baseline is solid.
The problems are length and intent.

- [x] **DONE 2026-09-21.** All 5 titles rewritten exactly as suggested
      (`/about`, `/gallery`, `/contact`, `/services` using the literal
      suggestions above; `/journal` — not given an explicit suggestion in
      the original audit — got "Journal — Press, News & Milestones",
      matching the page's real content). Verified in-browser via the
      rendered tab title on `/services`. **S / High**
- [x] **DONE 2026-09-21.** Added an optional `seoTitle` field to
      `JournalEntry` (`content/journal.ts`) — same real headline, shorter
      wording, used only in the `<title>` tag; the on-page H1
      (`JournalArticleHeader`) and OG/Twitter cards still use the full
      real `title` (more room there, more informative when shared). All 3
      articles now have one. Verified in-browser: the article page's
      `<title>` renders the short version ("How Our India's Got Talent
      Win Changed TV — Prince Dance Group") while `document.querySelector('h1')`
      still returns the full real headline. **S / Med**
- [x] **DONE 2026-09-21.** Root `layout.tsx`'s sitewide description
      shortened from 217 to 155 chars — same real facts, tighter
      phrasing. Verified live: `document.querySelector('meta[name="description"]')`
      on Home returns the new 155-char string.
- [x] **DONE 2026-09-21.** Added a dedicated `metaDescription` field to
      all 9 entries in `content/services.ts` (real facts: service name,
      business name, the real IGT win, Odisha location — an
      enquire-style close, each under 160 chars) and wired it into
      `services/[slug]/generateMetadata` in place of `service.summary`.
      `summary` itself is untouched — it's real on-page marketing copy
      used in 3 components (`ServiceDetailHero`, `ServicesList`,
      `RelatedServices`), correctly left alone since this was a SERP-tag
      fix, not a content change. Verified in-browser:
      `/services/corporate-events`'s meta description is now 159 chars
      (down from 175) and mentions Odisha; the on-page summary text still
      renders unchanged. **S / Med**
- [x] **DONE 2026-09-21.** `not-found.tsx` now has its own `metadata`
      export — "Page Not Found — Prince Dance Group" (previously
      inherited the root default, so a 404 was titled identically to the
      homepage) plus `robots: { index: false }`. Verified in-browser: tab
      title and both meta tags render correctly on a genuinely
      nonexistent URL. **S / Low**

### 2.3 Crawl hygiene & local ✅ 2 of 3 done 2026-09-21 (GBP is client-owned)

- [x] **DONE 2026-09-21.** Added `lastModified` to every `sitemap.ts`
      entry — a single build-time timestamp (`new Date()`, captured once
      and reused for every route). There's no CMS or per-page edit
      history to draw a real per-route date from, so a shared
      build-timestamp is the honest signal available, not a fabricated
      per-page date. Verified live: every `<url>` in `/sitemap.xml` now
      carries a real `<lastmod>`. **S / Med**
- [x] **DONE 2026-09-21.** `/about`'s title didn't mention location at all
      (only its description did, via `site.origin`) — now reads "About
      Krishna Mohan Reddy — Berhampur, Odisha's IGT Champions". `/contact`
      had the reverse gap (title already said "Gopalpur, Odisha", but the
      description didn't) — now reads "Get in touch with Prince Dance
      Group, based in Gopalpur, Odisha, India, to book a performance for
      your event." Both derived from real `content/site.ts` fields, no
      new facts. Body copy: About already had solid coverage (Hero
      paragraph + a Timeline milestone both name Berhampur/Ganjam/Odisha
      explicitly) — left alone. Contact's body wasn't touched further:
      its own real address is Gopalpur specifically (not Berhampur — a
      different, real, but distinct fact, the founding town vs. the
      current address), so forcing "Berhampur" into Contact's page copy
      risked conflating two separate real facts rather than adding a
      genuine keyword opportunity; Gopalpur + Odisha already render there
      via the real address block. Verified in-browser: both new
      title/description strings render correctly. **S / Med**
- [ ] **Google Business Profile** — not created. Likely the highest-ROI
      local action available to this business, but it's off-site and
      client-owned. Blocked on confirmed hours, service area, primary
      category, and the social handles. **M / High** 🔒

---

## Phase 3 — Accessibility & performance

### 3.1 Accessibility

- [x] **DONE 2026-09-21.** Added the standard blanket
      `@media (prefers-reduced-motion: reduce)` block to `globals.css`
      (near-instant animation/transition durations, single iteration,
      `scroll-behavior: auto`) — covers all 32 `.animate-bokeh` instances,
      `animate-ping`/`animate-pulse`, and every `transition-*` class
      site-wide in one rule rather than auditing each element. Gated
      `Testimonials.tsx`'s 7s auto-advance separately (it's a JS
      `setInterval`, not a CSS animation, so the blanket rule can't reach
      it) behind `matchMedia("(prefers-reduced-motion: reduce)")`, with a
      lazy `useState` initializer for the first render and a `change`
      listener for mid-session OS toggles. Verified: the CSS rule is
      confirmed present in the loaded stylesheet via live DOM inspection;
      `matchMedia` support confirmed. **S / High**
- [x] **DONE 2026-09-21.** Added a proper `--color-focus-ring` token
      (`#ffffff`, defined in the `@theme` block per ARCHITECTURE.md §1
      rule 4 — not hardcoded in the rule itself) and pointed the global
      `:focus-visible` rule at it, replacing `var(--color-secondary)`
      (`#0051d5`, 2.88:1 on dark surfaces, a leftover M3 light-palette
      token). White was chosen over either system's own brand gold since
      it's a single sitewide rule covering both Danza and Nocturne pages,
      and reads at >15:1 against both systems' near-black surfaces
      without favoring either brand. Verified in-browser: tabbed to the
      first focusable element and confirmed a clearly visible white ring
      (screenshot-checked). **S / High**
- [x] **DONE 2026-09-21.** Added a skip-to-content link as the first
      `<body>` child in `layout.tsx` (`sr-only` until focused, then a
      visible pill matching the site's own Danza card styling), targeting
      a new `id="main-content"` on `<main>`. Verified in-browser: pressed
      Tab from a fresh page load, confirmed it's the very first focusable
      element (`document.activeElement`), links to `#main-content`
      (confirmed that id exists), and is visually revealed with the new
      focus ring around it (screenshot-checked). **S / High**
- [x] **DONE 2026-09-21.** Built a shared `useFocusTrap` hook
      (`components/ui/useFocusTrap.ts`, ~55 lines with comments — a
      hand-rolled hook rather than `focus-trap-react`/Radix, per this
      item's own guidance, since two call sites doesn't justify a new
      ARCHITECTURE.md §4 dependency) and wired it into both
      `BookingModal.tsx` and Home's `Gallery.tsx` lightbox. On open:
      focus moves to the first focusable element inside the dialog. While
      open: Tab/Shift+Tab wrap within the dialog's focusable descendants
      instead of escaping into the page behind it. On close: focus
      restores to whatever triggered the dialog. Verified end-to-end in
      both dialogs via live `document.activeElement` checks: opened
      `BookingModal`, confirmed focus landed on its Close button,
      Shift+Tab correctly wrapped to the last focusable element (the
      "call us now" link), Escape closed it and restored focus to the
      "Book for Events" trigger button; opened the Gallery lightbox from
      a specific photo tile, confirmed focus landed on Close, Tab/Tab/Tab
      correctly cycled Close → Previous → Next → **wrapped back to
      Close**, and Escape restored focus to the exact grid tile that had
      opened it. **M / High**
- [x] **Contrast fixes** (measured from `globals.css` tokens). **DONE
      2026-09-21.** `--color-on-surface-danza-dim` changed `#64748b`
      (4.05:1 on `surface-stage`, 3.65:1 on `surface-card` — both fail AA)
      → `#8b97a8` (5.31–6.51:1 across all three dark surfaces — no call
      sites changed, existing usages just render lighter). New
      `--color-danza-error: #fb7185` token (5.69–6.46:1 on
      `surface-card`/`surface-elevated`) added and wired into both
      `role="alert"` error paragraphs that were using decorative
      `danza-crimson` (~3.3–3.4:1, fails AA): `EventEnquiry.tsx` and
      `BookingModal.tsx`. Sanity-checked the parallel Nocturne error color
      (`nocturne-primary`, used by `contact/EnquiryForm.tsx` and
      `services/WeddingEnquiryForm.tsx`) — already 9.66–11.36:1, confirmed
      out of scope. All ratios computed programmatically (WCAG relative
      luminance formula), not eyeballed. `DESIGN.md` §31 added in the same
      change (documents this token set plus the earlier focus-ring/motion/
      focus-trap batches from this same Phase 3.1 pass). `npm run lint` +
      `npm run build` clean. Verified in-browser: `--color-on-surface-danza-dim`
      and `--color-danza-error` confirmed present on `:root` via
      `getComputedStyle`; footer bottom-bar text (copyright line, legal
      links) confirmed rendering `rgb(139, 151, 168)` (`#8b97a8`) live in
      the DOM; `.text-danza-error` utility confirmed generated and
      resolving to `rgb(251, 113, 133)` (`#fb7185`); triggered
      BookingModal's real submit flow in-browser (its `not-connected`
      status path, `role="status"`, muted text) to confirm the dialog's
      overall status-message rendering is unaffected — the `error`-status
      branch itself only fires on a genuine network/server failure, not
      reproducible against the local dev stub, so it was verified by
      confirming the exact class/token resolution above instead. **S / Med**
- [x] Form a11y. **DONE 2026-09-21.** Applied to all 4 real forms
      (`home/EventEnquiry.tsx`, `layout/BookingModal.tsx`,
      `contact/EnquiryForm.tsx`, `services/WeddingEnquiryForm.tsx`).
      **`aria-invalid` + `aria-describedby` on error**: each `TextField`/
      `ModalField` now tracks native constraint-validation failure via
      `onInvalid` (fires on a submit attempt) and reflects it as
      `aria-invalid` + a `role="alert"` message linked by
      `aria-describedby`, reusing the browser's own real
      `validationMessage` text rather than inventing custom copy —
      clears again on the next valid `onChange`. **`aria-busy`** added to
      every `<form>`, true only while `status === "sending"`. **Persistent
      `sr-only role="status"`** added as the first child of every form
      (not conditionally mounted — screen readers reliably announce text
      *changes* inside an already-present live region, but aren't
      guaranteed to announce a brand-new node appearing, which is why the
      "sending" state was previously silent even though the button's own
      text changed); its text now also mirrors the sent/error/not-connected
      outcomes for robustness. **`* Required` legend** added directly
      under each form's intro line, matching each page's own Danza/
      Nocturne muted-text token. `npm run build` + `npm run lint` clean.
      Verified in-browser: submitted Home's `EventEnquiry` empty via
      `form.requestSubmit()`, confirmed the Name field carries
      `aria-invalid="true"` + `aria-describedby="name-error"` and renders
      the real browser message ("Please fill in this field.") in the new
      accessible error-red from the batch above (screenshot-checked); the
      `aria-busy` attribute and the sr-only live region were both
      confirmed present and correctly wired. **M / Med**
- [x] Touch targets under 44px. **DONE 2026-09-21.**
      `Testimonials.tsx` mobile prev/next: `h-9 w-9` (36px) → `h-11 w-11`
      (44px) — these are the *primary* control on mobile, since the `sm:`
      pair is hidden there. `BookingModal.tsx` close: `h-8 w-8` (32px) →
      `h-11 w-11` (44px, matching the Gallery lightbox's close button),
      position adjusted `top-4 right-4` → `top-2 right-2` to keep it
      visually anchored to the card corner despite the larger box.
      `Testimonials.tsx` pagination dots: restructured so each `button` is
      a real 44×44 hit area with the small visual dot as a purely
      decorative inner `span` — sizing the dot itself up to 44px would
      have changed the design, this keeps the same thin-pill look with a
      much larger tap zone around it. `Footer.tsx`'s 3 legal links (11px
      inline text, well under 44px and too tightly packed to just pad):
      added a `relative` + invisible `::before` pseudo-element expanding
      the hit area (14px top/bottom, 6px horizontal buffer) without
      moving anything visible or changing the footer's compact layout.
      `npm run build` + `npm run lint` clean. Verified in-browser at
      375px width via `getBoundingClientRect()`: mobile prev/next and
      pagination-dot buttons both confirmed exactly 44×44, the
      BookingModal close button confirmed 44×44 and still correctly
      positioned in the card corner (screenshot-checked), and the
      footer's `::before` hit-area confirmed present with the expected
      offsets on all 3 legal links (screenshot-checked — no visual
      layout shift). **S / Med**
- [x] **Hover-only affordances invisible on touch.** **DONE 2026-09-21.**
      `Gallery.tsx` (`zoom_in`) and `LivingArchive.tsx` (`open_in_full`)
      badges changed from `opacity-0 group-hover:opacity-100` to
      `opacity-100 sm:opacity-0 sm:group-hover:opacity-100` — always
      visible below `sm:` (touch-primary widths, where there's no hover
      state to reveal them), hover-reveal preserved unchanged from `sm:`
      up. Grepped for any other `opacity-0 group-hover` instances
      site-wide — these were the only two. `npm run build` +
      `npm run lint` clean. Verified in-browser at 375px width: Home
      Gallery's `zoom_in` badges confirmed visible on every tile without
      hover (screenshot-checked); About's `LivingArchive` `open_in_full`
      badge confirmed `opacity: 1` via `getComputedStyle`. **S / Med**
- [x] Heading order. **DONE 2026-09-21.** `/contact`:
      `ContactSidebar.tsx`'s photo-card caption was an `<h3>` rendering
      before the page's only real `<h2>` (`EnquiryForm`'s "Hold Your
      Performance Date") — it's a decorative card caption, not a
      content-sectioning heading, so demoted to `<p>`. `/gallery`:
      `RepertoireActs.tsx`'s 2 "bento" act titles were `<h3>` while the 3
      "hero" act titles were `<h2>`, even though both are the same kind of
      content (an individual repertoire act) just laid out differently —
      the bento titles promoted to `<h2>` to match. `/journal/[slug]`:
      `JournalArticleBody.tsx`'s "More from the Journal" label was a plain
      `<span>`, so the related-article cards' own `<h3>` titles skipped
      straight from the page's `<h1>` with nothing between — promoted the
      label to a real `<h2>` (same visual styling). FAQ:
      `contact/FAQ.tsx`'s question text was a `<span>` inside `<summary>`,
      invisible to heading navigation — wrapped in `<h3>` (valid nested
      inside `<summary>`, keeps native disclosure behavior unchanged,
      correctly nests under the section's own "Frequently Asked
      Questions" `<h2>`); confirmed via `grep` this is the only real
      `<details>`/`<summary>` FAQ pattern on the site. `<br />` in h1: a
      bare newline in JSX immediately before a tag collapses to nothing,
      not a space, so plain-text extraction (`textContent`, copy/paste)
      of Home/`About`/`Contact`'s hero `<h1>`s concatenated words with no
      separator ("Precise Formations.Grand Stages.") — fixed by adding an
      explicit `{" "}` before each `<br />` in all 3 (confirmed via
      `python3` regex scan across every `.tsx` file that these were the
      only 3 `<h1>`s containing a `<br>`), invisible in normal rendering
      since a trailing space before a line break collapses visually.
      `npm run build` + `npm run lint` clean. Verified in-browser via
      `document.querySelectorAll('h1,h2,h3,h4')` on all 3 affected pages:
      `/contact` now reads h1→h2→h2→h3×4→h4 (was h1→h3→h2); `/gallery`
      now reads h1→h2×5→h2→h3×4→h2→h4 (was h1→h2×3→h3×2→h2→h3×4→h2→h4);
      `/journal/[slug]` now reads h1→h2→h3×2→h4 (was h1→h3×2→h4).
      Confirmed the FAQ questions render as real `<h3>` inside `<summary>`
      and the Krishna Leela caption now renders as `<p>`, not a heading.
      Confirmed all 3 hero `<h1>`s' `textContent` now reads with correct
      spacing (e.g. "Precise Formations. Grand Stages. Unforgettable
      Shows."), with a before/after screenshot confirming zero visual
      change. **S / Low–Med**

### 3.2 Performance

- [x] **Subset the Material Symbols font.** **DONE 2026-09-21.** Added
      `&icon_names=…` to `layout.tsx`'s stylesheet link, listing only the
      55 icons the site actually renders — enumerated via the suggested
      grep plus every icon rendered through a JS variable that grep can't
      see (`services/serviceIcons.ts`'s map, `about/Timeline.tsx`'s
      milestones, `about/Pillars.tsx`'s own `pillarIcons`,
      `services/HowItWorks.tsx`'s steps, `services/WeddingCoordination.tsx`,
      `gallery/TechnicalRequirements.tsx`), then cross-checked every
      `icon: "..."` field site-wide against Google Fonts' own icon
      metadata endpoint to confirm every name is real (also confirmed 3
      unused fields in `content/home.ts`'s `philosophyPillars`
      — `person_celebrate`/`masks`/`volunteer_activism` — are never
      actually rendered, per `about/Pillars.tsx`'s own comment, so
      correctly excluded). Added the suggested
      `<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />`
      immediately before the stylesheet link. **Bonus real bug caught
      during the catalog cross-check**: `serviceIcons.ts`'s
      `school-college-function` row used `"auditorium"`, which isn't a
      real Material Symbols icon name at all — it had been silently
      rendering as literal fallback text ("AUDITORIUM" spelled out
      in-line) instead of a glyph on every services page since it was
      added, not something font-subsetting could have caused or fixed on
      its own. Fixed at the source to `"theaters"` (a real icon, same
      "reads as a venue, not a school" intent) and reflected in the
      subset list. `npm run build` + `npm run lint` clean. Verified
      in-browser: confirmed the live `<link>` href carries the subset
      `icon_names` param and the preconnect tag via `document.querySelector`;
      screenshot-confirmed `/services` and `/services/school-college-function`
      both now render a real theater-marquee glyph instead of the literal
      text; screenshot-confirmed no other icon anywhere broke (checked
      Home, About, Gallery, Journal, Contact — all icons render normally).
      Long-term inline-SVG replacement not pursued — out of scope for
      this pass. **S / High**
- [x] **Drop `priority` from the header logo.** **DONE 2026-09-21.**
      Removed the `priority` prop from `Header.tsx`'s logo `<Image>` — it
      was forcing an eager, high-priority fetch of a 44×44 logo on every
      single page, competing with the real LCP hero for bandwidth. **S / Med**
- [x] **Shrink `logo-crest.png`.** **DONE 2026-09-21.** Resized the
      source 400×400 PNG (196,979 bytes) to 160×160 (comfortably covers
      the 44px/40px Header/Footer display sizes at up to ~3.6x for
      high-DPI screens) and re-exported as WebP at quality 90 — new
      `public/images/brand/logo-crest.webp`, 20,940 bytes, a ~89%
      reduction, in line with the TODO's own "~15 KB" target. Original
      400×400 PNG kept in place (not deleted) as the source asset for any
      future re-derivation — `icon.png`/`apple-icon.png` were generated
      from it in Phase 2. Both `Header.tsx` and `Footer.tsx` (the only 2
      real usages, confirmed via grep) switched to the new `.webp` path.
      `npm run build` + `npm run lint` clean. Verified in-browser: network
      log confirms both components now request `logo-crest.webp` (200/304
      responses); visually compared the resized WebP against the original
      at matching display size before committing — crest detail and
      legibility fully preserved; screenshot-confirmed the logo still
      renders sharp in the live header. **S / Med**
- [x] Add `images: { formats: ["image/avif", "image/webp"] }`. **DONE
      2026-09-21.** Confirmed against `node_modules/next/dist/docs` (per
      this project's own `AGENTS.md` warning that Next 16 can differ from
      training data) that the config shape is unchanged from what the
      TODO already specified — Next negotiates the best format per-browser
      via the request's `Accept` header, AVIF first with WebP as the
      fallback, original format if neither matches. `npm run build` +
      `npm run lint` clean. Verified in dev: fetched a live `_next/image`
      URL with an AVIF-capable `Accept` header and confirmed the response
      `content-type` is now `image/avif` (was WebP-only before this
      change); confirmed ordinary image requests still return 200/304 and
      the page renders unchanged (screenshot-checked). **Caveat honestly
      unresolved, not fabricated as confirmed**: whether Netlify's actual
      production runtime negotiates AVIF the same way as `next dev` can
      only be verified once the site is actually deployed there — it
      isn't yet (`NEXT_PUBLIC_SITE_URL` unset, Netlify not connected per
      `PROGRESS.md`'s deploy checklist) — worth a quick re-check the first
      time a real deploy goes out. **S / Med**
- [x] Reduce bokeh cost. **DONE 2026-09-21.** Dropped `transform: scale()`
      from the shared `bokeh-breathe` keyframes in `globals.css` — opacity
      alone animates on the compositor thread (no repaint), where opacity
      + `scale()` together forced continuous re-rasterization of a large
      `blur-3xl` surface on every frame. Visually very close to the
      original breathing effect. **Home orb count already at target**:
      counted every `.animate-bokeh` instance across Home's own 3 sections
      (`RepertoireGrid.tsx`, `EventEnquiry.tsx`, `BookingAvailability.tsx`)
      at 2 each = 6 total, already matching the "~6 orbs" cap — no
      reduction needed there. **`IntersectionObserver`-based pausing for
      off-screen orbs deliberately not built**: this item said "consider,"
      not a firm requirement, and a real implementation would mean
      converting all ~30 site-wide `.animate-bokeh` `<div>`s across 16
      files from static markup to a shared client-side hook — a
      disproportionate scope increase for an "S" item once the actual
      GPU-cost driver (the `scale()` re-rasterization) was already
      removed; left as a future Phase 7-style enhancement if profiling
      ever shows it's still needed. `/gallery`'s 16 `backdrop-blur`
      elements and the header's scroll-repainting `backdrop-blur-xl` are
      noted as-is, unchanged — both are static blurs (no continuous
      animation), a different and much smaller cost than the orbs'
      `scale()` issue this item was actually about. `npm run build` +
      `npm run lint` clean. Verified in-browser: read the live compiled
      `@keyframes bokeh-breathe` CSSOM rule and confirmed it contains only
      `opacity` (no `transform`); screenshot-confirmed Home still renders
      correctly with no visual regression. **S / Med**
- [x] Right-size `sizes` + `placeholder="blur"`. **DONE 2026-09-21.**
      Audited every `sizes=` attribute site-wide (17 call sites) against
      its real rendered grid-column fraction; found exactly 2 genuine
      mismatches (the rest already correctly match their layout).
      **`about/LivingArchive.tsx`**: `Tile` took one shared
      `sizes="(min-width: 640px) 50vw, 100vw"` for every tile, but only
      the featured tile actually spans 50% width (`lg:col-span-2` of 4) —
      the 4 small bento tiles render at 25% width at `lg:` (1 of 4
      columns), so they were fetching ~2x the image data they needed at
      that breakpoint. `Tile` now takes a `sizes` prop; the featured call
      keeps the 50vw value, the 4 small tiles get
      `"(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"`.
      **`journal/JournalArticleHeader.tsx`**: was a bare `sizes="100vw"`
      even though this image never exceeds the page's own
      `max-w-[1200px]` container — fetching a full-viewport-width image on
      any screen over 1200px. Capped to
      `"(min-width: 1200px) 1200px, 100vw"`. **`placeholder="blur"`**
      added to the site's 3 real `priority` hero images (Home `Hero.tsx`,
      `services/ServiceDetailHero.tsx`, `journal/JournalArticleHeader.tsx`)
      — all 3 reference public-folder string paths (from content files),
      not static imports, so Next can't auto-derive a `blurDataURL`; new
      `lib/blurDataURLs.ts` provides one, generated via Pillow as a real
      ~12px-wide quality-40 JPEG re-encode of each actual photo (not a
      generic gray box) for all 8 distinct images used across these 3
      components (5 from `content/gallery.ts`, 3 from `content/journal.ts`).
      `npm run build` + `npm run lint` clean. Verified in-browser on
      Home, a service detail page, a journal article, and `/about`: all
      images load and render correctly with no visual regression
      (screenshot-checked each); confirmed via `img.sizes` in the live DOM
      that `JournalArticleHeader`'s image now carries the capped value and
      `LivingArchive`'s 4 small tiles now carry `25vw` at `lg:` while the
      featured tile still carries `50vw`. **S / Low**
- [x] Delete the unreferenced `naveen-patnaik-with-founder.jpg`. **DONE
      2026-09-21 — Phase 3.2 is now fully code-complete.** Confirmed zero
      real importers via `grep -rn "naveen-patnai" src/` (the one
      superficially-similar earlier match was an unrelated hit on
      "Naveen Patnaik" the *name*, inside `content/testimonials.ts`'s
      quote text — nothing to do with this image file). Deleted the
      192,587-byte file from `public/images/brand/`. `npm run build` +
      `npm run lint` clean (still 28 routes — confirms nothing depended
      on it). Verified in-browser on `/about` (the page most related to
      founder/testimonial imagery): every rendered `<img>` still resolves
      to a real, intact asset, no broken images. **S / Low**

> **Already good, don't regress:** only 8 `"use client"` files site-wide,
> zero raw `<img>` tags, zero runtime dependencies beyond React/Next. The
> §4/§5 discipline has genuinely held.

---

## Phase 4 — Content consolidation (the repetition problem)

### 4.1 One source of truth for repertoire ← *highest-leverage refactor*

**Root cause of most repetition and most consistency bugs:**
`content/home.ts`'s `repertoire` export is **dead code with zero
importers**, while five components each hardcode their own competing copy
of the same acts. That's an `ARCHITECTURE.md` §5 rule-5 violation.

Current state — four competing definitions, three different act counts:

| Source | Acts | Note |
|---|---|---|
| `content/home.ts:41` | 3 | **dead code, 0 importers** |
| `home/RepertoireGrid.tsx:23` | 4 | adds Shiva Tandava |
| `gallery/RepertoireActs.tsx:32` | 5 | splits Vande Mataram / Surya Namaskar |
| `layout/Footer.tsx:32` | 5 labels | includes "Bespoke Royal Sangeet Acts" — **appears nowhere else on the site** |
| `about/LivingArchive.tsx:23` | 3 + 2 generic | renames Krishna Leela → "Krishna Ras Leela" |

Same act, different descriptions and category tags on every page; Krishna
Leela alone has three different names. Every reword is another place a
fact can go stale.

- [x] Make `content/home.ts`'s `repertoire` the live single source. **DONE
      2026-09-21.** Rewrote the dead-code 3-entry `repertoire` export into
      a real, live 5-act `RepertoireAct[]` (slug, category, title, badge,
      tagline, description, image, imageAlt) matching the real split
      already established on `/gallery`, then wired all 4 real consumers
      to import it instead of hardcoding their own copy:
      `home/RepertoireGrid.tsx` (a curated 4-act subset, keeping its own
      local Book/Commission CTA text — a UI micro-variation, not a fact),
      `gallery/RepertoireActs.tsx` (keeping its own local "Act I/II/III…"
      numbering + per-act stat labels — page-specific layout flavor),
      `layout/Footer.tsx` (now lists all 5 real acts, replacing
      "Bespoke Royal Sangeet Acts" — a 5th label that corresponded to no
      real act anywhere else on the site), and `about/LivingArchive.tsx`
      (fixes 2 real drift bugs: "Krishna Ras Leela" → the one canonical
      "Krishna Leela & Divine Ras," and the 2 gallery photos it borrowed
      were captioned generically as "Live Stage Performance" instead of
      the actual acts `/gallery` already assigns them to — now correctly
      "Surya Namaskar" and "Vande Mataram"). Cross-referencing every
      existing copy also surfaced a real mapping bug of my own mid-refactor
      (mixed up which string was the image-corner badge vs. the page-local
      act label for Surya Namaskar) — caught and fixed before verifying,
      not shipped. **Found but deliberately not changed in this pass**:
      `performance-3/4/5.jpg` (paired with Shiva Tandava/Vande
      Mataram/Surya Namaskar) don't actually depict those acts thematically
      (performance-3 shows a many-armed blue-skinned figure; performance-4
      and performance-5 are the same Ganesha-masked ensemble piece, shot
      from two angles) — this pairing was already shipped and reviewed in
      `gallery/RepertoireActs.tsx` (DESIGN.md §24) before this refactor,
      so centralizing it preserves an existing decision rather than
      introducing a new one; flagged separately for the client rather than
      silently re-paired. `imageAlt` text was written to honestly describe
      what each photo actually shows (not asserting it depicts the named
      act), same "real photo as illustrative stand-in" pattern already
      used site-wide. `npm run build` + `npm run lint` clean; confirmed
      via `grep -rn "Krishna Ras Leela\|Bespoke Royal Sangeet"` that zero
      live code references the old drifted names (only explanatory
      comments documenting the fix). Verified in-browser on all 4 pages:
      Home's grid shows the corrected badges; `/gallery`'s 5 acts and the
      Surya Namaskar bento card's badge/act-label render exactly as
      before (screenshot-checked); `/about`'s `LivingArchive` shows all 5
      canonical titles with no more generic placeholders
      (screenshot-checked); the Footer's Repertoire column lists all 5
      real acts via a live DOM query, "Bespoke Royal Sangeet Acts" gone. **M / High**

### 4.2 Trim duplicated content

- [x] **About tells the origin story four times in one scroll.** **DONE
      2026-09-21.** Trimmed the 2 real restatements. Timeline milestone 1
      ("The Beginning") used to near-verbatim restate Hero's paragraph
      (Krishna Mohan Reddy, 26 young men, Berhampur/Ganjam/Odisha,
      construction workers/painters, no formal training) ~200px later —
      cut to just the founding beat (who + where), deferring the full
      backstory to Hero, which already tells it in full one section
      above. Milestone 2 ("India's Got Talent, Season 1 Champions") used
      to repeat "no formal training" a third time — dropped that clause,
      kept only the IGT-specific facts (the win, the "Krishna Act," the
      national fame). **The 4th instance the TODO flagged — the Founder
      bio being "byte-identical" between `about/Founder.tsx` and Home's
      `FounderSpotlight.tsx` — turned out not to be a bug on inspection**:
      both components read `founder.bio` from the same shared
      `content/home.ts` `teamMembers[0]` (the single-source-of-truth
      pattern this project already uses elsewhere), and a founder bio
      legitimately belongs on both a homepage spotlight and the full About
      page — that file's own existing comment also documents that a
      genuinely redundant *extra* sentence appended after `founder.bio`
      was already removed in an earlier pass (§28). Left unchanged.
      `npm run build` + `npm run lint` clean. Verified in-browser: read
      Hero's paragraph and both trimmed milestone bodies via live DOM
      query, confirmed no sentence-level overlap between them; screenshot-
      confirmed the timeline cards still read cleanly and the layout
      remains balanced with the shorter copy. **S / High**
- [x] **All 7 testimonials appeared in full on both Home and About.**
      **DONE 2026-09-21.** Implemented the recommended split exactly:
      `home/Testimonials.tsx`'s carousel `order` array trimmed from all 7
      down to the 3 highest-recognition names (Shah Rukh Khan, Naveen
      Patnaik, Kirron Kher) — the other 4 now live exclusively in
      `about/Testimonials.tsx`'s full 7-quote archive.
      `contact/Testimonial.tsx` was already correctly scoped to a single
      V.K. Pandian quote from an earlier pass (DESIGN.md §22), confirmed
      unchanged. Each page now shows a genuinely different slice instead
      of the same set repeated. `npm run build` + `npm run lint` clean.
      Verified in-browser: confirmed via `aria-label` on the live
      pagination dots that Home's carousel now cycles through exactly 3
      testimonials (Shah Rukh Khan, Naveen Patnaik, Kirron Kher, in that
      order); screenshot-confirmed the carousel still renders correctly
      with real quote text. **S / Med**
- [x] **`heroStats` repetition/ordering.** **DONE 2026-09-21.** Applied
      exactly the recommended fix. `contact/Hero.tsx` and
      `services/WeddingHero.tsx` both cut from all 4 stats to 2
      (`heroStats[0]`/`[2]` — founding size + IGT win), matching
      `/gallery`'s `GalleryHero.tsx`, which already used this same 2-stat
      pattern — "9 Signature Services" was redundant with the Footer's own
      repeated stat on every page, "6 National Media Milestones" wasn't
      needed to re-establish trust this deep into a booking flow. Grid
      classes adjusted from `grid-cols-2 sm:grid-cols-4 max-w-3xl` to a
      fixed `grid-cols-2 max-w-md`, sized correctly for 2 cards instead of
      leaving empty cells. `about/Hero.tsx` fixed to render `heroStats` in
      its natural order (26·9·IGT·6, matching Home's `StatsRow.tsx`) —
      was reordered to 26·6·IGT·9 with no documented reason, the same 4
      real numbers reading in a different sequence on two pages a visitor
      might browse back-to-back; the destructuring/reorder logic was
      removed entirely since it's no longer needed. Home and Gallery were
      already correct, left unchanged. `npm run build` + `npm run lint`
      clean. Verified in-browser: `/contact` and `/services/wedding-events`
      both screenshot-confirmed showing exactly 2 well-centered stat
      cards (26, IGT); `/about`'s 4 stat cards confirmed via live DOM
      query to now read 26·9·IGT·6, matching Home. **S / Med**
- [x] Enquiry-form intro sentence grammar. **DONE 2026-09-21.** Fixed the
      real bug: `home/EventEnquiry.tsx` and
      `services/WeddingEnquiryForm.tsx` both still said *"A few details
      **is** all we need"* — subject/verb disagreement ("details" is
      plural). `contact/EnquiryForm.tsx` already had the "are" fix from an
      earlier pass; both remaining files now match. **Not changed, on
      reflection**: the sentence appearing verbatim on 3 forms, and
      "Request Tech Rider" appearing identically on all 3 `heroActs` cards
      in one Gallery section, are both a repeated *UI label for the same
      action* (the disclosure-toggle helper text; the tech-rider request
      action), the same pattern as "Add to Cart" reading identically on
      every product card — not prose duplication a reader notices while
      scrolling, unlike the page-narrative repetition problems fixed
      elsewhere in this phase. Varying either would read as inconsistent
      UX for an identical action, not an improvement, so left as-is.
      `npm run build` + `npm run lint` clean. Verified in-browser: read
      the live paragraph text on both Home and wedding-events, confirmed
      "are" on both. **S / Low–Med**
- [x] Normalize the event-type dropdown taxonomies. **DONE 2026-09-21 —
      Phase 4.2 is now fully code-complete.** New
      `content/services.ts` export `eventTypeOptions` (the 9 real service
      names + "Other") is now the single source every enquiry form's
      dropdown reads from — `home/EventEnquiry.tsx`,
      `layout/BookingModal.tsx`, and `contact/EnquiryForm.tsx` all had
      their own independently-worded, incomplete local lists (5-6 options
      each, none matching the real service names), replaced with the
      shared export. Contact specifically — the page a search visitor is
      most likely to land on directly — previously had no way to select
      "TV Award Show" or "Mahotsavs"; both now present. Also simplified
      `EventEnquiry.tsx`'s `?interest=<slug>` pre-select logic: since the
      dropdown options are now literally the service names, the old
      hand-maintained `natureByServiceSlug` translation table (mapping a
      slug to a *coarser* option that didn't always exist 1:1) was
      replaced with a direct `services.find((s) => s.slug === slug)?.name`
      lookup — one less hardcoded mapping to keep in sync.
      `services/WeddingEnquiryForm.tsx` has no event-type dropdown at all
      (it's already scoped to the wedding-events page), so wasn't a 4th
      taxonomy to normalize. `npm run build` + `npm run lint` clean.
      Verified in-browser: read the live `<select>` options via DOM query
      on Home, the header's BookingModal, and Contact — all three now
      show the identical 9 services + Other, in the same order; confirmed
      the `?interest=tv-award-show` pre-select flow still correctly
      resolves to "TV Award Show" through the new lookup
      (screenshot-checked the modal too). **S / Med**
- [x] Finish the Inquire→Enquire normalization. **DONE 2026-09-21.**
      `about/CTA.tsx`'s "Inquire for Booking" → "Enquire for Booking";
      `gallery/RepertoireActs.tsx`'s Vande Mataram bento card CTA "Gala
      Inquiry" → "Gala Enquiry". Confirmed via
      `grep -rn "Inquiry\|Inquire\|inquiry\|inquire"` that these were the
      only 2 live holdouts site-wide (a 3rd grep hit was just a code
      comment documenting an earlier, already-shipped fix, not live
      copy). `npm run build` + `npm run lint` clean. Verified in-browser:
      read both live CTA texts via DOM query on `/about` and `/gallery`,
      confirmed "Enquire"/"Enquiry" spelling on both. **S / Low**

### 4.3 Image alt text & naming

- [~] Write distinct, descriptive alt text per photo. **PARTIALLY DONE
      2026-09-21.** Fixed the "verbatim copy of the adjacent heading" half
      of this item, which was safely separable from the
      `performance-3/4/5.jpg` half (see below): all 3 journal photos
      (`content/journal.ts`) had every consumer
      (`JournalArticleHeader.tsx`, `JournalArticleBody.tsx`,
      `JournalGrid.tsx` ×2) using `alt={entry.title}` — the article
      headline duplicated as the image's alt text, adding nothing a
      screen reader or image-search crawler couldn't already get from the
      adjacent `<h1>`/`<h2>`. Added a real `imageAlt` field to
      `JournalEntry`, written from actually viewing each photo (e.g.
      `igt-legacy.jpg`: "Prince Dance Group performers in gold body paint
      forming an acrobatic pyramid with arms extended, under warm stage
      lighting" — not a restatement of the article's headline), wired
      into all 4 render sites. **Bonus fix found while touching
      `JournalGrid.tsx`**: its featured-story image has `priority` (a
      real LCP candidate) but was missed by the Phase 3.2
      `placeholder="blur"` pass, which only audited Home Hero,
      ServiceDetailHero, and JournalArticleHeader — added the same
      `lib/blurDataURLs.ts` lookup here too, since it's the same 3
      possible journal images already covered. **The
      `"Prince Dance Group performers on stage in costume"` half of this
      item (the alt text literally in `content/gallery.ts` for
      `performance-3/4/5.jpg`, and its downstream use in
      `home/ServiceCategories.tsx`) is intentionally deferred** — those
      are the exact same 3 images currently under review in a separate
      background task (`task_f28a1277`, spawned this session) for a
      thematic photo/act mismatch; writing new alt text for them before
      that review resolves risks describing something that's about to be
      re-paired or re-captioned. Revisit once that task reports back.
      `npm run build` + `npm run lint` clean. Verified in-browser: read
      the live `alt` attribute for all 3 journal images on `/journal` and
      an article detail page via DOM query — all distinct, all describe
      the actual photo, no heading duplication; screenshot-confirmed both
      pages render correctly. **S / Med**
- [~] Rename `performance-3/4/5.jpg` to describe what they show (the other
      five filenames already do). **Alt text/captions DONE 2026-09-25**
      (identified against the client's Drive folder — see PROGRESS.md);
      the filenames themselves are still unchanged (cosmetic, and
      renaming touches every reference). **Deliberately not touched this
      session** — same reasoning as above, blocked on `task_f28a1277`'s
      photo/act mismatch review resolving first (a rename needs to know
      what the photo *is*, which is literally what that task is
      determining). **S / Low**
- [x] Mark the footer logo `alt=""`. **DONE 2026-09-21.** Was duplicating
      the header logo's `"{site.name} crest"` alt text with no functional
      purpose — the footer logo is a plain `<div>`, not a link (unlike the
      header's, which doubles as the accessible name for the "go to
      homepage" link it sits inside), and the brand name is already the
      very next visible/DOM element. `npm run build` + `npm run lint`
      clean. Verified in-browser: read the live footer logo's `alt`
      attribute via DOM query, confirmed empty string. **S / Low**
- [ ] **Verify what `about/LivingArchive.tsx`'s photos actually show** —
      tile 1 uses `krishna-leela-1.jpg` (whose own caption in
      `content/gallery.ts` describes *Krishna Leela*) but is labelled
      "Dashavatar Tableaux"; the "Shiva Tandava Stotram" tile uses
      `performance-3.jpg`, captioned generically in the content file.
      **Deliberately not touched this session** — this is the same
      photo/act pairing question `task_f28a1277` is reviewing (Phase 4.1's
      repertoire refactor propagated this exact `krishna-leela-1.jpg`→
      Dashavatar and `performance-3.jpg`→Shiva Tandava pairing into
      `content/home.ts`'s canonical repertoire, so `LivingArchive.tsx`'s
      labels are no longer independently wrong — they now correctly match
      the site-wide canonical pairing whatever it ends up being). Revisit
      once that task reports back. **S / Med** 🔒

---

## Phase 5 — Structured data & internal linking

Zero JSON-LD blocks exist across all 21 routes.

- [x] **`PerformingGroup`** (sitewide `@id` on `/`). **DONE 2026-09-21.**
      New `lib/structuredData.ts` builds it from real `content/site.ts`
      facts only — name, url, logo, description, `PostalAddress`, both
      phones, email, `foundingLocation`, `award`. Shipped **without**
      `sameAs` (site.ts's own `social` object is still all empty
      strings) and does **not** emit `numberOfEmployees: 26` (that's the
      original founding troupe size, not a confirmed current headcount —
      exactly the distinction the TODO called out). `@id` is
      `${siteUrl}/#organization`, referenced by the `Service` and
      `BreadcrumbList` blocks below instead of repeating org facts.
      Rendered sitewide via a new shared `<JsonLd>` component
      (`components/JsonLd.tsx`, Next's own documented `<script
      type="application/ld+json">` pattern with the XSS-safe `<` escaping
      their docs specifically call out) in the root `layout.tsx`, so every
      page carries organization identity independently. `npm run build` +
      `npm run lint` clean. Verified on the live server: parsed the
      script tag's JSON on Home, confirmed every field matches the real
      facts, `sameAs` and `numberOfEmployees` both absent. **M / High**
- [x] **`Service` × 9** on `/services/[slug]`. **DONE 2026-09-21.** New
      `getServiceJsonLd()` builds `name`/`description`
      (`service.metaDescription`)/`serviceType`/`provider` (→ the
      PerformingGroup's `@id`) per service, rendered on every service
      detail page. `areaServed`/`offers` deliberately omitted — need
      client input (service radius, pricing), not guessed. `npm run
      build` + `npm run lint` clean. Verified on the live server: parsed
      the script tag on `/services/corporate-events`, confirmed the
      `Service` block's `provider.@id` matches the `PerformingGroup`
      block's own `@id` on the same page. **S / Med**
- [x] **`FAQPage`** on `/contact`. **DONE 2026-09-21.** `contact/FAQ.tsx`'s
      `faqs` array exported and reused directly by `getFaqPageJsonLd()` —
      one source for both the visible FAQ section and the schema, so they
      can't drift apart. Honest caveat kept in this file, not glossed
      over: Google restricted FAQ rich results to gov/health sites in Aug
      2023, so this is valid-but-not-displayed as a SERP rich result —
      shipped anyway for entity understanding / AI answer surfaces, per
      the reasoning already given here. `npm run build` + `npm run lint`
      clean. Verified on the live server: parsed the script tag on
      `/contact`, confirmed all 4 real Q&As match exactly what the FAQ
      section renders. **S / Low**
- [x] **`BreadcrumbList`.** **DONE 2026-09-21.** Added real, visible
      breadcrumbs first (the actual prerequisite this item named): new
      `components/ui/Breadcrumbs.tsx` — a proper `<nav aria-label="Breadcrumb">`
      with an ordered list of real `Link`s, current page marked
      `aria-current="page"` and not a link. Replaces the old plain "← All
      Services" / "← Journal" text back-links on `services/ServiceDetailHero.tsx`
      and `journal/JournalArticleHeader.tsx` with a real Home → Section →
      Page trail. The exact same breadcrumb array feeds both the visible
      component and `getBreadcrumbListJsonLd()`, so the visible trail and
      the structured data can't drift apart. `npm run build` +
      `npm run lint` clean. Verified on the live server: screenshot-
      confirmed the breadcrumb trail renders correctly on a service page
      (`Home / Services / Corporate Events`), `wedding-events`, and a
      journal article (`Home / Journal / <full title>`); confirmed the
      first 2 crumbs are real working links and the last is
      non-interactive via live DOM query; parsed the `BreadcrumbList`
      script tag and confirmed all 3 `ListItem`s carry correct absolute
      URLs. **M / Med**
- [x] **Cross-link Gallery → Services — Phase 5 is now fully
      code-complete.** **DONE 2026-09-22.** `gallery/RepertoireActs.tsx`'s
      8 CTAs previously all pointed at `/contact` — the 5 "Book [Act]"
      buttons now link to `/services` (browse what's bookable) instead of
      skipping past it, and the 3 "Request Tech Rider" buttons now link
      to the real `/rider-requirements` page instead of the generic
      contact page, since that's literally what they're asking for
      (`GalleryCTA.tsx`'s own closing "Request Date Availability" CTA
      correctly stays on `/contact` — that's its actual job). Home's body
      previously never linked to `/about`, `/services`, or `/journal`
      anywhere (nav/footer only) — added 3 natural, non-forced links:
      `FounderSpotlight.tsx` → "Read Our Full Story" → `/about`,
      `ServiceCategories.tsx`'s header → "View All 9 Services" →
      `/services` (the 3 category cards only ever covered 3 of 9
      services, by design), `StatsRow.tsx`'s "As Seen On" press strip →
      "Full Press & Journal" → `/journal` (a natural close to a
      press-mentions list). Journal — confirmed as the thinnest link
      equity on the site (both `JournalGrid.tsx` and
      `JournalArticleBody.tsx` previously only linked to other journal
      articles) — both pages gained a closing "Looking to book a
      performance?" block linking to `/services` and `/contact`. `npm run
      build` + `npm run lint` clean. Verified on the live server: DOM-
      confirmed every new/changed link's `href` on Home, Gallery, and
      both Journal pages; click-navigated all 3 new Home links and
      confirmed each lands on the correct real page; DOM-confirmed all 8
      Gallery repertoire CTAs now point to `/services`/`/rider-requirements`
      and the closing CTA is unchanged at `/contact`. **S / Med**
- [x] Vary anchor text. **DONE 2026-09-22.** Found the 2 real
      always-identical-text spots (of the several the TODO named — the
      others turned out to already be fine, see below):
      `ServiceDetailHero.tsx`'s primary CTA and the shared
      `ServicesCTA.tsx` button both read the literal "Enquire to Book" on
      all 9 service detail pages, regardless of which service.
      `ServicesCTA` gained an overridable `ctaLabel` prop (default
      "Enquire to Book" for the generic `/services` list page, where no
      single service applies); `ServiceDetailHero.tsx` and the `[slug]`
      page's `ServicesCTA` call now both read "Enquire About {real
      service name}" — e.g. "Enquire About Wedding Events", "Enquire
      About Musical Acts". **Checked but not changed**: `BookingAvailability.tsx`'s
      9 row links and `RelatedServices.tsx`'s cards were both already
      fine on inspection — each is one large `<Link>` wrapping the real
      service name + description as its content, so the link's actual
      accessible name/anchor text is already keyword-rich (the "Learn
      More"/row-number text inside is a small decorative sub-element, not
      the link's only text) — the TODO's own "Book This Act"/"Reserve
      Act" examples were the Gallery CTAs already fixed by the item
      above. `npm run build` + `npm run lint` clean. Verified on the live
      server: DOM-confirmed the varied anchor text on `wedding-events`
      ("Enquire About Wedding Events" ×2) and `musical-acts` ("Enquire
      About Musical Acts" ×2); confirmed the generic `/services` list
      page correctly kept the default "Enquire to Book". **S / Med**

---

## Phase 6 — Content depth (mostly client-gated)

The site currently carries **~64 visitor-visible placeholder instances
across 21 distinct strings**. `/gallery` alone has 27.

**Status (2026-09-22): the one non-🔒 item is done** (the video-placeholder
icon/dead-button fix, above). Every remaining item in this phase is
genuinely client-gated — real photography, a showreel URL, per-service
detail copy, journal article bodies, legal text, pricing, and booking
logistics all require facts only the client can supply; none of it can be
written without inventing a business fact (`ARCHITECTURE.md` §1). See the
Client Input Register below for the consolidated ask.

### 6.1 The photography problem 🔒 **— highest-value client ask**

Only 5 real performance photos exist, used in 33 placements.
`ServiceDetailHero.tsx:24` does `galleryImages[index % galleryImages.length]`,
so the 9 service pages are 9 reruns of the same 5 photos and two of them
are pixel-identical. A planner scrolling Home → Gallery → About sees the
same 5 frames ~20 times. **No design work fixes this.**

- [~] Request fresh performance photography — ideally per-service.
      **PARTIALLY DONE 2026-09-25.** Client shared their Drive folder
      (55 files). 26 new performance photos are now live: a browsable
      "Photo Archive" on `/gallery` (`gallery/PhotoArchive.tsx`, masonry +
      the shared lightbox, data in `content/archive.ts`), and each of the
      9 service pages has its own distinct hero photo (`serviceHeroBySlug`)
      instead of cycling the same 5 (two were pixel-identical). Still
      open: genuinely *per-service* photography (the service heroes are
      mood-matched stand-ins, not shots of that service), and the photos
      held back for a client decision — see PROGRESS.md 2026-09-25. Note
      the site's original 5 photos turned out to come from this same
      folder, which also settles what `performance-3/4/5.jpg` show:
      `performance-3` is a many-armed blue Krishna on a stage, `-4/-5` the
      Ganesha-masked ensemble. **S for us / High**

### 6.2 Video 🔒 **— largest content gap**

No `<video>` or embed exists anywhere. Three honest placeholders mark the
gap (`home/Gallery.tsx:82-107`, `gallery/GalleryCTA.tsx:52-58`,
`Footer.tsx:183-190`). For a dance troupe this is the single most
persuasive asset, and the IGT win — the whole pitch — has no footage on the
site.

- [x] Get the official channel / showreel URL. **DONE 2026-09-25.** Client
      supplied 3 Vimeo videos + a Drive file; live on `/gallery#videos` and
      Home's gallery tile (see PROGRESS.md). Playback still needs one
      real-browser check. **S / High**
- [x] Meanwhile: fix the video-placeholder affordances. **DONE
      2026-09-22.** Home's `Gallery.tsx` tile icon swapped `play_arrow` →
      `schedule` — a disabled tile with a play-button icon reads as a
      broken video player, not an honest "not available yet" state.
      `GalleryCTA.tsx`'s disabled "Corporate deck coming soon" pill (same
      rounded-full button chrome as the real "Request Date Availability"
      button right next to it, just muted) restyled to plain text — the
      exact dead-button pattern already found and fixed once on
      `contact/ContactSidebar.tsx` (two fake-button pills → one honest
      line), same fix applied here. Also removed `play_arrow` from
      `layout.tsx`'s Material Symbols `icon_names` subset (Phase 3.2) —
      confirmed via a structural regex scan of every `.tsx` file that it's
      no longer rendered anywhere, so keeping it in the subset would have
      been dead weight; `schedule` was already present (also used by
      Footer's newsletter note) so no addition needed there. `npm run
      build` + `npm run lint` clean. Verified on the live server: DOM-
      confirmed the Home tile's icon span now reads "schedule"; DOM-
      confirmed the Gallery CTA's placeholder note is now a plain
      `<span>` with no `cursor-not-allowed` parent and no button chrome. **S / Low**

### 6.3 Thin pages 🔒

- [ ] **8 of 9 service detail pages are ~85% boilerplate.** Measured word
      counts: 204–217 words each, of which the unique content is
      `name` + `summary` ≈ **30 words**; the rest is the identical
      `HowItWorks` + recycled `RelatedServices` + CTA. `/services/wedding-events`
      at 459 words proves the template works once real copy exists. The
      `detail` field is `TODO(content)` on all 8. **L / High** 🔒
- [ ] **3 journal articles are effectively empty** (80–87 words; `body` is a
      literal `TODO(content)`). Either get the bodies, or hide `/journal`
      from the nav until at least one real article exists — it's currently
      a nav item leading to three dead ends. `datePublished` doesn't exist
      in the `JournalEntry` type at all and is needed for `Article` schema. **L / Med** 🔒
- [ ] **Real legal copy** for the 3 stub pages (37–41 words each). **S once supplied** 🔒

### 6.4 Questions a booking visitor can't answer today 🔒

Each needs client input; each is a conversion blocker:

| Question | Current answer |
|---|---|
| What does it cost? | Nothing anywhere — not even "custom quote" |
| How far ahead do I book? | FAQ says "as early as possible" — a non-answer |
| Do you travel to me? | Contradictory (see 0.3); no stated radius |
| How long is a performance? | "Duration: On request" ×2 on Gallery only |
| What must the venue provide? | 12 bullets of "confirmed on enquiry"; rider page empty |
| Who else has hired you? | 6 media milestones, all 2009-era TV. No corporate/wedding client named |
| When will you reply? | Nothing |

- [ ] A real one-page **technical rider** would replace 27 Gallery
      placeholders *and* resolve the false promise in 0.3. **S once supplied / High** 🔒
- [ ] A **"How booking works"** section with real numbers (lead time,
      turnaround, deposit) — `HowItWorks.tsx` already exists as the shell. **S / High** 🔒
- [ ] A **past-engagements list** — even 5–10 named bookings. Six
      `TODO(content)` markers already ask for exactly this. **S once supplied / High** 🔒 *(+ client permission)*

---

## Phase 7 — Feature expansion

**Status (2026-09-22): all 4 items done — Phase 7 is fully code-complete.**

- [x] **Extract a shared `Lightbox` to `components/ui/`.** **DONE
      2026-09-22.** New `components/ui/Lightbox.tsx` — a `useLightbox(images)`
      hook (owns `openIndex`/open/close/next/prev with wraparound) plus a
      `<LightboxModal>` presentational component (keyboard nav, body-scroll
      lock, the shared `useFocusTrap` hook), both extracted verbatim from
      `home/Gallery.tsx`, the only page with real click-to-enlarge before
      this. Wired into all 3 real gaps the TODO named: `home/Gallery.tsx`
      itself (now imports the shared version instead of owning the logic);
      `gallery/RepertoireActs.tsx` (converted to a Client Component — its
      5 act images previously had zero enlarge behavior, now each
      hero/bento image is a real button opening the lightbox, matched to
      its `content/gallery.ts` entry by image path); `about/LivingArchive.tsx`
      (also converted to a Client Component — its `open_in_full` icon
      previously promised a zoom that never happened, since tiles were
      actually `<Link href="/gallery">`; now they really do open the
      lightbox in place, with the section's own separate "View Full
      Gallery" header link left intact for visitors who do want to
      navigate away). Fixes the focus-trap gap (3.1) in one shared place
      instead of three separate implementations. `npm run build` +
      `npm run lint` clean. Verified on the live server across all 3
      consumers: opened each page's lightbox and confirmed via DOM query
      that `role="dialog"` renders with the correct real caption; used a
      dispatched keyboard event to confirm next/prev navigation actually
      advances the image (the `computer` tool's own key-press action
      proved unreliable this session — same class of pane quirk as the
      screenshot-scroll-sync issue noted earlier — so verification used a
      directly-dispatched `KeyboardEvent` instead, which is the real
      code path the browser's own native key handling exercises too);
      confirmed on all 3 pages that focus lands on Close on open and
      restores to the exact triggering button on Escape (using
      `element.focus()` before the click, since a JS-only `.click()`
      doesn't reliably simulate real browser focus-on-click — the first
      pass without that gave a false-alarm "focus lost to body" result
      that a corrected test showed was a testing artifact, not a bug).
      **M / Med**
- [x] **Gallery filter pills.** **DONE 2026-09-22.** Applied the TODO's
      own recommendation: restyled as non-interactive tags. All 5 pills
      now render identically (neutral `bg-nocturne-surface-container`,
      same muted text color) — dropped the conditional that gave "All
      Acts (5)" the site's real active-state gold highlight, the same
      visual treatment an actually-selected tab/filter uses elsewhere,
      which made a `<span>` with zero filtering logic behind it look like
      a working, pre-filtered control to any sighted mouse user. Added a
      small "Performance Themes" label above the row so they read clearly
      as descriptive tags, not a control bar. Left as static decoration,
      not wired to real filtering — still correctly not worth building
      for a 5-card list that already shows everything at once (this
      file's own longstanding reasoning, unchanged); revisit if the act
      list ever passes ~8. `npm run build` + `npm run lint` clean.
      Verified on the live server: read every pill's live computed
      `background-color`/`color` via DOM query and confirmed all 5 are
      now identical (screenshot-confirmed too). **S / Low**
- [x] **`/repertoire/[act]` pages for the 5 real acts — Phase 7 is now
      fully code-complete.** **DONE 2026-09-22.** New
      `app/repertoire/[slug]/page.tsx`, `generateStaticParams()` over the
      5 real `content/home.ts` `repertoire` slugs (Phase 4.1's single
      source of truth — no new facts, every field is what every other
      page already reads). New `metaDescription` field added to
      `RepertoireAct` for SERP snippets (the existing `description` field
      runs 111-220 chars, several past the ~155-160 truncation point;
      same pattern as `content/services.ts`'s own `metaDescription`),
      all 5 written and verified under 160 chars. Two new section
      components: `RepertoireActDetail.tsx` (breadcrumb, real
      image/badge/category/title/tagline/description, "Enquire About This
      Act" + "Call Us Now" CTAs — deliberately links to `/contact`/browse
      `/services` rather than one specific service page, since an act
      isn't tied to a single service type and asserting that pairing
      would be inventing a fact) and `RelatedActs.tsx` (cross-links to the
      other 4). Reused `services/ServicesCTA.tsx` for the closing CTA
      rather than building a near-duplicate. Added all 5 routes to
      `app/sitemap.ts`. Added real internal links to the new pages from
      every place an act was previously plain text: both
      `gallery/RepertoireActs.tsx` card title styles (hero + bento) and
      `home/RepertoireGrid.tsx`'s 4 featured cards. `npm run build` +
      `npm run lint` clean (33 routes, up from 28, all 5
      `/repertoire/[slug]` pages statically generated). Verified on the
      live server: screenshot-confirmed a full page render (breadcrumb,
      hero, real content) on `/repertoire/krishna-leela`; confirmed via
      DOM query the page `<title>`, meta description, canonical, and
      `BreadcrumbList` JSON-LD are all correct; confirmed all 4 related-act
      links present and one click-navigates correctly; confirmed the
      closing CTA's varied anchor text and `/contact` destination;
      confirmed Gallery's 5 card titles and Home's 4 featured-card titles
      now all link to the new pages; confirmed `/sitemap.xml` lists all 5
      new routes; confirmed an invalid slug correctly renders the branded
      404 via `notFound()`. **M / High**
- [x] `heroStats` crash risk + `onError`/`blurDataURL` coverage. **DONE
      2026-09-22.** **The `heroStats` crash risk is not actually live** —
      verified empirically, not just by reading the types: temporarily
      shrank the array to 2 entries and ran `npx tsc --noEmit`, which
      immediately failed with `error TS2493: Tuple type ... has no
      element at index '2'` at all 3 positional consumers
      (`gallery/GalleryHero.tsx`, `contact/Hero.tsx`,
      `services/WeddingHero.tsx`). The trailing `as const` on the array
      literal makes TypeScript infer a fixed-length readonly *tuple*, not
      a general `{...}[]` — so shortening this array is already a
      guaranteed compile error at every positional consumer (caught by
      this project's own standing "always run `npm run build`" rule),
      never a runtime crash. Restored the array and confirmed
      `npx tsc --noEmit` clean again; added a comment at the definition
      explaining why `as const` must stay. **`blurDataURL`**: already
      comprehensive from Phase 3.2/4.3 — the site's 4 real `priority`
      hero images all have it via `lib/blurDataURLs.ts`. **`onError`
      deliberately not added**: every one of the site's ~20+ `<Image>`
      call sites is a Server Component; wiring a real `onError` handler
      needs a client-side function reference, which would force each one
      into a Client Component — a real architectural cost (lost SSR,
      added JS) to guard against a failure mode that doesn't exist here.
      Verified that directly: wrote a one-off script that extracts every
      literal `/images/...` path referenced anywhere in `src/` (10
      distinct real photos — all 5 gallery images, all 3 journal images,
      the logo, the founder photo) and confirmed every single one
      resolves to a real file in `public/`. Every dynamic image reference
      in the codebase (`content/gallery.ts`'s `src`, `content/home.ts`'s
      `repertoire[].image`, etc.) traces back to one of these same 10
      literal strings, so this is exhaustive, not a sample — a stronger,
      build-time guarantee than a runtime `onError` fallback would give.
      `npm run build` + `npm run lint` clean. Verified on the live
      server: reloaded `/gallery` (the page whose stat card most directly
      exercises `heroStats`), confirmed zero console errors and the stat
      card renders with all 4 real values intact. **S / Low**

---

## Phase 8 — Documentation integrity ✅ DONE 2026-09-22 (all items resolved)

`ARCHITECTURE.md` §10 states that drift between the docs and the codebase
"is treated as a bug." There was real drift; all 6 items below are now
resolved (2 turned out to already be fixed in earlier sessions).

- [x] **§1 rule 2 — "No rounded corners."** **DONE 2026-09-22.** Rewrote
      in place (kept as rule 2 — nothing in the codebase references
      "§1 rule 2"/"rule 3" by number, confirmed via grep, so renumbering
      wasn't a concern, but rewriting rather than deleting was still
      chosen to preserve the rule's position). Now documents the real,
      client-confirmed rounded-corner system (`rounded-2xl`/
      `rounded-nocturne-lg`/`rounded-full` etc.) and states the current
      rule: use the active design system's own radius token, never an
      arbitrary one-off value (still covered by rule 4). **S**
- [x] **§1 rule 3 — "No drop shadows / blurs for elevation."** **DONE
      2026-09-22.** Same treatment — now documents the real shadow/bokeh
      system (`shadow-lg`/`shadow-2xl` for elevation, `blur-3xl` for the
      ~30 ambient bokeh orbs, `DESIGN.md` §25/§26/§29) and the current
      rule: allowed where the active design system specifies it, still
      never arbitrary. **S**
- [x] **§2 Fonts row.** **DONE 2026-09-22.** Now lists all 3 real
      self-hosted fonts (`app/fonts.ts`: Plus Jakarta Sans, Playfair
      Display, Hanken Grotesk, all via `next/font/google`) and states the
      one real, deliberate exception: Material Symbols isn't in
      `next/font`'s catalog, so it's a runtime Google Fonts `<link>` —
      now correctly described as subsetted (Phase 3.2) with a
      `preconnect` hint, not a blanket "no runtime request" claim that
      was never fully true. **S**
- [x] **§4 dependency table.** **DONE 2026-09-22.** The table itself
      (`_(none yet)_`) was and remains accurate — confirmed against the
      actual `package.json`: zero packages added beyond the Phase 1
      baseline across the entire project (every dependency-shaped need
      was hand-rolled instead — focus traps, lightbox, brand icons,
      JSON-LD — see "Explicitly decided against" below). What *was*
      stale: the baseline enumeration itself listed `postcss`/
      `autoprefixer`/`prettier` (none actually installed — Tailwind v4
      uses `@tailwindcss/postcss` instead, prettier was never added) and
      was missing `@types/react-dom`. Corrected the list to match
      `package.json` exactly, with a comment explaining the Tailwind v4
      substitution. **S**
- [x] **§8 Forms policy.** **Found already resolved** — confirmed via
      `grep -i resend ARCHITECTURE.md` returning zero matches; §8 already
      fully and accurately describes the real Formspree
      (`submitEnquiry.ts`) + `/api/contact` fallback architecture from an
      earlier session's work. No edit needed. **S**
- [x] **Record the `DESIGN.md` token changes from 3.1 in the same
      change.** **Found already resolved** — confirmed `DESIGN.md` §31
      ("Accessibility Pass (WCAG 2.1 AA) — Focus, Motion, Contrast")
      already exists and documents the focus-ring, `-dim`, and
      `danza-error` token changes from this session's own earlier Phase
      3.1 batch 3 work. No edit needed. **S**

Verified on the live server, not just by reading the doc back: queried the
live DOM on Home and confirmed a real `rounded-2xl` element's computed
`border-radius` is non-zero, a real `shadow-*` element exists, 11 bokeh
orbs are present on that one page alone, the Material Symbols `<link>`'s
live `href` carries the subsetted `icon_names=` param, and the Plus
Jakarta Sans CSS custom property is present on `<html>` — every claim
`ARCHITECTURE.md` now makes about the shipped site checks out against
what's actually rendered. `npm run build` + `npm run lint` clean
(documentation-only changes, but re-ran both as a regression check since
this batch was interleaved with earlier code changes in the same
session).

---

## Client input register

Consolidated list of everything blocked on the client. Worth sending as a
single request rather than piecemeal.

| # | Needed | Blocks |
|---|---|---|
| 1 | **Production domain** | `NEXT_PUBLIC_SITE_URL`, sitemap, robots, canonicals, OG (0.2, 2.1) |
| 2 | **Formspree account + form ID**; expected monthly volume | All lead capture (0.1) |
| 3 | **Social handles/URLs** — FB, Instagram, YouTube ✅ received 2026-09-25; **X/Twitter still needed (or confirm none exists)** | X icon only |
| ~~4~~ | ~~Which phone is the WhatsApp Business line~~ — confirmed 2026-09-24 | resolved |
| 5 | **Which act won IGT Season 1** — Krishna Act, Dashavatar, or both | Fixing the contradiction (0.3) |
| 6 | **Real troupe-size options** (or confirm none should be offered) | Form dropdowns (0.3) |
| 7 | **Service area** — local / national / international | "Worldwide touring" claims (0.3), `areaServed` |
| 8 | **Technical rider** (one page) | `/rider-requirements`, 27 Gallery placeholders, About's claim |
| 9 | **Fresh performance photography** — 26 photos received 2026-09-25 (Drive folder); still wanted: per-service shots | Genuinely per-service imagery (6.1) |
| 10 | **Showreel / video URL** | 3 placeholders, the strongest possible asset (6.2) |
| 11 | **Per-service detail copy** (8 services) | 8 near-duplicate thin pages (6.3) |
| 12 | **Journal article bodies + publish dates** | 3 empty pages, `Article` schema (6.3) |
| 13 | **Real legal copy** (privacy, terms, rider) | 3 stub pages (6.3) |
| 14 | **Booking logistics** — lead time, reply turnaround, deposit, duration | Conversion gaps (6.4) |
| 15 | **Past engagements** + permission to name them | Trust content (6.4) |
| 16 | **Analytics preference** | 1.4 |
| 17 | **Business hours** | Google Business Profile, `LocalBusiness` schema |
| 18 | **Are Odissi / Chhau bookable offerings?** | Flagged unconfirmed at `services.ts:49`; blocks a keyword cluster |
| 19 | **Public-figure testimonial photos** — may they be displayed? | 7 headshots staged in `assets/source/`, unused since Phase 1 (`ARCHITECTURE.md` §6) |
| 20 | **Consent to mark up public-figure quotes as structured `Review` data** | A step beyond displaying a quote; same spirit as #19 |
| 21 | **Does the business do teaching/workshops?** | Long-standing open question in `PROGRESS.md` |

---

## Explicitly decided against

Recorded so a future session doesn't re-litigate these:

- **`AggregateRating` schema** — 7 real testimonials exist but carry **no
  numeric ratings**. Any `ratingValue`/`reviewCount` would be fabricated
  and violates Google's review-snippet policy. Bare `Review` objects
  without `reviewRating` are valid but ineligible for rich results, so
  there's no payoff either.
- **`VideoObject` schema** — no video exists.
- **`Article` schema** — not until real bodies and publish dates land;
  marking up an 85-word placeholder invites a thin-content signal.
- **`LocalBusiness` as the primary type** — the Gopalpur address is a real
  HQ, not a walk-in storefront, and hours/price range are unknown.
  `PostalAddress` + `areaServed` on `PerformingGroup` is the honest
  modelling. Revisit if the client confirms hours.
- **`react-icons` / `simple-icons`** for four social glyphs — ~50 MB in
  `node_modules` for 4 icons. Inline SVG instead.
- **`focus-trap-react` / Radix Dialog** — for exactly two dialogs, a ~30
  line shared hook is the lighter call.
- **Making the Gallery filter pills functional right now** — sound
  reasoning already recorded in `GalleryHero.tsx:10-12` for a 5-card list;
  revisit past ~8 acts.
