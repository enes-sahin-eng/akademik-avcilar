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
import { WhyUsSection } from "../../../components/course/WhyUsSection";
import { EducationModels } from "../../../components/course/EducationModels";
import { CourseFAQ } from "../../../components/course/CourseFAQ";
import { SeoContentBlock } from "../../../components/course/SeoContentBlock";
import { WhatsAppButton } from "../../../components/ui/WhatsAppButton";
import PlacementTestBanner from "../../../components/course/PlacementTestBanner";
import InstagramFeed from "../../../components/social/InstagramFeed";
import { StudentReviewsAndAwards } from "../../../components/home/StudentReviewsAndAwards";

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

  const meta = (dict as any)?.ispanyolcaLandingPage?.meta || {
    title:
      lang === "en"
        ? "Spanish Language Course"
        : lang === "ar"
          ? "دورة اللغة الإسبانية"
          : "İspanyolca Dil Kursu | Akademik Yabancı Dil Kursları",
    description:
      lang === "en"
        ? "Reach your goals with Turkey's best Spanish language course. A1-C2 level training, expert instructors, and four-skill-focused education."
        : lang === "ar"
          ? "حقق أهدافك مع أفضل دورة للغة الإسبانية في تركيا. تدريب من المستوى A1 إلى C2 مع مدربين خبراء."
          : "Türkiye'nin en iyi İspanyolca dil kursu ile hedeflerinize ulaşın. A1-C2 seviye eğitimleri, uzman eğitmen kadrosu ve dört beceri odaklı eğitim.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/ispanyolca-dil-kursu`,
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

export default async function IspanyolcaDilKursuPage({ params }: PageProps) {
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
                item: "https://www.avcilaringilizcekursu.com.tr",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Tüm Kurslar",
                item: `https://www.avcilaringilizcekursu.com.tr/${lang}/kurslar`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "İspanyolca Dil Kursu",
                item: `https://www.avcilaringilizcekursu.com.tr/${lang}/ispanyolca-dil-kursu`,
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
            name: "İspanyolca Dil Kursu",
            description:
              "Dünyada en yaygın 3. dil olan İspanyolcayı, A1-C2 seviye eğitimleriyle dört beceri odaklı uzman eğitmen kadrosuyla öğrenin.",
            provider: {
              "@type": "EducationalOrganization",
              name: "Akademik Yabancı Dil Kursları",
              sameAs: "https://www.avcilaringilizcekursu.com.tr",
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Blended",
              location: {
                "@type": "Place",
                name: "Akademik International Kampüsleri (İstanbul, İzmir, Ankara, Bursa, Eskişehir, Tekirdağ)",
                address: "Türkiye",
              },
            },
          }),
        }}
      />

      <CourseHeroSlider courseKey="ispanyolcaLandingPage" lang={lang} />
      <CourseInfoSection courseKey="ispanyolcaLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="ispanyolcaLandingPage" lang={lang} />
      <WhyUsSection courseKey="ispanyolcaLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="ispanyolcaLandingPage" lang={lang} />
      <CourseFAQ courseKey="ispanyolcaLandingPage" lang={lang} />
      <SeoContentBlock courseKey="ispanyolcaLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
