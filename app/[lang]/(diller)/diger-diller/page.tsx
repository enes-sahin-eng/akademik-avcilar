import type { Metadata } from "next";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../../dictionaries/getDictionary";
import { Navbar } from "../../../components/layout/Navbar";
import { CourseHeroSlider } from "../../../components/course/CourseHeroSlider";
import { CourseInfoSection } from "../../../components/course/CourseInfoSection";
import { ExamCardsGrid } from "../../../components/course/ExamCardsGrid";
import { WhyUsSection } from "../../../components/course/WhyUsSection";
import { PublicationsShowcase } from "../../../components/course/PublicationsShowcase";
import { EducationModels } from "../../../components/course/EducationModels";
import { CourseFAQ } from "../../../components/course/CourseFAQ";
import { StudentReviewsAndAwards } from "../../../components/home/StudentReviewsAndAwards";
import PlacementTestBanner from "../../../components/course/PlacementTestBanner";
import InstagramFeed from "../../../components/social/InstagramFeed";
import { WhatsAppButton } from "../../../components/ui/WhatsAppButton";

const COURSE_KEY = "digerDillerLandingPage";
const PAGE_SLUG = "diger-diller";

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
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  const meta = (dict as any)?.[COURSE_KEY]?.meta || {
    title:
      lang === "en"
        ? "Other Language Courses | German, French, Spanish & More"
        : lang === "ar"
          ? "دورات اللغات الأخرى | الألمانية والفرنسية والإسبانية والمزيد | أكاديميك إنترناشيونال"
          : "Diğer Dil Kursları | Almanca, Fransızca, İspanyolca ve Daha Fazlası",
    description:
      lang === "en"
        ? "German, French, Spanish, Italian, Russian, Japanese, Korean and 15+ language courses. Expert teachers, flexible hours, all levels."
        : lang === "ar"
          ? "دورات الألمانية والفرنسية والإسبانية والإيطالية والروسية واليابانية والكورية وأكثر من 15 لغة. معلمون متخصصون وساعات مرنة."
          : "Avcılar'da Almanca, Fransızca, İspanyolca, İtalyanca, Rusça, Japonca, Korece ve 15+ dil kursu. Uzman eğitmenler, esnek saatler.",
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

export default async function DigerDillerPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  const faqItems = (dict as any)?.[COURSE_KEY]?.faq?.items || [];

  const courseName =
    lang === "en"
      ? "Other Language Courses – German, French, Spanish, Italian, Russian, Japanese, Korean and More"
      : lang === "ar"
        ? "دورات اللغات الأخرى – الألمانية والفرنسية والإسبانية والإيطالية والروسية واليابانية والكورية والمزيد"
        : "Diğer Dil Kursları – Almanca, Fransızca, İspanyolca, İtalyanca, Rusça, Japonca, Korece ve Daha Fazlası";

  const courseDesc =
    lang === "en"
      ? "Comprehensive language courses in 15+ languages from German and French to Japanese and Korean. Expert instructors with native-level accents, boutique classes of 7-10, free placement test."
      : lang === "ar"
        ? "دورات لغوية شاملة في أكثر من 15 لغة من الألمانية والفرنسية إلى اليابانية والكورية. مدرسون متخصصون بلكنة اللغة الأم وفصول بوتيك من 7-10 طلاب واختبار تحديد مستوى مجاني."
        : "Almancadan Fransızcaya, Japonca'dan Korece'ye kadar 15+ dilde kapsamlı dil kursları. Ana dil aksanına sahip uzman eğitmenler, 7-10 kişilik butik sınıflar, ücretsiz seviye tespit sınavı.";

  return (
    <main>
      <Navbar lang={lang} />

      {/* BREADCRUMB SCHEMA */}
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
                name: lang === "en" ? "Home" : lang === "ar" ? "الرئيسية" : "Anasayfa",
                item: "https://www.avcilarakademik.com.tr",
              },
              {
                "@type": "ListItem",
                position: 2,
                name:
                  lang === "en"
                    ? "Other Languages"
                    : lang === "ar"
                      ? "لغات أخرى"
                      : "Diğer Diller",
                item: `https://www.avcilarakademik.com.tr/${lang}/${PAGE_SLUG}`,
              },
            ],
          }),
        }}
      />

      {/* COURSE SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: courseName,
            description: courseDesc,
            provider: {
              "@type": "EducationalOrganization",
              name: "Akademik International Yabancı Dil Okulları",
              sameAs: "https://www.avcilarakademik.com.tr",
            },
            hasCourseInstance: [
              { "@type": "CourseInstance", name: "Almanca / German", courseMode: "Blended" },
              { "@type": "CourseInstance", name: "Fransızca / French", courseMode: "Blended" },
              { "@type": "CourseInstance", name: "İspanyolca / Spanish", courseMode: "Blended" },
              { "@type": "CourseInstance", name: "İtalyanca / Italian", courseMode: "Blended" },
              { "@type": "CourseInstance", name: "Rusça / Russian", courseMode: "Blended" },
              { "@type": "CourseInstance", name: "Japonca / Japanese", courseMode: "Blended" },
              { "@type": "CourseInstance", name: "Korece / Korean", courseMode: "Blended" },
              { "@type": "CourseInstance", name: "Çince / Chinese", courseMode: "Blended" },
              { "@type": "CourseInstance", name: "Arapça / Arabic", courseMode: "Blended" },
            ],
          }),
        }}
      />

      {/* FAQ SCHEMA */}
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
      <CourseInfoSection courseKey={COURSE_KEY} lang={lang} />
      <ExamCardsGrid courseKey={COURSE_KEY} lang={lang} />
      <WhyUsSection courseKey={COURSE_KEY} lang={lang} />
      <PublicationsShowcase courseKey={COURSE_KEY} lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <PlacementTestBanner lang={lang} />
      <EducationModels courseKey={COURSE_KEY} lang={lang} />
      <CourseFAQ courseKey={COURSE_KEY} lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
