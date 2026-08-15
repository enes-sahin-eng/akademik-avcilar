import type { Metadata } from "next";
import { Navbar } from "../../../components/layout/Navbar";
import { ContactHero } from "../../../components/contact/ContactHero";
import { ContactFormSection } from "../../../components/contact/ContactFormSection";
import { ContactCampuses } from "../../../components/contact/ContactCampuses";
import { ContactCorporate } from "../../../components/contact/ContactCorporate";
import { getDictionary, locales, type Locale } from "../../../dictionaries/getDictionary";

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (locales.includes(rawLang as Locale) ? rawLang : "tr") as Locale;

  const titles: Record<Locale, string> = {
    tr: "İletişim",
    en: "Contact",
    ar: "اتصل بنا",
  };
  const descriptions: Record<Locale, string> = {
    tr: "Avcılar merkez ve 12 şubemizle iletişime geçin. Kurs kayıt, bilgi ve randevu için bize ulaşın.",
    en: "Get in touch with our Avcılar headquarters and 12 branches. Contact us for course registration, information, and appointments.",
    ar: "تواصل مع مقرنا الرئيسي في أفجيلار و12 فرعًا. اتصل بنا للتسجيل في الدورات والمعلومات والمواعيد.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: {
      canonical: `/${lang}/iletisim`,
    },
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      type: "website",
      locale: lang,
    },
    twitter: {
      card: "summary_large_image",
      title: titles[lang],
      description: descriptions[lang],
    },
  };
}

export default async function IletisimPage({ params }: PageProps) {
  const { lang } = await params;
  
  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh" }}>
      <Navbar lang={lang} />
      
      <div style={{ paddingTop: "70px" }}>
        <ContactHero lang={lang} />
        <ContactFormSection lang={lang} />
        <ContactCampuses lang={lang} />
        <ContactCorporate lang={lang} />
      </div>
    </div>
  );
}
