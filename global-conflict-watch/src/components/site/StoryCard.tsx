import Link from "next/link";
import type { BriefingStory } from "@/types/briefing";
import { CategoryPill } from "./CategoryPill";
import { ThreatLevelBadge } from "./ThreatLevelBadge";
import { formatBriefingDateShort } from "./ui";

interface StoryCardProps {
  story: BriefingStory;
  /** Slug of the edition the story belongs to, used for the deep link. */
  briefingSlug: string;
  isSample?: boolean;
}

/**
 * One entry in a ruled story list: headline, standfirst, and two metadata
 * tokens. Region and confidence belong to the briefing reader, not to the row.
 */
export function StoryCard({ story, briefingSlug, isSample = false }: StoryCardProps) {
  return (
    <article className="flex flex-col gap-2">
      <h3 className="type-standfirst is-heading">
        <Link href={`/briefings/${briefingSlug}#${story.id}`} className="hover:text-signal">
          {story.headline}
        </Link>
      </h3>
      <p className="type-body max-w-[64ch] text-muted">{story.dek}</p>
      <p className="type-meta meta-line">
        <ThreatLevelBadge level={story.threatLevel} variant="dot" />
        <CategoryPill category={story.category} />
        <time dateTime={briefingSlug}>{formatBriefingDateShort(briefingSlug)}</time>
      </p>
      {isSample ? <p className="type-meta text-flag">Illustrative sample</p> : null}
    </article>
  );
}
