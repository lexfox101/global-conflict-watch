import type { EventCategory, Severity } from "@/types/incident";

export const severityStyles: Record<Severity, string> = {
  Critical: "border-red-400/30 bg-red-500/10 text-red-300",
  High: "border-orange-400/30 bg-orange-500/10 text-orange-300",
  Medium: "border-amber-300/25 bg-amber-400/10 text-amber-200",
  Low: "border-cyan-300/25 bg-cyan-400/10 text-cyan-200",
};

export const categoryColors: Record<EventCategory, string> = {
  "Armed conflict": "#f05d5e",
  "Air activity": "#f59e5b",
  "Civil unrest": "#f4c15d",
  Maritime: "#36c2d9",
  Cyber: "#9b8afb",
  Humanitarian: "#52d6a1",
};

export function PanelHeading({ eyebrow, title, trailing }: { eyebrow: string; title: string; trailing?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-3 px-4 pb-3 pt-4">
      <div>
        <p className="text-[10px] font-medium text-cyan-300/65">{eyebrow}</p>
        <h2 className="mt-1 text-[15px] font-semibold tracking-[-0.01em] text-slate-100">{title}</h2>
      </div>
      {trailing}
    </div>
  );
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  return <span className={`rounded-full border px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-wide ${severityStyles[severity]}`}>{severity}</span>;
}

export function formatTime(timestamp: string) {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC", hour12: false }).format(new Date(timestamp));
}

export function formatDateTime(timestamp: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC", hour12: false }).format(new Date(timestamp));
}
