import Link from "next/link";

// TODO.md Phase 5. Real, visible breadcrumb trail — previously only
// `/services/[slug]` and `/journal/[slug]` had a plain "← All Services" /
// "← Journal" back-link, which shows where you can go next but not where
// you are in the site hierarchy. The last item is the current page
// (`aria-current="page"`, not a link — you're already there). Nocturne
// tokens only; both current call sites are Nocturne-system pages.
export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 font-hanken text-sm text-nocturne-text-muted">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {i > 0 && (
                <span aria-hidden="true" className="text-nocturne-text-muted/50">
                  /
                </span>
              )}
              {item.href && !isLast ? (
                <Link href={item.href} className="font-semibold hover:text-nocturne-gold transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="font-semibold text-nocturne-text-primary">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
