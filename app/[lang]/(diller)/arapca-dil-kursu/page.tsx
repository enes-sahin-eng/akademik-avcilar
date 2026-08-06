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
        ? "Arabic Language Course | Akademik International"
        : lang === "ar"
          ? "دورة اللغة العربية | Akademik International"
          : "Arapça Dil Kursu | Akademik Yabancı Dil Kursları",
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
                name: "Arapça Dil Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/arapca-dil-kursu`,
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
              name: "Akademik Yabancı Dil Kursları",
              sameAs: "https://www.avcilarakademik.com.tr",
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

      {/* Hero */}
      <CourseHeroSlider courseKey="arapcaLandingPage" lang={lang} />

      {/* About */}
      <CourseInfoSection courseKey="arapcaLandingPage" lang={lang} />

      {/* Seviyeler (A1-A2, B1-B2, C1-C2) */}
      <GradeLevelTabs courseKey="arapcaLandingPage" lang={lang} />

      {/* Arapça Konuşulan Ülkeler Tablosu (Özel) */}
      <ArapcaTables lang={lang} />

      {/* Yayınlar */}
      <PublicationsShowcase courseKey="arapcaLandingPage" lang={lang} />

      {/* Placement Test Banner */}
      <PlacementTestBanner lang={lang} />

      {/* Neden Biz */}
      <WhyUsSection courseKey="arapcaLandingPage" lang={lang} />

      {/* Eğitim Modelleri */}
      <EducationModels courseKey="arapcaLandingPage" lang={lang} />

      {/* SSS */}
      <CourseFAQ courseKey="arapcaLandingPage" lang={lang} />

      {/* SEO Text */}
      <SeoContentBlock courseKey="arapcaLandingPage" lang={lang} />

      {/* Footer Elements */}
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
