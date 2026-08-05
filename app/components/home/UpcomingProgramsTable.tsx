import React from "react";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { UpcomingProgramsTableClient } from "./UpcomingProgramsTableClient";

interface Props {
  lang: Locale;
}

export const UpcomingProgramsTable = async ({ lang, dictKey = "homeContentSection" }: Props & { dictKey?: string }) => {
  const dict = await getDictionary(lang);
  const tableData = (dict as any)?.[dictKey]?.upcomingProgramsTable;

  if (!tableData) return null;

  return <UpcomingProgramsTableClient tableData={tableData} lang={lang} />;
};
