"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CourseCard } from "@/components/learn/CourseCard";
import { CourseFilterEnhanced } from "@/components/learn/CourseFilterEnhanced";
import { CATEGORIES } from "@/lib/constants";
import { containerVariants, fadeInUp } from "@/lib/animations";
import type { CourseMetadata } from "@/lib/courses";

interface CourseListWithFilterProps {
  readonly courses: readonly CourseMetadata[];
}

export function CourseListWithFilter({ courses }: CourseListWithFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const categoryOptions = useMemo(() => {
    const countMap = new Map<string, number>();
    for (const course of courses) {
      countMap.set(course.category, (countMap.get(course.category) ?? 0) + 1);
    }

    return CATEGORIES.filter((cat) => countMap.has(cat.id)).map((cat) => ({
      id: cat.id,
      label: cat.label,
      count: countMap.get(cat.id) ?? 0,
    }));
  }, [courses]);

  const levelCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const course of courses) {
      counts[course.level] = (counts[course.level] ?? 0) + 1;
    }
    return counts;
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const categoryMatch =
        selectedCategory === null || c.category === selectedCategory;
      const levelMatch = selectedLevel === null || c.level === selectedLevel;
      return categoryMatch && levelMatch;
    });
  }, [courses, selectedCategory, selectedLevel]);

  return (
    <>
      <CourseFilterEnhanced
        categories={categoryOptions}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedLevel={selectedLevel}
        onSelectLevel={setSelectedLevel}
        totalCount={courses.length}
        levelCounts={levelCounts}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 sm:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {filteredCourses.map((course) => (
            <motion.div
              key={course.courseId}
              variants={fadeInUp}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
