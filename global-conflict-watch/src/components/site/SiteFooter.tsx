import Link from "next/link";
import { FOOTER_NAV } from "./nav";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="mx-auto max-w-[1400px] px-4 py-10 lg:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="masthead-name">Global Conflict Watch</p>
            <hr className="rule-masthead mt-2 w-16" />
            <p className="mt-3 max-w-[38ch] text-[13px] leading-relaxed text-paper-faint">
              A daily open-source intelligence briefing on cyber threats, the private-security market, and defence-industry technology.
            </p>
          </div>

          {FOOTER_NAV.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="eyebrow">{column.title}</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {column.items.map((item) => (
                  <li key={`${column.title}-${item.href}`}>
                    <Link href={item.href} className="text-[13px]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <hr className="rule-soft my-8" />

        <div className="flex flex-col gap-4 text-[12px] leading-relaxed text-paper-faint lg:flex-row lg:gap-10">
          <p className="max-w-[62ch]">
            <strong className="font-medium text-paper-dim">Methodology and verification.</strong> Briefings are compiled from
            open-source reporting. Every story carries a confidence rating and links to the publications it draws on. Claims made by
            an involved party are labelled as claimed or unverified and are not presented as established fact. Verify time-sensitive
            details against primary sources before acting on them.
          </p>
          <p className="max-w-[46ch]">
            <strong className="font-medium text-paper-dim">Independence.</strong> Global Conflict Watch is an independent publication.
            It is not affiliated with, endorsed by, or funded by any government, military, intelligence service, or defence
            contractor. The interactive map carries fictional demonstration data only.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.1em] text-paper-faint">
          <span>© {new Date().getUTCFullYear()} Global Conflict Watch</span>
          <Link href="/about">About</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/advertise">Advertise</Link>
          <span>Basemap © OpenStreetMap © CARTO</span>
        </div>
      </div>
    </footer>
  );
}
