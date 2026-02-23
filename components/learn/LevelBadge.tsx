import { Sparkles, TrendingUp, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LEVELS } from "@/lib/constants";

interface LevelBadgeProps {
  readonly level: string;
  readonly size?: "sm" | "md";
}

const ICON_MAP = {
  beginner: Sparkles,
  intermediate: TrendingUp,
  advanced: Crown,
} as const;

export function LevelBadge({ level, size = "sm" }: LevelBadgeProps) {
  const levelConfig = LEVELS.find((l) => l.id === level);
  if (!levelConfig) return null;

  const Icon = ICON_MAP[level as keyof typeof ICON_MAP];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        levelConfig.bgColor,
        levelConfig.darkBgColor,
        levelConfig.color,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
      )}
    >
      {Icon && (
        <Icon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
      )}
      {levelConfig.label}
    </span>
  );
}
