import Link from "next/link";
import { latestBriefing, topThreats } from "@/data/briefings";
import { NewsletterSignup } from "@/components/site/NewsletterSignup";
import { StoryCard } from "@/components/site/StoryCard";
import { ThreatLevelBadge } from "@/components/site/ThreatLevelBadge";
import { formatBriefingDate } from "@/components/site/ui";

export default function HomePage() {
  const [lead, ...rest] = topThreats(4);

  return (
    <div className="mx-auto w-full max-w-[900px] px-4 py-14 lg:px-6 lg:py-20">
      <section aria-labelledby="lead-story">
        <h1 id="lead-story" className="type-lead">
          {lead.headline}
        </h1>
        <p className="type-standfirst mt-6 max-w-[46ch]">{lead.dek}</p>
        <p className="type-meta meta-line mt-6">
          <ThreatLevelBadge level={lead.threatLevel} variant="dot" />
          <span>{lead.category}</span>
          <time dateTime={latestBriefing.date}>{formatBriefingDate(latestBriefing.date)}</time>
        </p>
        {latestBriefing.isSample ? <p className="type-meta mt-2 text-flag">Illustrative sample edition</p> : null}

        <div className="prose-editorial mt-8">
          <p>{lead.body[0]}</p>
        </div>

        <Link href={`/briefings/${latestBriefing.slug}`} className="btn btn-primary mt-8">
          Read the briefing
        </Link>
      </section>

      <section className="mt-24" aria-labelledby="other-threats">
        <h2 id="other-threats" className="type-heading border-b border-rule pb-4">
          Today&apos;s other threats
        </h2>
        <ul className="ruled-list mt-8">
          {rest.map((story) => (
            <li key={story.id}>
              <StoryCard story={story} briefingSlug={latestBriefing.slug} isSample={latestBriefing.isSample} />
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-24">
        <NewsletterSignup />
      </div>
    </div>
  );
}
