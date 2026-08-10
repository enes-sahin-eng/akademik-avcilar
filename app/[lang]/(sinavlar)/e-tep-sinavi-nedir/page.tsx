import type { Metadata } from "next";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../../dictionaries/getDictionary";
import { Navbar } from "../../../components/layout/Navbar";
import { CourseHeroSlider } from "../../../components/course/CourseHeroSlider";
import { CourseInfoSection } from "../../../components/course/CourseInfoSection";
import { SeoContentBlock } from "../../../components/course/SeoContentBlock";
import { CourseProsConsTable } from "../../../components/course/CourseProsConsTable";
import { CourseFAQ } from "../../../components/course/CourseFAQ";
import { WhatsAppButton } from "../../../components/ui/WhatsAppButton";
import PlacementTestBanner from "../../../components/course/PlacementTestBanner";
import InstagramFeed from "../../../components/social/InstagramFeed";
import { StudentReviewsAndAwards } from "../../../components/home/StudentReviewsAndAwards";
import { GradeLevelTabs } from "../../../components/course/GradeLevelTabs";
import { PublicationsShowcase } from "../../../components/course/PublicationsShowcase";
import { WhyUsSection } from "../../../components/course/WhyUsSection";
import { EducationModels } from "../../../components/course/EducationModels";

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

  const meta = (dict as any)?.etepLandingPage?.meta || {
    title:
      lang === "en"
        ? "What is E-TEP Exam? Exam Format and Preparation Course | Akademik International"
        : lang === "ar"
          ? "ما هو امتحان E-TEP؟ تنسيق الامتحان ودورة التحضير | Akademik International"
          : "E-TEP Sınavı Nedir? Sınav Formatı ve Hazırlık Kursu | Akademik International",
    description:
      lang === "en"
        ? "E-TEP (Electronic Test of English Proficiency) is a new-generation four-skill English proficiency test organized by ÖSYM. Learn about E-TEP format, question types and our preparation course."
        : lang === "ar"
          ? "E-TEP هو اختبار كفاءة اللغة الإنجليزية الإلكتروني ذو المهارات الأربع الجديد الجيل الذي تنظمه ÖSYM. تعرف على تنسيق الاختبار وأنواع الأسئلة ودورتنا التحضيرية."
          : "E-TEP (Electronic Test of English Proficiency) sınavı, ÖSYM tarafından düzenlenen dört becerili yeni nesil İngilizce yeterlilik testidir. E-TEP formatı, soru tipleri ve hazırlık kursumuz hakkında detaylı bilgi alın.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/e-tep-sinavi-nedir`,
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
    },
  };
}

export default async function EtepSinaviNedirPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  // Dinamik SSS Verisi (JSON-LD için)
  const faqItems = (dict as any)?.etepLandingPage?.faq?.items || [];

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
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Anasayfa",
                item: "https://www.avcilarakademik.com.tr",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Akademik Sınav Kursları",
                item: `https://www.avcilarakademik.com.tr/${lang}/akademik-ingilizce-kursu`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "E-TEP Sınavı Nedir?",
                item: `https://www.avcilarakademik.com.tr/${lang}/e-tep-sinavi-nedir`,
              },
            ],
          }),
        }}
      />

      {/* 2. COURSE SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "E-TEP Sınavı Hazırlık Kursu",
            description:
              "ÖSYM'nin yeni nesil dört becerili İngilizce yeterlilik testi E-TEP'te hedeflediğiniz puana ulaşmak için yoğun hazırlık programı.",
            provider: {
              "@type": "EducationalOrganization",
              name: "Akademik International Yabancı Dil Okulları",
              sameAs: "https://www.avcilarakademik.com.tr",
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Blended",
              location: {
                "@type": "Place",
                name: "Akademik International Avcılar",
                address:
                  "Namık Kemal Cd. Umut İş Merkezi No:23 Kat:5, 34310 Avcılar/İstanbul",
              },
            },
          }),
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

      <CourseHeroSlider courseKey="etepLandingPage" lang={lang} />
      <CourseInfoSection courseKey="etepLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="etepLandingPage" lang={lang} />
      <WhyUsSection courseKey="etepLandingPage" lang={lang} />
      <PublicationsShowcase courseKey="etepLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="etepLandingPage" lang={lang} />
      <CourseFAQ courseKey="etepLandingPage" lang={lang} />
      <SeoContentBlock courseKey="etepLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
