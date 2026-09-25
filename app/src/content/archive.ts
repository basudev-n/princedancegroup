// Photo archive — real performance photography supplied by the client via
// their shared Google Drive folder (2026-09-25; see PROGRESS.md). Optimized
// copies (max 1800px, JPEG q82) live in /public/images/archive.
//
// Alt text and captions describe only what is visible in each photo — they
// deliberately do NOT name acts, venues, dates, or events beyond the client's
// own labels (Krishna Act, Patriotic Flag Act) and unmistakable costume
// elements (Ganesha mask). Confirm act names with the client before adding
// any (ARCHITECTURE.md §1).
//
// Deliberately NOT included from the same folder, pending client go-ahead:
// photos of identifiable real people (a former Chief Minister with the
// founder, individual portraits, the 2009 celebration crowd shots),
// Facebook screenshots, a video-frame with a third-party "CC" watermark,
// and duplicates of photos already in `galleryImages`.

export type ArchiveImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export const archiveImages: ArchiveImage[] = [
  {
    "src": "/images/archive/krishna-act.jpg",
    "alt": "Performer in blue body paint and a jewelled crown as Krishna, framed by a wide fan of raised arms against a purple-blue backdrop",
    "caption": "Krishna Act",
    "width": 1800,
    "height": 1013
  },
  {
    "src": "/images/archive/patriotic-flag-act.jpg",
    "alt": "Performers in saffron, white and green body paint kneeling in a tricolour formation with a blue Ashoka Chakra wheel behind them, on a beach",
    "caption": "Patriotic Flag Act",
    "width": 1800,
    "height": 1013
  },
  {
    "src": "/images/archive/stage-fan-of-arms.jpg",
    "alt": "Performer in an orange dhoti at centre stage with a fan of outstretched arms behind, under blue and magenta stage lighting",
    "caption": "Live stage performance",
    "width": 1657,
    "height": 1080
  },
  {
    "src": "/images/archive/blue-krishna-palace-stage.jpg",
    "alt": "Blue-painted performer as Krishna at the centre of a stage formation in front of an ornate palace-style backdrop",
    "caption": "Stage tableau",
    "width": 1619,
    "height": 1080
  },
  {
    "src": "/images/archive/tricolour-fan-formation.jpg",
    "alt": "Performers in saffron and green paint forming fan-shaped shapes around an Ashoka Chakra in a tricolour tableau",
    "caption": "Tricolour formation",
    "width": 1476,
    "height": 1080
  },
  {
    "src": "/images/archive/blue-smoke-tableau.jpg",
    "alt": "Blue-lit performer in a dramatic pose amid drifting blue smoke",
    "caption": "Stage tableau",
    "width": 1800,
    "height": 1800
  },
  {
    "src": "/images/archive/krishna-portrait-blue-light.jpg",
    "alt": "Portrait of a performer in blue body paint and a jewelled crown against a shaft of blue light",
    "caption": "Portrait",
    "width": 1272,
    "height": 1590
  },
  {
    "src": "/images/archive/acrobatic-pyramid.jpg",
    "alt": "Performers stacked in a tall acrobatic pyramid on a studio floor under a warm golden light",
    "caption": "Acrobatic pyramid",
    "width": 1800,
    "height": 1800
  },
  {
    "src": "/images/archive/layered-formation-starry.jpg",
    "alt": "Layered human formation of performers with raised arms against a starry blue and red backdrop",
    "caption": "Human formation",
    "width": 1800,
    "height": 1800
  },
  {
    "src": "/images/archive/red-body-paint-pyramid.jpg",
    "alt": "Performers in red body paint with black-and-white markings arranged in a triangular pyramid on a dark stage",
    "caption": "Body-paint pyramid",
    "width": 1800,
    "height": 1228
  },
  {
    "src": "/images/archive/tricolour-long-formation.jpg",
    "alt": "Long formation of performers in green, white and saffron paint with an Ashoka Chakra wheel",
    "caption": "Tricolour formation",
    "width": 1620,
    "height": 1080
  },
  {
    "src": "/images/archive/red-face-paint-closeup.jpg",
    "alt": "Close-up of three performers in red body paint with white face markings",
    "caption": "Face-paint close-up",
    "width": 1444,
    "height": 1080
  },
  {
    "src": "/images/archive/white-costume-stage-pyramid.jpg",
    "alt": "Performers in white costumes stacked in a pyramid on a purple-lit stage, one performer standing on top",
    "caption": "Stage pyramid",
    "width": 1280,
    "height": 1118
  },
  {
    "src": "/images/archive/orange-black-stage-group.jpg",
    "alt": "Performers in orange and black costumes mid-pose on a dark stage under red and blue light",
    "caption": "Live stage performance",
    "width": 1080,
    "height": 1342
  },
  {
    "src": "/images/archive/white-arms-sunset.jpg",
    "alt": "Performer in white with hands in prayer, surrounded by white-painted arms against a sunset sky",
    "caption": "Studio composition",
    "width": 1140,
    "height": 926
  },
  {
    "src": "/images/archive/flag-bearer-tricolour-arms.jpg",
    "alt": "Performer holding the Indian flag in front of a fan of green, white and saffron arm shapes",
    "caption": "Flag bearer",
    "width": 1290,
    "height": 911
  },
  {
    "src": "/images/archive/gold-dancers-blue-krishna.jpg",
    "alt": "Blue-painted Krishna performer at the centre of gold-painted dancers in a symmetrical stage formation",
    "caption": "Stage formation",
    "width": 1190,
    "height": 788
  },
  {
    "src": "/images/archive/lilac-ensemble-blue-stage.jpg",
    "alt": "Ensemble in lilac costumes around a central blue-painted performer on a blue-lit stage decorated with flowers",
    "caption": "Live stage performance",
    "width": 1280,
    "height": 854
  },
  {
    "src": "/images/archive/purple-stage-fan-of-arms.jpg",
    "alt": "Performer in an orange dhoti with a wide fan of arms behind, on a purple-lit stage with an ornate backdrop",
    "caption": "Live stage performance",
    "width": 1200,
    "height": 1800
  },
  {
    "src": "/images/archive/green-paint-flag-backdrop.jpg",
    "alt": "Performer in green body paint with a fan of white and saffron arm shapes in front of a tricolour backdrop",
    "caption": "Tricolour performance",
    "width": 1800,
    "height": 1200
  },
  {
    "src": "/images/archive/troupe-flag-stage.jpg",
    "alt": "Troupe in green body paint on stage in front of a large Indian flag backdrop",
    "caption": "Tricolour performance",
    "width": 1280,
    "height": 854
  },
  {
    "src": "/images/archive/golden-crown-of-arms.jpg",
    "alt": "Performer in a golden crown-like headdress of many arms, one palm raised",
    "caption": "Portrait",
    "width": 1623,
    "height": 1693
  },
  {
    "src": "/images/archive/pink-ganesha-mask.jpg",
    "alt": "Ganesha-masked performer lit in pink and blue before a wheel of outstretched arms",
    "caption": "Ganesha act",
    "width": 1636,
    "height": 1088
  },
  {
    "src": "/images/archive/lion-mask-costume.jpg",
    "alt": "Performer in a lion-faced mask costume with a ring of arms around it",
    "caption": "Lion-mask costume",
    "width": 1080,
    "height": 1434
  },
  {
    "src": "/images/archive/krishna-portrait-textured.jpg",
    "alt": "Close portrait of a performer in blue paint and a jewelled crown against a blue textured backdrop",
    "caption": "Portrait",
    "width": 910,
    "height": 910
  },
  {
    "src": "/images/archive/blue-lit-stage-truss.jpg",
    "alt": "Blue-lit performer on a stage with lighting trusses and spotlights overhead",
    "caption": "Live stage performance",
    "width": 1080,
    "height": 1085
  }
];

// Distinct hero photo per service detail page. There is no service-specific
// photography, so each pick is an illustrative stand-in matched loosely by
// mood (same "real photo as illustrative stand-in" pattern as before) — but
// every service now has its own image instead of cycling the same five.
export const serviceHeroBySlug: Record<string, string> = {
  "corporate-events": "/images/archive/white-costume-stage-pyramid.jpg",
  "wedding-events": "/images/archive/gold-dancers-blue-krishna.jpg",
  "tv-award-show": "/images/archive/stage-fan-of-arms.jpg",
  "musical-acts": "/images/archive/blue-krishna-palace-stage.jpg",
  "religious-events": "/images/archive/pink-ganesha-mask.jpg",
  "school-college-function": "/images/archive/troupe-flag-stage.jpg",
  mahotsavs: "/images/archive/tricolour-fan-formation.jpg",
  "music-video-movies": "/images/archive/red-body-paint-pyramid.jpg",
  "promotion-shoots": "/images/archive/acrobatic-pyramid.jpg",
};

export function archiveImageBySrc(src: string) {
  return archiveImages.find((i) => i.src === src);
}
