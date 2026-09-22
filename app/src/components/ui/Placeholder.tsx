// Placeholder primitives — DESIGN.md §11. Used only where Stitch's Home
// screen invented a specific fictional entity (a name, photo, track, video)
// with no real-world counterpart. Never used to fabricate a plausible fake
// in its place — see ARCHITECTURE.md §1 rule 1.

export function PlaceholderImage({
  label = "Photo to come",
  className = "",
  aspect = "aspect-[4/5]",
}: {
  label?: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`${aspect} flex flex-col items-center justify-center gap-space-xs rounded-panel border-2 border-dashed border-outline-variant bg-surface-container-low text-on-surface-variant ${className}`}
    >
      <span className="material-symbols-outlined text-[32px] opacity-60" aria-hidden="true">
        image
      </span>
      <span className="font-jakarta text-home-label-sm font-bold uppercase tracking-wider opacity-70">
        {label}
      </span>
    </div>
  );
}

export function PlaceholderNote({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "muted" | "on-dark" | "on-danza" | "on-nocturne";
}) {
  // "on-danza"/"on-nocturne" — Danza Theatrical and Nocturne Stage pages
  // are dark by default, so the M3 "muted"/"on-dark" tones (built for the
  // light §9 system) render as low-contrast dark-on-dark text there. Each
  // uses that system's own real token + body font instead of the M3
  // defaults.
  if (tone === "on-danza") {
    return (
      <span className="font-sans text-sm italic text-on-surface-danza-muted">
        {children}
      </span>
    );
  }
  if (tone === "on-nocturne") {
    return (
      <span className="font-hanken text-sm italic text-nocturne-text-muted">
        {children}
      </span>
    );
  }
  const toneClass =
    tone === "on-dark" ? "text-on-primary/70" : "text-on-surface-variant";
  return (
    <span className={`font-jakarta text-home-body-md italic ${toneClass}`}>
      {children}
    </span>
  );
}
