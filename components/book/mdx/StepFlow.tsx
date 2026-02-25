interface StepFlowProps {
  readonly title?: string;
  readonly children: React.ReactNode;
}

interface StepFlowStepProps {
  readonly number: number;
  readonly title: string;
  readonly time?: string;
  readonly children?: React.ReactNode;
}

export function StepFlow({ title, children }: StepFlowProps) {
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

export function StepFlowStep({
  number,
  title,
  time,
  children,
}: StepFlowStepProps) {
  return (
    <div className="relative flex gap-4 pb-6 last:pb-0">
      {/* Connecting line */}
      <div className="flex flex-col items-center">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
          {number}
        </div>
        <div className="mt-1 w-px flex-1 bg-border last:hidden" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-2 pt-1">
        <div className="flex items-baseline gap-2">
          <p className="text-base font-semibold">{title}</p>
          {time ? (
            <span className="shrink-0 text-xs text-muted-foreground">
              {time}
            </span>
          ) : null}
        </div>
        {children ? (
          <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}
