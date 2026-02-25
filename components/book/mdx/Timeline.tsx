interface TimelineProps {
  readonly title?: string;
  readonly children: React.ReactNode;
}

interface TimelineEventProps {
  readonly date: string;
  readonly title: string;
  readonly badge?: string;
  readonly children?: React.ReactNode;
}

export function Timeline({ title, children }: TimelineProps) {
  return (
    <div className="my-8 rounded-2xl bg-muted/20 p-6 dark:bg-muted/10 sm:p-8">
      {title ? (
        <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
      ) : null}
      <div className="space-y-0">{children}</div>
    </div>
  );
}

export function TimelineEvent({
  date,
  title,
  badge,
  children,
}: TimelineEventProps) {
  return (
    <div className="relative flex gap-4 pb-6 last:pb-0">
      {/* Dot and line */}
      <div className="flex flex-col items-center">
        <div className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-foreground" />
        <div className="mt-1 w-px flex-1 bg-border" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-muted px-3 py-0.5 font-mono text-xs">
            {date}
          </span>
          {badge ? (
            <span className="rounded-full bg-[var(--color-warm-sky)] px-2.5 py-0.5 text-[11px] font-medium dark:bg-sky-950/40">
              {badge}
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-sm font-semibold">{title}</p>
        {children ? (
          <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}
