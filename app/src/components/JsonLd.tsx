// TODO.md Phase 5. Shared render helper for JSON-LD structured data —
// Next's own recommended approach (a <script type="application/ld+json">
// rendered in layout.tsx/page.tsx) is just a JSON.stringify'd object; this
// wraps that in one place so every call site gets the same XSS-safe
// escaping (Next's own docs warn JSON.stringify alone doesn't sanitize
// strings for use inside a <script> tag) without repeating it.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
