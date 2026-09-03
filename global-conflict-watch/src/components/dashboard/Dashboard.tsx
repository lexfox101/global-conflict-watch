"use client";

import { useMemo, useState } from "react";
import type { EventCategory, Incident, Severity, TimeRange } from "@/types/incident";
import type { Aircraft, DashboardSelection, LayerVisibility, SelectedTarget, Vessel } from "@/types/tracking";
import { ConflictMap } from "./ConflictMap";
import { Filters } from "./Filters";
import { IncidentFeed } from "./IncidentFeed";
import { IntelligencePanel } from "./IntelligencePanel";
import { formatDateTime } from "./ui";

interface DashboardProps {
  incidents: Incident[];
  aircraft: Aircraft[];
  vessels: Vessel[];
  lastUpdated: string;
}

const timeRangeHours: Record<Exclude<TimeRange, "all">, number> = { "6h": 6, "24h": 24, "72h": 72 };
const targetKindByLayer: Record<keyof LayerVisibility, DashboardSelection["kind"]> = {
  incidents: "incident",
  aircraft: "aircraft",
  vessels: "vessel",
};

export function Dashboard({ incidents, aircraft, vessels, lastUpdated }: DashboardProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<EventCategory | "all">("all");
  const [severity, setSeverity] = useState<Severity | "all">("all");
  const [timeRange, setTimeRange] = useState<TimeRange>("72h");
  const [selection, setSelection] = useState<DashboardSelection>();
  const [layerVisibility, setLayerVisibility] = useState<LayerVisibility>({ incidents: true, aircraft: true, vessels: true });

  const filteredIncidents = useMemo(() => {
    const latestTimestamp = new Date(lastUpdated).getTime();
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return incidents.filter((incident) => {
      if (category !== "all" && incident.category !== category) return false;
      if (severity !== "all" && incident.severity !== severity) return false;
      if (timeRange !== "all") {
        const elapsedHours = (latestTimestamp - new Date(incident.timestamp).getTime()) / 3_600_000;
        if (elapsedHours > timeRangeHours[timeRange]) return false;
      }
      if (!normalizedQuery) return true;
      return [incident.title, incident.location, incident.country, incident.region, incident.category, incident.summary, incident.verification]
        .join(" ")
        .toLocaleLowerCase()
        .includes(normalizedQuery);
    });
  }, [category, incidents, lastUpdated, query, severity, timeRange]);

  const selected = useMemo<SelectedTarget | undefined>(() => {
    if (!selection) return undefined;
    if (selection.kind === "incident") {
      const item = filteredIncidents.find((incident) => incident.id === selection.id);
      return item ? { kind: "incident", item } : undefined;
    }
    if (selection.kind === "aircraft") {
      const item = aircraft.find((asset) => asset.id === selection.id);
      return item ? { kind: "aircraft", item } : undefined;
    }
    const item = vessels.find((asset) => asset.id === selection.id);
    return item ? { kind: "vessel", item } : undefined;
  }, [aircraft, filteredIncidents, selection, vessels]);

  const clearIncidentSelection = () => {
    setSelection((current) => current?.kind === "incident" ? undefined : current);
  };
  const resetFilters = () => {
    setQuery("");
    setCategory("all");
    setSeverity("all");
    setTimeRange("72h");
    clearIncidentSelection();
  };
  const toggleLayer = (layer: keyof LayerVisibility) => {
    const willBeVisible = !layerVisibility[layer];
    setLayerVisibility((current) => ({ ...current, [layer]: willBeVisible }));
    if (!willBeVisible && selection?.kind === targetKindByLayer[layer]) setSelection(undefined);
  };

  return (
    <div className="dashboard-shell flex min-h-dvh flex-col text-slate-200">
      <header className="app-header shrink-0">
        <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-4 px-4 py-3 lg:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="brand-mark" aria-hidden="true"><span>G</span></div>
            <div className="min-w-0">
              <h1 className="truncate text-[15px] font-semibold tracking-[-0.01em] text-slate-50 sm:text-base">Global Conflict Watch</h1>
              <p className="mt-0.5 hidden text-[11px] text-slate-500 sm:block">Situational awareness · fictional demonstration</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
            <div className="hidden text-right md:block">
              <p className="text-[10px] text-slate-500">Last update</p>
              <time dateTime={lastUpdated} className="mt-0.5 block font-mono text-[10px] text-slate-300">{formatDateTime(lastUpdated)} UTC</time>
            </div>
            <div className="demo-status" title="Fictional demonstration data — not live reporting">
              <span className="status-pulse h-1.5 w-1.5 rounded-full bg-amber-300" />
              <span className="hidden sm:inline">Demonstration data</span><span className="sm:hidden">Demo</span>
            </div>
          </div>
        </div>
        <Filters
          query={query}
          category={category}
          severity={severity}
          timeRange={timeRange}
          resultCount={filteredIncidents.length}
          onQueryChange={(value) => { setQuery(value); clearIncidentSelection(); }}
          onCategoryChange={(value) => { setCategory(value); clearIncidentSelection(); }}
          onSeverityChange={(value) => { setSeverity(value); clearIncidentSelection(); }}
          onTimeRangeChange={(value) => { setTimeRange(value); clearIncidentSelection(); }}
          onReset={resetFilters}
        />
      </header>

      {/* Rendered inside the site layout's <main>, so this is a plain container. */}
      <div className="dashboard-stage w-full flex-1">
        <ConflictMap
          incidents={filteredIncidents}
          aircraft={aircraft}
          vessels={vessels}
          visibility={layerVisibility}
          selected={selected}
          onSelect={setSelection}
          onToggleLayer={toggleLayer}
        />
        <IncidentFeed
          incidents={filteredIncidents}
          selectedId={selected?.kind === "incident" ? selected.item.id : undefined}
          onSelect={(id) => setSelection({ kind: "incident", id })}
        />
        <div className="inspector-overlay min-h-0">
          <IntelligencePanel incidents={filteredIncidents} selected={selected} aircraftCount={aircraft.length} vesselCount={vessels.length} />
        </div>
      </div>

      <footer className="app-footer shrink-0 px-4 py-2 lg:px-6">
        <div className="mx-auto flex max-w-[1920px] flex-col justify-between gap-1 text-[9px] leading-4 text-slate-600 sm:flex-row sm:items-center">
          <p><strong className="font-medium text-slate-500">Methodology:</strong> fictional, generalized, delayed positions; mock corroboration only.</p>
          <p>No live sources or APIs · Basemap © OpenStreetMap © CARTO</p>
        </div>
      </footer>
    </div>
  );
}
