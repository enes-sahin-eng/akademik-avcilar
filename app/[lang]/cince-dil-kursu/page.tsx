import type { Metadata } from "next";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../dictionaries/getDictionary";
import { Navbar } from "../../components/layout/Navbar";
import { CourseHeroSlider } from "../../components/course/CourseHeroSlider";
import { CourseInfoSection } from "../../components/course/CourseInfoSection";
import { GradeLevelTabs } from "../../components/course/GradeLevelTabs";
import { PublicationsShowcase } from "../../components/course/PublicationsShowcase";
import { WhyUsSection } from "../../components/course/WhyUsSection";
import { EducationModels } from "../../components/course/EducationModels";
import { CourseFAQ } from "../../components/course/CourseFAQ";
import { SeoContentBlock } from "../../components/course/SeoContentBlock";
import { WhatsAppButton } from "../../components/ui/WhatsAppButton";
import PlacementTestBanner from "../../components/course/PlacementTestBanner";
import InstagramFeed from "../../components/social/InstagramFeed";

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

  const meta = (dict as any)?.cinceLandingPage?.meta || {
    title:
      lang === "en"
        ? "Chinese Language Course | Akademik International"
        : lang === "ar"
          ? "دورة اللغة الصينية | Akademik International"
          : "Çince Dil Kursu | Akademik Yabancı Dil Kursları",
    description:
      lang === "en"
        ? "Master the Chinese language with our native instructors. Comprehensive HSK 1-6 preparation and VIP classes for your career goals."
        : lang === "ar"
          ? "أتقن اللغة الصينية مع مدربينا الأصليين. إعداد شامل لاختبار HSK 1-6 وفصول VIP لأهدافك المهنية."
          : "Uzakdoğunun en güzide dili Çinceyi, anadili Çince olan eğitmenlerimizle HSK standartlarında (HSK 1 - HSK 6) VIP sınıflarda öğrenin.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/cince-dil-kursu`,
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

export default async function CinceDilKursuPage({ params }: PageProps) {
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
                name: "Çince Dil Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/cince-dil-kursu`,
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
            name: "Çince Dil Kursu",
            description:
              "Anadili Çince olan uzman eğitmenler eşliğinde, uluslararası HSK (Hanyu Shuiping Kaoshi) standartlarına uygun, 1. seviyeden 6. seviyeye kadar kapsamlı Çince dil eğitimi.",
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
                name: "Akademik International Kampüsleri (İstanbul, Bursa, Eskişehir, İzmir, Ankara, Kocaeli)",
                address: "Türkiye",
              },
            },
          }),
        }}
      />

      {/* Hero */}
      <CourseHeroSlider courseKey="cinceLandingPage" lang={lang} />

      {/* About (Çince Eğitimi Nedir & Avantajları) */}
      <CourseInfoSection courseKey="cinceLandingPage" lang={lang} />

      {/* Seviyeler (HSK 1, HSK 2, HSK 3, HSK 4, HSK 5, HSK 6) */}
      <GradeLevelTabs courseKey="cinceLandingPage" lang={lang} />

      {/* Yayınlar */}
      <PublicationsShowcase courseKey="cinceLandingPage" lang={lang} />

      {/* Placement Test Banner */}
      <PlacementTestBanner lang={lang} />

      {/* Neden Biz */}
      <WhyUsSection courseKey="cinceLandingPage" lang={lang} />

      {/* Eğitim Modelleri (Örgün / Online) */}
      <EducationModels courseKey="cinceLandingPage" lang={lang} />

      {/* SSS */}
      <CourseFAQ courseKey="cinceLandingPage" lang={lang} />

      {/* SEO Text (Çince Bilmenin Önemi, Kurs Fiyatları vb.) */}
      <SeoContentBlock courseKey="cinceLandingPage" lang={lang} />

      {/* Footer Elements */}
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
