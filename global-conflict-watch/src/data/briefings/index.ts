import type { Briefing, BriefingStory, RegionKey, StoryConfidence, ThreatCategory, ThreatLevel } from "@/types/briefing";
import { briefingStories, highestThreatLevel, threatLevelRank } from "@/types/briefing";
import { briefing20260903 } from "./2026-09-03";
import { sampleBriefings } from "./samples";

/** Number of most recent editions readable without a subscription. */
export const FREE_ARCHIVE_DAYS = 7;

/** All editions, newest first. */
export const allBriefings: Briefing[] = [briefing20260903, ...sampleBriefings].sort((a, b) => b.date.localeCompare(a.date));

export const latestBriefing: Briefing = allBriefings[0];

const freeSlugs = new Set(allBriefings.slice(0, FREE_ARCHIVE_DAYS).map((briefing) => briefing.slug));

export function getBriefing(slug: string): Briefing | undefined {
  return allBriefings.find((briefing) => briefing.slug === slug);
}

/** Free access is granted to the `FREE_ARCHIVE_DAYS` most recent editions. */
export function isBriefingFree(briefing: Briefing) {
  return freeSlugs.has(briefing.slug);
}

export function isBriefingPremium(briefing: Briefing) {
  return !isBriefingFree(briefing);
}

/** 1-based edition number, counted from the oldest edition on the site. */
export function briefingEditionNumber(slug: string): number | undefined {
  const index = allBriefings.findIndex((briefing) => briefing.slug === slug);
  return index === -1 ? undefined : allBriefings.length - index;
}

export function getAdjacentBriefings(slug: string) {
  const index = allBriefings.findIndex((briefing) => briefing.slug === slug);
  if (index === -1) return { newer: undefined, older: undefined };
  return { newer: allBriefings[index - 1], older: allBriefings[index + 1] };
}

export interface StoryRef {
  story: BriefingStory;
  briefing: Briefing;
}

function freeStoryRefs(): StoryRef[] {
  return allBriefings
    .filter(isBriefingFree)
    .flatMap((briefing) => briefingStories(briefing).map((story) => ({ story, briefing })));
}

export function getStoriesByCategory(category: ThreatCategory): StoryRef[] {
  return freeStoryRefs().filter((ref) => ref.story.category === category);
}

export function getStoriesByRegion(region: RegionKey): StoryRef[] {
  return freeStoryRefs().filter((ref) => ref.story.regions.includes(region));
}

/** Every story in every edition, newest edition first — the basis for site-wide counts. */
export function allStoryRefs(): StoryRef[] {
  return allBriefings.flatMap((briefing) => briefingStories(briefing).map((story) => ({ story, briefing })));
}

/** `undefined` when a region has no readable entries, so the UI can say so rather than imply "Low". */
export function deriveRegionThreatLevel(region: RegionKey): ThreatLevel | undefined {
  const levels = getStoriesByRegion(region).map((ref) => ref.story.threatLevel);
  return levels.length === 0 ? undefined : highestThreatLevel(levels);
}

/** `undefined` when a category has no readable entries. */
export function deriveCategoryThreatLevel(category: ThreatCategory): ThreatLevel | undefined {
  const levels = getStoriesByCategory(category).map((ref) => ref.story.threatLevel);
  return levels.length === 0 ? undefined : highestThreatLevel(levels);
}

export function countStoriesByCategory(refs: StoryRef[]): Record<ThreatCategory, number> {
  const counts = {} as Record<ThreatCategory, number>;
  for (const { story } of refs) counts[story.category] = (counts[story.category] ?? 0) + 1;
  return counts;
}

export function countStoriesByConfidence(refs: StoryRef[]): Record<StoryConfidence, number> {
  const counts = {} as Record<StoryConfidence, number>;
  for (const { story } of refs) counts[story.confidence] = (counts[story.confidence] ?? 0) + 1;
  return counts;
}

/** A story with no regional focus counts once against `global`, matching how it renders. */
export function countStoriesByRegion(refs: StoryRef[]): { regions: Record<RegionKey, number>; global: number } {
  const regions = {} as Record<RegionKey, number>;
  let globalCount = 0;
  for (const { story } of refs) {
    if (story.regions.length === 0) {
      globalCount += 1;
      continue;
    }
    for (const region of story.regions) regions[region] = (regions[region] ?? 0) + 1;
  }
  return { regions, global: globalCount };
}

/** Highest story-level threat in an edition — the basis for the published level. */
export function deriveGlobalThreatLevel(briefing: Briefing): ThreatLevel {
  return highestThreatLevel(briefingStories(briefing).map((story) => story.threatLevel));
}

/** Current global threat level, derived from the most recent edition. */
export const globalThreatLevel: ThreatLevel = deriveGlobalThreatLevel(latestBriefing);

/** The most severe stories from the latest edition, for the homepage. */
export function topThreats(count = 4): BriefingStory[] {
  return briefingStories(latestBriefing)
    .map((story, index) => ({ story, index }))
    .sort((a, b) => threatLevelRank(b.story.threatLevel) - threatLevelRank(a.story.threatLevel) || a.index - b.index)
    .slice(0, Math.max(3, Math.min(count, 5)))
    .map((entry) => entry.story);
}
