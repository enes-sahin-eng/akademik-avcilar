import type { Metadata } from "next";
import { getDictionary, locales, type Locale } from "../../../dictionaries/getDictionary";
import { Navbar } from "../../../components/layout/Navbar";
import InstagramFeed from "../../../components/social/InstagramFeed";
import { WhatsAppButton } from "../../../components/ui/WhatsAppButton";
import PlacementTestBanner from "../../../components/course/PlacementTestBanner";
import { CourseHeroSlider } from "../../../components/course/CourseHeroSlider";
import { CourseInfoSection } from "../../../components/course/CourseInfoSection";
import { WhyUsSection } from "../../../components/course/WhyUsSection";
import { PublicationsShowcase } from "../../../components/course/PublicationsShowcase";
import { CourseFAQ } from "../../../components/course/CourseFAQ";
import { EducationModels } from "../../../components/course/EducationModels";
import { StudentReviewsAndAwards } from "../../../components/home/StudentReviewsAndAwards";

interface PageProps {
  params: Promise<{
    lang: any;
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

  // You can extend the dictionary later to include this metadata
  const meta = (dict as any)?.genelIngilizceLandingPage?.meta || {
    title: lang === 'en'
      ? "General English Course | All Levels A1–C1 | Akademik International"
      : lang === 'ar'
        ? "دورة اللغة الإنجليزية العامة | جميع المستويات A1–C1 | أكاديميك إنترناشيونال"
        : "Genel İngilizce Kursu | A1'den C1'e Tüm Seviyeler | Akademik International",
    description: lang === 'en'
      ? "General English courses in Avcılar, Istanbul. CEFR-aligned programmes from A1 beginner to C1 advanced. Free placement test. Get info now."
      : lang === 'ar'
        ? "دورات اللغة الإنجليزية العامة في أفجيلار. برامج CEFR من A1 إلى C1. اختبار مستوى مجاني."
        : "Avcılar'da genel İngilizce kursu. A1'den C1'e tüm seviyeler, CEFR uyumlu programlar, ücretsiz seviye tespit sınavı. Hemen bilgi alın."
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/ingilizce-kursu`,
    }
  };
}

export default async function ingilizcekursuPage({ params }: PageProps) {
  const { lang } = await params;

  return (
    <main>
      <Navbar lang={lang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": lang === "en"
              ? "General English Course – All Levels A1 to C1"
              : lang === "ar"
                ? "دورة اللغة الإنجليزية العامة – جميع المستويات من A1 إلى C1"
                : "Genel İngilizce Kursu – A1'den C1'e Tüm Seviyeler",
            "description": lang === "en"
              ? "General English courses from A1 beginner to C1 advanced level. CEFR-certified, free placement test, native teachers."
              : lang === "ar"
                ? "دورات الإنجليزية العامة من A1 إلى C1. معتمدة CEFR، اختبار مستوى مجاني، مدرسون متخصصون."
                : "A1'den C1'e tüm seviyelerde genel İngilizce kursları. CEFR uyumlu, ücretsiz seviye tespit sınavı, konuşma garantili.",
            "provider": {
              "@type": "EducationalOrganization",
              "name": "Akademik International Yabancı Dil Okulları",
              "sameAs": "https://avcilarakademik.com.tr"
            },
            "hasCourseInstance": [
              { "@type": "CourseInstance", "name": "A1 Beginner", "courseMode": "Blended" },
              { "@type": "CourseInstance", "name": "A2 Elementary", "courseMode": "Blended" },
              { "@type": "CourseInstance", "name": "B1 Pre-Intermediate", "courseMode": "Blended" },
              { "@type": "CourseInstance", "name": "B2 Intermediate", "courseMode": "Blended" },
              { "@type": "CourseInstance", "name": "C1 Advanced", "courseMode": "Blended" }
            ]
          })
        }}
      />

      
      <CourseHeroSlider courseKey="genelIngilizceLandingPage" lang={lang} />
      <CourseInfoSection courseKey="genelIngilizceLandingPage" lang={lang} />
      <WhyUsSection courseKey="genelIngilizceLandingPage" lang={lang} />
      <PublicationsShowcase courseKey="genelIngilizceLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="genelIngilizceLandingPage" lang={lang} />
      <CourseFAQ courseKey="genelIngilizceLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />

          </main>
  );
}
