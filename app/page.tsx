import { HeroSection } from "@/components/home/HeroSection";
import { CategoryOverview } from "@/components/home/CategoryOverview";
import { FeaturedArticles } from "@/components/home/FeaturedArticles";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { GitHubSection } from "@/components/home/GitHubSection";
import { CreatorSection } from "@/components/home/CreatorSection";
import {
  getFeaturedArticles,
  getArticleCount,
  getLatestNews,
} from "@/lib/content";
import { getCourseCount } from "@/lib/courses";
import { SITE_CONFIG } from "@/lib/constants";
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
  const courseCount = getCourseCount();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
      url: `https://github.com/${SITE_CONFIG.author.github}`,
      jobTitle: "医師 / 医療AI研究者",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <CategoryOverview counts={counts} />
      <FeaturedArticles articles={featured} />
      <NewsletterSection articles={news} />
      <CreatorSection
        contentCount={counts.all ?? 0}
        courseCount={courseCount}
      />
      <GitHubSection repos={repos} />
    </>
  );
}
