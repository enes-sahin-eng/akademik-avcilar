import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../../dictionaries/getDictionary";
import { Navbar } from "../../../components/layout/Navbar";
import { CourseHeroSlider } from "../../../components/course/CourseHeroSlider";
import { KariyerFirsatlariShowcase } from "../../../components/career/KariyerFirsatlariShowcase";
import { StudentReviewsAndAwards } from "../../../components/home/StudentReviewsAndAwards";
import InstagramFeed from "../../../components/social/InstagramFeed";
import { WhatsAppButton } from "../../../components/ui/WhatsAppButton";

const COURSE_KEY = "kariyerFirsatlariPage";
const PAGE_SLUG = "kariyer-firsatlari";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: rawLang } = await params;
  if (!locales.includes(rawLang as Locale)) notFound();
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  const meta = (dict as any)?.[COURSE_KEY]?.meta || {
    title: "Kariyer Fırsatları",
    description: "Avcılar İngilizce Dil Kursu bünyesinde kariyer yapmak ister misiniz? Açık pozisyonları inceleyin ve hemen başvurun.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${lang}/${PAGE_SLUG}` },
    openGraph: { title: meta.title, description: meta.description, type: "website", locale: lang },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

export default async function KariyerFirsatlariPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  if (!locales.includes(rawLang as Locale)) notFound();
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  const siteUrl = "https://avcilarakademik.com.tr";
  const pageData = (dict as any)?.[COURSE_KEY];
  const showcase = pageData?.showcase || {};
  const homeName = lang === "en" ? "Home" : lang === "ar" ? "الرئيسية" : "Anasayfa";
  const pageName = lang === "en" ? "Career Opportunities" : lang === "ar" ? "فرص العمل" : "Kariyer Fırsatları";

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
              { "@type": "ListItem", position: 1, name: homeName, item: `${siteUrl}/${lang}` },
              { "@type": "ListItem", position: 2, name: pageName, item: `${siteUrl}/${lang}/${PAGE_SLUG}` },
            ],
          }),
        }}
      />

      <CourseHeroSlider courseKey={COURSE_KEY} lang={lang} />

      <KariyerFirsatlariShowcase
        lang={lang}
        sectionTitle={showcase.sectionTitle || "Kariyer Fırsatları"}
        sectionSubtitle={showcase.sectionSubtitle || "Avcılar İngilizce Dil Kursu ailesine katılmak ister misiniz?"}
        openPositionsLabel={showcase.openPositionsLabel || "Açık Pozisyon"}
        cityLabel={showcase.cityLabel || "Şehir"}
        applyBtn={showcase.applyBtn || "BAŞVUR"}
        jobs={showcase.jobs || []}
      />

      <StudentReviewsAndAwards lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
