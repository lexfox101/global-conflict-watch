import type { Briefing, BriefingStory } from "@/types/briefing";

// ---------------------------------------------------------------------------
// Illustrative sample editions for 24 August – 2 September 2026.
//
// These are NOT derived from real reporting. They exist so the archive, the
// seven-day free window and the premium gate can be demonstrated end to end —
// the editions dated 27 August and earlier fall outside the free window and
// therefore render as locked teasers.
// They deliberately carry no source attributions, no CVE identifiers, no
// casualty counts and no contract values — every entry is descriptive only.
// ---------------------------------------------------------------------------

const SAMPLE_VERIFICATION_NOTE =
  "Illustrative sample edition. The entries below are descriptive placeholders written to demonstrate the briefing format — they are not derived from real reporting, carry no source attributions, and must not be treated as intelligence.";

const SAMPLE_INTRO =
  "Placeholder entries in the live briefing format. Nothing here is sourced or verified.";

function sampleBriefing(
  date: string,
  label: string,
  globalThreatLevel: Briefing["globalThreatLevel"],
  topLine: string[],
  stories: BriefingStory[],
): Briefing {
  return {
    date,
    slug: date,
    title: `Security Briefing — ${label} (sample)`,
    globalThreatLevel,
    topLine,
    isSample: true,
    verificationNote: SAMPLE_VERIFICATION_NOTE,
    sections: [
      {
        id: "daily-roundup",
        number: 1,
        title: "Daily Roundup",
        intro: SAMPLE_INTRO,
        stories,
        coverageNote:
          "Coverage note (sample): a real edition records here which domains and regions were searched without result, so readers can distinguish a quiet cycle from a gap in collection.",
      },
    ],
  };
}

export const sampleBriefings: Briefing[] = [
  sampleBriefing(
    "2026-09-02",
    "September 2, 2026",
    "High",
    [
      "Illustrative edition. The top line in a real briefing names the single most consequential development of the cycle and explains why it matters across the cyber, private-security and defence-technology domains at once.",
      "Here that slot is filled with a placeholder: continued pressure on internet-facing remote-access infrastructure, alongside further consolidation in the private-security sector.",
    ],
    [
      {
        id: "sample-0902-edge-appliance-pressure",
        headline: "Sample: sustained exploitation pressure on internet-facing remote-access appliances",
        dek: "Placeholder entry describing the pattern of edge-device exploitation without naming products or identifiers.",
        body: [
          "A real entry here would name the affected product families, summarise the vendor advisory, and state plainly whether exploitation is confirmed by the vendor, by a national CERT, or only claimed by researchers.",
          "It would then set out the operational implication — which credentials to rotate, which logs to hunt through — and stop short of recommending action that the underlying reporting does not support.",
        ],
        category: "Cybersecurity",
        regions: [],
        threatLevel: "High",
        confidence: "Claimed/unverified",
        tags: ["Sample", "Edge appliances"],
        sources: [],
      },
      {
        id: "sample-0902-ransomware-public-sector",
        headline: "Sample: ransomware activity against public-sector service providers",
        dek: "Placeholder entry on extortion groups targeting municipal and regional government IT.",
        body: [
          "Real coverage would identify the group, the victim organisation, and the reported scale of exfiltration, distinguishing carefully between what the victim has confirmed and what the extortion group has claimed on its leak site.",
          "Where a demand figure is only asserted by the attacker, a real briefing labels it as such rather than reporting it as fact.",
        ],
        category: "Cybersecurity",
        regions: [],
        threatLevel: "Elevated",
        confidence: "Claimed/unverified",
        tags: ["Sample", "Ransomware"],
        sources: [],
      },
      {
        id: "sample-0902-pmc-consolidation",
        headline: "Sample: further consolidation among large private-security contractors",
        dek: "Placeholder entry on acquisition activity reshaping the contracted-security market.",
        body: [
          "A real entry would name the acquirer and target, describe what capability the deal adds, and explain how it changes the competitive picture for government-facing contracts.",
          "Deal values are omitted here deliberately: this is sample content and inventing a number would misrepresent it as reporting.",
        ],
        category: "Political Instability",
        regions: ["americas"],
        threatLevel: "Low",
        confidence: "Single source",
        tags: ["Sample", "Market structure"],
        sources: [],
      },
      {
        id: "sample-0902-counter-uas-procurement",
        headline: "Sample: counter-drone procurement continues to broaden beyond legacy primes",
        dek: "Placeholder entry on defence buyers diversifying their counter-UAS supplier base.",
        body: [
          "Real coverage would identify the awarding service, the programme line, and the vendors selected, then explain why the selection signals a shift in how the buyer weighs software-defined detection against hardware effectors.",
        ],
        category: "Military Conflicts",
        regions: ["americas"],
        threatLevel: "Elevated",
        confidence: "Single source",
        tags: ["Sample", "Counter-UAS"],
        sources: [],
      },
    ],
  ),
  sampleBriefing(
    "2026-09-01",
    "September 1, 2026",
    "Elevated",
    [
      "Illustrative edition. A quieter placeholder cycle, used here to show how the format handles a day without a single dominant story.",
    ],
    [
      {
        id: "sample-0901-devops-tooling",
        headline: "Sample: developer and build tooling remains a favoured pivot point",
        dek: "Placeholder entry on artefact repositories and CI/CD servers as supply-chain footholds.",
        body: [
          "A real entry would describe the class of flaw, the patched release line, and the observed post-exploitation behaviour, then explain the supply-chain consequence of administrator-level access to a build system.",
          "It would also distinguish between vendor-confirmed exploitation and researcher inference from honeypot traffic.",
        ],
        category: "Cybersecurity",
        regions: [],
        threatLevel: "High",
        confidence: "Claimed/unverified",
        tags: ["Sample", "Supply chain"],
        sources: [],
      },
      {
        id: "sample-0901-maritime-security-contracting",
        headline: "Sample: maritime security contracting expands along contested shipping lanes",
        dek: "Placeholder entry on private escort and risk-management services in high-risk waters.",
        body: [
          "Real coverage would name the operators and the route, describe the legal framework the contractors operate under, and note which flag states permit armed escort.",
        ],
        category: "Military Conflicts",
        regions: ["middle-east", "africa"],
        threatLevel: "Elevated",
        confidence: "Single source",
        tags: ["Sample", "Maritime"],
        sources: [],
      },
      {
        id: "sample-0901-directed-energy-exports",
        headline: "Sample: directed-energy counter-drone systems appear in more export catalogues",
        dek: "Placeholder entry on the widening export market for laser counter-UAS systems.",
        body: [
          "A real entry would identify the exhibiting manufacturers, the specific systems shown, and the buyer states publicly courted, then assess whether marketed performance is credible against the stated threat set.",
        ],
        category: "Military Conflicts",
        regions: ["asia-pacific", "middle-east"],
        threatLevel: "Elevated",
        confidence: "Single source",
        tags: ["Sample", "Directed energy"],
        sources: [],
      },
    ],
  ),
  sampleBriefing(
    "2026-08-31",
    "August 31, 2026",
    "High",
    [
      "Illustrative edition. The placeholder theme is air and missile defence industrial capacity, alongside continued extortion activity against transport operators.",
    ],
    [
      {
        id: "sample-0831-interceptor-capacity",
        headline: "Sample: interceptor production capacity remains the binding constraint on air defence",
        dek: "Placeholder entry on the gap between expenditure rates and replacement rates for air-defence interceptors.",
        body: [
          "A real entry would cite the contracting action, the production multiple being sought, and the lead time before new output reaches units, then explain which theatres the shortfall constrains in the meantime.",
          "Dollar values are omitted in sample content by design.",
        ],
        category: "Military Conflicts",
        regions: ["middle-east", "eastern-europe", "americas"],
        threatLevel: "High",
        confidence: "Single source",
        tags: ["Sample", "Air defence"],
        sources: [],
      },
      {
        id: "sample-0831-transport-sector-extortion",
        headline: "Sample: extortion group claims data from a transport operator",
        dek: "Placeholder entry on a claimed breach of passenger contact records.",
        body: [
          "Real coverage would state what the operator has confirmed, what remains only a claim, and which data classes are involved — and would explain the downstream phishing risk created by combining contact and travel data.",
          "Record counts here would be invented, so none are given.",
        ],
        category: "Cybersecurity",
        regions: [],
        threatLevel: "Elevated",
        confidence: "Claimed/unverified",
        tags: ["Sample", "Data breach"],
        sources: [],
      },
      {
        id: "sample-0831-autonomy-policy",
        headline: "Sample: legislators press for tighter human-oversight requirements on military AI",
        dek: "Placeholder entry on the oversight debate around AI in targeting workflows.",
        body: [
          "A real entry would identify the committee, the specific statutory language proposed, and the department's stated position, then assess how the outcome changes fielding timelines.",
        ],
        category: "Political Instability",
        regions: ["americas"],
        threatLevel: "Elevated",
        confidence: "Single source",
        tags: ["Sample", "AI policy"],
        sources: [],
      },
      {
        id: "sample-0831-sahel-security-presence",
        headline: "Sample: foreign paramilitary presence in the Sahel continues to be reconfigured",
        dek: "Placeholder entry on shifting external security arrangements in West Africa.",
        body: [
          "Real coverage would name the states and formations involved, describe the mandate change, and set out the documented human-rights findings that accompany it — with attribution to the investigating body.",
        ],
        category: "Political Instability",
        regions: ["africa"],
        threatLevel: "High",
        confidence: "Single source",
        tags: ["Sample", "Sahel"],
        sources: [],
      },
    ],
  ),
  sampleBriefing(
    "2026-08-30",
    "August 30, 2026",
    "Elevated",
    [
      "Illustrative edition. Placeholder content weighted toward third-party and integration risk in enterprise software.",
    ],
    [
      {
        id: "sample-0830-saas-integration-risk",
        headline: "Sample: a single SaaS integration compromise keeps producing downstream disclosures",
        dek: "Placeholder entry on cascading third-party breach notifications.",
        body: [
          "A real entry would name the integration, the tracked actor, and the platforms affected, then explain why token theft from one connector produces many separate corporate breach notifications over following months.",
        ],
        category: "Cybersecurity",
        regions: [],
        threatLevel: "Elevated",
        confidence: "Corroborated",
        tags: ["Sample", "Third-party risk"],
        sources: [],
      },
      {
        id: "sample-0830-medical-manufacturing-disruption",
        headline: "Sample: cyber incident disrupts a medical-device manufacturer's operations",
        dek: "Placeholder entry on manufacturing outages with downstream patient-care consequences.",
        body: [
          "Real coverage would state what the company disclosed, what remains undisclosed, and why manufacturing disruption differs in consequence from a corporate IT outage.",
        ],
        category: "Cybersecurity",
        regions: ["americas"],
        threatLevel: "Elevated",
        confidence: "Single source",
        tags: ["Sample", "Healthcare"],
        sources: [],
      },
      {
        id: "sample-0830-stabilisation-contracting",
        headline: "Sample: post-conflict stabilisation work is tendered to commercial contractors",
        dek: "Placeholder entry on contractor-led alternatives to traditional peacekeeping structures.",
        body: [
          "A real entry would identify the awarding body, the contractor, and the scope of works, then assess what the arrangement implies for accountability compared with a mandated multinational mission.",
        ],
        category: "Military Conflicts",
        regions: ["middle-east"],
        threatLevel: "High",
        confidence: "Single source",
        tags: ["Sample", "Stabilisation"],
        sources: [],
      },
    ],
  ),
  sampleBriefing(
    "2026-08-29",
    "August 29, 2026",
    "High",
    [
      "Illustrative edition. Placeholder content on nation-state persistence in communications infrastructure and on recruitment pipelines feeding foreign conflicts.",
    ],
    [
      {
        id: "sample-0829-telecom-persistence",
        headline: "Sample: persistent implants reported in communications backbone infrastructure",
        dek: "Placeholder entry on long-dwell access to carrier networks.",
        body: [
          "A real entry would list the implant families, the initial-access vectors, and the research organisation making the attribution, then explain why perimeter appliances remain the dominant entry point.",
          "It would attribute cautiously: naming a state sponsor only where the reporting does.",
        ],
        category: "Cybersecurity",
        regions: ["asia-pacific"],
        threatLevel: "High",
        confidence: "Corroborated",
        tags: ["Sample", "Critical infrastructure"],
        sources: [],
      },
      {
        id: "sample-0829-recruitment-pipelines",
        headline: "Sample: recruitment pipelines continue to move contractors into foreign conflicts",
        dek: "Placeholder entry on cross-border recruitment of former soldiers by intermediary firms.",
        body: [
          "Real coverage would name the recruiting agencies, the employing company, and the investigating organisation, and would set out which legal instruments the arrangement may breach.",
          "Headcounts and casualty figures are omitted here because this is sample content.",
        ],
        category: "Political Instability",
        regions: ["africa", "americas", "middle-east"],
        threatLevel: "High",
        confidence: "Corroborated",
        tags: ["Sample", "Mercenaries"],
        sources: [],
      },
      {
        id: "sample-0829-hypersonics-programmes",
        headline: "Sample: additional states report progress on air-breathing hypersonic propulsion",
        dek: "Placeholder entry on scramjet development milestones.",
        body: [
          "A real entry would identify the laboratory, the specific test conducted, and the engineering barrier the result addresses, then explain the strategic use case the programme is aimed at.",
        ],
        category: "Military Conflicts",
        regions: ["asia-pacific"],
        threatLevel: "Elevated",
        confidence: "Single source",
        tags: ["Sample", "Hypersonics"],
        sources: [],
      },
    ],
  ),
  sampleBriefing(
    "2026-08-28",
    "August 28, 2026",
    "Elevated",
    [
      "Illustrative edition, and the oldest entry inside the demonstration archive's free window. Placeholder content on vulnerability disclosure timelines and detention-infrastructure contracting.",
    ],
    [
      {
        id: "sample-0828-disclosure-windows",
        headline: "Sample: the interval between patch and exploitation keeps compressing",
        dek: "Placeholder entry on shrinking remediation windows for internet-facing software.",
        body: [
          "A real entry would give the disclosure date, the first observed exploitation date, and the source for each, then draw the operational conclusion about patch cadence for exposed services.",
        ],
        category: "Cybersecurity",
        regions: [],
        threatLevel: "High",
        confidence: "Corroborated",
        tags: ["Sample", "Vulnerability management"],
        sources: [],
      },
      {
        id: "sample-0828-detention-infrastructure",
        headline: "Sample: detention-infrastructure conversions expand a contractor's domestic footprint",
        dek: "Placeholder entry on private contractors taking on domestic enforcement infrastructure.",
        body: [
          "A real entry would name the contracting agency, the site, and the scope of wraparound services, then note any oversight correspondence or litigation attached to the award.",
          "Contract values are omitted in sample content by design.",
        ],
        category: "Political Instability",
        regions: ["americas"],
        threatLevel: "Elevated",
        confidence: "Single source",
        tags: ["Sample", "Detention"],
        sources: [],
      },
      {
        id: "sample-0828-loitering-munitions",
        headline: "Sample: loitering munitions move further down the tactical echelon",
        dek: "Placeholder entry on precision strike capability reaching squad level.",
        body: [
          "Real coverage would identify the procuring services, the systems selected, and the doctrinal change implied by fielding strike capability at the smallest tactical unit.",
        ],
        category: "Military Conflicts",
        regions: ["eastern-europe", "americas"],
        threatLevel: "Elevated",
        confidence: "Single source",
        tags: ["Sample", "Loitering munitions"],
        sources: [],
      },
    ],
  ),

  // ── Outside the seven-day free window: these render behind the premium gate ──
  sampleBriefing(
    "2026-08-27",
    "August 27, 2026",
    "High",
    [
      "Illustrative edition, and the first one outside the demonstration archive's free window. Placeholder content on identity-provider compromise and on oversight of domestic security contracting.",
    ],
    [
      {
        id: "sample-0827-identity-provider-compromise",
        headline: "Sample: compromise of an identity provider cascades into tenant-level intrusions",
        dek: "Placeholder entry on single-sign-on infrastructure as a route into many organisations at once.",
        body: [
          "A real entry would name the provider, the affected token or session mechanism, and the research or advisory establishing exploitation, then explain why a federated identity layer concentrates risk across every tenant that trusts it.",
          "It would distinguish provider-confirmed impact from customer-reported impact, and would not extrapolate a victim count from the provider's total customer base.",
        ],
        category: "Cybersecurity",
        regions: [],
        threatLevel: "High",
        confidence: "Corroborated",
        tags: ["Sample", "Identity"],
        sources: [],
      },
      {
        id: "sample-0827-detention-oversight-hearing",
        headline: "Sample: legislators question a contractor's suitability for detention operations",
        dek: "Placeholder entry on oversight of a security firm taking on custodial work.",
        body: [
          "Real coverage would identify the committee, the contractor, and the specific questions put to it, then set out what the contracting agency has said in response and what remains unanswered.",
          "Contract values and facility capacities are omitted here because this is sample content.",
        ],
        category: "Political Instability",
        regions: ["americas"],
        threatLevel: "Elevated",
        confidence: "Single source",
        tags: ["Sample", "Oversight"],
        sources: [],
      },
      {
        id: "sample-0827-naval-drone-programmes",
        headline: "Sample: uncrewed surface vessel programmes widen beyond their first operators",
        dek: "Placeholder entry on naval drone capability spreading to additional states.",
        body: [
          "A real entry would name the navies and builders involved, describe the demonstrated endurance or payload, and assess what the fielding implies for littoral defence — attributing performance claims to whoever made them.",
        ],
        category: "Military Conflicts",
        regions: ["eastern-europe", "asia-pacific"],
        threatLevel: "Elevated",
        confidence: "Single source",
        tags: ["Sample", "Naval autonomy"],
        sources: [],
      },
    ],
  ),
  sampleBriefing(
    "2026-08-26",
    "August 26, 2026",
    "Elevated",
    [
      "Illustrative edition inside the subscriber archive. Placeholder content on industrial control systems and on export-control enforcement.",
    ],
    [
      {
        id: "sample-0826-ics-exposure",
        headline: "Sample: internet-exposed industrial control interfaces remain a standing problem",
        dek: "Placeholder entry on operational-technology interfaces reachable from the public internet.",
        body: [
          "A real entry would cite the scanning organisation, the protocol and device classes observed, and the sectors affected, then explain why an exposed human-machine interface differs in consequence from an exposed office system.",
          "Device counts here would be invented, so none are given.",
        ],
        category: "Cybersecurity",
        regions: [],
        threatLevel: "High",
        confidence: "Single source",
        tags: ["Sample", "OT security"],
        sources: [],
      },
      {
        id: "sample-0826-export-control-enforcement",
        headline: "Sample: enforcement action targets a transshipment route for controlled components",
        dek: "Placeholder entry on export controls and the intermediaries that route around them.",
        body: [
          "Real coverage would name the enforcing authority, the entities designated, and the component class involved, then explain how the route worked and which control regime it circumvented.",
          "It would treat an indictment as an allegation until it is tested.",
        ],
        category: "Political Instability",
        regions: ["asia-pacific", "eastern-europe"],
        threatLevel: "Elevated",
        confidence: "Corroborated",
        tags: ["Sample", "Export controls"],
        sources: [],
      },
    ],
  ),
  sampleBriefing(
    "2026-08-25",
    "August 25, 2026",
    "Elevated",
    [
      "Illustrative edition inside the subscriber archive. Placeholder content on site security contracting and on commercial satellite sensing.",
    ],
    [
      {
        id: "sample-0825-site-security-contracting",
        headline: "Sample: extractive-sector site security is retendered under a new mandate",
        dek: "Placeholder entry on armed site protection around resource extraction.",
        body: [
          "A real entry would name the operator, the contractor, and the host-state arrangement governing the use of force, then note any documented incidents attached to the previous mandate and who investigated them.",
        ],
        category: "Political Instability",
        regions: ["africa"],
        threatLevel: "Elevated",
        confidence: "Single source",
        tags: ["Sample", "Site security"],
        sources: [],
      },
      {
        id: "sample-0825-commercial-isr",
        headline: "Sample: commercial satellite imagery is procured for persistent monitoring tasks",
        dek: "Placeholder entry on defence buyers renting rather than building sensing capacity.",
        body: [
          "Real coverage would identify the awarding body, the imagery providers, and the revisit or resolution requirement stated in the solicitation, then explain what renting capacity changes about tasking and control.",
        ],
        category: "Military Conflicts",
        regions: ["americas", "asia-pacific"],
        threatLevel: "Low",
        confidence: "Single source",
        tags: ["Sample", "Commercial ISR"],
        sources: [],
      },
      {
        id: "sample-0825-hacktivist-claims",
        headline: "Sample: hacktivist collective claims disruption of a utility, evidence thin",
        dek: "Placeholder entry on claimed attacks that outpace any confirmable effect.",
        body: [
          "A real entry would state exactly what the group claimed, what the utility confirmed, and what independent monitoring showed — and would keep the claim labelled as a claim, since groups of this kind routinely overstate impact.",
        ],
        category: "Cybersecurity",
        regions: ["middle-east"],
        threatLevel: "Elevated",
        confidence: "Claimed/unverified",
        tags: ["Sample", "Hacktivism"],
        sources: [],
      },
    ],
  ),
  sampleBriefing(
    "2026-08-24",
    "August 24, 2026",
    "High",
    [
      "Illustrative edition and the oldest entry in the demonstration archive. Placeholder content on managed-service-provider compromise and on counter-battery capability.",
    ],
    [
      {
        id: "sample-0824-msp-compromise",
        headline: "Sample: a managed service provider compromise reaches its downstream clients",
        dek: "Placeholder entry on remote-management tooling used to move between customer estates.",
        body: [
          "A real entry would name the provider, the tooling abused, and how many downstream organisations the provider itself has confirmed, then explain why administrative tooling designed for scale also scales an intrusion.",
          "Client counts asserted by an extortion group would be labelled as attacker claims.",
        ],
        category: "Cybersecurity",
        regions: ["americas"],
        threatLevel: "High",
        confidence: "Corroborated",
        tags: ["Sample", "Managed services"],
        sources: [],
      },
      {
        id: "sample-0824-counter-battery-radar",
        headline: "Sample: counter-battery radar orders expand across several European buyers",
        dek: "Placeholder entry on artillery-locating sensors as a rearmament priority.",
        body: [
          "Real coverage would identify the buyers, the systems, and the delivery timeline stated by the manufacturer, then explain what the sensor does for a force that has been fighting a counter-fire duel.",
          "Order values are omitted in sample content by design.",
        ],
        category: "Military Conflicts",
        regions: ["eastern-europe"],
        threatLevel: "Elevated",
        confidence: "Single source",
        tags: ["Sample", "Artillery"],
        sources: [],
      },
    ],
  ),
];
