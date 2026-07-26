import type { Metadata } from "next";
import { getDictionary, locales, type Locale } from "../../dictionaries/getDictionary";
import { Navbar } from "../../components/layout/Navbar";
import InstagramFeed from "../../components/social/InstagramFeed";
import { WhatsAppButton } from "../../components/ui/WhatsAppButton";
import PlacementTestBanner from "../../components/course/PlacementTestBanner";
import { CourseHeroSlider } from "../../components/course/CourseHeroSlider";
import { CourseInfoSection } from "../../components/course/CourseInfoSection";
import { WhyUsSection } from "../../components/course/WhyUsSection";
import { PublicationsShowcase } from "../../components/course/PublicationsShowcase";
import { EducationModels } from "../../components/course/EducationModels";
import { StudentReviewsAndAwards } from "../../components/home/StudentReviewsAndAwards";

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
    title: lang === 'en' ? "Prep Temel İngilizce Course | Akademik International" : (lang === 'ar' ? "Prep Temel İngilizce Kursu | Akademik International" : "Prep Temel İngilizce Kursu | Akademik International"),
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
  await params;

  return (
    <main>
      <Navbar />
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
              "name": "Akademik International Yabancı Dil Okulları",
              "sameAs": "https://avcilarakademik.com.tr"
            }
          })
        }}
      />

      
      {/* KURS HERO SLIDER */}
      <CourseHeroSlider courseKey="prepPage" />

      {/* PROGRAM ÖZETİ */}
      <CourseInfoSection courseKey="prepPage" />

      {/* YAYINLARIMIZ */}
      <PublicationsShowcase courseKey="prepPage" />

      {/* NEDEN BİZ? AVANTAJLAR VE SSS */}
      <WhyUsSection courseKey="prepPage" />

      {/* EĞİTİM MODELLERİ (YÜZ YÜZE / ONLINE) */}
      <EducationModels courseKey="prepPage" />

      
      {/* ÖĞRENCİ YORUMLARI VE VİDEOLAR */}
      <StudentReviewsAndAwards />

      {/* DİL SEVİYE BELİRLEME SINAVI */}
      <PlacementTestBanner />

      
      {/* INSTAGRAM FEED (Mock API) */}
      <InstagramFeed />

      <WhatsAppButton phoneNumber="905323609256" />

          </main>
  );
}
