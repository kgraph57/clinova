import { cn } from "@/lib/utils"

interface CaseStudyProps {
  title: string
  year?: string | number
  jurisdiction?: string
  tags?: string[]
  children: React.ReactNode
}

const JURISDICTION_ACCENT: Record<string, string> = {
  "日本": "border-l-rose-600/50 dark:border-l-rose-400/50",
  "米国": "border-l-blue-600/50 dark:border-l-blue-400/50",
  "EU": "border-l-indigo-600/50 dark:border-l-indigo-400/50",
  "国際": "border-l-amber-600/50 dark:border-l-amber-400/50",
}

const DEFAULT_ACCENT = "border-l-stone-500/50 dark:border-l-stone-400/50"

export function CaseStudy({
  title,
  year,
  jurisdiction,
  tags,
  children,
}: CaseStudyProps) {
  const accent = jurisdiction
    ? JURISDICTION_ACCENT[jurisdiction] ?? DEFAULT_ACCENT
    : DEFAULT_ACCENT

  return (
    <div
      className={cn(
        "my-8 rounded-2xl border-l-[3px] bg-muted/40 p-5 sm:p-6",
        accent
      )}
    >
      <div className="mb-3">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
          <span className="font-medium uppercase tracking-wide">
            Case Study
          </span>
          {jurisdiction ? <span>/ {jurisdiction}</span> : null}
          {year ? <span>/ {year}</span> : null}
        </div>
        <h4 className="mt-1 text-base font-semibold leading-snug text-foreground">
          {title}
        </h4>
        {tags && tags.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="prose text-sm leading-relaxed [&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}
