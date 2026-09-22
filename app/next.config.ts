import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO.md Phase 3.2: was the default (['image/webp'] only). AVIF is
  // typically 20-30% smaller than WebP for the same visual quality —
  // Next's built-in optimizer negotiates the best format per-browser via
  // the request's Accept header, so this is a pure win with no fallback
  // risk (browsers without AVIF support silently get WebP instead, same
  // as before this change).
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
