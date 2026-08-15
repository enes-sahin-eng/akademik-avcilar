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

  const meta = (dict as any)?.academicPlusPage?.meta || {
    title: lang === 'en' ? "Academic Plus İngilizce Course" : (lang === 'ar' ? "Academic Plus İngilizce Kursu" : "Academic Plus İngilizce Kursu"),
    description: "C1-C2 Proficiency seviyesinde kusursuz İngilizce, simultane çeviri ve akademik yazarlık yetkinliği kazanın."
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/academic-plus-ingilizce-kursu`,
    }
  };
}

export default async function AcademicPlusPage({ params }: PageProps) {
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
            "name": "Academic Plus İngilizce Kursu",
            "description": "C1-C2 Proficiency seviyesinde kusursuz İngilizce, simultane çeviri ve akademik yazarlık yetkinliği kazanın.",
            "provider": {
              "@type": "Organization",
              "name": "Avcılar İngilizce Dil Kursu",
              "sameAs": "https://avcilaringilizcekursu.com.tr"
            }
          })
        }}
      />

      
      <CourseHeroSlider courseKey="academicPlusPage" lang={lang} />
      <CourseInfoSection courseKey="academicPlusPage" lang={lang} />
      <WhyUsSection courseKey="academicPlusPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="academicPlusPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />

          </main>
  );
}
