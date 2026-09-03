import { EVENT_CATEGORIES, type Incident } from "@/types/incident";
import { TRACKING_CLASSIFICATION_LABELS, type SelectedTarget } from "@/types/tracking";
import { categoryColors, PanelHeading, SeverityBadge, formatDateTime } from "./ui";

interface IntelligencePanelProps {
  incidents: Incident[];
  selected?: SelectedTarget;
  aircraftCount: number;
  vesselCount: number;
}

export function IntelligencePanel({ incidents, selected, aircraftCount, vesselCount }: IntelligencePanelProps) {
  const regionCounts = Object.entries(incidents.reduce<Record<string, number>>((counts, incident) => {
    counts[incident.region] = (counts[incident.region] ?? 0) + 1;
    return counts;
  }, {})).sort((a, b) => b[1] - a[1]);
  const corroborated = incidents.filter((incident) => incident.verification === "Corroborated").length;
  const highPriority = incidents.filter((incident) => incident.severity === "Critical" || incident.severity === "High").length;

  return (
    <aside className="floating-panel inspector-panel flex min-h-[430px] flex-col overflow-hidden" aria-label="Intelligence summary">
      <PanelHeading eyebrow="Analyst workspace" title={selected ? (selected.kind === "incident" ? "Selected report" : "Selected tracking asset") : "Intelligence summary"} trailing={<span className="pill pill-flag">Demo</span>} />
      <div className="min-h-0 flex-1 overflow-y-auto pb-2">
        {selected ? <SelectionDetails selected={selected} /> : (
          <section className="intro-note mx-4 mb-1 p-3.5">
            <p className="text-xs leading-5 text-paper-dim">Select a report or map marker to see its demonstration details and source attribution.</p>
          </section>
        )}

        <section className="insight-section px-4 py-4">
          <h3 className="eyebrow">Current result set</h3>
          <div className="metric-strip mt-3 grid grid-cols-3">
            <Metric value={incidents.length} label="Reports" />
            <Metric value={highPriority} label="High+" accent="threat-high" />
            <Metric value={corroborated} label="Corroborated" accent="text-paper" />
          </div>
        </section>

        <section className="insight-section px-4 py-4">
          <h3 className="eyebrow">Demo tracking inventory</h3>
          <div className="metric-strip mt-3 grid grid-cols-2">
            <Metric value={aircraftCount} label="Aircraft" accent="text-flag" />
            <Metric value={vesselCount} label="Vessels" accent="text-paper" />
          </div>
          <p className="mt-3 text-[10px] leading-4 text-paper-faint">Fictional records only, generalized and delayed. No live operational tracking.</p>
        </section>

        <section className="insight-section px-4 py-4">
          <h3 className="eyebrow">Event distribution</h3>
          <div className="mt-3 space-y-2.5">
            {EVENT_CATEGORIES.map((category) => {
              const count = incidents.filter((incident) => incident.category === category).length;
              const percentage = incidents.length ? (count / incidents.length) * 100 : 0;
              return <div key={category}><div className="flex justify-between text-[10px]"><span className="text-paper-dim"><span aria-hidden="true" className="mr-2" style={{ color: categoryColors[category] }}>●</span>{category}</span><span className="font-mono text-paper-faint">{count}</span></div><div className="mt-1 h-1 overflow-hidden bg-rule"><div className="h-full" style={{ width: `${percentage}%`, backgroundColor: categoryColors[category] }} /></div></div>;
            })}
          </div>
        </section>

        <section className="insight-section px-4 py-4">
          <h3 className="eyebrow">Regional concentration</h3>
          <ol className="mt-3 space-y-2">
            {regionCounts.length ? regionCounts.slice(0, 4).map(([region, count], index) => <li key={region} className="flex items-center gap-3 text-[11px]"><span className="font-mono text-paper-faint">0{index + 1}</span><span className="flex-1 text-paper-dim">{region}</span><span className="font-mono text-paper">{count}</span></li>) : <li className="text-[11px] text-paper-faint">No regional data in current selection.</li>}
          </ol>
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
        <div className="flex items-center justify-between gap-2"><SeverityBadge severity={incident.severity} /><span className="font-mono text-[9px] text-paper-faint">{incident.id}</span></div>
        <h3 className="headline-item mt-3 text-[16px]">{incident.title}</h3>
        <p className="meta-line mt-2"><span>{incident.location}</span><span>{incident.country}</span></p>
        <p className="mt-4 text-xs leading-5 text-paper-dim">{incident.summary}</p>
        <DetailGrid rows={[["Category", incident.category], ["Confidence", incident.confidence], ["Verification", incident.verification], ["Observed", `${formatDateTime(incident.timestamp)} UTC`]]} />
        <div className="mt-4">
          <p className="eyebrow">Source references</p>
          <ul className="mt-2 space-y-1.5">
            {incident.sources.map((source) => <li key={source.name}><a href={source.url} target="_blank" rel="noopener noreferrer" className="link-signal text-[11px]">{source.name} <span aria-hidden="true">↗</span></a></li>)}
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
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="pill pill-flag">{assetLabel}</span>
        <span className="font-mono text-[9px] text-paper-faint">{asset.id}</span>
      </div>
      <p className="meta-line mt-3 text-flag">
        <span>Generalized position</span>
        <span>Delayed demo data</span>
      </p>
      <h3 className="headline-item mt-3 text-[16px]">{asset.displayName}</h3>
      <p className="meta-line mt-2"><span>{asset.broadArea}</span><span>{asset.region}</span></p>
      <p className="mt-4 text-xs leading-5 text-paper-dim">{asset.description}</p>
      <DetailGrid rows={detailRows} />
      <div className="mt-4">
        <p className="eyebrow">Illustrative source attribution</p>
        <a href={asset.source.homepageUrl} target="_blank" rel="noopener noreferrer" className="link-signal mt-2 inline-block text-[11px]">{asset.source.name} <span aria-hidden="true">↗</span></a>
        <p className="mt-2 text-[10px] leading-4 text-paper-faint">Homepage link only. GCW does not call, scrape, or connect to this provider.</p>
      </div>
    </section>
  );
}

function DetailGrid({ rows }: { rows: Array<[string, string]> }) {
  return (
    <dl className="detail-list mt-4">
      {rows.map(([label, value]) => <div key={label} className="flex items-start justify-between gap-4 py-2"><dt className="text-[10px] text-paper-faint">{label}</dt><dd className="max-w-[62%] text-right text-[11px] leading-4 text-paper-dim">{value}</dd></div>)}
    </dl>
  );
}

function Metric({ value, label, accent = "text-paper" }: { value: number; label: string; accent?: string }) {
  return <div className="px-2 py-3 text-center"><div className={`font-mono text-lg font-semibold ${accent}`}>{String(value).padStart(2, "0")}</div><div className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-paper-faint">{label}</div></div>;
}
