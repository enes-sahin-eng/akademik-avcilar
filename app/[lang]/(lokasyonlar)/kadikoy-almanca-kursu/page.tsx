import type { Metadata } from "next";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../../dictionaries/getDictionary";
import { Navbar } from "../../../components/layout/Navbar";
import { CourseHeroSlider } from "../../../components/course/CourseHeroSlider";
import { CourseInfoSection } from "../../../components/course/CourseInfoSection";
import { WhyUsSection } from "../../../components/course/WhyUsSection";
import { EducationModels } from "../../../components/course/EducationModels";
import { CourseFAQ } from "../../../components/course/CourseFAQ";
import { WhatsAppButton } from "../../../components/ui/WhatsAppButton";
import PlacementTestBanner from "../../../components/course/PlacementTestBanner";
import InstagramFeed from "../../../components/social/InstagramFeed";
import { SeoContentBlock } from "../../../components/course/SeoContentBlock";

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

  const meta = (dict as any)?.kadikoyAlmancaLandingPage?.meta || {
    title:
      lang === "en"
        ? "German Course in Kadıköy"
        : lang === "ar"
          ? "دورة اللغة الألمانية في كاديكوي"
          : "Kadıköy Almanca Kursu | İstanbul'un En İyi Dil Okulu",
    description:
      lang === "en"
        ? "Achieve your career and academic goals in Germany with our adult-focused, modern German education model in the heart of Kadıköy."
        : lang === "ar"
          ? "حقق أهدافك المهنية والأكاديمية في ألمانيا من خلال نموذج تعليم اللغة الألمانية الحديث المخصص للبالغين في قلب كاديكوي."
          : "Yetişkinlere özel müfredat, Goethe/Telc/TestDaF sınavlarına hazırlık ve amaca yönelik esnek programlarla Kadıköy'de Almanca öğrenin.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/kadikoy-almanca-kursu`,
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

export default async function KadikoyAlmancaKursuPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  // Dinamik SSS Verisi (JSON-LD için)
  const faqItems = (dict as any)?.kadikoyAlmancaLandingPage?.faq?.items || [];

  return (
    <main>
      <Navbar lang={lang} />

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
                item: "https://avcilaringilizcekursu.com.tr",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Kadıköy Almanca Kursu",
                item: `https://avcilaringilizcekursu.com.tr/${lang}/kadikoy-almanca-kursu`,
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
            name: "Kadıköy Almanca Kursu",
            description:
              "Yetişkinlere özel olarak hazırlanmış müfredatı ve native speaker eğitmenleriyle Kadıköy'de amaca yönelik Almanca eğitim programı.",
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
                name: "Avcılar İngilizce Dil Kursu Kadıköy",
                address: "Kadıköy, İstanbul",
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

      {/* --- İÇERİK BİLEŞENLERİ --- */}

      <CourseHeroSlider courseKey="kadikoyAlmancaLandingPage" lang={lang} />
      <CourseInfoSection courseKey="kadikoyAlmancaLandingPage" lang={lang} />
      <PlacementTestBanner lang={lang} />
      <WhyUsSection courseKey="kadikoyAlmancaLandingPage" lang={lang} />
      <EducationModels courseKey="kadikoyAlmancaLandingPage" lang={lang} />
      <CourseFAQ courseKey="kadikoyAlmancaLandingPage" lang={lang} />

      {/* Uzun SEO Metinleri ve Fiyatlandırma Bilgileri İçin */}
      <SeoContentBlock courseKey="kadikoyAlmancaLandingPage" lang={lang} />

      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
