import type { Metadata } from "next";
import Link from "next/link";
import { FREE_ARCHIVE_DAYS, allBriefings, isBriefingFree } from "@/data/briefings";
import { briefingStoryCount, type Briefing } from "@/types/briefing";
import { PremiumGate } from "@/components/site/PremiumGate";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ThreatLevelBadge } from "@/components/site/ThreatLevelBadge";
import { formatBriefingDate } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Briefing archive",
  description:
    "Every Global Conflict Watch daily intelligence briefing, newest first. The seven most recent editions are free to read.",
};

const monthLabel = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

function groupByMonth(briefings: Briefing[]) {
  const groups: { key: string; label: string; items: Briefing[] }[] = [];
  for (const briefing of briefings) {
    const key = briefing.date.slice(0, 7);
    const last = groups.at(-1);
    if (last?.key === key) {
      last.items.push(briefing);
      continue;
    }
    groups.push({ key, label: monthLabel.format(new Date(`${briefing.date}T00:00:00Z`)), items: [briefing] });
  }
  return groups;
}

function BriefingRow({ briefing }: { briefing: Briefing }) {
  const storyCount = briefingStoryCount(briefing);

  return (
    <article>
      <h3 className="type-standfirst is-heading">
        <Link href={`/briefings/${briefing.slug}`} className="hover:text-signal">
          {briefing.title}
        </Link>
      </h3>
      <p className="type-body mt-2 max-w-[66ch] text-muted">{briefing.topLine[0]}</p>
      <p className="type-meta meta-line mt-3">
        <ThreatLevelBadge level={briefing.globalThreatLevel} variant="dot" />
        <time dateTime={briefing.date}>{formatBriefingDate(briefing.date)}</time>
        <span>
          {storyCount} {storyCount === 1 ? "story" : "stories"}
        </span>
      </p>
      {briefing.isSample ? <p className="type-meta mt-2 text-flag">Illustrative sample</p> : null}
    </article>
  );
}

export default function BriefingArchivePage() {
  const groups = groupByMonth(allBriefings);
  const lockedCount = allBriefings.filter((briefing) => !isBriefingFree(briefing)).length;
  const accessSummary =
    lockedCount === 0
      ? `All ${allBriefings.length} editions currently published sit inside the free window, so nothing is locked yet — the oldest edition moves behind the gate as soon as another is published.`
      : `Of the ${allBriefings.length} editions currently published, ${allBriefings.length - lockedCount} sit inside the free window and ${lockedCount} have moved into the subscriber archive.`;

  return (
    <div className="mx-auto w-full max-w-[900px] px-4 py-14 lg:px-6 lg:py-20">
      <SectionHeading
        title="Daily intelligence briefings"
        as="h1"
        description="Every edition, newest first. Each briefing covers cyber threats, the private-security market, and defence-industry technology, with a threat level and confidence rating on every story."
      />

      <p className="type-body mt-8 max-w-[70ch] text-muted">
        The {FREE_ARCHIVE_DAYS} most recent editions are free to read in full. Older editions move into the subscriber archive and
        appear here as a locked teaser. {accessSummary} Subscription and payment handling are not implemented: the upgrade links are
        interface demonstrations only. Editions marked <span className="text-flag">Illustrative sample</span> are placeholder content
        written to demonstrate the format; they are not derived from real reporting and carry no sources.
      </p>

      {groups.map((group) => (
        <section key={group.key} className="mt-20" aria-labelledby={`month-${group.key}`}>
          <h2 id={`month-${group.key}`} className="type-heading border-b border-rule pb-4">
            {group.label}
          </h2>
          <ul className="ruled-list mt-8">
            {group.items.map((briefing) => (
              <li key={briefing.slug}>
                {isBriefingFree(briefing) ? (
                  <BriefingRow briefing={briefing} />
                ) : (
                  <PremiumGate
                    title={briefing.title}
                    dateLabel={formatBriefingDate(briefing.date)}
                    storyCount={briefingStoryCount(briefing)}
                    teaser={briefing.topLine.slice(0, 1)}
                    compact
                  />
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
