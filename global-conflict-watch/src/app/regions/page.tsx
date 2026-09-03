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
    <div className="mx-auto w-full max-w-[1000px] px-4 py-10 lg:px-6 lg:py-14">
      <SectionHeading
        eyebrow="Regions"
        title="Five tracked regions"
        as="h1"
        description="Every briefing story is tagged to one or more regions, or left global where it has no single geographic focus. Each region page carries standing context and the current feed of entries filed to it."
      />

      <div className="soft-panel mt-8 p-5 sm:p-6">
        <h2 className="eyebrow">How the region level is worked out</h2>
        <p className="mt-3 max-w-[70ch] text-[14px] leading-relaxed text-paper-dim">
          A region&apos;s level is the highest story-level threat currently filed to it across the {FREE_ARCHIVE_DAYS} editions inside
          the free window. It is a summary of what is on the page, not a forecast, and it moves as editions roll out of the window.
          Where a region has no current entries, the level is shown as unset rather than defaulted to Low.
        </p>
      </div>

      <ul className="ruled-list mt-10">
        {regions.map(({ key, region, summary, watchpoints, level, storyCount }) => (
          <li key={key}>
            <article>
              <h2 className="headline-story">
                <Link href={`/regions/${key}`} className="hover:text-signal">
                  {region.name}
                </Link>
              </h2>
              <p className="standfirst-sm mt-3 max-w-[64ch]">{summary}</p>
              <p className="meta-line mt-4">
                {level ? <ThreatLevelBadge level={level} label="Region" /> : <span>Level unset</span>}
                <span>
                  {storyCount} {storyCount === 1 ? "story" : "stories"}
                </span>
                {watchpoints.map((watchpoint) => (
                  <span key={`${key}-${watchpoint}`}>{watchpoint}</span>
                ))}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
