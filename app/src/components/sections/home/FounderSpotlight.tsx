import Image from "next/image";
import Link from "next/link";
import { teamMembers } from "@/content/home";

// DESIGN.md §20 (replaces the old MastersGrid.tsx). The two fictional
// placeholder team cards (Vidushi Sunita Sahu / Ustad Ramesh Mahapatra in
// the original Stitch screen) that used to sit here are dropped from Home
// entirely — they already exist correctly as placeholders on /about's own
// team section, so Home doesn't need to duplicate unfinished content. This
// keeps only the one fully real element (founder photo/name/credential/bio,
// content/home.ts teamMembers[0]) and gives it a larger, uncontested
// spotlight treatment instead of being size-matched against two empty
// placeholder cards. Moved earlier in the page order (position 3) per the
// UX audit — the troupe's origin story is its most differentiated,
// shareable fact and was previously buried at position 6 of 8.
export function FounderSpotlight() {
  const founder = teamMembers[0];

  return (
    <section className="w-full bg-surface-card py-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <span className="font-sans text-xs font-semibold uppercase tracking-widest text-danza-gold">
          Founder&apos;s Story
        </span>
        <h2
          style={{ fontFamily: "var(--font-headline-danza)" }}
          className="mt-1 text-3xl sm:text-4xl font-bold text-on-surface-danza max-w-2xl mb-10"
        >
          From Rural Daily-Wage Artisans to Celebrated Performers
        </h2>

        <div className="rounded-2xl bg-surface-elevated border border-surface-border overflow-hidden grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="grid grid-rows-[auto_auto] md:grid-rows-[3fr_2fr]">
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px]">
              {founder.photo && (
                <Image
                  src={founder.photo}
                  alt={founder.photoAlt ?? founder.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              )}
            </div>
            {/* 2026-10-14: the founder with Naveen Patnaik — the same
                photo as /about's achievements gallery (arm-in-arm.jpg);
                client confirmed who is pictured and asked for it here. */}
            <figure className="relative aspect-[4/3] md:aspect-auto md:min-h-[260px] border-t border-surface-border">
              <Image
                src="/images/achievements/arm-in-arm.jpg"
                alt="Krishna Mohan Reddy, in a striped shirt, smiling with Naveen Patnaik, former Chief Minister of Odisha, in a white kurta"
                fill
                className="object-cover object-[50%_30%]"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-5 pb-4 pt-10 font-sans text-xs font-semibold text-white">
                With Naveen Patnaik, former Chief Minister of Odisha
              </figcaption>
            </figure>
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="inline-block w-fit px-3 py-1 rounded-full bg-surface-card text-xs font-semibold uppercase tracking-wide text-on-surface-danza-muted mb-4">
              {founder.role}
            </span>
            <h3
              style={{ fontFamily: "var(--font-headline-danza)" }}
              className="text-3xl font-bold text-on-surface-danza"
            >
              {founder.name}
            </h3>
            {founder.credential && (
              <span className="mt-2 font-sans text-base font-semibold text-danza-gold">
                {founder.credential}
              </span>
            )}
            <p className="mt-4 font-sans text-base text-on-surface-danza-muted max-w-xl">
              {founder.bio}
            </p>
            {/* TODO.md Phase 5: Home's body previously never linked to
                /about anywhere (only the nav/footer chrome did) — this is
                the one section where a "read the full story" link is a
                natural fit, not a forced insertion. */}
            <Link
              href="/about"
              className="mt-5 inline-flex items-center gap-1.5 w-fit font-sans text-sm font-semibold text-danza-gold hover:text-danza-crimson transition-colors"
            >
              Read Our Full Story
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
