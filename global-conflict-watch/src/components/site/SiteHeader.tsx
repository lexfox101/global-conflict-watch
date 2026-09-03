import Link from "next/link";
import { briefingEditionNumber, globalThreatLevel, latestBriefing } from "@/data/briefings";
import { SiteNav } from "./SiteNav";
import { ThreatLevelBadge } from "./ThreatLevelBadge";
import { formatBriefingDate, formatBriefingWeekday } from "./ui";

export function SiteHeader() {
  const edition = briefingEditionNumber(latestBriefing.slug);

  return (
    <header className="site-header">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:border focus:border-signal focus:bg-ink focus:px-4 focus:py-2 focus:text-[13px] focus:text-paper"
      >
        Skip to content
      </a>

      <div className="relative mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 lg:px-6">
        <Link href="/" className="min-w-0">
          <span className="masthead-name block truncate">Global Conflict Watch</span>
          <span className="dateline mt-1 hidden text-[10px] sm:block">Open-source intelligence briefings</span>
        </Link>
        <SiteNav threatLevel={globalThreatLevel} />
      </div>

      <div className="dateline-strip">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-4 gap-y-1 px-4 py-1.5 lg:px-6">
          <p className="dateline">
            {edition ? <span>Edition No.&nbsp;{edition} · </span> : null}
            <time dateTime={latestBriefing.date}>
              {formatBriefingWeekday(latestBriefing.date)} {formatBriefingDate(latestBriefing.date)}
            </time>
          </p>
          <p className="dateline">{latestBriefing.isSample ? "Illustrative sample edition" : "Compiled 06:00 UTC"}</p>
          <div className="ml-auto hidden sm:block">
            <ThreatLevelBadge level={globalThreatLevel} label="Global" />
          </div>
        </div>
      </div>
    </header>
  );
}
