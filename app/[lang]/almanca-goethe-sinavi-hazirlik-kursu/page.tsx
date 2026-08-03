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

  const meta = (dict as any)?.goetheLandingPage?.meta || {
    title:
      lang === "en"
        ? "Goethe German Exam Preparation Course | Akademik International"
        : lang === "ar"
          ? "دورة التحضير لامتحان معهد جوته للغة الألمانية | Akademik International"
          : "Goethe Almanca Sınavı Hazırlık Kursu | Akademik International",
    description:
      lang === "en"
        ? "Prepare for the Goethe exam with our experienced instructors for family reunification, academic, and professional goals in Germany."
        : lang === "ar"
          ? "استعد لامتحان جوته مع مدربينا ذوي الخبرة للم شمل الأسرة والأهداف الأكاديمية والمهنية في ألمانيا."
          : "Aile birleşimi, iş başvuruları ve eğitim kurumları için gerekli olan Goethe sınavına, en az 5 yıl tecrübeli eğitmen kadromuzla hazırlanın.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/almanca-goethe-sinavi-hazirlik-kursu`,
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

export default async function GoetheHazirlikKursuPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  // Dinamik SSS Verisi (JSON-LD için)
  const faqItems = (dict as any)?.goetheLandingPage?.faq?.items || [];

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
                name: "Goethe Sınavı Hazırlık Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/almanca-goethe-sinavi-hazirlik-kursu`,
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
            name: "Goethe Almanca Sınavı Hazırlık Kursu",
            description:
              "Almanca dil yeterliliğini belgelemek, aile birleşimi ve iş başvuruları için Avrupa Ortak Dil Kriterleri'ne (A1-C2) uygun olarak hazırlanan Goethe sınavı eğitim programı.",
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

      {/* --- İÇERİK BİLEŞENLERİ (Sadeleştirilmiş Şablon) --- */}

      <CourseHeroSlider courseKey="goetheLandingPage" />
      <CourseInfoSection courseKey="goetheLandingPage" lang={lang} />

      {/* Yayınlar Modülü Kısa Sayfalarda da Sabit */}
      <PublicationsShowcase courseKey="goetheLandingPage" lang={lang} />

      <PlacementTestBanner />
      <WhyUsSection courseKey="goetheLandingPage" />
      <EducationModels courseKey="goetheLandingPage" lang={lang} />
      <CourseFAQ courseKey="goetheLandingPage" lang={lang} />

      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
