import { Navbar } from "../../components/layout/Navbar";
import { ContactHero } from "../../components/contact/ContactHero";
import { ContactFormSection } from "../../components/contact/ContactFormSection";
import { ContactCampuses } from "../../components/contact/ContactCampuses";
import { ContactCorporate } from "../../components/contact/ContactCorporate";

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
