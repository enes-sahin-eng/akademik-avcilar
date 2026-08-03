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
import { TefTables } from "../../components/course/TefTables";
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

  const meta = (dict as any)?.tefLandingPage?.meta || {
    title:
      lang === "en"
        ? "TEF Preparation Course (French) | Akademik International"
        : lang === "ar"
          ? "دورة التحضير لامتحان TEF | Akademik International"
          : "TEF Sınavı Hazırlık Kursu (Fransızca) | Akademik International",
    description:
      lang === "en"
        ? "Prepare for the TEF exam, which is valid for education, residence, and citizenship in France and Canada, with our expert trainers."
        : lang === "ar"
          ? "استعد لامتحان TEF الصالح للتعليم والإقامة والجنسية في فرنسا وكندا مع مدربينا الخبراء."
          : "Fransa ve Kanada'da eğitim, oturum ve vatandaşlık için geçerli TEF sınavına uzman eğitmen kadromuzla hazırlanın.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/tef-kursu`,
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

export default async function TefKursuPage({ params }: PageProps) {
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
                name: "TEF Sınavı Hazırlık Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/tef-kursu`,
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
            name: "TEF Sınavı Hazırlık Kursu",
            description: "Fransa ve Kanada'da eğitim, oturum ve vatandaşlık için geçerli TEF sınavına uzman eğitmen kadromuzla hazırlanın.",
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
      <CourseHeroSlider courseKey="tefLandingPage" />

      {/* About (TEF Sınavı Nedir & Neden Tercih Edilir?) */}
      <CourseInfoSection courseKey="tefLandingPage" lang={lang} />
      
      {/* Sınav Bölümleri (Uygulama Alanları: Canada, Quebec vs.) */}
      <GradeLevelTabs courseKey="tefLandingPage" />

      {/* Tarihler Tablosu */}
      <TefTables lang={lang} />

      {/* Placement Test Banner */}
      <PlacementTestBanner />

      {/* SEO Text (Tavsiyeler, Fiyatlar vb.) */}
      <SeoContentBlock courseKey="tefLandingPage" lang={lang} />

      {/* Footer Elements */}
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
