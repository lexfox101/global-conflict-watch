import type { StoryConfidence, ThreatCategory, ThreatLevel } from "@/types/briefing";

/** Colour tone for a threat level. Sets `color`, so borders and dots follow it. */
export const threatToneClass: Record<ThreatLevel, string> = {
  Low: "threat-low",
  Elevated: "threat-elevated",
  High: "threat-high",
  Critical: "threat-critical",
};

export const threatLevelBlurb: Record<ThreatLevel, string> = {
  Low: "Routine monitoring. No developments requiring immediate attention.",
  Elevated: "Notable developments under watch; no immediate escalation indicated.",
  High: "Significant developments with near-term operational consequences.",
  Critical: "Severe developments with immediate and wide-reaching consequences.",
};

export const confidenceDescription: Record<StoryConfidence, string> = {
  Confirmed: "Confirmed by the responsible organisation or an official advisory.",
  Corroborated: "Reported independently by two or more outlets.",
  "Single source": "Reported by one outlet only; not independently corroborated.",
  "Claimed/unverified": "Asserted by an involved party and not independently verified.",
};

/** Muted category hues, used only for the proportional bars on breakdown charts.
    Tuned to stay legible against the white page. */
export const categoryAccent: Record<ThreatCategory, string> = {
  "Military Conflicts": "#a8322c",
  Terrorism: "#a1621a",
  Cybersecurity: "#5b4f8c",
  "Political Instability": "#7d6a17",
  "Natural Disasters": "#2f6b56",
  "Nuclear & WMD": "#2f5f7a",
};

const longDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const shortDate = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
const weekday = new Intl.DateTimeFormat("en-GB", { weekday: "long", timeZone: "UTC" });

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
