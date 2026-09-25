"use client";

import Image from "next/image";
import { archiveImages } from "@/content/archive";
import { useLightbox, LightboxModal } from "@/components/ui/Lightbox";
import { blurDataURLs } from "@/lib/blurDataURLs";
import { glassChipNocturne } from "@/lib/glass";

// 2026-09-25. Browsable archive of the real performance photos the client
// supplied (content/archive.ts) — the site previously had only 5 photos in
// total (TODO.md 6.1). A CSS-columns masonry keeps each photo at its true
// aspect ratio (mixed landscape/portrait), and every tile opens the shared
// Lightbox. Captions/alt are descriptive only — see the note at the top of
// content/archive.ts about not asserting act names or events.
const lightboxImages = archiveImages.map(({ src, alt, caption }) => ({ src, alt, caption }));

export function PhotoArchive() {
  const { openIndex, open, close, next, prev } = useLightbox(lightboxImages);

  return (
    <section className="w-full bg-nocturne-surface-container-lowest border-t border-nocturne-stage-border py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
          Photo Archive
        </span>
        <h2
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="mt-1 text-3xl sm:text-4xl font-bold text-nocturne-text-primary mb-3"
        >
          More From the Stage
        </h2>
        <p className="font-hanken text-sm text-nocturne-text-muted max-w-2xl mb-10">
          Formations, body-paint tableaux, and portraits from the
          troupe&apos;s own photography. Tap any photo to enlarge it.
        </p>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
          {archiveImages.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => open(i)}
              aria-label={`Enlarge photo: ${image.caption}`}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-nocturne-lg border border-nocturne-stage-border bg-nocturne-surface-container"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                placeholder="blur"
                blurDataURL={blurDataURLs[image.src]}
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              />
              <span
                className={`absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full ${glassChipNocturne} opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity`}
              >
                <span className="material-symbols-outlined text-[16px] text-white" aria-hidden="true">
                  zoom_in
                </span>
              </span>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8 text-left font-hanken text-xs font-semibold text-white">
                {image.caption}
              </span>
            </button>
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
