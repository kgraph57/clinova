import type { Metadata } from "next";
import { getArticleCount } from "@/lib/content";
import { getCourseCount } from "@/lib/courses";
import { AboutPageContent } from "./AboutPageContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hoshizu — 医療とテクノロジーの交差点で、プロダクト開発・ナレッジ共有・AI活用支援を行っています。",
};

export default function AboutPage() {
  const counts = getArticleCount();
  const courseCount = getCourseCount();

  return (
    <AboutPageContent
      articleCount={counts.all ?? 0}
      courseCount={courseCount}
    />
  );
}
