export const LOCALES = ["ja", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ja";

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}
