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
import { PteCentersTable } from "../../../components/course/PteCentersTable";
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

  const meta = (dict as any)?.pteLandingPage?.meta || {
    title:
      lang === "en"
        ? "PTE Preparation Course"
        : lang === "ar"
          ? "دورة التحضير لامتحان PTE"
          : "PTE Sınavı Hazırlık Kursu",
    description:
      lang === "en"
        ? "Prepare for the Pearson Test of English (PTE) with our expert teaching staff and reach your target score in a short time."
        : lang === "ar"
          ? "استعد لاختبار بيرسون للغة الإنجليزية (PTE) مع طاقمنا التعليمي الخبير للوصول إلى الدرجة المستهدفة في وقت قصير."
          : "Pearson Test of English (PTE) sınavına uzman eğitmen kadromuzla hazırlanın, hedeflediğiniz skora kısa sürede ulaşın.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/pte-kursu`,
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

export default async function PteKursuPage({ params }: PageProps) {
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
                name: "PTE Sınavı Hazırlık Kursu",
                item: `https://avcilaringilizcekursu.com.tr/${lang}/pte-kursu`,
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
            name: "PTE Sınavı Hazırlık Kursu",
            description: "Pearson Test of English (PTE) sınavına uzman eğitmen kadromuzla hazırlanın, hedeflediğiniz skora kısa sürede ulaşın.",
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
      <CourseHeroSlider courseKey="pteLandingPage" lang={lang} />

      {/* About (PTE Sınavı Nedir & Avantajları) */}
      <CourseInfoSection courseKey="pteLandingPage" lang={lang} />
      
      {/* Sınav Süreci (Listening, Reading, Writing, Speaking) */}
      <GradeLevelTabs courseKey="pteLandingPage" lang={lang} />

      {/* Sınav Merkezleri Tablosu */}
      <PteCentersTable lang={lang} />

      {/* Placement Test Banner */}
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />

      {/* SEO Text (Psikoloji) */}
      <SeoContentBlock courseKey="pteLandingPage" lang={lang} />

      {/* Footer Elements */}
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
