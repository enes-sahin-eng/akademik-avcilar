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

  const meta = (dict as any)?.fransizcaLandingPage?.meta || {
    title:
      lang === "en"
        ? "French Language Course | Akademik International"
        : lang === "ar"
          ? "دورة اللغة الفرنسية | Akademik International"
          : "Fransızca Dil Kursu | Akademik Yabancı Dil Kursları",
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
                name: "Fransızca Dil Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/fransizca-dil-kursu`,
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
              name: "Akademik Yabancı Dil Kursları",
              sameAs: "https://www.avcilarakademik.com.tr",
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Blended",
              location: {
                "@type": "Place",
                name: "Akademik International Kampüsleri",
                address: "Türkiye",
              },
            },
          }),
        }}
      />

      {/* Hero */}
      <CourseHeroSlider courseKey="fransizcaLandingPage" lang={lang} />

      {/* About (Fransızca Eğitimi Nedir & Avantajları) */}
      <CourseInfoSection courseKey="fransizcaLandingPage" lang={lang} />

      {/* Seviyeler (A1, A2, B1.1, B1.2, B2) */}
      <GradeLevelTabs courseKey="fransizcaLandingPage" lang={lang} />

      {/* Yayınlar */}
      <PublicationsShowcase courseKey="fransizcaLandingPage" lang={lang} />

      {/* Placement Test Banner */}
      <PlacementTestBanner lang={lang} />

      {/* Neden Biz */}
      <WhyUsSection courseKey="fransizcaLandingPage" lang={lang} />

      {/* Eğitim Modelleri (Örgün / Online) */}
      <EducationModels courseKey="fransizcaLandingPage" lang={lang} />

      {/* SSS */}
      <CourseFAQ courseKey="fransizcaLandingPage" lang={lang} />

      {/* SEO Text */}
      <SeoContentBlock courseKey="fransizcaLandingPage" lang={lang} />

      {/* Footer Elements */}
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
