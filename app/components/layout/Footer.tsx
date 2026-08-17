import React from "react";
import { HeadphonesIcon } from "lucide-react";
import styles from "./Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { getDictionary, type Locale } from "../../dictionaries/getDictionary";
import { NewsletterForm } from "./NewsletterForm";

const campuses = [
  { name: "Kadıköy İngilizce Dil Kursu", badge: false, href: "/kadikoy-ingilizce-dil-kursu" },
  { name: "Bursa İngilizce Kursu", badge: true, href: "/bursa-ingilizce-dil-kursu-fsm" },
  { name: "Avcılar İngilizce Dil Kursu", badge: false, href: "/avcilar-ingilizce-dil-kursu" },
  { name: "İstanbul İngilizce Dil Kursu", badge: false, href: "/istanbul-ingilizce-kursu" },
  { name: "İstanbul Çekmeköy", badge: false, href: "/cekmekoy-ingilizce-dil-kursu" },
  { name: "Bursa Görükle", badge: false, href: "/gorukle-ingilizce-dil-kursu" },
  { name: "Ankara", badge: true, href: "/ankara-ingilizce-dil-kursu" },
  { name: "İzmir İngilizce Dil Kursu", badge: true, href: "/izmir-ingilizce-dil-kursu" },
  { name: "Kocaeli İzmit", badge: false, href: "/kocaeli-izmit-ingilizce-dil-kursu" },
  { name: "Tekirdağ Çorlu", badge: false, href: "/corlu-ingilizce-dil-kursu" },
  { name: "Bursa İnegöl", badge: false, href: "/inegol-ingilizce-dil-kursu" },
  { name: "Bursa Yıldırım", badge: false, href: "/yildirim-erikli-ingilizce-dil-kursu" },
];

const programs = [
  { name: "Kadıköy Almanca Kursu", href: "/kadikoy-almanca-kursu" },
  { name: "Almanca Aile Birleşimi Kursu", href: "/almanca-aile-birlesimi-kursu" },
  { name: "İzmir Almanca Aile Birleşimi Kursu", href: "/izmir-almanca-aile-birlesimi-kursu" },
  { name: "Beşiktaş Fransızca Kursu", href: "/fransizca-kursu-besiktas" },
  { name: "Prep Temel İngilizce Kursu", href: "/temel-ingilizce-kursu-hazirlik" },
  { name: "Prep Plus İngilizce Kursu", href: "/temel-ingilizce-kursu-hazirlik-plus" },
  { name: "İleri Seviye Express Kursu", href: "/academic-express-ingilizce-kursu" },
  { name: "İleri Seviye İngilizce Kursu", href: "/academic-ingilizce-kursu" },
  { name: "İleri Seviye Plus Kursu", href: "/academic-plus-ingilizce-kursu" },
  { name: "İngilizce Özel Ders", href: "/ingilizce-ozel-ders" },
  { name: "Genel İngilizce Kursu", href: "/ingilizce-kursu" },
  { name: "Kurumlara Özel / Kurumsal İngilizce Kursu", href: "/kurumlara-ozel-ingilizce-kursu" },
  { name: "YDS Hazırlık Kursu", href: "/yds-hazirlik-kursu" },
  { name: "Akademik İngilizce", href: "/akademik-ingilizce-kursu" },
  { name: "YÖKDİL Sınavı Hazırlık Kursu", href: "/yokdil-hazirlik-kursu" },
  { name: "YKS-DİL (YDT) Hazırlık Kursu", href: "/yks-dil-ydt-hazirlik-kursu" },
  { name: "TOEFL Hazırlık Kursu", href: "/toefl-hazirlik-kursu" },
  { name: "IELTS Hazırlık Kursu", href: "/ielts-hazirlik-kursu" },
  { name: "TOEIC Hazırlık Kursu", href: "/toeic-hazirlik-kursu" },
  { name: "Hazırlık Atlama Kursu - Proficiency", href: "/ingilizce-hazirlik-atlama" },
  { name: "İş İngilizcesi", href: "/is-ingilizcesi" },
  { name: "İlköğretim İngilizce Kursu", href: "/ilkogretim-ingilizce-kursu" },
  { name: "Ortaokul İngilizce Kursu | 5-8. Sınıflar İçin Konuşma Odaklı Eğitim", href: "/ortaokul-ingilizce-kursu" },
  { name: "Lise İngilizce (Teens)", href: "/lise-ingilizce-kursu" },
  { name: "GMAT", href: "/gmat-hazirlik-kursu" },
  { name: "Havacılık ve Pilotluk İngilizcesi Kursu", href: "/havacilik-pilotluk-ingilizcesi-kursu" },
  { name: "ITEP Hazırlık Kursu", href: "/itep-hazirlik-kursu" },
  { name: "GRE Sınavı Hazırlık Kursu", href: "/gre-sinavi-hazirlik-kursu" },
  { name: "ÖSD Almanca Dil Sertifikası Kursu", href: "/osd-almanca-dil-sertifikasi-kursu" },
  { name: "Almanca Goethe Sınavı Hazırlık Kursu", href: "/almanca-goethe-sinavi-hazirlik-kursu" },
  { name: "TestDaF Almanca Kursu", href: "/testdaf-almanca-kursu" },
  { name: "SAT Kursu", href: "/sat-kursu" },
  { name: "PTE Kursu", href: "/pte-kursu" },
  { name: "CAE Kursu", href: "/cae-kursu" },
  { name: "TORFL Kursu", href: "/torfl-kursu" },
  { name: "CILS Kursu", href: "/cils-kursu" },
  { name: "TEF Kursu", href: "/tef-kursu" },
  { name: "TELC Kursu", href: "/telc-kursu" },
  { name: "E-TEP Sınavı Nedir? - ÖSYM'nin Dört Becerili İngilizce Yeterlilik Testi", href: "/e-tep-sinavi-nedir" }
];

const languages = [
  { img: "/flags/ispanya.webp", name: "İspanyolca Kursu", href: "/ispanyolca-dil-kursu" },
  { img: "/flags/fransa.webp", name: "Fransızca Kursu", href: "/fransizca-dil-kursu" },
  { img: "/flags/almanca.webp", name: "Almanca Dil Kursu", href: "/almanca-dil-kursu" },
  { img: "/flags/rusca.webp", name: "Rusça Dil Kursu", href: "/rusca-dil-kursu" },
  { img: "/flags/italyanca.webp", name: "İtalyanca Kursu", href: "/italyanca-dil-kursu" },
  { img: "/flags/farsca.webp", name: "Farsça Kursu", href: "/farsca-dil-kursu" },
  { img: "/flags/cince.webp", name: "Çince Kursu", href: "/cince-dil-kursu" },
  { img: "/flags/japan.webp", name: "Japonca Kursu", href: "/japonca-dil-kursu" },
  { img: "/flags/kore.webp", name: "Korece Kursu", href: "/korece-dil-kursu" },
  { img: "/flags/osmanlica.webp", name: "Osmanlıca Kursu", href: "/osmanlica-dil-kursu" },
  { img: "/flags/turkce.webp", name: "Yabancılara Türkçe", href: "/yabancilara-turkce" },
  { img: "/flags/turkce.webp", name: "Türkçe Kursu", href: "/turkce-dil-kursu" },
  { img: "/flags/latince.webp", name: "Latince Kursu", href: "/latince-dil-kursu" },
  { img: "/flags/portekiz.webp", name: "Portekizce Kursu", href: "/portekizce-dil-kursu" },
  { img: "/flags/arapca.webp", name: "Arapça Dil Kursu", href: "/arapca-dil-kursu" },
  { img: "/flags/flemenkce.webp", name: "Felemenkçe Dil Kursu", href: "/flemenkce-dil-kursu" }
];

interface Props {
  lang: Locale;
}

export const Footer = async ({ lang }: Props) => {
  const dict = await getDictionary(lang);
  const footerData = dict?.footer;

  if (!footerData) return null;

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerBackground}></div>
      <div className={styles.footerRings}></div>
      
      <div className={styles.footerContent}>
        {/* TOP SECTION */}
        <div className={styles.topSection}>
          <div>
            <div className={styles.columnTitle}>{footerData.campusesTitle}</div>
            <ul className={styles.linkList}>
              {campuses.map((c, i) => (
                <li key={i} className={styles.linkItem}>
                  <Link href={`/${lang}${c.href}`}>{c.name}</Link>
                  {c.badge && <span className={styles.redBadge}>IELTS Test Venue</span>}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <div className={styles.columnTitle}>{footerData.programsTitle}</div>
            <div className={styles.twoCols}>
              <ul className={styles.linkList}>
                {programs.slice(0, Math.ceil(programs.length / 2)).map((p, i) => (
                  <li key={i} className={styles.linkItem}>
                    {p.href === "#" ? (
                      <span>{p.name}</span>
                    ) : (
                      <Link href={`/${lang}${p.href}`}>{p.name}</Link>
                    )}
                  </li>
                ))}
              </ul>
              <ul className={styles.linkList}>
                {programs.slice(Math.ceil(programs.length / 2)).map((p, i) => (
                  <li key={i} className={styles.linkItem}>
                    {p.href === "#" ? (
                      <span>{p.name}</span>
                    ) : (
                      <Link href={`/${lang}${p.href}`}>{p.name}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <div className={styles.columnTitle}>{footerData.languagesTitle}</div>
            <ul className={styles.linkList}>
              {languages.map((l, i) => (
                <li key={i} className={styles.linkItem}>
                  <Image src={l.img} alt={l.name} title={l.name} width={20} height={20} className={styles.flagImg} />
                  <Link href={`/${lang}${l.href}`}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* MIDDLE SECTION */}
        <div className={styles.middleSection}>
          <NewsletterForm footerData={footerData} />
          
          <div>
            <div className={styles.columnTitle}>{footerData.socialTitle}</div>
            <p className={styles.middleDesc}>{footerData.socialDesc}</p>
            <div className={styles.socialIcons}>
              <a href="https://tr-tr.facebook.com/akademikbatidilleri/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://x.com/akademikdilokul" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="X">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
              </a>
              <a href="https://www.instagram.com/avcilarakademik" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://tr.linkedin.com/company/akademik-dil-kursu" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.youtube.com/channel/UC1VMsQPzasFIRhPYfo16O_Q" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="YouTube">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <div className={styles.columnTitle}>{footerData.customerServiceTitle}</div>
            <div className={styles.customerService}>
              <div className={styles.phoneGroup}>
                <HeadphonesIcon size={32} />
                <span>0850 305 05 16</span>
              </div>
              <button className={styles.callNowBtn}>{footerData.callNowBtn}</button>
              
              <div className={styles.abroadCall}>
                <span>{footerData.abroadCallText}</span>
                <span className={styles.abroadPhone}>+90 216 550 30 30</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* BOTTOM SECTION */}
        <div className={styles.bottomSection}>
          <div className={styles.bottomLinks}>
            {footerData.bottomLinks.map((link: string, i: number) => (
              <span key={i}>{link}</span>
            ))}
          </div>
          
          <div className={styles.copyright}>{footerData.copyright}</div>
          
          <div className={styles.partnersSection}>
            <div className={styles.sectionHeading}>{footerData.partnersTitle}</div>
            <div className={styles.logosRow}>
              <div className={styles.logoItem}>
                <Image src="/brand/british-ielts.webp" alt="British IELTS" title="British IELTS" height={68} width={304} className={styles.logoImg} />
              </div>
              <div className={styles.logoItem}>
                <Image src="/brand/pearson-cert.webp" alt="Pearson" title="Pearson" height={68} width={164} className={styles.logoImg} />
              </div>
              <div className={styles.logoItem}>
                <Image src="/brand/language-cert.webp" alt="LanguageCert" title="LanguageCert" height={68} width={332} className={styles.logoImg} />
              </div>
            </div>
          </div>
          
          <div className={styles.devCredit}>
            <div className={styles.creditContainer}>
              {footerData.designBy} <strong>ideaZone</strong>
              <Image src="/brand/designer-logo.webp" alt="ideaZone Logo" title="ideaZone Logo" width={45} height={45} className={styles.designerLogo} />
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
};
