import type { Metadata } from "next";
import { Navbar } from "../components/layout/Navbar";
import { HeroSlider } from "../components/home/HeroSlider";
import { HeroQuickNav } from "../components/course/HeroQuickNav";
import { MiniGallery } from "../components/home/MiniGallery";
import { CampusTabs } from "../components/ui/CampusTabs";
import { CampusLocation } from "../components/campus/CampusLocation";
import { HomeArticle } from "../components/home/HomeArticle";
import { FAQSection } from "../components/home/FAQSection";
import { ProgramTabsSection } from "../components/home/ProgramTabsSection";
import { UpcomingProgramsTable } from "../components/home/UpcomingProgramsTable";
import homeContentStyles from "../components/home/HomeContentSection.module.css";
import { StudentReviewsAndAwards } from "../components/home/StudentReviewsAndAwards";
import { WhatsAppButton } from "../components/ui/WhatsAppButton";
import PlacementTestBanner from "../components/course/PlacementTestBanner";
import InstagramFeed from "../components/social/InstagramFeed";
import CourseHighlightTabs from "../components/home/CourseHighlightTabs";
import DeferredModals from "../components/home/DeferredModals";
import { getDictionary } from "../dictionaries/getDictionary";
import { getWebSiteSchema } from "../../src/utils/seo";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://avcilaringilizcekursu.com.tr";

interface PageProps {
  params: Promise<{
    lang: any;
  }>;
}

const HOME_TITLES: Record<string, string> = {
  tr: "Avcılar İngilizce Kursu - Avcılar'ın En İyi İngilizce Dil Kursu",
  en: "Avcılar English Course - The Best English Language Course in Avcılar",
  ar: "دورة اللغة الإنجليزية في أفجيلار – أفضل دورة في اللغة الإنجليزية في أفجيلار",
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const title = HOME_TITLES[lang];
  if (!title) return {};

  return {
    title: { absolute: title },
  };
}

export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const popupDict = (dictionary as any).languageInterestPopup;
  const programsTitle = (dictionary as any)?.homeContentSection?.programsTitle;

  return (
    <div>
      {/* Google "Site Name" özelliği WebSite şemasını YALNIZCA ana sayfada arıyor,
          bu yüzden layout'ta (her sayfada) değil burada render ediliyor. */}
      <script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getWebSiteSchema(siteUrl)),
        }}
      />
      <Navbar lang={lang} />
      <HeroSlider lang={lang} />
      <HeroQuickNav lang={lang} />
      <CampusLocation courseKey="homePage" lang={lang} />

      {/* ANA İÇERİK — H1 + tanıtım metni */}
      <section className={homeContentStyles.sectionContainer}>
        <div className={homeContentStyles.contentWrapper}>
          <HomeArticle lang={lang} />
        </div>
      </section>

      {/* YORUMLAR + ÖDÜLLER — tek parça, ana içeriğin hemen altında */}
      <StudentReviewsAndAwards lang={lang} />

      {/* TABLOLAR */}
      <section className={homeContentStyles.sectionContainer}>
        <ProgramTabsSection lang={lang} />
      </section>
      <section className={homeContentStyles.fullWidthBeige}>
        <div className={homeContentStyles.innerContainer}>
          {programsTitle && (
            <h2 className={homeContentStyles.programsTitle}>{programsTitle}</h2>
          )}
          <UpcomingProgramsTable lang={lang} />
        </div>
      </section>
      <CourseHighlightTabs lang={lang} />

      {/* SSS */}
      <FAQSection lang={lang} />

      <MiniGallery lang={lang} />
      <CampusTabs lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
      <DeferredModals
        lang={lang}
        formDict={(dictionary as any)?.leadForm}
        popupDict={popupDict}
      />
      <PlacementTestBanner lang={lang} />
    </div>
  );
}
