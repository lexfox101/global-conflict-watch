import type { Metadata } from "next";
import Link from "next/link";
import { FREE_ARCHIVE_DAYS, deriveCategoryThreatLevel, getStoriesByCategory } from "@/data/briefings";
import { CATEGORY_PROFILE_LIST } from "@/data/threat-categories";
import { CategoryPill } from "@/components/site/CategoryPill";
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
    <div className="mx-auto w-full max-w-[1100px] px-4 py-10 lg:px-6 lg:py-14">
      <SectionHeading
        eyebrow="Threat categories"
        title="Six categories, defined"
        as="h1"
        description="Every story in a briefing is filed under exactly one category. The definitions below state what GCW includes in each, so that an empty category can be read as out of scope or a quiet cycle rather than a gap left unexplained."
      />

      <div className="soft-panel mt-6 p-5 sm:p-6">
        <h2 className="text-[14px] font-semibold text-slate-100">Reading the counts</h2>
        <p className="mt-2 max-w-[70ch] text-[13px] leading-relaxed text-slate-400">
          Counts and levels below cover the {FREE_ARCHIVE_DAYS} editions inside the free window. A category level is the highest
          story-level threat currently filed under it; where nothing is filed, the level is shown as unset rather than defaulted to
          Low. GCW publishes across all six categories, but a single daily cycle rarely touches every one.
        </p>
      </div>

      <ul className="mt-8 grid gap-4 lg:grid-cols-2">
        {categories.map(({ category, slug, definition, includes, level, storyCount }) => (
          <li key={slug}>
            <article className="soft-panel soft-panel-hover flex h-full flex-col gap-4 p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <CategoryPill category={category} />
                {level ? (
                  <ThreatLevelBadge level={level} />
                ) : (
                  <span className="pill pill-muted">Level unset</span>
                )}
                <span className="pill pill-muted">
                  {storyCount} {storyCount === 1 ? "story" : "stories"}
                </span>
              </div>

              <div className="min-w-0">
                <h2 className="text-balance text-[20px] font-semibold tracking-[-0.02em] text-slate-50">
                  <Link href={`/threats/${slug}`} className="hover:text-cyan-100">
                    {category}
                  </Link>
                </h2>
                <p className="mt-2 max-w-[54ch] text-[14px] leading-relaxed text-slate-400">{definition}</p>
              </div>

              <div>
                <p className="eyebrow">What GCW includes</p>
                <ul className="mt-2 flex flex-col gap-1.5 text-[13px] leading-relaxed text-slate-400">
                  {includes.slice(0, 3).map((item) => (
                    <li key={`${slug}-${item}`} className="flex gap-2">
                      <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-cyan-300/50" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={`/threats/${slug}`} className="mt-auto text-[13px] text-cyan-200 hover:text-cyan-100">
                Full scope and feed →
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
