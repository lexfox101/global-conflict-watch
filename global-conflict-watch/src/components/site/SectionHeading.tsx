interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Heading level, so the component can slot into any document outline. */
  as?: "h1" | "h2" | "h3";
  id?: string;
  trailing?: React.ReactNode;
}

export function SectionHeading({ eyebrow, title, description, as: Tag = "h2", id, trailing }: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div className="min-w-0">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <Tag id={id} className="mt-2 text-balance text-[22px] font-semibold tracking-[-0.02em] text-slate-50 sm:text-[26px]">
          {title}
        </Tag>
        {description ? <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-slate-400">{description}</p> : null}
      </div>
      {trailing}
    </div>
  );
}
