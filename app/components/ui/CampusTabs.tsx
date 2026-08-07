import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { CampusTabsClient } from "./CampusTabsClient";

interface Props {
  lang: Locale;
}

export const CampusTabs = async ({ lang }: Props) => {
  const dict = await getDictionary(lang);
  const campusesData = (dict as any)?.iletisim?.campuses?.items || [];
  const viewBranchText = (dict as any)?.iletisim?.campuses?.viewBranchText || "Şubeyi İncele";

  if (!campusesData.length) return null;

  return <CampusTabsClient campusesData={campusesData} lang={lang} viewBranchText={viewBranchText} />;
};
