"use client";

import { useEffect, useRef, useState } from "react";

const BAR_COLORS = [
  "bg-[hsl(var(--chart-1))]",
  "bg-[hsl(var(--chart-2))]",
  "bg-[hsl(var(--chart-3))]",
  "bg-[hsl(var(--chart-4))]",
  "bg-[hsl(var(--chart-5))]",
] as const;

interface BarChartItem {
  readonly label: string;
  readonly value: number;
  readonly suffix?: string;
}

interface BarChartProps {
  readonly title?: string;
  readonly data: readonly BarChartItem[];
  readonly maxValue?: number;
}

export function BarChart({ title, data = [], maxValue }: BarChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  if (data.length === 0) return null;

  const max = maxValue ?? Math.max(...data.map((d) => d.value));

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
        {data.map((item, i) => {
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
                {item.suffix ?? ""}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
