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

  const meta = (dict as any)?.prepPage?.meta || {
    title: lang === 'en' ? "Prep Temel İngilizce Course" : (lang === 'ar' ? "Prep Temel İngilizce Kursu" : "Prep Temel İngilizce Kursu"),
    description: "Sıfırdan İngilizce öğrenmek isteyenler için konuşma odaklı Hazırlık (Prep) eğitim programı."
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/temel-ingilizce-kursu-hazirlik`,
    }
  };
}

export default async function HazirlikPage({ params }: PageProps) {
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
            "name": "Prep Temel İngilizce Kursu",
            "description": "Sıfırdan İngilizce öğrenmek isteyenler için konuşma odaklı Hazırlık (Prep) eğitim programı.",
            "provider": {
              "@type": "Organization",
              "name": "Avcılar İngilizce Dil Kursu",
              "sameAs": "https://avcilaringilizcekursu.com.tr"
            }
          })
        }}
      />

      
      <CourseHeroSlider courseKey="prepPage" lang={lang} />
      <CourseInfoSection courseKey="prepPage" lang={lang} />
      <WhyUsSection courseKey="prepPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="prepPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />

          </main>
  );
}
