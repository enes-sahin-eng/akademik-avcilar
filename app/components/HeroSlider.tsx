"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./HeroSlider.module.css";
import { useDictionary } from "../../src/context/DictionaryContext";

interface Slide {
  id: number;
  image: string;
}

export const HeroSlider = () => {
  const dict = useDictionary();
  const slides: Slide[] = dict?.heroSlider?.slides || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
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
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id || currentIndex}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              {/* Picsum Kapak Görseli */}
              <img
                src={currentSlide.image}
                alt={`Slide ${currentSlide.id}`}
                className={styles.slideImage}
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
                onClick={() => setCurrentIndex(index)}
                className={`${styles.dot} ${currentIndex === index ? styles.dotActive : ""}`}
                aria-label={`Slayt ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Form Card Overlay (Ücretsiz Eğitim) - Moved outside sliderContainer to fix mobile overflow */}
        <div className={styles.formCardOverlay}>
            <div className={styles.formHeader}>
              <div>
                <h3 className={styles.formTitle}>{dict?.heroSliderForm?.title || "ÜCRETSİZ EĞİTİM!"}</h3>
                <p className={styles.formSubtitle}>{dict?.heroSliderForm?.subtitle || "Eğitim İçin Hemen Ön Bilgi Alın!"}</p>
              </div>
            </div>
            
            <form className={styles.minimalForm}>
              <input type="text" placeholder={dict?.heroSliderForm?.namePlaceholder || "İsim Ve Soyisim Giriniz."} className={styles.minimalInput} />
              <input type="tel" placeholder={dict?.heroSliderForm?.phonePlaceholder || "GSM Numaranızı Giriniz."} className={styles.minimalInput} />
              <select className={styles.minimalInput}>
                <option value="">{dict?.heroSliderForm?.branchPlaceholder || "Şube Seçiniz."}</option>
                <option value="kadikoy">Kadıköy</option>
                <option value="bursa">Bursa</option>
                <option value="avcilar">Avcılar</option>
              </select>
              <button type="button" className={styles.minimalSubmitBtn}>
                {dict?.heroSliderForm?.submitBtn || "HEMEN ÖN BİLGİ AL!"}
              </button>
              <p className={styles.minimalLegal}>{dict?.heroSliderForm?.legal || "Bilgi formunu doldurarak Yasal Uyarı / Kullanım Şartlarını kabul ediyorum."}</p>
            </form>
          </div>
      </div>
    </div>
  );
};
