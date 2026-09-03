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
    <div className="mx-auto w-full max-w-[1000px] px-4 py-14 lg:px-6 lg:py-20">
      <Link href="/threats" className="link-signal type-body">
        ← All threat categories
      </Link>

      <header className="mt-10 border-b border-rule pb-6">
        <h1 className="type-lead">{category}</h1>
        <p className="type-standfirst mt-5 max-w-[60ch]">{profile.definition}</p>
        <p className="type-meta meta-line mt-6">
          {level ? <ThreatLevelBadge level={level} /> : <span>Level unset — no current entries</span>}
          <span>
            {refs.length} {refs.length === 1 ? "story" : "stories"} · free window, {FREE_ARCHIVE_DAYS} editions
          </span>
        </p>
        {level ? <p className="type-body mt-3 max-w-[62ch] text-muted">{threatLevelBlurb[level]}</p> : null}
      </header>

      <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-start">
        <section aria-labelledby="category-scope">
          <h2 id="category-scope" className="type-heading">
            Inclusion criteria
          </h2>

          <h3 className="type-meta mt-6">Filed under {category}</h3>
          <ul className="type-body mt-3 flex flex-col gap-2 text-muted">
            {profile.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="type-meta mt-8">Filed elsewhere, or out of scope</h3>
          <ul className="type-body mt-3 flex flex-col gap-2 text-muted">
            {profile.excludes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="type-meta mt-8">Scope note</h3>
          <p className="type-body mt-3 max-w-[66ch] text-muted">{profile.scopeNote}</p>
        </section>

        <section aria-labelledby="category-regions">
          <h2 id="category-regions" className="type-heading">
            Regional spread
          </h2>
          <p className="type-body mt-3 text-muted">Where the current entries in this category are filed geographically.</p>
          <div className="mt-5">
            {breakdown.length > 0 ? (
              <CountBreakdown
                items={breakdown}
                label={`${category} stories by region`}
                total={refs.length}
                caption="A story tagged to several regions is counted in each. Entries with no single geographic focus are grouped as global."
              />
            ) : (
              <p className="type-body text-muted">
                Nothing is filed under this category in the current free window, so there is no regional spread to show.
              </p>
            )}
          </div>
        </section>
      </div>

      <section className="mt-20" aria-labelledby="category-feed">
        <h2 id="category-feed" className="type-heading border-b border-rule pb-4">
          {category} entries
        </h2>
        <p className="type-body mt-4 max-w-[62ch] text-muted">
          Newest edition first. Each headline links to the story in the briefing it was published in.
        </p>
        <div className="mt-8">
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
