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

const fieldClass = "filter-control type-instrument h-9 px-3 text-ink outline-none transition hover:border-rule-strong";

export function Filters({ query, category, severity, timeRange, resultCount, onQueryChange, onCategoryChange, onSeverityChange, onTimeRangeChange, onReset }: FiltersProps) {
  return (
    <section aria-label="Incident filters" className="filter-bar px-4 pb-3 lg:px-6">
      <div className="mx-auto flex max-w-[1920px] flex-wrap items-center gap-2">
        <label className="min-w-[200px] flex-1 md:max-w-xs">
          <span className="sr-only">Search incidents</span>
          <input className={`${fieldClass} w-full`} type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search reports…" />
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
        <button type="button" onClick={onReset} className="type-instrument h-9 px-3 font-medium text-muted transition hover:text-ink">Reset</button>
        <p aria-live="polite" className="type-instrument ml-auto flex h-9 items-center text-muted">
          <strong className="mr-1 font-mono font-medium text-ink">{resultCount}</strong> reports
        </p>
      </div>
    </section>
  );
}
