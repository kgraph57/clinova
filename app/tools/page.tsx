import type { Metadata } from "next";
import {
  ToolComparisonContent,
  type AITool,
} from "@/components/tools/ToolComparisonContent";
import toolData from "@/content/tool-comparison.json";

export const metadata: Metadata = {
  title: "医療AIツール比較",
  description:
    "ChatGPT, Claude, Geminiなど主要AIツールから医療特化AIまで。用途・HIPAA対応・日本語サポートで比較。",
};

export default function ToolsPage() {
  const tools = toolData as AITool[];

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:py-20">
      <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">
        医療AIツール比較
      </h1>
      <p className="mt-3 text-muted-foreground">
        医療現場で使えるAIツールを、用途・安全性・対応言語で比較できます。
      </p>
      <div className="mt-10">
        <ToolComparisonContent tools={tools} />
      </div>
    </div>
  );
}
