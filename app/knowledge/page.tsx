import type { Metadata } from "next";
import { getAllArticles, getArticleCount } from "@/lib/content";
import { KnowledgeContent } from "@/components/knowledge/KnowledgeContent";

export const metadata: Metadata = {
  title: "ナレッジ",
  description:
    "医療AIのプロンプト、Tips、ワークフローガイドを体系的にまとめたナレッジベース",
};

export default function KnowledgePage() {
  const articles = getAllArticles();
  const counts = getArticleCount();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <KnowledgeContent articles={articles} counts={counts} />
    </div>
  );
}
