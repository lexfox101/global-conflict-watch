import Link from "next/link";
import { globalThreatLevel } from "@/data/briefings";
import { SiteNav } from "./SiteNav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-none focus:border focus:border-cyan-300/30 focus:bg-[rgb(5_12_21/0.98)] focus:px-4 focus:py-2 focus:text-[13px] focus:text-cyan-100"
      >
        Skip to content
      </a>
      <div className="relative mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 lg:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="brand-mark" aria-hidden="true">
            <span>G</span>
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-semibold tracking-[-0.01em] text-slate-50">Global Conflict Watch</span>
            <span className="mt-0.5 hidden text-[11px] text-slate-500 sm:block">Open-source intelligence briefings</span>
          </span>
        </Link>
        <SiteNav threatLevel={globalThreatLevel} />
      </div>
    </header>
  );
}
