import type { Metadata } from "next";
import Link from "next/link";
import { FREE_ARCHIVE_DAYS, allBriefings, isBriefingFree } from "@/data/briefings";
import { briefingCategories, briefingStoryCount, type Briefing } from "@/types/briefing";
import { CategoryPill } from "@/components/site/CategoryPill";
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

  return (
    <article className="soft-panel soft-panel-hover p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <ThreatLevelBadge level={briefing.globalThreatLevel} label="Global" />
        <span className="pill pill-muted">
          {storyCount} {storyCount === 1 ? "story" : "stories"}
        </span>
        {briefing.isSample ? <span className="pill pill-elevated">Illustrative sample</span> : null}
        <span className="pill pill-accent">Free</span>
      </div>

      <p className="eyebrow mt-4">
        <time dateTime={briefing.date}>
          {formatBriefingWeekday(briefing.date)} · {formatBriefingDate(briefing.date)}
        </time>
      </p>
      <h3 className="mt-2 text-balance text-[20px] font-semibold tracking-[-0.02em] text-slate-50">
        <Link href={`/briefings/${briefing.slug}`} className="hover:text-cyan-100">
          {briefing.title}
        </Link>
      </h3>
      <p className="prose-editorial mt-3 text-[15px]">{briefing.topLine[0]}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {categories.map((category) => (
          <CategoryPill key={category} category={category} />
        ))}
      </div>

      <Link href={`/briefings/${briefing.slug}`} className="mt-5 inline-block text-[13px] text-cyan-200 hover:text-cyan-100">
        Read full briefing →
      </Link>
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
    <div className="mx-auto w-full max-w-[1100px] px-4 py-10 lg:px-6 lg:py-14">
      <SectionHeading
        eyebrow="Archive"
        title="Daily intelligence briefings"
        as="h1"
        description="Every edition, newest first. Each briefing covers cyber threats, the private-security market, and defence-industry technology, with a threat level and confidence rating on every story."
      />

      <div className="soft-panel mt-6 p-5 sm:p-6">
        <h2 className="text-[14px] font-semibold text-slate-100">Free and subscriber access</h2>
        <p className="mt-2 max-w-[70ch] text-[13px] leading-relaxed text-slate-400">
          The {FREE_ARCHIVE_DAYS} most recent editions are free to read in full. Older editions move into the subscriber archive and
          appear here as a locked teaser. {accessSummary} Subscription and payment handling are not implemented: the upgrade links
          are interface demonstrations only.
        </p>
        <p className="mt-3 max-w-[70ch] text-[13px] leading-relaxed text-slate-500">
          Editions marked <span className="pill pill-elevated align-middle">Illustrative sample</span> are placeholder content written
          to demonstrate the format. They are not derived from real reporting and carry no sources.
        </p>
      </div>

      {groups.map((group) => (
        <section key={group.key} className="mt-10" aria-labelledby={`month-${group.key}`}>
          <h2 id={`month-${group.key}`} className="eyebrow">
            {group.label}
          </h2>
          <ul className="mt-4 flex flex-col gap-4">
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
