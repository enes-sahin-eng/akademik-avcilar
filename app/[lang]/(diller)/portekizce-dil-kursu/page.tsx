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
import { StudentReviewsAndAwards } from "../../../components/home/StudentReviewsAndAwards";
import { PortekizceTables } from "../../../components/course/PortekizceTables";

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

  const meta = (dict as any)?.portekizceLandingPage?.meta || {
    title:
      lang === "en"
        ? "Portuguese Language Course"
        : lang === "ar"
          ? "دورة اللغة البرتغالية"
          : "Portekizce Dil Kursu | Akademik Yabancı Dil Okulları",
    description:
      lang === "en"
        ? "Learn Portuguese, the 5th most spoken language in the world, with our wide range of Brazilian and Portuguese instructors."
        : lang === "ar"
          ? "تعلم البرتغالية مع كادر تدريبي من البرازيل والبرتغال ومستويات من A1 إلى C2."
          : "Portekizce dil kursu ile dünyada en yaygın 5. dil olan Portekizce'yi öğrenin. Brezilyalı ve Portekizli geniş eğitmen kadromuzla A1-C2 seviye eğitimleri.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/portekizce-dil-kursu`,
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

export default async function PortekizceDilKursuPage({ params }: PageProps) {
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
                name: "Portekizce Dil Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/portekizce-dil-kursu`,
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
            name: "Portekizce Dil Kursu",
            description:
              "Portekizce dil kursu ile dünyada en yaygın 5. dil olan Portekizce'yi öğrenin. Brezilyalı ve Portekizli geniş eğitmen kadromuzla A1-C2 seviye eğitimleri.",
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
                name: "Akademik International Kampüsleri (İstanbul, İzmir, Ankara, Bursa, Eskişehir)",
                address: "Türkiye",
              },
            },
          }),
        }}
      />

      <CourseHeroSlider courseKey="portekizceLandingPage" lang={lang} />
      <CourseInfoSection courseKey="portekizceLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="portekizceLandingPage" lang={lang} />
      <WhyUsSection courseKey="portekizceLandingPage" lang={lang} />
      <PublicationsShowcase courseKey="portekizceLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="portekizceLandingPage" lang={lang} />
      <CourseFAQ courseKey="portekizceLandingPage" lang={lang} />
      <SeoContentBlock courseKey="portekizceLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
