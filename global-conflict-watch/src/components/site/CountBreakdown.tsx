import Link from "next/link";

export interface CountBreakdownItem {
  key: string;
  label: string;
  count: number;
  href?: string;
  /** Accent colour for the decorative bar. */
  accent?: string;
}

interface CountBreakdownProps {
  items: CountBreakdownItem[];
  /** Accessible name for the list. */
  label: string;
  /** Denominator for the share figure; defaults to the sum of the counts. */
  total?: number;
  caption?: string;
}

/**
 * Counted breakdown with a decorative proportional bar. Every value is also
 * present as text, so the bars carry no information of their own.
 */
export function CountBreakdown({ items, label, total, caption }: CountBreakdownProps) {
  const sum = total ?? items.reduce((running, item) => running + item.count, 0);
  const max = items.reduce((highest, item) => Math.max(highest, item.count), 0);

  return (
    <div>
      <ul className="flex flex-col gap-3.5" aria-label={label}>
        {items.map((item) => {
          const share = sum === 0 ? 0 : Math.round((item.count / sum) * 100);
          const width = max === 0 ? 0 : Math.round((item.count / max) * 100);

          return (
            <li key={item.key}>
              <div className="flex items-baseline justify-between gap-4 text-[13px]">
                <span className="min-w-0 truncate text-paper-dim">
                  {item.href ? (
                    <Link href={item.href} className="hover:text-signal">
                      {item.label}
                    </Link>
                  ) : (
                    item.label
                  )}
                </span>
                <span className="shrink-0 font-mono text-[12px] text-paper-faint">
                  {item.count}
                  <span> · {share}%</span>
                </span>
              </div>
              <div aria-hidden="true" className="mt-1.5 h-1.5 overflow-hidden bg-rule">
                <div
                  className="h-full"
                  style={{ width: `${width}%`, backgroundColor: item.accent ?? "var(--paper-faint)" }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      {caption ? <p className="mt-4 max-w-[60ch] text-[12px] leading-relaxed text-paper-faint">{caption}</p> : null}
    </div>
  );
}
