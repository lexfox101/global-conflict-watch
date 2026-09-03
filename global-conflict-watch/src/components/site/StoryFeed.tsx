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
        <h3 className="headline-story mt-2">{emptyTitle}</h3>
        <p className="mt-3 max-w-[62ch] text-[14px] leading-relaxed text-muted">{emptyBody}</p>
        <Link href="/briefings" className="link-signal mt-4 inline-block text-[13px]">
          Browse the archive →
        </Link>
      </div>
    );
  }

  return (
    <ul className="ruled-list border-t border-rule" aria-label={label}>
      {refs.map(({ story, briefing }) => (
        <li key={`${briefing.slug}-${story.id}`}>
          <StoryCard story={story} briefingSlug={briefing.slug} showDate isSample={briefing.isSample} />
        </li>
      ))}
    </ul>
  );
}
