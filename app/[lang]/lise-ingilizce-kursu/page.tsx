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

  const meta = (dict as any)?.liseIngilizceLandingPage?.meta || {
    title: lang === 'en' ? "High School English Course | Akademik International" : (lang === 'ar' ? "دورة اللغة الإنجليزية للمدرسة الثانوية | Akademik International" : "Lise İngilizce Kursu | Akademik International"),
    description: "Lise öğrencileri için konuşma ve dinleme odaklı, okul başarısını destekleyen İngilizce kursu. Dil becerilerinizi güçlendirin."
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/lise-ingilizce-kursu`,
    }
  };
}

export default async function LiseIngilizcePage({ params }: PageProps) {
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
            "name": "Lise İngilizce Kursu",
            "description": "Lise öğrencileri için konuşma ve dinleme odaklı, okul başarısını destekleyen İngilizce kursu. Dil becerilerinizi güçlendirin.",
            "provider": {
              "@type": "EducationalOrganization",
              "name": "Akademik International Yabancı Dil Okulları",
              "sameAs": "https://www.akademik.com.tr"
            }
          })
        }}
      />
      
      {/* 1. HERO SLIDER */}
      <CourseHeroSlider courseKey="liseIngilizceLandingPage" />

      {/* 2. COURSE INFO (Badge, Title, Desc, Skills) */}
      <CourseInfoSection courseKey="liseIngilizceLandingPage" />

      {/* 3. PUBLICATIONS SHOWCASE */}
      <PublicationsShowcase courseKey="liseIngilizceLandingPage" />

      {/* 4. PLACEMENT TEST BANNER */}
      <PlacementTestBanner />

      {/* 5. WHY US / ADVANTAGES & ACCORDION FAQS */}
      <WhyUsSection courseKey="liseIngilizceLandingPage" />

      {/* 6. EDUCATION MODELS */}
      <EducationModels courseKey="liseIngilizceLandingPage" />

      {/* 7. DETAILED FAQ */}
      <CourseFAQ courseKey="liseIngilizceLandingPage" />
      
      {/* INSTAGRAM FEED (Mock API) */}
      <InstagramFeed lang={lang} />

      <WhatsAppButton phoneNumber="905323609256" />
    </main>
  );
}
