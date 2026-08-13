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
import { StudentReviewsAndAwards } from "../../../components/home/StudentReviewsAndAwards";
import { RuscaTables } from "../../../components/course/RuscaTables";

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

  const meta = (dict as any)?.ruscaLandingPage?.meta || {
    title:
      lang === "en"
        ? "Russian Language Course"
        : lang === "ar"
          ? "دورة اللغة الروسية"
          : "Rusça Dil Kursu | Akademik Yabancı Dil Kursları",
    description:
      lang === "en"
        ? "Master Russian, spoken by over 300 million people. A1-B2 level training, expert instructors, and affordable prices."
        : lang === "ar"
          ? "أتقن اللغة الروسية التي يتحدثها أكثر من 300 مليون شخص. تدريب من A1 إلى B2 مع مدربين خبراء."
          : "Rusça dil kursu ile 300 milyondan fazla kişinin konuştuğu bu Slav diline hakim olun. A1-B2 seviye eğitimleri, uzman eğitmenler ve uygun fiyatlar.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/rusca-dil-kursu`,
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

export default async function RuscaDilKursuPage({ params }: PageProps) {
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
                name: "Rusça Dil Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/rusca-dil-kursu`,
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
            name: "Rusça Dil Kursu",
            description:
              "Rusça dil kursu ile 300 milyondan fazla kişinin konuştuğu bu Slav diline hakim olun. A1-B2 seviye eğitimleri, uzman eğitmenler ve uygun fiyatlar.",
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
                name: "Akademik International Kampüsleri (İstanbul, İzmir, Ankara, Bursa, Eskişehir)",
                address: "Türkiye",
              },
            },
          }),
        }}
      />

      <CourseHeroSlider courseKey="ruscaLandingPage" lang={lang} />
      <CourseInfoSection courseKey="ruscaLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="ruscaLandingPage" lang={lang} />
      <WhyUsSection courseKey="ruscaLandingPage" lang={lang} />
      <PublicationsShowcase courseKey="ruscaLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="ruscaLandingPage" lang={lang} />
      <CourseFAQ courseKey="ruscaLandingPage" lang={lang} />
      <SeoContentBlock courseKey="ruscaLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
