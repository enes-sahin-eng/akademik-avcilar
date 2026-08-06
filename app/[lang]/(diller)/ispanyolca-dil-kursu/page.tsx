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

  const meta = (dict as any)?.ispanyolcaLandingPage?.meta || {
    title:
      lang === "en"
        ? "Spanish Language Course | Akademik International"
        : lang === "ar"
          ? "دورة اللغة الإسبانية | Akademik International"
          : "İspanyolca Dil Kursu | Akademik Yabancı Dil Kursları",
    description:
      lang === "en"
        ? "Reach your goals with Turkey's best Spanish language course. A1-C2 level training, expert instructors, and four-skill-focused education."
        : lang === "ar"
          ? "حقق أهدافك مع أفضل دورة للغة الإسبانية في تركيا. تدريب من المستوى A1 إلى C2 مع مدربين خبراء."
          : "Türkiye'nin en iyi İspanyolca dil kursu ile hedeflerinize ulaşın. A1-C2 seviye eğitimleri, uzman eğitmen kadrosu ve dört beceri odaklı eğitim.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/ispanyolca-dil-kursu`,
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

export default async function IspanyolcaDilKursuPage({ params }: PageProps) {
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
                name: "İspanyolca Dil Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/ispanyolca-dil-kursu`,
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
            name: "İspanyolca Dil Kursu",
            description:
              "Dünyada en yaygın 3. dil olan İspanyolcayı, A1-C2 seviye eğitimleriyle dört beceri odaklı uzman eğitmen kadrosuyla öğrenin.",
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
                name: "Akademik International Kampüsleri (İstanbul, İzmir, Ankara, Bursa, Eskişehir, Tekirdağ)",
                address: "Türkiye",
              },
            },
          }),
        }}
      />

      {/* Hero */}
      <CourseHeroSlider courseKey="ispanyolcaLandingPage" lang={lang} />

      {/* About (İspanyolca Nedir & Neden Öğrenilmeli) */}
      <CourseInfoSection courseKey="ispanyolcaLandingPage" lang={lang} />

      {/* Seviyeler (A1, A2, B1, B2, C1, C2) */}
      <GradeLevelTabs courseKey="ispanyolcaLandingPage" lang={lang} />

      {/* Yayınlar */}
      <PublicationsShowcase courseKey="ispanyolcaLandingPage" lang={lang} />

      {/* Placement Test Banner */}
      <PlacementTestBanner lang={lang} />

      {/* Neden Biz */}
      <WhyUsSection courseKey="ispanyolcaLandingPage" lang={lang} />

      {/* Eğitim Modelleri (Örgün / Online) */}
      <EducationModels courseKey="ispanyolcaLandingPage" lang={lang} />

      {/* SSS */}
      <CourseFAQ courseKey="ispanyolcaLandingPage" lang={lang} />

      {/* SEO Text (Bursa İspanyolca Kursu & Kariyer Fırsatları) */}
      <SeoContentBlock courseKey="ispanyolcaLandingPage" lang={lang} />

      {/* Footer Elements */}
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
