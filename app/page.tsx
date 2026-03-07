import { HeroSection } from "@/components/home/HeroSection";
import { StatementSection } from "@/components/home/StatementSection";
import { CategoryOverview } from "@/components/home/CategoryOverview";
import { EditorialPicksSection } from "@/components/home/EditorialPicksSection";
import { CredentialsSection } from "@/components/home/CredentialsSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { LatestSection } from "@/components/home/LatestSection";
import { CreatorSection } from "@/components/home/CreatorSection";
import {
  getFeaturedArticles,
  getArticleCount,
  getLatestNews,
  getWeeklyPickup,
} from "@/lib/content";
import { getCourseCount } from "@/lib/courses";
import { SITE_CONFIG } from "@/lib/constants";

export default async function Home() {
  const featured = getFeaturedArticles();
  const weeklyPickup = getWeeklyPickup(3);
  const counts = getArticleCount();
  const news = getLatestNews(3);
  const courseCount = getCourseCount();

  const editorialPicks = [...weeklyPickup, ...featured].slice(0, 5);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      url: SITE_CONFIG.url,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      description:
        "医療とテクノロジーの交差点で、プロダクト開発・ナレッジ共有・AI活用支援を行っています。",
      founder: {
        "@type": "Person",
        name: SITE_CONFIG.author.name,
        url: `https://github.com/${SITE_CONFIG.author.github}`,
        jobTitle: "Founder / 医師",
      },
      sameAs: [
        `https://github.com/${SITE_CONFIG.author.github}`,
        `https://x.com/${SITE_CONFIG.author.twitter}`,
        `https://note.com/${SITE_CONFIG.author.note}`,
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. 世界観 */}
      <HeroSection />
      {/* 2. このサイトは何か — 数字で信頼感 */}
      <StatementSection
        articleCount={counts.all ?? 0}
        courseCount={courseCount}
      />
      {/* 3. 何があるか — カテゴリで探す導線 */}
      <CategoryOverview counts={counts} />
      {/* 4. 具体的な厳選コンテンツ */}
      <EditorialPicksSection articles={editorialPicks} />
      {/* 5. 信頼性の証明 */}
      <CredentialsSection />
      {/* 6. つくっているもの */}
      <ProductsSection />
      {/* 7. 最新情報 */}
      <LatestSection articles={news} />
      {/* 8. 締め — 誰がやっているか + CTA */}
      <CreatorSection
        contentCount={counts.all ?? 0}
        courseCount={courseCount}
      />
    </>
  );
}
