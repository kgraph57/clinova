interface FigureProps {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
  readonly number?: number | string;
  readonly source?: string;
  readonly width?: number;
}

export function Figure({
  src,
  alt,
  caption,
  number,
  source,
  width = 680,
}: FigureProps) {
  return (
    <figure className="my-8">
      <div
        className="mx-auto overflow-hidden rounded-xl border"
        style={{ maxWidth: width }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-auto w-full" loading="lazy" />
      </div>
      <figcaption className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
        {number ? (
          <span className="font-semibold not-italic">Figure {number}. </span>
        ) : null}
        <span className="italic">{caption}</span>
        {source ? (
          <span className="block text-[11px] text-muted-foreground/60">
            出典: {source}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
