import Link from "next/link";
import { breakingAlerts } from "@/data/alerts";
import {
  FREE_ARCHIVE_DAYS,
  briefingEditionNumber,
  globalThreatLevel,
  latestBriefing,
  topThreats,
} from "@/data/briefings";
import { briefingCategories, briefingStoryCount, regionLabels } from "@/types/briefing";
import { BreakingTicker } from "@/components/site/BreakingTicker";
import { NewsletterSignup } from "@/components/site/NewsletterSignup";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StoryCard } from "@/components/site/StoryCard";
import { ThreatGauge } from "@/components/site/ThreatGauge";
import { ThreatLevelBadge } from "@/components/site/ThreatLevelBadge";
import { formatBriefingDate, formatBriefingWeekday } from "@/components/site/ui";

const SECONDARY_LINKS = [
  { href: "/map", label: "Interactive map", blurb: "Incident and tracking overlays on a global basemap." },
  { href: "/regions", label: "Regions", blurb: "Middle East, Eastern Europe, Asia-Pacific, Africa, Americas." },
  { href: "/threats", label: "Threat categories", blurb: "What each of the six categories covers, and its current entries." },
  { href: "/data", label: "Data & stats", blurb: "Counts derived from published briefings, reference datasets, methodology." },
];

export default function HomePage() {
  const stories = topThreats(4);
  const [lead, ...rest] = stories;
  const storyCount = briefingStoryCount(latestBriefing);
  const categories = briefingCategories(latestBriefing);
  const edition = briefingEditionNumber(latestBriefing.slug);

  return (
    <>
      <BreakingTicker alerts={breakingAlerts} />

      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 lg:px-6 lg:py-12">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12" aria-labelledby="lead-story">
          <article>
            <p className="eyebrow eyebrow-signal">
              Lead · {formatBriefingWeekday(latestBriefing.date)} {formatBriefingDate(latestBriefing.date)}
            </p>
            <h1 id="lead-story" className="headline-lead mt-4">
              <Link href={`/briefings/${latestBriefing.slug}#${lead.id}`} className="hover:text-signal">
                {lead.headline}
              </Link>
            </h1>
            <p className="standfirst mt-5 max-w-[48ch]">{lead.dek}</p>
            <p className="meta-line mt-5">
              <ThreatLevelBadge level={lead.threatLevel} />
              <span>{lead.category}</span>
              <span>{regionLabels(lead.regions).join(", ")}</span>
              <span>{lead.confidence}</span>
              {latestBriefing.isSample ? <span className="text-flag">Illustrative sample</span> : null}
            </p>

            <div className="prose-editorial mt-7">
              <p>{lead.body[0]}</p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={`/briefings/${latestBriefing.slug}`} className="btn btn-primary">
                Read today&apos;s briefing
              </Link>
              <Link href="/briefings" className="btn">
                Browse the archive
              </Link>
            </div>
          </article>

          <aside className="flex flex-col gap-6 lg:border-l lg:border-rule lg:pl-10" aria-label="Today's edition at a glance">
            <ThreatGauge level={globalThreatLevel} />

            <hr className="rule-soft" />

            <div>
              <p className="eyebrow">In this edition</p>
              <p className="dateline mt-2">
                {edition ? `No. ${edition} · ` : ""}
                {formatBriefingDate(latestBriefing.date)}
              </p>
              <h2 className="headline-item mt-2">{latestBriefing.title}</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{latestBriefing.topLine[0]}</p>

              <ul className="mt-5 flex flex-col">
                {latestBriefing.sections.map((section) => (
                  <li key={section.id} className="flex items-baseline justify-between gap-4 border-t border-rule py-2 text-[13px] text-muted">
                    <span>
                      <span className="font-mono text-[12px] text-faint">{section.number}.</span> {section.title}
                    </span>
                    <span className="font-mono text-[12px] text-faint">{section.stories.length}</span>
                  </li>
                ))}
              </ul>

              <p className="meta-line mt-4">
                {categories.map((category) => (
                  <span key={category}>{category}</span>
                ))}
              </p>

              <dl className="mt-5 grid grid-cols-3 border-t border-rule pt-3 text-center">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.11em] text-faint">Stories</dt>
                  <dd className="mt-1 font-mono text-[18px] text-ink">{storyCount}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.11em] text-faint">Sections</dt>
                  <dd className="mt-1 font-mono text-[18px] text-ink">{latestBriefing.sections.length}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.11em] text-faint">Free archive</dt>
                  <dd className="mt-1 font-mono text-[18px] text-ink">{FREE_ARCHIVE_DAYS}d</dd>
                </div>
              </dl>
            </div>

            <hr className="rule-soft" />

            <div>
              <p className="eyebrow">What this is</p>
              <p className="mt-2 text-[13px] leading-relaxed text-faint">
                One briefing a day across cyber threats, the private-security market, and defence-industry technology. Every story
                carries a threat level, a confidence rating, and the publications it draws on. Claims made by an involved party stay
                labelled as claims.
              </p>
            </div>
          </aside>
        </section>

        <hr className="rule-strong mt-12" />

        <section className="mt-8" aria-labelledby="top-threats">
          <SectionHeading
            eyebrow="Also in today's briefing"
            title="The rest of the priority list"
            id="top-threats"
            description="Remaining entries from the current edition, ranked by assessed threat level."
            trailing={
              <Link href={`/briefings/${latestBriefing.slug}`} className="link-signal text-[13px]">
                All {storyCount} stories →
              </Link>
            }
          />
          <ul className="ruled-list mt-6">
            {rest.map((story) => (
              <li key={story.id}>
                <StoryCard story={story} briefingSlug={latestBriefing.slug} isSample={latestBriefing.isSample} />
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-14">
          <NewsletterSignup />
        </div>

        <section className="mt-14" aria-labelledby="explore-more">
          <SectionHeading eyebrow="Also on GCW" title="The rest of the site" id="explore-more" as="h2" />
          <ul className="mt-6 grid sm:grid-cols-2 sm:gap-x-10">
            {SECONDARY_LINKS.map((link) => (
              <li key={link.href} className="border-t border-rule py-4">
                <Link href={link.href} className="group block">
                  <p className="headline-item group-hover:text-signal">{link.label}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-faint">{link.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
