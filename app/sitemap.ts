import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://avcilarakademik.com.tr";

  const languages = ["tr", "en", "ar"];

  const routes = [
    "",
    "/iletisim",
    "/ingilizce-kursu",
    "/akademik-ingilizce-kursu",
    "/temel-ingilizce-kursu-hazirlik",
    "/temel-ingilizce-kursu-hazirlik-plus",
    "/academic-express-ingilizce-kursu",
    "/academic-ingilizce-kursu",
    "/academic-plus-ingilizce-kursu",
    "/ilkogretim-ingilizce-kursu",
    "/ortaokul-ingilizce-kursu",
    "/lise-ingilizce-kursu",
    "/ingilizce-ozel-ders",
    "/kurumsal-ingilizce",
    "/tercume-hizmeti",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    languages.forEach((lang) => {
      // Çok dilli SEO (hreflang) bağlantıları
      const alternates = {
        languages: Object.fromEntries(
          languages.map((altLang) => [
            altLang,
            `${baseUrl}/${altLang}${route}`,
          ]),
        ),
      };

      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: "2026-07-27", // Her build'de değişmemesi için sabit yayın tarihi
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1 : 0.8,
        alternates,
      });
    });
  });

  return sitemapEntries;
}
