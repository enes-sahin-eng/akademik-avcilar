export const getOrganizationSchema = (siteUrl: string) => {
  const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;

  return {
    "@context": "https://schema.org",
    "@type": "LanguageSchool",
    "@id": `${baseUrl}/#organization`,
    "name": "Avcılar İngilizce Dil Kursu",
    "url": baseUrl,
    "logo": `${baseUrl}/brand/logo2.png`,
    "description": "İstanbul Avcılar merkezli, 12 şubeli yabancı dil okulu. İngilizce, Almanca ve sınav hazırlık (IELTS, YDS, TOEFL, GOETHE) programları ile konuşma garantili dil eğitimi.",
    "sameAs": [
      "https://www.instagram.com/avcilarakademik",
      "https://tr-tr.facebook.com/akademikbatidilleri/",
      "https://x.com/akademikdilokul",
      "https://www.youtube.com/channel/UC1VMsQPzasFIRhPYfo16O_Q",
      "https://tr.linkedin.com/company/akademik-dil-kursu"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+902126509090",
      "contactType": "customer service",
      "areaServed": "TR",
      "availableLanguage": ["Turkish", "English", "Arabic"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Namık Kemal Cd. Umut İş Merkezi No:23 Kat:5",
      "addressLocality": "Avcılar",
      "addressRegion": "İstanbul",
      "postalCode": "34310",
      "addressCountry": "TR"
    }
  };
};

export const getWebSiteSchema = (siteUrl: string, lang: string) => {
  const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
  const siteName =
    lang === "en"
      ? "Avcılar English Language Courses"
      : lang === "ar"
        ? "دورات أفجيلار لتعليم اللغة الإنجليزية"
        : "Avcılar İngilizce Dil Kursları";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/${lang}/#website`,
    "url": `${baseUrl}/${lang}`,
    "name": siteName,
    "publisher": {
      "@id": `${baseUrl}/#organization`
    }
  };
};
