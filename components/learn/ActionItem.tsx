import { Rocket } from "lucide-react";
import type { ReactNode } from "react";

interface ActionItemProps {
  readonly children: ReactNode;
}

export function ActionItem({ children }: ActionItemProps) {
  return (
    <div className="my-8 rounded-2xl bg-[var(--color-warm-oat)] p-5 dark:bg-muted">
      <div className="flex items-start gap-3">
        <Rocket className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            明日のアクション
          </p>
          <div className="text-sm leading-relaxed text-foreground/80">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
