import type { Metadata } from "next";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { DEMO_LAST_UPDATED, incidents } from "@/data/incidents";
import { aircraft, vessels } from "@/data/tracking-assets";

export const metadata: Metadata = {
  title: "Interactive map",
  description:
    "An interactive demonstration dashboard for exploring fictional, generalized global incident and tracking data. No live sources or APIs.",
};

export default function MapPage() {
  return (
    <div className="map-route flex min-h-0 flex-1 flex-col">
      <Dashboard incidents={incidents} aircraft={aircraft} vessels={vessels} lastUpdated={DEMO_LAST_UPDATED} />
    </div>
  );
}
