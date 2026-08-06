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
  const meta = (dict as any)?.akademikIngilizceLandingPage?.meta || {
    title: lang === 'en' ? "Akademik İngilizce Course" : (lang === 'ar' ? "Akademik İngilizce Kursu" : "Akademik İngilizce Kursu"),
    description: "Yurt dışı eğitim ve uluslararası akademik kariyeriniz için Academic İngilizce eğitimleriyle hedeflerinize ulaşın."
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/akademik-ingilizce-kursu`,
    }
  };
}

export default async function akademikingilizcekursuPage({ params }: PageProps) {
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
            "name": "Akademik İngilizce Kursu",
            "description": "Yurt dışı eğitim ve uluslararası akademik kariyeriniz için Academic İngilizce eğitimleriyle hedeflerinize ulaşın.",
            "provider": {
              "@type": "Organization",
              "name": "Akademik International Yabancı Dil Okulları",
              "sameAs": "https://avcilarakademik.com.tr"
            }
          })
        }}
      />

      
      {/* KURS HERO SLIDER */}
      <CourseHeroSlider courseKey="akademikIngilizceLandingPage" lang={lang} />

      {/* PROGRAM ÖZETİ */}
      <CourseInfoSection courseKey="akademikIngilizceLandingPage" lang={lang} />

      {/* YAYINLARIMIZ */}
      <PublicationsShowcase courseKey="akademikIngilizceLandingPage" lang={lang} />

      {/* NEDEN BİZ? AVANTAJLAR VE SSS */}
      <WhyUsSection courseKey="akademikIngilizceLandingPage" lang={lang} />

      
      {/* SSS (FAQ) */}
      <CourseFAQ courseKey="akademikIngilizceLandingPage" lang={lang} />

      {/* EĞİTİM MODELLERİ (YÜZ YÜZE / ONLINE) */}
      <EducationModels courseKey="akademikIngilizceLandingPage" lang={lang} />

      
      {/* ÖĞRENCİ YORUMLARI VE VİDEOLAR */}
      <StudentReviewsAndAwards lang={lang} />
{/* DİL SEVİYE BELİRLEME SINAVI */}
      <PlacementTestBanner lang={lang} />

      
      {/* INSTAGRAM FEED (Mock API) */}
      <InstagramFeed lang={lang} />

      <WhatsAppButton phoneNumber="905323609256" lang={lang} />

          </main>
  );
}
