"use client";

import { formatDuration, videos } from "@/content/videos";
import { VideoEmbed } from "@/components/ui/VideoEmbed";

// 2026-09-25 — the site's first real video. The client's India's Got Talent
// Season 1 performances (Vimeo) plus one performance film (Google Drive).
// Nothing loads from Vimeo/Google until a visitor presses play
// (ui/VideoEmbed.tsx). Stage labels are the client's own; see
// content/videos.ts for the naming caveats.
const [featured, ...others] = videos;

export function VideoShowcase() {
  return (
    <section
      id="videos"
      className="w-full bg-nocturne-surface-container-lowest border-t border-nocturne-stage-border py-16 scroll-mt-24"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
          Watch
        </span>
        <h2
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="mt-1 text-3xl sm:text-4xl font-bold text-nocturne-text-primary mb-3"
        >
          The Performances on Film
        </h2>
        <p className="font-hanken text-sm text-nocturne-text-muted max-w-2xl mb-10">
          Full performances from India&apos;s Got Talent Season 1, plus a
          performance film of the Krishna Act. Press play to watch — nothing
          loads until you do.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center mb-8">
          <div className="lg:col-span-3">
            <VideoEmbed video={featured} sizes="(min-width: 1024px) 700px, 100vw" />
          </div>
          <div className="lg:col-span-2">
            <span className="inline-flex items-center rounded-full border border-nocturne-gold/30 bg-nocturne-gold/10 px-3 py-1 font-hanken text-[11px] font-semibold uppercase tracking-wider text-nocturne-gold">
              {featured.stage}
            </span>
            <h3
              style={{ fontFamily: "var(--font-headline-nocturne)" }}
              className="mt-3 text-2xl sm:text-3xl font-bold text-nocturne-text-primary"
            >
              {featured.title}
            </h3>
            <p className="mt-2 font-hanken text-sm text-nocturne-text-muted">
              India&apos;s Got Talent Season 1
              {formatDuration(featured.durationSeconds) && (
                <> &middot; {formatDuration(featured.durationSeconds)}</>
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {others.map((video) => (
            <div key={video.id}>
              <VideoEmbed video={video} sizes="(min-width: 640px) 380px, 100vw" />
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <h3
                  style={{ fontFamily: "var(--font-headline-nocturne)" }}
                  className="text-lg font-semibold text-nocturne-text-primary"
                >
                  {video.title}
                </h3>
                <span className="font-hanken text-xs font-semibold uppercase tracking-wider text-nocturne-gold whitespace-nowrap">
                  {video.stage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
