import type { ThreatLevel } from "@/types/briefing";
import { threatToneClass } from "./ui";

interface ThreatLevelBadgeProps {
  level: ThreatLevel;
  /** Prefix rendered before the level, e.g. "Global". */
  label?: string;
  /**
   * `mark` is an unbordered dot and word for use inside a metadata line.
   * `pill` is the bordered chip, kept for standing status indicators.
   */
  variant?: "mark" | "pill";
  className?: string;
}

export function ThreatLevelBadge({ level, label, variant = "mark", className = "" }: ThreatLevelBadgeProps) {
  const base = variant === "pill" ? "pill" : "threat-mark";

  return (
    <span className={`${base} ${threatToneClass[level]} ${className}`}>
      {label ? <span className="text-muted">{label}</span> : null}
      <span aria-hidden="true" className="threat-dot" />
      <span>
        <span className="sr-only">Threat level: </span>
        {level}
      </span>
    </span>
  );
}
