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
import { CourseFAQ } from "../../components/course/CourseFAQ";
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

  // You can extend the dictionary later to include this metadata
  const meta = (dict as any)?.genelIngilizceLandingPage?.meta || {
    title: lang === 'en' ? "Genel İngilizce Course | Akademik International" : (lang === 'ar' ? "Genel İngilizce Kursu | Akademik International" : "Genel İngilizce Kursu | Akademik International"),
    description: "Sıfırdan başlayarak Genel İngilizce kursları ile İngilizceyi akıcı ve doğru bir şekilde öğrenin. Tüm seviyeler için özel eğitim programları."
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
            "name": "Genel İngilizce Kursu",
            "description": "Sıfırdan başlayarak Genel İngilizce kursları ile İngilizceyi akıcı ve doğru bir şekilde öğrenin.",
            "provider": {
              "@type": "Organization",
              "name": "Akademik International Yabancı Dil Okulları",
              "sameAs": "https://avcilarakademik.com.tr"
            }
          })
        }}
      />

      
      {/* KURS HERO SLIDER */}
      <CourseHeroSlider courseKey="genelIngilizceLandingPage" />

      {/* PROGRAM ÖZETİ */}
      <CourseInfoSection courseKey="genelIngilizceLandingPage" />

      {/* YAYINLARIMIZ */}
      <PublicationsShowcase courseKey="genelIngilizceLandingPage" />

      {/* NEDEN BİZ? AVANTAJLAR VE SSS */}
      <WhyUsSection courseKey="genelIngilizceLandingPage" />

      
      {/* SSS (FAQ) */}
      <CourseFAQ courseKey="genelIngilizceLandingPage" />

      {/* EĞİTİM MODELLERİ (YÜZ YÜZE / ONLINE) */}
      <EducationModels courseKey="genelIngilizceLandingPage" />

      
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
