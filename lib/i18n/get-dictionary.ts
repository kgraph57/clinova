import type { Locale } from "./config";

type Dictionary = typeof import("./dictionaries/ja.json");

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  ja: () => import("./dictionaries/ja.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export type { Dictionary };
