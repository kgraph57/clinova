import { Users } from "lucide-react";

interface CourseTargetAudienceProps {
  readonly targetAudience: readonly string[];
}

export function CourseTargetAudience({
  targetAudience,
}: CourseTargetAudienceProps) {
  if (targetAudience.length === 0) return null;

  return (
    <section className="my-10">
      <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wide">
        <Users className="h-4 w-4 text-muted-foreground" />
        こんな方におすすめ
      </h2>
      <ul className="mt-4 space-y-2">
        {targetAudience.map((audience) => (
          <li
            key={audience}
            className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
            {audience}
          </li>
        ))}
      </ul>
    </section>
  );
}
