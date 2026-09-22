"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/content/testimonials";

// DESIGN.md §20/§21. Full-bleed single rotating pull-quote, not a 3-up
// card grid — a card grid here would just be another instance of the
// label→h2→card-grid pattern the rest of the page is trying to break out
// of. Placed immediately before EventEnquiry: this is the last-mile trust
// moment right as a visitor is about to hand over contact details, and
// these are unusually strong, fully real endorsements for a regional
// troupe (a former Chief Minister, a Bollywood superstar) — the client
// asked for this section's *functionality* to match how much it matters,
// so §21 adds real prev/next controls, hover-to-pause, and keyboard
// navigation on top of the original auto-rotate + dot pagination. All 7
// quotes are real (old website.pdf, `content/testimonials.ts`) — no
// public-figure photos are shown, text-only, per the testimonial-photo
// caveat (ARCHITECTURE.md §6).
//
// TODO.md Phase 4.2 (2026-09-21) had trimmed this to 3 names so Home
// wouldn't be identical to About's full 7-quote archive. Client reviewed
// the live carousel and asked for all 7 back on Home — restored
// 2026-09-22. Leads with the same 3 highest-recognition names, then the
// remaining 4.
const order = [
  "Shah Rukh Khan",
  "Naveen Patnaik",
  "Kirron Kher",
  "Sonali Bendre",
  "Shekhar Kapur",
  "Dharmendra",
  "V.K. Pandian",
];

const ordered = order
  .map((name) => testimonials.find((t) => t.name === name))
  .filter((t): t is (typeof testimonials)[number] => Boolean(t));

const AUTO_ADVANCE_MS = 7000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // TODO.md Phase 3.1: this auto-advance is JS-driven (setInterval), not a
  // CSS animation, so the blanket `prefers-reduced-motion` rule in
  // globals.css can't reach it — check the media query directly. A
  // visitor who's asked their OS for reduced motion never had an explicit
  // pause control for this (hover/focus pause exists, but that's not the
  // same as consent), a WCAG 2.2.2 (Pause, Stop, Hide) concern.
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  const sectionRef = useRef<HTMLElement>(null);

  // Lazy useState initializer above covers the initial render; this effect
  // only subscribes to later changes (e.g. the visitor toggles the OS
  // setting mid-session) — calling setState from the `onChange` callback,
  // not synchronously in the effect body itself.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    function onChange(e: MediaQueryListEvent) {
      setReducedMotion(e.matches);
    }
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const goTo = useCallback((next: number) => {
    setIndex(((next % ordered.length) + ordered.length) % ordered.length);
  }, []);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Auto-advance, paused on hover/focus, while a manual nav is fresh, or
  // when the visitor has asked for reduced motion — restarting the
  // interval on every `index` change means a manual click gets a full
  // AUTO_ADVANCE_MS before the carousel moves again, instead of
  // potentially jumping right after someone just picked a quote.
  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = setInterval(() => goNext(), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, reducedMotion, index, goNext]);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") goNext();
    if (event.key === "ArrowLeft") goPrev();
  }

  const current = ordered[index];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-surface-stage overflow-hidden py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,29,72,0.1),transparent_65%)]" />
      <div className="relative max-w-3xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="hidden sm:flex shrink-0 h-11 w-11 items-center justify-center rounded-full border border-surface-border text-on-surface-danza-muted hover:text-danza-gold hover:border-danza-gold/50 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              chevron_left
            </span>
          </button>

          <div className="flex-1 text-center">
            <span
              style={{ fontFamily: "var(--font-headline-danza)" }}
              className="block text-7xl text-danza-gold leading-none mb-4"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <div key={index} className="animate-fade-in">
              <p
                style={{ fontFamily: "var(--font-headline-danza)" }}
                className="text-xl sm:text-2xl italic font-medium text-on-surface-danza leading-relaxed min-h-[6rem] sm:min-h-[8rem]"
              >
                {current.quote}
              </p>

              <span className="mt-6 block font-sans text-sm font-semibold uppercase tracking-widest text-danza-gold">
                {current.name}
              </span>
              <span className="mt-1 block font-sans text-xs text-on-surface-danza-muted">
                {current.role}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonial"
            className="hidden sm:flex shrink-0 h-11 w-11 items-center justify-center rounded-full border border-surface-border text-on-surface-danza-muted hover:text-danza-gold hover:border-danza-gold/50 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              chevron_right
            </span>
          </button>
        </div>

        {/* TODO.md Phase 3.1: mobile prev/next are the *primary* controls on
            mobile (the sm:-and-up pair above is hidden here) — sized to the
            44px WCAG touch-target minimum, up from 36px. */}
        <div className="mt-8 flex items-center justify-center gap-4 sm:hidden">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-surface-border text-on-surface-danza-muted"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              chevron_left
            </span>
          </button>
          <span className="font-sans text-xs text-on-surface-danza-muted">
            {index + 1} / {ordered.length}
          </span>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-surface-border text-on-surface-danza-muted"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              chevron_right
            </span>
          </button>
        </div>

        {/* TODO.md Phase 3.1: pagination dots were a 6px-tall visual-only hit
            area. Each button is now a real 44px touch target with the small
            dot as a purely decorative inner span, rather than sizing the
            dot itself up (which would have changed the visual design). */}
        <div className="mt-2 flex items-center justify-center">
          {ordered.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Show testimonial from ${t.name}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-danza-gold" : "w-1.5 bg-surface-border hover:bg-on-surface-danza-muted"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
