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
        className="type-body sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:border focus:border-signal focus:bg-surface focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>

      <div className="relative mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-4 lg:px-6">
        <Link href="/" className="type-heading min-w-0 truncate">
          Global Conflict Watch
        </Link>
        <div className="ml-auto flex shrink-0 items-center gap-3 lg:gap-5">
          <SiteNav />
          <ThreatLevelBadge level={globalThreatLevel} label="Global" className="type-meta" />
        </div>
      </div>

      <div className="dateline-strip">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-4 px-4 py-2 lg:px-6">
          <p className="type-meta">
            {edition ? <span>Edition No.&nbsp;{edition} · </span> : null}
            <time dateTime={latestBriefing.date}>
              {formatBriefingWeekday(latestBriefing.date)} {formatBriefingDate(latestBriefing.date)}
            </time>
            {" · "}
            {latestBriefing.isSample ? "Illustrative sample edition" : "Compiled 06:00 UTC"}
          </p>
        </div>
      </div>
    </header>
  );
}
