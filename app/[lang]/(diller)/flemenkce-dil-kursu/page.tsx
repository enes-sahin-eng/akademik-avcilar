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
        ? "Dutch (Flemish) Language Course | Akademik International"
        : lang === "ar"
          ? "دورة اللغة الهولندية (الفلمنكية) | Akademik International"
          : "Flemenkçe (Hollandaca) Dil Kursu | Akademik Yabancı Dil Kursları",
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
                name: "Flemenkçe Dil Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/flemenkce-dil-kursu`,
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
              name: "Akademik Yabancı Dil Kursları",
              sameAs: "https://www.avcilarakademik.com.tr",
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Blended",
              location: {
                "@type": "Place",
                name: "Akademik International Kampüsleri (Ankara, Bursa, İzmir, Eskişehir, İstanbul)",
                address: "Türkiye",
              },
            },
          }),
        }}
      />

      {/* Hero */}
      <CourseHeroSlider courseKey="flemenkceLandingPage" lang={lang} />

      {/* About (Eğitim Nedir & Avantajları) */}
      <CourseInfoSection courseKey="flemenkceLandingPage" lang={lang} />

      {/* Seviyeler (A1 - C2) */}
      <GradeLevelTabs courseKey="flemenkceLandingPage" lang={lang} />

      {/* Yayınlar */}
      <PublicationsShowcase courseKey="flemenkceLandingPage" lang={lang} />

      {/* Placement Test Banner */}
      <PlacementTestBanner lang={lang} />

      {/* Neden Biz */}
      <WhyUsSection courseKey="flemenkceLandingPage" lang={lang} />

      {/* Eğitim Modelleri (Örgün / Online) */}
      <EducationModels courseKey="flemenkceLandingPage" lang={lang} />

      {/* SSS */}
      <CourseFAQ courseKey="flemenkceLandingPage" lang={lang} />

      {/* SEO Text (Aile Birleşimi, Uyum Sınavı vb.) */}
      <SeoContentBlock courseKey="flemenkceLandingPage" lang={lang} />

      {/* Footer Elements */}
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
