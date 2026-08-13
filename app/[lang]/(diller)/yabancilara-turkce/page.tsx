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

  const meta = (dict as any)?.yabancilaraTurkceLandingPage?.meta || {
    title:
      lang === "en"
        ? "Turkish for Foreigners"
        : lang === "ar"
          ? "دورة اللغة التركية للأجانب"
          : "Yabancılara Türkçe Kursu | Akademik Yabancı Dil Kursları",
    description:
      lang === "en"
        ? "Learn Turkish quickly and effectively in our modern classrooms equipped with visual and audio materials. 8-15 student groups available."
        : lang === "ar"
          ? "تعلم التركية بسرعة وفعالية في فصولنا الحديثة المجهزة بمواد مرئية وصوتية. تتوفر مجموعات من 8-15 طالبًا."
          : "Görsel ve işitsel materyallerle donatılmış 8-15 kişilik sınıflarımızda, uzman kadromuzla Yabancılar için Türkçe eğitimlerine hemen katılın.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/yabancilara-turkce`,
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

export default async function YabancilaraTurkcePage({ params }: PageProps) {
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
                name: "Yabancılara Türkçe Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/yabancilara-turkce`,
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
            name: "Yabancılara Türkçe Kursu",
            description:
              "Uzman eğitmen kadrosu eşliğinde, görsel ve işitsel materyallerle desteklenmiş 8-15 kişilik sınıflarda günlük ve iş hayatına yönelik Türkçe dil eğitimi.",
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
                name: "Akademik International Kampüsleri",
                address: "Türkiye",
              },
            },
          }),
        }}
      />

      <CourseHeroSlider courseKey="yabancilaraTurkceLandingPage" lang={lang} />
      <CourseInfoSection courseKey="yabancilaraTurkceLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="yabancilaraTurkceLandingPage" lang={lang} />
      <WhyUsSection courseKey="yabancilaraTurkceLandingPage" lang={lang} />
      <PublicationsShowcase courseKey="yabancilaraTurkceLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="yabancilaraTurkceLandingPage" lang={lang} />
      <CourseFAQ courseKey="yabancilaraTurkceLandingPage" lang={lang} />
      <SeoContentBlock courseKey="yabancilaraTurkceLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
