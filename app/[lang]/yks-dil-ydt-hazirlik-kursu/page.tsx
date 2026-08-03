import type { Metadata } from "next";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../dictionaries/getDictionary";
import { Navbar } from "../../components/layout/Navbar";
import { CourseHeroSlider } from "../../components/course/CourseHeroSlider";
import { CourseInfoSection } from "../../components/course/CourseInfoSection";
import { PublicationsShowcase } from "../../components/course/PublicationsShowcase";
import { WhyUsSection } from "../../components/course/WhyUsSection";
import { EducationModels } from "../../components/course/EducationModels";
import { CourseFAQ } from "../../components/course/CourseFAQ";
import { WhatsAppButton } from "../../components/ui/WhatsAppButton";
import PlacementTestBanner from "../../components/course/PlacementTestBanner";
import InstagramFeed from "../../components/social/InstagramFeed";
import { SeoContentBlock } from "../../components/course/SeoContentBlock";
import { GradeLevelTabs } from "../../components/course/GradeLevelTabs";

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

  const meta = (dict as any)?.ydtLandingPage?.meta || {
    title:
      lang === "en"
        ? "YKS-DİL (YDT) Preparation Course | Akademik International"
        : lang === "ar"
          ? "دورة التحضير لامتحان YKS-DİL (YDT) | Akademik International"
          : "YKS-DİL (YDT) Hazırlık Kursu | Üniversite Hazırlık | Akademik International",
    description:
      lang === "en"
        ? "Get ready for the university entrance exam (YDT) with our expert instructors and strategy-focused curriculum."
        : lang === "ar"
          ? "استعد لامتحان القبول الجامعي (YDT) مع مدربينا الخبراء ومناهجنا التي تركز على الاستراتيجية."
          : "YKS-DİL (YDT)'de hedeflediğiniz üniversiteyi kazanmak için uzman eğitmen kadromuz ve ÖSYM formatına tam uyumlu kaynaklarımızla hazırlanın.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/yks-dil-ydt-hazirlik-kursu`,
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

export default async function YdtHazirlikKursuPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  // Dinamik SSS Verisi (JSON-LD için)
  const faqItems = (dict as any)?.ydtLandingPage?.faq?.items || [];

  return (
    <main>
      <Navbar />

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
                name: "Anasayfa",
                item: "https://www.avcilarakademik.com.tr",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Akademik Sınav Kursları",
                item: `https://www.avcilarakademik.com.tr/${lang}/akademik-ingilizce-kursu`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "YKS-DİL (YDT) Hazırlık Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/yks-dil-ydt-hazirlik-kursu`,
              },
            ],
          }),
        }}
      />

      {/* 2. COURSE SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "YKS-DİL (YDT) Hazırlık Kursu",
            description:
              "Üniversitelerin dil (İngilizce) bölümlerini hedefleyen öğrenciler için ÖSYM müfredatına ve soru tarzına tam uyumlu yoğun YKS-DİL eğitim programı.",
            provider: {
              "@type": "EducationalOrganization",
              name: "Akademik International Yabancı Dil Okulları",
              sameAs: "https://www.avcilarakademik.com.tr",
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Blended",
              location: {
                "@type": "Place",
                name: "Akademik International Avcılar",
                address:
                  "Namık Kemal Cd. Umut İş Merkezi No:23 Kat:5, 34310 Avcılar/İstanbul",
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

      {/* Client Component */}
      <CourseHeroSlider courseKey="ydtLandingPage" />

      {/* Server Components - lang prop'u zorunlu */}
      <CourseInfoSection courseKey="ydtLandingPage" lang={lang} />

      {/* Client Component */}
      <GradeLevelTabs courseKey="ydtLandingPage" />

      {/* Server Components */}
      <PublicationsShowcase courseKey="ydtLandingPage" lang={lang} />

      {/* Client Components */}
      <PlacementTestBanner />
      <WhyUsSection courseKey="ydtLandingPage" />

      {/* Server Components */}
      <EducationModels courseKey="ydtLandingPage" lang={lang} />
      <CourseFAQ courseKey="ydtLandingPage" lang={lang} />
      <SeoContentBlock courseKey="ydtLandingPage" lang={lang} />

      {/* Footer ve Sosyal */}
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
