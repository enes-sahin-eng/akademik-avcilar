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

  const meta = (dict as any)?.aileBirlesimiLandingPage?.meta || {
    title:
      lang === "en"
        ? "German Family Reunification Course | Akademik International"
        : lang === "ar"
          ? "دورة لم الشمل العائلي باللغة الألمانية | Akademik International"
          : "Almanca Aile Birleşimi Kursu | Akademik International",
    description:
      lang === "en"
        ? "Prepare for the Goethe Start Deutsch A1 exam required for German visa applications with our native speaker instructors."
        : lang === "ar"
          ? "استعد لامتحان جوته Start Deutsch A1 المطلوب لطلبات التأشيرة الألمانية مع مدربينا الناطقين بها."
          : "Almanya vize başvuruları için zorunlu olan Aile Birleşimi (Start Deutsch A1) sınavına anadili Almanca olan uzman kadromuzla hazırlanın.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/almanca-aile-birlesimi-kursu`,
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

export default async function AileBirlesimiKursuPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  // Dinamik SSS Verisi (JSON-LD için)
  const faqItems = (dict as any)?.aileBirlesimiLandingPage?.faq?.items || [];

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
                name: "Almanca Aile Birleşimi Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/almanca-aile-birlesimi-kursu`,
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
            name: "Almanca Aile Birleşimi (Start Deutsch A1) Kursu",
            description:
              "Almanya Konsolosluğu'nun oturma izni ve vize taleplerinde zorunlu kıldığı Goethe Start Deutsch A1 sınavına yönelik, dört temel beceriyi (Dinleme, Okuma, Yazma, Konuşma) kapsayan özel hazırlık programı.",
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

      <CourseHeroSlider courseKey="aileBirlesimiLandingPage" lang={lang} />
      <CourseInfoSection courseKey="aileBirlesimiLandingPage" lang={lang} />

      <PublicationsShowcase courseKey="aileBirlesimiLandingPage" lang={lang} />

      <PlacementTestBanner lang={lang} />
      <WhyUsSection courseKey="aileBirlesimiLandingPage" lang={lang} />
      <EducationModels courseKey="aileBirlesimiLandingPage" lang={lang} />
      <CourseFAQ courseKey="aileBirlesimiLandingPage" lang={lang} />

      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
