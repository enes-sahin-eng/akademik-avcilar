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

const COURSE_KEY = "akademikSinavlarLandingPage";
const PAGE_SLUG = "akademik-sinavlar";

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
        ? "Academic Exam Prep Courses | IELTS, TOEFL, YDS, GMAT, GRE | Akademik International"
        : lang === "ar"
          ? "دورات التحضير للاختبارات الأكاديمية | IELTS وTOEFL وYDS وGMAT | أكاديميك إنترناشيونال"
          : "Akademik Sınav Hazırlık Kursları | IELTS, TOEFL, YDS, YÖKDİL, GMAT, GRE | Akademik International",
    description:
      lang === "en"
        ? "Preparation courses for IELTS, TOEFL, YDS, GMAT, GRE, SAT and Cambridge. Expert tutors, mock exams, proven success rates."
        : lang === "ar"
          ? "دورات التحضير لـ IELTS وTOEFL وYDS وGMAT وGRE وSAT وCambridge. مدرسون خبراء ونسب نجاح مرتفعة."
          : "IELTS, TOEFL, YDS, YÖKDİL, GMAT, GRE, SAT ve Cambridge hazırlık kursları. Uzman eğitmenler, deneme sınavları, yüksek başarı oranı.",
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

export default async function AkademikSinavlarPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;
  const dict = await getDictionary(lang);

  const faqItems = (dict as any)?.[COURSE_KEY]?.faq?.items || [];

  const courseName =
    lang === "en"
      ? "Academic Exam Preparation Courses – IELTS, TOEFL, YDS, GMAT, GRE, SAT"
      : lang === "ar"
        ? "دورات التحضير للاختبارات الأكاديمية – IELTS وTOEFL وYDS وGMAT وGRE وSAT"
        : "Akademik Sınav Hazırlık Kursları – IELTS, TOEFL, YDS, YÖKDİL, GMAT, GRE, SAT";

  const courseDesc =
    lang === "en"
      ? "Comprehensive preparation for all major international and national academic exams. Expert instructors with proven results, boutique classes of 7-10, regular mock exams."
      : lang === "ar"
        ? "تحضير شامل لجميع الاختبارات الأكاديمية الدولية والوطنية الكبرى. مدرسون خبراء بنتائج مُثبتة، فصول مصغرة من 7-10 طلاب، اختبارات محاكاة منتظمة."
        : "Uluslararası ve ulusal tüm büyük akademik sınavlar için kapsamlı hazırlık. Kanıtlanmış başarılı uzman eğitmenler, 7-10 kişilik butik sınıflar, düzenli deneme sınavları.";

  return (
    <main>
      <Navbar lang={lang} />

      {/* 1. BREADCRUMB SCHEMA */}
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
                    ? "Academic Exams"
                    : lang === "ar"
                      ? "الاختبارات الأكاديمية"
                      : "Akademik Sınavlar",
                item: `https://www.avcilarakademik.com.tr/${lang}/${PAGE_SLUG}`,
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
            name: courseName,
            description: courseDesc,
            provider: {
              "@type": "EducationalOrganization",
              name: "Akademik International Yabancı Dil Okulları",
              sameAs: "https://www.avcilarakademik.com.tr",
            },
            hasCourseInstance: [
              { "@type": "CourseInstance", name: "IELTS Hazırlık", courseMode: "Blended" },
              { "@type": "CourseInstance", name: "TOEFL Hazırlık", courseMode: "Blended" },
              { "@type": "CourseInstance", name: "YDS Hazırlık", courseMode: "Blended" },
              { "@type": "CourseInstance", name: "YÖKDİL Hazırlık", courseMode: "Blended" },
              { "@type": "CourseInstance", name: "GMAT Hazırlık", courseMode: "Blended" },
              { "@type": "CourseInstance", name: "GRE Hazırlık", courseMode: "Blended" },
              { "@type": "CourseInstance", name: "SAT Hazırlık", courseMode: "Blended" },
            ],
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
