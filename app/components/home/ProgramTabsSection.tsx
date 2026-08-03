"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ProgramTabsSection.module.css";
import { useDictionary } from "../../../src/context/DictionaryContext";
function AnimatedProgramCard({ card, styles }: { card: any; styles: any }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({
      x: (x / rect.width - 0.5) * 25,
      y: (y / rect.height - 0.5) * -25,
    });
  };

  const handleEnter = () => setHovered(true);
  const handleLeave = () => {
    setHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateX: mousePos.y,
        rotateY: mousePos.x,
        z: hovered ? 30 : 0,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 35, mass: 0.8 }}
      className={`${styles.card} group relative w-full overflow-hidden transform-gpu transition-all duration-500 ease-out`}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
    >
      {/* Background Image Layer (pushed back for parallax) */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.4 }}
        style={{ transform: "translateZ(-10px)" }}
      >
        <Image
          src={card.img}
          alt={`${card.title.replace(/\n/g, " ")}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.cardImg}
        />
        <div className={styles.gradientOverlay}></div>
      </motion.div>

      {/* Glare/Shine Effect Layer */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
        style={{ transform: "translateZ(15px)" }}
      >
        <motion.div
          className="absolute -inset-full"
          animate={{
            background: hovered
              ? `linear-gradient(${mousePos.x + 135}deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)`
              : "transparent",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Foreground Content Layer (pulled forward for parallax) */}
      <motion.div
        style={{ transform: "translateZ(20px)" }}
        className="relative z-20 w-full h-full flex flex-col pointer-events-none"
      >
        {/* Top Right Icons */}
        <div className={styles.iconStack}>
          <div className={styles.flagsWrapper}>
            {card.flags.map((flag: string, i: number) => (
              <div key={i} className={styles.flagIcon}>
                {flag}
              </div>
            ))}
          </div>
          <div className={styles.smallIcons}>
            <span>💬</span>
            <span>📖</span>
            <span>✍️</span>
            <span>🎧</span>
          </div>
        </div>

        <div className={styles.cardContent}>
          <motion.h3
            style={{ textShadow: "0 4px 8px rgba(0,0,0,0.5)" }}
            animate={{ scale: hovered ? 1.02 : 1 }}
          >
            {card.title.split("\n").map((line: string, i: number) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </motion.h3>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ... original component starts below

export const ProgramTabsSection = () => {
  const dict = useDictionary();
  const t = dict?.programTabsSection;
  const [activeTab, setActiveTab] = useState("tum");

  // ... (unchanged programCards definition) ...
  const programCards = [
    {
      id: 1,
      category: "nitelikli",
      title: "Prep Temel\nİngilizce Kursu",
      img: "/sliders/slider1.webp",
      flags: ["🇬🇧"],
    },
    {
      id: 2,
      category: "nitelikli",
      title: "Prep Plus İngilizce\nKursu",
      img: "/sliders/slider2.webp",
      flags: ["🇬🇧"],
    },
    {
      id: 3,
      category: "nitelikli",
      title: "Academic\nİngilizce Kursu",
      img: "/sliders/slider3.webp",
      flags: ["🇬🇧"],
    },
    {
      id: 4,
      category: "nitelikli",
      title: "Academic Plus\nKursu",
      img: "/sliders/slider1.webp",
      flags: ["🇬🇧"],
    },
    {
      id: 5,
      category: "nitelikli",
      title: "Genel İngilizce\nKursu",
      img: "/sliders/slider2.webp",
      flags: ["🇬🇧"],
    },
    {
      id: 6,
      category: "nitelikli",
      title: "İngilizce Özel Ders",
      img: "/sliders/slider3.webp",
      flags: ["🇬🇧"],
    },
    {
      id: 7,
      category: "nitelikli",
      title: "Kurumlara Özel /\nKurumsal İngilizce\nKursu",
      img: "/sliders/slider1.webp",
      flags: ["🇬🇧"],
    },
    {
      id: 8,
      category: "sinav",
      title: "YDS Hazırlık Kursu",
      img: "/sliders/slider2.webp",
      flags: ["🇬🇧"],
    },
    {
      id: 9,
      category: "sinav",
      title: "YKS-DİL (YDT)\nHazırlık Kursu",
      img: "/sliders/slider3.webp",
      flags: ["🇬🇧"],
    },
    {
      id: 10,
      category: "sinav",
      title: "TOEFL Hazırlık\nKursu",
      img: "/sliders/slider1.webp",
      flags: ["🇬🇧"],
    },
    {
      id: 11,
      category: "sinav",
      title: "IELTS Hazırlık\nKursu",
      img: "/sliders/slider2.webp",
      flags: ["🇬🇧"],
    },
    {
      id: 12,
      category: "sinav",
      title: "Hazırlık Atlama\nKursu -\nProficiency",
      img: "/sliders/slider3.webp",
      flags: ["🇬🇧"],
    },
    {
      id: 13,
      category: "sinav",
      title: "GMAT",
      img: "/sliders/slider1.webp",
      flags: ["🇬🇧"],
    },
    {
      id: 14,
      category: "sinav",
      title: "Almanca Goethe\nSınavı Hazırlık\nKursu",
      img: "/sliders/slider2.webp",
      flags: ["🇩🇪"],
    },
    {
      id: 15,
      category: "sinav",
      title: "SAT Kursu",
      img: "/sliders/slider3.webp",
      flags: ["🇬🇧"],
    },
    {
      id: 16,
      category: "sinav",
      title: "PTE Kursu",
      img: "/sliders/slider1.webp",
      flags: ["🇬🇧"],
    },
    {
      id: 17,
      category: "sinav",
      title: "TELC Kursu",
      img: "/sliders/slider2.webp",
      flags: ["🇩🇪", "🇬🇧"],
    },
  ];

  const filteredCards =
    activeTab === "tum"
      ? programCards
      : programCards.filter((c) => c.category === activeTab);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {t?.title ||
            "Avcılar Yabancı Dil Kursu Kampüsümüzde Verilen Programlar"}
        </h2>
        <p className={styles.subtitle}>
          {t?.subtitle ||
            "Avcılar Yabancı Dil Kursu - En İyi Yabancı Dil Eğitim Merkezi Tavsiye Avcılar"}
        </p>

        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tabBtn} ${activeTab === "tum" ? styles.active : ""}`}
            onClick={() => setActiveTab("tum")}
          >
            {t?.tabs?.tum || "TÜM PROGRAMLAR"}
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "nitelikli" ? styles.active : ""}`}
            onClick={() => setActiveTab("nitelikli")}
          >
            {t?.tabs?.nitelikli || "NİTELİKLİ DİL KURSLARI"}
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "sinav" ? styles.active : ""}`}
            onClick={() => setActiveTab("sinav")}
          >
            {t?.tabs?.sinav || "AKADEMİK SINAV KURSLARI"}
          </button>
        </div>

        <div className={styles.cardsGrid}>
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card) => (
              <AnimatedProgramCard key={card.id} card={card} styles={styles} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
