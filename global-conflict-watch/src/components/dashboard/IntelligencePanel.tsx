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
      <PanelHeading eyebrow="Analyst workspace" title={selected ? (selected.kind === "incident" ? "Selected report" : "Selected tracking asset") : "Intelligence summary"} trailing={<span className="rounded-full bg-cyan-300/10 px-2 py-1 font-mono text-[8px] font-medium text-cyan-200">Demo</span>} />
      <div className="min-h-0 flex-1 overflow-y-auto pb-2">
        {selected ? <SelectionDetails selected={selected} /> : (
          <section className="intro-note mx-4 mb-1 rounded-xl p-3.5">
            <p className="text-xs leading-5 text-slate-400">Select a report or map marker to inspect safe demonstration details and source attribution.</p>
          </section>
        )}

        <section className="insight-section px-4 py-4">
          <h3 className="text-[11px] font-medium text-slate-400">Current result set</h3>
          <div className="metric-strip mt-3 grid grid-cols-3 rounded-xl">
            <Metric value={incidents.length} label="Reports" />
            <Metric value={highPriority} label="High+" accent="text-orange-300" />
            <Metric value={corroborated} label="Corroborated" accent="text-cyan-300" />
          </div>
        </section>

        <section className="insight-section px-4 py-4">
          <h3 className="text-[11px] font-medium text-slate-400">Demo tracking inventory</h3>
          <div className="metric-strip mt-3 grid grid-cols-2 rounded-xl">
            <Metric value={aircraftCount} label="Aircraft" accent="text-amber-300" />
            <Metric value={vesselCount} label="Vessels" accent="text-cyan-300" />
          </div>
          <p className="mt-3 text-[9px] leading-4 text-slate-600">Fictional, generalized, delayed records only. No live operational tracking.</p>
        </section>

        <section className="insight-section px-4 py-4">
          <h3 className="text-[11px] font-medium text-slate-400">Event distribution</h3>
          <div className="mt-3 space-y-2.5">
            {EVENT_CATEGORIES.map((category) => {
              const count = incidents.filter((incident) => incident.category === category).length;
              const percentage = incidents.length ? (count / incidents.length) * 100 : 0;
              return <div key={category}><div className="flex justify-between text-[10px]"><span className="text-slate-400"><span className="mr-2" style={{ color: categoryColors[category] }}>●</span>{category}</span><span className="font-mono text-slate-500">{count}</span></div><div className="mt-1 h-1 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: categoryColors[category] }} /></div></div>;
            })}
          </div>
        </section>

        <section className="insight-section px-4 py-4">
          <h3 className="text-[11px] font-medium text-slate-400">Regional concentration</h3>
          <ol className="mt-3 space-y-2">
            {regionCounts.length ? regionCounts.slice(0, 4).map(([region, count], index) => <li key={region} className="flex items-center gap-3 text-[11px]"><span className="font-mono text-slate-600">0{index + 1}</span><span className="flex-1 text-slate-400">{region}</span><span className="font-mono text-slate-300">{count}</span></li>) : <li className="text-[11px] text-slate-600">No regional data in current selection.</li>}
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
      <section className="selection-details mx-4 mb-1 rounded-xl p-4" aria-live="polite">
        <div className="flex items-center justify-between gap-2"><SeverityBadge severity={incident.severity} /><span className="font-mono text-[9px] text-slate-500">{incident.id}</span></div>
        <h3 className="mt-3 text-base font-semibold leading-snug text-slate-100">{incident.title}</h3>
        <p className="mt-2 text-[11px] text-cyan-200/70">{incident.location} · {incident.country}</p>
        <p className="mt-4 text-xs leading-5 text-slate-400">{incident.summary}</p>
        <DetailGrid rows={[["Category", incident.category], ["Confidence", incident.confidence], ["Verification", incident.verification], ["Observed", `${formatDateTime(incident.timestamp)} UTC`]]} />
        <div className="mt-4">
          <p className="text-[10px] font-medium text-slate-500">Source references</p>
          <ul className="mt-2 space-y-1.5">
            {incident.sources.map((source) => <li key={source.name}><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-cyan-300/75 hover:text-cyan-200">{source.name} <span aria-hidden="true">↗</span></a></li>)}
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
    <section className="selection-details mx-4 mb-1 rounded-xl p-4" aria-live="polite">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-wide text-amber-200">{assetLabel}</span>
        <span className="font-mono text-[9px] text-slate-500">{asset.id}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <strong className="rounded-full bg-cyan-300/10 px-2 py-1 font-mono text-[8px] uppercase tracking-wide text-cyan-200">Generalized position</strong>
        <strong className="rounded-full bg-amber-300/10 px-2 py-1 font-mono text-[8px] uppercase tracking-wide text-amber-200">Delayed demo data</strong>
      </div>
      <h3 className="mt-3 text-base font-semibold leading-snug text-slate-100">{asset.displayName}</h3>
      <p className="mt-2 text-[11px] text-cyan-200/70">{asset.broadArea} · {asset.region}</p>
      <p className="mt-4 text-xs leading-5 text-slate-400">{asset.description}</p>
      <DetailGrid rows={detailRows} />
      <div className="mt-4">
        <p className="text-[10px] font-medium text-slate-500">Illustrative source attribution</p>
        <a href={asset.source.homepageUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-[11px] text-cyan-300/75 hover:text-cyan-200">{asset.source.name} <span aria-hidden="true">↗</span></a>
        <p className="mt-2 text-[9px] leading-4 text-slate-600">Homepage link only. GCW does not call, scrape, or connect to this provider.</p>
      </div>
    </section>
  );
}

function DetailGrid({ rows }: { rows: Array<[string, string]> }) {
  return (
    <dl className="detail-list mt-4">
      {rows.map(([label, value]) => <div key={label} className="flex items-start justify-between gap-4 py-2"><dt className="text-[9px] text-slate-500">{label}</dt><dd className="max-w-[62%] text-right text-[10px] leading-4 text-slate-300">{value}</dd></div>)}
    </dl>
  );
}

function Metric({ value, label, accent = "text-slate-100" }: { value: number; label: string; accent?: string }) {
  return <div className="px-2 py-3 text-center"><div className={`font-mono text-lg font-semibold ${accent}`}>{String(value).padStart(2, "0")}</div><div className="mt-1 text-[8px] text-slate-500">{label}</div></div>;
}
