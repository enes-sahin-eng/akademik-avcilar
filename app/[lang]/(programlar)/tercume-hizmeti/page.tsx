import type { Metadata } from "next";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../../dictionaries/getDictionary";
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
import { SeoContentBlock } from "@/app/components/course/SeoContentBlock";
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

  // SEO odaklı dinamik meta verileri (Tercüme Hizmeti için güncellendi)
  const meta = (dict as any)?.tercumeHizmetiLandingPage?.meta || {
    title:
      lang === "en"
        ? "Professional Translation Services"
        : lang === "ar"
          ? "خدمات الترجمة المهنية"
          : "Profesyonel Tercüme Hizmetleri",
    description:
      lang === "en"
        ? "Fast, reliable, and sworn translation services for your personal and corporate documents."
        : lang === "ar"
          ? "خدمات ترجمة سريعة وموثوقة ومحلفة لمستنداتك الشخصية والشركات."
          : "Kurumsal ve bireysel belgeleriniz için hızlı, güvenilir ve yeminli tercüme hizmetleri.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/tercume-hizmeti`,
    },
    // Open Graph ve Twitter kartları için ekstra SEO gücü
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: lang,
    },
  };
}

export default async function TercumeHizmetiPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  // JSON-LD Schema.org Yapılandırması (Service + FAQ)
  const faqItems = (dict as any)?.tercumeHizmetiLandingPage?.faq?.items || [];

  return (
    <main>
      <Navbar lang={lang} />

      {/* 1. SERVICE SCHEMA (Tercüme Hizmeti İçin Güncellendi) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Tercüme Hizmetleri",
            serviceType: "Translation Service",
            description:
              "Bireysel ve kurumsal ihtiyaçlar için profesyonel, yeminli ve noter onaylı tercüme hizmetleri.",
            provider: {
              "@type": "Organization",
              name: "Akademik International",
              sameAs: "https://www.akademik.com.tr",
            },
          }),
        }}
      />

      {/* 2. FAQ SCHEMA (Google Rich Snippets için Kritik!) */}
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

      <CourseHeroSlider courseKey="tercumeHizmetiLandingPage" lang={lang} />
      <CourseInfoSection courseKey="tercumeHizmetiLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="tercumeHizmetiLandingPage" lang={lang} />
      <WhyUsSection courseKey="tercumeHizmetiLandingPage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey="tercumeHizmetiLandingPage" lang={lang} />
      <CourseFAQ courseKey="tercumeHizmetiLandingPage" lang={lang} />
      <SeoContentBlock courseKey="tercumeHizmetiLandingPage" lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
