import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { LeadFormModalClient } from "./LeadFormModalClient";

interface Props {
  lang: Locale;
}

export const LeadFormModal = async ({ lang }: Props) => {
  const dict = await getDictionary(lang);
  return <LeadFormModalClient formDict={(dict as any)?.leadForm} />;
};
