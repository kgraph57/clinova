"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Pill,
  TrendingUp,
  Syringe,
  FileText,
  Download,
  LayoutTemplate,
  Save,
  Moon,
  Settings,
  BarChart3,
  GitCompareArrows,
} from "lucide-react";
import { containerVariants, fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const WARM_COLORS = [
  "bg-warm-sage",
  "bg-warm-sky",
  "bg-warm-heather",
  "bg-warm-oat",
  "bg-warm-cactus",
  "bg-warm-sage",
] as const;

const FEATURE_GROUPS = [
  {
    title: "臨床コア",
    description: "エビデンスに基づく栄養評価",
    features: [
      {
        icon: Activity,
        label: "栄養充足スコア",
        detail: "マクロ・電解質・微量元素を100点満点で定量評価",
      },
      {
        icon: Pill,
        label: "薬剤-栄養相互作用",
        detail: "ワルファリン×VitKなど11ルールを自動検出",
      },
      {
        icon: TrendingUp,
        label: "検査値トレンド",
        detail: "時系列チャートと異常値の色分け表示",
      },
      {
        icon: Syringe,
        label: "投与プロトコル",
        detail: "漸増スケジュールを自動生成（refeeding対応）",
      },
    ],
  },
  {
    title: "ワークフロー",
    description: "現場の業務効率を最大化",
    features: [
      {
        icon: FileText,
        label: "PDF印刷",
        detail: "A4栄養指示書・署名欄付き印刷レイアウト",
      },
      {
        icon: Download,
        label: "CSVエクスポート",
        detail: "患者一覧・メニューデータをExcel互換で出力",
      },
      {
        icon: LayoutTemplate,
        label: "クイックテンプレート",
        detail: "成人7種・小児2種の定型メニューをワンクリック適用",
      },
      {
        icon: Save,
        label: "自動保存",
        detail: "30秒間隔の下書き保存、ブラウザを閉じても復元",
      },
    ],
  },
  {
    title: "UX品質",
    description: "使い続けられるプロダクト設計",
    features: [
      {
        icon: Moon,
        label: "ダークモード",
        detail: "システム設定連動 + 手動切替",
      },
      {
        icon: Settings,
        label: "設定カスタマイズ",
        detail: "デフォルト値・表示項目を個人設定で調整",
      },
      {
        icon: BarChart3,
        label: "ダッシュボード",
        detail: "患者ステータス・週間チャート・アラートを一覧",
      },
      {
        icon: GitCompareArrows,
        label: "メニュー比較",
        detail: "2〜4メニューの栄養成分を横並びで比較分析",
      },
    ],
  },
] as const;

export function FeaturesSection() {
  return (
    <section className="border-t py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
          12の機能で栄養管理を変える
        </h2>
        <p className="mt-3 text-muted-foreground">
          臨床の現場から設計した、実践的な機能群
        </p>

        <div className="mt-16 space-y-16">
          {FEATURE_GROUPS.map((group, gi) => (
            <motion.div
              key={group.title}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div variants={fadeInUp}>
                <h3 className="text-lg font-medium">{group.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {group.description}
                </p>
              </motion.div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {group.features.map((feat, fi) => (
                  <motion.div
                    key={feat.label}
                    variants={fadeInUp}
                    className={cn(
                      "flex flex-col rounded-2xl p-6 transition-all duration-200 hover:scale-[1.02]",
                      WARM_COLORS[(gi * 4 + fi) % WARM_COLORS.length],
                      "dark:bg-muted",
                    )}
                  >
                    <feat.icon className="h-5 w-5 text-foreground/70" />
                    <p className="mt-3 text-sm font-medium">{feat.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {feat.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
