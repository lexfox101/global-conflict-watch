import Link from "next/link";
import { globalThreatLevel, latestBriefing, topThreats } from "@/data/briefings";
import { incidents } from "@/data/incidents";
import { THREAT_LEVELS, briefingStories } from "@/types/briefing";
import { ConflictMap } from "@/components/dashboard/ConflictMap";
import { NewsletterSignup } from "@/components/site/NewsletterSignup";
import { StoryCard } from "@/components/site/StoryCard";
import { ThreatLevelBadge } from "@/components/site/ThreatLevelBadge";
import { formatBriefingDate } from "@/components/site/ui";

/** The homepage map is an overview, not the /map tool: a small, fixed set of markers. */
const HOME_MARKER_LIMIT = 12;

export default function HomePage() {
  const [lead, ...rest] = topThreats(5);
  const mapIncidents = incidents.slice(0, HOME_MARKER_LIMIT);
  const stories = briefingStories(latestBriefing);
  const levelCounts = [...THREAT_LEVELS].reverse().map((level) => ({
    level,
    count: stories.filter((story) => story.threatLevel === level).length,
  }));

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-10 lg:px-6 lg:py-14">
      <div className="home-stage">
        <section className="home-lead" aria-labelledby="lead-story">
          <p className="type-meta">Today&apos;s briefing</p>
          <h1 id="lead-story" className="type-heading mt-3">
            <Link href={`/briefings/${latestBriefing.slug}#${lead.id}`} className="hover:text-signal">
              {lead.headline}
            </Link>
          </h1>
          <p className="type-standfirst mt-4">{lead.dek}</p>
          <p className="type-meta meta-line mt-5">
            <ThreatLevelBadge level={lead.threatLevel} variant="dot" />
            <span>{lead.category}</span>
            <time dateTime={latestBriefing.date}>{formatBriefingDate(latestBriefing.date)}</time>
          </p>
          {latestBriefing.isSample ? <p className="type-meta mt-2 text-flag">Illustrative sample edition</p> : null}
        </section>

        <figure className="home-map" aria-labelledby="home-map-caption">
          <ConflictMap incidents={mapIncidents} presentation />
          <figcaption id="home-map-caption" className="home-map-caption">
            <span className="type-meta">
              {mapIncidents.length} incidents plotted · Demonstration data · no live sources
            </span>
            <Link href="/map" className="link-signal type-meta">
              Open the full map →
            </Link>
          </figcaption>
        </figure>

        <section className="home-list" aria-labelledby="more-stories">
          <h2 id="more-stories" className="type-meta border-b border-rule pb-3">
            More in this edition
          </h2>
          <ul className="home-rules">
            {rest.map((story) => (
              <li key={story.id}>
                <StoryCard story={story} briefingSlug={latestBriefing.slug} compact />
              </li>
            ))}
          </ul>
          <p className="mt-4">
            <Link href="/briefings" className="link-signal type-meta">
              All briefings →
            </Link>
          </p>
        </section>

        <section className="home-summary home-panel" aria-labelledby="situation-summary">
          <h2 id="situation-summary" className="type-meta">
            Situation summary
          </h2>

          <p className="type-body mt-5">
            <ThreatLevelBadge level={globalThreatLevel} label="Global threat level" />
          </p>

          <h3 className="type-meta mt-8">Stories by level</h3>
          <dl className="home-count-list mt-3">
            {levelCounts.map(({ level, count }) => (
              <div key={level}>
                <dt className="type-body text-muted">{level}</dt>
                <dd className="type-body font-mono text-ink">{count}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="home-signup">
          <NewsletterSignup />
        </div>
      </div>
    </div>
  );
}
