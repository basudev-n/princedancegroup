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
    alt: "Prince Dance Group performers on stage in costume",
    caption: "Live stage performance",
  },
  {
    src: "/images/gallery/performance-4.jpg",
    alt: "Prince Dance Group performers on stage in costume",
    caption: "Live stage performance",
  },
  {
    src: "/images/gallery/performance-5.jpg",
    alt: "Prince Dance Group performers on stage in costume",
    caption: "Live stage performance",
  },
];
