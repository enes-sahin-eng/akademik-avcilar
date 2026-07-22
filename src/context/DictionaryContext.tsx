"use client";

import React, { createContext, useContext } from "react";
import type { getDictionary } from "../../app/dictionaries/getDictionary";

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

const DictionaryContext = createContext<Dictionary | null>(null);

export function DictionaryProvider({
  dictionary,
  children,
}: {
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
}

export const useDictionary = () => {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error(
      "useDictionary, DictionaryProvider içinde kullanılmalıdır.",
    );
  }
  return context;
};
