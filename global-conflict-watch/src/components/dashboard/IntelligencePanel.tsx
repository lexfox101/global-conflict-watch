import { EVENT_CATEGORIES, type Incident } from "@/types/incident";
import { TRACKING_CLASSIFICATION_LABELS, type SelectedTarget } from "@/types/tracking";
import { categoryColors, PanelHeading, SeverityBadge, formatDateTime } from "./ui";

interface IntelligencePanelProps {
  incidents: Incident[];
  selected?: SelectedTarget;
}

export function IntelligencePanel({ incidents, selected }: IntelligencePanelProps) {
  const corroborated = incidents.filter((incident) => incident.verification === "Corroborated").length;
  const highPriority = incidents.filter((incident) => incident.severity === "Critical" || incident.severity === "High").length;

  return (
    <aside className="floating-panel inspector-panel flex min-h-[430px] flex-col overflow-hidden" aria-label="Intelligence summary">
      <PanelHeading title={selected ? (selected.kind === "incident" ? "Selected report" : "Selected tracking asset") : "Intelligence summary"} />
      <div className="min-h-0 flex-1 overflow-y-auto pb-2">
        {selected ? <SelectionDetails selected={selected} /> : (
          <section className="intro-note mx-4 mb-1 p-3.5">
            <p className="type-instrument text-muted">Select a report or map marker to see its demonstration details and source attribution.</p>
          </section>
        )}

        <section className="insight-section px-4 py-4">
          <h3 className="type-instrument uppercase tracking-[0.1em] text-muted">Current result set</h3>
          <div className="metric-strip mt-3 grid grid-cols-2">
            <Metric value={highPriority} label="High+" accent="threat-high" />
            <Metric value={corroborated} label="Corroborated" accent="text-ink" />
          </div>
          <p className="type-instrument mt-3 text-muted">Fictional records only, generalized and delayed. No live operational tracking.</p>
        </section>

        <section className="insight-section px-4 py-4">
          <h3 className="type-instrument uppercase tracking-[0.1em] text-muted">Event distribution</h3>
          <div className="mt-3 space-y-2.5">
            {EVENT_CATEGORIES.map((category) => {
              const count = incidents.filter((incident) => incident.category === category).length;
              const percentage = incidents.length ? (count / incidents.length) * 100 : 0;
              return <div key={category}><div className="type-instrument flex justify-between"><span className="text-muted"><span aria-hidden="true" className="mr-2" style={{ color: categoryColors[category] }}>●</span>{category}</span><span className="text-muted">{count}</span></div><div className="mt-1 h-1 overflow-hidden bg-rule"><div className="h-full" style={{ width: `${percentage}%`, backgroundColor: categoryColors[category] }} /></div></div>;
            })}
          </div>
        </section>
      </div>
    </aside>
  );
}

function SelectionDetails({ selected }: { selected: SelectedTarget }) {
  if (selected.kind === "incident") {
    const incident = selected.item;
    return (
      <section className="selection-details mx-4 mb-1 p-4" aria-live="polite">
        <div className="flex items-center justify-between gap-2"><SeverityBadge severity={incident.severity} /><span className="type-instrument text-muted">{incident.id}</span></div>
        <h3 className="type-standfirst is-heading mt-3">{incident.title}</h3>
        <p className="type-instrument meta-line mt-2 uppercase tracking-[0.1em] text-muted"><span>{incident.location}</span><span>{incident.country}</span></p>
        <p className="type-instrument mt-4 text-muted">{incident.summary}</p>
        <DetailGrid rows={[["Category", incident.category], ["Confidence", incident.confidence], ["Verification", incident.verification], ["Observed", `${formatDateTime(incident.timestamp)} UTC`]]} />
        <div className="mt-4">
          <p className="type-instrument uppercase tracking-[0.1em] text-muted">Source references</p>
          <ul className="mt-2 space-y-1.5">
            {incident.sources.map((source) => <li key={source.name}><a href={source.url} target="_blank" rel="noopener noreferrer" className="link-signal type-instrument">{source.name} <span aria-hidden="true">↗</span></a></li>)}
          </ul>
        </div>
      </section>
    );
  }

  const asset = selected.item;
  const assetLabel = asset.kind === "aircraft" ? "Aircraft" : "Vessel";
  const detailRows: Array<[string, string]> = [
    ["Classification", TRACKING_CLASSIFICATION_LABELS[asset.classification]],
    ["Operator category", asset.operatorCategory],
    ["Status", asset.status],
    ["Generalized position", asset.broadArea],
    ["Region", asset.region],
    ["Sample timestamp", `${formatDateTime(asset.timestamp)} UTC`],
    ["Data age / delay", `${asset.delayMinutes} minutes`],
  ];
  if (asset.kind === "aircraft") {
    detailRows.splice(3, 0, ["Altitude band", asset.altitudeBand]);
    if (asset.heading) detailRows.splice(4, 0, ["Broad heading", asset.heading]);
  } else if (asset.flag) {
    detailRows.splice(3, 0, ["Flag", asset.flag]);
  }

  return (
    <section className="selection-details mx-4 mb-1 p-4" aria-live="polite">
      <div className="type-instrument flex flex-wrap items-center justify-between gap-2 uppercase tracking-[0.1em]">
        <span className="text-flag">{assetLabel} · generalized position, delayed demo data</span>
        <span className="text-muted">{asset.id}</span>
      </div>
      <h3 className="type-standfirst is-heading mt-3">{asset.displayName}</h3>
      <p className="type-instrument meta-line mt-2 uppercase tracking-[0.1em] text-muted"><span>{asset.broadArea}</span><span>{asset.region}</span></p>
      <p className="type-instrument mt-4 text-muted">{asset.description}</p>
      <DetailGrid rows={detailRows} />
      <div className="mt-4">
        <p className="type-instrument uppercase tracking-[0.1em] text-muted">Illustrative source attribution</p>
        <a href={asset.source.homepageUrl} target="_blank" rel="noopener noreferrer" className="link-signal type-instrument mt-2 inline-block">{asset.source.name} <span aria-hidden="true">↗</span></a>
        <p className="type-instrument mt-2 text-muted">Homepage link only. GCW does not call, scrape, or connect to this provider.</p>
      </div>
    </section>
  );
}

function DetailGrid({ rows }: { rows: Array<[string, string]> }) {
  return (
    <dl className="detail-list type-instrument mt-4">
      {rows.map(([label, value]) => <div key={label} className="flex items-start justify-between gap-4 py-2"><dt className="text-muted">{label}</dt><dd className="max-w-[62%] text-right text-ink-body">{value}</dd></div>)}
    </dl>
  );
}

function Metric({ value, label, accent = "text-ink" }: { value: number; label: string; accent?: string }) {
  return <div className="px-2 py-3 text-center"><div className={`type-heading font-mono ${accent}`}>{String(value).padStart(2, "0")}</div><div className="type-instrument mt-1 uppercase tracking-[0.1em] text-muted">{label}</div></div>;
}
