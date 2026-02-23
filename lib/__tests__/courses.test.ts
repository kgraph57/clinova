import { describe, it, expect } from "vitest";
import {
  getAllCourses,
  getCourseCount,
  getCourseById,
  getLessonsForCourse,
  getLessonBySlug,
  getLessonNavigation,
  getAllCourseSlugs,
  getAllLessonParams,
  getRelatedCourses,
  getPrerequisiteCourses,
} from "../courses";

describe("getAllCourses", () => {
  it("returns an array of courses", () => {
    const courses = getAllCourses();
    expect(Array.isArray(courses)).toBe(true);
    expect(courses.length).toBeGreaterThan(0);
  });

  it("courses are sorted by order", () => {
    const courses = getAllCourses();
    for (let i = 1; i < courses.length; i++) {
      expect(courses[i].order).toBeGreaterThanOrEqual(courses[i - 1].order);
    }
  });

  it("every course has required fields", () => {
    for (const course of getAllCourses()) {
      expect(course.courseId).toBeTruthy();
      expect(course.title).toBeTruthy();
      expect(typeof course.level).toBe("string");
      expect(typeof course.order).toBe("number");
    }
  });
});

describe("getCourseCount", () => {
  it("returns a positive number", () => {
    expect(getCourseCount()).toBeGreaterThan(0);
  });

  it("matches getAllCourses length", () => {
    expect(getCourseCount()).toBe(getAllCourses().length);
  });
});

describe("getCourseById", () => {
  it("returns a course for a valid ID", () => {
    const course = getCourseById("ai-basics");
    expect(course).not.toBeNull();
    expect(course?.courseId).toBe("ai-basics");
  });

  it("returns null for an invalid ID", () => {
    expect(getCourseById("nonexistent-course")).toBeNull();
  });
});

describe("getLessonsForCourse", () => {
  it("returns lessons for a valid course", () => {
    const lessons = getLessonsForCourse("ai-basics");
    expect(lessons.length).toBeGreaterThan(0);
  });

  it("lessons are sorted by order", () => {
    const lessons = getLessonsForCourse("ai-basics");
    for (let i = 1; i < lessons.length; i++) {
      expect(lessons[i].order).toBeGreaterThanOrEqual(lessons[i - 1].order);
    }
  });

  it("returns empty array for nonexistent course", () => {
    expect(getLessonsForCourse("nonexistent")).toEqual([]);
  });
});

describe("getLessonBySlug", () => {
  it("returns a lesson with content", () => {
    const lessons = getLessonsForCourse("ai-basics");
    if (lessons.length === 0) return;
    const lesson = getLessonBySlug("ai-basics", lessons[0].slug);
    expect(lesson).not.toBeNull();
    expect(lesson?.content).toBeTruthy();
  });

  it("returns null for nonexistent slug", () => {
    expect(getLessonBySlug("ai-basics", "nonexistent-slug")).toBeNull();
  });
});

describe("getLessonNavigation", () => {
  it("first lesson has no prev", () => {
    const lessons = getLessonsForCourse("ai-basics");
    if (lessons.length === 0) return;
    const nav = getLessonNavigation("ai-basics", lessons[0].slug);
    expect(nav.prev).toBeNull();
  });

  it("last lesson has no next", () => {
    const lessons = getLessonsForCourse("ai-basics");
    if (lessons.length === 0) return;
    const last = lessons[lessons.length - 1];
    const nav = getLessonNavigation("ai-basics", last.slug);
    expect(nav.next).toBeNull();
  });

  it("middle lesson has both prev and next", () => {
    const lessons = getLessonsForCourse("ai-basics");
    if (lessons.length < 3) return;
    const nav = getLessonNavigation("ai-basics", lessons[1].slug);
    expect(nav.prev).not.toBeNull();
    expect(nav.next).not.toBeNull();
  });
});

describe("getAllCourseSlugs", () => {
  it("returns string array matching course count", () => {
    const slugs = getAllCourseSlugs();
    expect(slugs.length).toBe(getCourseCount());
    for (const slug of slugs) {
      expect(typeof slug).toBe("string");
    }
  });
});

describe("getAllLessonParams", () => {
  it("returns params with courseId and lessonSlug", () => {
    const params = getAllLessonParams();
    expect(params.length).toBeGreaterThan(0);
    for (const p of params) {
      expect(p.courseId).toBeTruthy();
      expect(p.lessonSlug).toBeTruthy();
    }
  });
});

describe("getRelatedCourses", () => {
  it("returns courses for a mapped category", () => {
    const related = getRelatedCourses("ai-fundamentals");
    expect(related.length).toBeGreaterThan(0);
  });

  it("returns empty array for unmapped category", () => {
    expect(getRelatedCourses("nonexistent")).toEqual([]);
  });
});

describe("getPrerequisiteCourses", () => {
  it("returns empty array for courses without prereqs", () => {
    const prereqs = getPrerequisiteCourses("ai-basics");
    expect(Array.isArray(prereqs)).toBe(true);
  });
});
