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

  const meta = (dict as any)?.japoncaLandingPage?.meta || {
    title:
      lang === "en"
        ? "Japanese Language Course"
        : lang === "ar"
          ? "دورة اللغة اليابانية"
          : "Japonca Dil Kursu | Akademik Yabancı Dil Kursları",
    description:
      lang === "en"
        ? "Learn Japanese with our unique reflexive speaking methods in VIP classes of 5-7 students. Master Hiragana, Katakana, and Kanji."
        : lang === "ar"
          ? "تعلم اللغة اليابانية بأساليب التحدث الانعكاسية الفريدة في فصول VIP المكونة من 5 إلى 7 طلاب. أتقن الهيراغانا والكاتاكانا والكانجي."
          : "Türkiye'nin ilk özgün eğitim modeliyle, 5-7 kişilik VIP sınıflarda Japoncayı refleksif konuşarak öğrenin. Hiragana, Katakana ve Kanji eğitimleri...",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/japonca-dil-kursu`,
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

export default async function JaponcaDilKursuPage({ params }: PageProps) {
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
                name: "Japonca Dil Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/japonca-dil-kursu`,
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
            name: "Japonca Dil Kursu",
            description:
              "Klasik gramer yöntemlerinden uzak, aktif konuşma odaklı, 5-7 kişilik VIP sınıflarda Temel'den Uzman seviyeye kadar kapsamlı Japonca eğitimi.",
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
                name: "Akademik International Kampüsleri (İstanbul, Bursa, İzmir, Eskişehir, Ankara)",
                address: "Türkiye",
              },
            },
          }),
        }}
      />

      <CourseHeroSlider courseKey="japoncaLandingPage" lang={lang} />
      <CourseInfoSection courseKey="japoncaLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="japoncaLandingPage" lang={lang} />
      <WhyUsSection courseKey="japoncaLandingPage" lang={lang} />
      <PublicationsShowcase courseKey="japoncaLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="japoncaLandingPage" lang={lang} />
      <CourseFAQ courseKey="japoncaLandingPage" lang={lang} />
      <SeoContentBlock courseKey="japoncaLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
