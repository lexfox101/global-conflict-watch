import Link from "next/link";
import { latestBriefing } from "@/data/briefings";
import { formatBriefingDate } from "@/components/site/ui";

const HELPFUL_LINKS = [
  { href: "/briefings", label: "Briefing archive", blurb: "Every edition published, newest first." },
  { href: "/regions", label: "Regions", blurb: "Standing context and feeds for the five tracked regions." },
  { href: "/threats", label: "Threat categories", blurb: "What each of the six categories covers, and its current entries." },
  { href: "/data", label: "Data & stats", blurb: "Counts derived from the site, reference datasets, and methodology." },
  { href: "/map", label: "Interactive map", blurb: "The demonstration dashboard, with fictional generalised data." },
  { href: "/about", label: "About & standards", blurb: "How briefings are produced, sourced and corrected." },
];

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-[900px] px-4 py-16 lg:px-6 lg:py-24">
      <p className="eyebrow eyebrow-signal">Error 404</p>
      <h1 className="headline-page mt-3">That page is not here</h1>
      <p className="standfirst mt-4 max-w-[60ch]">
        The address you followed does not match anything on Global Conflict Watch. Briefing pages are addressed by calendar date, so a
        mistyped or future date will land here — as will a region or category name outside the tracked set.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href={`/briefings/${latestBriefing.slug}`}
          className="btn btn-primary"
        >
          Latest briefing · {formatBriefingDate(latestBriefing.date)}
        </Link>
        <Link
          href="/"
          className="btn"
        >
          Back to the homepage
        </Link>
      </div>

      <nav className="mt-12" aria-label="Suggested pages">
        <h2 className="eyebrow border-b border-rule pb-2">Try one of these</h2>
        <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
          {HELPFUL_LINKS.map((link) => (
            <li key={link.href} className="border-t border-rule py-4">
              <Link href={link.href} className="group block">
                <span className="headline-item block group-hover:text-signal">{link.label}</span>
                <span className="mt-1.5 block text-[13px] leading-relaxed text-faint">{link.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
