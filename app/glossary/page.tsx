import type { Metadata } from "next";
import { GlossaryContent } from "@/components/glossary/GlossaryContent";
import { getAllTerms } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "医療AI用語辞典",
  description:
    "医療AIに関する用語を分かりやすく解説。LLM、RAG、プロンプトエンジニアリングなど、臨床現場で使われるAI用語を網羅。",
};

export default function GlossaryPage() {
  const terms = getAllTerms();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:py-20">
      <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">
        医療AI用語辞典
      </h1>
      <p className="mt-3 text-muted-foreground">
        医療AIの理解に必要な用語を、カテゴリ・レベル別に検索できます。
      </p>
      <div className="mt-10">
        <GlossaryContent terms={terms} />
      </div>
    </div>
  );
}
