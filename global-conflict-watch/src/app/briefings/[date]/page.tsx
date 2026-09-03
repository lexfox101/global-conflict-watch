import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allBriefings, getAdjacentBriefings, getBriefing, isBriefingFree } from "@/data/briefings";
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
    <article id={story.id} className="scroll-mt-24">
      <div className="flex flex-wrap items-center gap-2">
        <ThreatLevelBadge level={story.threatLevel} />
        <CategoryPill category={story.category} />
        <ConfidenceBadge confidence={story.confidence} />
        <span className="pill pill-muted">{regionLabels(story.regions).join(" · ")}</span>
      </div>

      <h3 className="mt-4 text-balance text-[21px] font-semibold leading-snug tracking-[-0.02em] text-slate-50 sm:text-[24px]">
        {story.headline}
      </h3>
      <p className="mt-2 max-w-[68ch] text-[16px] leading-relaxed text-slate-400">{story.dek}</p>

      <Prose paragraphs={story.body} className="mt-4" />

      <div className="mt-5 max-w-[68ch] text-[13px] text-slate-500">
        {story.sources.length > 0 ? (
          <p>
            <span className="font-medium text-slate-400">Sources: </span>
            {story.sources.map((source, index) => (
              <span key={`${story.id}-${source.name}`}>
                {index > 0 ? <span aria-hidden="true"> · </span> : null}
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-200/90 underline decoration-cyan-300/30 underline-offset-4 hover:text-cyan-100"
                >
                  {source.name}
                </a>
              </span>
            ))}
            <span className="mt-1 block text-[12px] text-slate-600">
              Links point to publication homepages, not individual articles.
            </span>
          </p>
        ) : (
          <p>No sources attached — illustrative sample entry.</p>
        )}
      </div>

      {story.tags && story.tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {story.tags.map((tag) => (
            <li key={`${story.id}-${tag}`} className="pill pill-muted">
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function SectionBlock({ section }: { section: BriefingSection }) {
  return (
    <section id={section.id} className="scroll-mt-24" aria-labelledby={`${section.id}-heading`}>
      <div className="flex items-baseline gap-3">
        <span aria-hidden="true" className="font-mono text-[24px] font-semibold text-cyan-300/45">
          {section.number}
        </span>
        <h2 id={`${section.id}-heading`} className="text-balance text-[26px] font-semibold tracking-[-0.03em] text-slate-50 sm:text-[30px]">
          {section.title}
        </h2>
      </div>
      {section.intro ? <p className="mt-2 max-w-[68ch] text-[15px] leading-relaxed text-slate-400">{section.intro}</p> : null}

      <div className="mt-8 flex flex-col gap-10">
        {section.stories.map((story) => (
          <StoryArticle key={story.id} story={story} />
        ))}
      </div>

      {section.coverageNote ? (
        <aside className="soft-panel mt-10 p-5" aria-label={`${section.title} coverage note`}>
          <p className="eyebrow">Coverage note</p>
          <p className="mt-2 max-w-[68ch] text-[14px] leading-relaxed text-slate-400">{section.coverageNote}</p>
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
  const { newer, older } = getAdjacentBriefings(briefing.slug);

  if (!isBriefingFree(briefing)) {
    return (
      <div className="mx-auto w-full max-w-[820px] px-4 py-10 lg:px-6 lg:py-14">
        <Link href="/briefings" className="text-[13px] text-cyan-200 hover:text-cyan-100">
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
      <Link href="/briefings" className="text-[13px] text-cyan-200 hover:text-cyan-100">
        ← All briefings
      </Link>

      <header className="mt-6">
        <p className="eyebrow">
          <time dateTime={briefing.date}>
            {formatBriefingWeekday(briefing.date)} · {formatBriefingDate(briefing.date)}
          </time>
        </p>
        <h1 className="mt-3 text-balance text-[30px] font-semibold leading-[1.12] tracking-[-0.03em] text-slate-50 sm:text-[38px]">
          {briefing.title}
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <ThreatLevelBadge level={briefing.globalThreatLevel} label="Global" />
          <span className="pill pill-muted">
            {storyCount} {storyCount === 1 ? "story" : "stories"}
          </span>
          <span className="pill pill-muted">{briefing.sections.length} sections</span>
        </div>
      </header>

      {briefing.isSample ? (
        <aside className="soft-panel mt-6 border-amber-300/20 bg-amber-400/[0.06] p-5" aria-label="Sample content notice">
          <p className="eyebrow text-amber-200/80">Illustrative sample edition</p>
          <p className="mt-2 max-w-[68ch] text-[14px] leading-relaxed text-slate-300">
            This edition is placeholder content, written to demonstrate the briefing format. It is not derived from real reporting,
            carries no source attributions, and must not be treated as intelligence.
          </p>
        </aside>
      ) : null}

      <section className="soft-panel mt-8 p-6 sm:p-8" aria-labelledby="top-line">
        <h2 id="top-line" className="eyebrow">
          Top line
        </h2>
        <Prose paragraphs={briefing.topLine} className="mt-3" />
      </section>

      <div className="mt-14 flex flex-col gap-16">
        {briefing.sections.map((section) => (
          <SectionBlock key={section.id} section={section} />
        ))}
      </div>

      <aside className="soft-panel mt-16 p-5" aria-label="Verification note">
        <p className="eyebrow">Verification</p>
        <p className="mt-2 max-w-[68ch] text-[14px] leading-relaxed text-slate-400">{briefing.verificationNote}</p>
      </aside>

      <nav className="mt-10 grid gap-4 sm:grid-cols-2" aria-label="Briefing navigation">
        {older ? (
          <Link href={`/briefings/${older.slug}`} className="soft-panel soft-panel-hover block p-5">
            <span className="eyebrow">Previous edition</span>
            <span className="mt-2 block text-[15px] font-semibold text-slate-100">{formatBriefingDate(older.date)}</span>
            <span className="mt-1 block text-[13px] text-slate-500">{older.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {newer ? (
          <Link href={`/briefings/${newer.slug}`} className="soft-panel soft-panel-hover block p-5 sm:text-right">
            <span className="eyebrow">Next edition</span>
            <span className="mt-2 block text-[15px] font-semibold text-slate-100">{formatBriefingDate(newer.date)}</span>
            <span className="mt-1 block text-[13px] text-slate-500">{newer.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
