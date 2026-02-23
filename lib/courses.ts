import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const COURSES_DIR = path.join(process.cwd(), "content", "courses");

export interface CourseMetadata {
  courseId: string;
  title: string;
  description: string;
  category: string;
  level: string;
  lessonCount: number;
  estimatedTotalMinutes: number;
  order: number;
  free: boolean;
  learningOutcomes: readonly string[];
  prerequisites: readonly string[];
  targetAudience: readonly string[];
  skills: readonly string[];
}

const FREE_COURSES = new Set(["ai-basics", "prompt-engineering-basics"]);

export interface LessonMetadata {
  courseId: string;
  slug: string;
  title: string;
  description: string;
  order: number;
  estimatedMinutes: number;
  estimatedReadTime: number;
}

export interface LessonFull extends LessonMetadata {
  content: string;
}

export interface LessonNavItem {
  slug: string;
  title: string;
  order: number;
}

const LEVEL_FALLBACK: Record<string, string> = {
  "ai-basics": "beginner",
  "generative-ai-basics": "beginner",
  "prompt-engineering-basics": "beginner",
  "machine-learning-fundamentals": "beginner",
  "statistics-basics-medicine": "beginner",
  "medical-ai-overview": "intermediate",
  "medical-data-legal": "intermediate",
  "ai-copyright-ethics": "intermediate",
  "llm-in-medicine": "intermediate",
  "patient-communication-ai": "intermediate",
  "medical-imaging-ai-basics": "intermediate",
  "ai-implementation-framework": "intermediate",
  "medical-ai-ethics": "advanced",
  "ai-bias-fairness": "advanced",
  "diagnostic-support": "advanced",
};

function readCourseMeta(courseId: string): CourseMetadata | null {
  const indexPath = path.join(COURSES_DIR, courseId, "_index.mdx");
  if (!fs.existsSync(indexPath)) return null;

  const raw = fs.readFileSync(indexPath, "utf-8");
  const { data } = matter(raw);

  return {
    courseId,
    title: data.title ?? "",
    description: data.description ?? "",
    category: data.category ?? "",
    level: data.level ?? LEVEL_FALLBACK[courseId] ?? "beginner",
    lessonCount: data.lessonCount ?? 0,
    estimatedTotalMinutes: data.estimatedTotalMinutes ?? 0,
    order: data.order ?? 0,
    free: FREE_COURSES.has(courseId),
    learningOutcomes: data.learningOutcomes ?? [],
    prerequisites: data.prerequisites ?? [],
    targetAudience: data.targetAudience ?? [],
    skills: data.skills ?? [],
  };
}

function readLessonFile(courseId: string, filename: string): LessonFull | null {
  const filePath = path.join(COURSES_DIR, courseId, filename);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const slug = path.basename(filename, ".mdx");
  const stats = readingTime(content);

  return {
    courseId,
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    order: data.order ?? 0,
    estimatedMinutes: data.estimatedMinutes ?? Math.ceil(stats.minutes),
    estimatedReadTime: Math.ceil(stats.minutes),
    content,
  };
}

export function getAllCourses(): CourseMetadata[] {
  if (!fs.existsSync(COURSES_DIR)) return [];

  const dirs = fs
    .readdirSync(COURSES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const courses: CourseMetadata[] = [];
  for (const dir of dirs) {
    const meta = readCourseMeta(dir);
    if (meta) courses.push(meta);
  }

  return courses.sort((a, b) => a.order - b.order);
}

export function getCourseCount(): number {
  return getAllCourses().length;
}

export function getCourseById(courseId: string): CourseMetadata | null {
  return readCourseMeta(courseId);
}

export function getPrerequisiteCourses(courseId: string): CourseMetadata[] {
  const course = readCourseMeta(courseId);
  if (!course || course.prerequisites.length === 0) return [];
  return course.prerequisites
    .map((id) => readCourseMeta(id))
    .filter((c): c is CourseMetadata => c !== null);
}

export function getLessonsForCourse(courseId: string): LessonMetadata[] {
  const courseDir = path.join(COURSES_DIR, courseId);
  if (!fs.existsSync(courseDir)) return [];

  const files = fs
    .readdirSync(courseDir)
    .filter((f) => f.endsWith(".mdx") && f !== "_index.mdx")
    .sort();

  const lessons: LessonMetadata[] = [];
  for (const file of files) {
    const lesson = readLessonFile(courseId, file);
    if (lesson) {
      const { content: _, ...meta } = lesson;
      lessons.push(meta);
    }
  }

  return lessons.sort((a, b) => a.order - b.order);
}

export function getLessonBySlug(
  courseId: string,
  slug: string,
): LessonFull | null {
  return readLessonFile(courseId, `${slug}.mdx`);
}

export function getLessonNavigation(
  courseId: string,
  currentSlug: string,
): { prev: LessonNavItem | null; next: LessonNavItem | null } {
  const lessons = getLessonsForCourse(courseId);
  const idx = lessons.findIndex((l) => l.slug === currentSlug);

  return {
    prev:
      idx > 0
        ? {
            slug: lessons[idx - 1].slug,
            title: lessons[idx - 1].title,
            order: lessons[idx - 1].order,
          }
        : null,
    next:
      idx < lessons.length - 1
        ? {
            slug: lessons[idx + 1].slug,
            title: lessons[idx + 1].title,
            order: lessons[idx + 1].order,
          }
        : null,
  };
}

export function getAllCourseSlugs(): string[] {
  return getAllCourses().map((c) => c.courseId);
}

export function getAllLessonParams(): {
  courseId: string;
  lessonSlug: string;
}[] {
  const params: { courseId: string; lessonSlug: string }[] = [];
  for (const course of getAllCourses()) {
    for (const lesson of getLessonsForCourse(course.courseId)) {
      params.push({ courseId: course.courseId, lessonSlug: lesson.slug });
    }
  }
  return params;
}

const CATEGORY_COURSE_MAP: Record<string, string[]> = {
  "ai-fundamentals": [
    "ai-basics",
    "generative-ai-basics",
    "machine-learning-fundamentals",
    "statistics-basics-medicine",
  ],
  workflow: ["prompt-engineering-basics", "ai-implementation-framework"],
  clinical: [
    "medical-ai-overview",
    "llm-in-medicine",
    "diagnostic-support",
    "patient-communication-ai",
    "medical-imaging-ai-basics",
  ],
  research: ["medical-ai-overview", "statistics-basics-medicine"],
  diagnosis: [
    "medical-ai-overview",
    "diagnostic-support",
    "medical-imaging-ai-basics",
  ],
};

export function getRelatedCourses(knowledgeCategory: string): CourseMetadata[] {
  const courseIds = CATEGORY_COURSE_MAP[knowledgeCategory] ?? [];
  if (courseIds.length === 0) return [];

  return courseIds
    .map((id) => readCourseMeta(id))
    .filter((c): c is CourseMetadata => c !== null);
}
