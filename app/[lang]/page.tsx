import { Navbar } from "../components/layout/Navbar";
import { HeroSlider } from "../components/home/HeroSlider";
import { MiniGallery } from "../components/home/MiniGallery";
import { CampusCarousel } from "../components/ui/CampusCarousel";
import { HomeContentSection } from "../components/home/HomeContentSection";
import { StudentReviewsAndAwards } from "../components/home/StudentReviewsAndAwards";
import { WhatsAppButton } from "../components/ui/WhatsAppButton";
import { LeadFormModal } from "../components/ui/LeadFormModal";
import PlacementTestBanner from "../components/course/PlacementTestBanner";
import InstagramFeed from "../components/social/InstagramFeed";

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function Home({ params }: PageProps) {
  await params;

  return (
    <div>
      <h1 className="sr-only">Avcılar İngilizce Kursu - Akademik International Yabancı Dil Okulu</h1>
      <Navbar />
      <HeroSlider />
      <MiniGallery />
      <CampusCarousel />
      <HomeContentSection />
      <StudentReviewsAndAwards />
      <InstagramFeed />
      <WhatsAppButton phoneNumber="905323609256" />
      <LeadFormModal />
      <PlacementTestBanner />
    </div>
  );
}
