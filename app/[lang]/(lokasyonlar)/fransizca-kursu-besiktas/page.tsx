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
        ? "French Course in Besiktas"
        : lang === "ar"
          ? "دورة اللغة الفرنسية في بشكتاش"
          : "Beşiktaş Fransızca Kursu | Avcılar İngilizce Dil Kursu",
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
                name: "Beşiktaş Fransızca Kursu",
                item: `https://avcilaringilizcekursu.com.tr/${lang}/fransizca-kursu-besiktas`,
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
              name: "Avcılar İngilizce Dil Kursu",
              sameAs: "https://avcilaringilizcekursu.com.tr",
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Blended",
              location: {
                "@type": "Place",
                name: "Avcılar İngilizce Dil Kursu Beşiktaş",
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

      <CourseHeroSlider courseKey="besiktasFransizcaLandingPage" lang={lang} />
      <CourseInfoSection courseKey="besiktasFransizcaLandingPage" lang={lang} />


      <PlacementTestBanner lang={lang} />
      <WhyUsSection courseKey="besiktasFransizcaLandingPage" lang={lang} />
      <EducationModels courseKey="besiktasFransizcaLandingPage" lang={lang} />
      <CourseFAQ courseKey="besiktasFransizcaLandingPage" lang={lang} />

      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
