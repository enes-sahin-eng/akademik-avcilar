import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { ContactFormSectionClient } from "./ContactFormSectionClient";

interface Props {
  lang: Locale;
}

export const ContactFormSection = async ({ lang }: Props) => {
  const dict = await getDictionary(lang);
  const iletisim = (dict as any)?.iletisim;

  return (
    <ContactFormSectionClient
      formData={iletisim?.formSection}
      mapData={iletisim?.mapSection}
      campuses={iletisim?.campuses?.items || []}
    />
  );
};
