import type { Metadata } from "next";
import { JournalHeader } from "@/components/sections/journal/JournalHeader";
import { JournalGrid } from "@/components/sections/journal/JournalGrid";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Journal — Press, News & Milestones",
  description: `News, press mentions, and milestones from ${site.name}.`,
  alternates: {
    canonical: "/journal",
  },
};

// Journal — Nocturne Stage token reskin (DESIGN.md §18), client-confirmed
// 2026-09-20. No new dedicated Stitch screen exists for Journal — see
// DESIGN.md §18 for why — so this keeps every real-vs-dropped content
// decision already made in Phase 6 (ARCHITECTURE.md §1) unchanged and only
// migrates tokens. Header/Footer unchanged (already Danza Theatrical,
// DESIGN.md §13.6).
export default function JournalPage() {
  return (
    <div className="font-hanken bg-nocturne-surface-container-lowest">
      <JournalHeader />
      <JournalGrid />
    </div>
  );
}
