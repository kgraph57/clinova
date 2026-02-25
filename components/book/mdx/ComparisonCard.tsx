import { ArrowDown, ArrowRight } from "lucide-react";

interface ComparisonCardProps {
  readonly beforeLabel?: string;
  readonly afterLabel?: string;
  readonly children: React.ReactNode;
}

interface ComparisonSideProps {
  readonly children: React.ReactNode;
}

export function ComparisonCard({
  beforeLabel = "Before",
  afterLabel = "After",
  children,
}: ComparisonCardProps) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border">
      <div className="flex items-center gap-4 border-b bg-muted/30 px-5 py-3">
        <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-950/40 dark:text-red-400">
          {beforeLabel}
        </span>
        <ArrowRight className="hidden h-3.5 w-3.5 text-muted-foreground sm:block" />
        <ArrowDown className="h-3.5 w-3.5 text-muted-foreground sm:hidden" />
        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
          {afterLabel}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
    </div>
  );
}

export function ComparisonBefore({ children }: ComparisonSideProps) {
  return (
    <div className="border-b bg-red-50/30 p-5 text-sm leading-relaxed dark:bg-red-950/5 sm:border-b-0 sm:border-r">
      {children}
    </div>
  );
}

export function ComparisonAfter({ children }: ComparisonSideProps) {
  return (
    <div className="bg-emerald-50/30 p-5 text-sm leading-relaxed dark:bg-emerald-950/5">
      {children}
    </div>
  );
}
