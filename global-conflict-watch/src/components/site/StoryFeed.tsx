import Link from "next/link";
import type { StoryRef } from "@/data/briefings";
import { StoryCard } from "./StoryCard";

interface StoryFeedProps {
  /** Story references in display order — newest edition first. */
  refs: StoryRef[];
  /** Accessible name for the list. */
  label: string;
  emptyTitle: string;
  emptyBody: string;
}

/** Shared feed used by the region and category pages, with a matching empty state. */
export function StoryFeed({ refs, label, emptyTitle, emptyBody }: StoryFeedProps) {
  if (refs.length === 0) {
    return (
      <div className="soft-panel p-6 sm:p-8">
        <p className="eyebrow">No entries</p>
        <h3 className="mt-2 text-balance text-[18px] font-semibold tracking-[-0.01em] text-slate-100">{emptyTitle}</h3>
        <p className="mt-2 max-w-[62ch] text-[14px] leading-relaxed text-slate-400">{emptyBody}</p>
        <Link href="/briefings" className="mt-4 inline-block text-[13px] text-cyan-200 hover:text-cyan-100">
          Browse the archive →
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label={label}>
      {refs.map(({ story, briefing }) => (
        <li key={`${briefing.slug}-${story.id}`}>
          <StoryCard story={story} briefingSlug={briefing.slug} showDate isSample={briefing.isSample} />
        </li>
      ))}
    </ul>
  );
}
