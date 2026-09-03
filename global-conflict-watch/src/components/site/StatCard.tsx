interface StatCardProps {
  value: number | string;
  label: string;
  /** Plain statement of what the figure counts, and over what set. */
  note: string;
}

/** Headline counter. The note is required — a number without its definition is not useful. */
export function StatCard({ value, label, note }: StatCardProps) {
  return (
    <div className="soft-panel flex h-full flex-col p-5">
      <p className="font-mono text-[30px] font-semibold leading-none tracking-[-0.03em] text-slate-50">{value}</p>
      <p className="mt-3 text-[13px] font-semibold text-slate-200">{label}</p>
      <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">{note}</p>
    </div>
  );
}
