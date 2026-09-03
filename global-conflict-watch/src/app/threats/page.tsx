import type { Metadata } from "next";
import Link from "next/link";
import { FREE_ARCHIVE_DAYS, deriveCategoryThreatLevel, getStoriesByCategory } from "@/data/briefings";
import { CATEGORY_PROFILE_LIST } from "@/data/threat-categories";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ThreatLevelBadge } from "@/components/site/ThreatLevelBadge";

export const metadata: Metadata = {
  title: "Threat categories",
  description:
    "The six categories Global Conflict Watch files every briefing story under, what each one includes, and the current entries in each.",
};

export default function ThreatsIndexPage() {
  const categories = CATEGORY_PROFILE_LIST.map((profile) => ({
    ...profile,
    level: deriveCategoryThreatLevel(profile.category),
    storyCount: getStoriesByCategory(profile.category).length,
  }));

  return (
    <div className="mx-auto w-full max-w-[1000px] px-4 py-10 lg:px-6 lg:py-14">
      <SectionHeading
        eyebrow="Threat categories"
        title="Six categories, defined"
        as="h1"
        description="Every story in a briefing is filed under exactly one category. The definitions below state what GCW includes in each, so that an empty category can be read as out of scope or a quiet cycle rather than a gap left unexplained."
      />

      <div className="soft-panel mt-8 p-5 sm:p-6">
        <h2 className="eyebrow">Reading the counts</h2>
        <p className="mt-3 max-w-[70ch] text-[14px] leading-relaxed text-muted">
          Counts and levels below cover the {FREE_ARCHIVE_DAYS} editions inside the free window. A category level is the highest
          story-level threat currently filed under it; where nothing is filed, the level is shown as unset rather than defaulted to
          Low. GCW publishes across all six categories, but a single daily cycle rarely touches every one.
        </p>
      </div>

      <ul className="ruled-list mt-10">
        {categories.map(({ category, slug, definition, includes, level, storyCount }) => (
          <li key={slug}>
            <article>
              <h2 className="headline-story">
                <Link href={`/threats/${slug}`} className="hover:text-signal">
                  {category}
                </Link>
              </h2>
              <p className="standfirst-sm mt-3 max-w-[64ch]">{definition}</p>
              <p className="meta-line mt-4">
                {level ? <ThreatLevelBadge level={level} /> : <span>Level unset</span>}
                <span>
                  {storyCount} {storyCount === 1 ? "story" : "stories"}
                </span>
              </p>
              <ul className="mt-4 flex flex-col gap-1.5 text-[14px] leading-relaxed text-faint">
                {includes.slice(0, 3).map((item) => (
                  <li key={`${slug}-${item}`} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[10px] h-px w-2.5 shrink-0 bg-rule-strong" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
