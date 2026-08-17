import type { Metadata } from "next";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../../dictionaries/getDictionary";
import { Navbar } from "../../../components/layout/Navbar";
import { CourseHeroSlider } from "../../../components/course/CourseHeroSlider";
import { CourseInfoSection } from "../../../components/course/CourseInfoSection";
import { BusinessEnglishTables } from "../../../components/course/BusinessEnglishTables";
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

  const meta = (dict as any)?.businessEnglishLandingPage?.meta || {
    title:
      lang === "en"
        ? "Business English Course"
        : lang === "ar"
          ? "دورة لغة إنجليزية للأعمال"
          : "İş İngilizcesi Kursu (Business English)",
    description:
      lang === "en"
        ? "Improve your professional communication, presentation, and writing skills with our Business English courses."
        : lang === "ar"
          ? "حسن مهارات التواصل الاحترافي والعروض التقديمية والكتابة من خلال دورات اللغة الإنجليزية للأعمال للنجاح في عالم الأعمال العالمي."
          : "Global iş dünyasında başarılı olmak için İş İngilizcesi (Business English) eğitimlerimizle profesyonel iletişim, sunum ve yazışma becerilerinizi geliştirin.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/is-ingilizcesi`,
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

export default async function IsIngilizcesiPage({ params }: PageProps) {
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
                name: "İş İngilizcesi",
                item: `https://avcilaringilizcekursu.com.tr/${lang}/is-ingilizcesi`,
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
            name: "İş İngilizcesi Kursu (Business English)",
            description: "Profesyonel iş hayatında iletişim, yazışma, sunum ve toplantı becerilerinizi geliştirecek Business English eğitimi.",
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

      <CourseHeroSlider courseKey="businessEnglishLandingPage" lang={lang} />
      <CourseInfoSection courseKey="businessEnglishLandingPage" lang={lang} />
      <BusinessEnglishTables lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <SeoContentBlock courseKey="businessEnglishLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
