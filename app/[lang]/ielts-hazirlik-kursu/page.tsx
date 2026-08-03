import type { Metadata } from "next";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../dictionaries/getDictionary";
import { Navbar } from "../../components/layout/Navbar";
import { CourseHeroSlider } from "../../components/course/CourseHeroSlider";
import { CourseInfoSection } from "../../components/course/CourseInfoSection";
import { PublicationsShowcase } from "../../components/course/PublicationsShowcase";
import { WhyUsSection } from "../../components/course/WhyUsSection";
import { EducationModels } from "../../components/course/EducationModels";
import { CourseFAQ } from "../../components/course/CourseFAQ";
import { WhatsAppButton } from "../../components/ui/WhatsAppButton";
import PlacementTestBanner from "../../components/course/PlacementTestBanner";
import InstagramFeed from "../../components/social/InstagramFeed";
import { SeoContentBlock } from "../../components/course/SeoContentBlock";
import { GradeLevelTabs } from "@/app/components/course/GradeLevelTabs";

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

  const meta = (dict as any)?.ieltsLandingPage?.meta || {
    title:
      lang === "en"
        ? "IELTS Preparation Course | High Band Score Guarantee | Akademik International"
        : lang === "ar"
          ? "دورة التحضير لاختبار IELTS | Akademik International"
          : "IELTS Hazırlık Kursu | Yüksek Skor Garantili Eğitim | Akademik International",
    description:
      lang === "en"
        ? "Achieve your target band score with our intensive IELTS preparation course. Expert instructors, speaking practice, and comprehensive materials."
        : lang === "ar"
          ? "حقق النتيجة المستهدفة من خلال دورة التحضير المكثفة لاختبار IELTS. مدربون خبراء وممارسة التحدث."
          : "IELTS'te hedeflediğiniz yüksek skora uzman eğitmen kadromuz, speaking (konuşma) pratiklerimiz ve zengin yayın desteğimizle ulaşın.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/ielts-hazirlik-kursu`,
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

export default async function IeltsHazirlikKursuPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  // Dinamik SSS Verisi (JSON-LD için)
  const faqItems = (dict as any)?.ieltsLandingPage?.faq?.items || [];

  return (
    <main>
      <Navbar />

      {/* 1. BREADCRUMBLIST SCHEMA */}
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
                name: "Akademik Sınav Kursları",
                item: `https://www.avcilarakademik.com.tr/${lang}/akademik-ingilizce-kursu`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "IELTS Hazırlık Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/ielts-hazirlik-kursu`,
              },
            ],
          }),
        }}
      />

      {/* 2. COURSE SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "IELTS Hazırlık Kursu",
            description:
              "Yurt dışı eğitim, göçmenlik ve kariyer hedefleri için uluslararası geçerliliğe sahip yoğun IELTS (International English Language Testing System) eğitim programı.",
            provider: {
              "@type": "EducationalOrganization",
              name: "Akademik International Yabancı Dil Okulları",
              sameAs: "https://www.avcilarakademik.com.tr",
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Blended",
              location: {
                "@type": "Place",
                name: "Akademik International Avcılar",
                address:
                  "Namık Kemal Cd. Umut İş Merkezi No:23 Kat:5, 34310 Avcılar/İstanbul",
              },
            },
          }),
        }}
      />

      {/* 3. FAQ SCHEMA */}
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item: any) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            }),
          }}
        />
      )}

      {/* İÇERİK BİLEŞENLERİ */}
      <CourseHeroSlider courseKey="ieltsLandingPage" />

      <CourseInfoSection courseKey="ieltsLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="ieltsLandingPage" />
      <PublicationsShowcase courseKey="ieltsLandingPage" lang={lang} />
      <PlacementTestBanner />
      <WhyUsSection courseKey="ieltsLandingPage" />
      <EducationModels courseKey="ieltsLandingPage" lang={lang} />
      <CourseFAQ courseKey="ieltsLandingPage" lang={lang} />
      <SeoContentBlock courseKey="ieltsLandingPage" lang={lang} />

      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
