import { Metadata } from 'next';
import { ProgramTabsSection } from '../../../components/home/ProgramTabsSection';
import { type Locale } from '../../../dictionaries/getDictionary';

interface PageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  
  const titleMap: Record<Locale, string> = {
    tr: "Haftalık Aktivite Programı",
    en: "Weekly Activity Program",
    ar: "برنامج النشاط الأسبوعي"
  };

  const descMap: Record<Locale, string> = {
    tr: "Avcılar İngilizce Dil Kursu güncel haftalık aktivite programları, konuşma kulüpleri ve özel etkinliklerimiz.",
    en: "Current weekly activity programs, speaking clubs, and special events at Avcılar English Language Course.",
    ar: "برامج الأنشطة الأسبوعية الحالية وأندية المحادثة والفعاليات الخاصة في دورة أفجيلار لتعليم اللغة الإنجليزية."
  };

  return {
    title: titleMap[lang] || titleMap.tr,
    description: descMap[lang] || descMap.tr,
    alternates: {
      canonical: `/${lang}/haftalik-program`,
    },
    openGraph: {
      type: 'website',
      url: `https://avcilaringilizcekursu.com.tr/${lang}/haftalik-program`,
      title: titleMap[lang] || titleMap.tr,
      description: descMap[lang] || descMap.tr,
      siteName: 'Avcılar İngilizce Dil Kursu',
    },
    twitter: {
      card: 'summary_large_image',
      title: titleMap[lang] || titleMap.tr,
      description: descMap[lang] || descMap.tr,
    }
  };
}

import { Navbar } from "../../../components/layout/Navbar";
import styles from "./page.module.css";

export default async function HaftalikProgramPage({ params }: PageProps) {
  const { lang } = await params;

  return (
    <>
      <Navbar lang={lang} />
      <main className={styles.main}>
        <ProgramTabsSection lang={lang} />
      </main>
    </>
  );
}
