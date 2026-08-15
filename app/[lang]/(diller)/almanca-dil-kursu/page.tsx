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

  const meta = (dict as any)?.almancaLandingPage?.meta || {
    title:
      lang === "en"
        ? "German Language Course"
        : lang === "ar"
          ? "دورة اللغة الألمانية"
          : "Almanca Dil Kursu | Avcılar İngilizce Dil Kursu",
    description:
      lang === "en"
        ? "Achieve your goals with Turkey's best German course. Expert instructors, A1-B2 level training, and specific preparation for Family Reunification."
        : lang === "ar"
          ? "حقق أهدافك مع أفضل دورة للغة الألمانية في تركيا. مدربون خبراء، تدريب من المستوى A1 إلى B2، وإعداد خاص للم الشمل العائلي."
          : "Türkiye'nin en iyi Almanca dil kursu ile hedeflerinize ulaşın. Uzman eğitmen kadrosu, A1-B2 seviye eğitimleri ve Aile Birleşimi hazırlığı.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/almanca-dil-kursu`,
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

export default async function AlmancaDilKursuPage({ params }: PageProps) {
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
                item: "https://www.avcilaringilizcekursu.com.tr",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Tüm Kurslar",
                item: `https://www.avcilaringilizcekursu.com.tr/${lang}/kurslar`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Almanca Dil Kursu",
                item: `https://www.avcilaringilizcekursu.com.tr/${lang}/almanca-dil-kursu`,
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
            name: "Almanca Dil Kursu",
            description:
              "Avrupa Dil Portföyü standartlarında, A1'den B2'ye kadar 4 temel beceri odaklı, uzman eğitmenlerle sunulan kapsamlı Almanca dil eğitimi ve Aile Birleşimi kursu.",
            provider: {
              "@type": "EducationalOrganization",
              name: "Avcılar İngilizce Dil Kursu",
              sameAs: "https://www.avcilaringilizcekursu.com.tr",
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Blended",
              location: {
                "@type": "Place",
                name: "Avcılar İngilizce Dil Kursu Kampüsleri (İstanbul, İzmir, Ankara, Bursa, Eskişehir)",
                address: "Türkiye",
              },
            },
          }),
        }}
      />

      <CourseHeroSlider courseKey="almancaLandingPage" lang={lang} />
      <CourseInfoSection courseKey="almancaLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="almancaLandingPage" lang={lang} />
      <WhyUsSection courseKey="almancaLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="almancaLandingPage" lang={lang} />
      <CourseFAQ courseKey="almancaLandingPage" lang={lang} />
      <SeoContentBlock courseKey="almancaLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
