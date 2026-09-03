"use client";

import { useEffect, useRef, useState } from "react";
import type { GeoJSONSource, Map as MapLibreMap, Popup, StyleSpecification } from "maplibre-gl";
import type { Incident } from "@/types/incident";
import type { Aircraft, DashboardSelection, LayerVisibility, SelectedTarget, TrackingAsset, Vessel } from "@/types/tracking";
import { TRACKING_CLASSIFICATION_LABELS } from "@/types/tracking";
import { categoryColors } from "./ui";

interface ConflictMapProps {
  incidents: Incident[];
  aircraft?: Aircraft[];
  vessels?: Vessel[];
  visibility?: LayerVisibility;
  selected?: SelectedTarget;
  onSelect?: (selection: DashboardSelection) => void;
  onToggleLayer?: (layer: keyof LayerVisibility) => void;
  /**
   * Read-only overview for the homepage: incident markers only, no layer
   * controls, no selection and no camera animation. `/map` uses the default.
   */
  presentation?: boolean;
}

/** Module-level so the defaults keep a stable identity across renders. */
const NO_AIRCRAFT: Aircraft[] = [];
const NO_VESSELS: Vessel[] = [];
const ALL_LAYERS: LayerVisibility = { incidents: true, aircraft: true, vessels: true };
const INCIDENTS_ONLY: LayerVisibility = { incidents: true, aircraft: false, vessels: false };

const BASEMAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    "carto-light": {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
        "https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      maxzoom: 20,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    },
  },
  layers: [{ id: "basemap", type: "raster", source: "carto-light", minzoom: 0, maxzoom: 20 }],
};

/** Camera moves are the only motion the map produces; readers who opt out get none. */
function motionDuration(milliseconds: number) {
  if (typeof window === "undefined") return milliseconds;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : milliseconds;
}

function incidentsToGeoJSON(incidents: Incident[]) {
  return {
    type: "FeatureCollection" as const,
    features: incidents.map((incident) => ({
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: incident.coordinates },
      properties: { id: incident.id, category: incident.category, severity: incident.severity },
    })),
  };
}

function assetsToGeoJSON(assets: TrackingAsset[]) {
  return {
    type: "FeatureCollection" as const,
    features: assets.map((asset) => ({
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: asset.coordinates },
      properties: { id: asset.id, classification: asset.classification },
    })),
  };
}

export function ConflictMap({
  incidents,
  aircraft = NO_AIRCRAFT,
  vessels = NO_VESSELS,
  visibility = ALL_LAYERS,
  selected,
  onSelect,
  onToggleLayer,
  presentation = false,
}: ConflictMapProps) {
  const layers = presentation ? INCIDENTS_ONLY : visibility;
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const popupRef = useRef<Popup | null>(null);
  const incidentsRef = useRef(incidents);
  const aircraftRef = useRef(aircraft);
  const vesselsRef = useRef(vessels);
  const onSelectRef = useRef(onSelect);
  const presentationRef = useRef(presentation);
  const maplibreRef = useRef<typeof import("maplibre-gl") | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    incidentsRef.current = incidents;
    aircraftRef.current = aircraft;
    vesselsRef.current = vessels;
    presentationRef.current = presentation;
  }, [aircraft, incidents, presentation, vessels]);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    let cancelled = false;
    let loadTimer: ReturnType<typeof setTimeout> | undefined;

    async function initializeMap() {
      if (!containerRef.current) return;
      try {
        const maplibregl = await import("maplibre-gl");
        if (cancelled || !containerRef.current) return;
        maplibreRef.current = maplibregl;
        const map = new maplibregl.Map({
          container: containerRef.current,
          style: BASEMAP_STYLE,
          center: [12, 18],
          zoom: 1.25,
          minZoom: 1,
          maxZoom: 9,
          attributionControl: false,
          scrollZoom: !presentationRef.current,
          dragRotate: !presentationRef.current,
        });
        mapRef.current = map;
        map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
        map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");
        map.on("error", () => { if (!cancelled) setMapError(true); });
        map.once("load", () => {
          if (cancelled) return;
          if (loadTimer) clearTimeout(loadTimer);
          map.addSource("incidents", { type: "geojson", data: incidentsToGeoJSON(incidentsRef.current) });
          map.addSource("aircraft", { type: "geojson", data: assetsToGeoJSON(aircraftRef.current) });
          map.addSource("vessels", { type: "geojson", data: assetsToGeoJSON(vesselsRef.current) });
          if (presentationRef.current) {
            // Uniform, flat markers: the homepage map is a picture of the day, not an instrument.
            map.addLayer({
              id: "incident-points",
              type: "circle",
              source: "incidents",
              paint: {
                "circle-radius": 4,
                "circle-color": "#8f0e22",
                "circle-stroke-color": "#ffffff",
                "circle-stroke-width": 1,
                "circle-opacity": 0.9,
              },
            });
          } else {
            map.addLayer({
              id: "incident-points",
              type: "circle",
              source: "incidents",
              paint: {
                "circle-radius": ["interpolate", ["linear"], ["zoom"], 1, 5, 5, 8],
                "circle-color": ["match", ["get", "category"], "Armed conflict", categoryColors["Armed conflict"], "Air activity", categoryColors["Air activity"], "Civil unrest", categoryColors["Civil unrest"], "Maritime", categoryColors.Maritime, "Cyber", categoryColors.Cyber, "Humanitarian", categoryColors.Humanitarian, "#67675f"],
                "circle-stroke-color": "#ffffff",
                "circle-stroke-width": 1.5,
                "circle-opacity": 0.95,
              },
            });
          }
          map.addLayer({
            id: "aircraft-points",
            type: "circle",
            source: "aircraft",
            paint: {
              "circle-radius": ["interpolate", ["linear"], ["zoom"], 1, 7, 5, 10],
              "circle-color": ["match", ["get", "classification"], "government-state", "#5b4f8c", "humanitarian", "#2f6b56", "#8a6a11"],
              "circle-stroke-color": "#ffffff",
              "circle-stroke-width": 3,
              "circle-opacity": 0.95,
            },
          });
          map.addLayer({ id: "aircraft-core", type: "circle", source: "aircraft", paint: { "circle-radius": 2, "circle-color": "#ffffff" } });
          map.addLayer({
            id: "vessel-points",
            type: "circle",
            source: "vessels",
            paint: {
              "circle-radius": ["interpolate", ["linear"], ["zoom"], 1, 7, 5, 10],
              "circle-color": "rgba(255,255,255,0.92)",
              "circle-stroke-color": ["match", ["get", "classification"], "government-state", "#5b4f8c", "humanitarian", "#2f6b56", "#2f5f7a"],
              "circle-stroke-width": 3,
            },
          });
          map.addLayer({ id: "vessel-core", type: "circle", source: "vessels", paint: { "circle-radius": 2.5, "circle-color": "#16160f" } });
          ["incidents", "aircraft", "vessels"].forEach((source) => {
            map.addLayer({
              id: `${source}-selection`,
              type: "circle",
              source,
              filter: ["==", ["get", "id"], ""],
              paint: { "circle-radius": 14, "circle-color": "rgba(179,18,43,0.12)", "circle-stroke-color": "#16160f", "circle-stroke-width": 2 },
            });
          });
          if (!presentationRef.current) {
            const selectableLayers = ["incident-points", "aircraft-points", "vessel-points"];
            selectableLayers.forEach((layer) => {
              map.on("mouseenter", layer, () => { map.getCanvas().style.cursor = "pointer"; });
              map.on("mouseleave", layer, () => { map.getCanvas().style.cursor = ""; });
            });
            map.on("click", "incident-points", (event) => {
              const id = event.features?.[0]?.properties?.id;
              if (typeof id === "string") onSelectRef.current?.({ kind: "incident", id });
            });
            map.on("click", "aircraft-points", (event) => {
              const id = event.features?.[0]?.properties?.id;
              if (typeof id === "string") onSelectRef.current?.({ kind: "aircraft", id });
            });
            map.on("click", "vessel-points", (event) => {
              const id = event.features?.[0]?.properties?.id;
              if (typeof id === "string") onSelectRef.current?.({ kind: "vessel", id });
            });
          }
          setMapReady(true);
          setMapError(false);
        });
        loadTimer = setTimeout(() => { if (!map.loaded()) setMapError(true); }, 10000);
      } catch {
        setMapError(true);
      }
    }

    initializeMap();
    return () => {
      cancelled = true;
      if (loadTimer) clearTimeout(loadTimer);
      popupRef.current?.remove();
      mapRef.current?.remove();
      popupRef.current = null;
      mapRef.current = null;
      maplibreRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const maplibregl = maplibreRef.current;
    if (!mapReady || !map || !maplibregl) return;
    (map.getSource("incidents") as GeoJSONSource).setData(incidentsToGeoJSON(incidents));
    (map.getSource("aircraft") as GeoJSONSource).setData(assetsToGeoJSON(aircraft));
    (map.getSource("vessels") as GeoJSONSource).setData(assetsToGeoJSON(vessels));

    const visibleCoordinates = [
      ...(layers.incidents ? incidents.map((incident) => incident.coordinates) : []),
      ...(layers.aircraft ? aircraft.map((asset) => asset.coordinates) : []),
      ...(layers.vessels ? vessels.map((asset) => asset.coordinates) : []),
    ];
    if (visibleCoordinates.length === 0) return;
    const bounds = new maplibregl.LngLatBounds();
    visibleCoordinates.forEach((coordinates) => bounds.extend(coordinates));
    const padding = presentation
      ? { top: 44, bottom: 56, left: 44, right: 44 }
      : window.innerWidth >= 1280
        ? { top: 82, bottom: 70, left: 390, right: 400 }
        : { top: 80, bottom: 64, left: 56, right: 56 };
    map.fitBounds(bounds, {
      padding,
      maxZoom: presentation ? 2.8 : visibleCoordinates.length === 1 ? 4 : 3.4,
      duration: presentation ? 0 : motionDuration(650),
    });
  }, [aircraft, incidents, layers, mapReady, presentation, vessels]);

  useEffect(() => {
    const map = mapRef.current;
    if (!mapReady || !map) return;
    const layersByGroup: Record<keyof LayerVisibility, string[]> = {
      incidents: ["incident-points", "incidents-selection"],
      aircraft: ["aircraft-points", "aircraft-core", "aircraft-selection"],
      vessels: ["vessel-points", "vessel-core", "vessels-selection"],
    };
    Object.entries(layersByGroup).forEach(([group, layerIds]) => {
      layerIds.forEach((layerId) => map.setLayoutProperty(layerId, "visibility", layers[group as keyof LayerVisibility] ? "visible" : "none"));
    });
  }, [layers, mapReady]);

  useEffect(() => {
    const map = mapRef.current;
    const maplibregl = maplibreRef.current;
    if (!mapReady || !map || !maplibregl) return;
    map.setFilter("incidents-selection", ["==", ["get", "id"], selected?.kind === "incident" ? selected.item.id : ""]);
    map.setFilter("aircraft-selection", ["==", ["get", "id"], selected?.kind === "aircraft" ? selected.item.id : ""]);
    map.setFilter("vessels-selection", ["==", ["get", "id"], selected?.kind === "vessel" ? selected.item.id : ""]);
    popupRef.current?.remove();
    popupRef.current = null;
    if (!selected) return;

    const coordinates = selected.item.coordinates;
    map.flyTo({ center: coordinates, zoom: Math.max(map.getZoom(), 3.4), duration: motionDuration(900), essential: true });
    const content = document.createElement("div");
    content.className = "gcw-popup";
    const label = document.createElement("span");
    const title = document.createElement("strong");
    const location = document.createElement("small");
    if (selected.kind === "incident") {
      label.textContent = `${selected.item.severity} · ${selected.item.category}`;
      title.textContent = selected.item.title;
      location.textContent = `${selected.item.location}, ${selected.item.country}`;
    } else {
      label.textContent = `${selected.kind} · ${TRACKING_CLASSIFICATION_LABELS[selected.item.classification]}`;
      title.textContent = selected.item.displayName;
      location.textContent = `${selected.item.broadArea} · GENERALIZED · ${selected.item.delayMinutes} min delay`;
    }
    content.append(label, title, location);
    popupRef.current = new maplibregl.Popup({ offset: 16, closeButton: true, closeOnClick: false })
      .setLngLat(coordinates)
      .setDOMContent(content)
      .addTo(map);
  }, [selected, mapReady]);

  return (
    <section
      className="map-canvas relative min-h-[440px] overflow-hidden"
      aria-label={presentation ? "Map of the demonstration incidents in this edition" : "Interactive incidents and tracking map"}
    >
      <div ref={containerRef} className="absolute inset-0 bg-surface-sunken" />
      {presentation ? null : (
        <div className="map-layer-control absolute top-3 max-w-[calc(100%-5rem)] p-1.5">
          <div className="flex flex-wrap gap-1" aria-label="Map layer visibility controls">
            {([
              { key: "incidents", label: "Incidents", count: incidents.length, symbol: "●" },
              { key: "aircraft", label: "Aircraft", count: aircraft.length, symbol: "⊙" },
              { key: "vessels", label: "Vessels", count: vessels.length, symbol: "◎" },
            ] as const).map((layer) => (
              <button
                key={layer.key}
                type="button"
                aria-pressed={layers[layer.key]}
                aria-label={`${layers[layer.key] ? "Hide" : "Show"} ${layer.label.toLowerCase()} layer`}
                onClick={() => onToggleLayer?.(layer.key)}
                className={`layer-pill type-instrument px-2.5 py-1.5 font-medium transition ${layers[layer.key] ? "is-active text-ink" : "text-muted"}`}
              >
                <span aria-hidden="true" className="mr-1.5 text-signal">{layer.symbol}</span>{layer.label} <strong className="ml-0.5 font-mono font-medium">{layers[layer.key] ? layer.count : 0}</strong>
              </button>
            ))}
          </div>
          <p aria-live="polite" className="sr-only">
            {layers.incidents ? incidents.length : 0} reports, {layers.aircraft ? aircraft.length : 0} aircraft, and {layers.vessels ? vessels.length : 0} vessels visible.
          </p>
        </div>
      )}
      {!mapReady && !mapError && <div role="status" className="map-status type-instrument absolute bottom-4 left-4 px-3 py-2 text-muted">Loading basemap…</div>}
      {mapError && (
        <div role="status" className="map-status type-instrument absolute bottom-4 left-4 max-w-xs px-3 py-2 text-flag">
          {presentation
            ? "Basemap tiles are currently unavailable. The briefing and summary remain readable; retry when network access is restored."
            : "Basemap tiles are currently unavailable. Feed and analysis remain usable; retry when network access is restored."}
        </div>
      )}
    </section>
  );
}
