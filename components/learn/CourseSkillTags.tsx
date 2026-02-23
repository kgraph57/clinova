import { Tag } from "lucide-react";

interface CourseSkillTagsProps {
  readonly skills: readonly string[];
}

export function CourseSkillTags({ skills }: CourseSkillTagsProps) {
  if (skills.length === 0) return null;

  return (
    <section className="my-10">
      <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wide">
        <Tag className="h-4 w-4 text-muted-foreground" />
        習得スキル
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
