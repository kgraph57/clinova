import { cn } from "@/lib/utils";

const COLOR_MAP = {
  sage: "text-emerald-700 dark:text-emerald-400",
  sky: "text-sky-700 dark:text-sky-400",
  heather: "text-purple-700 dark:text-purple-400",
  sand: "text-amber-700 dark:text-amber-400",
  oat: "text-foreground",
} as const;

interface StatRowProps {
  readonly children: React.ReactNode;
}

interface StatRowItemProps {
  readonly value: string;
  readonly label: string;
  readonly color?: keyof typeof COLOR_MAP;
}

export function StatRow({ children }: StatRowProps) {
  return (
    <div className="my-8 flex flex-wrap items-stretch divide-y rounded-2xl bg-[var(--color-warm-oat)] dark:bg-muted/40 sm:divide-x sm:divide-y-0">
      {children}
    </div>
  );
}

export function StatRowItem({ value, label, color = "oat" }: StatRowItemProps) {
  return (
    <div className="flex flex-1 basis-full flex-col items-center justify-center px-4 py-5 sm:basis-0">
      <p
        className={cn(
          "font-serif text-3xl font-medium tracking-tight",
          COLOR_MAP[color],
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
