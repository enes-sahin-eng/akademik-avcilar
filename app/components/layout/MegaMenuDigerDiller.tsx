"use client";
import Image from 'next/image';

import React from "react";
import { motion } from "framer-motion";
import { Castle, Building, Landmark, Building2, Snowflake, Moon, Globe2, Monitor, MountainSnow, Ship, Wind, Library, Sun, Coffee, ArrowRight } from "lucide-react";
import styles from "./MegaMenu.module.css";
import { useDictionary } from "../../../src/context/DictionaryContext";

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
          <div className={styles.sectionTitle}>{section.title}</div>
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
      <div className={`${styles.megaMenuLeft} ${styles.megaMenuLeftPadded}`}>
        <div className={`${styles.megaMenuColumns} ${styles.megaMenuColumnsThree}`}>
          <div className={`${styles.col} ${styles.colDense}`}>
            {megaMenu.col1.map(renderSection)}
          </div>
          <div className={`${styles.col} ${styles.colDense}`}>
            {megaMenu.col2.map(renderSection)}
          </div>
          <div className={`${styles.col} ${styles.colDense}`}>
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
          <Image 
            src="https://picsum.photos/seed/students-hall/300/350" 
            alt={megaMenu.news.title} title={megaMenu.news.title} 
            className={styles.newsImage} 
          width={300} height={350} />
          <div className={styles.newsOverlay}>
            <div className={styles.newsTitle}>{megaMenu.news.title}</div>
            <a href="#" className={styles.newsLink}>
              {megaMenu.news.button} <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
