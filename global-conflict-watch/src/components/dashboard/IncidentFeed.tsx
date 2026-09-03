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
      <PanelHeading eyebrow="Monitoring stream" title="Incident feed" trailing={<span className="rounded-full bg-white/[0.055] px-2 py-1 font-mono text-[9px] text-slate-400">UTC</span>} />
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-2">
        {incidents.length === 0 ? (
          <div className="flex h-52 flex-col items-center justify-center px-6 text-center" role="status">
            <span className="text-2xl text-slate-600">⌁</span>
            <p className="mt-3 text-sm font-medium text-slate-300">No matching incidents</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">Adjust or reset the filters to restore the demo feed.</p>
          </div>
        ) : incidents.map((incident, index) => {
          const selected = incident.id === selectedId;
          return (
            <article key={incident.id} className={`feed-row my-0.5 overflow-hidden rounded-xl transition ${selected ? "is-selected" : ""}`}>
              <button type="button" onClick={() => onSelect(incident.id)} aria-pressed={selected} className="w-full px-3 py-3 text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-cyan-300">
                <div className="flex items-center gap-2">
                  <span className="w-5 font-mono text-[9px] text-slate-600">{String(index + 1).padStart(2, "0")}</span>
                  <SeverityBadge severity={incident.severity} />
                  <time dateTime={incident.timestamp} className="ml-auto font-mono text-[10px] text-slate-500">{formatTime(incident.timestamp)}Z</time>
                </div>
                <h3 className={`mt-2.5 text-[13px] font-medium leading-[1.42] ${selected ? "text-white" : "text-slate-200"}`}>{incident.title}</h3>
                <p className="mt-1.5 text-[10px] text-slate-500"><span aria-hidden="true" className="mr-1.5 text-cyan-300/70">●</span>{incident.location}, {incident.country}</p>
                <div className="mt-2 flex items-center justify-between gap-2 text-[9px] text-slate-500">
                  <span>{incident.category}</span>
                  <span>{incident.verification} · {incident.confidence}</span>
                </div>
              </button>
              {selected && (
                <div className="selected-summary mx-3 mb-3 pt-3">
                  <p className="text-[11px] leading-5 text-slate-400">{incident.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                    {incident.sources.map((source) => (
                      <a key={source.name} href={source.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-cyan-300/75 underline decoration-cyan-300/20 underline-offset-2 hover:text-cyan-200">{source.name} ↗</a>
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
