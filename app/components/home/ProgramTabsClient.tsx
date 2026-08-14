"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ProgramTabsSection.module.css";

interface ProgramCard {
  id: number;
  category: string;
  title: string;
  img: string;
  flags: string[];
}

interface ProgramTabsTranslations {
  tabs?: {
    tum?: string;
    nitelikli?: string;
    sinav?: string;
    showMore?: string;
    showLess?: string;
  };
  cards?: ProgramCard[];
}

function AnimatedProgramCard({ card, index }: { card: ProgramCard; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className={styles.card}
    >
      <div className={styles.cardImgWrapper}>
        <Image
          src={card.img}
          alt={`${card.title.replace(/\n/g, " ")}`}
          fill
          quality={60}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.cardImg}
        />
        <div className={styles.gradientOverlay}></div>
      </div>

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
        <h3>
          {card.title.split("\n").map((line: string, i: number) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h3>
      </div>
    </motion.div>
  );
}

// ... original component starts below

export const ProgramTabsClient = ({ t }: { t: ProgramTabsTranslations }) => {
  const [activeTab, setActiveTab] = useState("tum");
  const [visibleCount, setVisibleCount] = useState(6);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setVisibleCount(6);
  };

  const programCards = t?.cards || [];

  const filteredCards =
    activeTab === "tum"
      ? programCards
      : programCards.filter((c) => c.category === activeTab);

  return (
    <>
        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tabBtn} ${activeTab === "tum" ? styles.active : ""}`}
            onClick={() => handleTabChange("tum")}
          >
            {t?.tabs?.tum || "TÜM PROGRAMLAR"}
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "nitelikli" ? styles.active : ""}`}
            onClick={() => handleTabChange("nitelikli")}
          >
            {t?.tabs?.nitelikli || "NİTELİKLİ DİL KURSLARI"}
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "sinav" ? styles.active : ""}`}
            onClick={() => handleTabChange("sinav")}
          >
            {t?.tabs?.sinav || "AKADEMİK SINAV KURSLARI"}
          </button>
        </div>

        <div className={styles.cardsGrid}>
          <AnimatePresence mode="popLayout">
            {filteredCards.slice(0, visibleCount).map((card, index) => (
              <AnimatedProgramCard key={card.id} card={card} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* SEO: Tüm program başlıkları her zaman DOM'da — visually hidden */}
        <div style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", pointerEvents: "none" }}>
          {programCards.map((card) => (
            <h3 key={card.id}>{card.title.replace(/\n/g, " ")}</h3>
          ))}
        </div>

        
        <div className={styles.showMoreContainer}>
          {filteredCards.length > visibleCount && (
            <button 
              className={styles.showMoreBtn}
              onClick={() => setVisibleCount(prev => prev + 6)}
            >
              {t?.tabs?.showMore || "Daha Fazla Göster"}
            </button>
          )}
          {visibleCount > 6 && (
            <button 
              className={styles.showLessBtn}
              onClick={() => setVisibleCount(6)}
            >
              {t?.tabs?.showLess || "Daha Az Göster"}
            </button>
          )}
        </div>
    </>
  );
};
