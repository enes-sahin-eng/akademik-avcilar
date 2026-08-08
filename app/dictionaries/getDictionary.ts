import "server-only";
import { cache } from "react";
import fs from "fs";
import path from "path";

export const locales = ["tr", "en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

// Type only — no runtime import that Turbopack must compile
import type trDictType from "./tr.json";
export type DictionaryData = typeof trDictType;

// Module-level cache so files are read once per process, not per request
const dictCache = {} as Record<Locale, DictionaryData>;

export const getDictionary = cache(async (locale: Locale): Promise<DictionaryData> => {
  const safeLocale: Locale = (locales as readonly string[]).includes(locale) ? locale : defaultLocale;
  if (!dictCache[safeLocale]) {
    const filePath = path.join(process.cwd(), "app", "dictionaries", `${safeLocale}.json`);
    dictCache[safeLocale] = JSON.parse(fs.readFileSync(filePath, "utf-8")) as DictionaryData;
  }
  return dictCache[safeLocale];
});
