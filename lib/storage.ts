const STORAGE_KEY = "hoshizu_v1";
const STORAGE_VERSION = 1;

export interface QuizResult {
  readonly answers: readonly number[];
  readonly score: number;
  readonly total: number;
  readonly completedAt: number;
}

export interface CertificateInfo {
  readonly userName: string;
  readonly completedAt: number;
  readonly courseTitle: string;
}

interface ProgressData {
  readonly completedLessons: Readonly<Record<string, readonly string[]>>;
  readonly lastVisited: {
    readonly courseId: string;
    readonly lessonSlug: string;
    readonly timestamp: number;
  } | null;
}

interface QuizData {
  readonly results: Readonly<Record<string, QuizResult>>;
}

interface CertificateData {
  readonly certificates: Readonly<Record<string, CertificateInfo>>;
}

interface StorageSchema {
  readonly version: number;
  readonly progress: ProgressData;
  readonly quiz: QuizData;
  readonly certificate: CertificateData;
}

function createEmpty(): StorageSchema {
  return {
    version: STORAGE_VERSION,
    progress: { completedLessons: {}, lastVisited: null },
    quiz: { results: {} },
    certificate: { certificates: {} },
  };
}

function isServer(): boolean {
  return typeof window === "undefined";
}

function read(): StorageSchema {
  if (isServer()) return createEmpty();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmpty();

    const parsed = JSON.parse(raw) as StorageSchema;
    if (parsed.version !== STORAGE_VERSION) {
      return migrate(parsed);
    }
    return parsed;
  } catch {
    return createEmpty();
  }
}

function write(data: StorageSchema): void {
  if (isServer()) return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

function migrate(_old: StorageSchema): StorageSchema {
  // Future migrations go here
  return createEmpty();
}

// --- Progress ---

export function getProgress(): ProgressData {
  return read().progress;
}

export function isLessonComplete(
  courseId: string,
  lessonSlug: string,
): boolean {
  const { completedLessons } = read().progress;
  return completedLessons[courseId]?.includes(lessonSlug) ?? false;
}

export function markLessonComplete(
  courseId: string,
  lessonSlug: string,
): ProgressData {
  const data = read();
  const existing = data.progress.completedLessons[courseId] ?? [];

  if (existing.includes(lessonSlug)) return data.progress;

  const updated: StorageSchema = {
    ...data,
    progress: {
      ...data.progress,
      completedLessons: {
        ...data.progress.completedLessons,
        [courseId]: [...existing, lessonSlug],
      },
    },
  };
  write(updated);
  return updated.progress;
}

export function unmarkLessonComplete(
  courseId: string,
  lessonSlug: string,
): ProgressData {
  const data = read();
  const existing = data.progress.completedLessons[courseId] ?? [];

  const updated: StorageSchema = {
    ...data,
    progress: {
      ...data.progress,
      completedLessons: {
        ...data.progress.completedLessons,
        [courseId]: existing.filter((s) => s !== lessonSlug),
      },
    },
  };
  write(updated);
  return updated.progress;
}

export function getCourseCompletionPercent(
  courseId: string,
  totalLessons: number,
): number {
  if (totalLessons === 0) return 0;
  const completed = read().progress.completedLessons[courseId] ?? [];
  return Math.round((completed.length / totalLessons) * 100);
}

export function getLastVisited(): ProgressData["lastVisited"] {
  return read().progress.lastVisited;
}

export function setLastVisited(courseId: string, lessonSlug: string): void {
  const data = read();
  const updated: StorageSchema = {
    ...data,
    progress: {
      ...data.progress,
      lastVisited: { courseId, lessonSlug, timestamp: Date.now() },
    },
  };
  write(updated);
}

// --- Quiz ---

export function getQuizResult(
  courseId: string,
  lessonSlug: string,
): QuizResult | null {
  const key = `${courseId}/${lessonSlug}`;
  return read().quiz.results[key] ?? null;
}

export function saveQuizResult(
  courseId: string,
  lessonSlug: string,
  result: QuizResult,
): void {
  const data = read();
  const key = `${courseId}/${lessonSlug}`;
  const updated: StorageSchema = {
    ...data,
    quiz: {
      ...data.quiz,
      results: { ...data.quiz.results, [key]: result },
    },
  };
  write(updated);
}

// --- Certificate ---

export function getCertificate(courseId: string): CertificateInfo | null {
  return read().certificate.certificates[courseId] ?? null;
}

export function saveCertificate(
  courseId: string,
  info: CertificateInfo,
): void {
  const data = read();
  const updated: StorageSchema = {
    ...data,
    certificate: {
      ...data.certificate,
      certificates: { ...data.certificate.certificates, [courseId]: info },
    },
  };
  write(updated);
}
