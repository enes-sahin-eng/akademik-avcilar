export const getOrganizationSchema = (siteUrl: string) => {
  const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;

  return {
    "@context": "https://schema.org",
    "@type": "LanguageSchool",
    "@id": `${baseUrl}/#organization`,
    "name": "Akademik International Yabancı Dil Okulları",
    "url": baseUrl,
    "logo": `${baseUrl}/brand/logo.png`,
    "description": "İstanbul Avcılar merkezli, 12 şubeli yabancı dil okulu. İngilizce, Almanca ve sınav hazırlık (IELTS, YDS, TOEFL, GOETHE) programları ile konuşma garantili dil eğitimi.",
    "sameAs": [
      "https://www.instagram.com/akademikinternational",
      "https://tr-tr.facebook.com/akademikbatidilleri/",
      "https://x.com/akademikdilokul",
      "https://www.youtube.com/channel/UC1VMsQPzasFIRhPYfo16O_Q",
      "https://tr.linkedin.com/company/akademik-dil-kursu"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+908503050516",
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

export const getCourseSchema = (siteUrl: string, courseName: string, courseDesc: string, urlPath: string) => {
  const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
  
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": courseName,
    "description": courseDesc,
    "provider": {
      "@type": "Organization",
      "name": "Akademik International Yabancı Dil Okulları",
      "sameAs": baseUrl
    },
    "url": `${baseUrl}${urlPath}`
  };
};

export const getBreadcrumbSchema = (siteUrl: string, items: {name: string, path: string}[]) => {
  const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${baseUrl}${item.path}`
    }))
  };
};
