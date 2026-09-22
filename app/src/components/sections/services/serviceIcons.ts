// Small shared icon map so each of the 9 real services gets a distinct
// Material Symbol instead of every row/card in ServicesList and
// ServiceDetailHero looking identical (the "repeated card-shell fatigue"
// noted in this UI pass). Purely decorative — icon choice doesn't add or
// imply any fact beyond the real service name/slug already in
// `content/services.ts`. `school-college-function` intentionally avoids
// "school" so the icon can't read as an Academy/classes signal
// (ARCHITECTURE.md §0 hard rule).
//
// TODO.md Phase 3.2 (2026-09-21): "auditorium" — this row's original
// choice — isn't a real Material Symbols icon name at all (confirmed
// against Google Fonts' own icon metadata endpoint), so it was silently
// rendering as literal fallback text ("AUDITORIUM" spelled out) instead
// of a glyph, on every services list/detail page, since the icon was
// added. Caught while cross-checking every icon name against the real
// catalog for the font-subsetting change below. Replaced with "theaters"
// (a real icon, reads as "a venue," keeps the same non-academy intent).
export const serviceIcons: Record<string, string> = {
  "corporate-events": "business_center",
  "wedding-events": "favorite",
  "tv-award-show": "tv",
  "musical-acts": "music_note",
  "religious-events": "temple_hindu",
  "school-college-function": "theaters",
  mahotsavs: "celebration",
  "music-video-movies": "movie",
  "promotion-shoots": "photo_camera",
};

export const defaultServiceIcon = "theater_comedy";
