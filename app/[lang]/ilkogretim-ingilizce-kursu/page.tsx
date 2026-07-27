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

  const meta = (dict as any)?.ilkogretimIngilizceLandingPage?.meta || {
    title: lang === 'en' ? "Primary School English Course | Akademik International" : (lang === 'ar' ? "دورة اللغة الإنجليزية للمرحلة الابتدائية | Akademik International" : "İlköğretim İngilizce Kursu | Akademik International"),
    description: lang === 'en' ? "English course tailored for primary school students." : (lang === 'ar' ? "دورة اللغة الإنجليزية مخصصة لطلاب المرحلة الابتدائية." : "İlköğretim öğrencileri için özel olarak hazırlanmış İngilizce eğitim programı.")
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/ilkogretim-ingilizce-kursu`,
    }
  };
}

export default async function IlkogretimIngilizceKursuPage({ params }: PageProps) {
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
            "name": "İlköğretim İngilizce Kursu",
            "description": "İlköğretim öğrencileri için özel olarak hazırlanmış İngilizce eğitim programı.",
            "provider": {
              "@type": "Organization",
              "name": "Akademik International Yabancı Dil Okulları",
              "sameAs": "https://avcilarakademik.com.tr"
            }
          })
        }}
      />
      
      {/* KURS HERO SLIDER */}
      <CourseHeroSlider courseKey="ilkogretimIngilizceLandingPage" />

      {/* PROGRAM ÖZETİ */}
      <CourseInfoSection courseKey="ilkogretimIngilizceLandingPage" />

      {/* YAYINLARIMIZ */}
      <PublicationsShowcase courseKey="ilkogretimIngilizceLandingPage" />

      {/* NEDEN BİZ? AVANTAJLAR VE SSS */}
      <WhyUsSection courseKey="ilkogretimIngilizceLandingPage" />
      
      {/* SSS (FAQ) */}
      <CourseFAQ courseKey="ilkogretimIngilizceLandingPage" />

      {/* EĞİTİM MODELLERİ (YÜZ YÜZE / ONLINE) */}
      <EducationModels courseKey="ilkogretimIngilizceLandingPage" />
      
      {/* ÖĞRENCİ YORUMLARI VE VİDEOLAR */}
      <StudentReviewsAndAwards />

      {/* DİL SEVİYE BELİRLEME SINAVI */}
      <PlacementTestBanner />
      
      {/* INSTAGRAM FEED (Mock API) */}
      <InstagramFeed lang={lang} />

      <WhatsAppButton phoneNumber="905323609256" />
    </main>
  );
}
