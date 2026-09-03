import type { Incident } from "./incident";

export type TrackingClassification = "government-state" | "humanitarian" | "civilian-demo";
export type OperatorCategory = "Government/state" | "Humanitarian" | "Civilian/demo";
export type CardinalHeading = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

export interface TrackingSource {
  name: string;
  homepageUrl: string;
}

interface BaseTrackingAsset {
  id: string;
  displayName: string;
  coordinates: [longitude: number, latitude: number];
  classification: TrackingClassification;
  operatorCategory: OperatorCategory;
  status: string;
  timestamp: string;
  delayMinutes: number;
  region: string;
  broadArea: string;
  positionPrecision: "Generalized";
  dataNotice: "Fictional delayed demonstration data";
  source: TrackingSource;
  description: string;
}

export interface Aircraft extends BaseTrackingAsset {
  kind: "aircraft";
  altitudeBand: "Ground" | "Low" | "Medium" | "High" | "Withheld";
  heading?: CardinalHeading;
}

export interface Vessel extends BaseTrackingAsset {
  kind: "vessel";
  flag?: string;
}

export type TrackingAsset = Aircraft | Vessel;
export type LayerVisibility = Record<"incidents" | "aircraft" | "vessels", boolean>;

export type DashboardSelection =
  | { kind: "incident"; id: string }
  | { kind: "aircraft"; id: string }
  | { kind: "vessel"; id: string };

export type SelectedTarget =
  | { kind: "incident"; item: Incident }
  | { kind: "aircraft"; item: Aircraft }
  | { kind: "vessel"; item: Vessel };

export const TRACKING_CLASSIFICATION_LABELS: Record<TrackingClassification, string> = {
  "government-state": "Government/state",
  humanitarian: "Humanitarian",
  "civilian-demo": "Civilian/demo",
};
