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

  const meta = (dict as any)?.academicExpressPage?.meta || {
    title: lang === 'en' ? "Academic Express İngilizce Course | Akademik International" : (lang === 'ar' ? "Academic Express İngilizce Kursu | Akademik International" : "Academic Express İngilizce Kursu | Akademik International"),
    description: "B1 Intermediate seviyesinde, okuma ve konuşma becerilerinizi hızla geliştirecek Academic Express İngilizce kursu."
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/academic-express-ingilizce-kursu`,
    }
  };
}

export default async function AcademicExpressPage({ params }: PageProps) {
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
            "name": "Academic Express İngilizce Kursu",
            "description": "B1 Intermediate seviyesinde, okuma ve konuşma becerilerinizi hızla geliştirecek Academic Express İngilizce kursu.",
            "provider": {
              "@type": "Organization",
              "name": "Akademik International Yabancı Dil Okulları",
              "sameAs": "https://avcilarakademik.com.tr"
            }
          })
        }}
      />

      
      {/* KURS HERO SLIDER */}
      <CourseHeroSlider courseKey="academicExpressPage" />

      {/* PROGRAM ÖZETİ */}
      <CourseInfoSection courseKey="academicExpressPage" />

      {/* YAYINLARIMIZ */}
      <PublicationsShowcase courseKey="academicExpressPage" />

      {/* NEDEN BİZ? AVANTAJLAR VE SSS */}
      <WhyUsSection courseKey="academicExpressPage" />

      {/* EĞİTİM MODELLERİ (YÜZ YÜZE / ONLINE) */}
      <EducationModels courseKey="academicExpressPage" />

      
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
