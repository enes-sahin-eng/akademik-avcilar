import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://avcilarakademik.com.tr";

  const languages = ["tr", "en", "ar"];

  const routes = [
    "",
    "/iletisim",
    // Genel İngilizce
    "/ingilizce-kursu",
    "/temel-ingilizce-kursu-hazirlik",
    "/temel-ingilizce-kursu-hazirlik-plus",
    "/academic-express-ingilizce-kursu",
    "/academic-ingilizce-kursu",
    "/academic-plus-ingilizce-kursu",
    "/ilkogretim-ingilizce-kursu",
    "/ortaokul-ingilizce-kursu",
    "/lise-ingilizce-kursu",
    "/ingilizce-ozel-ders",
    "/kurumlara-ozel-ingilizce-kursu",
    // Akademik Sınav Hazırlık (İngilizce)
    "/akademik-ingilizce-kursu",
    "/yds-hazirlik-kursu",
    "/yokdil-hazirlik-kursu",
    "/yks-dil-ydt-hazirlik-kursu",
    "/ielts-hazirlik-kursu",
    "/toefl-hazirlik-kursu",
    "/toeic-hazirlik-kursu",
    "/gre-sinavi-hazirlik-kursu",
    "/gmat-hazirlik-kursu",
    "/itep-hazirlik-kursu",
    "/ingilizce-hazirlik-atlama",
    "/e-tep-sinavi-nedir",
    // Almanca Sınav Hazırlık
    "/testdaf-almanca-kursu",
    "/almanca-goethe-sinavi-hazirlik-kursu",
    "/osd-almanca-dil-sertifikasi-kursu",
    // Diğer
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
        lastModified: "2026-08-03",
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1 : 0.8,
        alternates,
      });
    });
  });

  return sitemapEntries;
}
