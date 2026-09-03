import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FREE_ARCHIVE_DAYS,
  countStoriesByRegion,
  deriveCategoryThreatLevel,
  getStoriesByCategory,
} from "@/data/briefings";
import { CATEGORY_PROFILES, CATEGORY_SLUGS, categoryFromSlug } from "@/data/threat-categories";
import { REGIONS, REGION_KEYS, THREAT_CATEGORIES } from "@/types/briefing";
import { CategoryPill } from "@/components/site/CategoryPill";
import { CountBreakdown } from "@/components/site/CountBreakdown";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StoryFeed } from "@/components/site/StoryFeed";
import { ThreatLevelBadge } from "@/components/site/ThreatLevelBadge";
import { threatLevelBlurb } from "@/components/site/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return THREAT_CATEGORIES.map((category) => ({ category: CATEGORY_SLUGS[category] }));
}

export async function generateMetadata({ params }: PageProps<"/threats/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categoryFromSlug(slug);
  if (!category) return { title: "Threat category not found" };

  return {
    title: category,
    description: CATEGORY_PROFILES[category].definition,
  };
}

export default async function ThreatCategoryPage({ params }: PageProps<"/threats/[category]">) {
  const { category: slug } = await params;
  const category = categoryFromSlug(slug);

  if (!category) {
    notFound();
  }

  const profile = CATEGORY_PROFILES[category];
  const refs = getStoriesByCategory(category);
  const level = deriveCategoryThreatLevel(category);
  const { regions: regionCounts, global: globalCount } = countStoriesByRegion(refs);
  const breakdown = [
    ...REGION_KEYS.filter((key) => (regionCounts[key] ?? 0) > 0).map((key) => ({
      key,
      label: REGIONS[key].shortName,
      count: regionCounts[key],
      href: `/regions/${key}`,
    })),
    ...(globalCount > 0 ? [{ key: "global", label: "Global (no single region)", count: globalCount }] : []),
  ];

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-10 lg:px-6 lg:py-14">
      <Link href="/threats" className="text-[13px] text-cyan-200 hover:text-cyan-100">
        ← All threat categories
      </Link>

      <header className="mt-6">
        <p className="eyebrow">Threat category</p>
        <h1 className="mt-3 text-balance text-[30px] font-semibold leading-[1.12] tracking-[-0.03em] text-slate-50 sm:text-[38px]">
          {category}
        </h1>
        <p className="mt-4 max-w-[64ch] text-[16px] leading-relaxed text-slate-400">{profile.definition}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <CategoryPill category={category} />
          {level ? <ThreatLevelBadge level={level} /> : <span className="pill pill-muted">Level unset — no current entries</span>}
          <span className="pill pill-muted">
            {refs.length} {refs.length === 1 ? "story" : "stories"}
          </span>
          <span className="pill pill-muted">Free window · {FREE_ARCHIVE_DAYS} editions</span>
        </div>
        {level ? <p className="mt-3 max-w-[64ch] text-[13px] leading-relaxed text-slate-500">{threatLevelBlurb[level]}</p> : null}
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
        <section className="soft-panel p-6 sm:p-8" aria-labelledby="category-scope">
          <h2 id="category-scope" className="eyebrow">
            Inclusion criteria
          </h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-[13px] font-semibold text-slate-200">Filed under {category}</h3>
              <ul className="mt-2 flex flex-col gap-2 text-[13px] leading-relaxed text-slate-400">
                {profile.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-cyan-300/50" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[13px] font-semibold text-slate-200">Filed elsewhere, or out of scope</h3>
              <ul className="mt-2 flex flex-col gap-2 text-[13px] leading-relaxed text-slate-400">
                {profile.excludes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-amber-300/45" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="rule-soft my-6" />

          <h3 className="eyebrow">Scope note</h3>
          <p className="mt-2 max-w-[68ch] text-[14px] leading-relaxed text-slate-400">{profile.scopeNote}</p>
        </section>

        <section className="soft-panel p-6" aria-labelledby="category-regions">
          <h2 id="category-regions" className="eyebrow">
            Regional spread
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
            Where the current entries in this category are filed geographically.
          </p>
          <div className="mt-5">
            {breakdown.length > 0 ? (
              <CountBreakdown
                items={breakdown}
                label={`${category} stories by region`}
                total={refs.length}
                caption="A story tagged to several regions is counted in each. Entries with no single geographic focus are grouped as global."
              />
            ) : (
              <p className="text-[13px] leading-relaxed text-slate-500">
                Nothing is filed under this category in the current free window, so there is no regional spread to show.
              </p>
            )}
          </div>
        </section>
      </div>

      <section className="mt-14" aria-labelledby="category-feed">
        <SectionHeading
          eyebrow="Feed"
          title={`${category} entries`}
          id="category-feed"
          description="Newest edition first. Each headline links to the story in the briefing it was published in."
        />
        <div className="mt-6">
          <StoryFeed
            refs={refs}
            label={`${category} stories`}
            emptyTitle="Nothing filed under this category yet"
            emptyBody={`None of the ${FREE_ARCHIVE_DAYS} editions inside the free window carry an entry in this category. The category remains in scope as defined above; subscriber-archive editions are not included in this feed.`}
          />
        </div>
      </section>
    </div>
  );
}
