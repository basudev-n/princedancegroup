import Image from "next/image";

// 2026-10-14 — round headshot for a testimonial. Client approved showing
// these public figures' photos next to their quotes (see ARCHITECTURE.md §6);
// each photo's source/licence is recorded in content/testimonials.ts. Renders
// nothing when a person has no photo, so a missing file never shows a broken
// image. `alt` is empty: the person's name is printed right beside it.
export function TestimonialAvatar({
  photo,
  size = 64,
  className = "",
}: {
  photo?: string;
  size?: number;
  className?: string;
}) {
  if (!photo) return null;
  return (
    <Image
      src={photo}
      alt=""
      width={size}
      height={size}
      className={`rounded-full object-cover object-top border-2 border-white/15 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
