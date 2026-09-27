// Performance videos — supplied by the client (2026-09-25). Three are on
// Vimeo (their own uploads; Vimeo's oEmbed confirms each allows embedding and
// gives the real durations below), one is a file in their Google Drive.
//
// Titles/stages are the client's own labels ("Krishna Leela audition act",
// "Flag Act semifinal", "Dashavatar Act grand final"). Vimeo's titles for the
// same uploads read "Krishna Act, Audition…", "National Act | Semi Final
// Act…" and "Dasa Abatar…" — all "India's Got Talent Season 1, colours tv,
// 2009". The Drive file ("Krishna Act.mp4") may be the same performance as
// the Krishna Leela audition; confirm with the client before describing it
// as anything more than a performance film.
//
// Posters are local files (public/images/videos, or existing archive photos)
// so the page makes no request to Vimeo/Google until a visitor presses play.

export type Video = {
  id: string;
  provider: "vimeo" | "drive" | "youtube";
  title: string;
  stage: string;
  poster: string;
  // Source aspect ratio — the Vimeo uploads are 4:3 broadcast footage.
  width: number;
  height: number;
  durationSeconds?: number;
};

export const videos: Video[] = [
  {
    id: "1036975830",
    provider: "vimeo",
    title: "Dashavatar",
    stage: "Grand Final",
    poster: "/images/videos/dashavatar-grand-final.jpg",
    width: 4,
    height: 3,
    durationSeconds: 1301,
  },
  {
    id: "1036628144",
    provider: "vimeo",
    title: "Krishna Leela",
    stage: "Audition",
    poster: "/images/videos/krishna-leela-audition.jpg",
    width: 4,
    height: 3,
    durationSeconds: 372,
  },
  {
    id: "1036705117",
    provider: "vimeo",
    title: "Flag Act",
    stage: "Semi-final",
    poster: "/images/videos/flag-act-semifinal.jpg",
    width: 4,
    height: 3,
    durationSeconds: 723,
  },
  {
    id: "1fn1cgz5THwB87-BvkmZTLXtU4ki6WBJY",
    provider: "drive",
    title: "Krishna Act",
    stage: "Performance film",
    poster: "/images/archive/krishna-act.jpg",
    width: 16,
    height: 9,
  },
];

export function videoEmbedUrl(video: Video, autoplay: boolean) {
  if (video.provider === "youtube") {
    // youtube-nocookie: YouTube's privacy-enhanced mode (no cookies until the
    // visitor plays). rel=0 keeps end-of-video suggestions to this channel.
    return `https://www.youtube-nocookie.com/embed/${video.id}?rel=0${autoplay ? "&autoplay=1" : ""}`;
  }
  if (video.provider === "vimeo") {
    // dnt=1: Vimeo's do-not-track flag; the rest hides Vimeo's own title
    // overlay so the poster/caption we show isn't duplicated inside the player.
    return `https://player.vimeo.com/video/${video.id}?dnt=1&title=0&byline=0&portrait=0${autoplay ? "&autoplay=1" : ""}`;
  }
  return `https://drive.google.com/file/d/${video.id}/preview`;
}

// 2026-09-28 — one video per act, supplied by the client as links to their
// own YouTube channel ("princedancegroup"). All 18 were checked via
// YouTube's oEmbed before wiring in: each resolves, belongs to that channel,
// allows embedding, and no two are the same upload — and each was then
// played in a youtube-nocookie embed via YouTube's IFrame API (no age,
// region or embed restrictions; durations below are what the player
// reported). Names are the client's
// own labels, normalised to the spellings the rest of the site already uses
// (Dashavatar, Shiva Tandava, Ram Sita, Natraj). "Operation Sindur" and
// "1999 Mahabatya" keep the client's spelling.
//
// Deliberately NOT mapped: the "Vande Mataram Patriot Symphony" and "Surya
// Namaskar" repertoire pages. Neither name appears in the client's act list,
// and whether Vande Mataram is the same act as "Indian Flag Act" or "Vande
// Utkal Janani" is the client's call — see PROGRESS.md 2026-09-28.
//
// `repertoireSlug` is set only where the act is the exact same one as an
// existing /repertoire/[slug] page, which then shows the video too.
// `customised-act`'s YouTube title names the specific event it was made
// for; the caption here stays generic ("Customised Act") rather than
// publishing a client-event name the client didn't give us.
//
// Posters are YouTube's own thumbnails, saved locally to
// public/images/videos/acts/ so nothing loads from YouTube before play.
export type ActVideo = Video & {
  slug: string;
  group: "signature" | "custom";
  repertoireSlug?: string;
};

function actVideo(
  slug: string,
  youtubeId: string,
  title: string,
  durationSeconds: number,
  group: ActVideo["group"],
  repertoireSlug?: string,
): ActVideo {
  return {
    slug,
    id: youtubeId,
    provider: "youtube",
    title,
    stage: group === "signature" ? "Signature Act" : "Customised Special Act",
    poster: `/images/videos/acts/${slug}.jpg`,
    width: 16,
    height: 9,
    durationSeconds,
    group,
    repertoireSlug,
  };
}

export const actVideos: ActVideo[] = [
  actVideo("dashavatar", "00zgVJHLwrw", "Dashavatar", 399, "signature", "dashavatar"),
  actVideo("krishna-leela", "95JeAg-wLLc", "Krishna Leela", 271, "signature", "krishna-leela"),
  actVideo("indian-flag", "uz8ykN1FnHg", "Indian Flag Act", 367, "signature"),
  actVideo("shiva-tandava", "5g7ApHyu6gM", "Shiva Tandava", 394, "signature", "shiva-tandava"),
  actVideo("durga", "QeBeYEkNXhc", "Durga Act", 383, "signature"),
  actVideo("ganesh", "dhjh8KfMEBk", "Ganesh Act", 60, "signature"),
  actVideo("natraj", "BGOi2gYMoBg", "Natraj Act", 486, "signature"),
  actVideo("global", "xRUk98LPvlY", "Global Act", 505, "signature"),
  actVideo("vande-utkal-janani", "PB-24vapaUw", "Vande Utkal Janani Act", 350, "signature"),
  actVideo("maa-kali", "u29gf2Ls4nU", "Maa Kali Act", 351, "signature"),
  actVideo("indian-flag-jai-ho", "tn18JTErUBk", "Indian Flag Act (Jai Ho)", 245, "signature"),
  actVideo("led-lights", "Mtu-j7QYXjQ", "LED Lights Act", 348, "signature"),
  actVideo("ram-sita", "ZlXO9vdColQ", "Ram Sita Act", 75, "signature"),
  actVideo("radha-krishna", "RXkQKGxrIxA", "Radha Krishna Act", 322, "signature"),
  actVideo("super-cyclone-1999", "HGsZNVR4Z7A", "1999 Mahabatya (Super Cyclone) Act", 435, "custom"),
  actVideo("corona-warriors", "Dgff1v0ZJIA", "Corona Warriors Act", 95, "custom"),
  actVideo("customised-act", "aWdrG9G0Clg", "Customised Act", 383, "custom"),
  actVideo("operation-sindur", "jowhrm-g-WA", "Operation Sindur Act", 270, "custom"),
];

export function formatDuration(seconds?: number) {
  if (!seconds) return null;
  const m = Math.floor(seconds / 60);
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}
