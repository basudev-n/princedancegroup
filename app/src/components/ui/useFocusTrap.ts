"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// TODO.md Phase 3.1. Shared focus-trap behavior for layout/BookingModal.tsx
// and Home's sections/home/Gallery.tsx lightbox — both already had correct
// role="dialog"/aria-modal/Escape/scroll-lock, but neither moved focus
// into the dialog on open, trapped Tab within it, or restored focus on
// close. The lightbox was worse: its prev/next/close buttons were only
// reachable by tabbing through the entire page behind the overlay first.
// A hand-rolled hook here instead of a dependency (focus-trap-react,
// Radix Dialog) — for two call sites this is the lighter call, and it
// avoids an ARCHITECTURE.md §4 entry for something this small.
//
// Usage: attach `containerRef` to the dialog's outer element (give it
// `tabIndex={-1}` too, as a fallback focus target if the dialog somehow
// has no focusable children) and call `useFocusTrap(containerRef, isOpen)`.
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  isOpen: boolean,
) {
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const container = containerRef.current;
    if (!container) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const focusables = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    (focusables[0] ?? container).focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab" || !container) return;
      const current = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null);
      if (current.length === 0) return;

      const first = current[0];
      const last = current[current.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [isOpen, containerRef]);
}
