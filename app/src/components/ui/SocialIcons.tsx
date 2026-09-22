import { site } from "@/content/site";
import {
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  XIcon,
} from "./icons/BrandIcons";

// TODO.md Phase 1.2 — client-requested. `content/site.ts`'s `social`
// object is still four empty strings (`TODO(content)`: real handles were
// referenced but not legible in the source PDF, need client
// confirmation). Rather than wait to build this, every entry with an
// empty `href` is filtered out here — an empty string would otherwise
// render `href=""`, which silently links to the current page, a dead
// link a visitor wouldn't notice until they clicked it. That means this
// component renders nothing at all right now (all four are empty) and
// starts working the moment real handles land in `site.ts` — no other
// code change needed.
const platforms = [
  { key: "facebook", label: "Facebook", Icon: FacebookIcon, href: site.social.facebook },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon, href: site.social.instagram },
  { key: "youtube", label: "YouTube", Icon: YouTubeIcon, href: site.social.youtube },
  { key: "twitter", label: "X (Twitter)", Icon: XIcon, href: site.social.twitter },
] as const;

export function SocialIcons({ className = "" }: { className?: string }) {
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
          className="flex h-11 w-11 items-center justify-center rounded-full border border-surface-border bg-surface-card text-on-surface-danza-muted hover:text-danza-gold hover:border-danza-gold/40 transition-colors"
        >
          <Icon className="h-[18px] w-[18px]" />
        </a>
      ))}
    </nav>
  );
}
