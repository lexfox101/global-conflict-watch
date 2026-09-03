"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { BreakingAlert } from "@/types/briefing";
import { formatAlertTime, threatPillClass } from "./ui";

function AlertItem({ alert }: { alert: BreakingAlert }) {
  const body = (
    <>
      <span className={`pill ${threatPillClass[alert.level]}`}>{alert.level}</span>
      <span className="text-[13px] text-slate-300">{alert.headline}</span>
      <time dateTime={alert.timestamp} className="font-mono text-[11px] text-slate-500">
        {formatAlertTime(alert.timestamp)}
      </time>
    </>
  );

  return (
    <li className="flex shrink-0 items-center gap-3">
      {alert.href ? (
        <Link href={alert.href} className="flex items-center gap-3 rounded-full hover:text-cyan-100">
          {body}
        </Link>
      ) : (
        body
      )}
    </li>
  );
}

/**
 * Scrolling alert strip. The marquee is presentation only: the same alerts are
 * exposed once as a list to assistive technology, motion stops for anyone with
 * `prefers-reduced-motion`, and the strip can be paused manually or by hover/focus.
 */
export function BreakingTicker({ alerts }: { alerts: BreakingAlert[] }) {
  const [paused, setPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  if (alerts.length === 0) return null;

  const animated = !prefersReducedMotion;

  return (
    <section className="ticker" aria-label="Breaking alerts">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-2 lg:px-6">
        <p className="eyebrow shrink-0 text-red-300/80">Breaking</p>

        <div className="ticker-viewport min-w-0 flex-1">
          <div className={`ticker-track ${paused || !animated ? "is-paused" : ""}`}>
            <ul className="flex shrink-0 items-center gap-8">
              {alerts.map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))}
            </ul>
            {animated ? (
              <ul className="flex shrink-0 items-center gap-8" aria-hidden="true">
                {alerts.map((alert) => (
                  <AlertItem key={`${alert.id}-loop`} alert={alert} />
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        {animated ? (
          <button
            type="button"
            onClick={() => setPaused((current) => !current)}
            aria-pressed={paused}
            className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-[11px] text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200"
          >
            {paused ? "Resume" : "Pause"}
            <span className="sr-only"> scrolling alerts</span>
          </button>
        ) : null}
      </div>
    </section>
  );
}
