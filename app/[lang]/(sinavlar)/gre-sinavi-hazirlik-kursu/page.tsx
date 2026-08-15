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

  const meta = (dict as any)?.greLandingPage?.meta || {
    title:
      lang === "en"
        ? "GRE Preparation Course | High Score Guarantee"
        : lang === "ar"
          ? "دورة التحضير لاختبار GRE"
          : "GRE Hazırlık Kursu | Yüksek Skor Garantili Eğitim",
    description:
      lang === "en"
        ? "Achieve your target score with our intensive GRE preparation course. Expert instructors, analytical problem-solving techniques, and comprehensive materials."
        : lang === "ar"
          ? "حقق النتيجة المستهدفة من خلال دورة التحضير المكثفة لاختبار GRE. مدربون خبراء وتقنيات حل المشكلات التحليلية."
          : "GRE sınavında hedeflediğiniz yüksek skora uzman eğitmen kadromuz, analitik soru çözüm tekniklerimiz ve zengin yayın desteğimizle ulaşın.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/gre-sinavi-hazirlik-kursu`,
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

export default async function GreHazirlikKursuPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  // Dinamik SSS Verisi (JSON-LD için)
  const faqItems = (dict as any)?.greLandingPage?.faq?.items || [];

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
                name: "Akademik Sınav Kursları",
                item: `https://www.avcilaringilizcekursu.com.tr/${lang}/akademik-ingilizce-kursu`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "GRE Hazırlık Kursu",
                item: `https://www.avcilaringilizcekursu.com.tr/${lang}/gre-sinavi-hazirlik-kursu`,
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
            name: "GRE Hazırlık Kursu",
            description:
              "Amerika ve dünyanın önde gelen üniversitelerinde yüksek lisans ve doktora eğitimi almak isteyen adaylar için özel stratejilerle hazırlanan yoğun GRE (Graduate Record Examinations) eğitim programı.",
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

      {/* --- İÇERİK BİLEŞENLERİ --- */}

      <CourseHeroSlider courseKey="greLandingPage" lang={lang} />
      <CourseInfoSection courseKey="greLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="greLandingPage" lang={lang} />
      <WhyUsSection courseKey="greLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="greLandingPage" lang={lang} />
      <CourseFAQ courseKey="greLandingPage" lang={lang} />
      <SeoContentBlock courseKey="greLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
