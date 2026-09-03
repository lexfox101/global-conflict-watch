export const EVENT_CATEGORIES = [
  "Armed conflict",
  "Air activity",
  "Civil unrest",
  "Maritime",
  "Cyber",
  "Humanitarian",
] as const;

export const SEVERITIES = ["Critical", "High", "Medium", "Low"] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];
export type Severity = (typeof SEVERITIES)[number];
export type VerificationStatus = "Corroborated" | "Single source" | "Unverified";
export type Confidence = "High" | "Moderate" | "Low";

export interface IncidentSource {
  name: string;
  url: string;
}

export interface Incident {
  id: string;
  title: string;
  location: string;
  country: string;
  region: string;
  coordinates: [longitude: number, latitude: number];
  timestamp: string;
  category: EventCategory;
  severity: Severity;
  verification: VerificationStatus;
  confidence: Confidence;
  summary: string;
  sources: IncidentSource[];
}

export type TimeRange = "6h" | "24h" | "72h" | "all";
