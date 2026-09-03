import { THREAT_CATEGORIES, type ThreatCategory } from "@/types/briefing";

// ---------------------------------------------------------------------------
// Slug mapping and editorial scope for each threat category.
//
// The definitions below describe what GCW files under a category and what it
// deliberately files elsewhere, so a reader can tell whether an absence is a
// quiet cycle or simply out of scope. No figures are asserted here.
// ---------------------------------------------------------------------------

export const CATEGORY_SLUGS: Record<ThreatCategory, string> = {
  "Military Conflicts": "military-conflicts",
  Terrorism: "terrorism",
  Cybersecurity: "cybersecurity",
  "Political Instability": "political-instability",
  "Natural Disasters": "natural-disasters",
  "Nuclear & WMD": "nuclear-wmd",
};

export interface CategoryProfile {
  /** One-sentence definition of the category as GCW uses it. */
  definition: string;
  /** What is filed under this category. */
  includes: string[];
  /** What is deliberately filed elsewhere, or not covered at all. */
  excludes: string[];
  /** How GCW handles the reporting problems specific to this category. */
  scopeNote: string;
}

export const CATEGORY_PROFILES: Record<ThreatCategory, CategoryProfile> = {
  "Military Conflicts": {
    definition:
      "Organised armed violence between states, or between a state and an organised armed group, together with the procurement, industrial capacity and weapons technology that sustain it.",
    includes: [
      "Interstate and internal armed conflict, including proxy involvement",
      "Air, missile and drone attack, and the defences fielded against them",
      "Defence procurement, industrial capacity and weapons-technology milestones",
      "Contracted military, escort and stabilisation work performed alongside armed forces",
    ],
    excludes: [
      "Nuclear, chemical and biological programmes, which are filed under Nuclear & WMD",
      "Attacks on civilians by a non-state group pursuing a political aim, which are filed under Terrorism",
    ],
    scopeNote:
      "Capability claims are reported as claims. Where a performance figure comes from a manufacturer, a defence ministry release or a state broadcaster rather than an independent test, the entry says so.",
  },
  Terrorism: {
    definition:
      "Violence, or attempted violence, against civilians by a non-state group in pursuit of a political, religious or ideological aim.",
    includes: [
      "Attacks, attempted attacks and disrupted plots",
      "Claims of responsibility, and whether an investigating authority supports them",
      "Designation, prosecution and financing-network actions",
      "Attacks on critical infrastructure and transport where a political aim is asserted",
    ],
    excludes: [
      "Battlefield engagements between an insurgent group and armed forces, which are filed under Military Conflicts",
      "Violent crime with no asserted political or ideological aim",
    ],
    scopeNote:
      "A claim of responsibility is treated as a claim until an investigating authority corroborates it. GCW does not adopt any single government’s designation list as its working definition, and names the authority whenever a designation is cited.",
  },
  Cybersecurity: {
    definition:
      "Compromise, exploitation or disruption of computer systems and networks, and the vulnerabilities and actors behind it.",
    includes: [
      "Vulnerabilities under confirmed or reported exploitation, including national-authority advisories",
      "Ransomware and extortion activity, and what the affected organisation has actually confirmed",
      "Intrusion campaigns attributed to state-linked actors",
      "Third-party, supply-chain and integration compromise",
    ],
    excludes: [
      "Routine patch releases with no reported exploitation",
      "Vendor marketing presented as research",
    ],
    scopeNote:
      "Where a figure — record counts, ransom demands, dwell time — originates with an attacker, it is labelled as an attacker claim rather than reported as fact. Attribution to a state sponsor is carried only as far as the underlying research carries it.",
  },
  "Political Instability": {
    definition:
      "Disruption to the exercise of political authority, and the contested use of private force, oversight and legal accountability around it.",
    includes: [
      "Coups, contested transitions and breakdowns of constitutional order",
      "Private security and paramilitary contracting, including domestic enforcement and detention work",
      "Oversight correspondence, litigation and regulatory action against security providers",
      "Structural change in the contracted-security market where it affects who performs state functions",
    ],
    excludes: [
      "Ordinary electoral and legislative politics with no security consequence",
      "Corporate results reporting with no bearing on who holds a security mandate",
    ],
    scopeNote:
      "Contract values, headcounts and revenue figures are carried only where a primary filing or the awarding body supports them, and are attributed to that source. Allegations under active litigation are described as allegations.",
  },
  "Natural Disasters": {
    definition:
      "Hazard events — geophysical, hydrological, meteorological or climatological — with security, humanitarian or critical-infrastructure consequences.",
    includes: [
      "Earthquakes, floods, storms and wildfires that disrupt critical infrastructure or displace populations",
      "Hazard events that interact with an active conflict or constrain humanitarian access",
      "Official warnings, alert levels and disaster-response mobilisation",
    ],
    excludes: [
      "Routine weather forecasting",
      "Long-horizon climate projection, which sits outside a daily cycle",
    ],
    scopeNote:
      "Casualty and displacement figures move quickly and are revised often. Entries cite the issuing authority and the time of issue rather than carrying an early number forward, and readers should check the authority directly before acting.",
  },
  "Nuclear & WMD": {
    definition:
      "Nuclear, chemical, biological and radiological weapons programmes, the delivery systems built for them, and the arms-control architecture that constrains them.",
    includes: [
      "Warhead, delivery-system and strategic-modernisation developments",
      "Enrichment, safeguards and inspection findings",
      "Treaty and arms-control developments, including lapses and withdrawals",
      "Alleged chemical or biological weapons use",
    ],
    excludes: [
      "Civil nuclear power operations with no proliferation or safeguards dimension",
      "Conventional strike systems, which are filed under Military Conflicts",
    ],
    scopeNote:
      "Programme status is among the most heavily contested material GCW handles. Entries attribute to the inspecting body or the reporting outlet by name, and avoid inferring fielded capability from a single test announcement.",
  },
};

export function categorySlug(category: ThreatCategory) {
  return CATEGORY_SLUGS[category];
}

export function categoryFromSlug(slug: string): ThreatCategory | undefined {
  return THREAT_CATEGORIES.find((category) => CATEGORY_SLUGS[category] === slug);
}

/** Categories in the canonical display order, with their slug and scope. */
export const CATEGORY_PROFILE_LIST = THREAT_CATEGORIES.map((category) => ({
  category,
  slug: CATEGORY_SLUGS[category],
  ...CATEGORY_PROFILES[category],
}));
