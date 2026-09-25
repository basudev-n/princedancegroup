import Image from "next/image";
import Link from "next/link";
import { achievementPhotos } from "@/content/achievements";
import { blurDataURLs } from "@/lib/blurDataURLs";

// 2026-09-25 — the client's "Homepage Hero Banner / Awards Section" pick for
// the India's Got Talent winner photo. Home's own hero stays the Dashavatar
// act photo (the client's placement note is satisfied by an awards moment
// high on the page rather than replacing the hero); the full set of 10 lives
// on /about#achievements. Photo descriptions are visible-facts only, nobody
// is named (content/achievements.ts). The 2009 / ₹50 lakh facts are client-
// supplied and visible in the lead photo (see about/Achievements.tsx).
const [lead, second, third] = [
  achievementPhotos[0],
  achievementPhotos[1],
  achievementPhotos[6],
];

const photoFilter = "[filter:sepia(0.18)]";

export function AchievementsTeaser() {
  return (
    <section className="w-full bg-surface-stage py-16 border-t border-surface-border/60">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="flex flex-col gap-3">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-surface-border">
            <Image
              src={lead.src}
              alt={lead.alt}
              fill
              placeholder="blur"
              blurDataURL={blurDataURLs[lead.src]}
              className={`object-cover ${photoFilter}`}
              sizes="(min-width: 1024px) 640px, 100vw"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[second, third].map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[16/10] rounded-xl overflow-hidden border border-surface-border"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  placeholder="blur"
                  blurDataURL={blurDataURLs[photo.src]}
                  className={`object-cover ${photoFilter}`}
                  sizes="(min-width: 1024px) 315px, 50vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="block w-8 h-px bg-danza-gold mb-3" />
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-danza-gold">
            Where It Began
          </span>
          <h2
            style={{ fontFamily: "var(--font-headline-danza)" }}
            className="mt-2 text-3xl sm:text-4xl font-bold text-on-surface-danza"
          >
            Champions of India&apos;s Got Talent, 2009
          </h2>
          <p className="mt-4 font-sans text-base text-on-surface-danza-muted max-w-xl">
            In 2009, 26 daily-wage workers from Berhampur won India&apos;s Got
            Talent Season 1. These are photographs from that time — the
            trophy, the garlands, and the crowds that came out to celebrate.
          </p>

          <dl className="mt-6 flex flex-wrap gap-3">
            {[
              { value: "2009", label: "Year of the win" },
              { value: "₹50 lakh", label: "Grand prize" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-surface-card border border-surface-border px-5 py-3"
              >
                <dt className="font-sans text-[11px] uppercase tracking-wider text-on-surface-danza-muted">
                  {stat.label}
                </dt>
                <dd
                  style={{ fontFamily: "var(--font-headline-danza)" }}
                  className="text-2xl font-bold text-danza-gold"
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href="/about#achievements"
              className="inline-flex min-h-11 items-center gap-1.5 font-sans text-sm font-semibold text-danza-gold hover:text-danza-crimson transition-colors"
            >
              See the Full Story
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
            <Link
              href="/gallery#videos"
              className="inline-flex min-h-11 items-center gap-1.5 font-sans text-sm font-semibold text-danza-gold hover:text-danza-crimson transition-colors"
            >
              Watch the Performances
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                play_arrow
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
