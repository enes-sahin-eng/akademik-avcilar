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
import { CaeTables } from "../../../components/course/CaeTables";
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

  const meta = (dict as any)?.caeLandingPage?.meta || {
    title:
      lang === "en"
        ? "CAE Preparation Course"
        : lang === "ar"
          ? "دورة التحضير لامتحان CAE"
          : "CAE Sınavı Hazırlık Kursu",
    description:
      lang === "en"
        ? "Prepare for the Cambridge English Advanced (CAE) exam with our expert instructors and certify your English proficiency internationally."
        : lang === "ar"
          ? "استعد لامتحان Cambridge English Advanced (CAE) مع المدربين الخبراء لدينا وقم باعتماد كفاءتك في اللغة الإنجليزية دوليًا."
          : "Cambridge English Advanced (CAE) sınavına uzman eğitmen kadromuzla hazırlanın, İngilizce yetkinliğinizi uluslararası arenada belgeleyin.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/cae-kursu`,
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

export default async function CaeKursuPage({ params }: PageProps) {
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
                name: "Akademik Sınav Kursları",
                item: `https://avcilaringilizcekursu.com.tr/${lang}/akademik-ingilizce-kursu`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "CAE Sınavı Hazırlık Kursu",
                item: `https://avcilaringilizcekursu.com.tr/${lang}/cae-kursu`,
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
            name: "CAE Sınavı Hazırlık Kursu",
            description: "Cambridge English Advanced (CAE) sınavına uzman eğitmen kadromuzla hazırlanın, İngilizce yetkinliğinizi uluslararası arenada belgeleyin.",
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
                name: "Avcılar İngilizce Dil Kursu",
                address: "Namık Kemal Cd. Umut İş Merkezi No:23 Kat:5, 34310 Avcılar/İstanbul",
              },
            },
          }),
        }}
      />

      {/* Hero */}
      <CourseHeroSlider courseKey="caeLandingPage" lang={lang} />

      {/* About (CAE Sınavı Nedir & Kimler Katılabilir) */}
      <CourseInfoSection courseKey="caeLandingPage" lang={lang} />
      
      {/* Sınav Bölümleri (Reading, Writing, Speaking, Listening) */}
      <GradeLevelTabs courseKey="caeLandingPage" lang={lang} />

      {/* Puanlama ve Sınav Tarihleri Tabloları */}
      <CaeTables lang={lang} />

      {/* Placement Test Banner */}
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />

      {/* SEO Text (Nasıl Başvurulur, Sınavın Önemi vb.) */}
      <SeoContentBlock courseKey="caeLandingPage" lang={lang} />

      {/* Footer Elements */}
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
