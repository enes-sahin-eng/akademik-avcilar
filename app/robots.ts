import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // llms.txt ve AGENTS.md ile tam uyumlu doğru domain fallback'i
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://avcilaringilizcekursu.com.tr";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Kritik: /_next/ engeli kaldırıldı (Google'ın JS/CSS render edebilmesi için zorunlu).
      // Sadece özel API rotaları ve sistem dışı alanlar hariç tutuldu.
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
