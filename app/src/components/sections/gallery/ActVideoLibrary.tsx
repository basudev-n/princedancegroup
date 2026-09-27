"use client";

import { actVideos, type ActVideo } from "@/content/videos";
import { VideoEmbed } from "@/components/ui/VideoEmbed";

// 2026-09-28 — one video per act, from the client's own YouTube channel
// (content/videos.ts's `actVideos`). Each card has an `id="video-<slug>"`
// anchor so a service page's Featured Acts chip can link straight to that
// act's video; the customised group is `#custom-acts` (the "Bespoke Acts"
// chip's target). Click-to-play, same as VideoShowcase: nothing loads from
// YouTube until a visitor presses play.
const groups: { id: string; label: string; heading: string; body: string; videos: ActVideo[] }[] = [
  {
    id: "signature-acts",
    label: "Signature Acts",
    heading: "Signature Acts",
    body: "Our regular repertoire, performed at weddings, corporate events, award shows and festivals.",
    videos: actVideos.filter((v) => v.group === "signature"),
  },
  {
    id: "custom-acts",
    label: "Made to Order",
    heading: "Customised Special Acts",
    body: "Acts created around a story, cause or occasion. We can build one for your event too.",
    videos: actVideos.filter((v) => v.group === "custom"),
  },
];

export function ActVideoLibrary() {
  return (
    <section
      id="act-videos"
      className="w-full bg-nocturne-surface border-t border-nocturne-stage-border py-16 scroll-mt-24"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
          Watch Every Act
        </span>
        <h2
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="mt-1 text-3xl sm:text-4xl font-bold text-nocturne-text-primary mb-3"
        >
          Our Acts on Video
        </h2>
        <p className="font-hanken text-sm text-nocturne-text-muted max-w-2xl mb-10">
          See each act before you book it. Press play to watch — nothing loads
          until you do.
        </p>

        <div className="flex flex-col gap-14">
          {groups.map((group) => (
            <div key={group.id} id={group.id} className="scroll-mt-24">
              <div className="mb-6 flex flex-col gap-1 border-l-2 border-nocturne-gold pl-4">
                <h3
                  style={{ fontFamily: "var(--font-headline-nocturne)" }}
                  className="text-xl sm:text-2xl font-bold text-nocturne-text-primary"
                >
                  {group.heading}
                </h3>
                <p className="font-hanken text-sm text-nocturne-text-muted">{group.body}</p>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
                {group.videos.map((video) => (
                  <li key={video.slug} id={`video-${video.slug}`} className="scroll-mt-24">
                    <VideoEmbed
                      video={video}
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    />
                    <h4
                      style={{ fontFamily: "var(--font-headline-nocturne)" }}
                      className="mt-3 text-lg font-semibold text-nocturne-text-primary"
                    >
                      {video.title}
                    </h4>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
