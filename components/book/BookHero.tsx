import { BookOpen, Clock, User } from "lucide-react";

interface BookHeroProps {
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly totalChapters: number;
  readonly estimatedTotalMinutes: number;
}

export function BookHero({
  title,
  description,
  author,
  totalChapters,
  estimatedTotalMinutes,
}: BookHeroProps) {
  const hours = Math.floor(estimatedTotalMinutes / 60);
  const minutes = estimatedTotalMinutes % 60;

  return (
    <div className="mb-16">
      <h1 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {description}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <User className="h-4 w-4" />
          {author}
        </span>
        <span className="flex items-center gap-1.5">
          <BookOpen className="h-4 w-4" />
          {totalChapters}章
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {hours > 0 ? `${hours}時間${minutes > 0 ? `${minutes}分` : ""}` : `${minutes}分`}
        </span>
      </div>

      <div className="mt-10 border-b" />
    </div>
  );
}
