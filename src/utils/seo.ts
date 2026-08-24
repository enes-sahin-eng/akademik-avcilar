export const getOrganizationSchema = (siteUrl: string) => {
  const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;

  return {
    "@context": "https://schema.org",
    // LanguageSchool tek başına EducationalOrganization altındadır; yerel arama
    // sinyalleri için LocalBusiness tipini de birlikte bildiriyoruz.
    "@type": ["LanguageSchool", "LocalBusiness"],
    "@id": `${baseUrl}/#organization`,
    "name": "Avcılar İngilizce Dil Kursu",
    "url": baseUrl,
    "logo": `${baseUrl}/brand/logo2.png`,
    "image": `${baseUrl}/brand/logo2.png`,
    "description": "İstanbul Avcılar merkezli, 12 şubeli yabancı dil okulu. İngilizce, Almanca ve sınav hazırlık (IELTS, YDS, TOEFL, GOETHE) programları ile konuşma garantili dil eğitimi.",
    "priceRange": "₺₺",
    "currenciesAccepted": "TRY",
    "telephone": "+902126509090",
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
    },
    // Koordinatlar, location.directionLink içindeki Google Maps yer işaretinden alındı.
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.9828653,
      "longitude": 28.7224319
    },
    "hasMap": "https://www.google.com.tr/maps/place/Avc%C4%B1lar+Akademik+Yabanc%C4%B1+Dil+Kurslar%C4%B1+-+Avc%C4%B1lar+%C4%B0ngilizce+Kursu/@40.9828944,28.7172896,16z/data=!4m6!3m5!1s0x14caa1b2231bed03:0xb643688ca18a6ded!8m2!3d40.9828653!4d28.7224319!16s%2Fg%2F11w9xywqjq",
    "areaServed": [
      { "@type": "Place", "name": "Avcılar" },
      { "@type": "Place", "name": "Beylikdüzü" },
      { "@type": "Place", "name": "Küçükçekmece" },
      { "@type": "Place", "name": "Esenyurt" },
      { "@type": "Place", "name": "Firuzköy" },
      { "@type": "Place", "name": "Bahçeşehir" }
    ]
  };
};

export const getWebSiteSchema = (siteUrl: string, lang: string) => {
  const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
  
  // Google Site Names özelliği sadece domain seviyesinde (root) çalışır.
  // Bu yüzden "url" parametresi alt klasör (/tr) değil, direkt ana domain olmalıdır.
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": `${baseUrl}/`,
    "name": "Avcılar İngilizce Kursları",
    "alternateName": ["Avcılar İngilizce Kursu", "Avcılar İngilizce Dil Kursları", "Avcılar Akademik"],
    "publisher": {
      "@id": `${baseUrl}/#organization`
    }
  };
};
