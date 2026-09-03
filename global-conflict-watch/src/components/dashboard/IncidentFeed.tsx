import type { Incident } from "@/types/incident";
import { PanelHeading, SeverityBadge, formatTime } from "./ui";

interface IncidentFeedProps {
  incidents: Incident[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function IncidentFeed({ incidents, selectedId, onSelect }: IncidentFeedProps) {
  return (
    <aside className="floating-panel feed-overlay flex min-h-[430px] flex-col overflow-hidden" aria-label="Incident feed">
      <PanelHeading eyebrow="Monitoring stream" title="Incident feed" trailing={<span className="pill pill-muted">UTC</span>} />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-2">
        {incidents.length === 0 ? (
          <div className="flex h-52 flex-col items-center justify-center px-6 text-center" role="status">
            <span className="text-2xl text-paper-faint">⌁</span>
            <p className="mt-3 text-sm font-medium text-paper-dim">No matching incidents</p>
            <p className="mt-1 text-xs leading-5 text-paper-faint">Adjust or reset the filters to restore the demo feed.</p>
          </div>
        ) : incidents.map((incident, index) => {
          const selected = incident.id === selectedId;
          return (
            <article key={incident.id} className={`feed-row my-0.5 overflow-hidden transition ${selected ? "is-selected" : ""}`}>
              <button type="button" onClick={() => onSelect(incident.id)} aria-pressed={selected} className="w-full px-3 py-3 text-left">
                <div className="flex items-center gap-2">
                  <span className="w-5 font-mono text-[9px] text-paper-faint">{String(index + 1).padStart(2, "0")}</span>
                  <SeverityBadge severity={incident.severity} />
                  <time dateTime={incident.timestamp} className="ml-auto font-mono text-[10px] text-paper-faint">{formatTime(incident.timestamp)}Z</time>
                </div>
                <h3 className={`headline-item mt-2.5 text-[15px] ${selected ? "text-paper" : "text-paper-body"}`}>{incident.title}</h3>
                <p className="meta-line mt-2">
                  <span>{incident.location}, {incident.country}</span>
                  <span>{incident.category}</span>
                  <span>{incident.verification}</span>
                  <span>{incident.confidence}</span>
                </p>
              </button>
              {selected && (
                <div className="selected-summary mx-3 mb-3 pt-3">
                  <p className="text-[12px] leading-5 text-paper-dim">{incident.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                    {incident.sources.map((source) => (
                      <a key={source.name} href={source.url} target="_blank" rel="noopener noreferrer" className="link-signal text-[11px]">{source.name} ↗</a>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </aside>
  );
}
