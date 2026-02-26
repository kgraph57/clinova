import type { Metadata } from "next";
import { ServiceHero } from "@/components/services/ServiceHero";
import {
  ServiceFeatures,
  type ServiceFeature,
} from "@/components/services/ServiceFeatures";
import { ServiceCta } from "@/components/services/ServiceCta";

export const metadata: Metadata = {
  title: "ふたりナビ",
  description:
    "結婚手続き・届出・給付金ナビ。婚姻届の提出から名義変更・保険・税金まで、手続きをステップごとにガイド。",
  openGraph: {
    title: "ふたりナビ — 結婚手続きを、全部終わらせよう",
    description:
      "日付を入れるだけで、やるべき手続きが全部わかる。給付金シミュレーター・チェックリスト・用語集で、もう迷わない。",
  },
};

const DEMO_URL = "https://kgraph57.github.io/futari-navi/";
const GITHUB_URL = "https://github.com/kgraph57/futari-navi";

const FEATURES: ServiceFeature[] = [
  {
    title: "パーソナライズドタイムライン",
    description:
      "婚姻届の提出日を入力するだけで、あなた専用のやることリストを自動生成。",
    iconName: "CalendarCheck",
  },
  {
    title: "給付金シミュレーター",
    description:
      "結婚新生活支援事業・配偶者控除など、受給可能な制度と金額を診断。",
    iconName: "Calculator",
  },
  {
    title: "手続きチェックリスト",
    description:
      "婚姻届・名義変更・保険・年金など、カテゴリ別に漏れなく確認。",
    iconName: "ClipboardCheck",
  },
  {
    title: "53の解説記事",
    description:
      "手続き・制度をわかりやすく解説。公的機関の情報を根拠に正確さを担保。",
    iconName: "FileText",
  },
  {
    title: "用語集",
    description:
      "戸籍謄本？配偶者控除？はじめて聞く言葉もすぐわかる辞書機能。",
    iconName: "BookOpenCheck",
  },
  {
    title: "相談窓口まとめ",
    description:
      "役所・年金事務所・法テラスなど、困ったときの連絡先を一覧で。",
    iconName: "Phone",
  },
];

export default function FutariNaviPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ふたりナビ",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    description:
      "結婚手続き・届出・給付金ナビ。婚姻届の提出から名義変更・保険・税金まで、ステップごとにガイド。",
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
        badge="Open Source — 全53記事 × 給付金シミュレーター"
        title={
          <>
            結婚手続き、
            <br />
            全部終わらせよう。
          </>
        }
        description="日付を入れるだけで、やるべきことが全部わかる。給付金シミュレーター・チェックリスト・用語集を統合し、結婚に伴う手続きをステップごとにガイドします。"
        demoUrl={DEMO_URL}
        githubUrl={GITHUB_URL}
      />
      <ServiceFeatures
        heading="主な機能"
        subheading="結婚手続きの「知らなかった」をゼロにする6つの機能"
        features={FEATURES}
      />
      <ServiceCta
        title={
          <>
            「知らなくて損した」を、
            <br />
            なくしませんか
          </>
        }
        description="機能リクエスト・制度情報のフィードバックなど、お気軽にどうぞ。"
        demoUrl={DEMO_URL}
      />
    </>
  );
}
