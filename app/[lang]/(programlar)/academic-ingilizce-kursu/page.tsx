import type { Metadata } from "next";
import { getDictionary, locales, type Locale } from "../../../dictionaries/getDictionary";
import { Navbar } from "../../../components/layout/Navbar";
import InstagramFeed from "../../../components/social/InstagramFeed";
import { WhatsAppButton } from "../../../components/ui/WhatsAppButton";
import PlacementTestBanner from "../../../components/course/PlacementTestBanner";
import { CourseHeroSlider } from "../../../components/course/CourseHeroSlider";
import { CourseInfoSection } from "../../../components/course/CourseInfoSection";
import { WhyUsSection } from "../../../components/course/WhyUsSection";
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

  const meta = (dict as any)?.academicPage?.meta || {
    title: lang === 'en' ? "Akademik İngilizce Course (B2-C1)" : (lang === 'ar' ? "Akademik İngilizce Kursu (B2-C1)" : "Akademik İngilizce Kursu (B2-C1)"),
    description: "Üst düzey akademik ve mesleki İngilizce becerilerinizi geliştirebileceğiniz B2-C1 Akademik İngilizce programı."
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/academic-ingilizce-kursu`,
    }
  };
}

export default async function AcademicPage({ params }: PageProps) {
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
            "name": "Akademik İngilizce Kursu (B2-C1)",
            "description": "Üst düzey akademik ve mesleki İngilizce becerilerinizi geliştirebileceğiniz B2-C1 Akademik İngilizce programı.",
            "provider": {
              "@type": "Organization",
              "name": "Akademik International Yabancı Dil Okulları",
              "sameAs": "https://avcilaringilizcekursu.com.tr"
            }
          })
        }}
      />

      
      <CourseHeroSlider courseKey="academicPage" lang={lang} />
      <CourseInfoSection courseKey="academicPage" lang={lang} />
      <WhyUsSection courseKey="academicPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="academicPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />

          </main>
  );
}
