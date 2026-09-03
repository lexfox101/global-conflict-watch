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
      <PanelHeading title="Incident feed" />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-2">
        {incidents.length === 0 ? (
          <div className="flex h-52 flex-col items-center justify-center px-6 text-center" role="status">
            <p className="type-instrument font-medium text-muted">No matching incidents</p>
            <p className="type-instrument mt-1 text-muted">Adjust or reset the filters to restore the demo feed.</p>
          </div>
        ) : incidents.map((incident) => {
          const selected = incident.id === selectedId;
          return (
            <article key={incident.id} className={`feed-row my-0.5 overflow-hidden transition ${selected ? "is-selected" : ""}`}>
              <button type="button" onClick={() => onSelect(incident.id)} aria-pressed={selected} className="w-full px-3 py-3 text-left">
                <div className="flex items-center gap-2">
                  <SeverityBadge severity={incident.severity} />
                  <time dateTime={incident.timestamp} className="type-instrument ml-auto text-muted">{formatTime(incident.timestamp)}Z</time>
                </div>
                <h3 className={`type-standfirst is-heading mt-2 ${selected ? "text-ink" : "text-ink-body"}`}>{incident.title}</h3>
                <p className="type-instrument meta-line mt-2 uppercase tracking-[0.1em] text-muted">
                  <span>{incident.category}</span>
                  <span>{incident.location}, {incident.country}</span>
                </p>
              </button>
              {selected && (
                <div className="selected-summary mx-3 mb-3 pt-3">
                  <p className="type-instrument text-muted">{incident.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                    {incident.sources.map((source) => (
                      <a key={source.name} href={source.url} target="_blank" rel="noopener noreferrer" className="link-signal type-instrument">{source.name} ↗</a>
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
