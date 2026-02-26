import type { Metadata } from "next";
import {
  Baby,
  MapPin,
  Stethoscope,
  Coins,
  BookOpen,
  Search,
} from "lucide-react";
import { ServiceHero } from "@/components/services/ServiceHero";
import {
  ServiceFeatures,
  type ServiceFeature,
} from "@/components/services/ServiceFeatures";
import { ServiceCta } from "@/components/services/ServiceCta";

export const metadata: Metadata = {
  title: "すくすくナビ",
  description:
    "港区の子育て支援情報を一元化。保育園・医療機関・手当制度などを地域密着で整理し、子育て世代をサポート。",
  openGraph: {
    title: "すくすくナビ — 港区の子育て支援ナビゲーター",
    description:
      "保育園・医療機関・手当制度・予防接種スケジュールなど、港区の子育てに必要な情報をワンストップで。",
  },
};

const DEMO_URL = "https://kgraph57.github.io/sukusuku-navi/";
const GITHUB_URL = "https://github.com/kgraph57/sukusuku-navi";

const FEATURES: ServiceFeature[] = [
  {
    title: "保育園・幼稚園情報",
    description:
      "港区内の保育施設を網羅。定員・対象年齢・特色などを比較できます。",
    icon: Baby,
  },
  {
    title: "医療機関マップ",
    description:
      "小児科・夜間休日診療・救急対応など、いざというときに頼れる医療機関を検索。",
    icon: Stethoscope,
  },
  {
    title: "手当・助成制度",
    description:
      "児童手当・医療費助成・出産費用助成など、申請可能な制度を一覧で確認。",
    icon: Coins,
  },
  {
    title: "地域密着情報",
    description:
      "港区に特化した子育てサロン・イベント・支援センターの情報を整理。",
    icon: MapPin,
  },
  {
    title: "おかもん先生の記事",
    description:
      "小児科医が監修する信頼性の高い育児・健康情報をお届けします。",
    icon: BookOpen,
  },
  {
    title: "かんたん検索",
    description:
      "年齢やカテゴリから必要な情報にすぐアクセス。迷わず見つかる設計。",
    icon: Search,
  },
];

export default function SukusukuNaviPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "すくすくナビ",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    description:
      "港区の子育て支援情報を一元化した地域密着型ナビゲーター。保育園・医療機関・手当制度を網羅。",
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
        badge="Open Source — 港区特化 × 医師監修"
        title={
          <>
            港区の子育てを、
            <br />
            もっとかんたんに。
          </>
        }
        description="保育園・医療機関・手当制度・予防接種スケジュールなど、港区で子育てするために必要な情報をワンストップで。小児科医が監修する信頼性の高い情報を提供します。"
        demoUrl={DEMO_URL}
        githubUrl={GITHUB_URL}
      />
      <ServiceFeatures
        heading="主な機能"
        subheading="港区の子育て世代をサポートする6つの機能"
        features={FEATURES}
      />
      <ServiceCta
        title={
          <>
            港区で子育てするなら、
            <br />
            まずはすくすくナビ
          </>
        }
        description="出産・育児に関するご相談、機能へのフィードバック、お気軽にどうぞ。"
        demoUrl={DEMO_URL}
      />
    </>
  );
}
