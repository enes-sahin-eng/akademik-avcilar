import type { Metadata } from "next";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../../dictionaries/getDictionary";
import { Navbar } from "../../../components/layout/Navbar";
import { CourseHeroSlider } from "../../../components/course/CourseHeroSlider";
import { CourseInfoSection } from "../../../components/course/CourseInfoSection";
import { GradeLevelTabs } from "../../../components/course/GradeLevelTabs";
import { PublicationsShowcase } from "../../../components/course/PublicationsShowcase";
import { WhyUsSection } from "../../../components/course/WhyUsSection";
import { EducationModels } from "../../../components/course/EducationModels";
import { CourseFAQ } from "../../../components/course/CourseFAQ";
import { SeoContentBlock } from "../../../components/course/SeoContentBlock";
import { WhatsAppButton } from "../../../components/ui/WhatsAppButton";
import PlacementTestBanner from "../../../components/course/PlacementTestBanner";
import InstagramFeed from "../../../components/social/InstagramFeed";

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
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  const meta = (dict as any)?.osmanlicaLandingPage?.meta || {
    title:
      lang === "en"
        ? "Ottoman Turkish Language Course | Akademik International"
        : lang === "ar"
          ? "دورة اللغة العثمانية | Akademik International"
          : "Osmanlıca Kursu | Akademik Yabancı Dil Kursları",
    description:
      lang === "en"
        ? "Discover the depths of history with our Ottoman Turkish course. Learn to read and write historical texts with our expert instructors."
        : lang === "ar"
          ? "اكتشف أعماق التاريخ مع دورة اللغة التركية العثمانية. تعلم قراءة وكتابة النصوص التاريخية مع مدربينا الخبراء."
          : "Tarihin köklerine inmek ve kadim metinleri okuyabilmek için uzman eğitmenlerimiz eşliğinde kapsamlı Osmanlıca kursu eğitimlerimize katılın.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/osmanlica-dil-kursu`,
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

export default async function OsmanlicaDilKursuPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;

  return (
    <main>
      <Navbar lang={lang} />

      {/* BREADCRUMBLIST SCHEMA */}
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
                name: "Anasayfa",
                item: "https://www.avcilarakademik.com.tr",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Tüm Kurslar",
                item: `https://www.avcilarakademik.com.tr/${lang}/kurslar`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Osmanlıca Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/osmanlica-dil-kursu`,
              },
            ],
          }),
        }}
      />

      {/* COURSE SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Osmanlıca Kursu",
            description:
              "Başlangıç, Detaylı ve İleri seviyelerde verilen; Osmanlı alfabesini, okuma, yazma ve tarihi belgeleri inceleme becerilerini kazandıran kadim dil eğitimi.",
            provider: {
              "@type": "EducationalOrganization",
              name: "Akademik Yabancı Dil Kursları",
              sameAs: "https://www.avcilarakademik.com.tr",
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Blended",
              location: {
                "@type": "Place",
                name: "Akademik International Kampüsleri",
                address: "Türkiye",
              },
            },
          }),
        }}
      />

      {/* Hero */}
      <CourseHeroSlider courseKey="osmanlicaLandingPage" lang={lang} />

      {/* About (Osmanlıca Eğitimi Nedir & Avantajları) */}
      <CourseInfoSection courseKey="osmanlicaLandingPage" lang={lang} />

      {/* Seviyeler (Başlangıç, Detaylı, İleri vb.) */}
      <GradeLevelTabs courseKey="osmanlicaLandingPage" lang={lang} />

      {/* Yayınlar */}
      <PublicationsShowcase courseKey="osmanlicaLandingPage" lang={lang} />

      {/* Placement Test Banner */}
      <PlacementTestBanner lang={lang} />

      {/* Neden Biz */}
      <WhyUsSection courseKey="osmanlicaLandingPage" lang={lang} />

      {/* Eğitim Modelleri (Örgün / Online) */}
      <EducationModels courseKey="osmanlicaLandingPage" lang={lang} />

      {/* SSS */}
      <CourseFAQ courseKey="osmanlicaLandingPage" lang={lang} />

      {/* SEO Text (Osmanlıca Öğrenmenin Faydaları vb.) */}
      <SeoContentBlock courseKey="osmanlicaLandingPage" lang={lang} />

      {/* Footer Elements */}
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
