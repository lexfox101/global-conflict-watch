import type { ThreatLevel } from "@/types/briefing";
import { threatToneClass } from "./ui";

interface ThreatLevelBadgeProps {
  level: ThreatLevel;
  /** Prefix rendered before the level, e.g. "Global". */
  label?: string;
  /**
   * `dot` is the marker used inside list rows: colour only, with the level
   * available to assistive technology. `mark` adds the level as text, for
   * places where the level itself is the subject.
   */
  variant?: "dot" | "mark";
  className?: string;
}

export function ThreatLevelBadge({ level, label, variant = "mark", className = "" }: ThreatLevelBadgeProps) {
  return (
    <span className={`threat-mark ${threatToneClass[level]} ${className}`}>
      {label && variant === "mark" ? <span className="text-muted">{label}</span> : null}
      <span aria-hidden="true" className="threat-dot" />
      <span className={variant === "dot" ? "sr-only" : undefined}>
        <span className="sr-only">Threat level: </span>
        {level}
      </span>
    </span>
  );
}
