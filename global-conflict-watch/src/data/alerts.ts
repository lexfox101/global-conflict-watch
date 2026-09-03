import type { BreakingAlert } from "@/types/briefing";

// Ticker items for the 3 September 2026 edition. Each links to the story it summarises.
export const breakingAlerts: BreakingAlert[] = [
  {
    id: "alert-autonomous-drones",
    headline: "Russia reportedly fields fully autonomous AI-targeting attack drones in Ukraine",
    level: "Critical",
    timestamp: "2026-09-03T06:40:00Z",
    href: "/briefings/2026-09-03#russia-autonomous-attack-drones",
  },
  {
    id: "alert-cisa-kev",
    headline: "CISA adds seven actively exploited vulnerabilities to KEV in a single sweep",
    level: "High",
    timestamp: "2026-09-03T05:15:00Z",
    href: "/briefings/2026-09-03#cisa-kev-seven-flaws",
  },
  {
    id: "alert-sonicwall",
    headline: "SonicWall SMA1000 zero-days exploited; 400+ appliances exposed online",
    level: "Critical",
    timestamp: "2026-09-02T21:05:00Z",
    href: "/briefings/2026-09-03#sonicwall-sma1000-zero-days",
  },
  {
    id: "alert-sudan-mercenaries",
    headline: "HRW documents UAE-linked pipeline moving Colombian contractors to Sudan's RSF",
    level: "High",
    timestamp: "2026-09-02T14:30:00Z",
    href: "/briefings/2026-09-03#hrw-colombian-mercenaries-sudan",
  },
];
