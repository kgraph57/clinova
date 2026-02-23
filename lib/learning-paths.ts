export interface LearningPath {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly targetRole: string;
  readonly goals: readonly string[];
  readonly estimatedHours: number;
  readonly courseIds: readonly string[];
  readonly iconName:
    | "Zap"
    | "Shield"
    | "GraduationCap"
    | "Microscope"
    | "Stethoscope";
  readonly color: string;
}

export const LEARNING_PATHS: readonly LearningPath[] = [
  {
    id: "clinical-ai-practitioner",
    title: "臨床でAIを使いこなす",
    subtitle: "臨床医・医療従事者向け",
    description:
      "AIの基礎から臨床応用まで、最短ルートで実践力を身につけます",
    targetRole: "臨床医・医療従事者",
    goals: [
      "AIツールを臨床業務に導入できる",
      "プロンプトで効率的に情報収集できる",
      "AIの限界を理解し安全に運用できる",
    ],
    estimatedHours: 6,
    courseIds: ["ai-basics", "prompt-engineering-basics", "medical-ai-overview"],
    iconName: "Stethoscope",
    color: "text-rose-600",
  },
  {
    id: "research-ai-specialist",
    title: "研究でAIを活用する",
    subtitle: "研究者・大学院生向け",
    description:
      "生成AIの仕組みから研究応用まで、技術的な理解を深めます",
    targetRole: "研究者・大学院生",
    goals: [
      "LLMの原理を理解し研究に応用できる",
      "AIバイアスを検出・評価できる",
      "著作権リスクを判断できる",
    ],
    estimatedHours: 10,
    courseIds: [
      "ai-basics",
      "generative-ai-basics",
      "ai-bias-fairness",
      "ai-copyright-ethics",
    ],
    iconName: "Microscope",
    color: "text-blue-600",
  },
  {
    id: "ethics-governance",
    title: "AI倫理・ガバナンスを学ぶ",
    subtitle: "管理者・政策担当者向け",
    description:
      "バイアス、公平性、法的問題まで、医療AI倫理を徹底的に学びます",
    targetRole: "管理者・政策担当者",
    goals: [
      "AI導入の倫理的リスクを評価できる",
      "法規制を理解し適切に対応できる",
      "組織のAIガバナンス方針を策定できる",
    ],
    estimatedHours: 12,
    courseIds: [
      "ai-basics",
      "medical-ai-ethics",
      "ai-bias-fairness",
      "medical-data-legal",
    ],
    iconName: "Shield",
    color: "text-violet-600",
  },
  {
    id: "full-course",
    title: "全コースを体系的に学ぶ",
    subtitle: "全分野を網羅したい方向け",
    description: "全8コースを推奨順に。医療AIの全体像を体系的に理解します",
    targetRole: "全ての学習者",
    goals: [
      "医療AIの全体像を体系的に理解できる",
      "倫理・法規制・技術の3つの柱を習得できる",
      "あらゆる場面でAIを適切に活用できる",
    ],
    estimatedHours: 18,
    courseIds: [
      "ai-basics",
      "generative-ai-basics",
      "prompt-engineering-basics",
      "medical-ai-overview",
      "medical-data-legal",
      "ai-copyright-ethics",
      "medical-ai-ethics",
      "ai-bias-fairness",
    ],
    iconName: "GraduationCap",
    color: "text-emerald-600",
  },
] as const;

export function getLearningPath(id: string): LearningPath | undefined {
  return LEARNING_PATHS.find((p) => p.id === id);
}
