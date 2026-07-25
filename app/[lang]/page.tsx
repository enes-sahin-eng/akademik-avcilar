import { Navbar } from "../components/Navbar";
import { HeroSlider } from "../components/HeroSlider";
import { MiniGallery } from "../components/MiniGallery";
import { CampusCarousel } from "../components/CampusCarousel";
import { HomeContentSection } from "../components/HomeContentSection";
import { StudentReviewsAndAwards } from "../components/StudentReviewsAndAwards";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { LeadFormModal } from "../components/LeadFormModal";
import PlacementTestBanner from "../components/PlacementTestBanner";

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
      <WhatsAppButton phoneNumber="905323609256" />
      <LeadFormModal />
      <PlacementTestBanner />
    </div>
  );
}
