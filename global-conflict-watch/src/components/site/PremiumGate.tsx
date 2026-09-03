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
    <section className={`soft-panel premium-teaser ${compact ? "p-5" : "p-6 sm:p-8"}`} aria-label={`${title} — subscriber archive`}>
      <div className="premium-veil" aria-hidden="true">
        <p className="eyebrow">{dateLabel}</p>
        <h3 className="mt-2 text-[19px] font-semibold tracking-[-0.01em] text-slate-100">{title}</h3>
        <div className="prose-editorial mt-3 text-[15px]">
          {teaser.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="premium-scrim absolute inset-0 flex flex-col justify-end gap-3 p-5 sm:p-7">
        <p className="eyebrow">Subscriber archive</p>
        <div>
          <h3 className="text-balance text-[18px] font-semibold tracking-[-0.01em] text-slate-50">{title}</h3>
          <p className="mt-1.5 max-w-[52ch] text-[13px] leading-relaxed text-slate-400">
            {dateLabel}
            {typeof storyCount === "number" ? ` · ${storyCount} ${storyCount === 1 ? "story" : "stories"}` : ""} · outside the free
            seven-day window.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/pricing"
            className="rounded-none border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-[13px] font-semibold text-cyan-100 transition-colors hover:bg-cyan-400/15"
          >
            View subscription options
          </Link>
          <span className="pill pill-muted">Interface demo — no payments</span>
        </div>
      </div>
    </section>
  );
}
