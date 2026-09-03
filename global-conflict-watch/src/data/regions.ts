import { REGION_KEYS, type RegionKey } from "@/types/briefing";

// ---------------------------------------------------------------------------
// Standing context for each tracked region.
//
// Descriptive only. These blurbs explain what GCW watches in a region and how
// it handles attribution there — they deliberately carry no figures, no
// casualty or displacement counts, and no forecasts.
// ---------------------------------------------------------------------------

export interface RegionProfile {
  /** One-line standing summary used on the regions index. */
  summary: string;
  /** Standing context paragraphs shown above the region feed. */
  context: string[];
  /** Recurring themes GCW follows in this region. */
  watchpoints: string[];
}

export const REGION_PROFILES: Record<RegionKey, RegionProfile> = {
  "middle-east": {
    summary:
      "Active hostilities, contested maritime chokepoints, and one of the densest air- and missile-defence markets anywhere.",
    context: [
      "GCW tracks the Middle East and North Africa as a single region. Coverage concentrates on active hostilities and their spillover, the security of shipping through the region’s maritime chokepoints, and the procurement and industrial activity that follows sustained air and missile attack.",
      "Post-conflict security arrangements are a standing theme. Where stabilisation or aid-distribution work is contracted to commercial providers rather than mandated to a multinational mission, entries record who holds the contract and what oversight attaches to it. Attribution here is frequently contested, so entries state plainly which party is making a claim and whether anyone independent has corroborated it.",
    ],
    watchpoints: ["Air and missile defence", "Maritime security", "Stabilisation contracting", "Proxy involvement"],
  },
  "eastern-europe": {
    summary:
      "The war in Ukraine and its second-order effects on munitions supply, weapons autonomy, and European rearmament.",
    context: [
      "This region covers Eastern Europe and Eurasia. The dominant thread is the war in Ukraine and what it has changed elsewhere: attrition rates that industrial capacity struggles to match, the normalisation of drone and loitering-munition warfare, and the pace at which autonomy is being pushed into targeting.",
      "Strategic-weapons and arms-control developments are recorded here when the programme sits in the region, and cross-referenced under Nuclear & WMD. Battlefield claims from either belligerent are labelled as claims; GCW does not carry casualty or equipment-loss figures forward from a party to the conflict as though they were established.",
    ],
    watchpoints: ["Drone and autonomy", "Munitions industrial base", "European rearmament", "Strategic signalling"],
  },
  "asia-pacific": {
    summary:
      "Strategic competition, hypersonic and autonomous weapons programmes, and persistent intrusions into telecommunications infrastructure.",
    context: [
      "Asia-Pacific coverage spans East, South and Southeast Asia and Oceania. Two threads recur: long-horizon capability development — hypersonics, directed energy, autonomous aircraft — and sustained, state-linked intrusion activity against communications and other critical infrastructure.",
      "Capability reporting in this region often originates with a state broadcaster, a defence ministry release, or a trade-show exhibit. Entries name that origin rather than treating marketed performance as tested performance, and note where independent corroboration is absent.",
    ],
    watchpoints: ["Hypersonics", "Autonomous systems", "Critical-infrastructure intrusion", "Export competition"],
  },
  africa: {
    summary:
      "Insurgency and contested transitions, alongside the continuing reconfiguration of foreign paramilitary presence.",
    context: [
      "Sub-Saharan Africa coverage follows armed insurgency, contested political transitions, and the security arrangements states enter into with external partners — including commercial and paramilitary providers whose mandates and accountability are often unclear.",
      "Human-rights findings are a significant part of the record here. Where an investigating body — a UN mechanism, a court, or a documented NGO investigation — has made a finding, GCW attributes to that body by name and distinguishes its conclusions from allegations that remain untested.",
    ],
    watchpoints: ["Insurgency", "Foreign paramilitary presence", "Accountability mechanisms", "Recruitment pipelines"],
  },
  americas: {
    summary:
      "Domestic security contracting, ransomware against public institutions, and the industrial base behind much Western procurement.",
    context: [
      "The Americas region covers North, Central and South America and the Caribbean. Much of the defence-industrial and procurement record sits here, as does a growing body of reporting on private security firms taking on domestic enforcement and detention work.",
      "The region also generates a steady stream of ransomware and extortion incidents against public bodies and healthcare providers. For those, entries separate what the affected organisation has confirmed from what an extortion group has claimed on a leak site, and omit figures that originate only with the attacker.",
    ],
    watchpoints: ["Domestic security contracting", "Public-sector ransomware", "Procurement and industrial base", "Oversight and litigation"],
  },
};

/** Regions in the canonical display order. */
export const REGION_PROFILE_LIST = REGION_KEYS.map((key) => ({ key, ...REGION_PROFILES[key] }));
