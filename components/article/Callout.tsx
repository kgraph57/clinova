import { ArrowLeftRight, HelpCircle, Info, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalloutProps {
  type?: "info" | "question" | "insight" | "comparison"
  title?: string
  children: React.ReactNode
}

const TYPE_CONFIG = {
  info: {
    icon: Info,
    bg: "bg-blue-50/60 dark:bg-blue-950/20",
    text: "text-blue-900 dark:text-blue-100",
    iconClass: "text-blue-500 dark:text-blue-400",
  },
  question: {
    icon: HelpCircle,
    bg: "bg-violet-50/60 dark:bg-violet-950/20",
    text: "text-violet-900 dark:text-violet-100",
    iconClass: "text-violet-500 dark:text-violet-400",
  },
  insight: {
    icon: Lightbulb,
    bg: "bg-amber-50/60 dark:bg-amber-950/20",
    text: "text-amber-900 dark:text-amber-100",
    iconClass: "text-amber-500 dark:text-amber-400",
  },
  comparison: {
    icon: ArrowLeftRight,
    bg: "bg-emerald-50/60 dark:bg-emerald-950/20",
    text: "text-emerald-900 dark:text-emerald-100",
    iconClass: "text-emerald-500 dark:text-emerald-400",
  },
} as const

export function Callout({ type = "info", title, children }: CalloutProps) {
  const config = TYPE_CONFIG[type]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "my-8 rounded-2xl p-5 text-sm leading-relaxed",
        config.bg,
        config.text
      )}
    >
      <div className="flex gap-3">
        <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", config.iconClass)} />
        <div className="min-w-0 flex-1">
          {title ? (
            <p className="mb-2 font-semibold">{title}</p>
          ) : null}
          <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
