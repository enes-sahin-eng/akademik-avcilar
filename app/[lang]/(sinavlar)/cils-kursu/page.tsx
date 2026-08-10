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
import { CilsTables } from "../../../components/course/CilsTables";
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

  const meta = (dict as any)?.cilsLandingPage?.meta || {
    title:
      lang === "en"
        ? "CILS Preparation Course | Akademik International"
        : lang === "ar"
          ? "دورة التحضير لامتحان CILS | Akademik International"
          : "CILS Sınavı Hazırlık Kursu (İtalyanca) | Akademik International",
    description:
      lang === "en"
        ? "Prepare for the CILS exam required for education and citizenship in Italy with our 100% success guaranteed courses."
        : lang === "ar"
          ? "استعد لامتحان CILS المطلوب للتعليم والجنسية في إيطاليا من خلال دوراتنا المضمونة النجاح بنسبة 100٪."
          : "İtalya'da eğitim ve vatandaşlık için gerekli CILS sınavına %100 başarı garantili kursumuzla hazırlanın.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/cils-kursu`,
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

export default async function CilsKursuPage({ params }: PageProps) {
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
                name: "Akademik Sınav Kursları",
                item: `https://www.avcilarakademik.com.tr/${lang}/akademik-ingilizce-kursu`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "CILS Sınavı Hazırlık Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/cils-kursu`,
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
            name: "CILS Sınavı Hazırlık Kursu",
            description: "İtalya'da eğitim ve vatandaşlık için gerekli CILS sınavına %100 başarı garantili kursumuzla hazırlanın.",
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
      <CourseHeroSlider courseKey="cilsLandingPage" lang={lang} />

      {/* About (CILS Sınavı Nedir & Başvuru) */}
      <CourseInfoSection courseKey="cilsLandingPage" lang={lang} />
      
      {/* Sınav Bölümleri (CILS Uno, Due, Tre, Quattro) */}
      <GradeLevelTabs courseKey="cilsLandingPage" lang={lang} />

      {/* Format ve Ücretler Tablosu */}
      <CilsTables lang={lang} />

      {/* Placement Test Banner */}
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />

      {/* SEO Text (Tavsiyeler, Fiyatlar vb.) */}
      <SeoContentBlock courseKey="cilsLandingPage" lang={lang} />

      {/* Footer Elements */}
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
