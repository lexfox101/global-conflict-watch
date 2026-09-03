interface ProseProps {
  /** Paragraphs of body copy, rendered at a comfortable reading measure. */
  paragraphs: string[];
  className?: string;
}

export function Prose({ paragraphs, className = "" }: ProseProps) {
  return (
    <div className={`prose-editorial ${className}`}>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
