import { Navbar } from "../components/layout/Navbar";
import { HeroSlider } from "../components/home/HeroSlider";
import { HeroQuickNav } from "../components/course/HeroQuickNav";
import { MiniGallery } from "../components/home/MiniGallery";
import { CampusTabs } from "../components/ui/CampusTabs";
import { CampusLocation } from "../components/campus/CampusLocation";
import { HomeContentSection } from "../components/home/HomeContentSection";
import { StudentReviewsAndAwards } from "../components/home/StudentReviewsAndAwards";
import { WhatsAppButton } from "../components/ui/WhatsAppButton";
import PlacementTestBanner from "../components/course/PlacementTestBanner";
import InstagramFeed from "../components/social/InstagramFeed";
import CourseHighlightTabs from "../components/home/CourseHighlightTabs";
import DeferredModals from "../components/home/DeferredModals";
import { getDictionary } from "../dictionaries/getDictionary";

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const popupDict = (dictionary as any).languageInterestPopup;
  const seoIntro  = (dictionary as any).homeSeoIntro;
  const seoH1     =
    (dictionary as any).homeSeoH1 ??
    "Avcılar İngilizce Kursu - Akademik International Yabancı Dil Okulu";

  return (
    <div>
      <h1 className="sr-only">{seoH1}</h1>
      {seoIntro && <p className="sr-only">{seoIntro}</p>}
      <Navbar lang={lang} />
      <HeroSlider lang={lang} />
      <HeroQuickNav lang={lang} />
      <CampusLocation courseKey="homePage" lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <HomeContentSection lang={lang} />
      <CourseHighlightTabs lang={lang} />
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
