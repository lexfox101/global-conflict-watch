export const THREAT_LEVELS = ["Low", "Elevated", "High", "Critical"] as const;

export const THREAT_CATEGORIES = [
  "Military Conflicts",
  "Terrorism",
  "Cybersecurity",
  "Political Instability",
  "Natural Disasters",
  "Nuclear & WMD",
] as const;

export const REGION_KEYS = ["middle-east", "eastern-europe", "asia-pacific", "africa", "americas"] as const;

export const CONFIDENCE_LEVELS = ["Confirmed", "Corroborated", "Single source", "Claimed/unverified"] as const;

export type ThreatLevel = (typeof THREAT_LEVELS)[number];
export type ThreatCategory = (typeof THREAT_CATEGORIES)[number];
export type RegionKey = (typeof REGION_KEYS)[number];
export type StoryConfidence = (typeof CONFIDENCE_LEVELS)[number];

export interface Region {
  key: RegionKey;
  name: string;
  shortName: string;
}

export const REGIONS: Record<RegionKey, Region> = {
  "middle-east": { key: "middle-east", name: "Middle East & North Africa", shortName: "Middle East" },
  "eastern-europe": { key: "eastern-europe", name: "Eastern Europe & Eurasia", shortName: "Eastern Europe" },
  "asia-pacific": { key: "asia-pacific", name: "Asia-Pacific", shortName: "Asia-Pacific" },
  africa: { key: "africa", name: "Sub-Saharan Africa", shortName: "Africa" },
  americas: { key: "americas", name: "The Americas", shortName: "Americas" },
};

/** Stories with no regional focus (or a focus outside the five tracked regions) render as global. */
export function regionLabels(keys: RegionKey[]) {
  return keys.length === 0 ? ["Global"] : keys.map((key) => REGIONS[key].shortName);
}

export function threatLevelRank(level: ThreatLevel) {
  return THREAT_LEVELS.indexOf(level);
}

export function highestThreatLevel(levels: ThreatLevel[]): ThreatLevel {
  return levels.reduce<ThreatLevel>((highest, level) => (threatLevelRank(level) > threatLevelRank(highest) ? level : highest), "Low");
}

export interface BriefingSource {
  name: string;
  /** Publication homepage. Deep article links are deliberately not stored. */
  url: string;
}

export interface BriefingStory {
  id: string;
  headline: string;
  /** One-sentence standfirst used in cards and list views. */
  dek: string;
  body: string[];
  category: ThreatCategory;
  regions: RegionKey[];
  threatLevel: ThreatLevel;
  confidence: StoryConfidence;
  sources: BriefingSource[];
  /** Optional map linkage for a future incident overlay. */
  coordinates?: [longitude: number, latitude: number];
  tags?: string[];
}

export interface BriefingSection {
  id: string;
  number: number;
  title: string;
  intro?: string;
  stories: BriefingStory[];
  coverageNote?: string;
}

export interface Briefing {
  /** ISO calendar date, yyyy-mm-dd. */
  date: string;
  /** Route slug — identical to `date`. */
  slug: string;
  title: string;
  topLine: string[];
  globalThreatLevel: ThreatLevel;
  sections: BriefingSection[];
  verificationNote: string;
  /** True for illustrative filler editions that are not derived from real reporting. */
  isSample?: boolean;
}

export interface BreakingAlert {
  id: string;
  headline: string;
  level: ThreatLevel;
  timestamp: string;
  href?: string;
}

export function briefingStories(briefing: Briefing): BriefingStory[] {
  return briefing.sections.flatMap((section) => section.stories);
}

export function briefingStoryCount(briefing: Briefing) {
  return briefing.sections.reduce((total, section) => total + section.stories.length, 0);
}

export function briefingCategories(briefing: Briefing): ThreatCategory[] {
  const seen = new Set<ThreatCategory>();
  for (const story of briefingStories(briefing)) seen.add(story.category);
  return THREAT_CATEGORIES.filter((category) => seen.has(category));
}
