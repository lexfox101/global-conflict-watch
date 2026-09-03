import { THREAT_LEVELS, threatLevelRank, type ThreatLevel } from "@/types/briefing";
import { threatLevelBlurb, threatToneClass } from "./ui";

interface ThreatGaugeProps {
  level: ThreatLevel;
  label?: string;
}

/**
 * Segmented indicator for the global threat level. The segments are decorative;
 * the level and its meaning are always available as text.
 */
export function ThreatGauge({ level, label = "Global threat level" }: ThreatGaugeProps) {
  const activeRank = threatLevelRank(level);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow">{label}</p>
        <p className={`threat-mark ${threatToneClass[level]}`}>{level}</p>
      </div>
      <div className={`threat-gauge mt-3 ${threatToneClass[level]}`} aria-hidden="true">
        {THREAT_LEVELS.map((step, index) => (
          <span key={step} className={`threat-seg ${index <= activeRank ? "is-on" : ""}`} />
        ))}
      </div>
      <ul className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-paper-faint" aria-hidden="true">
        {THREAT_LEVELS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
      <p className="mt-3 text-[14px] leading-relaxed text-paper-dim">
        <span className="sr-only">{label}: </span>
        {level} — {threatLevelBlurb[level]}
      </p>
    </div>
  );
}
