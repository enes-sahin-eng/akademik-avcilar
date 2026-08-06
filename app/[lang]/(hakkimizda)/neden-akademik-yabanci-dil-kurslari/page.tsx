import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../../dictionaries/getDictionary";
import { Navbar } from "../../../components/layout/Navbar";
import { CourseHeroSlider } from "../../../components/course/CourseHeroSlider";
import { PublicationsIntroSection } from "../../../components/course/PublicationsIntroSection";
import { NedenBizFeaturesSection } from "../../../components/course/NedenBizFeaturesSection";
import { CourseFAQ } from "../../../components/course/CourseFAQ";
import { StudentReviewsAndAwards } from "../../../components/home/StudentReviewsAndAwards";
import InstagramFeed from "../../../components/social/InstagramFeed";
import { WhatsAppButton } from "../../../components/ui/WhatsAppButton";

const COURSE_KEY = "nedenAkademikPage";
const PAGE_SLUG = "neden-akademik-yabanci-dil-kurslari";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang: rawLang } = await params;
  if (!locales.includes(rawLang as Locale)) notFound();
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  const meta = (dict as any)?.[COURSE_KEY]?.meta || {
    title: "Neden Akademik Yabancı Dil Kursları?",
    description:
      "Neden Akademik Yabancı Dil Kurslarını tercih etmelisiniz? Eğitim modelimiz, uzman kadromuz ve size sunduğumuz ayrıcalıklar.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${lang}/${PAGE_SLUG}` },
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

export default async function NedenAkademikPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  if (!locales.includes(rawLang as Locale)) notFound();
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  const siteUrl = "https://avcilarakademik.com.tr";
  const pageData = (dict as any)?.[COURSE_KEY];
  const meta = pageData?.meta || {};
  const homeName =
    lang === "en" ? "Home" : lang === "ar" ? "الرئيسية" : "Anasayfa";
  const pageName =
    lang === "en"
      ? "Why Akademik?"
      : lang === "ar"
        ? "لماذا الأكاديمية؟"
        : "Neden Akademik?";
  const faqItems = pageData?.faq?.items || [];

  return (
    <main>
      <Navbar lang={lang} />

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
                name: homeName,
                item: `${siteUrl}/${lang}`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: pageName,
                item: `${siteUrl}/${lang}/${PAGE_SLUG}`,
              },
            ],
          }),
        }}
      />

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
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            }),
          }}
        />
      )}

      <CourseHeroSlider courseKey={COURSE_KEY} lang={lang} />
      <PublicationsIntroSection courseKey={COURSE_KEY} lang={lang} />
      <NedenBizFeaturesSection courseKey={COURSE_KEY} lang={lang} />
      <CourseFAQ courseKey={COURSE_KEY} lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
