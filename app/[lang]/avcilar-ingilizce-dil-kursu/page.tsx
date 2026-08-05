import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../dictionaries/getDictionary";
import { Navbar } from "../../components/layout/Navbar";
import { CourseHeroSlider } from "../../components/course/CourseHeroSlider";
import { CampusLocation } from "../../components/campus/CampusLocation";
import { CampusCarousel } from "../../components/ui/CampusCarousel";
import { UpcomingProgramsTable } from "../../components/home/UpcomingProgramsTable";
import { PublicationsShowcase } from "../../components/course/PublicationsShowcase";
import { WhyUsSection } from "../../components/course/WhyUsSection";
import { StudentReviewsAndAwards } from "../../components/home/StudentReviewsAndAwards";
import { SeoContentBlock } from "../../components/course/SeoContentBlock";
import { CourseFAQ } from "../../components/course/CourseFAQ";
import { WhatsAppButton } from "../../components/ui/WhatsAppButton";
import InstagramFeed from "../../components/social/InstagramFeed";
import PlacementTestBanner from "../../components/course/PlacementTestBanner";
import { MiniGallery } from "@/app/components/home/MiniGallery";

const COURSE_KEY = "avcilarIngilizceLandingPage";
const PAGE_SLUG = "avcilar-ingilizce-dil-kursu";

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
    title: "Avcılar İngilizce Kursu | Avcılar İngilizce Dil Kursu",
    description:
      "Avcılar İngilizce Kursu tavsiyeleri arasında ilk sırada yer alan Akademik International Yabancı Dil Kursu, her yaşa özel programlarla sınavlarda başarı fırsatı sunmaktadır.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/${PAGE_SLUG}`,
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

export default async function AvcilarIngilizceDilKursuPage({
  params,
}: PageProps) {
  const { lang: rawLang } = await params;
  if (!locales.includes(rawLang as Locale)) notFound();
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  const siteUrl = "https://avcilarakademik.com.tr";
  const pageData = (dict as any)?.[COURSE_KEY];
  const meta = pageData?.meta || {};
  const homeName =
    lang === "en" ? "Home" : lang === "ar" ? "الرئيسية" : "Anasayfa";
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
                name: meta.title,
                item: `${siteUrl}/${lang}/${PAGE_SLUG}`,
              },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: meta.title,
            description: meta.description,
            provider: {
              "@type": "EducationalOrganization",
              name: "Akademik International Yabancı Dil Okulları",
              sameAs: siteUrl,
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Blended",
              location: {
                "@type": "Place",
                name: "Akademik International Avcılar",
                address:
                  "Merkez, Namık Kemal Cd. Umut İş Merkezi No:23 Kat:5, 34310 Avcılar/İstanbul",
              },
            },
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
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            }),
          }}
        />
      )}

      <CourseHeroSlider courseKey={COURSE_KEY} lang={lang} />
      <CampusLocation courseKey={COURSE_KEY} lang={lang} />
      <MiniGallery />
      <CampusCarousel lang={lang} />
      <UpcomingProgramsTable lang={lang} dictKey="homeContentSection" />
      <PublicationsShowcase courseKey={COURSE_KEY} lang={lang} />
      <PlacementTestBanner lang={lang} />
      <WhyUsSection courseKey={COURSE_KEY} lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <CourseFAQ courseKey={COURSE_KEY} lang={lang} />
      <SeoContentBlock courseKey={COURSE_KEY} lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
