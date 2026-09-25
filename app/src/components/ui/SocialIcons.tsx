import { site } from "@/content/site";
import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  XIcon,
} from "./icons/BrandIcons";

// TODO.md Phase 1.2 — client-requested. Every entry with an empty `href`
// in `content/site.ts`'s `social` object is filtered out here — an empty
// string would otherwise render `href=""`, which silently links to the
// current page. Real Facebook/Instagram/YouTube URLs landed 2026-09-25; X
// has no account so it stays hidden.
//
// `tone` picks the surface styling: "danza" (default, Header/Footer) or
// "nocturne" (Nocturne Stage pages, e.g. the Contact sidebar).
const platforms = [
  { key: "facebook", label: "Facebook", Icon: FacebookIcon, href: site.social.facebook },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon, href: site.social.instagram },
  { key: "youtube", label: "YouTube", Icon: YouTubeIcon, href: site.social.youtube },
  { key: "twitter", label: "X (Twitter)", Icon: XIcon, href: site.social.twitter },
] as const;

const toneClasses = {
  danza:
    "border-surface-border bg-surface-card text-on-surface-danza-muted hover:text-danza-gold hover:border-danza-gold/40",
  nocturne:
    "border-nocturne-stage-border bg-nocturne-surface-container text-nocturne-text-muted hover:text-nocturne-gold hover:border-nocturne-gold/40",
} as const;

export function SocialIcons({
  className = "",
  tone = "danza",
}: {
  className?: string;
  tone?: keyof typeof toneClasses;
}) {
  const active = platforms.filter((p) => p.href);
  if (active.length === 0) return null;

  return (
    <nav aria-label="Social media" className={`flex items-center gap-2 ${className}`}>
      {active.map(({ key, label, Icon, href }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${site.name} on ${label}`}
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${toneClasses[tone]}`}
        >
          <Icon className="h-[18px] w-[18px]" />
        </a>
      ))}
    </nav>
  );
}
