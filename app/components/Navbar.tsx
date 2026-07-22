"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Globe,
  Moon,
  Sun,
  Monitor,
  Calendar
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { useDictionary } from "../../src/context/DictionaryContext";
import { MegaMenuGenelIngilizce } from "./MegaMenuGenelIngilizce";
import { MegaMenuSinav } from "./MegaMenuSinav";
import { MegaMenuDigerDiller } from "./MegaMenuDigerDiller";
import { MegaMenuSubeler } from "./MegaMenuSubeler";
import { MegaMenuHakkimizda } from "./MegaMenuHakkimizda";
import { useTheme } from "../../src/context/ThemeContext";

const availableLocales = [
  { code: "tr", name: "Türkçe" },
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
];

export const Navbar = () => {
  const dict = useDictionary();
  const navDict = dict?.navbar;

  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [topLangDropdownOpen, setTopLangDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Extract current locale from URL path e.g. /tr/foo => tr
  const currentLocale = pathname?.split("/")[1] || "tr";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLanguage = (newLocale: string) => {
    if (newLocale === currentLocale) return;
    const segments = (pathname || "").split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/") || `/${newLocale}`;
    router.push(newPath);
    setLangDropdownOpen(false);
  };

  return (
    <header className={styles.header}>
      {/* ÜST İNCE DUYURU BANDI */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <div 
            className={styles.topLangSelector}
            onMouseEnter={() => setTopLangDropdownOpen(true)}
            onMouseLeave={() => setTopLangDropdownOpen(false)}
          >
            <button className={styles.topBarLink} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>
              <span style={{ fontSize: 16 }}>
                {currentLocale === 'tr' ? '🇹🇷' : currentLocale === 'en' ? '🇬🇧' : currentLocale === 'ar' ? '🇸🇦' : '🌐'}
              </span>
              <span>{availableLocales.find(l => l.code === currentLocale)?.name || "Turkish"}</span>
              <ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {topLangDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  className={styles.topLangDropdown}
                >
                  {availableLocales.map((loc) => (
                    <button
                      key={loc.code}
                      onClick={() => switchLanguage(loc.code)}
                      className={`${styles.langDropdownItem} ${currentLocale === loc.code ? styles.langActive : ""}`}
                    >
                      <span style={{ marginRight: 6 }}>
                        {loc.code === 'tr' ? '🇹🇷' : loc.code === 'en' ? '🇬🇧' : loc.code === 'ar' ? '🇸🇦' : '🌐'}
                      </span>
                      {loc.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className={styles.topBarDivider}></div>

          <a href={`/${currentLocale}/haftalik-program`} className={styles.topBarLink}>
            <Calendar size={16} />
            <span>{(navDict as any)?.weeklyProgram || "Haftalık Aktivite Programı"}</span>
          </a>
        </div>
        
        <div className={styles.topBarCenter}>
          <div className={styles.marquee}>
            <div className={styles.marqueeContent}>
              <span className={styles.marqueeItem}>
                <Sparkles size={14} style={{ display: 'inline', marginRight: 6 }} /> 
                {navDict?.marquee1 || "Seramik Hamuruyla Yaratıcı Tasarımlar - Yaz Okulu 2026"}
              </span>
              <span className={styles.marqueeItem}>
                <Sparkles size={14} style={{ display: 'inline', marginRight: 6 }} /> 
                {navDict?.marquee2 || "Yaz Okulu 2026: Boncuklu Fotoğraf Çerçevesi Atölyesi"}
              </span>
              <span className={styles.marqueeItem}>
                <Sparkles size={14} style={{ display: 'inline', marginRight: 6 }} /> 
                {navDict?.marquee3 || "Yaz Okulu 2026'da Tarak Ebru: Geleneksel Sanatla Buluşma"}
              </span>
            </div>
            {/* Duplicate for seamless looping */}
            <div className={styles.marqueeContent} aria-hidden="true">
              <span className={styles.marqueeItem}>
                <Sparkles size={14} style={{ display: 'inline', marginRight: 6 }} /> 
                {navDict?.marquee1 || "Seramik Hamuruyla Yaratıcı Tasarımlar - Yaz Okulu 2026"}
              </span>
              <span className={styles.marqueeItem}>
                <Sparkles size={14} style={{ display: 'inline', marginRight: 6 }} /> 
                {navDict?.marquee2 || "Yaz Okulu 2026: Boncuklu Fotoğraf Çerçevesi Atölyesi"}
              </span>
              <span className={styles.marqueeItem}>
                <Sparkles size={14} style={{ display: 'inline', marginRight: 6 }} /> 
                {navDict?.marquee3 || "Yaz Okulu 2026'da Tarak Ebru: Geleneksel Sanatla Buluşma"}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.topBarRight}>
          <a href="https://www.instagram.com/akademikinternational" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://tr-tr.facebook.com/akademikbatidilleri/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://x.com/akademikdilokul" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Twitter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
          </a>
          <a href="https://www.youtube.com/channel/UC1VMsQPzasFIRhPYfo16O_Q" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Youtube">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
          </a>
          <a href="https://tr.linkedin.com/company/akademik-dil-kursu" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Linkedin">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </div>

      {/* ANA NAVBAR */}
      <nav className={`${styles.nav} ${isScrolled ? styles.navScrolled : ""}`}>
        <div className={styles.container}>
          {/* LOGO */}
          <a href={`/${currentLocale}`} className={styles.logo}>
            <Image src="/logo.png" alt="AKADEMİK INTERNATIONAL LANGUAGE SCHOOL" width={200} height={50} className={styles.mainLogo} />
          </a>

          {/* MASAÜSTÜ LİNKLERİ */}
          <div className={styles.navLinks}>
            {/* Genel İngilizce */}
            <div
              className={styles.dropdownContainer}
              onMouseEnter={() => setActiveDropdown("genelIngilizce")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={styles.dropdownBtn}>
                <span>{navDict?.navGeneralEnglish || "Genel İngilizce"}</span>
                <ChevronDown
                  size={14}
                  className={styles.chevron}
                  style={{
                    transform:
                      activeDropdown === "genelIngilizce"
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "genelIngilizce" && (
                  <MegaMenuGenelIngilizce />
                )}
              </AnimatePresence>
            </div>

            {/* Akademi Sınav Kursları */}
            <div
              className={styles.dropdownContainer}
              onMouseEnter={() => setActiveDropdown("sinav")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={styles.dropdownBtn}>
                <span>
                  {navDict?.navExamCourses || "Akademi Sınav Kursları"}
                </span>
                <ChevronDown
                  size={14}
                  className={styles.chevron}
                  style={{
                    transform:
                      activeDropdown === "sinav"
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "sinav" && <MegaMenuSinav />}
              </AnimatePresence>
            </div>

            {/* Diğer Diller */}
            <div
              className={styles.dropdownContainer}
              onMouseEnter={() => setActiveDropdown("digerDiller")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={styles.dropdownBtn}>
                <span>{navDict?.navOtherLanguages || "Diğer Diller"}</span>
                <ChevronDown
                  size={14}
                  className={styles.chevron}
                  style={{
                    transform:
                      activeDropdown === "digerDiller"
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "digerDiller" && <MegaMenuDigerDiller />}
              </AnimatePresence>
            </div>

            {/* Şubelerimiz */}
            <div
              className={styles.dropdownContainer}
              onMouseEnter={() => setActiveDropdown("subeler")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={styles.dropdownBtn}>
                <span>{navDict?.navBranches || "Şubelerimiz"}</span>
                <ChevronDown
                  size={14}
                  className={styles.chevron}
                  style={{
                    transform:
                      activeDropdown === "subeler"
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "subeler" && <MegaMenuSubeler />}
              </AnimatePresence>
            </div>

            {/* Hakkımızda */}
            <div
              className={styles.dropdownContainer}
              onMouseEnter={() => setActiveDropdown("hakkimizda")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={styles.dropdownBtn}>
                <span>{navDict?.navAbout || "Hakkımızda"}</span>
                <ChevronDown
                  size={14}
                  className={styles.chevron}
                  style={{
                    transform:
                      activeDropdown === "hakkimizda"
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "hakkimizda" && <MegaMenuHakkimizda />}
              </AnimatePresence>
            </div>

            {/* İletişim */}
            <a href={`/${currentLocale}/iletisim`} className={styles.link}>
              {navDict?.navContact || "İletişim"}
            </a>
          </div>

          {/* DİL SEÇİCİ & TELEFON BUTONU */}
          <div className={styles.rightActions}>
            {/* DİL SEÇİCİ DROPDOWN */}
            <div
              className={styles.langSelectorContainer}
              onMouseEnter={() => setLangDropdownOpen(true)}
              onMouseLeave={() => setLangDropdownOpen(false)}
            >
              <button className={styles.langBtn} aria-label="Dil Seçimi">
                <Globe size={16} />
                <span>{currentLocale.toUpperCase()}</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: langDropdownOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className={styles.langDropdownMenu}
                  >
                    {availableLocales.map((loc) => (
                      <button
                        key={loc.code}
                        onClick={() => switchLanguage(loc.code)}
                        className={`${styles.langDropdownItem} ${
                          currentLocale === loc.code ? styles.langActive : ""
                        }`}
                      >
                        {loc.name} ({loc.code.toUpperCase()})
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* TEMA SEÇİCİ DROPDOWN */}
            <div
              className={styles.langSelectorContainer}
              onMouseEnter={() => setThemeDropdownOpen(true)}
              onMouseLeave={() => setThemeDropdownOpen(false)}
            >
              <button className={styles.langBtn} aria-label="Tema Seçimi">
                {theme === "dark" ? (
                  <Moon size={16} />
                ) : theme === "light" ? (
                  <Sun size={16} />
                ) : (
                  <Monitor size={16} />
                )}
                <ChevronDown
                  size={14}
                  style={{
                    transform: themeDropdownOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>

              <AnimatePresence>
                {themeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className={styles.langDropdownMenu}
                  >
                    <button
                      onClick={() => {
                        setTheme("dark");
                        setThemeDropdownOpen(false);
                      }}
                      className={`${styles.langDropdownItem} ${
                        theme === "dark" ? styles.langActive : ""
                      }`}
                    >
                      <Moon size={14} style={{ marginRight: 6 }} /> Koyu
                    </button>
                    <button
                      onClick={() => {
                        setTheme("light");
                        setThemeDropdownOpen(false);
                      }}
                      className={`${styles.langDropdownItem} ${
                        theme === "light" ? styles.langActive : ""
                      }`}
                    >
                      <Sun size={14} style={{ marginRight: 6 }} /> Beyaz
                    </button>
                    <button
                      onClick={() => {
                        setTheme("system");
                        setThemeDropdownOpen(false);
                      }}
                      className={`${styles.langDropdownItem} ${
                        theme === "system" ? styles.langActive : ""
                      }`}
                    >
                      <Monitor size={14} style={{ marginRight: 6 }} /> Sistem
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SEVİYE BELİRLEME BUTONU */}
            <a
              href="https://atc.akademik.com.tr/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              {navDict?.freePlacementTest || "Ücretsiz Seviye Belirleme Sınavı"}
            </a>
          </div>

          {/* MOBİL MENÜ BUTONU */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={styles.mobileBtn}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* MOBİL AÇILIR MENÜ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={styles.mobileMenu}
          >
            <div className={styles.dropdownContainer}>
              <button className={styles.dropdownBtn}>
                <span>{navDict?.navGeneralEnglish || "Genel İngilizce"}</span>
              </button>
            </div>
            <div className={styles.dropdownContainer}>
              <button className={styles.dropdownBtn}>
                <span>
                  {navDict?.navExamCourses || "Akademi Sınav Kursları"}
                </span>
              </button>
            </div>
            <div className={styles.dropdownContainer}>
              <button className={styles.dropdownBtn}>
                <span>{navDict?.navOtherLanguages || "Diğer Diller"}</span>
              </button>
            </div>
            <div className={styles.dropdownContainer}>
              <button className={styles.dropdownBtn}>
                <span>{navDict?.navBranches || "Şubelerimiz"}</span>
              </button>
            </div>
            <div className={styles.dropdownContainer}>
              <button className={styles.dropdownBtn}>
                <span>{navDict?.navAbout || "Hakkımızda"}</span>
              </button>
            </div>
            <a href={`/${currentLocale}/iletisim`} className={styles.link}>
              {navDict?.navContact || "İletişim"}
            </a>

            <div className={styles.mobileCtaWrapper}>
              <a
                href="https://atc.akademik.com.tr/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaBtnMobile}
              >
                {navDict?.freePlacementTest || "Ücretsiz Seviye Belirleme Sınavı"}
              </a>
            </div>

            {/* MOBİL DİL SEÇİMİ */}
            <div className={styles.mobileLangList}>
              <span className={styles.mobileLangTitle}>
                {navDict?.selectLanguage || "Dil Seçin"}:
              </span>
              <div className={styles.mobileLangButtons}>
                {availableLocales.map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => {
                      switchLanguage(loc.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`${styles.mobileLangBtn} ${
                      currentLocale === loc.code ? styles.mobileLangActive : ""
                    }`}
                  >
                    {loc.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* MOBİL TEMA SEÇİMİ */}
            <div className={styles.mobileLangList}>
              <span className={styles.mobileLangTitle}>Tema Seçin:</span>
              <div className={styles.mobileLangButtons}>
                <button
                  onClick={() => {
                    setTheme("dark");
                    setMobileMenuOpen(false);
                  }}
                  className={`${styles.mobileLangBtn} ${
                    theme === "dark" ? styles.mobileLangActive : ""
                  }`}
                >
                  <Moon size={16} />
                </button>
                <button
                  onClick={() => {
                    setTheme("light");
                    setMobileMenuOpen(false);
                  }}
                  className={`${styles.mobileLangBtn} ${
                    theme === "light" ? styles.mobileLangActive : ""
                  }`}
                >
                  <Sun size={16} />
                </button>
                <button
                  onClick={() => {
                    setTheme("system");
                    setMobileMenuOpen(false);
                  }}
                  className={`${styles.mobileLangBtn} ${
                    theme === "system" ? styles.mobileLangActive : ""
                  }`}
                >
                  <Monitor size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
