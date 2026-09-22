import type { Metadata } from "next";
import { legalPages } from "@/content/legal";
import { LegalPlaceholder } from "@/components/sections/legal/LegalPlaceholder";

const page = legalPages.find((p) => p.slug === "rider-requirements")!;

export const metadata: Metadata = {
  title: page.label,
  description: page.description,
  // TODO.md Phase 2.1: noindex until real content lands — see sitemap.ts
  // for why this page (and its 5 siblings) is excluded there too.
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/rider-requirements",
  },
};

export default function RiderRequirementsPage() {
  return <LegalPlaceholder label={page.label} description={page.description} />;
}
