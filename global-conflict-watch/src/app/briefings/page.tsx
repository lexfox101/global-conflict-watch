import type { Metadata } from "next";
import Link from "next/link";
import { FREE_ARCHIVE_DAYS, allBriefings, briefingEditionNumber, isBriefingFree } from "@/data/briefings";
import { briefingCategories, briefingStoryCount, type Briefing } from "@/types/briefing";
import { PremiumGate } from "@/components/site/PremiumGate";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ThreatLevelBadge } from "@/components/site/ThreatLevelBadge";
import { formatBriefingDate, formatBriefingWeekday } from "@/components/site/ui";

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
  const categories = briefingCategories(briefing);
  const edition = briefingEditionNumber(briefing.slug);

  return (
    <article>
      <p className="dateline">
        {edition ? `No. ${edition} · ` : ""}
        <time dateTime={briefing.date}>
          {formatBriefingWeekday(briefing.date)} {formatBriefingDate(briefing.date)}
        </time>
      </p>
      <h3 className="headline-story mt-2">
        <Link href={`/briefings/${briefing.slug}`} className="hover:text-signal">
          {briefing.title}
        </Link>
      </h3>
      <p className="standfirst-sm mt-3 max-w-[66ch]">{briefing.topLine[0]}</p>
      <p className="meta-line mt-4">
        <ThreatLevelBadge level={briefing.globalThreatLevel} label="Global" />
        <span>
          {storyCount} {storyCount === 1 ? "story" : "stories"}
        </span>
        {categories.map((category) => (
          <span key={category}>{category}</span>
        ))}
        {briefing.isSample ? <span className="text-flag">Illustrative sample</span> : null}
      </p>
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
    <div className="mx-auto w-full max-w-[1000px] px-4 py-10 lg:px-6 lg:py-14">
      <SectionHeading
        eyebrow="Archive"
        title="Daily intelligence briefings"
        as="h1"
        description="Every edition, newest first. Each briefing covers cyber threats, the private-security market, and defence-industry technology, with a threat level and confidence rating on every story."
      />

      <div className="soft-panel mt-8 p-5 sm:p-6">
        <h2 className="eyebrow">Free and subscriber access</h2>
        <p className="mt-3 max-w-[70ch] text-[14px] leading-relaxed text-muted">
          The {FREE_ARCHIVE_DAYS} most recent editions are free to read in full. Older editions move into the subscriber archive and
          appear here as a locked teaser. {accessSummary} Subscription and payment handling are not implemented: the upgrade links
          are interface demonstrations only.
        </p>
        <p className="mt-3 max-w-[70ch] text-[13px] leading-relaxed text-faint">
          Editions marked <span className="text-flag">Illustrative sample</span> are placeholder content written to demonstrate the
          format. They are not derived from real reporting and carry no sources.
        </p>
      </div>

      {groups.map((group) => (
        <section key={group.key} className="mt-12" aria-labelledby={`month-${group.key}`}>
          <h2 id={`month-${group.key}`} className="eyebrow border-b border-rule pb-2">
            {group.label}
          </h2>
          <ul className="ruled-list mt-6">
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
