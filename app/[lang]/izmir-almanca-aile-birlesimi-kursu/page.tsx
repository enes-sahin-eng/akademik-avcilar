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

  const meta = (dict as any)?.izmirAileBirlesimiLandingPage?.meta || {
    title:
      lang === "en"
        ? "Izmir German Family Reunification Course | Akademik International"
        : lang === "ar"
          ? "دورة لم الشمل العائلي باللغة الألمانية في إزمير | Akademik International"
          : "İzmir Almanca Aile Birleşimi Kursu | Akademik International",
    description:
      lang === "en"
        ? "Contact us for detailed information about our German Family Reunification Course in Izmir and get prepared for your visa applications."
        : lang === "ar"
          ? "اتصل بنا للحصول على معلومات مفصلة حول دورة لم الشمل العائلي باللغة الألمانية في إزمير واستعد لطلبات التأشيرة الخاصة بك."
          : "Almanca Aile Birleşimi Kursu İzmir hakkında daha detaylı bilgi almak ve Almanya vize sürecine eksiksiz hazırlanmak için bizimle iletişim sağlayabilirsiniz.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/izmir-almanca-aile-birlesimi-kursu`,
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

export default async function IzmirAileBirlesimiKursuPage({
  params,
}: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  // Dinamik SSS Verisi (JSON-LD için)
  const faqItems =
    (dict as any)?.izmirAileBirlesimiLandingPage?.faq?.items || [];

  return (
    <main>
      <Navbar />

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
                name: "İzmir Almanca Aile Birleşimi Kursu",
                item: `https://www.avcilarakademik.com.tr/${lang}/izmir-almanca-aile-birlesimi-kursu`,
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
            name: "İzmir Almanca Aile Birleşimi Kursu",
            description:
              "Almanya aile birleşimi vizesi için gerekli olan A1 seviyesi Almanca sınavına yönelik, İzmir'de sunulan genel bilgilendirme ve hazırlık programı.",
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
                name: "Akademik International İzmir",
                address: "İzmir, Türkiye",
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

      <CourseHeroSlider courseKey="izmirAileBirlesimiLandingPage" />
      <CourseInfoSection
        courseKey="izmirAileBirlesimiLandingPage"
        lang={lang}
      />

      {/* Yayınlar Modülü Sabit */}
      <PublicationsShowcase
        courseKey="izmirAileBirlesimiLandingPage"
        lang={lang}
      />

      <PlacementTestBanner />
      <WhyUsSection courseKey="izmirAileBirlesimiLandingPage" />
      <EducationModels courseKey="izmirAileBirlesimiLandingPage" lang={lang} />
      <CourseFAQ courseKey="izmirAileBirlesimiLandingPage" lang={lang} />

      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
