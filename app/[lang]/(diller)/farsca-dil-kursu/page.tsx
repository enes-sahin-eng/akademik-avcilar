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

  const meta = (dict as any)?.farscaLandingPage?.meta || {
    title:
      lang === "en"
        ? "Persian Language Course | Akademik International"
        : lang === "ar"
          ? "دورة اللغة الفارسية | Akademik International"
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
                name: "Farsça Dil Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/farsca-dil-kursu`,
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
              sameAs: "https://www.avcilarakademik.com.tr",
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

      {/* Hero */}
      <CourseHeroSlider courseKey="farscaLandingPage" lang={lang} />

      {/* About (Farsça Eğitimi Nedir & Avantajları) */}
      <CourseInfoSection courseKey="farscaLandingPage" lang={lang} />

      {/* Seviyeler (Sıtıh-e Avval, Dovvom, Sevvom, Chaharom) */}
      <GradeLevelTabs courseKey="farscaLandingPage" lang={lang} />

      {/* Yayınlar */}
      <PublicationsShowcase courseKey="farscaLandingPage" lang={lang} />

      {/* Placement Test Banner */}
      <PlacementTestBanner lang={lang} />

      {/* Neden Biz */}
      <WhyUsSection courseKey="farscaLandingPage" lang={lang} />

      {/* Eğitim Modelleri (Örgün / Online) */}
      <EducationModels courseKey="farscaLandingPage" lang={lang} />

      {/* SSS */}
      <CourseFAQ courseKey="farscaLandingPage" lang={lang} />

      {/* SEO Text (YDS Hazırlık, Fiyatlar, Dilin Önemi vb.) */}
      <SeoContentBlock courseKey="farscaLandingPage" lang={lang} />

      {/* Footer Elements */}
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
