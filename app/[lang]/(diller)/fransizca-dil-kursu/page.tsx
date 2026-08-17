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

  const meta = (dict as any)?.fransizcaLandingPage?.meta || {
    title:
      lang === "en"
        ? "French Language Course"
        : lang === "ar"
          ? "دورة اللغة الفرنسية"
          : "Fransızca Dil Kursu | Avcılar İngilizce Dil Kursu",
    description:
      lang === "en"
        ? "Learn French, the universal language of 250 million people, with Turkey's best French course from A1 to B2 levels."
        : lang === "ar"
          ? "تعلم الفرنسية، اللغة العالمية لـ 250 مليون شخص، مع أفضل دورة لغة فرنسية في تركيا من مستوى A1 إلى B2."
          : "50 ülkede 250 milyondan fazla insanın konuştuğu Fransızcayı, Türkiye'nin en iyi Fransızca kursunda A1'den B2'ye kadar uzman kadroyla öğrenin.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/fransizca-dil-kursu`,
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

export default async function FransizcaDilKursuPage({ params }: PageProps) {
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
                item: "https://avcilaringilizcekursu.com.tr",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Tüm Kurslar",
                item: `https://avcilaringilizcekursu.com.tr/${lang}/kurslar`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Fransızca Dil Kursu",
                item: `https://avcilaringilizcekursu.com.tr/${lang}/fransizca-dil-kursu`,
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
            name: "Fransızca Dil Kursu",
            description:
              "Profesyonel eğitim müfredatı ve alanında uzman öğretmen ekibiyle, A1'den B2'ye kadar Avrupa Dilleri Ortak Çerçeve Programına uygun Fransızca eğitimi.",
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
                name: "Avcılar İngilizce Dil Kursu Kampüsleri",
                address: "Türkiye",
              },
            },
          }),
        }}
      />

      <CourseHeroSlider courseKey="fransizcaLandingPage" lang={lang} />
      <CourseInfoSection courseKey="fransizcaLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="fransizcaLandingPage" lang={lang} />
      <WhyUsSection courseKey="fransizcaLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="fransizcaLandingPage" lang={lang} />
      <CourseFAQ courseKey="fransizcaLandingPage" lang={lang} />
      <SeoContentBlock courseKey="fransizcaLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
