import type { Briefing } from "@/types/briefing";
import { cyberSection } from "./cyber";
import { pmcSection } from "./pmc";
import { defenseSection } from "./defense";

export const briefing20260903: Briefing = {
  date: "2026-09-03",
  slug: "2026-09-03",
  title: "Security Briefing — September 3, 2026",
  globalThreatLevel: "Critical",
  topLine: [
    "The most consequential story across all three domains today is the convergence of AI and autonomy in lethal targeting: multiple outlets report Russia has fielded fully autonomous, Nvidia-chip-powered attack drones in Ukraine that select and engage targets — including civilians — without real-time human control, one of the first operationally confirmed crossings of the lethal-autonomy \u201cred line\u201d long debated in arms-control circles, even as the Pentagon separately weighs an expanded (but human-supervised) AI role in its own target-generation process.",
    "On the cyber side, CISA added seven actively exploited vulnerabilities to its KEV catalog in 48 hours — including two SonicWall SMA1000 zero-days (one CVSS 10.0) already hitting 400+ exposed appliances, and a JFrog Artifactory admin-bypass flaw weaponized within days of patching — underscoring how fast the exploitation window is compressing for internet-facing infrastructure and AI/DevOps tooling alike.",
    "In the private-security market, GardaWorld's continued build-out as the primary contractor for U.S. immigration-detention infrastructure (now three major ICE facility conversions and growing) is cementing a structural shift of the PMC industry's center of gravity from overseas combat support toward domestic paramilitary-adjacent enforcement work, a trend with long-tail legal and reputational risk that investors and regulators are only beginning to price in.",
  ],
  sections: [cyberSection, pmcSection, defenseSection],
  verificationNote:
    "This briefing was compiled via automated web research across open-source reporting. Verify time-sensitive claims (CVSS scores, contract values, casualty figures) against primary sources before acting.",
};
