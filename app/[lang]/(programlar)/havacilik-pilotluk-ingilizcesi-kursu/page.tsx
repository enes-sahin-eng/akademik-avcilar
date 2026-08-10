import type { Metadata } from "next";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../../dictionaries/getDictionary";
import { Navbar } from "../../../components/layout/Navbar";
import { CourseHeroSlider } from "../../../components/course/CourseHeroSlider";
import { CourseInfoSection } from "../../../components/course/CourseInfoSection";
import { PublicationsShowcase } from "../../../components/course/PublicationsShowcase";
import { WhyUsSection } from "../../../components/course/WhyUsSection";
import { EducationModels } from "../../../components/course/EducationModels";
import { CourseFAQ } from "../../../components/course/CourseFAQ";
import { WhatsAppButton } from "../../../components/ui/WhatsAppButton";
import PlacementTestBanner from "../../../components/course/PlacementTestBanner";
import InstagramFeed from "../../../components/social/InstagramFeed";
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

  const meta = (dict as any)?.havacilikIngilizcesiLandingPage?.meta || {
    title:
      lang === "en"
        ? "Aviation & Pilot English Course | Akademik International"
        : lang === "ar"
          ? "دورة اللغة الإنجليزية للطيران والطيارين | Akademik International"
          : "Havacılık ve Pilotluk İngilizcesi Kursu | Akademik International",
    description:
      lang === "en"
        ? "Advance your career in aviation with our specialized English course focusing on terminology, cabin crew interviews, and 4 core skills."
        : lang === "ar"
          ? "ارتقِ بمسيرتك المهنية في مجال الطيران من خلال دورة اللغة الإنجليزية المتخصصة لدينا والتي تركز على المصطلحات ومقابلات طاقم الطائرة والمهارات الأساسية الأربعة."
          : "Havacılık terminolojisi, kabin memurluğu mülakatları ve 4 temel dil becerisini kapsayan Türkiye'nin en iyi Havacılık İngilizcesi hazırlık kursu.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/havacilik-pilotluk-ingilizcesi-kursu`,
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

export default async function HavacilikIngilizcesiKursuPage({
  params,
}: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  // Dinamik SSS Verisi (JSON-LD için)
  const faqItems =
    (dict as any)?.havacilikIngilizcesiLandingPage?.faq?.items || [];

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
                name: "Havacılık ve Pilotluk İngilizcesi",
                item: `https://www.avcilarakademik.com.tr/${lang}/havacilik-pilotluk-ingilizcesi-kursu`,
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
            name: "Havacılık ve Pilotluk İngilizcesi Kursu",
            description:
              "Havacılık sektöründe kariyer hedefleyenler için, kabin memurluğu mülakatları, havacılık terminolojisi ve 4 temel beceriyi (Reading, Writing, Listening, Speaking) kapsayan uzman eğitim programı.",
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

      {/* --- İÇERİK BİLEŞENLERİ (Sadeleştirilmiş Şablon) --- */}

      <CourseHeroSlider courseKey="havacilikIngilizcesiLandingPage" lang={lang} />
      <CourseInfoSection courseKey="havacilikIngilizcesiLandingPage" lang={lang} />
      <WhyUsSection courseKey="havacilikIngilizcesiLandingPage" lang={lang} />
      <PublicationsShowcase courseKey="havacilikIngilizcesiLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="havacilikIngilizcesiLandingPage" lang={lang} />
      <CourseFAQ courseKey="havacilikIngilizcesiLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
