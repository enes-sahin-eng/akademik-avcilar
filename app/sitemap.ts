import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://avcilarakademik.com.tr";

  const languages = ["tr", "en", "ar"];

  const routes = [
    "",
    "/iletisim",
    "/subelerimiz",
    "/diger-diller",
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
    "/is-ingilizcesi",
    "/havacilik-pilotluk-ingilizcesi-kursu",
    // Akademik Sınav Hazırlık (İngilizce)
    "/akademik-sinavlar",
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
    "/sat-kursu",
    "/pte-kursu",
    "/cae-kursu",
    // Almanca Sınav Hazırlık
    "/testdaf-almanca-kursu",
    "/almanca-goethe-sinavi-hazirlik-kursu",
    "/osd-almanca-dil-sertifikasi-kursu",
    // Diğer Diller Sınav Hazırlık
    "/torfl-kursu",
    "/cils-kursu",
    "/tef-kursu",
    "/telc-kursu",

    // Amaca Yönelik Almanca Programları
    "/almanca-aile-birlesimi-kursu",
    "/izmir-almanca-aile-birlesimi-kursu",
    // Lokasyon Bazlı Diğer Dil Kursları
    "/kadikoy-almanca-kursu",
    "/kadikoy-ingilizce-dil-kursu",
    "/fransizca-kursu-besiktas",
    // Şube Lokasyon Sayfaları (İngilizce)
    "/avcilar-ingilizce-dil-kursu",
    "/istanbul-ingilizce-kursu",
    "/bursa-ingilizce-dil-kursu-fsm",
    "/cekmekoy-ingilizce-dil-kursu",
    "/gorukle-ingilizce-dil-kursu",
    "/ankara-ingilizce-dil-kursu",
    "/izmir-ingilizce-dil-kursu",
    "/kocaeli-izmit-ingilizce-dil-kursu",
    "/corlu-ingilizce-dil-kursu",
    "/inegol-ingilizce-dil-kursu",
    "/yildirim-erikli-ingilizce-dil-kursu",
    "/amerika",
    "/ingilizce-kursu-kutahya",
    // Diğer Dil Kursları
    "/ispanyolca-dil-kursu",
    "/fransizca-dil-kursu",
    "/almanca-dil-kursu",
    "/rusca-dil-kursu",
    "/italyanca-dil-kursu",
    "/farsca-dil-kursu",
    "/cince-dil-kursu",
    "/japonca-dil-kursu",
    "/korece-dil-kursu",
    "/osmanlica-dil-kursu",
    "/yabancilara-turkce",
    "/turkce-dil-kursu",
    "/latince-dil-kursu",
    "/portekizce-dil-kursu",
    "/arapca-dil-kursu",
    "/flemenkce-dil-kursu",
    // Hakkımızda
    "/yayinlarimiz",
    "/tarihce",
    "/neden-akademik-yabanci-dil-kurslari",
    "/referanslar",
    "/kurumsal-anlasmalar",
    "/kariyer-firsatlari",
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
        lastModified: "2026-08-10",
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1 : 0.8,
        alternates,
      });
    });
  });

  return sitemapEntries;
}
