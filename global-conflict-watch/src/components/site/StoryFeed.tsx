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
      <div>
        <h3 className="type-standfirst is-heading">{emptyTitle}</h3>
        <p className="type-body mt-3 max-w-[64ch] text-muted">{emptyBody}</p>
        <Link href="/briefings" className="link-signal type-body mt-4 inline-block">
          Browse the archive →
        </Link>
      </div>
    );
  }

  return (
    <ul className="ruled-list" aria-label={label}>
      {refs.map(({ story, briefing }) => (
        <li key={`${briefing.slug}-${story.id}`}>
          <StoryCard story={story} briefingSlug={briefing.slug} isSample={briefing.isSample} />
        </li>
      ))}
    </ul>
  );
}
