import { BookOpen } from "lucide-react";

interface KeyTakeawayProps {
  readonly title?: string;
  readonly children: React.ReactNode;
}

export function KeyTakeaway({
  title = "この章のポイント",
  children,
}: KeyTakeawayProps) {
  return (
    <div className="my-8 rounded-2xl border-l-[3px] border-l-emerald-500 bg-[var(--color-warm-sage)] p-5 dark:bg-emerald-950/15">
      <div className="mb-3 flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
          {title}
        </p>
      </div>
      <div className="text-sm leading-relaxed [&>ul]:mt-0 [&>ul]:list-none [&>ul]:pl-0 [&_li]:relative [&_li]:pl-5 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:content-['✓'] [&_li]:before:text-emerald-500">
        {children}
      </div>
    </div>
  );
}
