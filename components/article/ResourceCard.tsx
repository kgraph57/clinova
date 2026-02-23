import { ArrowUpRight, BookOpen, FileText, Globe, Newspaper, Scale } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResourceCardProps {
  type: "paper" | "law" | "guideline" | "news" | "website"
  title: string
  url: string
  description?: string
  authors?: string
  year?: string | number
  source?: string
}

const TYPE_CONFIG = {
  paper: {
    icon: FileText,
    label: "論文",
    accent: "border-l-emerald-600/40 dark:border-l-emerald-400/40",
  },
  law: {
    icon: Scale,
    label: "法令",
    accent: "border-l-sky-600/40 dark:border-l-sky-400/40",
  },
  guideline: {
    icon: BookOpen,
    label: "ガイドライン",
    accent: "border-l-violet-600/40 dark:border-l-violet-400/40",
  },
  news: {
    icon: Newspaper,
    label: "ニュース",
    accent: "border-l-amber-600/40 dark:border-l-amber-400/40",
  },
  website: {
    icon: Globe,
    label: "Web",
    accent: "border-l-stone-500/40 dark:border-l-stone-400/40",
  },
} as const

export function ResourceCard({
  type,
  title,
  url,
  description,
  authors,
  year,
  source,
}: ResourceCardProps) {
  const config = TYPE_CONFIG[type]
  const Icon = config.icon

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group my-6 flex gap-3 rounded-2xl border-l-[3px] bg-muted/50 p-4 no-underline transition-colors hover:bg-muted",
        config.accent
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm font-medium leading-snug text-foreground group-hover:underline group-hover:underline-offset-2">
            {title}
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        {description ? (
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
          <span className="rounded-md bg-muted px-1.5 py-0.5 font-medium">
            {config.label}
          </span>
          {source ? <span>{source}</span> : null}
          {authors ? <span>{authors}</span> : null}
          {year ? <span>({year})</span> : null}
        </div>
      </div>
    </a>
  )
}
