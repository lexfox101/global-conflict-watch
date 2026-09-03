import Link from "next/link";
import { latestBriefing } from "@/data/briefings";
import { formatBriefingDate } from "@/components/site/ui";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-[820px] px-4 py-20 lg:px-6 lg:py-28">
      <h1 className="type-lead">That page is not here</h1>
      <p className="type-standfirst mt-6 max-w-[58ch]">
        The address you followed does not match anything on Global Conflict Watch. Briefing pages are addressed by calendar date, so a
        mistyped or future date will land here — as will a region or category name outside the tracked set.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link href={`/briefings/${latestBriefing.slug}`} className="btn btn-primary">
          Latest briefing · {formatBriefingDate(latestBriefing.date)}
        </Link>
        <Link href="/" className="btn">
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
