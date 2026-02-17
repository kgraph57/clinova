"use client";

import { motion } from "framer-motion";
import {
  Baby,
  Ruler,
  ShieldAlert,
  FileCheck,
  Printer,
  BookOpenCheck,
  FlaskConical,
  Radar,
  Stethoscope,
  BrainCircuit,
  Building2,
  Handshake,
} from "lucide-react";
import { containerVariants, fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const ROADMAP = [
  {
    icon: Baby,
    label: "小児栄養計算エンジン",
    detail:
      "Schofield方程式、Holliday-Segar水分量、年齢別蛋白要件で小児患者に対応",
    status: "開発中",
  },
  {
    icon: Ruler,
    label: "成長曲線",
    detail:
      "WHO/CDC成長標準に基づくZスコア計算、パーセンタイル曲線描画",
    status: "開発中",
  },
  {
    icon: ShieldAlert,
    label: "Refeeding症候群リスク評価",
    detail:
      "BMI Zスコア・絶食日数・電解質からリスクを自動判定、漸増プロトコル提案",
    status: "開発中",
  },
  {
    icon: FileCheck,
    label: "栄養指導書生成",
    detail: "患者別の退院/外来/病棟指導書をフォーム入力からPDF出力",
    status: "計画中",
  },
  {
    icon: Printer,
    label: "栄養指示書・成長曲線印刷",
    detail: "A4印刷に最適化されたレイアウトで全ドキュメントを出力",
    status: "計画中",
  },
  {
    icon: BookOpenCheck,
    label: "臨床リファレンス",
    detail:
      "計算式解説、疾患別栄養ガイド、微量元素欠乏症ガイドを内蔵",
    status: "計画中",
  },
  {
    icon: FlaskConical,
    label: "製品リファレンスページ",
    detail: "全379製品の成分表閲覧、フィルタ・ソート・詳細比較",
    status: "計画中",
  },
  {
    icon: Radar,
    label: "栄養レーダーチャート",
    detail: "製品の栄養プロファイルをレーダーチャートで可視化比較",
    status: "計画中",
  },
] as const;

const SERVICES = [
  {
    icon: Stethoscope,
    label: "NST業務効率化コンサル",
    detail: "栄養サポートチームの業務フロー分析と最適化提案",
  },
  {
    icon: BrainCircuit,
    label: "AI栄養アドバイザー連携",
    detail: "検査値に基づくAI推奨の高度化、臨床判断支援",
  },
  {
    icon: Building2,
    label: "栄養製品メーカー向けSaaS",
    detail:
      "自社製品の栄養優位性を定量的に示すホワイトラベルツール提供",
  },
  {
    icon: Handshake,
    label: "共同研究・学会発表",
    detail:
      "充足スコアと患者アウトカムの相関研究、JSPEN等での発表支援",
  },
] as const;

const STATUS_STYLE: Record<string, string> = {
  "開発中": "border-chart-1/30 bg-chart-1/10 text-chart-1",
  "計画中": "border-border bg-muted text-muted-foreground",
};

export function CapabilitiesSection() {
  return (
    <section className="border-t py-20 sm:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
          他にできること
        </h2>
        <p className="mt-3 text-muted-foreground">
          開発ロードマップと展開可能なサービス
        </p>

        {/* Roadmap */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12"
        >
          <motion.h3
            variants={fadeInUp}
            className="text-lg font-medium"
          >
            開発ロードマップ
          </motion.h3>
          <motion.p
            variants={fadeInUp}
            className="mt-1 text-sm text-muted-foreground"
          >
            小児科対応・ドキュメント生成・製品リファレンスを順次実装
          </motion.p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROADMAP.map((item) => (
              <motion.div
                key={item.label}
                variants={fadeInUp}
                className="flex flex-col rounded-2xl border p-6 transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <item.icon className="h-5 w-5 text-foreground/70" />
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-[10px] font-medium",
                      STATUS_STYLE[item.status] ?? "",
                    )}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium">{item.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16"
        >
          <motion.h3
            variants={fadeInUp}
            className="text-lg font-medium"
          >
            展開可能なサービス
          </motion.h3>
          <motion.p
            variants={fadeInUp}
            className="mt-1 text-sm text-muted-foreground"
          >
            プロダクトの臨床知見を活用した事業展開
          </motion.p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <motion.div
                key={service.label}
                variants={fadeInUp}
                className="flex items-start gap-4 rounded-2xl bg-muted/50 p-6"
              >
                <service.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{service.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {service.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
