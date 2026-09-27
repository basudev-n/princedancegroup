import Link from "next/link";
import { actVideos } from "@/content/videos";
import { VideoEmbed } from "@/components/ui/VideoEmbed";

// 2026-09-28 — the act's own performance video from the client's YouTube
// channel, for repertoire pages whose act is confirmed to be the same one
// (`repertoireSlug` in content/videos.ts: Dashavatar, Krishna Leela, Shiva
// Tandava). Renders nothing for the others (Vande Mataram, Surya Namaskar),
// which have no confirmed video.
export function RepertoireActVideo({ slug }: { slug: string }) {
  const video = actVideos.find((v) => v.repertoireSlug === slug);
  if (!video) return null;

  return (
    <section className="w-full bg-nocturne-surface border-t border-nocturne-stage-border py-16">
      <div className="max-w-[900px] mx-auto px-6 md:px-10">
        <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
          Watch the Act
        </span>
        <h2
          style={{ fontFamily: "var(--font-headline-nocturne)" }}
          className="mt-1 text-2xl sm:text-3xl font-bold text-nocturne-text-primary mb-6"
        >
          {video.title} in Performance
        </h2>
        <VideoEmbed video={video} sizes="(min-width: 900px) 820px, 100vw" />
        <Link
          href="/gallery#act-videos"
          className="mt-5 inline-flex min-h-11 items-center gap-1 font-hanken text-sm font-semibold text-nocturne-gold hover:underline"
        >
          Watch our other acts
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            arrow_forward
          </span>
        </Link>
      </div>
    </section>
  );
}
