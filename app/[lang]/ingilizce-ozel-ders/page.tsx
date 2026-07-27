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

  const meta = (dict as any)?.ozelDersLandingPage?.meta || {
    title: lang === 'en' ? "Private English Lessons | Akademik International" : (lang === 'ar' ? "دروس اللغة الإنجليزية الخاصة | Akademik International" : "İngilizce Özel Ders | Akademik International"),
    description: "İhtiyacınıza özel, birebir ve amaca yönelik İngilizce özel ders. Dil becerilerinizi hızla güçlendirin."
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/ingilizce-ozel-ders`,
    }
  };
}

export default async function OzelDersPage({ params }: PageProps) {
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
            "name": "İngilizce Özel Ders",
            "description": "İhtiyacınıza özel, birebir ve amaca yönelik İngilizce özel ders. Dil becerilerinizi hızla güçlendirin.",
            "provider": {
              "@type": "EducationalOrganization",
              "name": "Akademik International Yabancı Dil Okulları",
              "sameAs": "https://www.akademik.com.tr"
            }
          })
        }}
      />
      
      {/* 1. HERO SLIDER */}
      <CourseHeroSlider courseKey="ozelDersLandingPage" />

      {/* 2. COURSE INFO (Badge, Title, Desc, Skills) */}
      <CourseInfoSection courseKey="ozelDersLandingPage" />

      {/* NEW: GRADE LEVEL TABS (5,6,7,8) */}
      <GradeLevelTabs courseKey="ozelDersLandingPage" />

      {/* 3. PUBLICATIONS SHOWCASE */}
      <PublicationsShowcase courseKey="ozelDersLandingPage" />

      {/* 4. PLACEMENT TEST BANNER */}
      <PlacementTestBanner />

      {/* 5. WHY US / ADVANTAGES & ACCORDION FAQS */}
      <WhyUsSection courseKey="ozelDersLandingPage" />



      {/* 6. EDUCATION MODELS */}
      <EducationModels courseKey="ozelDersLandingPage" />

      {/* 7. DETAILED FAQ */}
      <CourseFAQ courseKey="ozelDersLandingPage" />
      
      {/* INSTAGRAM FEED (Mock API) */}
      <InstagramFeed lang={lang} />

      <WhatsAppButton phoneNumber="905323609256" />
    </main>
  );
}
