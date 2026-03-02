const VARIABLE_PATTERN = /\{\{([^}]+)\}\}/g;

export function extractVariables(template: string): string[] {
  const matches = [...template.matchAll(VARIABLE_PATTERN)];
  return [...new Set(matches.map((m) => m[1]!.trim()))];
}

export function fillTemplate(
  template: string,
  values: Readonly<Record<string, string>>,
): string {
  return template.replace(VARIABLE_PATTERN, (_, key: string) => {
    const trimmed = key.trim();
    return values[trimmed] || `{{${trimmed}}}`;
  });
}
