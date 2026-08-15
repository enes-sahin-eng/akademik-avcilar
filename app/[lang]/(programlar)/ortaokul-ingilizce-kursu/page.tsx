import type { Metadata } from "next";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../../dictionaries/getDictionary";
import { Navbar } from "../../../components/layout/Navbar";
import { CourseHeroSlider } from "../../../components/course/CourseHeroSlider";
import { CourseInfoSection } from "../../../components/course/CourseInfoSection";
import { WhyUsSection } from "../../../components/course/WhyUsSection";
import { EducationModels } from "../../../components/course/EducationModels";
import { CourseFAQ } from "../../../components/course/CourseFAQ";
import { WhatsAppButton } from "../../../components/ui/WhatsAppButton";
import PlacementTestBanner from "../../../components/course/PlacementTestBanner";
import InstagramFeed from "../../../components/social/InstagramFeed";
import { GradeLevelTabs } from "../../../components/course/GradeLevelTabs";
import { SeoContentBlock } from "../../../components/course/SeoContentBlock";
import { StudentReviewsAndAwards } from "../../../components/home/StudentReviewsAndAwards";

interface PageProps {
  params: Promise<{
    lang: any;
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

  const meta = (dict as any)?.ortaokulIngilizceLandingPage?.meta || {
    title:
      lang === "en"
        ? "Middle School English Course & Tutoring"
        : lang === "ar"
          ? "دورة اللغة الإنجليزية للمرحلة المتوسطة"
          : "Ortaokul İngilizce Kursu | LGS Hazırlık ve Konuşma Odaklı",
    description:
      lang === "en"
        ? "Conversation-focused English course for middle school students, supporting school grades and high school transition exams. Speak English fluently."
        : lang === "ar"
          ? "دورة لغة إنجليزية تركز على المحادثة لطلاب المرحلة المتوسطة، وتدعم الدرجات المدرسية والإعداد للامتحانات. تحدث الإنجليزية بطلاقة."
          : "Ortaokul (5, 6, 7 ve 8. sınıf) öğrencilerine özel, LGS hazırlık altyapısı sunan ve okul başarısını destekleyen, konuşma odaklı İngilizce kursu.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/ortaokul-ingilizce-kursu`,
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

export default async function OrtaokulIngilizcePage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  // Dinamik SSS Verisi
  const faqItems =
    (dict as any)?.ortaokulIngilizceLandingPage?.faq?.items || [];

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
                item: "https://www.avcilaringilizcekursu.com.tr",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Ortaokul İngilizce Kursu",
                item: `https://www.avcilaringilizcekursu.com.tr/${lang}/ortaokul-ingilizce-kursu`,
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
            name: "Ortaokul İngilizce Kursu",
            description:
              "Ortaokul (5, 6, 7 ve 8. sınıf) öğrencilerine özel, LGS hazırlık altyapısı sunan ve okul başarısını destekleyen, konuşma odaklı İngilizce kursu.",
            provider: {
              "@type": "EducationalOrganization",
              name: "Akademik International Yabancı Dil Okulları",
              sameAs: "https://www.avcilaringilizcekursu.com.tr",
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

      <CourseHeroSlider courseKey="ortaokulIngilizceLandingPage" lang={lang} />
      <CourseInfoSection courseKey="ortaokulIngilizceLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="ortaokulIngilizceLandingPage" lang={lang} />
      <WhyUsSection courseKey="ortaokulIngilizceLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="ortaokulIngilizceLandingPage" lang={lang} />
      <CourseFAQ courseKey="ortaokulIngilizceLandingPage" lang={lang} />
      <SeoContentBlock courseKey="ortaokulIngilizceLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
