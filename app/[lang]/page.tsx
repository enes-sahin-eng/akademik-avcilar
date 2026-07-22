import { Navbar } from "../components/Navbar";
import { HeroSlider } from "../components/HeroSlider";
import { MiniGallery } from "../components/MiniGallery";
import { CampusCarousel } from "../components/CampusCarousel";
import { HomeContentSection } from "../components/HomeContentSection";
import { StudentReviewsAndAwards } from "../components/StudentReviewsAndAwards";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { LeadFormModal } from "../components/LeadFormModal";
import { ContactInfoBar } from "../components/ContactInfoBar";

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function Home({ params }: PageProps) {
  await params;

  return (
    <div>
      <Navbar />
      <HeroSlider />
      <ContactInfoBar />
      <MiniGallery />
      <CampusCarousel />
      <HomeContentSection />
      <StudentReviewsAndAwards />
      <WhatsAppButton phoneNumber="905323609256" />
      <LeadFormModal />
    </div>
  );
}
