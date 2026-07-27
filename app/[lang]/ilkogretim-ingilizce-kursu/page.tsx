import type { Metadata } from "next";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../dictionaries/getDictionary";
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
import { SeoContentBlock } from "../../components/course/SeoContentBlock";
import { GradeLevelTabs } from "../../components/course/GradeLevelTabs";

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
    title:
      lang === "en"
        ? "Primary School Kids English Course | Akademik International"
        : lang === "ar"
          ? "دورة اللغة الإنجليزية للمرحلة الابتدائية | Akademik International"
          : "İlköğretim İngilizce Kursu | Çocuklar İçin Dil Eğitimi | Akademik International",
    description:
      lang === "en"
        ? "Fun and conversation-focused English courses designed specifically for 2nd, 3rd, and 4th-grade primary school students. Boost your child's language skills early."
        : lang === "ar"
          ? "دورات لغة إنجليزية ممتعة تركز على المحادثة مصممة خصيصًا لطلاب المدارس الابتدائية. عزز مهارات طفلك اللغوية مبكرًا."
          : "İlkokul 2, 3 ve 4. sınıf öğrencileri için özel olarak hazırlanmış, eğlenceli ve konuşma odaklı İngilizce kursu. Çocuklar için uzman eğitmenlerle dil eğitimi.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/ilkogretim-ingilizce-kursu`,
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

export default async function IlkogretimIngilizceKursuPage({
  params,
}: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  // JSON-LD için dinamik SSS (FAQ) verilerini çekiyoruz
  const faqItems =
    (dict as any)?.ilkogretimIngilizceLandingPage?.faq?.items || [];

  return (
    <main>
      <Navbar />

      {/* 1. BREADCRUMBLIST SCHEMA (Hiyerarşi) */}
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
                item: "https://www.akademik.com.tr",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "İlköğretim İngilizce Kursu",
                item: `https://www.akademik.com.tr/${lang}/ilkogretim-ingilizce-kursu`,
              },
            ],
          }),
        }}
      />

      {/* 2. COURSE SCHEMA (Kurs Detayları ve Lokasyon) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "İlköğretim İngilizce Kursu",
            description:
              "İlkokul öğrencileri için özel olarak hazırlanmış, eğlenceli ve konuşma odaklı İngilizce eğitim programı.",
            provider: {
              "@type": "EducationalOrganization",
              name: "Akademik International Yabancı Dil Okulları",
              sameAs: "https://www.akademik.com.tr",
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Blended",
              location: {
                "@type": "Place",
                name: "Akademik International Avcılar (Genel Merkez)",
                address:
                  "Namık Kemal Cd. Umut İş Merkezi No:23 Kat:5, 34310 Avcılar/İstanbul",
              },
            },
          }),
        }}
      />

      {/* 3. FAQ SCHEMA (Google Rich Snippets) */}
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

      {/* BİLEŞENLER */}
      <CourseHeroSlider courseKey="ilkogretimIngilizceLandingPage" />
      <CourseInfoSection courseKey="ilkogretimIngilizceLandingPage" />
      <GradeLevelTabs courseKey="ilkogretimIngilizceLandingPage" />
      <PublicationsShowcase courseKey="ilkogretimIngilizceLandingPage" />
      <PlacementTestBanner />
      <WhyUsSection courseKey="ilkogretimIngilizceLandingPage" />
      <SeoContentBlock courseKey="ilkogretimIngilizceLandingPage" />
      <EducationModels courseKey="ilkogretimIngilizceLandingPage" />
      <CourseFAQ courseKey="ilkogretimIngilizceLandingPage" />
      <StudentReviewsAndAwards />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" />
    </main>
  );
}
