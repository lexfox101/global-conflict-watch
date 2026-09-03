import type { StoryConfidence } from "@/types/briefing";
import { confidenceDescription, confidencePillClass } from "./ui";

export function ConfidenceBadge({ confidence }: { confidence: StoryConfidence }) {
  return (
    <span className={`pill ${confidencePillClass[confidence]}`} title={confidenceDescription[confidence]}>
      <span className="sr-only">Confidence: </span>
      {confidence}
    </span>
  );
}
