import type { EventCategory, Severity } from "@/types/incident";

/** Severity tones match the editorial threat palette used across the site. */
export const severityStyles: Record<Severity, string> = {
  Critical: "threat-critical",
  High: "threat-high",
  Medium: "threat-elevated",
  Low: "threat-low",
};

/** Marker and legend hues, tuned to stay distinguishable on the pale basemap. */
export const categoryColors: Record<EventCategory, string> = {
  "Armed conflict": "#a8322c",
  "Air activity": "#a1621a",
  "Civil unrest": "#7d6a17",
  Maritime: "#2f5f7a",
  Cyber: "#5b4f8c",
  Humanitarian: "#2f6b56",
};

export function PanelHeading({ title }: { title: string }) {
  return (
    <div className="border-b border-rule px-4 pb-3 pt-4">
      <h2 className="type-meta text-ink">{title}</h2>
    </div>
  );
}

/** Dot marker plus the level as text, so severity is never carried by colour alone. */
export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span className={`threat-mark type-instrument uppercase tracking-[0.1em] ${severityStyles[severity]}`}>
      <span aria-hidden="true" className="threat-dot" />
      <span className="sr-only">Severity: </span>
      {severity}
    </span>
  );
}

export function formatTime(timestamp: string) {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC", hour12: false }).format(new Date(timestamp));
}

export function formatDateTime(timestamp: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC", hour12: false }).format(new Date(timestamp));
}
