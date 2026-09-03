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

export function StoryCard({ story, briefingSlug, showDate = false, isSample = false }: StoryCardProps) {
  return (
    <article className="soft-panel soft-panel-hover flex h-full flex-col gap-4 p-5">
      <div className="flex flex-wrap items-center gap-2">
        <ThreatLevelBadge level={story.threatLevel} />
        <CategoryPill category={story.category} />
        {isSample ? <span className="pill pill-muted">Sample</span> : null}
      </div>

      <div className="min-w-0">
        <h3 className="text-balance text-[17px] font-semibold leading-snug tracking-[-0.01em] text-slate-50">
          <Link href={`/briefings/${briefingSlug}#${story.id}`} className="hover:text-cyan-100">
            {story.headline}
          </Link>
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-slate-400">{story.dek}</p>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2 text-[10px] text-slate-500">
        <ConfidenceBadge confidence={story.confidence} />
        <span className="pill pill-muted">{regionLabels(story.regions).join(" · ")}</span>
        {showDate ? (
          <time dateTime={briefingSlug} className="font-mono">
            {formatBriefingDateShort(briefingSlug)}
          </time>
        ) : null}
      </div>
    </article>
  );
}
