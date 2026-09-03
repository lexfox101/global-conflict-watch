import Link from "next/link";
import { breakingAlerts } from "@/data/alerts";
import { FREE_ARCHIVE_DAYS, globalThreatLevel, latestBriefing, topThreats } from "@/data/briefings";
import { briefingCategories, briefingStoryCount } from "@/types/briefing";
import { BreakingTicker } from "@/components/site/BreakingTicker";
import { CategoryPill } from "@/components/site/CategoryPill";
import { NewsletterSignup } from "@/components/site/NewsletterSignup";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StoryCard } from "@/components/site/StoryCard";
import { ThreatGauge } from "@/components/site/ThreatGauge";
import { ThreatLevelBadge } from "@/components/site/ThreatLevelBadge";
import { formatBriefingDate, formatBriefingWeekday } from "@/components/site/ui";

const SECONDARY_LINKS = [
  { href: "/map", label: "Interactive map", blurb: "Incident and tracking overlays on a global basemap." },
  { href: "/regions", label: "Regions", blurb: "Middle East, Eastern Europe, Asia-Pacific, Africa, Americas." },
  { href: "/threats", label: "Threat categories", blurb: "What each of the six categories covers, and its current entries." },
  { href: "/data", label: "Data & stats", blurb: "Counts derived from published briefings, reference datasets, methodology." },
];

export default function HomePage() {
  const stories = topThreats(4);
  const storyCount = briefingStoryCount(latestBriefing);
  const categories = briefingCategories(latestBriefing);

  return (
    <>
      <BreakingTicker alerts={breakingAlerts} />

      <div className="mx-auto w-full max-w-[1400px] px-4 py-10 lg:px-6 lg:py-14">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <p className="eyebrow">
              {formatBriefingWeekday(latestBriefing.date)} · {formatBriefingDate(latestBriefing.date)}
            </p>
            <h1 className="mt-3 text-balance text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-slate-50 sm:text-[42px]">
              Daily open-source intelligence, with the sourcing shown
            </h1>
            <p className="mt-4 max-w-[58ch] text-[16px] leading-relaxed text-slate-400">
              Global Conflict Watch publishes one briefing each day across cyber threats, the private-security market, and
              defence-industry technology. Every story carries a threat level, a confidence rating, and the publications it draws
              on — claims made by an involved party stay labelled as claims.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={`/briefings/${latestBriefing.slug}`}
                className="rounded-none border border-cyan-300/25 bg-cyan-400/10 px-5 py-2.5 text-[14px] font-semibold text-cyan-100 transition-colors hover:bg-cyan-400/15"
              >
                Read today&apos;s briefing
              </Link>
              <Link
                href="/briefings"
                className="rounded-none border border-white/10 px-5 py-2.5 text-[14px] text-slate-300 transition-colors hover:bg-white/5 hover:text-slate-100"
              >
                Browse the archive
              </Link>
            </div>
          </div>

          <div className="soft-panel p-6">
            <ThreatGauge level={globalThreatLevel} />
            <hr className="rule-soft my-5" />
            <dl className="grid grid-cols-3 gap-4 text-center">
              <div>
                <dt className="text-[11px] text-slate-500">Stories today</dt>
                <dd className="mt-1 font-mono text-[18px] text-slate-100">{storyCount}</dd>
              </div>
              <div>
                <dt className="text-[11px] text-slate-500">Sections</dt>
                <dd className="mt-1 font-mono text-[18px] text-slate-100">{latestBriefing.sections.length}</dd>
              </div>
              <div>
                <dt className="text-[11px] text-slate-500">Free archive</dt>
                <dd className="mt-1 font-mono text-[18px] text-slate-100">{FREE_ARCHIVE_DAYS}d</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="top-threats">
          <SectionHeading
            eyebrow="Priority items"
            title="Today's top threats"
            id="top-threats"
            description="The most severe entries from the current briefing, ranked by assessed threat level."
            trailing={
              <Link href={`/briefings/${latestBriefing.slug}`} className="text-[13px] text-cyan-200 hover:text-cyan-100">
                All {storyCount} stories →
              </Link>
            }
          />
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stories.map((story) => (
              <li key={story.id}>
                <StoryCard story={story} briefingSlug={latestBriefing.slug} isSample={latestBriefing.isSample} />
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-stretch">
          <article className="soft-panel flex flex-col gap-4 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="pill pill-accent">Latest briefing</span>
              <ThreatLevelBadge level={latestBriefing.globalThreatLevel} label="Global" />
            </div>
            <div>
              <p className="eyebrow">{formatBriefingDate(latestBriefing.date)}</p>
              <h2 className="mt-2 text-balance text-[24px] font-semibold tracking-[-0.02em] text-slate-50">{latestBriefing.title}</h2>
            </div>
            <p className="prose-editorial text-[15px]">{latestBriefing.topLine[0]}</p>
            <ul className="flex flex-col gap-2 text-[13px] text-slate-400">
              {latestBriefing.sections.map((section) => (
                <li key={section.id} className="flex items-baseline justify-between gap-4">
                  <span>
                    <span className="font-mono text-slate-500">{section.number}.</span> {section.title}
                  </span>
                  <span className="font-mono text-[12px] text-slate-500">{section.stories.length}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <CategoryPill key={category} category={category} />
              ))}
            </div>
            <Link
              href={`/briefings/${latestBriefing.slug}`}
              className="self-start rounded-none border border-cyan-300/25 bg-cyan-400/10 px-5 py-2.5 text-[14px] font-semibold text-cyan-100 transition-colors hover:bg-cyan-400/15"
            >
              Read full briefing
            </Link>
          </article>

          <NewsletterSignup />
        </section>

        <section className="mt-14" aria-labelledby="explore-more">
          <SectionHeading eyebrow="Also on GCW" title="Explore the rest of the site" id="explore-more" as="h2" />
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SECONDARY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="soft-panel soft-panel-hover block h-full p-5">
                  <p className="text-[15px] font-semibold text-slate-100">{link.label}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{link.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
