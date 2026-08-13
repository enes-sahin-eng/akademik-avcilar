import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { MobileBottomNavClient, type BottomNavDict } from "./MobileBottomNavClient";

interface Props {
  lang: Locale;
}

const FALLBACK: Record<string, BottomNavDict> = {
  tr: {
    placement: "Seviye Testi",
    languages: "Diller",
    exams: "Sınavlar",
    branches: "Şubeler",
    home: "Ana Sayfa",
  },
  en: {
    placement: "Placement",
    languages: "Languages",
    exams: "Exams",
    branches: "Branches",
    home: "Home",
  },
  ar: {
    placement: "اختبار المستوى",
    languages: "اللغات",
    exams: "الاختبارات",
    branches: "الفروع",
    home: "الصفحة الرئيسية",
  },
};

export const MobileBottomNav = async ({ lang }: Props) => {
  const dict = await getDictionary(lang);
  const t: BottomNavDict =
    (dict as any)?.mobileBottomNav || FALLBACK[lang] || FALLBACK.tr;

  return <MobileBottomNavClient lang={lang} dict={t} />;
};
