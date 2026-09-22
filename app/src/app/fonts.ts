import { Plus_Jakarta_Sans, Playfair_Display, Hanken_Grotesk } from "next/font/google";

// Site-wide Stitch-exact font (DESIGN.md §9). Applied at the root layout so
// it's available to the shared Header everywhere, and to every migrated
// page.
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

// Danza Theatrical (DESIGN.md §13) — Home page only. Not applied at the
// root layout; imported directly by app/page.tsx and scoped via its own
// wrapper class, so it doesn't affect any other (still-§9) page.
export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

// Nocturne Stage (DESIGN.md §14) — body font for pages on that system
// (About first; shares Playfair Display above for headlines). Applied at
// the root layout alongside the others so Header/Footer and any Nocturne
// page can use it; §9/Danza pages are unaffected since they reference
// their own font variables, not this one.
export const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
  display: "swap",
});
