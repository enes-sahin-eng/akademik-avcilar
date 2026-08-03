import React from "react";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { UpcomingProgramsTableClient } from "./UpcomingProgramsTableClient";

interface Props {
  lang: Locale;
}

export const UpcomingProgramsTable = async ({ lang }: Props) => {
  const dict = await getDictionary(lang);
  const tableData = (dict as any)?.homeContentSection?.upcomingProgramsTable;

  if (!tableData) return null;

  return <UpcomingProgramsTableClient tableData={tableData} />;
};
