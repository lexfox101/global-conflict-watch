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
      <p className="meta-line">
        <ThreatLevelBadge level={story.threatLevel} />
        <CategoryPill category={story.category} />
        <span>{regionLabels(story.regions).join(", ")}</span>
        <ConfidenceBadge confidence={story.confidence} />
      </p>

      <h3 className="headline-story mt-3">{story.headline}</h3>
      <p className="standfirst-sm mt-3 max-w-[64ch]">{story.dek}</p>

      <Prose paragraphs={story.body} className="mt-5" />

      <div className="mt-6 max-w-[68ch] text-[13px] leading-relaxed text-paper-faint">
        {story.sources.length > 0 ? (
          <p>
            <span className="font-medium text-paper-dim">Sources: </span>
            {story.sources.map((source, index) => (
              <span key={`${story.id}-${source.name}`}>
                {index > 0 ? <span aria-hidden="true"> · </span> : null}
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="link-signal">
                  {source.name}
                </a>
              </span>
            ))}
            <span className="mt-1 block text-[12px]">Links point to publication homepages, not individual articles.</span>
          </p>
        ) : (
          <p>No sources attached — illustrative sample entry.</p>
        )}
      </div>

      {story.tags && story.tags.length > 0 ? (
        <p className="meta-line mt-4">
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
      <div className="border-b border-rule-strong pb-3">
        <div className="flex items-baseline gap-3">
          <span aria-hidden="true" className="font-mono text-[13px] text-paper-faint">
            {String(section.number).padStart(2, "0")}
          </span>
          <h2 id={`${section.id}-heading`} className="headline-section">
            {section.title}
          </h2>
        </div>
      </div>
      {section.intro ? <p className="standfirst-sm mt-4 max-w-[66ch]">{section.intro}</p> : null}

      <div className="mt-8 flex flex-col gap-12">
        {section.stories.map((story) => (
          <StoryArticle key={story.id} story={story} />
        ))}
      </div>

      {section.coverageNote ? (
        <aside className="mt-10 border-l-2 border-rule-strong pl-5" aria-label={`${section.title} coverage note`}>
          <p className="eyebrow">Coverage note</p>
          <p className="mt-2 max-w-[66ch] text-[14px] leading-relaxed text-paper-dim">{section.coverageNote}</p>
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
      <div className="mx-auto w-full max-w-[820px] px-4 py-10 lg:px-6 lg:py-14">
        <Link href="/briefings" className="link-signal text-[13px]">
          ← All briefings
        </Link>
        <div className="mt-6">
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
    <div className="mx-auto w-full max-w-[820px] px-4 py-10 lg:px-6 lg:py-14">
      <Link href="/briefings" className="link-signal text-[13px]">
        ← All briefings
      </Link>

      <header className="mt-8">
        <p className="dateline">
          {edition ? `Edition No. ${edition} · ` : ""}
          <time dateTime={briefing.date}>
            {formatBriefingWeekday(briefing.date)} {formatBriefingDate(briefing.date)}
          </time>
          {briefing.isSample ? "" : " · Compiled 06:00 UTC"}
        </p>
        <h1 className="headline-page mt-4">{briefing.title}</h1>
        {standfirst ? <p className="standfirst mt-5 max-w-[58ch]">{standfirst}</p> : null}
        <p className="meta-line mt-6 border-t border-rule-strong pt-3">
          <ThreatLevelBadge level={briefing.globalThreatLevel} label="Global" />
          <span>
            {storyCount} {storyCount === 1 ? "story" : "stories"}
          </span>
          <span>{briefing.sections.length} sections</span>
        </p>
      </header>

      {briefing.isSample ? (
        <aside className="soft-panel panel-note mt-8 p-5" aria-label="Sample content notice">
          <p className="eyebrow text-flag">Illustrative sample edition</p>
          <p className="mt-2 max-w-[66ch] text-[14px] leading-relaxed text-paper-body">
            This edition is placeholder content, written to demonstrate the briefing format. It is not derived from real reporting,
            carries no source attributions, and must not be treated as intelligence.
          </p>
        </aside>
      ) : null}

      {remainingTopLine.length > 0 ? (
        <section className="mt-10" aria-labelledby="top-line">
          <h2 id="top-line" className="eyebrow border-b border-rule pb-2">
            Top line
          </h2>
          <Prose paragraphs={remainingTopLine} className="mt-4" />
        </section>
      ) : null}

      <div className="mt-14 flex flex-col gap-16">
        {briefing.sections.map((section) => (
          <SectionBlock key={section.id} section={section} />
        ))}
      </div>

      {!briefing.isSample ? (
        <aside className="mt-16 border-t border-rule-strong pt-5" aria-label="How this edition was compiled">
          <p className="eyebrow">How this edition was compiled</p>
          <p className="mt-3 max-w-[66ch] text-[14px] leading-relaxed text-paper-dim">
            Open-source reporting only: publications, national-authority and vendor advisories, court and regulatory filings, and
            published research. Every entry carries a threat level, a confidence rating, region tags and a category. Source links
            point to publication homepages rather than individual articles, because article URLs decay. The global level above is
            the highest story-level threat in this edition rather than a separate judgement.
          </p>
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
            <Link href="/data#methodology" className="link-signal">
              Full methodology →
            </Link>
            <Link href="/about#corrections" className="link-signal">
              Report a correction →
            </Link>
          </p>
        </aside>
      ) : null}

      <aside className="mt-10 border-t border-rule pt-5" aria-label="Verification note">
        <p className="eyebrow">Verification</p>
        <p className="mt-3 max-w-[66ch] text-[14px] leading-relaxed text-paper-dim">{briefing.verificationNote}</p>
      </aside>

      <nav className="mt-12 grid sm:grid-cols-2 sm:gap-x-8" aria-label="Briefing navigation">
        {older ? (
          <Link href={`/briefings/${older.slug}`} className="block border-t border-rule-strong py-5">
            <span className="eyebrow">Previous edition</span>
            <span className="dateline mt-2 block">{formatBriefingDate(older.date)}</span>
            <span className="headline-item mt-1 block">{older.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {newer ? (
          <Link href={`/briefings/${newer.slug}`} className="block border-t border-rule-strong py-5 sm:text-right">
            <span className="eyebrow">Next edition</span>
            <span className="dateline mt-2 block">{formatBriefingDate(newer.date)}</span>
            <span className="headline-item mt-1 block">{newer.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
