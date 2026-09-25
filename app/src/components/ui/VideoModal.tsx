"use client";

import { useEffect, useRef } from "react";
import type { Video } from "@/content/videos";
import { useFocusTrap } from "@/components/ui/useFocusTrap";
import { VideoEmbed } from "@/components/ui/VideoEmbed";

// Full-screen player dialog (used by Home's gallery video tile). Same
// dialog behaviour as the photo Lightbox: Escape and click-outside close,
// body scroll locked while open, focus trapped and restored on close.
export function VideoModal({ video, onClose }: { video: Video | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!video) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [video, onClose]);

  useFocusTrap(dialogRef, video !== null);

  if (!video) return null;

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`${video.title} — ${video.stage}`}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-black/90 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 h-11 w-11 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/20 text-white transition-colors"
      >
        <span className="material-symbols-outlined text-[22px]" aria-hidden="true">close</span>
      </button>
      <div
        className="w-full"
        style={{ maxWidth: `min(56rem, calc(78vh * ${video.width / video.height}))` }}
        onClick={(e) => e.stopPropagation()}
      >
        <VideoEmbed video={video} autoPlay sizes="90vw" />
        <p className="mt-3 text-center font-sans text-sm text-white/80">
          {video.title} &middot; {video.stage}
        </p>
      </div>
    </div>
  );
}
