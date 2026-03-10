import { HeroSection } from "@/components/home/HeroSection";
import { StatementSection } from "@/components/home/StatementSection";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { MarqueeBanner } from "@/components/home/MarqueeBanner";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { CategoryOverview } from "@/components/home/CategoryOverview";
import { EditorialPicksSection } from "@/components/home/EditorialPicksSection";
import { CredentialsSection } from "@/components/home/CredentialsSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { NoteArticlesSection } from "@/components/home/NoteArticlesSection";
import { LatestSection } from "@/components/home/LatestSection";
import { CreatorSection } from "@/components/home/CreatorSection";
import { AnimatedDivider } from "@/components/effects/AnimatedDivider";
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

      {/* ── 1. Hero — 世界観 ────────────────────── */}
      <HeroSection />

      {/* ── 2. Statement — 何をしているか + 数字 ── */}
      <StatementSection
        articleCount={counts.all ?? 0}
        courseCount={courseCount}
      />

      {/* ── 3. Philosophy — 3領域のベン図 ─────── */}
      <PhilosophySection />

      {/* ── Marquee — キーワード帯 ──────────────── */}
      <MarqueeBanner />

      {/* ── 4. Services — 01-04 ナンバリング ──── */}
      <ServicesOverview />

      <AnimatedDivider className="mx-auto max-w-[1200px] px-6" />

      {/* ── 5. Picks — 厳選コンテンツ ──────────── */}
      <EditorialPicksSection articles={editorialPicks} />

      <AnimatedDivider className="mx-auto max-w-[1200px] px-6" />

      {/* ── 6. Books & Track Record — 書籍・実績 ─ */}
      <CredentialsSection />

      {/* ── 7. Products — プロダクト＋スキル ─────── */}
      <ProductsSection />

      <AnimatedDivider className="mx-auto max-w-[1200px] px-6" />

      {/* ── 8. note — 最新記事サムネイル ──────── */}
      <NoteArticlesSection />

      {/* ── 9. Categories — カテゴリで探す ──────── */}
      <CategoryOverview counts={counts} />

      <AnimatedDivider className="mx-auto max-w-[1200px] px-6" />

      {/* ── 10. Latest — 医療AIニュース ──────── */}
      <LatestSection articles={news} />

      {/* ── 11. Creator — Founder + CTA ─────── */}
      <CreatorSection
        contentCount={counts.all ?? 0}
        courseCount={courseCount}
      />
    </>
  );
}
