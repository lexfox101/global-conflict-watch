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
    <div className="mx-auto w-full max-w-[900px] px-4 py-14 lg:px-6 lg:py-20">
      <SectionHeading
        title="Six categories, defined"
        as="h1"
        description="Every story in a briefing is filed under exactly one category. The definitions below state what GCW includes in each, so that an empty category can be read as out of scope or a quiet cycle rather than a gap left unexplained."
      />

      <p className="type-body mt-8 max-w-[70ch] text-muted">
        Counts and levels below cover the {FREE_ARCHIVE_DAYS} editions inside the free window. A category level is the highest
        story-level threat currently filed under it; where nothing is filed, the level is shown as unset rather than defaulted to
        Low. GCW publishes across all six categories, but a single daily cycle rarely touches every one.
      </p>

      <ul className="ruled-list mt-20">
        {categories.map(({ category, slug, definition, level, storyCount }) => (
          <li key={slug}>
            <article>
              <h2 className="type-standfirst is-heading">
                <Link href={`/threats/${slug}`} className="hover:text-signal">
                  {category}
                </Link>
              </h2>
              <p className="type-body mt-2 max-w-[64ch] text-muted">{definition}</p>
              <p className="type-meta meta-line mt-3">
                {level ? <ThreatLevelBadge level={level} variant="dot" /> : <span>Level unset</span>}
                <span>
                  {storyCount} {storyCount === 1 ? "story" : "stories"}
                </span>
              </p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
