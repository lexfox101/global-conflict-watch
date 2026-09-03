import type { ThreatCategory } from "@/types/briefing";

/** Category as a metadata word, not a badge. Intended for use inside `.meta-line`. */
export function CategoryPill({ category }: { category: ThreatCategory }) {
  return (
    <span>
      <span className="sr-only">Category: </span>
      {category}
    </span>
  );
}
