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
import { ArapcaTables } from "../../../components/course/ArapcaTables";

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

  const meta = (dict as any)?.arapcaLandingPage?.meta || {
    title:
      lang === "en"
        ? "Arabic Language Course"
        : lang === "ar"
          ? "دورة اللغة العربية"
          : "Arapça Dil Kursu | Avcılar İngilizce Dil Kursu",
    description:
      lang === "en"
        ? "Learn Arabic with native-speaking instructors. A1-C2 levels, YDS preparation, and comprehensive education for the Middle East."
        : lang === "ar"
          ? "تعلم العربية مع مدربين ناطقين بها. مستويات A1-C2 وتحضير لامتحان YDS."
          : "Ana dili Arapça olan eğitmenlerimizle Arapça öğrenin. A1-C2 seviyeleri, YDS Arapça hazırlık ve Ortadoğu ülkeleri için kapsamlı dil eğitimi.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/arapca-dil-kursu`,
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

export default async function ArapcaDilKursuPage({ params }: PageProps) {
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
                name: "Arapça Dil Kursu",
                item: `https://www.avcilaringilizcekursu.com.tr/${lang}/arapca-dil-kursu`,
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
            name: "Arapça Dil Kursu",
            description:
              "Ana dili Arapça olan eğitmenlerimizle Arapça öğrenin. A1-C2 seviyeleri, YDS Arapça hazırlık ve Ortadoğu ülkeleri için kapsamlı dil eğitimi.",
            provider: {
              "@type": "EducationalOrganization",
              name: "Avcılar İngilizce Dil Kursu",
              sameAs: "https://www.avcilaringilizcekursu.com.tr",
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Blended",
              location: {
                "@type": "Place",
                name: "Avcılar İngilizce Dil Kursu Kampüsleri (İstanbul, İzmir, Ankara, Bursa, Eskişehir, Tekirdağ)",
                address: "Türkiye",
              },
            },
          }),
        }}
      />

      <CourseHeroSlider courseKey="arapcaLandingPage" lang={lang} />
      <CourseInfoSection courseKey="arapcaLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="arapcaLandingPage" lang={lang} />
      <WhyUsSection courseKey="arapcaLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="arapcaLandingPage" lang={lang} />
      <CourseFAQ courseKey="arapcaLandingPage" lang={lang} />
      <SeoContentBlock courseKey="arapcaLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
