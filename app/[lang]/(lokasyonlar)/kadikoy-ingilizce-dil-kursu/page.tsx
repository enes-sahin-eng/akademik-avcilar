import type { Metadata } from "next";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../../dictionaries/getDictionary";
import { Navbar } from "../../../components/layout/Navbar";
import { CourseHeroSlider } from "../../../components/course/CourseHeroSlider";
import { CampusLocation } from "../../../components/campus/CampusLocation";
import { CampusTabs } from "../../../components/ui/CampusTabs";
import { WhyUsSection } from "../../../components/course/WhyUsSection";
import { StudentReviewsAndAwards } from "../../../components/home/StudentReviewsAndAwards";
import { SeoContentBlock } from "../../../components/course/SeoContentBlock";
import { WhatsAppButton } from "../../../components/ui/WhatsAppButton";
import InstagramFeed from "../../../components/social/InstagramFeed";
import PlacementTestBanner from "../../../components/course/PlacementTestBanner";
import { MiniGallery } from "@/app/components/home/MiniGallery";

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang: rawLang } = await params;
  if (!locales.includes(rawLang as Locale)) {
    const { notFound } = await import("next/navigation");
    notFound();
  }
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  const meta = (dict as any)?.kadikoyIngilizceLandingPage?.meta || {
    title: "Kadıköy İngilizce Kursu - Konuşma Garantili Dil Eğitim",
    description:
      "Kadıköy İngilizce Kursu'nda konuşma odaklı eğitim, tüm seviyeler, native speaker öğretmenler. Esnek saatler, uygun fiyatlar. Şimdi kaydol ve ücretsiz seviye testini al!",
  };

  return {
    title: { absolute: meta.title },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `/${lang}/kadikoy-ingilizce-dil-kursu`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: lang,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function KadikoyIngilizceDilKursuPage({
  params,
}: PageProps) {
  const { lang: rawLang } = await params;
  if (!locales.includes(rawLang as Locale)) {
    const { notFound } = await import("next/navigation");
    notFound();
  }
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  const siteUrl = "https://avcilaringilizcekursu.com.tr";
  const pageData = (dict as any)?.kadikoyIngilizceLandingPage;
  const meta = pageData?.meta || {};
  const homeName =
    lang === "en" ? "Home" : lang === "ar" ? "الرئيسية" : "Anasayfa";

  // Dinamik SSS Verisi (JSON-LD için)
  const faqItems = pageData?.faq?.items || [];

  return (
    <main>
      <Navbar lang={lang} />

      {/* 1. BREADCRUMBLIST SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: homeName,
                item: `${siteUrl}/${lang}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: meta.title,
                item: `${siteUrl}/${lang}/kadikoy-ingilizce-dil-kursu`,
              },
            ],
          }),
        }}
      />

      {/* 2. COURSE / LOCALBUSINESS SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: meta.title,
            description: meta.description,
            provider: {
              "@type": "EducationalOrganization",
              name: "Avcılar İngilizce Dil Kursu",
              sameAs: siteUrl,
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Blended",
              location: {
                "@type": "Place",
                name: "Avcılar İngilizce Dil Kursu Kadıköy",
                address:
                  "Rıhtım Cd. Recaizade Sk. No:2 Kat:3 34716 Kadıköy / İSTANBUL",
              },
            },
          }),
        }}
      />

      {/* 3. FAQ SCHEMA */}
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item: any) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            }),
          }}
        />
      )}

      {/* --- İÇERİK BİLEŞENLERİ --- */}
      <CourseHeroSlider courseKey="kadikoyIngilizceLandingPage" lang={lang} />
      <CampusLocation courseKey="kadikoyIngilizceLandingPage" lang={lang} />
      <MiniGallery lang={lang} />
      <SeoContentBlock courseKey="kadikoyIngilizceLandingPage" lang={lang} />
      <WhyUsSection courseKey="kadikoyIngilizceLandingPage" lang={lang} />

      <PlacementTestBanner lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <CampusTabs lang={lang} />

      {/* Uzun SEO Metinleri */}

      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
