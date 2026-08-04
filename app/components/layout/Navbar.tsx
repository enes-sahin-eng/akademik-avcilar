import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { NavbarClient } from "./NavbarClient";

interface Props {
  lang: Locale;
}

/**
 * Server component: sözlüğü sunucuda okur ve yalnızca navigasyonun ihtiyaç
 * duyduğu küçük dilimleri client kabuğa prop olarak geçirir. Böylece tüm
 * sözlük (~478 KB) tarayıcıya gönderilmez.
 */
export const Navbar = async ({ lang }: Props) => {
  const dict = await getDictionary(lang);

  return (
    <NavbarClient
      navDict={(dict as any)?.navbar}
      megaMenus={{
        genelIngilizce: (dict as any)?.megaMenuGenelIngilizce,
        sinav: (dict as any)?.megaMenuSinav,
        digerDiller: (dict as any)?.megaMenuDigerDiller,
        subeler: (dict as any)?.megaMenuSubeler,
        hakkimizda: (dict as any)?.megaMenuHakkimizda,
      }}
    />
  );
};
