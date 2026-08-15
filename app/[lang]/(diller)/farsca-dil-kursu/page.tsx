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

  const meta = (dict as any)?.farscaLandingPage?.meta || {
    title:
      lang === "en"
        ? "Persian Language Course"
        : lang === "ar"
          ? "دورة اللغة الفارسية"
          : "Farsça Dil Kursu | Akademik Yabancı Dil Kursları",
    description:
      lang === "en"
        ? "Learn Persian, the language of the East, effectively with our native speaker instructors and VIP classes."
        : lang === "ar"
          ? "تعلم اللغة الفارسية، لغة الشرق، بفعالية مع مدربينا الناطقين بها وفصول VIP."
          : "Doğunun en güzide dillerinden Farsçayı, anadili Farsça olan eğitmenlerimizle VIP sınıflarda kısa sürede etkili bir şekilde öğrenin.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/farsca-dil-kursu`,
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

export default async function FarscaDilKursuPage({ params }: PageProps) {
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
                name: "Farsça Dil Kursu",
                item: `https://www.avcilaringilizcekursu.com.tr/${lang}/farsca-dil-kursu`,
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
            name: "Farsça Dil Kursu",
            description:
              "Anadili Farsça olan eğitmenlerle, İran Milli Eğitim Bakanlığı ve CEFR standartlarına uygun, iletişimsel temellere dayanan Farsça ve Farsça YDS hazırlık eğitimi.",
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
                name: "Akademik International Kampüsleri (Bursa, İstanbul, İzmir, Eskişehir, Tekirdağ, Ankara)",
                address: "Türkiye",
              },
            },
          }),
        }}
      />

      <CourseHeroSlider courseKey="farscaLandingPage" lang={lang} />
      <CourseInfoSection courseKey="farscaLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="farscaLandingPage" lang={lang} />
      <WhyUsSection courseKey="farscaLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="farscaLandingPage" lang={lang} />
      <CourseFAQ courseKey="farscaLandingPage" lang={lang} />
      <SeoContentBlock courseKey="farscaLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
