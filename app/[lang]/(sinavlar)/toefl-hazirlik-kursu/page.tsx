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
import { StudentReviewsAndAwards } from "../../../components/home/StudentReviewsAndAwards";
import { SeoContentBlock } from "../../../components/course/SeoContentBlock";
import { GradeLevelTabs } from "../../../components/course/GradeLevelTabs";

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

  const meta = (dict as any)?.toeflLandingPage?.meta || {
    title:
      lang === "en"
        ? "TOEFL Preparation Course"
        : lang === "ar"
          ? "دورة التحضير لامتحان TOEFL"
          : "TOEFL Hazırlık Kursu",
    description:
      lang === "en"
        ? "Achieve your target score in the TOEFL exam with our expert instructors and comprehensive study materials."
        : lang === "ar"
          ? "حقق النتيجة المستهدفة في امتحان TOEFL مع مدربينا الخبراء ومواد الدراسة الشاملة."
          : "Elektronik ortamda gerçekleştirilen TOEFL sınavında yüksek skor elde etmek için derece skora sahip uzman eğitmenlerimizle hazırlanın.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/toefl-hazirlik-kursu`,
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

export default async function ToeflHazirlikKursuPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  // Dinamik SSS Verisi (JSON-LD için)
  const faqItems = (dict as any)?.toeflLandingPage?.faq?.items || [];

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
                item: "https://avcilaringilizcekursu.com.tr",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Akademik Sınav Kursları",
                item: `https://avcilaringilizcekursu.com.tr/${lang}/akademik-ingilizce-kursu`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "TOEFL Hazırlık Kursu",
                item: `https://avcilaringilizcekursu.com.tr/${lang}/toefl-hazirlik-kursu`,
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
            name: "TOEFL Hazırlık Kursu",
            description:
              "Yurt dışında eğitim almak isteyen öğrenciler, burs/sertifika adayları ve vize başvurusu yapanlar için 4 temel beceriyi (Okuma, Dinleme, Konuşma, Yazma) geliştirmeye yönelik yoğun TOEFL hazırlık programı.",
            provider: {
              "@type": "EducationalOrganization",
              name: "Avcılar İngilizce Dil Kursu",
              sameAs: "https://avcilaringilizcekursu.com.tr",
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Blended",
              location: {
                "@type": "Place",
                name: "Avcılar İngilizce Dil Kursu",
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

      <CourseHeroSlider courseKey="toeflLandingPage" lang={lang} />
      <CourseInfoSection courseKey="toeflLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="toeflLandingPage" lang={lang} />
      <WhyUsSection courseKey="toeflLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="toeflLandingPage" lang={lang} />
      <CourseFAQ courseKey="toeflLandingPage" lang={lang} />
      <SeoContentBlock courseKey="toeflLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
