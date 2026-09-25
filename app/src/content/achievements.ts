// Achievements photos — real photographs supplied by the client from their
// shared Google Drive folder (2026-09-25), which the client's own
// categorization doc filed under "Achievements & Milestones" (India's Got
// Talent, 2009). Optimized copies live in /public/images/achievements.
//
// Alt text and captions describe only what is visible. People in these
// photos are deliberately NOT named — no source in the project confirms who
// is pictured (the old site's file called "naveen-patnaik-with-founder" is
// actually a stage-performance photo), and naming a real person from their
// appearance would be guessing. Ask the client for names before adding any
// (ARCHITECTURE.md §1).

export type AchievementPhoto = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export const achievementPhotos: AchievementPhoto[] = [
  {
    "src": "/images/achievements/trophy-held-high.jpg",
    "alt": "Crowd of supporters around a garlanded young man, with a trophy held high and a Ritz microphone in the foreground",
    "caption": "Trophy held high",
    "width": 1080,
    "height": 810
  },
  {
    "src": "/images/achievements/garlanded-and-cheered.jpg",
    "alt": "Supporters crowd around a garlanded young man beneath a TV talent-show banner, some making victory signs",
    "caption": "Garlanded and cheered",
    "width": 1080,
    "height": 810
  },
  {
    "src": "/images/achievements/garlands-and-well-wishers.jpg",
    "alt": "Garlanded young man in a striped shirt surrounded by smiling well-wishers",
    "caption": "Garlands and well-wishers",
    "width": 1080,
    "height": 810
  },
  {
    "src": "/images/achievements/among-the-crowd.jpg",
    "alt": "Close crowd of smiling men, one wearing a marigold garland",
    "caption": "Among the crowd",
    "width": 1080,
    "height": 810
  },
  {
    "src": "/images/achievements/celebrating-by-the-train.jpg",
    "alt": "Smiling young men leaning together beside a train, a trophy visible at the edge of the frame",
    "caption": "Celebrating by the train",
    "width": 1080,
    "height": 969
  },
  {
    "src": "/images/achievements/the-troupe-together.jpg",
    "alt": "Young men from the troupe striking a pose together in a hall, arms raised",
    "caption": "The troupe together",
    "width": 720,
    "height": 540
  },
  {
    "src": "/images/achievements/group-photo-outdoors.jpg",
    "alt": "Large group of young men and a few others standing in a row in front of a building, several holding garlands",
    "caption": "Group photo",
    "width": 1080,
    "height": 457
  },
  {
    "src": "/images/achievements/arm-in-arm.jpg",
    "alt": "Two men smiling together with an arm around each other's shoulders, one in a white kurta and one in a striped shirt",
    "caption": "Arm in arm",
    "width": 1575,
    "height": 1572
  },
  {
    "src": "/images/achievements/awards-on-display.jpg",
    "alt": "Man standing in front of shelves filled with trophies and framed awards",
    "caption": "Awards on display",
    "width": 900,
    "height": 1600
  },
  {
    "src": "/images/achievements/seated-prince-sign.jpg",
    "alt": "Man in a white shirt seated at a desk in front of a wall sign reading PRINCE",
    "caption": "Seated at the desk",
    "width": 1095,
    "height": 1600
  }
];
