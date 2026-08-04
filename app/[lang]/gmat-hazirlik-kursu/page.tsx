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

  const meta = (dict as any)?.gmatLandingPage?.meta || {
    title:
      lang === "en"
        ? "GMAT Preparation Course | Akademik International"
        : lang === "ar"
          ? "دورة التحضير لاختبار GMAT | Akademik International"
          : "GMAT Hazırlık Kursu | MBA ve Yüksek Lisans | Akademik International",
    description:
      lang === "en"
        ? "Get accepted into top MBA programs worldwide by preparing for the GMAT with our high-scoring expert instructors."
        : lang === "ar"
          ? "احصل على القبول في أفضل برامج ماجستير إدارة الأعمال عالميًا بالتحضير لاختبار GMAT مع مدربينا الخبراء ذوي الدرجات العالية."
          : "İşletme yüksek lisans (MBA) ve doktora programları için gerekli olan GMAT sınavına, yüksek skor elde etmiş uzman eğitmenlerimizle hazırlanın.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/gmat-hazirlik-kursu`,
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

export default async function GmatHazirlikKursuPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  // Dinamik SSS Verisi (JSON-LD için)
  const faqItems = (dict as any)?.gmatLandingPage?.faq?.items || [];

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
                name: "GMAT Hazırlık Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/gmat-hazirlik-kursu`,
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
            name: "GMAT Hazırlık Kursu",
            description:
              "Türkiye'de ve yurt dışında işletme yüksek lisans (MBA) ve doktora programlarına giriş için gerekli olan GMAT sınavına yönelik, analitik ve mantıksal akıl yürütme odaklı kapsamlı hazırlık programı.",
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
      <CourseHeroSlider courseKey="gmatLandingPage" lang={lang} />
      <CourseInfoSection courseKey="gmatLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="gmatLandingPage" lang={lang} />
      <PublicationsShowcase courseKey="gmatLandingPage" lang={lang} />
      <PlacementTestBanner lang={lang} />
      <WhyUsSection courseKey="gmatLandingPage" lang={lang} />
      <EducationModels courseKey="gmatLandingPage" lang={lang} />
      <CourseFAQ courseKey="gmatLandingPage" lang={lang} />
      <SeoContentBlock courseKey="gmatLandingPage" lang={lang} />

      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
