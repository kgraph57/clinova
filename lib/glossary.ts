import glossaryData from "@/content/glossary.json";

export interface GlossaryTerm {
  readonly id: string;
  readonly term: string;
  readonly termEn: string;
  readonly definition: string;
  readonly category: string;
  readonly relatedTerms: readonly string[];
  readonly difficulty: "beginner" | "intermediate" | "advanced";
}

const terms: readonly GlossaryTerm[] = glossaryData as GlossaryTerm[];

export function getAllTerms(): readonly GlossaryTerm[] {
  return terms;
}

export function getTermById(id: string): GlossaryTerm | undefined {
  return terms.find((t) => t.id === id);
}

export function getTermsByCategory(category: string): readonly GlossaryTerm[] {
  return terms.filter((t) => t.category === category);
}

export function searchTerms(query: string): readonly GlossaryTerm[] {
  const q = query.toLowerCase();
  return terms.filter(
    (t) =>
      t.term.toLowerCase().includes(q) ||
      t.termEn.toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q),
  );
}
