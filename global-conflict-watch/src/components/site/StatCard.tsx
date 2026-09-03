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
      <p className="font-mono text-[30px] font-semibold leading-none tracking-[-0.03em] text-ink">{value}</p>
      <p className="mt-3 text-[13px] font-semibold text-muted">{label}</p>
      <p className="mt-1.5 text-[12px] leading-relaxed text-faint">{note}</p>
    </div>
  );
}
