import type { Metadata } from "next";
import Link from "next/link";
import { FREE_ARCHIVE_DAYS, deriveRegionThreatLevel, getStoriesByRegion } from "@/data/briefings";
import { REGION_PROFILE_LIST } from "@/data/regions";
import { REGIONS } from "@/types/briefing";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ThreatLevelBadge } from "@/components/site/ThreatLevelBadge";

export const metadata: Metadata = {
  title: "Regions",
  description:
    "Standing context and current story feeds for the five regions Global Conflict Watch tracks: the Middle East, Eastern Europe, Asia-Pacific, Africa and the Americas.",
};

export default function RegionsIndexPage() {
  const regions = REGION_PROFILE_LIST.map((profile) => ({
    ...profile,
    region: REGIONS[profile.key],
    level: deriveRegionThreatLevel(profile.key),
    storyCount: getStoriesByRegion(profile.key).length,
  }));

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-10 lg:px-6 lg:py-14">
      <SectionHeading
        eyebrow="Regions"
        title="Five tracked regions"
        as="h1"
        description="Every briefing story is tagged to one or more regions, or left global where it has no single geographic focus. Each region page carries standing context and the current feed of entries filed to it."
      />

      <div className="soft-panel mt-6 p-5 sm:p-6">
        <h2 className="text-[14px] font-semibold text-slate-100">How the region level is worked out</h2>
        <p className="mt-2 max-w-[70ch] text-[13px] leading-relaxed text-slate-400">
          A region&apos;s level is the highest story-level threat currently filed to it across the {FREE_ARCHIVE_DAYS} editions inside
          the free window. It is a summary of what is on the page, not a forecast, and it moves as editions roll out of the window.
          Where a region has no current entries, the level is shown as unset rather than defaulted to Low.
        </p>
      </div>

      <ul className="mt-8 grid gap-4 lg:grid-cols-2">
        {regions.map(({ key, region, summary, watchpoints, level, storyCount }) => (
          <li key={key}>
            <article className="soft-panel soft-panel-hover flex h-full flex-col gap-4 p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                {level ? (
                  <ThreatLevelBadge level={level} label="Region" />
                ) : (
                  <span className="pill pill-muted">Level unset — no current entries</span>
                )}
                <span className="pill pill-muted">
                  {storyCount} {storyCount === 1 ? "story" : "stories"}
                </span>
              </div>

              <div className="min-w-0">
                <h2 className="text-balance text-[20px] font-semibold tracking-[-0.02em] text-slate-50">
                  <Link href={`/regions/${key}`} className="hover:text-cyan-100">
                    {region.name}
                  </Link>
                </h2>
                <p className="mt-2 max-w-[52ch] text-[14px] leading-relaxed text-slate-400">{summary}</p>
              </div>

              <ul className="flex flex-wrap gap-2">
                {watchpoints.map((watchpoint) => (
                  <li key={`${key}-${watchpoint}`} className="pill pill-muted">
                    {watchpoint}
                  </li>
                ))}
              </ul>

              <Link href={`/regions/${key}`} className="mt-auto text-[13px] text-cyan-200 hover:text-cyan-100">
                Open {region.shortName} →
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
