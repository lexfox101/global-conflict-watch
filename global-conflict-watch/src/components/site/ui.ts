import type { StoryConfidence, ThreatCategory, ThreatLevel } from "@/types/briefing";

export const threatPillClass: Record<ThreatLevel, string> = {
  Low: "pill-low",
  Elevated: "pill-elevated",
  High: "pill-high",
  Critical: "pill-critical",
};

export const threatSegClass: Record<ThreatLevel, string> = {
  Low: "is-on-low",
  Elevated: "is-on-elevated",
  High: "is-on-high",
  Critical: "is-on-critical",
};

export const threatLevelBlurb: Record<ThreatLevel, string> = {
  Low: "Routine monitoring. No developments requiring immediate attention.",
  Elevated: "Notable developments under watch; no immediate escalation indicated.",
  High: "Significant developments with near-term operational consequences.",
  Critical: "Severe developments with immediate and wide-reaching consequences.",
};

export const confidencePillClass: Record<StoryConfidence, string> = {
  Confirmed: "pill-accent",
  Corroborated: "pill-accent",
  "Single source": "pill-muted",
  "Claimed/unverified": "pill-elevated",
};

export const confidenceDescription: Record<StoryConfidence, string> = {
  Confirmed: "Confirmed by the responsible organisation or an official advisory.",
  Corroborated: "Reported independently by two or more outlets.",
  "Single source": "Reported by one outlet only; not independently corroborated.",
  "Claimed/unverified": "Asserted by an involved party and not independently verified.",
};

export const categoryAccent: Record<ThreatCategory, string> = {
  "Military Conflicts": "#f05d5e",
  Terrorism: "#f59e5b",
  Cybersecurity: "#9b8afb",
  "Political Instability": "#f4c15d",
  "Natural Disasters": "#52d6a1",
  "Nuclear & WMD": "#36c2d9",
};

const longDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const shortDate = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
const weekday = new Intl.DateTimeFormat("en-GB", { weekday: "long", timeZone: "UTC" });
const clock = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC", hour12: false });

/** `date` is an ISO calendar date (yyyy-mm-dd), read in UTC to avoid off-by-one shifts. */
export function formatBriefingDate(date: string) {
  return longDate.format(new Date(`${date}T00:00:00Z`));
}

export function formatBriefingDateShort(date: string) {
  return shortDate.format(new Date(`${date}T00:00:00Z`));
}

export function formatBriefingWeekday(date: string) {
  return weekday.format(new Date(`${date}T00:00:00Z`));
}

export function formatAlertTime(timestamp: string) {
  return `${clock.format(new Date(timestamp))} UTC`;
}
