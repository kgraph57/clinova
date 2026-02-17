import type { Metadata } from "next";
import { HeroSection } from "@/components/icu-nutricare/HeroSection";
import { StatsSection } from "@/components/icu-nutricare/StatsSection";
import { FeaturesSection } from "@/components/icu-nutricare/FeaturesSection";
import { CapabilitiesSection } from "@/components/icu-nutricare/CapabilitiesSection";
import { TechSection } from "@/components/icu-nutricare/TechSection";
import { CtaSection } from "@/components/icu-nutricare/CtaSection";

export const metadata: Metadata = {
  title: "ICU NutriCare",
  description:
    "ICU・PICU向け包括的栄養管理アプリ。379製品のデータベースと12の臨床機能で、エビデンスに基づく栄養サポートを提供。",
  openGraph: {
    title: "ICU NutriCare — ICU栄養管理を定量化する",
    description:
      "経腸栄養・静脈栄養の成分を自動計算し、充足度をスコアリング。薬剤相互作用の検出から投与プロトコル生成まで。",
  },
};

export default function IcuNutriCarePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ICU NutriCare",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description:
      "ICU・PICU向け包括的栄養管理Webアプリケーション。重症患者の経腸栄養・静脈栄養を一元管理。",
    url: "https://kgraph57.github.io/nutri-care/",
    author: {
      "@type": "Person",
      name: "Ken Okamoto",
      url: "https://github.com/kgraph57",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "JPY",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CapabilitiesSection />
      <TechSection />
      <CtaSection />
    </>
  );
}
