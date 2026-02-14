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
    <div className="mx-auto max-w-[1200px] px-6 py-12 sm:py-20">
      <KnowledgeContent articles={articles} counts={counts} />
    </div>
  );
}
