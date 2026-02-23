"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  isLessonComplete as checkComplete,
  markLessonComplete,
  unmarkLessonComplete,
  getCourseCompletionPercent,
  getLastVisited,
  setLastVisited as persistLastVisited,
} from "@/lib/storage";

interface LastVisited {
  readonly courseId: string;
  readonly lessonSlug: string;
  readonly timestamp: number;
}

interface ProgressContextValue {
  isComplete: (courseId: string, lessonSlug: string) => boolean;
  toggleComplete: (courseId: string, lessonSlug: string) => void;
  getCourseProgress: (courseId: string, totalLessons: number) => number;
  lastVisited: LastVisited | null;
  updateLastVisited: (courseId: string, lessonSlug: string) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return ctx;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [revision, setRevision] = useState(0);
  const [lastVisited, setLastVisited] = useState<LastVisited | null>(null);

  useEffect(() => {
    setLastVisited(getLastVisited());
  }, []);

  const bump = useCallback(() => setRevision((r) => r + 1), []);

  const isComplete = useCallback(
    (courseId: string, lessonSlug: string) => {
      void revision; // subscribe to changes
      return checkComplete(courseId, lessonSlug);
    },
    [revision],
  );

  const toggleComplete = useCallback(
    (courseId: string, lessonSlug: string) => {
      if (checkComplete(courseId, lessonSlug)) {
        unmarkLessonComplete(courseId, lessonSlug);
      } else {
        markLessonComplete(courseId, lessonSlug);
      }
      bump();
    },
    [bump],
  );

  const getCourseProgress = useCallback(
    (courseId: string, totalLessons: number) => {
      void revision;
      return getCourseCompletionPercent(courseId, totalLessons);
    },
    [revision],
  );

  const updateLastVisited = useCallback(
    (courseId: string, lessonSlug: string) => {
      persistLastVisited(courseId, lessonSlug);
      setLastVisited({ courseId, lessonSlug, timestamp: Date.now() });
    },
    [],
  );

  return (
    <ProgressContext.Provider
      value={{
        isComplete,
        toggleComplete,
        getCourseProgress,
        lastVisited,
        updateLastVisited,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}
