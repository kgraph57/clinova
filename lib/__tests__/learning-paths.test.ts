import { describe, it, expect } from "vitest";
import { getLearningPath, LEARNING_PATHS } from "../learning-paths";

describe("LEARNING_PATHS", () => {
  it("has at least one learning path", () => {
    expect(LEARNING_PATHS.length).toBeGreaterThan(0);
  });

  it("has unique IDs", () => {
    const ids = LEARNING_PATHS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every path has at least one courseId", () => {
    for (const path of LEARNING_PATHS) {
      expect(path.courseIds.length).toBeGreaterThan(0);
    }
  });

  it("every path has positive estimatedHours", () => {
    for (const path of LEARNING_PATHS) {
      expect(path.estimatedHours).toBeGreaterThan(0);
    }
  });
});

describe("getLearningPath", () => {
  it("returns a path for a valid id", () => {
    const path = getLearningPath("clinical-ai-practitioner");
    expect(path).toBeDefined();
    expect(path?.title).toBe("臨床でAIを使いこなす");
  });

  it("returns undefined for an invalid id", () => {
    expect(getLearningPath("nonexistent")).toBeUndefined();
  });

  it("returns the full-course path with all course IDs", () => {
    const path = getLearningPath("full-course");
    expect(path).toBeDefined();
    expect(path!.courseIds.length).toBeGreaterThanOrEqual(8);
  });
});
