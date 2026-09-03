"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ThreatLevel } from "@/types/briefing";
import { ThreatLevelBadge } from "./ThreatLevelBadge";
import { PRIMARY_NAV, isActiveRoute } from "./nav";

const MENU_ID = "site-mobile-nav";

export function SiteNav({ threatLevel }: { threatLevel: ThreatLevel }) {
  const pathname = usePathname();
  const [openedAt, setOpenedAt] = useState<string>();
  const open = openedAt === pathname;

  return (
    <>
      <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
        {PRIMARY_NAV.map((item) => {
          const active = isActiveRoute(pathname, item.href);
          return (
            <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`site-nav-link ${active ? "is-active" : ""}`}>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => setOpenedAt(open ? undefined : pathname)}
        aria-expanded={open}
        aria-controls={MENU_ID}
        className="ml-auto shrink-0 border border-rule px-3 py-2 font-mono text-[11px] uppercase tracking-[0.11em] text-muted transition-colors hover:text-ink lg:hidden"
      >
        {open ? "Close" : "Menu"}
        <span className="sr-only"> navigation</span>
      </button>

      <div
        id={MENU_ID}
        hidden={!open}
        className="absolute left-0 right-0 top-full border-b border-rule-strong bg-surface px-4 pb-4 pt-2 lg:hidden"
      >
        <nav aria-label="Primary, mobile">
          <ul className="flex flex-col">
            {PRIMARY_NAV.map((item) => {
              const active = isActiveRoute(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-rule last:border-b-0">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`site-nav-link block px-1 py-2.5 text-[15px] ${active ? "is-active" : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-3 border-t border-rule pt-3 sm:hidden">
          <ThreatLevelBadge level={threatLevel} label="Global" variant="pill" />
        </div>
      </div>
    </>
  );
}
