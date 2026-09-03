import type { Metadata } from "next";
import Link from "next/link";
import {
  FREE_ARCHIVE_DAYS,
  allBriefings,
  allStoryRefs,
  countStoriesByCategory,
  countStoriesByConfidence,
  countStoriesByRegion,
  isBriefingFree,
  latestBriefing,
} from "@/data/briefings";
import { CATEGORY_SLUGS } from "@/data/threat-categories";
import {
  CONFIDENCE_LEVELS,
  REGIONS,
  REGION_KEYS,
  THREAT_CATEGORIES,
  threatLevelRank,
} from "@/types/briefing";
import { CountBreakdown } from "@/components/site/CountBreakdown";
import { Prose } from "@/components/site/Prose";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StatCard } from "@/components/site/StatCard";
import { categoryAccent, formatBriefingDate } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Data & stats",
  description:
    "What Global Conflict Watch has published, counted from the site's own content — plus the external reference datasets GCW points readers to, and the methodology behind every entry.",
};

const EXTERNAL_DATASETS = [
  {
    name: "ACLED",
    url: "https://acleddata.com/",
    description: "Coded records of political violence and protest events, with date, location and actor fields.",
    useFor: "Good for event-level baselines and trend comparison across a country or region over time.",
  },
  {
    name: "SIPRI",
    url: "https://www.sipri.org/",
    description: "Research institute publishing databases on military expenditure, arms transfers and arms production.",
    useFor: "Good for checking procurement and expenditure context behind a defence-industry story.",
  },
  {
    name: "UCDP",
    url: "https://ucdp.uu.se/",
    description: "Uppsala Conflict Data Program: long-running academic datasets on organised violence and conflict dyads.",
    useFor: "Good for conflict definitions, actor histories and consistent long-run series.",
  },
  {
    name: "GDELT",
    url: "https://www.gdeltproject.org/",
    description: "Machine-coded index of global news coverage, including event, tone and network extractions.",
    useFor: "Good for gauging how widely a development is being reported, with the caveat that coding is automated.",
  },
  {
    name: "ReliefWeb",
    url: "https://reliefweb.int/",
    description: "UN OCHA service aggregating humanitarian situation reports, appeals and assessments.",
    useFor: "Good for humanitarian access and response context around a disaster or conflict entry.",
  },
  {
    name: "CISA KEV",
    url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
    description: "US authority catalogue of vulnerabilities with confirmed exploitation in the wild.",
    useFor: "Good for confirming whether a vulnerability is exploited rather than merely disclosed.",
  },
  {
    name: "GDACS",
    url: "https://www.gdacs.org/",
    description: "Global Disaster Alert and Coordination System: automated alerts and impact estimates for hazard events.",
    useFor: "Good for early alert levels on earthquakes, floods and storms, and for locating the issuing authority.",
  },
];

const METHODOLOGY = {
  sourcing: [
    "Briefings are compiled from open-source reporting: publications, vendor and national-authority advisories, court and regulatory filings, and the published output of research organisations and human-rights investigators. No paid intelligence feeds, no private informants, and no API integrations sit behind them.",
    "Source links point to publication homepages rather than individual articles, because article URLs decay and homepages do not. Where an entry rests on a single outlet, that is stated on the story rather than left for the reader to infer.",
  ],
  corroboration: [
    "Every story carries one of four confidence ratings. Confirmed means the responsible organisation or an official advisory has said so directly. Corroborated means two or more outlets reported it independently. Single source means one outlet only, with no independent corroboration found. Claimed/unverified means an involved party has asserted it and nobody independent has confirmed it.",
    "The distinction between confirmed and claimed is the one that matters most. An extortion group's record count, a ministry's casualty figure, and a manufacturer's performance claim are all claims by an interested party; they are labelled as such and are never restated as established fact, however widely they circulate.",
  ],
  corrections: [
    "Errors are corrected in place, and the correction is described rather than silently applied. Where a later development overturns an earlier entry, the newer edition says so and points back to the entry it supersedes rather than deleting it.",
    "Corrections and complaints can be raised through the contact routes on the About page. A correction request that identifies a specific claim and a primary source will always be acted on faster than a general objection.",
  ],
};

export default function DataPage() {
  const refs = allStoryRefs();
  const freeRefs = refs.filter((ref) => isBriefingFree(ref.briefing));
  const categoryCounts = countStoriesByCategory(refs);
  const confidenceCounts = countStoriesByConfidence(refs);
  const { regions: regionCounts, global: globalCount } = countStoriesByRegion(refs);

  const activeSituations = freeRefs.filter((ref) => threatLevelRank(ref.story.threatLevel) >= threatLevelRank("High")).length;
  const regionsRepresented = REGION_KEYS.filter((key) => (regionCounts[key] ?? 0) > 0).length;
  const categoriesInUse = THREAT_CATEGORIES.filter((category) => (categoryCounts[category] ?? 0) > 0).length;
  const sourceLinkCount = refs.reduce((total, ref) => total + ref.story.sources.length, 0);
  const sampleEditions = allBriefings.filter((briefing) => briefing.isSample).length;

  const categoryItems = THREAT_CATEGORIES.map((category) => ({
    key: category,
    label: category,
    count: categoryCounts[category] ?? 0,
    href: `/threats/${CATEGORY_SLUGS[category]}`,
    accent: categoryAccent[category],
  }));

  const confidenceItems = CONFIDENCE_LEVELS.map((confidence) => ({
    key: confidence,
    label: confidence,
    count: confidenceCounts[confidence] ?? 0,
  }));

  const regionItems = [
    ...REGION_KEYS.map((key) => ({
      key,
      label: REGIONS[key].shortName,
      count: regionCounts[key] ?? 0,
      href: `/regions/${key}`,
    })),
    { key: "global", label: "Global (no single region)", count: globalCount },
  ];

  return (
    <div className="mx-auto w-full max-w-[1000px] px-4 py-14 lg:px-6 lg:py-20">
      <SectionHeading
        title="What has actually been published"
        as="h1"
        description="Every counter on this page is computed from the briefings on this site at build time. Nothing here is an estimate, a projection, or a traffic figure — each number states exactly what it counts."
      />

      <section className="mt-16" aria-labelledby="counters">
        <h2 id="counters" className="type-heading border-b border-rule pb-4">
          Site content counters
        </h2>
        <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          <li>
            <StatCard
              value={activeSituations}
              label="Active tracked situations"
              note={`Stories assessed High or Critical across the ${FREE_ARCHIVE_DAYS} editions inside the free window.`}
            />
          </li>
          <li>
            <StatCard
              value={`${regionsRepresented} of ${REGION_KEYS.length}`}
              label="Tracked regions represented"
              note="Regions with at least one story filed to them. GCW records a region on each story, not a country."
            />
          </li>
          <li>
            <StatCard
              value={allBriefings.length}
              label="Editions published"
              note={`Daily briefings on the site, of which ${sampleEditions} are illustrative samples rather than real reporting.`}
            />
          </li>
          <li>
            <StatCard
              value={refs.length}
              label="Stories published"
              note="Individual entries across every edition, counted once each regardless of how many regions they touch."
            />
          </li>
          <li>
            <StatCard
              value={`${categoriesInUse} of ${THREAT_CATEGORIES.length}`}
              label="Threat categories in use"
              note="Categories with at least one published entry. The remainder are in scope but untouched by the cycles published so far."
            />
          </li>
          <li>
            <StatCard
              value={sourceLinkCount}
              label="Source attributions"
              note="Publication links attached across all stories. Illustrative sample editions carry none by design, so this figure comes entirely from the sourced editions."
            />
          </li>
        </ul>
        <p className="type-body mt-8 max-w-[80ch] text-muted">
          Latest edition: {formatBriefingDate(latestBriefing.date)}. Counters cover every edition on the site unless the note says
          otherwise; the free window covers the {FREE_ARCHIVE_DAYS} most recent editions.
        </p>
      </section>

      <section className="mt-20" aria-labelledby="breakdowns">
        <h2 id="breakdowns" className="type-heading border-b border-rule pb-4">
          Breakdown of published stories
        </h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          <div>
            <h3 className="type-meta">By threat category</h3>
            <p className="type-body mt-2 text-muted">
              Each story is filed under exactly one category, so these sum to the total.
            </p>
            <div className="mt-5">
              <CountBreakdown items={categoryItems} label="Stories by threat category" total={refs.length} />
            </div>
          </div>

          <div>
            <h3 className="type-meta">By confidence level</h3>
            <p className="type-body mt-2 text-muted">
              Each story carries exactly one rating. The lower two ratings are not defects — they record what the sourcing supports.
            </p>
            <div className="mt-5">
              <CountBreakdown items={confidenceItems} label="Stories by confidence level" total={refs.length} />
            </div>
          </div>

          <div>
            <h3 className="type-meta">By region</h3>
            <p className="type-body mt-2 text-muted">
              A story tagged to several regions is counted in each, so these sum to more than the total.
            </p>
            <div className="mt-5">
              <CountBreakdown items={regionItems} label="Stories by region" total={refs.length} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20" aria-labelledby="external-datasets">
        <h2 id="external-datasets" className="type-heading border-b border-rule pb-4">
          Where to go for the underlying data
        </h2>
        <p className="type-body mt-4 max-w-[74ch] text-muted">
          GCW does not host, mirror or redistribute any of the datasets below. These are outbound links to the organisations that
          maintain them, offered so readers can check a briefing entry against a primary record. Global Conflict Watch is not
          affiliated with, endorsed by, or funded by any of these organisations. Their names appear here as attribution for a link,
          nothing more. No data is fetched from them, cached, or re-published on this site — each entry below is a pointer, and
          their own terms and licences govern any use you make of them.
        </p>

        <ul className="ruled-list mt-10">
          {EXTERNAL_DATASETS.map((dataset) => (
            <li key={dataset.name}>
              <article>
                <h3 className="type-standfirst is-heading">{dataset.name}</h3>
                <p className="type-body mt-2 max-w-[74ch] text-muted">
                  {dataset.description} {dataset.useFor}
                </p>
                <a
                  href={dataset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-signal type-body mt-2 inline-block"
                >
                  Open {dataset.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                  <span aria-hidden="true"> ↗</span>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section id="methodology" className="mt-20 scroll-mt-24" aria-labelledby="methodology-heading">
        <h2 id="methodology-heading" className="type-heading border-b border-rule pb-4">
          How entries are sourced, rated and corrected
        </h2>

        <div className="mt-8 grid gap-12 lg:grid-cols-3">
          <article>
            <h3 className="type-meta">Sourcing</h3>
            <Prose paragraphs={METHODOLOGY.sourcing} className="is-tight mt-3" />
          </article>
          <article>
            <h3 className="type-meta">Corroboration levels</h3>
            <Prose paragraphs={METHODOLOGY.corroboration} className="is-tight mt-3" />
          </article>
          <article>
            <h3 className="type-meta">Corrections</h3>
            <Prose paragraphs={METHODOLOGY.corrections} className="is-tight mt-3" />
          </article>
        </div>

        <div className="soft-panel panel-note mt-12 p-6" role="note">
          <p className="type-meta text-flag">Standing caveat</p>
          <p className="type-body mt-2 max-w-[78ch] text-ink-body">
            Time-sensitive figures — severity scores, contract values, casualty and displacement counts, alert levels — change after
            publication and are frequently revised. Verify any such figure against the issuing primary source before acting on it. A
            GCW briefing is a starting point for that check, not a substitute for it.
          </p>
          <p className="type-body mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/about" className="link-signal">
              Editorial standards and corrections process →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
