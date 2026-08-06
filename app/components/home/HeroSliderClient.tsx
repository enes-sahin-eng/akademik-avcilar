"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
              initial="enter"
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

        {/* Form Card Overlay (Ücretsiz Eğitim) - Moved outside sliderContainer to fix mobile overflow */}
        <div className={styles.formCardOverlay}>
            <div className={styles.formHeader}>
              <div>
                <h2 className={styles.formTitle}>{form?.title || "ÜCRETSİZ EĞİTİM!"}</h2>
                <p className={styles.formSubtitle}>{form?.subtitle || "Eğitim İçin Hemen Ön Bilgi Alın!"}</p>
              </div>
            </div>
            
            <form className={styles.minimalForm}>
              <input type="text" placeholder={form?.namePlaceholder || "İsim Ve Soyisim Giriniz."} className={styles.minimalInput} />
              <input type="tel" placeholder={form?.phonePlaceholder || "GSM Numaranızı Giriniz."} className={styles.minimalInput} />
              <select className={styles.minimalInput} defaultValue="">
                <option value="" disabled hidden>{form?.branchPlaceholder || "Şube Seçiniz."}</option>
                {campuses?.map((campus: any, index: number) => (
                  <option key={index} value={campus.name}>
                    {campus.name}
                  </option>
                ))}
              </select>
              <button type="button" className={styles.minimalSubmitBtn}>
                {form?.submitBtn || "HEMEN ÖN BİLGİ AL!"}
              </button>
              <p className={styles.minimalLegal}>{form?.legal || "Bilgi formunu doldurarak Yasal Uyarı / Kullanım Şartlarını kabul ediyorum."}</p>
            </form>
          </div>
      </div>
    </div>
  );
};
