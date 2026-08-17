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

  const meta = (dict as any)?.italyancaLandingPage?.meta || {
    title:
      lang === "en"
        ? "Italian Language Course"
        : lang === "ar"
          ? "دورة اللغة الإيطالية"
          : "İtalyanca Dil Kursu | Avcılar İngilizce Dil Kursu",
    description:
      lang === "en"
        ? "Learn Italian, the language of art, fashion, and cuisine, from A1 to C2 levels with Turkey's best language course."
        : lang === "ar"
          ? "تعلم اللغة الإيطالية، لغة الفن والموضة والمطبخ، من المستويات A1 إلى C2 مع أفضل دورة لغة في تركيا."
          : "Sanat, moda, müzik ve mutfak kültürünün dili İtalyancayı, Türkiye'nin en iyi dil kursunda A1'den C2'ye kadar uzman eğitmenlerle öğrenin.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/italyanca-dil-kursu`,
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

export default async function ItalyancaDilKursuPage({ params }: PageProps) {
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
                name: "İtalyanca Dil Kursu",
                item: `https://avcilaringilizcekursu.com.tr/${lang}/italyanca-dil-kursu`,
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
            name: "İtalyanca Dil Kursu",
            description:
              "Fonetiği, aksanı ve müzikalitesiyle dünyanın en estetik dillerinden biri olan İtalyancayı A1'den C2'ye uzanan profesyonel bir müfredatla öğrenin.",
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

      <CourseHeroSlider courseKey="italyancaLandingPage" lang={lang} />
      <CourseInfoSection courseKey="italyancaLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="italyancaLandingPage" lang={lang} />
      <WhyUsSection courseKey="italyancaLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="italyancaLandingPage" lang={lang} />
      <CourseFAQ courseKey="italyancaLandingPage" lang={lang} />
      <SeoContentBlock courseKey="italyancaLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
