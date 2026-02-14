import { AlertTriangle, Info, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"

interface WarningProps {
  children: React.ReactNode
  level?: "high" | "medium" | "low"
}

const LEVEL_CONFIG = {
  high: {
    icon: ShieldAlert,
    bg: "bg-red-50 dark:bg-red-950/20",
    text: "text-red-800 dark:text-red-200",
    iconClass: "text-red-600 dark:text-red-400",
  },
  medium: {
    icon: AlertTriangle,
    bg: "bg-amber-50 dark:bg-amber-950/20",
    text: "text-amber-800 dark:text-amber-200",
    iconClass: "text-amber-600 dark:text-amber-400",
  },
  low: {
    icon: Info,
    bg: "bg-blue-50 dark:bg-blue-950/20",
    text: "text-blue-800 dark:text-blue-200",
    iconClass: "text-blue-600 dark:text-blue-400",
  },
} as const

export function Warning({ children, level = "medium" }: WarningProps) {
  const config = LEVEL_CONFIG[level]
  const Icon = config.icon

  return (
    <div className={cn("my-8 flex gap-3 rounded-2xl p-5 text-sm leading-relaxed", config.bg, config.text)}>
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", config.iconClass)} />
      <div>{children}</div>
    </div>
  )
}
