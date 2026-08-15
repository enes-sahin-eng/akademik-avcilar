import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getDictionary,
  locales,
  type Locale,
} from "../../../dictionaries/getDictionary";
import { Navbar } from "../../../components/layout/Navbar";
import { CourseHeroSlider } from "../../../components/course/CourseHeroSlider";
import { KurumsalAnlasmalarShowcase } from "../../../components/agreements/KurumsalAnlasmalarShowcase";
import { WhyUsSection } from "../../../components/course/WhyUsSection";
import { StudentReviewsAndAwards } from "../../../components/home/StudentReviewsAndAwards";
import InstagramFeed from "../../../components/social/InstagramFeed";
import { WhatsAppButton } from "../../../components/ui/WhatsAppButton";

const COURSE_KEY = "kurumsalAnlasmalarPage";
const PAGE_SLUG = "kurumsal-anlasmalar";

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
    title: "Kurumsal Anlaşmalar",
    description: "Yeşilova Holding, BTSO, İş Bankası, TÜMSİAD ve daha fazlasıyla imzaladığımız kurumsal indirim anlaşmalarını keşfedin.",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${lang}/${PAGE_SLUG}` },
    openGraph: { title: meta.title, description: meta.description, type: "website", locale: lang },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

export default async function KurumsalAnlasmalarPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  if (!locales.includes(rawLang as Locale)) notFound();
  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  const siteUrl = "https://avcilaringilizcekursu.com.tr";
  const pageData = (dict as any)?.[COURSE_KEY];
  const homeName = lang === "en" ? "Home" : lang === "ar" ? "الرئيسية" : "Anasayfa";
  const pageName =
    lang === "en" ? "Corporate Agreements" : lang === "ar" ? "اتفاقيات الشركات" : "Kurumsal Anlaşmalar";

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

      <KurumsalAnlasmalarShowcase
        lang={lang}
        sectionTitle={pageData?.showcase?.sectionTitle || "Kurumsal Anlaşmalarımız"}
        sectionSubtitle={pageData?.showcase?.sectionSubtitle || "Türkiye'nin önde gelen şirketleri ve sivil toplum kuruluşları ile imzaladığımız kurumsal indirim anlaşmaları."}
        agreementBadge={pageData?.showcase?.agreementBadge || "Anlaşma"}
        eventBadge={pageData?.showcase?.eventBadge || "Etkinlik"}
      />

      <WhyUsSection courseKey={COURSE_KEY} lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
    </main>
  );
}
