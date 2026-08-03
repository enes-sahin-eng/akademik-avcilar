import type { Metadata } from "next";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../dictionaries/getDictionary";
import { Navbar } from "../../components/layout/Navbar";
import { CourseHeroSlider } from "../../components/course/CourseHeroSlider";
import { CourseInfoSection } from "../../components/course/CourseInfoSection";
import { GradeLevelTabs } from "../../components/course/GradeLevelTabs";
import { TorflComparisonTable } from "../../components/course/TorflComparisonTable";
import { SeoContentBlock } from "../../components/course/SeoContentBlock";
import { WhatsAppButton } from "../../components/ui/WhatsAppButton";
import PlacementTestBanner from "../../components/course/PlacementTestBanner";
import InstagramFeed from "../../components/social/InstagramFeed";

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

  const meta = (dict as any)?.torflLandingPage?.meta || {
    title:
      lang === "en"
        ? "TORFL Preparation Course | Akademik International"
        : lang === "ar"
          ? "دورة التحضير لامتحان TORFL | Akademik International"
          : "TORFL Sınavı Hazırlık Kursu (Rusça) | Akademik International",
    description:
      lang === "en"
        ? "Prepare for the Test of Russian as a Foreign Language (TORFL) with our 100% success guaranteed courses."
        : lang === "ar"
          ? "استعد لاختبار اللغة الروسية كلغة أجنبية (TORFL) من خلال دوراتنا المضمونة النجاح بنسبة 100٪."
          : "Rusya'da eğitim görmek ve kariyer yapmak için zorunlu olan TORFL sınavına %100 başarı garantili kursumuzla hazırlanın.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/torfl-kursu`,
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

export default async function TorflKursuPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;

  return (
    <main>
      <Navbar />

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
                name: "Akademik Sınav Kursları",
                item: `https://www.avcilarakademik.com.tr/${lang}/akademik-ingilizce-kursu`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "TORFL Sınavı Hazırlık Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/torfl-kursu`,
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
            name: "TORFL Sınavı Hazırlık Kursu",
            description: "Rusya'da eğitim görmek ve kariyer yapmak için zorunlu olan TORFL sınavına %100 başarı garantili kursumuzla hazırlanın.",
            provider: {
              "@type": "EducationalOrganization",
              name: "Akademik International Yabancı Dil Okulları",
              sameAs: "https://www.avcilarakademik.com.tr",
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Blended",
              location: {
                "@type": "Place",
                name: "Akademik International Avcılar",
                address: "Namık Kemal Cd. Umut İş Merkezi No:23 Kat:5, 34310 Avcılar/İstanbul",
              },
            },
          }),
        }}
      />

      {/* Hero */}
      <CourseHeroSlider courseKey="torflLandingPage" />

      {/* About (TORFL Sınavı Nedir & Kimler Katılabilir) */}
      <CourseInfoSection courseKey="torflLandingPage" lang={lang} />
      
      {/* Sınav Bölümleri (A1 - C2 Seviyeleri) */}
      <GradeLevelTabs courseKey="torflLandingPage" />

      {/* Karşılaştırma Tablosu */}
      <TorflComparisonTable lang={lang} />

      {/* Placement Test Banner */}
      <PlacementTestBanner />

      {/* SEO Text (Sınav Merkezleri, Tavsiyeler vb.) */}
      <SeoContentBlock courseKey="torflLandingPage" lang={lang} />

      {/* Footer Elements */}
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
