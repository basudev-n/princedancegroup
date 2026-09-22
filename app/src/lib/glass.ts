// Glassmorphism pattern — DESIGN.md §32. Two reusable tiers, each with a
// Danza Theatrical and a Nocturne Stage variant (the site's two coexisting
// token systems never mix). Derived from this project's own shipped
// precedents (Header.tsx's top bar/mobile panel, ServicesCTA.tsx) and
// cross-checked against Apple's materials/vibrancy guidance, Microsoft
// Fluent's Acrylic material, and Material Design 3's scrim rationale — see
// DESIGN.md §32 for the full research writeup and rollout candidate list.
//
// The one hard rule governing both tiers: the glass surface itself is a
// near-opaque tint of an EXISTING dark surface token, never a brand-color
// tint. ServicesCTA's first glass attempt tinted the whole card
// `bg-nocturne-primary/[0.12]` and read as a muddy smear — Fluent's own
// Acrylic guidance independently warns against exactly this (accent color
// belongs on content sitting ON the glass, or in a clipped bokeh glow
// behind it, never in the glass fill itself). Don't reintroduce that
// pattern when adding a new instance.

// Glass Panel — large, generously-sized surfaces: nav chrome, modals, one
// closing CTA per page. 90% opacity of the page's darkest surface token +
// a large blur + the system's standard border token. Bokeh blobs (clipped
// inside the panel, not a tint of the panel itself) are an optional
// addition on big, static panels — mobile menu, modal backdrop, closing
// CTA — never on the persistent, always-visible top header bar.
export const glassPanelDanza =
  "bg-surface-stage/90 backdrop-blur-2xl border border-surface-border/60";
export const glassPanelNocturne =
  "bg-nocturne-surface-container-lowest/90 backdrop-blur-2xl border border-nocturne-stage-border";

// Glass Chip — small badges/pills/icon-buttons sitting directly on top of
// photographic content: category tags, prev/next/close controls, caption
// badges. Lighter blur, no bokeh — the job here is purely "stay legible
// over an unpredictable photo," the textbook Apple/Fluent glass-control
// use case.
export const glassChipDanza =
  "bg-surface-stage/80 backdrop-blur-sm border border-surface-border/50";
export const glassChipNocturne =
  "bg-nocturne-surface-container-lowest/85 backdrop-blur-md border border-nocturne-stage-border";
