"use client";

import { useEffect, useRef, useState } from "react";

const BAR_COLORS = [
  "bg-[hsl(var(--chart-1))]",
  "bg-[hsl(var(--chart-2))]",
  "bg-[hsl(var(--chart-3))]",
  "bg-[hsl(var(--chart-4))]",
  "bg-[hsl(var(--chart-5))]",
] as const;

interface BarChartProps {
  readonly title?: string;
  readonly children: React.ReactNode;
}

interface BarChartBarProps {
  readonly label: string;
  readonly value: number;
  readonly suffix?: string;
  readonly max?: number;
  readonly index?: number;
}

export function BarChart({ title, children }: BarChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
      data-visible={visible}
      className="my-8 rounded-2xl bg-muted/20 p-6 dark:bg-muted/10"
    >
      {title ? (
        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
      ) : null}
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function BarChartBar({
  label,
  value,
  suffix = "",
  max = 100,
  index = 0,
}: BarChartBarProps) {
  const pct = max > 0 ? (Number(value) / Number(max)) * 100 : 0;
  const colorClass = BAR_COLORS[Number(index) % BAR_COLORS.length];

  return (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0 text-right text-sm text-muted-foreground sm:w-36">
        {label}
      </span>
      <div className="relative h-7 flex-1 overflow-hidden rounded-lg bg-muted/50">
        <div
          className={`${colorClass} absolute inset-y-0 left-0 rounded-lg transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-14 shrink-0 text-sm font-medium tabular-nums">
        {value}
        {suffix}
      </span>
    </div>
  );
}
