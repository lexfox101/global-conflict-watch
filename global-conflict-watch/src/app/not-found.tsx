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
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 text-balance text-[30px] font-semibold leading-[1.12] tracking-[-0.03em] text-slate-50 sm:text-[38px]">
        That page is not here
      </h1>
      <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-slate-400">
        The address you followed does not match anything on Global Conflict Watch. Briefing pages are addressed by calendar date, so a
        mistyped or future date will land here — as will a region or category name outside the tracked set.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href={`/briefings/${latestBriefing.slug}`}
          className="rounded-none border border-cyan-300/25 bg-cyan-400/10 px-5 py-2.5 text-[14px] font-semibold text-cyan-100 transition-colors hover:bg-cyan-400/15"
        >
          Latest briefing · {formatBriefingDate(latestBriefing.date)}
        </Link>
        <Link
          href="/"
          className="rounded-none border border-white/10 px-5 py-2.5 text-[14px] text-slate-300 transition-colors hover:bg-white/5 hover:text-slate-100"
        >
          Back to the homepage
        </Link>
      </div>

      <nav className="mt-12" aria-label="Suggested pages">
        <h2 className="eyebrow">Try one of these</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HELPFUL_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="soft-panel soft-panel-hover block h-full p-5">
                <span className="block text-[15px] font-semibold text-slate-100">{link.label}</span>
                <span className="mt-1.5 block text-[13px] leading-relaxed text-slate-400">{link.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
