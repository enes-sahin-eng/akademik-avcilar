import { Navbar } from "../../components/Navbar";
import { ContactHero } from "../../components/ContactHero";
import { ContactFormSection } from "../../components/ContactFormSection";
import { ContactCampuses } from "../../components/ContactCampuses";
import { ContactCorporate } from "../../components/ContactCorporate";

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function IletisimPage({ params }: PageProps) {
  await params;
  
  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh" }}>
      <Navbar />
      
      <div style={{ paddingTop: "70px" }}>
        <ContactHero />
        <ContactFormSection />
        <ContactCampuses />
        <ContactCorporate />
      </div>
    </div>
  );
}
