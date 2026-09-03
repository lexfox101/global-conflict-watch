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
      <Link href="/regions" className="link-signal text-[13px]">
        ← All regions
      </Link>

      <header className="mt-8">
        <p className="eyebrow">Region</p>
        <h1 className="headline-page mt-3">{meta.name}</h1>
        <p className="standfirst mt-4 max-w-[62ch]">{profile.summary}</p>
        <p className="meta-line mt-6 border-t border-rule-strong pt-3">
          {level ? <ThreatLevelBadge level={level} label="Region" /> : <span>Level unset — no current entries</span>}
          <span>
            {refs.length} {refs.length === 1 ? "story" : "stories"}
          </span>
          <span>Free window · {FREE_ARCHIVE_DAYS} editions</span>
        </p>
        {level ? <p className="mt-3 max-w-[62ch] text-[13px] leading-relaxed text-paper-faint">{threatLevelBlurb[level]}</p> : null}
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
        <section aria-labelledby="region-context">
          <h2 id="region-context" className="eyebrow border-b border-rule pb-2">
            Standing context
          </h2>
          <Prose paragraphs={profile.context} className="mt-4" />
          <p className="meta-line mt-6">
            {profile.watchpoints.map((watchpoint) => (
              <span key={watchpoint}>{watchpoint}</span>
            ))}
          </p>
        </section>

        <section className="soft-panel p-6" aria-labelledby="region-breakdown">
          <h2 id="region-breakdown" className="eyebrow">
            Category breakdown
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-paper-dim">
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
              <p className="text-[13px] leading-relaxed text-paper-faint">
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
