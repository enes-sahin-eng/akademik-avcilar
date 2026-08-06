import { Navbar } from "../components/layout/Navbar";
import { HeroSlider } from "../components/home/HeroSlider";
import { HeroQuickNav } from "../components/course/HeroQuickNav";
import { MiniGallery } from "../components/home/MiniGallery";
import { CampusCarousel } from "../components/ui/CampusCarousel";
import { CampusLocation } from "../components/campus/CampusLocation";
import { HomeContentSection } from "../components/home/HomeContentSection";
import { StudentReviewsAndAwards } from "../components/home/StudentReviewsAndAwards";
import { WhatsAppButton } from "../components/ui/WhatsAppButton";
import { LeadFormModal } from "../components/ui/LeadFormModal";
import PlacementTestBanner from "../components/course/PlacementTestBanner";
import InstagramFeed from "../components/social/InstagramFeed";
import CourseHighlightTabs from "../components/home/CourseHighlightTabs";

interface PageProps {
  params: Promise<{
    lang: any;
  }>;
}

export default async function Home({ params }: PageProps) {
  const { lang } = await params;

  return (
    <div>
      <h1 className="sr-only">
        Avcılar İngilizce Kursu - Akademik International Yabancı Dil Okulu
      </h1>
      <Navbar lang={lang} />
      <HeroSlider lang={lang} />
      <HeroQuickNav lang={lang} />
      <CampusLocation courseKey="homePage" lang={lang} />
      <MiniGallery />
      <CampusCarousel lang={lang} />
      <CourseHighlightTabs lang={lang} />
      <HomeContentSection lang={lang} />
      <StudentReviewsAndAwards lang={lang} />
      <InstagramFeed lang={lang} />
      <WhatsAppButton phoneNumber="905323609256" lang={lang} />
      <LeadFormModal lang={lang} />
      <PlacementTestBanner lang={lang} />
    </div>
  );
}
