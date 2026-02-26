import type { Metadata } from "next";
import { ServiceHero } from "@/components/services/ServiceHero";
import {
  ServiceFeatures,
  type ServiceFeature,
} from "@/components/services/ServiceFeatures";
import { ServiceCta } from "@/components/services/ServiceCta";

export const metadata: Metadata = {
  title: "Pediatric Learning",
  description:
    "小児科領域の学習を支援するアプリ。問題演習・解説・弱点分析で効率的な学習を実現。",
  openGraph: {
    title: "Pediatric Learning — 小児科学習を、もっと効率的に",
    description:
      "問題演習・解説・弱点分析で、小児科領域の知識を体系的に習得。医学生・研修医の学習をサポート。",
  },
};

const DEMO_URL = "https://kgraph57.github.io/pediatric-exam-app/";
const GITHUB_URL = "https://github.com/kgraph57/pediatric-exam-app";

const FEATURES: ServiceFeature[] = [
  {
    title: "問題演習",
    description:
      "小児科専門医試験レベルの問題を領域別に出題。繰り返し解いて定着。",
    iconName: "Brain",
  },
  {
    title: "詳細な解説",
    description:
      "各問題に根拠を示した解説を収録。正解の理由だけでなく不正解の理由も。",
    iconName: "BookOpen",
  },
  {
    title: "弱点分析",
    description:
      "正答率を領域・疾患別に可視化。苦手な分野を自動で特定し重点出題。",
    iconName: "BarChart3",
  },
  {
    title: "目標設定",
    description:
      "学習計画を立てて進捗を追跡。試験日から逆算した学習ペースを提案。",
    iconName: "Target",
  },
  {
    title: "復習モード",
    description:
      "間違えた問題・ブックマーク問題を効率よく復習。忘却曲線に基づく再出題。",
    iconName: "Repeat",
  },
  {
    title: "達成度トラッキング",
    description:
      "学習の積み重ねを可視化。モチベーションを維持する仕組みを設計。",
    iconName: "Trophy",
  },
];

export default function PediatricLearningPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Pediatric Learning",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    description:
      "小児科領域の学習支援アプリ。問題演習・解説・弱点分析で効率的な学習を実現。",
    url: DEMO_URL,
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
      <ServiceHero
        badge="Open Source — 小児科学習支援"
        title={
          <>
            小児科学習を、
            <br />
            もっと効率的に。
          </>
        }
        description="問題演習・解説・弱点分析を一つのアプリに。小児科専門医試験対策から日常の知識整理まで、医学生・研修医・専攻医の学習をサポートします。"
        demoUrl={DEMO_URL}
        demoLabel="アプリを試す"
        githubUrl={GITHUB_URL}
      />
      <ServiceFeatures
        heading="主な機能"
        subheading="効率的な学習サイクルをつくる6つの機能"
        features={FEATURES}
      />
      <ServiceCta
        title={
          <>
            一緒に学習体験を、
            <br />
            つくりませんか
          </>
        }
        description="問題提供・機能リクエスト・共同研究など、お気軽にご相談ください。"
        demoUrl={DEMO_URL}
        demoLabel="アプリを試す"
      />
    </>
  );
}
