"use client";

import Image from "next/image";
import { useState } from "react";
import { formatDuration, videoEmbedUrl, type Video } from "@/content/videos";
import { glassChipDanza } from "@/lib/glass";

// 2026-09-25. Click-to-play embed: shows a local poster with a play button and
// only mounts the Vimeo/Google Drive iframe once a visitor presses play — so
// the page loads no third-party player scripts, cookies or tracking until then
// (and stays fast; three embedded players would otherwise add ~1MB+ each).
// `autoPlay` starts playing immediately (used by the modal, where the click
// that opened it was already the visitor's "play").
export function VideoEmbed({
  video,
  autoPlay = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: {
  video: Video;
  autoPlay?: boolean;
  sizes?: string;
}) {
  const [playing, setPlaying] = useState(autoPlay);
  const duration = formatDuration(video.durationSeconds);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black"
      style={{ aspectRatio: `${video.width} / ${video.height}` }}
    >
      {playing ? (
        <iframe
          src={videoEmbedUrl(video, true)}
          title={`${video.title} — ${video.stage}`}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${video.title}, ${video.stage}`}
          className="group absolute inset-0 block h-full w-full text-left"
        >
          <Image
            src={video.poster}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes={sizes}
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span
              className={`flex h-16 w-16 items-center justify-center rounded-full ${glassChipDanza} border-white/25 transition-transform duration-300 group-hover:scale-110`}
            >
              <span className="material-symbols-outlined text-[34px] text-white" aria-hidden="true">
                play_arrow
              </span>
            </span>
          </span>
          {duration && (
            <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-0.5 font-sans text-xs font-semibold text-white">
              {duration}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
