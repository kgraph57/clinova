"use client";

import { Children, isValidElement, useEffect, useRef, useState } from "react";

const BAR_COLORS = [
  "bg-[hsl(var(--chart-1))]",
  "bg-[hsl(var(--chart-2))]",
  "bg-[hsl(var(--chart-3))]",
  "bg-[hsl(var(--chart-4))]",
  "bg-[hsl(var(--chart-5))]",
] as const;

interface BarChartProps {
  readonly title?: string;
  readonly maxValue?: number;
  readonly children: React.ReactNode;
}

interface BarChartBarProps {
  readonly label: string;
  readonly value: number;
  readonly suffix?: string;
}

interface ParsedBar {
  readonly label: string;
  readonly value: number;
  readonly suffix: string;
}

export function BarChart({ title, maxValue, children }: BarChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const bars: ParsedBar[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement<BarChartBarProps>(child)) {
      bars.push({
        label: child.props.label ?? "",
        value: Number(child.props.value) || 0,
        suffix: child.props.suffix ?? "",
      });
    }
  });

  const max = maxValue ?? Math.max(...bars.map((b) => b.value), 1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (bars.length === 0) return null;

  return (
    <div
      ref={ref}
      className="my-8 rounded-2xl bg-muted/20 p-6 dark:bg-muted/10"
    >
      {title ? (
        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
      ) : null}

      <div className="space-y-3">
        {bars.map((item, i) => {
          const pct = max > 0 ? (item.value / max) * 100 : 0;
          return (
            <div key={i} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-right text-sm text-muted-foreground sm:w-36">
                {item.label}
              </span>
              <div className="relative h-7 flex-1 overflow-hidden rounded-lg bg-muted/50">
                <div
                  className={`${BAR_COLORS[i % BAR_COLORS.length]} absolute inset-y-0 left-0 rounded-lg transition-all duration-700 ease-out`}
                  style={{ width: visible ? `${pct}%` : "0%" }}
                />
              </div>
              <span className="w-14 shrink-0 text-sm font-medium tabular-nums">
                {item.value}
                {item.suffix}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function BarChartBar(_props: BarChartBarProps) {
  return null;
}
