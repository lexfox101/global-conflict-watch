interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Heading level, so the component can slot into any document outline. */
  as?: "h1" | "h2" | "h3";
  id?: string;
  trailing?: React.ReactNode;
}

/** Section head: mono kicker, serif title, hairline rule. */
export function SectionHeading({ eyebrow, title, description, as: Tag = "h2", id, trailing }: SectionHeadingProps) {
  const isPageTitle = Tag === "h1";

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-rule pb-3">
        <div className="min-w-0">
          {eyebrow ? <p className="eyebrow eyebrow-signal">{eyebrow}</p> : null}
          <Tag id={id} className={`mt-2 ${isPageTitle ? "headline-page" : "headline-section"}`}>
            {title}
          </Tag>
        </div>
        {trailing}
      </div>
      {description ? (
        <p className={`mt-4 ${isPageTitle ? "standfirst max-w-[58ch]" : "max-w-[64ch] text-[14px] leading-relaxed text-muted"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
