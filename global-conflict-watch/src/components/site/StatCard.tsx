interface StatCardProps {
  value: number | string;
  label: string;
  /** Plain statement of what the figure counts, and over what set. */
  note: string;
}

/** Headline counter. The note is required — a number without its definition is not useful. */
export function StatCard({ value, label, note }: StatCardProps) {
  return (
    <div className="flex h-full flex-col border-t border-rule pt-4">
      <p className="type-heading font-mono tracking-[-0.02em]">{value}</p>
      <p className="type-body mt-3 font-semibold text-ink">{label}</p>
      <p className="type-body mt-1 text-muted">{note}</p>
    </div>
  );
}
