interface LessonProgressProps {
  current: number
  total: number
}

export function LessonProgress({ current, total }: LessonProgressProps) {
  return (
    <span className="text-sm text-muted-foreground">
      レッスン {current} / {total}
    </span>
  )
}
