export interface NavItem {
  href: string;
  label: string;
}

export const PRIMARY_NAV: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/briefings", label: "Briefings" },
  { href: "/regions", label: "Regions" },
  { href: "/threats", label: "Threats" },
  { href: "/map", label: "Map" },
  { href: "/data", label: "Data" },
  { href: "/about", label: "About" },
];

export const FOOTER_NAV: { title: string; items: NavItem[] }[] = [
  {
    title: "Briefings",
    items: [
      { href: "/briefings", label: "Briefing archive" },
      { href: "/regions", label: "Regions" },
      { href: "/threats", label: "Threat categories" },
    ],
  },
  {
    title: "Data & tools",
    items: [
      { href: "/map", label: "Live map" },
      { href: "/data", label: "Data & stats" },
      { href: "/data#methodology", label: "Methodology" },
    ],
  },
  {
    title: "Company",
    items: [
      { href: "/about", label: "About GCW" },
      { href: "/about#corrections", label: "Corrections" },
      { href: "/pricing", label: "Pricing" },
      { href: "/advertise", label: "Advertise" },
    ],
  },
];

export function isActiveRoute(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
