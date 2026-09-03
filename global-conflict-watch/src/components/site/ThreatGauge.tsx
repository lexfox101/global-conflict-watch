import { THREAT_LEVELS, threatLevelRank, type ThreatLevel } from "@/types/briefing";
import { threatLevelBlurb, threatSegClass } from "./ui";

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
        <p className="text-[13px] font-semibold text-slate-200">{level}</p>
      </div>
      <div className="threat-gauge mt-3" aria-hidden="true">
        {THREAT_LEVELS.map((step, index) => (
          <span key={step} className={`threat-seg ${index <= activeRank ? threatSegClass[level] : ""}`} />
        ))}
      </div>
      <ul className="mt-2 flex justify-between text-[10px] text-slate-500" aria-hidden="true">
        {THREAT_LEVELS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">
        <span className="sr-only">{label}: </span>
        {level} — {threatLevelBlurb[level]}
      </p>
    </div>
  );
}
