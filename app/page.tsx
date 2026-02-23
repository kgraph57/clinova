import { HeroSection } from "@/components/home/HeroSection";
import { CategoryOverview } from "@/components/home/CategoryOverview";
import { FeaturedArticles } from "@/components/home/FeaturedArticles";
import { ServicesSection } from "@/components/home/ServicesSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { PublicationsSection } from "@/components/home/PublicationsSection";
import { ActivitiesSection } from "@/components/home/ActivitiesSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { CreatorSection } from "@/components/home/CreatorSection";
import {
  getFeaturedArticles,
  getArticleCount,
  getLatestNews,
} from "@/lib/content";
import { getCourseCount } from "@/lib/courses";
import { SITE_CONFIG } from "@/lib/constants";

export default async function Home() {
  const featured = getFeaturedArticles();
  const counts = getArticleCount();
  const news = getLatestNews(3);
  const courseCount = getCourseCount();

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
      <HeroSection />
      <CategoryOverview counts={counts} />
      <FeaturedArticles articles={featured} />
      <ServicesSection />
      <SkillsSection />
      <PublicationsSection />
      <ActivitiesSection />
      <NewsletterSection articles={news} />
      <CreatorSection
        contentCount={counts.all ?? 0}
        courseCount={courseCount}
      />
    </>
  );
}
