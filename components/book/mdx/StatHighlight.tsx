import { TrendingUp } from "lucide-react";

interface StatHighlightProps {
  readonly value: string;
  readonly label: string;
  readonly source?: string;
  readonly trend?: {
    readonly from: string;
    readonly to: string;
    readonly period: string;
  };
  readonly children?: React.ReactNode;
}

export function StatHighlight({
  value,
  label,
  source,
  trend,
  children,
}: StatHighlightProps) {
  return (
    <div className="my-8 rounded-2xl bg-muted/40 px-6 py-8 text-center dark:bg-muted/20">
      <p className="font-serif text-5xl font-medium tracking-tight text-foreground sm:text-6xl">
        {value}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>

      {trend ? (
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100/60 px-3 py-1 text-xs text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
          <TrendingUp className="h-3 w-3" />
          <span>
            {trend.from} → {trend.to}
          </span>
          <span className="text-emerald-600/60 dark:text-emerald-400/60">
            ({trend.period})
          </span>
        </div>
      ) : null}

      {children ? (
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          {children}
        </p>
      ) : null}

      {source ? (
        <p className="mt-3 text-[11px] text-muted-foreground/60">{source}</p>
      ) : null}
    </div>
  );
}
