import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { HeroSliderClient } from "./HeroSliderClient";

interface Props {
  lang: Locale;
}

export const HeroSlider = async ({ lang }: Props) => {
  const dict = await getDictionary(lang);
  const slides = (dict as any)?.heroSlider?.slides || [];

  if (!slides.length) return null;

  return (
    <HeroSliderClient
      slides={slides}
      form={(dict as any)?.heroSliderForm}
      campuses={(dict as any)?.iletisim?.campuses?.items || []}
    />
  );
};
