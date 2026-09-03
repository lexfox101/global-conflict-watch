import type { ThreatCategory } from "@/types/briefing";
import { categoryAccent } from "./ui";

export function CategoryPill({ category }: { category: ThreatCategory }) {
  return (
    <span className="pill pill-muted">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: categoryAccent[category] }} />
      <span>
        <span className="sr-only">Category: </span>
        {category}
      </span>
    </span>
  );
}
