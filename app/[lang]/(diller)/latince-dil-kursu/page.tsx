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

  const meta = (dict as any)?.latinceLandingPage?.meta || {
    title:
      lang === "en"
        ? "Latin Language Course | Akademik International"
        : lang === "ar"
          ? "دورة اللغة اللاتينية | Akademik International"
          : "Latince Dil Kursu | Akademik Yabancı Dil Kursları",
    description:
      lang === "en"
        ? "Learn Latin, the foundation of modern science and European languages. Expert academic instruction from A1 to C2 levels."
        : lang === "ar"
          ? "تعلم اللاتينية، أساس العلوم الحديثة واللغات الأوروبية. تعليم أكاديمي خبير من المستوى A1 إلى C2."
          : "Modern bilime ve Avrupa dillerine ışık tutan Latinceyi, akademisyen kökenli eğitmenlerimizle A1'den C2'ye kadar kapsamlı bir şekilde öğrenin.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/latince-dil-kursu`,
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

export default async function LatinceDilKursuPage({ params }: PageProps) {
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
                name: "Latince Dil Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/latince-dil-kursu`,
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
            name: "Latince Dil Kursu",
            description:
              "Hukuk, Tıp ve Edebiyat terminolojisinin temeli olan Latinceyi; A1'den C2'ye kadar uzman akademisyen kadrosuyla öğrenin.",
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
                name: "Akademik International Kampüsleri (İstanbul, Bursa, Eskişehir, İzmir, Tekirdağ)",
                address: "Türkiye",
              },
            },
          }),
        }}
      />

      <CourseHeroSlider courseKey="latinceLandingPage" lang={lang} />
      <CourseInfoSection courseKey="latinceLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="latinceLandingPage" lang={lang} />
      <WhyUsSection courseKey="latinceLandingPage" lang={lang} />
      <PublicationsShowcase courseKey="latinceLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="latinceLandingPage" lang={lang} />
      <CourseFAQ courseKey="latinceLandingPage" lang={lang} />
      <SeoContentBlock courseKey="latinceLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
