import { AlertTriangle } from "lucide-react"

interface WarningProps {
  children: React.ReactNode
  level?: "high" | "medium" | "low"
}

export function Warning({ children, level = "medium" }: WarningProps) {
  const colors = {
    high: "border-red-500 bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-200",
    medium:
      "border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-200",
    low: "border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950/30 dark:text-blue-200",
  }

  return (
    <div
      className={`my-6 flex gap-3 rounded-lg border-l-4 p-4 text-sm ${colors[level]}`}
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <div>{children}</div>
    </div>
  )
}
