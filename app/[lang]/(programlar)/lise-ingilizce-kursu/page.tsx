import type { Metadata } from "next";
import { getDictionary, locales, type Locale } from "../../../dictionaries/getDictionary";
import { Navbar } from "../../../components/layout/Navbar";
import { CourseHeroSlider } from "../../../components/course/CourseHeroSlider";
import { CourseInfoSection } from "../../../components/course/CourseInfoSection";
import { WhyUsSection } from "../../../components/course/WhyUsSection";
import { EducationModels } from "../../../components/course/EducationModels";
import { CourseFAQ } from "../../../components/course/CourseFAQ";
import { WhatsAppButton } from "../../../components/ui/WhatsAppButton";
import PlacementTestBanner from "../../../components/course/PlacementTestBanner";
import InstagramFeed from "../../../components/social/InstagramFeed";
import { GradeLevelTabs } from "../../../components/course/GradeLevelTabs";
import { SeoContentBlock } from "../../../components/course/SeoContentBlock";
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

  const meta = (dict as any)?.liseIngilizceLandingPage?.meta || {
    title: 
      lang === 'en' ? "High School English Course | TOEFL & IELTS Prep" : 
      (lang === 'ar' ? "دورة اللغة الإنجليزية للمرحلة الثانوية" : 
      "Lise İngilizce Kursu | YKS-DİL, TOEFL, IELTS Hazırlık"),
    description: 
      lang === 'en' ? "High school English course focusing on fluent speaking, school curriculum alignment, and academic exam prep (TOEFL, IELTS, SAT)." : 
      (lang === 'ar' ? "دورة لغة إنجليزية للمرحلة الثانوية تركز على التحدث بطلاقة، ومواءمة المناهج المدرسية، والإعداد للاختبارات الأكاديمية (TOEFL، IELTS)." : 
      "Lise öğrencileri için uluslararası standartlarda, okul müfredatına tam uyumlu; YKS-DİL (YDT), TOEFL ve IELTS gibi akademik sınavlara hazırlık destekli konuşma odaklı İngilizce kursu."),
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/lise-ingilizce-kursu`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: lang,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    }
  };
}

export default async function LiseIngilizcePage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  // Dinamik SSS Verisi
  const faqItems = (dict as any)?.liseIngilizceLandingPage?.faq?.items || [];

  return (
    <main>
      <Navbar lang={lang} />

      {/* 1. BREADCRUMBLIST SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Anasayfa",
                "item": "https://www.avcilaringilizcekursu.com.tr"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Lise İngilizce Kursu",
                "item": `https://www.avcilaringilizcekursu.com.tr/${lang}/lise-ingilizce-kursu`
              }
            ]
          })
        }}
      />

      {/* 2. COURSE SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Lise İngilizce Kursu",
            "description": "Lise öğrencileri için uluslararası standartlarda, okul müfredatına tam uyumlu; YKS-DİL (YDT), TOEFL ve IELTS gibi akademik sınavlara hazırlık destekli konuşma odaklı İngilizce kursu.",
            "provider": {
              "@type": "EducationalOrganization",
              "name": "Avcılar İngilizce Dil Kursu",
              "sameAs": "https://www.avcilaringilizcekursu.com.tr"
            },
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "Blended",
              "location": {
                "@type": "Place",
                "name": "Avcılar İngilizce Dil Kursu",
                "address": "Namık Kemal Cd. Umut İş Merkezi No:23 Kat:5, 34310 Avcılar/İstanbul"
              }
            }
          })
        }}
      />

      {/* 3. FAQ SCHEMA */}
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item: any) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            }),
          }}
        />
      )}
      
      <CourseHeroSlider courseKey="liseIngilizceLandingPage" lang={lang} />
      <CourseInfoSection courseKey="liseIngilizceLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="liseIngilizceLandingPage" lang={lang} />
      <WhyUsSection courseKey="liseIngilizceLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="liseIngilizceLandingPage" lang={lang} />
      <CourseFAQ courseKey="liseIngilizceLandingPage" lang={lang} />
      <SeoContentBlock courseKey="liseIngilizceLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}