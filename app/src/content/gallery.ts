// 2026-09-25: performance-3/4/5 alt text and captions now describe what the
// photos actually show (identified against the client's Drive folder — 3 is
// a many-armed stage tableau, 4/5 the Ganesha-masked ensemble from two
// angles); they were a generic "performers on stage in costume" x3.
//
// Real performance photography recovered from the source PDFs (see
// PROGRESS.md decisions log). Optimized copies live in /public/images/gallery.

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/krishna-leela-1.jpg",
    alt: "Prince Dance Group performers in peacock-crown Krishna Leela costume on stage, one dancer in a golden Krishna costume kneeling beside a dancer in red and gold bridal-style dress",
    caption: "Krishna Leela — the mythological epic that won India's Got Talent Season 1",
  },
  {
    src: "/images/gallery/krishna-leela-2.jpg",
    alt: "Full troupe formation in illuminated peacock-feather headdresses under blue stage lighting",
    caption: "The full ensemble in performance formation",
  },
  {
    src: "/images/gallery/performance-3.jpg",
    alt: "Blue-painted performer in an orange dhoti at centre stage with a fan of raised arms behind, on a purple-lit stage",
    caption: "Stage tableau with a fan of raised arms",
  },
  {
    src: "/images/gallery/performance-4.jpg",
    alt: "Ensemble in metallic body paint forming a radiating fan formation around a performer in an elephant-masked costume, under green stage lighting",
    caption: "Ganesha act, green stage lighting",
  },
  {
    src: "/images/gallery/performance-5.jpg",
    alt: "Performer in an ornate elephant-masked costume backed by an ensemble in metallic body paint with arms raised, under blue and pink stage lighting",
    caption: "Ganesha act, blue and pink lighting",
  },
];
