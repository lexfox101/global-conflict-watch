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
      <nav aria-label="Primary" className="ml-auto hidden items-center gap-0.5 lg:flex">
        {PRIMARY_NAV.map((item) => {
          const active = isActiveRoute(pathname, item.href);
          return (
            <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`site-nav-link ${active ? "is-active" : ""}`}>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-3">
        <Link href="/briefings" className="hidden sm:inline-flex" title="Current global threat level, from the latest briefing">
          <ThreatLevelBadge level={threatLevel} label="Global" />
        </Link>

        <button
          type="button"
          onClick={() => setOpenedAt(open ? undefined : pathname)}
          aria-expanded={open}
          aria-controls={MENU_ID}
          className="rounded-none border border-white/10 px-3 py-2 text-[12px] text-slate-300 transition-colors hover:bg-white/5 lg:hidden"
        >
          {open ? "Close" : "Menu"}
          <span className="sr-only"> navigation</span>
        </button>
      </div>

      <div
        id={MENU_ID}
        hidden={!open}
        className="absolute left-0 right-0 top-full border-b border-white/5 bg-[rgb(5_12_21/0.97)] px-4 pb-4 pt-2 shadow-[0_18px_40px_rgb(0_0_0/0.4)] backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Primary, mobile">
          <ul className="flex flex-col">
            {PRIMARY_NAV.map((item) => {
              const active = isActiveRoute(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`site-nav-link block px-3 py-2.5 text-[15px] ${active ? "is-active" : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-3 border-t border-white/5 pt-3 sm:hidden">
          <ThreatLevelBadge level={threatLevel} label="Global" />
        </div>
      </div>
    </>
  );
}
