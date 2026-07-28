import type { Metadata } from "next";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../dictionaries/getDictionary";
import { Navbar } from "../../components/layout/Navbar";
import { CourseHeroSlider } from "../../components/course/CourseHeroSlider";
import { CourseInfoSection } from "../../components/course/CourseInfoSection";
import { PublicationsShowcase } from "../../components/course/PublicationsShowcase";
import { WhyUsSection } from "../../components/course/WhyUsSection";
import { EducationModels } from "../../components/course/EducationModels";
import { CourseFAQ } from "../../components/course/CourseFAQ";
import { WhatsAppButton } from "../../components/ui/WhatsAppButton";
import PlacementTestBanner from "../../components/course/PlacementTestBanner";
import InstagramFeed from "../../components/social/InstagramFeed";
import { GradeLevelTabs } from "../../components/course/GradeLevelTabs";
import { SeoContentBlock } from "@/app/components/course/SeoContentBlock";

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

  // SEO odaklı dinamik meta verileri (Kurumsal İngilizce için güncellendi)
  const meta = (dict as any)?.kurumsalIngilizceLandingPage?.meta || {
    title:
      lang === "en"
        ? "Corporate English Course & Training | Akademik International"
        : lang === "ar"
          ? "دورة اللغة الإنجليزية للشركات | Akademik International"
          : "Kurumsal İngilizce Kursu | Şirketlere Özel | Akademik International",
    description:
      lang === "en"
        ? "Ensure your team communicates effectively in the global arena with HR-integrated Corporate English training tailored to your company and sector."
        : lang === "ar"
          ? "تأكد من تواصل فريقك بفعالية في الساحة العالمية من خلال تدريب اللغة الإنجليزية للشركات المصمم خصيصاً لشركتك."
          : "Şirketinize ve sektörünüze özel tasarlanan, İK entegreli Kurumsal İngilizce eğitimleri ile ekibinizin global arenada etkili iletişim kurmasını sağlayın.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/kurumsal-ingilizce`,
    },
    // Open Graph ve Twitter kartları için ekstra SEO gücü eklenebilir
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: lang,
    },
  };
}

export default async function KurumsalIngilizcePage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  // JSON-LD Schema.org Yapılandırması (Course + FAQ)
  const faqItems =
    (dict as any)?.kurumsalIngilizceLandingPage?.faq?.items || [];

  return (
    <main>
      <Navbar />

      {/* 1. COURSE SCHEMA (Kurumsal İçin Güncellendi) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Kurumsal İngilizce Kursu",
            description:
              "Şirketlere, yöneticilere ve çalışanlara özel, İK entegreli sektörel İngilizce eğitim programı.",
            provider: {
              "@type": "EducationalOrganization",
              name: "Akademik International Yabancı Dil Okulları",
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

      {/* BİLEŞENLER (Tüm courseKey değerleri kurumsalIngilizceLandingPage olarak değiştirildi) */}
      <CourseHeroSlider courseKey="kurumsalIngilizceLandingPage" />
      <CourseInfoSection courseKey="kurumsalIngilizceLandingPage" lang={lang} />
      <GradeLevelTabs courseKey="kurumsalIngilizceLandingPage" />
      <PublicationsShowcase courseKey="kurumsalIngilizceLandingPage" lang={lang} />
      <PlacementTestBanner />
      <WhyUsSection courseKey="kurumsalIngilizceLandingPage" />
      <EducationModels courseKey="kurumsalIngilizceLandingPage" lang={lang} />
      <CourseFAQ courseKey="kurumsalIngilizceLandingPage" lang={lang} />

      {/* YENİ: SEMANTİK SEO İÇERİK ALANI */}
      <SeoContentBlock courseKey="kurumsalIngilizceLandingPage" lang={lang} />

      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
