"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 40,
  pauseOnHover = true,
  reverse = false,
  className,
}: MarqueeProps) {
  const duration = `${speed}s`;

  return (
    <div
      className={cn("group relative flex overflow-hidden", className)}
      style={
        {
          "--marquee-duration": duration,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-6 animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          "flex shrink-0 items-center gap-6 animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {children}
      </div>
    </div>
  );
}
