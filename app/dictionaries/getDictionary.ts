import "server-only";
import { cache } from "react";
import type TrDictionary from "./tr.json";

export const locales = ["tr", "en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export type DictionaryData = typeof TrDictionary;

const dictionaries: Record<Locale, () => Promise<DictionaryData>> = {
  tr: () => import("./tr.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
  ar: () => import("./ar.json").then((module) => module.default),
};

export const getDictionary = cache((locale: Locale) => dictionaries[locale]());
