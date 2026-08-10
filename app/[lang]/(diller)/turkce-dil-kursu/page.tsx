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

  const meta = (dict as any)?.turkceLandingPage?.meta || {
    title:
      lang === "en"
        ? "Turkish Language Course | Akademik International"
        : lang === "ar"
          ? "دورة اللغة التركية | Akademik International"
          : "Türkçe Dil Kursu | Akademik Yabancı Dil Kursları",
    description:
      lang === "en"
        ? "Learn Turkish effectively from A1 to C2 levels with our expert academic staff. Enrich your language world and gain career opportunities."
        : lang === "ar"
          ? "تعلم التركية بفعالية من المستوى A1 إلى C2 مع طاقمنا الأكاديمي الخبير. أثرِ عالمك اللغوي واكتسب فرصًا مهنية."
          : "Akademisyen kökenli uzman kadromuzla A1'den C2'ye kadar etkili Türkçe eğitimi alın. Dil dünyanızı zenginleştirin ve kariyer fırsatları elde edin.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/turkce-dil-kursu`,
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

export default async function TurkceDilKursuPage({ params }: PageProps) {
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
                name: "Türkçe Dil Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/turkce-dil-kursu`,
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
            name: "Türkçe Dil Kursu",
            description:
              "Yetişkinlere yönelik özgün eğitim modelleriyle, A1-C2 seviyelerinde iletişimsel temellere dayanan, akademisyen kökenli eğitmenlerle sunulan Türkçe kursu.",
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
                name: "Akademik International Kampüsleri (İstanbul, Ankara, İzmir, Bursa, Eskişehir)",
                address: "Türkiye",
              },
            },
          }),
        }}
      />

      <CourseHeroSlider courseKey="turkceLandingPage" lang={lang} />
      <CourseInfoSection courseKey="turkceLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="turkceLandingPage" lang={lang} />
      <WhyUsSection courseKey="turkceLandingPage" lang={lang} />
      <PublicationsShowcase courseKey="turkceLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="turkceLandingPage" lang={lang} />
      <CourseFAQ courseKey="turkceLandingPage" lang={lang} />
      <SeoContentBlock courseKey="turkceLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
