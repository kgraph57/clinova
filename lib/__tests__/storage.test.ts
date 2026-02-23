import { describe, it, expect, beforeEach, vi } from "vitest";

const STORAGE_KEY = "hoshizu_v1";

// Mock localStorage before importing the module
const store: Record<string, string> = {};
const localStorageMock = {
  getItem: vi.fn((key: string) => store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => {
    store[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete store[key];
  }),
  clear: vi.fn(() => {
    for (const key of Object.keys(store)) delete store[key];
  }),
  length: 0,
  key: vi.fn(() => null),
};

Object.defineProperty(globalThis, "window", {
  value: { localStorage: localStorageMock },
  writable: true,
});
Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  writable: true,
});

// Dynamic import after mocking
const {
  getProgress,
  isLessonComplete,
  markLessonComplete,
  unmarkLessonComplete,
  getCourseCompletionPercent,
  getLastVisited,
  setLastVisited,
  getQuizResult,
  saveQuizResult,
  getCertificate,
  saveCertificate,
} = await import("../storage");

describe("storage - progress", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it("returns empty progress when no data exists", () => {
    const progress = getProgress();
    expect(progress.completedLessons).toEqual({});
    expect(progress.lastVisited).toBeNull();
  });

  it("marks a lesson as complete", () => {
    markLessonComplete("ai-basics", "lesson-01");
    expect(isLessonComplete("ai-basics", "lesson-01")).toBe(true);
  });

  it("does not duplicate lesson completion", () => {
    markLessonComplete("ai-basics", "lesson-01");
    markLessonComplete("ai-basics", "lesson-01");
    const progress = getProgress();
    const lessons = progress.completedLessons["ai-basics"] ?? [];
    expect(lessons.filter((s) => s === "lesson-01")).toHaveLength(1);
  });

  it("unmarks a lesson", () => {
    markLessonComplete("ai-basics", "lesson-01");
    unmarkLessonComplete("ai-basics", "lesson-01");
    expect(isLessonComplete("ai-basics", "lesson-01")).toBe(false);
  });

  it("reports false for incomplete lessons", () => {
    expect(isLessonComplete("ai-basics", "lesson-99")).toBe(false);
  });
});

describe("storage - completion percent", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it("returns 0 when no lessons completed", () => {
    expect(getCourseCompletionPercent("ai-basics", 8)).toBe(0);
  });

  it("returns 0 when totalLessons is 0", () => {
    expect(getCourseCompletionPercent("ai-basics", 0)).toBe(0);
  });

  it("calculates correct percentage", () => {
    markLessonComplete("ai-basics", "lesson-01");
    markLessonComplete("ai-basics", "lesson-02");
    expect(getCourseCompletionPercent("ai-basics", 8)).toBe(25);
  });

  it("returns 100 when all lessons complete", () => {
    markLessonComplete("ai-basics", "lesson-01");
    markLessonComplete("ai-basics", "lesson-02");
    expect(getCourseCompletionPercent("ai-basics", 2)).toBe(100);
  });
});

describe("storage - lastVisited", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it("returns null when nothing visited", () => {
    expect(getLastVisited()).toBeNull();
  });

  it("tracks last visited lesson", () => {
    setLastVisited("ai-basics", "lesson-03");
    const last = getLastVisited();
    expect(last?.courseId).toBe("ai-basics");
    expect(last?.lessonSlug).toBe("lesson-03");
    expect(last?.timestamp).toBeGreaterThan(0);
  });
});

describe("storage - quiz", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it("returns null for unsaved quiz", () => {
    expect(getQuizResult("ai-basics", "lesson-01")).toBeNull();
  });

  it("saves and retrieves quiz result", () => {
    const result = {
      answers: [0, 1, 2] as readonly number[],
      score: 2,
      total: 3,
      completedAt: Date.now(),
    };
    saveQuizResult("ai-basics", "lesson-01", result);
    const saved = getQuizResult("ai-basics", "lesson-01");
    expect(saved?.score).toBe(2);
    expect(saved?.total).toBe(3);
  });
});

describe("storage - certificate", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it("returns null when no certificate", () => {
    expect(getCertificate("ai-basics")).toBeNull();
  });

  it("saves and retrieves certificate", () => {
    const info = {
      userName: "Test User",
      completedAt: Date.now(),
      courseTitle: "AI基礎",
    };
    saveCertificate("ai-basics", info);
    const cert = getCertificate("ai-basics");
    expect(cert?.userName).toBe("Test User");
    expect(cert?.courseTitle).toBe("AI基礎");
  });
});
