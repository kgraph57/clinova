import { AlertTriangle, Info, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"

interface WarningProps {
  children: React.ReactNode
  level?: "high" | "medium" | "low"
}

const LEVEL_CONFIG = {
  high: {
    icon: ShieldAlert,
    classes:
      "border-red-500/30 bg-red-50/50 text-red-800 dark:bg-red-950/20 dark:text-red-200",
    iconClass: "text-red-600 dark:text-red-400",
  },
  medium: {
    icon: AlertTriangle,
    classes:
      "border-amber-500/30 bg-amber-50/50 text-amber-800 dark:bg-amber-950/20 dark:text-amber-200",
    iconClass: "text-amber-600 dark:text-amber-400",
  },
  low: {
    icon: Info,
    classes:
      "border-blue-500/30 bg-blue-50/50 text-blue-800 dark:bg-blue-950/20 dark:text-blue-200",
    iconClass: "text-blue-600 dark:text-blue-400",
  },
} as const

export function Warning({ children, level = "medium" }: WarningProps) {
  const config = LEVEL_CONFIG[level]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-xl border-l-4 p-4 text-[0.84rem] leading-relaxed",
        config.classes,
      )}
    >
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", config.iconClass)} />
      <div>{children}</div>
    </div>
  )
}
