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
      <Link href="/threats" className="link-signal text-[13px]">
        ← All threat categories
      </Link>

      <header className="mt-8">
        <p className="eyebrow">Threat category</p>
        <h1 className="headline-page mt-3">{category}</h1>
        <p className="standfirst mt-4 max-w-[64ch]">{profile.definition}</p>
        <p className="meta-line mt-6 border-t border-rule-strong pt-3">
          {level ? <ThreatLevelBadge level={level} /> : <span>Level unset — no current entries</span>}
          <span>
            {refs.length} {refs.length === 1 ? "story" : "stories"}
          </span>
          <span>Free window · {FREE_ARCHIVE_DAYS} editions</span>
        </p>
        {level ? <p className="mt-3 max-w-[64ch] text-[13px] leading-relaxed text-paper-faint">{threatLevelBlurb[level]}</p> : null}
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
        <section aria-labelledby="category-scope">
          <h2 id="category-scope" className="eyebrow border-b border-rule pb-2">
            Inclusion criteria
          </h2>
          <div className="mt-5 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="headline-item">Filed under {category}</h3>
              <ul className="mt-3 flex flex-col gap-2 text-[14px] leading-relaxed text-paper-dim">
                {profile.includes.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[10px] h-px w-2.5 shrink-0 bg-rule-strong" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="headline-item">Filed elsewhere, or out of scope</h3>
              <ul className="mt-3 flex flex-col gap-2 text-[14px] leading-relaxed text-paper-dim">
                {profile.excludes.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[10px] h-px w-2.5 shrink-0 bg-rule-strong" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="rule-soft my-7" />

          <h3 className="eyebrow">Scope note</h3>
          <p className="mt-2 max-w-[68ch] text-[14px] leading-relaxed text-paper-dim">{profile.scopeNote}</p>
        </section>

        <section className="soft-panel p-6" aria-labelledby="category-regions">
          <h2 id="category-regions" className="eyebrow">
            Regional spread
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-paper-dim">
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
              <p className="text-[13px] leading-relaxed text-paper-faint">
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
