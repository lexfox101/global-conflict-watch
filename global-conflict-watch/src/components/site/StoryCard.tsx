import Link from "next/link";
import { regionLabels, type BriefingStory } from "@/types/briefing";
import { CategoryPill } from "./CategoryPill";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { ThreatLevelBadge } from "./ThreatLevelBadge";
import { formatBriefingDateShort } from "./ui";

interface StoryCardProps {
  story: BriefingStory;
  /** Slug of the edition the story belongs to, used for the deep link. */
  briefingSlug: string;
  showDate?: boolean;
  isSample?: boolean;
}

/**
 * One entry in a ruled story list. Everything except the threat level is set as
 * a typographic metadata line rather than a badge.
 */
export function StoryCard({ story, briefingSlug, showDate = false, isSample = false }: StoryCardProps) {
  return (
    <article className="flex flex-col gap-2">
      <h3 className="headline-item">
        <Link href={`/briefings/${briefingSlug}#${story.id}`} className="hover:text-signal">
          {story.headline}
        </Link>
      </h3>
      <p className="standfirst-sm max-w-[62ch] text-[15px]">{story.dek}</p>
      <p className="meta-line">
        <ThreatLevelBadge level={story.threatLevel} />
        <CategoryPill category={story.category} />
        <span>{regionLabels(story.regions).join(", ")}</span>
        <ConfidenceBadge confidence={story.confidence} />
        {showDate ? (
          <time dateTime={briefingSlug}>{formatBriefingDateShort(briefingSlug)}</time>
        ) : null}
        {isSample ? <span className="text-flag">Illustrative sample</span> : null}
      </p>
    </article>
  );
}
