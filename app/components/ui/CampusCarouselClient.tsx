"use client";

import React, { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";
import styles from "./CampusCarousel.module.css";
import { motion, useInView } from "framer-motion";

import Image from "next/image";

export const CampusCarouselClient = ({ campusesData }: { campusesData: any[] }) => {



  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!trackRef.current || campusesData.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex =
          prevIndex >= campusesData.length - 1 ? 0 : prevIndex + 1;
        if (trackRef.current) {
          const scrollAmount = nextIndex * 350;
          trackRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [campusesData.length, isPaused]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    if (trackRef.current) {
      const scrollAmount = index * 350;
      trackRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (trackRef.current) {
      const scrollPos = trackRef.current.scrollLeft;
      const newIndex = Math.round(scrollPos / 350);
      if (newIndex !== activeIndex && newIndex < campusesData.length) {
        setActiveIndex(newIndex);
      }
    }
  };

  if (!campusesData || campusesData.length === 0) return null;

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, x: 100, rotateY: 30 },
    show: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <div className={styles.carouselContainer} ref={containerRef}>
      <div className={styles.carouselWrapper}>
        <motion.div
          className={styles.carouselTrack}
          ref={trackRef}
          onScroll={handleScroll}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {campusesData.map((campus: any, idx: number) => (
            <motion.div
              key={idx}
              className={styles.campusItem}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className={styles.campusImgWrapper}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={campus.image || "/brand/logo.png"}
                  alt={`${campus.name} Şubesi - Akademik International Dil Kursu`}
                  title={`${campus.name} Yabancı Dil Eğitim Merkezi`}
                  width={200}
                  height={200}
                  className={styles.campusImg}
                />
              </motion.div>
              <div className={styles.campusInfo}>
                <p className={styles.campusCity}>{campus.name}</p>
                <div className={styles.campusLabel}>{campus.label}</div>
                <a
                  href={`tel:${campus.phone.replace(/\s/g, "")}`}
                  className={styles.campusPhone}
                >
                  <Phone size={16} fill="currentColor" /> {campus.phone}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className={styles.dotsContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8 }}
      >
        {campusesData
          .slice(0, Math.ceil(campusesData.length / 2))
          .map((_: any, idx: number) => (
            <motion.button
              key={idx}
              className={`${styles.dot} ${idx === Math.floor(activeIndex / 2) ? styles.dotActive : ""}`}
              onClick={() => handleDotClick(idx * 2)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
      </motion.div>
    </div>
  );
};
