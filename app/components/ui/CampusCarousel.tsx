import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { CampusCarouselClient } from "./CampusCarouselClient";

interface Props {
  lang: Locale;
}

export const CampusCarousel = async ({ lang }: Props) => {
  const dict = await getDictionary(lang);
  const campusesData = (dict as any)?.iletisim?.campuses?.items || [];

  if (!campusesData.length) return null;

  return <CampusCarouselClient campusesData={campusesData} lang={lang} />;
};
