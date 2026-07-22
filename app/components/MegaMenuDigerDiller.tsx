"use client";

import React from "react";
import { motion } from "framer-motion";
import { Castle, Building, Landmark, Building2, Snowflake, Moon, Globe2, Monitor, MountainSnow, Ship, Wind, Library, Sun, Coffee, ArrowRight } from "lucide-react";
import styles from "./MegaMenu.module.css";
import { useDictionary } from "../../src/context/DictionaryContext";

const iconMap: Record<string, React.ElementType> = {
  Castle,
  Building,
  Landmark,
  Building2,
  Snowflake,
  Moon,
  Globe2,
  Monitor,
  MountainSnow,
  Ship,
  Wind,
  Library,
  Sun,
  Coffee
};

export const MegaMenuDigerDiller: React.FC = () => {
  const dict = useDictionary();
  const megaMenu = dict?.megaMenuDigerDiller;

  if (!megaMenu) return null;

  const renderSection = (section: any, idx: number) => {
    const Icon = iconMap[section.icon] || Globe2;
    return (
      <a href={`#${section.title}`} key={idx} className={styles.dillerSection}>
        <div className={styles.dillerIconWrapper}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <div>
          <h4 className={styles.sectionTitle}>{section.title}</h4>
          <p className={styles.sectionSubtitle}>{section.subtitle}</p>
        </div>
      </a>
    );
  };

  return (
    <motion.div
      className={`${styles.megaMenuContainer} ${styles.dillerContainer}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      <div className={styles.megaMenuLeft} style={{ padding: "30px 40px" }}>
        <div className={styles.megaMenuColumns} style={{ gridTemplateColumns: "repeat(3, 1fr)", padding: 0, gap: "24px" }}>
          <div className={styles.col} style={{ gap: "20px" }}>
            {megaMenu.col1.map(renderSection)}
          </div>
          <div className={styles.col} style={{ gap: "20px" }}>
            {megaMenu.col2.map(renderSection)}
          </div>
          <div className={styles.col} style={{ gap: "20px" }}>
            {megaMenu.col3.map(renderSection)}
          </div>
        </div>
      </div>

      <div className={styles.dillerRight}>
        <div className={styles.verticalText}>
          {megaMenu.news.verticalText}
        </div>
        <div className={styles.newsCard}>
          <div className={styles.newsDateBadge}>{megaMenu.news.date}</div>
          <img 
            src="https://picsum.photos/seed/students-hall/300/350" 
            alt={megaMenu.news.title} 
            className={styles.newsImage} 
          />
          <div className={styles.newsOverlay}>
            <h4 className={styles.newsTitle}>{megaMenu.news.title}</h4>
            <a href="#" className={styles.newsLink}>
              {megaMenu.news.button} <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
