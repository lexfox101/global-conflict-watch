import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FREE_ARCHIVE_DAYS,
  countStoriesByCategory,
  deriveRegionThreatLevel,
  getStoriesByRegion,
} from "@/data/briefings";
import { REGION_PROFILES } from "@/data/regions";
import { CATEGORY_SLUGS } from "@/data/threat-categories";
import { REGIONS, REGION_KEYS, THREAT_CATEGORIES, type RegionKey } from "@/types/briefing";
import { CountBreakdown } from "@/components/site/CountBreakdown";
import { Prose } from "@/components/site/Prose";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StoryFeed } from "@/components/site/StoryFeed";
import { ThreatLevelBadge } from "@/components/site/ThreatLevelBadge";
import { categoryAccent, threatLevelBlurb } from "@/components/site/ui";

export const dynamicParams = false;

function isRegionKey(value: string): value is RegionKey {
  return (REGION_KEYS as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return REGION_KEYS.map((region) => ({ region }));
}

export async function generateMetadata({ params }: PageProps<"/regions/[region]">): Promise<Metadata> {
  const { region } = await params;
  if (!isRegionKey(region)) return { title: "Region not found" };

  return {
    title: REGIONS[region].name,
    description: REGION_PROFILES[region].summary,
  };
}

export default async function RegionPage({ params }: PageProps<"/regions/[region]">) {
  const { region } = await params;

  if (!isRegionKey(region)) {
    notFound();
  }

  const meta = REGIONS[region];
  const profile = REGION_PROFILES[region];
  const refs = getStoriesByRegion(region);
  const level = deriveRegionThreatLevel(region);
  const categoryCounts = countStoriesByCategory(refs);
  const breakdown = THREAT_CATEGORIES.filter((category) => (categoryCounts[category] ?? 0) > 0).map((category) => ({
    key: category,
    label: category,
    count: categoryCounts[category],
    href: `/threats/${CATEGORY_SLUGS[category]}`,
    accent: categoryAccent[category],
  }));

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-10 lg:px-6 lg:py-14">
      <Link href="/regions" className="text-[13px] text-cyan-200 hover:text-cyan-100">
        ← All regions
      </Link>

      <header className="mt-6">
        <p className="eyebrow">Region</p>
        <h1 className="mt-3 text-balance text-[30px] font-semibold leading-[1.12] tracking-[-0.03em] text-slate-50 sm:text-[38px]">
          {meta.name}
        </h1>
        <p className="mt-4 max-w-[62ch] text-[16px] leading-relaxed text-slate-400">{profile.summary}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {level ? (
            <ThreatLevelBadge level={level} label="Region" />
          ) : (
            <span className="pill pill-muted">Level unset — no current entries</span>
          )}
          <span className="pill pill-muted">
            {refs.length} {refs.length === 1 ? "story" : "stories"}
          </span>
          <span className="pill pill-muted">Free window · {FREE_ARCHIVE_DAYS} editions</span>
        </div>
        {level ? <p className="mt-3 max-w-[62ch] text-[13px] leading-relaxed text-slate-500">{threatLevelBlurb[level]}</p> : null}
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
        <section className="soft-panel p-6 sm:p-8" aria-labelledby="region-context">
          <h2 id="region-context" className="eyebrow">
            Standing context
          </h2>
          <Prose paragraphs={profile.context} className="mt-3" />
          <ul className="mt-6 flex flex-wrap gap-2">
            {profile.watchpoints.map((watchpoint) => (
              <li key={watchpoint} className="pill pill-muted">
                {watchpoint}
              </li>
            ))}
          </ul>
        </section>

        <section className="soft-panel p-6" aria-labelledby="region-breakdown">
          <h2 id="region-breakdown" className="eyebrow">
            Category breakdown
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
            Entries filed to {meta.shortName} in the current free window, by threat category.
          </p>
          <div className="mt-5">
            {breakdown.length > 0 ? (
              <CountBreakdown
                items={breakdown}
                label={`${meta.shortName} stories by category`}
                total={refs.length}
                caption="Shares are of this region's current entries. A story tagged to several regions is counted in each of them."
              />
            ) : (
              <p className="text-[13px] leading-relaxed text-slate-500">
                No entries are filed to this region in the current free window, so there is nothing to break down yet.
              </p>
            )}
          </div>
        </section>
      </div>

      <section className="mt-14" aria-labelledby="region-feed">
        <SectionHeading
          eyebrow="Feed"
          title={`${meta.shortName} entries`}
          id="region-feed"
          description="Newest edition first. Each headline links to the story in the briefing it was published in."
        />
        <div className="mt-6">
          <StoryFeed
            refs={refs}
            label={`${meta.shortName} stories`}
            emptyTitle="No entries filed to this region yet"
            emptyBody={`Nothing in the ${FREE_ARCHIVE_DAYS} editions inside the free window is tagged to ${meta.shortName}. That reflects the published record rather than an absence of activity — subscriber-archive editions are not included in this feed.`}
          />
        </div>
      </section>
    </div>
  );
}
