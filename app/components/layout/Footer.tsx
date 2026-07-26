"use client";

import React, { useState } from "react";
import { HeadphonesIcon, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Footer.module.css";
import { useDictionary } from "../../../src/context/DictionaryContext";
import Image from "next/image";

const campuses = [
  { name: "Kadıköy İngilizce Dil Kursu", badge: false },
  { name: "Bursa İngilizce Kursu", badge: true },
  { name: "Avcılar İngilizce Dil Kursu", badge: false },
  { name: "İstanbul İngilizce Dil Kursu", badge: false },
  { name: "İstanbul Çekmeköy", badge: false },
  { name: "Bursa Görükle", badge: false },
  { name: "Ankara", badge: true },
  { name: "İzmir İngilizce Dil Kursu", badge: true },
  { name: "Kocaeli İzmit", badge: false },
  { name: "Tekirdağ Çorlu", badge: false },
  { name: "Bursa İnegöl", badge: false },
  { name: "Bursa Yıldırım", badge: false },
];

const programs = [
  "Kadıköy Almanca Kursu", "Almanca Aile Birleşimi Kursu", "İzmir Almanca Aile Birleşimi Kursu",
  "Beşiktaş Fransızca Kursu", "Prep Temel İngilizce Kursu", "Prep Plus İngilizce Kursu",
  "Academic Express Kursu", "Academic İngilizce Kursu", "Academic Plus Kursu",
  "İngilizce Özel Ders", "Genel İngilizce Kursu", "Kurumlara Özel / Kurumsal İngilizce Kursu",
  "YDS Hazırlık Kursu", "Akademik İngilizce", "YÖKDİL Sınavı Hazırlık Kursu",
  "YKS-DİL (YDT) Hazırlık Kursu", "TOEFL Hazırlık Kursu", "IELTS Hazırlık Kursu",
  "TOEIC Hazırlık Kursu", "Hazırlık Atlama Kursu - Proficiency", "İş İngilizcesi",
  "İlköğretim İngilizce Kursu", "Ortaokul İngilizce Kursu | 5-8. Sınıflar İçin Konuşma Odaklı Eğitim",
  "Lise İngilizce (Teens)", "GMAT", "Havacılık İngilizce Kursu", "ITEP Hazırlık Kursu",
  "GRE Sınavı Hazırlık Kursu", "ÖSD Almanca Dil Sertifikası Kursu", "Almanca Goethe Sınavı Hazırlık Kursu",
  "TestDAF Almanca Kursu", "SAT Kursu", "PTE Kursu", "CAE Kursu", "TOEFL Kursu", "CILS Kursu",
  "TEF Kursu", "TELC Kursu", "E-TEP Sınavı Nedir?", "ÖSYM'nin Dört Becerili İngilizce Yeterlilik Testi"
];

const languages = [
  { img: "/flags/ispanya.webp", name: "İspanyolca Kursu" },
  { img: "/flags/fransa.webp", name: "Fransızca Kursu" },
  { img: "/flags/almanca.webp", name: "Almanca Dil Kursu" },
  { img: "/flags/rusça.webp", name: "Rusça Dil Kursu" },
  { img: "/flags/italyanca.webp", name: "İtalyanca Kursu" },
  { img: "/flags/farsça.webp", name: "Farsça Kursu" },
  { img: "/flags/çince.webp", name: "Çince Kursu" },
  { img: "/flags/japan.webp", name: "Japonca Kursu" },
  { img: "/flags/kore.webp", name: "Korece Kursu" },
  { img: "/flags/osmanlıca.webp", name: "Osmanlıca Kursu" },
  { img: "/flags/türkçe.webp", name: "Yabancılara Türkçe" },
  { img: "/flags/türkçe.webp", name: "Türkçe Kursu" },
  { img: "/flags/latince.webp", name: "Latince Kursu" },
  { img: "/flags/portekiz.webp", name: "Portekizce Kursu" },
  { img: "/flags/arapça.webp", name: "Arapça Dil Kursu" },
  { img: "/flags/flemenkçe.webp", name: "Felemenkçe Dil Kursu" }
];

export const Footer: React.FC = () => {
  const dict = useDictionary();
  const footerData = dict?.footer;

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!footerData) return null;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // TODO: Gerçek e-posta gönderimi için buraya API entegrasyonu gelecek (Örn: fetch('/api/subscribe'))
    // Şu anlık sadece frontend simülasyonu yapıyoruz.
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setEmail("");
  };

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
                  <a href="#">{c.name}</a>
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
                  <li key={i} className={styles.linkItem}><a href="#">{p}</a></li>
                ))}
              </ul>
              <ul className={styles.linkList}>
                {programs.slice(Math.ceil(programs.length / 2)).map((p, i) => (
                  <li key={i} className={styles.linkItem}><a href="#">{p}</a></li>
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
                  <a href="#">{l.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* MIDDLE SECTION */}
        <div className={styles.middleSection}>
          <div>
            <div className={styles.columnTitle}>{footerData.newsletterTitle}</div>
            <p className={styles.middleDesc}>{footerData.newsletterDesc}</p>
            <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
              <div className={styles.inputWrapper}>
                <input 
                  type="email" 
                  placeholder={footerData.emailPlaceholder} 
                  className={styles.emailInput} 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className={styles.sendBtn} disabled={isSubmitting}>
                  {isSubmitting ? "..." : footerData.sendBtn}
                </button>
              </div>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" required />
                <span>{footerData.checkbox1}</span>
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" required />
                <span>{footerData.checkbox2}</span>
              </label>
            </form>
          </div>
          
          <div>
            <div className={styles.columnTitle}>{footerData.socialTitle}</div>
            <p className={styles.middleDesc}>{footerData.socialDesc}</p>
            <div className={styles.socialIcons}>
              <a href="https://tr-tr.facebook.com/brand/akademikbatidilleri/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://x.com/brand/akademikdilokul" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="X">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
              </a>
              <a href="https://www.instagram.com/brand/akademikinternational" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://tr.linkedin.com/company/brand/akademik-dil-kursu" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
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
              <a href="#" key={i}>{link}</a>
            ))}
          </div>
          
          <div className={styles.copyright}>{footerData.copyright}</div>
          
          <div className={styles.partnersSection}>
            <div className={styles.sectionHeading}>{footerData.partnersTitle}</div>
            <div className={styles.logosRow}>
              <div className={styles.logoItem}>
                <Image src="/brand/british.webp" alt="British Council & IELTS" title="British Council & IELTS" height={60} width={250} className={styles.logoImg} />
              </div>
              <div className={styles.logoItem}>
                <Image src="/brand/pearson.webp" alt="Pearson PTE" title="Pearson PTE" height={60} width={180} className={styles.logoImg} />
              </div>
              <div className={styles.logoItem}>
                <Image src="/brand/language.webp" alt="LanguageCert" title="LanguageCert" height={60} width={220} className={styles.logoImg} />
              </div>
            </div>
          </div>
          
          <div className={styles.groupSection}>
            <Image src="/brand/group-companies.svg" alt="Akademik International Group Companies" title="Akademik International Group Companies" height={60} width={650} className={styles.groupTitleImg} />
            <div className={styles.logosRow}>
              <div className={styles.logoItem}>
                <Image src="/brand/logo.png" alt="Akademik International Language School" title="Akademik International Language School" height={45} width={180} className={styles.logoImg} />
              </div>
              <div className={styles.logoItem}>
                <Image src="/brand/akademikAbroad.webp" alt="AKADEMİK ABROAD" title="AKADEMİK ABROAD" height={45} width={150} className={styles.logoImg} />
              </div>
              <div className={styles.logoItem}>
                <Image src="/brand/akademikPublishing.webp" alt="The Academic Publishing" title="The Academic Publishing" height={45} width={120} className={styles.logoImg} />
              </div>
              <div className={styles.logoItem}>
                <Image src="/brand/akademikKoleji.svg" alt="AKADEMİK Koleji International School" title="AKADEMİK Koleji International School" height={45} width={160} className={styles.logoImg} />
              </div>
              <div className={styles.logoItem}>
                <Image src="/brand/akademikKids.svg" alt="AKADEMİK Kids" title="AKADEMİK Kids" height={45} width={160} className={styles.logoImg} />
              </div>
              <div className={styles.logoItem}>
                <Image src="/brand/akademikAdult.webp" alt="AKADEMİK adult" title="AKADEMİK adult" height={45} width={150} className={styles.logoImg} />
              </div>
            </div>
          </div>
          
          <div className={styles.devCredit}>
            <div className={styles.creditContainer}>
              {footerData.designBy} <strong>ideaZone</strong>
              <Image src="/brand/designer-logo.jpg" alt="ideaZone Logo" title="ideaZone Logo" width={100} height={45} className={styles.designerLogo} />
            </div>
          </div>
        </div>
        
      </div>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccess && (
          <div className={styles.modalOverlay}>
            <motion.div 
              className={styles.successModal}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className={styles.checkCircle}>
                <Check size={40} className={styles.checkIcon} />
              </div>
              <h3 className={styles.modalTitle}>Başarılı</h3>
              <p className={styles.modalDesc}>Abonelik Talebiniz Alınmıştır</p>
              <button 
                onClick={() => setShowSuccess(false)}
                className={styles.modalCloseBtn}
              >
                Tamam
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
