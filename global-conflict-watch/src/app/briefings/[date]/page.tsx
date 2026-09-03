import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allBriefings, briefingEditionNumber, getAdjacentBriefings, getBriefing, isBriefingFree } from "@/data/briefings";
import { briefingStoryCount, regionLabels, type BriefingSection, type BriefingStory } from "@/types/briefing";
import { CategoryPill } from "@/components/site/CategoryPill";
import { ConfidenceBadge } from "@/components/site/ConfidenceBadge";
import { PremiumGate } from "@/components/site/PremiumGate";
import { Prose } from "@/components/site/Prose";
import { ThreatLevelBadge } from "@/components/site/ThreatLevelBadge";
import { formatBriefingDate, formatBriefingWeekday } from "@/components/site/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return allBriefings.map((briefing) => ({ date: briefing.slug }));
}

export async function generateMetadata({ params }: PageProps<"/briefings/[date]">): Promise<Metadata> {
  const { date } = await params;
  const briefing = getBriefing(date);
  if (!briefing) return { title: "Briefing not found" };

  const summary = briefing.topLine[0] ?? "";
  return {
    title: briefing.title,
    description: summary.length > 180 ? `${summary.slice(0, 177).trimEnd()}…` : summary,
  };
}

function StoryArticle({ story }: { story: BriefingStory }) {
  return (
    <article id={story.id} className="scroll-mt-28">
      <h3 className="type-heading">{story.headline}</h3>
      <p className="type-standfirst mt-3 max-w-[62ch]">{story.dek}</p>
      <p className="type-meta meta-line mt-4">
        <ThreatLevelBadge level={story.threatLevel} />
        <CategoryPill category={story.category} />
        <span>{regionLabels(story.regions).join(", ")}</span>
        <ConfidenceBadge confidence={story.confidence} />
      </p>

      <Prose paragraphs={story.body} className="mt-5" />

      <div className="type-body mt-6 max-w-[68ch] text-muted">
        {story.sources.length > 0 ? (
          <p>
            <span className="font-medium text-ink">Sources: </span>
            {story.sources.map((source, index) => (
              <span key={`${story.id}-${source.name}`}>
                {index > 0 ? <span aria-hidden="true"> · </span> : null}
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="link-signal">
                  {source.name}
                </a>
              </span>
            ))}
            <span className="mt-1 block">Links point to publication homepages, not individual articles.</span>
          </p>
        ) : (
          <p>No sources attached — illustrative sample entry.</p>
        )}
      </div>

      {story.tags && story.tags.length > 0 ? (
        <p className="type-meta meta-line mt-4">
          {story.tags.map((tag) => (
            <span key={`${story.id}-${tag}`}>{tag}</span>
          ))}
        </p>
      ) : null}
    </article>
  );
}

function SectionBlock({ section }: { section: BriefingSection }) {
  return (
    <section id={section.id} className="scroll-mt-28" aria-labelledby={`${section.id}-heading`}>
      <h2 id={`${section.id}-heading`} className="type-heading border-b border-rule pb-4">
        <span aria-hidden="true" className="font-mono text-muted">
          {String(section.number).padStart(2, "0")}{" "}
        </span>
        {section.title}
      </h2>
      {section.intro ? <p className="type-standfirst mt-5 max-w-[64ch]">{section.intro}</p> : null}

      <div className="mt-10 flex flex-col gap-14">
        {section.stories.map((story) => (
          <StoryArticle key={story.id} story={story} />
        ))}
      </div>

      {section.coverageNote ? (
        <aside className="mt-12" aria-label={`${section.title} coverage note`}>
          <p className="type-meta">Coverage note</p>
          <p className="type-body mt-2 max-w-[66ch] text-muted">{section.coverageNote}</p>
        </aside>
      ) : null}
    </section>
  );
}

export default async function BriefingPage({ params }: PageProps<"/briefings/[date]">) {
  const { date } = await params;
  const briefing = getBriefing(date);

  if (!briefing) {
    notFound();
  }

  const storyCount = briefingStoryCount(briefing);
  const edition = briefingEditionNumber(briefing.slug);
  const { newer, older } = getAdjacentBriefings(briefing.slug);
  const [standfirst, ...remainingTopLine] = briefing.topLine;

  if (!isBriefingFree(briefing)) {
    return (
      <div className="mx-auto w-full max-w-[820px] px-4 py-14 lg:px-6 lg:py-20">
        <Link href="/briefings" className="link-signal type-body">
          ← All briefings
        </Link>
        <div className="mt-8">
          <PremiumGate
            title={briefing.title}
            dateLabel={formatBriefingDate(briefing.date)}
            storyCount={storyCount}
            teaser={briefing.topLine}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[820px] px-4 py-14 lg:px-6 lg:py-20">
      <Link href="/briefings" className="link-signal type-body">
        ← All briefings
      </Link>

      <header className="mt-10">
        <h1 className="type-lead">{briefing.title}</h1>
        {standfirst ? <p className="type-standfirst mt-6 max-w-[52ch]">{standfirst}</p> : null}
        <p className="type-meta meta-line mt-6 border-t border-rule pt-4">
          <ThreatLevelBadge level={briefing.globalThreatLevel} label="Global" />
          <span>
            {edition ? `No. ${edition} · ` : ""}
            <time dateTime={briefing.date}>
              {formatBriefingWeekday(briefing.date)} {formatBriefingDate(briefing.date)}
            </time>
            {briefing.isSample ? "" : " · Compiled 06:00 UTC"}
          </span>
          <span>
            {storyCount} {storyCount === 1 ? "story" : "stories"} in {briefing.sections.length} sections
          </span>
        </p>
      </header>

      {briefing.isSample ? (
        <aside className="soft-panel panel-note mt-10 p-5" aria-label="Sample content notice">
          <p className="type-meta text-flag">Illustrative sample edition</p>
          <p className="type-body mt-2 max-w-[66ch] text-ink-body">
            This edition is placeholder content, written to demonstrate the briefing format. It is not derived from real reporting,
            carries no source attributions, and must not be treated as intelligence.
          </p>
        </aside>
      ) : null}

      {remainingTopLine.length > 0 ? <Prose paragraphs={remainingTopLine} className="mt-10" /> : null}

      <div className="mt-20 flex flex-col gap-20">
        {briefing.sections.map((section) => (
          <SectionBlock key={section.id} section={section} />
        ))}
      </div>

      <aside className="mt-20 border-t border-rule pt-6" aria-label="How this edition was compiled">
        <p className="type-meta">How this edition was compiled, and verified</p>
        {!briefing.isSample ? (
          <p className="type-body mt-3 max-w-[66ch] text-muted">
            Open-source reporting only: publications, national-authority and vendor advisories, court and regulatory filings, and
            published research. Every entry carries a threat level, a confidence rating, region tags and a category. Source links
            point to publication homepages rather than individual articles, because article URLs decay. The global level above is
            the highest story-level threat in this edition rather than a separate judgement.
          </p>
        ) : null}
        <p className="type-body mt-3 max-w-[66ch] text-muted">{briefing.verificationNote}</p>
        {!briefing.isSample ? (
          <p className="type-body mt-3 flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/data#methodology" className="link-signal">
              Full methodology →
            </Link>
            <Link href="/about#corrections" className="link-signal">
              Report a correction →
            </Link>
          </p>
        ) : null}
      </aside>

      <nav className="mt-16 grid gap-6 border-t border-rule pt-6 sm:grid-cols-2" aria-label="Briefing navigation">
        {older ? (
          <Link href={`/briefings/${older.slug}`} className="block">
            <span className="type-meta block">Previous edition · {formatBriefingDate(older.date)}</span>
            <span className="type-standfirst is-heading mt-2 block">{older.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {newer ? (
          <Link href={`/briefings/${newer.slug}`} className="block sm:text-right">
            <span className="type-meta block">Next edition · {formatBriefingDate(newer.date)}</span>
            <span className="type-standfirst is-heading mt-2 block">{newer.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
