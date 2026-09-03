import Link from "next/link";

interface PremiumGateProps {
  title: string;
  dateLabel: string;
  /** Non-interactive teaser copy, rendered blurred behind the scrim. */
  teaser: string[];
  storyCount?: number;
  /** Compact variant for archive rows; the full variant is used on the reader page. */
  compact?: boolean;
}

/**
 * Locked presentation for editions outside the free window. This is an interface
 * demonstration only — no payment processing exists behind the upgrade link.
 */
export function PremiumGate({ title, dateLabel, teaser, storyCount, compact = false }: PremiumGateProps) {
  return (
    <section className={`premium-teaser ${compact ? "p-5" : "p-6 sm:p-8"}`} aria-label={`${title} — subscriber archive`}>
      <div className="premium-veil" aria-hidden="true">
        <p className="type-meta">{dateLabel}</p>
        <h3 className="type-standfirst is-heading mt-2">{title}</h3>
        <div className="prose-editorial is-tight mt-3">
          {teaser.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="premium-scrim absolute inset-0 flex flex-col justify-end gap-3 p-5 sm:p-7">
        <p className="type-meta text-signal">Subscriber archive</p>
        <div>
          <h3 className="type-standfirst is-heading">{title}</h3>
          <p className="type-meta meta-line mt-2">
            <span>{dateLabel}</span>
            {typeof storyCount === "number" ? (
              <span>
                {storyCount} {storyCount === 1 ? "story" : "stories"}
              </span>
            ) : null}
          </p>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <Link href="/pricing" className="link-signal type-body">
            Subscription options →
          </Link>
          <span className="type-meta">Interface demo — no payments</span>
        </div>
      </div>
    </section>
  );
}
