# PROGRESS.md

Status tracker + decisions log for the Prince Dance Group website rebuild.
Update this file as work lands — it's the fastest way for a new session (or
the user) to see what's real vs. planned.

**Last updated:** 2026-09-21

## Decisions log

- **2026-09-24 — Real contact numbers confirmed, resolving an open Client
  Input Register item.** Client (Murali Sahu) provided 3 distinct real
  phone numbers with 3 distinct roles — a dedicated WhatsApp Business
  line (+91 82709 23491), a general calling/booking line (+91 96924
  53808, previously unconfirmed/unused), and the founder's own direct
  line (+91 98611 80053). Previously the whole site had only 2
  interchangeable numbers in one `site.contact.phones` array, used for
  both `tel:` and `wa.me:` links indiscriminately — this is exactly the
  ambiguity `TODO.md`'s Client Input Register #4 ("which phone is the
  WhatsApp Business line") flagged as unresolved. Restructured
  `content/site.ts` to explicit `phone`/`whatsapp`/`founderPhone` fields
  and fixed all ~16 call sites site-wide (Header, Footer, WhatsAppButton,
  BookingModal, every enquiry form's fallback contact line,
  ContactSidebar, error/not-found pages, PerformingGroup JSON-LD) so
  `tel:` links use the general number and `wa.me:` links use the WhatsApp
  number specifically, instead of one ambiguous value doing both jobs.
  `founderPhone` is stored as a confirmed fact but not surfaced as a
  public CTA anywhere — no natural display site existed for it, and
  adding one wasn't asked for. `npm run build` + `npm run lint` clean
  (a stale `.phones.join()` call in `WeddingEnquiryForm.tsx` caught by
  `tsc` during the build, not just grep). Verified live: read the actual
  `tel:`/`wa.me:` `href` attributes via DOM query and confirmed they
  resolve to the correct new numbers, and confirmed `/contact`'s sidebar
  now shows both numbers with clear "Call" vs "(WhatsApp)" labels instead
  of an unlabeled list.

- **2026-09-22 — Glassmorphism design pattern established.** Client asked
  for a real glass treatment; a first attempt on `services/ServicesCTA.tsx`
  tinted the whole card in the brand pink and read as "off compared to the
  overall theme." Researched how Apple, Microsoft Fluent, and Material
  Design 3 actually implement glass (`DESIGN.md` §32 has the full
  synthesis) — the research independently confirmed the fix: never tint
  the glass surface itself in a brand color, use a near-opaque dark base
  instead, and reserve translucency for nav/modal/CTA-style layering
  surfaces, never body-copy/forms. Codified as two reusable tiers (Glass
  Panel, Glass Chip), each with a Danza and Nocturne variant, in new
  `app/src/lib/glass.ts`. Client-scoped this pass to fixing the clear gap
  (photo-overlay icon buttons in `Lightbox.tsx`, `Gallery.tsx`,
  `RepertoireActs.tsx`, `LivingArchive.tsx` that had zero blur at all) plus
  normalizing 6 already-glass badges that had silently drifted to
  different opacity/blur values per file — not the wider option of also
  converting 5 pages' hero eyebrow badges, which stays on the table for
  later. `npm run build` + `npm run lint` clean; verified live via
  computed styles and by actually opening the lightbox dialog.

- **2026-09-20 — Contact page rebuilt: Nocturne Stage (most heavily
  fabricated screen so far).** Redesigned against "Contact & Event
  Bookings - Prince Dance Group" (`67222ee050a54d2a977078ce5dc27525`, a
  regenerated version — the earlier `9f9637c8aaa54d39b79cfe9c0fc027e5`
  screen with the same title is superseded). Plan: `DESIGN.md` §15. Beyond
  the usual invented stats and fabricated founder-adjacent claims, this
  screen had: (1) contact details — phone, email, *and* address/pincode —
  that all differ from this file's confirmed facts, replaced with the
  real ones; (2) an entirely invented international-office network
  (Mumbai/Delhi/Dubai/London desks with fake numbers), dropped entirely,
  not placeholder-able; (3) fabricated stage-engineering specs that were
  internally inconsistent between two sections of the same screen (two
  different minimum stage dimensions given for the same claim) — both
  dropped rather than picking one, since publishing false technical specs
  could mislead a real venue, a step beyond the usual "don't misrepresent
  the business" concern. The enquiry form's rich field set was kept and
  wired to the same real `/api/contact` submission logic already used
  elsewhere (honest not-connected handling preserved). FAQ content kept as
  a pattern with genericized, non-fabricated answers rather than dropped
  outright, since FAQs are otherwise real, useful content for a booking
  business.

- **2026-09-20 — About page rebuilt: Nocturne Stage (verified real target
  system).** Redesigned against "About Us & Heritage - Prince Dance Group"
  (`afa18d5ecac3418fb7266442c3f6a3c2`), one of the 4 screens confirmed
  built against the actual "Nocturne Stage" Stitch design-system asset —
  the real target, unlike Home's Danza Theatrical which used an
  unconfirmed draft (see the earlier 2026-09-20 entry below). Plan:
  `DESIGN.md` §14. Same two watch-items recurred from Home's redesign: a
  fabricated founder quote (dropped, not placeholder-labeled) and
  unconfirmed prestige claims (Commonwealth Games Opening again, plus new
  ones: Lincoln Center/Dubai Opera, 100M+ viewers, 45+ nations toured, a
  "Prince Performing Arts Gurukul" residential-academy claim — all
  dropped). The rich real cultural-pillar content (Guru-Shishya Parampara
  etc.) was reused verbatim from `content/home.ts`. Real, previously-
  published content (Naveen Patnaik's real recognition quote, other real
  testimonials) was kept and restyled rather than dropped, filling the
  "State & National Laurels" slot with real content instead of a bare
  placeholder for the unconfirmed CM-felicitation claim. **Caught and
  fixed a real icon-fidelity bug before shipping**: the new `Pillars.tsx`
  initially reused `philosophyPillars`' own `icon` field verbatim (built
  for Home's Danza icon set — `person_celebrate`/`masks`/
  `volunteer_activism`), which isn't in this page's actual allowed icon
  list (`DESIGN.md` §14.2). Fixed by overriding with the source screen's
  own icons for these same four pillars (`temple_hindu`/`theater_comedy`/
  `handshake`/`public`) — verified via a full icon audit after the fix,
  zero substitutions remaining. Also re-added Hanken Grotesk (removed
  during Phase 6 cleanup) since Nocturne Stage's body font is Hanken
  Grotesk, not Plus Jakarta Sans — loaded site-wide via `app/fonts.ts`,
  same pattern as Playfair Display's earlier re-add for Danza.
  `npm run build` + `npm run lint` clean; verified in-browser (real
  stats/quotes/pillars present, all fabricated content absent, icon audit
  passed).

- **2026-09-20 — Fixed a real bug: black box behind the header/footer
  logo.** `logo-crest.png` (`app/public/images/brand/`) had no alpha
  channel at all (`sips -g hasAlpha` → `no`) — its "transparent" background
  was actually solid black (`0,0,0`) baked into the pixels, confirmed by
  sampling the rendered `<img>`'s canvas data (alpha=255 even at the
  corners). Against the new Danza Theatrical dark header/footer this read
  as a visible dark square behind the winged-crest emblem. Neither the
  `app/public/` copy nor the `assets/source/` archival copy had real
  transparency, so there was no clean alternate asset to swap in. Fixed by
  processing the image directly (Pillow, installed for this) — a
  threshold+feather color-key that converts near-black pixels (max channel
  ≤10) to fully transparent with a smooth ramp up to full opacity by
  channel value 34, preserving the artwork's own dark tones (e.g. the
  crest's dark-teal center, ~`69,73,75`) while removing the flat black
  background. Verified: `hasAlpha` now `RGBA`, corner pixel `(0,0,0,0)`,
  center pixel opaque; screenshot-confirmed the header logo renders clean
  with no dark box. Only the image file changed — no component, token, or
  doc changed beyond this entry, per explicit instruction to fix only this.

- **2026-09-20 — Client confirmed a new design direction; Home rebuilt
  against it, full-site migration to follow.** Two design-system assets
  landed in the Stitch project the same day: "Nocturne Stage" (dark
  theatrical, Material 3 tokens, used consistently across 4 new screens —
  About & Heritage, Weddings & Celebrations, Productions & Repertoire,
  Contact & Event Bookings) and a separate earlier draft ("Dramatic Stage &
  Academy") that the "Home - Prince Dance Group (Danza Theatrical Refined)"
  screen was actually built against. User confirmed this is the
  client-approved direction and said to scrap the current Phase 6 system
  entirely; for the immediate step, pointed at the Home screen specifically
  and asked for a close match ("every element should resemble the design").
  Plan + full element-by-element real/placeholder/reframe table written to
  `DESIGN.md` §13 before any code changed. Two content issues worth noting
  for future passes: the new Home screen includes a fabricated quote
  attributed to the real founder (dropped, not placeholder-labeled — a step
  past an ordinary invented stat) and wrong contact phone/email that don't
  match this file's confirmed facts (replaced with the real ones). The new
  screen also reintroduces "Academy Masterclasses" / class-schedule framing
  — reframed the same way the original Stitch import's conservatory framing
  was, since no confirmed real teaching/workshop program exists; flagged to
  the user as an assumption worth confirming. Scope of this pass: Home
  only. Migrating About/Services/Gallery/Journal/Contact to Nocturne Stage
  (the more consistent of the two new systems) is tracked as Phase 7, not
  done yet.

- **2026-09-07 — Phase 6 consolidation pass (post-subagent).** After the 5
  parallel subagents (About, Services, Gallery, Journal, Contact) and the
  directly-built Header/Footer all landed, ran a full consolidation:
  - Full `npm run build` + `npm run lint` (clean) — the per-agent runs had
    only been `lint`, to avoid concurrent `.next` cache writes.
  - Site-wide icon audit (own script cross-checking every page's actual
    `material-symbols-outlined` usage against `DESIGN.md` §12): found one
    drift — Home's `MediaShowcase.tsx` used `videocam` for the rehearsal-
    diary placeholder, an icon not in Stitch's actual set for that screen
    (added before the strict zero-substitution requirement existed). Fixed
    by reusing `play_arrow` (already used on the same screen for the audio
    player) instead. Everything else matched exactly. Added a Home row to
    `DESIGN.md` §12 so the table now covers the whole site, not just the
    pages built after it existed.
  - Found and fixed a real responsive bug: `services/ServicesList.tsx`
    (the "full" version of Home's `BookingAvailability` row pattern) showed
    the complete, untruncated service summary rather than Home's
    line-clamped teaser, but kept the same `md:flex-row` breakpoint —
    at ~768–1023px width this crushed the description column to ~70px,
    wrapping it into a tall, barely-readable sliver. Fixed by moving that
    row's breakpoint to `lg:` (1024px), giving the fuller text enough room
    before switching from stacked to horizontal.
  - Fixed the wording flagged during the Services agent's run: Home's
    `BookingCTA.tsx` said "reviewed directly by **the studio**", which
    brushes against the no-school/no-studio-framing rule — changed to
    "reviewed directly by our team". The About and Contact agents were
    told about this in their (relaunched) prompts and both independently
    avoided the word themselves.
  - Dead-code elimination now that every page is migrated: deleted
    `Button.tsx`, `Badge.tsx`, `SectionLabel.tsx`, `Container.tsx`,
    `CTASection.tsx`, `MilestonesStrip.tsx` (verified zero remaining
    importers first), removed Playfair Display/Hanken Grotesk font loading
    from `layout.tsx` (body font is now `font-jakarta` throughout), and
    rewrote `globals.css` to drop every §1–6-era token except the four
    DESIGN.md §9.1 explicitly marks "reused" (`on-primary`,
    `surface-container-lowest`, `error`, `error-container`) — also fixed
    the base `body{}` rule and `:focus-visible` outline, which had been
    pointing at now-deleted tokens.
  - In-browser verification: Home, About, Services (list + a detail page),
    Gallery, Journal (list + a detail page), and Contact all checked after
    a full server restart — real content confirmed via page text/DOM
    inspection (a known tool quirk makes screenshots unreliable above
    ~900px viewport width or immediately after a JS-triggered scroll — see
    the Phase 5 entry below; this session relied on `get_page_text`/DOM
    queries for anything past the first viewport at wider sizes). Contact
    form re-verified to still show the honest "not yet connected" message
    rather than a fake success.
  - Two of the five original subagents (About, Contact) were terminated
    mid-run by an infrastructure rate limit, not a task error, and were
    relaunched fresh once the limit reset — both completed cleanly on retry.

- **2026-09-06 — Full-site Stitch-exact migration requested.** Following
  the Home page rebuild, user asked to extend the exact-match treatment to
  every other page and to the shared Header/Footer, with an explicit
  zero-tolerance requirement on icon fidelity ("icons used should be the
  same as the design with 0 variations"). `DESIGN.md` §9's scope note was
  promoted from "Home only" to site-wide; added §12, a per-page table of
  which Stitch export file to match and the exact `material-symbols-outlined`
  icon names used on it (extracted directly from each screen's exported
  HTML). Old §1–6 (Playfair Display/editorial system) is kept only as a
  historical record until Phase 6 fully replaces its usage. User explicitly
  authorized using subagents/parallel workflow for this — pages are
  independent enough (separate routes/content files) to parallelize safely
  once shared tokens + Header/Footer exist.

- **2026-09-06 — Home page design system corrected to the real Stitch
  screens.** User asked for the Home page to match Google Stitch's Home
  screen exactly. Investigating the actual exported HTML of every Stitch
  screen showed they all consistently use Plus Jakarta Sans + Material
  Design 3 color tokens + rounded shapes — a completely different (and
  apparently the *only actually used*) system from the Playfair
  Display/editorial one `DESIGN.md` §1–6 was built from (which came from an
  unused project-level doc). Added the real, verified system as `DESIGN.md`
  §9, plus a full element-by-element real/placeholder/reframed content plan
  as §10, and a placeholder-component convention as §11. Scope: Home page
  body content only, for now — other pages and the shared Header/Footer
  stay on the old system until/unless a full-site migration is requested
  (tracked as a Phase 5 item below).

- **2026-09-06 — Content source override.** The Google Stitch design import
  ("Prince Dance Group Website", `projects/14513562789089232297`) generated
  page copy for a fictional NYC ballet conservatory (fake address, fake
  founding year, fake staff, tuition/audition flow). Cross-checked against
  the real business via two source PDFs in this repo (Wayback Machine
  captures of princedancegroups.com from Dec 2024 and Apr 2025). Decision:
  keep the Stitch **visual design system** (`DESIGN.md`), discard all Stitch
  **page copy**, rebuild the information architecture around the real
  booking/portfolio business. Full rationale in `ARCHITECTURE.md` §0 and
  `DESIGN.md` §7. User was notified and did not redirect.
- **2026-09-06 — Tech stack.** Next.js (App Router, TypeScript) + Tailwind
  CSS, local typed content files (no CMS yet), Netlify as deploy target.
  `create-next-app` scaffolded Next.js 16 / Tailwind v4 — newer than
  originally assumed; ARCHITECTURE.md's "14+" framework line and its
  Tailwind description were corrected to match (Tailwind v4 uses CSS-first
  `@theme` tokens, not `tailwind.config.ts`). See `ARCHITECTURE.md` §2.
- **2026-09-06 — Spacing tokens fixed after a real bug.** Initially defined
  DESIGN.md's spacing scale (xxs–4xl) as custom `--spacing-*` theme keys in
  `globals.css`. Tailwind v4 already uses those exact names internally for
  its `max-w-*`/`w-*`/`size-*` scale, so this silently overwrote
  `max-w-md`/`max-w-xl`/etc. app-wide (`max-w-md` resolved to `1rem`,
  visible on `/` as body text wrapping one word per line). Caught via a
  browser preview screenshot during setup. Fixed by implementing the named
  scale through Tailwind's built-in *numeric* spacing utilities instead
  (`gap-6`, `p-10`, …) — see the mapping table in `DESIGN.md` §4 — and kept
  only the genuinely custom `page-desktop`/`page-mobile` gutter tokens.
- **2026-09-06 — Real assets recovered.** Extracted usable real images from
  the source PDFs via `pdfimages`: logo crest, founder portrait (Krishna
  Mohan Reddy), 5 performance photos, 3 blog/press thumbnails, and 7
  testimonial headshots (public figures) — staged in `assets/source/images/`.
  These are unoptimized originals; Phase 1 copies/optimizes what's used into
  `app/public/images/`.

## Real facts confirmed (safe to use as-is)

| Field | Value | Source |
|---|---|---|
| Business name | Prince Dance Group | both PDFs |
| Founder / choreographer | Krishna Mohan Reddy | both PDFs |
| Origin | Berhampur, Ganjam, Odisha, India; troupe of 26 daily-wage workers | old website.pdf p.1 |
| Claim to fame | Winner, *India's Got Talent* Season 1 ("Krishna Act") | old website.pdf p.1 |
| Notable appearances | IPL Chennai inauguration; *Kaun Banega Crorepati* (Sony TV); opening act, *IGT* Season 4; "Who is the Greatest Indian" (History Channel); NDTV-Toyota Greenathon (NDTV 24×7) | old website.pdf p.1 |
| Address | Art Performing Building, In front of Pantho Niwas, Gopalpur, Pin – 761002 | both PDFs, footer |
| Phone (general/booking) | +91 96924 53808 | client (Murali Sahu), 2026-09-24 |
| Phone (WhatsApp, dedicated) | +91 82709 23491 | client (Murali Sahu), 2026-09-24 |
| Phone (Krishna Mohan Reddy, Founder & Choreographer, direct) | +91 98611 80053 | client (Murali Sahu), 2026-09-24 — confirmed fact, not currently shown as a public CTA anywhere on the site |
| Email | princedancegroup09@gmail.com | both PDFs |
| Services (9) | Corporate Events, Wedding Events, TV Award Show, Musical Acts, Religious Events, School/College Function, Mahotsavs, Music Video/Movies, Promotion Shoots | Services PDF |
| Testimonials | Naveen Patnaik, V.K. Pandian (former IAS, Ganjam), Shah Rukh Khan, Sonali Bendre, Kirron Kher, Shekhar Kapur, Dharmendra | old website.pdf p.4 |
| Social | Facebook, X/Twitter, YouTube, Instagram (handles visible in Services PDF header — re-confirm exact handles before linking) | Services PDF |

**Still needed from the client** (do not fabricate): current social media
handles/URLs (only referenced, not fully readable, in the source PDF),
detailed service-page copy per offering, updated/current performance photos
if the client wants fresher material than the recovered set, a current press
list beyond what's in the PDFs, and a decision on whether public-figure
testimonial photos may be displayed (see `ARCHITECTURE.md` §6).

## Phase checklist

### Phase 0 — Docs & design groundwork ✅ done (2026-09-06)
- [x] Reconcile Stitch design vs. real business content (see decisions log)
- [x] `ARCHITECTURE.md` written and binding
- [x] `DESIGN.md` written (tokens + corrected site map)
- [x] `CLAUDE.md` written
- [x] `PROGRESS.md` (this file) created
- [x] Real assets recovered from source PDFs into `assets/source/images/`

### Phase 1 — Project scaffolding ✅ done (2026-09-06)
- [x] `npx create-next-app` (TypeScript, Tailwind, App Router, `src/` dir) into `app/` — scaffolded Next.js 16 / Tailwind v4 (newer than originally planned; ARCHITECTURE.md updated to match) — **still current**
- [x] ~~Theme tokens defined in `src/app/globals.css`'s `@theme` block from every token in `DESIGN.md` §2–4~~ — **superseded by Phase 6**: those §2–4/editorial tokens were fully removed once every page migrated; `globals.css` now holds only the `DESIGN.md` §9 system
- [x] ~~Fonts wired via `next/font/google` (Playfair Display, Hanken Grotesk)~~ — **superseded by Phase 6**: both removed, Plus Jakarta Sans (`fonts.ts`) is now the only font, applied globally
- [x] Base layout: `Header` (with mobile nav), `Footer` — shells existed from Phase 1, but their actual implementation is now the Phase 6 versions (see below), not what was originally built here
- [x] `src/content/site.ts`, `services.ts`, `testimonials.ts`, `gallery.ts`, `journal.ts` — real business facts + content, typed — **still current**, reused as-is by every later phase

### Phase 2 — Pages ✅ done (2026-09-06) — **superseded by Phase 6, kept for history**
The original build of every route below. All six were fully replaced during
Phase 6 (different visual system, mostly different components/content
structure) — this entry is accurate for what existed on 2026-09-06, not for
what ships today. See Phase 6 for the current implementation of every route.
- [x] `/` Home (hero, milestones, service preview, testimonials, CTA)
- [x] `/about` (origin story, founder profile, milestones, Naveen Patnaik recognition)
- [x] `/services` + `/services/[slug]` (all 9 real offerings)
- [x] `/gallery` (5 real performance photos)
- [x] `/journal` + `/journal/[slug]` (3 real press/blog titles)
- [x] `/contact` (real phone/email/address + enquiry form)
- [x] Verified in-browser: all 6 top-level routes screenshot-checked, desktop + mobile (375px), fonts/colors/spacing/images render correctly, `npm run build` and `npm run lint` both clean

### Phase 3 — Content & polish (partially done)
- [x] Optimize + copy chosen images into `app/public/images/` (logo, founder portrait, 5 gallery photos, 3 journal thumbnails, Naveen Patnaik photo — converted to sized JPEGs via `sips`)
- [ ] Write real per-service copy (needs client input — `src/content/services.ts`'s `detail` field is still `TODO(content)`; the live `/services/[slug]` pages already render this honestly via the `PlaceholderNote` component ("Detailed service information coming soon") rather than showing the raw TODO string or inventing copy — just needs the real text once the client supplies it)
- [x] Contact form route handler — intentionally stubbed with an honest "not yet connected" response until an email provider (`RESEND_API_KEY`/`CONTACT_TO_EMAIL`) is configured; verified in-browser (twice — Phase 2 and again after the Phase 6 restyle) that submitting shows the honest message rather than a fake success
- [ ] Full accessibility audit (contrast, focus states, alt text, and keyboard nav were built in per ARCHITECTURE.md §1 rule 9, but not formally audited with a tool)
- [ ] Lighthouse/perf pass
- [ ] Write full journal article bodies (currently `TODO(content)` — the source PDF only captured post titles/teasers; `/journal/[slug]` already renders the gap honestly via `PlaceholderNote` rather than fabricated text — same pattern as the service-detail item above)

### Phase 4 — Launch (not started)
- [ ] Confirm real social media handles with the client (Facebook/X/YouTube/Instagram — referenced but not fully legible in the source PDF), then add them to `Footer.tsx` — it currently renders no social links at all rather than linking to unconfirmed handles
- [ ] Client sign-off on public-figure testimonial photo usage
- [ ] Netlify site connected, env vars set
- [ ] Preview deploy reviewed with user
- [ ] Production deploy (explicit go-ahead required)

### Phase 5 — Home page Stitch-exact redesign ✅ done (2026-09-06)
- [x] Plan written: `DESIGN.md` §9 (tokens), §10 (element-by-element content plan), §11 (placeholder convention); `CLAUDE.md` build-order checklist
- [x] New `home-*` tokens added to `globals.css`, Plus Jakarta Sans + Material Symbols wired to `/`
- [x] `Placeholder` UI primitives built (`src/components/ui/Placeholder.tsx`)
- [x] Home sections rebuilt per DESIGN.md §10 (Hero, LiveProductionBanner, StatsRow, RepertoireGrid, PhilosophyGrid, BookingAvailability, MastersGrid, MediaShowcase, BookingCTA)
- [x] Verified in-browser (desktop + mobile against the live Stitch reference), `npm run build` + `npm run lint` clean

### Phase 6 — Full-site migration to the Stitch-exact system ✅ done (2026-09-07)
Per-page Stitch source + exact icon inventory: `DESIGN.md` §12 (now includes
a Home row too, added during consolidation). Build method for each:
`CLAUDE.md` "Site-wide Stitch-exact migration". Five pages were built by
parallel subagents per the user's explicit request to use them; two (About,
Contact) hit an infra rate limit mid-run on the first attempt and were
relaunched fresh — both retries completed cleanly.
- [x] `Header` — exact structure ported from Home's own header markup (two-line logo lockup, "Now Booking" pill, underline-on-hover nav via `after:` pseudo-element, `tel:` quick-link, mail ghost-link, primary CTA), real nav/contact data. Also fixed a real pre-existing bug in the same pass: the wordmark used to wrap to 3 lines and overlap the nav at ~800px width.
- [x] `Footer` — exact 5-column structure ported, real address/phone/services/page links (no fictional NYC studio, no dead policy links)
- [x] `/about` — rebuilt against `about_light.html`; fictional stats/faculty/testimonials swapped for real ones already typed (`home.ts`'s `heroStats`/`philosophyPillars`, `testimonials.ts`)
- [x] `/services` + `/services/[slug]` — rebuilt against `classes.html` (reframed like Home's Booking Availability, all 9 real services) + `faculty.html` (detail card)
- [x] `/gallery` — rebuilt reusing Home's `RepertoireGrid` card pattern (no dedicated Stitch screen exists for this route)
- [x] `/journal` + `/journal/[slug]` — rebuilt against `journal.html`
- [x] `/contact` — rebuilt against `contact.html` (+ `get_in_touch.html` for form UX); `ContactForm.tsx`'s working submit logic kept byte-identical, only restyled
- [x] Icon audit: grepped every page's `material-symbols-outlined` usage and diffed against `DESIGN.md` §12 — one drift found and fixed (Home's `MediaShowcase.tsx` used `videocam`, not part of any Stitch icon set; swapped for `play_arrow`, already used elsewhere on Home for the same "inert placeholder" purpose). Every other page matched exactly, several agents correctly *omitting* allow-listed icons that had no real content to attach to rather than forcing them in.
- [x] Full-site `npm run build` + `npm run lint` — both clean
- [x] Old §1–6 system fully dead-code-eliminated: deleted `Button.tsx`, `Badge.tsx`, `SectionLabel.tsx`, `Container.tsx`, `CTASection.tsx`, `MilestonesStrip.tsx` (confirmed zero remaining importers first), removed Playfair Display/Hanken Grotesk font loading from `layout.tsx`, removed every old-system token from `globals.css` (kept only the 4 tokens DESIGN.md §9.1 explicitly marks "reused": `on-primary`, `surface-container-lowest`, `error`, `error-container`), fixed the base `body{}` rule and `:focus-visible` outline color which referenced now-deleted tokens. `DESIGN.md` §1–6 itself is kept as a historical record (as already noted in §9) — nothing in code references it any more.
- [x] In-browser verification — see the decisions log entry below for what was checked

### Phase 7 — Client-confirmed redesign: Danza Theatrical / Nocturne Stage (in progress, started 2026-09-20)
Plan: `DESIGN.md` §13 (Home's element-by-element table). Build note:
`CLAUDE.md` "Danza Theatrical Home redesign". Supersedes Phase 6's Home
implementation; every other page stays on Phase 6 until migrated here too.
- [x] `/` Home rebuilt against the "Danza Theatrical Refined" screen (bespoke `surface-stage/card/elevated`, `danza-crimson/gold/cyan` tokens, Playfair Display re-added scoped to Home only)
- [x] Real facts substituted for the screen's fabricated ones: stats (reuse `heroStats`), contact phone/email (use `PROGRESS.md`'s confirmed numbers, not the screen's), unconfirmed prestige claims (Commonwealth Games/G20/Rashtrapati Bhavan → dropped, real notable-appearances list used instead)
- [x] Fabricated founder quote dropped entirely (not placeholder-labeled)
- [x] "Academy Masterclasses" schedule reframed to the real event-booking model, same method as Phase 6's `BookingAvailability` — nav stays the real site nav, not "Academy & Workshops"
- [x] 2 fictional team members (Vidushi Sunita Sahu, Ustad Ramesh Mahapatra) → `Placeholder` cards
- [x] Audio section → inert placeholder (no real asset exists); showreel CTA rendered disabled with "coming soon" rather than a separate video-diary section (the source screen only has the one video reference, in the hero CTA)
- [x] `npm run build` + `npm run lint` clean; in-browser verification (page text/DOM inspection — real content, real contact info, no fake quote/instructor names, icon usage audited against DESIGN.md §13.4, no server errors)
- [x] `Header` / `Footer` — rebuilt against the same Home screen's own header/footer markup (DESIGN.md §13.6): real logo/nav/CTA, real footer stat/repertoire/nav content, honest non-loyalty-club newsletter block, real copyright. This reskins them site-wide immediately (shared across every route) — `/about`/`/services`/`/gallery`/`/journal`/`/contact` now sit under a dark header/footer while their own body content stays on the light §9 system, an intentional mid-migration seam, not a bug.
- [x] `/about` rebuilt against "About Us & Heritage" (Nocturne Stage — verified real target system, unlike Home's draft). Plan: `DESIGN.md` §14. Real cultural pillars reused verbatim from `content/home.ts`; fabricated founder quote dropped (not placeholder-labeled, same as Home); unconfirmed prestige claims (Commonwealth Games Opening, viewer/nation counts, Lincoln Center/Dubai Opera) dropped; 4 fictional team members → `Placeholder` cards; "Prince Performing Arts Gurukul" residential-academy claim dropped (same §0 business-model issue as Home's "Academy Masterclasses").
- [x] `/contact` rebuilt against "Contact & Event Bookings" (regenerated screen `67222ee050a54d2a977078ce5dc27525`). Plan: `DESIGN.md` §15. Real contact details fixed (phone/email/address/pincode all differed from confirmed facts); fictional international-office network dropped entirely; internally-inconsistent fabricated stage specs dropped entirely rather than picking one to keep; rich enquiry form kept and wired to the real `/api/contact` logic; FAQ kept as a pattern with genericized, non-fabricated answers.
- [x] `/gallery` rebuilt against "Productions & Repertoire" (`dabaf3f8e1484d90ae82fa35ec7df8d5`). Plan: `DESIGN.md` §16. Fills the gap §12 flagged (no dedicated Stitch screen previously existed for this route). Real repertoire act names/mythological descriptions kept (Dashavatar, Krishna Leela, Shiva Tandava — same "real name, placeholder specifics" treatment §13/§14 gave Shiva Tandava); Vande Mataram + Surya Namaskar merged back into the one real combined repertoire piece already in `content/home.ts` rather than split into two invented cards; a full fake "Master Technical Document" stage-rider modal (exact ft/dB/moving-head/litre figures) dropped entirely, same reasoning as `/contact`'s rider — the four icon-headed spec categories kept as structure with generic "confirmed on enquiry" copy, no invented numbers; category-filter pills with an invented count/taxonomy dropped; "Academy & Workshops" nav item not adopted (recurring, per `ARCHITECTURE.md` §0).
- [x] `/services` + `/services/[slug]` shell migrated to Nocturne Stage tokens (real content unchanged); `wedding-events` slug additionally rebuilt against "Weddings & Celebrations" (`087af2350a10422481feed3c00a00596`). Plan: `DESIGN.md` §17. The most severe fabrication found in this whole migration: testimonials attributed to a real, identifiable wedding planner ("Devika Narain") and a real event company ("Cineyug Celebrations") — dropped entirely, not placeholder-able. A "Global Destination Portfolio" naming 6 real luxury venues (implying a fabricated past-engagement history) also dropped entirely. Real repertoire (Dashavatar, Krishna Leela) reframed as wedding-entry acts kept, invented specifics on top dropped. The other 8 services keep the shared generic template — no source screen covers them.
- [x] `/journal` + `/journal/[slug]` reskinned to Nocturne Stage tokens. Plan: `DESIGN.md` §18. No new dedicated Stitch screen exists for Journal — the only screen with that title is still on the original Phase 6 Material 3/Jakarta tokens — so this is a pure token migration; every real/dropped content decision already made in Phase 6 carries over unchanged.
- [x] **Phase 7 complete** — every page (Home, Header/Footer, About, Contact, Gallery, Services, Journal) is now on Danza Theatrical / Nocturne Stage. Remaining open item below (Academy & Workshops) still needs client confirmation.
- [x] Site-wide fidelity audit (2026-09-20, `DESIGN.md` §19): ran a dedicated element-by-element check of each migrated page against its raw Stitch source export, independent of the build-time DESIGN.md tables, to catch drift. Found and fixed 3 real bugs — two swapped icons on Home (`stars`/`trophy` on the two hero badges), a missing third Footer link ("Rider Requirements"), and a genuinely missing bespoke hero on `/services/wedding-events` (§17.2 row 2 was planned but never built — added `WeddingHero.tsx`). Also found 4 documentation-only gaps (real content that was never written back into DESIGN.md's tables — see §19 for the list) — no code changes needed for those, only doc completeness. Gallery and the rest of Services/Wedding had zero deviations. Re-verified `npm run build` + `npm run lint` clean after fixes.
- [ ] **Needs client confirmation, not assumed**: does the real business now include teaching/workshops? The new Home screen prominently features an "Academy & Workshops" nav item and section; this pass reframed it back to event-booking on the assumption that it doesn't, per `ARCHITECTURE.md` §0's existing no-school rule — flag this back to the user/client rather than silently deciding either way long-term.
- [x] Home page UI/UX redesign (2026-09-20, `DESIGN.md` §20): client flagged no testimonials/gallery, 9 distracting buttons in "Available for Your Event," no hierarchy, an overloaded enquiry form. Ran two independent research passes (UI expert + UX specialist) before writing any code; full plan approved at `~/.claude/plans/dazzling-imagining-crayon.md`. Shipped: new section order with **Testimonials** and **Gallery** added (both built from real, previously-unused content — 7 real quotes, 5 real photos); `MediaShowcase.tsx` (permanently inert placeholder) deleted; Founder story simplified and moved up from position 6 to 3; BookingAvailability's 9 per-row buttons collapsed to one section-level CTA, rows now informational and link to a pre-select-and-scroll flow into Home's own form; EventEnquiry cut from 7 to 4 always-visible fields (added a real Phone field, demoted Email to optional, rest behind a disclosure toggle) and a real select-default bug fixed (`api/contact/route.ts` validation loosened from requiring email to requiring email-or-phone to match). Bundled fixes found during the audits: a dark-on-dark contrast bug in `Placeholder.tsx` (new `tone="on-danza"` option), and Header's mobile-nav breakpoint (was `xl:`, hid the nav on real laptop widths — now `lg:`). `npm run build` + `npm run lint` clean; verified in-browser at desktop/1100px/mobile widths plus a live functional test of the row-click → pre-select → submit flow and the relaxed API validation.
- [x] Home Gallery + Testimonials functionality pass (2026-09-20, `DESIGN.md` §21): client called Testimonials "a prime highlight" and asked for real functionality on both it and Gallery, plus a proper grid (not the §20 masonry) and an honest YouTube video placeholder. Shipped: Gallery rebuilt as a uniform 2/3-col grid with a 6th "Highlight Reel — Coming Soon" placeholder tile (dimmed real photo, neutral play icon, no fake video) and a real click-to-enlarge lightbox (prev/next, keyboard, click-outside-to-close, body-scroll lock); Testimonials got real prev/next controls, pause-on-hover/focus, keyboard nav, and a fade transition (new `.animate-fade-in` keyframe in `globals.css`) on top of the existing auto-rotate + dots. No new content — same real 5 photos / 7 quotes. `npm run build` + `npm run lint` clean; verified lightbox nav, Escape-to-close, and carousel prev/next in-browser at both mobile and desktop breakpoints.
- [x] Site-wide link audit (2026-09-20): checked every internal `href`/`Link` target across the codebase against real `page.tsx` files/`generateStaticParams` output. **Zero broken links, zero orphaned pages** — every one of `/`, `/about`, `/services` (+9 real service slugs), `/gallery`, `/journal` (+3 real article slugs), `/contact` is both real and reachable from real navigation. Fixed a stale contradiction in this file's own "How to resume" note (previous section, now struck through) claiming the site still had two design systems live mid-migration — that was true weeks ago, not since Phase 7 closed.
- [x] Contact page UI/UX redesign (2026-09-20, `DESIGN.md` §22) — first of the "Home-style treatment" passes now being applied to every remaining page, per explicit client request. Same independent-research method as §20. Findings: the enquiry form had 10 always-visible fields (worse than Home's original 7), the same select-default bug from Home was confirmed present (fixed identically), phone made required/email optional (independently re-justified for this page, not just inherited from Home), "Requested Acts" moved behind a new disclosure toggle, the form given a proper card shell (previously the one unframed element on a page of bordered cards), the two dead "coming soon" pills replaced with one honest line, sidebar phone numbers made tap-to-call. Added a single static testimonial (V.K. Pandian — the one quote neither Home's carousel nor About's grid leads with/uses) between the booking section and FAQ as last-mile trust. **Bundled fix applied site-wide**: `Placeholder.tsx` gained a `tone="on-nocturne"` option (the same dark-on-dark contrast bug §20 fixed for Danza pages also existed, unfixed, on every Nocturne Stage page) — applied at all 8 call sites across About, Gallery, Services, Journal, and Contact in one pass rather than rediscovering it per future page. `npm run build` + `npm run lint` clean; verified in-browser (form disclosure toggle, select placeholder fix, tel: links, relaxed API validation, testimonial rendering).
- [x] Lightweight audit of the 4 remaining pages (2026-09-20, `DESIGN.md` §23) — client asked for a token-light single-pass audit this time (no parallel research agents). No code changed. Key findings: `/services` list has the exact same "9 identical buttons" problem Home had; `WeddingEnquiryForm` requires email instead of phone with no disclosure toggle (same already-solved pattern); Gallery's `RepertoireActs` has 4 repeated CTAs; About's `MastersGrid` is largely redundant fictional-placeholder content sitting right after the real `Founder` section, same shape as the section Home already cut. Suggested order: Services → About → Gallery → Journal.
- [x] §23 Priority 1 & 2 bug fixes applied (2026-09-20, same day as the audit): `ServicesList.tsx`'s 9 repeated "Enquire to Book" buttons removed (rows now link to their detail page, existing `ServicesCTA` below already covers the one real CTA); `WeddingEnquiryForm.tsx` swapped to Phone-required/Email-optional with a disclosure toggle and fixed its select-placeholder bug (all three matching the already-established Home/Contact pattern); About's `MastersGrid.tsx` (4 fictional placeholder team cards, redundant with the real `Founder.tsx` above it) deleted. Gallery's `RepertoireActs` was assessed and found already correctly de-emphasized (text links, not buttons) — no change needed there. `npm run build` + `npm run lint` clean; verified all three fixes in-browser via DOM checks.
- [x] Gallery structural fidelity rebuild (2026-09-20, `DESIGN.md` §24): client reported `/gallery` "looks nothing like the design." Re-examined the actual reference screen (locally re-rendered and screenshotted) and found the original §16 build only matched at the content level, never the layout — the real design is an 8/4 hero split with a compact stat card, filter pills, 3 full-width alternating "hero card" acts (image/content swapping sides, badges, 2×2 stat grids, dual CTAs), a 2-act bento grid, and a 4-tile bulleted tech-requirements section, nothing like the small uniform 4-card grid originally shipped. Rebuilt `GalleryHero.tsx`, `RepertoireActs.tsx` (also split Vande Mataram/Surya Namaskar back into 2 acts to match the source's real "5 masterworks" structure — a presentation change, not a new fabricated fact, since both names are already real content used elsewhere), and `TechnicalRequirements.tsx` to match. Every specific invented number (cast counts, proscenium footage, decibel levels, etc.) still replaced with honest "On request" in the same visual slot — structure matches exactly, no new fabrication. `npm run build` + `npm run lint` clean; verified section-by-section against the locally-served reference at 1440px.
- [x] Mobile menu redesign (2026-09-20, `DESIGN.md` §25): client asked for a blurred panel with theme-colored bokeh and big per-page buttons, replacing the old small accordion dropdown. Rebuilt `Header.tsx`'s mobile nav as a full-height overlay (heavy backdrop blur, 3 slow-breathing blurred crimson/gold/cyan orbs, large rounded-button nav items with staggered fade-in). Found and fixed two real bugs in the process: (1) the header's own `backdrop-blur` was silently collapsing the panel to zero height by becoming its `position: fixed` containing block — fixed by moving the panel to be a sibling of `<header>` instead of a child; (2) the toggle button couldn't close the menu once open, due to a mousedown/click race with the outside-click handler — fixed by excluding the toggle button from that check. `npm run build` + `npm run lint` clean; verified opening/closing and the visual treatment in-browser at 375px.
- [x] Home bokeh glow + two more fixes (2026-09-20, `DESIGN.md` §26): added the mobile-menu's blurred theme-color bokeh glow (dampened opacity, no dark scrim here unlike the menu) to `RepertoireGrid.tsx` and `BookingAvailability.tsx` per client request. Fixed a real layout bug in `RepertoireGrid`'s "Book This Act" row (note + CTA were squeezed onto one line and wrapped/collided at actual card width — now stacked, CTA is a proper pill button). Shortened `BookingAvailability` (client: "seems really long") by removing two blocks repeated identically on all 9 rows (stating them once in the header instead) and switching to a 2-column grid at `lg:`, roughly halving its height. `npm run build` + `npm run lint` clean; verified all three in-browser.
- [x] Footer UI improvement (2026-09-20, `DESIGN.md` §27, site-wide shared chrome, not page-scoped): added a real "Get in Touch" column (phone/email/address, same tel:/mailto:/maps link pattern as `ContactSidebar.tsx`) — previously the footer had no direct contact info anywhere except a real email buried in a tiny footnote. Replaced the newsletter's disabled-input-and-button (looked like a broken form) with a single honest "Signup coming soon" note. Added the site-wide bokeh glow (§25/§26) for visual continuity with the rest of the redesigned chrome. Rebalanced the column grid to fit the new Contact column, and fixed legal-links wrapping on narrow screens. `npm run build` + `npm run lint` clean; verified on both a Danza page and a Nocturne Stage page since Footer is shared site-wide.
- [x] About page UI/UX redesign (2026-09-20, `DESIGN.md` §28) — same "Home-style treatment" as Home §20/Contact §22 (two independent research passes, UI expert + UX specialist, before any code changed). Findings converged on pure visual/narrative issues (no more content-fabrication cuts left after §23's `MastersGrid` removal): 6 of 7 sections repeating the same card-shell skeleton with no hierarchy; Founder and Timeline both retelling the same origin story with no differentiation; Founder's paired 1:1 card giving a third-party quote equal weight to the founder; Timeline's line-and-dot metaphor overselling 3 undated facts; LivingArchive's photo tiles having a hover-zoom "clickable" affordance with no actual link. Shipped: section order changed to move Timeline right after Hero (one continuous history chapter before Founder's "the man today" chapter); `Founder.tsx` rebuilt as a single uncontested shell (matching Home's `FounderSpotlight.tsx` precedent), dropping a redundant hardcoded sentence and moving the Patnaik quote card into Testimonials; `Timeline.tsx` reformatted from line-and-dot to a 3-card numbered-badge grid (same idiom as Pillars); `LivingArchive.tsx` now uses all 5 real gallery photos (2 previously unused) in an asymmetric bento layout, every tile linking to `/gallery`; `Testimonials.tsx` expanded from 4 to all 7 real quotes (activating Patnaik, V.K. Pandian, Sonali Bendre) and swapped its decorative 5-star row for an honest quote-mark glyph; `CTA.tsx` got the site's bokeh glow (first use on a Nocturne Stage page) and a demoted secondary CTA now that LivingArchive handles gallery-browsing intent; `Hero.tsx` got a one-line color-token bug fix (stat values were rendering in an off-brand pink, not gold). `npm run build` + `npm run lint` clean; verified in-browser at default and 1400px widths (asymmetric bento grid specifically).
- [x] Site-wide consistency pass (2026-09-21, `DESIGN.md` §29): client asked in one request for (1) a bokeh/design consistency check on every page, (2) UI improvements wherever needed, (3) the header's "Book for Events" CTA to open a popup form instead of navigating away, (4) a bug hunt on every page, (5) simpler vocabulary site-wide. Built a new `BookingModal.tsx` (compact 4-field enquiry form over a dark bokeh backdrop) and wired both header "Book for Events" buttons (desktop + mobile) to open it instead of linking to `/contact`. Simplified the shared `content/home.ts` (`philosophyPillars` English descriptions) and `Footer.tsx` myself first, then ran one general-purpose agent per remaining page (Home, About, Contact, Gallery, Services, Journal) in parallel, each scoped strictly to its own files to avoid collisions. Real bugs found and fixed: a Gallery lightbox caption clipping risk on Home, a grammar slip + Inquiry/Enquiry spelling inconsistency + broken background-alternation rhythm on Contact, the same footer-note/CTA line-collision bug from Home's `RepertoireGrid` recurring unfixed in Gallery's `RepertoireActs` bento cards, the exact "9 identical repeated blocks" problem from Home's old `BookingAvailability` recurring unfixed in `ServicesList.tsx`, and a genuine dead-end on Journal's article detail page (no way to keep reading). Services also got real UI investment for the first time (icon-per-row list, a proper hero, and two new honest sections — `HowItWorks.tsx`/`RelatedServices.tsx` — on the previously-thin generic service-detail template). Bokeh added, following the established dampened-opacity convention, to Home's `EventEnquiry`, Contact's `BookingSection`, Gallery's `GalleryHero`/`GalleryCTA`, Services' `ServicesHero`/`ServicesCTA`, and Journal's header/closing block. Heavy jargon simplified across every page ("Proscenium Masterworks" → "Our Repertoire", "The Proscenium Awaits" → "Book Your Event", "synchronized human architecture" → "a powerful stage opener", etc.) — real facts, names, and every testimonial quote left untouched verbatim. `npm run build` + `npm run lint` clean across the whole site; verified in-browser across all six pages plus the new modal on desktop and mobile.
- [x] Full-project audit + phased build plan written to `TODO.md` (2026-09-21): three parallel read-only audits (SEO, content/repetition, features+integrations+accessibility) across all 21 routes, with every serious claim then verified directly against the source. Headline findings: (1) **no enquiry can reach the business** — all 4 live forms POST to `/api/contact`, which returns 501 unconditionally, so every CTA on every page funnels into a dead form; (2) several **unconfirmed facts are live** — three contradictory invented troupe-size ladders, "Worldwide Touring Ensembles"/"world tours"/"Global Touring Production", a "Signature 26-artist" cast claim, a promised technical rider that doesn't exist, and two different acts each credited with winning IGT Season 1 (`RepertoireActs.tsx:33` badges Dashavatar "IGT Season 1 Climax" while `content/gallery.ts:14` and this file both say it was the Krishna Act); (3) **zero OG/Twitter tags and zero canonicals** sitewide, plus Home's `?interest=` links generating 9 duplicate crawlable URLs, and a sitemap that would bake in `localhost:3000` without `NEXT_PUBLIC_SITE_URL`; (4) **5 real photos across 33 placements** (`krishna-leela-1.jpg` appears 4× on Home alone; two service pages are pixel-identical); (5) **no `prefers-reduced-motion` handling at all** despite 32 continuously-animating blurred orbs, a global focus ring at 2.88:1 on dark surfaces (effectively invisible sitewide), no skip link, and neither modal trapping or restoring focus. Also found: `content/home.ts`'s `repertoire` export is dead code while 5 components hardcode competing copies of the same acts (the root cause of most repetition), `sections/ContactForm.tsx` is dead code, and `ARCHITECTURE.md` §1 rules 2–3 and §2's fonts row have drifted from the shipped site. Plan is phased 0–8 with a consolidated 21-item client-input register; nothing implemented yet.
- [x] TODO.md Phase 0.3, batch 1 (2026-09-21): removed the invented-fact
  violations `TODO.md` flagged as live. **Fixed the IGT-win contradiction**
  — Dashavatar's copy in `gallery/RepertoireActs.tsx`,
  `services/WeddingActs.tsx`, and the dead-code `content/home.ts`
  repertoire entry wrongly claimed "that won India's Got Talent
  Season 1" / an "IGT Season 1 Climax" badge; this was never actually a
  client-input question — `PROGRESS.md`'s own confirmed-facts table and
  `content/gallery.ts:14` already establish the winning act was the
  Krishna Act (Krishna Leela), which correctly calls itself "the troupe's
  original award-winning act" one card over. Removed the three false
  claims so only the correct one remains. **Removed the three
  contradictory invented troupe-size dropdowns** (`home/EventEnquiry.tsx`,
  `contact/EnquiryForm.tsx`, `services/WeddingEnquiryForm.tsx` each offered
  different fabricated numeric brackets) and replaced each with a plain
  optional text field ("e.g. 20 performers — leave blank and we'll
  recommend a size") — honest, no invented capability asserted; deleted
  `WeddingEnquiryForm.tsx`'s now-unused `SelectField` helper. **Removed
  unconfirmed international-touring language** from `home/Hero.tsx`
  ("world tours" → "cultural festivals," a real service category),
  `about/CTA.tsx` ("Worldwide Touring Ensembles" → "Complete Cast &
  Crew"), and `gallery/TechnicalRequirements.tsx` ("Global Touring
  Production" → "Production Requirements"). Opportunistically fixed two
  adjacent items in the same edit: About's false "Official Technical
  Rider Provided" promise (→ "Technical Requirements Shared on Enquiry",
  matching Gallery/Contact's existing honest phrasing) and Gallery's
  internally-inconsistent invented "Opus No. 01/04/07" catalogue numbering
  (removed entirely — only 3 of 5 acts had one). `npm run build` +
  `npm run lint` clean; verified in-browser (Gallery's Dashavatar/Krishna
  Leela cards, About's CTA badges, and all three enquiry forms' new text
  field via live DOM inspection).
- [x] TODO.md Phase 0.3/0.4, batch 2 (2026-09-21): fixed the last invented
  cast-size claim — `contact/ContactSidebar.tsx`'s "Signature 26-artist
  choreography" (26 is the original 2009 troupe size, not a confirmed cast
  for that specific act) → "Cast size on request", matching the honest
  convention already used everywhere else. **Crash safety**: added
  `app/src/app/error.tsx`, a branded error boundary (matching
  `not-found.tsx`'s Danza-token styling) with a "Try Again" reset button
  and the same `tel:` fallback — previously any client-component throw
  showed Next's raw unbranded error screen with no way back into the site.
  **Dead code removed**: `components/sections/ContactForm.tsx` (147 lines,
  reconfirmed zero real importers — it was the only form still on the
  discarded M3 token system and the only one with email-required/
  phone-optional, the pattern every other form was fixed away from) and
  `content/home.ts`'s 3 dead `teamMembers` placeholder entries
  ("Role to be announced" ×3, unrendered since `MastersGrid.tsx` was
  removed and reconfirmed nothing reads past index 0). `npm run build` +
  `npm run lint` clean; confirmed `error.tsx` compiled into the build
  output and the ContactSidebar fix rendering in-browser.
- [x] TODO.md Phase 0.1/0.2, batch 3 (2026-09-21): **deploy configuration**
  — added `netlify.toml` (repo root, `base = "app"`) since the Next
  project isn't at repo root and nothing previously told Netlify where to
  find it; added `src/lib/siteUrl.ts`, a shared helper that throws a clear
  build-time error if `NEXT_PUBLIC_SITE_URL` is missing during an actual
  Netlify build (`NETLIFY=true`, set by Netlify's own environment) while
  still falling back safely for local `npm run build` testing — verified
  both directions (`NETLIFY=true npm run build` without the var throws
  with the intended message; succeeds once the var is also set).
  `layout.tsx`/`sitemap.ts`/`robots.ts` now all import from this one
  helper instead of each defining their own fallback. **Formspree
  integration (client-requested)** — built `src/lib/submitEnquiry.ts`, a
  shared helper all four live forms (`home/EventEnquiry.tsx`,
  `contact/EnquiryForm.tsx`, `services/WeddingEnquiryForm.tsx`,
  `layout/BookingModal.tsx`) now call: it POSTs flat named fields (no more
  joined `message` blob — Formspree renders one row per field) straight to
  Formspree once `NEXT_PUBLIC_FORMSPREE_ID` is set, and transparently
  falls back to the existing honest `/api/contact` stub until then, so the
  site's current behavior is unchanged pending just one env var. Added a
  hidden `_gotcha` honeypot to all four forms (no spam protection existed
  before this). Loosened `/api/contact`'s validation to accept the new
  flat payload shape and fixed its "studio" wording (banned word,
  ARCHITECTURE.md §0) — kept the route as the fallback rather than
  deleting it. Updated `.env.example` and rewrote `ARCHITECTURE.md` §8 +
  the §2 tech-stack table's Forms row to document the new approach.
  `npm run build` + `npm run lint` clean; verified end-to-end in-browser —
  submitted both Home's `EventEnquiry` and the header `BookingModal`,
  confirmed the request reaches `/api/contact`, gets a 501 (proving the
  flat payload passes server-side validation), and renders the updated
  honest not-connected message; confirmed the honeypot field is properly
  hidden (`display:none`, `tabIndex:-1`, `aria-hidden`) and excluded from
  tab order. Only remaining step to fully activate: create the real
  Formspree form and set `NEXT_PUBLIC_FORMSPREE_ID` (client-owned — a
  Formspree account doesn't exist yet).
- [x] TODO.md Phase 1.1/1.2, batch 1 (2026-09-21): **WhatsApp integration**
  — previously exactly one `wa.me` link existed site-wide (a small text
  link on `/contact` only), despite every enquiry form already treating
  phone/WhatsApp as the primary contact channel. Built
  `components/layout/WhatsAppButton.tsx` (a persistent floating button,
  mounted site-wide in `layout.tsx`, `z-30` so it's correctly covered by
  the mobile nav panel/`BookingModal` when either is open) plus a "Chat on
  WhatsApp" button in the mobile menu and a WhatsApp link in the Footer's
  "Get in Touch" column — all three verified via live DOM query to point
  at the identical correct `wa.me` URL (real number, correctly
  URL-encoded prefilled message). **Social icons (client-requested)** —
  built `components/ui/icons/BrandIcons.tsx` (inline SVG for WhatsApp,
  Facebook, Instagram, YouTube, X — zero new dependency) and
  `components/ui/SocialIcons.tsx`, wired into both the Footer's Brand
  column and the mobile menu. Since `content/site.ts`'s real social
  handles are still unconfirmed (all four empty strings), the component
  filters to only non-empty entries and renders nothing at all right now
  — verified in-browser (no empty gap/artifact in either placement) — so
  it ships today and activates automatically the moment real handles are
  supplied, no further code change needed. Icon-rendering risk was
  deliberately managed: WhatsApp/Facebook use their real, extremely
  widely-reproduced glyph paths, while Instagram/YouTube/X are built from
  simple geometric primitives rather than memorized complex trademarked
  bezier curves, so every icon is guaranteed to render cleanly rather than
  risk a subtly malformed path — confirmed visually clean in-browser at
  both the 28px FAB size and the 14px footer size. `npm run build` +
  `npm run lint` clean throughout.
- [x] TODO.md Phase 1.3/1.5, batch 2 (2026-09-21) — **Phase 1 code-complete.**
  Added a `tel:` icon button to the desktop header (`lg:` breakpoint,
  before "Book for Events") and restructured the mobile menu's WhatsApp
  button into a 2-column "Call Us" / "WhatsApp" row. Added a "reach us
  directly — call us / WhatsApp us" link to the not-connected/error states
  of all four enquiry forms, verified end-to-end by actually submitting
  Home's form with Formspree unconfigured and confirming both links render
  with correct hrefs. Embedded a real map on Contact
  (`ContactSidebar.tsx`) — **caught and fixed a real accuracy bug during
  verification**: geocoding the full compound address (building name +
  "in front of X" + town) without an API key landed the map on the wrong
  nearby village at a close zoom, worse than no map at all. Fixed with a
  separate, simpler query (town + pincode, derived from the same real
  `content/site.ts` fields, not a new fact) at a town-level zoom —
  re-verified the map now correctly centers on and labels "Gopalpur."
  `npm run build` + `npm run lint` clean. With this, Phase 1 is code-complete
  — the only remaining items (WhatsApp Business number confirmation, real
  social handles, analytics provider choice) are all client-owned.
- [x] Post-Phase-1 health check (2026-09-21): before starting Phase 2, did
  a fresh due-diligence sweep rather than assume the last build was
  clean — checked dev-server logs and live browser console on cold loads
  (new tab, no prior scroll/resize state) of all 6 main routes (Home,
  About, Contact, Gallery, Services, Journal). Zero console errors on any
  of them. One thing investigated and ruled out: a recurring Next.js LCP
  warning on Home ("add `loading="eager"`" for `krishna-leela-1.jpg`)
  seen during earlier interactive testing — confirmed via a genuinely
  fresh tab load that it does **not** reproduce; Home's Hero image already
  has `priority` set correctly, and the warning was dev-mode/HMR noise
  from repeated Fast Refresh reloads during manual testing (scrolling,
  resizing), not a real bug. No code change needed. The one real bug from
  this work (Contact's map embed geocoding to the wrong village) was
  already found and fixed during Phase 1 batch 2 verification — see that
  entry above. `npm run build` + `npm run lint` reconfirmed clean.
- [x] TODO.md Phase 2.1, batch 1 (2026-09-21): **self-referencing
  canonicals on all 21 routes** — a sitewide default (`"/"`) on the root
  `layout.tsx` (covers Home, which has no metadata export of its own to
  override it), explicit per-page canonicals on the 5 top-level static
  pages, 3 legal pages, and both dynamic route generators
  (`services/[slug]`, `journal/[slug]`) — fixes Home's
  `BookingAvailability` `?interest=<slug>#event-enquiry` rows otherwise
  reading as ~10 separate URLs serving identical content to Google.
  **`aria-hidden="true"` on all 96 Material Symbols icon spans**
  site-wide (39 files) — previously icon names rendered as literal text
  (e.g. "calendar_month") that screen readers always read and text
  extractors ingested; on `/rider-requirements` roughly 30% of the page's
  extractable text was icon ligature names. Applied via a script (not
  hand-editing 96 instances) and verified two ways: a structural pass
  confirming every icon-bearing `<span>` tag has the attribute (0 misses
  codebase-wide) and a live DOM check on Home (52 rendered spans, 0
  missing). **Fixed the footer NAP inconsistency** — `Footer.tsx`'s
  address previously dropped the building name and PIN code (rendering
  only `line2 + state`) while `ContactSidebar.tsx` showed the complete
  address and the footer's own maps link already used the full address —
  visible text and link destination now agree, matching Contact exactly.
  `npm run build` + `npm run lint` clean; verified in-browser (canonical
  tags via live DOM query on both a static and dynamic route, icon
  aria-hidden coverage via DOM query, footer address text).
- [x] TODO.md Phase 2.1, batch 2 (2026-09-21): **Open Graph + Twitter
  Card metadata** added — previously zero `og:*`/`twitter:*` tags existed
  anywhere, so every WhatsApp/Instagram-bio/Facebook share of the site
  rendered as a bare grey link. Sitewide default (root `layout.tsx`) uses
  a real photo (`gallery/krishna-leela-2.jpg`, full troupe), with
  per-page overrides on `/about` (the real founder photo) and every
  journal article (`journal/[slug]/generateMetadata` — each article's own
  real photo, `og:type=article`). **Real favicon** — generated
  `app/src/app/icon.png` (400×400) and `apple-icon.png` (180×180) from
  the real logo crest (`public/images/brand/logo-crest.png`), deleted the
  stale `create-next-app` scaffold `favicon.ico` that had been sitting
  there since Sep 6, predating the real logo entirely. `npm run build` +
  `npm run lint` clean; verified in-browser via live DOM query on 3 pages
  (Home's sitewide OG image, About's founder-photo override, a journal
  article's own-photo override) and confirmed both icon files serve as
  real, correctly-sized `image/png` responses matching the generated
  files exactly.
- [x] TODO.md Phase 2.1 (complete) + Phase 2.2 batch (2026-09-21):
  **noindexed the 6 placeholder pages** (3 journal articles whose bodies
  are still a literal `TODO(content)` placeholder, 3 legal stub pages) —
  added `robots: { index: false, follow: true }` to each and removed them
  from `sitemap.ts` (`/journal` itself stays, it's not a placeholder,
  just its 3 children are) — verified `sitemap.xml` now lists 15 URLs,
  down from 21, and both page types render the correct `noindex` meta
  tag live. **This closes out Phase 2.1 entirely** — all 7 pre-deploy
  SEO must-fixes are done. **Rewrote the 5 bare page titles**
  (`/about`, `/gallery`, `/journal`, `/contact`, `/services` were all
  literally just "About — Prince Dance Group" etc., mentioning nothing
  about Odisha, India, booking, or the IGT win) with the fact-grounded
  versions from the audit. **Added a `seoTitle` field** to
  `JournalEntry` (`content/journal.ts`) for the 3 articles whose full
  title + the sitewide title-template suffix ran 80-106 characters, well
  past where SERPs truncate — the `<title>` tag now uses the shorter
  version while the on-page H1 and OG/Twitter cards keep the full real
  headline (same real content, not a new fact, just tighter meta-tag
  wording). Verified all of this in-browser via live tab-title and DOM
  checks. `npm run build` + `npm run lint` clean.
- [x] TODO.md Phase 2.2 (complete) (2026-09-21): **shortened Home's
  sitewide meta description** from 217 to 155 chars (same real facts,
  tighter phrasing). **Added a dedicated `metaDescription` field** to
  all 9 entries in `content/services.ts` — real facts only (service,
  business name, the real IGT win, Odisha location), each under 160
  chars — and wired it into `services/[slug]/generateMetadata` in place
  of the on-page `summary` copy that was previously reused verbatim as
  the SERP snippet (one ran 175 chars with no location/entity mention).
  `summary` itself is untouched — still the real on-page marketing copy
  used in `ServiceDetailHero`/`ServicesList`/`RelatedServices`. **Gave
  `not-found.tsx` its own metadata** ("Page Not Found — Prince Dance
  Group" + `noindex`) — it previously inherited the root default, so a
  404 page was titled identically to the homepage. `npm run build` +
  `npm run lint` clean; verified all three in-browser via live meta-tag
  queries (Home's new 155-char description, corporate-events' new
  159-char description with Odisha mentioned, the 404 page's distinct
  title/description/noindex). **This completes Phase 2.2 in full.**
- [x] TODO.md Phase 2.3 (2026-09-21) — **this completes Phase 2 in full**
  (bar one client-owned item). Added `lastModified` to every `sitemap.ts`
  entry — a single honest build-time timestamp, since there's no CMS or
  per-page edit history to draw a real per-route date from. Fixed the
  location-keyword gap the audit found: `/about`'s title named no
  location at all (only the description did) — now reads "About Krishna
  Mohan Reddy — Berhampur, Odisha's IGT Champions"; `/contact` had the
  mirror gap (title already said Gopalpur/Odisha, description didn't) —
  now does too. Both derived from real `content/site.ts` fields. Left
  Contact's body copy alone on purpose — its real address is Gopalpur
  specifically, a different real fact from Berhampur (the founding town),
  so forcing "Berhampur" into Contact's page text risked conflating two
  distinct real facts rather than adding a genuine opportunity; About's
  body already had solid Berhampur/Ganjam/Odisha coverage from earlier
  passes. `npm run build` + `npm run lint` clean; verified in-browser
  (every sitemap entry now carries `<lastmod>`, both new title/description
  strings render correctly). The one remaining Phase 2 item — a Google
  Business Profile — is entirely off-site and client-owned (blocked on
  confirmed hours, service area, and social handles), so **Phase 2 is
  code-complete.**
- [x] TODO.md Phase 3.1, batch 1 (2026-09-21): **`prefers-reduced-motion`**
  — added the standard blanket rule to `globals.css` (covers all 32
  `.animate-bokeh` instances plus every `animate-ping`/`animate-pulse`/
  `transition-*` in one rule), and separately gated `Testimonials.tsx`'s
  JS-driven 7s auto-advance (a CSS media query can't reach a
  `setInterval`) behind `matchMedia`. **Fixed the focus ring** — added a
  proper `--color-focus-ring` token (`#ffffff`, in the `@theme` block per
  ARCHITECTURE.md §1 rule 4) replacing a leftover M3 token that measured
  2.88:1 against the site's now-universally-dark backgrounds, effectively
  invisible. **Added a skip-to-content link** — zero `sr-only`/`skip`
  matches existed before this; a keyboard/screen-reader visitor had to
  tab through the full header (6 nav links, status pill, CTA, hamburger)
  on every page first. `npm run build` + `npm run lint` clean (one
  real bug caught and fixed during this batch: the initial
  `matchMedia` check was calling `setState` synchronously inside a
  `useEffect`, tripping React's own lint rule — fixed with a lazy
  `useState` initializer + a `change`-event-only effect). Verified
  in-browser: tabbed from a fresh load and confirmed the skip link is the
  first focusable element, links to a real `#main-content` target, and is
  visually revealed with the new white focus ring around it
  (screenshot-checked); confirmed the reduced-motion CSS rule is present
  in the loaded stylesheet.
- [x] TODO.md Phase 3.1, batch 2 (2026-09-21): **focus trap for both
  dialogs.** Built a shared `useFocusTrap` hook
  (`components/ui/useFocusTrap.ts`) — hand-rolled rather than a dependency
  (`focus-trap-react`/Radix), matching TODO.md's own guidance since two
  call sites didn't justify a new ARCHITECTURE.md §4 entry. Wired into
  both `layout/BookingModal.tsx` and Home's `sections/home/Gallery.tsx`
  lightbox, previously the two dialogs on the whole site with correct
  `role="dialog"`/`aria-modal`/Escape/scroll-lock but no focus management
  at all — the lightbox was the worse of the two, since its prev/next/
  close buttons were only reachable by tabbing through the entire page
  behind the overlay first. `npm run build` + `npm run lint` clean;
  verified end-to-end in both dialogs via live `document.activeElement`
  checks — confirmed focus moves to the first focusable element on open,
  Tab/Shift+Tab correctly wrap within the dialog in both directions
  (tested the full cycle on the lightbox: Close → Previous → Next →
  wraps back to Close), and Escape restores focus to the exact element
  that triggered the dialog (the "Book for Events" button for the modal;
  the specific grid tile that was clicked for the lightbox).
- [x] TODO.md Phase 3.1, batch 3 (2026-09-21): **contrast fixes**, per
  `DESIGN.md` §31 (new section, added in the same change per
  ARCHITECTURE.md §1 rule 4 / §10). `--color-on-surface-danza-dim`
  lightened `#64748b` → `#8b97a8` (was 4.05:1/`surface-stage` and
  3.65:1/`surface-card`, both fail AA; now 5.31–6.51:1 across all three
  dark surfaces) — a pure token-value change, no call sites touched,
  since the entire footer bottom bar plus form labels across 6+ files
  just render lighter automatically. New `--color-danza-error: #fb7185`
  token added for form `role="alert"` error text specifically (was
  reusing decorative `danza-crimson` at ~3.3–3.4:1 on an elevated dark
  card, now 5.69–6.46:1) — wired into `EventEnquiry.tsx` and
  `BookingModal.tsx`, the only two Danza-system error messages on the
  site; decorative crimson elsewhere (buttons/badges/bokeh) untouched.
  Sanity-checked the parallel Nocturne error color
  (`nocturne-primary`, `contact/EnquiryForm.tsx` /
  `services/WeddingEnquiryForm.tsx`) already measures 9.66–11.36:1 —
  confirmed out of scope, so this fix is correctly Danza-only. All
  ratios computed programmatically via the WCAG relative-luminance
  formula. `npm run build` + `npm run lint` clean. Verified in-browser:
  both new/changed CSS custom properties confirmed present on `:root`
  via `getComputedStyle`; the footer's bottom-bar text (copyright line,
  legal links) confirmed rendering the new `rgb(139, 151, 168)` live in
  the DOM; the `.text-danza-error` utility confirmed generated by
  Tailwind and resolving to `rgb(251, 113, 133)`; exercised
  BookingModal's real submit flow end-to-end (its `not-connected` status
  path) to confirm the dialog's status-message rendering is otherwise
  unaffected.
- [x] TODO.md Phase 3.1, batch 4 (2026-09-21): **form a11y**, applied
  identically across all 4 real forms (`home/EventEnquiry.tsx`,
  `layout/BookingModal.tsx`, `contact/EnquiryForm.tsx`,
  `services/WeddingEnquiryForm.tsx`). Each required text field now wires
  the browser's own native constraint-validation failure (fires on a
  submit attempt via `onInvalid`) to `aria-invalid` + a `role="alert"`
  message linked by `aria-describedby`, reusing the browser's real
  `validationMessage` text rather than inventing custom copy, and
  clearing again once the field becomes valid. Every `<form>` gained
  `aria-busy={status === "sending"}` and a persistent (not
  conditionally-mounted) `sr-only role="status"` live region — the root
  cause being that screen readers reliably announce text *changes*
  inside an already-present live region but aren't guaranteed to
  announce a brand-new node appearing, which is why the "sending" state
  was previously silent even though the submit button's own visible text
  changed. Also added a plain "* Required" legend under each form's
  intro line. `npm run build` + `npm run lint` clean. Verified in-browser:
  submitted Home's form empty via `form.requestSubmit()` and confirmed
  the Name field carries `aria-invalid="true"` + a linked
  `aria-describedby`, rendering the real browser validation message in
  the accessible error-red from batch 3 (screenshot-checked); confirmed
  `aria-busy` and the sr-only live region are both present and correctly
  wired on the form element.
- [x] TODO.md Phase 3.1, batch 5 (2026-09-21): **touch targets under
  44px.** `Testimonials.tsx` mobile prev/next grew `h-9 w-9` (36px) →
  `h-11 w-11` (44px) — the *primary* control on mobile, since the `sm:`
  pair is hidden there. `BookingModal.tsx`'s close button grew `h-8 w-8`
  (32px) → `h-11 w-11` (44px, matching the Gallery lightbox's own close
  button), repositioned `top-4 right-4` → `top-2 right-2` to stay visually
  anchored to the card corner. `Testimonials.tsx`'s pagination dots were
  restructured so each `button` is a real 44×44 hit area wrapping a small
  decorative `span` for the visible dot, rather than growing the dot
  itself and changing the design. `Footer.tsx`'s 3 legal links (11px
  inline text, too tightly packed to just add padding) got a `relative` +
  invisible `::before` pseudo-element expanding the tappable area (14px
  vertical, 6px horizontal buffer) with zero visible layout change.
  `npm run build` + `npm run lint` clean. Verified in-browser at 375px
  width via `getBoundingClientRect()`: mobile prev/next and pagination
  dots both confirmed exactly 44×44; BookingModal's close button
  confirmed 44×44 and still correctly positioned (screenshot-checked);
  the footer's `::before` hit-area confirmed present with the expected
  offsets on all 3 links, with no visible layout shift (screenshot-checked).
- [x] TODO.md Phase 3.1, batch 6 (2026-09-21): **hover-only affordances
  invisible on touch.** Home's `Gallery.tsx` (`zoom_in` enlarge badge)
  and About's `LivingArchive.tsx` (`open_in_full` badge) were both
  `opacity-0 group-hover:opacity-100` — a touch visitor has no hover
  state to trigger that, so the "this enlarges/expands" cue never
  appeared for any mobile visitor at all, even though the tiles were
  still fully clickable. Changed both to `opacity-100 sm:opacity-0
  sm:group-hover:opacity-100` — always visible below `sm:` (touch-primary
  widths), hover-reveal preserved unchanged on larger pointer-capable
  screens. Grepped site-wide for any other `opacity-0 group-hover`
  pattern — these were the only two. `npm run build` + `npm run lint`
  clean. Verified in-browser at 375px width: Home Gallery's badges
  confirmed visible on every tile without hover (screenshot-checked);
  About's badge confirmed `opacity: 1` via `getComputedStyle`.
- [x] TODO.md Phase 3.1, batch 7 (2026-09-21): **heading order — Phase 3.1
  is now code-complete.** Five fixes: `/contact`'s `ContactSidebar.tsx`
  photo caption demoted `<h3>` → `<p>` (it's decorative, not
  content-sectioning, and was rendering before the page's only real
  `<h2>`); `/gallery`'s `RepertoireActs.tsx` 2 "bento" act titles promoted
  `<h3>` → `<h2>` to match the 3 "hero" act titles (same kind of content,
  different layout only); `/journal/[slug]`'s `JournalArticleBody.tsx`
  "More from the Journal" label promoted `<span>` → `<h2>` (was h1→h3
  with nothing between); `contact/FAQ.tsx`'s question text wrapped
  `<span>` → `<h3>` inside `<summary>` (valid HTML, native disclosure
  behavior unchanged, confirmed via grep this is the site's only real
  `<details>`/`<summary>` pattern); and all 3 hero `<h1>`s containing a
  `<br />` (Home, About, Contact — confirmed via a Python regex scan
  these were the only 3 site-wide) gained an explicit `{" "}` before each
  `<br />`, since a bare JSX newline immediately before a tag collapses to
  nothing rather than a space, which was concatenating words in any
  plain-text extraction of that `<h1>` ("Precise Formations.Grand
  Stages."). `npm run build` + `npm run lint` clean. Verified in-browser
  via `document.querySelectorAll('h1,h2,h3,h4')` on all 3 affected pages
  (`/contact` now h1→h2→h2→h3×4→h4, `/gallery` now
  h1→h2×5→h2→h3×4→h2→h4, `/journal/[slug]` now h1→h2→h3×2→h4); confirmed
  the FAQ questions render as real `<h3>`s and the Krishna Leela caption
  as `<p>`; confirmed all 3 hero `<h1>`s' `textContent` now reads with
  correct spacing, with a before/after screenshot confirming zero visual
  change.
- [x] TODO.md Phase 3.2, batch 1 (2026-09-21): **Material Symbols
  subsetting, header logo weight.** Three items. (1) `layout.tsx`'s font
  `<link>` now requests `&icon_names=` for only the 55 icons the site
  actually renders (was the full 4,239-glyph catalog), enumerated via the
  suggested grep plus every icon rendered through a JS variable
  (`services/serviceIcons.ts`, `about/Timeline.tsx`, `about/Pillars.tsx`,
  `services/HowItWorks.tsx`, `services/WeddingCoordination.tsx`,
  `gallery/TechnicalRequirements.tsx`) — cross-checked every `icon: "..."`
  field site-wide against Google Fonts' real icon metadata endpoint, which
  also confirmed 3 fields in `content/home.ts`'s unused-elsewhere
  `philosophyPillars` are never actually rendered, correctly excluded.
  Added the suggested `<link rel="preconnect" href="https://fonts.gstatic.com">`.
  **Caught a real pre-existing bug in the process**: `serviceIcons.ts`'s
  `school-college-function` row used `"auditorium"`, which isn't a real
  Material Symbols icon name — it had been silently rendering as literal
  fallback text ("AUDITORIUM" spelled out) instead of a glyph on every
  services page since that file was added, unrelated to and undiscovered
  before this subsetting pass. Fixed to `"theaters"` (same non-academy
  intent). (2) Dropped `priority` from `Header.tsx`'s logo `<Image>` — a
  44×44 element on every page competing with the real LCP hero for
  eager-fetch priority. (3) Resized the 400×400/197KB source
  `logo-crest.png` to 160×160 and re-exported as WebP (~21KB, ~89%
  smaller, comfortably covers the 44px/40px Header/Footer sizes at
  high-DPI) — original PNG kept in place as the source asset (Phase 2's
  `icon.png`/`apple-icon.png` were derived from it); both real usages
  (`Header.tsx`, `Footer.tsx`) switched to the new path. `npm run build` +
  `npm run lint` clean. Verified in-browser: confirmed the live `<link>`
  carries the subset `icon_names` param and preconnect tag; confirmed
  `/services` and `/services/school-college-function` now render a real
  glyph instead of literal text; spot-checked every other page's icons
  for breakage (none found); network log confirms both logo usages now
  request the `.webp` file; visually compared the resized logo against
  the original before committing — no legibility loss.
- [x] TODO.md Phase 3.2, batch 2 (2026-09-21): **AVIF/WebP image formats.**
  Added `images: { formats: ["image/avif", "image/webp"] }` to the
  previously-empty `next.config.ts`, confirmed against
  `node_modules/next/dist/docs` (per this project's own `AGENTS.md`
  caution that Next 16 can differ from training data) that the config
  shape is unchanged from what the TODO already specified. Next
  negotiates the best format per-browser via the request's `Accept`
  header — AVIF first, WebP fallback, original format if neither
  matches — so this is a no-fallback-risk win. `npm run build` +
  `npm run lint` clean. Verified in dev: fetched a live `_next/image` URL
  with an AVIF-capable `Accept` header and confirmed the response
  `content-type` is now `image/avif` (was WebP-only before); confirmed
  ordinary requests still return 200/304 and pages render unchanged.
  Honest caveat left in `TODO.md`, not glossed over: whether Netlify's
  actual production runtime negotiates this the same way can only be
  confirmed once the site is actually deployed there, which it isn't yet.
- [x] TODO.md Phase 3.2, batch 3 (2026-09-21): **bokeh animation cost.**
  Dropped `transform: scale()` from the shared `bokeh-breathe` keyframes
  in `globals.css`, keeping opacity-only — opacity animates on the
  compositor thread with no repaint, where opacity+`scale()` together
  forced continuous re-rasterization of a large `blur-3xl` surface on
  every frame, multiplied across ~30 orbs site-wide. Counted Home's own
  orb usage (`RepertoireGrid.tsx`/`EventEnquiry.tsx`/
  `BookingAvailability.tsx`, 2 each = 6) and found it already at the
  TODO's own "~6 orbs" target, so no reduction needed there.
  `IntersectionObserver`-based off-screen pausing deliberately not
  built — the TODO said "consider," and a real implementation would mean
  converting ~30 static `.animate-bokeh` divs across 16 files to a shared
  client hook, disproportionate once the actual cost driver (`scale()`)
  was already removed; left as a possible future enhancement if profiling
  ever shows it's still needed. `npm run build` + `npm run lint` clean.
  Verified in-browser: read the live compiled `@keyframes bokeh-breathe`
  CSSOM rule and confirmed it now contains only `opacity`;
  screenshot-confirmed no visual regression on Home.
- [x] TODO.md Phase 3.2, batch 4 (2026-09-21): **`sizes` right-sizing +
  `placeholder="blur"`.** Audited all 17 `sizes=` call sites site-wide
  against real grid-column fractions; found 2 genuine mismatches.
  `about/LivingArchive.tsx`'s small bento tiles were sharing the featured
  tile's `50vw` sizes value despite rendering at 25% width at `lg:` (1 of
  4 columns) — `Tile` now takes an explicit `sizes` prop, correctly
  differentiated per tile. `journal/JournalArticleHeader.tsx`'s image had
  a bare `sizes="100vw"` despite never exceeding the page's
  `max-w-[1200px]` container — capped to
  `"(min-width: 1200px) 1200px, 100vw"`. New `lib/blurDataURLs.ts` gives
  the site's 3 real `priority` hero images (Home `Hero.tsx`,
  `services/ServiceDetailHero.tsx`, `journal/JournalArticleHeader.tsx`) a
  real `placeholder="blur"` — all 3 use public-folder string paths (not
  static imports) so Next can't auto-derive one; generated a genuine
  ~12px-wide quality-40 JPEG re-encode per actual photo via Pillow (not a
  generic gray placeholder) for all 8 distinct images these 3 components
  can render. `npm run build` + `npm run lint` clean. Verified in-browser
  across Home, a service detail page, a journal article, and `/about` —
  all images load and render correctly with no visual regression
  (screenshot-checked each); confirmed via live `img.sizes` that both
  fixes are correctly wired in the DOM.
- [x] TODO.md Phase 3.2, batch 5 (2026-09-21): **delete the unreferenced
  Naveen Patnaik asset — Phase 3.2 is now fully code-complete.** Confirmed
  zero real importers of `naveen-patnaik-with-founder.jpg` via
  `grep -rn "naveen-patnai" src/` (an earlier, unrelated grep hit was just
  his *name* inside a testimonial quote, not the image file). Deleted the
  192,587-byte file from `public/images/brand/`. `npm run build` +
  `npm run lint` clean, still 28 routes. Verified in-browser on `/about`
  that every rendered image still resolves correctly, no broken images.
- [x] TODO.md Phase 4.1 (2026-09-21): **repertoire single source of
  truth.** `content/home.ts`'s dead-code 3-entry `repertoire` export
  rewritten into a real, live 5-act `RepertoireAct[]` matching the real
  split already established on `/gallery`; all 4 real consumers
  (`home/RepertoireGrid.tsx`, `gallery/RepertoireActs.tsx`,
  `layout/Footer.tsx`, `about/LivingArchive.tsx`) now import it instead of
  hardcoding their own copy, each keeping only genuinely page-local
  presentation (RepertoireGrid's CTA text, RepertoireActs' act numbering
  and stat labels). Fixes 2 real drift bugs: `Footer.tsx` listed
  "Bespoke Royal Sangeet Acts," a 5th label matching no real act anywhere
  else on the site — now lists all 5 real acts; `LivingArchive.tsx` spelled
  the second act "Krishna Ras Leela" (every other page: "Krishna Leela &
  Divine Ras") and captioned 2 borrowed gallery photos generically as
  "Live Stage Performance" instead of the real acts `/gallery` already
  assigns them to — now correctly "Surya Namaskar" and "Vande Mataram."
  Caught and fixed a mapping error of my own mid-refactor (badge vs.
  page-local act-label swapped for Surya Namaskar) before verifying.
  **Found but deliberately left unchanged**: `performance-3/4/5.jpg`
  don't actually depict the acts they're paired with thematically
  (performance-4/5 are the same Ganesha-masked piece from two angles, not
  Vande Mataram or Surya Namaskar) — this pairing was already shipped and
  reviewed on `/gallery` (DESIGN.md §24) before this refactor, so
  centralizing it preserves an existing decision rather than introducing
  a new one; flagged separately rather than silently re-paired mid-task.
  `imageAlt` text written to honestly describe what each photo actually
  shows, not asserting it depicts the named act. `npm run build` +
  `npm run lint` clean; confirmed via grep that zero live code still
  references the old drifted names. Verified in-browser on all 4 real
  pages (Home, `/gallery`, `/about`, Footer on every page) — all render
  correctly with the corrected, consistent names (screenshot-checked
  each); Footer's Repertoire column confirmed via live DOM query to list
  all 5 real acts.
- [x] TODO.md Phase 4.2 (2026-09-21): **About's repeated origin story.**
  Trimmed the 2 real restatements: Timeline milestone 1 near-verbatim
  repeated Hero's paragraph (founder, 26 young men, Berhampur, no formal
  training) ~200px later — cut to just the founding beat, letting Hero
  carry the full narrative; milestone 2 dropped a third repetition of "no
  formal training," keeping only its own IGT-specific facts. Checked the
  4th instance the TODO flagged — the Founder bio being "identical"
  between `about/Founder.tsx` and Home's `FounderSpotlight.tsx` — and
  found it's not a bug: both intentionally read the same
  `content/home.ts` `teamMembers[0].bio` (the established single-source
  pattern), which is the correct way for a founder bio to legitimately
  appear on both a homepage spotlight and the full About page; left
  unchanged. `npm run build` + `npm run lint` clean. Verified in-browser:
  confirmed via live DOM query that Hero and both trimmed milestones no
  longer share restated sentences; screenshot-confirmed the timeline
  cards and page layout still read cleanly with the shorter copy.
- [x] TODO.md Phase 4.2 (2026-09-21): **testimonial overlap between Home
  and About.** All 7 real testimonials were rendered in full on both
  pages — 100% overlap a visitor browsing both would notice. Implemented
  the planned split: `home/Testimonials.tsx`'s carousel trimmed to the 3
  highest-recognition names (Shah Rukh Khan, Naveen Patnaik, Kirron
  Kher); `about/Testimonials.tsx` keeps all 7 as the full archive;
  `contact/Testimonial.tsx` was already correctly scoped to a single,
  non-overlapping V.K. Pandian quote from an earlier pass, confirmed
  unchanged. `npm run build` + `npm run lint` clean. Verified in-browser
  via live `aria-label` query on Home's pagination dots — exactly 3
  testimonials, in the intended order; screenshot-confirmed the carousel
  still renders correctly.
- [x] TODO.md Phase 4.2 (2026-09-21): **`heroStats` repetition/ordering
  across 5 pages.** `contact/Hero.tsx` and `services/WeddingHero.tsx` cut
  from all 4 stats to 2 (founding size + IGT win), matching `/gallery`'s
  already-correct 2-stat pattern — "9 Signature Services" duplicated the
  Footer's own repeated stat on every page, "6 National Media Milestones"
  wasn't needed that deep into a booking flow. `about/Hero.tsx` fixed to
  render the 4 stats in their natural order (matching Home's
  `StatsRow.tsx`) instead of an undocumented custom reorder. `npm run
  build` + `npm run lint` clean. Verified in-browser: Contact and
  wedding-events both screenshot-confirmed at exactly 2 well-centered
  stat cards; About's stat order confirmed via live DOM query to now
  match Home.
- [x] TODO.md Phase 4.2 (2026-09-21), final 2 items: **form grammar +
  Inquire→Enquire normalization.** Fixed a real subject/verb-agreement
  bug ("A few details **is** all we need" → "are") in
  `home/EventEnquiry.tsx` and `services/WeddingEnquiryForm.tsx` — Contact
  already had the fix. Left the sentence's 3-page repetition and Gallery's
  3 identical "Request Tech Rider" CTAs alone on reflection: both are a
  repeated UI label for one identical action, the same pattern as "Add to
  Cart" reading the same on every product card, not prose a reader
  notices duplicated while scrolling. Fixed the last 2 American-spelling
  holdouts: `about/CTA.tsx` "Inquire for Booking" → "Enquire for
  Booking", `gallery/RepertoireActs.tsx`'s "Gala Inquiry" → "Gala
  Enquiry" — confirmed via grep these were the only 2 live occurrences
  site-wide. `npm run build` + `npm run lint` clean. Verified in-browser
  on Home, wedding-events, About, and Gallery via live DOM/text queries.
- [x] TODO.md Phase 4.2 (2026-09-21), final item: **event-type dropdown
  taxonomy normalization — Phase 4.2 is now fully code-complete.** New
  `content/services.ts` export `eventTypeOptions` (9 real service names +
  "Other") is now the single source `home/EventEnquiry.tsx`,
  `layout/BookingModal.tsx`, and `contact/EnquiryForm.tsx` all read for
  their dropdown, replacing 3 independently-worded, incomplete local
  lists. Contact specifically previously had no way to select "TV Award
  Show" or "Mahotsavs" — both now present. Simplified
  `EventEnquiry.tsx`'s `?interest=<slug>` pre-select logic in the same
  change: the old hand-maintained slug→option translation table is gone,
  replaced with a direct lookup against the real service list, since the
  dropdown options are now literally the service names. `npm run build` +
  `npm run lint` clean. Verified in-browser: all 3 forms' `<select>`
  options confirmed identical via live DOM query; the
  `?interest=tv-award-show` pre-select flow confirmed still resolving
  correctly through the new lookup (screenshot-checked the header modal
  too).
- [x] TODO.md Phase 4.3 (2026-09-21), partial: **journal image alt text +
  footer decorative alt.** Fixed the safely-separable half of "distinct
  alt text per photo": all 3 journal photos had every consumer using
  `alt={entry.title}` (the article headline restated as alt text, adding
  nothing for a screen reader). Added a real `imageAlt` field to
  `JournalEntry`, written from actually viewing each photo, wired into
  all 4 render sites. Bonus fix while there: `JournalGrid.tsx`'s featured
  image has `priority` but was missed by Phase 3.2's `placeholder="blur"`
  pass — added the same `lib/blurDataURLs.ts` lookup. Also fixed the
  footer logo's `alt` (was duplicating the header logo's alt text with no
  functional purpose — the footer logo isn't a link, and the brand name
  is already the adjacent text) to `alt=""`. **Deliberately deferred**:
  the `performance-3/4/5.jpg` alt text (in `content/gallery.ts` and
  `home/ServiceCategories.tsx`), the file rename, and verifying what
  `about/LivingArchive.tsx`'s photos show — all 3 are the same photo/act
  pairing question under review in the background task spawned earlier
  this session (`task_f28a1277`); writing new copy for them now risks
  describing something about to be re-paired. Revisit once that task
  reports back. `npm run build` + `npm run lint` clean. Verified
  in-browser on `/journal`, an article detail page, and the footer via
  live DOM queries — all alt text confirmed distinct and accurate, no
  heading duplication, footer logo alt confirmed empty.
- [ ] **Remaining work queued**: see `TODO.md` — the rest of Phase 4.3 is blocked on `task_f28a1277`'s findings. Beyond that, none of the "Home-style" independent-research passes are strictly owed anymore — every page has now had at least one real design/UX pass. If the client wants it, a deeper Gallery UX/functionality pass (interactive filtering, etc., beyond the structural fidelity + consistency work already done) remains an optional future enhancement, not a gap.
- [x] TODO.md Phase 5, batch 1 (2026-09-21): **structured data — zero
  JSON-LD blocks existed across all 21 routes, now 4 real schema types
  ship.** New `lib/structuredData.ts` + a shared `components/JsonLd.tsx`
  (Next's own documented `<script type="application/ld+json">` pattern,
  with the XSS-safe escaping their docs call for). **`PerformingGroup`**
  — sitewide, built from real `content/site.ts` facts only, `@id` anchor
  at `${siteUrl}/#organization`; ships without `sameAs` (no real handles
  exist yet) and without `numberOfEmployees: 26` (that's the founding
  troupe size, not a confirmed current headcount). **`Service` × 9** on
  every `/services/[slug]` page, `provider` referencing the org's `@id`;
  `areaServed`/`offers` omitted, need client input. **`FAQPage`** on
  `/contact`, built from the exact same `faqs` array the visible FAQ
  section renders (exported from `FAQ.tsx`) so they can't drift apart —
  honest caveat kept in `TODO.md`: Google restricted FAQ rich results to
  gov/health sites in 2023, shipped anyway for entity/AI-answer value.
  **`BreadcrumbList`** — added the actual prerequisite first: real
  visible breadcrumbs (new `components/ui/Breadcrumbs.tsx`, a proper
  `<nav aria-label="Breadcrumb">`) replacing the old plain "← All
  Services"/"← Journal" text links on service and journal detail pages,
  with the same array feeding both the visible trail and the JSON-LD.
  `npm run build` + `npm run lint` clean at every step. Verified on the
  live server: parsed every script tag's JSON on Home, a service page,
  and Contact, confirming real facts and correct `@id` cross-references;
  screenshot-confirmed the breadcrumb trail on a service page, wedding-events,
  and a journal article; confirmed via DOM query that breadcrumb links
  work and the current page is correctly non-interactive.
- [x] TODO.md Phase 5, batch 2 (2026-09-22) — **Phase 5 is now fully
  code-complete.** **Cross-link Gallery → Services**:
  `gallery/RepertoireActs.tsx`'s 8 CTAs all pointed at `/contact` — "Book
  [Act]" now goes to `/services`, "Request Tech Rider" now goes to the
  real `/rider-requirements` page (matching what it's literally asking
  for); `GalleryCTA.tsx`'s own closing CTA correctly stays on `/contact`.
  Home's body previously never linked to `/about`/`/services`/`/journal`
  (nav/footer only) — added 3 natural links: `FounderSpotlight.tsx` →
  `/about`, `ServiceCategories.tsx`'s header → `/services`,
  `StatsRow.tsx`'s press strip → `/journal`. Journal (confirmed as the
  thinnest link equity on the site — both its pages previously only
  linked to other journal articles) gained a closing "Looking to book a
  performance?" block on both `JournalGrid.tsx` and
  `JournalArticleBody.tsx`, linking to `/services` and `/contact`.
  **Vary anchor text**: found the 2 real always-identical spots —
  `ServiceDetailHero.tsx`'s primary CTA and the shared `ServicesCTA.tsx`
  button both read literal "Enquire to Book" on all 9 service detail
  pages; `ServicesCTA` gained an overridable `ctaLabel` prop, both now
  read "Enquire About {real service name}" per page. Checked
  `BookingAvailability.tsx` and `RelatedServices.tsx` — both already fine
  (each row/card is one large link whose content already includes the
  real service name, so the accessible anchor text was never actually
  generic). `npm run build` + `npm run lint` clean. Verified on the live
  server: DOM-confirmed every new/changed link's `href`; click-navigated
  all 3 new Home links to their real destinations; DOM-confirmed all 8
  Gallery CTAs and the varied service-page anchor text on 2 different
  service pages.
- [x] TODO.md Phase 6 (2026-09-22) — **the one non-client-gated item done;
  everything else in this phase genuinely needs client input.** Home's
  `Gallery.tsx` video-placeholder tile icon swapped `play_arrow` →
  `schedule` (a disabled tile with a play-button icon reads as a broken
  player, not "coming soon"). `GalleryCTA.tsx`'s disabled "Corporate deck
  coming soon" pill — styled almost identically to the real button beside
  it — restyled to plain text, the same dead-button pattern already fixed
  once on `contact/ContactSidebar.tsx`. Removed the now-fully-unused
  `play_arrow` from `layout.tsx`'s Material Symbols icon subset (confirmed
  via a structural scan of every `.tsx` file). `npm run build` +
  `npm run lint` clean. Verified on the live server: DOM-confirmed the
  icon swap and confirmed the pill's replacement span has no
  `cursor-not-allowed` styling or button chrome. Every other Phase 6 item
  — fresh photography, a showreel URL, 8 services' detail copy, 3 journal
  bodies, real legal text, pricing/booking-logistics answers — requires
  facts only the client can supply; none of it can be written without
  inventing a business fact. See `TODO.md`'s Client Input Register.
- [x] TODO.md Phase 7, batch 1 (2026-09-22): **`heroStats` crash risk +
  Gallery filter pills.** Verified empirically (not just by reading
  types) that the `heroStats` positional-destructuring crash risk isn't
  actually live: temporarily shrank the array and ran `npx tsc --noEmit`,
  which immediately failed at all 3 positional consumers — the array's
  `as const` already makes this a guaranteed compile-time error, never a
  runtime crash, given this project's standing "always run `npm run
  build`" rule. Documented why with a comment at the definition, restored
  the array, confirmed clean again. Confirmed `blurDataURL` coverage is
  already comprehensive (Phase 3.2/4.3). Deliberately did not add
  `onError` handlers — every `<Image>` call site is a Server Component,
  and wiring a real `onError` would force each into a Client Component
  (a real architectural cost) to guard against a failure mode proven not
  to exist here: a script extracting every literal `/images/...` path
  referenced anywhere in `src/` (10 distinct real photos) confirmed every
  one resolves to a real file in `public/`, exhaustively. **Gallery
  filter pills**: restyled as non-interactive tags per the TODO's own
  recommendation — all 5 now render identically (dropped the conditional
  that gave "All Acts (5)" the site's real active-state gold highlight,
  which made a non-interactive `<span>` look like a working, pre-selected
  filter to a sighted mouse user); added a "Performance Themes" label
  above the row. Left un-wired to real filtering, correctly, for a 5-card
  list. `npm run build` + `npm run lint` clean at every step. Verified on
  the live server: reloaded `/gallery`, confirmed zero console errors and
  the stat card intact; DOM-confirmed all 5 filter pills now share
  identical computed background/text color (screenshot-confirmed too).
- [x] TODO.md Phase 7, batch 2 (2026-09-22): **extracted a shared
  `Lightbox`.** New `components/ui/Lightbox.tsx` (a `useLightbox` hook +
  `<LightboxModal>`) extracted verbatim from `home/Gallery.tsx`, the only
  page with real click-to-enlarge before this. Wired into the 2 real gaps
  the TODO named: `gallery/RepertoireActs.tsx` (converted to a Client
  Component; its 5 act images had zero enlarge behavior, now each opens
  the shared lightbox, matched to its `content/gallery.ts` entry by image
  path) and `about/LivingArchive.tsx` (also converted to a Client
  Component; its `open_in_full` icon previously promised a zoom that
  never happened — tiles were actually links to `/gallery` — now they
  really do open the lightbox, with the section's separate "View Full
  Gallery" header link left intact). Fixes the focus-trap gap (3.1) once
  instead of three times. `npm run build` + `npm run lint` clean.
  Verified on the live server across all 3 consumers: DOM-confirmed the
  dialog opens with the correct caption on each page; used a dispatched
  `KeyboardEvent` to confirm next/prev navigation (the `computer` tool's
  own key-press proved unreliable this session, same class of quirk as
  the screenshot-scroll-sync issue noted earlier); confirmed focus lands
  on Close on open and restores to the exact triggering button on Escape
  on all 3 pages.
- [x] TODO.md Phase 7, batch 3 (2026-09-22) — **new `/repertoire/[slug]`
  pages, Phase 7 is now fully code-complete.** Built the "single biggest
  untapped SEO opportunity" item: 5 new real pages, one per
  `content/home.ts` repertoire act (Phase 4.1's single source of truth —
  no new facts anywhere here). New `app/repertoire/[slug]/page.tsx` +
  `RepertoireActDetail.tsx` (breadcrumb, real content, "Enquire About
  This Act"/"Call Us Now" CTAs — deliberately not tied to one specific
  service page, since asserting an act-to-service pairing would be
  inventing a fact) + `RelatedActs.tsx` (cross-links to the other 4,
  reusing `ServicesCTA.tsx` for the closing CTA rather than duplicating
  it). Added a new `metaDescription` field to `RepertoireAct` (the
  existing `description` field runs up to 220 chars, past SERP
  truncation), all 5 written and verified under 160 chars. Added all 5
  routes to `app/sitemap.ts`. Added real internal links to the new pages
  everywhere an act title was previously plain text:
  `gallery/RepertoireActs.tsx` (both hero and bento card styles) and
  `home/RepertoireGrid.tsx`'s 4 featured cards. `npm run build` +
  `npm run lint` clean — 33 routes, up from 28, all 5 new pages
  statically generated. Verified on the live server: screenshot-confirmed
  a full page render; DOM-confirmed title/meta description/canonical/
  BreadcrumbList JSON-LD are all correct; confirmed related-act links and
  one click-navigation; confirmed the closing CTA's real destination;
  confirmed both Gallery's and Home's card titles now link out to the new
  pages; confirmed `/sitemap.xml` lists all 5; confirmed an invalid slug
  renders the branded 404.
- [x] TODO.md Phase 8 (2026-09-22) — **documentation integrity, the final
  TODO.md phase — every item in TODO.md is now either done or explicitly
  client-gated.** `ARCHITECTURE.md` §1 rules 2 ("No rounded corners") and
  3 ("No drop shadows/blurs") both described the pre-pivot flat M3 import
  and were flatly false against the shipped Danza/Nocturne systems —
  rewrote both in place (confirmed via grep that nothing references them
  by number, so no renumbering risk) to document the real rounded-corner/
  shadow/bokeh system and state the current rule: use what the active
  design system specifies, never an arbitrary one-off value. §2's Fonts
  row claimed 2 fonts and "no runtime Google Fonts request" — corrected
  to the real 3 self-hosted fonts (`app/fonts.ts`) plus the one honest
  exception (Material Symbols, a runtime Google Fonts link since it isn't
  in `next/font`'s catalog — now correctly noted as subsetted per Phase
  3.2, not blanket-denied). §4's dependency table itself was and remains
  accurate (`_(none yet)_`, confirmed against `package.json` — zero
  packages added beyond baseline all project), but its baseline
  enumeration was stale (listed `postcss`/`autoprefixer`/`prettier`, none
  actually installed under Tailwind v4; missing `@types/react-dom`) —
  corrected to match `package.json` exactly. Two items turned out
  already resolved from earlier session work: §8's Forms policy already
  fully describes Formspree (zero "Resend" mentions found), and
  `DESIGN.md` §31 already documents the Phase 3.1 contrast token changes.
  `npm run build` + `npm run lint` clean. Verified on the live server
  (not just by re-reading the doc): queried the live DOM on Home and
  confirmed a real rounded element's computed border-radius, a real
  shadow element, 11 bokeh orbs on that one page, the Material Symbols
  link's live subsetted `icon_names=`, and the Plus Jakarta Sans CSS
  variable — every claim the corrected docs make now checks out against
  what's actually rendered.
- [x] Site-wide connectivity pass (2026-09-21, `DESIGN.md` §30): client asked to connect every page/feature together and check for any missing internal page. Audited every `href` in the codebase against real routes/slugs and every `id`/`href="#..."` anchor pair — the internal link graph was already clean (no broken or orphaned content pages), so the real gaps were three missing pieces, not missing links: no custom 404 (added a branded `app/not-found.tsx`), no sitemap/robots (added `app/sitemap.ts` listing all 21 real routes + `app/robots.ts`, plus `metadataBase` in `layout.tsx` reading from a `NEXT_PUBLIC_SITE_URL` env var — **needs setting once the site has a real domain**, no domain is fabricated), and the footer's 3 legal links being dead non-clickable text — now real pages (`content/legal.ts` + `LegalPlaceholder.tsx` + `/privacy-policy`, `/performance-terms`, `/rider-requirements`) with honest "coming soon, contact us directly" content, no fabricated legal text. Also fixed a real orientation bug found along the way: `Header.tsx`'s active-nav check was exact-match only, so detail pages like `/services/wedding-events` or any `/journal/<slug>` showed no nav item highlighted — now prefix-matches. Checked but deliberately left alone: `/services/wedding-events`'s stacked generic-hero-then-WeddingHero layout looked like a duplicate-hero bug at first glance but is documented, intentional design from §17, not something to redesign under a connectivity task. `npm run build` + `npm run lint` clean (27 routes, up from 22); verified in-browser (404 page, sitemap.xml contents, footer Privacy Policy link resolving to a real page, nav highlight on a service detail page).

## How to resume

If you're picking this up cold: read `ARCHITECTURE.md` → `DESIGN.md` §13
(Home's *current* design — ignore §1–6 and §9, both superseded historical
records for `/`, see §13's own note) → `CLAUDE.md` → this file's "Phase
checklist" to see what's done, then continue at the first unchecked item.

**Updated 2026-09-20, superseding the note below:** Phase 7 is complete
site-wide — every page (`/`, `/about`, `/services` + all 9 detail pages,
`/gallery`, `/journal` + all 3 article pages, `/contact`) is on Danza
Theatrical / Nocturne Stage, old §9 Material 3 components deleted. Home
additionally has two extra passes beyond the rest of the site: §20 (UI/UX
hierarchy redesign) and §21 (real functionality — Gallery lightbox,
Testimonials carousel controls). The paragraph below describing a
"two visual systems live at once, mid-migration" state is stale — it
described the brief window between Home's Phase 7 migration and the rest
of the site's, which has since closed. Kept for history, not current
status:

~~As of 2026-09-20: Home is on Phase 7 (Danza Theatrical); every other page
is still on Phase 6 (Material 3/Plus Jakarta Sans, `DESIGN.md` §9–12) —
the site currently has two different visual systems live at once, on
purpose, mid-migration. Don't "fix" that inconsistency by reverting Home
or by silently pushing Nocturne Stage onto other pages — wait for explicit
direction, since Home and the other pages' new screens use two different
draft design systems that still need reconciling (see Phase 7's checklist).~~

Other open items, unaffected by the above: Phase 3's content gaps (real
per-service copy, real journal article bodies — both needed from the
client) and an accessibility/perf pass, then Phase 4 (launch).
