import type { Metadata } from "next";
import { getDictionary, locales, type Locale } from "../../dictionaries/getDictionary";
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
import { GradeLevelTabs } from "../../components/course/GradeLevelTabs";
import { SeoContentBlock } from "../../components/course/SeoContentBlock";

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

  const meta = (dict as any)?.ortaokulIngilizceLandingPage?.meta || {
    title: lang === 'en' ? "Middle School English Course | Akademik International" : (lang === 'ar' ? "دورة اللغة الإنجليزية للمرحلة المتوسطة | Akademik International" : "Ortaokul İngilizce Kursu | Akademik International"),
    description: "Ortaokul öğrencileri için konuşma ve dinleme odaklı, okul başarısını destekleyen İngilizce kursu. Dil becerilerinizi güçlendirin."
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/ortaokul-ingilizce-kursu`,
    }
  };
}

export default async function OrtaokulIngilizcePage({ params }: PageProps) {
  const { lang } = await params;

  return (
    <main>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Ortaokul İngilizce Kursu",
            "description": "Ortaokul öğrencileri için konuşma ve dinleme odaklı, okul başarısını destekleyen İngilizce kursu. Dil becerilerinizi güçlendirin.",
            "provider": {
              "@type": "EducationalOrganization",
              "name": "Akademik International Yabancı Dil Okulları",
              "sameAs": "https://www.akademik.com.tr"
            }
          })
        }}
      />
      
      {/* 1. HERO SLIDER */}
      <CourseHeroSlider courseKey="ortaokulIngilizceLandingPage" />

      {/* 2. COURSE INFO (Badge, Title, Desc, Skills) */}
      <CourseInfoSection courseKey="ortaokulIngilizceLandingPage" />

      {/* NEW: GRADE LEVEL TABS (5,6,7,8) */}
      <GradeLevelTabs courseKey="ortaokulIngilizceLandingPage" />

      {/* 3. PUBLICATIONS SHOWCASE */}
      <PublicationsShowcase courseKey="ortaokulIngilizceLandingPage" />

      {/* 4. PLACEMENT TEST BANNER */}
      <PlacementTestBanner />

      {/* 5. WHY US / ADVANTAGES & ACCORDION FAQS */}
      <WhyUsSection courseKey="ortaokulIngilizceLandingPage" />

      {/* NEW: SEO CONTENT BLOCKS (Prices, Online, Yaz Kursu vb) */}
      <SeoContentBlock courseKey="ortaokulIngilizceLandingPage" />

      {/* 6. EDUCATION MODELS */}
      <EducationModels courseKey="ortaokulIngilizceLandingPage" />

      {/* 7. DETAILED FAQ */}
      <CourseFAQ courseKey="ortaokulIngilizceLandingPage" />
      
      {/* INSTAGRAM FEED (Mock API) */}
      <InstagramFeed lang={lang} />

      <WhatsAppButton phoneNumber="905323609256" />
    </main>
  );
}
