import Link from "next/link";
import { FOOTER_NAV } from "./nav";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-6">
        <p className="type-heading">Global Conflict Watch</p>
        <p className="type-body mt-3 max-w-[52ch] text-muted">
          A daily open-source intelligence briefing on cyber threats, the private-security market, and defence-industry technology.
        </p>

        <div className="mt-10 grid gap-8 border-t border-rule pt-8 sm:grid-cols-3">
          {FOOTER_NAV.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="type-meta">{column.title}</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {column.items.map((item) => (
                  <li key={`${column.title}-${item.href}`}>
                    <Link href={item.href} className="type-body">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-rule pt-8 text-muted lg:flex-row lg:gap-12">
          <p className="type-body max-w-[58ch]">
            <strong className="font-medium text-ink">Methodology and verification.</strong> Briefings are compiled from
            open-source reporting. Every story carries a confidence rating and links to the publications it draws on. Claims made by
            an involved party are labelled as claimed or unverified and are not presented as established fact. Verify time-sensitive
            details against primary sources before acting on them.
          </p>
          <p className="type-body max-w-[46ch]">
            <strong className="font-medium text-ink">Independence.</strong> Global Conflict Watch is an independent publication.
            It is not affiliated with, endorsed by, or funded by any government, military, intelligence service, or defence
            contractor. The interactive map carries fictional demonstration data only.
          </p>
        </div>

        <p className="type-meta mt-10">
          © {new Date().getUTCFullYear()} Global Conflict Watch · Basemap © OpenStreetMap © CARTO
        </p>
      </div>
    </footer>
  );
}
