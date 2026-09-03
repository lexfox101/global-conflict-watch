import type { EventCategory, Severity } from "@/types/incident";

/** Severity tones match the editorial threat palette used across the site. */
export const severityStyles: Record<Severity, string> = {
  Critical: "threat-critical",
  High: "threat-high",
  Medium: "threat-elevated",
  Low: "threat-low",
};

export const categoryColors: Record<EventCategory, string> = {
  "Armed conflict": "#c05a4e",
  "Air activity": "#c2854a",
  "Civil unrest": "#b3a05a",
  Maritime: "#6d8ea3",
  Cyber: "#8a86a8",
  Humanitarian: "#6f9483",
};

export function PanelHeading({ eyebrow, title, trailing }: { eyebrow: string; title: string; trailing?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-3 border-b border-rule px-4 pb-3 pt-4">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-1.5 text-[14px] font-semibold tracking-[-0.01em] text-paper">{title}</h2>
      </div>
      {trailing}
    </div>
  );
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span className={`pill ${severityStyles[severity]}`}>
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
