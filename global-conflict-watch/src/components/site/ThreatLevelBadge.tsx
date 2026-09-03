import type { ThreatLevel } from "@/types/briefing";
import { threatPillClass } from "./ui";

interface ThreatLevelBadgeProps {
  level: ThreatLevel;
  /** Prefix rendered inside the badge, e.g. "Global". */
  label?: string;
  className?: string;
}

export function ThreatLevelBadge({ level, label, className = "" }: ThreatLevelBadgeProps) {
  return (
    <span className={`pill ${threatPillClass[level]} ${className}`}>
      {label ? <span className="opacity-70">{label}</span> : null}
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      <span>
        <span className="sr-only">Threat level: </span>
        {level}
      </span>
    </span>
  );
}
