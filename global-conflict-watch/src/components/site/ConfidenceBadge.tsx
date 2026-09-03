import type { StoryConfidence } from "@/types/briefing";
import { confidenceDescription } from "./ui";

/** Confidence as a metadata word, not a badge. Intended for use inside `.meta-line`. */
export function ConfidenceBadge({ confidence }: { confidence: StoryConfidence }) {
  return (
    <span title={confidenceDescription[confidence]}>
      <span className="sr-only">Confidence: </span>
      {confidence}
    </span>
  );
}
