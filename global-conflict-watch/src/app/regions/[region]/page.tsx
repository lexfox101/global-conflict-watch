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
    <div className="mx-auto w-full max-w-[1000px] px-4 py-14 lg:px-6 lg:py-20">
      <Link href="/regions" className="link-signal type-body">
        ← All regions
      </Link>

      <header className="mt-10 border-b border-rule pb-6">
        <h1 className="type-lead">{meta.name}</h1>
        <p className="type-standfirst mt-5 max-w-[58ch]">{profile.summary}</p>
        <p className="type-meta meta-line mt-6">
          {level ? <ThreatLevelBadge level={level} label="Region" /> : <span>Level unset — no current entries</span>}
          <span>
            {refs.length} {refs.length === 1 ? "story" : "stories"} · free window, {FREE_ARCHIVE_DAYS} editions
          </span>
        </p>
        {level ? <p className="type-body mt-3 max-w-[62ch] text-muted">{threatLevelBlurb[level]}</p> : null}
      </header>

      <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
        <section aria-labelledby="region-context">
          <h2 id="region-context" className="type-heading">
            Standing context
          </h2>
          <Prose paragraphs={profile.context} className="mt-4" />
          <p className="type-meta meta-line mt-6">
            {profile.watchpoints.map((watchpoint) => (
              <span key={watchpoint}>{watchpoint}</span>
            ))}
          </p>
        </section>

        <section aria-labelledby="region-breakdown">
          <h2 id="region-breakdown" className="type-heading">
            Category breakdown
          </h2>
          <p className="type-body mt-3 text-muted">
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
              <p className="type-body text-muted">
                No entries are filed to this region in the current free window, so there is nothing to break down yet.
              </p>
            )}
          </div>
        </section>
      </div>

      <section className="mt-20" aria-labelledby="region-feed">
        <h2 id="region-feed" className="type-heading border-b border-rule pb-4">
          {meta.shortName} entries
        </h2>
        <p className="type-body mt-4 max-w-[62ch] text-muted">
          Newest edition first. Each headline links to the story in the briefing it was published in.
        </p>
        <div className="mt-8">
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
