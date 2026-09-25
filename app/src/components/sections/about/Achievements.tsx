"use client";

import Image from "next/image";
import { achievementPhotos } from "@/content/achievements";
import { useLightbox, LightboxModal } from "@/components/ui/Lightbox";
import { blurDataURLs } from "@/lib/blurDataURLs";
import { glassChipNocturne } from "@/lib/glass";

// 2026-09-25, client-requested: the photographs from the India's Got Talent
// win, kept by the troupe, as a nostalgic "Achievements" section. The photos
// and captions come from content/achievements.ts (descriptive only — nobody
// is named without a source, see that file's header). The two facts in the
// intro/stats — the 2009 win and the ₹50 lakh grand prize — are client-
// supplied (their "Website Photo Categorization" doc), consistent with the
// "India's Got Talent Season 1" win already confirmed elsewhere on the site,
// and visible in the lead photo itself (trophy engraved "India's Got Talent
// Winner 2009"; oversized cheque reading "Rupees Fifty Lakhs Only").
//
// A faint sepia on the photos (removed on hover) gives them an archival feel
// without altering the originals.
const featured = achievementPhotos.slice(0, 2);
const rest = achievementPhotos.slice(2);
const lightboxImages = achievementPhotos.map(({ src, alt, caption }) => ({ src, alt, caption }));

const photoClass =
  "h-auto w-full [filter:sepia(0.18)] group-hover:[filter:sepia(0)] transition duration-500";

export function Achievements() {
  const { openIndex, open, close, next, prev } = useLightbox(lightboxImages);

  return (
    <section
      id="achievements"
      className="w-full bg-nocturne-surface-container-lowest border-t border-nocturne-stage-border py-16 scroll-mt-24"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
          Achievements &middot; India&apos;s Got Talent
        </span>
        <h2
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="mt-1 text-3xl sm:text-4xl font-bold text-nocturne-text-primary mb-4"
        >
          Moments That Made the Journey
        </h2>
        <p className="font-hanken text-base text-nocturne-text-muted max-w-2xl">
          In 2009, a troupe of daily-wage workers from Berhampur won India&apos;s
          Got Talent Season 1. These photographs, kept by the troupe, are from
          that time — the garlands, the trophy, and the crowds that came out to
          celebrate.
        </p>

        <dl className="mt-6 mb-10 flex flex-wrap gap-3">
          {[
            { value: "2009", label: "Year of the win" },
            { value: "₹50 lakh", label: "Grand prize" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border px-5 py-3"
            >
              <dt className="font-hanken text-[11px] uppercase tracking-wider text-nocturne-text-muted">
                {stat.label}
              </dt>
              <dd
                style={{ fontFamily: "var(--font-headline-nocturne)" }}
                className="text-2xl font-bold text-nocturne-gold"
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {featured.map((photo, i) => (
            <PhotoButton key={photo.src} index={i} onOpen={open}>
              <div className="relative aspect-[4/3]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  placeholder="blur"
                  blurDataURL={blurDataURLs[photo.src]}
                  className="object-cover [filter:sepia(0.18)] group-hover:[filter:sepia(0)] transition duration-500"
                  sizes="(min-width: 1200px) 590px, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <Caption>{photo.caption}</Caption>
            </PhotoButton>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
          {rest.map((photo, i) => (
            <PhotoButton key={photo.src} index={i + featured.length} onOpen={open}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                placeholder="blur"
                blurDataURL={blurDataURLs[photo.src]}
                className={photoClass}
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              />
              <Caption>{photo.caption}</Caption>
            </PhotoButton>
          ))}
        </div>
      </div>

      <LightboxModal
        images={lightboxImages}
        openIndex={openIndex}
        onClose={close}
        onNext={next}
        onPrev={prev}
      />
    </section>
  );
}

function PhotoButton({
  index,
  onOpen,
  children,
}: {
  index: number;
  onOpen: (i: number) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Enlarge photo: ${achievementPhotos[index].caption}`}
      className="group relative block w-full break-inside-avoid overflow-hidden rounded-nocturne-lg border border-nocturne-stage-border bg-nocturne-surface-container"
    >
      {children}
      <span
        className={`absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full ${glassChipNocturne} opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity`}
      >
        <span className="material-symbols-outlined text-[16px] text-white" aria-hidden="true">
          zoom_in
        </span>
      </span>
    </button>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8 text-left font-hanken text-xs font-semibold text-white">
      {children}
    </span>
  );
}
