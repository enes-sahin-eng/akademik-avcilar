"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, User, Phone, MapPin, ChevronDown, ArrowRight, Sparkles, ShieldCheck, Clock, Gift } from "lucide-react";
import styles from "./HeroSlider.module.css";

import Image from "next/image";

interface Slide {
  id: number;
  image: string;
  alt?: string;
  title?: string;
}

export const HeroSliderClient = ({
  slides,
  form,
  campuses,
}: {
  slides: Slide[];
  form: any;
  campuses: any[];
}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // New state for custom dropdown
  const [branch, setBranch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Otomatik slayt geçişi (5 saniyede bir, mouse üzerine gelince durur)
  useEffect(() => {
    if (isPaused || slides.length === 0) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused, slides.length]);

  const nextSlide = () => {
    if (slides.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (!slides.length) return null;

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <div
      className={styles.sliderSection}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.sliderWrapper}>
        <div className={styles.sliderContainer}>
          {/* ANIMASYONLU GÖRSEL VE YAZI İÇERİĞİ */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide.id || currentIndex}
              custom={direction}
              variants={{
                enter: (dir: number) => ({
                  x: dir > 0 ? 50 : -50,
                  opacity: 0,
                  scale: 1.05,
                }),
                center: {
                  zIndex: 1,
                  x: 0,
                  opacity: 1,
                  scale: 1,
                },
                exit: (dir: number) => ({
                  zIndex: 0,
                  x: dir < 0 ? 50 : -50,
                  opacity: 0,
                  scale: 0.98,
                }),
              }}
              initial={direction === 0 ? false : "enter"}
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 25 },
                opacity: { duration: 0.6 },
                scale: { duration: 0.7, ease: "easeOut" }
              }}
              className={styles.slideInner}
            >
              {/* Picsum Kapak Görseli */}
              <Image
                src={currentSlide.image}
                alt={currentSlide.alt || `Slide ${currentSlide.id}`}
                title={currentSlide.title || ""}
                fill
                priority={true}
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 100vw"
                className={styles.slideImage}
                unoptimized
              />

            </motion.div>
          </AnimatePresence>

          {/* SOL VE SAĞ OKLAR */}
          <button
            onClick={prevSlide}
            className={`${styles.arrowBtn} ${styles.prevBtn}`}
            aria-label="Önceki Slayt"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={nextSlide}
            className={`${styles.arrowBtn} ${styles.nextBtn}`}
            aria-label="Sonraki Slayt"
          >
            <ChevronRight size={22} />
          </button>

          {/* ALT SIRALAMA NOKTALARI */}
          <div className={styles.dotsContainer}>
            {slides.map((slideItem: Slide, index: number) => (
              <button
                key={slideItem.id || index}
                onClick={() => goToSlide(index)}
                className={`${styles.dot} ${currentIndex === index ? styles.dotActive : ""}`}
                aria-label={`Slayt ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Premium Lead Form Overlay */}
        <div className={styles.glassFormOverlay}>
          <div className={styles.glassBadge}>
            <Sparkles size={12} strokeWidth={2.5} />
            <span>{form?.badgeText || "Ücretsiz Ön Bilgilendirme"}</span>
          </div>

          <div className={styles.glassHeader}>
            <h2 className={styles.glassTitle}>{form?.title || "ÜCRETSİZ EĞİTİM!"}</h2>
            <p className={styles.glassSubtitle}>{form?.subtitle || "Eğitim İçin Hemen Ön Bilgi Alın!"}</p>
          </div>
          
          <form className={styles.glassForm}>
            {/* Name Input */}
            <div className={styles.inputWrapper}>
              <User className={styles.glassIcon} size={15} strokeWidth={2} />
              <input
                type="text"
                id="floating_name"
                className={styles.glassInput}
                placeholder=" "
                required
              />
              <label htmlFor="floating_name" className={styles.glassLabel}>
                {form?.namePlaceholder || "İsim Ve Soyisim Giriniz."}
              </label>
            </div>

            {/* Phone Input */}
            <div className={styles.inputWrapper}>
              <Phone className={styles.glassIcon} size={15} strokeWidth={2} />
              <input
                type="tel"
                id="floating_phone"
                className={styles.glassInput}
                placeholder=" "
                required
              />
              <label htmlFor="floating_phone" className={styles.glassLabel}>
                {form?.phonePlaceholder || "GSM Numaranızı Giriniz."}
              </label>
            </div>

            {/* Custom Branch Select */}
            <div className={styles.inputWrapper} ref={dropdownRef}>
              <MapPin className={styles.glassIcon} size={15} strokeWidth={2} />
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`${styles.glassInput} ${styles.dropdownTrigger} ${branch ? styles.hasValue : ''} ${isDropdownOpen ? styles.isFocused : ''}`}
              >
                <span className={branch ? styles.dropdownTriggerText : `${styles.dropdownTriggerText} ${styles.isEmpty}`}>
                  {branch || " "}
                </span>
                <ChevronDown size={15} className={`${styles.dropdownArrow} ${isDropdownOpen ? styles.isOpen : ''}`} />
              </div>

              <label className={`${styles.glassLabel} ${(branch || isDropdownOpen) ? styles.hasValue : ''}`}>
                {form?.branchPlaceholder || "Şube Seçiniz."}
              </label>

              {/* Custom Dropdown Menu */}
              <div className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.isOpen : ''}`}>
                <ul className={styles.dropdownList}>
                  {campuses?.map((campus: any, index: number) => (
                    <li 
                      key={index}
                      onClick={() => { setBranch(campus.name); setIsDropdownOpen(false); }}
                      className={`${styles.dropdownItem} ${branch === campus.name ? styles.isSelected : ''}`}
                    >
                      {campus.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button type="submit" className={styles.glassSubmitBtn}>
              {form?.submitBtn || "HEMEN ÖN BİLGİ AL!"}
              <ArrowRight className={styles.btnArrow} size={20} />
            </button>
          </form>

          <div className={styles.glassTrustRow}>
            <div className={styles.glassTrustItem}>
              <Clock size={13} strokeWidth={2.2} />
              <span>{form?.trustFast || "Hızlı Yanıt"}</span>
            </div>
            <div className={styles.glassTrustDivider} />
            <div className={styles.glassTrustItem}>
              <ShieldCheck size={13} strokeWidth={2.2} />
              <span>{form?.trustSecure || "Bilgiler Gizli"}</span>
            </div>
            <div className={styles.glassTrustDivider} />
            <div className={styles.glassTrustItem}>
              <Gift size={13} strokeWidth={2.2} />
              <span>{form?.trustTrial || "Deneme Dersi"}</span>
            </div>
          </div>

          <p className={styles.glassLegal}>{form?.legal || "Bilgi formunu doldurarak Yasal Uyarı / Kullanım Şartlarını kabul ediyorum."}</p>
        </div>
      </div>
    </div>
  );
};
