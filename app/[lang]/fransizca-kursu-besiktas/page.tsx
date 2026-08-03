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

  const meta = (dict as any)?.besiktasFransizcaLandingPage?.meta || {
    title:
      lang === "en"
        ? "French Course in Besiktas | Akademik International"
        : lang === "ar"
          ? "دورة اللغة الفرنسية في بشكتاش | Akademik International"
          : "Beşiktaş Fransızca Kursu | Akademik Yabancı Dil Okulları",
    description:
      lang === "en"
        ? "Learn French in Besiktas with native instructors and a 4-skills focused curriculum backed by over a quarter-century of experience."
        : lang === "ar"
          ? "تعلم الفرنسية في بشكتاش مع مدربين أصليين ومنهج يركز على 4 مهارات مدعوم بأكثر من ربع قرن من الخبرة."
          : "Beşiktaş Fransızca kursu arayışınızda çeyrek asırlık tecrübemiz, native hocalarımız ve 4 temel beceriye dayalı eğitim modelimizle yanınızdayız.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/fransizca-kursu-besiktas`,
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

export default async function BesiktasFransizcaKursuPage({
  params,
}: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  // Dinamik SSS Verisi (JSON-LD için)
  const faqItems =
    (dict as any)?.besiktasFransizcaLandingPage?.faq?.items || [];

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
                name: "Beşiktaş Fransızca Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/fransizca-kursu-besiktas`,
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
            name: "Beşiktaş Fransızca Kursu",
            description:
              "Beşiktaş şubemizde sertifikalı native eğitmenler eşliğinde konuşma, yazma, okuma ve dinleme olmak üzere 4 temel dil becerisine dayalı Fransızca eğitimi.",
            provider: {
              "@type": "EducationalOrganization",
              name: "Akademik Yabancı Dil Okulları",
              sameAs: "https://www.avcilarakademik.com.tr",
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Blended",
              location: {
                "@type": "Place",
                name: "Akademik International Beşiktaş",
                address: "Beşiktaş, İstanbul",
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

      <CourseHeroSlider courseKey="besiktasFransizcaLandingPage" />
      <CourseInfoSection courseKey="besiktasFransizcaLandingPage" lang={lang} />

      <PublicationsShowcase
        courseKey="besiktasFransizcaLandingPage"
        lang={lang}
      />

      <PlacementTestBanner />
      <WhyUsSection courseKey="besiktasFransizcaLandingPage" />
      <EducationModels courseKey="besiktasFransizcaLandingPage" lang={lang} />
      <CourseFAQ courseKey="besiktasFransizcaLandingPage" lang={lang} />

      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
