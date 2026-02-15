import type { Metadata } from "next";
import { getNewsArticles } from "@/lib/content";
import { NewsContent } from "@/components/news/NewsContent";

export const metadata: Metadata = {
  title: "News",
  description:
    "医療AI分野の最新ニュース、論文レビュー、規制動向をお届けします",
};

export default function NewsPage() {
  const articles = getNewsArticles();

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12 sm:py-20">
      <NewsContent articles={articles} />
    </div>
  );
}
