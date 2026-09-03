interface SectionHeadingProps {
  title: string;
  description?: string;
  /** Heading level, so the component can slot into any document outline. */
  as?: "h1" | "h2";
  id?: string;
}

/** Section head: one title, one optional standfirst, one hairline. */
export function SectionHeading({ title, description, as: Tag = "h2", id }: SectionHeadingProps) {
  const isPageTitle = Tag === "h1";

  return (
    <div className="border-b border-rule pb-4">
      <Tag id={id} className={isPageTitle ? "type-lead" : "type-heading"}>
        {title}
      </Tag>
      {description ? (
        <p className={`mt-4 max-w-[62ch] ${isPageTitle ? "type-standfirst" : "type-body text-muted"}`}>{description}</p>
      ) : null}
    </div>
  );
}
