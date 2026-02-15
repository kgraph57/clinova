import { HeroSection } from "@/components/home/HeroSection";
import { CategoryOverview } from "@/components/home/CategoryOverview";
import { FeaturedArticles } from "@/components/home/FeaturedArticles";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { GitHubSection } from "@/components/home/GitHubSection";
import {
  getFeaturedArticles,
  getArticleCount,
  getLatestNews,
} from "@/lib/content";
import type { GitHubRepo } from "@/lib/types";

async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/kgraph57/repos?sort=updated&per_page=30",
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const repos = await res.json();
    return repos.filter((r: GitHubRepo) => !r.name.startsWith("."));
  } catch {
    return [];
  }
}

export default async function Home() {
  const featured = getFeaturedArticles();
  const counts = getArticleCount();
  const news = getLatestNews(3);
  const repos = await getGitHubRepos();

  return (
    <>
      <HeroSection />
      <CategoryOverview counts={counts} />
      <FeaturedArticles articles={featured} />
      <NewsletterSection articles={news} />
      <GitHubSection repos={repos} />
    </>
  );
}
