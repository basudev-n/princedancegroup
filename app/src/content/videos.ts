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
  provider: "vimeo" | "drive";
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
  if (video.provider === "vimeo") {
    // dnt=1: Vimeo's do-not-track flag; the rest hides Vimeo's own title
    // overlay so the poster/caption we show isn't duplicated inside the player.
    return `https://player.vimeo.com/video/${video.id}?dnt=1&title=0&byline=0&portrait=0${autoplay ? "&autoplay=1" : ""}`;
  }
  return `https://drive.google.com/file/d/${video.id}/preview`;
}

export function formatDuration(seconds?: number) {
  if (!seconds) return null;
  const m = Math.floor(seconds / 60);
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}
