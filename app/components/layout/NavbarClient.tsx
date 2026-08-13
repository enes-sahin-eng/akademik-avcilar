"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Globe,
  Moon,
  Sun,
  Monitor,
  Calendar,
  User,
  GraduationCap,
  MapPin
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
interface NavbarClientProps {
  navDict: any;
  megaMenus: {
    genelIngilizce: any;
    sinav: any;
    digerDiller: any;
    subeler: any;
    hakkimizda: any;
  };
}
import { MegaMenuGenelIngilizce } from "./MegaMenuGenelIngilizce";
import { MegaMenuSinav } from "./MegaMenuSinav";
import { MegaMenuDigerDiller } from "./MegaMenuDigerDiller";
import { MegaMenuSubeler } from "./MegaMenuSubeler";
import { MegaMenuHakkimizda } from "./MegaMenuHakkimizda";
import { useTheme } from "../../../src/context/ThemeContext";

const availableLocales = [
  { code: "tr", name: "Türkçe" },
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
];

export const NavbarClient = ({ navDict, megaMenus }: NavbarClientProps) => {



  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<
    string | null
  >(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [topLangDropdownOpen, setTopLangDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [mobileLoginOpen, setMobileLoginOpen] = useState(false);
  const mobileLoginRef = useRef<HTMLDivElement>(null);

  // Mobil giris menusu: disariya tiklama ve Esc ile kapanir
  useEffect(() => {
    if (!mobileLoginOpen) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!mobileLoginRef.current?.contains(e.target as Node)) {
        setMobileLoginOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileLoginOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileLoginOpen]);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Extract current locale from URL path e.g. /tr/foo => tr
  const currentLocale = pathname?.split("/")[1] || "tr";

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1418) {
        setMobileMenuOpen(false);
        setMobileActiveDropdown(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    <>
      <header className={styles.header}>
        {/* ÜST İNCE DUYURU BANDI */}
        <div className={styles.topBar}>
          <div className={styles.topBarContainer}>
            <div className={styles.topBarLeft}>
            <div
              className={styles.topLangSelector}
              onMouseEnter={() => setTopLangDropdownOpen(true)}
              onMouseLeave={() => setTopLangDropdownOpen(false)}
            >
              <button className={`${styles.topBarLink} ${styles.langButton}`}>
                <span className={styles.langIcon}>
                  {currentLocale === "tr"
                    ? "🇹🇷"
                    : currentLocale === "en"
                      ? "🇬🇧"
                      : currentLocale === "ar"
                        ? "🇸🇦"
                        : "🌐"}
                </span>
                <span>
                  {availableLocales.find((l) => l.code === currentLocale)
                    ?.name || "Turkish"}
                </span>
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
                        <span className={styles.loginIcon}>
                          {loc.code === "tr"
                            ? "🇹🇷"
                            : loc.code === "en"
                              ? "🇬🇧"
                              : loc.code === "ar"
                                ? "🇸🇦"
                                : "🌐"}
                        </span>
                        {loc.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className={styles.topBarDivider}></div>

            <a
              href={`/${currentLocale}/haftalik-program`}
              className={styles.topBarLink}
            >
              <Calendar size={16} />
              <span>
                {(navDict as any)?.weeklyProgram ||
                  "Haftalık Aktivite Programı"}
              </span>
            </a>
          </div>

          <div className={styles.topBarCenter}>
            <div className={styles.marquee}>
              <div className={styles.marqueeContent}>
                {(navDict?.marqueeItems || []).map((item: any, idx: number) => {
                  let badgeBg = "#f3f4f6";
                  let badgeColor = "#4b5563";
                  let dotColor = "#9ca3af";

                  if (item.badgeColor === "red") {
                    badgeBg = "#fee2e2";
                    badgeColor = "#ef4444";
                    dotColor = "#ef4444";
                  } else if (item.badgeColor === "green") {
                    badgeBg = "#dcfce7";
                    badgeColor = "#10b981";
                    dotColor = "#10b981";
                  } else if (item.badgeColor === "blue") {
                    badgeBg = "#dbeafe";
                    badgeColor = "#3b82f6";
                    dotColor = "#3b82f6";
                  }

                  return (
                    <span key={idx} className={styles.marqueeItem}>
                      <span
                        className={styles.marqueeBadge}
                        style={{
                          backgroundColor: badgeBg,
                          color: badgeColor,
                        }}
                      >
                        <span
                          className={styles.badgeDot}
                          style={{ backgroundColor: dotColor }}
                        ></span>
                        {item.badgeText}
                      </span>
                      {item.text}
                    </span>
                  );
                })}
              </div>
              {/* Duplicate for seamless looping */}
              <div className={styles.marqueeContent} aria-hidden="true">
                {(navDict?.marqueeItems || []).map((item: any, idx: number) => {
                  let badgeBg = "#f3f4f6";
                  let badgeColor = "#4b5563";
                  let dotColor = "#9ca3af";

                  if (item.badgeColor === "red") {
                    badgeBg = "#fee2e2";
                    badgeColor = "#ef4444";
                    dotColor = "#ef4444";
                  } else if (item.badgeColor === "green") {
                    badgeBg = "#dcfce7";
                    badgeColor = "#10b981";
                    dotColor = "#10b981";
                  } else if (item.badgeColor === "blue") {
                    badgeBg = "#dbeafe";
                    badgeColor = "#3b82f6";
                    dotColor = "#3b82f6";
                  }

                  return (
                    <span key={`dup-${idx}`} className={styles.marqueeItem}>
                      <span
                        className={styles.marqueeBadge}
                        style={{
                          backgroundColor: badgeBg,
                          color: badgeColor,
                        }}
                      >
                        <span
                          className={styles.badgeDot}
                          style={{ backgroundColor: dotColor }}
                        ></span>
                        {item.badgeText}
                      </span>
                      {item.text}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.topBarRight}>
            <a
              href="https://www.instagram.com/avcilarakademik"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} ${styles.instagram}`}
              aria-label="Instagram"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://tr-tr.facebook.com/akademikbatidilleri/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} ${styles.facebook}`}
              aria-label="Facebook"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://x.com/akademikdilokul"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} ${styles.twitter}`}
              aria-label="Twitter"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UC1VMsQPzasFIRhPYfo16O_Q"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} ${styles.youtube}`}
              aria-label="Youtube"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>
            <a
              href="https://tr.linkedin.com/company/akademik-dil-kursu"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} ${styles.linkedin}`}
              aria-label="Linkedin"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
          </div>
        </div>

        {/* ANA NAVBAR */}
        <nav
          className={`${styles.nav} ${isScrolled ? styles.navScrolled : ""}`}
        >
          <div className={styles.container}>
            {/* MOBİL SOL GRUP: hamburger + giriş (yalnızca <=1024px) */}
            <div className={styles.mobileLeft}>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  setMobileActiveDropdown(null);
                  setMobileLoginOpen(false);
                }}
                className={styles.mobileIconBtn}
                aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <div className={styles.mobileLoginWrapper} ref={mobileLoginRef}>
                <button
                  type="button"
                  onClick={() => {
                    setMobileLoginOpen((v) => !v);
                    setMobileMenuOpen(false);
                  }}
                  className={styles.mobileIconBtn}
                  aria-label={navDict?.loginLabel || "Giriş"}
                  aria-expanded={mobileLoginOpen}
                  aria-haspopup="menu"
                >
                  <GraduationCap size={24} />
                </button>

                <AnimatePresence>
                  {mobileLoginOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.16 }}
                      className={styles.mobileLoginMenu}
                      role="menu"
                    >
                      <a
                        href="#"
                        role="menuitem"
                        className={styles.mobileLoginItem}
                        onClick={() => setMobileLoginOpen(false)}
                      >
                        <User size={15} />
                        {navDict?.parentLogin || "Veli Girişi"}
                      </a>
                      <a
                        href="#"
                        role="menuitem"
                        className={styles.mobileLoginItem}
                        onClick={() => setMobileLoginOpen(false)}
                      >
                        <GraduationCap size={15} />
                        {navDict?.studentLogin || "Öğrenci Girişi"}
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* LOGO */}
            <Link href={`/${currentLocale}`} className={styles.logo}>
              <Image
                src="/brand/logo.png"
                alt="AKADEMİK INTERNATIONAL LANGUAGE SCHOOL"
                title="AKADEMİK INTERNATIONAL LANGUAGE SCHOOL"
                width={200}
                height={50}
                style={{ width: 'auto' }}
                className={styles.mainLogo}
                priority
                sizes="(max-width: 768px) 140px, 200px"
              />
            </Link>

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
                    className={`${styles.chevron} ${
                      activeDropdown === "genelIngilizce"
                        ? styles.chevronOpen
                        : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === "genelIngilizce" && (
                    <MegaMenuGenelIngilizce data={megaMenus.genelIngilizce} />
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
                    className={`${styles.chevron} ${
                      activeDropdown === "sinav" ? styles.chevronOpen : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === "sinav" && <MegaMenuSinav data={megaMenus.sinav} />}
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
                    className={`${styles.chevron} ${
                      activeDropdown === "digerDiller" ? styles.chevronOpen : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === "digerDiller" && <MegaMenuDigerDiller data={megaMenus.digerDiller} />}
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
                    className={`${styles.chevron} ${
                      activeDropdown === "subeler" ? styles.chevronOpen : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === "subeler" && <MegaMenuSubeler data={megaMenus.subeler} />}
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
                    className={`${styles.chevron} ${
                      activeDropdown === "hakkimizda" ? styles.chevronOpen : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === "hakkimizda" && <MegaMenuHakkimizda data={megaMenus.hakkimizda} />}
                </AnimatePresence>
              </div>

              {/* İletişim */}
              <Link href={`/${currentLocale}/iletisim`} className={styles.link}>
                {navDict?.navContact || "İletişim"}
              </Link>
            </div>

            {/* SAĞ GRUP (Girişler ve Mobil Buton) */}
            <div className={styles.rightGroup}>
              <div className={styles.rightActions}>
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
                      className={`${styles.chevron} ${
                        langDropdownOpen ? styles.chevronOpen : ""
                      }`}
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
                              currentLocale === loc.code
                                ? styles.langActive
                                : ""
                            }`}
                          >
                            {loc.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div
                  className={styles.langSelectorContainer}
                  onMouseEnter={() => setThemeDropdownOpen(true)}
                  onMouseLeave={() => setThemeDropdownOpen(false)}
                >
                  <button className={styles.langBtn} aria-label="Tema Seçimi">
                    {!mounted ? (
                      <Monitor size={16} />
                    ) : theme === "dark" ? (
                      <Moon size={16} />
                    ) : theme === "light" ? (
                      <Sun size={16} />
                    ) : (
                      <Monitor size={16} />
                    )}
                    <ChevronDown
                      size={14}
                      className={`${styles.chevron} ${
                        themeDropdownOpen ? styles.chevronOpen : ""
                      }`}
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
                          <Moon size={14} className={styles.loginIcon} /> Koyu
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
                          <Sun size={14} className={styles.loginIcon} /> Beyaz
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
                          <Monitor size={14} className={styles.loginIcon} />{" "}
                          Sistem
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* GİRİŞ BUTONLARI */}
                <div className={styles.loginBtnWrapper}>
                  <a href="#" className={styles.ctaBtn}>
                    <User size={16} />
                    {navDict?.parentLogin || "Veli Girişi"}
                  </a>
                  <a href="#" className={styles.ctaBtn}>
                    <GraduationCap size={16} />
                    {navDict?.studentLogin || "Öğrenci Girişi"}
                  </a>
                </div>
              </div>

            </div>

            {/* MOBİL SAĞ GRUP: WhatsApp + konum (yalnızca <=1024px) */}
            <div className={styles.mobileRight}>
              <a
                href="https://wa.me/905323609256"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.mobileIconBtn} ${styles.mobileWhatsapp}`}
                aria-label="WhatsApp"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.86-6.97zM12.05 20.15h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a8.197 8.197 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.21 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.3z" />
                </svg>
              </a>

              <a
                href="https://www.google.com.tr/maps/place/Avc%C4%B1lar+Akademik+Yabanc%C4%B1+Dil+Kurslar%C4%B1+-+Avc%C4%B1lar+%C4%B0ngilizce+Kursu/@40.9828944,28.7172896,16z/data=!4m6!3m5!1s0x14caa1b2231bed03:0xb643688ca18a6ded!8m2!3d40.9828653!4d28.7224319!16s%2Fg%2F11w9xywqjq?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileIconBtn}
                aria-label={navDict?.locationLabel || "Konum"}
              >
                <MapPin size={24} />
              </a>
            </div>
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
                <button
                  className={styles.dropdownBtn}
                  onClick={() =>
                    setMobileActiveDropdown(
                      mobileActiveDropdown === "genelIngilizce"
                        ? null
                        : "genelIngilizce",
                    )
                  }
                >
                  <span>{navDict?.navGeneralEnglish || "Genel İngilizce"}</span>
                  <ChevronDown
                    size={14}
                    className={`${styles.chevron} ${
                      mobileActiveDropdown === "genelIngilizce"
                        ? styles.chevronOpen
                        : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileActiveDropdown === "genelIngilizce" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={styles.mobileDropdownContent}
                    >
                      <MegaMenuGenelIngilizce data={megaMenus.genelIngilizce} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={styles.dropdownContainer}>
                <button
                  className={styles.dropdownBtn}
                  onClick={() =>
                    setMobileActiveDropdown(
                      mobileActiveDropdown === "sinav" ? null : "sinav",
                    )
                  }
                >
                  <span>
                    {navDict?.navExamCourses || "Akademi Sınav Kursları"}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`${styles.chevron} ${
                      mobileActiveDropdown === "sinav" ? styles.chevronOpen : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileActiveDropdown === "sinav" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={styles.mobileDropdownContent}
                    >
                      <MegaMenuSinav data={megaMenus.sinav} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={styles.dropdownContainer}>
                <button
                  className={styles.dropdownBtn}
                  onClick={() =>
                    setMobileActiveDropdown(
                      mobileActiveDropdown === "digerDiller"
                        ? null
                        : "digerDiller",
                    )
                  }
                >
                  <span>{navDict?.navOtherLanguages || "Diğer Diller"}</span>
                  <ChevronDown
                    size={14}
                    className={`${styles.chevron} ${
                      mobileActiveDropdown === "digerDiller"
                        ? styles.chevronOpen
                        : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileActiveDropdown === "digerDiller" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={styles.mobileDropdownContent}
                    >
                      <MegaMenuDigerDiller data={megaMenus.digerDiller} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={styles.dropdownContainer}>
                <button
                  className={styles.dropdownBtn}
                  onClick={() =>
                    setMobileActiveDropdown(
                      mobileActiveDropdown === "subeler" ? null : "subeler",
                    )
                  }
                >
                  <span>{navDict?.navBranches || "Şubelerimiz"}</span>
                  <ChevronDown
                    size={14}
                    className={`${styles.chevron} ${
                      mobileActiveDropdown === "subeler"
                        ? styles.chevronOpen
                        : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileActiveDropdown === "subeler" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={styles.mobileDropdownContent}
                    >
                      <MegaMenuSubeler data={megaMenus.subeler} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={styles.dropdownContainer}>
                <button
                  className={styles.dropdownBtn}
                  onClick={() =>
                    setMobileActiveDropdown(
                      mobileActiveDropdown === "hakkimizda"
                        ? null
                        : "hakkimizda",
                    )
                  }
                >
                  <span>{navDict?.navAbout || "Hakkımızda"}</span>
                  <ChevronDown
                    size={14}
                    className={`${styles.chevron} ${
                      mobileActiveDropdown === "hakkimizda"
                        ? styles.chevronOpen
                        : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {mobileActiveDropdown === "hakkimizda" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={styles.mobileDropdownContent}
                    >
                      <MegaMenuHakkimizda data={megaMenus.hakkimizda} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link href={`/${currentLocale}/iletisim`} className={styles.link}>
                {navDict?.navContact || "İletişim"}
              </Link>

              <div className={styles.mobileCtaWrapper}>
                <a href="#" className={styles.ctaBtnMobile}>
                  <User size={18} style={{ marginRight: '6px' }} />
                  {navDict?.parentLogin || "Veli Girişi"}
                </a>
                <a href="#" className={styles.ctaBtnMobile}>
                  <GraduationCap size={18} style={{ marginRight: '6px' }} />
                  {navDict?.studentLogin || "Öğrenci Girişi"}
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
                        currentLocale === loc.code
                          ? styles.mobileLangActive
                          : ""
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
    </>
  );
};
