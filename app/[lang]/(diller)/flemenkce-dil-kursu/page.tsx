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

  const meta = (dict as any)?.flemenkceLandingPage?.meta || {
    title:
      lang === "en"
        ? "Dutch (Flemish) Language Course"
        : lang === "ar"
          ? "دورة اللغة الهولندية (الفلمنكية)"
          : "Flemenkçe (Hollandaca) Dil Kursu | Avcılar İngilizce Dil Kursu",
    description:
      lang === "en"
        ? "Prepare for the Netherlands Family Reunification and Integration exams with our comprehensive Dutch courses from A1 to C2 levels."
        : lang === "ar"
          ? "استعد لامتحانات لم الشمل والاندماج في هولندا من خلال دوراتنا الشاملة في اللغة الهولندية من المستوى A1 إلى C2."
          : "Hollanda Aile Birleşimi ve Uyum Sınavlarına yönelik, uzman akademisyen kadromuzla A1'den C2'ye kadar kapsamlı Flemenkçe (Hollandaca) eğitimi alın.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/flemenkce-dil-kursu`,
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

export default async function FlemenkceDilKursuPage({ params }: PageProps) {
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
                name: "Flemenkçe Dil Kursu",
                item: `https://www.avcilaringilizcekursu.com.tr/${lang}/flemenkce-dil-kursu`,
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
            name: "Flemenkçe Dil Kursu",
            description:
              "Hollanda ve Belçika'da eğitim veya yaşam planlayanlar için Aile Birleşimi ve Uyum Sınavı odaklı, A1'den C2'ye kadar kapsamlı Flemenkçe (Hollandaca) dil eğitimi.",
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
                name: "Avcılar İngilizce Dil Kursu Kampüsleri (Ankara, Bursa, İzmir, Eskişehir, İstanbul)",
                address: "Türkiye",
              },
            },
          }),
        }}
      />

      <CourseHeroSlider courseKey="flemenkceLandingPage" lang={lang} />
      <CourseInfoSection courseKey="flemenkceLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="flemenkceLandingPage" lang={lang} />
      <WhyUsSection courseKey="flemenkceLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="flemenkceLandingPage" lang={lang} />
      <CourseFAQ courseKey="flemenkceLandingPage" lang={lang} />
      <SeoContentBlock courseKey="flemenkceLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
