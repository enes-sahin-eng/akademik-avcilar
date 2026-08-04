"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./MiniGallery.module.css";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const images = [
  "/sliders/slider1.webp",
  "/sliders/slider2.webp",
  "/sliders/slider3.webp",
  "/sliders/slider4.webp",
  "/sliders/slider5.webp",
  "/campuses/sube-avcilar.jpg",
  "/campuses/sube-kadikoy.webp",
];

export const MiniGallery = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -220, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 220, behavior: "smooth" });
    }
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
  };

  return (
    <div className={styles.galleryContainer} ref={containerRef}>
      <div className={styles.galleryWrapper}>
        <motion.button 
          className={`${styles.arrowBtn} ${styles.prevBtn}`} 
          onClick={scrollLeft}
          whileHover={{ scale: 1.1, backgroundColor: "#ef4444" }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <ChevronLeft size={24} />
        </motion.button>

        <motion.div 
          className={styles.galleryTrack} 
          ref={trackRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {images.map((img, idx) => (
            <motion.div 
              key={idx} 
              className={styles.galleryItem}
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
            >
              <Image 
                src={img} 
                alt={`Avcılar Akademik International Etkinlik ve Kampüs Görseli ${idx + 1}`} 
                title="Avcılar Yabancı Dil Kursu Eğitim Merkezi ve Sosyal Aktiviteler"
                width={400}
                height={300}
                className={styles.galleryImg} 
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.button 
          className={`${styles.arrowBtn} ${styles.nextBtn}`} 
          onClick={scrollRight}
          whileHover={{ scale: 1.1, backgroundColor: "#ef4444" }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>
    </div>
  );
};
