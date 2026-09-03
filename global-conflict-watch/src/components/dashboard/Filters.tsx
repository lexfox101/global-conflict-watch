import { EVENT_CATEGORIES, SEVERITIES, type EventCategory, type Severity, type TimeRange } from "@/types/incident";

interface FiltersProps {
  query: string;
  category: EventCategory | "all";
  severity: Severity | "all";
  timeRange: TimeRange;
  resultCount: number;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: EventCategory | "all") => void;
  onSeverityChange: (value: Severity | "all") => void;
  onTimeRangeChange: (value: TimeRange) => void;
  onReset: () => void;
}

const fieldClass = "filter-control h-9 rounded-xl bg-white/[0.055] px-3 text-[11px] text-slate-200 outline-none transition hover:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-cyan-300/45";

export function Filters({ query, category, severity, timeRange, resultCount, onQueryChange, onCategoryChange, onSeverityChange, onTimeRangeChange, onReset }: FiltersProps) {
  return (
    <section aria-label="Incident filters" className="filter-bar px-4 pb-3 lg:px-6">
      <div className="mx-auto flex max-w-[1920px] flex-wrap items-center gap-2">
        <label className="min-w-[210px] flex-1 md:max-w-sm">
          <span className="sr-only">Search incidents</span>
          <span className="relative block">
            <span aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">⌕</span>
            <input className={`${fieldClass} w-full pl-8`} type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search reports…" />
          </span>
        </label>
        <label>
          <span className="sr-only">Event category</span>
          <select className={`${fieldClass} min-w-36`} value={category} onChange={(event) => onCategoryChange(event.target.value as EventCategory | "all")}>
            <option value="all">All events</option>
            {EVENT_CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span className="sr-only">Severity</span>
          <select className={`${fieldClass} min-w-28`} value={severity} onChange={(event) => onSeverityChange(event.target.value as Severity | "all")}>
            <option value="all">Any severity</option>
            {SEVERITIES.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span className="sr-only">Time range</span>
          <select className={`${fieldClass} min-w-28`} value={timeRange} onChange={(event) => onTimeRangeChange(event.target.value as TimeRange)}>
            <option value="6h">Last 6h</option>
            <option value="24h">Last 24h</option>
            <option value="72h">Last 72h</option>
            <option value="all">All demo data</option>
          </select>
        </label>
        <button type="button" onClick={onReset} className="h-9 rounded-xl px-3 text-[11px] font-medium text-slate-400 transition hover:bg-white/[0.06] hover:text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Reset</button>
        <div aria-live="polite" className="result-pill ml-auto flex h-9 items-center gap-2 rounded-xl px-3 text-[11px] text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
          <strong className="font-mono font-medium text-cyan-100">{resultCount}</strong> reports
        </div>
      </div>
    </section>
  );
}
