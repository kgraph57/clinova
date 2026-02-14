import { HeroSection } from "@/components/home/HeroSection";
import { CategoryOverview } from "@/components/home/CategoryOverview";
import { FeaturedArticles } from "@/components/home/FeaturedArticles";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { GitHubSection } from "@/components/home/GitHubSection";
import { getFeaturedArticles, getArticleCount } from "@/lib/content";
import type { GitHubRepo } from "@/lib/types";

async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/users/kgraph57/repos?sort=updated&per_page=6",
    );
    if (!res.ok) return [];
    const repos = await res.json();
    return repos.filter((r: GitHubRepo) => !r.name.startsWith(".")).slice(0, 3);
  } catch {
    return [];
  }
}

export default async function Home() {
  const featured = getFeaturedArticles();
  const counts = getArticleCount();
  const repos = await getGitHubRepos();

  return (
    <>
      <HeroSection />
      <CategoryOverview counts={counts} />
      <FeaturedArticles articles={featured} />
      <NewsletterSection />
      <GitHubSection repos={repos} />
    </>
  );
}
